// ChatGPT to Kelivo - Background Service Worker
// Communicates with local import server via HTTP

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'exportToKelivo') {
        handleExportToKelivo(request.data)
            .then(result => sendResponse({ success: true, result }))
            .catch(error => sendResponse({ success: false, error: error.message }));

        // Return true to indicate async response
        return true;
    } else if (request.action === 'checkServer') {
        checkServerStatus()
            .then(result => sendResponse({ success: true, running: result.running }))
            .catch(error => sendResponse({ success: false, running: false, error: error.message }));

        // Return true to indicate async response
        return true;
    }
});

// Handle export to Kelivo
async function handleExportToKelivo(data) {
    try {
        // Get configuration
        const config = await getConfig();

        // Send to local server
        const response = await fetch(`${config.serverUrl}/import`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                markdown: data.markdown,
                assistant: config.defaultAssistant || 'Default Assistant',
                title: data.title
            })
        });

        if (!response.ok) {
            const error = await response.json();

            // Special handling for Kelivo running error
            if (error.error === 'KELIVO_RUNNING') {
                throw new Error('KELIVO_RUNNING:' + (error.message || 'Please close the Kelivo application first'));
            }

            throw new Error(error.error || 'Import failed');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Export failed:', error);

        // If network error, prompt user to start server
        if (error.message.includes('fetch')) {
            throw new Error('Cannot connect to Kelivo import server\n\nPlease run: dart run tools/import_server.dart');
        }

        throw error;
    }
}

// Check server status
async function checkServerStatus() {
    try {
        const config = await getConfig();
        console.log('[Server Check] Starting server status check, URL:', config.serverUrl);

        // Method 1: Try /health endpoint
        console.log('[Server Check] Method 1: Trying /health endpoint...');
        try {
            const healthController = new AbortController();
            const healthTimeoutId = setTimeout(() => {
                console.log('[Server Check] /health request timeout');
                healthController.abort();
            }, 2000);

            const healthResponse = await fetch(`${config.serverUrl}/health`, {
                method: 'GET',
                signal: healthController.signal
            });

            clearTimeout(healthTimeoutId);
            console.log('[Server Check] /health response status code:', healthResponse.status);

            // If returns 200, server supports /health endpoint
            if (healthResponse.ok) {
                console.log('[Server Check] ✅ Server supports /health, check successful');
                return { running: true };
            }

            console.log('[Server Check] /health returned non-200, continuing with OPTIONS...');
        } catch (healthError) {
            console.log('[Server Check] /health request failed:', healthError.message);
            console.log('[Server Check] Continuing with OPTIONS...');
        }

        // Method 2: Try OPTIONS request to /import
        console.log('[Server Check] Method 2: Trying OPTIONS request to /import...');
        try {
            const optionsController = new AbortController();
            const optionsTimeoutId = setTimeout(() => {
                console.log('[Server Check] OPTIONS request timeout');
                optionsController.abort();
            }, 2000);

            const optionsResponse = await fetch(`${config.serverUrl}/import`, {
                method: 'OPTIONS',
                signal: optionsController.signal
            });

            clearTimeout(optionsTimeoutId);
            console.log('[Server Check] OPTIONS response status code:', optionsResponse.status);
            console.log('[Server Check] ✅ Server responded to OPTIONS, check successful');

            // As long as server responds (regardless of status code), consider server running
            return { running: true };
        } catch (optionsError) {
            console.log('[Server Check] OPTIONS request failed:', optionsError.message);
            console.log('[Server Check] ❌ Both methods failed, server not running');
            // OPTIONS also failed, server not running
            return { running: false };
        }
    } catch (error) {
        console.log('[Server Check] ❌ Check process error:', error.message);
        // Failed to get config or other error
        return { running: false };
    }
}

// Get configuration
async function getConfig() {
    return new Promise((resolve) => {
        chrome.storage.sync.get({
            defaultAssistant: 'Default Assistant',
            serverUrl: 'http://localhost:8765'
        }, (items) => {
            resolve(items);
        });
    });
}

// Save configuration
async function saveConfig(config) {
    return new Promise((resolve) => {
        chrome.storage.sync.set(config, () => {
            resolve();
        });
    });
}

// Listen for install event
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        console.log('ChatGPT to Kelivo extension installed');

        // Set default configuration
        saveConfig({
            defaultAssistant: 'Default Assistant',
            serverUrl: 'http://localhost:8765'
        });
    }
});


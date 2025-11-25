// ChatGPT to Kelivo - Popup Script

// Load configuration
function loadConfig() {
    chrome.storage.sync.get({
        defaultAssistant: 'Default Assistant',
        serverUrl: 'http://localhost:8765'
    }, (items) => {
        document.getElementById('assistant').value = items.defaultAssistant;
        document.getElementById('serverUrl').value = items.serverUrl;
    });
}

// Save configuration
function saveConfig() {
    const assistant = document.getElementById('assistant').value.trim();
    const serverUrl = document.getElementById('serverUrl').value.trim();

    if (!assistant) {
        showStatus('Please enter an assistant name', 'error');
        return;
    }

    if (!serverUrl) {
        showStatus('Please enter a server URL', 'error');
        return;
    }

    chrome.storage.sync.set({
        defaultAssistant: assistant,
        serverUrl: serverUrl
    }, () => {
        showStatus('✅ Settings saved', 'success');
    });
}

// Display status message
function showStatus(message, type) {
    const statusEl = document.getElementById('status');
    statusEl.textContent = message;
    statusEl.className = `status ${type}`;

    setTimeout(() => {
        statusEl.className = 'status';
    }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadConfig();
    
    document.getElementById('saveBtn').addEventListener('click', saveConfig);
    
    // Save on Enter key
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveConfig();
            }
        });
    });
});


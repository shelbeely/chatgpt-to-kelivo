// ChatGPT to Kelivo - Popup Script

// Load configuration
function loadConfig() {
    chrome.storage.sync.get({
        defaultAssistant: 'Default Assistant',
        serverUrl: 'http://localhost:8765',
        language: 'en'
    }, (items) => {
        document.getElementById('assistant').value = items.defaultAssistant;
        document.getElementById('serverUrl').value = items.serverUrl;
        document.getElementById('languageSelect').value = items.language;
        
        // Set the language and update UI
        setLanguage(items.language);
        updateUILanguage();
    });
}

// Save configuration
function saveConfig() {
    const assistant = document.getElementById('assistant').value.trim();
    const serverUrl = document.getElementById('serverUrl').value.trim();
    const language = document.getElementById('languageSelect').value;

    if (!assistant) {
        showStatus(t('pleaseEnterAssistantName'), 'error');
        return;
    }

    if (!serverUrl) {
        showStatus(t('pleaseEnterServerUrl'), 'error');
        return;
    }

    chrome.storage.sync.set({
        defaultAssistant: assistant,
        serverUrl: serverUrl,
        language: language
    }, () => {
        showStatus(t('settingsSaved'), 'success');
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

// Update UI language
function updateUILanguage() {
    // Update placeholders
    document.getElementById('assistant').placeholder = t('defaultAssistant');
    
    // Update labels
    document.getElementById('languageLabel').textContent = t('language');
    document.getElementById('assistantLabel').textContent = t('kelivoAssistantName');
    document.getElementById('serverUrlLabel').textContent = t('importServerUrl');
    
    // Update button
    document.getElementById('saveBtn').textContent = t('saveSettings');
    
    // Update usage steps
    document.getElementById('usageStepsTitle').textContent = t('usageSteps');
    document.getElementById('step1Title').textContent = t('step1Title');
    document.getElementById('step1Hint').textContent = t('step1Hint');
    document.getElementById('step2Title').textContent = t('step2Title');
    document.getElementById('step2Hint').textContent = t('step2Hint');
    document.getElementById('step3Title').textContent = t('step3Title');
    document.getElementById('step3Hint').textContent = t('step3Hint');
    
    // Update HTML lang attribute
    document.documentElement.lang = getLanguage() === 'zh' ? 'zh-CN' : 'en';
}

// Handle language change
function handleLanguageChange() {
    const language = document.getElementById('languageSelect').value;
    setLanguage(language);
    updateUILanguage();
    
    // Save language preference
    chrome.storage.sync.set({ language: language });
    
    // Notify content scripts about language change
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'languageChanged',
                language: language
            });
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadConfig();
    
    document.getElementById('saveBtn').addEventListener('click', saveConfig);
    document.getElementById('languageSelect').addEventListener('change', handleLanguageChange);
    
    // Save on Enter key
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveConfig();
            }
        });
    });
});


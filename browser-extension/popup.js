// ChatGPT to Kelivo - Popup Script

// 加载配置
function loadConfig() {
    chrome.storage.sync.get({
        defaultAssistant: '默认助手',
        serverUrl: 'http://localhost:8765'
    }, (items) => {
        document.getElementById('assistant').value = items.defaultAssistant;
        document.getElementById('serverUrl').value = items.serverUrl;
    });
}

// 保存配置
function saveConfig() {
    const assistant = document.getElementById('assistant').value.trim();
    const serverUrl = document.getElementById('serverUrl').value.trim();

    if (!assistant) {
        showStatus('请输入助手名称', 'error');
        return;
    }

    if (!serverUrl) {
        showStatus('请输入服务器地址', 'error');
        return;
    }

    chrome.storage.sync.set({
        defaultAssistant: assistant,
        serverUrl: serverUrl
    }, () => {
        showStatus('✅ 设置已保存', 'success');
    });
}

// 显示状态消息
function showStatus(message, type) {
    const statusEl = document.getElementById('status');
    statusEl.textContent = message;
    statusEl.className = `status ${type}`;

    setTimeout(() => {
        statusEl.className = 'status';
    }, 3000);
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    loadConfig();
    
    document.getElementById('saveBtn').addEventListener('click', saveConfig);
    
    // 回车保存
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveConfig();
            }
        });
    });
});


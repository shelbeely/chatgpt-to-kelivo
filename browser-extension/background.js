// ChatGPT to Kelivo - Background Service Worker
// 通过 HTTP 与本地导入服务器通信

// 监听来自 content script 的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'exportToKelivo') {
        handleExportToKelivo(request.data)
            .then(result => sendResponse({ success: true, result }))
            .catch(error => sendResponse({ success: false, error: error.message }));

        // 返回 true 表示异步响应
        return true;
    } else if (request.action === 'checkServer') {
        checkServerStatus()
            .then(result => sendResponse({ success: true, running: result.running }))
            .catch(error => sendResponse({ success: false, running: false, error: error.message }));

        // 返回 true 表示异步响应
        return true;
    }
});

// 处理导出到 Kelivo
async function handleExportToKelivo(data) {
    try {
        // 获取配置
        const config = await getConfig();

        // 发送到本地服务器
        const response = await fetch(`${config.serverUrl}/import`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                markdown: data.markdown,
                assistant: config.defaultAssistant || '默认助手',
                title: data.title
            })
        });

        if (!response.ok) {
            const error = await response.json();

            // 特殊处理 Kelivo 运行中的错误
            if (error.error === 'KELIVO_RUNNING') {
                throw new Error('KELIVO_RUNNING:' + (error.message || '请先关闭 Kelivo 应用'));
            }

            throw new Error(error.error || '导入失败');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('导出失败:', error);

        // 如果是网络错误，提示用户启动服务器
        if (error.message.includes('fetch')) {
            throw new Error('无法连接到 Kelivo 导入服务器\n\n请先运行: dart run tools/import_server.dart');
        }

        throw error;
    }
}

// 检查服务器状态
async function checkServerStatus() {
    try {
        const config = await getConfig();
        console.log('[Server Check] 开始检查服务器状态，URL:', config.serverUrl);

        // 方法1: 尝试 /health 端点
        console.log('[Server Check] 方法1: 尝试 /health 端点...');
        try {
            const healthController = new AbortController();
            const healthTimeoutId = setTimeout(() => {
                console.log('[Server Check] /health 请求超时');
                healthController.abort();
            }, 2000);

            const healthResponse = await fetch(`${config.serverUrl}/health`, {
                method: 'GET',
                signal: healthController.signal
            });

            clearTimeout(healthTimeoutId);
            console.log('[Server Check] /health 响应状态码:', healthResponse.status);

            // 如果返回 200，说明服务器支持 /health 端点
            if (healthResponse.ok) {
                console.log('[Server Check] ✅ 服务器支持 /health，检测成功');
                return { running: true };
            }

            console.log('[Server Check] /health 返回非 200，继续尝试 OPTIONS...');
        } catch (healthError) {
            console.log('[Server Check] /health 请求失败:', healthError.message);
            console.log('[Server Check] 继续尝试 OPTIONS...');
        }

        // 方法2: 尝试 OPTIONS 请求到 /import
        console.log('[Server Check] 方法2: 尝试 OPTIONS 请求到 /import...');
        try {
            const optionsController = new AbortController();
            const optionsTimeoutId = setTimeout(() => {
                console.log('[Server Check] OPTIONS 请求超时');
                optionsController.abort();
            }, 2000);

            const optionsResponse = await fetch(`${config.serverUrl}/import`, {
                method: 'OPTIONS',
                signal: optionsController.signal
            });

            clearTimeout(optionsTimeoutId);
            console.log('[Server Check] OPTIONS 响应状态码:', optionsResponse.status);
            console.log('[Server Check] ✅ 服务器响应了 OPTIONS，检测成功');

            // 只要服务器有响应（不管状态码），就认为服务器在运行
            return { running: true };
        } catch (optionsError) {
            console.log('[Server Check] OPTIONS 请求失败:', optionsError.message);
            console.log('[Server Check] ❌ 两种方法都失败，服务器未运行');
            // OPTIONS 也失败了，服务器未运行
            return { running: false };
        }
    } catch (error) {
        console.log('[Server Check] ❌ 检查过程出错:', error.message);
        // 获取配置失败或其他错误
        return { running: false };
    }
}

// 获取配置
async function getConfig() {
    return new Promise((resolve) => {
        chrome.storage.sync.get({
            defaultAssistant: '默认助手',
            serverUrl: 'http://localhost:8765'
        }, (items) => {
            resolve(items);
        });
    });
}

// 保存配置
async function saveConfig(config) {
    return new Promise((resolve) => {
        chrome.storage.sync.set(config, () => {
            resolve();
        });
    });
}

// 监听安装事件
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        console.log('ChatGPT to Kelivo 扩展已安装');

        // 设置默认配置
        saveConfig({
            defaultAssistant: '默认助手',
            serverUrl: 'http://localhost:8765'
        });
    }
});


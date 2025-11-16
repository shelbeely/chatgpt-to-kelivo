// 在 ChatGPT 控制台运行此脚本，检查复制按钮复制的内容格式

console.log('=== 检查复制按钮内容格式 ===\n');

// 监听复制事件
document.addEventListener('copy', (e) => {
    console.log('✅ 检测到复制事件！\n');
    
    // 获取所有可用的数据类型
    console.log('📋 剪贴板中所有可用的数据类型:');
    const types = e.clipboardData.types;
    types.forEach(type => {
        console.log(`  - ${type}`);
    });
    console.log('');
    
    // 获取纯文本
    const plainText = e.clipboardData.getData('text/plain');
    console.log('📝 纯文本内容:');
    console.log('长度:', plainText.length);
    console.log('前 200 字符:');
    console.log(plainText.substring(0, 200));
    console.log('');
    
    // 获取 HTML
    const html = e.clipboardData.getData('text/html');
    console.log('📄 HTML 内容:');
    if (html) {
        console.log('长度:', html.length);
        console.log('前 500 字符:');
        console.log(html.substring(0, 500));
        console.log('');
        
        // 检查 HTML 中是否有有用的标记
        console.log('🔍 HTML 中的标记:');
        if (html.includes('<strong>') || html.includes('<b>')) {
            console.log('  ✅ 包含粗体标记 <strong> 或 <b>');
        }
        if (html.includes('<em>') || html.includes('<i>')) {
            console.log('  ✅ 包含斜体标记 <em> 或 <i>');
        }
        if (html.includes('<code>')) {
            console.log('  ✅ 包含代码标记 <code>');
        }
        if (html.includes('<pre>')) {
            console.log('  ✅ 包含代码块标记 <pre>');
        }
        if (html.includes('<ul>') || html.includes('<ol>')) {
            console.log('  ✅ 包含列表标记 <ul> 或 <ol>');
        }
        if (html.includes('<a ')) {
            console.log('  ✅ 包含链接标记 <a>');
        }
        console.log('');
    } else {
        console.log('⚠️ 没有 HTML 内容\n');
    }
    
    // 检查纯文本中是否有 Markdown 语法
    console.log('🔍 纯文本中的 Markdown 语法:');
    if (plainText.includes('**')) {
        console.log('  ✅ 包含粗体标记 **');
    } else {
        console.log('  ❌ 不包含粗体标记 **');
    }
    if (plainText.includes('`')) {
        console.log('  ✅ 包含代码标记 `');
    } else {
        console.log('  ❌ 不包含代码标记 `');
    }
    if (plainText.includes('```')) {
        console.log('  ✅ 包含代码块标记 ```');
    } else {
        console.log('  ❌ 不包含代码块标记 ```');
    }
    if (plainText.match(/^[-*]\s/m)) {
        console.log('  ✅ 包含列表标记 - 或 *');
    } else {
        console.log('  ❌ 不包含列表标记 - 或 *');
    }
    if (plainText.match(/^\d+\.\s/m)) {
        console.log('  ✅ 包含有序列表标记 1. 2. 等');
    } else {
        console.log('  ❌ 不包含有序列表标记');
    }
    console.log('');
    
    // 尝试获取其他格式
    console.log('🔍 尝试获取其他格式:');
    const rtf = e.clipboardData.getData('text/rtf');
    if (rtf) {
        console.log('  ✅ 有 RTF 格式，长度:', rtf.length);
    } else {
        console.log('  ❌ 没有 RTF 格式');
    }
    
    const markdown = e.clipboardData.getData('text/markdown');
    if (markdown) {
        console.log('  ✅ 有 Markdown 格式，长度:', markdown.length);
        console.log('  内容:', markdown.substring(0, 200));
    } else {
        console.log('  ❌ 没有 Markdown 格式');
    }
    
    console.log('\n=== 检查完成 ===');
    console.log('结论：');
    if (html && html.length > 0) {
        console.log('✅ 可以使用 HTML 格式，需要将 HTML 转换为 Markdown');
    } else if (plainText.includes('**') || plainText.includes('```')) {
        console.log('✅ 纯文本包含 Markdown 语法，可以直接使用');
    } else {
        console.log('❌ 只有纯文本，没有格式信息');
        console.log('💡 建议：使用 DOM 提取方法，从页面 HTML 转换为 Markdown');
    }
});

console.log('👆 请手动点击一个 assistant 消息的复制按钮（选择包含粗体、代码、列表的消息）');
console.log('然后查看上面的输出\n');


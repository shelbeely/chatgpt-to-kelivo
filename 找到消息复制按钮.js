// 在 ChatGPT 控制台运行此脚本，找到消息级别的复制按钮

console.log('=== 查找消息复制按钮 ===\n');

// 获取第一条 assistant 消息
const messages = document.querySelectorAll('[data-message-author-role="assistant"]');
if (messages.length === 0) {
    console.log('❌ 未找到 assistant 消息');
} else {
    const msg = messages[0];
    console.log('✅ 找到第一条 assistant 消息\n');
    
    // 触发鼠标悬停，显示复制按钮
    msg.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    msg.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    
    setTimeout(() => {
        console.log('=== 分析消息结构 ===\n');
        
        // 查找所有包含 "复制" 的按钮
        const allButtons = msg.querySelectorAll('button');
        console.log(`消息中共有 ${allButtons.length} 个按钮\n`);
        
        const copyButtons = [];
        allButtons.forEach((btn, index) => {
            const ariaLabel = btn.getAttribute('aria-label') || '';
            const title = btn.getAttribute('title') || '';
            
            if (ariaLabel.includes('复制') || ariaLabel.includes('Copy') ||
                title.includes('复制') || title.includes('Copy')) {
                copyButtons.push({ index, button: btn, ariaLabel, title });
            }
        });
        
        console.log(`找到 ${copyButtons.length} 个复制按钮:\n`);
        
        copyButtons.forEach((item, i) => {
            console.log(`--- 复制按钮 ${i + 1} ---`);
            console.log(`  aria-label: ${item.ariaLabel}`);
            console.log(`  title: ${item.title}`);
            
            // 分析按钮的位置
            const btn = item.button;
            
            // 检查按钮的父元素层级
            let parent = btn.parentElement;
            let depth = 0;
            let foundContentBlock = false;
            
            while (parent && parent !== msg && depth < 10) {
                const tag = parent.tagName.toLowerCase();
                const className = parent.className || '';
                
                // 检查是否在内容块中
                if (tag === 'pre' || tag === 'code') {
                    console.log(`  ⚠️ 在 <${tag}> 中（代码块）`);
                    foundContentBlock = true;
                    break;
                }
                if (tag === 'table') {
                    console.log(`  ⚠️ 在 <table> 中（表格）`);
                    foundContentBlock = true;
                    break;
                }
                
                parent = parent.parentElement;
                depth++;
            }
            
            if (!foundContentBlock) {
                console.log(`  ✅ 不在内容块中 - 这可能是消息级别的复制按钮！`);
                
                // 显示按钮的 DOM 路径
                let pathParts = [];
                let p = btn.parentElement;
                let d = 0;
                while (p && p !== msg && d < 5) {
                    const tag = p.tagName.toLowerCase();
                    const classes = Array.from(p.classList).slice(0, 2).join('.');
                    pathParts.push(classes ? `${tag}.${classes}` : tag);
                    p = p.parentElement;
                    d++;
                }
                console.log(`  DOM 路径: button -> ${pathParts.join(' -> ')}`);
                
                // 测试点击这个按钮
                console.log(`  \n  🔥 测试点击这个按钮...`);
                window.testButton = btn;
                console.log(`  已保存到 window.testButton，你可以手动测试：`);
                console.log(`    window.testButton.click()`);
            }
            
            console.log('');
        });
        
        // 尝试在消息的父元素中查找
        console.log('\n=== 在消息的父元素中查找 ===\n');
        
        const parent1 = msg.parentElement;
        const parent2 = parent1?.parentElement;
        
        [parent1, parent2].forEach((parent, idx) => {
            if (!parent) return;
            
            console.log(`--- 父元素 ${idx + 1} ---`);
            const buttons = parent.querySelectorAll('button');
            console.log(`共有 ${buttons.length} 个按钮`);
            
            buttons.forEach((btn, i) => {
                const ariaLabel = btn.getAttribute('aria-label') || '';
                if (ariaLabel.includes('复制') || ariaLabel.includes('Copy')) {
                    console.log(`  按钮 ${i + 1}: aria-label="${ariaLabel}"`);
                    
                    // 检查这个按钮是否在消息元素外部
                    if (!msg.contains(btn)) {
                        console.log(`    ✅ 在消息元素外部 - 这可能是消息级别的复制按钮！`);
                        window.testButton2 = btn;
                        console.log(`    已保存到 window.testButton2`);
                    }
                }
            });
            console.log('');
        });
        
        console.log('\n=== 建议 ===');
        console.log('1. 查看上面标记为 "✅ 不在内容块中" 或 "✅ 在消息元素外部" 的按钮');
        console.log('2. 手动测试这些按钮：window.testButton.click() 或 window.testButton2.click()');
        console.log('3. 看看点击后复制的内容是整个消息还是只是代码块');
        console.log('4. 把测试结果告诉我！');
        
    }, 500);
}


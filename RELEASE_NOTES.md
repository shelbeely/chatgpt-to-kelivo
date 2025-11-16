# ChatGPT to Kelivo Exporter v1.0.0

## 🎉 首个正式版本

将 ChatGPT 对话一键导出到 Kelivo 本地聊天应用！

## ✨ 主要功能

- ✅ **一键导出**：在 ChatGPT 页面点击按钮即可导出对话
- ✅ **完整内容**：通过复制按钮获取完整的对话内容
- ✅ **Markdown 格式**：保留粗体、代码块、列表等格式
- ✅ **本地导入**：自动导入到 Kelivo 应用
- ✅ **自定义助手名**：可配置 Kelivo 中的助手名称

## 📦 安装包内容

- `kelivo_import_server.exe` - Kelivo 导入服务器
- `browser-extension/` - Chrome 浏览器扩展

## 🚀 快速开始

### 1. 前置要求

- 安装 [Kelivo](https://github.com/Chevey339/kelivo) 本地聊天应用
- Chrome 或基于 Chromium 的浏览器

### 2. 安装步骤

1. 解压 `chatgpt-to-kelivo-v1.0.0.zip`
2. 双击运行 `kelivo_import_server.exe`（服务器会在后台运行）
3. 在 Chrome 中访问 `chrome://extensions/`
4. 开启"开发者模式"
5. 点击"加载已解压的扩展程序"，选择 `browser-extension` 文件夹
6. 点击扩展图标，输入 Kelivo 的助手名字并保存

### 3. 使用方法

1. 访问 https://chatgpt.com 并打开任意对话
2. 点击页面右上角的"导出到 Kelivo"按钮
3. 等待导出完成
4. 在 Kelivo 中查看导入的对话

## ⚠️ 重要提示

首次使用时，浏览器会弹出请求复制权限的提示。此时导出会失败，这是正常现象。请允许权限后，**重新点击导出按钮**即可成功导出。

## 💡 提示

如果你之前使用过 Cherry Studio，可以将 Cherry Studio 的数据完全迁移到 Kelivo，所有信息都可以无缝导入。

## 📝 更新日志

### v1.0.0 (2025-11-16)

- 🎉 首个正式版本发布
- ✨ 支持通过复制按钮获取完整对话内容
- ✨ 支持 Markdown 格式转换
- ✨ 支持自定义助手名称
- ✨ 优化复制按钮查找逻辑，优先查找消息级别的复制按钮
- 🐛 修复代码块复制按钮误识别问题

## 🔗 相关链接

- **项目主页**: https://github.com/lyw123www/chatgpt-to-kelivo
- **Kelivo 项目**: https://github.com/Chevey339/kelivo
- **问题反馈**: https://github.com/lyw123www/chatgpt-to-kelivo/issues

## 📄 许可证

MIT License


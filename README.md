# ChatGPT to Kelivo 导出工具

将 ChatGPT 对话导出到 Kelivo 本地聊天应用的浏览器扩展。

## 安装步骤

### 1. 安装浏览器扩展

1. 打开 Chrome 浏览器，访问 `chrome://extensions/`
2. 打开右上角的"开发者模式"
3. 点击"加载已解压的扩展程序"
4. 选择 `browser-extension` 文件夹
5. 扩展安装完成

### 2. 启动 Kelivo 导入服务器

双击运行 `kelivo_import_server.exe`

服务器会在后台运行，监听 `http://localhost:3000`

## 使用方法

1. **启动服务器**：运行 `kelivo_import_server.exe`
2. **打开 ChatGPT**：访问 https://chatgpt.com 并打开任意对话
3. **点击导出按钮**：页面右上角会出现"导出到 Kelivo"按钮
4. **等待导出完成**：扩展会自动提取对话内容并发送到 Kelivo
5. **查看导出结果**：导出的 Markdown 文件会保存在 Kelivo 的导入目录中

## 功能特点

- ✅ 自动提取完整对话内容
- ✅ 保留 Markdown 格式（粗体、代码块、列表等）
- ✅ 支持嵌套列表和复杂格式
- ✅ 一键导出到 Kelivo

## 技术说明

### 工作原理

1. **内容提取**：通过模拟点击复制按钮获取 HTML 格式的对话内容
2. **格式转换**：将 HTML 转换为 Markdown 格式
3. **本地导入**：通过本地服务器将 Markdown 文件导入到 Kelivo

### 文件结构

```
.
├── browser-extension/          # Chrome 浏览器扩展
│   ├── manifest.json          # 扩展配置文件
│   ├── content.js             # 内容脚本（提取和转换）
│   ├── background.js          # 后台脚本
│   ├── popup.html/js          # 弹出窗口
│   ├── content.css            # 样式文件
│   └── icons/                 # 图标文件
├── kelivo_import_server.exe   # Kelivo 导入服务器
└── README.md                  # 本文件
```

## 常见问题

### 1. 导出按钮不显示

- 确保扩展已正确安装并启用
- 刷新 ChatGPT 页面

### 2. 导出失败

- 确保 `kelivo_import_server.exe` 正在运行
- 检查控制台是否有错误信息（按 F12 打开）

### 3. 内容不完整

- 等待页面完全加载后再点击导出
- 确保对话已完全展开（没有折叠的内容）

### 4. 格式不正确

- 扩展会自动将 HTML 转换为 Markdown
- 如果格式有问题，请检查 Kelivo 的 Markdown 渲染设置

## 系统要求

- **浏览器**：Chrome 或基于 Chromium 的浏览器（Edge、Brave 等）
- **操作系统**：Windows（`kelivo_import_server.exe` 仅支持 Windows）
- **Kelivo**：需要安装 Kelivo 本地聊天应用

## 许可证

MIT License

## 支持

如有问题或建议，请联系开发者。


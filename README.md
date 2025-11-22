# ChatGPT 导出工具

一个强大的浏览器扩展，可以将 ChatGPT 对话导出到多个本地应用。支持三种导出模式，满足不同的使用需求。

> ⚠️ **重要提示**：首次使用时，浏览器会弹出请求复制权限的提示。此时导出会失败，这是正常现象。请允许权限后，**重新点击导出按钮**即可成功导出。

## � 安装步骤

### 1. 下载安装包

从 [Releases](https://github.com/lyw123www/chatgpt-to-kelivo/releases/tag/v1.0.0) 下载最新版本并解压。

### 2. 安装浏览器扩展

1. 打开 Chrome 浏览器，访问 `chrome://extensions/`
2. 打开右上角的"开发者模式"
3. 点击"加载已解压的扩展程序"
4. 选择 `browser-extension` 文件夹
5. 扩展安装完成
6. 点击扩展图标，配置助手名称和服务器地址

![扩展配置界面](images/image.png)

7. **填写助手名称**（模式 2 和模式 3 需要用到）
   - **Kelivo 助手名称**：导出到 Kelivo 时使用的助手名称
   - **Cherry Studio 助手名称**：导出到 Cherry Studio 时使用的助手名称
   - 点击"保存设置"完成配置

---

## 🎯 三种导出模式

### 模式 1️⃣：导出为 MD 文件（推荐首选）

**使用步骤**：
1. 打开 ChatGPT 对话
2. 点击页面右侧的 **🟢 绿色"导出为 MD"按钮**
3. 文件会自动下载到本地

### 模式 2️⃣：导出到 Kelivo

**前置要求**：
- 安装 [Kelivo](https://github.com/Chevey339/kelivo) 本地应用
- 运行 `kelivo_import_server.exe` 启动导入服务器

- ✅ **已在扩展设置中填写 Kelivo 助手名称**（见安装步骤第 7 步）

**使用步骤**：
1. **启动服务器**：双击运行 `kelivo_import_server.exe`

2. **关闭 Kelivo 应用**：⚠️ 这一步很重要

3. **打开 ChatGPT 对话**：访问 https://chatgpt.com

4. **点击导出按钮**：页面右侧会出现 **🟣 紫色"导出到 Kelivo"按钮**

5. **查看结果**：打开 Kelivo 应用查看导入的对话,可以继续对话

**故障排查**：
- ❌ 提示"服务器未运行"？→ 检查是否启动了 `kelivo_import_server.exe`
- ❌ 提示"Kelivo 应用正在运行"？→ 关闭 Kelivo 应用后重试
- ❌ 导入失败？→ 检查扩展设置中是否正确填写了 Kelivo 助手名称

---

### 模式 3️⃣：导出到 Cherry Studio

**前置要求**：
- 已安装 Cherry Studio
- 已完成**模式 1**（导出 MD 文件）
- ✅ **已在扩展设置中填写 Cherry Studio 助手名称**（见安装步骤第 7 步）

**使用步骤**：

#### 第一步：导出 MD 文件
按照**模式 1**的步骤导出 MD 文件，记住文件保存位置。

#### 第二步：首次运行 cherry-import.exe（仅需一次）

1. **双击运行 `cherry-import.exe`**

2. **填写 Cherry Studio 安装地址**

   ![Cherry Studio 安装地址配置](images/image%20copy.png)

   - 选择 Cherry Studio 的安装目录
   - 点击确认

#### 第三步：再次运行 cherry-import.exe

1. **双击运行 `cherry-import.exe`**

2. **会弹出 ChatGPT 文件夹选择窗口**

   ![ChatGPT 文件夹选择](images/image%20copy%202.png)

3. **选择导出的MD文件粘贴放入 ChatGPT 文件夹**

#### 第四步：自动导入和清理

> ⚠️ **重要**：cherry-import.exe 会持续运行在后台

**cherry-import.exe 的工作流程**：

1. **持续监控 ChatGPT 文件夹**

2. **自动导入 MD 文件**
   - 当新的 MD 文件放入 ChatGPT 文件夹时,cherry-import.exe 自动检测到


3. **自动删除已导入的 MD 文件**
   - 导入完成后，cherry-import.exe 会自动删除该 MD 文件
![Cherry Studio 导入结果](images/image%20copy%203.png)

# ChatGPT Export Tool

A powerful browser extension that exports ChatGPT conversations to multiple local applications. Supports three export modes to meet different usage needs.

> ⚠️ **Important Note**: On first use, the browser will prompt for clipboard permissions. The export will fail at this point, which is normal. Please grant the permission, then **click the export button again** to successfully export.

## 📦 Installation Steps

### 1. Download the Package

Download the latest version from [Releases](https://github.com/lyw123www/chatgpt-to-kelivo/releases/tag/v1.1.2) and extract it.

### 2. Install the Browser Extension

1. Open Chrome browser and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked"
4. Select the `browser-extension` folder
5. Extension installation complete
6. Click the extension icon to configure assistant name and server address

![Extension Settings Interface](images/image.png)

7. **Enter Assistant Name** (Required for Mode 2 and Mode 3)
   - **Kelivo Assistant Name**: The assistant name used when exporting to Kelivo
   - **Cherry Studio Assistant Name**: The assistant name used when exporting to Cherry Studio
   - Click "Save Settings" to complete the configuration

---

## 🎯 Three Export Modes

### Mode 1️⃣: Export as MD File (Recommended)

**Steps**:
1. Open a ChatGPT conversation
2. Click the **🟢 green "Export as MD" button** on the right side of the page
3. The file will automatically download to your local machine

### Mode 2️⃣: Export to Kelivo

**Prerequisites**:
- Install the [Kelivo](https://github.com/Chevey339/kelivo) local application
- Run `kelivo_import_server.exe` to start the import server

- ✅ **Kelivo assistant name has been configured in extension settings** (See installation step 7)

**Steps**:
1. **Start the server**: Double-click to run `kelivo_import_server.exe`

2. **Close the Kelivo application**: ⚠️ This step is important

3. **Open a ChatGPT conversation**: Visit https://chatgpt.com

4. **Click the export button**: A **🟣 purple "Export to Kelivo" button** will appear on the right side of the page

5. **View the result**: Open the Kelivo application to view the imported conversation and continue chatting

**Troubleshooting**:
- ❌ Getting "Server not running"? → Check if `kelivo_import_server.exe` is running
- ❌ Getting "Kelivo application is running"? → Close the Kelivo application and try again
- ❌ Import failed? → Check if the Kelivo assistant name is correctly configured in extension settings

---

### Mode 3️⃣: Export to Cherry Studio

**Prerequisites**:
- Cherry Studio is installed
- Completed **Mode 1** (Export MD file)
- ✅ **Cherry Studio assistant name has been configured in extension settings** (See installation step 7)

**Steps**:

#### Step 1: Export MD File
Follow the steps in **Mode 1** to export an MD file, and remember the file save location.

#### Step 2: First Run of cherry-import.exe (One-time only)

1. **Double-click to run `cherry-import.exe`**

2. **Enter Cherry Studio installation path**

   ![Cherry Studio Installation Path Configuration](images/image%20copy.png)

   - Select the Cherry Studio installation directory
   - Click Confirm

#### Step 3: Run cherry-import.exe Again

1. **Double-click to run `cherry-import.exe`**

2. **A ChatGPT folder selection window will appear**

   ![ChatGPT Folder Selection](images/image%20copy%202.png)

3. **Paste the exported MD files into the ChatGPT folder**

---

**The following will run automatically, no action required**:

#### Step 4: Automatic Import and Cleanup

> ⚠️ **Important**: cherry-import.exe will continue running in the background

**The following will run automatically, no action required**:

> 📌 **Automatic Workflow** (No manual intervention needed)
>
> 1. **Continuous monitoring of the ChatGPT folder**
>    - cherry-import.exe runs continuously in the background
>    - Real-time monitoring of the specified ChatGPT folder
>
> 2. **Automatic import of MD files**
>    - When new MD files are placed in the ChatGPT folder
>    - cherry-import.exe automatically detects them
>    - Automatically imports to Cherry Studio
>
> 3. **Automatic deletion of imported MD files**
>    - After import is complete, cherry-import.exe automatically deletes the MD file
>    - Keeps the ChatGPT folder clean

![Cherry Studio Import Result](images/image%20copy%203.png)

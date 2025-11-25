# Browser Extension Installation

This guide walks you through installing the ChatGPT to Kelivo browser extension.

## Supported Browsers

| Browser | Support Level |
|---------|--------------|
| Chrome | ✅ Full support |
| Edge | ✅ Full support |
| Brave | ✅ Full support |
| Opera | ✅ Full support |
| Firefox | ⚠️ Limited support |

## Installation Steps

### Step 1: Download the Extension

**Option A: Download ZIP**

1. Go to the [GitHub repository](https://github.com/shelbeely/chatgpt-to-kelivo)
2. Click **Code** → **Download ZIP**
3. Extract the ZIP file

**Option B: Clone with Git**

```bash
git clone https://github.com/shelbeely/chatgpt-to-kelivo.git
```

### Step 2: Open Extensions Page

Open your browser's extension management page:

- **Chrome**: `chrome://extensions/`
- **Edge**: `edge://extensions/`
- **Brave**: `brave://extensions/`
- **Opera**: `opera://extensions/`

### Step 3: Enable Developer Mode

1. Find the **Developer mode** toggle
2. Turn it **ON**

![Developer mode toggle location](../images/developer-mode.png)

### Step 4: Load the Extension

1. Click **Load unpacked** button
2. Navigate to the downloaded repository
3. Select the `browser-extension` folder
4. Click **Select Folder** (or **Open** on Mac)

### Step 5: Verify Installation

You should see:

- The extension card in your extensions page
- The extension icon in your browser toolbar
- No error messages on the extension card

## Initial Configuration

### Open Extension Settings

1. Click the extension icon in your toolbar
2. Or right-click and select **Options**

### Configure Settings

1. **Assistant Name**: Enter the name for your AI assistant in [Kelivo](https://github.com/Chevey339/kelivo)
2. **Server URL**: Keep the default `http://localhost:8765` unless you've changed it
3. **Language**: Select your preferred language
4. Click **Save Settings**

## Testing the Extension

1. Go to [chatgpt.com](https://chatgpt.com)
2. Log in and open any conversation
3. Look for the export buttons on the right side:
   - 🟣 Purple button: Export to Kelivo
   - 🟢 Green button: Export as MD

## Granting Permissions

On first use, you may be prompted for permissions:

### Clipboard Permission
- Required for copying conversation content
- Click **Allow** when prompted
- If export fails, retry after granting permission

## Troubleshooting

### Extension Not Visible
1. Check that Developer mode is enabled
2. Try clicking the puzzle icon in toolbar
3. Pin the extension for easy access

### "Extension not loaded" Error
1. Verify you selected the `browser-extension` folder
2. Check for syntax errors in the extension card
3. Try reloading the extension

### Buttons Don't Appear on ChatGPT
1. Refresh the ChatGPT page
2. Make sure you're on a conversation page
3. Check that the extension is enabled

### Permission Denied
1. Click the extension icon
2. Grant any requested permissions
3. Reload the ChatGPT page

## Updating the Extension

1. Download/pull the latest version
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card

Or:

1. Remove the extension
2. Re-add following the installation steps

## Uninstalling

1. Go to `chrome://extensions/`
2. Find the ChatGPT to Kelivo extension
3. Click **Remove**
4. Confirm removal

## Next Steps

- [Export Modes](export-modes.md) - Learn about the three export options
- [Standalone Converter](../standalone-tool/overview.md) - Alternative for mobile users

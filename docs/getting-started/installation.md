# Installation Guide

This guide covers all installation options for ChatGPT to Kelivo tools.

## Standalone Web Converter

**No installation required!** The standalone converter runs directly in your browser.

### Option 1: Download the Repository

1. Download the repository from [GitHub](https://github.com/shelbeely/chatgpt-to-kelivo)
2. Extract the ZIP file
3. Navigate to `standalone-tool/`
4. Open `index.html` in any web browser

### Option 2: Clone with Git

```bash
git clone https://github.com/shelbeely/chatgpt-to-kelivo.git
cd chatgpt-to-kelivo/standalone-tool
# Open index.html in your browser
```

### Option 3: Host on a Web Server

You can host the standalone converter on any web server:

1. Upload the `standalone-tool/` folder to your server
2. Access via your server's URL

## Browser Extension

The browser extension requires manual installation in developer mode.

### Chrome / Chromium-based Browsers

1. Download or clone the repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top-right corner)
4. Click **Load unpacked**
5. Select the `browser-extension` folder
6. The extension icon should appear in your toolbar

### Edge

1. Open Edge and navigate to `edge://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `browser-extension` folder

### Firefox

!!! warning "Limited Support"
    The extension is designed for Chrome/Chromium. Firefox compatibility may vary.

1. Open Firefox and navigate to `about:debugging`
2. Click **This Firefox**
3. Click **Load Temporary Add-on**
4. Select any file in the `browser-extension` folder

## Kelivo Application

To use the exported conversations, you need [Kelivo](https://github.com/Chevey339/kelivo) installed:

1. Visit the [Kelivo repository](https://github.com/Chevey339/kelivo)
2. Follow the installation instructions for your platform
3. Launch Kelivo
4. Import your converted `.md` files

## Import Server (Optional)

For direct export to Kelivo (Mode 2), you need the import server:

1. Locate `kelivo_import_server.exe` in the repository
2. Double-click to run
3. Keep the window open while exporting

!!! note "Windows Only"
    The import server executable is currently Windows-only. Mac and Linux users should use the standalone converter.

## Verifying Installation

### Standalone Converter
1. Open `standalone-tool/index.html`
2. You should see the converter interface
3. Try selecting a language from the dropdown

### Browser Extension
1. Visit [chatgpt.com](https://chatgpt.com)
2. Open any conversation
3. Look for export buttons on the right side of the page

## Updating

### Standalone Converter
Simply download the latest version and replace your files.

### Browser Extension
1. Download the latest version
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Or remove and re-add the extension

## Troubleshooting Installation

### Extension Not Loading
- Ensure Developer mode is enabled
- Check that you selected the correct folder
- Look for error messages in the extension card

### Converter Page is Blank
- Try a different browser
- Check that JavaScript is enabled
- Clear browser cache and reload

### Import Server Won't Start
- Check Windows Defender or antivirus
- Run as Administrator if needed
- Ensure no other application is using port 8765

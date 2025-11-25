# Browser Extension Overview

The browser extension provides one-click export functionality directly from ChatGPT conversations.

## Features

- **One-click export** - Export conversations with a single click
- **Multiple export modes** - Export to [Kelivo](https://github.com/Chevey339/kelivo), Cherry Studio, or as Markdown files
- **Real-time processing** - Export conversations as you browse
- **Multi-language support** - Interface available in 9 languages

## Export Modes

The extension provides three export modes:

### Mode 1: Export as Markdown File
- Exports the current conversation as a `.md` file
- Downloads directly to your computer
- No server required

### Mode 2: Export to Kelivo
- Sends conversation directly to [Kelivo](https://github.com/Chevey339/kelivo)
- Requires the import server to be running
- Kelivo application must be closed during import

### Mode 3: Export to Cherry Studio
- Exports for Cherry Studio compatibility
- Uses the Markdown export as a base
- Automatic import with the cherry-import tool

## Requirements

- Chrome, Edge, or other Chromium-based browser
- ChatGPT account
- [Kelivo](https://github.com/Chevey339/kelivo) (for Mode 2) or Cherry Studio (for Mode 3)

## Interface

Once installed, the extension adds:

- **Purple button** - Export to Kelivo
- **Green button** - Export as Markdown file
- **Popup settings** - Configure assistant names and server URL

## Limitations

- Desktop browsers only (Chrome, Edge, etc.)
- Requires manual installation in developer mode
- Some features require additional software (import server)

## When to Use

Choose the browser extension when:

- ✅ You're on a desktop computer
- ✅ You want real-time, one-click exports
- ✅ You're exporting conversations one at a time
- ✅ You want direct integration with Kelivo

Consider the [Standalone Converter](../standalone-tool/overview.md) when:

- 📱 You're on a mobile device
- 📦 You want to bulk convert many conversations
- 🌐 You prefer no installation

## Next Steps

- [Installation Guide](installation.md)
- [Export Modes Details](export-modes.md)
- [Standalone Converter](../standalone-tool/overview.md) (alternative)

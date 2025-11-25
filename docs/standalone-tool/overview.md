# Standalone Web Converter

The Standalone Web Converter is a browser-based tool that converts ChatGPT exports to [Kelivo](https://github.com/Chevey339/kelivo)-compatible format without requiring any installation.

## Key Features

### 📱 Mobile-Friendly
- Works perfectly on phones, tablets, and desktops
- Responsive design adapts to any screen size
- Touch-friendly interface

### 🚀 No Installation Required
- Just open the HTML file in any web browser
- No server, no dependencies, no setup
- Works offline after initial page load

### 🔒 Privacy-First
- All processing happens locally in your browser
- Your data never leaves your device
- No server uploads, no cloud storage

### 🌍 Multi-Language Support
- English
- 中文 (Chinese)
- Español (Spanish)
- Français (French)
- Deutsch (German)
- Português (Portuguese)
- 日本語 (Japanese)
- 한국어 (Korean)

## How It Works

1. **Upload** - Select your ChatGPT export ZIP file or conversations.json
2. **Configure** - Optionally set your preferred assistant name
3. **Convert** - Click the convert button to process all conversations
4. **Download** - Get individual files or download all as a ZIP

## Supported Input Formats

| Format | Description | Recommended |
|--------|-------------|-------------|
| ZIP | Full ChatGPT export archive | ✅ Yes |
| JSON | Raw conversations.json file | ✅ Yes |

## Output Format

The converter generates Kelivo-compatible markdown files with:

- YAML frontmatter containing metadata
- Role-labeled message headers
- Proper content formatting
- Unique topic identifiers

### Example Output

```markdown
---
assistantName: My Assistant
topicId: topic_1234567890_abc123
topicName: Conversation Title
---

## 🧑‍💻 User

Hello, how are you?

## 🤖 Assistant

I'm doing great, thank you for asking! How can I help you today?
```

## Browser Compatibility

The converter works in all modern browsers:

- ✅ Chrome/Chromium (version 80+)
- ✅ Firefox (version 75+)
- ✅ Safari (version 13+)
- ✅ Edge (version 80+)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Next Steps

- [Usage Guide](usage.md) - Detailed instructions for using the converter
- [Mobile Usage](mobile.md) - Tips for using on mobile devices
- [Troubleshooting](troubleshooting.md) - Common issues and solutions

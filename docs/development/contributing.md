# Contributing

Thank you for your interest in contributing to ChatGPT to Kelivo! This guide will help you get started.

## Code of Conduct

Please be respectful and constructive in all interactions. We welcome contributors of all skill levels.

## Ways to Contribute

### 🐛 Report Bugs

1. Check [existing issues](https://github.com/shelbeely/chatgpt-to-kelivo/issues) first
2. Open a new issue with:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/device information
   - Screenshots if applicable

### 💡 Suggest Features

1. Check existing issues and discussions
2. Open a feature request issue
3. Describe the use case and benefits
4. Be open to discussion and alternatives

### 📝 Improve Documentation

- Fix typos or unclear explanations
- Add examples or screenshots
- Translate documentation
- Update outdated information

### 💻 Contribute Code

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Development Setup

### Prerequisites

- Git
- Modern web browser
- Text editor or IDE
- (Optional) Python for MkDocs

### Clone the Repository

```bash
git clone https://github.com/shelbeely/chatgpt-to-kelivo.git
cd chatgpt-to-kelivo
```

### Project Structure

```
chatgpt-to-kelivo/
├── browser-extension/     # Chrome extension files
│   ├── manifest.json     # Extension manifest
│   ├── background.js     # Service worker
│   ├── content.js        # Content script
│   ├── popup.html        # Settings popup
│   └── ...
├── standalone-tool/       # Web converter
│   └── index.html        # Single-file converter
├── docs/                  # Documentation
│   └── ...
├── mkdocs.yml            # Documentation config
├── LICENSE               # MIT License
└── README.md             # Project readme
```

### Running Locally

**Browser Extension**:
1. Open `chrome://extensions/`
2. Enable Developer mode
3. Load unpacked → select `browser-extension/`

**Standalone Converter**:
1. Open `standalone-tool/index.html` in a browser

**Documentation**:
```bash
pip install mkdocs mkdocs-material
mkdocs serve
```

## Coding Guidelines

### General

- Write clear, commented code
- Follow existing code style
- Keep changes focused and minimal
- Test your changes thoroughly

### JavaScript

- Use modern ES6+ syntax
- Add JSDoc comments for functions
- Handle errors gracefully
- Avoid external dependencies when possible

### HTML/CSS

- Use semantic HTML
- Keep CSS organized and commented
- Ensure mobile responsiveness
- Test across browsers

### Documentation

- Use clear, concise language
- Include code examples where helpful
- Update related docs when making changes
- Follow MkDocs/Markdown conventions

## Pull Request Process

1. **Fork and Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Keep commits focused
   - Write clear commit messages
   - Reference issues if applicable

3. **Test**
   - Test in multiple browsers
   - Test on mobile (for standalone converter)
   - Verify documentation builds

4. **Submit PR**
   - Describe your changes clearly
   - Link related issues
   - Be responsive to feedback

## Adding Translations

The tools support multiple languages. To add a new language:

### Standalone Converter

1. Open `standalone-tool/index.html`
2. Find the `translations` object
3. Add your language code and translations:
   ```javascript
   translations.xx = {
       pageTitle: 'Your translation...',
       // ... all keys
   };
   ```
4. Add option to language selector HTML

### Browser Extension

1. Edit `browser-extension/i18n.js`
2. Add translations to the `translations` object
3. Update `popup.html` language selector

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

- Open an issue for general questions
- Check existing documentation
- Review closed issues for past discussions

Thank you for contributing! 🎉

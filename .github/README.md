# GitHub Actions for ChatGPT to Kelivo

This directory contains GitHub Actions workflows and scripts for converting ChatGPT conversations to Kelivo format.

## Convert to Kelivo Action

The `convert-to-kelivo.yml` workflow provides an automated way to convert ChatGPT conversations.json files to Kelivo-compatible markdown format.

### How to Use

1. **Upload your conversations.json file**
   - Export your data from ChatGPT
   - Extract the `conversations.json` file from the ZIP
   - Commit it to your repository (e.g., in the root or a `data/` folder)

2. **Run the workflow**
   - Go to the **Actions** tab in your GitHub repository
   - Select **Convert ChatGPT to Kelivo** from the workflow list
   - Click **Run workflow**
   - Enter the path to your `conversations.json` file
   - (Optional) Customize the assistant name
   - Click **Run workflow**

3. **Download the converted files**
   - Wait for the workflow to complete
   - Go to the workflow run page
   - Download the artifacts:
     - `kelivo-conversations` - Individual markdown files
     - `kelivo-conversations-zip` - All files in a ZIP archive

### Workflow Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `conversations_file` | Path to conversations.json file (relative to repo root) | Yes | `conversations.json` |
| `assistant_name` | Assistant name for Kelivo | No | `ChatGPT Assistant` |

### Example

```yaml
# Workflow run with custom inputs
conversations_file: data/my-export/conversations.json
assistant_name: My AI Helper
```

### Output

The workflow produces Kelivo-compatible markdown files with:

- YAML frontmatter containing metadata
- Role-labeled message headers (🧑‍💻 User, 🤖 Assistant)
- Proper content formatting
- Unique topic identifiers

Example output:

```markdown
---
assistantName: "ChatGPT Assistant"
topicId: topic_1234567890_abc123
topicName: "How to use Python"
---

## 🧑‍💻 User

How do I use Python?

## 🤖 Assistant

Python is a versatile programming language...
```

### Local Testing

You can also run the conversion script locally:

```bash
# Install dependencies
npm install jszip

# Run the converter
CONVERSATIONS_FILE=conversations.json ASSISTANT_NAME="My Assistant" node .github/scripts/convert-to-kelivo.js
```

The converted files will be saved in the `output/` directory.

## Files

- `workflows/convert-to-kelivo.yml` - GitHub Actions workflow definition
- `scripts/convert-to-kelivo.js` - Node.js conversion script

## Related

- [Standalone Web Converter](../standalone-tool/index.html) - Browser-based converter (no server needed)
- [Browser Extension](../browser-extension/) - Chrome extension for one-click exports
- [Kelivo](https://github.com/Chevey339/kelivo) - The local AI assistant application

# GitHub Action Configuration

This guide explains how to customize the GitHub Action workflow for your needs.

## Workflow Inputs

The workflow accepts two inputs that can be configured when running manually:

### conversations_file

- **Type**: String
- **Required**: Yes
- **Default**: `conversations.json`
- **Description**: Path to the conversations.json file relative to repository root

**Examples**:
```yaml
conversations_file: conversations.json              # Root of repo
conversations_file: data/conversations.json         # In data folder
conversations_file: exports/2024-01/conversations.json  # Dated folder
```

### assistant_name

- **Type**: String
- **Required**: No
- **Default**: `ChatGPT Assistant`
- **Description**: Name to use for the AI assistant in Kelivo

**Examples**:
```yaml
assistant_name: ChatGPT Assistant    # Default
assistant_name: My AI Helper         # Custom
assistant_name: GPT-4 Conversations  # Model-specific
assistant_name: 研究助手              # Non-English
```

## Workflow File Structure

The workflow file is located at `.github/workflows/convert-to-kelivo.yml`:

```yaml
name: Convert ChatGPT to Kelivo

on:
  workflow_dispatch:
    inputs:
      conversations_file:
        description: 'Path to conversations.json'
        required: true
        default: 'conversations.json'
      assistant_name:
        description: 'Assistant name for Kelivo'
        required: false
        default: 'ChatGPT Assistant'

jobs:
  convert:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm install jszip
      
      - name: Convert conversations
        run: node .github/scripts/convert-to-kelivo.js
        env:
          CONVERSATIONS_FILE: ${{ github.event.inputs.conversations_file }}
          ASSISTANT_NAME: ${{ github.event.inputs.assistant_name }}
      
      - name: Upload converted files
        uses: actions/upload-artifact@v4
        with:
          name: kelivo-conversations
          path: output/*.md
          retention-days: 30
      
      - name: Create ZIP archive
        run: |
          cd output
          zip -r ../kelivo-conversations.zip *.md
      
      - name: Upload ZIP artifact
        uses: actions/upload-artifact@v4
        with:
          name: kelivo-conversations-zip
          path: kelivo-conversations.zip
          retention-days: 30
```

## Customization Options

### Change Artifact Retention

Modify the `retention-days` value (1-90 days):

```yaml
- name: Upload converted files
  uses: actions/upload-artifact@v4
  with:
    name: kelivo-conversations
    path: output/*.md
    retention-days: 7  # Changed from 30 to 7 days
```

### Add Scheduled Runs

Run the workflow automatically on a schedule:

```yaml
on:
  workflow_dispatch:
    inputs:
      # ... existing inputs
  
  schedule:
    - cron: '0 0 1 * *'  # Monthly on the 1st at midnight UTC
```

Cron schedule examples:
- `0 0 * * 0` - Weekly on Sunday
- `0 0 * * MON` - Weekly on Monday
- `0 0 1 * *` - Monthly on the 1st
- `0 0 1 1 *` - Yearly on January 1st

### Trigger on Push

Auto-convert when conversations.json is pushed:

```yaml
on:
  workflow_dispatch:
    # ... existing inputs
  
  push:
    paths:
      - 'conversations.json'
      - 'data/*/conversations.json'
```

### Use Different Node.js Version

Change the Node.js runtime version:

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '18'  # Changed from '20' to '18'
```

### Modify Output Directory

Edit `.github/scripts/convert-to-kelivo.js`:

```javascript
// Change this line
const outputDir = path.join(process.cwd(), 'output');

// To this
const outputDir = path.join(process.cwd(), 'kelivo-exports');
```

### Add Notification

Send notification when conversion completes:

```yaml
- name: Notify completion
  if: success()
  run: |
    echo "Conversion completed successfully!"
    # Add your notification logic here
    # E.g., send email, Slack message, etc.
```

### Upload to Release

Automatically attach converted files to a GitHub release:

```yaml
- name: Upload to Release
  if: startsWith(github.ref, 'refs/tags/')
  uses: softprops/action-gh-release@v1
  with:
    files: kelivo-conversations.zip
```

## Script Configuration

The conversion script (`.github/scripts/convert-to-kelivo.js`) can be modified:

### Change Filename Format

Modify the filename generation:

```javascript
// Current format
const filename = `${safeTitle}_${timestamp.getTime()}.md`;

// Alternative formats
const filename = `${safeTitle}.md`;  // No timestamp
const filename = `${timestamp.toISOString()}_${safeTitle}.md`;  // ISO date
const filename = `conv_${i+1}_${safeTitle}.md`;  // Numbered
```

### Customize YAML Frontmatter

Add or modify frontmatter fields:

```javascript
let markdown = `---
assistantName: ${escapeYamlValue(assistantName)}
topicId: ${topicId}
topicName: ${escapeYamlValue(title)}
exportDate: ${new Date().toISOString()}
messageCount: ${messages.length}
---
`;
```

### Filter Conversations

Skip conversations based on criteria:

```javascript
function convertConversation(conv, assistantName) {
    // Skip conversations with specific titles
    if (conv.title && conv.title.includes('Test')) {
        return null;
    }
    
    // Skip old conversations
    if (conv.create_time < Date.now() / 1000 - 365 * 24 * 60 * 60) {
        return null;
    }
    
    // ... rest of function
}
```

## Environment Variables

The script uses these environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `CONVERSATIONS_FILE` | Path to conversations.json | Yes |
| `ASSISTANT_NAME` | Assistant name for Kelivo | No (defaults to "ChatGPT Assistant") |

You can add custom environment variables:

```yaml
- name: Convert conversations
  run: node .github/scripts/convert-to-kelivo.js
  env:
    CONVERSATIONS_FILE: ${{ github.event.inputs.conversations_file }}
    ASSISTANT_NAME: ${{ github.event.inputs.assistant_name }}
    OUTPUT_FORMAT: yaml  # Custom variable
    DEBUG: true          # Custom variable
```

## Testing Changes

Before using in production:

1. Test locally:
   ```bash
   npm install jszip
   CONVERSATIONS_FILE=test.json node .github/scripts/convert-to-kelivo.js
   ```

2. Test in a fork or branch
3. Review the workflow run logs
4. Verify artifact contents

## Best Practices

- Use semantic input names
- Add helpful descriptions
- Set reasonable retention periods
- Include error handling
- Document customizations
- Test changes in a safe environment

## Next Steps

- [Usage Guide](usage.md) - How to run the workflow
- [GitHub Action Overview](overview.md) - Feature overview

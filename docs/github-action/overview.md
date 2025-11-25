# GitHub Action Overview

The GitHub Action provides automated conversion of ChatGPT exports to [Kelivo](https://github.com/Chevey339/kelivo) format using GitHub's CI/CD infrastructure.

## Key Features

### 🤖 Automated Conversion
- Trigger conversions with a single click
- No local setup or dependencies required
- Process large exports without browser limitations

### 📦 Batch Processing
- Convert all conversations at once
- No file size restrictions
- Faster than browser-based conversion

### 💾 Artifact Storage
- Converted files stored as GitHub artifacts
- Available for 30 days
- Download individual files or ZIP archive

### 🔄 Repeatable
- Consistent conversion results
- Easy to re-run if needed
- Version-controlled configuration

## Use Cases

### Personal Use
- Convert your ChatGPT export once per month
- Keep backups of conversations
- Import into [Kelivo](https://github.com/Chevey339/kelivo) on different devices

### Team/Organization
- Batch process multiple exports
- Standardize conversion settings
- Maintain conversation archives

### Development
- Test conversion logic changes
- Automate quality checks
- Integrate with other workflows

## How It Works

```mermaid
graph LR
    A[Upload conversations.json] --> B[Trigger Workflow]
    B --> C[GitHub Action Runs]
    C --> D[Node.js Script Converts]
    D --> E[Artifacts Created]
    E --> F[Download .md Files]
```

1. **Upload**: Commit your `conversations.json` to the repository
2. **Trigger**: Run the workflow from the Actions tab
3. **Convert**: GitHub Action executes the conversion script
4. **Download**: Retrieve converted files from workflow artifacts

## Requirements

- GitHub account (free tier sufficient)
- Repository with the workflow file
- ChatGPT export data (conversations.json)

## Comparison with Other Tools

| Feature | GitHub Action | Standalone Converter | Browser Extension |
|---------|--------------|---------------------|-------------------|
| **Setup** | One-time repo setup | None | Extension install |
| **Best For** | Automation, batch | Mobile, ad-hoc | Real-time, desktop |
| **Limitations** | Requires GitHub account | Browser memory | One conversation at a time |
| **Speed** | Fast (server-side) | Medium (client-side) | Fast |
| **File Size** | No limit | Browser-dependent | N/A |
| **Privacy** | GitHub servers | Local only | Local only |

## Next Steps

- [Usage Guide](usage.md) - Step-by-step instructions
- [Configuration](configuration.md) - Customize the workflow

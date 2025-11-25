# GitHub Action Usage Guide

This guide walks you through using the GitHub Action to convert ChatGPT exports to [Kelivo](https://github.com/Chevey339/kelivo) format.

## Prerequisites

- GitHub account
- Your ChatGPT export data
- A GitHub repository (can be a fork of this repo)

## Step-by-Step Instructions

### Step 1: Get Your ChatGPT Export

1. Go to [chatgpt.com](https://chatgpt.com) and log in
2. Click your profile icon → **Settings**
3. Navigate to **Data Controls** → **Export data**
4. Wait for the email with your export link
5. Download the ZIP file
6. Extract `conversations.json` from the ZIP

### Step 2: Set Up Your Repository

If you haven't already:

1. Fork or clone this repository to your GitHub account
2. Or copy the workflow files to your own repository:
   - `.github/workflows/convert-to-kelivo.yml`
   - `.github/scripts/convert-to-kelivo.js`

### Step 3: Upload conversations.json

1. In your GitHub repository, click **Add file** → **Upload files**
2. Upload your `conversations.json` file
3. Commit the file (you can use a branch if preferred)

!!! tip "Privacy Consideration"
    If you're concerned about privacy, you can:
    - Use a private repository
    - Delete the file after conversion
    - Use a separate branch and delete it after

### Step 4: Run the Workflow

1. Go to the **Actions** tab in your repository
2. Click **Convert ChatGPT to Kelivo** in the left sidebar
3. Click the **Run workflow** dropdown button
4. Configure the inputs:
   - **conversations_file**: Path to your file (e.g., `conversations.json`)
   - **assistant_name**: Name for your AI assistant (e.g., `ChatGPT Assistant`)
5. Click **Run workflow**

![Run Workflow Screenshot](../images/github-action-run.png)

### Step 5: Wait for Completion

1. The workflow will appear in the list
2. Click on the workflow run to see progress
3. Wait for all steps to complete (usually 1-5 minutes)
4. A green checkmark ✅ indicates success

### Step 6: Download Converted Files

Once complete, you'll see artifacts at the bottom of the workflow page:

1. **kelivo-conversations** - Individual markdown files (unzipped)
2. **kelivo-conversations-zip** - All files in a ZIP archive

Click either artifact to download.

!!! note "Artifact Retention"
    Artifacts are kept for 30 days by default, then automatically deleted.

### Step 7: Import to Kelivo

1. Unzip the downloaded archive (if you downloaded the ZIP)
2. Transfer the `.md` files to your device
3. Open [Kelivo](https://github.com/Chevey339/kelivo)
4. Import the markdown files

## Example Workflow Run

```
conversations_file: data/my-export/conversations.json
assistant_name: My AI Helper
```

This would:
- Read from `data/my-export/conversations.json` in your repository
- Set assistant name to "My AI Helper"
- Create files like `Conversation_Title_1234567890.md`

## Advanced Usage

### Using Different Branches

```bash
# Create a branch for exports
git checkout -b chatgpt-exports

# Add your conversations.json
git add conversations.json
git commit -m "Add ChatGPT export"
git push origin chatgpt-exports

# Run workflow on this branch
# Then delete the branch after download
```

### Automated Scheduling

You can modify the workflow to run on a schedule:

```yaml
on:
  workflow_dispatch:
    # ... existing inputs
  schedule:
    - cron: '0 0 * * 0'  # Weekly on Sunday at midnight
```

### Custom Output Directory

Modify the script to change the output directory:

```javascript
const outputDir = path.join(process.cwd(), 'my-kelivo-exports');
```

## Troubleshooting

### Workflow Fails to Start
- Check that the workflow file is in `.github/workflows/`
- Ensure Actions are enabled in repository settings

### "File not found" Error
- Verify the path in `conversations_file` input
- Path should be relative to repository root
- Check that the file was committed successfully

### "No conversations found" Error
- Verify the file is a valid `conversations.json`
- Check that the JSON is not corrupted
- Ensure the file is not empty

### Artifacts Not Available
- Wait for the workflow to complete fully
- Check that the workflow succeeded (green checkmark)
- Artifacts appear at the bottom of the workflow run page

## Tips

- **Test with a small file first** - Use a single conversation to verify setup
- **Use descriptive assistant names** - Makes organization in Kelivo easier  
- **Download artifacts promptly** - They expire after 30 days
- **Clean up after conversion** - Delete `conversations.json` if privacy is a concern

## Next Steps

- [Configuration Guide](configuration.md) - Customize the workflow
- [GitHub Action Overview](overview.md) - Learn more about the feature

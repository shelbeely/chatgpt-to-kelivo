# Usage Guide - Standalone Converter

This guide walks you through the complete process of converting your ChatGPT conversations to Kelivo format.

## Prerequisites

Before you begin, you'll need:

- A ChatGPT account with conversations to export
- A web browser (Chrome, Firefox, Safari, or Edge)
- Your ChatGPT export file (ZIP or JSON)

## Step 1: Export Your ChatGPT Data

1. Go to [chatgpt.com](https://chatgpt.com) and log in
2. Click your profile icon in the bottom-left corner
3. Select **Settings**
4. Navigate to **Data Controls**
5. Click **Export data**
6. Confirm the export request

!!! info "Export Processing Time"
    ChatGPT will send you an email when your export is ready. This usually takes a few minutes but can take up to an hour for large accounts.

## Step 2: Download Your Export

1. Check your email for a message from OpenAI
2. Click the download link in the email
3. Save the ZIP file to your device

!!! warning "Link Expiration"
    The download link expires after 24 hours. Make sure to download your data promptly.

## Step 3: Open the Converter

You have two options to access the converter:

### Option A: Local File
1. Navigate to the `standalone-tool` folder in the repository
2. Open `index.html` in your web browser

### Option B: Hosted Version
If available, visit the hosted version at your project's GitHub Pages URL.

## Step 4: Select Your Language

1. Use the language dropdown in the top-right corner
2. Select your preferred language
3. The interface will update immediately

The converter supports 8 languages:

- English
- 中文 (Chinese)
- Español (Spanish)
- Français (French)
- Deutsch (German)
- Português (Portuguese)
- 日本語 (Japanese)
- 한국어 (Korean)

## Step 5: Upload Your Export File

1. Click the upload area or drag and drop your file
2. The converter accepts:
   - ZIP files (complete ChatGPT export)
   - JSON files (conversations.json only)

!!! tip "Large Files"
    Large export files may take a moment to process. The converter handles all processing locally in your browser.

## Step 6: Configure Settings (Optional)

### Assistant Name
Enter a custom name for the AI assistant in your exported conversations. This will appear in the Kelivo frontmatter.

- Default: "Default Assistant"
- Example: "ChatGPT", "My AI Helper", "研究助手"

## Step 7: Convert

1. Click the **Convert to Kelivo Format** button
2. Watch the progress bar as conversations are processed
3. The results will appear when conversion is complete

## Step 8: Download Results

You have two download options:

### Download Individual Files
Click the **Download** button next to any conversation to download just that file.

### Download All as ZIP
Click **Download All as ZIP** to get all converted files in a single archive.

## Step 9: Import to Kelivo

[Kelivo](https://github.com/Chevey339/kelivo) is a powerful local AI assistant application. To import your converted files:

1. Transfer the .md files to your device
2. Open [Kelivo](https://github.com/Chevey339/kelivo)
3. Import the markdown files using Kelivo's import feature

## Tips for Best Results

### Organize Your Exports
- Consider renaming downloaded files to match their content
- Create folders to organize different conversation topics

### Handle Large Exports
- For very large exports, the converter may take longer
- Keep the browser tab active during processing
- Consider processing in batches if you experience issues

### File Size Considerations
- The converter works entirely in-browser
- Available memory affects processing capacity
- For extremely large exports (1000+ conversations), consider processing in smaller batches

## Next Steps

- [Mobile Usage](mobile.md) - Special tips for mobile devices
- [Troubleshooting](troubleshooting.md) - Solutions to common issues

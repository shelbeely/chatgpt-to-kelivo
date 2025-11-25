# Troubleshooting - Standalone Converter

This guide covers common issues and their solutions when using the Standalone Web Converter.

## Upload Issues

### "Invalid file" Error

**Problem**: The converter shows an "Invalid file" error when uploading.

**Solutions**:

1. **Check file type**: Only `.zip` and `.json` files are supported
2. **Verify the export**: Make sure you downloaded the correct file from ChatGPT
3. **Re-download**: Try downloading your export again from the email link

### File Won't Select

**Problem**: Clicking the upload area doesn't open the file picker.

**Solutions**:

1. **Refresh the page**: Try reloading the converter
2. **Check browser permissions**: Ensure file access is allowed
3. **Try a different browser**: Some browser configurations may block file access

### Drag and Drop Doesn't Work

**Problem**: Dragging files onto the upload area has no effect.

**Solutions**:

1. **Use the click method**: Click the upload area instead
2. **Check browser**: Drag-and-drop may not work in all mobile browsers
3. **Verify file format**: Ensure you're dragging a .zip or .json file

## Conversion Issues

### "No conversations found" Error

**Problem**: The converter says no conversations were found in your export.

**Solutions**:

1. **Check the ZIP contents**: Verify that `conversations.json` exists in the ZIP
2. **Try extracting first**: Extract the ZIP and upload `conversations.json` directly
3. **Verify the export**: Make sure you exported data from ChatGPT, not another service

### Conversion is Very Slow

**Problem**: The conversion takes a very long time.

**Solutions**:

1. **Be patient**: Large exports with many conversations take time
2. **Close other tabs**: Free up browser memory
3. **Try a more powerful device**: Desktop browsers generally perform better
4. **Check for browser throttling**: Keep the tab active (don't minimize)

### Browser Becomes Unresponsive

**Problem**: The page freezes during conversion.

**Solutions**:

1. **Wait it out**: Very large files may cause temporary unresponsiveness
2. **Use a desktop browser**: Mobile browsers have less memory
3. **Process in batches**: For huge exports, consider splitting the JSON file

### Some Conversations are Missing

**Problem**: Not all conversations appear in the results.

**Explanation**: Conversations without valid messages (e.g., empty or system-only) are skipped.

**Solutions**:

1. **This is normal**: Empty conversations are intentionally skipped
2. **Check the source**: Some conversations may have been deleted or corrupted

## Download Issues

### Download Doesn't Start

**Problem**: Clicking download buttons has no effect.

**Solutions**:

1. **Check popup blocker**: Downloads may be blocked as popups
2. **Allow downloads**: Grant download permissions when prompted
3. **Try right-click**: Right-click and "Save link as" if available

### ZIP Download Fails

**Problem**: The "Download All as ZIP" button doesn't work.

**Solutions**:

1. **Check storage space**: Ensure you have enough free space
2. **Try individual downloads**: Download files one at a time instead
3. **Refresh and retry**: Reload the page and convert again

### Files Download with Wrong Extension

**Problem**: Downloaded files have incorrect extensions.

**Solutions**:

1. **Rename manually**: Add `.md` extension if missing
2. **Check browser settings**: Some browsers modify download filenames

## Display Issues

### Text is Too Small

**Problem**: The interface text is hard to read.

**Solutions**:

1. **Zoom in**: Use browser zoom (pinch on mobile, Ctrl/Cmd + on desktop)
2. **Rotate device**: Try landscape mode on mobile
3. **Use a larger device**: Tablets and desktops offer more space

### Interface Looks Broken

**Problem**: The layout appears incorrect or unstyled.

**Solutions**:

1. **Use a modern browser**: The converter requires a modern browser
2. **Disable extensions**: Browser extensions may interfere
3. **Clear cache**: Try clearing browser cache and reloading

### Language Doesn't Change

**Problem**: Selecting a different language has no effect.

**Solutions**:

1. **Refresh the page**: Changes may not apply to already-loaded content
2. **Check localStorage**: Clear site data if the issue persists

## Import Issues with [Kelivo](https://github.com/Chevey339/kelivo)

### Kelivo Doesn't Recognize Files

**Problem**: [Kelivo](https://github.com/Chevey339/kelivo) can't import the converted files.

**Solutions**:

1. **Check file extension**: Ensure files end in `.md`
2. **Verify YAML frontmatter**: Open the file and check for proper formatting
3. **Update Kelivo**: Make sure you're using a compatible version

### Conversations Show Incorrectly

**Problem**: Imported conversations display wrong in Kelivo.

**Solutions**:

1. **Check encoding**: Files should be UTF-8 encoded
2. **Verify content**: Open the .md file to check for formatting issues
3. **Report the issue**: Some edge cases may need fixing in the converter

## Getting More Help

If your issue isn't covered here:

1. **Check the GitHub Issues**: [View existing issues](https://github.com/shelbeely/chatgpt-to-kelivo/issues)
2. **Open a new issue**: Describe your problem with:
   - Browser and version
   - Device type (mobile/desktop)
   - Error messages
   - Steps to reproduce
3. **Include details**: Screenshots and error messages help diagnose problems

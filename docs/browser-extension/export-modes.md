# Export Modes

The browser extension supports three export modes to suit different needs.

## Mode 1: Export as Markdown File

**Best for**: Simple exports, sharing, archiving

### How it Works
1. Click the 🟢 green **Export as MD** button
2. The conversation is converted to Markdown
3. A `.md` file downloads automatically

### Output Format
```markdown
---
assistantName: Default Assistant
topicId: topic_1234567890_abc123
topicName: Conversation Title
---

## 🧑‍💻 User

Your message here...

## 🤖 Assistant

AI response here...
```

### Requirements
- None! Works standalone

### Use Cases
- Archiving conversations
- Sharing with others
- Manual import to [Kelivo](https://github.com/Chevey339/kelivo)
- Backup purposes

---

## Mode 2: Export to Kelivo

**Best for**: Direct integration with [Kelivo](https://github.com/Chevey339/kelivo)

### How it Works
1. Start `kelivo_import_server.exe`
2. Close the [Kelivo](https://github.com/Chevey339/kelivo) application
3. Click the 🟣 purple **Export to Kelivo** button
4. Conversation imports directly to Kelivo

### Requirements
- [Kelivo](https://github.com/Chevey339/kelivo) installed
- Import server running
- Kelivo app closed during import

### Setup Steps

1. **Start the Import Server**
   ```
   Double-click kelivo_import_server.exe
   ```
   Wait for "Server started" message.

2. **Close Kelivo**
   
   !!! warning "Important"
       Kelivo must be closed during import to prevent database conflicts.

3. **Configure Extension**
   - Open extension settings
   - Set your Kelivo assistant name
   - Verify server URL is `http://localhost:8765`

4. **Export**
   - Open a ChatGPT conversation
   - Click the purple export button
   - Check Kelivo for the imported conversation

### Troubleshooting

| Error | Solution |
|-------|----------|
| "Server not running" | Start `kelivo_import_server.exe` |
| "Kelivo is running" | Close the Kelivo application |
| "Import failed" | Check assistant name in settings |

---

## Mode 3: Export to Cherry Studio

**Best for**: Cherry Studio users

### How it Works
1. Export as MD file (Mode 1)
2. Run `cherry-import.exe`
3. Configure Cherry Studio path (first run only)
4. Place MD files in the ChatGPT folder
5. Files auto-import and are cleaned up

### Requirements
- Cherry Studio installed
- `cherry-import.exe` running

### Setup Steps

1. **First Run Configuration**
   - Run `cherry-import.exe`
   - Select Cherry Studio installation path
   - Click Confirm

2. **Ongoing Use**
   - Keep `cherry-import.exe` running
   - Export conversations as MD (Mode 1)
   - Move files to the ChatGPT folder
   - Files import automatically

### Automatic Workflow

Once configured, `cherry-import.exe`:

1. Monitors the ChatGPT folder
2. Detects new MD files
3. Imports them to Cherry Studio
4. Deletes the imported files

---

## Comparison Table

| Feature | Mode 1 (MD) | Mode 2 (Kelivo) | Mode 3 (Cherry) |
|---------|-------------|-----------------|-----------------|
| Requires server | ❌ | ✅ | ❌ |
| Direct import | ❌ | ✅ | ✅ (auto) |
| Manual steps | Download only | Click only | Move files |
| Works offline | ✅ | ❌ | ✅ |
| Best for | Archiving | Kelivo users | Cherry users |

## Choosing the Right Mode

### Use Mode 1 (Markdown) when:
- You want a simple file to keep
- You're on a different computer than Kelivo
- You want to share conversations
- You don't have Kelivo or Cherry Studio

### Use Mode 2 (Kelivo) when:
- You're actively using [Kelivo](https://github.com/Chevey339/kelivo)
- You want one-click import
- Kelivo is on the same computer

### Use Mode 3 (Cherry Studio) when:
- You use Cherry Studio
- You want automatic imports
- You export many conversations

## Next Steps

- [Browser Extension Installation](installation.md)
- [Standalone Converter](../standalone-tool/overview.md) - For mobile or bulk conversion

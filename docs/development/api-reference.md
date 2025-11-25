# API Reference

This document describes the internal APIs and data structures used in the ChatGPT to Kelivo tools.

## Standalone Converter

### Data Structures

#### ChatGPT Export Format

The ChatGPT export is a ZIP file containing `conversations.json`:

```json
[
  {
    "title": "Conversation Title",
    "create_time": 1234567890.123,
    "update_time": 1234567890.456,
    "mapping": {
      "node-id-1": {
        "id": "node-id-1",
        "parent": null,
        "children": ["node-id-2"],
        "message": {
          "id": "msg-id",
          "author": {
            "role": "user"
          },
          "content": {
            "content_type": "text",
            "parts": ["Message content here"]
          }
        }
      }
    }
  }
]
```

#### Kelivo Markdown Format

Output format for [Kelivo](https://github.com/Chevey339/kelivo) import:

```markdown
---
assistantName: Assistant Name
topicId: topic_1234567890_abc123
topicName: Conversation Title
---

## 🧑‍💻 User

User message content...

## 🤖 Assistant

Assistant response content...
```

### JavaScript Functions

#### `t(key, params)`
Get translated text.

| Parameter | Type | Description |
|-----------|------|-------------|
| `key` | string | Translation key |
| `params` | object | Optional substitution parameters |

**Returns**: Translated string

```javascript
t('success_converted', { count: 5 })
// Returns: "Successfully converted 5 conversations!"
```

#### `convertConversation(conv, assistantName)`
Convert a single ChatGPT conversation to Kelivo format.

| Parameter | Type | Description |
|-----------|------|-------------|
| `conv` | object | ChatGPT conversation object |
| `assistantName` | string | Name for the assistant |

**Returns**: Object with `filename`, `content`, `title`, `messageCount`, `createTime`, or `null` if no messages.

#### `getSortedMessages(mapping)`
Traverse the conversation tree and return messages in order.

| Parameter | Type | Description |
|-----------|------|-------------|
| `mapping` | object | Conversation mapping from ChatGPT export |

**Returns**: Array of message nodes in conversation order

#### `generateMarkdown(messages, title, assistantName)`
Generate Kelivo-compatible Markdown.

| Parameter | Type | Description |
|-----------|------|-------------|
| `messages` | array | Array of `{role, content}` objects |
| `title` | string | Conversation title |
| `assistantName` | string | Name for the assistant |

**Returns**: Markdown string with YAML frontmatter

#### `sanitizeFilename(name)`
Make a string safe for use as a filename.

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | string | Original filename/title |

**Returns**: Safe filename string (max 100 chars)

---

## Browser Extension

### Message Passing

The extension uses Chrome's message passing API.

#### Export to Kelivo

```javascript
chrome.runtime.sendMessage({
    action: 'exportToKelivo',
    data: {
        markdown: '...',
        title: 'Conversation Title',
        messageCount: 10
    }
}, (response) => {
    if (response.success) {
        // Export succeeded
    } else {
        // Handle error: response.error
    }
});
```

#### Check Server Status

```javascript
chrome.runtime.sendMessage({
    action: 'checkServer'
}, (response) => {
    if (response.success && response.running) {
        // Server is running
    } else {
        // Server not running
    }
});
```

### Storage API

Configuration stored in `chrome.storage.sync`:

```javascript
{
    defaultAssistant: 'Default Assistant',
    serverUrl: 'http://localhost:8765',
    language: 'en'
}
```

### Import Server API

The import server runs on `http://localhost:8765`.

#### Health Check

```
GET /health
```

**Response**: `200 OK` if server is running

#### Import Conversation

```
POST /import
Content-Type: application/json

{
    "markdown": "...",
    "assistant": "Assistant Name",
    "title": "Conversation Title"
}
```

**Success Response**:
```json
{
    "success": true,
    "message": "Import successful"
}
```

**Error Response**:
```json
{
    "error": "KELIVO_RUNNING",
    "message": "Please close Kelivo first"
}
```

---

## Translation Keys

Both tools use the same translation key structure:

| Key | Description |
|-----|-------------|
| `pageTitle` | Main page title |
| `uploadTitle` | Upload section title |
| `uploadText` | Upload area instructions |
| `convertBtn` | Convert button text |
| `converting` | Converting progress text |
| `resultsTitle` | Results section title |
| `download` | Download button text |
| `downloadAll` | Download all button text |
| `error_no_file` | No file selected error |
| `error_invalid_file` | Invalid file error |
| `error_no_conversations` | No conversations found error |
| `success_converted` | Success message (use `{count}`) |
| `userRole` | User role label |
| `assistantRole` | Assistant role label |

See source files for complete key lists.

---

## Adding New Languages

1. Add translation object with all keys
2. Add language to selector UI
3. Test all UI elements update correctly

## License

MIT License - See [LICENSE](https://github.com/shelbeely/chatgpt-to-kelivo/blob/main/LICENSE)

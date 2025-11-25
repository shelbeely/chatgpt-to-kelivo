#!/usr/bin/env node

/**
 * ChatGPT to Kelivo Converter - GitHub Action Script
 * 
 * This script converts ChatGPT conversations.json to Kelivo-compatible markdown files.
 * It replicates the conversion logic from the standalone-tool/index.html.
 * 
 * Usage:
 *   CONVERSATIONS_FILE=conversations.json ASSISTANT_NAME="My Assistant" node convert-to-kelivo.js
 * 
 * Environment Variables:
 *   CONVERSATIONS_FILE - Path to conversations.json (required)
 *   ASSISTANT_NAME - Name for the assistant in Kelivo (optional, defaults to "ChatGPT Assistant")
 */

const fs = require('fs');
const path = require('path');

// Configuration from environment variables
const conversationsFile = process.env.CONVERSATIONS_FILE || 'conversations.json';
const assistantName = process.env.ASSISTANT_NAME || 'ChatGPT Assistant';

// Output directory
const outputDir = path.join(process.cwd(), 'output');

/**
 * Get sorted messages from the ChatGPT conversation mapping.
 * Traverses the tree structure following parent-child relationships.
 */
function getSortedMessages(mapping) {
    const nodes = [];
    const visited = new Set();

    // Find root node (no parent)
    let currentId = null;
    for (const [id, node] of Object.entries(mapping)) {
        if (!node.parent) {
            currentId = id;
            break;
        }
    }

    // Traverse the tree following the conversation thread
    while (currentId && !visited.has(currentId)) {
        visited.add(currentId);
        const node = mapping[currentId];
        
        if (node && node.message) {
            nodes.push(node);
        }

        // Find next node (follow children)
        if (node && node.children && node.children.length > 0) {
            // Take the last child (most recent in conversation)
            currentId = node.children[node.children.length - 1];
        } else {
            currentId = null;
        }
    }

    return nodes;
}

/**
 * Escape YAML special characters in strings to prevent parsing issues.
 * Wraps value in quotes if it contains special characters.
 */
function escapeYamlValue(value) {
    if (!value) return '""';
    // Check if value contains characters that need quoting
    if (/[:\[\]{}#&*!|>'"%@`\n]/.test(value) || value.trim() !== value) {
        // Escape any existing double quotes and wrap in double quotes
        return '"' + value.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
    }
    return value;
}

/**
 * Generate Kelivo-compatible markdown from conversation messages.
 */
function generateMarkdown(messages, title, assistantName) {
    // Generate unique topic ID using timestamp and random string
    const topicId = `topic_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    // YAML frontmatter for Kelivo
    let markdown = `---
assistantName: ${escapeYamlValue(assistantName)}
topicId: ${topicId}
topicName: ${escapeYamlValue(title)}
---
`;

    // Format each message with role header
    for (const msg of messages) {
        const roleLabel = msg.role === 'user' 
            ? `🧑‍💻 User` 
            : `🤖 Assistant`;
        
        // Process content to handle markdown quotes
        // Convert > quote syntax to indented format for Kelivo compatibility
        let content = msg.content;
        const lines = content.split('\n');
        const processedLines = lines.map(line => {
            if (line.trim().startsWith('>')) {
                return '    ' + line.replace(/^>\s*/, '');
            }
            return line;
        });
        content = processedLines.join('\n');

        markdown += `\n## ${roleLabel}\n\n${content}\n`;
    }

    return markdown;
}

/**
 * Sanitize a string for use as a filename.
 */
function sanitizeFilename(name) {
    return name
        .replace(/[<>:"/\\|?*]/g, '_')  // Remove invalid filename chars
        .replace(/\s+/g, '_')            // Replace spaces with underscores
        .substring(0, 100);              // Limit length
}

/**
 * Convert a single ChatGPT conversation to Kelivo markdown format.
 */
function convertConversation(conv, assistantName) {
    const title = conv.title || 'Untitled Conversation';
    const messages = [];
    
    // Process the conversation mapping (tree structure)
    if (conv.mapping) {
        const sortedNodes = getSortedMessages(conv.mapping);
        
        for (const node of sortedNodes) {
            if (node.message && node.message.content && node.message.content.parts) {
                const role = node.message.author?.role;
                // Only include user and assistant messages (skip system messages)
                if (role === 'user' || role === 'assistant') {
                    const content = node.message.content.parts.join('\n').trim();
                    if (content) {
                        messages.push({
                            role: role,
                            content: content
                        });
                    }
                }
            }
        }
    }

    if (messages.length === 0) {
        return null;
    }

    // Generate markdown with Kelivo-compatible format
    const markdown = generateMarkdown(messages, title, assistantName);
    const timestamp = conv.create_time ? new Date(conv.create_time * 1000) : new Date();
    const safeTitle = sanitizeFilename(title);
    const filename = `${safeTitle}_${timestamp.getTime()}.md`;

    return {
        filename: filename,
        content: markdown,
        title: title,
        messageCount: messages.length,
        createTime: timestamp
    };
}

/**
 * Main conversion function
 */
function main() {
    console.log('ChatGPT to Kelivo Converter');
    console.log('============================\n');
    
    // Check if conversations file exists
    if (!fs.existsSync(conversationsFile)) {
        console.error(`Error: Conversations file not found: ${conversationsFile}`);
        process.exit(1);
    }

    console.log(`Reading conversations from: ${conversationsFile}`);
    console.log(`Assistant name: ${assistantName}\n`);

    // Read and parse conversations.json
    let conversations;
    try {
        const content = fs.readFileSync(conversationsFile, 'utf8');
        conversations = JSON.parse(content);
    } catch (error) {
        console.error(`Error reading or parsing conversations file: ${error.message}`);
        process.exit(1);
    }

    if (!Array.isArray(conversations) || conversations.length === 0) {
        console.error('Error: No conversations found in the file');
        process.exit(1);
    }

    console.log(`Found ${conversations.length} conversations\n`);

    // Create output directory
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Convert each conversation
    let convertedCount = 0;
    let totalMessages = 0;

    for (let i = 0; i < conversations.length; i++) {
        const conv = conversations[i];
        console.log(`Converting (${i + 1}/${conversations.length}): ${conv.title || 'Untitled'}...`);
        
        const result = convertConversation(conv, assistantName);
        
        if (result) {
            const outputPath = path.join(outputDir, result.filename);
            fs.writeFileSync(outputPath, result.content, 'utf8');
            console.log(`  ✓ Saved: ${result.filename} (${result.messageCount} messages)`);
            convertedCount++;
            totalMessages += result.messageCount;
        } else {
            console.log(`  ✗ Skipped: No valid messages`);
        }
    }

    console.log('\n============================');
    console.log(`Conversion complete!`);
    console.log(`Converted: ${convertedCount} conversations`);
    console.log(`Total messages: ${totalMessages}`);
    console.log(`Output directory: ${outputDir}`);
    console.log('============================\n');
}

// Run the converter
main();

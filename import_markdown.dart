/// Markdown 导入工具
///
/// 用法：
/// dart run tools/import_markdown.dart <markdown文件路径> [助手ID] [对话标题]
///
/// 示例：
/// dart run tools/import_markdown.dart conversation.md
/// dart run tools/import_markdown.dart conversation.md abc-123-def "我的对话"

import 'dart:io';
import 'dart:convert';
import 'package:hive/hive.dart';
import 'package:Kelivo/core/models/conversation.dart';
import 'package:Kelivo/core/models/chat_message.dart';

void main(List<String> args) async {
  if (args.isEmpty) {
    print('❌ 错误：请提供 Markdown 文件路径');
    print('');
    print('用法：');
    print('  dart run tools/import_markdown.dart <markdown文件路径> [助手名称或ID] [对话标题]');
    print('');
    print('示例：');
    print('  dart run tools/import_markdown.dart conversation.md');
    print('  dart run tools/import_markdown.dart conversation.md "111默认助手"');
    print('  dart run tools/import_markdown.dart conversation.md "默认助手111" "我的对话"');
    print('  dart run tools/import_markdown.dart conversation.md 6c6fcd5f-1c98-46f5-ab2f-43487017b34c');
    print('');
    print('💡 提示：');
    print('  - 可以使用助手名称（如 "111默认助手"）或助手ID');
    print('  - 如果不提供助手，将交互式选择');
    exit(1);
  }

  final filePath = args[0];
  final file = File(filePath);

  if (!file.existsSync()) {
    print('❌ 错误：文件不存在: $filePath');
    exit(1);
  }

  print('📂 正在初始化数据库...');

  // 初始化 Hive
  try {
    final appDir = _getAppDataDirectory();
    Hive.init(appDir.path);

    // 注册适配器
    if (!Hive.isAdapterRegistered(0)) {
      Hive.registerAdapter(ChatMessageAdapter());
    }
    if (!Hive.isAdapterRegistered(1)) {
      Hive.registerAdapter(ConversationAdapter());
    }

    print('✓ 数据库初始化成功');
    print('  位置: ${appDir.path}');
  } catch (e) {
    print('❌ 数据库初始化失败: $e');
    exit(1);
  }

  // 打开数据库
  Box<Conversation>? conversationsBox;
  Box<ChatMessage>? messagesBox;

  try {
    conversationsBox = await Hive.openBox<Conversation>('conversations');
    messagesBox = await Hive.openBox<ChatMessage>('messages');
    print('✓ 数据库打开成功');
  } catch (e) {
    print('❌ 打开数据库失败: $e');
    exit(1);
  }

  // 获取或选择助手ID
  String assistantId = '';
  if (args.length >= 2) {
    final assistantNameOrId = args[1];

    // 尝试通过名称或ID查找助手
    final resolvedId = await _resolveAssistantId(assistantNameOrId);
    if (resolvedId != null) {
      assistantId = resolvedId;
      print('');
      print('✓ 找到助手: $assistantNameOrId');
      print('  助手ID: $assistantId');
    } else {
      print('');
      print('⚠️  未找到助手: $assistantNameOrId');
      print('  将使用提供的值作为助手ID');
      assistantId = assistantNameOrId;
    }
  } else {
    // 列出所有对话及其助手ID
    print('');
    print('📋 正在查找助手信息...');
    final assistantIds = <String>{};

    for (final conv in conversationsBox.values) {
      if (conv.assistantId != null && conv.assistantId!.isNotEmpty) {
        assistantIds.add(conv.assistantId!);
      }
    }

    if (assistantIds.isEmpty) {
      print('⚠️  未找到任何助手ID，将使用默认助手');
      assistantId = '';
    } else {
      print('');
      print('找到以下助手ID：');
      final idList = assistantIds.toList();
      for (var i = 0; i < idList.length; i++) {
        print('  ${i + 1}. ${idList[i]}');
      }
      print('  ${idList.length + 1}. 使用默认助手（空ID）');
      print('');
      stdout.write('请选择助手 (1-${idList.length + 1}): ');
      final input = stdin.readLineSync();
      final choice = int.tryParse(input ?? '');

      if (choice == null || choice < 1 || choice > idList.length + 1) {
        print('❌ 无效的选择');
        exit(1);
      }

      if (choice == idList.length + 1) {
        assistantId = '';
      } else {
        assistantId = idList[choice - 1];
      }
    }
  }

  // 获取标题
  String? title;
  if (args.length >= 3) {
    title = args[2];
  }

  print('');
  print('📥 开始导入...');
  print('  文件: $filePath');
  print('  助手ID: ${assistantId.isEmpty ? "(默认)" : assistantId}');
  if (title != null) {
    print('  标题: $title');
  }

  try {
    // 读取并解析 Markdown
    final content = await file.readAsString();
    final parsed = _parseMarkdown(content);

    // 确定标题
    final conversationTitle = title ??
                              parsed.title ??
                              _extractTitleFromFilename(filePath) ??
                              '导入的对话';

    // 创建对话
    final conversation = Conversation(
      title: conversationTitle,
      assistantId: assistantId.isEmpty ? null : assistantId,
    );

    await conversationsBox.put(conversation.id, conversation);

    // 添加消息
    for (final msg in parsed.messages) {
      final message = ChatMessage(
        role: msg.role,
        content: msg.content,
        conversationId: conversation.id,
      );

      await messagesBox.put(message.id, message);
      conversation.messageIds.add(message.id);
    }

    // 更新对话
    conversation.updatedAt = DateTime.now();
    await conversation.save();

    print('');
    print('✅ 导入成功！');
    print('  对话ID: ${conversation.id}');
    print('  对话标题: ${conversation.title}');
    print('  消息数量: ${parsed.messages.length}');
    print('  创建时间: ${conversation.createdAt}');
  } catch (e, stack) {
    print('');
    print('❌ 导入失败: $e');
    print('堆栈跟踪:');
    print(stack);
    exit(1);
  } finally {
    await conversationsBox?.close();
    await messagesBox?.close();
  }

  print('');
  print('🎉 完成！');
  exit(0);
}

Directory _getAppDataDirectory() {
  // Windows: C:\Users\<用户名>\AppData\Roaming\com.psyche\kelivo
  if (Platform.isWindows) {
    final appData = Platform.environment['APPDATA'];
    if (appData != null) {
      return Directory('$appData${Platform.pathSeparator}com.psyche${Platform.pathSeparator}kelivo');
    }
  }

  // macOS: ~/Library/Application Support/kelivo
  if (Platform.isMacOS) {
    final home = Platform.environment['HOME'];
    if (home != null) {
      return Directory('$home${Platform.pathSeparator}Library${Platform.pathSeparator}Application Support${Platform.pathSeparator}kelivo');
    }
  }

  // Linux: ~/.local/share/kelivo
  if (Platform.isLinux) {
    final home = Platform.environment['HOME'];
    if (home != null) {
      return Directory('$home${Platform.pathSeparator}.local${Platform.pathSeparator}share${Platform.pathSeparator}kelivo');
    }
  }

  throw Exception('不支持的平台或无法确定应用数据目录');
}

class _ParsedMarkdown {
  final String? title;
  final List<_MessageData> messages;

  _ParsedMarkdown({this.title, required this.messages});
}

class _MessageData {
  final String role;
  final String content;

  _MessageData({required this.role, required this.content});
}

_ParsedMarkdown _parseMarkdown(String content) {
  final lines = content.split('\n');
  String? title;
  final messages = <_MessageData>[];

  String? currentRole;
  final currentContent = StringBuffer();

  for (var i = 0; i < lines.length; i++) {
    final line = lines[i];

    // 提取标题（第一个 # 标题）
    if (title == null && line.startsWith('# ')) {
      title = line.substring(2).trim();
      continue;
    }

    // 检测角色标记
    if (line.startsWith('>')) {
      final marker = line.substring(1).trim().toLowerCase();

      // 保存之前的消息
      if (currentRole != null && currentContent.length > 0) {
        messages.add(_MessageData(
          role: currentRole,
          content: currentContent.toString().trim(),
        ));
        currentContent.clear();
      }

      // 识别新角色
      if (marker.startsWith('user') || marker.startsWith('用户')) {
        currentRole = 'user';
      } else if (marker.startsWith('assistant') || marker.startsWith('助手')) {
        currentRole = 'assistant';
      } else if (marker.contains('·')) {
        // 支持导出格式：> 2025-01-01 10:00 · 用户
        final parts = marker.split('·');
        if (parts.length >= 2) {
          final rolePart = parts[1].trim().toLowerCase();
          if (rolePart.contains('user') || rolePart.contains('用户')) {
            currentRole = 'user';
          } else if (rolePart.contains('assistant') || rolePart.contains('助手')) {
            currentRole = 'assistant';
          }
        }
      }
      continue;
    }

    // 累积内容
    if (currentRole != null) {
      currentContent.writeln(line);
    }
  }

  // 保存最后一条消息
  if (currentRole != null && currentContent.length > 0) {
    messages.add(_MessageData(
      role: currentRole,
      content: currentContent.toString().trim(),
    ));
  }

  // 如果没有检测到角色标记，将整个内容作为用户消息
  if (messages.isEmpty && content.trim().isNotEmpty) {
    messages.add(_MessageData(
      role: 'user',
      content: content.trim(),
    ));
  }

  return _ParsedMarkdown(title: title, messages: messages);
}

String? _extractTitleFromFilename(String filePath) {
  final filename = filePath.split(Platform.pathSeparator).last;
  if (filename.endsWith('.md') || filename.endsWith('.markdown')) {
    return filename.substring(0, filename.lastIndexOf('.'));
  }
  return filename;
}

/// 通过助手名称或ID查找助手ID
///
/// 参数 [nameOrId] 可以是：
/// - 助手的完整ID（如 "6c6fcd5f-1c98-46f5-ab2f-43487017b34c"）
/// - 助手的名称（如 "111默认助手"）
///
/// 返回找到的助手ID，如果未找到则返回 null
Future<String?> _resolveAssistantId(String nameOrId) async {
  try {
    // 读取 SharedPreferences
    final appDir = _getAppDataDirectory();
    final prefsFile = File('${appDir.path}${Platform.pathSeparator}shared_preferences.json');

    if (!prefsFile.existsSync()) {
      return null;
    }

    final prefsContent = await prefsFile.readAsString();
    final prefs = jsonDecode(prefsContent) as Map<String, dynamic>;

    // 获取助手列表
    final assistantsJson = prefs['flutter.assistants_v1'] as String?;
    if (assistantsJson == null) {
      return null;
    }

    final assistantsList = jsonDecode(assistantsJson) as List<dynamic>;

    // 首先尝试精确匹配ID
    for (final assistant in assistantsList) {
      if (assistant['id'] == nameOrId) {
        return nameOrId;
      }
    }

    // 然后尝试匹配名称（去除表情符号和空格后比较）
    final normalizedInput = _normalizeAssistantName(nameOrId);

    for (final assistant in assistantsList) {
      final assistantName = assistant['name'] as String?;
      if (assistantName != null) {
        final normalizedName = _normalizeAssistantName(assistantName);
        if (normalizedName == normalizedInput) {
          return assistant['id'] as String;
        }
      }
    }

    // 尝试部分匹配（包含关系）
    for (final assistant in assistantsList) {
      final assistantName = assistant['name'] as String?;
      if (assistantName != null) {
        final normalizedName = _normalizeAssistantName(assistantName);
        if (normalizedName.contains(normalizedInput) || normalizedInput.contains(normalizedName)) {
          return assistant['id'] as String;
        }
      }
    }

    return null;
  } catch (e) {
    // 如果读取失败，返回 null
    return null;
  }
}

/// 标准化助手名称（去除表情符号、空格等）
String _normalizeAssistantName(String name) {
  // 去除表情符号（Unicode 范围）
  var normalized = name.replaceAll(RegExp(r'[\u{1F300}-\u{1F9FF}]', unicode: true), '');
  // 去除其他常见表情符号
  normalized = normalized.replaceAll(RegExp(r'[️⭐👉]'), '');
  // 去除空格
  normalized = normalized.replaceAll(RegExp(r'\s+'), '');
  // 转换为小写
  normalized = normalized.toLowerCase();
  return normalized;
}


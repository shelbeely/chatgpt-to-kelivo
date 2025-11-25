// ChatGPT to Kelivo - Internationalization (i18n) System
// Supports multiple languages

const translations = {
    en: {
        // Popup UI
        popupTitle: 'ChatGPT to Kelivo Settings',
        kelivoAssistantName: 'Kelivo Assistant Name',
        defaultAssistant: 'Default Assistant',
        importServerUrl: 'Import Server URL',
        saveSettings: '💾 Save Settings',
        pleaseEnterAssistantName: 'Please enter an assistant name',
        pleaseEnterServerUrl: 'Please enter a server URL',
        settingsSaved: '✅ Settings saved',
        usageSteps: '📖 Usage Steps',
        step1Title: 'Double-click to run kelivo_import_server.exe',
        step1Hint: 'Start the import server (only required for exporting to Kelivo)',
        step2Title: 'Close the Kelivo application',
        step2Hint: '⚠️ Kelivo must be closed during import',
        step3Title: 'Click the export button on the right side of the page',
        step3Hint: '• Purple button: Export to Kelivo\n• Green button: Export as MD file',
        language: 'Language',
        
        // Content Script - Buttons
        exportToKelivo: 'Export to Kelivo',
        exportAsMD: 'Export as MD',
        
        // Content Script - Messages
        exporting: 'Exporting...',
        preparingExport: 'Preparing export...',
        checkingServerStatus: 'Checking server status...',
        gettingMarkdownContent: 'Getting Markdown content via copy buttons...',
        generatingMarkdown: 'Generating Markdown...',
        sendingToKelivo: 'Sending to Kelivo...',
        loadingAllMessages: 'Loading all messages...',
        downloadingFile: 'Downloading file...',
        
        // Content Script - Success/Error Messages
        exportSuccess: '✅ Successfully exported {count} messages to Kelivo!',
        exportMDSuccess: '✅ Successfully exported {count} messages as MD file!',
        exportFailed: '❌ Export failed: {error}',
        noConversationFound: 'No conversation messages found',
        unableToGetContent: 'Unable to get content via copy buttons, please ensure the page is fully loaded',
        
        // Content Script - Dialogs
        serverNotRunningTitle: 'Import Server Not Running',
        serverNotRunningMessage: 'Cannot connect to Kelivo import server, please start the server first',
        serverNotRunningStepsTitle: 'Steps:',
        serverNotRunningStep1: 'Double-click to run',
        serverNotRunningStep2: 'Wait for server to start (will show "Server started")',
        serverNotRunningStep3: 'Return to this page',
        serverNotRunningStep4: 'Click the "Export to Kelivo" button again',
        serverNotRunningTip: '💡 Tip: The server will display a black window when started, please keep it open',
        okButton: 'OK',
        
        kelivoRunningTitle: 'Kelivo Application Is Running',
        kelivoRunningMessage: 'Please close the Kelivo application first, then try again',
        kelivoRunningStep1: 'Close the Kelivo application',
        kelivoRunningStep2: 'Return to this page',
        kelivoRunningStep3: 'Click the "Export to Kelivo" button again',
        
        // Markdown generation
        userRole: 'User',
        assistantRole: 'Assistant',
        quote: 'Quote:',
        
        // Console messages (for debugging)
        foundMessages: 'Found {count} messages',
        processingMessage: 'Processing message {current}/{total} [{role}]...',
        extractionComplete: '=== Extraction complete ===',
        totalMessages: 'Total messages: {count}',
        successfullyExtracted: 'Successfully extracted: {count}',
        failedSkipped: 'Failed/skipped: {count}',
        
        // Default title prefix
        conversationTitlePrefix: 'ChatGPT_Conversation'
    },
    
    zh: {
        // Popup UI
        popupTitle: 'ChatGPT to Kelivo 设置',
        kelivoAssistantName: 'Kelivo 助手名称',
        defaultAssistant: '默认助手',
        importServerUrl: '导入服务器地址',
        saveSettings: '💾 保存设置',
        pleaseEnterAssistantName: '请输入助手名称',
        pleaseEnterServerUrl: '请输入服务器地址',
        settingsSaved: '✅ 设置已保存',
        usageSteps: '📖 使用步骤',
        step1Title: '双击运行 kelivo_import_server.exe',
        step1Hint: '启动导入服务器（仅导出到 Kelivo 时需要）',
        step2Title: '关闭 Kelivo 应用',
        step2Hint: '⚠️ 导入时必须关闭 Kelivo',
        step3Title: '点击页面右侧的导出按钮',
        step3Hint: '• 紫色按钮：导出到 Kelivo\n• 绿色按钮：导出为 MD 文件',
        language: '语言',
        
        // Content Script - Buttons
        exportToKelivo: '导出到 Kelivo',
        exportAsMD: '导出为 MD',
        
        // Content Script - Messages
        exporting: '导出中...',
        preparingExport: '准备导出...',
        checkingServerStatus: '检查服务器状态...',
        gettingMarkdownContent: '通过复制按钮获取 Markdown 格式内容...',
        generatingMarkdown: '生成 Markdown...',
        sendingToKelivo: '发送到 Kelivo...',
        loadingAllMessages: '正在加载所有消息...',
        downloadingFile: '下载文件...',
        
        // Content Script - Success/Error Messages
        exportSuccess: '✅ 成功导出 {count} 条消息到 Kelivo！',
        exportMDSuccess: '✅ 成功导出 {count} 条消息为 MD 文件！',
        exportFailed: '❌ 导出失败: {error}',
        noConversationFound: '未找到对话消息',
        unableToGetContent: '无法通过复制按钮获取内容，请确保页面已完全加载',
        
        // Content Script - Dialogs
        serverNotRunningTitle: '导入服务器未运行',
        serverNotRunningMessage: '无法连接到 Kelivo 导入服务器，请先启动服务器',
        serverNotRunningStepsTitle: '操作步骤：',
        serverNotRunningStep1: '双击运行',
        serverNotRunningStep2: '等待服务器启动（会显示"服务器已启动"）',
        serverNotRunningStep3: '返回此页面',
        serverNotRunningStep4: '重新点击"导出到 Kelivo"按钮',
        serverNotRunningTip: '💡 提示：服务器启动后会显示一个黑色窗口，请保持窗口打开状态',
        okButton: '我知道了',
        
        kelivoRunningTitle: 'Kelivo 应用正在运行',
        kelivoRunningMessage: '请先关闭 Kelivo 应用，然后重试',
        kelivoRunningStep1: '关闭 Kelivo 应用',
        kelivoRunningStep2: '返回此页面',
        kelivoRunningStep3: '重新点击"导出到 Kelivo"按钮',
        
        // Markdown generation
        userRole: '用户',
        assistantRole: '助手',
        quote: '引用：',
        
        // Console messages (for debugging)
        foundMessages: '找到 {count} 条消息',
        processingMessage: '处理消息 {current}/{total} [{role}]...',
        extractionComplete: '=== 提取完成 ===',
        totalMessages: '总消息数: {count}',
        successfullyExtracted: '成功提取: {count}',
        failedSkipped: '失败/跳过: {count}',
        
        // Default title prefix
        conversationTitlePrefix: 'ChatGPT对话'
    },

    es: {
        // Popup UI
        popupTitle: 'Configuración de ChatGPT a Kelivo',
        kelivoAssistantName: 'Nombre del Asistente Kelivo',
        defaultAssistant: 'Asistente Predeterminado',
        importServerUrl: 'URL del Servidor de Importación',
        saveSettings: '💾 Guardar Configuración',
        pleaseEnterAssistantName: 'Por favor ingrese un nombre de asistente',
        pleaseEnterServerUrl: 'Por favor ingrese una URL del servidor',
        settingsSaved: '✅ Configuración guardada',
        usageSteps: '📖 Pasos de Uso',
        step1Title: 'Doble clic para ejecutar kelivo_import_server.exe',
        step1Hint: 'Iniciar el servidor de importación (solo requerido para exportar a Kelivo)',
        step2Title: 'Cerrar la aplicación Kelivo',
        step2Hint: '⚠️ Kelivo debe estar cerrado durante la importación',
        step3Title: 'Haga clic en el botón de exportación en el lado derecho de la página',
        step3Hint: '• Botón morado: Exportar a Kelivo\n• Botón verde: Exportar como archivo MD',
        language: 'Idioma',
        
        // Content Script - Buttons
        exportToKelivo: 'Exportar a Kelivo',
        exportAsMD: 'Exportar como MD',
        
        // Content Script - Messages
        exporting: 'Exportando...',
        preparingExport: 'Preparando exportación...',
        checkingServerStatus: 'Verificando estado del servidor...',
        gettingMarkdownContent: 'Obteniendo contenido Markdown mediante botones de copiar...',
        generatingMarkdown: 'Generando Markdown...',
        sendingToKelivo: 'Enviando a Kelivo...',
        loadingAllMessages: 'Cargando todos los mensajes...',
        downloadingFile: 'Descargando archivo...',
        
        // Content Script - Success/Error Messages
        exportSuccess: '✅ ¡{count} mensajes exportados exitosamente a Kelivo!',
        exportMDSuccess: '✅ ¡{count} mensajes exportados exitosamente como archivo MD!',
        exportFailed: '❌ Error de exportación: {error}',
        noConversationFound: 'No se encontraron mensajes de conversación',
        unableToGetContent: 'No se puede obtener contenido mediante botones de copiar, asegúrese de que la página esté completamente cargada',
        
        // Content Script - Dialogs
        serverNotRunningTitle: 'Servidor de Importación No Está Ejecutándose',
        serverNotRunningMessage: 'No se puede conectar al servidor de importación de Kelivo, por favor inicie el servidor primero',
        serverNotRunningStepsTitle: 'Pasos:',
        serverNotRunningStep1: 'Doble clic para ejecutar',
        serverNotRunningStep2: 'Espere a que el servidor inicie (mostrará "Servidor iniciado")',
        serverNotRunningStep3: 'Regrese a esta página',
        serverNotRunningStep4: 'Haga clic en el botón "Exportar a Kelivo" nuevamente',
        serverNotRunningTip: '💡 Consejo: El servidor mostrará una ventana negra cuando se inicie, manténgala abierta',
        okButton: 'OK',
        
        kelivoRunningTitle: 'La Aplicación Kelivo Está Ejecutándose',
        kelivoRunningMessage: 'Por favor cierre la aplicación Kelivo primero, luego intente nuevamente',
        kelivoRunningStep1: 'Cierre la aplicación Kelivo',
        kelivoRunningStep2: 'Regrese a esta página',
        kelivoRunningStep3: 'Haga clic en el botón "Exportar a Kelivo" nuevamente',
        
        // Markdown generation
        userRole: 'Usuario',
        assistantRole: 'Asistente',
        quote: 'Cita:',
        
        // Default title prefix
        conversationTitlePrefix: 'Conversación_ChatGPT'
    },

    fr: {
        // Popup UI
        popupTitle: 'Paramètres ChatGPT vers Kelivo',
        kelivoAssistantName: 'Nom de l\'Assistant Kelivo',
        defaultAssistant: 'Assistant Par Défaut',
        importServerUrl: 'URL du Serveur d\'Importation',
        saveSettings: '💾 Enregistrer les Paramètres',
        pleaseEnterAssistantName: 'Veuillez entrer un nom d\'assistant',
        pleaseEnterServerUrl: 'Veuillez entrer une URL de serveur',
        settingsSaved: '✅ Paramètres enregistrés',
        usageSteps: '📖 Étapes d\'Utilisation',
        step1Title: 'Double-cliquez pour exécuter kelivo_import_server.exe',
        step1Hint: 'Démarrer le serveur d\'importation (uniquement requis pour exporter vers Kelivo)',
        step2Title: 'Fermez l\'application Kelivo',
        step2Hint: '⚠️ Kelivo doit être fermé pendant l\'importation',
        step3Title: 'Cliquez sur le bouton d\'exportation sur le côté droit de la page',
        step3Hint: '• Bouton violet: Exporter vers Kelivo\n• Bouton vert: Exporter en fichier MD',
        language: 'Langue',
        
        // Content Script - Buttons
        exportToKelivo: 'Exporter vers Kelivo',
        exportAsMD: 'Exporter en MD',
        
        // Content Script - Messages
        exporting: 'Exportation...',
        preparingExport: 'Préparation de l\'exportation...',
        checkingServerStatus: 'Vérification de l\'état du serveur...',
        gettingMarkdownContent: 'Obtention du contenu Markdown via les boutons de copie...',
        generatingMarkdown: 'Génération du Markdown...',
        sendingToKelivo: 'Envoi vers Kelivo...',
        loadingAllMessages: 'Chargement de tous les messages...',
        downloadingFile: 'Téléchargement du fichier...',
        
        // Content Script - Success/Error Messages
        exportSuccess: '✅ {count} messages exportés avec succès vers Kelivo!',
        exportMDSuccess: '✅ {count} messages exportés avec succès en fichier MD!',
        exportFailed: '❌ Échec de l\'exportation: {error}',
        noConversationFound: 'Aucun message de conversation trouvé',
        unableToGetContent: 'Impossible d\'obtenir le contenu via les boutons de copie, assurez-vous que la page est entièrement chargée',
        
        // Content Script - Dialogs
        serverNotRunningTitle: 'Serveur d\'Importation Non Démarré',
        serverNotRunningMessage: 'Impossible de se connecter au serveur d\'importation Kelivo, veuillez d\'abord démarrer le serveur',
        serverNotRunningStepsTitle: 'Étapes:',
        serverNotRunningStep1: 'Double-cliquez pour exécuter',
        serverNotRunningStep2: 'Attendez que le serveur démarre (affichera "Serveur démarré")',
        serverNotRunningStep3: 'Retournez à cette page',
        serverNotRunningStep4: 'Cliquez à nouveau sur le bouton "Exporter vers Kelivo"',
        serverNotRunningTip: '💡 Conseil: Le serveur affichera une fenêtre noire au démarrage, gardez-la ouverte',
        okButton: 'OK',
        
        kelivoRunningTitle: 'L\'Application Kelivo Est En Cours d\'Exécution',
        kelivoRunningMessage: 'Veuillez d\'abord fermer l\'application Kelivo, puis réessayez',
        kelivoRunningStep1: 'Fermez l\'application Kelivo',
        kelivoRunningStep2: 'Retournez à cette page',
        kelivoRunningStep3: 'Cliquez à nouveau sur le bouton "Exporter vers Kelivo"',
        
        // Markdown generation
        userRole: 'Utilisateur',
        assistantRole: 'Assistant',
        quote: 'Citation:',
        
        // Default title prefix
        conversationTitlePrefix: 'Conversation_ChatGPT'
    },

    de: {
        // Popup UI
        popupTitle: 'ChatGPT zu Kelivo Einstellungen',
        kelivoAssistantName: 'Kelivo Assistentenname',
        defaultAssistant: 'Standardassistent',
        importServerUrl: 'Import-Server-URL',
        saveSettings: '💾 Einstellungen Speichern',
        pleaseEnterAssistantName: 'Bitte geben Sie einen Assistentennamen ein',
        pleaseEnterServerUrl: 'Bitte geben Sie eine Server-URL ein',
        settingsSaved: '✅ Einstellungen gespeichert',
        usageSteps: '📖 Nutzungsschritte',
        step1Title: 'Doppelklicken Sie, um kelivo_import_server.exe auszuführen',
        step1Hint: 'Starten Sie den Import-Server (nur für den Export nach Kelivo erforderlich)',
        step2Title: 'Schließen Sie die Kelivo-Anwendung',
        step2Hint: '⚠️ Kelivo muss während des Imports geschlossen sein',
        step3Title: 'Klicken Sie auf die Export-Schaltfläche auf der rechten Seite der Seite',
        step3Hint: '• Lila Schaltfläche: Nach Kelivo exportieren\n• Grüne Schaltfläche: Als MD-Datei exportieren',
        language: 'Sprache',
        
        // Content Script - Buttons
        exportToKelivo: 'Nach Kelivo exportieren',
        exportAsMD: 'Als MD exportieren',
        
        // Content Script - Messages
        exporting: 'Exportiere...',
        preparingExport: 'Export wird vorbereitet...',
        checkingServerStatus: 'Serverstatus wird überprüft...',
        gettingMarkdownContent: 'Markdown-Inhalt über Kopierschaltflächen abrufen...',
        generatingMarkdown: 'Markdown wird generiert...',
        sendingToKelivo: 'An Kelivo senden...',
        loadingAllMessages: 'Alle Nachrichten werden geladen...',
        downloadingFile: 'Datei wird heruntergeladen...',
        
        // Content Script - Success/Error Messages
        exportSuccess: '✅ {count} Nachrichten erfolgreich nach Kelivo exportiert!',
        exportMDSuccess: '✅ {count} Nachrichten erfolgreich als MD-Datei exportiert!',
        exportFailed: '❌ Export fehlgeschlagen: {error}',
        noConversationFound: 'Keine Konversationsnachrichten gefunden',
        unableToGetContent: 'Inhalt konnte nicht über Kopierschaltflächen abgerufen werden, stellen Sie sicher, dass die Seite vollständig geladen ist',
        
        // Content Script - Dialogs
        serverNotRunningTitle: 'Import-Server Läuft Nicht',
        serverNotRunningMessage: 'Verbindung zum Kelivo-Import-Server nicht möglich, bitte starten Sie zuerst den Server',
        serverNotRunningStepsTitle: 'Schritte:',
        serverNotRunningStep1: 'Doppelklicken zum Ausführen',
        serverNotRunningStep2: 'Warten Sie, bis der Server startet (zeigt "Server gestartet")',
        serverNotRunningStep3: 'Kehren Sie zu dieser Seite zurück',
        serverNotRunningStep4: 'Klicken Sie erneut auf "Nach Kelivo exportieren"',
        serverNotRunningTip: '💡 Tipp: Der Server zeigt beim Start ein schwarzes Fenster an, lassen Sie es geöffnet',
        okButton: 'OK',
        
        kelivoRunningTitle: 'Kelivo-Anwendung Läuft',
        kelivoRunningMessage: 'Bitte schließen Sie zuerst die Kelivo-Anwendung und versuchen Sie es erneut',
        kelivoRunningStep1: 'Schließen Sie die Kelivo-Anwendung',
        kelivoRunningStep2: 'Kehren Sie zu dieser Seite zurück',
        kelivoRunningStep3: 'Klicken Sie erneut auf "Nach Kelivo exportieren"',
        
        // Markdown generation
        userRole: 'Benutzer',
        assistantRole: 'Assistent',
        quote: 'Zitat:',
        
        // Default title prefix
        conversationTitlePrefix: 'ChatGPT_Konversation'
    },

    'pt-BR': {
        // Popup UI
        popupTitle: 'Configurações ChatGPT para Kelivo',
        kelivoAssistantName: 'Nome do Assistente Kelivo',
        defaultAssistant: 'Assistente Padrão',
        importServerUrl: 'URL do Servidor de Importação',
        saveSettings: '💾 Salvar Configurações',
        pleaseEnterAssistantName: 'Por favor, insira um nome de assistente',
        pleaseEnterServerUrl: 'Por favor, insira uma URL do servidor',
        settingsSaved: '✅ Configurações salvas',
        usageSteps: '📖 Passos de Uso',
        step1Title: 'Clique duas vezes para executar kelivo_import_server.exe',
        step1Hint: 'Iniciar o servidor de importação (necessário apenas para exportar para Kelivo)',
        step2Title: 'Feche o aplicativo Kelivo',
        step2Hint: '⚠️ Kelivo deve estar fechado durante a importação',
        step3Title: 'Clique no botão de exportação no lado direito da página',
        step3Hint: '• Botão roxo: Exportar para Kelivo\n• Botão verde: Exportar como arquivo MD',
        language: 'Idioma',
        
        // Content Script - Buttons
        exportToKelivo: 'Exportar para Kelivo',
        exportAsMD: 'Exportar como MD',
        
        // Content Script - Messages
        exporting: 'Exportando...',
        preparingExport: 'Preparando exportação...',
        checkingServerStatus: 'Verificando status do servidor...',
        gettingMarkdownContent: 'Obtendo conteúdo Markdown via botões de copiar...',
        generatingMarkdown: 'Gerando Markdown...',
        sendingToKelivo: 'Enviando para Kelivo...',
        loadingAllMessages: 'Carregando todas as mensagens...',
        downloadingFile: 'Baixando arquivo...',
        
        // Content Script - Success/Error Messages
        exportSuccess: '✅ {count} mensagens exportadas com sucesso para Kelivo!',
        exportMDSuccess: '✅ {count} mensagens exportadas com sucesso como arquivo MD!',
        exportFailed: '❌ Falha na exportação: {error}',
        noConversationFound: 'Nenhuma mensagem de conversa encontrada',
        unableToGetContent: 'Não foi possível obter conteúdo via botões de copiar, certifique-se de que a página esteja totalmente carregada',
        
        // Content Script - Dialogs
        serverNotRunningTitle: 'Servidor de Importação Não Está Executando',
        serverNotRunningMessage: 'Não é possível conectar ao servidor de importação do Kelivo, por favor inicie o servidor primeiro',
        serverNotRunningStepsTitle: 'Passos:',
        serverNotRunningStep1: 'Clique duas vezes para executar',
        serverNotRunningStep2: 'Aguarde o servidor iniciar (mostrará "Servidor iniciado")',
        serverNotRunningStep3: 'Retorne a esta página',
        serverNotRunningStep4: 'Clique novamente no botão "Exportar para Kelivo"',
        serverNotRunningTip: '💡 Dica: O servidor exibirá uma janela preta quando iniciado, mantenha-a aberta',
        okButton: 'OK',
        
        kelivoRunningTitle: 'Aplicativo Kelivo Está Executando',
        kelivoRunningMessage: 'Por favor, feche o aplicativo Kelivo primeiro, depois tente novamente',
        kelivoRunningStep1: 'Feche o aplicativo Kelivo',
        kelivoRunningStep2: 'Retorne a esta página',
        kelivoRunningStep3: 'Clique novamente no botão "Exportar para Kelivo"',
        
        // Markdown generation
        userRole: 'Usuário',
        assistantRole: 'Assistente',
        quote: 'Citação:',
        
        // Default title prefix
        conversationTitlePrefix: 'Conversa_ChatGPT'
    },

    ja: {
        // Popup UI
        popupTitle: 'ChatGPT to Kelivo 設定',
        kelivoAssistantName: 'Kelivo アシスタント名',
        defaultAssistant: 'デフォルトアシスタント',
        importServerUrl: 'インポートサーバーURL',
        saveSettings: '💾 設定を保存',
        pleaseEnterAssistantName: 'アシスタント名を入力してください',
        pleaseEnterServerUrl: 'サーバーURLを入力してください',
        settingsSaved: '✅ 設定が保存されました',
        usageSteps: '📖 使用手順',
        step1Title: 'kelivo_import_server.exeをダブルクリックして実行',
        step1Hint: 'インポートサーバーを起動（Kelivoへのエクスポート時のみ必要）',
        step2Title: 'Kelivoアプリケーションを閉じる',
        step2Hint: '⚠️ インポート中はKelivoを閉じる必要があります',
        step3Title: 'ページ右側のエクスポートボタンをクリック',
        step3Hint: '• 紫のボタン：Kelivoにエクスポート\n• 緑のボタン：MDファイルとしてエクスポート',
        language: '言語',
        
        // Content Script - Buttons
        exportToKelivo: 'Kelivoにエクスポート',
        exportAsMD: 'MDとしてエクスポート',
        
        // Content Script - Messages
        exporting: 'エクスポート中...',
        preparingExport: 'エクスポートを準備中...',
        checkingServerStatus: 'サーバー状態を確認中...',
        gettingMarkdownContent: 'コピーボタンでMarkdownコンテンツを取得中...',
        generatingMarkdown: 'Markdownを生成中...',
        sendingToKelivo: 'Kelivoに送信中...',
        loadingAllMessages: 'すべてのメッセージを読み込み中...',
        downloadingFile: 'ファイルをダウンロード中...',
        
        // Content Script - Success/Error Messages
        exportSuccess: '✅ {count}件のメッセージをKelivoに正常にエクスポートしました！',
        exportMDSuccess: '✅ {count}件のメッセージをMDファイルとして正常にエクスポートしました！',
        exportFailed: '❌ エクスポート失敗: {error}',
        noConversationFound: '会話メッセージが見つかりません',
        unableToGetContent: 'コピーボタンでコンテンツを取得できません。ページが完全に読み込まれていることを確認してください',
        
        // Content Script - Dialogs
        serverNotRunningTitle: 'インポートサーバーが実行されていません',
        serverNotRunningMessage: 'Kelivoインポートサーバーに接続できません。最初にサーバーを起動してください',
        serverNotRunningStepsTitle: '手順:',
        serverNotRunningStep1: 'ダブルクリックして実行',
        serverNotRunningStep2: 'サーバーが起動するまで待つ（「サーバー起動」と表示されます）',
        serverNotRunningStep3: 'このページに戻る',
        serverNotRunningStep4: '「Kelivoにエクスポート」ボタンを再度クリック',
        serverNotRunningTip: '💡 ヒント: サーバー起動時に黒いウィンドウが表示されます。開いたままにしてください',
        okButton: 'OK',
        
        kelivoRunningTitle: 'Kelivoアプリケーションが実行中',
        kelivoRunningMessage: '最初にKelivoアプリケーションを閉じてから、再度お試しください',
        kelivoRunningStep1: 'Kelivoアプリケーションを閉じる',
        kelivoRunningStep2: 'このページに戻る',
        kelivoRunningStep3: '「Kelivoにエクスポート」ボタンを再度クリック',
        
        // Markdown generation
        userRole: 'ユーザー',
        assistantRole: 'アシスタント',
        quote: '引用:',
        
        // Default title prefix
        conversationTitlePrefix: 'ChatGPT会話'
    },

    ko: {
        // Popup UI
        popupTitle: 'ChatGPT to Kelivo 설정',
        kelivoAssistantName: 'Kelivo 어시스턴트 이름',
        defaultAssistant: '기본 어시스턴트',
        importServerUrl: '가져오기 서버 URL',
        saveSettings: '💾 설정 저장',
        pleaseEnterAssistantName: '어시스턴트 이름을 입력하세요',
        pleaseEnterServerUrl: '서버 URL을 입력하세요',
        settingsSaved: '✅ 설정이 저장되었습니다',
        usageSteps: '📖 사용 단계',
        step1Title: 'kelivo_import_server.exe를 더블 클릭하여 실행',
        step1Hint: '가져오기 서버 시작 (Kelivo로 내보내기 시에만 필요)',
        step2Title: 'Kelivo 애플리케이션 닫기',
        step2Hint: '⚠️ 가져오기 중에는 Kelivo를 닫아야 합니다',
        step3Title: '페이지 오른쪽의 내보내기 버튼 클릭',
        step3Hint: '• 보라색 버튼: Kelivo로 내보내기\n• 녹색 버튼: MD 파일로 내보내기',
        language: '언어',
        
        // Content Script - Buttons
        exportToKelivo: 'Kelivo로 내보내기',
        exportAsMD: 'MD로 내보내기',
        
        // Content Script - Messages
        exporting: '내보내는 중...',
        preparingExport: '내보내기 준비 중...',
        checkingServerStatus: '서버 상태 확인 중...',
        gettingMarkdownContent: '복사 버튼으로 Markdown 콘텐츠 가져오는 중...',
        generatingMarkdown: 'Markdown 생성 중...',
        sendingToKelivo: 'Kelivo로 전송 중...',
        loadingAllMessages: '모든 메시지 로딩 중...',
        downloadingFile: '파일 다운로드 중...',
        
        // Content Script - Success/Error Messages
        exportSuccess: '✅ {count}개의 메시지가 Kelivo로 성공적으로 내보내졌습니다!',
        exportMDSuccess: '✅ {count}개의 메시지가 MD 파일로 성공적으로 내보내졌습니다!',
        exportFailed: '❌ 내보내기 실패: {error}',
        noConversationFound: '대화 메시지를 찾을 수 없습니다',
        unableToGetContent: '복사 버튼으로 콘텐츠를 가져올 수 없습니다. 페이지가 완전히 로드되었는지 확인하세요',
        
        // Content Script - Dialogs
        serverNotRunningTitle: '가져오기 서버가 실행되지 않음',
        serverNotRunningMessage: 'Kelivo 가져오기 서버에 연결할 수 없습니다. 먼저 서버를 시작하세요',
        serverNotRunningStepsTitle: '단계:',
        serverNotRunningStep1: '더블 클릭하여 실행',
        serverNotRunningStep2: '서버가 시작될 때까지 기다림 ("서버 시작됨" 표시)',
        serverNotRunningStep3: '이 페이지로 돌아오기',
        serverNotRunningStep4: '"Kelivo로 내보내기" 버튼을 다시 클릭',
        serverNotRunningTip: '💡 팁: 서버가 시작되면 검은 창이 표시됩니다. 열어두세요',
        okButton: '확인',
        
        kelivoRunningTitle: 'Kelivo 애플리케이션 실행 중',
        kelivoRunningMessage: '먼저 Kelivo 애플리케이션을 닫고 다시 시도하세요',
        kelivoRunningStep1: 'Kelivo 애플리케이션 닫기',
        kelivoRunningStep2: '이 페이지로 돌아오기',
        kelivoRunningStep3: '"Kelivo로 내보내기" 버튼을 다시 클릭',
        
        // Markdown generation
        userRole: '사용자',
        assistantRole: '어시스턴트',
        quote: '인용:',
        
        // Default title prefix
        conversationTitlePrefix: 'ChatGPT대화'
    },

    hi: {
        // Popup UI
        popupTitle: 'ChatGPT से Kelivo सेटिंग्स',
        kelivoAssistantName: 'Kelivo सहायक का नाम',
        defaultAssistant: 'डिफ़ॉल्ट सहायक',
        importServerUrl: 'आयात सर्वर URL',
        saveSettings: '💾 सेटिंग्स सहेजें',
        pleaseEnterAssistantName: 'कृपया सहायक का नाम दर्ज करें',
        pleaseEnterServerUrl: 'कृपया सर्वर URL दर्ज करें',
        settingsSaved: '✅ सेटिंग्स सहेजी गईं',
        usageSteps: '📖 उपयोग के चरण',
        step1Title: 'kelivo_import_server.exe चलाने के लिए डबल-क्लिक करें',
        step1Hint: 'आयात सर्वर शुरू करें (केवल Kelivo में निर्यात के लिए आवश्यक)',
        step2Title: 'Kelivo एप्लिकेशन बंद करें',
        step2Hint: '⚠️ आयात के दौरान Kelivo बंद होना चाहिए',
        step3Title: 'पृष्ठ के दाईं ओर निर्यात बटन पर क्लिक करें',
        step3Hint: '• बैंगनी बटन: Kelivo में निर्यात करें\n• हरा बटन: MD फ़ाइल के रूप में निर्यात करें',
        language: 'भाषा',
        
        // Content Script - Buttons
        exportToKelivo: 'Kelivo में निर्यात करें',
        exportAsMD: 'MD के रूप में निर्यात करें',
        
        // Content Script - Messages
        exporting: 'निर्यात हो रहा है...',
        preparingExport: 'निर्यात की तैयारी...',
        checkingServerStatus: 'सर्वर स्थिति जाँच रहे हैं...',
        gettingMarkdownContent: 'कॉपी बटन के माध्यम से Markdown सामग्री प्राप्त कर रहे हैं...',
        generatingMarkdown: 'Markdown उत्पन्न कर रहे हैं...',
        sendingToKelivo: 'Kelivo को भेज रहे हैं...',
        loadingAllMessages: 'सभी संदेश लोड हो रहे हैं...',
        downloadingFile: 'फ़ाइल डाउनलोड हो रही है...',
        
        // Content Script - Success/Error Messages
        exportSuccess: '✅ {count} संदेश सफलतापूर्वक Kelivo में निर्यात किए गए!',
        exportMDSuccess: '✅ {count} संदेश सफलतापूर्वक MD फ़ाइल के रूप में निर्यात किए गए!',
        exportFailed: '❌ निर्यात विफल: {error}',
        noConversationFound: 'कोई वार्तालाप संदेश नहीं मिला',
        unableToGetContent: 'कॉपी बटन के माध्यम से सामग्री प्राप्त करने में असमर्थ, कृपया सुनिश्चित करें कि पृष्ठ पूरी तरह से लोड हो गया है',
        
        // Content Script - Dialogs
        serverNotRunningTitle: 'आयात सर्वर नहीं चल रहा',
        serverNotRunningMessage: 'Kelivo आयात सर्वर से कनेक्ट नहीं हो सकता, कृपया पहले सर्वर शुरू करें',
        serverNotRunningStepsTitle: 'चरण:',
        serverNotRunningStep1: 'चलाने के लिए डबल-क्लिक करें',
        serverNotRunningStep2: 'सर्वर शुरू होने की प्रतीक्षा करें ("सर्वर शुरू हुआ" दिखाएगा)',
        serverNotRunningStep3: 'इस पृष्ठ पर वापस आएं',
        serverNotRunningStep4: '"Kelivo में निर्यात करें" बटन पर फिर से क्लिक करें',
        serverNotRunningTip: '💡 सुझाव: सर्वर शुरू होने पर एक काली विंडो दिखाई देगी, इसे खुला रखें',
        okButton: 'ठीक है',
        
        kelivoRunningTitle: 'Kelivo एप्लिकेशन चल रहा है',
        kelivoRunningMessage: 'कृपया पहले Kelivo एप्लिकेशन बंद करें, फिर पुनः प्रयास करें',
        kelivoRunningStep1: 'Kelivo एप्लिकेशन बंद करें',
        kelivoRunningStep2: 'इस पृष्ठ पर वापस आएं',
        kelivoRunningStep3: '"Kelivo में निर्यात करें" बटन पर फिर से क्लिक करें',
        
        // Markdown generation
        userRole: 'उपयोगकर्ता',
        assistantRole: 'सहायक',
        quote: 'उद्धरण:',
        
        // Default title prefix
        conversationTitlePrefix: 'ChatGPT_वार्तालाप'
    }
};

// Current language (default to English)
let currentLanguage = 'en';

// Get translation for a key
function t(key, params = {}) {
    const lang = translations[currentLanguage] || translations.en;
    let text = lang[key] || translations.en[key] || key;
    
    // Replace parameters like {count}, {error}, etc.
    for (const [param, value] of Object.entries(params)) {
        text = text.replace(new RegExp(`\\{${param}\\}`, 'g'), value);
    }
    
    return text;
}

// Set current language
function setLanguage(lang) {
    if (translations[lang]) {
        currentLanguage = lang;
        return true;
    }
    return false;
}

// Get current language
function getLanguage() {
    return currentLanguage;
}

// Get available languages
function getAvailableLanguages() {
    return [
        { code: 'en', name: 'English' },
        { code: 'zh', name: '中文' },
        { code: 'es', name: 'Español' },
        { code: 'fr', name: 'Français' },
        { code: 'de', name: 'Deutsch' },
        { code: 'pt-BR', name: 'Português (Brasil)' },
        { code: 'ja', name: '日本語' },
        { code: 'ko', name: '한국어' },
        { code: 'hi', name: 'हिन्दी' }
    ];
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { t, setLanguage, getLanguage, getAvailableLanguages, translations };
}

// ChatGPT to Kelivo - Content Script
// Injects export buttons into ChatGPT pages

(function() {
    'use strict';

    // ========== Internationalization (i18n) System ==========
    const translations = {
        en: {
            exportToKelivo: 'Export to Kelivo',
            exportAsMD: 'Export as MD',
            exporting: 'Exporting...',
            preparingExport: 'Preparing export...',
            checkingServerStatus: 'Checking server status...',
            gettingMarkdownContent: 'Getting Markdown content via copy buttons...',
            generatingMarkdown: 'Generating Markdown...',
            sendingToKelivo: 'Sending to Kelivo...',
            loadingAllMessages: 'Loading all messages...',
            downloadingFile: 'Downloading file...',
            exportSuccess: '✅ Successfully exported {count} messages to Kelivo!',
            exportMDSuccess: '✅ Successfully exported {count} messages as MD file!',
            exportFailed: '❌ Export failed: {error}',
            noConversationFound: 'No conversation messages found',
            unableToGetContent: 'Unable to get content via copy buttons, please ensure the page is fully loaded',
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
            kelivoRunningStepsTitle: 'Steps:',
            kelivoRunningStep1: 'Close the Kelivo application',
            kelivoRunningStep2: 'Return to this page',
            kelivoRunningStep3: 'Click the "Export to Kelivo" button again',
            userRole: 'User',
            assistantRole: 'Assistant',
            quote: 'Quote:',
            conversationTitlePrefix: 'ChatGPT_Conversation',
            defaultAssistant: 'Default Assistant'
        },
        zh: {
            exportToKelivo: '导出到 Kelivo',
            exportAsMD: '导出为 MD',
            exporting: '导出中...',
            preparingExport: '准备导出...',
            checkingServerStatus: '检查服务器状态...',
            gettingMarkdownContent: '通过复制按钮获取 Markdown 格式内容...',
            generatingMarkdown: '生成 Markdown...',
            sendingToKelivo: '发送到 Kelivo...',
            loadingAllMessages: '正在加载所有消息...',
            downloadingFile: '下载文件...',
            exportSuccess: '✅ 成功导出 {count} 条消息到 Kelivo！',
            exportMDSuccess: '✅ 成功导出 {count} 条消息为 MD 文件！',
            exportFailed: '❌ 导出失败: {error}',
            noConversationFound: '未找到对话消息',
            unableToGetContent: '无法通过复制按钮获取内容，请确保页面已完全加载',
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
            kelivoRunningStepsTitle: '操作步骤：',
            kelivoRunningStep1: '关闭 Kelivo 应用',
            kelivoRunningStep2: '返回此页面',
            kelivoRunningStep3: '重新点击"导出到 Kelivo"按钮',
            userRole: '用户',
            assistantRole: '助手',
            quote: '引用：',
            conversationTitlePrefix: 'ChatGPT对话',
            defaultAssistant: '默认助手'
        },
        es: {
            exportToKelivo: 'Exportar a Kelivo',
            exportAsMD: 'Exportar como MD',
            exporting: 'Exportando...',
            preparingExport: 'Preparando exportación...',
            checkingServerStatus: 'Verificando estado del servidor...',
            gettingMarkdownContent: 'Obteniendo contenido Markdown mediante botones de copiar...',
            generatingMarkdown: 'Generando Markdown...',
            sendingToKelivo: 'Enviando a Kelivo...',
            loadingAllMessages: 'Cargando todos los mensajes...',
            downloadingFile: 'Descargando archivo...',
            exportSuccess: '✅ ¡{count} mensajes exportados exitosamente a Kelivo!',
            exportMDSuccess: '✅ ¡{count} mensajes exportados exitosamente como archivo MD!',
            exportFailed: '❌ Error de exportación: {error}',
            noConversationFound: 'No se encontraron mensajes de conversación',
            unableToGetContent: 'No se puede obtener contenido mediante botones de copiar, asegúrese de que la página esté completamente cargada',
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
            kelivoRunningStepsTitle: 'Pasos:',
            kelivoRunningStep1: 'Cierre la aplicación Kelivo',
            kelivoRunningStep2: 'Regrese a esta página',
            kelivoRunningStep3: 'Haga clic en el botón "Exportar a Kelivo" nuevamente',
            userRole: 'Usuario',
            assistantRole: 'Asistente',
            quote: 'Cita:',
            conversationTitlePrefix: 'Conversación_ChatGPT',
            defaultAssistant: 'Asistente Predeterminado'
        },
        fr: {
            exportToKelivo: 'Exporter vers Kelivo',
            exportAsMD: 'Exporter en MD',
            exporting: 'Exportation...',
            preparingExport: 'Préparation de l\'exportation...',
            checkingServerStatus: 'Vérification de l\'état du serveur...',
            gettingMarkdownContent: 'Obtention du contenu Markdown via les boutons de copie...',
            generatingMarkdown: 'Génération du Markdown...',
            sendingToKelivo: 'Envoi vers Kelivo...',
            loadingAllMessages: 'Chargement de tous les messages...',
            downloadingFile: 'Téléchargement du fichier...',
            exportSuccess: '✅ {count} messages exportés avec succès vers Kelivo!',
            exportMDSuccess: '✅ {count} messages exportés avec succès en fichier MD!',
            exportFailed: '❌ Échec de l\'exportation: {error}',
            noConversationFound: 'Aucun message de conversation trouvé',
            unableToGetContent: 'Impossible d\'obtenir le contenu via les boutons de copie, assurez-vous que la page est entièrement chargée',
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
            kelivoRunningStepsTitle: 'Étapes:',
            kelivoRunningStep1: 'Fermez l\'application Kelivo',
            kelivoRunningStep2: 'Retournez à cette page',
            kelivoRunningStep3: 'Cliquez à nouveau sur le bouton "Exporter vers Kelivo"',
            userRole: 'Utilisateur',
            assistantRole: 'Assistant',
            quote: 'Citation:',
            conversationTitlePrefix: 'Conversation_ChatGPT',
            defaultAssistant: 'Assistant Par Défaut'
        },
        de: {
            exportToKelivo: 'Nach Kelivo exportieren',
            exportAsMD: 'Als MD exportieren',
            exporting: 'Exportiere...',
            preparingExport: 'Export wird vorbereitet...',
            checkingServerStatus: 'Serverstatus wird überprüft...',
            gettingMarkdownContent: 'Markdown-Inhalt über Kopierschaltflächen abrufen...',
            generatingMarkdown: 'Markdown wird generiert...',
            sendingToKelivo: 'An Kelivo senden...',
            loadingAllMessages: 'Alle Nachrichten werden geladen...',
            downloadingFile: 'Datei wird heruntergeladen...',
            exportSuccess: '✅ {count} Nachrichten erfolgreich nach Kelivo exportiert!',
            exportMDSuccess: '✅ {count} Nachrichten erfolgreich als MD-Datei exportiert!',
            exportFailed: '❌ Export fehlgeschlagen: {error}',
            noConversationFound: 'Keine Konversationsnachrichten gefunden',
            unableToGetContent: 'Inhalt konnte nicht über Kopierschaltflächen abgerufen werden, stellen Sie sicher, dass die Seite vollständig geladen ist',
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
            kelivoRunningStepsTitle: 'Schritte:',
            kelivoRunningStep1: 'Schließen Sie die Kelivo-Anwendung',
            kelivoRunningStep2: 'Kehren Sie zu dieser Seite zurück',
            kelivoRunningStep3: 'Klicken Sie erneut auf "Nach Kelivo exportieren"',
            userRole: 'Benutzer',
            assistantRole: 'Assistent',
            quote: 'Zitat:',
            conversationTitlePrefix: 'ChatGPT_Konversation',
            defaultAssistant: 'Standardassistent'
        },
        'pt-BR': {
            exportToKelivo: 'Exportar para Kelivo',
            exportAsMD: 'Exportar como MD',
            exporting: 'Exportando...',
            preparingExport: 'Preparando exportação...',
            checkingServerStatus: 'Verificando status do servidor...',
            gettingMarkdownContent: 'Obtendo conteúdo Markdown via botões de copiar...',
            generatingMarkdown: 'Gerando Markdown...',
            sendingToKelivo: 'Enviando para Kelivo...',
            loadingAllMessages: 'Carregando todas as mensagens...',
            downloadingFile: 'Baixando arquivo...',
            exportSuccess: '✅ {count} mensagens exportadas com sucesso para Kelivo!',
            exportMDSuccess: '✅ {count} mensagens exportadas com sucesso como arquivo MD!',
            exportFailed: '❌ Falha na exportação: {error}',
            noConversationFound: 'Nenhuma mensagem de conversa encontrada',
            unableToGetContent: 'Não foi possível obter conteúdo via botões de copiar, certifique-se de que a página esteja totalmente carregada',
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
            kelivoRunningStepsTitle: 'Passos:',
            kelivoRunningStep1: 'Feche o aplicativo Kelivo',
            kelivoRunningStep2: 'Retorne a esta página',
            kelivoRunningStep3: 'Clique novamente no botão "Exportar para Kelivo"',
            userRole: 'Usuário',
            assistantRole: 'Assistente',
            quote: 'Citação:',
            conversationTitlePrefix: 'Conversa_ChatGPT',
            defaultAssistant: 'Assistente Padrão'
        },
        ja: {
            exportToKelivo: 'Kelivoにエクスポート',
            exportAsMD: 'MDとしてエクスポート',
            exporting: 'エクスポート中...',
            preparingExport: 'エクスポートを準備中...',
            checkingServerStatus: 'サーバー状態を確認中...',
            gettingMarkdownContent: 'コピーボタンでMarkdownコンテンツを取得中...',
            generatingMarkdown: 'Markdownを生成中...',
            sendingToKelivo: 'Kelivoに送信中...',
            loadingAllMessages: 'すべてのメッセージを読み込み中...',
            downloadingFile: 'ファイルをダウンロード中...',
            exportSuccess: '✅ {count}件のメッセージをKelivoに正常にエクスポートしました！',
            exportMDSuccess: '✅ {count}件のメッセージをMDファイルとして正常にエクスポートしました！',
            exportFailed: '❌ エクスポート失敗: {error}',
            noConversationFound: '会話メッセージが見つかりません',
            unableToGetContent: 'コピーボタンでコンテンツを取得できません。ページが完全に読み込まれていることを確認してください',
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
            kelivoRunningStepsTitle: '手順:',
            kelivoRunningStep1: 'Kelivoアプリケーションを閉じる',
            kelivoRunningStep2: 'このページに戻る',
            kelivoRunningStep3: '「Kelivoにエクスポート」ボタンを再度クリック',
            userRole: 'ユーザー',
            assistantRole: 'アシスタント',
            quote: '引用:',
            conversationTitlePrefix: 'ChatGPT会話',
            defaultAssistant: 'デフォルトアシスタント'
        },
        ko: {
            exportToKelivo: 'Kelivo로 내보내기',
            exportAsMD: 'MD로 내보내기',
            exporting: '내보내는 중...',
            preparingExport: '내보내기 준비 중...',
            checkingServerStatus: '서버 상태 확인 중...',
            gettingMarkdownContent: '복사 버튼으로 Markdown 콘텐츠 가져오는 중...',
            generatingMarkdown: 'Markdown 생성 중...',
            sendingToKelivo: 'Kelivo로 전송 중...',
            loadingAllMessages: '모든 메시지 로딩 중...',
            downloadingFile: '파일 다운로드 중...',
            exportSuccess: '✅ {count}개의 메시지가 Kelivo로 성공적으로 내보내졌습니다!',
            exportMDSuccess: '✅ {count}개의 메시지가 MD 파일로 성공적으로 내보내졌습니다!',
            exportFailed: '❌ 내보내기 실패: {error}',
            noConversationFound: '대화 메시지를 찾을 수 없습니다',
            unableToGetContent: '복사 버튼으로 콘텐츠를 가져올 수 없습니다. 페이지가 완전히 로드되었는지 확인하세요',
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
            kelivoRunningStepsTitle: '단계:',
            kelivoRunningStep1: 'Kelivo 애플리케이션 닫기',
            kelivoRunningStep2: '이 페이지로 돌아오기',
            kelivoRunningStep3: '"Kelivo로 내보내기" 버튼을 다시 클릭',
            userRole: '사용자',
            assistantRole: '어시스턴트',
            quote: '인용:',
            conversationTitlePrefix: 'ChatGPT대화',
            defaultAssistant: '기본 어시스턴트'
        },
        hi: {
            exportToKelivo: 'Kelivo में निर्यात करें',
            exportAsMD: 'MD के रूप में निर्यात करें',
            exporting: 'निर्यात हो रहा है...',
            preparingExport: 'निर्यात की तैयारी...',
            checkingServerStatus: 'सर्वर स्थिति जाँच रहे हैं...',
            gettingMarkdownContent: 'कॉपी बटन के माध्यम से Markdown सामग्री प्राप्त कर रहे हैं...',
            generatingMarkdown: 'Markdown उत्पन्न कर रहे हैं...',
            sendingToKelivo: 'Kelivo को भेज रहे हैं...',
            loadingAllMessages: 'सभी संदेश लोड हो रहे हैं...',
            downloadingFile: 'फ़ाइल डाउनलोड हो रही है...',
            exportSuccess: '✅ {count} संदेश सफलतापूर्वक Kelivo में निर्यात किए गए!',
            exportMDSuccess: '✅ {count} संदेश सफलतापूर्वक MD फ़ाइल के रूप में निर्यात किए गए!',
            exportFailed: '❌ निर्यात विफल: {error}',
            noConversationFound: 'कोई वार्तालाप संदेश नहीं मिला',
            unableToGetContent: 'कॉपी बटन के माध्यम से सामग्री प्राप्त करने में असमर्थ, कृपया सुनिश्चित करें कि पृष्ठ पूरी तरह से लोड हो गया है',
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
            kelivoRunningStepsTitle: 'चरण:',
            kelivoRunningStep1: 'Kelivo एप्लिकेशन बंद करें',
            kelivoRunningStep2: 'इस पृष्ठ पर वापस आएं',
            kelivoRunningStep3: '"Kelivo में निर्यात करें" बटन पर फिर से क्लिक करें',
            userRole: 'उपयोगकर्ता',
            assistantRole: 'सहायक',
            quote: 'उद्धरण:',
            conversationTitlePrefix: 'ChatGPT_वार्तालाप',
            defaultAssistant: 'डिफ़ॉल्ट सहायक'
        }
    };

    let currentLanguage = 'en';

    // Get translation for a key
    function t(key, params = {}) {
        const lang = translations[currentLanguage] || translations.en;
        let text = lang[key] || translations.en[key] || key;
        
        for (const [param, value] of Object.entries(params)) {
            text = text.replace(new RegExp(`\\{${param}\\}`, 'g'), value);
        }
        
        return text;
    }

    // Load language preference from storage
    function loadLanguagePreference() {
        chrome.storage.sync.get({ language: 'en' }, (items) => {
            currentLanguage = items.language;
            updateButtonLabels();
        });
    }

    // Update button labels based on current language
    function updateButtonLabels() {
        const kelivoBtn = document.getElementById('kelivo-export-btn');
        const mdBtn = document.getElementById('kelivo-export-md-btn');
        
        if (kelivoBtn) {
            const span = kelivoBtn.querySelector('span');
            if (span) span.textContent = t('exportToKelivo');
        }
        
        if (mdBtn) {
            const span = mdBtn.querySelector('span');
            if (span) span.textContent = t('exportAsMD');
        }
    }

    // Listen for language change messages from popup
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'languageChanged') {
            currentLanguage = request.language;
            updateButtonLabels();
        }
    });

    // ========== End of i18n System ==========

    // Create floating button
    function createExportButton() {
        const button = document.createElement('button');
        button.id = 'kelivo-export-btn';
        button.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>${t('exportToKelivo')}</span>
        `;

        button.onclick = handleExport;
        document.body.appendChild(button);

        // Create export MD button
        const mdButton = document.createElement('button');
        mdButton.id = 'kelivo-export-md-btn';
        mdButton.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="12" y1="19" x2="12" y2="11"></line>
                <polyline points="9 14 12 11 15 14"></polyline>
            </svg>
            <span>${t('exportAsMD')}</span>
        `;

        mdButton.onclick = handleExportMD;
        document.body.appendChild(mdButton);
    }

    // Final fix version: Use spatial position to find copy buttons
    async function extractByClickingCopyButtons() {
        console.log('🔥 Attempting to get complete content via copy buttons...');

        try {
            // Find all message elements
            const messageElements = document.querySelectorAll('[data-message-author-role]');
            console.log(`Found ${messageElements.length} messages`);

            if (messageElements.length === 0) {
                console.log('❌ No message elements found');
                return null;
            }

            // Get all copy buttons on the page
            // Multi-language support: supports 20+ language "Copy" buttons
            const copyButtonLabels = [
                // English
                'Copy',
                // Chinese (Simplified)
                '复制',
                // Japanese
                'コピー',
                // Korean
                '복사',
                // Spanish
                'Copiar',
                // French
                'Copier',
                // German
                'Kopieren',
                // Italian
                'Copia',
                // Portuguese
                'Copiar',
                // Russian
                'Копировать',
                // Arabic
                'نسخ',
                // Thai
                'คัดลอก',
                // Vietnamese
                'Sao chép',
                // Indonesian
                'Salin',
                // Turkish
                'Kopyala',
                // Greek
                'Αντιγραφή',
                // Hebrew
                'העתק',
                // Hindi
                'कॉपी करें',
                // Chinese (Traditional)
                '複製',
                // Ukrainian
                'Копіювати',
                // Polish
                'Kopiuj',
                // Czech
                'Kopírovat',
                // Romanian
                'Copiere'
            ];

            const allCopyButtons = Array.from(document.querySelectorAll('button')).filter(btn => {
                const ariaLabel = btn.getAttribute('aria-label') || '';
                return copyButtonLabels.includes(ariaLabel);
            });
            console.log(`Found ${allCopyButtons.length} copy buttons on page`);

            const messages = [];

            // Extract content for each message
            for (let i = 0; i < messageElements.length; i++) {
                const msgElement = messageElements[i];
                const role = msgElement.getAttribute('data-message-author-role');

                console.log(`\nProcessing message ${i + 1}/${messageElements.length} [${role}]...`);

                // Trigger mouse hover event to show copy button
                msgElement.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
                msgElement.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

                // Wait for button to appear
                await new Promise(resolve => setTimeout(resolve, 500));

                // Key improvement: Use spatial position to find copy button
                // Button is below message, distance 4-62px
                const msgRect = msgElement.getBoundingClientRect();
                let copyButton = null;
                let closestDistance = Infinity;

                // Find the nearest copy button below the message
                for (const btn of allCopyButtons) {
                    const btnRect = btn.getBoundingClientRect();

                    // Check if button is below the message (allow 100px tolerance)
                    if (btnRect.top >= msgRect.bottom - 100) {
                        const distance = btnRect.top - msgRect.bottom;

                        // Find the closest button
                        if (distance < closestDistance) {
                            closestDistance = distance;
                            copyButton = btn;
                        }
                    }
                }

                if (copyButton) {
                    console.log(`  ✅ Found message copy button (distance ${closestDistance.toFixed(0)}px)`);
                    console.log(`    aria-label: ${copyButton.getAttribute('aria-label')}`);
                    console.log(`    className: ${copyButton.className.substring(0, 80)}...`);

                    // Get content by simulating click (HTML format, then convert to Markdown)
                    const copiedContent = await getCopyButtonContent(copyButton, msgElement);

                    if (copiedContent && copiedContent.markdown && copiedContent.markdown.trim()) {
                        console.log(`  ✅ Successfully got Markdown content, length: ${copiedContent.markdown.length}`);

                        // Use converted Markdown content
                        let content = copiedContent.markdown;

                        messages.push({ role, content });
                    } else if (copiedContent && copiedContent.text && copiedContent.text.trim()) {
                        console.log(`  ⚠️ Only got plain text, length: ${copiedContent.text.length}`);

                        // Fall back to plain text
                        let content = copiedContent.text;

                        messages.push({ role, content });
                    } else {
                        console.log(`  ❌ Copy button click failed, skipping this message`);
                    }
                } else {
                    console.log(`  ❌ No corresponding copy button found, skipping this message`);
                }

                // Wait a bit to avoid going too fast
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            console.log(`\n=== Extraction complete ===`);
            console.log(`Total messages: ${messageElements.length}`);
            console.log(`Successfully extracted: ${messages.length}`);
            console.log(`Failed/skipped: ${messageElements.length - messages.length}`);

            if (messages.length < messageElements.length) {
                console.log(`\n⚠️ ${messageElements.length - messages.length} messages could not be extracted`);
                console.log(`Possible reasons:`);
                console.log(`  1. Copy button click failed or timed out`);
                console.log(`  2. Failed to get clipboard content`);
            }

            return messages.length > 0 ? messages : null;

        } catch (error) {
            console.log('❌ Copy button method failed:', error.message);
            return null;
        }
    }

    // Get content via copy button (get HTML and convert to Markdown)
    async function getCopyButtonContent(button, msgElement) {
        return new Promise((resolve) => {
            let copiedContent = { text: '', html: '', markdown: '' };
            let resolved = false;

            // Method 1: Try to read clipboard directly
            const tryReadClipboard = async () => {
                try {
                    if (navigator.clipboard && navigator.clipboard.readText) {
                        const text = await navigator.clipboard.readText();
                        if (text && text.trim()) {
                            return { text, html: '', markdown: text };
                        }
                    }
                } catch (e) {
                    // Ignore permission errors
                }
                return null;
            };

            // Method 2: Listen for copy event, get HTML and convert to Markdown
            const copyListener = (e) => {
                if (!resolved) {
                    try {
                        // Get plain text
                        const plainText = e.clipboardData.getData('text/plain');

                        // Get HTML (this is the key!)
                        const html = e.clipboardData.getData('text/html');

                        if (plainText && plainText.trim()) {
                            console.log(`    ✅ Got content via copy event`);
                            console.log(`      Plain text length: ${plainText.length}`);
                            console.log(`      HTML length: ${html ? html.length : 0}`);

                            // If HTML exists, convert to Markdown
                            let markdown = plainText;
                            if (html && html.trim()) {
                                console.log(`      🔄 Converting HTML to Markdown...`);
                                markdown = convertHtmlToMarkdown(html);
                                console.log(`      ✅ Converted Markdown length: ${markdown.length}`);
                            }

                            copiedContent = {
                                text: plainText,
                                html: html || '',
                                markdown: markdown
                            };

                            resolved = true;
                            document.removeEventListener('copy', copyListener);
                            resolve(copiedContent);
                        }
                    } catch (e) {
                        console.log('    Failed to read clipboard data:', e.message);
                    }
                }
            };

            document.addEventListener('copy', copyListener);

            // Method 3: Try multiple click methods
            const clickButton = async () => {
                try {
                    // Ensure button is visible
                    button.scrollIntoView({ behavior: 'auto', block: 'nearest' });

                    // Method 1: Direct click
                    button.click();
                    await new Promise(resolve => setTimeout(resolve, 500));

                    // Check if successful
                    if (!resolved) {
                        let result = await tryReadClipboard();
                        if (result && result.text) {
                            console.log(`    ✅ Got content via clipboard API, length: ${result.text.length}`);
                            resolved = true;
                            document.removeEventListener('copy', copyListener);
                            resolve(result);
                            return;
                        }
                    }

                    // Method 2: Trigger mouse events
                    if (!resolved) {
                        button.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
                        button.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
                        button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                        await new Promise(resolve => setTimeout(resolve, 500));

                        // Check again
                        let result = await tryReadClipboard();
                        if (result && result.text) {
                            console.log(`    ✅ Got content via clipboard API, length: ${result.text.length}`);
                            resolved = true;
                            document.removeEventListener('copy', copyListener);
                            resolve(result);
                            return;
                        }
                    }

                } catch (e) {
                    console.log('    Failed to click copy button:', e.message);
                }
            };

            // Execute click
            clickButton();

            // Timeout handling (increased to 3 seconds)
            setTimeout(() => {
                if (!resolved) {
                    resolved = true;
                    document.removeEventListener('copy', copyListener);
                    console.log('    ⚠️ Copy timeout (3 seconds), no content retrieved');
                    console.log('    Possible reasons:');
                    console.log('      1. Message contains images, copy button unavailable');
                    console.log('      2. Copy button click failed');
                    console.log('      3. Network delay or page not fully loaded');
                    resolve(copiedContent);
                }
            }, 3000);
        });
    }

    // Convert HTML to Markdown
    function convertHtmlToMarkdown(html) {
        // Create a temporary DOM element to parse HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        // Use existing htmlToMarkdown function
        return htmlToMarkdown(tempDiv);
    }

    // Extract content from element (fallback method)
    function extractContentFromElement(element) {
        const contentSelectors = [
            '.markdown',
            '.whitespace-pre-wrap',
            '[class*="prose"]',
            'article',
            '[class*="message-content"]'
        ];

        for (const selector of contentSelectors) {
            const contentEl = element.querySelector(selector);
            if (contentEl) {
                return contentEl.textContent.trim();
            }
        }

        return element.textContent.trim();
    }

    // New method: Use MutationObserver to listen for DOM changes, ensure all content is loaded
    async function waitForAllMessagesToLoad() {
        console.log('🔥 Using MutationObserver to wait for all messages to load...');

        return new Promise((resolve) => {
            let messageCount = 0;
            let stableCount = 0;
            const maxStableCount = 5; // Consider loaded after 5 consecutive unchanged checks

            // Get initial message count
            messageCount = document.querySelectorAll('[data-message-author-role]').length;
            console.log(`Initial message count: ${messageCount}`);

            // Create MutationObserver
            const observer = new MutationObserver(() => {
                const newCount = document.querySelectorAll('[data-message-author-role]').length;

                if (newCount > messageCount) {
                    console.log(`Detected new messages: ${messageCount} -> ${newCount}`);
                    messageCount = newCount;
                    stableCount = 0; // Reset stable count
                } else {
                    stableCount++;
                }

                // If no new messages for multiple consecutive checks, consider loading complete
                if (stableCount >= maxStableCount) {
                    console.log(`✅ Message count stable at ${messageCount}, stopping observation`);
                    observer.disconnect();
                    resolve();
                }
            });

            // Observe changes to the main element
            const main = document.querySelector('main') || document.body;
            observer.observe(main, {
                childList: true,
                subtree: true
            });

            // Trigger scroll to load content
            console.log('Starting scroll to trigger content loading...');
            triggerScrollToLoadContent();

            // Set timeout, wait up to 30 seconds
            setTimeout(() => {
                console.log('⚠️ Timeout, stopping wait');
                observer.disconnect();
                resolve();
            }, 30000);
        });
    }

    // Trigger scroll to load content
    async function triggerScrollToLoadContent() {
        const main = document.querySelector('main');
        if (!main) return;

        // Quickly scroll to bottom and top multiple times to trigger content loading
        for (let i = 0; i < 3; i++) {
            // Scroll to bottom
            main.scrollTop = main.scrollHeight;
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Scroll to top
            main.scrollTop = 0;
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // Finally stop in the middle
        main.scrollTop = main.scrollHeight / 2;
    }

    // Improved scroll method: Scroll to each message one by one to ensure content is fully loaded
    async function scrollToLoadAllMessagesFromBottom() {
        console.log('🔥 Starting to scroll and load all message content one by one...');

        // First try to find all message elements
        let messageElements = document.querySelectorAll('[data-message-author-role]');
        console.log(`Found ${messageElements.length} messages`);

        if (messageElements.length === 0) {
            console.log('⚠️ No message elements found, skipping scroll');
            return;
        }

        const messageArray = Array.from(messageElements);

        // Key improvement: Scroll from first to last, one by one, wait for content to load
        console.log('Starting to scroll to each message to ensure content is fully loaded...');

        for (let i = 0; i < messageArray.length; i++) {
            const message = messageArray[i];
            const role = message.getAttribute('data-message-author-role');

            console.log(`Scrolling to message ${i + 1}/${messageArray.length} [${role}]...`);

            // Scroll to message center
            message.scrollIntoView({ behavior: 'auto', block: 'center' });

            // Wait 2 seconds to ensure content is fully rendered
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Check if content is loaded
            const contentEl = message.querySelector('.markdown, .whitespace-pre-wrap, [class*="prose"]');
            if (contentEl) {
                const contentLength = contentEl.textContent.length;
                console.log(`  Content length: ${contentLength} characters`);
            }
        }

        console.log('✅ All messages scrolled');

        // Finally scroll to top
        console.log('Scrolling to top...');
        messageArray[0].scrollIntoView({ behavior: 'auto', block: 'start' });
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Simplified: Only use scrollIntoView method
    async function ensureAllMessagesLoaded(progressCallback) {
        console.log('=== Starting to load all messages ===');

        // Use new scrollIntoView method
        if (progressCallback) progressCallback('Loading all messages...');
        await scrollToLoadAllMessagesFromBottom();

        console.log('=== Message loading complete ===');
    }

    // Expand all collapsed content
    function expandAllCollapsedContent() {
        let expandedCount = 0;

        // Find all buttons
        const allButtons = document.querySelectorAll('button');

        allButtons.forEach(btn => {
            const text = btn.innerText?.toLowerCase() || '';
            const ariaLabel = btn.getAttribute('aria-label')?.toLowerCase() || '';

            // Check if it's an expand/show more button
            if (text.includes('展开') || text.includes('expand') ||
                text.includes('显示更多') || text.includes('show more') ||
                ariaLabel.includes('展开') || ariaLabel.includes('expand')) {
                try {
                    btn.click();
                    expandedCount++;
                } catch (e) {
                    // Ignore click errors
                }
            }
        });

        console.log(`Expanded ${expandedCount} collapsed content items`);
    }

    // Wait for all messages to be rendered
    async function waitForMessagesRendered() {
        return new Promise((resolve) => {
            // Wait for streaming output to complete
            setTimeout(resolve, 2000);
        });
    }

    // Extract conversation content
    async function extractConversation(progressCallback) {
        // Only use copy button method to get Markdown format content
        if (progressCallback) progressCallback('Getting Markdown content via copy buttons...');

        console.log('🔥 Using copy button method to get Markdown format content');

        const copyMessages = await extractByClickingCopyButtons();

        if (copyMessages && copyMessages.length > 0) {
            console.log(`✅ Successfully got ${copyMessages.length} messages via copy buttons`);
            return copyMessages;
        }

        console.log('❌ Copy button method failed, unable to get content');
        throw new Error('Unable to get content via copy buttons, please ensure the page is fully loaded');

        const messages = [];

        // ChatGPT message selectors (adjust according to actual page structure)
        const selectors = [
            '[data-message-author-role]',
            '.group.w-full',
            '[class*="conversation-turn"]'
        ];

        let messageElements = null;
        let usedSelector = '';
        for (const selector of selectors) {
            messageElements = document.querySelectorAll(selector);
            if (messageElements.length > 0) {
                usedSelector = selector;
                break;
            }
        }

        if (!messageElements || messageElements.length === 0) {
            throw new Error('No conversation messages found');
        }

        console.log(`Using selector: ${usedSelector}`);
        console.log(`Found ${messageElements.length} message elements`);

        // Changed to for...of loop to support async/await
        const messageArray = Array.from(messageElements);
        for (let index = 0; index < messageArray.length; index++) {
            const element = messageArray[index];

            // Scroll to current message to ensure content is fully rendered
            try {
                element.scrollIntoView({ behavior: 'auto', block: 'center' });
                // Increased wait time to 2000ms (2 seconds) to ensure content is fully rendered
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(`Failed to scroll to message ${index + 1}:`, e);
            }

            // Determine role
            let role = 'assistant';
            const roleAttr = element.getAttribute('data-message-author-role');

            if (roleAttr === 'user') {
                role = 'user';
            } else if (roleAttr === 'assistant') {
                role = 'assistant';
            } else if (element.classList.contains('user') ||
                       element.querySelector('[class*="user"]')) {
                role = 'user';
            }

            console.log(`Message ${index + 1}: role=${role}, roleAttr=${roleAttr}`);

            // Debug: Output element HTML structure (first 500 characters only)
            if (index < 3) {  // Only output structure for first 3 messages
                console.log(`  HTML structure preview:`, element.outerHTML.substring(0, 500));
            }

            // Extract content - prioritize HTML to Markdown to preserve formatting
            let content = '';
            let contentElement = null;
            let usedContentSelector = '';

            // Method 1: Try markdown container first (most common)
            const markdownEl = element.querySelector('.markdown, [class*="markdown"]');
            if (markdownEl) {
                contentElement = markdownEl;
                usedContentSelector = '.markdown';
                console.log(`  Found markdown container, child element count: ${markdownEl.children.length}`);
            }

            // Method 2: Try prose container
            if (!contentElement) {
                const proseEl = element.querySelector('[class*="prose"]');
                if (proseEl) {
                    contentElement = proseEl;
                    usedContentSelector = '[class*="prose"]';
                    console.log(`  Found prose container, child element count: ${proseEl.children.length}`);
                }
            }

            // Method 3: Try whitespace-pre-wrap
            if (!contentElement) {
                const preWrapEl = element.querySelector('.whitespace-pre-wrap');
                if (preWrapEl) {
                    contentElement = preWrapEl;
                    usedContentSelector = '.whitespace-pre-wrap';
                    console.log(`  Found whitespace-pre-wrap container, child element count: ${preWrapEl.children.length}`);
                }
            }

            // Method 4: Find article or main content container
            if (!contentElement) {
                const articleEl = element.querySelector('article, [class*="message-content"]');
                if (articleEl) {
                    contentElement = articleEl;
                    usedContentSelector = 'article/message-content';
                    console.log(`  Found article container, child element count: ${articleEl.children.length}`);
                }
            }

            // Method 5: Use the entire element
            if (!contentElement) {
                contentElement = element;
                usedContentSelector = 'element itself';
                console.log(`  Using entire element, child element count: ${element.children.length}`);
            }

            // Debug: Output content element structure
            if (index < 3 && contentElement) {
                console.log(`  Content element HTML preview:`, contentElement.outerHTML.substring(0, 800));
            }

            // Convert HTML to Markdown
            if (contentElement) {
                const enableDebug = index < 3; // Only enable debug for first 3 messages
                if (enableDebug) {
                    console.log(`  === Starting HTML to Markdown conversion (message ${index + 1}) ===`);
                }
                content = htmlToMarkdown(contentElement, enableDebug);
                if (enableDebug) {
                    console.log(`  === Conversion complete, Markdown length: ${content.length} ===`);
                    console.log(`  Markdown preview:\n${content.substring(0, 500)}`);
                }
            }

            // If HTML conversion fails, fall back to plain text
            if (!content || content.trim().length === 0) {
                content = contentElement.innerText?.trim() || contentElement.textContent?.trim() || '';
                usedContentSelector += ' (fallback to text)';
            }

            // Clean content: remove possible button text and other noise
            if (content) {
                // Remove common button text
                const noisePatterns = [
                    /^(Copy code|复制代码|Edit|编辑|Regenerate|重新生成)\s*/gm,
                    /\n(Copy code|复制代码|Edit|编辑|Regenerate|重新生成)\s*$/gm
                ];

                for (const pattern of noisePatterns) {
                    content = content.replace(pattern, '');
                }

                content = content.trim();
            }

            console.log(`  Content selector: ${usedContentSelector}, content length: ${content.length}`);

            if (content) {
                // Filter out some possible noise text
                const isNoise = content.length < 2 ||
                               content.match(/^(ChatGPT|You|复制|Copy|编辑|Edit)$/i);

                if (!isNoise) {
                    messages.push({ role, content });
                    console.log(`  ✓ Added message ${messages.length}: ${content.substring(0, 50)}...`);
                } else {
                    console.log(`  ✗ Skipped noise text: ${content}`);
                }

                if (progressCallback && (index + 1) % 10 === 0) {
                    progressCallback(`Extracted ${index + 1}/${messageArray.length} messages...`);
                }
            } else {
                console.log(`  ✗ No content found`);
            }
        } // End of for loop

        console.log(`Successfully extracted ${messages.length} messages`);
        console.log('Message details:', messages.map((m, i) => `${i + 1}. [${m.role}] ${m.content.substring(0, 30)}...`));
        return messages;
    }

    // Get conversation title
    function getConversationTitle() {
        // Method 1: Get current active conversation title from sidebar
        const activeConversation = document.querySelector('nav a[aria-current="page"]');
        if (activeConversation) {
            const titleElement = activeConversation.querySelector('div[class*="truncate"]') ||
                                activeConversation.querySelector('div');
            if (titleElement && titleElement.innerText.trim()) {
                const title = titleElement.innerText.trim();
                if (title.length > 0 && !title.match(/^(New chat|新对话|ChatGPT)$/i)) {
                    console.log('Got title from sidebar:', title);
                    return title;
                }
            }
        }

        // Method 2: Use page meta title
        const metaTitle = document.querySelector('meta[property="og:title"]');
        if (metaTitle && metaTitle.content && metaTitle.content.trim()) {
            const title = metaTitle.content.trim();
            if (title !== 'ChatGPT') {
                console.log('Got title from meta tag:', title);
                return title;
            }
        }

        // Method 3: Use page title
        if (document.title && document.title.trim() && document.title !== 'ChatGPT') {
            // Remove " - ChatGPT" suffix
            const title = document.title.replace(/\s*-\s*ChatGPT\s*$/, '').trim();
            if (title.length > 0) {
                console.log('Got title from page title:', title);
                return title;
            }
        }

        // Method 4: Get conversation ID from URL as part of title
        const urlMatch = window.location.pathname.match(/\/c\/([a-zA-Z0-9-]+)/);
        if (urlMatch) {
            const conversationId = urlMatch[1];
            const now = new Date();
            const dateStr = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}`;
            const title = `${t('conversationTitlePrefix')}_${dateStr}_${conversationId.substring(0, 8)}`;
            console.log('Using conversation ID to generate title:', title);
            return title;
        }

        // Default title
        const now = new Date();
        const title = `${t('conversationTitlePrefix')}_${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}`;
        console.log('Using default title:', title);
        return title;
    }

    // HTML to Markdown helper function
    function htmlToMarkdown(element, debug = false) {
        if (!element) return '';

        // Clone element to avoid modifying original DOM
        const clone = element.cloneNode(true);

        // Remove unwanted elements (buttons, toolbars, etc.)
        const removeSelectors = [
            'button',
            '[class*="copy"]',
            '[class*="toolbar"]',
            '[role="button"]',
            '.sr-only'
        ];
        removeSelectors.forEach(selector => {
            clone.querySelectorAll(selector).forEach(el => {
                if (debug) console.log(`  Removing element: ${el.tagName} - ${el.className}`);
                el.remove();
            });
        });

        if (debug) {
            console.log(`  Cloned element child node count: ${clone.childNodes.length}`);
            console.log(`  Cloned element child element count: ${clone.children.length}`);
        }

        let markdown = '';

        function processNode(node, listLevel = 0, debug = false) {
            if (node.nodeType === Node.TEXT_NODE) {
                return node.textContent;
            }

            if (node.nodeType !== Node.ELEMENT_NODE) {
                return '';
            }

            const tag = node.tagName.toLowerCase();
            let result = '';

            if (debug && (tag === 'ul' || tag === 'ol' || tag === 'li')) {
                console.log(`    Processing ${tag} element, listLevel=${listLevel}, child node count=${node.childNodes.length}`);
            }

            switch (tag) {
                case 'h1':
                    result = '\n# ' + getTextContent(node) + '\n\n';
                    break;
                case 'h2':
                    result = '\n## ' + getTextContent(node) + '\n\n';
                    break;
                case 'h3':
                    result = '\n### ' + getTextContent(node) + '\n\n';
                    break;
                case 'h4':
                    result = '\n#### ' + getTextContent(node) + '\n\n';
                    break;
                case 'h5':
                    result = '\n##### ' + getTextContent(node) + '\n\n';
                    break;
                case 'h6':
                    result = '\n###### ' + getTextContent(node) + '\n\n';
                    break;
                case 'p':
                    result = processChildren(node, listLevel) + '\n\n';
                    break;
                case 'br':
                    result = '\n';
                    break;
                case 'strong':
                case 'b':
                    result = '**' + getTextContent(node) + '**';
                    break;
                case 'em':
                case 'i':
                    result = '*' + getTextContent(node) + '*';
                    break;
                case 'code':
                    // Inline code
                    if (node.parentElement.tagName.toLowerCase() !== 'pre') {
                        result = '`' + getTextContent(node) + '`';
                    } else {
                        result = getTextContent(node);
                    }
                    break;
                case 'pre':
                    // Code block
                    const codeEl = node.querySelector('code');
                    if (codeEl) {
                        const language = extractLanguage(codeEl);
                        const code = getTextContent(codeEl);
                        result = '\n```' + language + '\n' + code + '\n```\n\n';
                    } else {
                        result = '\n```\n' + getTextContent(node) + '\n```\n\n';
                    }
                    break;
                case 'a':
                    const href = node.getAttribute('href') || '';
                    const text = getTextContent(node);
                    result = '[' + text + '](' + href + ')';
                    break;
                case 'ul':
                case 'ol':
                    result = '\n' + processListItems(node, tag === 'ol', listLevel, debug) + '\n';
                    break;
                case 'li':
                    // Handled by processListItems
                    result = processChildren(node, listLevel);
                    break;
                case 'blockquote':
                    // Don't use > quote syntax to avoid conflict with Kelivo's role markers
                    // Use indentation or other methods to represent quotes
                    const quoteContent = processChildren(node, listLevel);
                    result = '\n**' + t('quote') + '**\n' + quoteContent + '\n\n';
                    break;
                case 'hr':
                    result = '\n---\n\n';
                    break;
                case 'table':
                    result = processTable(node);
                    break;
                case 'img':
                    const alt = node.getAttribute('alt') || '';
                    const src = node.getAttribute('src') || '';
                    result = '![' + alt + '](' + src + ')';
                    break;
                case 'div':
                case 'span':
                case 'article':
                case 'section':
                    result = processChildren(node, listLevel);
                    break;
                default:
                    result = processChildren(node, listLevel);
            }

            return result;
        }

        function processChildren(node, listLevel = 0, debug = false) {
            let result = '';
            for (const child of node.childNodes) {
                result += processNode(child, listLevel, debug);
            }
            return result;
        }

        function getTextContent(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                return node.textContent;
            }
            let text = '';
            for (const child of node.childNodes) {
                if (child.nodeType === Node.TEXT_NODE) {
                    text += child.textContent;
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    const tag = child.tagName.toLowerCase();
                    if (tag === 'strong' || tag === 'b') {
                        text += '**' + getTextContent(child) + '**';
                    } else if (tag === 'em' || tag === 'i') {
                        text += '*' + getTextContent(child) + '*';
                    } else if (tag === 'code' && child.parentElement.tagName.toLowerCase() !== 'pre') {
                        text += '`' + getTextContent(child) + '`';
                    } else {
                        text += getTextContent(child);
                    }
                }
            }
            return text;
        }

        function processListItems(listNode, isOrdered, listLevel, debug = false) {
            let result = '';
            let index = 1;
            const items = Array.from(listNode.children).filter(child =>
                child.tagName.toLowerCase() === 'li'
            );

            if (debug) {
                console.log(`    processListItems: found ${items.length} li elements, listLevel=${listLevel}`);
            }

            items.forEach((li, liIndex) => {
                if (debug) {
                    console.log(`      Processing li ${liIndex + 1}/${items.length}, child node count=${li.childNodes.length}`);
                    console.log(`      li HTML preview: ${li.outerHTML.substring(0, 200)}`);
                }

                // Fix: Use more spaces to ensure Kelivo correctly recognizes nested lists
                // Level 1: 3 spaces (* marker)
                // Level 2: 5 spaces (indented)
                // Level 3+: Add 2 spaces per level
                let indent = '';
                if (listLevel === 0) {
                    indent = '';
                } else if (listLevel === 1) {
                    indent = '     '; // 5 spaces
                } else {
                    indent = '     ' + '  '.repeat(listLevel - 1); // 5 + 2*(level-1) spaces
                }
                const marker = isOrdered ? `${index}. ` : '* ';

                // Process li content directly without increasing listLevel
                // This preserves the complete format
                let content = '';
                let hasNestedList = false;

                // Iterate through all child nodes of li
                for (const child of li.childNodes) {
                    if (child.nodeType === Node.TEXT_NODE) {
                        const text = child.textContent;
                        if (debug && text.trim()) {
                            console.log(`        Text node: "${text.trim().substring(0, 50)}"`);
                        }
                        content += text;
                    } else if (child.nodeType === Node.ELEMENT_NODE) {
                        const tag = child.tagName.toLowerCase();

                        if (debug) {
                            console.log(`        Element node: <${tag}>`);
                        }

                        // For nested lists, process recursively
                        if (tag === 'ul' || tag === 'ol') {
                            hasNestedList = true;
                            // Nested lists need extra newline and indentation
                            content += '\n' + processListItems(child, tag === 'ol', listLevel + 1, debug);
                        } else {
                            // Other elements processed normally
                            content += processNode(child, listLevel, debug);
                        }
                    }
                }

                content = content.trim();

                if (debug) {
                    console.log(`      li content length: ${content.length}, preview: "${content.substring(0, 100)}"`);
                }

                // Handle multi-line content
                const lines = content.split('\n');
                if (lines.length > 0 && lines[0].trim()) {
                    // First line with list marker
                    result += indent + marker + lines[0].trim() + '\n';

                    // Subsequent lines aligned (if nested list, keep original indentation)
                    for (let i = 1; i < lines.length; i++) {
                        const line = lines[i];
                        if (line.trim()) {
                            // If this line already has indentation (nested list), keep original indentation
                            if (line.match(/^\s+[*\-\d]/)) {
                                // This is a nested list item, keep original indentation
                                result += indent + '  ' + line + '\n';
                            } else {
                                // Otherwise add alignment indentation (aligned with content after list marker)
                                result += indent + '  ' + line.trim() + '\n';
                            }
                        }
                    }
                } else {
                    if (debug) {
                        console.log(`      ⚠️ li content is empty, skipping`);
                    }
                }

                index++;
            });

            if (debug) {
                console.log(`    processListItems complete, generated content length: ${result.length}`);
            }

            return result;
        }

        function extractLanguage(codeElement) {
            // Try to extract language from class
            const classes = codeElement.className.split(' ');
            for (const cls of classes) {
                if (cls.startsWith('language-')) {
                    return cls.substring(9);
                }
                if (cls.startsWith('lang-')) {
                    return cls.substring(5);
                }
            }
            return '';
        }

        function processTable(tableNode) {
            const rows = Array.from(tableNode.querySelectorAll('tr'));
            if (rows.length === 0) return '';

            let result = '\n';

            rows.forEach((row, rowIndex) => {
                const cells = Array.from(row.querySelectorAll('th, td'));
                result += '| ' + cells.map(cell => getTextContent(cell).trim()).join(' | ') + ' |\n';

                // Add header separator
                if (rowIndex === 0) {
                    result += '| ' + cells.map(() => '---').join(' | ') + ' |\n';
                }
            });

            return result + '\n';
        }

        markdown = processNode(clone, 0, debug);

        // Clean up extra blank lines
        markdown = markdown.replace(/\n{3,}/g, '\n\n');

        if (debug) {
            console.log(`  Final Markdown length: ${markdown.length}`);
        }

        return markdown.trim();
    }

    // Generate Markdown (conforming to Kelivo import format)
    function generateMarkdown(messages, title) {
        let markdown = `# ${title}\n\n`;

        messages.forEach((msg, index) => {
            const roleLabel = msg.role === 'user' ? t('userRole') : t('assistantRole');

            // Process quotes in message content to avoid conflict with role markers
            let content = msg.content;

            // Convert Markdown quotes (> text) to indented format
            // Use 4 spaces indentation to represent quoted content
            const lines = content.split('\n');
            const processedLines = [];

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                if (line.trim().startsWith('>')) {
                    // Remove > symbol, add 4 space indentation
                    const quotedText = line.replace(/^>\s*/, '');
                    processedLines.push(`    ${quotedText}`);
                } else {
                    processedLines.push(line);
                }
            }

            content = processedLines.join('\n');

            // Use > to mark role (Kelivo import format requirement)
            markdown += `> ${roleLabel}\n\n${content}\n\n`;
        });

        return markdown;
    }

    // Show loading state
    function showLoading(show, message = null, isMD = false) {
        const buttonId = isMD ? 'kelivo-export-md-btn' : 'kelivo-export-btn';
        const button = document.getElementById(buttonId);
        if (!button) return;

        if (show) {
            button.disabled = true;
            button.innerHTML = `
                <div class="spinner"></div>
                <span>${message || t('exporting')}</span>
            `;
        } else {
            button.disabled = false;
            if (isMD) {
                button.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="12" y1="19" x2="12" y2="11"></line>
                        <polyline points="9 14 12 11 15 14"></polyline>
                    </svg>
                    <span>${t('exportAsMD')}</span>
                `;
            } else {
                button.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    <span>${t('exportToKelivo')}</span>
                `;
            }
        }
    }

    // Show notification
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `kelivo-notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Show server not running dialog
    function showServerNotRunningDialog() {
        const dialog = document.createElement('div');
        dialog.className = 'kelivo-dialog-overlay';
        dialog.innerHTML = `
            <div class="kelivo-dialog">
                <div class="kelivo-dialog-icon">🚫</div>
                <h2 class="kelivo-dialog-title">${t('serverNotRunningTitle')}</h2>
                <p class="kelivo-dialog-message">${t('serverNotRunningMessage')}</p>
                <div class="kelivo-dialog-steps">
                    <h3>${t('serverNotRunningStepsTitle')}</h3>
                    <ol>
                        <li><strong>${t('serverNotRunningStep1')}</strong> <code>kelivo_import_server.exe</code></li>
                        <li>${t('serverNotRunningStep2')}</li>
                        <li>${t('serverNotRunningStep3')}</li>
                        <li>${t('serverNotRunningStep4')}</li>
                    </ol>
                </div>
                <div class="kelivo-dialog-note">
                    <strong>${t('serverNotRunningTip')}</strong>
                </div>
                <div class="kelivo-dialog-buttons">
                    <button class="kelivo-dialog-btn kelivo-dialog-btn-primary">
                        ${t('okButton')}
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(dialog);

        // Add close button event listener
        const closeBtn = dialog.querySelector('.kelivo-dialog-btn-primary');
        closeBtn.addEventListener('click', () => {
            dialog.remove();
        });

        // Click on overlay to close
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) {
                dialog.remove();
            }
        });
    }

    // Show Kelivo running dialog
    function showKelivoRunningDialog(message) {
        const dialog = document.createElement('div');
        dialog.className = 'kelivo-dialog-overlay';
        dialog.innerHTML = `
            <div class="kelivo-dialog">
                <div class="kelivo-dialog-icon">⚠️</div>
                <h2 class="kelivo-dialog-title">${t('kelivoRunningTitle')}</h2>
                <p class="kelivo-dialog-message">${message || t('kelivoRunningMessage')}</p>
                <div class="kelivo-dialog-steps">
                    <h3>${t('kelivoRunningStepsTitle')}</h3>
                    <ol>
                        <li>${t('kelivoRunningStep1')}</li>
                        <li>${t('kelivoRunningStep2')}</li>
                        <li>${t('kelivoRunningStep3')}</li>
                    </ol>
                </div>
                <div class="kelivo-dialog-buttons">
                    <button class="kelivo-dialog-btn kelivo-dialog-btn-primary">
                        ${t('okButton')}
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(dialog);

        // Add close button event listener
        const closeBtn = dialog.querySelector('.kelivo-dialog-btn-primary');
        closeBtn.addEventListener('click', () => {
            dialog.remove();
        });

        // Click on overlay to close
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) {
                dialog.remove();
            }
        });
    }

    // Check server status
    async function checkServerStatus() {
        console.log('[Content] Starting server status check...');
        return new Promise((resolve) => {
            chrome.runtime.sendMessage({
                action: 'checkServer'
            }, (response) => {
                console.log('[Content] Received server check response:', response);
                if (response && response.success && response.running) {
                    console.log('[Content] ✅ Server is running');
                    resolve(true);
                } else {
                    console.log('[Content] ❌ Server not running');
                    resolve(false);
                }
            });
        });
    }

    // Generate Markdown with metadata (for MD file export)
    function generateMarkdownWithMetadata(messages, title) {
        // Generate unique topicId
        const now = new Date();
        const timestamp = now.getTime();
        const topicId = `topic_${timestamp}_${Math.random().toString(36).substring(2, 9)}`;

        // Get assistant name (from popup settings, default to translated default)
        const assistantName = t('defaultAssistant');

        // Generate YAML front matter
        const yamlMetadata = `---
assistantName: ${assistantName}
topicId: ${topicId}
topicName: ${title}
---`;

        // Generate conversation content
        let markdown = yamlMetadata + '\n';

        messages.forEach((msg, index) => {
            const roleLabel = msg.role === 'user' ? `🧑‍💻 ${t('userRole')}` : `🤖 ${t('assistantRole')}`;

            // Process quotes in message content
            let content = msg.content;
            const lines = content.split('\n');
            const processedLines = [];

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                if (line.trim().startsWith('>')) {
                    const quotedText = line.replace(/^>\s*/, '');
                    processedLines.push(`    ${quotedText}`);
                } else {
                    processedLines.push(line);
                }
            }

            content = processedLines.join('\n');

            // Use ## to mark role
            markdown += `\n## ${roleLabel}\n\n${content}\n`;
        });

        return markdown;
    }

    // Handle MD export
    async function handleExportMD() {
        try {
            showLoading(true, t('preparingExport'), true);

            // Extract conversation (with progress callback)
            const messages = await extractConversation((progress) => {
                showLoading(true, progress, true);
            });

            if (messages.length === 0) {
                throw new Error(t('noConversationFound'));
            }

            console.log(`Preparing to export ${messages.length} messages as MD`);
            showLoading(true, t('generatingMarkdown'), true);

            // Get title
            const title = getConversationTitle();

            // Generate Markdown with metadata
            const markdown = generateMarkdownWithMetadata(messages, title);

            showLoading(true, t('downloadingFile'), true);

            // Create Blob and download
            const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${title}_${new Date().getTime()}.md`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            showLoading(false, null, true);
            showNotification(t('exportMDSuccess', { count: messages.length }), 'success');

        } catch (error) {
            showLoading(false, null, true);
            console.error('MD export error:', error);
            showNotification(t('exportFailed', { error: error.message }), 'error');
        }
    }

    // Handle export
    async function handleExport() {
        try {
            showLoading(true, t('checkingServerStatus'));

            // Check if server is running
            const serverRunning = await checkServerStatus();

            if (!serverRunning) {
                showLoading(false);
                showServerNotRunningDialog();
                return;
            }

            showLoading(true, t('preparingExport'));

            // Extract conversation (with progress callback)
            const messages = await extractConversation((progress) => {
                showLoading(true, progress);
            });

            if (messages.length === 0) {
                throw new Error(t('noConversationFound'));
            }

            console.log(`Preparing to export ${messages.length} messages`);
            showLoading(true, t('generatingMarkdown'));

            // Get title
            const title = getConversationTitle();

            // Generate Markdown
            const markdown = generateMarkdown(messages, title);

            showLoading(true, t('sendingToKelivo'));

            // Send to background script
            chrome.runtime.sendMessage({
                action: 'exportToKelivo',
                data: {
                    markdown: markdown,
                    title: title,
                    messageCount: messages.length
                }
            }, (response) => {
                showLoading(false);

                if (response && response.success) {
                    showNotification(t('exportSuccess', { count: messages.length }), 'success');
                } else {
                    const errorMsg = response?.error || t('exportFailed', { error: 'Unknown error' });

                    // Check if it's a Kelivo running error
                    if (errorMsg.startsWith('KELIVO_RUNNING:')) {
                        const message = errorMsg.replace('KELIVO_RUNNING:', '');
                        showKelivoRunningDialog(message);
                    } else {
                        throw new Error(errorMsg);
                    }
                }
            });

        } catch (error) {
            showLoading(false);
            console.error('Export error:', error);
            showNotification(t('exportFailed', { error: error.message }), 'error');
        }
    }

    // Initialize
    function init() {
        // Load language preference first
        loadLanguagePreference();
        
        // Wait for page to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createExportButton);
        } else {
            createExportButton();
        }
    }

    init();
})();


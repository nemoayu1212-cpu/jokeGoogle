document.addEventListener('DOMContentLoaded', () => {
    const indexForm = document.getElementById('search-form');
    const indexInput = document.getElementById('search-input');

    const smallForm = document.getElementById('search-form-small');
    const smallInput = document.getElementById('search-input-small');
    const resultMessage = document.getElementById('result-message');

    // 1. index.html で検索されたときの処理
    if (indexForm) {
        indexForm.addEventListener('submit', (e) => {
            e.preventDefault(); // フォームのデフォルト送信をキャンセル
            const query = indexInput.value.trim();
            if (query !== '') {
                // 入力された文字を一時保存して、URLに ?q= をつけずに404notFound.htmlへジャンプ
                sessionStorage.setItem('searchQuery', query);
                window.location.href = '404notFound.html';
            }
        });
    }

    // 2. 404notFound.html が開かれたときの処理
    if (smallForm) {
        // 保存されていた検索ワードを取り出す
        const savedQuery = sessionStorage.getItem('searchQuery');

        if (savedQuery) {
            smallInput.value = savedQuery;
            document.title = `${savedQuery} - Google 検索`;
            resultMessage.innerHTML = `「<span style="color: #202124; font-weight: bold;">${escapeHtml(savedQuery)}</span>」に一致する情報は見つかりませんでした。`;
        }

        // 404画面側のバーで再検索されたとき
        smallForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newQuery = smallInput.value.trim();
            if (newQuery !== '') {
                sessionStorage.setItem('searchQuery', newQuery);
                window.location.reload(); // ページを更新して新しい検索結果を反映
            }
        });
    }
});

// XSS対策用エスケープ
function escapeHtml(str) {
    return str.replace(/[&'`<>]/g, (match) => ({
        '&': '&amp;',
        "'": '&#x27;',
        '`': '&#x60;',
        '<': '&lt;',
        '>': '&gt;'
    }[match]));
}
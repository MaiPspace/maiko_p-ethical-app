/**
 * 気づかずエシカル - UI制御
 */

document.addEventListener('DOMContentLoaded', () => {
    const state = {
        selectedLifestyles: [],
        selectedHobbies: [],
        ethicalLevel: 3
    };

    // 1. ライフスタイルオプションの生成
    const lifestyleContainer = document.getElementById('lifestyle-options');
    LIFESTYLES.forEach(ls => {
        const div = document.createElement('div');
        div.className = 'option-card';
        div.textContent = ls.name;
        div.onclick = () => {
            div.classList.toggle('selected');
            if (state.selectedLifestyles.includes(ls.id)) {
                state.selectedLifestyles = state.selectedLifestyles.filter(id => id !== ls.id);
            } else {
                state.selectedLifestyles.push(ls.id);
            }
        };
        lifestyleContainer.appendChild(div);
    });

    // 2. 趣味タグの生成
    const hobbyContainer = document.getElementById('hobby-options');
    Object.values(HOBBIES).flat().forEach(hobby => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = hobby;
        span.onclick = () => {
            span.classList.toggle('selected');
            if (state.selectedHobbies.includes(hobby)) {
                state.selectedHobbies = state.selectedHobbies.filter(h => h !== hobby);
            } else {
                state.selectedHobbies.push(hobby);
            }
        };
        hobbyContainer.appendChild(span);
    });

    // 3. 重視度スライダーの連動
    const slider = document.getElementById('ethical-level');
    const levelDesc = document.getElementById('level-desc');
    const descs = {
        1: "レベル1: ホワイトリスト企業のみを表示します",
        2: "レベル2: 推奨企業を優先し、ボイコット企業は警告付きで表示します",
        3: "レベル3: 推奨企業と代替案企業をバランスよく表示します",
        4: "レベル4: 全企業を表示しますが、スコア順に提示します",
        5: "レベル5: 評価を無視してすべての企業を表示します"
    };
    slider.oninput = (e) => {
        state.ethicalLevel = e.target.value;
        levelDesc.textContent = descs[state.ethicalLevel];
    };

    // 4. 画面遷移ロジック
    const navigate = (fromId, toId) => {
        document.getElementById(fromId).classList.remove('active');
        document.getElementById(toId).classList.add('active');
        window.scrollTo(0, 0);
    };

    document.getElementById('btn-start').onclick = () => navigate('screen-welcome', 'screen-lifestyle');
    document.getElementById('btn-to-hobbies').onclick = () => navigate('screen-lifestyle', 'screen-hobbies');
    
    document.getElementById('btn-generate').onclick = () => {
        const result = generateEthicalList(state.selectedLifestyles, state.selectedHobbies, state.ethicalLevel);
        renderResults(result);
        navigate('screen-hobbies', 'screen-result');
    };

    document.getElementById('btn-restart').onclick = () => location.reload();

    // 5. 結果レンダリング
    const renderResults = (items) => {
        const container = document.getElementById('result-container');
        container.innerHTML = '';

        // カテゴリごとにグループ化
        const groups = {};
        items.forEach(item => {
            if (!groups[item.category]) groups[item.category] = [];
            groups[item.category].push(item);
        });

        for (const [category, products] of Object.entries(groups)) {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'category-group';
            groupDiv.innerHTML = `<h3 class="category-title">${category}</h3>`;
            
            products.forEach(p => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'product-item';
                
                let companyHtml = '';
                p.companies.forEach(c => {
                    const typeClass = c.score >= 3 ? 'white' : (c.score === 1 ? 'warn' : 'alt');
                    companyHtml += `<span class="badge ${typeClass}">${c.name}${c.reason ? ' (' + c.reason + ')' : ''}</span>`;
                });

                itemDiv.innerHTML = `
                    <div class="product-name">${p.name}${p.isAI ? '<span class="ai-label">AI推論</span>' : ''}</div>
                    <div class="company-badges">${companyHtml || '<span class="badge alt">推奨企業情報を検索中...</span>'}</div>
                `;
                groupDiv.appendChild(itemDiv);
            });
            container.appendChild(groupDiv);
        }
    };
});

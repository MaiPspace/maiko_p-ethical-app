/**
 * 気づかずエシカル - UI制御 (V2)
 */

document.addEventListener('DOMContentLoaded', () => {
    const state = {
        selectedLifestyles: [],
        selectedHobbies: [],
        ethicalLevel: 3
    };

    // 1. ライフスタイル生成
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

    // 2. 趣味タグ生成
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

    // 3. スライダー
    const slider = document.getElementById('ethical-level');
    const levelDesc = document.getElementById('level-desc');
    const descs = {
        1: "最小限の推奨商品のみ",
        2: "推奨優先・代替案あり",
        3: "標準的なエシカル選択",
        4: "徹底したエシカル選択",
        5: "すべての候補を表示"
    };
    levelDesc.textContent = descs[3];
    slider.oninput = (e) => {
        state.ethicalLevel = e.target.value;
        levelDesc.textContent = descs[state.ethicalLevel];
    };

    // 4. 生成ボタン
    document.getElementById('btn-generate').onclick = () => {
        const results = generateEthicalList(state.selectedLifestyles, state.selectedHobbies, state.ethicalLevel);
        renderResults(results);
        document.getElementById('screen-selection').style.display = 'none';
        document.getElementById('screen-result').style.display = 'block';
        window.scrollTo(0, 0);
    };

    document.getElementById('btn-restart').onclick = () => {
        document.getElementById('screen-result').style.display = 'none';
        document.getElementById('screen-selection').style.display = 'block';
    };

    function renderResults(items) {
        const container = document.getElementById('result-container');
        container.innerHTML = '';

        items.forEach(item => {
            const a = document.createElement('a');
            a.className = 'result-card';
            a.href = item.url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';

            a.innerHTML = `
                <div class="product-info">
                    <span class="product-label">${item.brand}</span>
                    <div class="product-name">${item.name}</div>
                    <div class="ethical-reason">${item.reason}</div>
                    <div class="buy-badge">商品ページで見る</div>
                </div>
            `;
            container.appendChild(a);
        });
    }
});

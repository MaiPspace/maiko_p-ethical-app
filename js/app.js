/**
 * 気づかずエシカル - UI制御 (刷新版)
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
    const allHobbies = Object.values(HOBBIES).flat();
    allHobbies.forEach(hobby => {
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

    // 3. 重視度スライダー
    const slider = document.getElementById('ethical-level');
    const levelDesc = document.getElementById('level-desc');
    const descs = {
        1: "最小限の推奨企業のみ表示",
        2: "推奨優先・ボイコット警告あり",
        3: "推奨と代替案をバランスよく表示",
        4: "全企業をスコア順に表示",
        5: "すべての企業を等しく表示"
    };
    levelDesc.textContent = descs[3];
    slider.oninput = (e) => {
        state.ethicalLevel = e.target.value;
        levelDesc.textContent = descs[state.ethicalLevel];
    };

    // 4. 生成ロジックと高速表示の検証
    document.getElementById('btn-generate').onclick = () => {
        const startTime = performance.now();
        
        // 画面切り替え
        document.getElementById('screen-selection').classList.remove('active');
        document.getElementById('screen-result').classList.add('active');
        window.scrollTo(0, 0);

        // リスト生成
        const result = generateEthicalList(state.selectedLifestyles, state.selectedHobbies, state.ethicalLevel);
        
        // 即座にレンダリング
        renderResults(result);

        const endTime = performance.now();
        console.log(`表示速度: ${endTime - startTime}ms`);
    };

    document.getElementById('btn-restart').onclick = () => location.reload();

    function renderResults(items) {
        const container = document.getElementById('result-container');
        container.innerHTML = '';

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'result-card';
            
            let badges = '';
            item.companies.forEach(c => {
                const badgeClass = c.score >= 3 ? 'badge-white' : 'badge-alt';
                badges += `<span class="badge ${badgeClass}">${c.name}${c.reason ? ' (' + c.reason + ')' : ''}</span>`;
            });

            card.innerHTML = `
                <div class="category-label">${item.category}</div>
                <div class="product-title">${item.name}</div>
                <div class="company-list">${badges || '<span class="badge badge-alt">推奨企業情報を最適化中...</span>'}</div>
            `;
            container.appendChild(card);
        });
    }
});

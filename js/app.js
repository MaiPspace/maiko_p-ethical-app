/**
 * 気づかずエシカル - UI制御 (V2)
 */

document.addEventListener('DOMContentLoaded', () => {
    const state = {
        selectedLifestyles: [],
        selectedHobbies: [],
        sensitivity: {} // カテゴリーごとの感度 (1-5)
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

    // 3. 価値観の軸 (3カテゴリー) 感度スライダー生成
    const slidersContainer = document.getElementById('ethical-sensitivity-sliders');
    ETHICAL_CATEGORIES.forEach(cat => {
        const wrapper = document.createElement('div');
        wrapper.className = 'slider-wrapper';
        wrapper.innerHTML = `
            <div class="slider-label">
                <span class="cat-name">${cat.name}</span>
                <span class="cat-value" id="val-${cat.id}">感度: 3</span>
            </div>
            <p class="cat-desc">${cat.desc}</p>
            <input type="range" class="range-slider" min="1" max="5" value="3" id="range-${cat.id}">
        `;
        
        const slider = wrapper.querySelector('input');
        const valText = wrapper.querySelector('.cat-value');
        
        slider.oninput = (e) => {
            state.sensitivity[cat.id] = parseInt(e.target.value);
            valText.textContent = `感度: ${e.target.value}`;
        };
        
        // 初期状態の保存
        state.sensitivity[cat.id] = 3;
        
        slidersContainer.appendChild(wrapper);
    });

    // 4. 生成ボタン
    document.getElementById('btn-generate').onclick = () => {
        const results = generateEthicalList(state.selectedLifestyles, state.selectedHobbies, state.sensitivity);
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

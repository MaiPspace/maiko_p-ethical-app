/**
 * 気づかずエシカル - アプリケーション・コア (V3.9: プレミアム・UX・調整版)
 */

document.addEventListener('DOMContentLoaded', () => {
    const lifestyleContainer = document.getElementById('lifestyle-options');
    const hobbyContainer = document.getElementById('hobby-options');
    const sensitivityContainer = document.getElementById('ethical-sensitivity-sliders');
    const btnGenerate = document.getElementById('btn-generate');
    const btnRestart = document.getElementById('btn-restart');
    const screenSelection = document.getElementById('screen-selection');
    const screenResult = document.getElementById('screen-result');
    const resultContainer = document.getElementById('result-container');

    let selectedLifestyles = new Set();
    let selectedHobbies = new Set();
    let sensitivityData = {};

    // 1. ライフスタイル選択（カード型）の描画
    LIFESTYLES.forEach(ls => {
        const div = document.createElement('div');
        div.className = 'option-card';
        div.innerHTML = `<span>${ls.name}</span>`;
        div.onclick = () => {
            div.classList.toggle('selected');
            if (selectedLifestyles.has(ls.id)) selectedLifestyles.delete(ls.id);
            else selectedLifestyles.add(ls.id);
        };
        lifestyleContainer.appendChild(div);
    });

    // 2. 趣味選択（チップ型）の描画
    Object.keys(HOBBIES).forEach(cat => {
        HOBBIES[cat].forEach(hobby => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = hobby;
            span.onclick = () => {
                span.classList.toggle('selected');
                if (selectedHobbies.has(hobby)) selectedHobbies.delete(hobby);
                else selectedHobbies.add(hobby);
            };
            hobbyContainer.appendChild(span);
        });
    });

    // 3. 価値観スライダー（パラメーター）の描画 - ここを修正！
    ETHICAL_CATEGORIES.forEach(cat => {
        sensitivityData[cat.id] = 50; // デフォルト値
        
        const wrapper = document.createElement('div');
        wrapper.className = 'slider-container';
        
        wrapper.innerHTML = `
            <div class="slider-label">
                <span>${cat.name}</span>
                <span id="val-${cat.id}">50%</span>
            </div>
            <input type="range" class="range-slider" 
                   min="0" max="100" value="50" 
                   id="slider-${cat.id}">
        `;
        
        const slider = wrapper.querySelector('input');
        slider.oninput = (e) => {
            const val = e.target.value;
            sensitivityData[cat.id] = parseInt(val);
            wrapper.querySelector(`#val-${cat.id}`).textContent = `${val}%`;
        };
        
        sensitivityContainer.appendChild(wrapper);
    });

    // リスト生成
    btnGenerate.onclick = () => {
        const results = generateEthicalList(
            Array.from(selectedLifestyles),
            Array.from(selectedHobbies),
            sensitivityData
        );

        renderResults(results);
        screenSelection.classList.remove('active');
        screenResult.classList.add('active');
        window.scrollTo(0, 0);
    };

    btnRestart.onclick = () => {
        screenResult.classList.remove('active');
        screenSelection.classList.add('active');
    };

    function renderResults(groupedData) {
        resultContainer.innerHTML = '';
        
        if (Object.keys(groupedData).length === 0) {
            resultContainer.innerHTML = '<p class="brand-message">選択条件に合うエシカル商品が見つかりませんでした。条件を変えてみてください。</p>';
            return;
        }

        for (const [category, products] of Object.entries(groupedData)) {
            const section = document.createElement('div');
            section.className = 'category-block';
            section.innerHTML = `<h3 class="category-title">${category}</h3>`;
            
            const grid = document.createElement('div');
            grid.className = 'results-grid'; // CSSに合わせる

            products.forEach(p => {
                const card = document.createElement('a');
                card.className = 'result-card';
                card.href = p.url;
                card.target = "_blank";
                card.innerHTML = `
                    <div class="product-label">${p.brand}</div>
                    <div class="product-name">${p.name}</div>
                    <div class="ethical-reason">${p.reason}</div>
                `;
                grid.appendChild(card);
            });
            
            section.appendChild(grid);
            resultContainer.appendChild(section);
        }
    }
});

/**
 * 気づかずエシカル - UI制御 (堅牢版)
 */

document.addEventListener('DOMContentLoaded', () => {
    const state = {
        selectedLifestyles: [],
        selectedHobbies: [],
        ethicalLevel: 3
    };

    // 初期化関数
    function init() {
        try {
            renderLifestyles();
            renderHobbies();
            initSlider();
            initGenerateButton();
            initRestartButton();
        } catch (e) {
            console.error("Initialization failed:", e);
        }
    }

    function renderLifestyles() {
        const container = document.getElementById('lifestyle-options');
        if (!container) return;
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
            container.appendChild(div);
        });
    }

    function renderHobbies() {
        const container = document.getElementById('hobby-options');
        if (!container) return;
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
            container.appendChild(span);
        });
    }

    function initSlider() {
        const slider = document.getElementById('ethical-level');
        const levelDesc = document.getElementById('level-desc');
        const descs = {
            1: "最小限の推奨企業のみ表示",
            2: "推奨優先・ボイコット警告あり",
            3: "推奨と代替案をバランスよく表示",
            4: "全企業をスコア順に表示",
            5: "すべての企業を等しく表示"
        };
        if (slider && levelDesc) {
            levelDesc.textContent = descs[3];
            slider.oninput = (e) => {
                state.ethicalLevel = e.target.value;
                levelDesc.textContent = descs[state.ethicalLevel];
            };
        }
    }

    function initGenerateButton() {
        const btn = document.getElementById('btn-generate');
        if (!btn) return;
        btn.onclick = () => {
            try {
                // 画面切り替え
                const selScreen = document.getElementById('screen-selection');
                const resScreen = document.getElementById('screen-result');
                if (selScreen && resScreen) {
                    selScreen.classList.remove('active');
                    resScreen.classList.add('active');
                    window.scrollTo(0, 0);
                }

                // リスト生成
                const result = generateEthicalList(state.selectedLifestyles, state.selectedHobbies, state.ethicalLevel);
                
                // レンダリング
                renderResults(result);
            } catch (err) {
                alert("生成中にエラーが発生しました。");
                console.error(err);
            }
        };
    }

    function renderResults(items) {
        const container = document.getElementById('result-container');
        if (!container) return;
        container.innerHTML = '';

        if (items.length === 0) {
            container.innerHTML = '<p style="text-align:center; padding: 20px;">条件に合う商品が見つかりませんでした。</p>';
            return;
        }

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'result-card';
            
            let badges = '';
            const companies = item.companies || [];
            companies.forEach(c => {
                const badgeClass = c.score >= 3 ? 'badge-white' : '';
                badges += `<span class="badge ${badgeClass}">${c.name}${c.reason ? ' (' + c.reason + ')' : ''}</span>`;
            });

            card.innerHTML = `
                <div class="category-tag">${item.category}</div>
                <div class="product-name">${item.name}</div>
                <div class="company-list">${badges || '<span class="badge">推奨情報を確認中</span>'}</div>
            `;
            container.appendChild(card);
        });
    }

    function initRestartButton() {
        const btn = document.getElementById('btn-restart');
        if (btn) btn.onclick = () => location.reload();
    }

    init();
});

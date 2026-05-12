/**
 * 気づかずエシカル - リスト生成アルゴリズム (修正版)
 */

function generateEthicalList(selectedLifestyleIds, selectedHobbyNames, ethicalLevel) {
    let resultList = [];

    // ステップ1: 必需品自動追加
    REQUIRED_PRODUCTS.forEach(p => {
        resultList.push({ name: p, category: "必需品", companies: matchCompanies(p, "必需品", ethicalLevel) });
    });

    // ステップ2: 選択ライフスタイルから物品抽出
    selectedLifestyleIds.forEach(id => {
        const products = LIFESTYLE_PRODUCT_MAP[id] || [];
        const lsName = LIFESTYLES.find(l => l.id === id).name;
        products.forEach(p => {
            resultList.push({ name: p, category: `ライフスタイル (${lsName})`, companies: matchCompanies(p, lsName, ethicalLevel) });
        });
    });

    // ステップ3: 非選択ライフスタイルから逆算判定
    const allIds = LIFESTYLES.map(l => l.id);
    const notSelectedIds = allIds.filter(id => !selectedLifestyleIds.includes(id));
    
    notSelectedIds.forEach(id => {
        if (INVERSE_LIFESTYLE_MAP[id]) {
            const data = INVERSE_LIFESTYLE_MAP[id];
            data.products.forEach(p => {
                resultList.push({ 
                    name: p, 
                    category: `AI逆算判定 (${data.reason})`, 
                    companies: matchCompanies(p, data.reason, ethicalLevel),
                    isAI: true
                });
            });
        }
    });

    // ステップ4: 選択趣味から物品抽出
    selectedHobbyNames.forEach(name => {
        const products = HOBBY_PRODUCT_MAP[name] || [`${name}関連用品`];
        products.forEach(p => {
            resultList.push({ name: p, category: `趣味 (${name})`, companies: matchCompanies(p, name, ethicalLevel) });
        });
    });

    return resultList;
}

/**
 * 企業マッチングロジック (強化版)
 */
function matchCompanies(productName, categoryOrTag, level) {
    let matches = [];
    const lowerName = productName.toLowerCase();
    const lowerTag = categoryOrTag.toLowerCase();

    // コーヒー関連
    if (lowerName.includes("コーヒー") || lowerName.includes("珈琲")) {
        matches = COMPANIES.filter(c => ["UCC", "キーコーヒー", "コメダ珈琲", "上島珈琲店", "スターバックス"].includes(c.name));
    } 
    // スポーツ・靴関連
    else if (lowerName.includes("スポーツ") || lowerTag.includes("スポーツ") || lowerName.includes("靴") || lowerName.includes("プロテイン")) {
        matches = COMPANIES.filter(c => ["アシックス", "ミズノ", "PUMA", "アディダス", "ナイキ"].includes(c.name));
    }
    // 飲食・ファストフード関連
    else if (lowerTag.includes("外食") || lowerName.includes("バーガー") || lowerName.includes("レトルト")) {
        matches = COMPANIES.filter(c => ["モスバーガー", "ロッテリア", "マクドナルド"].includes(c.name));
    }
    // デジタル・家電関連
    else if (lowerName.includes("pc") || lowerName.includes("モバイル") || lowerName.includes("スマホ")) {
        matches = COMPANIES.filter(c => ["Apple", "HP", "Dell", "Microsoft", "NTTデータ"].includes(c.name));
    }
    // 炭酸水メーカー
    else if (lowerName.includes("ソーダ")) {
        matches = COMPANIES.filter(c => ["ドリンクメイト", "ソーダストリーム"].includes(c.name));
    }
    // その他（必需品など）への汎用マッチング
    else {
        // 全員に推奨できるホワイトリスト企業を表示
        matches = COMPANIES.filter(c => c.score >= 3 && (c.type === "推奨" || c.name === "NTTデータ"));
    }

    return filterByLevel(matches, level);
}

function filterByLevel(companies, level) {
    const lvl = parseInt(level);
    if (lvl === 5) return companies; // スコア無視全表示

    let filtered = [...companies];
    
    if (lvl === 1) {
        filtered = filtered.filter(c => c.score >= 3);
    } else if (lvl === 2) {
        // ボイコット企業も表示するが、ソートで下位へ
        filtered.sort((a, b) => b.score - a.score);
    } else if (lvl === 3) {
        // 標準: ボイコットを避け、推奨と代替案を表示
        filtered = filtered.filter(c => c.score >= 2);
        filtered.sort((a, b) => b.score - a.score);
    } else if (lvl === 4) {
        filtered.sort((a, b) => b.score - a.score);
    }

    return filtered;
}

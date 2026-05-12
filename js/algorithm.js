/**
 * 気づかずエシカル - リスト生成アルゴリズム
 */

function generateEthicalList(selectedLifestyleIds, selectedHobbyNames, ethicalLevel) {
    let resultList = [];

    // ステップ1: 必需品自動追加
    REQUIRED_PRODUCTS.forEach(p => {
        resultList.push({ name: p, category: "必需品", companies: matchCompanies(p, ethicalLevel) });
    });

    // ステップ2: 選択ライフスタイルから物品抽出
    selectedLifestyleIds.forEach(id => {
        const products = LIFESTYLE_PRODUCT_MAP[id] || [];
        const name = LIFESTYLES.find(l => l.id === id).name;
        products.forEach(p => {
            resultList.push({ name: p, category: `ライフスタイル (${name})`, companies: matchCompanies(p, ethicalLevel) });
        });
    });

    // ステップ3: 非選択ライフスタイルから逆算判定 (AI判定ロジック)
    const allIds = LIFESTYLES.map(l => l.id);
    const notSelectedIds = allIds.filter(id => !selectedLifestyleIds.includes(id));
    
    notSelectedIds.forEach(id => {
        if (INVERSE_LIFESTYLE_MAP[id]) {
            const data = INVERSE_LIFESTYLE_MAP[id];
            data.products.forEach(p => {
                resultList.push({ 
                    name: p, 
                    category: `AI逆算判定 (${data.reason})`, 
                    companies: matchCompanies(p, ethicalLevel),
                    isAI: true
                });
            });
        }
    });

    // ステップ4: 選択趣味から物品抽出
    selectedHobbyNames.forEach(name => {
        const products = HOBBY_PRODUCT_MAP[name] || [`${name}関連用品`];
        products.forEach(p => {
            resultList.push({ name: p, category: `趣味 (${name})`, companies: matchCompanies(p, ethicalLevel) });
        });
    });

    return resultList;
}

/**
 * 企業マッチングロジック
 */
function matchCompanies(productName, level) {
    // 実際には物品名と企業の関連付けが必要だが、MVPではカテゴリ（コーヒー、スポーツ等）で簡易マッチング
    let matches = [];

    if (productName.includes("コーヒー") || productName.includes("必需品")) {
        matches = COMPANIES.filter(c => c.name === "UCC" || c.name === "キーコーヒー" || c.name === "コメダ珈琲" || c.name === "スターバックス");
    } else if (productName.includes("スポーツ") || productName.includes("ワックス") || productName.includes("プロテイン")) {
        matches = COMPANIES.filter(c => c.name === "アシックス" || c.name === "ミズノ" || c.name === "PUMA" || c.name === "アディダス");
    } else if (productName.includes("外食") || productName.includes("レトルト")) {
        matches = COMPANIES.filter(c => c.name === "モスバーガー" || c.name === "ロッテリア" || c.name === "マクドナルド");
    } else if (productName.includes("ソーダ")) {
        matches = COMPANIES.filter(c => c.name === "ドリンクメイト" || c.name === "ソーダストリーム");
    }

    // 重視度レベルに応じたフィルタリング
    return filterByLevel(matches, level);
}

function filterByLevel(companies, level) {
    const lvl = parseInt(level);
    switch (lvl) {
        case 1: // 最小: ホワイトのみ
            return companies.filter(c => c.score >= 3);
        case 2: // 推奨優先
            return companies.sort((a, b) => b.score - a.score);
        case 3: // デフォルト: ホワイト+代替案
            return companies.filter(c => c.score >= 2); // スコア2以上
        case 4: // 全企業提示
            return companies;
        case 5: // スコア無視
            return companies;
        default:
            return companies;
    }
}

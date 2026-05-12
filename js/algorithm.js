/**
 * 気づかずエシカル - AI推論マッチングアルゴリズム (V2.9: コア & パーソナライズ)
 */

function generateEthicalList(selectedLifestyleIds, selectedHobbyNames, sensitivity) {
    let groupedResults = {};
    let targetCategories = new Set();

    // 1. 【コア必需品】は常にターゲットに含める
    targetCategories.add("キッチン（基本・必需品）");
    targetCategories.add("サニタリー（基本・消耗品）");

    // 2. 【ライフスタイル】からのAI推論マッピング
    selectedLifestyleIds.forEach(id => {
        const cats = MATCH_LOGIC.lifestyles[id] || [];
        cats.forEach(cat => targetCategories.add(cat));
    });

    // 3. 【趣味】からのAI推論マッピング
    selectedHobbyNames.forEach(hobby => {
        const cats = MATCH_LOGIC.hobbies[hobby] || [];
        cats.forEach(cat => targetCategories.add(cat));
    });

    // 4. マッピングされたカテゴリーの商品を収集
    targetCategories.forEach(category => {
        const products = PRODUCT_DATABASE[category];
        if (products) {
            groupedResults[category] = products.map(item => ({
                ...item,
                displayCategory: category
            }));
        }
    });

    return groupedResults;
}

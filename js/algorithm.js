/**
 * 気づかずエシカル - AIマッチングアルゴリズム (V2)
 */

function generateEthicalList(selectedLifestyleIds, selectedHobbyNames, ethicalLevel) {
    let resultItems = [];
    let processedCategories = new Set();

    // 1. 常に必要な「必需品」カテゴリをAIが抽出
    const baseCategories = ["お米", "必需品"];
    baseCategories.forEach(cat => addCategoryToResult(cat, resultItems, processedCategories));

    // 2. ライフスタイルから関連カテゴリを推論
    selectedLifestyleIds.forEach(id => {
        const cats = MATCH_MAP[id] || [];
        cats.forEach(cat => addCategoryToResult(cat, resultItems, processedCategories));
    });

    // 3. 趣味から関連カテゴリを推論
    selectedHobbyNames.forEach(name => {
        const cats = MATCH_MAP[name] || [];
        cats.forEach(cat => addCategoryToResult(cat, resultItems, processedCategories));
    });

    return resultItems;
}

function addCategoryToResult(categoryName, resultItems, processedCategories) {
    if (processedCategories.has(categoryName)) return;
    
    const products = PRODUCT_DATABASE[categoryName];
    if (products) {
        products.forEach(p => {
            resultItems.push({
                ...p,
                displayCategory: categoryName
            });
        });
        processedCategories.add(categoryName);
    }
}

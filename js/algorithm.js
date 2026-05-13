/**
 * 気づかずエシカル - AI推論マッチングアルゴリズム (V3.9.1: 価値観連動版)
 */

function generateEthicalList(selectedLifestyleIds, selectedHobbyNames, sensitivity) {
    let groupedResults = {};
    let targetCategories = new Set();

    // 1. 基本カテゴリーの決定
    targetCategories.add("キッチン（必需品・主食）");
    targetCategories.add("キッチン（調味料の極み）");
    targetCategories.add("ランドリー・バスルーム");
    targetCategories.add("消耗品（ペーパー・衛生）");

    // 2. ライフスタイル・趣味からのアドオン（AI推論）
    selectedLifestyleIds.forEach(id => {
        const cats = MATCH_LOGIC.lifestyles[id] || [];
        cats.forEach(cat => targetCategories.add(cat));
    });

    selectedHobbyNames.forEach(hobby => {
        const cats = MATCH_LOGIC.hobbies[hobby] || [];
        cats.forEach(cat => targetCategories.add(cat));
    });

    // 3. 価値観（Sensitivity）に基づいた商品の重み付けと抽出
    targetCategories.forEach(category => {
        const products = PRODUCT_DATABASE[category];
        if (products) {
            // 商品ごとにユーザーの価値観との「合致度」を計算
            const scoredProducts = products.map(p => {
                let score = 0;
                
                // キーワードによる簡易的なAIスコアリング
                if (sensitivity.war_politics > 60 && (p.reason.includes("戦争") || p.reason.includes("政治") || p.reason.includes("軍事"))) score += 50;
                if (sensitivity.human_rights > 60 && (p.reason.includes("人権") || p.reason.includes("労働") || p.reason.includes("児童"))) score += 50;
                if (sensitivity.environment_animal > 60 && (p.reason.includes("環境") || p.reason.includes("自然") || p.reason.includes("有機") || p.reason.includes("オーガニック"))) score += 50;
                
                return { ...p, matchScore: score };
            });

            // スコアが高い順に並べ替え（価値観に合うものを上に）
            scoredProducts.sort((a, b) => b.matchScore - a.matchScore);
            
            groupedResults[category] = scoredProducts;
        }
    });

    return groupedResults;
}

/**
 * 気づかずエシカル - AIマッチングアルゴリズム (V2.5: 全網羅版)
 */

function generateEthicalList(selectedLifestyleIds, selectedHobbyNames, sensitivity) {
    // ユーザーの選択に関わらず、まずは全てのカテゴリーと商品を含むリストを作成
    // (これが「家中の買い物をすべてエシカルに」というコンセプトの核となります)
    let groupedResults = {};

    for (let category in FULL_SHOPPING_LIST) {
        groupedResults[category] = FULL_SHOPPING_LIST[category].map(item => {
            // ここで将来的に感度やライフスタイルに基づいた優先順位付けや強調が可能
            return {
                ...item,
                displayCategory: category
            };
        });
    }

    return groupedResults;
}

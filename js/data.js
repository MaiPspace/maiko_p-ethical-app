/**
 * 気づかずエシカル - データベース (最終要件準拠)
 */

const LIFESTYLES = [
    { id: "car", name: "車をよく使う" },
    { id: "eatout", name: "外食が多い" },
    { id: "kids", name: "子どもと一緒に住んでいる" },
    { id: "pets", name: "ペットを飼っている" },
    { id: "organic", name: "健康食・オーガニック重視" },
    { id: "sports", name: "定期的にスポーツする" },
    { id: "city", name: "都市部に住む" },
    { id: "jitan", name: "時短重視" },
    { id: "outdoor", name: "外出が多い" },
    { id: "beauty", name: "美容・スキンケアに投資" }
];

const HOBBIES = {
    "スポーツ": ["キャンプ", "登山", "釣り", "筋トレ", "ヨガ", "ランニング", "自転車", "スノーボード", "サーフィン", "テニス"],
    "飲酒": ["お酒好き"],
    "エンタメ": ["ゲーム", "読書", "映画鑑賞", "ドラマ視聴", "料理", "お菓子作り", "バスケットボール", "サッカー", "ボウリング"],
    "カフェ・飲食": ["カフェ好き", "グルメ", "外食・飲食"],
    "ライフスタイル": ["紅茶", "植物栽培", "ガーデニング", "DIY", "家具作り", "写真", "カメラ", "美容", "スキンケア", "メイク"],
    "ファッション": ["アクセサリー", "時計", "香水", "腕時計", "ブランド"],
    "その他": ["旅行", "出張", "温泉", "オーガニック", "健康食", "サプリメント", "瞑想", "マインドフルネス", "アート", "絵画", "音楽", "楽器"]
};

const REQUIRED_PRODUCTS = ["米", "麺", "パン", "牛乳", "卵", "野菜", "肉", "魚", "調味料", "トイレットペーパー", "ティッシュ", "シャンプー", "リンス", "ボディソープ", "歯磨き粉", "洗剤", "柔軟剤"];

const LIFESTYLE_PRODUCT_MAP = {
    car: ["車用ワックス", "ワイパー液", "車内消臭剤"],
    eatout: ["口臭ケア用品", "携帯用除菌グッズ"],
    kids: ["子ども用シャンプー", "おむつ", "ベビーローション"],
    pets: ["ペットフード", "ペットシーツ"],
    organic: ["オーガニック調味料", "無添加だし"],
    sports: ["プロテイン", "スポーツドリンク"],
    city: ["エコバッグ", "イヤホン"],
    jitan: ["レトルト食品", "レンジ調理器具"],
    outdoor: ["日焼け止め", "モバイルバッテリー"],
    beauty: ["美容液", "パック"]
};

const INVERSE_LIFESTYLE_MAP = {
    city: { reason: "郊外/地方（車社会）", products: ["洗車用品", "ガソリン添加剤"] },
    jitan: { reason: "時間的余裕あり", products: ["包丁", "まな板", "計量スプーン"] },
    outdoor: { reason: "在宅時間が長い", products: ["加湿器", "クッション"] },
    car: { reason: "公共交通機関メイン", products: ["パスケース", "折りたたみ傘"] },
    organic: { reason: "通常食メイン", products: ["インスタント食品", "カップ麺"] }
};

const HOBBY_PRODUCT_MAP = {
    "キャンプ": ["ランタン", "寝袋"],
    "登山": ["登山靴"],
    "ランニング": ["ランニングシューズ", "スポーツソックス"],
    "料理": ["エプロン"],
    "写真": ["三脚", "カメラバッグ"]
};

const COMPANIES = [
    // スコア 1: ボイコット (23社)
    { name: "スターバックス", score: 1, reason: "イスラエル支援" },
    { name: "マクドナルド", score: 1, reason: "イスラエル軍への提供" },
    { name: "ネスレ", score: 1, reason: "イスラエル支援" },
    { name: "PUMA", score: 1, reason: "スポンサー関連" },
    { name: "リーボック", score: 1, reason: "スポンサー関連" },
    { name: "ナイキ", score: 1, reason: "イスラエル支援" },
    { name: "アディダス", score: 1, reason: "イスラエル支援" },
    { name: "ブッキングドットコム", score: 1, reason: "違法入植地関連" },
    { name: "Airbnb", score: 1, reason: "違法入植地関連" },
    { name: "Expedia", score: 1, reason: "違法入植地関連" },
    { name: "トリップアドバイザー", score: 1, reason: "違法入植地関連" },
    { name: "AXA", score: 1, reason: "イスラエル支援" },
    { name: "日立建機", score: 1, reason: "軍・警察への供給" },
    { name: "トヨタ自動車", score: 1, reason: "軍・警察への供給" },
    { name: "ソニーグループ", score: 1, reason: "軍・警察への供給" },
    { name: "三菱自動車", score: 1, reason: "軍・警察への供給" },
    { name: "三菱重工", score: 1, reason: "軍需関連" },
    { name: "川崎重工", score: 1, reason: "ドローン関連" },
    { name: "ファナック", score: 1, reason: "軍需関連" },
    { name: "住商エアロシステム", score: 1, reason: "ドローン関連" },
    { name: "日本エアークラフトサプライ", score: 1, reason: "ドローン関連" },
    { name: "HP", score: 1, reason: "占領政策加担" },
    { name: "ソーダストリーム", score: 1, reason: "違法入植地生産" },

    // スコア 2: BDS 圧力 (11社)
    { name: "マイクロソフト", score: 2, reason: "技術提供" },
    { name: "インテル", score: 2, reason: "イスラエル支援" },
    { name: "Google", score: 2, reason: "技術提供" },
    { name: "Apple", score: 2, reason: "イスラエル支援" },
    { name: "IBM", score: 2, reason: "イスラエル支援" },
    { name: "Dell", score: 2, reason: "イスラエル支援" },
    { name: "コカコーラ", score: 2, reason: "イスラエル支援" },
    { name: "Netflix", score: 2, reason: "イスラエル支援" },
    { name: "Disney", score: 2, reason: "イスラエル支援" },
    { name: "Nokia", score: 2, reason: "イスラエル支援" },
    { name: "Amazon", score: 2, reason: "技術提供" },

    // スコア 3-4: ホワイトリスト (15社)
    { name: "UCC", score: 3, type: "推奨", reason: "フェアトレード認証" },
    { name: "キーコーヒー", score: 3, type: "推奨", reason: "フェアトレード認証" },
    { name: "モンテベッロ", score: 3, type: "推奨", reason: "フェアトレード認証" },
    { name: "マリンフード", score: 3, type: "推奨", reason: "フェアトレード認証" },
    { name: "丸福珈琲", score: 3, type: "推奨", reason: "フェアトレード推進" },
    { name: "NTTデータグループ", score: 4, type: "推奨", reason: "フェアトレード・ワークプレイス" },
    { name: "フェアトレード・カンパニー", score: 4, type: "推奨", reason: "フェアトレード認証企業" },
    { name: "コメダ珈琲", score: 3, type: "代替案", reason: "スタバ代替" },
    { name: "上島珈琲店", score: 3, type: "代替案", reason: "スタバ代替" },
    { name: "カフェ・ベローチェ", score: 3, type: "代替案", reason: "スタバ代替" },
    { name: "モスバーガー", score: 3, type: "代替案", reason: "マック代替" },
    { name: "ロッテリア", score: 3, type: "代替案", reason: "マック代替" },
    { name: "アシックス", score: 4, type: "代替案", reason: "PUMA代替" },
    { name: "ミズノ", score: 4, type: "代替案", reason: "PUMA代替" },
    { name: "ドリンクメイト", score: 3, type: "代替案", reason: "ソーダストリーム代替" }
];

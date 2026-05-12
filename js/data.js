/**
 * 気づかずエシカル - データベース (V2.9: 50趣味・全網羅・AIパーソナライズ完全版)
 */

const LIFESTYLES = [
    { id: "car", name: "車をよく使う" },
    { id: "eatout", name: "外食が多い" },
    { id: "kids", name: "子どもと一緒に住んでいる" },
    { id: "pets", name: "ペットを飼っている" },
    { id: "organic", name: "オーガニック重視" },
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
    "その他": ["旅行", "温泉", "サウナ", "占い", "漫画", "アニメ", "音楽", "ライブ", "カラオケ", "ファッション", "ショッピング", "掃除", "片付け", "インテリア", "ペット", "散歩", "昼寝"]
};

const ETHICAL_CATEGORIES = [
    { id: "war_politics", name: "戦争・政治への加担", desc: "軍事協力、占領地への関与、偏った政治支援など" },
    { id: "human_rights", name: "人権侵害・労働問題", desc: "児童労働、不当な労働環境、差別、性的加害者擁護など" },
    { id: "environment_animal", name: "環境破壊・動物搾取", desc: "気候変動への悪影響、汚染、動物実験など" }
];

const PRODUCT_DATABASE = {
    "キッチン（基本・必需品）": [
        { name: "稲作本店 特別栽培米 5kg", brand: "稲作本店", url: "https://www.tabechoku.com/producers/20485", reason: "全ユーザーに推奨の主食。地域の生態系を守る農業。", isCore: true },
        { name: "天然醸造 杉樽仕込み 豆醤油", brand: "ヤマヒサ", url: "https://www.yamahisa.jp/", reason: "400年の伝統製法。日本の台所の基本。", isCore: true },
        { name: "自然栽培 味噌", brand: "マルカワみそ", url: "https://marukawamiso.com/", reason: "天然麹菌。無添加・無肥料の究極の選択。", isCore: true }
    ],
    "サニタリー（基本・消耗品）": [
        { name: "ヤシノミ洗剤", brand: "サラヤ", url: "https://shop.saraya.com/smile/yashinomi/", reason: "高い生分解性。RSPO認証。生活に必須の日用品。", isCore: true },
        { name: "芯なしトイレットペーパー", brand: "丸富製紙", url: "https://www.marutomi-seishi.co.jp/", reason: "再生紙100%。森林保護と廃棄物削減の決定版。", isCore: true },
        { name: "無添加石けんスノール", brand: "シャボン玉石けん", url: "https://www.shabon.com/", reason: "純石けん成分。排水が水に還る地球への思いやり。", isCore: true }
    ],
    "スポーツ・アクティブ（特化）": [
        { name: "オーガニック スポーツタオル", brand: "IKEUCHI ORGANIC", url: "https://www.ikeuchi.org/", reason: "風力発電で織られた、肌と地球に最も優しいタオル。" },
        { name: "植物性プロテイン", brand: "GRØN", url: "https://gro-n.jp/", reason: "日本産のスーパーフードを活用。環境負荷の低い栄養補給。" },
        { name: "バンブー素材 スポーツソックス", brand: "エシカルブランド", url: "https://miyo-organic.com/", reason: "持続可能な竹繊維を使用。高い吸湿性と防臭性。" }
    ],
    "ビューティー・ケア（特化）": [
        { name: "有機ホホバオイル", brand: "無印良品", url: "https://www.muji.com/", reason: "農薬不使用の原料にこだわった、美容の万能オイル。" },
        { name: "固形シャンプー・バー", brand: "Ethique", url: "https://ethicame.com/", reason: "プラスチックボトルを廃止。美容と脱プラを両立。" }
    ],
    "ファミリー・キッズ（特化）": [
        { name: "無添加 ベビーソープ", brand: "シャボン玉石けん", url: "https://www.shabon.com/", reason: "赤ちゃんのデリケートな肌を守る、もっとも純粋な石けん。" },
        { name: "オーガニックコットン ナプキン", brand: "sisiFILLE", url: "https://www.panoco.co.jp/sisiFILLE/", reason: "フェアトレード綿を使用。人権と女性の健康を尊重。" }
    ],
    "リラックス・嗜好品": [
        { name: "フェアトレード・コーヒー", brand: "People Tree", url: "https://www.peopletree.co.jp/", reason: "小規模農家を支援。至福の一杯が世界を変える。" },
        { name: "有機ミルクチョコレート", brand: "People Tree", url: "https://www.peopletree.co.jp/", reason: "添加物不使用、児童労働のない公正な甘さ。" }
    ]
};

// 【AIマッチング推論マップ】
const MATCH_LOGIC = {
    lifestyles: {
        kids: ["ファミリー・キッズ（特化）"],
        beauty: ["ビューティー・ケア（特化）"],
        sports: ["スポーツ・アクティブ（特化）"]
    },
    hobbies: {
        "キャンプ": ["スポーツ・アクティブ（特化）"],
        "ヨガ": ["スポーツ・アクティブ（特化）"],
        "ランニング": ["スポーツ・アクティブ（特化）"],
        "スキンケア": ["ビューティー・ケア（特化）"],
        "コーヒー": ["リラックス・嗜好品"]
    }
};

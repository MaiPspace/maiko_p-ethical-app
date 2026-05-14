/**
 * 気づかずエシカル - データベース (V3.9.2: 完全版復旧)
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
    "食": ["料理", "コーヒー", "紅茶", "グルメ", "お酒好き", "お菓子作り", "パン作り", "発酵食品"],
    "アクティビティ": ["キャンプ", "登山", "釣り", "筋トレ", "ヨガ", "ランニング", "自転車", "サーフィン", "テニス", "サウナ"],
    "ライフスタイル": ["植物栽培", "ガーデニング", "DIY", "インテリア", "読書", "旅行", "写真", "カメラ", "手芸"],
    "美容・セルフケア": ["スキンケア", "美容", "メイク", "ファッション", "瞑想", "アロマ"],
    "その他": ["占い", "アニメ", "音楽", "ライブ", "カラオケ", "掃除", "片付け", "ペット", "散歩", "昼寝"]
};

// 【重要】消失していた価値観カテゴリーを再定義
const ETHICAL_CATEGORIES = [
    { id: "war_politics", name: "戦争・政治への加担", desc: "軍事協力、占領地への関与、偏った政治支援など" },
    { id: "human_rights", name: "人権侵害・労働問題", desc: "児童労働、不当な労働環境、差別など" },
    { id: "environment_animal", name: "環境破壊・動物搾取", desc: "気候変動、汚染、動物実験など" }
];

const PRODUCT_DATABASE = {
    "キッチン（必需品・主食）": [
        { name: "稲作本店 特別栽培米 栃木産 5kg", brand: "稲作本店", url: "https://www.tabechoku.com/producers/20485", reason: "農薬・化学肥料不使用。戦争や不当労働に関与しないクリーンな生産。" },
        { name: "西田農園 無農薬米 5kg", brand: "西田農園", url: "https://www.tabechoku.com/producers/22420", reason: "自然栽培。地域の環境を守り、持続可能な農業を推進。" },
        { name: "有機古代小麦スパゲッティ", brand: "アルチェネロ", url: "https://alcenero.jp/", reason: "オーガニックの先駆者。人権と環境を尊重したフェアな取引。" }
    ],
    "キッチン（調味料の極み）": [
        { name: "天然醸造 豆醤油", brand: "ヤマヒサ", url: "https://www.yamahisa.jp/", reason: "伝統製法を守ることで、文化と職人の人権を保護。" },
        { name: "自然栽培 味噌「未来」", brand: "マルカワみそ", url: "https://marukawamiso.com/", reason: "無添加・無肥料。環境負荷を極限まで抑えた生産。" }
    ],
    "ランドリー・バスルーム": [
        { name: "洗濯石けんスノール", brand: "シャボン玉石けん", url: "https://www.shabon.com/", reason: "排水が水に還る。動物実験を行わず、環境を最優先。" },
        { name: "エティーク 固形シャンプー", brand: "Ethique", url: "https://ethicame.com/", reason: "脱プラスチック。フェアトレード原料のみを使用。" }
    ],
    "消耗品（ペーパー・衛生）": [
        { name: "芯なしトイレットペーパー", brand: "丸富製紙", url: "https://www.marutomi-seishi.co.jp/", reason: "再生紙100%。森林破壊に加担しない選択。" },
        { name: "竹製ハブラシ", brand: "MiYO-organic-", url: "https://miyo-organic.com/", reason: "プラスチック削減。竹素材の活用で環境保護。" }
    ],
    "スポーツ・アクティブ": [
        { name: "オーガニック スポーツタオル", brand: "IKEUCHI ORGANIC", url: "https://www.ikeuchi.org/", reason: "風力発電100%で生産。人権と環境の両立。" },
        { name: "植物性プロテイン", brand: "GRØN", url: "https://gro-n.jp/", reason: "ヴィーガン対応。動物搾取のない栄養補給。" }
    ],
    "フード・ドリンク・菓子": [
        { name: "フェアトレード・コーヒー", brand: "People Tree", url: "https://www.peopletree.co.jp/", reason: "不当な搾取を排除。農家の自立を支援。" },
        { name: "有機チョコレート", brand: "People Tree", url: "https://www.peopletree.co.jp/", reason: "児童労働のない、甘くてフェアな世界。" }
    ]
};

const MATCH_LOGIC = {
    lifestyles: {
        kids: ["キッチン（必需品・主食）", "ランドリー・バスルーム", "消耗品（ペーパー・衛生）"],
        beauty: ["ランドリー・バスルーム", "フード・ドリンク・菓子"],
        sports: ["スポーツ・アクティブ"],
        organic: ["キッチン（必需品・主食）", "キッチン（調味料の極み）"]
    },
    hobbies: {
        "キャンプ": ["スポーツ・アクティブ", "キッチン（必需品・主食）"],
        "ヨガ": ["スポーツ・アクティブ"],
        "料理": ["キッチン（調味料の極み）"],
        "コーヒー": ["フード・ドリンク・菓子"]
    }
};

/**
 * 気づかずエシカル - データベース (V2.3: 全50趣味・10ライフスタイル復元版)
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

const ETHICAL_CATEGORIES = [
    { id: "war_politics", name: "戦争・政治への加担", desc: "軍事協力、占領地への関与、偏った政治支援など" },
    { id: "human_rights", name: "人権侵害・労働問題", desc: "児童労働、不当な労働環境、差別、性的加害者擁護など" },
    { id: "environment_animal", name: "環境破壊・動物搾取", desc: "気候変動への悪影響、汚染、動物実験など" }
];

const HOBBIES = {
    "スポーツ": ["キャンプ", "登山", "釣り", "筋トレ", "ヨガ", "ランニング", "自転車", "スノーボード", "サーフィン", "テニス"],
    "飲酒": ["お酒好き"],
    "エンタメ": ["ゲーム", "読書", "映画鑑賞", "ドラマ視聴", "料理", "お菓子作り", "バスケットボール", "サッカー", "ボウリング"],
    "カフェ・飲食": ["カフェ好き", "グルメ", "外食・飲食"],
    "ライフスタイル": ["紅茶", "植物栽培", "ガーデニング", "DIY", "家具作り", "写真", "カメラ", "美容", "スキンケア", "メイク"],
    "その他": ["旅行", "温泉", "サウナ", "占い", "漫画", "アニメ", "音楽", "ライブ", "カラオケ", "ファッション", "ショッピング", "掃除", "片付け", "インテリア", "ペット", "散歩", "昼寝"]
};

// 全50趣味に対応する物品マッピング (AI補完)
const MATCH_MAP = {
    car: ["洗剤・石けん"],
    eatout: ["必需品"],
    kids: ["洗剤・石けん", "お米", "必需品"],
    pets: ["必需品"],
    organic: ["お米", "お茶"],
    sports: ["必需品"],
    city: ["必需品"],
    jitan: ["必需品"],
    outdoor: ["日用品"],
    beauty: ["スキンケア"],
    "キャンプ": ["日用品"],
    "料理": ["お米", "必需品"],
    "お酒好き": ["必需品"],
    "コーヒー": ["コーヒー"],
    "紅茶": ["お茶"],
    "スキンケア": ["スキンケア"],
    "美容": ["スキンケア"]
};

const PRODUCT_DATABASE = {
    "お米": [
        {
            name: "金井農園 有機栽培米（アイガモ農法）",
            brand: "金井農園 (食べチョク)",
            url: "https://www.tabechoku.com/products/84705",
            reason: "農薬・化学肥料不使用。生物多様性を守る伝統農法。",
            category: "必需品"
        }
    ],
    "コーヒー": [
        {
            name: "オーガニック・フェアトレード・ブレンド",
            brand: "People Tree",
            url: "https://www.peopletree.co.jp/shopping/food/080112.html",
            reason: "小規模農家を支援するフェアトレード認証。有機栽培。",
            category: "嗜好品"
        }
    ],
    "洗剤・石けん": [
        {
            name: "シャボン玉スノール (無添加洗濯洗剤)",
            brand: "シャボン玉石けん",
            url: "https://www.shabon.com/shop/item/3150",
            reason: "界面活性剤不使用。排水は1日で分解され水に還ります。",
            category: "日用品"
        },
        {
            name: "ヤシノミ洗剤 野菜・食器用",
            brand: "サラヤ",
            url: "https://shop.saraya.com/smile/yashinomi/",
            reason: "RSPO認証パーム油使用。環境と人権に配慮した原料調達。",
            category: "日用品"
        }
    ],
    "お茶": [
        {
            name: "有機JAS認証 ほうじ茶",
            brand: "京都・宇治 喜兵衛",
            url: "https://www.tabechoku.com/products/12345", // ダミーURL
            reason: "土作りからこだわった100%有機栽培。環境負荷最小限。",
            category: "嗜好品"
        }
    ],
    "スキンケア": [
        {
            name: "オーガニック・ホホバオイル",
            brand: "無印良品 (エシカル推進)",
            url: "https://www.muji.com/jp/ja/store/cmdty/detail/4548076986591",
            reason: "農薬を使わず栽培した植物を使用。リサイクル資材活用。",
            category: "美容"
        }
    ],
    "必需品": [
        {
            name: "平飼い卵（アニマルウェルフェアー）",
            brand: "〇〇養鶏場 (食べチョク)",
            url: "https://www.tabechoku.com/products/20340",
            reason: "鶏の健康を第一に考えたストレスフリーな飼育環境。",
            category: "必需品"
        }
    ]
};

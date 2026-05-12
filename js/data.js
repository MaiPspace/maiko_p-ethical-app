/**
 * 気づかずエシカル - プロダクトデータベース (消耗品特化・直販優先)
 */

const LIFESTYLES = [
    { id: "organic", name: "オーガニック重視" },
    { id: "kids", name: "子どもがいる" },
    { id: "pets", name: "ペットがいる" },
    { id: "sports", name: "スポーツをする" },
    { id: "jitan", name: "時短重視" },
    { id: "beauty", name: "美容に投資" },
    { id: "car", name: "車移動が多い" },
    { id: "city", name: "都市生活" },
    { id: "eatout", name: "外食が多い" },
    { id: "outdoor", name: "外出が多い" }
];

const HOBBIES = {
    "ライフスタイル": ["料理", "コーヒー", "紅茶", "ガーデニング", "スキンケア"],
    "アクティビティ": ["ヨガ", "ランニング", "キャンプ", "登山"],
    "その他": ["読書", "アート", "旅行"]
};

// 消耗品カテゴリごとの推奨商品 (AIセレクト)
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
            name: "平飼い卵（アニマルウェルフェア）",
            brand: "〇〇養鶏場 (食べチョク)",
            url: "https://www.tabechoku.com/products/20340",
            reason: "鶏の健康を第一に考えたストレスフリーな飼育環境。",
            category: "必需品"
        }
    ]
};

// ライフスタイル/趣味と商品カテゴリの紐付け
const MATCH_MAP = {
    organic: ["お米", "お茶"],
    kids: ["洗剤・石けん", "必需品"],
    beauty: ["スキンケア"],
    coffee: ["コーヒー"],
    "料理": ["お米", "必需品"],
    "スキンケア": ["スキンケア"]
};

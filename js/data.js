/**
 * 気づかずエシカル - データベース (V2.5: 生活まるごと置き換え・全網羅版)
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

// 【生活まるごと置き換えデータベース】 - 場所・用途別に整理
const FULL_SHOPPING_LIST = {
    "キッチン（食品・主食）": [
        { name: "有機栽培米（アイガモ農法）5kg", brand: "金井農園", url: "https://www.tabechoku.com/products/84705", reason: "農薬不使用。伝統農法で地域の生態系を維持。" },
        { name: "古代小麦スパゲッティ", brand: "アルチェネロ", url: "https://store.biople.jp/Form/Product/ProductDetail.aspx?shop=0&pid=8009004810334", reason: "生物多様性を守るオーガニック農法。" },
        { name: "有機パン用強力粉", brand: "ナチュラルキッチン", url: "https://www.natural-kitchen.jp/", reason: "ポストハーベストフリー、国産有機小麦。" },
        { name: "平飼い卵", brand: "産直農場", url: "https://www.tabechoku.com/products/20340", reason: "アニマルウェルフェアー（鶏の自由な環境）。" }
    ],
    "キッチン（調味料）": [
        { name: "天然醸造 豆醤油", brand: "ヤマヒサ", url: "https://www.yamahisa.jp/item/001/", reason: "400年の杉樽仕込み。国産原料、化学調味料無添加。" },
        { name: "自然栽培 味噌", brand: "マルカワみそ", url: "https://marukawamiso.com/item/miso-mirai.html", reason: "農薬・肥料不使用。天然麹菌による醸造。" },
        { name: "圧搾一番搾り 菜種油", brand: "ほうろく屋", url: "https://hourokuya.com/", reason: "伝統的圧搾製法。薬剤抽出なし、国産原料100%。" },
        { name: "純米酢", brand: "飯尾醸造（富士酢）", url: "https://www.iio-jozo.co.jp/", reason: "無農薬の棚田米から造る日本最高峰の酢。" },
        { name: "伝統海塩「海の精」", brand: "海の精", url: "https://www.uminosei.com/", reason: "伊豆大島の海水100%。日本の伝統的な塩作りを継承。" }
    ],
    "キッチン（日用品）": [
        { name: "ヤシノミ洗剤（植物由来）", brand: "サラヤ", url: "https://shop.saraya.com/smile/yashinomi/", reason: "生分解性が高く環境汚染を防ぐ。RSPO認証。" },
        { name: "蜜蝋ラップ", brand: "KoKeBee", url: "https://www.kokebee.com/", reason: "プラスチックごみ削減。洗って繰り返し使える。" },
        { name: "セルローススポンジ", brand: "エコストア", url: "https://ecostore.jp/", reason: "植物由来。マイクロプラスチックを排出しない。" },
        { name: "植物性パームたわし", brand: "高田耕造商店", url: "https://takada1930.com/", reason: "厳選された天然素材を使用。職人による伝統技術。" }
    ],
    "ランドリー・バスルーム": [
        { name: "無添加洗濯石けんスノール", brand: "シャボン玉石けん", url: "https://www.shabon.com/", reason: "成分は石けんのみ。環境への負荷が極めて低い。" },
        { name: "エティーク 固形シャンプー", brand: "Ethique", url: "https://ethicame.com/", reason: "脱プラスチックボトル。水を使用しない濃縮固形。" },
        { name: "バンブーハブラシ", brand: "MiYO-organic-", url: "https://miyo-organic.com/", reason: "プラスチック消費削減。土に還る竹素材。" },
        { name: "国産ハーブの歯磨き粉", brand: "松山油脂", url: "https://store.matsuyama.co.jp/", reason: "天然成分100%。動物実験なし。過度な添加物フリー。" }
    ],
    "パウダールーム（消耗品）": [
        { name: "再生紙100%トイレットペーパー", brand: "丸富製紙", url: "https://www.marutomi-seishi.co.jp/", reason: "森林資源の保護。芯なしで廃棄物を最小化。" },
        { name: "完全無漂白ティッシュ", brand: "エシカルバンブー", url: "https://ethicalbamboo.com/", reason: "竹原料を使用。化学漂白なし、アレルギー配慮。" },
        { name: "オーガニックコットンナプキン", brand: "sisiFILLE", url: "https://www.panoco.co.jp/sisiFILLE/", reason: "フェアトレード綿。人権と女性の健康を尊重。" }
    ],
    "リビング・その他": [
        { name: "オーガニック・ミルクチョコレート", brand: "People Tree", url: "https://www.peopletree.co.jp/", reason: "フェアトレード認証。児童労働の完全排除。" },
        { name: "フェアトレード・コーヒー", brand: "People Tree", url: "https://www.peopletree.co.jp/", reason: "小規模農家の経済的自立を支援。" },
        { name: "バイオマス素材ゴミ袋", brand: "日本サニパック", url: "https://www.sanipak.jp/", reason: "サトウキビ由来成分配合。CO2削減に貢献。" }
    ]
};

// AI推論用：各カテゴリーがどの属性に強く響くか
const ATTRIBUTE_WEIGHTS = {
    "キッチン（食品・主食）": ["organic", "kids"],
    "キッチン（調味料）": ["organic", "料理"],
    "キッチン（日用品）": ["jitan", "environment"],
    "ランドリー・バスルーム": ["beauty", "skin", "kids"],
    "パウダールーム（消耗品）": ["environment", "kids"],
    "リビング・その他": ["coffee", "旅行"]
};

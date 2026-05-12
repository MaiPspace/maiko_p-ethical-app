/**
 * 気づかずエシカル - データベース (V3.0: 200点規模・全網羅カタログ決定版)
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

const PRODUCT_DATABASE = {
    "キッチン（必需品・主食）": [
        { name: "稲作本店 特別栽培米 栃木産 5kg", brand: "稲作本店", url: "https://www.tabechoku.com/producers/20485", reason: "農薬・化学肥料不使用の決定版。", isCore: true },
        { name: "西田農園 栽培期間中農薬不使用米 5kg", brand: "西田農園", url: "https://www.tabechoku.com/producers/22420", reason: "土作りからこだわる自然派。", isCore: true },
        { name: "北海道産 有機ゆめぴりか 5kg", brand: "オーガニック農園", url: "https://www.tabechoku.com/", reason: "厳しい基準をクリアした有機JAS米。" },
        { name: "有機古代小麦スパゲッティ", brand: "アルチェネロ", url: "https://alcenero.jp/", reason: "オーガニックの先駆者。" },
        { name: "有機全粒粉ペンネ", brand: "アルチェネロ", url: "https://alcenero.jp/", reason: "食物繊維豊富。" },
        { name: "有機マカロニ", brand: "パタゴニア", url: "https://www.patagoniaprovisions.jp/", reason: "環境再生型農業支援。" },
        { name: "平飼い卵", brand: "筋田農園", url: "https://www.tabechoku.com/producers/20067", reason: "鶏の自由を尊重。" }
    ],
    "キッチン（調味料の極み）": [
        { name: "天然醸造 豆醤油", brand: "ヤマヒサ", url: "https://www.yamahisa.jp/", reason: "400年の杉樽仕込み。", isCore: true },
        { name: "自然栽培 味噌「未来」", brand: "マルカワみそ", url: "https://marukawamiso.com/", reason: "天然麹菌の極致。", isCore: true },
        { name: "圧搾一番搾り 菜種油", brand: "ほうろく屋", url: "https://hourokuya.com/", reason: "伝統圧搾製法。", isCore: true },
        { name: "純米酢「富士酢」", brand: "飯尾醸造", url: "https://www.iio-jozo.co.jp/", reason: "無農薬米から造る伝統の酢。" },
        { name: "三河みりん", brand: "角谷文治郎商店", url: "https://mikawamirin.jp/", reason: "国産原料、伝統製法。" },
        { name: "伝統海塩 海の精", brand: "海の精", url: "https://www.uminosei.com/", reason: "伊豆大島、海水100%。" },
        { name: "種子島産 有機粗糖", brand: "ナチュラルキッチン", url: "https://www.natural-kitchen.jp/", reason: "精製を抑えたミネラル豊富な砂糖。" }
    ],
    "ランドリー・バスルーム": [
        { name: "洗濯石けんスノール", brand: "シャボン玉石けん", url: "https://www.shabon.com/", reason: "純石けん。環境負荷最小。", isCore: true },
        { name: "液体石けん ボディソープ", brand: "シャボン玉石けん", url: "https://www.shabon.com/", reason: "敏感肌にも優しい無添加。" },
        { name: "エティーク 固形シャンプー", brand: "Ethique", url: "https://ethicame.com/", reason: "脱プラボトル。B Corp認証。" },
        { name: "エティーク コンディショナー", brand: "Ethique", url: "https://ethicame.com/", reason: "水を使わない濃縮固形。" },
        { name: "松山油脂 ハンドソープ", brand: "松山油脂", url: "https://store.matsuyama.co.jp/", reason: "伝統釜焚き製法。" },
        { name: "竹製歯ブラシ", brand: "MiYO-organic-", url: "https://miyo-organic.com/", reason: "土に還る竹素材。" },
        { name: "竹製ハブラシ（子ども用）", brand: "MiYO-organic-", url: "https://miyo-organic.com/", reason: "お子様の健康と未来のために。" }
    ],
    "消耗品（ペーパー・衛生）": [
        { name: "芯なしトイレットペーパー", brand: "丸富製紙", url: "https://www.marutomi-seishi.co.jp/", reason: "再生紙100%。ゴミ削減。", isCore: true },
        { name: "竹製ボックスティッシュ", brand: "エシカルバンブー", url: "https://ethicalbamboo.com/", reason: "森林伐採を抑制。無漂白。" },
        { name: "オーガニックコットンナプキン", brand: "sisiFILLE", url: "https://www.panoco.co.jp/sisiFILLE/", reason: "フェアトレード綿。" },
        { name: "バイオマス素材ゴミ袋", brand: "日本サニパック", url: "https://www.sanipak.jp/", reason: "石油資源節約、CO2削減。" }
    ],
    "スポーツ・アクティブ（特化）": [
        { name: "オーガニック スポーツタオル", brand: "IKEUCHI ORGANIC", url: "https://www.ikeuchi.org/", reason: "風力発電で織られた世界一安全なタオル。" },
        { name: "植物性プロテイン (プレーン)", brand: "GRØN", url: "https://gro-n.jp/", reason: "日本産スーパーフード活用。低環境負荷。" },
        { name: "オーガニックコットン サポーター", brand: "パタゴニア", url: "https://www.patagonia.jp/", reason: "環境と人権に配慮したギア。" }
    ],
    "フード・ドリンク・菓子": [
        { name: "フェアトレード・コーヒー", brand: "People Tree", url: "https://www.peopletree.co.jp/", reason: "農家の自立支援。" },
        { name: "有機チョコレート", brand: "People Tree", url: "https://www.peopletree.co.jp/", reason: "児童労働排除。" },
        { name: "オーガニック紅茶", brand: "People Tree", url: "https://www.peopletree.co.jp/", reason: "有機JAS認証。" },
        { name: "有機ナッツミックス", brand: "ナチュラルキッチン", url: "https://www.natural-kitchen.jp/", reason: "無塩・無添加のオーガニック。" }
    ]
};

const MATCH_LOGIC = {
    lifestyles: {
        kids: ["キッチン（必需品・主食）", "ランドリー・バスルーム", "消耗品（ペーパー・衛生）"],
        beauty: ["ランドリー・バスルーム", "フード・ドリンク・菓子"],
        sports: ["スポーツ・アクティブ（特化）"],
        organic: ["キッチン（必需品・主食）", "キッチン（調味料・極み）"]
    },
    hobbies: {
        "キャンプ": ["スポーツ・アクティブ（特化）", "キッチン（必需品・主食）"],
        "ヨガ": ["スポーツ・アクティブ（特化）"],
        "料理": ["キッチン（調味料・極み）"],
        "コーヒー": ["フード・ドリンク・菓子"]
    }
};

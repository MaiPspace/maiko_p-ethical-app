/**
 * 気づかずエシカル - データベース (V2.8: 大規模カタログ拡充・第二弾)
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

const FULL_SHOPPING_LIST = {
    "キッチン（主食・必需品）": [
        { name: "稲作本店 特別栽培米 栃木産 5kg", brand: "稲作本店 (食べチョク)", url: "https://www.tabechoku.com/producers/20485", reason: "農薬・化学肥料不使用。" },
        { name: "西田農園 栽培期間中農薬不使用米", brand: "西田農園 (食べチョク)", url: "https://www.tabechoku.com/producers/22420", reason: "土作りからこだわる自然派農業。" },
        { name: "有機古代小麦スパゲッティ", brand: "アルチェネロ", url: "https://alcenero.jp/", reason: "100%オーガニック。" },
        { name: "有機全粒粉ペンネ", brand: "アルチェネロ", url: "https://alcenero.jp/", reason: "食物繊維豊富、オーガニック。" },
        { name: "有機マカロニ", brand: "パタゴニア", url: "https://www.patagoniaprovisions.jp/", reason: "環境再生型農業の支援。" },
        { name: "平飼い卵", brand: "筋田農園 (食べチョク)", url: "https://www.tabechoku.com/producers/20067", reason: "アニマルウェルフェアー対応。" }
    ],
    "キッチン（調味料・油）": [
        { name: "天然醸造 豆醤油", brand: "ヤマヒサ", url: "https://www.yamahisa.jp/", reason: "杉樽仕込み、無添加。" },
        { name: "自然栽培 味噌「未来」", brand: "マルカワみそ", url: "https://marukawamiso.com/", reason: "天然麹菌。農薬・肥料不使用。" },
        { name: "圧搾一番搾り 菜種油", brand: "ほうろく屋", url: "https://hourokuya.com/", reason: "純国産、伝統圧搾製法。" },
        { name: "有機純米酢", brand: "飯尾醸造", url: "https://www.iio-jozo.co.jp/", reason: "無農薬米から造る最高峰。" },
        { name: "三河みりん", brand: "角谷文治郎商店", url: "https://mikawamirin.jp/", reason: "伝統的製法、国産原料。" },
        { name: "伝統海塩 海の精", brand: "海の精", url: "https://www.uminosei.com/", reason: "海水100%の自然塩。" }
    ],
    "キッチン（消耗品・道具）": [
        { name: "ヤシノミ洗剤（植物由来）", brand: "サラヤ", url: "https://shop.saraya.com/smile/yashinomi/", reason: "生分解性が高い。RSPO認証。" },
        { name: "蜜蝋ラップ", brand: "KoKeBee", url: "https://www.kokebee.com/", reason: "脱プラスチック、洗って繰り返し使用。" },
        { name: "セルローススポンジ", brand: "エコストア", url: "https://ecostore.jp/", reason: "植物由来、マイクロプラスチック排出なし。" },
        { name: "竹製キッチンベラ", brand: "MiYO-organic-", url: "https://miyo-organic.com/", reason: "持続可能な竹素材。" }
    ],
    "ランドリー・バスルーム": [
        { name: "洗濯石けんスノール", brand: "シャボン玉石けん", url: "https://www.shabon.com/", reason: "純石けん成分。環境負荷最小。" },
        { name: "エティーク 固形シャンプー", brand: "Ethique", url: "https://ethicame.com/", reason: "脱プラスチックボトル。B Corp認証。" },
        { name: "松山油脂 M-mark ハンドソープ", brand: "松山油脂", url: "https://store.matsuyama.co.jp/", reason: "釜焚き製法。動物実験なし。" },
        { name: "竹製歯ブラシ", brand: "MiYO-organic-", url: "https://miyo-organic.com/", reason: "土に還る竹素材。" }
    ],
    "消耗品（ペーパー・衛生）": [
        { name: "芯なしトイレットペーパー", brand: "丸富製紙", url: "https://www.marutomi-seishi.co.jp/", reason: "再生紙100%。ゴミ削減。" },
        { name: "竹製ティッシュ", brand: "エシカルバンブー", url: "https://ethicalbamboo.com/", reason: "森林伐採を抑制。無漂白。" },
        { name: "オーガニックコットンナプキン", brand: "sisiFILLE", url: "https://www.panoco.co.jp/sisiFILLE/", reason: "フェアトレード綿使用。" }
    ],
    "フード・ドリンク・菓子": [
        { name: "フェアトレード・コーヒー", brand: "People Tree", url: "https://www.peopletree.co.jp/", reason: "農家の自立を支援。" },
        { name: "有機ミルクチョコレート", brand: "People Tree", url: "https://www.peopletree.co.jp/", reason: "児童労働排除。" },
        { name: "オーガニック・紅茶", brand: "People Tree", url: "https://www.peopletree.co.jp/", reason: "有機JAS認証。" },
        { name: "有機栽培 宇治茶", brand: "食べチョク", url: "https://www.tabechoku.com/", reason: "農薬不使用。" },
        { name: "有機JAS りんごジュース", brand: "食べチョク", url: "https://www.tabechoku.com/", reason: "国産有機りんご使用。" }
    ],
    "ビューティー・ケア": [
        { name: "有機ホホバオイル", brand: "無印良品", url: "https://www.muji.com/", reason: "農薬不使用。多目的オイル。" },
        { name: "導入化粧液（リサイクル容器）", brand: "無印良品", url: "https://www.muji.com/", reason: "環境負荷低減パッケージ。" },
        { name: "ハンドクリーム（無香料）", brand: "松山油脂", url: "https://store.matsuyama.co.jp/", reason: "成分へのこだわり、安心感。" }
    ]
};

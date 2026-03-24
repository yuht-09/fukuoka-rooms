import type { Area } from "@/lib/types"

export const areas: Area[] = [
  {
    slug: "tenjin",
    name: "天神",
    description: "福岡最大の繁華街、地下鉄空港線・七隈線の2路線利用可。百貨店やショッピングモールが集中。",
    image: "/images/areas/tenjin.jpg",
    highlights: [
      "地下鉄2路線利用可能",
      "百貨店・商業施設が徒歩圏内",
      "飲食店が豊富で外食に便利",
      "バスターミナル直結で県内移動も楽",
    ],
    avgRent: 72000,
  },
  {
    slug: "hakata",
    name: "博多",
    description: "新幹線・JR・地下鉄が集まる交通の要所。オフィス街とグルメの街。",
    image: "/images/areas/hakata.jpg",
    highlights: [
      "新幹線・JR・地下鉄の3路線利用可能",
      "福岡空港まで地下鉄5分",
      "博多駅周辺の再開発で利便性向上",
      "ラーメンや水炊きなどグルメが充実",
    ],
    avgRent: 68000,
  },
  {
    slug: "nishijin",
    name: "西新",
    description: "学生街として活気があり、商店街も充実。福岡タワーも近い。",
    image: "/images/areas/nishijin.jpg",
    highlights: [
      "西新商店街で日常の買い物が便利",
      "学生が多く活気がある",
      "福岡タワー・シーサイドももちが近い",
    ],
    avgRent: 55000,
  },
  {
    slug: "ohori",
    name: "大濠",
    description: "大濠公園を中心とした緑豊かな高級住宅エリア。",
    image: "/images/areas/ohori.jpg",
    highlights: [
      "大濠公園でランニングや散歩が楽しめる",
      "閑静な高級住宅街",
      "福岡市美術館が隣接",
      "天神まで地下鉄で2駅",
    ],
    avgRent: 85000,
  },
  {
    slug: "yakuin",
    name: "薬院",
    description: "天神に隣接するおしゃれなカフェやレストランが並ぶ人気エリア。",
    image: "/images/areas/yakuin.jpg",
    highlights: [
      "おしゃれなカフェ・レストランが多い",
      "天神まで徒歩圏内",
      "西鉄・地下鉄の2路線利用可能",
    ],
    avgRent: 70000,
  },
  {
    slug: "nakasu",
    name: "中洲",
    description: "日本有数の歓楽街。屋台文化が有名。",
    image: "/images/areas/nakasu.jpg",
    highlights: [
      "博多名物の屋台が楽しめる",
      "天神・博多の中間で両方にアクセス良好",
      "中洲川端商店街で買い物にも便利",
    ],
    avgRent: 65000,
  },
  {
    slug: "ropponmatsu",
    name: "六本松",
    description: "再開発で注目の新興エリア。科学館や図書館など文化施設も充実。",
    image: "/images/areas/ropponmatsu.jpg",
    highlights: [
      "福岡市科学館・図書館が徒歩圏内",
      "再開発で新しい商業施設が増加中",
      "大濠公園にも近く緑が豊か",
      "地下鉄七隈線で天神南に直結",
    ],
    avgRent: 62000,
  },
  {
    slug: "hakozaki",
    name: "箱崎",
    description: "筥崎宮の門前町。落ち着いた住宅街で家賃もリーズナブル。",
    image: "/images/areas/hakozaki.jpg",
    highlights: [
      "家賃相場が福岡市内で比較的安い",
      "筥崎宮や放生会など歴史・文化が豊か",
      "地下鉄箱崎線で博多・中洲にアクセス良好",
    ],
    avgRent: 48000,
  },
]

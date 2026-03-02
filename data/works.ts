export interface Work {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
}

const BASE = "https://assets.seki-saki.com";

export const works: Work[] = [
  // デジタルイラスト
  {
    id: "1",
    title: "Confidence",
    category: "デジタルイラスト",
    year: "2025",
    image: `${BASE}/2025/confidence.webp`,
    description: "",
  },
  {
    id: "2",
    title: "真夏の視線",
    category: "デジタルイラスト",
    year: "2025",
    image: `${BASE}/2025/manatsu_no_shisen.webp`,
    description: "",
  },
  {
    id: "3",
    title: "Electronics",
    category: "デジタルイラスト",
    year: "2025",
    image: `${BASE}/2025/electronics.webp`,
    description: "",
  },
  {
    id: "4",
    title: "女神",
    category: "デジタルイラスト",
    year: "2025",
    image: `${BASE}/2025/megami.webp`,
    description: "",
  },
  {
    id: "5",
    title: "厚塗りイラスト",
    category: "デジタルイラスト",
    year: "2025",
    image: `${BASE}/2025/atsunuri_woman.webp`,
    description: "",
  },
  {
    id: "6",
    title: "コンセプトアート",
    category: "デジタルイラスト",
    year: "2025",
    image: `${BASE}/2025/concept_art.webp`,
    description: "",
  },
  // ペンイラスト
  {
    id: "7",
    title: "ペンイラスト①",
    category: "ペンイラスト",
    year: "2025",
    image: `${BASE}/2025/pen1.webp`,
    description: "",
  },
  {
    id: "8",
    title: "ペンイラスト②",
    category: "ペンイラスト",
    year: "2025",
    image: `${BASE}/2025/pen2.webp`,
    description: "",
  },
  {
    id: "9",
    title: "人物ペンイラスト①",
    category: "ペンイラスト",
    year: "2025",
    image: `${BASE}/2025/human_pen.webp`,
    description: "",
  },
  {
    id: "10",
    title: "人物ペンイラスト②",
    category: "ペンイラスト",
    year: "2025",
    image: `${BASE}/2025/human_pen2.webp`,
    description: "",
  },
  {
    id: "11",
    title: "人物ペンイラスト③",
    category: "ペンイラスト",
    year: "2025",
    image: `${BASE}/2025/human_pen5.webp`,
    description: "",
  },
  // キャラクターイラスト
  {
    id: "12",
    title: "あんぱん",
    category: "キャラクターイラスト",
    year: "2025",
    image: `${BASE}/2025/anpan.webp`,
    description: "",
  },
  {
    id: "13",
    title: "おにぎり",
    category: "キャラクターイラスト",
    year: "2025",
    image: `${BASE}/2025/onigiri.webp`,
    description: "",
  },
  {
    id: "14",
    title: "すいか",
    category: "キャラクターイラスト",
    year: "2025",
    image: `${BASE}/2025/suica.webp`,
    description: "",
  },
  {
    id: "15",
    title: "ねこ",
    category: "キャラクターイラスト",
    year: "2025",
    image: `${BASE}/2025/cat.webp`,
    description: "",
  },
  {
    id: "16",
    title: "いぬ",
    category: "キャラクターイラスト",
    year: "2025",
    image: `${BASE}/2025/dog.webp`,
    description: "",
  },
  {
    id: "17",
    title: "ぷりん",
    category: "キャラクターイラスト",
    year: "2025",
    image: `${BASE}/2025/purin.webp`,
    description: "",
  },
  {
    id: "18",
    title: "ラーメン",
    category: "キャラクターイラスト",
    year: "2025",
    image: `${BASE}/2025/ramen.webp`,
    description: "",
  },
  {
    id: "19",
    title: "さぼてん",
    category: "キャラクターイラスト",
    year: "2025",
    image: `${BASE}/2025/saboten.webp`,
    description: "",
  },
  // レジンアート
  {
    id: "20",
    title: "レジンアート①",
    category: "レジンアート",
    year: "2025",
    image: `${BASE}/2025/resin1.webp`,
    description: "",
  },
  {
    id: "21",
    title: "レジンアート②",
    category: "レジンアート",
    year: "2025",
    image: `${BASE}/2025/resin2.webp`,
    description: "",
  },
  {
    id: "22",
    title: "レジンアート③",
    category: "レジンアート",
    year: "2025",
    image: `${BASE}/2025/resin3.webp`,
    description: "",
  },
  {
    id: "23",
    title: "レジンアート④",
    category: "レジンアート",
    year: "2025",
    image: `${BASE}/2025/resin4.webp`,
    description: "",
  },
  // グラフィックデザイン
  {
    id: "24",
    title: "CDジャケット",
    category: "グラフィックデザイン",
    year: "2025",
    image: `${BASE}/2025/cd.webp`,
    description: "",
  },
  {
    id: "25",
    title: "Rain",
    category: "グラフィックデザイン",
    year: "2025",
    image: `${BASE}/2025/rain.webp`,
    description: "",
  },
  {
    id: "26",
    title: "アヒルアイコン",
    category: "グラフィックデザイン",
    year: "2025",
    image: `${BASE}/2025/ahiru_icon.webp`,
    description: "",
  },
  {
    id: "27",
    title: "アヒルアイコン2",
    category: "グラフィックデザイン",
    year: "2025",
    image: `${BASE}/2025/ahiru_icon2.webp`,
    description: "",
  },
  {
    id: "28",
    title: "致命傷は避けてやる",
    category: "デジタルイラスト",
    year: "2026", // 2025/12/30
    image: `${BASE}/2026/avoid_fatal_injury.webp`,
    description:
      "自由に大胆でありたいという心情とは裏腹に、どこか保守的で自己愛の強い存在を揶揄する",
  },
  {
    id: "29",
    title: "FOCUS",
    category: "デジタルイラスト",
    year: "2026", // 2026/1/11
    image: `${BASE}/2026/FOCUS.webp`,
    description:
      "助けを求める人を描きたいと思った。イラストは西洋絵画の涙の表現を参考にした。また、魅せたい箇所以外の情報を減らすためにノイズをかけた。",
  },
];

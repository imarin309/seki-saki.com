export interface Work {
  id: string;
  title: string;
  category: string;
  /** yyyy / yyyy/mm / yyyy/mm/dd のいずれかの形式 */
  date: string;
  image: string;
  description: string;
}

function normalizeDateForSort(date: string): string {
  const parts = date.split("/");
  const pad = (s: string) => s.padStart(2, "0");
  if (parts.length === 1) return `${parts[0]}/01/01`;
  if (parts.length === 2) return `${parts[0]}/${pad(parts[1])}/01`;
  return `${parts[0]}/${pad(parts[1])}/${pad(parts[2])}`;
}

const BASE = "https://assets.seki-saki.com";

export const works: Work[] = [
  // デジタルイラスト
  {
    id: "1",
    title: "Confidence",
    category: "デジタルイラスト",
    date: "2025",
    image: `${BASE}/2025/confidence.webp`,
    description: "",
  },
  {
    id: "2",
    title: "真夏の視線",
    category: "デジタルイラスト",
    date: "2025",
    image: `${BASE}/2025/manatsu_no_shisen.webp`,
    description: "",
  },
  {
    id: "3",
    title: "Electronics",
    category: "デジタルイラスト",
    date: "2025",
    image: `${BASE}/2025/electronics.webp`,
    description: "",
  },
  {
    id: "4",
    title: "女神",
    category: "デジタルイラスト",
    date: "2025",
    image: `${BASE}/2025/megami.webp`,
    description: "",
  },
  {
    id: "5",
    title: "厚塗りイラスト",
    category: "デジタルイラスト",
    date: "2025",
    image: `${BASE}/2025/atsunuri_woman.webp`,
    description: "",
  },
  {
    id: "6",
    title: "コンセプトアート",
    category: "デジタルイラスト",
    date: "2025",
    image: `${BASE}/2025/concept_art.webp`,
    description: "",
  },
  // ペンイラスト
  {
    id: "7",
    title: "ペンイラスト①",
    category: "ペンイラスト",
    date: "2025",
    image: `${BASE}/2025/pen1.webp`,
    description: "",
  },
  {
    id: "8",
    title: "ペンイラスト②",
    category: "ペンイラスト",
    date: "2025",
    image: `${BASE}/2025/pen2.webp`,
    description: "",
  },
  {
    id: "9",
    title: "人物ペンイラスト①",
    category: "ペンイラスト",
    date: "2025",
    image: `${BASE}/2025/human_pen.webp`,
    description: "",
  },
  {
    id: "10",
    title: "人物ペンイラスト②",
    category: "ペンイラスト",
    date: "2025",
    image: `${BASE}/2025/human_pen2.webp`,
    description: "",
  },
  {
    id: "11",
    title: "人物ペンイラスト③",
    category: "ペンイラスト",
    date: "2025",
    image: `${BASE}/2025/human_pen5.webp`,
    description: "",
  },
  // キャラクターイラスト
  {
    id: "12",
    title: "あんぱん",
    category: "キャラクターイラスト",
    date: "2025",
    image: `${BASE}/2025/anpan.webp`,
    description: "",
  },
  {
    id: "13",
    title: "おにぎり",
    category: "キャラクターイラスト",
    date: "2025",
    image: `${BASE}/2025/onigiri.webp`,
    description: "",
  },
  {
    id: "14",
    title: "すいか",
    category: "キャラクターイラスト",
    date: "2025",
    image: `${BASE}/2025/suica.webp`,
    description: "",
  },
  {
    id: "15",
    title: "ねこ",
    category: "キャラクターイラスト",
    date: "2025",
    image: `${BASE}/2025/cat.webp`,
    description: "",
  },
  {
    id: "16",
    title: "いぬ",
    category: "キャラクターイラスト",
    date: "2025",
    image: `${BASE}/2025/dog.webp`,
    description: "",
  },
  {
    id: "17",
    title: "ぷりん",
    category: "キャラクターイラスト",
    date: "2025",
    image: `${BASE}/2025/purin.webp`,
    description: "",
  },
  {
    id: "18",
    title: "ラーメン",
    category: "キャラクターイラスト",
    date: "2025",
    image: `${BASE}/2025/ramen.webp`,
    description: "",
  },
  {
    id: "19",
    title: "さぼてん",
    category: "キャラクターイラスト",
    date: "2025",
    image: `${BASE}/2025/saboten.webp`,
    description: "",
  },
  // レジンアート
  {
    id: "20",
    title: "レジンアート①",
    category: "レジンアート",
    date: "2025",
    image: `${BASE}/2025/resin1.webp`,
    description: "",
  },
  {
    id: "21",
    title: "レジンアート②",
    category: "レジンアート",
    date: "2025",
    image: `${BASE}/2025/resin2.webp`,
    description: "",
  },
  {
    id: "22",
    title: "レジンアート③",
    category: "レジンアート",
    date: "2025",
    image: `${BASE}/2025/resin3.webp`,
    description: "",
  },
  {
    id: "23",
    title: "レジンアート④",
    category: "レジンアート",
    date: "2025",
    image: `${BASE}/2025/resin4.webp`,
    description: "",
  },
  // グラフィックデザイン
  {
    id: "24",
    title: "CDジャケット",
    category: "グラフィックデザイン",
    date: "2025",
    image: `${BASE}/2025/cd.webp`,
    description: "",
  },
  {
    id: "25",
    title: "Rain",
    category: "グラフィックデザイン",
    date: "2025",
    image: `${BASE}/2025/rain.webp`,
    description: "",
  },
  {
    id: "26",
    title: "アヒルアイコン",
    category: "グラフィックデザイン",
    date: "2025",
    image: `${BASE}/2025/ahiru_icon.webp`,
    description: "",
  },
  {
    id: "27",
    title: "アヒルアイコン2",
    category: "グラフィックデザイン",
    date: "2025",
    image: `${BASE}/2025/ahiru_icon2.webp`,
    description: "",
  },
  {
    id: "28",
    title: "致命傷は避けてやる",
    category: "デジタルイラスト",
    date: "2025/12/30",
    image: `${BASE}/2026/avoid_fatal_injury.webp`,
    description:
      "自由に大胆でありたいという心情とは裏腹に、どこか保守的で自己愛の強い存在を揶揄する",
  },
  {
    id: "29",
    title: "FOCUS",
    category: "デジタルイラスト",
    date: "2026/1/11",
    image: `${BASE}/2026/FOCUS.webp`,
    description:
      "助けを求める人を描きたいと思った。イラストは西洋絵画の涙の表現を参考にした。また、魅せたい箇所以外の情報を減らすためにノイズをかけた。",
  },
  {
    id: "30",
    title: "long hair girl",
    category: "デジタルイラスト",
    date: "2026/3/3",
    image: `${BASE}/2026/long_hair_girl.webp`,
    description: "30 minutes sketch 1",
  },
  {
    id: "31",
    title: "boy",
    category: "デジタルイラスト",
    date: "2026/3/29",
    image: `${BASE}/2026/boy.webp`,
    description: "たまにはメンズも描いてみました。平成男子になりました。",
  },
  {
    id: "32",
    title: "wedding illust",
    category: "デジタルイラスト",
    date: "2026/3/29",
    image: `${BASE}/2026/weding_illust.webp`,
    description:
      "友人のウェディングパンフレットのイラストを描きました。\n学生時代から可愛らしいカップルの印象があり、その雰囲気を明るくカラフルお花や笑顔で表現しました。\nお花はリクエストをいただいたもので構成されています。",
  },
  {
    id: "33",
    title: "maegami",
    category: "デジタルイラスト",
    date: "2026/3/31",
    image: `${BASE}/2026/maegami.webp`,
    description: "お昼休みスケッチ！前髪の長めの方を描きました。",
  },
  {
    id: "34",
    title: "hikari",
    category: "デジタルイラスト",
    date: "2026/4/11",
    image: `${BASE}/2026/hikari.webp`,
    description: "",
  },
  {
    id: "35",
    title: "hikari2",
    category: "デジタルイラスト",
    date: "2026/4/19",
    image: `${BASE}/2026/hikari2.webp`,
    description: "",
  },
  {
    id: "36",
    title: "hikari3",
    category: "デジタルイラスト",
    date: "2026/4/19",
    image: `${BASE}/2026/hikari3.webp`,
    description: "",
  },
    {
    id: "37",
    title: "Boy meets Star.",
    category: "デジタルイラスト",
    date: "2026/4/29",
    image: `${BASE}/2026/Boy_meets_Star.webp`,
    description: "線画をしっかり描くことを意識しました。",
  },
];

export const sortedWorks = [...works].sort((a, b) => {
  const dateA = normalizeDateForSort(a.date);
  const dateB = normalizeDateForSort(b.date);
  if (dateA !== dateB) return dateB.localeCompare(dateA);
  return Number(b.id) - Number(a.id);
});

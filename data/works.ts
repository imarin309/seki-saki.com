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
  // 厚塗り
  {
    id: "1",
    title: "Confidence",
    category: "厚塗り",
    date: "2025",
    image: `${BASE}/2025/confidence.webp`,
    description: "",
  },
  {
    id: "2",
    title: "真夏の視線",
    category: "厚塗り",
    date: "2025",
    image: `${BASE}/2025/manatsu_no_shisen.webp`,
    description: "",
  },
  {
    id: "3",
    title: "Electronics",
    category: "厚塗り",
    date: "2025",
    image: `${BASE}/2025/electronics.webp`,
    description: "",
  },
  {
    id: "4",
    title: "厚塗りイラスト",
    category: "厚塗り",
    date: "2025",
    image: `${BASE}/2025/atsunuri_woman.webp`,
    description: "",
  },
  {
    id: "5",
    title: "ペン①",
    category: "ペン画",
    date: "2025",
    image: `${BASE}/2025/pen1.webp`,
    description: "",
  },
  {
    id: "6",
    title: "ペン画②",
    category: "ペン画",
    date: "2025",
    image: `${BASE}/2025/pen2.webp`,
    description: "",
  },
  {
    id: "7",
    title: "人物ペン画①",
    category: "ペン画",
    date: "2025",
    image: `${BASE}/2025/human_pen.webp`,
    description: "",
  },
  {
    id: "8",
    title: "人物ペン画②",
    category: "ペン画",
    date: "2025",
    image: `${BASE}/2025/human_pen2.webp`,
    description: "",
  },
  {
    id: "9",
    title: "人物ペン画③",
    category: "ペン画",
    date: "2025",
    image: `${BASE}/2025/human_pen5.webp`,
    description: "",
  },
  {
    id: "10",
    title: "致命傷は避けてやる",
    category: "厚塗り",
    date: "2025/12/30",
    image: `${BASE}/2026/avoid_fatal_injury.webp`,
    description:
      "自由に大胆でありたいという心情とは裏腹に、どこか保守的で自己愛の強い存在を揶揄する",
  },
  {
    id: "11",
    title: "FOCUS",
    category: "厚塗り",
    date: "2026/1/11",
    image: `${BASE}/2026/FOCUS.webp`,
    description:
      "助けを求める人を描きたいと思った。イラストは西洋絵画の涙の表現を参考にした。また、魅せたい箇所以外の情報を減らすためにノイズをかけた。",
  },
  {
    id: "12",
    title: "long hair girl",
    category: "モノクロ",
    date: "2026/3/3",
    image: `${BASE}/2026/long_hair_girl.webp`,
    description: "30 minutes sketch 1",
  },
  {
    id: "13",
    title: "boy",
    category: "モノクロ",
    date: "2026/3/29",
    image: `${BASE}/2026/boy.webp`,
    description: "たまにはメンズも描いてみました。平成男子になりました。",
  },
  {
    id: "14",
    title: "wedding illust",
    category: "厚塗り",
    date: "2026/3/29",
    image: `${BASE}/2026/weding_illust.webp`,
    description:
      "友人のウェディングパンフレットのイラストを描きました。\n学生時代から可愛らしいカップルの印象があり、その雰囲気を明るくカラフルお花や笑顔で表現しました。\nお花はリクエストをいただいたもので構成されています。",
  },
  {
    id: "15",
    title: "maegami",
    category: "モノクロ",
    date: "2026/3/31",
    image: `${BASE}/2026/maegami.webp`,
    description: "お昼休みスケッチ！前髪の長めの方を描きました。",
  },
  {
    id: "16",
    title: "hikari",
    category: "厚塗り",
    date: "2026/4/11",
    image: `${BASE}/2026/hikari.webp`,
    description: "",
  },
  {
    id: "17",
    title: "hikari2",
    category: "厚塗り",
    date: "2026/4/19",
    image: `${BASE}/2026/hikari2.webp`,
    description: "",
  },
  {
    id: "18",
    title: "hikari3",
    category: "厚塗り",
    date: "2026/4/19",
    image: `${BASE}/2026/hikari3.webp`,
    description: "",
  },
  {
    id: "19",
    title: "Boy meets Star.",
    category: "厚塗り",
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

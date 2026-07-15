export interface Illust {
  id: string;
  /** URLに使用するスラッグ。タイトルの空白を「_」で置き換え、記号は除去したもの */
  slug: string;
  title: string;
  category: string;
  /** yyyy / yyyy/mm / yyyy/mm/dd のいずれかの形式 */
  date: string;
  image: string;
  /** ホバー時にクロスフェードで表示する別バージョン画像（任意） */
  image2?: string;
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

export const illusts: Illust[] = [
  // 厚塗り
  {
    id: "1",
    slug: "Confidence",
    title: "Confidence",
    category: "厚塗り",
    date: "2025",
    image: `${BASE}/2025/confidence.webp`,
    description: "",
  },
  {
    id: "2",
    slug: "Midsummer_Gaze",
    title: "真夏の視線",
    category: "厚塗り",
    date: "2025",
    image: `${BASE}/2025/manatsu_no_shisen.webp`,
    description: "",
  },
  {
    id: "3",
    slug: "Electronics",
    title: "Electronics",
    category: "厚塗り",
    date: "2025",
    image: `${BASE}/2025/electronics.webp`,
    description: "",
  },
  {
    id: "4",
    slug: "Thick_Paint_Illustration",
    title: "厚塗りイラスト",
    category: "厚塗り",
    date: "2025",
    image: `${BASE}/2025/atsunuri_woman.webp`,
    description: "",
  },
  {
    id: "5",
    slug: "Pen_Drawing_1",
    title: "ペン①",
    category: "ペン画",
    date: "2025",
    image: `${BASE}/2025/pen1.webp`,
    description: "",
  },
  {
    id: "6",
    slug: "Pen_Drawing_2",
    title: "ペン画②",
    category: "ペン画",
    date: "2025",
    image: `${BASE}/2025/pen2.webp`,
    description: "",
  },
  {
    id: "7",
    slug: "Figure_Pen_Drawing_1",
    title: "人物ペン画①",
    category: "ペン画",
    date: "2025",
    image: `${BASE}/2025/human_pen.webp`,
    description: "",
  },
  {
    id: "8",
    slug: "Figure_Pen_Drawing_2",
    title: "人物ペン画②",
    category: "ペン画",
    date: "2025",
    image: `${BASE}/2025/human_pen2.webp`,
    description: "",
  },
  {
    id: "9",
    slug: "Figure_Pen_Drawing_3",
    title: "人物ペン画③",
    category: "ペン画",
    date: "2025",
    image: `${BASE}/2025/human_pen5.webp`,
    description: "",
  },
  {
    id: "10",
    slug: "Avoid_Fatal_Injury",
    title: "致命傷は避けてやる",
    category: "厚塗り",
    date: "2025/12/30",
    image: `${BASE}/2026/avoid_fatal_injury.webp`,
    description:
      "自由に大胆でありたいという心情とは裏腹に、どこか保守的で自己愛の強い存在を揶揄する",
  },
  {
    id: "11",
    slug: "FOCUS",
    title: "FOCUS",
    category: "厚塗り",
    date: "2026/1/11",
    image: `${BASE}/2026/FOCUS.webp`,
    description:
      "助けを求める人を描きたいと思った。イラストは西洋絵画の涙の表現を参考にした。また、魅せたい箇所以外の情報を減らすためにノイズをかけた。",
  },
  {
    id: "12",
    slug: "long_hair_girl",
    title: "long hair girl",
    category: "モノクロ",
    date: "2026/3/3",
    image: `${BASE}/2026/long_hair_girl.webp`,
    description: "30 minutes sketch 1",
  },
  {
    id: "13",
    slug: "boy",
    title: "boy",
    category: "モノクロ",
    date: "2026/3/29",
    image: `${BASE}/2026/boy.webp`,
    description: "たまにはメンズも描いてみました。平成男子になりました。",
  },
  {
    id: "14",
    slug: "wedding_illust",
    title: "wedding illust",
    category: "厚塗り",
    date: "2026/3/29",
    image: `${BASE}/2026/weding_illust.webp`,
    description:
      "友人のウェディングパンフレットのイラストを描きました。\n学生時代から可愛らしいカップルの印象があり、その雰囲気を明るくカラフルお花や笑顔で表現しました。\nお花はリクエストをいただいたもので構成されています。",
  },
  {
    id: "15",
    slug: "maegami",
    title: "maegami",
    category: "モノクロ",
    date: "2026/3/31",
    image: `${BASE}/2026/maegami.webp`,
    description: "お昼休みスケッチ！前髪の長めの方を描きました。",
  },
  {
    id: "16",
    slug: "hikari",
    title: "hikari",
    category: "厚塗り",
    date: "2026/4/11",
    image: `${BASE}/2026/hikari.webp`,
    description: "",
  },
  {
    id: "17",
    slug: "hikari2",
    title: "hikari2",
    category: "厚塗り",
    date: "2026/4/19",
    image: `${BASE}/2026/hikari2.webp`,
    description: "",
  },
  {
    id: "18",
    slug: "hikari3",
    title: "hikari3",
    category: "厚塗り",
    date: "2026/4/19",
    image: `${BASE}/2026/hikari3.webp`,
    description: "",
  },
  {
    id: "19",
    slug: "Boy_meets_Star",
    title: "Boy meets Star.",
    category: "厚塗り",
    date: "2026/4/29",
    image: `${BASE}/2026/Boy_meets_Star.webp`,
    description: "線画をしっかり描くことを意識しました。",
  },
  {
    id: "20",
    slug: "engel_or_devil",
    title: "engel or devil?",
    category: "厚塗り",
    date: "2026/5/6",
    image: `${BASE}/2026/engel_or_devil.webp`,
    image2: `${BASE}/2026/engel_or_devil_megane.webp`,
    description: "",
  },
];

export const sortedIllusts = [...illusts].sort((a, b) => {
  const dateA = normalizeDateForSort(a.date);
  const dateB = normalizeDateForSort(b.date);
  if (dateA !== dateB) return dateB.localeCompare(dateA);
  return Number(b.id) - Number(a.id);
});

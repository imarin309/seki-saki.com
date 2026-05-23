export interface Work {
  id: string;
  title: string;
  /** yyyy/mm 形式 */
  date: string;
  description: string;
  images?: string[];
}

export const works: Work[] = [
  {
    id: "1",
    title: "ウェディングパンフレット イラスト制作",
    date: "2026/03",
    description:
      "友人のウェディングパンフレットのイラストを描きました。\n学生時代から可愛らしいカップルの印象があり、その雰囲気を明るくカラフルお花や笑顔で表現しました。\nお花はリクエストをいただいたもので構成されています。",
    images: ["https://assets.seki-saki.com/2026/weding_illust.webp"],
  },
  {
    id: "2",
    title: "ART STORE IYNさま 「Beautiful 5」に出展させていただきました",
    date: "2026/05",
    description:
      "2026/5/14日-2026/5/24の期間で大阪府にて開催の展示会になります。\nお近くにお寄りの際はぜひお立ち寄りくださいませ\n\nART STORE IYNさま\nhttps://www.gallery-iyn.com/post/beautiful5",
    images: [
      "https://assets.seki-saki.com/2026/works_beatiful5_1.webp",
      "https://assets.seki-saki.com/2026/works_beatiful5_2.webp",
    ],
  },
];

export const sortedWorks = [...works].sort((a, b) =>
  b.date.localeCompare(a.date)
);

export interface Work {
  id: string;
  title: string;
  /** yyyy/mm 形式 */
  date: string;
  description: string;
  image?: string;
}

export const works: Work[] = [
  {
    id: "1",
    title: "ウェディングパンフレット イラスト制作",
    date: "2026/03",
    description:
      "友人のウェディングパンフレットのイラストを描きました。\n学生時代から可愛らしいカップルの印象があり、その雰囲気を明るくカラフルお花や笑顔で表現しました。\nお花はリクエストをいただいたもので構成されています。",
    image: "https://assets.seki-saki.com/2026/weding_illust.webp",
  },
];

export const sortedWorks = [...works].sort((a, b) =>
  b.date.localeCompare(a.date)
);

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
      "友人のウェディングパンフレット用イラストを制作。ふたりの雰囲気に合わせた明るくカラフルな構図で、指定のお花を取り入れたデザインに仕上げました。",
    image: "https://assets.seki-saki.com/2026/weding_illust.webp",
  },
];

export const sortedWorks = [...works].sort((a, b) =>
  b.date.localeCompare(a.date)
);

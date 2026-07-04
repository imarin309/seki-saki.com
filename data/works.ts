export interface Work {
  id: string;
  slug: string;
  title: string;
  /** yyyy/mm 形式 */
  date: string;
  description: string;
  images?: string[];
}

export const works: Work[] = [
  {
    id: "1",
    slug: "wedding-pamphlet-illustration",
    title: "ウェディングパンフレット イラスト制作",
    date: "2026/03",
    description:
      "友人のウェディングパンフレットのイラストを描きました。\n学生時代から可愛らしいカップルの印象があり、その雰囲気を明るくカラフルお花や笑顔で表現しました。\nお花はリクエストをいただいたもので構成されています。",
    images: ["https://assets.seki-saki.com/2026/weding_illust.webp"],
  },
  {
    id: "2",
    slug: "beautiful-5",
    title: "ART STORE IYNさま 「Beautiful 5」に出展させていただきました",
    date: "2026/05",
    description:
      "2026/5/14日-2026/5/24の期間で大阪府にて開催の展示会になります。\nお近くにお寄りの際はぜひお立ち寄りくださいませ\n\nART STORE IYNさま\nhttps://www.gallery-iyn.com/post/beautiful5",
    images: [
      "https://assets.seki-saki.com/2026/works_beatiful5_1.webp",
      "https://assets.seki-saki.com/2026/works_beatiful5_2.webp",
    ],
  },
    {
    id: "3",
    slug: "stillhere_announcement",
    title: "2人展「STILL HERE」開催のお知らせ",
    date: "2026/07/04",
    description:
      "学生時代からの友人と、夏に2人展を開催します。\nテキスタイルとイラストレーションという表現方法の異なる2人が、同じ「動物」というテーマで制作しました。\n\nギャラリーをお借りしての展示は今回が初めてです。\n私は主に土日に在廊する予定です。\n\nもしご都合よろしければ、ぜひお越しください。DMなどいただけますと尚嬉しいです。\n皆様にお会いできるのを楽しみにしております。\n\n【STILLHERE】\n▫️日程　2026年7月31日(金)－8月2日(日)\n▫️時間　11:00－18:00\n▫️会場　GALLERY SUMMER of LOVE\n　東京都杉並区高円寺南4丁目41-6\n　JR高円寺駅南口から徒歩2分\n\n[Textile] たなかひなこ　https://www.instagram.com/tt.1212b\n[Illustration] 世木口　https://www.instagram.com/_sekisaki",
    images: [
      "https://assets.seki-saki.com/2026/stillhere_dm.webp",
      "https://assets.seki-saki.com/2026/stillhere_dm2.webp",
    ],
  },
];

export const sortedWorks = [...works].sort((a, b) =>
  b.date.localeCompare(a.date)
);

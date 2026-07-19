import type { Locale } from "@/i18n/config";

export interface Work {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  /** yyyy/mm 形式 */
  date: string;
  description: string;
  descriptionEn: string;
  images?: string[];
}

export const works: Work[] = [
  {
    id: "1",
    slug: "wedding-pamphlet-illustration",
    title: "ウェディングパンフレット イラスト制作",
    titleEn: "Wedding Pamphlet Illustration",
    date: "2026/03",
    description:
      "友人のウェディングパンフレットのイラストを描きました。\n学生時代から可愛らしいカップルの印象があり、その雰囲気を明るくカラフルお花や笑顔で表現しました。\nお花はリクエストをいただいたもので構成されています。",
    descriptionEn:
      "I illustrated a wedding pamphlet for a friend.\nThey've struck me as an adorable couple since our school days, so I expressed that bright, cheerful mood through colorful flowers and smiles.\nThe flowers were arranged based on their requests.",
    images: ["https://assets.seki-saki.com/2026/weding_illust.webp"],
  },
  {
    id: "2",
    slug: "beautiful-5",
    title: "ART STORE IYNさま 「Beautiful 5」に出展させていただきました",
    titleEn: 'Exhibited in "Beautiful 5" at ART STORE IYN',
    date: "2026/05",
    description:
      "2026/5/14日-2026/5/24の期間で大阪府にて開催の展示会になります。\nお近くにお寄りの際はぜひお立ち寄りくださいませ\n\nART STORE IYNさま\nhttps://www.gallery-iyn.com/post/beautiful5",
    descriptionEn:
      "This exhibition runs from May 14 to May 24, 2026 in Osaka.\nIf you're in the area, please feel free to stop by!\n\nART STORE IYN\nhttps://www.gallery-iyn.com/post/beautiful5",
    images: [
      "https://assets.seki-saki.com/2026/works_beatiful5_1.webp",
      "https://assets.seki-saki.com/2026/works_beatiful5_2.webp",
    ],
  },
  {
    id: "3",
    slug: "stillhere_announcement",
    title: "2人展「STILL HERE」開催のお知らせ",
    titleEn: 'Announcing the Two-Person Exhibition "STILL HERE"',
    date: "2026/07/04",
    description:
      "学生時代からの友人と、夏に2人展を開催します。\nテキスタイルとイラストレーションという表現方法の異なる2人が、同じ「動物」というテーマで制作しました。\n\nギャラリーをお借りしての展示は今回が初めてです。\n私は主に土日に在廊する予定です。\n\nもしご都合よろしければ、ぜひお越しください。DMなどいただけますと尚嬉しいです。\n皆様にお会いできるのを楽しみにしております。\n\n【STILLHERE】\n・日程 2026年7月31日(金)-8月2日(日)\n・時間 11:00-18:00\n・会場 GALLERY SUMMER of LOVE\n 東京都杉並区高円寺南4丁目41-6\n JR高円寺駅南口から徒歩2分\n\n[Textile] たなかひなこ: https://www.instagram.com/tt.1212b\n[Illustration] 世木口: https://www.instagram.com/_sekisaki",
    descriptionEn:
      "I'm holding a two-person exhibition this summer with a friend from my school days.\nThe two of us, working in different media — textile and illustration — created pieces around the same theme of \"animals.\"\n\nThis is the first time either of us has exhibited in a rented gallery space.\nI'll mainly be at the gallery on weekends.\n\nIf you're able to, please come by — a DM beforehand would make me especially happy.\nI'm looking forward to seeing everyone there.\n\n【STILL HERE】\n・Dates: Friday, July 31 – Sunday, August 2, 2026\n・Hours: 11:00–18:00\n・Venue: GALLERY SUMMER of LOVE\n 4-41-6 Koenji-Minami, Suginami-ku, Tokyo\n 2-minute walk from the south exit of JR Koenji Station\n\n[Textile] Hinako Tanaka: https://www.instagram.com/tt.1212b\n[Illustration] Sekiguchi: https://www.instagram.com/_sekisaki",
    images: [
      "https://assets.seki-saki.com/2026/stillhere_dm.webp",
      "https://assets.seki-saki.com/2026/stillhere_dm2.webp",
    ],
  },
];

export const sortedWorks = [...works].sort((a, b) =>
  b.date.localeCompare(a.date)
);

export function getWorkTitle(work: Work, locale: Locale): string {
  return locale === "en" ? work.titleEn : work.title;
}

export function getWorkDescription(work: Work, locale: Locale): string {
  return locale === "en" ? work.descriptionEn : work.description;
}

import type { Locale } from "@/i18n/config";

export interface Illust {
  id: string;
  /** URLに使用するスラッグ。タイトルの空白を「_」で置き換え、記号は除去したもの */
  slug: string;
  title: string;
  /** 英語版タイトル。未指定の場合は title をそのまま使用（タイトルが既に英語の場合など） */
  titleEn?: string;
  category: string;
  /** yyyy / yyyy/mm / yyyy/mm/dd のいずれかの形式 */
  date: string;
  image: string;
  /** ホバー時にクロスフェードで表示する別バージョン画像（任意） */
  image2?: string;
  description: string;
  /** 英語版説明文。未指定の場合は description をそのまま使用 */
  descriptionEn?: string;
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
    titleEn: "Midsummer Gaze",
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
    titleEn: "Thick-Paint Illustration",
    category: "厚塗り",
    date: "2025",
    image: `${BASE}/2025/atsunuri_woman.webp`,
    description: "",
  },
  {
    id: "5",
    slug: "Pen_Drawing_1",
    title: "ペン①",
    titleEn: "Pen Drawing 1",
    category: "ペン画",
    date: "2025",
    image: `${BASE}/2025/pen1.webp`,
    description: "",
  },
  {
    id: "6",
    slug: "Pen_Drawing_2",
    title: "ペン画②",
    titleEn: "Pen Drawing 2",
    category: "ペン画",
    date: "2025",
    image: `${BASE}/2025/pen2.webp`,
    description: "",
  },
  {
    id: "7",
    slug: "Figure_Pen_Drawing_1",
    title: "人物ペン画①",
    titleEn: "Figure Pen Drawing 1",
    category: "ペン画",
    date: "2025",
    image: `${BASE}/2025/human_pen.webp`,
    description: "",
  },
  {
    id: "8",
    slug: "Figure_Pen_Drawing_2",
    title: "人物ペン画②",
    titleEn: "Figure Pen Drawing 2",
    category: "ペン画",
    date: "2025",
    image: `${BASE}/2025/human_pen2.webp`,
    description: "",
  },
  {
    id: "9",
    slug: "Figure_Pen_Drawing_3",
    title: "人物ペン画③",
    titleEn: "Figure Pen Drawing 3",
    category: "ペン画",
    date: "2025",
    image: `${BASE}/2025/human_pen5.webp`,
    description: "",
  },
  {
    id: "10",
    slug: "Avoid_Fatal_Injury",
    title: "致命傷は避けてやる",
    titleEn: "I'll Avoid the Fatal Blow",
    category: "厚塗り",
    date: "2025/12/30",
    image: `${BASE}/2026/avoid_fatal_injury.webp`,
    description:
      "自由に大胆でありたいという心情とは裏腹に、どこか保守的で自己愛の強い存在を揶揄する",
    descriptionEn:
      "A wry look at a self-loving, quietly conservative figure — at odds with the wish to be bold and free.",
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
    descriptionEn:
      "I wanted to draw someone reaching out for help. The illustration draws on how tears are depicted in Western paintings, and I added noise to pare back detail everywhere except the focal point.",
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
    descriptionEn:
      "For once I drew a guy — he ended up looking like a Heisei-era boy.",
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
    descriptionEn:
      "I illustrated a wedding pamphlet for a friend.\nThey've struck me as an adorable couple since our school days, so I expressed that bright, cheerful mood through colorful flowers and smiles.\nThe flowers were arranged based on their requests.",
  },
  {
    id: "15",
    slug: "maegami",
    title: "maegami",
    category: "モノクロ",
    date: "2026/3/31",
    image: `${BASE}/2026/maegami.webp`,
    description: "お昼休みスケッチ！前髪の長めの方を描きました。",
    descriptionEn: "A lunch-break sketch! I drew someone with longer bangs.",
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
    descriptionEn: "I focused on drawing solid, confident line work.",
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
  {
    id: "21",
    slug: "Resistance_of_Parallel_Lines",
    title: "平行線の抵抗",
    titleEn: "Resistance of Parallel Lines",
    category: "厚塗り",
    date: "2026/7/31",
    image: `${BASE}/2026/iriomoteyamaneko.webp`,
    description:
      "路上の境界で、命は何を問うのだろう。\n\n奪われ続ける野生と、人間の暮らし。互いが交わることのない平行線の先で、彼女たちの眼差しがこちらを見つめている。",
    descriptionEn:
      "What does life ask for, at the boundary of the road?\n\nWildness endlessly taken away, and human life going on. Beyond parallel lines that never meet, their eyes gaze back at us.",
  },
  {
    id: "22",
    slug: "Ophelias_Ripples",
    title: "オフィーリアの波紋",
    titleEn: "Ophelia's Ripples",
    category: "厚塗り",
    date: "2026/7/31",
    image: `${BASE}/2026/kame.webp`,
    description:
      "（シェイクスピア『ハムレット』より）\n\n悲劇の底で、もしも別の命と出逢っていたなら。\n\n水面に揺れる少女の傍らに寄り添う小さな命が、絶望の物語に密やかなIFを投げかける。",
    descriptionEn:
      '(From Shakespeare\'s Hamlet)\n\nWhat if, at the depths of tragedy, she had met another life?\n\nA small creature drifting beside the girl on the rippling water casts a quiet "what if" into a story of despair.',
  },
  {
    id: "23",
    slug: "Beyond_the_Gaze",
    title: "まなざしの先",
    titleEn: "Beyond the Gaze",
    category: "厚塗り",
    date: "2026/7/31",
    image: `${BASE}/2026/yukihyou.webp`,
    description:
      "白銀の静寂の中、同じ地平を見つめる二人。\n\n風の音だけが響くその場所から、まだ見ぬ世界への旅が始まる。",
    descriptionEn:
      "Amid the silvery silence, two figures gaze toward the same horizon.\n\nFrom a place where only the wind speaks, a journey toward an unseen world begins.",
  },
  {
    id: "24",
    slug: "Bearing_Vermilion",
    title: "朱を背負う",
    titleEn: "Bearing Vermilion",
    category: "厚塗り",
    date: "2026/7/31",
    image: `${BASE}/2026/toki.webp`,
    description:
      "人間が残した深い爪痕と、再び空へと還された命。\n\n肖像のように佇むトキの鋭い眼差しは、過去の後悔を試すように、まっすぐこちらを射抜いている。",
    descriptionEn:
      "Deep scars left behind by humans, and a life returned once more to the sky.\n\nStanding like a portrait, the crested ibis's sharp gaze pierces straight through us, as if testing our past regrets.",
  },
  {
    id: "25",
    slug: "A_Brow_at_Rest",
    title: "休息のひたい",
    titleEn: "A Brow at Rest",
    category: "厚塗り",
    date: "2026/7/31",
    image: `${BASE}/2026/wani.webp`,
    description:
      "獰猛とされるその頭上は、時に小さな命たちの憩いの場となる。\n\n畏怖の裏側に存在する、知られざる平穏な日常の一幕。",
    descriptionEn:
      "The brow of a creature thought ferocious sometimes becomes a resting place for small lives.\n\nA quiet, unknown scene of everyday peace, hidden on the other side of fear.",
  },
  {
    id: "26",
    slug: "A_Whisper_Returning_to_Earth",
    title: "土へ還る囁き",
    titleEn: "A Whisper Returning to Earth",
    category: "厚塗り",
    date: "2026/7/31",
    image: `${BASE}/2026/mizuramogura.webp`,
    description:
      "（カンタータ『土の歌』第四楽章より）\n\nゆらぐ世界のゆくえに抱く、言葉にならない漠然とした不安。\n\n足元の闇から聞こえるのは、「いずれ人間も同じ土へと還るのだ」という密やかな囁き。",
    descriptionEn:
      '(From the fourth movement of the cantata "Tsuchi no Uta")\n\nA vague, wordless unease about where this trembling world is headed.\n\nFrom the darkness underfoot comes a quiet whisper: "someday, humans too will return to the same earth."',
  },
  {
    id: "27",
    slug: "A_Fleeting_Flutter",
    title: "一瞬の羽ばたき",
    titleEn: "A Fleeting Flutter",
    category: "厚塗り",
    date: "2026/7/31",
    image: `${BASE}/2026/umigarasu.webp`,
    description:
      "水中を切り裂くように泳ぐウミガラスと、ひとりの女性が出会う一瞬。\n\nこの出会いは掠めるような奇跡か、それとも互いを知る始まりなのか。次の瞬間、鳥は深く静かな水中へと消えていく。",
    descriptionEn:
      "A moment when a guillemot, slicing through the water, meets a woman.\n\nIs this encounter a fleeting miracle, or the beginning of knowing one another? In the next instant, the bird vanishes into the deep, silent water.",
  },
  // ドローイング
  {
    id: "28",
    slug: "drawing_0809",
    title: "drawing_0809",
    category: "ドローイング",
    date: "2026/8/9",
    image: `${BASE}/2026/drawing_0809.webp`,
    description: "",
  },
  {
    id: "29",
    slug: "drawing_0811",
    title: "drawing_0811",
    category: "ドローイング",
    date: "2026/8/11",
    image: `${BASE}/2026/drawing_0811.webp`,
    description: "",
  },
  {
    id: "30",
    slug: "drawing_0812",
    title: "drawing_0812",
    category: "ドローイング",
    date: "2026/8/12",
    image: `${BASE}/2026/drawing_0812.webp`,
    description: "",
  },
  {
    id: "31",
    slug: "drawing_0813",
    title: "drawing_0813",
    category: "ドローイング",
    date: "2026/8/13",
    image: `${BASE}/2026/drawing_0813.webp`,
    description: "",
  },
  {
    id: "32",
    slug: "drawing_0815",
    title: "drawing_0815",
    category: "ドローイング",
    date: "2026/8/15",
    image: `${BASE}/2026/drawing_0815.webp`,
    description: "",
  },
  {
    id: "33",
    slug: "drawing_0816",
    title: "drawing_0816",
    category: "ドローイング",
    date: "2026/8/16",
    image: `${BASE}/2026/drawing_0816.webp`,
    description: "",
  },
  {
    id: "34",
    slug: "drawing_0817",
    title: "drawing_0817",
    category: "ドローイング",
    date: "2026/8/17",
    image: `${BASE}/2026/drawing_0817.webp`,
    description: "",
  },
  {
    id: "35",
    slug: "drawing_0818",
    title: "drawing_0818",
    category: "ドローイング",
    date: "2026/8/18",
    image: `${BASE}/2026/drawing_0818.webp`,
    description: "",
  },
  {
    id: "36",
    slug: "drawing_0819",
    title: "drawing_0819",
    category: "ドローイング",
    date: "2026/8/19",
    image: `${BASE}/2026/drawing_0819.webp`,
    description: "",
  },
  {
    id: "37",
    slug: "drawing_0820",
    title: "drawing_0820",
    category: "ドローイング",
    date: "2026/8/20",
    image: `${BASE}/2026/drawing_0820.webp`,
    description: "",
  },
];

export const sortedIllusts = [...illusts].sort((a, b) => {
  const dateA = normalizeDateForSort(a.date);
  const dateB = normalizeDateForSort(b.date);
  if (dateA !== dateB) return dateB.localeCompare(dateA);
  return Number(b.id) - Number(a.id);
});

export function getIllustTitle(illust: Illust, locale: Locale): string {
  return locale === "en" ? (illust.titleEn ?? illust.title) : illust.title;
}

export function getIllustDescription(illust: Illust, locale: Locale): string {
  return locale === "en"
    ? (illust.descriptionEn ?? illust.description)
    : illust.description;
}

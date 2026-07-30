"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, ChevronDown, ImageIcon } from "lucide-react";
import { INSTAGRAM_URL } from "@/app/meta";

interface ExhibitionWork {
  number: string;
  title: string;
  note?: string;
  caption: string;
  /** タイトル背景に敷く作品画像の URL（未設定の間はプレースホルダー表示） */
  image?: string;
}

const HERO_IMAGE: string | undefined =
  "https://assets.seki-saki.com/2026/umigarasu.webp";

const works: ExhibitionWork[] = [
  {
    number: "01",
    title: "平行線の抵抗",
    caption:
      "路上の境界で、命は何を問うのだろう。\n\n奪われ続ける野生と、人間の暮らし。互いが交わることのない平行線の先で、彼女たちの眼差しがこちらを見つめている。",
    image: "https://assets.seki-saki.com/2026/wani.webp",
  },
  {
    number: "02",
    title: "一瞬の羽ばたき",
    caption:
      "水中を切り裂くように泳ぐウミガラスと、ひとりの女性が出会う一瞬。\n\nこの出会いは掠めるような奇跡か、それとも互いを知る始まりなのか。次の瞬間、鳥は深く静かな水中へと消えていく。",
    image: "https://assets.seki-saki.com/2026/umigarasu.webp",
  },
  {
    number: "03",
    title: "オフィーリアの波紋",
    note: "（シェイクスピア『ハムレット』より）",
    caption:
      "悲劇の底で、もしも別の命と出逢っていたなら。\n\n水面に揺れる少女の傍らに寄り添う小さな命が、絶望の物語に密やかなIFを投げかける。",
    image: "https://assets.seki-saki.com/2026/kame.webp",
  },
  {
    number: "04",
    title: "まなざしの先",
    caption:
      "白銀の静寂の中、同じ地平を見つめる二人。\n\n風の音だけが響くその場所から、まだ見ぬ世界への旅が始まる。",
    image: "https://assets.seki-saki.com/2026/yukihyou.webp",
  },
  {
    number: "05",
    title: "朱を背負う",
    caption:
      "人間が残した深い爪痕と、再び空へと還された命。\n\n肖像のように佇むトキの鋭い眼差しは、過去の後悔を試すように、まっすぐこちらを射抜いている。",
    image: "https://assets.seki-saki.com/2026/toki.webp",
  },
  {
    number: "06",
    title: "休息のひたい",
    caption:
      "獰猛とされるその頭上は、時に小さな命たちの憩いの場となる。\n\n畏怖の裏側に存在する、知られざる平穏な日常の一幕。",
    image: "https://assets.seki-saki.com/2026/iriomoteyamaneko.webp",
  },
  {
    number: "07",
    title: "土へ還る囁き",
    note: "（カンタータ『土の歌』第四楽章より）",
    caption:
      "ゆらぐ世界のゆくえに抱く、言葉にならない漠然とした不安。\n\n足元の闇から聞こえるのは、「いずれ人間も同じ土へと還るのだ」という密やかな囁き。",
    image: "https://assets.seki-saki.com/2026/mizuramogura.webp",
  },
];

const eventInfo: { label: string; value: string }[] = [
  { label: "会期", value: "2026/7/31(金) - 2026/8/2(日)" },
  { label: "会場", value: "GALLERY SUMMER of LOVE" },
  { label: "時間", value: "11:00 - 18:00" },
  { label: "入場料", value: "無料" },
];

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function StillHereContent() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Link
        href="/"
        className="fixed left-6 top-6 z-50 flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-white"
      >
        <ArrowLeft size={16} />
        seki-saki.com
      </Link>

      {/* Hero */}
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        {HERO_IMAGE ? (
          <>
            <Image
              src={HERO_IMAGE}
              alt="still here"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-[#0a0a0a]" />
          </>
        ) : (
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_70%)]" />
        )}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-6 text-sm tracking-[0.3em] text-gray-400"
        >
          世木口 個展
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative text-6xl tracking-tight md:text-8xl"
        >
          still here
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mt-8 text-gray-400"
        >
          {eventInfo[0].value} / {eventInfo[1].value}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { duration: 0.8, delay: 0.6 },
            y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute bottom-10"
        >
          <ChevronDown className="text-gray-500" size={28} />
        </motion.div>
      </section>

      {/* Statement */}
      <section className="border-t border-white/10 py-24">
        <div className="container mx-auto max-w-2xl px-6 text-center">
          <FadeUp>
            <p className="whitespace-pre-line leading-loose text-gray-300">
              {
                "学生時代からの友人と、夏に2人展を開催します。\nテキスタイルとイラストレーションという表現方法の異なる2人が、同じ「動物」というテーマで制作しました。\n\nギャラリーをお借りしての展示は今回が初めてです。\n私は主に土日に在廊する予定です。\n\nもしご都合よろしければ、ぜひお越しください。DMなどいただけますと尚嬉しいです。\n皆様にお会いできるのを楽しみにしております。"
              }
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Works */}
      <section className="border-t border-white/10 bg-[#111111] py-24">
        <div className="container mx-auto px-6">
          <FadeUp className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl">Works</h2>
            <p className="mt-3 text-gray-500">展示作品 7点</p>
          </FadeUp>

          <div className="mx-auto flex max-w-3xl flex-col gap-16">
            {works.map((work, index) => (
              <FadeUp key={work.number} delay={0.05 * (index % 3)}>
                <div>
                  <div className="relative overflow-hidden border border-white/10 bg-white/[0.02]">
                    {work.image ? (
                      <>
                        <Image
                          src={work.image}
                          alt={work.title}
                          width={1200}
                          height={1200}
                          className="h-auto w-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                      </>
                    ) : (
                      <div className="flex min-h-[260px] flex-col items-center justify-center gap-3 text-gray-700 md:min-h-[360px]">
                        <ImageIcon size={32} strokeWidth={1.25} />
                        <span className="text-sm">画像 {work.number}</span>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
                      <span className="text-sm tracking-widest text-gray-400">
                        {work.number}
                      </span>
                      <h3 className="mt-1 text-3xl text-white">{work.title}</h3>
                      {work.note && (
                        <p className="mt-1 text-sm text-gray-300">
                          {work.note}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="mt-6 whitespace-pre-line leading-loose text-gray-400">
                    {work.caption}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Info */}
      <section className="border-t border-white/10 py-24">
        <div className="container mx-auto max-w-2xl px-6">
          <FadeUp className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl">Information</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <dl className="divide-y divide-white/10 border-y border-white/10">
              {eventInfo.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-1 py-5 sm:flex-row sm:gap-8"
                >
                  <dt className="w-24 flex-shrink-0 text-gray-500">
                    {item.label}
                  </dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 py-24">
        <div className="container mx-auto px-6">
          <FadeUp className="flex flex-col items-center gap-6 text-center">
            <p className="max-w-md text-gray-400">
              最新情報は Instagram でお知らせします。
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white px-8 py-3 text-black transition-colors hover:bg-gray-200"
            >
              Instagram
            </a>
          </FadeUp>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-6 text-center text-sm text-gray-500">
          <p>&copy; 2026 seki-saki.com. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

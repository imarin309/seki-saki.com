/**
 * サイト全体で共有するデザイントークン（クラス文字列とアニメーション定義）。
 * 「静かな鑑賞体験」を保つため、動きは fade + わずかな上下移動のみに統一する。
 */

/** ゆっくり止まる ease。バウンスさせない */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** 章番号・キャプション・ページ番号などの補助情報 */
export const LABEL =
  "text-[0.6875rem] font-medium uppercase tracking-[0.28em] text-ink-muted";

/** 章見出し（`01 / Introduction` など）の番号部分 */
export const CHAPTER_NUMBER =
  "font-display text-[0.8125rem] tabular-nums tracking-[0.2em] text-terracotta";

/** 読み物としての本文 */
export const PROSE =
  "whitespace-pre-line text-[0.9375rem] leading-[2.1] text-ink-soft md:text-base";

/** 罫線のみの控えめなリンク（ボタンの代わり） */
export const QUIET_LINK =
  "group inline-flex items-baseline gap-3 border-b border-line-strong pb-1 text-ink transition-colors hover:border-terracotta hover:text-terracotta";

/** 初回表示でそのままフェードインさせる要素 */
export function fadeIn(delay = 0, y = 12) {
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease: EASE },
  };
}

/** スクロールで画面に入ったときにフェードインさせる要素 */
export function fadeInView(delay = 0, y = 16) {
  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-12% 0px" },
    transition: { duration: 1.1, delay, ease: EASE },
  };
}

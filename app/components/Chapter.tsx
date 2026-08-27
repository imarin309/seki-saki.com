/**
 * `03 / About` のような章見出し。
 * 装飾ではなく情報構造として、作品集の章立てを表す。
 */
export function Chapter({
  number,
  label,
  className = "",
}: {
  /** 2 桁ゼロ埋めの章番号 */
  number: string;
  label: string;
  className?: string;
}) {
  return (
    <h2
      className={`flex items-baseline gap-3 font-display text-sm tracking-[0.2em] ${className}`}
    >
      <span className="tabular-nums text-terracotta">{number}</span>
      <span className="text-line-strong">/</span>
      <span className="text-ink">{label}</span>
    </h2>
  );
}

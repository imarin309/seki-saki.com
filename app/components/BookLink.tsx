import Link from "next/link";
import { QUIET_LINK } from "@/app/design";

/**
 * ボタンを使わず、罫線 1 本と矢印だけで示す導線。
 * 「作品集をひらく」のような、本をめくる側へ進む言葉に使う。
 */
export function BookLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`${QUIET_LINK} font-display text-base tracking-[0.1em] ${className}`}
    >
      {children}
      <span
        aria-hidden
        className="text-terracotta transition-transform duration-500 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}

import Image from "next/image";
import Link from "next/link";
import { LABEL } from "@/app/design";

export interface PageTurnTarget {
  href: string;
  title: string;
  /** 日付や技法など、タイトルの下に置く極小の補助情報 */
  meta: string;
  image?: string;
}

function PageTurnLink({
  target,
  label,
  align,
}: {
  target: PageTurnTarget;
  label: string;
  align: "left" | "right";
}) {
  const isRight = align === "right";

  return (
    <Link
      href={target.href}
      className={`group flex flex-col gap-5 ${isRight ? "md:items-end md:text-right" : ""}`}
    >
      <span className={LABEL}>{label}</span>
      <span
        className={`flex items-center gap-5 ${isRight ? "md:flex-row-reverse" : ""}`}
      >
        {target.image && (
          <span className="relative block h-20 w-20 shrink-0 overflow-hidden bg-paper-deep">
            <Image
              src={target.image}
              alt=""
              aria-hidden
              fill
              sizes="80px"
              className="object-cover transition-opacity duration-700 group-hover:opacity-90"
            />
          </span>
        )}
        <span className="block">
          <span className="block font-display text-lg leading-snug text-ink transition-colors group-hover:text-terracotta">
            {target.title}
          </span>
          <span className={`${LABEL} mt-2 block tabular-nums`}>
            {target.meta}
          </span>
        </span>
      </span>
    </Link>
  );
}

function EndOfBook({
  label,
  note,
  align,
}: {
  label: string;
  note: string;
  align: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "md:text-right" : ""}>
      <p className={LABEL}>{label}</p>
      <p className="mt-5 font-display text-lg text-ink-muted">{note}</p>
    </div>
  );
}

/**
 * 詳細ページ下部の Previous Page / Next Page。
 * 本の見開きに合わせて、前は左・次は右へ寄せる。
 */
export function PageTurnNav({
  previous,
  next,
  labels,
}: {
  previous: PageTurnTarget | null;
  next: PageTurnTarget | null;
  labels: {
    previous: string;
    next: string;
    noPrevious: string;
    noNext: string;
  };
}) {
  return (
    <nav className="grid grid-cols-1 gap-14 border-t border-line pt-12 md:grid-cols-2">
      {previous ? (
        <PageTurnLink target={previous} label={labels.previous} align="left" />
      ) : (
        <EndOfBook
          label={labels.previous}
          note={labels.noPrevious}
          align="left"
        />
      )}
      {next ? (
        <PageTurnLink target={next} label={labels.next} align="right" />
      ) : (
        <EndOfBook label={labels.next} note={labels.noNext} align="right" />
      )}
    </nav>
  );
}

import Image from "next/image";
import Link from "next/link";
import { currentExhibition } from "@/data/exhibition-banner";
import { LABEL } from "@/app/design";
import type { Locale } from "@/i18n/config";

export default function ExhibitionBanner({ locale }: { locale: Locale }) {
  if (!currentExhibition.enabled || locale !== "ja") {
    return null;
  }

  return (
    <Link
      href={currentExhibition.href}
      className="group flex max-w-md items-center gap-5 border-t border-line pt-5"
    >
      <div className="relative h-14 w-14 shrink-0 overflow-hidden bg-paper-deep">
        <Image
          src={currentExhibition.image}
          alt=""
          aria-hidden
          fill
          sizes="56px"
          className="object-cover transition-opacity duration-700 group-hover:opacity-90"
        />
      </div>
      <div>
        <p className={LABEL}>Exhibition</p>
        <p className="mt-1.5 font-display text-sm leading-snug text-ink transition-colors group-hover:text-terracotta">
          {currentExhibition.title}
        </p>
      </div>
    </Link>
  );
}

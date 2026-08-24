import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { currentExhibition } from "@/data/exhibition-banner";
import type { Locale } from "@/i18n/config";

export default function ExhibitionBanner({ locale }: { locale: Locale }) {
  if (!currentExhibition.enabled || locale !== "ja") {
    return null;
  }

  return (
    <Link
      href={currentExhibition.href}
      className="group inline-flex items-center gap-3 rounded-full border border-line bg-paper-card/90 py-2 pl-2 pr-5 shadow-soft backdrop-blur-sm transition-colors hover:bg-paper-card"
    >
      <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full">
        <Image
          src={currentExhibition.image}
          alt={currentExhibition.title}
          fill
          className="object-cover"
        />
      </div>
      <p className="text-sm text-ink">{currentExhibition.title}</p>
      <ArrowRight
        size={16}
        className="text-terracotta transition-transform group-hover:translate-x-1"
      />
    </Link>
  );
}

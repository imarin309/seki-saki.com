"use client";

import { usePathname } from "next/navigation";
import { MotionConfig } from "motion/react";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";

/** サイト共通の Header/Footer を表示しない、独立レイアウトのページのパスプレフィックス */
const STANDALONE_PATH_PREFIXES = ["/exhibition"];

function isStandalonePath(pathname: string): boolean {
  return STANDALONE_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 端末側で視差効果を減らす設定をしている場合は、動きを止めて表示だけ行う
  return (
    <MotionConfig reducedMotion="user">
      {isStandalonePath(pathname) ? (
        children
      ) : (
        <>
          <Header />
          <main className="pt-16">{children}</main>
          <Footer />
        </>
      )}
    </MotionConfig>
  );
}

"use client";

import { usePathname } from "next/navigation";
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

  if (isStandalonePath(pathname)) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="pt-20">{children}</main>
      <Footer />
    </>
  );
}

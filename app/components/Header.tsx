"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SITE_TITLE, SITE_ICON, INSTAGRAM_URL } from "@/app/meta";
import { EASE } from "@/app/design";
import {
  getAlternateLocalePath,
  localeFromPathname,
  withLocale,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const NAV_ITEM = "text-xs tracking-[0.18em] transition-colors";

function LocaleSwitch({
  locale,
  jaPath,
  enPath,
  className = "",
}: {
  locale: Locale;
  jaPath: string;
  enPath: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-1.5 text-xs tracking-[0.1em] ${className}`}
    >
      {locale === "ja" ? (
        <span className="text-terracotta">Ja</span>
      ) : (
        <Link
          href={jaPath}
          className="text-ink-muted transition-colors hover:text-terracotta"
        >
          Ja
        </Link>
      )}
      <span className="text-line-strong">/</span>
      {locale === "en" ? (
        <span className="text-terracotta">En</span>
      ) : (
        <Link
          href={enPath}
          className="text-ink-muted transition-colors hover:text-terracotta"
        >
          En
        </Link>
      )}
    </div>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const dict = getDictionary(locale);
  const alternatePath = getAlternateLocalePath(locale, pathname);
  const jaPath = locale === "ja" ? pathname : alternatePath;
  const enPath = locale === "en" ? pathname : alternatePath;

  const navLinks = [
    { name: dict.nav.home, path: withLocale(locale, "/") },
    { name: dict.nav.illust, path: withLocale(locale, "/illust") },
    { name: dict.nav.works, path: withLocale(locale, "/works") },
    { name: dict.nav.about, path: withLocale(locale, "/about") },
    { name: dict.nav.contact, path: withLocale(locale, "/contact") },
  ];

  const externalLinks = [{ name: dict.nav.instagram, href: INSTAGRAM_URL }];

  const isActive = (path: string) => {
    const homePath = withLocale(locale, "/");
    if (path === homePath) {
      return pathname === homePath;
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:px-10">
        <Link
          href={withLocale(locale, "/")}
          className="flex items-center gap-3 font-display text-base tracking-[0.2em] text-ink transition-colors hover:text-terracotta"
        >
          <Image
            src={SITE_ICON}
            alt=""
            aria-hidden
            width={28}
            height={28}
            className="h-7 w-7 shrink-0 object-cover"
          />
          {SITE_TITLE}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`relative ${NAV_ITEM} ${
                isActive(link.path)
                  ? "text-ink"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.span
                  layoutId="activeNav"
                  className="absolute -bottom-1.5 left-0 right-0 block h-px bg-terracotta"
                  transition={{ duration: 0.5, ease: EASE }}
                />
              )}
            </Link>
          ))}
          {externalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${NAV_ITEM} text-ink-muted hover:text-ink`}
            >
              {link.name}
            </a>
          ))}
          <LocaleSwitch locale={locale} jaPath={jaPath} enPath={enPath} />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-5 md:hidden">
          <LocaleSwitch locale={locale} jaPath={jaPath} enPath={enPath} />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={dict.nav.openMenu}
            aria-expanded={mobileMenuOpen}
            className="flex h-6 w-6 flex-col items-end justify-center gap-1.5"
          >
            {/* 罫線 2 本だけのメニューアイコン。開いているときは細い 1 本に畳む */}
            <span className="block h-px w-6 bg-ink" />
            <span
              className={`block h-px bg-ink transition-all duration-500 ${
                mobileMenuOpen ? "w-6 opacity-0" : "w-4 opacity-100"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden border-t border-line bg-paper md:hidden"
          >
            <div className="flex flex-col px-6 py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`border-b border-line py-4 ${NAV_ITEM} ${
                    isActive(link.path) ? "text-terracotta" : "text-ink-soft"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {externalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-4 ${NAV_ITEM} text-ink-soft`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SITE_TITLE, SITE_ICON, INSTAGRAM_URL } from "@/app/meta";
import {
  getAlternateLocalePath,
  localeFromPathname,
  withLocale,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

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
    <div className={`flex items-center gap-1.5 ${className}`}>
      {locale === "ja" ? (
        <span className="font-medium text-terracotta">Ja</span>
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
        <span className="font-medium text-terracotta">En</span>
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
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href={withLocale(locale, "/")}
            className="flex items-center gap-2.5 text-xl font-bold tracking-wider text-ink"
          >
            {/* リンク名はサイト名で伝わるため、アイコンは読み上げ対象から外す */}
            <Image
              src={SITE_ICON}
              alt=""
              aria-hidden
              width={40}
              height={40}
              priority
              className="size-10 shrink-0 rounded-full border border-line bg-paper-card object-contain"
            />
            {SITE_TITLE}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative transition-colors ${
                  isActive(link.path)
                    ? "font-medium text-terracotta"
                    : "text-ink-soft hover:text-terracotta"
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-terracotta"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
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
                className="text-ink-soft transition-colors hover:text-terracotta"
              >
                {link.name}
              </a>
            ))}
            <LocaleSwitch locale={locale} jaPath={jaPath} enPath={enPath} />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <LocaleSwitch locale={locale} jaPath={jaPath} enPath={enPath} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={dict.nav.openMenu}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-line md:hidden"
          >
            <div className="container mx-auto flex flex-col gap-4 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 transition-colors ${
                    isActive(link.path)
                      ? "font-medium text-terracotta"
                      : "text-ink-soft hover:text-terracotta"
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
                  className="py-2 text-ink-soft transition-colors hover:text-terracotta"
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

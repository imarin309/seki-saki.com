"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SITE_TITLE, INSTAGRAM_URL } from "@/app/meta";
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
        <span className="text-white">ja</span>
      ) : (
        <Link
          href={jaPath}
          className="text-gray-500 transition-colors hover:text-white"
        >
          ja
        </Link>
      )}
      <span className="text-gray-600">/</span>
      {locale === "en" ? (
        <span className="text-white">en</span>
      ) : (
        <Link
          href={enPath}
          className="text-gray-500 transition-colors hover:text-white"
        >
          en
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
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href={withLocale(locale, "/")}
            className="text-xl tracking-wider"
          >
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
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-white"
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
                className="text-gray-400 transition-colors hover:text-white"
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
            className="border-t border-white/10 md:hidden"
          >
            <div className="container mx-auto flex flex-col gap-4 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 transition-colors ${
                    isActive(link.path)
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
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
                  className="py-2 text-gray-400 transition-colors hover:text-white"
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

import { describe, expect, it } from "vitest";
import {
  getAlternateLocalePath,
  localeFromPathname,
  localePrefix,
  withLocale,
} from "@/i18n/config";

describe("localeFromPathname", () => {
  it("detects en for /en and /en/* paths", () => {
    expect(localeFromPathname("/en")).toBe("en");
    expect(localeFromPathname("/en/about")).toBe("en");
  });

  it("defaults to ja for other paths", () => {
    expect(localeFromPathname("/")).toBe("ja");
    expect(localeFromPathname("/about")).toBe("ja");
    expect(localeFromPathname("/english-page")).toBe("ja");
  });
});

describe("localePrefix", () => {
  it("has no prefix for ja and /en prefix for en", () => {
    expect(localePrefix("ja")).toBe("");
    expect(localePrefix("en")).toBe("/en");
  });
});

describe("withLocale", () => {
  it("keeps ja paths unprefixed", () => {
    expect(withLocale("ja", "/")).toBe("/");
    expect(withLocale("ja", "/illust/foo")).toBe("/illust/foo");
  });

  it("prefixes en paths with /en", () => {
    expect(withLocale("en", "/")).toBe("/en");
    expect(withLocale("en", "/illust/foo")).toBe("/en/illust/foo");
  });
});

describe("getAlternateLocalePath", () => {
  it("maps a ja path to its en equivalent", () => {
    expect(getAlternateLocalePath("ja", "/illust/foo")).toBe("/en/illust/foo");
  });

  it("maps an en path to its ja equivalent", () => {
    expect(getAlternateLocalePath("en", "/en/illust/foo")).toBe("/illust/foo");
    expect(getAlternateLocalePath("en", "/en")).toBe("/");
  });
});

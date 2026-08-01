import { describe, expect, it } from "vitest";
import { ILLUST_CATEGORIES, getIllustCategoryLabel } from "@/app/config";

describe("getIllustCategoryLabel", () => {
  it("returns a ja/en label for every configured category", () => {
    for (const category of ILLUST_CATEGORIES) {
      expect(getIllustCategoryLabel("ja", category)).toBeTruthy();
      expect(getIllustCategoryLabel("en", category)).toBeTruthy();
    }
  });

  it("falls back to the raw category when no label is defined", () => {
    expect(getIllustCategoryLabel("ja", "未知のカテゴリー")).toBe(
      "未知のカテゴリー"
    );
  });
});

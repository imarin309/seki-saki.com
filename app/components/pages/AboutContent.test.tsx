import { getDefaultNormalizer, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutContent from "@/app/components/pages/AboutContent";
import { getDictionary } from "@/i18n/dictionaries";

const keepLineBreaks = {
  normalizer: getDefaultNormalizer({ collapseWhitespace: false }),
};

describe("AboutContent", () => {
  it("renders the ja heading and bio paragraphs", () => {
    const dict = getDictionary("ja");
    render(<AboutContent locale="ja" />);

    expect(
      screen.getByRole("heading", { level: 1, name: dict.about.title })
    ).toBeInTheDocument();
    for (const paragraph of dict.about.bio) {
      expect(screen.getByText(paragraph, keepLineBreaks)).toBeInTheDocument();
    }
  });

  it("renders the en bio paragraphs", () => {
    const dict = getDictionary("en");
    render(<AboutContent locale="en" />);

    for (const paragraph of dict.about.bio) {
      expect(screen.getByText(paragraph, keepLineBreaks)).toBeInTheDocument();
    }
  });
});

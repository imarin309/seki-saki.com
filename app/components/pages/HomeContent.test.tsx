import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomeContent from "@/app/components/pages/HomeContent";
import { getDictionary } from "@/i18n/dictionaries";

describe("HomeContent", () => {
  it("renders the ja cover and chapter headings without crashing", () => {
    const dict = getDictionary("ja");
    render(<HomeContent locale="ja" />);

    expect(
      screen.getByRole("heading", { level: 1, name: dict.home.coverName })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: new RegExp(dict.home.coverCta) })
    ).toHaveAttribute("href", "/illust");
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: new RegExp(`02\\s*/\\s*${dict.home.selectedLabel}`),
      })
    ).toBeInTheDocument();
  });

  it("renders the en cover with /en-prefixed links", () => {
    const dict = getDictionary("en");
    render(<HomeContent locale="en" />);

    expect(
      screen.getByRole("heading", { level: 1, name: dict.home.coverName })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: new RegExp(dict.home.contactLink) })
    ).toHaveAttribute("href", "/en/contact");
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: new RegExp(`04\\s*/\\s*${dict.home.contactLabel}`),
      })
    ).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import WorksListContent from "@/app/components/pages/WorksListContent";
import { sortedWorks } from "@/data/works";

describe("WorksListContent", () => {
  it("renders a link for every work entry", () => {
    render(<WorksListContent locale="ja" />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Works" })
    ).toBeInTheDocument();

    for (const work of sortedWorks) {
      expect(
        screen.getByRole("link", { name: new RegExp(work.title) })
      ).toHaveAttribute("href", `/works/${work.slug}`);
    }
  });

  it("renders en links with /en-prefixed hrefs", () => {
    render(<WorksListContent locale="en" />);

    for (const work of sortedWorks) {
      expect(
        screen.getByRole("link", { name: new RegExp(work.titleEn) })
      ).toHaveAttribute("href", `/en/works/${work.slug}`);
    }
  });
});

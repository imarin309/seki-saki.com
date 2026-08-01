import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import WorkDetailClient from "@/app/works/[slug]/WorkDetailClient";
import { sortedWorks } from "@/data/works";

describe("WorkDetailClient (works)", () => {
  it("renders the work's title for a known slug", () => {
    const work = sortedWorks[0];
    render(<WorkDetailClient slug={work.slug} locale="ja" />);

    expect(
      screen.getByRole("heading", { level: 1, name: work.title })
    ).toBeInTheDocument();
  });

  it("renders the en title for a known slug", () => {
    const work = sortedWorks[0];
    render(<WorkDetailClient slug={work.slug} locale="en" />);

    expect(
      screen.getByRole("heading", { level: 1, name: work.titleEn })
    ).toBeInTheDocument();
  });

  it("shows a not-found message for an unknown slug", () => {
    render(<WorkDetailClient slug="does-not-exist" locale="ja" />);

    expect(screen.getByText("実績が見つかりませんでした")).toBeInTheDocument();
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import WorkDetailClient from "@/app/illust/[slug]/WorkDetailClient";
import { sortedIllusts } from "@/data/illusts";

describe("WorkDetailClient (illust)", () => {
  it("renders the work's title and description for a known slug", () => {
    const work = sortedIllusts[0];
    render(<WorkDetailClient slug={work.slug} locale="ja" />);

    expect(
      screen.getByRole("heading", { level: 1, name: work.title })
    ).toBeInTheDocument();
  });

  it("switches the main image when a preview thumbnail is clicked", () => {
    const work = sortedIllusts.find((w) => w.images && w.images.length > 0);
    if (!work) throw new Error("no illust with preview images");
    render(<WorkDetailClient slug={work.slug} locale="ja" />);

    const second = screen.getByRole("button", { name: "2枚目の画像を表示" });
    fireEvent.click(second);

    expect(second).toHaveAttribute("aria-current", "true");
    expect(screen.getByAltText(`${work.title} 2`)).toBeInTheDocument();
  });

  it("shows a not-found message for an unknown slug", () => {
    render(<WorkDetailClient slug="does-not-exist" locale="ja" />);

    expect(screen.getByText("作品が見つかりませんでした")).toBeInTheDocument();
  });

  it("shows a not-found message for an unknown slug (en)", () => {
    render(<WorkDetailClient slug="does-not-exist" locale="en" />);

    expect(screen.getByText("Work not found")).toBeInTheDocument();
  });
});

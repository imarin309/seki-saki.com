import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import WorkDetailClient from "@/app/illust/[slug]/WorkDetailClient";
import { getIllustLabel, sortedIllusts } from "@/data/illusts";

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
    expect(
      screen.getByAltText(`${getIllustLabel(work, "ja")} 2`)
    ).toBeInTheDocument();
  });

  it("plays a video when its preview thumbnail is clicked", () => {
    const work = sortedIllusts.find((w) =>
      w.images?.some((page) => typeof page !== "string")
    );
    if (!work?.images) throw new Error("no illust with a preview video");
    const n = work.images.findIndex((page) => typeof page !== "string") + 2;
    render(<WorkDetailClient slug={work.slug} locale="ja" />);

    fireEvent.click(
      screen.getByRole("button", { name: `${n}番目の動画を再生` })
    );

    const video = screen.getByLabelText(`${getIllustLabel(work, "ja")} ${n}`);
    expect(video).toBeInstanceOf(HTMLVideoElement);
    // iOS は muted でないと自動再生しない。React は muted を属性ではなくプロパティで設定する
    expect((video as HTMLVideoElement).muted).toBe(true);
  });

  it("keeps a visually hidden heading for an untitled work", () => {
    const work = sortedIllusts.find((w) => w.title === "");
    if (!work) throw new Error("no untitled illust");
    render(<WorkDetailClient slug={work.slug} locale="ja" />);

    const heading = screen.getByRole("heading", {
      level: 1,
      name: getIllustLabel(work, "ja"),
    });
    expect(heading).toHaveClass("sr-only");
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

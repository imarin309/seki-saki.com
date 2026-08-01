import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { describe, expect, it, vi } from "vitest";
import { Header } from "@/app/components/Header";

describe("Header", () => {
  it("renders ja nav links on a ja path", () => {
    vi.mocked(usePathname).mockReturnValue("/about");
    render(<Header />);

    expect(screen.getAllByRole("link", { name: "About" })[0]).toHaveAttribute(
      "href",
      "/about"
    );
    expect(screen.getAllByRole("link", { name: "Illust" })[0]).toHaveAttribute(
      "href",
      "/illust"
    );
  });

  it("renders en nav links with /en-prefixed paths on an en path", () => {
    vi.mocked(usePathname).mockReturnValue("/en/about");
    render(<Header />);

    expect(screen.getAllByRole("link", { name: "About" })[0]).toHaveAttribute(
      "href",
      "/en/about"
    );
    expect(screen.getAllByRole("link", { name: "Illust" })[0]).toHaveAttribute(
      "href",
      "/en/illust"
    );
  });
});

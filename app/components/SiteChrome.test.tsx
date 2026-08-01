import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { describe, expect, it, vi } from "vitest";
import { SiteChrome } from "@/app/components/SiteChrome";

describe("SiteChrome", () => {
  it("renders Header/Footer around children on normal pages", () => {
    vi.mocked(usePathname).mockReturnValue("/about");
    render(
      <SiteChrome>
        <div>page content</div>
      </SiteChrome>
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByText("page content")).toBeInTheDocument();
  });

  it("renders only children on standalone /exhibition pages", () => {
    vi.mocked(usePathname).mockReturnValue("/exhibition/still_here");
    render(
      <SiteChrome>
        <div>exhibition content</div>
      </SiteChrome>
    );

    expect(screen.queryByRole("banner")).not.toBeInTheDocument();
    expect(screen.queryByRole("contentinfo")).not.toBeInTheDocument();
    expect(screen.getByText("exhibition content")).toBeInTheDocument();
  });
});

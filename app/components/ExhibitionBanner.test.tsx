import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ExhibitionBanner from "@/app/components/ExhibitionBanner";
import { currentExhibition } from "@/data/exhibition-banner";

describe("ExhibitionBanner", () => {
  it("renders a link to the exhibition when enabled and locale is ja", () => {
    render(<ExhibitionBanner locale="ja" />);

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      currentExhibition.href
    );
  });

  it("renders nothing when locale is en", () => {
    const { container } = render(<ExhibitionBanner locale="en" />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing when disabled", () => {
    const originalEnabled = currentExhibition.enabled;
    currentExhibition.enabled = false;

    const { container } = render(<ExhibitionBanner locale="ja" />);

    expect(container).toBeEmptyDOMElement();
    currentExhibition.enabled = originalEnabled;
  });
});

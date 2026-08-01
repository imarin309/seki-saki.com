import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomeContent from "@/app/components/pages/HomeContent";

describe("HomeContent", () => {
  it("renders the ja hero and featured section without crashing", () => {
    render(<HomeContent locale="ja" />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Designer & Illustrator" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Featured Illusts" })
    ).toBeInTheDocument();
  });

  it("renders the en hero without crashing", () => {
    render(<HomeContent locale="en" />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Designer & Illustrator" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Get in Touch" })
    ).toBeInTheDocument();
  });
});

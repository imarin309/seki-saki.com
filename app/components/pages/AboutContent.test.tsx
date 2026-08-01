import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutContent from "@/app/components/pages/AboutContent";

describe("AboutContent", () => {
  it("renders the ja bio paragraphs", () => {
    render(<AboutContent locale="ja" />);

    expect(
      screen.getByRole("heading", { level: 1, name: "About Me" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("はじめまして。世木口と申します。")
    ).toBeInTheDocument();
  });

  it("renders the en bio paragraphs", () => {
    render(<AboutContent locale="en" />);

    expect(screen.getByText("Hello, I'm Sekiguchi.")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ContactContent from "@/app/components/pages/ContactContent";

describe("ContactContent", () => {
  it("renders the ja contact form fields", () => {
    render(<ContactContent locale="ja" />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Contact" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/メールアドレス/)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "送信する" })
    ).toBeInTheDocument();
  });

  it("renders the en contact form fields", () => {
    render(<ContactContent locale="en" />);

    expect(screen.getByLabelText(/Email address/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
  });
});

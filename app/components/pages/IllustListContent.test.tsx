import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import IllustListContent from "@/app/components/pages/IllustListContent";
import { ILLUST_CATEGORIES } from "@/app/config";
import { illusts } from "@/data/illusts";

describe("IllustListContent", () => {
  it("renders the first category's illusts by default", () => {
    render(<IllustListContent locale="ja" />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Illust" })
    ).toBeInTheDocument();

    const firstCategoryCount = illusts.filter(
      (illust) => illust.category === ILLUST_CATEGORIES[0]
    ).length;
    expect(screen.getAllByRole("link").length).toBeGreaterThanOrEqual(
      firstCategoryCount
    );
  });

  it("switches illusts when a different category filter is clicked", async () => {
    const user = userEvent.setup();
    render(<IllustListContent locale="ja" />);

    const secondCategory = ILLUST_CATEGORIES[1];
    await user.click(screen.getByRole("button", { name: secondCategory }));

    const secondCategoryTitles = illusts
      .filter((illust) => illust.category === secondCategory)
      .map((illust) => illust.title);

    for (const title of secondCategoryTitles) {
      expect(screen.getByText(title)).toBeInTheDocument();
    }
  });
});

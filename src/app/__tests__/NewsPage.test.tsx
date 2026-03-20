import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import NewsPage from "@/app/news/page";

describe("NewsPage", () => {
  it("renders the page heading", () => {
    render(<NewsPage />);
    expect(screen.getByRole("heading", { name: /Latest/i })).toBeInTheDocument();
  });

  it("renders category filter buttons", () => {
    render(<NewsPage />);
    // Filter buttons are the first set of buttons before the post cards
    expect(screen.getByText("All")).toBeInTheDocument();
    // Category names exist in filter buttons
    const allButtons = screen.getAllByRole("button");
    const filterLabels = ["All", "Policy Update", "Invitation Round", "State Nomination", "Visa Processing"];
    filterLabels.forEach((label) => {
      const matching = allButtons.filter((btn) => btn.textContent === label);
      expect(matching.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("renders all blog post cards", () => {
    render(<NewsPage />);
    expect(screen.getByText(/SkillSelect Invitation Round Results/)).toBeInTheDocument();
    expect(screen.getByText(/NSW Updates Its Skilled Occupation/)).toBeInTheDocument();
    expect(screen.getByText(/Visa Processing Times Update/)).toBeInTheDocument();
    expect(screen.getByText(/Regional Migration Incentives/)).toBeInTheDocument();
  });

  it("shows read time on cards", () => {
    render(<NewsPage />);
    const readTimes = screen.getAllByText(/min read/);
    expect(readTimes.length).toBeGreaterThan(0);
  });

  it("shows Read more links", () => {
    render(<NewsPage />);
    const readMoreLinks = screen.getAllByText("Read more");
    expect(readMoreLinks.length).toBeGreaterThan(0);
  });

  it("filters posts by category", async () => {
    const user = userEvent.setup();
    render(<NewsPage />);

    // Click the "Visa Processing" filter button (unique category with only 1 post)
    const buttons = screen.getAllByRole("button");
    const vpButton = buttons.find((btn) => btn.textContent === "Visa Processing");
    expect(vpButton).toBeTruthy();
    await user.click(vpButton!);

    // Should show visa processing post
    expect(screen.getByText(/Visa Processing Times Update/)).toBeInTheDocument();

    // Should NOT show invitation round post
    expect(screen.queryByText(/SkillSelect Invitation Round Results/)).not.toBeInTheDocument();
  });

  it("shows all posts when 'All' filter is clicked", async () => {
    const user = userEvent.setup();
    render(<NewsPage />);

    // First filter
    const vpButton = screen.getAllByRole("button").find((btn) => btn.textContent === "Visa Processing");
    await user.click(vpButton!);
    expect(screen.queryByText(/SkillSelect Invitation Round Results/)).not.toBeInTheDocument();

    // Re-query buttons after state change, then click All
    const allButton = screen.getAllByRole("button").find((btn) => btn.textContent === "All");
    await user.click(allButton!);
    expect(screen.getByText(/SkillSelect Invitation Round Results/)).toBeInTheDocument();
  });

  it("renders post cards as links to detail pages", () => {
    render(<NewsPage />);
    const links = screen.getAllByRole("link");
    const newsLinks = links.filter((l) =>
      l.getAttribute("href")?.startsWith("/news/")
    );
    expect(newsLinks.length).toBeGreaterThan(0);
  });
});

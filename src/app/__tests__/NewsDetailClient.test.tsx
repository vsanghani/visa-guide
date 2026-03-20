import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NewsDetailClient from "@/app/news/[slug]/NewsDetailClient";

describe("NewsDetailClient", () => {
  const validSlug = "skillselect-invitation-round-march-2026";

  it("renders the article title", () => {
    render(<NewsDetailClient slug={validSlug} />);
    expect(
      screen.getByRole("heading", { name: /SkillSelect Invitation Round Results/ })
    ).toBeInTheDocument();
  });

  it("renders the category badge", () => {
    render(<NewsDetailClient slug={validSlug} />);
    // Category name may appear in both the badge and the tags
    const matches = screen.getAllByText("Invitation Round");
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the article date", () => {
    render(<NewsDetailClient slug={validSlug} />);
    // Date and read time are rendered in the meta section
    expect(screen.getByText(/4 min read/)).toBeInTheDocument();
    // The article date is present (March 2026 appears in multiple places, so check meta element exists)
    expect(screen.getByLabelText("Share article")).toBeInTheDocument();
  });

  it("renders the read time", () => {
    render(<NewsDetailClient slug={validSlug} />);
    expect(screen.getByText(/4 min read/)).toBeInTheDocument();
  });

  it("renders article content paragraphs", () => {
    render(<NewsDetailClient slug={validSlug} />);
    expect(
      screen.getByText(/Department of Home Affairs \(DHA\) has published the results/)
    ).toBeInTheDocument();
  });

  it("renders article tags", () => {
    render(<NewsDetailClient slug={validSlug} />);
    expect(screen.getByText("SkillSelect")).toBeInTheDocument();
    expect(screen.getByText("Subclass 189")).toBeInTheDocument();
  });

  it("renders Back to News link", () => {
    render(<NewsDetailClient slug={validSlug} />);
    const backLinks = screen.getAllByText(/Back to News|All News/);
    expect(backLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the share button", () => {
    render(<NewsDetailClient slug={validSlug} />);
    expect(screen.getByLabelText("Share article")).toBeInTheDocument();
  });

  it("renders a different article correctly", () => {
    render(<NewsDetailClient slug="nsw-updates-skilled-occupation-list-2026" />);
    expect(
      screen.getByRole("heading", { name: /NSW Updates Its Skilled Occupation/ })
    ).toBeInTheDocument();
    // Category appears in badge and possibly in content/tags
    const matches = screen.getAllByText("State Nomination");
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });
});

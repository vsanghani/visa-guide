import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders the hero headline", () => {
    render(<HomePage />);
    expect(screen.getByText(/Your Path to/)).toBeInTheDocument();
    expect(screen.getByText(/Australian PR/)).toBeInTheDocument();
    expect(screen.getByText(/Starts Here/)).toBeInTheDocument();
  });

  it("renders the migration program badge", () => {
    render(<HomePage />);
    expect(
      screen.getByText("Updated for 2025-2026 Migration Program")
    ).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    render(<HomePage />);
    expect(screen.getByText("Calculate Your Points")).toBeInTheDocument();
    const exploreLinks = screen.getAllByText("Explore Visa Options");
    expect(exploreLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("renders visa category cards", () => {
    render(<HomePage />);
    expect(screen.getByText("Skilled Migration")).toBeInTheDocument();
    expect(screen.getByText("Employer Sponsored")).toBeInTheDocument();
    expect(screen.getByText("Temp to Permanent")).toBeInTheDocument();
  });

  it("renders how it works section", () => {
    render(<HomePage />);
    expect(screen.getByText("How It Works")).toBeInTheDocument();
    expect(screen.getByText("Check Eligibility")).toBeInTheDocument();
    expect(screen.getByText("Understand Pathways")).toBeInTheDocument();
    expect(screen.getByText("Plan Your Migration")).toBeInTheDocument();
  });

  it("renders the features section", () => {
    render(<HomePage />);
    expect(screen.getByText("Why Use AusVisa Guide?")).toBeInTheDocument();
    expect(screen.getByText("Accurate Points Calculator")).toBeInTheDocument();
    expect(screen.getByText("State Sponsorship Matrix")).toBeInTheDocument();
  });

  it("renders the bottom CTA section", () => {
    render(<HomePage />);
    expect(
      screen.getByText("Ready to Check Your Eligibility?")
    ).toBeInTheDocument();
    expect(screen.getByText("Start Points Calculator")).toBeInTheDocument();
  });

  it("has correct link hrefs for CTAs", () => {
    render(<HomePage />);
    const calcLink = screen.getByText("Calculate Your Points").closest("a");
    expect(calcLink).toHaveAttribute("href", "/points-calculator");

    const visasLink = screen
      .getAllByText("Explore Visa Options")[0]
      .closest("a");
    expect(visasLink).toHaveAttribute("href", "/visas");
  });
});

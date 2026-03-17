import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import VisasPage from "@/app/visas/page";

describe("VisasPage", () => {
  it("renders the page heading", () => {
    render(<VisasPage />);
    expect(screen.getByText(/Australian Visa/)).toBeInTheDocument();
    expect(screen.getByText("Subclasses")).toBeInTheDocument();
  });

  it("renders all five visa cards", () => {
    render(<VisasPage />);
    expect(screen.getByText("Skilled Independent Visa")).toBeInTheDocument();
    expect(screen.getByText("Skilled Nominated Visa")).toBeInTheDocument();
    expect(
      screen.getByText("Skilled Work Regional Visa")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Temporary Skill Shortage Visa")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Employer Nomination Scheme Visa")
    ).toBeInTheDocument();
  });

  it("renders subclass numbers", () => {
    render(<VisasPage />);
    expect(screen.getByText("Subclass 189")).toBeInTheDocument();
    expect(screen.getByText("Subclass 190")).toBeInTheDocument();
    expect(screen.getByText("Subclass 491")).toBeInTheDocument();
    expect(screen.getByText("Subclass 482")).toBeInTheDocument();
    expect(screen.getByText("Subclass 186")).toBeInTheDocument();
  });

  it("renders Learn More links", () => {
    render(<VisasPage />);
    const learnMoreLinks = screen.getAllByText("Learn More");
    expect(learnMoreLinks).toHaveLength(5);
  });

  it("renders correct categories", () => {
    render(<VisasPage />);
    const skilledBadges = screen.getAllByText("Skilled Migration");
    expect(skilledBadges.length).toBe(3);

    const employerBadges = screen.getAllByText("Employer Sponsored");
    expect(employerBadges.length).toBe(2);
  });
});

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PathwaysPage from "@/app/pathways/page";

describe("PathwaysPage", () => {
  it("renders the page heading", () => {
    render(<PathwaysPage />);
    expect(screen.getByText("Migration")).toBeInTheDocument();
    expect(screen.getByText("Pathways")).toBeInTheDocument();
  });

  it("renders all four pathways", () => {
    render(<PathwaysPage />);
    expect(
      screen.getByText("482 → 186 (Employer Sponsored)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("491 → 191 (Regional Pathway)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Student → 189/190 (Study Pathway)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("WHM → 482 → 186 (Working Holiday)")
    ).toBeInTheDocument();
  });

  it("renders pathway durations", () => {
    render(<PathwaysPage />);
    expect(
      screen.getByText("2-3 years on 482, then apply for 186 TRT")
    ).toBeInTheDocument();
    expect(
      screen.getByText("3 years on 491, then apply for 191")
    ).toBeInTheDocument();
  });

  it("renders related visa links", () => {
    render(<PathwaysPage />);
    const links482 = screen.getAllByText("482 TSS");
    expect(links482.length).toBeGreaterThanOrEqual(1);
    const link = links482[0].closest("a");
    expect(link).toHaveAttribute("href", "/visas/visa-482");
  });

  it("renders step-by-step process for each pathway", () => {
    render(<PathwaysPage />);
    const stepHeadings = screen.getAllByText("Step-by-Step Process");
    expect(stepHeadings.length).toBe(4);
  });

  it("renders key tips for pathways", () => {
    render(<PathwaysPage />);
    const tipHeadings = screen.getAllByText("💡 Key Tips");
    expect(tipHeadings.length).toBe(4);
  });
});

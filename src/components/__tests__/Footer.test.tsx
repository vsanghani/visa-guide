import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "@/components/Footer";

describe("Footer", () => {
  it("renders the brand name", () => {
    render(<Footer />);
    expect(screen.getByText("Aus")).toBeInTheDocument();
  });

  it("renders visa type links", () => {
    render(<Footer />);
    expect(screen.getByText("Subclass 189")).toBeInTheDocument();
    expect(screen.getByText("Subclass 190")).toBeInTheDocument();
    expect(screen.getByText("Subclass 491")).toBeInTheDocument();
    expect(screen.getByText("Subclass 482")).toBeInTheDocument();
    expect(screen.getByText("Subclass 186")).toBeInTheDocument();
  });

  it("renders tool links", () => {
    render(<Footer />);
    expect(screen.getByText("Points Calculator")).toBeInTheDocument();
    expect(screen.getByText("Migration Pathways")).toBeInTheDocument();
    expect(screen.getByText("FAQ")).toBeInTheDocument();
  });

  it("renders external resource links", () => {
    render(<Footer />);
    expect(screen.getByText("Department of Home Affairs")).toBeInTheDocument();
    expect(screen.getByText("SkillSelect")).toBeInTheDocument();
  });

  it("renders external links with target _blank", () => {
    render(<Footer />);
    const dhaLink = screen.getByText("Department of Home Affairs").closest("a");
    expect(dhaLink).toHaveAttribute("target", "_blank");
    expect(dhaLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the disclaimer", () => {
    render(<Footer />);
    expect(screen.getByText(/Disclaimer/)).toBeInTheDocument();
  });

  it("renders the copyright notice", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(
      screen.getByText(`© ${year} AusVisa Guide. All rights reserved.`)
    ).toBeInTheDocument();
  });

  it("renders correct internal link hrefs", () => {
    render(<Footer />);
    const link189 = screen.getByText("Subclass 189").closest("a");
    expect(link189).toHaveAttribute("href", "/visas/visa-189");

    const calcLink = screen.getByText("Points Calculator").closest("a");
    expect(calcLink).toHaveAttribute("href", "/points-calculator");
  });
});

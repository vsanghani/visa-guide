import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Navbar from "@/components/Navbar";

describe("Navbar", () => {
  it("renders the brand name", () => {
    render(<Navbar />);
    expect(screen.getByText("Aus")).toBeInTheDocument();
    expect(screen.getByText("Visa")).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    render(<Navbar />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Visas")).toBeInTheDocument();
    expect(screen.getByText("Points Calculator")).toBeInTheDocument();
    expect(screen.getByText("State Sponsorship")).toBeInTheDocument();
    expect(screen.getByText("Regional Postcode")).toBeInTheDocument();
    expect(screen.getByText("Pathways")).toBeInTheDocument();
    expect(screen.getByText("FAQ")).toBeInTheDocument();
  });

  it("renders the CTA button", () => {
    render(<Navbar />);
    expect(screen.getByText("Check Points")).toBeInTheDocument();
  });

  it("renders navigation links with correct href", () => {
    render(<Navbar />);
    const homeLink = screen.getAllByText("Home")[0].closest("a");
    expect(homeLink).toHaveAttribute("href", "/");

    const visasLink = screen.getAllByText("Visas")[0].closest("a");
    expect(visasLink).toHaveAttribute("href", "/visas");
  });

  it("toggles mobile menu", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const toggleButton = screen.getByLabelText("Toggle menu");
    expect(toggleButton).toBeInTheDocument();

    await user.click(toggleButton);
    // After click, mobile menu should show links (including duplicates from mobile)
    const pathwayLinks = screen.getAllByText("Pathways");
    expect(pathwayLinks.length).toBeGreaterThanOrEqual(2);
  });
});

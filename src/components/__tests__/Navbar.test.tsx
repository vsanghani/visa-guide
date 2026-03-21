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

  it("renders primary navigation links", () => {
    render(<Navbar />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Visas")).toBeInTheDocument();
    expect(screen.getByText("Points Calculator")).toBeInTheDocument();
  });

  it("opens More menu and shows secondary links on desktop", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const moreBtn = screen.getByRole("button", { name: /more/i });
    await user.click(moreBtn);

    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /State Sponsorship/i })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /Document Checklist/i })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /Regional Postcode/i })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /^News$/i })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /Pathways/i })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /^FAQ$/i })).toBeInTheDocument();
  });

  it("renders navigation links with correct href", () => {
    render(<Navbar />);
    const homeLink = screen.getAllByText("Home")[0].closest("a");
    expect(homeLink).toHaveAttribute("href", "/");

    const visasLink = screen.getAllByText("Visas")[0].closest("a");
    expect(visasLink).toHaveAttribute("href", "/visas");
  });

  it("toggles mobile menu and shows grouped links", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const toggleButton = screen.getByLabelText("Toggle menu");
    await user.click(toggleButton);

    expect(screen.getByText("Tools & resources")).toBeInTheDocument();
    const pathwayLinks = screen.getAllByText("Pathways");
    expect(pathwayLinks.length).toBeGreaterThanOrEqual(1);
  });
});

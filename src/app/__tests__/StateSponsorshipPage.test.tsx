import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import StateSponsorshipPage from "@/app/state-sponsorship/page";

describe("StateSponsorshipPage", () => {
  it("renders the page header correctly", () => {
    render(<StateSponsorshipPage />);
    expect(screen.getByRole("heading", { name: /State Sponsorship/i })).toBeInTheDocument();
    expect(screen.getByText(/Criteria Matrix/)).toBeInTheDocument();
  });

  it("renders the state selection sidebar", () => {
    render(<StateSponsorshipPage />);
    expect(screen.getByText("NSW")).toBeInTheDocument();
    expect(screen.getAllByText("New South Wales")[0]).toBeInTheDocument();
    expect(screen.getByText("VIC")).toBeInTheDocument();
    expect(screen.getByText("QLD")).toBeInTheDocument();
    expect(screen.getByText("WA")).toBeInTheDocument();
    expect(screen.getByText("SA")).toBeInTheDocument();
  });

  it("displays NSW 190 criteria initially", async () => {
    render(<StateSponsorshipPage />);
    expect(await screen.findByRole("heading", { name: "New South Wales" })).toBeInTheDocument();
    expect(screen.getByText(/Typically 85\+ for IT/i)).toBeInTheDocument();
    expect(screen.getByText("Onshore Applicants")).toBeInTheDocument();
    expect(screen.getByText("Offshore Applicants")).toBeInTheDocument();
  });

  it("switches to 491 criteria when subclass tab is clicked", async () => {
    const user = userEvent.setup();
    render(<StateSponsorshipPage />);
    
    expect(screen.getByText(/Typically 85\+ for IT/i)).toBeInTheDocument(); // 190 content
    
    await user.click(screen.getByText("Subclass 491"));
    
    expect(await screen.findByText("Pathway 1: Direct application to RDA")).toBeInTheDocument();
    expect(screen.getByText(/15 state points/i)).toBeInTheDocument();
  });

  it("switches states when a state button is clicked", async () => {
    const user = userEvent.setup();
    render(<StateSponsorshipPage />);
    
    await user.click(screen.getByText("VIC"));
    
    expect(await screen.findByRole("heading", { name: "Victoria" })).toBeInTheDocument();
    expect(screen.getByText("Onshore - Target Sectors")).toBeInTheDocument();
    expect(screen.getByText("Offshore Applicants")).toBeInTheDocument();
  });

  it("renders official state links", () => {
    render(<StateSponsorshipPage />);
    const link = screen.getByText(/Official Migration Website/i).closest("a");
    expect(link).toHaveAttribute("href", "https://www.nsw.gov.au/visas-and-migration/skilled-visas");
  });
});

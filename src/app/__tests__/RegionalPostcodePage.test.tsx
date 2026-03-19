import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import RegionalPostcodePage from "@/app/regional-postcode/page";

// Helper to set postcode input value reliably in controlled React input
function setPostcode(value: string) {
  const input = screen.getByPlaceholderText("e.g. 3220");
  fireEvent.change(input, { target: { value } });
}

describe("RegionalPostcodePage", () => {
  it("renders the page heading", () => {
    render(<RegionalPostcodePage />);
    expect(screen.getByRole("heading", { name: /Regional Postcode/i })).toBeInTheDocument();
    expect(screen.getByText(/Checker/)).toBeInTheDocument();
  });

  it("renders the search input and button", () => {
    render(<RegionalPostcodePage />);
    expect(screen.getByPlaceholderText("e.g. 3220")).toBeInTheDocument();
    expect(screen.getByTestId("check-btn")).toBeInTheDocument();
  });

  it("renders quick-try example buttons", () => {
    render(<RegionalPostcodePage />);
    expect(screen.getByText("2000 (Sydney CBD)")).toBeInTheDocument();
    expect(screen.getByText("3220 (Geelong)")).toBeInTheDocument();
    expect(screen.getByText("7000 (Hobart)")).toBeInTheDocument();
  });

  it("shows error for invalid postcode format", async () => {
    const user = userEvent.setup();
    render(<RegionalPostcodePage />);
    setPostcode("12");
    await user.click(screen.getByTestId("check-btn"));
    expect(await screen.findByText(/valid 4-digit/)).toBeInTheDocument();
  });

  it("identifies a metro postcode correctly (Sydney 2000)", async () => {
    const user = userEvent.setup();
    render(<RegionalPostcodePage />);
    setPostcode("2000");
    await user.click(screen.getByTestId("check-btn"));

    expect(await screen.findByText(/Metropolitan Area/)).toBeInTheDocument();
    expect(screen.getByText(/Not eligible/)).toBeInTheDocument();
  });

  it("identifies a regional postcode correctly (Geelong 3220)", async () => {
    const user = userEvent.setup();
    render(<RegionalPostcodePage />);
    setPostcode("3220");
    await user.click(screen.getByTestId("check-btn"));

    // Use heading role to avoid matching the page description text
    expect(await screen.findByRole("heading", { name: /Regional Area/ })).toBeInTheDocument();
    expect(screen.getByText(/Subclass 491/)).toBeInTheDocument();
  });

  it("identifies entirely regional states (Adelaide 5000)", async () => {
    const user = userEvent.setup();
    render(<RegionalPostcodePage />);
    setPostcode("5000");
    await user.click(screen.getByTestId("check-btn"));

    expect(await screen.findByRole("heading", { name: /Regional Area/ })).toBeInTheDocument();
    expect(screen.getByText(/South Australia/)).toBeInTheDocument();
  });

  it("fills input when clicking a quick-try button", async () => {
    const user = userEvent.setup();
    render(<RegionalPostcodePage />);

    await user.click(screen.getByText("4870 (Cairns)"));
    const input = screen.getByPlaceholderText("e.g. 3220") as HTMLInputElement;
    expect(input.value).toBe("4870");
  });

  it("searches when clicking Check after filling via quick-try", async () => {
    const user = userEvent.setup();
    render(<RegionalPostcodePage />);

    // Click a quick-try button to fill the input
    await user.click(screen.getByText("7000 (Hobart)"));
    await user.click(screen.getByTestId("check-btn"));

    expect(await screen.findByRole("heading", { name: /Regional Area/ })).toBeInTheDocument();
    expect(screen.getByText(/Tasmania/)).toBeInTheDocument();
  });
});

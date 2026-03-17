import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import FAQPage from "@/app/faq/page";

describe("FAQPage", () => {
  it("renders the page heading", () => {
    render(<FAQPage />);
    expect(screen.getByText(/Frequently Asked/)).toBeInTheDocument();
    expect(screen.getByText("Questions")).toBeInTheDocument();
  });

  it("renders category tabs", () => {
    render(<FAQPage />);
    expect(screen.getByText("General")).toBeInTheDocument();
    expect(screen.getByText("Points Test")).toBeInTheDocument();
    expect(screen.getByText("Employer Sponsored")).toBeInTheDocument();
    expect(screen.getByText("Processing & Costs")).toBeInTheDocument();
  });

  it("renders General FAQs by default", () => {
    render(<FAQPage />);
    expect(
      screen.getByText(
        "What is the difference between a permanent and provisional visa?"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("What is SkillSelect and how does it work?")
    ).toBeInTheDocument();
  });

  it("switches to Points Test category", async () => {
    const user = userEvent.setup();
    render(<FAQPage />);

    await user.click(screen.getByText("Points Test"));
    expect(
      screen.getByText(
        "What is the minimum points score to be eligible?"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("How can I maximise my points score?")
    ).toBeInTheDocument();
  });

  it("switches to Employer Sponsored category", async () => {
    const user = userEvent.setup();
    render(<FAQPage />);

    await user.click(screen.getByText("Employer Sponsored"));
    expect(
      screen.getByText(
        "Can I change employers while on a 482 visa?"
      )
    ).toBeInTheDocument();
  });

  it("expands a FAQ answer", async () => {
    const user = userEvent.setup();
    render(<FAQPage />);

    await user.click(
      screen.getByText("What is SkillSelect and how does it work?")
    );
    expect(
      screen.getByText(/online system managed by the Department/)
    ).toBeInTheDocument();
  });

  it("renders the disclaimer", () => {
    render(<FAQPage />);
    expect(
      screen.getByText(/general guidance only/)
    ).toBeInTheDocument();
  });
});

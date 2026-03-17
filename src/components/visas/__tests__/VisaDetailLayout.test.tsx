import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import VisaDetailLayout from "@/components/visas/VisaDetailLayout";

const mockProps = {
  subclass: "189",
  title: "Skilled Independent Visa",
  category: "Skilled Migration",
  color: "from-navy-400 to-navy-600",
  overview: "This is a test overview for visa 189.",
  eligibility: ["Be under 45 years", "Have a skills assessment"],
  process: ["Get skills assessed", "Submit EOI", "Lodge application"],
  costs: [
    { item: "Primary applicant", amount: "AUD $4,640" },
    { item: "Partner", amount: "AUD $2,320" },
  ],
  processingTime: "6 to 12 months",
  tips: ["Aim for 80+ points", "Consider 190 as alternative"],
};

describe("VisaDetailLayout", () => {
  it("renders the visa title", () => {
    render(<VisaDetailLayout {...mockProps} />);
    expect(screen.getByText("Skilled Independent Visa")).toBeInTheDocument();
  });

  it("renders the subclass badge", () => {
    render(<VisaDetailLayout {...mockProps} />);
    expect(screen.getByText("Subclass 189")).toBeInTheDocument();
  });

  it("renders the category", () => {
    render(<VisaDetailLayout {...mockProps} />);
    expect(screen.getByText("Skilled Migration")).toBeInTheDocument();
  });

  it("renders the overview section", () => {
    render(<VisaDetailLayout {...mockProps} />);
    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test overview for visa 189.")
    ).toBeInTheDocument();
  });

  it("renders eligibility requirements", () => {
    render(<VisaDetailLayout {...mockProps} />);
    expect(screen.getByText("Eligibility Requirements")).toBeInTheDocument();
    expect(screen.getByText("Be under 45 years")).toBeInTheDocument();
    expect(screen.getByText("Have a skills assessment")).toBeInTheDocument();
  });

  it("renders application process steps", () => {
    render(<VisaDetailLayout {...mockProps} />);
    expect(screen.getByText("Application Process")).toBeInTheDocument();
    expect(screen.getByText("Get skills assessed")).toBeInTheDocument();
    expect(screen.getByText("Submit EOI")).toBeInTheDocument();
    expect(screen.getByText("Lodge application")).toBeInTheDocument();
  });

  it("renders processing time", () => {
    render(<VisaDetailLayout {...mockProps} />);
    expect(screen.getByText("Processing Time")).toBeInTheDocument();
    expect(screen.getByText("6 to 12 months")).toBeInTheDocument();
  });

  it("renders costs", () => {
    render(<VisaDetailLayout {...mockProps} />);
    expect(screen.getByText("Application Costs")).toBeInTheDocument();
    expect(screen.getByText("Primary applicant")).toBeInTheDocument();
    expect(screen.getByText("AUD $4,640")).toBeInTheDocument();
  });

  it("renders tips", () => {
    render(<VisaDetailLayout {...mockProps} />);
    expect(screen.getByText("Key Tips")).toBeInTheDocument();
    expect(screen.getByText("Aim for 80+ points")).toBeInTheDocument();
  });

  it("renders the back link", () => {
    render(<VisaDetailLayout {...mockProps} />);
    const backLink = screen.getByText("Back to All Visas").closest("a");
    expect(backLink).toHaveAttribute("href", "/visas");
  });

  it("renders the check points CTA", () => {
    render(<VisaDetailLayout {...mockProps} />);
    const cta = screen.getByText("Check Your Points").closest("a");
    expect(cta).toHaveAttribute("href", "/points-calculator");
  });
});

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import VisaCard from "@/components/visas/VisaCard";
import { Target } from "lucide-react";

const mockVisa = {
  subclass: "189",
  title: "Skilled Independent Visa",
  description: "A permanent visa for skilled workers.",
  icon: Target,
  color: "from-navy-400 to-navy-600",
  href: "/visas/visa-189",
  features: ["No sponsorship required", "Permanent residency", "Points-tested"],
  processingTime: "6-12 months",
  category: "Skilled Migration",
};

describe("VisaCard", () => {
  it("renders the visa title", () => {
    render(<VisaCard {...mockVisa} />);
    expect(screen.getByText("Skilled Independent Visa")).toBeInTheDocument();
  });

  it("renders the subclass number", () => {
    render(<VisaCard {...mockVisa} />);
    expect(screen.getByText("Subclass 189")).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<VisaCard {...mockVisa} />);
    expect(
      screen.getByText("A permanent visa for skilled workers.")
    ).toBeInTheDocument();
  });

  it("renders all features", () => {
    render(<VisaCard {...mockVisa} />);
    expect(screen.getByText("No sponsorship required")).toBeInTheDocument();
    expect(screen.getByText("Permanent residency")).toBeInTheDocument();
    expect(screen.getByText("Points-tested")).toBeInTheDocument();
  });

  it("renders the processing time", () => {
    render(<VisaCard {...mockVisa} />);
    expect(screen.getByText("Processing: 6-12 months")).toBeInTheDocument();
  });

  it("renders the category badge", () => {
    render(<VisaCard {...mockVisa} />);
    expect(screen.getByText("Skilled Migration")).toBeInTheDocument();
  });

  it("renders the Learn More link with correct href", () => {
    render(<VisaCard {...mockVisa} />);
    const link = screen.getByText("Learn More").closest("a");
    expect(link).toHaveAttribute("href", "/visas/visa-189");
  });
});

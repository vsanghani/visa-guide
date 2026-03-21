import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StepIndicator from "@/components/ui/StepIndicator";

const steps = ["Age", "English", "Work", "Education"];

describe("StepIndicator", () => {
  it("renders all step labels", () => {
    render(<StepIndicator steps={steps} currentStep={0} />);
    steps.forEach((step) => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });
  });

  it("renders step numbers", () => {
    render(<StepIndicator steps={steps} currentStep={1} />);
    // Steps before current should show check icon, current shows number
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("highlights the current step", () => {
    render(<StepIndicator steps={steps} currentStep={2} />);
    const currentLabel = screen.getByText("Work");
    expect(currentLabel).toHaveClass("text-secondary");
  });

  it("dims future steps", () => {
    render(<StepIndicator steps={steps} currentStep={0} />);
    const futureLabel = screen.getByText("Education");
    expect(futureLabel).toHaveClass("text-primary/40");
  });
});

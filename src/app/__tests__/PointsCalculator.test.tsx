import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import PointsCalculatorPage from "@/app/points-calculator/page";

describe("PointsCalculatorPage", () => {
  it("renders the page heading", () => {
    render(<PointsCalculatorPage />);
    expect(screen.getByText("Points")).toBeInTheDocument();
    expect(screen.getByText("Calculator")).toBeInTheDocument();
  });

  it("renders the step indicator", () => {
    render(<PointsCalculatorPage />);
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("Work Exp")).toBeInTheDocument();
  });

  it("shows the initial score as 0", () => {
    render(<PointsCalculatorPage />);
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("/ 65 min")).toBeInTheDocument();
  });

  it("starts on the Age step", () => {
    render(<PointsCalculatorPage />);
    expect(screen.getByText("What is your age?")).toBeInTheDocument();
    expect(screen.getByText("18-24 years")).toBeInTheDocument();
    expect(screen.getByText("25-32 years")).toBeInTheDocument();
    expect(screen.getByText("45+ years")).toBeInTheDocument();
  });

  it("selects an age option and updates points", async () => {
    const user = userEvent.setup();
    render(<PointsCalculatorPage />);

    await user.click(screen.getByText("25-32 years"));
    // 30 points for age 25-32
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  it("navigates to the next step", async () => {
    const user = userEvent.setup();
    render(<PointsCalculatorPage />);

    await user.click(screen.getByText("Next"));
    expect(
      screen.getByText("English Language Ability")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Superior English (IELTS 8)")
    ).toBeInTheDocument();
  });

  it("navigates back to previous step", async () => {
    const user = userEvent.setup();
    render(<PointsCalculatorPage />);

    await user.click(screen.getByText("Next"));
    expect(screen.getByText("English Language Ability")).toBeInTheDocument();

    await user.click(screen.getByText("Back"));
    expect(screen.getByText("What is your age?")).toBeInTheDocument();
  });

  it("disables Back button on first step", () => {
    render(<PointsCalculatorPage />);
    const backButton = screen.getByText("Back").closest("button");
    expect(backButton).toHaveClass("cursor-not-allowed");
  });

  it("shows work experience step with two option groups", async () => {
    const user = userEvent.setup();
    render(<PointsCalculatorPage />);

    // Go to step 3 (Work Experience)
    await user.click(screen.getByText("Next")); // → English
    await user.click(screen.getByText("Next")); // → Work Exp

    expect(screen.getByText("Work Experience")).toBeInTheDocument();
    expect(
      screen.getByText("Overseas skilled employment")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Australian skilled employment")
    ).toBeInTheDocument();
  });

  it("shows extras step with multiple option groups", async () => {
    const user = userEvent.setup();
    render(<PointsCalculatorPage />);

    // Go to step 5 (Extras)
    await user.click(screen.getByText("Next")); // → English
    await user.click(screen.getByText("Next")); // → Work Exp
    await user.click(screen.getByText("Next")); // → Education
    await user.click(screen.getByText("Next")); // → Extras

    expect(screen.getByText("Additional Points")).toBeInTheDocument();
    expect(
      screen.getByText("Specialist education qualification")
    ).toBeInTheDocument();
    expect(screen.getByText("Partner skills")).toBeInTheDocument();
    expect(
      screen.getByText("Community language (NAATI)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Professional Year in Australia")
    ).toBeInTheDocument();
  });

  it("shows nomination step with 190 and 491 options", async () => {
    const user = userEvent.setup();
    render(<PointsCalculatorPage />);

    // Go to step 6 (Nomination)
    for (let i = 0; i < 5; i++) {
      await user.click(screen.getByText("Next"));
    }

    expect(screen.getByText("State/Territory Nomination")).toBeInTheDocument();
    expect(
      screen.getByText("State/territory nomination (Subclass 190)")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "State/territory regional nomination (Subclass 491)"
      )
    ).toBeInTheDocument();
  });

  it("shows See Results button on last step", async () => {
    const user = userEvent.setup();
    render(<PointsCalculatorPage />);

    // Navigate to the last step
    for (let i = 0; i < 5; i++) {
      await user.click(screen.getByText("Next"));
    }

    expect(screen.getByText("See Results")).toBeInTheDocument();
  });

  it("calculates and shows results correctly", async () => {
    const user = userEvent.setup();
    render(<PointsCalculatorPage />);

    // Step 1: Age — select 25-32 (30 pts)
    await user.click(screen.getByText("25-32 years"));
    await user.click(screen.getByText("Next"));

    // Step 2: English — select Superior (20 pts)
    await user.click(screen.getByText("Superior English (IELTS 8)"));
    await user.click(screen.getByText("Next"));

    // Step 3: Work — select 3-4 overseas (5 pts) — use getAllByText since both groups have "3-4 years"
    const threeFourOptions = screen.getAllByText("3-4 years");
    await user.click(threeFourOptions[0]); // First one is overseas
    await user.click(screen.getByText("Next"));

    // Step 4: Education — select Bachelor/Masters (15 pts)
    await user.click(screen.getByText("Bachelor/Masters degree"));
    await user.click(screen.getByText("Next"));

    // Step 5: Extras — skip
    await user.click(screen.getByText("Next"));

    // Step 6: Nomination — skip
    await user.click(screen.getByText("See Results"));

    // Total should be 30 + 20 + 5 + 15 = 70
    expect(screen.getByText("70")).toBeInTheDocument();
    expect(screen.getByText("points")).toBeInTheDocument();
    expect(screen.getByText("Points Breakdown")).toBeInTheDocument();
    expect(
      screen.getByText(/You meet the pass mark of 65 points/)
    ).toBeInTheDocument();
  });

  it("shows failing result when below 65 points", async () => {
    const user = userEvent.setup();
    render(<PointsCalculatorPage />);

    // Step 1: Age — select 40-44 (15 pts)
    await user.click(screen.getByText("40-44 years"));
    await user.click(screen.getByText("Next"));

    // Step 2: English — select Competent (0 pts)
    await user.click(screen.getByText("Competent English (IELTS 6)"));
    await user.click(screen.getByText("Next"));

    // Steps 3-6: skip all
    await user.click(screen.getByText("Next")); // Work
    await user.click(screen.getByText("Next")); // Education
    await user.click(screen.getByText("Next")); // Extras
    await user.click(screen.getByText("See Results")); // Nomination → Results

    // Total: 15 + 0 = 15
    expect(screen.getByText("15")).toBeInTheDocument();
    expect(
      screen.getByText(/You need .+ more points to meet the pass mark/)
    ).toBeInTheDocument();
  });

  it("allows starting over from results", async () => {
    const user = userEvent.setup();
    render(<PointsCalculatorPage />);

    // Navigate through all steps
    for (let i = 0; i < 5; i++) {
      await user.click(screen.getByText("Next"));
    }
    await user.click(screen.getByText("See Results"));

    // Click Start Over
    await user.click(screen.getByText("Start Over"));
    expect(screen.getByText("What is your age?")).toBeInTheDocument();
  });

  it("shows per-visa eligibility in results", async () => {
    const user = userEvent.setup();
    render(<PointsCalculatorPage />);

    // Quick path through with 25-32 age only
    await user.click(screen.getByText("25-32 years"));
    for (let i = 0; i < 5; i++) {
      await user.click(screen.getByText("Next"));
    }
    await user.click(screen.getByText("See Results"));

    expect(screen.getByText("Subclass 189")).toBeInTheDocument();
    expect(screen.getByText("Subclass 190")).toBeInTheDocument();
    expect(screen.getByText("Subclass 491")).toBeInTheDocument();
  });
});

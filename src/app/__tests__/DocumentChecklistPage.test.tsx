import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import DocumentChecklistPage from "@/app/document-checklist/page";

describe("DocumentChecklistPage", () => {
  it("renders the initial step correctly", () => {
    render(<DocumentChecklistPage />);
    expect(screen.getByRole("heading", { name: /Document Checklist/i })).toBeInTheDocument();
    expect(screen.getByText("Which visa are you applying for?")).toBeInTheDocument();
    expect(screen.getByText("Subclass 189 (Skilled Independent)")).toBeInTheDocument();
  });

  it("disables 'Next' button if no visa is selected", () => {
    render(<DocumentChecklistPage />);
    const nextButton = screen.getByText("Next").closest("button");
    expect(nextButton).toBeDisabled();
  });

  it("enables 'Next' button after visa selection and navigates to step 2", async () => {
    const user = userEvent.setup();
    render(<DocumentChecklistPage />);
    
    await user.click(screen.getByText("Subclass 189 (Skilled Independent)"));
    const nextButton = screen.getByText("Next").closest("button");
    expect(nextButton).not.toBeDisabled();

    await user.click(nextButton!);
    expect(screen.getByText("Personal Circumstances")).toBeInTheDocument();
    expect(screen.getByText("Are you currently inside Australia?")).toBeInTheDocument();
  });

  it("validates step 2 requirements before allowing next", async () => {
    const user = userEvent.setup();
    render(<DocumentChecklistPage />);
    
    // Step 1
    await user.click(screen.getByText("Subclass 190 (Skilled Nominated)"));
    await user.click(screen.getByText("Next"));

    // Step 2
    expect(screen.getByText("Personal Circumstances")).toBeInTheDocument();
    const nextButton = screen.getByText("Next").closest("button");
    expect(nextButton).toBeDisabled();

    // Select options
    const yesButtons = screen.getAllByText("Yes");
    await user.click(yesButtons[0]); // Onshore: Yes
    await user.click(screen.getByText("Married"));

    // Still disabled because we need to answer partner points question
    expect(nextButton).toBeDisabled();
    
    // Answer partner points (Yes)
    // The previous click on "Yes" might have hit the first Yes on screen.
    // The safest way is to click the 'Yes' option in the new group that appeared.
    const newYesButtons = screen.getAllByText("Yes");
    await user.click(newYesButtons[1]); 

    expect(nextButton).not.toBeDisabled();
    await user.click(nextButton!);

    // Step 3
    expect(screen.getByText("Work & Study History")).toBeInTheDocument();
  });

  it("generates checklist with correct sections based on selections", async () => {
    const user = userEvent.setup();
    // Prevent actual print dialog during test
    window.print = vi.fn();
    
    render(<DocumentChecklistPage />);
    
    // Step 1: 189 Visa
    await user.click(screen.getByText("Subclass 189 (Skilled Independent)"));
    await user.click(screen.getByText("Next"));

    // Step 2: Onshore Single
    expect(await screen.findByText("Personal Circumstances")).toBeInTheDocument();
    await user.click(screen.getByTestId("onshore-yes"));
    await user.click(screen.getByTestId("maritalStatus-single"));
    await user.click(screen.getByText("Next"));

    // Step 3: Work exp Yes, Aus study No
    expect(await screen.findByText("Work & Study History")).toBeInTheDocument();
    await user.click(screen.getByTestId("claimingWorkExp-yes"));
    await user.click(screen.getByTestId("australianStudy-no"));
    
    const generateBtn = await screen.findByRole("button", { name: "Generate Checklist" });
    await waitFor(() => {
      expect(generateBtn).not.toBeDisabled();
    });
    await user.click(generateBtn);

    // Results
    expect(await screen.findByText("Your Custom Document Checklist")).toBeInTheDocument();
    expect(screen.getByText("Identity & Character")).toBeInTheDocument();
    expect(screen.getByText("Skills & English Ability")).toBeInTheDocument();
    expect(screen.getByText("Employment Evidence")).toBeInTheDocument();
    
    // Work items should exist
    expect(screen.getByText("Employment Reference Letters")).toBeInTheDocument();
    expect(screen.getByText("Payslips")).toBeInTheDocument();

    // Should NOT have partner sections
    expect(screen.queryByText("Partner Documents")).not.toBeInTheDocument();
  });

  it("generates partner and state docs for 190 visa", async () => {
    const user = userEvent.setup();
    render(<DocumentChecklistPage />);
    
    // Step 1: 190
    await user.click(screen.getByText("Subclass 190 (Skilled Nominated)"));
    await user.click(screen.getByText("Next"));

    // Step 2: Offshore Married, claiming partner points
    expect(await screen.findByText("Personal Circumstances")).toBeInTheDocument();
    await user.click(screen.getByTestId("onshore-no"));
    await user.click(screen.getByTestId("maritalStatus-married"));
    await user.click(screen.getByTestId("claimingPartnerPoints-yes"));
    await user.click(screen.getByText("Next"));

    // Step 3: Work No, Aus Study No
    expect(await screen.findByText("Work & Study History")).toBeInTheDocument();
    await user.click(screen.getByTestId("claimingWorkExp-no"));
    await user.click(screen.getByTestId("australianStudy-no"));
    
    const generateBtn = await screen.findByRole("button", { name: "Generate Checklist" });
    await waitFor(() => {
      expect(generateBtn).not.toBeDisabled();
    });
    await user.click(generateBtn);

    // Check specific partner/nomination items
    expect(await screen.findByText("Partner Documents")).toBeInTheDocument();
    expect(screen.getByText("Marriage Certificate")).toBeInTheDocument();
    expect(screen.getByText("Partner's Positive Skills Assessment")).toBeInTheDocument();
    
    expect(screen.getByText("State/Territory Nomination")).toBeInTheDocument();
    expect(screen.getByText("State Nomination Approval Email/Letter")).toBeInTheDocument();
  });

  it("can print and start over", async () => {
    const user = userEvent.setup();
    window.print = vi.fn();
    
    render(<DocumentChecklistPage />);
    
    // Quick path
    await user.click(screen.getByText("Subclass 189 (Skilled Independent)"));
    await user.click(screen.getByText("Next"));
    
    expect(await screen.findByText("Personal Circumstances")).toBeInTheDocument();
    await user.click(screen.getByTestId("onshore-yes"));
    await user.click(screen.getByTestId("maritalStatus-single"));
    await user.click(screen.getByText("Next"));
    
    expect(await screen.findByText("Work & Study History")).toBeInTheDocument();
    await user.click(screen.getByTestId("claimingWorkExp-yes"));
    await user.click(screen.getByTestId("australianStudy-yes"));
    
    const generateBtn = await screen.findByRole("button", { name: "Generate Checklist" });
    await waitFor(() => {
      expect(generateBtn).not.toBeDisabled();
    });
    await user.click(generateBtn);

    // Print button
    const printButton = await screen.findByText("Print / PDF");
    await user.click(printButton);
    expect(window.print).toHaveBeenCalledTimes(1);

    // Start Over
    await user.click(screen.getByText("Create Another Checklist"));
    expect(await screen.findByText("Which visa are you applying for?")).toBeInTheDocument();
  });
});

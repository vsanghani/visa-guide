import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Accordion from "@/components/ui/Accordion";

const mockItems = [
  { question: "What is a visa?", answer: "A travel document." },
  { question: "How long does it take?", answer: "6-12 months." },
  { question: "What is the cost?", answer: "About $4,640 AUD." },
];

describe("Accordion", () => {
  it("renders all questions", () => {
    render(<Accordion items={mockItems} />);
    mockItems.forEach((item) => {
      expect(screen.getByText(item.question)).toBeInTheDocument();
    });
  });

  it("does not show answers by default", () => {
    render(<Accordion items={mockItems} />);
    mockItems.forEach((item) => {
      expect(screen.queryByText(item.answer)).not.toBeInTheDocument();
    });
  });

  it("shows answer when question is clicked", async () => {
    const user = userEvent.setup();
    render(<Accordion items={mockItems} />);

    await user.click(screen.getByText("What is a visa?"));
    expect(screen.getByText("A travel document.")).toBeInTheDocument();
  });

  it("hides answer when clicked again", async () => {
    const user = userEvent.setup();
    render(<Accordion items={mockItems} />);

    await user.click(screen.getByText("What is a visa?"));
    expect(screen.getByText("A travel document.")).toBeInTheDocument();

    await user.click(screen.getByText("What is a visa?"));
    expect(screen.queryByText("A travel document.")).not.toBeInTheDocument();
  });

  it("closes other items when a new one is opened", async () => {
    const user = userEvent.setup();
    render(<Accordion items={mockItems} />);

    await user.click(screen.getByText("What is a visa?"));
    expect(screen.getByText("A travel document.")).toBeInTheDocument();

    await user.click(screen.getByText("How long does it take?"));
    expect(screen.getByText("6-12 months.")).toBeInTheDocument();
    expect(screen.queryByText("A travel document.")).not.toBeInTheDocument();
  });

  it("renders empty when no items provided", () => {
    const { container } = render(<Accordion items={[]} />);
    expect(container.querySelector("button")).toBeNull();
  });
});

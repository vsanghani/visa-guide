import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import GlassCard from "@/components/ui/GlassCard";

describe("GlassCard", () => {
  it("renders children content", () => {
    render(
      <GlassCard>
        <p>Card content</p>
      </GlassCard>
    );
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <GlassCard className="custom-class">Content</GlassCard>
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("applies glass-card class", () => {
    const { container } = render(<GlassCard>Content</GlassCard>);
    expect(container.firstChild).toHaveClass("glass-card");
  });

  it("renders multiple children", () => {
    render(
      <GlassCard>
        <h3>Title</h3>
        <p>Description</p>
      </GlassCard>
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });
});

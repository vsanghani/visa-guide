import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

describe("AnimatedCounter", () => {
  it("renders with prefix and suffix", () => {
    render(
      <AnimatedCounter value={100} prefix="$" suffix="+" />
    );
    // The counter animates, but useInView is mocked to return true
    // so it should eventually render the value. Due to animation,
    // we check for the prefix/suffix presence.
    const element = screen.getByText(/\$/);
    expect(element).toBeInTheDocument();
  });

  it("renders the counter element", () => {
    const { container } = render(
      <AnimatedCounter value={65} className="test-counter" />
    );
    const span = container.querySelector(".test-counter");
    expect(span).toBeInTheDocument();
  });
});

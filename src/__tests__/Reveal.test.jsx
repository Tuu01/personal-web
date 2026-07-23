import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Reveal } from "../components/CaseStudy";

const mockUseReducedMotion = vi.fn(() => false);

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className }) => <div className={className}>{children}</div>,
  },
  useReducedMotion: () => mockUseReducedMotion(),
}));

describe("Reveal", () => {
  beforeEach(() => mockUseReducedMotion.mockReturnValue(false));

  it("renders its children", () => {
    render(<Reveal><p>Hello</p></Reveal>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("passes a custom className through", () => {
    const { container } = render(
      <Reveal className="test-class"><span>x</span></Reveal>
    );
    expect(container.firstChild).toHaveClass("test-class");
  });

  it("renders a plain div when reduced-motion is preferred", () => {
    mockUseReducedMotion.mockReturnValue(true);
    const { container } = render(<Reveal><span>reduced</span></Reveal>);
    expect(container.querySelector("div")).toBeInTheDocument();
    expect(screen.getByText("reduced")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import About from "../sections/Aboutme";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, style }) => (
      <div className={className} style={style}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }) => <>{children}</>,
  useReducedMotion: () => false,
}));

// Navbar and Footer pull in router links — wrap in MemoryRouter
const renderAbout = () =>
  render(
    <MemoryRouter>
      <About />
    </MemoryRouter>
  );

describe("About accordion", () => {
  it("renders all three section titles", () => {
    renderAbout();
    expect(screen.getByText("Background")).toBeInTheDocument();
    expect(screen.getByText("How I Work")).toBeInTheDocument();
    expect(screen.getByText("Things I Love")).toBeInTheDocument();
  });

  it("section content is hidden on initial render", () => {
    renderAbout();
    expect(screen.queryByText(/MSc in Queen Mary/)).not.toBeInTheDocument();
  });

  it("clicking a section button reveals its content", async () => {
    const user = userEvent.setup();
    renderAbout();
    await user.click(screen.getByRole("button", { name: /Background/i }));
    expect(await screen.findByText(/MSc in Queen Mary/)).toBeInTheDocument();
  });

  it("clicking an open section hides its content again", async () => {
    const user = userEvent.setup();
    renderAbout();
    const btn = screen.getByRole("button", { name: /Background/i });
    await user.click(btn);
    await screen.findByText(/MSc in Queen Mary/);
    await user.click(btn);
    expect(screen.queryByText(/MSc in Queen Mary/)).not.toBeInTheDocument();
  });
});

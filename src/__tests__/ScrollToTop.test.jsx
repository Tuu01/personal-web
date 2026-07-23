import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

describe("ScrollToTop", () => {
  beforeEach(() => {
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  });

  it("renders its children", () => {
    render(
      <MemoryRouter>
        <ScrollToTop>
          <p>child content</p>
        </ScrollToTop>
      </MemoryRouter>
    );
    expect(screen.getByText("child content")).toBeInTheDocument();
  });

  it("calls scrollTo on mount", () => {
    render(
      <MemoryRouter>
        <ScrollToTop><div /></ScrollToTop>
      </MemoryRouter>
    );
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "auto" });
  });
});

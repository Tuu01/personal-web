import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
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

describe("ScrollToTop with a #section on a new page", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    Element.prototype.scrollIntoView = vi.fn();
  });
  afterEach(() => vi.useRealTimers());

  it("waits for the section to mount, then scrolls to it", () => {
    render(
      <MemoryRouter initialEntries={["/work/x#engineering"]}>
        <ScrollToTop>
          <div />
        </ScrollToTop>
      </MemoryRouter>
    );
    expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
    const late = document.createElement("section");
    late.id = "engineering";
    document.body.appendChild(late);
    vi.advanceTimersByTime(200);
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
    late.remove();
  });
});

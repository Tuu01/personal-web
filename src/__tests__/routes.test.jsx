import { cleanup, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { AppRoutes } from "../App";
import { LEGACY_REDIRECTS } from "../routes";

// The home route pulls in the 3D room, which jsdom cannot run.
vi.mock("../pages/Home", () => ({ default: () => <p>home</p> }));

const Where = () => <output data-testid="path">{useLocation().pathname}</output>;

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route
          path="*"
          element={
            <>
              <AppRoutes />
              <Where />
            </>
          }
        />
      </Routes>
    </MemoryRouter>,
  );

describe("routes", () => {
  it.each(Object.entries(LEGACY_REDIRECTS))("redirects %s to %s", (from, to) => {
    renderAt(from);
    expect(screen.getByTestId("path")).toHaveTextContent(to);
  });

  it("serves the About page with the anchors the room links to", () => {
    const { container } = renderAt("/about");
    expect(screen.getByRole("heading", { level: 1, name: "Trong Tu Luu" })).toBeInTheDocument();
    for (const id of ["education", "badminton", "photography"]) {
      expect(container.querySelector(`#${id}`), id).not.toBeNull();
    }
  });

  it("shows one part of the Nail Fairy page at a time, picked by the hash", () => {
    const at = (hash) => renderAt(`/work/nail-fairy${hash}`).container;
    let c = at("");
    expect(c.querySelector("#part-engineering")).not.toBeNull();
    expect(c.querySelector("#part-design")).toBeNull();
    expect(c.querySelector("#penny-hill")).not.toBeNull();
    cleanup();
    c = at("#design");
    expect(c.querySelector("#part-design")).not.toBeNull();
    expect(c.querySelector("#part-engineering")).toBeNull();
    expect(screen.getByRole("button", { name: "Design" })).toHaveAttribute("aria-pressed", "true");
    cleanup();
    c = at("#brand");
    expect(c.querySelector("#brand")).not.toBeNull();
  });

  it("shows a 404 for unknown paths", () => {
    renderAt("/nope");
    expect(screen.getByRole("heading", { name: "Nothing on this shelf." })).toBeInTheDocument();
  });
});

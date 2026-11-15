import { beforeEach, describe, expect, it } from "vitest";
import { _reset, placeName, previous, record } from "../lib/trail";

const loc = (key, pathname, hash = "") => ({ key, pathname, hash });

describe("trail (back link)", () => {
  beforeEach(_reset);

  it("has nowhere to go back to on a direct landing", () => {
    record(loc("a", "/visual"), "POP");
    expect(previous()).toBe(null);
    expect(placeName(previous())).toBe("home");
  });

  it("goes back to the room zone a page was opened from", () => {
    record(loc("a", "/"), "POP");
    record(loc("b", "/", "#design"), "PUSH");
    record(loc("b2", "/", "#design"), "REPLACE"); // an object list opened
    record(loc("c", "/visual", "#nail-fairy"), "PUSH");
    expect(previous()).toMatchObject({ pathname: "/", hash: "#design" });
    expect(placeName(previous())).toBe("the room · Design");
  });

  it("follows the browser back button", () => {
    record(loc("a", "/"), "POP");
    record(loc("b", "/visual"), "PUSH");
    record(loc("c", "/work/nail-fairy"), "PUSH");
    expect(placeName(previous())).toBe("Visual work");
    record(loc("b", "/visual"), "POP");
    expect(placeName(previous())).toBe("home");
  });
});

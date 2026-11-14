import { describe, it, expect } from "vitest";
import {
  blendShots,
  deg,
  frameWindow,
  frustum,
  poseFrom,
  positionOf,
  rectOnCanvas,
} from "../room/cameraMath";

const close = (a, b, eps = 1e-6) => expect(Math.abs(a - b)).toBeLessThan(eps);

describe("frameWindow", () => {
  it("is centred and matches the field of view for a full frame", () => {
    const w = frameWindow(deg(40), 1.5);
    close(w.cu, 0);
    close(w.cv, 0);
    close(w.hv, Math.tan(deg(20)));
    close(w.hu, Math.tan(deg(20)) * 1.5);
  });

  it("keeps only the free part of the frame", () => {
    const w = frameWindow(deg(40), 1.6, { x0: 0.33, x1: 1, y0: 0, y1: 1 });
    expect(w.cu).toBeGreaterThan(0); // free area is right of centre
    close(w.hu, Math.tan(deg(20)) * 1.6 * 0.67);
  });
});

describe("frustum", () => {
  it("fits the window inside the free rectangle (contain)", () => {
    const win = { cu: 0, cv: 0, hu: 1, hv: 1 };
    const f = frustum(win, { w: 1000, h: 500 }, { x: 500, y: 0, w: 500, h: 500 });
    // Square window into a square free area: 2 tangent units over 500 px.
    close(f.s, 2 / 500);
    // The window's centre lands on the free area's centre.
    close((0 - f.left) / f.s, 750);
    close((f.top - 0) / f.s, 250);
  });
});

describe("shots", () => {
  const a = { pose: poseFrom([10, 10, 10], [0, 0, 0]), win: { cu: 0, cv: 0, hu: 0.05, hv: 0.05 } };
  const b = { pose: poseFrom([0, 1, 3], [0, 1, 0]), win: { cu: 0.1, cv: 0, hu: 0.4, hv: 0.3 } };

  it("blends to the exact end shots", () => {
    const s0 = blendShots(a, b, 0);
    const s1 = blendShots(a, b, 1);
    positionOf(s0.pose).forEach((v, i) => close(v, [10, 10, 10][i], 1e-5));
    positionOf(s1.pose).forEach((v, i) => close(v, [0, 1, 3][i], 1e-5));
    close(s1.win.hu, 0.4);
  });

  it("changes distance in log space", () => {
    const mid = blendShots(a, b, 0.5);
    close(mid.pose.dist, Math.sqrt(a.pose.dist * b.pose.dist), 1e-6);
  });

  it("places a metric rectangle consistently with the frustum", () => {
    const win = { cu: 0, cv: 0, hu: 1, hv: 0.5 };
    const f = frustum(win, { w: 400, h: 200 }, { x: 0, y: 0, w: 400, h: 200 });
    const r = rectOnCanvas(win, f);
    close(r.x, 0);
    close(r.y, 0);
    close(r.w, 400);
    close(r.h, 200);
  });
});

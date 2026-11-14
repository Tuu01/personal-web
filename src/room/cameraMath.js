// Camera maths for the room, kept free of three.js and React so it can be
// unit-tested. Vectors are plain [x, y, z] arrays in glTF space (metres, Y up).
//
// A "shot" is a pose (target, unit direction from target to camera, distance)
// plus a view window: the rectangle, in tangent units (x / depth), that must be
// visible. The window is fitted into whatever part of the canvas the panel
// leaves free, so one set of camera data works for the desktop overlay, the
// stacked phone layout and any size in between.

const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const scale = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const len = (a) => Math.sqrt(dot(a, a));
const norm = (a) => scale(a, 1 / len(a));
const lerp = (a, b, t) => a + (b - a) * t;
const lerp3 = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
const logLerp = (a, b, t) => Math.exp(lerp(Math.log(a), Math.log(b), t));

export const deg = (d) => (d * Math.PI) / 180;

export const easings = {
  easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
  linear: (t) => t,
};

/** Pose from a camera position and target. */
export function poseFrom(position, target) {
  const d = sub(position, target);
  return { target: [...target], dir: norm(d), dist: len(d) };
}

export const positionOf = (pose) => add(pose.target, scale(pose.dir, pose.dist));

/**
 * Window for a reference frame: a camera with vertical field of view `fovV`
 * (radians) and aspect `aspect`, of which only `free` (fractions of the frame,
 * x0..x1 left to right, y0..y1 top to bottom) is the area to keep in view.
 */
export function frameWindow(fovV, aspect, free = { x0: 0, x1: 1, y0: 0, y1: 1 }) {
  const ty = Math.tan(fovV / 2);
  const tx = ty * aspect;
  const u0 = (-1 + 2 * free.x0) * tx;
  const u1 = (-1 + 2 * free.x1) * tx;
  const v0 = (1 - 2 * free.y1) * ty;
  const v1 = (1 - 2 * free.y0) * ty;
  return { cu: (u0 + u1) / 2, cv: (v0 + v1) / 2, hu: (u1 - u0) / 2, hv: (v1 - v0) / 2 };
}

/** Window for an orthographic-style rectangle given in metres at `dist`. */
export function metricWindow({ cx, cy, hw, hh }, dist) {
  return { cu: cx / dist, cv: cy / dist, hu: hw / dist, hv: hh / dist };
}

/**
 * Off-axis frustum that shows `win` as large as possible inside the free
 * rectangle of the canvas (contain fit). Returns the frustum at unit near
 * distance plus the scale (tangent units per CSS pixel).
 */
export function frustum(win, canvas, freeRect) {
  const fw = Math.max(1, freeRect.w);
  const fh = Math.max(1, freeRect.h);
  const s = Math.max((2 * win.hu) / fw, (2 * win.hv) / fh);
  const fcx = freeRect.x + fw / 2;
  const fcy = freeRect.y + fh / 2;
  const left = win.cu - fcx * s;
  const top = win.cv + fcy * s;
  return { left, right: left + canvas.w * s, top, bottom: top - canvas.h * s, s };
}

/**
 * Where a metric rectangle in the camera plane (same convention as
 * metricWindow) lands on the canvas, in CSS pixels. Used to line the
 * pre-rendered poster up with the live 3D room.
 */
export function rectOnCanvas(win, f) {
  return {
    x: (win.cu - win.hu - f.left) / f.s,
    y: (f.top - (win.cv + win.hv)) / f.s,
    w: (2 * win.hu) / f.s,
    h: (2 * win.hv) / f.s,
  };
}

/** Spherical interpolation between two unit vectors. */
export function slerp(a, b, t) {
  const c = Math.min(1, Math.max(-1, dot(a, b)));
  const omega = Math.acos(c);
  if (omega < 1e-5) return norm(lerp3(a, b, t));
  const so = Math.sin(omega);
  return norm(
    add(scale(a, Math.sin((1 - t) * omega) / so), scale(b, Math.sin(t * omega) / so)),
  );
}

/**
 * Blend two shots. Target moves in a straight line, the view direction turns
 * along the shortest arc, distance and window size change in log space so the
 * zoom feels even from 80 m down to 2 m (cameras.json "interpolation").
 */
export function blendShots(a, b, t) {
  return {
    pose: {
      target: lerp3(a.pose.target, b.pose.target, t),
      dir: slerp(a.pose.dir, b.pose.dir, t),
      dist: logLerp(a.pose.dist, b.pose.dist, t),
    },
    win: {
      cu: lerp(a.win.cu, b.win.cu, t),
      cv: lerp(a.win.cv, b.win.cv, t),
      hu: logLerp(a.win.hu, b.win.hu, t),
      hv: logLerp(a.win.hv, b.win.hv, t),
    },
  };
}

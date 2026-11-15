import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import camerasData from "../room/data/cameras.json";
import {
  OBJECTS,
  ZONES,
  ZONE_ORDER,
  deviceFor,
  moveFor,
  opensDirectly,
  parentView,
  posterFor,
  shotFor,
  tagText,
  viewFromHash,
} from "../room/model";

// Paths the site serves, and the anchors those pages define.
const ROUTES = {
  "/about": ["background", "education", "how-i-work", "outside-work", "badminton", "photography"],
  "/contact": [],
  "/visual": [],
  "/work/badminton-queue": ["design", "engineering"],
  "/work/nail-fairy": ["engineering", "penny-hill", "design", "brand"],
  "/work/splento": [],
  "/work/nsms": [],
  "/work/2d-game": [],
  "/work/badminton-clicker": [],
};

describe("room data", () => {
  it("has the four zones in tour order", () => {
    expect(ZONE_ORDER).toEqual(["engineering", "design", "lab", "about"]);
  });

  it("gives every object a close-up camera on both devices", () => {
    for (const id of Object.keys(OBJECTS)) {
      expect(camerasData.objects[id]?.desktop, id).toBeTruthy();
      expect(camerasData.objects[id]?.mobile, id).toBeTruthy();
    }
  });

  it("links every project to a page (and anchor) that exists", () => {
    for (const obj of Object.values(OBJECTS)) {
      for (const p of obj.projects) {
        const [path, hash] = p.href.split("#");
        expect(ROUTES[path], p.href).toBeDefined();
        if (hash) expect(ROUTES[path], p.href).toContain(hash);
      }
    }
  });

  it("lists every object of a zone under one of its kinds", () => {
    for (const z of Object.values(ZONES)) {
      const listed = z.kinds.flatMap((k) => k.objectIds).sort();
      expect(listed).toEqual([...z.objectIds].sort());
    }
  });

  it("treats the frame, certificate, rackets and camera as one About me object", () => {
    expect(ZONES.about.kinds.map((k) => k.label)).toEqual(["About me", "CV and contact"]);
    expect(ZONES.about.tagObjectIds).toEqual(["obj_degree", "obj_cv"]); // About me pin on the certificate
    for (const id of ["obj_about", "obj_degree", "obj_badminton", "obj_camera"]) {
      expect(OBJECTS[id].href, id).toBe("/about");
      expect(opensDirectly(OBJECTS[id]), id).toBe(true);
    }
  });

  it("shows the count on tags only when there is more than one project", () => {
    expect(tagText(OBJECTS.obj_pinboard)).toBe("Brands & visual · 2");
    expect(tagText(OBJECTS.obj_phone)).toBe("Mobile apps");
  });

  it("opens single-project objects directly (monitors: only The Nail Fairy) and lists the rest", () => {
    expect(opensDirectly(OBJECTS.obj_phone)).toBe(true);
    expect(opensDirectly(OBJECTS.obj_pinboard)).toBe(false);
    expect(opensDirectly(OBJECTS.obj_monitors)).toBe(true);
  });
});

describe("views", () => {
  it("reads the zone from the hash and ignores anything else", () => {
    expect(viewFromHash("#lab")).toEqual({ zone: "lab", object: null });
    expect(viewFromHash("#work")).toEqual({ zone: null, object: null });
    expect(viewFromHash("")).toEqual({ zone: null, object: null });
  });

  it("goes back one step at a time", () => {
    expect(parentView({ zone: "design", object: "obj_pinboard" })).toEqual({ zone: "design", object: null });
    expect(parentView({ zone: "design", object: null })).toEqual({ zone: null, object: null });
  });

  it("picks the move timings from cameras.json", () => {
    const room = { zone: null, object: null };
    const eng = { zone: "engineering", object: null };
    expect(moveFor(room, eng).duration_ms).toBe(1000);
    expect(moveFor(eng, room).duration_ms).toBe(800);
    expect(moveFor(eng, { zone: "engineering", object: "obj_monitors" }).duration_ms).toBe(600);
  });

  it("uses the phone camera for tall free areas", () => {
    expect(deviceFor({ w: 800, h: 600 })).toBe("desktop");
    expect(deviceFor({ w: 390, h: 480 })).toBe("mobile");
  });

  it("builds a shot for every view", () => {
    for (const device of ["desktop", "mobile"]) {
      for (const slug of ZONE_ORDER) {
        const s = shotFor({ zone: slug, object: null }, device);
        expect(s.pose.dist).toBeGreaterThan(0.5);
        expect(s.win.hu).toBeGreaterThan(0);
      }
    }
    expect(shotFor({ zone: null, object: null }, "desktop").pose.dist).toBe(80);
  });
});

describe("stills", () => {
  it("has a 1x / 2x image for the room and every zone, day and night", () => {
    const files = [];
    for (const theme of ["light", "dark"]) {
      for (const view of [{ zone: null }, ...ZONE_ORDER.map((zone) => ({ zone }))]) {
        for (const device of ["desktop", "mobile"]) {
          const { src, srcSet } = posterFor(view, device, theme);
          files.push(src, ...(srcSet || "").split(", ").filter(Boolean).map((e) => e.split(" ")[0]));
        }
      }
    }
    for (const f of new Set(files)) expect(existsSync(`public${f}`), f).toBe(true);
  });
});

// Room data: zones, objects and camera shots. Geometry and links come from the
// handoff (data/objects.json, data/cameras.json); the panel copy lives here.
import objectsData from "./data/objects.json";
import camerasData from "./data/cameras.json";
import { deg, frameWindow, metricWindow, poseFrom } from "./cameraMath";

export const MODEL_URL = "/room/tuu-room.glb";
export const posterUrl = (theme) => `/room/overview-${theme === "dark" ? "night" : "day"}.webp`;

/* ----------------------------------------------------------------- zones -- */

// Panel copy. Engineering and Design & visual are from the landing boards. Lab
// and About had placeholder text on the boards, so their lines only describe
// what is in the room; no new claims.
const ZONE_COPY = {
  engineering: {
    index: "01",
    short: "Engineering",
    blurb:
      "Software built and shipped. Each object holds one kind of work; click it to open its projects.",
    items: {
      "Web apps": "Monitors · The Nail Fairy (332+ appointments across 2 locations) and Penny Hill",
      "Mobile apps":
        "Phone · Badminton Queue: club match-running app, scores 210 options in under 0.5 ms",
      "Earlier work": "File holder · NSMS: desktop salon management system (C#, SQL Server)",
    },
    order: ["Web apps", "Mobile apps", "Earlier work"],
  },
  design: {
    index: "02",
    short: "Design",
    blurb:
      "Brand and product design: a salon brand, the interface for a club app, research for an AI video platform, and visual work. Click an object to open its projects.",
    items: {
      "Brands & visual": "Pinboard · The Nail Fairy brand identity, and visual work",
      "UI / product design": "Laptop · Badminton Queue: the interface for a club match-running app",
      Research:
        "Notebook · AI video platform with Splento: interviews, personas and usability evaluation",
    },
    order: ["Brands & visual", "UI / product design", "Research"],
  },
  lab: {
    index: "03",
    short: "Lab",
    blurb: "Things made for fun on the shelf above the desk. Click an object to open it.",
    items: {
      Games: "Controller · 2D game: a Java platformer built without an external engine",
      "Made by hand": "3D printer · Badminton clicker (write-up coming soon)",
    },
    order: ["Games", "Made by hand"],
  },
  about: {
    index: "04",
    short: "About",
    blurb: "The corner by the window: background and education, life outside work, and the CV.",
    items: {
      "About me": "Photo frame and certificate · Background and education",
      "Outside work": "Rackets and camera · Badminton and photography",
      "CV and contact": "CV sheet · Download the CV or get in touch",
    },
    order: ["About me", "Outside work", "CV and contact"],
  },
};

export const ZONE_ORDER = camerasData.motion.intro_tour.order; // engineering, design, lab, about

const objectList = objectsData.objects;

export const OBJECTS = Object.fromEntries(objectList.map((o) => [o.id, o]));
export const EXTRAS = Object.fromEntries(objectsData.extras.map((o) => [o.id, o]));

export const ZONES = Object.fromEntries(
  ZONE_ORDER.map((slug) => {
    const z = objectsData.zones.find((zz) => zz.slug === slug);
    const copy = ZONE_COPY[slug];
    const objects = objectList.filter((o) => o.zone === slug);
    // One row per kind of work; About has two objects per kind (frame and
    // certificate, rackets and camera), the first one stands for the row.
    const kinds = copy.order.map((label) => {
      const members = objects.filter((o) => o.label === label);
      return {
        label,
        description: copy.items[label],
        objectId: members[0].id,
        objectIds: members.map((o) => o.id),
        count: members[0].count,
      };
    });
    return [
      slug,
      {
        slug,
        id: z.id,
        label: z.label,
        index: copy.index,
        short: copy.short,
        blurb: copy.blurb,
        fadesOut: z.fades_out,
        kinds,
        objectIds: objects.map((o) => o.id),
      },
    ];
  }),
);

/** Hover tag text: "Kind · N", N only when the object holds more than one project. */
export const tagText = (obj) => (obj.count > 1 ? `${obj.label} · ${obj.count}` : obj.label);

/** True when clicking the object should open a page rather than list projects. */
export const opensDirectly = (obj) => obj.click === "open href" && !!obj.href;

// Where the zone's tag sits in the room view: on the object that most clearly
// reads as that zone.
const ZONE_TAG_ANCHOR = {
  engineering: OBJECTS.obj_monitors.tag_anchor,
  design: OBJECTS.obj_pinboard.tag_anchor,
  lab: objectsData.triggers.find((t) => t.id === "trig_lab").tag_anchor,
  about: objectsData.triggers.find((t) => t.id === "trig_sidetable").tag_anchor,
};
export const zoneTagAnchor = (slug) => ZONE_TAG_ANCHOR[slug];

/* --------------------------------------------------------------- cameras -- */

export const MOTION = camerasData.motion;

// The area of each reference frame that the panel leaves free. Desktop zone
// frames (1280 × 800) keep the subject in the right two thirds with the panel
// on the left; phone frames (390 × 844) keep it in the top half above the sheet.
const REFERENCE = {
  desktop: { aspect: 1280 / 800, free: { x0: 0.33, x1: 1, y0: 0, y1: 1 } },
  mobile: { aspect: 780 / 1688, free: { x0: 0, x1: 1, y0: 0, y1: 0.58 } },
};

/** Which reference camera to use for a free area of this shape. */
export const deviceFor = (freeRect) => (freeRect.w / Math.max(1, freeRect.h) >= 0.9 ? "desktop" : "mobile");

// Overview: the orthographic room render, re-created with a distant perspective
// camera so it can glide into the zones. Further than the 40 m in cameras.json
// to keep perspective close to the orthographic poster (about 4% at the corners).
const OV = camerasData.overview;
const OVERVIEW_DIST = 80;
const ovDir = poseFrom(OV.position, OV.target).dir;
const ovPose = { target: [...OV.target], dir: ovDir, dist: OVERVIEW_DIST };
const ovMetresPerPx = OV.ortho_scale / OV.render_size[0];
const ovLarger = Math.max(...OV.render_size) * ovMetresPerPx;
// Blender's shift moves the frame by a fraction of its larger side.
const ovShift = { x: OV.shift_x * ovLarger, y: OV.shift_y * ovLarger };

/** The whole poster image, as a metric window in the camera plane. */
export const POSTER_WINDOW = metricWindow(
  {
    cx: ovShift.x,
    cy: ovShift.y,
    hw: (OV.render_size[0] * ovMetresPerPx) / 2,
    hh: (OV.render_size[1] * ovMetresPerPx) / 2,
  },
  OVERVIEW_DIST,
);

// The room fills x 195–1005, y 40–855 of the 1200 × 900 render; frame a square
// just around it so the room is as large as the free area allows.
const ROOM_CROP = { x0: 180, x1: 1020, y0: 30, y1: 870 };
const overviewWindow = metricWindow(
  {
    cx: ovShift.x + ((ROOM_CROP.x0 + ROOM_CROP.x1) / 2 - OV.render_size[0] / 2) * ovMetresPerPx,
    cy: ovShift.y - ((ROOM_CROP.y0 + ROOM_CROP.y1) / 2 - OV.render_size[1] / 2) * ovMetresPerPx,
    hw: ((ROOM_CROP.x1 - ROOM_CROP.x0) / 2) * ovMetresPerPx,
    hh: ((ROOM_CROP.y1 - ROOM_CROP.y0) / 2) * ovMetresPerPx,
  },
  OVERVIEW_DIST,
);

export const OVERVIEW_SHOT = { pose: ovPose, win: overviewWindow };

function presetShot(preset, device) {
  const ref = REFERENCE[device];
  return {
    pose: poseFrom(preset.position, preset.target),
    win: frameWindow(deg(preset.fov_v_deg), ref.aspect, ref.free),
  };
}

/** Shot for a view: { zone, object } with either or both null. */
export function shotFor(view, device) {
  if (view.object) {
    const cam = camerasData.objects[view.object];
    if (cam) return presetShot(cam[device], device);
  }
  if (view.zone) return presetShot(camerasData.zones[view.zone][device], device);
  return OVERVIEW_SHOT;
}

/** Which move a view change is, to pick its duration and easing. */
export function moveFor(from, to) {
  if (!from.zone && to.zone) return MOTION.room_to_zone;
  if (from.zone && !to.zone) return MOTION.zone_to_room;
  if (from.zone !== to.zone) return MOTION.zone_to_zone;
  if (!from.object && to.object) return MOTION.zone_to_object;
  if (from.object && !to.object) return MOTION.object_to_zone;
  return MOTION.zone_to_object;
}

/* ------------------------------------------------------------- view state -- */

export const ROOM = { zone: null, object: null };

/** Parse "#engineering" into a view; anything else is the room. */
export function viewFromHash(hash) {
  const slug = (hash || "").replace(/^#/, "");
  return ZONES[slug] ? { zone: slug, object: null } : ROOM;
}

/** The view one step "back" (Esc, or the back link in the panel). */
export const parentView = (view) => (view.object ? { zone: view.zone, object: null } : ROOM);

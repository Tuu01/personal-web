// src/pages/Clicker.jsx: Shuttlecock Clicker (Lab · Made by hand).
// Every figure here is from the project brief, with how it is known.
import { Suspense, lazy, useState } from "react";
import { useReducedMotion } from "framer-motion";
import CraftLayout from "./CraftLayout";
import { Chapter, Prose, RelatedProject } from "../components/CaseStudy";
import { FACES } from "./clicker/faces";
import { CutAway, Loop } from "./clicker/Diagrams";
import { useTheme } from "../lib/theme";

const ClickerViewer = lazy(() => import("./clicker/ClickerViewer"));

const specs = [
  ["Assembly", "55.8 × 55.8 × 60.8 mm"],
  ["Head", "Ø32 × 20 mm"],
  ["Key travel", "4 mm"],
  ["Faces", "20, swappable"],
  ["Revisions", "7 (v1 → v7)"],
];

// Three decisions, each with its reason in one line.
const decisions = [
  ["No twist-lock on the head", "Turning a seated head 90° would twist the switch stem while the clamped switch can’t turn. It would snap."],
  ["Socket sized from the standard", "The Cherry keycap socket plus print-shrink allowance, then confirmed by printing three widths."],
  ["Every face from one script", "Change the socket or head size once and all 20 heads regenerate."],
];

const measured = [
  ["Switch socket", "4.25 × 1.35 mm, 4.4 mm deep", "Chosen by printing a 3-variant test coupon and fitting a real switch"],
  ["Keycap post", "Ø5.8 mm", "Same test coupon"],
  ["Switch stem cross height", "5.0 mm", "Measured with a ruler, so ±0.5 mm"],
  ["Cherry keycap socket", "4.1 × 1.17 mm", "Published spec (Deskthority wiki), not measured"],
];

const Viewer = () => {
  const reduced = useReducedMotion();
  const theme = useTheme();
  const [face, setFace] = useState("happy");
  return (
    <figure className="flex flex-col gap-3">
      <p className="eyebrow">Turn it in 3D</p>
      <div
        className="relative h-[420px] w-full overflow-hidden rounded-xl border border-line sm:h-[520px]"
        style={{ background: "radial-gradient(ellipse 60% 70% at 50% 45%, var(--paper), var(--surface))" }}
      >
        <Suspense
          fallback={
            <p className="absolute inset-0 flex items-center justify-center font-mono text-xs text-muted">
              Loading the 3D model…
            </p>
          }
        >
          <ClickerViewer face={face} reduced={!!reduced} dark={theme === "dark"} />
        </Suspense>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Face">
          {FACES.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={face === f.id}
              onClick={() => setFace(f.id)}
              className={`h-9 rounded-full border px-4 text-sm font-semibold transition-colors ${
                face === f.id ? "border-ink bg-ink text-paper" : "border-line bg-paper text-ink hover:border-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
      </div>
      <figcaption className="font-mono text-xs leading-relaxed text-muted">
        Interactive 3D model from the CAD files, not a photo. Drag sideways to turn it all the way round; swap the face above.
      </figcaption>
    </figure>
  );
};

// The real, printed clicker: a photo and a short clip of it clicking. The
// clip is silent and loops like a GIF; with reduced motion it waits for play.
const Printed = () => {
  const reduced = useReducedMotion();
  return (
  <section aria-labelledby="printed-title" className="flex max-w-3xl flex-col gap-4">
    <p id="printed-title" className="eyebrow">
      The printed one
    </p>
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      <figure className="flex flex-col gap-2">
        <img
          src="/clicker/photo.webp"
          width="720"
          height="900"
          alt="The printed clicker on a desk: white shuttlecock body, angry face, black ring with a keyring chain"
          loading="lazy"
          className="aspect-[4/5] w-full rounded-xl border border-line object-cover"
        />
        <figcaption className="font-mono text-xs text-muted">Photo of the printed v7.</figcaption>
      </figure>
      <figure className="flex flex-col gap-2">
        <video
          src="/clicker/clicking.mp4"
          poster="/clicker/clicking-poster.webp"
          width="720"
          height="900"
          autoPlay={!reduced}
          controls={!!reduced}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="A hand presses the clicker's head down and lets it spring back, a few times"
          className="aspect-[4/5] w-full rounded-xl border border-line bg-surface object-cover"
        />
        <figcaption className="font-mono text-xs text-muted">It clicks: the head is the keycap.</figcaption>
      </figure>
    </div>
  </section>
  );
};

// Detail for the curious (hardware or CAD interviewers), folded away so the
// page reads in a minute.
const BuildNotes = () => (
  <details className="group max-w-3xl rounded-xl border border-line">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold [&::-webkit-details-marker]:hidden">
      <span>
        Build notes <span className="font-normal text-muted">· measurements, the hardest bug, how the faces are made</span>
      </span>
      <span aria-hidden="true" className="font-mono text-muted transition-transform group-open:rotate-45">
        +
      </span>
    </summary>
    <div className="flex flex-col gap-8 border-t border-line p-5 leading-relaxed text-muted">
      <section className="flex flex-col gap-3">
        <h3 className="font-semibold text-ink">Where it came from</h3>
        <p>
          A redesign of a novelty clicker I saw online, rebuilt around a real mechanical keyboard switch. A personal
          project for badminton players, not paid work. From v5 the body was frozen so it would not need reprinting,
          which set a Ø32 mm floor on how small the head could get.
        </p>
      </section>
      <section className="flex flex-col gap-3">
        <h3 className="font-semibold text-ink">Measured fits</h3>
        <p>No published spec exists for the outside of an MX switch stem, so the socket was sized from the keycap standard and confirmed by printing.</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="eyebrow">
                <th className="border-b border-line py-2 pr-4 font-medium">What</th>
                <th className="border-b border-line py-2 pr-4 font-medium">Size</th>
                <th className="border-b border-line py-2 font-medium">How it is known</th>
              </tr>
            </thead>
            <tbody>
              {measured.map(([what, size, how]) => (
                <tr key={what}>
                  <td className="border-b border-line py-2.5 pr-4 text-ink">{what}</td>
                  <td className="border-b border-line py-2.5 pr-4 font-mono text-xs text-ink">{size}</td>
                  <td className="border-b border-line py-2.5">{how}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="flex flex-col gap-3">
        <h3 className="font-semibold text-ink">The hardest bug: a head that wasn&rsquo;t a solid</h3>
        <p>
          The head opened in Shapr3D with horizontal stripes and a black lower half. Re-importing the assembly and
          checking each solid showed the head was the only one failing the validity check, so the fault was in that
          part, not the export settings. It had been made by revolving an elliptical arc, which STEP can only store as
          an approximated surface. Rebuilding the same outline from a cylinder and a hemisphere, which are stored
          exactly, produced a clean solid. The sphere&rsquo;s pole left two degenerate triangles, fixed by trimming
          0.02 mm off the top.
        </p>
      </section>
      <section className="flex flex-col gap-3">
        <h3 className="font-semibold text-ink">Twenty faces, traced in code</h3>
        <p>
          A 4 × 5 sheet of expressions is split into cells; each shape is traced to a contour, simplified to a polygon,
          extruded, then intersected with a 0.4 mm shell of the dome so the engraving follows the curve at constant
          depth. 0.4 mm is one extrusion line, so a single black line fills each face. Every export is checked for
          watertightness. The face artwork is traced from a reference sheet found online; the drawings aren&rsquo;t
          mine, and I&rsquo;m redrawing them before any sale.
        </p>
        <p>Switch housing height was assumed (6.6 mm), never measured; another brand may break the 4 mm travel.</p>
      </section>
    </div>
  </details>
);

const Clicker = () => (
  <CraftLayout
    index="Lab"
    area="Made by hand"
    title="Shuttlecock Clicker"
    heroImage="/clicker/three-faces.webp"
    heroSrcSet="/clicker/three-faces.webp 1x, /clicker/three-faces@2x.webp 2x"
    heroAlt="Three clickers in a row with angry, sad and happy faces on the same white shuttlecock body"
    heroCaption="Render from the CAD files (Blender Cycles), not a photo: angry, sad and happy heads on the same body."
    sponsor="Personal project · working physical prototype (v7)"
    tags={["CadQuery", "Python", "3D printing", "Fit testing"]}
    lead="A 3D-printed badminton shuttlecock that works as a clicker. A mechanical keyboard switch sits inside the body; the head is a keycap that pulls off, so the face can be swapped. It hangs off a bag."
    meta={{
      role: "Concept, every design decision, printing, measuring and fit testing. CAD generated with an AI assistant from my direction and measurements.",
      team: "Solo",
      timeline: "Oct–Nov 2026",
      tools: "Python · CadQuery · trimesh · Blender · Bambu Lab A1 (PLA)",
    }}
  >
    <Printed />

    <Viewer />

    <Chapter index="01" title="How it works">
      <CutAway />
      <dl className="grid grid-cols-2 gap-x-6 sm:grid-cols-5">
        {specs.map(([k, v]) => (
          <div key={k} className="border-t border-line py-3">
            <dt className="eyebrow">{k}</dt>
            <dd className="mt-1 text-sm">{v}</dd>
          </div>
        ))}
      </dl>
    </Chapter>

    <Chapter index="02" title="How I built it: print, fit, measure, revise">
      <Loop />
      <ul className="grid gap-3 sm:grid-cols-3">
        {decisions.map(([title, text]) => (
          <li key={title} className="flex flex-col gap-1.5 rounded-xl border border-line p-4">
            <span className="font-semibold leading-tight">{title}</span>
            <span className="text-sm leading-snug text-muted">{text}</span>
          </li>
        ))}
      </ul>
    </Chapter>

    <Chapter index="03" title="Honest limits">
      <ul className="max-w-[62ch] list-disc space-y-2 pl-5 leading-relaxed text-muted marker:text-cobalt">
        <li>Made to hang on a bag, not a keyring: the skirt catches in a pocket and keys pull on the stem.</li>
        <li>Click life, print time and unit cost not measured yet.</li>
        <li>Tested by ten person so far.</li>
      </ul>
    </Chapter>

    <BuildNotes />

    <RelatedProject
      to="/work/2d-game"
      label="Lab · Games"
      title="A classic side-scroller built from scratch"
      text="A Java platformer with a hand-rolled game loop."
      image="/assets/projects/Game2D/G1.2.webp"
      alt="2D game"
    />
  </CraftLayout>
);

export default Clicker;

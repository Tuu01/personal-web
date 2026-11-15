// src/pages/Clicker.jsx: Shuttlecock Clicker (Lab · Made by hand).
// Every figure here is from the project brief, with how it is known.
import { Suspense, lazy, useState } from "react";
import { useReducedMotion } from "framer-motion";
import CraftLayout from "./CraftLayout";
import { Chapter, Prose, RelatedProject } from "../components/CaseStudy";
import { FACES } from "./clicker/faces";

const ClickerViewer = lazy(() => import("./clicker/ClickerViewer"));

const specs = [
  ["Assembly", "55.8 × 55.8 × 60.8 mm"],
  ["Head", "Ø32 × 20 mm"],
  ["Key travel", "4 mm"],
  ["Faces", "20, swappable"],
  ["Revisions", "7 (v1 → v7)"],
];

const measured = [
  ["Switch socket", "4.25 × 1.35 mm, 4.4 mm deep", "Chosen by printing a 3-variant test coupon and fitting a real switch"],
  ["Keycap post", "Ø5.8 mm", "Same test coupon"],
  ["Switch stem cross height", "5.0 mm", "Measured with a ruler, so ±0.5 mm"],
  ["Cherry keycap socket", "4.1 × 1.17 mm", "Published spec (Deskthority wiki), not measured"],
];

const Viewer = () => {
  const reduced = useReducedMotion();
  const [face, setFace] = useState("happy");
  return (
    <figure className="flex flex-col gap-3">
      <div className="relative h-[420px] w-full overflow-hidden rounded-xl border border-line bg-surface sm:h-[520px]">
        <Suspense
          fallback={
            <p className="absolute inset-0 flex items-center justify-center font-mono text-xs text-muted">
              Loading the 3D model…
            </p>
          }
        >
          <ClickerViewer face={face} reduced={!!reduced} />
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
        Interactive 3D model from the CAD files, not a photo. Drag to turn it; swap the face below. Photos of the
        printed clicker are coming soon.
      </figcaption>
    </figure>
  );
};

const Clicker = () => (
  <CraftLayout
    index="Lab"
    area="Made by hand"
    title="Shuttlecock Clicker"
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
    <Viewer />

    <Chapter index="01" title="Where it came from">
      <Prose>
        <p>
          A redesign of a novelty clicker I saw online, rebuilt around a real mechanical keyboard switch. A personal
          project for badminton players, not paid work.
        </p>
      </Prose>
    </Chapter>

    <Chapter index="02" title="Four printed parts, one real switch">
      <Prose>
        <p>
          The body carries the feather skirt and the switch mount. The head cap, a black ring with the keyring lug,
          and the face insert print together as one object in two filaments, so the ring is part of the head with no
          glue and no assembly step.
        </p>
        <p>
          A Cherry MX-compatible switch clips into a 14 × 14 mm cut in the body&rsquo;s mounting plate and rests on an
          internal ledge, so the press load goes into the body rather than the switch clips. A guide wall keeps the
          head from rocking through its 4 mm travel. The head is a keycap: pull it off, push another on, and the
          expression changes.
        </p>
      </Prose>
      <dl className="grid grid-cols-2 gap-x-6 sm:grid-cols-5">
        {specs.map(([k, v]) => (
          <div key={k} className="border-t border-line py-3">
            <dt className="eyebrow">{k}</dt>
            <dd className="mt-1 text-sm">{v}</dd>
          </div>
        ))}
      </dl>
    </Chapter>

    <Chapter index="03" title="Print, fit, measure, revise">
      <Prose>
        <p>
          Every revision followed the same loop: change the CAD, export, print a small test piece, fit a real switch,
          measure, revise. Seven revisions in all. Two test pieces were purpose-built (a 3-variant socket-width
          coupon and a 4-variant socket-depth coupon), each printed in the same orientation as the real part so the
          fit would transfer.
        </p>
        <p>
          No published spec exists for the outside of an MX switch stem, so the socket was sized from the keycap
          standard and then confirmed by printing. From v5 the body was frozen so it would not need reprinting,
          which set a Ø32 mm floor on how small the head could get.
        </p>
      </Prose>
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
                <td className="border-b border-line py-2.5 pr-4">{what}</td>
                <td className="border-b border-line py-2.5 pr-4 font-mono text-xs">{size}</td>
                <td className="border-b border-line py-2.5 text-muted">{how}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Chapter>

    <Chapter index="04" title="Decisions I’d defend">
      <ul className="max-w-[62ch] list-disc space-y-3 pl-5 leading-relaxed text-muted marker:text-cobalt">
        <li>
          <strong className="text-ink">No twist-lock on the head.</strong> Turning the head 90° with the stem seated
          4.4 mm deep would twist the stem while the clamped switch body can&rsquo;t turn with it. The stem would break.
        </li>
        <li>
          <strong className="text-ink">Socket sized from the standard, not guessed.</strong> The Cherry keycap socket
          (4.1 × 1.17 mm) plus an allowance for print shrinkage, then confirmed by printing three widths.
        </li>
        <li>
          <strong className="text-ink">A head built from a cylinder and a hemisphere.</strong> A revolved ellipse
          exported as an approximate surface that came back as an invalid solid; cylinders and spheres are stored
          exactly, so the file survives a round trip.
        </li>
        <li>
          <strong className="text-ink">Faces traced in code, not drawn one by one.</strong> One parametric script
          holds every dimension, so changing the socket width or the head size regenerates all 20 heads.
        </li>
      </ul>
    </Chapter>

    <Chapter index="05" title="The hardest bug: a head that wasn’t a solid">
      <Prose>
        <p>
          The head opened in Shapr3D with horizontal stripes and a black lower half. Re-importing the assembly and
          checking each solid showed the head was the only one failing the validity check, so the fault was in that
          part, not the export settings.
        </p>
        <p>
          It had been made by revolving an elliptical arc, which the STEP format can only store as an approximated
          surface. Rebuilding the same outline from a cylinder and a hemisphere produced a solid that re-imported
          clean. One issue remained: the sphere&rsquo;s pole left two degenerate triangles in the mesh, fixed by
          trimming 0.02 mm off the top, which is invisible and removes the pole entirely.
        </p>
      </Prose>
    </Chapter>

    <Chapter index="06" title="Twenty faces, traced in code">
      <Prose>
        <p>
          A 4 × 5 sheet of expressions is split into cells; each shape is traced to a contour, simplified to a
          polygon, extruded, then intersected with a 0.4 mm shell of the dome so the engraving follows the curve at
          constant depth. 0.4 mm is one extrusion line, so a single black line fills each face. Every export is
          checked for watertightness and repaired if needed.
        </p>
        <p className="text-sm">
          The face artwork is traced from a reference sheet found online; the drawings aren&rsquo;t mine. I&rsquo;m
          redrawing them before any sale.
        </p>
      </Prose>
    </Chapter>

    <Chapter index="07" title="Honest limits">
      <ul className="max-w-[62ch] list-disc space-y-2 pl-5 leading-relaxed text-muted marker:text-cobalt">
        <li>Made to hang on a bag, not a keyring: the feather skirt catches in a pocket, and keys pull on the stem joint.</li>
        <li>Click life untested; no idea yet how many presses before the socket wears.</li>
        <li>Print time, filament weight and unit cost not recorded.</li>
        <li>Switch housing height was assumed (6.6 mm), never measured; another brand may break the 4 mm travel.</li>
        <li>Only one person has used it so far.</li>
      </ul>
    </Chapter>

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

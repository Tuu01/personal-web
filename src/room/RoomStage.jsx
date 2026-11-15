// The landing room: live 3D canvas, the panel that mirrors it (the accessible
// way through, and the only one on a phone without WebGL), and the poster
// render shown while three.js loads.
import { Component, Suspense, lazy, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Arrow } from "../brand/Arrow";
import { CV_URL } from "../lib/site";
import { toggleTheme, useTheme } from "../lib/theme";
import { frustum, rectOnCanvas } from "./cameraMath";
import {
  MOTION,
  OBJECTS,
  OVERVIEW_SHOT,
  POSTER_WINDOW,
  ZONES,
  ZONE_ORDER,
  deviceFor,
  opensDirectly,
  parentView,
  posterFor,
  shotFor,
  zoneFrameWindow,
  tagText,
  viewFromHash,
} from "./model";

const RoomCanvas = lazy(() => import("./RoomCanvas"));

const TOUR_KEY = "tuu-room-intro-seen";
// Zone stills are the camera's whole frame, which can stop short of the
// canvas (and some have a solid background): fade their edges into the page.
const EDGE = "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)";
const STILL_EDGE = {
  maskImage: `${EDGE}, ${EDGE.replace("to right", "to bottom")}`,
  maskComposite: "intersect",
  WebkitMaskImage: `${EDGE}, ${EDGE.replace("to right", "to bottom")}`,
  WebkitMaskComposite: "source-in",
};
const SOON = new Set();

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

class CanvasBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err) {
    this.props.onError?.(err);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function useDesktop() {
  const q = "(min-width: 1024px)";
  const [match, setMatch] = useState(() => typeof window !== "undefined" && window.matchMedia(q).matches);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setMatch(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return match;
}

/* --------------------------------------------------------------- panel -- */

const rowClass =
  "group flex w-full items-center justify-between gap-4 border-t border-line py-3.5 text-left transition-colors hover:text-cobalt focus-visible:text-cobalt";

function Crumbs({ view, onBack, onRoom }) {
  const zone = ZONES[view.zone];
  const obj = view.object ? OBJECTS[view.object] : null;
  return (
    <div className="flex items-start justify-between gap-4 font-mono text-xs text-muted">
      <span className="min-w-0">
        <button type="button" onClick={onRoom} className="hover:text-cobalt">
          Room
        </button>
        {" / "}
        {obj ? (
          <>
            <button type="button" onClick={onBack} className="hover:text-cobalt">
              {zone.label}
            </button>
            {" / "}
            <span className="text-ink">{obj.label}</span>
          </>
        ) : (
          <span className="text-ink">{zone.label}</span>
        )}
      </span>
      <button type="button" onClick={onBack} className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-ink hover:text-cobalt">
        <Arrow dir="left" className="h-3.5 w-3.5" />
        {obj ? zone.short : "Room"}
        <span className="hidden text-muted lg:inline">· Esc</span>
      </button>
    </div>
  );
}

function KindRow({ zoneSlug, kind, onSelectObject, onHover }) {
  const obj = OBJECTS[kind.objectId];
  const inner = (
    <>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="text-[17px] font-semibold text-ink group-hover:text-cobalt">
          {kind.count > 1 ? `${kind.label} · ${kind.count}` : kind.label}
        </span>
        <span className="text-sm leading-snug text-muted">{kind.description}</span>
      </span>
      <Arrow className="h-[18px] w-[18px] text-cobalt" />
    </>
  );
  const hoverProps = {
    onMouseEnter: () => onHover({ type: "item", id: kind.objectId }),
    onMouseLeave: () => onHover(null),
    onFocus: () => onHover({ type: "item", id: kind.objectId }),
    onBlur: () => onHover(null),
  };
  if (opensDirectly(obj)) {
    return (
      <Link to={obj.href} className={rowClass} {...hoverProps} data-zone={zoneSlug}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" className={rowClass} onClick={() => onSelectObject(kind.objectId)} {...hoverProps}>
      {inner}
    </button>
  );
}

function ZoneList({ onSelectZone, onHover, hover, tourZone, compact = false }) {
  return (
    <nav aria-label="Room zones" className="flex flex-col border-b border-line">
      {ZONE_ORDER.map((slug) => {
        const z = ZONES[slug];
        const lit = (hover?.type === "zone" && hover.id === slug) || tourZone === slug;
        return (
          <button
            key={slug}
            type="button"
            className={`${rowClass} ${compact ? "py-3" : ""} ${lit ? "text-cobalt" : ""}`}
            onClick={() => onSelectZone(slug)}
            onMouseEnter={() => onHover({ type: "zone", id: slug })}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover({ type: "zone", id: slug })}
            onBlur={() => onHover(null)}
          >
            <span className="flex items-baseline gap-3.5">
              <span className="font-mono text-sm font-medium text-cobalt">{z.index}</span>
              <span className="text-lg font-semibold">{z.label}</span>
            </span>
            <Arrow className="h-[18px] w-[18px]" />
          </button>
        );
      })}
    </nav>
  );
}

function ZonePanel({ view, onBack, onRoom, onSelectObject, onHover, headingRef }) {
  const zone = ZONES[view.zone];
  const obj = view.object ? OBJECTS[view.object] : null;
  return (
    <div className="flex flex-col gap-5">
      <Crumbs view={view} onBack={onBack} onRoom={onRoom} />
      {obj ? (
        <>
          <h2 ref={headingRef} tabIndex={-1} className="text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] outline-none lg:text-[40px]">
            {tagText(obj)}
          </h2>
          <ul className="flex flex-col border-b border-line">
            {obj.projects.map((p) => (
              <li key={p.href}>
                <Link to={p.href} className={rowClass}>
                  <span className="text-[17px] font-semibold">
                    {p.title}
                    {SOON.has(p.href) && <span className="ml-2 font-mono text-xs font-medium text-muted">coming soon</span>}
                  </span>
                  <Arrow className="h-[18px] w-[18px] text-cobalt" />
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h2 ref={headingRef} tabIndex={-1} className="flex items-baseline gap-3 text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] outline-none lg:text-[40px]">
            <span className="font-mono text-base font-medium text-cobalt">{zone.index}</span>
            {zone.label}
          </h2>
          <p className="text-base leading-relaxed text-muted">{zone.blurb}</p>
          <div className="flex flex-col border-b border-line">
            {zone.kinds.map((k) => (
              <KindRow key={k.label} zoneSlug={zone.slug} kind={k} onSelectObject={onSelectObject} onHover={onHover} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Intro() {
  return (
    <div className="flex flex-col gap-5">
      <span className="eyebrow">Software engineer · Product designer · London</span>
      <h1 className="text-[40px] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl xl:text-[60px] lg:[@media(max-height:820px)]:text-[44px]">
        Designs it, builds it, ships it.
      </h1>
      <p className="max-w-[40ch] text-lg leading-[1.55] text-muted">
        I&rsquo;m Tuu (Trong Tu Luu). I take products from research and interface design through to production.
      </p>
    </div>
  );
}

function Ctas() {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href="#work"
        className="inline-flex h-11 items-center gap-2 rounded-lg bg-ink px-5 text-[15px] font-semibold text-paper transition-colors hover:bg-cobalt hover:text-on-cobalt"
      >
        View work <Arrow className="h-4 w-4" />
      </a>
      <a
        href={CV_URL}
        download
        className="inline-flex h-11 items-center rounded-lg border border-line px-5 text-[15px] font-semibold hover:border-ink"
      >
        Download CV
      </a>
    </div>
  );
}

/* --------------------------------------------------------------- stage -- */

export default function RoomStage() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const reduced = useReducedMotion();
  const desktop = useDesktop();

  const zoneView = viewFromHash(location.hash);
  const [objectId, setObjectId] = useState(null);
  const view = useMemo(
    () => ({
      zone: zoneView.zone,
      object: objectId && OBJECTS[objectId]?.zone === zoneView.zone ? objectId : null,
    }),
    [zoneView.zone, objectId],
  );

  const [hover, setHoverState] = useState(null);
  const setHover = useCallback(
    (h) => setHoverState((prev) => (prev?.type === h?.type && prev?.id === h?.id ? prev : h)),
    [],
  );
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const [gl] = useState(webglAvailable);
  const [failed, setFailed] = useState(false);
  const live = gl && !failed;

  /* ---- layout: where the canvas is and what part of it the panel leaves free */
  const canvasRef = useRef(null);
  const panelRef = useRef(null);
  const [box, setBox] = useState({ canvas: { w: 1, h: 1 }, free: { x: 0, y: 0, w: 1, h: 1 } });

  useLayoutEffect(() => {
    const measure = () => {
      const c = canvasRef.current?.getBoundingClientRect();
      if (!c || !c.width) return;
      let free;
      if (desktop && panelRef.current) {
        const p = panelRef.current.getBoundingClientRect();
        const x = p.right - c.left + 24;
        free = { x, y: 24, w: Math.max(1, c.width - x - 24), h: Math.max(1, c.height - 72) };
      } else {
        free = { x: 12, y: 12, w: c.width - 24, h: c.height - 24 };
      }
      setBox((b) =>
        b.canvas.w === c.width && b.canvas.h === c.height && b.free.x === free.x && b.free.w === free.w && b.free.h === free.h
          ? b
          : { canvas: { w: c.width, h: c.height }, free },
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (canvasRef.current) ro.observe(canvasRef.current);
    if (panelRef.current) ro.observe(panelRef.current);
    return () => ro.disconnect();
  }, [desktop]);

  const device = deviceFor(box.free);

  /* ---- navigation */
  const goZone = useCallback(
    (slug) => {
      setObjectId(null);
      navigate({ hash: slug }, { preventScrollReset: true });
    },
    [navigate],
  );
  const goRoom = useCallback(() => {
    setObjectId(null);
    navigate({ hash: "" }, { preventScrollReset: true });
  }, [navigate]);
  const goBack = useCallback(() => {
    const parent = parentView(view);
    if (parent.zone) setObjectId(null);
    else goRoom();
  }, [view, goRoom]);

  const selectObject = useCallback(
    (id) => {
      const obj = OBJECTS[id];
      if (!obj) return;
      if (opensDirectly(obj)) navigate(obj.href);
      else setObjectId(id);
    },
    [navigate],
  );

  const onSelect = useCallback(
    (t) => {
      if (t.type === "zone") goZone(t.id);
      else if (t.type === "item") selectObject(t.id);
      else if (t.type === "extra" && t.id === "obj_lamp") toggleTheme();
    },
    [goZone, selectObject],
  );

  // A different zone from the URL clears the object.
  useEffect(() => setObjectId(null), [zoneView.zone]);

  useEffect(() => {
    if (!view.zone) return;
    const onKey = (e) => {
      if (e.key === "Escape") goBack();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [view.zone, goBack]);

  // Move focus to the panel heading when a zone or object opens, so keyboard
  // and screen-reader users land on what changed.
  const headingRef = useRef(null);
  const firstView = useRef(true);
  useEffect(() => {
    if (firstView.current) {
      firstView.current = false;
      return;
    }
    if (view.zone) headingRef.current?.focus({ preventScroll: true });
  }, [view.zone, view.object]);

  /* ---- reduced motion: cut, with a short cross-fade (cameras.json) */
  const fadeRef = useRef(null);
  const lastKey = useRef(`${view.zone}/${view.object}`);
  useEffect(() => {
    const key = `${view.zone}/${view.object}`;
    if (reduced && key !== lastKey.current && fadeRef.current?.animate) {
      // Web Animations, not CSS: the global reduced-motion rule zeroes CSS
      // transitions, and this fade is what replaces the camera glide.
      fadeRef.current.animate([{ opacity: 0.2 }, { opacity: 1 }], {
        duration: MOTION.reduced_motion.crossfade_ms,
        easing: "ease-out",
      });
    }
    lastKey.current = key;
  }, [view.zone, view.object, reduced]);

  /* ---- first-visit intro tour: highlight each zone for ~1 s, camera still */
  const [tourZone, setTourZone] = useState(null);
  useEffect(() => {
    if (!ready || reduced || view.zone) return;
    let seen = false;
    try {
      seen = localStorage.getItem(TOUR_KEY) === "1";
    } catch {
      seen = true;
    }
    if (seen) return;
    const order = MOTION.intro_tour.order;
    const per = MOTION.intro_tour.per_zone_ms;
    let i = 0;
    let timer;
    const done = () => {
      clearTimeout(timer);
      setTourZone(null);
      try {
        localStorage.setItem(TOUR_KEY, "1");
      } catch {
        // Nothing to remember it in; it will play again next visit.
      }
      window.removeEventListener("pointerdown", done);
      window.removeEventListener("keydown", done);
    };
    const step = () => {
      if (i >= order.length) return done();
      setTourZone(order[i++]);
      timer = setTimeout(step, per);
    };
    timer = setTimeout(step, 400);
    window.addEventListener("pointerdown", done);
    window.addEventListener("keydown", done);
    return done;
    // Runs once, when the room first becomes ready in the room view.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  /* ---- still lined up with the live room: the overview, or the zone's frame */
  const poster = useMemo(() => {
    const shot = view.zone ? shotFor({ zone: view.zone, object: null }, device) : OVERVIEW_SHOT;
    const still = view.zone ? zoneFrameWindow(view.zone, device) : POSTER_WINDOW;
    return rectOnCanvas(still, frustum(shot.win, box.canvas, box.free));
  }, [box, view.zone, device]);
  const showPoster = !live || !ready;

  const hint = view.zone
    ? view.object
      ? "Pick a project. Esc goes back."
      : "Click an outlined object to open its projects."
    : "Click a part of the room to look closer, or pick from the list.";

  const panelKey = `${view.zone || "room"}/${view.object || ""}`;
  const swap = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -4 },
        transition: { duration: MOTION.zone_to_object.panel_swap_ms / 1000, ease: [0.22, 1, 0.36, 1] },
      };

  const panelBody = view.zone ? (
    <ZonePanel
      view={view}
      onBack={goBack}
      onRoom={goRoom}
      onSelectObject={selectObject}
      onHover={setHover}
      headingRef={headingRef}
    />
  ) : null;

  const canvas = (
    <div
      ref={canvasRef}
      className="absolute inset-0 isolate overflow-hidden"
      style={{ cursor: hover ? "pointer" : "default" }}
    >
      {showPoster && (
        <img
          key={view.zone || "room"}
          {...posterFor(view, device, theme)}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="pointer-events-none absolute max-w-none select-none"
          style={{ left: poster.x, top: poster.y, width: poster.w, height: poster.h, ...(view.zone ? STILL_EDGE : null) }}
        />
      )}
      {live && (
        <div
          ref={fadeRef}
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: ready ? 1 : 0 }}
        >
          <CanvasBoundary onError={() => setFailed(true)}>
            <Suspense fallback={null}>
              <RoomCanvas
                view={view}
                device={device}
                freeRect={box.free}
                hover={hover}
                tourZone={tourZone}
                theme={theme}
                instant={!!reduced}
                onHover={setHover}
                onSelect={onSelect}
                onReady={onReady}
              />
            </Suspense>
          </CanvasBoundary>
        </div>
      )}
    </div>
  );

  const hintBar = (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center justify-end gap-4 p-3 lg:justify-between lg:p-5">
      <p className="hidden items-center gap-2 font-mono text-xs text-muted lg:ml-[var(--panel-w)] lg:flex">
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 3v15l4.2-4.2 3 6.4 2.6-1.2-3-6.3H19z" fill="none" stroke="var(--cobalt)" strokeWidth="2.4" strokeLinecap="square" />
        </svg>
        {live ? hint : "Pick a part of the room from the list."}
      </p>
      <div className="pointer-events-auto flex gap-2">
        {tourZone && (
          <button
            type="button"
            onClick={() => setTourZone(null)}
            className="h-8 rounded border border-line bg-paper px-2.5 font-mono text-xs text-muted hover:text-ink"
          >
            Skip intro
          </button>
        )}
        <button
          type="button"
          onClick={toggleTheme}
          aria-pressed={theme === "dark"}
          className="h-8 rounded border border-line bg-paper px-2.5 font-mono text-xs text-ink hover:border-ink"
        >
          {theme === "dark" ? "Night · switch to day" : "Day · switch to night"}
        </button>
      </div>
    </div>
  );

  const srDescription = (
    <p className="sr-only">
      An isometric 3D room in four zones: Engineering at the desk, Design and visual by the pinboard, the Lab on the
      shelf, and About by the window. Every object in the room is also listed in the panel.
    </p>
  );

  /* ---- desktop: canvas full-bleed, panel over its left third */
  if (desktop) {
    return (
      <section
        aria-label="The room"
        className="relative h-[calc(100svh-72px)] max-h-[960px] min-h-[600px] w-full overflow-hidden border-b border-line"
        style={{
          "--gutter": "max(0px, (100vw - 1200px) / 2)",
          "--panel-w": "calc(clamp(380px, 33vw, 480px) + var(--gutter))",
        }}
      >
        {srDescription}
        {canvas}
        <div
          ref={panelRef}
          className="absolute inset-y-0 left-0 z-10 flex w-[var(--panel-w)] flex-col overflow-y-auto border-r border-line bg-paper/88 py-10 pr-12 pl-[calc(48px+var(--gutter))] backdrop-blur-md [@media(max-height:820px)]:py-6"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={panelKey} {...swap} className="my-auto">
              {view.zone ? (
                panelBody
              ) : (
                <div className="flex flex-col gap-7 [@media(max-height:820px)]:gap-5">
                  <Intro />
                  <ZoneList onSelectZone={goZone} onHover={setHover} hover={hover} tourZone={tourZone} />
                  <Ctas />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        {hintBar}
      </section>
    );
  }

  /* ---- phone and tablet: intro, canvas, zone tabs, panel below */
  return (
    <>
      <section className="shell pt-8 pb-6">
        <Intro />
        <div className="mt-6">
          <Ctas />
        </div>
      </section>
      <section aria-label="The room" className="border-y border-line">
        {srDescription}
        <div className="relative h-[58svh] max-h-[640px] min-h-[340px] w-full overflow-hidden">
          {canvas}
          {hintBar}
        </div>
        <nav aria-label="Room zones" className="grid grid-cols-4 border-t border-line">
          {ZONE_ORDER.map((slug) => {
            const z = ZONES[slug];
            const active = view.zone === slug;
            return (
              <button
                key={slug}
                type="button"
                aria-current={active ? "true" : undefined}
                onClick={() => (active ? goRoom() : goZone(slug))}
                className={`flex min-h-12 flex-col items-center justify-center gap-0.5 border-l border-line py-2 text-sm font-semibold first:border-l-0 ${
                  active ? "bg-ink text-paper" : "text-ink"
                }`}
              >
                <span className={`font-mono text-[11px] font-medium ${active ? "text-paper" : "text-cobalt"}`}>{z.index}</span>
                {z.short}
              </button>
            );
          })}
        </nav>
        <div className="shell py-6" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={panelKey} {...swap}>
              {view.zone ? (
                panelBody
              ) : (
                <p className="flex items-center gap-2 font-mono text-xs text-muted">
                  {live ? "Tap a zone tab, or a part of the room, to look closer." : "Tap a zone tab to see its work."}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}


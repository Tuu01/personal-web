// src/components/CaseStudy.jsx
// Editorial case-study primitives, styled with the brand tokens.
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const EASE = [0.22, 1, 0.36, 1];

// One orchestrated entrance per section: Reveal wraps the chapter head only.
// The body of a chapter is just there; it doesn't need to arrive.
export const Reveal = ({ children, className = "", delay = 0, y = 20 }) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
};

export const Lead = ({ children, className = "" }) => (
  <p
    className={`font-amiamie font-normal text-lg md:text-xl leading-[1.5] text-DarkLava max-w-[46ch] ${className}`}
  >
    {children}
  </p>
);

/* Numbered chapter: the index sits directly above the heading in a single
   column. The old tag-left / heading-right split is the templated-editorial
   tell and is not used here. */
export const Chapter = ({ id, index, title, children }) => {
  const parts = useContext(PartsContext);
  // A chapter after the parts is numbered per part: { engineering: "04", design: "05" }.
  if (index && typeof index === "object") index = index[parts?.active] ?? null;
  return (
  <section id={id} className="scroll-mt-[136px] border-t border-black/10 pt-8 md:pt-10">
    <Reveal>
      {index && (
        <span className="font-amiamie-round text-gold text-sm tracking-[0.3em]">
          {index}
        </span>
      )}
      {title && (
        <h2 className="mt-2 font-amiamie font-semibold text-2xl md:text-3xl leading-[1.05] tracking-[-0.02em]">
          {title}
        </h2>
      )}
    </Reveal>
    <div className="mt-5 space-y-5">{children}</div>
  </section>
  );
};

export const Prose = ({ children, className = "" }) => (
  <div
    className={`font-amiamie font-normal text-base leading-[1.6] text-DarkLava/90 max-w-[60ch] space-y-3 ${className}`}
  >
    {children}
  </div>
);

/* Case studies with two halves (Badminton Queue, The Nail Fairy) show one
   at a time. The hash says which: #engineering or #design, or an anchor
   inside one (#penny-hill, #brand). With none, the first part is shown. */
const PartsContext = createContext(null);

export const PartsProvider = ({ value, children }) => <PartsContext.Provider value={value}>{children}</PartsContext.Provider>;

/* One half. Its section id is part-…, not the bare hash, so arriving on
   #design opens the page at the top with Design chosen, title in view. */
export const Part = ({ id, label, intro, children }) => {
  const parts = useContext(PartsContext);
  if (parts && parts.active !== id) return null;
  return (
    <section id={`part-${id}`} aria-labelledby={`${id}-title`} className="scroll-mt-[136px] space-y-12 md:space-y-16">
      <header className="rounded-xl border border-line bg-surface px-6 py-7 md:px-10 md:py-9">
        <p className="eyebrow">Part</p>
        <h2 id={`${id}-title`} className="mt-2 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
          {label}
        </h2>
        {intro && <p className="mt-3 max-w-[60ch] text-lg leading-relaxed text-muted">{intro}</p>}
      </header>
      {children}
    </section>
  );
};

/* The toggle, under the case-study header and sticky below the navbar.
   Switching keeps the reader where they are, unless they had scrolled past
   the toggle: then the new part starts from its top. */
export const PartSwitch = () => {
  const parts = useContext(PartsContext);
  const navigate = useNavigate();
  const location = useLocation();
  const mark = useRef(null);
  if (!parts) return null;

  const choose = (id) => {
    if (id === parts.active) return;
    // Scrolled past the toggle: open the new part at its top, under the toggle.
    const past = (mark.current?.getBoundingClientRect().top ?? 0) < 0;
    navigate({ hash: `#${id}` }, { replace: true, preventScrollReset: true, state: location.state });
    if (!past) return;
    // The new part renders after the hash change; wait for it.
    let tries = 0;
    const go = () => {
      const el = document.getElementById(`part-${id}`);
      if (!el) return tries++ < 30 && requestAnimationFrame(go);
      const bar = mark.current?.nextElementSibling?.getBoundingClientRect().bottom ?? 120;
      window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - bar - 24, behavior: "auto" });
    };
    requestAnimationFrame(go);
  };

  return (
    <>
      <div ref={mark} aria-hidden="true" />
      <div className="sticky top-16 z-30 -mx-4 flex items-center gap-3 mt-2 border-b border-line bg-paper/92 px-4 py-2.5 backdrop-blur-md sm:-mx-8 sm:px-8 md:top-[72px] lg:-mx-12 lg:px-12">
        <span id="part-switch-label" className="eyebrow">
          Read the
        </span>
        <div role="group" aria-labelledby="part-switch-label" className="inline-flex rounded-lg border border-line bg-surface p-1">
          {parts.parts.map((p) => {
            const on = parts.active === p.id;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={on}
                onClick={() => choose(p.id)}
                className={`min-h-9 rounded-md px-4 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt ${
                  on ? "bg-ink text-paper" : "text-muted hover:text-ink"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
        <span className="eyebrow hidden sm:inline">side</span>
      </div>
    </>
  );
};

/* Single framed image, natural height (no crop) */
export const FullImage = ({ src, alt, caption }) => (
  <figure className="space-y-2 not-prose">
    <div className="overflow-hidden rounded-xl border border-black/10 bg-neutral-100 p-1.5">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-auto w-full rounded-lg"
      />
    </div>
    {caption && (
      <figcaption className="text-[11px] uppercase tracking-[0.25em] text-SageGray">
        {caption}
      </figcaption>
    )}
  </figure>
);

export const TwoUp = ({ items = [] }) => (
  <div className="grid items-start gap-3 sm:grid-cols-2">
    {items.map((it, i) => (
      <figure key={i} className="space-y-2">
        <div className="overflow-hidden rounded-xl border border-black/10 bg-neutral-100 p-1.5">
          <img
            src={it.src}
            alt={it.alt}
            loading="lazy"
            className="h-auto w-full rounded-lg"
          />
        </div>
        {it.caption && (
          <figcaption className="text-[11px] uppercase tracking-[0.25em] text-SageGray">
            {it.caption}
          </figcaption>
        )}
      </figure>
    ))}
  </div>
);

export const PullQuote = ({ quote, name, role }) => (
  <figure className="relative py-2">
    <div
      aria-hidden
      className="font-amiamie font-semibold text-gold/30 text-6xl leading-none select-none"
    >
      &ldquo;
    </div>
    <blockquote className="-mt-5 font-amiamie font-normal text-xl md:text-2xl leading-[1.25] tracking-tight text-black max-w-[26ch]">
      {quote}
    </blockquote>
    {(name || role) && (
      <figcaption className="mt-4 text-sm text-SageGray">
        {name && <span className="text-DarkLava">{name}</span>}
        {name && role && ", "}
        {role}
      </figcaption>
    )}
  </figure>
);

/* Dense thumbnail grid (matches home listing) + lightbox */
export const Gallery = ({ images = [] }) => {
  const [active, setActive] = useState(null);
  const closeButtonRef = useRef(null);
  const previouslyFocusedRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!active) return;

    previouslyFocusedRef.current = document.activeElement;
    closeButtonRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        setActive(null);
        return;
      }
      // Close is the only focusable control in the overlay.
      if (e.key === "Tab") {
        e.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      previouslyFocusedRef.current?.focus?.();
    };
  }, [active]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActive(img.src)}
            className="group block w-full aspect-[3/2] overflow-hidden rounded-[3px] border border-black/10 bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label={img.alt || `Open image ${i + 1}`}
          >
            <motion.img
              layoutId={reduceMotion ? undefined : `gallery-image-${img.src}`}
              src={img.src}
              alt={img.alt || `Project image ${i + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            key="lightbox"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged project image"
            onClick={() => setActive(null)}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 z-10 inline-flex min-h-10 items-center rounded-full bg-white/90 px-4 py-1 text-sm text-black hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="Close enlarged image"
            >
              Close
            </button>
            {/* Same layoutId as the thumbnail: it flies here and back. */}
            <motion.img
              layoutId={reduceMotion ? undefined : `gallery-image-${active}`}
              src={active}
              alt="Enlarged view"
              className="max-w-[92vw] max-h-[75dvh] sm:max-w-[85vw] sm:max-h-[80dvh] rounded-lg object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const RelatedProject = ({ to, label, title, text, image, alt }) => (
  <div className="border-t border-black/10 pt-8 md:pt-10">
    <div className="mb-3 text-[11px] uppercase tracking-[0.3em] text-SageGray">
      Next project
    </div>
    <Link
      to={to}
      className="group grid items-stretch gap-0 overflow-hidden rounded-xl border border-black/10 bg-white transition-colors hover:border-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold md:grid-cols-[1fr_1.3fr]"
    >
      <div className="flex flex-col justify-center gap-2 p-6 md:p-8">
        {label && (
          <div className="text-[11px] uppercase tracking-[0.3em] text-gold">
            {label}
          </div>
        )}
        <div className="font-amiamie font-semibold text-xl md:text-2xl leading-tight tracking-[-0.02em]">
          {title}
        </div>
        {text && <p className="text-sm text-DarkLava/70">{text}</p>}
        <div className="mt-2 inline-block">
          <span className="block text-sm font-medium text-DarkLava transition-colors group-hover:text-black">
            View project
          </span>
          <span
            aria-hidden
            className="mt-1.5 block h-px w-10 origin-left bg-DarkLava/40 transition-transform duration-300 ease-out group-hover:scale-x-[2.5]"
          />
        </div>
      </div>
      {/* One hover signal on this card: the border. The thumbnail zoom that
          used to pair with it was the second, redundant one. */}
      <div className="overflow-hidden bg-neutral-100">
        <div className="h-full w-full aspect-[16/10] md:aspect-auto">
          <img
            src={image}
            alt={alt || title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </Link>
  </div>
);

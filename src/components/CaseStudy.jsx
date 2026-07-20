// src/components/CaseStudy.jsx
// Editorial case-study primitives: denser, grid-aligned, Amiamie throughout.
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
    className={`font-amiamie font-light text-lg md:text-xl leading-[1.5] text-DarkLava max-w-[46ch] ${className}`}
  >
    {children}
  </p>
);

/* Numbered chapter: the index sits directly above the heading in a single
   column. The old tag-left / heading-right split is the templated-editorial
   tell and is not used here. */
export const Chapter = ({ index, title, children }) => (
  <section className="border-t border-black/10 pt-8 md:pt-10">
    <Reveal>
      {index && (
        <span className="font-amiamie-round text-gold text-sm tracking-[0.3em]">
          {index}
        </span>
      )}
      {title && (
        <h2 className="mt-2 font-amiamie font-black text-2xl md:text-3xl leading-[1.05] tracking-[-0.02em]">
          {title}
        </h2>
      )}
    </Reveal>
    <div className="mt-5 space-y-5">{children}</div>
  </section>
);

export const Prose = ({ children, className = "" }) => (
  <div
    className={`font-amiamie font-light text-base leading-[1.6] text-DarkLava/90 max-w-[60ch] space-y-3 ${className}`}
  >
    {children}
  </div>
);

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
      className="font-amiamie font-black text-gold/30 text-6xl leading-none select-none"
    >
      &ldquo;
    </div>
    <blockquote className="-mt-5 font-amiamie font-light text-xl md:text-2xl leading-[1.25] tracking-tight text-black max-w-[26ch]">
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
        <div className="font-amiamie font-black text-xl md:text-2xl leading-tight tracking-[-0.02em]">
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

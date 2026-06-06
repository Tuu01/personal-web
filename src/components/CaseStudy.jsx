// src/components/CaseStudy.jsx
// Editorial case-study primitives — denser, grid-aligned, Amiamie throughout.
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, className = "", delay = 0, y = 20 }) => (
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

export const Lead = ({ children, className = "" }) => (
  <Reveal>
    <p
      className={`font-amiamie font-light text-lg md:text-xl leading-[1.5] text-DarkLava max-w-[46ch] ${className}`}
    >
      {children}
    </p>
  </Reveal>
);

/* Numbered chapter as a grid row: small sticky label + content, top rule */
export const Chapter = ({ index, kicker, title, children }) => (
  <section className="grid gap-5 md:grid-cols-[200px_1fr] md:gap-10 border-t border-black/10 pt-8 md:pt-10">
    <div className="md:sticky md:top-24 self-start flex items-baseline gap-3 md:block">
      <Reveal>
        {index && (
          <span className="font-amiamie-round text-gold text-sm tracking-[0.3em]">
            {index}
          </span>
        )}
        {kicker && (
          <span className="md:mt-2 block text-[11px] uppercase tracking-[0.3em] text-SageGray">
            {kicker}
          </span>
        )}
      </Reveal>
    </div>
    <div className="space-y-5">
      {title && (
        <Reveal>
          <h2 className="font-amiamie font-black text-2xl md:text-3xl leading-[1.05] tracking-[-0.02em]">
            {title}
          </h2>
        </Reveal>
      )}
      {children}
    </div>
  </section>
);

export const Prose = ({ children, className = "" }) => (
  <Reveal>
    <div
      className={`font-amiamie font-light text-base leading-[1.6] text-DarkLava/90 max-w-[60ch] space-y-3 ${className}`}
    >
      {children}
    </div>
  </Reveal>
);

/* Single framed image, natural height (no crop) */
export const FullImage = ({ src, alt, caption }) => (
  <Reveal className="not-prose">
    <figure className="space-y-2">
      <div className="overflow-hidden rounded-xl border border-black/10 bg-neutral-100 p-1.5">
        <img src={src} alt={alt} loading="lazy" className="h-auto w-full rounded-lg" />
      </div>
      {caption && (
        <figcaption className="text-[11px] uppercase tracking-[0.25em] text-SageGray">
          {caption}
        </figcaption>
      )}
    </figure>
  </Reveal>
);

export const TwoUp = ({ items = [] }) => (
  <div className="grid items-start gap-3 sm:grid-cols-2">
    {items.map((it, i) => (
      <Reveal key={i} delay={i * 0.06}>
        <figure className="space-y-2">
          <div className="overflow-hidden rounded-xl border border-black/10 bg-neutral-100 p-1.5">
            <img src={it.src} alt={it.alt} loading="lazy" className="h-auto w-full rounded-lg" />
          </div>
          {it.caption && (
            <figcaption className="text-[11px] uppercase tracking-[0.25em] text-SageGray">
              {it.caption}
            </figcaption>
          )}
        </figure>
      </Reveal>
    ))}
  </div>
);

export const PullQuote = ({ quote, name, role }) => (
  <Reveal>
    <figure className="relative py-2">
      <div aria-hidden className="font-amiamie font-black text-gold/30 text-6xl leading-none select-none">
        &ldquo;
      </div>
      <blockquote className="-mt-5 font-amiamie font-light text-xl md:text-2xl leading-[1.25] tracking-tight text-black max-w-[26ch]">
        {quote}
      </blockquote>
      {(name || role) && (
        <figcaption className="mt-4 text-sm text-SageGray">
          {name && <span className="text-DarkLava">{name}</span>}
          {name && role && " — "}
          {role}
        </figcaption>
      )}
    </figure>
  </Reveal>
);

/* Dense thumbnail grid (matches home listing) + lightbox */
export const Gallery = ({ images = [] }) => {
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (!active) return;
    const onKey = (e) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
        {images.map((img, i) => (
          <Reveal key={i} delay={(i % 4) * 0.05}>
            <button
              type="button"
              onClick={() => setActive(img.src)}
              className="group block w-full aspect-[3/2] overflow-hidden rounded-[3px] border border-black/10 bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label={img.alt || `Open image ${i + 1}`}
            >
              <img
                src={img.src}
                alt={img.alt || `Project image ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />
            </button>
          </Reveal>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-sm text-black hover:bg-white"
            aria-label="Close enlarged image"
          >
            Close
          </button>
          <img src={active} alt="Enlarged view" className="max-h-[80vh] max-w-[85vw] rounded-lg object-contain shadow-2xl" />
        </div>
      )}
    </>
  );
};

export const RelatedProject = ({ to, label, title, text, image, alt }) => (
  <Reveal>
    <div className="border-t border-black/10 pt-8 md:pt-10">
      <div className="mb-3 text-[11px] uppercase tracking-[0.3em] text-SageGray">
        Next project
      </div>
      <Link
        to={to}
        className="group grid items-stretch gap-0 overflow-hidden rounded-xl border border-black/10 bg-white transition hover:border-gold md:grid-cols-[1fr_1.3fr]"
      >
        <div className="flex flex-col justify-center gap-2 p-6 md:p-8">
          {label && (
            <div className="text-[11px] uppercase tracking-[0.3em] text-gold">{label}</div>
          )}
          <div className="font-amiamie font-black text-xl md:text-2xl leading-tight tracking-[-0.02em]">
            {title}
          </div>
          {text && <p className="text-sm text-DarkLava/70">{text}</p>}
          <div className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-DarkLava group-hover:text-black">
            View project
            <span className="transition-transform group-hover:translate-x-1" aria-hidden>&rarr;</span>
          </div>
        </div>
        <div className="overflow-hidden bg-neutral-100">
          <div className="h-full w-full aspect-[16/10] md:aspect-auto">
            <img src={image} alt={alt || title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
          </div>
        </div>
      </Link>
    </div>
  </Reveal>
);

import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import PageShell from "../components/PageShell";
import { useTheme } from "../lib/theme";

// Brand decks: each slide rendered from the showcase deck to a 1920 × 1080
// still (NN.webp) and a 960 px grid copy (NN-960.webp). Captions and alt text
// only repeat what is on the slide.
const decks = [
  {
    id: "nail-fairy",
    dir: "/assets/projects/NailFairyBrand",
    name: "Nail Fairy",
    title: "Nail Fairy · brand identity",
    text: "Walk-in nails at Darley Street Market, Bradford, since 2004. A retro sticker look: cream and pink grounds, burgundy ink, a fairy mascot, and a solid burgundy shadow under everything raised.",
    meta: "Logo family, colour, type, mascot, print and social · 2026",
    link: { label: "The Nail Fairy case study", to: "/work/nail-fairy#brand" },
    slides: [
      "Cover: Nail Fairy logo, walk-in nails at Darley Street Market, Bradford",
      "The idea: a retro sticker look for walk-in nails since 2004",
      "From the first logo to the final one",
      "One logo family, five shapes",
      "A version for every ground",
      "Colour: burgundy ink on cream and pink",
      "Type and the hard shadow",
      "The fairy, in five poses",
      "Sparkles and patterns",
      "Loyalty card: the postage stamp",
      "Price list: A4 and A5",
      "Vouchers",
      "Packaging: bag stickers and bags",
      "Social: profile picture options",
      "Closing: Unit 2, Darley Street Market, Bradford",
    ],
  },
  {
    id: "hollywood-nails",
    dir: "/assets/projects/HollywoodBrand",
    name: "Hollywood Nails",
    title: "Hollywood Nails · brand identity",
    text: "Statement and event nails at 71 Kirkgate, Bradford. Black leads, gold is the only accent, and the serif lettering echoes the logo, with a star that hides in the name.",
    meta: "Logo family, colour, type, mascot, print, signs and social · November 2026",
    note: "Mockup photos are AI-generated bases, not the salon itself.",
    slides: [
      "Cover: statement and event nails at 71 Kirkgate, Bradford",
      "An event stylist’s studio at night",
      "From the first logo to the final one",
      "One logo family, four shapes",
      "A version for every ground",
      "Colour: black leads, gold is the accent",
      "Type: Libre Baskerville and Jost",
      "The star, in five poses",
      "Stamp card",
      "Price list",
      "Gift voucher and first-visit offer",
      "Business and aftercare cards",
      "Salon signs",
      "Packaging: bag sticker",
      "Social: posts, stories and highlight covers",
      "In place: shop front, cards and phone mockups",
      "Closing: 71 Kirkgate, Bradford",
    ],
  },
].map((d) => ({
  ...d,
  items: d.slides.map((alt, i) => {
    const n = `${d.dir}/${String(i + 1).padStart(2, "0")}`;
    return { full: `${n}.webp`, thumb: `${n}-960.webp`, alt, w: 1920, h: 1080 };
  }),
}));

// My own brand, from the brand asset pack. Pieces that come in light and dark
// follow the site theme.
const TB = "/assets/projects/TuuBrand";
const ownItems = (t) => [
  { key: "summary", full: `${TB}/brand-summary.webp`, thumb: `${TB}/brand-summary-800.webp`, w: 1600, h: 2264, alt: "One-page brand summary: positioning, voice, logo, light and dark colours, type, patterns, layout and motion", caption: "Brand summary: the one-page rules" },
  { key: "avatar", full: `${TB}/${t === "dark" ? "avatar-reversed" : "avatar"}.webp`, w: 1024, h: 1024, alt: "The [t]¹⁰ monogram avatar", caption: "[t]¹⁰ monogram: avatar and favicon, 16 to 1024 px" },
  { key: "icons", full: `${TB}/icon-sheet.webp`, w: 1920, h: 1856, alt: "Icon sheet: arrows, brackets, braces, cursors, dots and marks on a 24 px grid", caption: "Graphics: 24 px grid, 2.4 px stroke, the logo’s own stem" },
  { key: "linkedin", full: `${TB}/linkedin-${t}.webp`, thumb: `${TB}/linkedin-${t}-1584.webp`, w: 3168, h: 792, alt: "LinkedIn cover: the wordmark, “Designs it, builds it, ships it.”, and the 3D room", caption: "LinkedIn cover, 1584 × 396" },
  { key: "github", full: `${TB}/github-${t}.webp`, thumb: `${TB}/github-${t}-1600.webp`, w: 3200, h: 800, alt: "GitHub profile banner with the wordmark and the 3D room", caption: "GitHub banner, 1600 × 400" },
  { key: "og", full: `${TB}/og-${t}.webp`, thumb: `${TB}/og-${t}-1200.webp`, w: 2400, h: 1260, alt: "Share image shown when the site link is posted", caption: "Share image, 1200 × 630" },
  { key: "slab", full: `${TB}/slab-${t}.webp`, thumb: `${TB}/slab-${t}-1200.webp`, w: 2400, h: 1260, alt: "Slab composition pattern: stone block, cobalt square and an ink slab with 32 dots", caption: "Pattern: the slab composition cover motif" },
];

// A tile: a button that opens the viewer at that item.
const Tile = ({ items, i, label, onOpen, eager, sizes, className = "" }) => {
  const it = items[i];
  return (
    <button
      type="button"
      onClick={() => onOpen(items, i, label)}
      className={`group block w-full overflow-hidden rounded-xl border border-line bg-surface text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt ${className}`}
      aria-label={`Enlarge: ${it.alt}`}
    >
      <img
        src={it.thumb || it.full}
        srcSet={it.thumb ? `${it.thumb} ${Math.round(it.w / 2)}w, ${it.full} ${it.w}w` : undefined}
        sizes={sizes}
        width={it.w}
        height={it.h}
        alt={it.alt}
        loading={eager ? "eager" : "lazy"}
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
      />
    </button>
  );
};

const SectionHead = ({ id, title, meta, children }) => (
  <header className="grid gap-4 md:grid-cols-[1fr_1.4fr] md:gap-12">
    <div className="flex flex-col gap-2">
      <h2 id={id} className="text-[28px] font-semibold leading-tight tracking-[-0.02em] md:text-4xl">
        {title}
      </h2>
      <p className="eyebrow">{meta}</p>
    </div>
    <div className="flex flex-col gap-3 leading-relaxed text-muted">{children}</div>
  </header>
);

const Deck = ({ deck, onOpen }) => (
  <section id={deck.id} aria-labelledby={`${deck.id}-title`} className="flex scroll-mt-24 flex-col gap-6 border-t border-line pt-10">
    <SectionHead id={`${deck.id}-title`} title={deck.title} meta={deck.meta}>
      <p>{deck.text}</p>
      {deck.note && <p className="font-mono text-xs">{deck.note}</p>}
      {deck.link && (
        <Link to={deck.link.to} className="w-fit font-mono text-xs font-medium text-cobalt hover:text-ink">
          {deck.link.label} &rarr;
        </Link>
      )}
    </SectionHead>
    <Tile items={deck.items} i={0} label={`${deck.name} brand deck`} onOpen={onOpen} eager sizes="(min-width: 1280px) 1200px, 100vw" />
    <ul className="grid gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
      {deck.items.slice(1).map((it, k) => (
        <li key={it.full} className="flex flex-col gap-2">
          <Tile items={deck.items} i={k + 1} label={`${deck.name} brand deck`} onOpen={onOpen} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" />
          <span className="text-sm leading-snug text-muted">
            <span className="font-mono text-xs text-ink">{String(k + 2).padStart(2, "0")}</span> {it.alt}
          </span>
        </li>
      ))}
    </ul>
  </section>
);

// The animated logo with its sound logo. Plays muted on a loop; the button
// turns the sound on and restarts it. Reduced motion shows the end frame.
const LogoFilm = ({ theme }) => {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const [sound, setSound] = useState(false);
  const t = theme === "dark" ? "dark" : "light";
  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    const on = !sound;
    v.muted = !on;
    if (on) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
    setSound(on);
  };
  return (
    <figure className="flex flex-col gap-2">
      <div className="relative overflow-hidden rounded-xl border border-line bg-surface">
        <video
          key={t}
          ref={ref}
          src={`${TB}/logo-${t}.mp4`}
          poster={`${TB}/logo-end-${t}.webp`}
          width="1920"
          height="1080"
          autoPlay={!reduced}
          controls={!!reduced}
          muted={!sound}
          loop
          playsInline
          preload="metadata"
          aria-label="The [tuu]¹⁰|1024 logo animating in: brackets, letters, the superscript 10 counting up, then 1024"
          className="aspect-video w-full object-cover"
        />
        {!reduced && (
          <button
            type="button"
            onClick={toggle}
            aria-pressed={sound}
            className="absolute right-3 bottom-3 inline-flex h-9 items-center rounded-full border border-line bg-paper/92 px-4 text-sm font-semibold text-ink backdrop-blur-md hover:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
          >
            {sound ? "Sound off" : "Sound on"}
          </button>
        )}
      </div>
      <figcaption className="text-sm leading-snug text-muted">
        Animated logo, 3.0 s, with a sound logo cut to it: clicks, keystrokes, eleven rising ticks and a chime.
      </figcaption>
    </figure>
  );
};

const OwnBrand = ({ onOpen, theme }) => {
  // Viewer order follows the page: summary, avatar, icons, share image, pattern, covers.
  const order = ["summary", "avatar", "icons", "og", "slab", "linkedin", "github"];
  const items = ownItems(theme).sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key));
  const label = "[tuu]¹⁰|1024 brand";
  const at = (key) => items.findIndex((x) => x.key === key);
  const Cap = ({ k }) => <span className="text-sm leading-snug text-muted">{items[at(k)].caption}</span>;
  const Piece = ({ k, sizes, className }) => (
    <div className="flex flex-col gap-2">
      <Tile items={items} i={at(k)} label={label} onOpen={onOpen} sizes={sizes} className={className} />
      <Cap k={k} />
    </div>
  );
  return (
    <section id="tuu" aria-labelledby="tuu-title" className="flex scroll-mt-24 flex-col gap-6 border-t border-line pt-10">
      <SectionHead id="tuu-title" title="[tuu]¹⁰|1024 · my own brand" meta="Logo, motion, sound, colour, type, patterns and social · 2026">
        <p>
          The mark reads &ldquo;tuu to the power of 10&rdquo;; 2¹⁰ is 1024. Lowercase JetBrains Mono, a cobalt
          superscript, and cobalt as the single accent against ink and paper. This site is built on it.
        </p>
      </SectionHead>
      <LogoFilm theme={theme} />
      <div className="grid gap-x-4 gap-y-6 md:grid-cols-2">
        <Piece k="summary" sizes="(min-width: 768px) 600px, 100vw" />
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-[1fr_1.9fr] gap-4">
            <Piece k="avatar" sizes="200px" className="aspect-square" />
            <Piece k="icons" sizes="(min-width: 768px) 380px, 60vw" className="aspect-square" />
          </div>
          <Piece k="og" sizes="(min-width: 768px) 600px, 100vw" />
          <Piece k="slab" sizes="(min-width: 768px) 600px, 100vw" />
        </div>
      </div>
      <Piece k="linkedin" sizes="(min-width: 1280px) 1200px, 100vw" />
      <Piece k="github" sizes="(min-width: 1280px) 1200px, 100vw" />
    </section>
  );
};

// Full-size viewer: arrows or swipe to step through, Esc to close.
const Viewer = ({ open, onClose, onStep }) => {
  const closeRef = useRef(null);
  const touch = useRef(null);
  const isOpen = !!open;
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onStep(1);
      else if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      prev?.focus?.();
    };
  }, [isOpen, onClose, onStep]);
  if (!open) return null;
  const { items, i, label } = open;
  const it = items[i];
  const btn =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-[#f4f3ef] px-4 text-sm font-semibold text-[#111] hover:bg-[#fff] disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt";
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${label}, ${i + 1} of ${items.length}`}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-[rgb(10_10_12/0.92)] p-4"
      onClick={onClose}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - (touch.current ?? 0);
        if (Math.abs(dx) > 40) onStep(dx < 0 ? 1 : -1);
      }}
    >
      <img
        key={it.full}
        src={it.full}
        alt={it.alt}
        width={it.w}
        height={it.h}
        className="h-auto max-h-[78dvh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
        <button type="button" className={btn} onClick={() => onStep(-1)} disabled={i === 0} aria-label="Previous">
          &larr;
        </button>
        <p className="min-w-[8ch] text-center font-mono text-xs text-[#e8e6e1]" aria-live="polite">
          {i + 1} / {items.length}
        </p>
        <button type="button" className={btn} onClick={() => onStep(1)} disabled={i === items.length - 1} aria-label="Next">
          &rarr;
        </button>
        <button ref={closeRef} type="button" className={btn} onClick={onClose}>
          Close
        </button>
      </div>
      <p className="max-w-[60ch] text-center text-sm text-[#e8e6e1]">{it.caption || it.alt}</p>
    </div>
  );
};

const Visual = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(null);
  const onOpen = useCallback((items, i, label) => setOpen({ items, i, label }), []);
  const onClose = useCallback(() => setOpen(null), []);
  const onStep = useCallback(
    (d) => setOpen((o) => (o ? { ...o, i: Math.max(0, Math.min(o.items.length - 1, o.i + d)) } : o)),
    [],
  );

  return (
    <PageShell title="Visual work">
      <div className="shell pt-6 pb-12 md:pt-10 md:pb-20">
        <header className="flex max-w-[60ch] flex-col gap-4">
          <p className="eyebrow">Visual work</p>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-[56px]">
            Brand, print and graphic work
          </h1>
          <p className="text-lg leading-relaxed text-muted">
            Three identities in full: two salons, from first logo to signs and social, and my own. The product case
            studies are under{" "}
            <Link to="/#work" className="text-cobalt underline underline-offset-4">
              Work
            </Link>
            .
          </p>
        </header>

        <div className="mt-12 flex flex-col gap-16 md:gap-20">
          {decks.map((deck) => (
            <Deck key={deck.id} deck={deck} onOpen={onOpen} />
          ))}
          <OwnBrand onOpen={onOpen} theme={theme} />
        </div>
      </div>
      <Viewer open={open} onClose={onClose} onStep={onStep} />
    </PageShell>
  );
};

export default Visual;

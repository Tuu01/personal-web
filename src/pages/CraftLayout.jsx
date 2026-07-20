import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import GridLinesGlobal from "../components/GridLinesGlobal";
import { Reveal } from "../components/CaseStudy";
import ReactLenis from "lenis/react";

const EASE = [0.22, 1, 0.36, 1];

const CraftLayout = ({
  title,
  sponsor,
  meta = {},
  heroImage,
  heroAlt,
  index,
  area,
  tags = [],
  lead,
  children,
}) => {
  const reduceMotion = useReducedMotion();
  // Skip the entrance offset entirely when the visitor asked for less motion.
  const enter = (y, delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: y > 15 ? 0.7 : 0.6, ease: EASE, delay },
        };

  return (
  <ReactLenis
    root
    options={{ smoothWheel: !reduceMotion }}
    className="relative w-full min-h-dvh bg-paper"
  >
    <GridLinesGlobal />
    <div className="relative z-20">
      <Navbar />

      <div className="mx-auto max-w-[92vw] md:max-w-[80vw] px-4 sm:px-6 md:px-8">
        {/* Header: two columns, aligned to the grid */}
        <header className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:gap-12 items-end pt-10 md:pt-16 pb-8 md:pb-10">
          <div>
            <motion.div
              {...enter(12)}
              className="font-amiamie-round text-gold text-sm tracking-[0.3em]"
            >
              {index}
              {index && area && <span className="text-SageGray"> / </span>}
              {area}
            </motion.div>
            <motion.h1
              {...enter(20, 0.05)}
              className="mt-3 font-amiamie font-black text-4xl sm:text-5xl lg:text-[58px] leading-[1.0] tracking-[-0.02em] max-w-[15ch]"
            >
              {title}
            </motion.h1>
            {tags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-black/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-DarkLava/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="md:pb-1">
            {lead && (
              <p className="font-amiamie font-light text-lg md:text-xl leading-[1.5] text-DarkLava max-w-[44ch]">
                {lead}
              </p>
            )}
            {sponsor && <p className="mt-4 text-sm text-SageGray">{sponsor}</p>}
            {/* One column on phones: "C# (WinForms + Guna UI), SQL Server
                2022, Stored Procedures, Git" is unreadable in a 140px cell. */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {[
                ["Role", meta.role],
                ["Team", meta.team],
                ["Timeline", meta.timeline],
                ["Tools", meta.tools],
              ]
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k}>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-SageGray">{k}</div>
                    <p className="mt-1 text-[13px] leading-snug text-DarkLava">{v}</p>
                  </div>
                ))}
            </div>
          </div>
        </header>

        {/* Hero: full grid width, sharp rectangle */}
        {heroImage && (
          <Reveal>
            <div className="overflow-hidden border border-black/10 bg-neutral-100">
              {/* LCP element on every case-study page. Never lazy. */}
              <img
                src={heroImage}
                alt={heroAlt || title}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="block h-auto w-full"
              />
            </div>
          </Reveal>
        )}

        {/* Body: chapters carry their own top rules */}
        <main className="py-12 md:py-16 space-y-12 md:space-y-16">{children}</main>
      </div>

      <Footer />
    </div>
  </ReactLenis>
  );
};

export default CraftLayout;

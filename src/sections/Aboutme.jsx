import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GridLinesGlobal from "../components/GridLinesGlobal";
import { Reveal } from "../components/CaseStudy";

const sections = [
  {
    title: "Background",
    content: (
      <>
        I'm a Computer Science graduate from City, University of London, now
        completing an MSc in Queen Mary. I work across the whole product; user research and
        prototyping through to full-stack build. Recent work spans a
        user-centred design study for an AI video platform (where I designed the
        final prototype that shaped the direction), a live salon booking site I
        designed and built end to end, and a custom management system used in
        day-to-day operations.
      </>
    ),
  },
  {
    title: "How I Work",
    content: (
      <>
        I pair a designer's process with a developer's precision and an
        operator's instinct. Years running a busy nail salon taught me that
        software only matters if it solves a real problem fast: fewer no-shows,
        less admin, clearer decisions. So I start from research and real
        workflows, design for the way people actually work, and build tools
        staff want to use and businesses can rely on every day.
      </>
    ),
  },
  {
    title: "Things I Love",
    content: (
      <>
        Outside work I'm into <strong>photography</strong>,{" "}
        <strong>cinematic videography</strong>, and making social content.
        You'll usually find me running, in the gym, or playing badminton. I'm
        also always digging into <strong>AI</strong> and{" "}
        <strong>automation</strong>, looking for better ways to build.
      </>
    ),
  },
];

const About = () => {
  const [openSections, setOpenSections] = useState(
    Array(sections.length).fill(false)
  );

  const toggleSection = (index) => {
    setOpenSections((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };

  return (
    <div className="relative min-h-screen bg-white text-black">
      <GridLinesGlobal />

      <div className="relative z-20">
        <Navbar />

        <main className="mx-auto max-w-[92vw] md:max-w-[80vw] px-4 sm:px-6 md:px-8 py-14 md:py-20">
          {/* Editorial header */}
          <Reveal>
            <div className="font-amiamie-round text-gold text-sm tracking-[0.3em]">
              About
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-3 font-amiamie font-black text-4xl sm:text-5xl lg:text-[58px] leading-[1.0] tracking-[-0.02em]">
              Trong Tu Luu
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 font-amiamie font-light text-lg md:text-xl leading-[1.5] text-DarkLava max-w-[46ch]">
              Designer–developer with a Computer Science background. I research
              what users and businesses need, design the experience, and build
              it; grounded by years running a busy salon floor, where I learned
              a design only counts if real people can use it under pressure.
            </p>
          </Reveal>

          {/* Accordion */}
          <div className="mt-10 md:mt-14">
            {sections.map((sec, i) => {
              const open = openSections[i];
              return (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="border-t border-black/10">
                    <button
                      onClick={() => toggleSection(i)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                      aria-expanded={open}
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-amiamie-round text-gold text-sm tracking-[0.2em]">
                          0{i + 1}
                        </span>
                        <span className="font-amiamie font-black text-lg md:text-xl tracking-[-0.02em]">
                          {sec.title}
                        </span>
                      </span>
                      <span className="text-2xl leading-none text-gold">
                        {open ? "\u2212" : "+"}
                      </span>
                    </button>
                    {open && (
                      <div className="pb-8 pl-0 md:pl-10 font-amiamie font-light text-base leading-[1.6] text-DarkLava/90 max-w-[62ch]">
                        {sec.content}
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
            <div className="border-t border-black/10" />
          </div>
        </main>
        <div className="py-2 px-4"></div>

        <div className="relative max-w-[92vw] md:max-w-[80vw] mx-auto border-b border-neutral-200">
          <div className="w-full h-px bg-neutral-200" />
          <div className="py-10 px-4"></div>

          {/* Same dashed vertical lines */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 bottom-0 left-1/4 w-px border-l border-dashed border-black/5" />
            <div className="absolute top-0 bottom-0 left-1/2 w-px border-l border-dashed border-black/5" />
            <div className="absolute top-0 bottom-0 left-3/4 w-px border-l border-dashed border-black/5" />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default About;

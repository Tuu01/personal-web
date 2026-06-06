// src/pages/Splento.jsx
import React from "react";
import CraftLayout from "./CraftLayout";
import {
  Chapter,
  Prose,
  Lead,
  FullImage,
  TwoUp,
  PullQuote,
  Gallery,
  RelatedProject,
  Reveal,
} from "../components/CaseStudy";

const galleryImages = [
  { src: "/assets/projects/AIPlatform/aip1.png"},
  { src: "/assets/projects/AIPlatform/aip2.png"},
  { src: "/assets/projects/AIPlatform/aip3.png"},
  { src: "/assets/projects/AIPlatform/aip4.png"},
  { src: "/assets/projects/AIPlatform/aip5.png"},
  { src: "/assets/projects/AIPlatform/aip6.png"},
];

const Splento = () => (
  <CraftLayout
    index="P · 04"
    area="UX · Interaction Design"
    title="AI-Generated Video Platform for Restaurants"
    sponsor="MSc group project (ECS733) — in collaboration with Splento"
    tags={["UX Research", "Interaction Design", "Usability Testing"]}
    lead="A user-centred design study for a mobile-first platform that helps time-poor restaurant managers discover, lightly adapt, and license AI-generated promotional videos."
    heroImage="/assets/projects/AIPlatform/aip0.png"
    heroAlt="Final prototype — discovery feed"
    meta={{
      role: "Prototype design · User research",
      team: "Team of 5 — MSc group project",
      timeline: "2026",
      tools: "Figma · User research · Usability testing · Heuristic evaluation",
    }}
  >
    {/* 01 — Context */}
    <Chapter
      index="01"
      kicker="Context"
      title="Promo video that fits a restaurant's real pace"
    >
      <Prose>
        <p>
          In collaboration with Splento, the team explored how interaction
          design could help small and medium restaurants get promotional video
          content without the cost, time, or technical skill of traditional
          production.
        </p>
        <p>
          Managers work mainly on mobile, in short fragments between operational
          tasks. Research showed the hardest part is not editing but finding
          relevant, authentic, legally safe content quickly — so discovery,
          lightweight adaptation, and clear licensing became the core of the
          design.
        </p>
      </Prose>
    </Chapter>

    {/* 02 — My contribution (FILL IN) */}
    <Chapter
      index="02"
      kicker="My Contribution"
      title="What I personally owned"
    >
      <Reveal>
        <ul className="font-amiamie font-light text-base md:text-lg leading-[1.7] text-DarkLava/90 max-w-[60ch] space-y-3 list-disc pl-5 marker:text-gold">
          <li>
            Designed the final high-fidelity prototype, which shaped the
            project's final design direction
          </li>
          <li>
            Contributed to user research: survey, interviews, and synthesis into
            personas
          </li>
          <li>Co-wrote the project report</li>
        </ul>
      </Reveal>
      <Prose>
        <p className="text-SageGray">
          Worked in a team of five across the full user-centred design cycle;
          research, personas, conceptual modelling, iterative prototyping, and
          comparative evaluation. Coordinating a larger group made clear
          communication and scope discipline part of the work.
        </p>
      </Prose>
    </Chapter>

    {/* 03 — Research */}
    <Chapter index="03" kicker="Research" title="Grounded in real workflows">
      <Prose>
        <p>
          A survey (15 responses), three semi-structured interviews, a
          literature review, and a competitive analysis. Findings converged on
          mobile-first use, discovery as the biggest pain point, lightweight
          text and music edits, a preference for authentic over polished
          content, and a need for clear licensing.
        </p>
        <p>
          These were synthesised into a primary persona: Tom, a restaurant
          manager who creates content himself on his phone; and a negative
          persona used to keep agency-style features out of scope.
        </p>
      </Prose>
      <FullImage
        src="/assets/projects/AIPlatform/aip6.png"
        alt="Persona and research synthesis"
        caption="Research synthesis → persona"
      />
    </Chapter>

    <PullQuote
      quote="Beauty comes from imperfection."
      role="Interview participant, on why authentic content outperforms polished content"
    />

    {/* 04 — Design & iteration */}
    <Chapter
      index="04"
      kicker="Design & Iteration"
      title="Four rounds, paper to high fidelity"
    >
      <Prose>
        <p>
          Paper sketches tested core navigation (Quick &amp; Dirty evaluation);
          a mid-fidelity prototype was checked with task-based usability
          testing; a high-fidelity prototype was assessed with heuristic
          evaluation against Nielsen's heuristics and Norman's principles.
        </p>
      </Prose>
      <TwoUp
        items={[
          {
            src: "/assets/projects/AIPlatform/aip1.png",
            alt: "Discovery and filtering",
            caption: "Discovery & filtering",
          },
          {
            src: "/assets/projects/AIPlatform/aip2.png",
            alt: "Versioning and licensing",
            caption: "Versioning & licensing",
          },
        ]}
      />
      <Prose>
        <p>
          Iteration resolved recurring confusion: an ambiguous "revert" became a
          clear "save as a copy" model, and licensing was surfaced into the main
          flow rather than hidden, to build publishing confidence.
        </p>
      </Prose>
    </Chapter>

    {/* 05 — Outcome */}
    <Chapter
      index="05"
      kicker="Outcome"
      title="A streamlined direction, chosen on evidence"
    >
      <Prose>
        <p>
          A structured comparison of two high-fidelity directions favoured the
          streamlined, service-supported version on requirement-fit and on
          user-rated clarity and licensing trust. It was refined with music
          preview, preview-before-buy, and clearer service-request wording.
        </p>
      </Prose>
      <Reveal>
        <div className="rounded-2xl border border-black/10 bg-primary/40 p-6 md:p-8">
          <div className="text-[11px] uppercase tracking-[0.25em] text-SageGray">
            Honest limitations
          </div>
          <ul className="mt-3 space-y-2 font-amiamie font-light text-DarkLava/90 list-disc pl-5 marker:text-gold">
            <li>
              Small samples (15 survey, 3 interviews); indicative, not
              conclusive
            </li>
            <li>Small evaluator pool in later rounds</li>
            <li>A validated prototype direction, not a shipped product</li>
          </ul>
        </div>
      </Reveal>
    </Chapter>

    {/* Gallery */}
    <Chapter index="06" kicker="Gallery" title="Selected screens">
      <Gallery images={galleryImages} />
    </Chapter>

    <RelatedProject
      to="/P1"
      label="Java 2D Game"
      title="A classic side-scroller built from scratch"
      text="Hand-rolled engine, collision system, and sprite animation."
      image="/assets/projects/Game2D/G1.2.png"
      alt="2D game"
    />
  </CraftLayout>
);

export default Splento;

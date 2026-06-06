// src/pages/Game2D.jsx
import React from "react";
import CraftLayout from "./CraftLayout";
import {
  Chapter,
  Prose,
  FullImage,
  TwoUp,
  Gallery,
  RelatedProject,
  Reveal,
} from "../components/CaseStudy";

const metrics = [
  { value: "60 FPS", label: "Target frame rate" },
  { value: "5–10 min", label: "Avg run" },
  { value: "3 months", label: "Build time" },
  { value: "100%", label: "Custom engine" },
];

const galleryImages = [
  { src: "/assets/projects/Game2D/G1.2.png", alt: "Game scene" },
  { src: "/assets/projects/Game2D/G6.2.png", alt: "Game scene" },
];

const Game2D = () => (
  <CraftLayout
    index="P · 01"
    area="Game Dev · Java"
    title="Java 2D Platformer - TFight"
    sponsor="University first project"
    tags={["Fixed timestep", "Collision", "Sprite sheets", "Tilemaps"]}
    lead="A retro side-scroller with a hand-rolled Java engine - fixed-timestep game loop, collision system, and sprite animation built from scratch in Swing/AWT."
    heroImage="/assets/projects/Game2D/G2.2.png"
    heroAlt="Game scene"
    meta={{
      role: "Solo developer — design & programming",
      team: "Individual project",
      timeline: "3 months · Sept–Dec 2023",
      tools: "Java, Java Swing, AWT, Photoshop",
    }}
  >
    <Chapter
      index="01"
      kicker="Engine"
      title="Built without an external engine"
    >
      <Prose>
        <p>
          The game loop, collision handling, and sprite animation were all
          written from scratch — a deliberate exercise in understanding what a
          game engine actually does under the hood.
        </p>
      </Prose>
      <Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-2xl border border-black/10 p-4"
            >
              <div className="font-amiamie font-black text-2xl text-black">
                {m.value}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-SageGray">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Chapter>

    <Chapter index="02" kicker="Systems" title="The pieces that make it play">
      <TwoUp
        items={[
          {
            src: "/assets/projects/Game2D/G4.2.png",
            alt: "Enemy AI",
            caption: "Enemy AI — patrols & triggers",
          },
          {
            src: "/assets/projects/Game2D/G5.2.png",
            alt: "Pixel art",
            caption: "Pixel-art pipeline — Photoshop sprite sheets",
          },
        ]}
      />
      <FullImage
        src="/assets/projects/Game2D/G3.2.png"
        alt="Level design"
        caption="Level design — layered tilemaps for ground, hazards, scenery"
      />
    </Chapter>

    <Chapter index="03" kicker="Gameplay" title="In motion">
      <Reveal className="not-prose">
        <div className="aspect-[16/9] overflow-hidden rounded-2xl border border-black/10 bg-black">
          <video
            src="/assets/projects/Game2D/2DGame.mp4"
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
      </Reveal>
    </Chapter>

    <Chapter
      index="04"
      kicker="Outcome"
      title="A playable, polished student game"
    >
      <Prose>
        <p>
          Shipped a complete 2D platformer without an external engine, with
          smooth controls and clear visual feedback.
        </p>
      </Prose>
      <Reveal>
        <div className="rounded-2xl border border-black/10 bg-primary/40 p-6 md:p-8">
          <div className="text-[11px] uppercase tracking-[0.25em] text-SageGray">
            Next steps
          </div>
          <ul className="mt-3 space-y-2 font-amiamie font-light text-DarkLava/90 list-disc pl-5 marker:text-gold">
            <li>More levels and enemies</li>
            <li>Save/load system</li>
            <li>Richer audio and effects</li>
          </ul>
        </div>
      </Reveal>
    </Chapter>

    <Chapter index="05" kicker="Gallery" title="Selected scenes">
      <Gallery images={galleryImages} />
    </Chapter>

    <RelatedProject
      to="/P2"
      label="POS System"
      title="Back-office ops that power the bookings"
      text="Inventory, reporting, and scheduling in one fast desktop app."
      image="/assets/projects/NSMS/NS4.png"
      alt="NSMS dashboard"
    />
  </CraftLayout>
);

export default Game2D;

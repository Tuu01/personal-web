// src/pages/Java2DGame.jsx
import React from "react";
import { Link } from "react-router-dom";
import CraftLayout from "./CraftLayout";

/* ---------- tiny helpers ---------- */
const MetaItem = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <div className="text-neutral-500 uppercase tracking-wide text-sm">
      {label}
    </div>
    <div className="text-[15px] leading-6">{children}</div>
  </div>
);

const Bullet = ({ items }) => (
  <ul className="list-disc ml-5 space-y-2 text-neutral-700">
    {items.map((t, i) => (
      <li key={i}>{t}</li>
    ))}
  </ul>
);

/** Content row
 *  Props:
 *   - reverse: swap media/text on desktop
 *   - mediaType: "img" | "video"
 *   - aspect: any Tailwind aspect ratio (e.g. "3/2", "16/9")
 *   - cover: if true, crops to fill (object-cover). If false, letterboxes (object-contain).
 *   - bleed: if true, no inner padding (edge-to-edge inside card)
 */
const ContentRow = ({
  title,
  children,
  reverse = false,
  mediaType = "img",
  mediaSrc,
  mediaAlt = "",
  aspect = "3/2",
  cover = true,
  bleed = false,
}) => (
  <div
    className={`flex flex-col md:items-center gap-8 md:gap-12 ${
      reverse ? "md:flex-row-reverse" : "md:flex-row"
    }`}
  >
    {/* Text block */}
    <div className="md:w-1/2">
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-neutral-700 leading-relaxed">{children}</p>
    </div>

    {/* Media block (soft card, no device frame) */}
    <div className="md:w-1/2">
      <div
        className={`rounded-2xl border border-neutral-200 bg-neutral-50 shadow-[0_1px_0_rgba(0,0,0,0.04)] ${
          bleed ? "p-0" : "p-4 md:p-6"
        }`}
      >
        <div
          className={`rounded-xl overflow-hidden bg-black aspect-[${aspect}]`}
        >
          {mediaType === "video" ? (
            <video
              src={mediaSrc}
              className={`w-full h-full ${
                cover ? "object-cover" : "object-contain"
              }`}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          ) : (
            <img
              src={mediaSrc}
              alt={mediaAlt}
              className={`w-full h-full ${
                cover ? "object-cover" : "object-contain"
              }`}
              loading="lazy"
            />
          )}
        </div>
      </div>
    </div>
  </div>
);

const Java2DGame = () => (
  <CraftLayout
    title="Java 2D Platformer — TFight"
    sponsor="University First Project"
    heroImage="/assets/projects/Game2D/G1.2.png"
    meta={{
      role: "Solo Developer (Java, OOP, Game Loop) • Design & Programming",
      team: "Individual project",
      timeline: "3 months • Sept–Dec 2023",
      tools: "Java, Java Swing, AWT, Photoshop",
    }}
  >
    {/* Intro */}
    <section className="space-y-4">
      <div className="text-[13px] font-semibold tracking-wide text-[#367ff4]">
        PURPOSE
      </div>
      <h2 className="text-3xl md:text-[34px] font-semibold leading-tight">
        A classic side-scroller built in Java
      </h2>
      <p className="text-neutral-700">
        Treasure Forest is a 2D platformer built with city engine. It
        demonstrates fixed-timestep game loops, OOP structure, collision
        detection, and sprite animation using Java Swing/AWT.
      </p>
    </section>

    {/* At-a-glance */}
    <section className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-6 border-t">
      <MetaItem label="Core Genre">Platformer / Adventure</MetaItem>
      <MetaItem label="Gameplay Time">5–10 min per run</MetaItem>
      <MetaItem label="Controls">Keyboard (WASD / Arrows + Space)</MetaItem>
      <MetaItem label="Target">Desktop</MetaItem>
    </section>

    {/* Design Decisions */}
    <section className="space-y-5 mt-16">
      <div className="text-[13px] font-semibold tracking-wide text-[#367ff4]">
        DESIGN DECISIONS
      </div>
      <h3 className="text-2xl md:text-[28px] font-semibold">
        Balancing scope with clarity
      </h3>
      <p className="text-neutral-700">
        Each choice kept the project shippable in three months while still
        showing strong fundamentals.
      </p>
    </section>

    {/* Alternating rows */}
    <section className="space-y-14 mt-10">
      <ContentRow
        title="From City Engine"
        mediaSrc="/assets/projects/Game2D/G2.2.png"
        mediaAlt="Custom loop and systems"
        aspect="16/9"
        cover
        bleed
      >
        Rendering, physics, and input are hand-rolled in Swing/AWT for full
        control and a clear view of performance trade-offs.
      </ContentRow>

      <ContentRow
        reverse
        title="Simple AI & Triggers"
        mediaSrc="/assets/projects/Game2D/G4.2.png"
        mediaAlt="Enemy patrols and pickups"
        aspect="16/9"
        cover
        bleed
      >
        Enemy patrol paths and collectible triggers keep the gameplay engaging
        without blowing scope.
      </ContentRow>

      {/* If your screenshot has built-in white margins, switch to aspect 16/9 and keep object-cover to crop them */}
      <ContentRow
        title="Pixel Art Style"
        mediaSrc="/assets/projects/Game2D/G5.2.png"
        mediaAlt="Sprites and tiles"
        aspect="16/9"
        cover
        bleed
      >
        Assets were designed in Photoshop and exported as sprite sheets for a
        consistent retro aesthetic.
      </ContentRow>

      <ContentRow
        reverse
        title="Level Design"
        mediaSrc="/assets/projects/Game2D/G3.2.png"
        mediaAlt="Layered tilemap"
        aspect="16/9"
        cover
        bleed
      >
        Layered tilemaps for ground, hazards, collectibles, and background
        scenery make adding new maps fast.
      </ContentRow>
    </section>

    {/* Gameplay video — autoplay, muted, loop, inline */}
    <section className="space-y-10 mt-12">
      <ContentRow
        reverse={false}
        title="Gameplay"
        mediaType="video"
        mediaSrc="/assets/projects/Game2D/2DGame.mp4"
        aspect="16/9"
        cover
        bleed
      >
        Navigate platforms, collect coins, avoid spikes, and reach the treasure
        chest to win.
      </ContentRow>
    </section>

    {/* Outcome Section */}
    <section className="py-16">
      {/* Title on left */}
      <div className="text-[13px] font-semibold tracking-wide text-[#367ff4] mb-8">
        OUTCOME
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Diagram */}
        {/* <div className="flex justify-center">
          <img
            src="/assets/projects/Game2D/G2DVis.png"
            alt="Game Development Overview"
            className="w-full max-w-md h-auto object-contain drop-shadow-md rounded-[10px]"
            loading="lazy"
          />
        </div> */}

        {/* Bullets */}
        <div className="space-y-4">
          <ul className="list-disc list-inside space-y-3 text-sm md:text-base">
            <li>Complete 2D game shipped without external engine</li>
            <li>Fixed-timestep loop runs smoothly on average hardware</li>
            <li>Solid OOP structure, collision system, and sprite animation</li>
            <li>Positive feedback on smooth feel and retro visual style</li>
          </ul>

          <p className="mt-6 text-neutral-600 text-sm md:text-base">
            <span className="font-medium text-neutral-800">Next:</span> more
            levels, save/load, and richer audio.
          </p>
        </div>
      </div>
    </section>

    {/* Next project */}
    <section className="mt-16">
      <div className="text-neutral-500 mb-2">Next project:</div>
      <Link
        to="/P1"
        className="block rounded-2xl border border-neutral-200 p-8 hover:border-neutral-300 transition"
      >
        <div className="text-3xl font-semibold">
          Nail Fairy — Online Booking Website
        </div>
        <div className="text-neutral-500 mt-1">
          Centralized booking, inventory, and reporting
        </div>
        <div className="mt-6 overflow-hidden rounded-xl border">
          <img
            src="/assets/projects/NFBooking/N1.png"
            alt="NSMS cover"
            className="w-full h-[260px] object-cover object-top"
          />
        </div>
      </Link>
    </section>
  </CraftLayout>
);

export default Java2DGame;

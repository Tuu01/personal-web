// src/pages/Game2D.jsx
import React from "react";
import { Link } from "react-router-dom";
import CraftLayout from "./CraftLayout";

const Caption = ({ label, text }) => (
  <div className="space-y-2">
    <div className="text-[11px] uppercase tracking-[0.35em] text-black/50">
      {label}
    </div>
    <div className="text-black/70 leading-relaxed">{text}</div>
  </div>
);

const Game2D = () => (
  <CraftLayout
    title="Java 2D Platformer - TFight"
    sponsor="University First Project"
    meta={{
      role: "Solo Developer (Java, OOP, Game Loop) - Design & Programming",
      team: "Individual project",
      timeline: "3 months - Sept-Dec 2023",
      tools: "Java, Java Swing, AWT, Photoshop",
    }}
  >
    {/* Hero */}
    <section className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
      <div className="space-y-4">
        <div className="text-[11px] uppercase tracking-[0.35em] text-black/50">
          2D Platformer
        </div>
        <h1 className="text-4xl md:text-[48px] leading-[1] font-semibold">
          Retro platforming with a hand-rolled Java engine
        </h1>
        <p className="text-black/70 leading-relaxed">
          Fixed-timestep game loop, collision system, and sprite animation built
          from scratch in Swing/AWT.
        </p>
        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-widest text-black/50">
          {["Fixed timestep", "Collision", "Sprite sheets", "Tilemaps"].map(
            (item) => (
              <span
                key={item}
                className="rounded-full border border-black/10 px-3 py-1"
              >
                {item}
              </span>
            )
          )}
        </div>
      </div>
      <div className="rounded-3xl border border-black/10 bg-white p-4">
        <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
          <img
            src="/assets/projects/Game2D/G2.2.png"
            alt="Game scene"
            loading="lazy"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </section>

    {/* Metrics */}
    <section className="grid gap-4 md:grid-cols-4">
      {[
        { value: "60 FPS", label: "Target frame rate" },
        { value: "5-10 min", label: "Avg run" },
        { value: "3 months", label: "Build time" },
        { value: "100%", label: "Custom engine" },
      ].map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-black/10 bg-white p-4"
        >
          <div className="text-2xl font-semibold">{item.value}</div>
          <div className="text-[11px] uppercase tracking-widest text-black/50">
            {item.label}
          </div>
        </div>
      ))}
    </section>

    {/* Big visuals */}
    <section className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-black/10 bg-white p-4">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
            <img
              src="/assets/projects/Game2D/G4.2.png"
              alt="Enemy AI"
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
        <Caption
          label="Enemy AI"
          text="Patrols and triggers keep gameplay dynamic without inflating scope."
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Caption
          label="Pixel art pipeline"
          text="Assets created in Photoshop and exported as sprite sheets for consistent animation."
        />
        <div className="rounded-3xl border border-black/10 bg-white p-4">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
            <img
              src="/assets/projects/Game2D/G5.2.png"
              alt="Pixel art"
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-black/10 bg-white p-4">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
            <img
              src="/assets/projects/Game2D/G3.2.png"
              alt="Level design"
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
        <Caption
          label="Level design"
          text="Layered tilemaps for ground, hazards, and background scenery."
        />
      </div>
    </section>

    {/* Gameplay */}
    <section className="rounded-3xl border border-black/10 bg-white p-4">
      <div className="text-[11px] uppercase tracking-[0.35em] text-black/50 mb-3">
        Gameplay
      </div>
      <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-black">
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
    </section>

    {/* Outcome */}
    <section className="grid gap-8 md:grid-cols-2">
      <div className="space-y-3">
        <div className="text-[11px] uppercase tracking-[0.35em] text-black/50">
          Outcome
        </div>
        <h2 className="text-2xl md:text-[32px] font-semibold">
          A playable, polished student game
        </h2>
        <p className="text-black/70 leading-relaxed">
          Shipped a complete 2D platformer without an external engine, with
          smooth controls and clear visual feedback.
        </p>
      </div>
      <div className="rounded-2xl border border-black/10 bg-white p-6">
        <div className="text-xs uppercase tracking-widest text-black/40">
          Next steps
        </div>
        <ul className="mt-3 space-y-2 text-black/70">
          <li>More levels and enemies</li>
          <li>Save/load system</li>
          <li>Richer audio and effects</li>
        </ul>
      </div>
    </section>

    {/* Next project */}
    <section className="mt-10">
      <div className="text-neutral-500 mb-2">Next project:</div>
      <Link
        to="/P1"
        className="group block rounded-3xl border border-black/10 bg-white p-6 md:p-8 hover:border-black/20 transition"
      >
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] items-center">
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-widest text-black/40">
              Booking Website
            </div>
            <div className="text-2xl md:text-3xl font-semibold">
              A calm, fast booking flow for salons
            </div>
            <div className="text-sm text-black/60">
              Mobile-first flow with strict slot validation.
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-black/70 group-hover:text-black">
              View project <span aria-hidden>&gt;</span>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-neutral-100">
            <div className="aspect-[16/9] w-full">
              <img
                src="/assets/projects/NFBooking/N1.png"
                alt="Booking website"
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </Link>
    </section>
  </CraftLayout>
);

export default Game2D;
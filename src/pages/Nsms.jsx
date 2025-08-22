// src/pages/Nsms.jsx
import React from "react";
import { Link } from "react-router-dom";
import CraftLayout from "./CraftLayout";

// --------------------------------------
// Small shared bits
// --------------------------------------
const Meta = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <div className="text-neutral-500 uppercase tracking-wide text-xs">
      {label}
    </div>
    <div className="text-[15px] leading-6">{children}</div>
  </div>
);

const Bullets = ({ items }) => (
  <ul className="list-disc ml-5 space-y-2 text-neutral-700">
    {items.map((t, i) => (
      <li key={i}>{t}</li>
    ))}
  </ul>
);

// --------------------------------------
// Fancy media card with subtle “wow”
// - object-contain to avoid awkward crops
// - consistent aspect so layout is calm
// - soft gradient frame + hover lift
// --------------------------------------
const MediaCard = ({ src, alt, caption }) => (
  <figure className="relative group">
    <div
      className="
        rounded-2xl overflow-hidden
        bg-[radial-gradient(100%_100%_at_50%_0%,#ffffff, #f3f4f6)]
        ring-1 ring-black/5 shadow-lg
      "
    >
      <div className="aspect-[16/9] w-full overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="
            w-full h-full object-contain
            transition-transform duration-500 ease-out
            group-hover:scale-[1.02]
          "
        />
      </div>
    </div>
    {caption && (
      <figcaption className="mt-2 text-center text-sm text-neutral-500">
        {caption}
      </figcaption>
    )}
  </figure>
);

// --------------------------------------
// Row that alternates text/media
// --------------------------------------
const ShowcaseRow = ({ title, copy, src, alt, caption, reverse = false }) => (
  <div
    className={`grid items-center gap-8 md:gap-12 ${
      reverse ? "md:grid-cols-[1fr_1.2fr]" : "md:grid-cols-[1.2fr_1fr]"
    }`}
  >
    {/* Text block */}
    <div className={`${reverse ? "md:order-2" : ""}`}>
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-neutral-700 leading-relaxed">{copy}</p>
    </div>

    {/* Media */}
    <div className={`${reverse ? "md:order-1" : ""}`}>
      <MediaCard src={src} alt={alt} caption={caption} />
    </div>
  </div>
);

// --------------------------------------
// Page
// --------------------------------------
export default function Nsms() {
  return (
    <CraftLayout
      title="Nail Salon Management Software (NSMS)"
      sponsor="University Final Project"
      heroImage="/assets/projects/NSMS/NS1.png"
      meta={{
        role: "Full-stack developer (solo)",
        team: "Owners • Front-desk • Technicians (stakeholder feedback)",
        timeline: "≈300 hours • Feb–May 2024",
        tools:
          "C# (WinForms + Guna UI), SQL Server 2022, Stored Procedures, Git",
      }}
    >
      {/* Summary */}
      <section className="space-y-4">
        <div className="text-[13px] font-semibold tracking-wide text-blue-600">
          SUMMARY
        </div>
        <h2 className="text-3xl md:text-[34px] font-semibold leading-tight">
          Centralized ops for a busy nail salon: appointments, POS, inventory,
          reporting
        </h2>
        <p className="text-neutral-700">
          I designed and built a Windows desktop system that replaces paper
          ledgers and ad-hoc spreadsheets with reliable scheduling,
          point-of-sale, inventory tracking, and dashboards. SQL stored
          procedures drive fast reporting and conflict-free booking; the UI is
          keyboard-friendly for staff under time pressure.
        </p>
      </section>

      {/* At-a-glance */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-6 border-t">
        <Meta label="My Role">
          Interaction design • Architecture • Implementation • QA
        </Meta>
        <Meta label="Users">Owners, front-desk, and technicians</Meta>
        <Meta label="Scope">
          Scheduling, POS, Inventory, Dashboards/Reports, Auth
        </Meta>
        <Meta label="Stack">C# • SQL Server • Guna UI • Stored Procedures</Meta>
      </section>

      {/* Highlights */}
      <section className="space-y-6">
        <div className="text-[13px] font-semibold tracking-wide text-blue-600">
          HIGHLIGHTS
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h4 className="font-semibold mb-2">What I shipped</h4>
            <Bullets
              items={[
                "Scheduling with real-time conflict checks and simple walk-in flow.",
                "POS: quick service selection, order list, checkout, printable invoice.",
                "Inventory with low-stock indicators and fast search.",
                "Dashboards: day/month/year revenue, top services, service-mix chart.",
                "Authentication and safety guards for data updates.",
              ]}
            />
          </div>
          <div>
            <h4 className="font-semibold mb-2">Engineering choices</h4>
            <Bullets
              items={[
                "SQL stored procedures to feed charts & KPIs (fast & predictable).",
                "Clear ERD and modular screens to iterate feature-by-feature.",
                "Keyboard shortcuts on desktop; thumb-reach targets where it matters.",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Screens — now with polish */}
      <section className="space-y-16">
        <ShowcaseRow
          title="Appointments"
          copy="Day/Week views; conflict checks; quick add for phone-in bookings; simple walk-in capture so front-desk stays fast."
          src="/assets/projects/NSMS/NS2.png"
          alt="NSMS calendar"
          caption="Scheduler with conflict checks and fast add"
        />

        <ShowcaseRow
          reverse
          title="Inventory"
          copy="Real-time item status with “available / out-of-stock” signals and image lookup — staff can answer client questions immediately."
          src="/assets/projects/NSMS/NS3.png"
          alt="NSMS inventory"
          caption="Low-stock indicators, quick search, item images"
        />

        <ShowcaseRow
          title="Reporting"
          copy="Stored procedures power KPIs and charts: top services, service per category, and revenue by day/month/year for quick decisions."
          src="/assets/projects/NSMS/NS4.png"
          alt="NSMS reporting"
          caption="Revenue by period, service mix, and top performers"
        />
      </section>

      {/* Outcome & next */}
      <section className="space-y-4">
        <div className="text-[13px] font-semibold tracking-wide text-blue-600">
          OUTCOME
        </div>
        <h3 className="text-2xl md:text-3xl font-semibold leading-tight">
          From manual chaos to dependable daily ops
        </h3>
        <Bullets
          items={[
            "Prototype validated with stakeholders; near-100% pass across use-case tests.",
            "Low-stock indicators adopted in routine; fewer last-minute supply runs.",
            "Owners get weekly clarity via fast dashboards (day/month/year revenue & mix).",
          ]}
        />
        <div className="text-[13px] font-semibold tracking-wide text-green-600">
          NEXT
        </div>
        <Bullets
          items={[
            "Role-based access hardening and audit logs.",
            "Tighter POS ↔ Scheduler integration (reserve slot at checkout).",
            "Responsive/resizable UI to support varied stations.",
          ]}
        />
      </section>

      {/* Next project card */}
      <section className="mt-16">
        <div className="text-neutral-500 mb-2">Next project:</div>
        <Link
          to="/P3"
          className="block rounded-2xl border border-neutral-200 p-8 hover:border-neutral-300 transition"
        >
          <div className="text-3xl font-semibold">
            Java 2D Platformer — TFight
          </div>
          <div className="text-neutral-500 mt-1">
            Pure Java engine: loop, collisions, sprite animation
          </div>
          <div className="mt-6 overflow-hidden rounded-xl border">
            <img
              src="/assets/projects/Game2D/G1.2.png"
              alt="Project cover"
              className="w-full h-[260px] object-cover "
            />
          </div>
        </Link>
      </section>
    </CraftLayout>
  );
}

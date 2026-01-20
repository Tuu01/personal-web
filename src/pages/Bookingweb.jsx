// src/pages/Bookingweb.jsx
import React from "react";
import { Link } from "react-router-dom";
import CraftLayout from "./CraftLayout";

const StatPill = ({ value, label }) => (
  <div className="rounded-full border border-black/10 px-4 py-2">
    <div className="text-sm font-semibold tracking-tight text-black">{value}</div>
    <div className="text-[11px] uppercase tracking-widest text-black/50">
      {label}
    </div>
  </div>
);

const SectionTitle = ({ eyebrow, title, text }) => (
  <div className="space-y-3">
    <div className="text-[11px] uppercase tracking-[0.35em] text-black/50">
      {eyebrow}
    </div>
    <h2 className="text-2xl md:text-[32px] font-semibold leading-tight">
      {title}
    </h2>
    {text && <p className="text-black/70 leading-relaxed">{text}</p>}
  </div>
);

const FeatureCard = ({ title, text, image, alt, reverse = false }) => (
  <div
    className={`grid gap-8 md:grid-cols-2 items-center ${
      reverse ? "md:[&>*:first-child]:order-2" : ""
    }`}
  >
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-black/70 leading-relaxed">{text}</p>
    </div>
    <div className="rounded-2xl border border-black/10 bg-white p-3 md:p-4">
      <div className="aspect-[3/2] overflow-hidden rounded-xl bg-neutral-100">
        <img
          src={image}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  </div>
);

const BookingWebsite = () => (
  <CraftLayout
    title="Nail Fairy - Online Booking Website"
    sponsor="Client project"
    meta={{
      role: "Full-stack dev (React, Tailwind, Node) - UX - Deployment",
      team: "Solo (feedback from salon owners & staff)",
      timeline: "2025 (live pilot)",
      tools:
        "React, Tailwind CSS, Node/Express, MongoDB, Vite, GitHub, Vercel/Render",
    }}
  >
    {/* Hero */}
    <section className="relative overflow-hidden rounded-3xl border border-black/10 bg-[#f7f3ee]">
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#f1dfd2] blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#f6e7db] blur-3xl" />

      <div className="relative grid gap-8 p-6 md:p-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-5">
          <div className="text-[11px] uppercase tracking-[0.35em] text-black/50">
            Booking Website
          </div>
          <h1 className="text-4xl md:text-[44px] lg:text-[52px] leading-[1] font-semibold">
            A calm, fast booking flow that turns walk-ins into self-serve
          </h1>
          <p className="text-black/70 leading-relaxed">
            Built for a real salon with strict time-slot validation, return
            visitor shortcuts, and a mobile-first flow that cuts admin work.
          </p>
          <div className="flex flex-wrap gap-3">
            <StatPill value="< 60s" label="Avg booking time" />
            <StatPill value="-40%" label="Phone calls" />
            <StatPill value="99.9%" label="Uptime" />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://nailfairy.co.uk/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm text-white hover:bg-black/80"
            >
              View live site
            </a>
            <span className="text-xs uppercase tracking-widest text-black/40">
              Live
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-3 md:p-4">
          <div className="aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100">
            <img
              src="/assets/projects/NFBooking/N2.png"
              alt="Nail Fairy booking screen"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    {/* Problem + Approach */}
    <section className="grid gap-10 md:grid-cols-2">
      <SectionTitle
        eyebrow="Problem"
        title="Phone bookings were slow and error-prone"
        text="The salon needed a flow that minimizes back-and-forth messages, prevents double-booking, and feels effortless on mobile."
      />
      <SectionTitle
        eyebrow="Approach"
        title="Design a short, guided sequence"
        text="Service - staff (optional) - date/time - contact - confirm. The UI keeps the context visible and validates every step."
      />
    </section>

    {/* Key flows */}
    <section className="space-y-10">
      <SectionTitle
        eyebrow="Key Flows"
        title="Moments that make the booking feel effortless"
      />
      <FeatureCard
        title="Service browsing"
        text="Clear categories, duration/price per card, and a pinned summary that stays visible while you choose."
        image="/assets/projects/NFBooking/N3.png"
        alt="Services grid"
      />
      <FeatureCard
        reverse
        title="Date and time selection"
        text="Only valid slots are shown. Conflicts are blocked server-side with fast fallback suggestions."
        image="/assets/projects/NFBooking/N4.png"
        alt="Calendar flow"
      />
    </section>

    {/* Stack */}
    <section className="rounded-2xl border border-black/10 bg-white p-6">
      <SectionTitle
        eyebrow="Stack"
        title="Pragmatic tools, built for reliability"
      />
      <div className="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-widest text-black/50">
        {[
          "React",
          "Tailwind",
          "Node/Express",
          "MongoDB",
          "Vite",
          "Vercel",
        ].map((item) => (
          <span key={item} className="rounded-full border border-black/10 px-3 py-1">
            {item}
          </span>
        ))}
      </div>
    </section>

    {/* Outcome */}
    <section className="grid gap-8 md:grid-cols-2">
      <SectionTitle
        eyebrow="Outcome"
        title="Faster bookings, fewer interruptions"
        text="Customers complete bookings in under a minute. Staff spend less time on phone calls and more time on service."
      />
      <div className="rounded-2xl border border-black/10 bg-[#f7f3ee] p-6">
        <div className="text-sm uppercase tracking-widest text-black/50">
          Next steps
        </div>
        <ul className="mt-3 space-y-2 text-black/70">
          <li>Payments and deposits</li>
          <li>Loyalty profiles</li>
          <li>Calendar sync with POS</li>
        </ul>
      </div>
    </section>

    {/* Next project */}
    <section className="mt-10">
      <div className="text-neutral-500 mb-2">Next project:</div>
      <Link
        to="/P2"
        className="group block rounded-3xl border border-black/10 bg-white p-6 md:p-8 hover:border-black/20 transition"
      >
        <div className="grid gap-6 md:grid-cols-[1fr_1.2fr] items-center">
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-widest text-black/40">
              POS System
            </div>
            <div className="text-2xl md:text-3xl font-semibold">
              Back-office ops that power the bookings
            </div>
            <div className="text-sm text-black/60">
              Inventory, reporting, and scheduling in one fast desktop app.
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-black/70 group-hover:text-black">
              View project <span aria-hidden>&gt;</span>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-neutral-50">
            <img
              src="/assets/projects/NSMS/NS4.png"
              alt="NSMS dashboard"
              loading="lazy"
              className="h-[220px] w-full object-cover object-top md:h-[260px]"
            />
          </div>
        </div>
      </Link>
    </section>
  </CraftLayout>
);

export default BookingWebsite;
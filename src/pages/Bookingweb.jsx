// src/pages/BookingWebsite.jsx
import React from "react";
import { Link } from "react-router-dom";
import CraftLayout from "./CraftLayout";

// ---------- Small helpers ----------
const MetaItem = ({ label, children }) => (
  <div className="flex flex-col gap-2">
    <div className="text-neutral-500 uppercase tracking-wide text-sm">
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

// Balanced media + copy
const FeatureRow = ({
  title,
  children,
  mediaSrc,
  mediaAlt,
  reverse = false,
}) => (
  <div
    className={`flex flex-col md:items-center gap-8 md:gap-12 ${
      reverse ? "md:flex-row-reverse" : "md:flex-row"
    }`}
  >
    <div className="md:w-1/2">
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-neutral-700 leading-relaxed">{children}</p>
    </div>

    <div className="md:w-1/2">
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 md:p-6 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
        <div className="aspect-[3/2] rounded-xl overflow-hidden bg-neutral-100">
          <img
            src={mediaSrc}
            alt={mediaAlt}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
);

// Slim stat band
const Stat = ({ value, label }) => (
  <div className="text-center">
    <div className="text-2xl md:text-3xl font-semibold tracking-tight">
      {value}
    </div>
    <div className="text-xs uppercase tracking-wide text-neutral-500 mt-1">
      {label}
    </div>
  </div>
);

// Gradient CTA
const CtaBanner = () => (
  <div className="relative overflow-hidden rounded-2xl border border-neutral-200">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50" />
    <div className="relative px-6 py-10 md:px-10 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div>
        <div className="text-[13px] font-semibold tracking-wide text-[#367ff4]">
          LIVE
        </div>
        <h3 className="text-2xl md:text-[28px] font-semibold mt-1">
          See it in the wild — Nail Fairy Booking
        </h3>
        <p className="text-neutral-700 mt-2">
          Mobile and desktop's booking with slot validation, confirmations, and a fast,
          friendly flow.
        </p>
      </div>
      <a
        href="https://nailfairy.co.uk/"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-xl px-4 py-3 bg-black text-white hover:bg-neutral-800 transition"
        aria-label="Open Nail Fairy booking website in a new tab"
      >
        View live site <span aria-hidden>↗</span>
      </a>
    </div>
  </div>
);

const BookingWebsite = () => (
  <CraftLayout
    title="Nail Fairy — Online Booking Website"
    sponsor="Nail Fairy — customer-facing project"
    heroImage="/assets/projects/NFBooking/N1.png"
    meta={{
      role: "Full-stack dev (React, Tailwind, Node) • UX • Deployment",
      team: "Solo (feedback from salon owners & staff)",
      timeline: "2025 (live pilot)",
      tools:
        "React, Tailwind CSS, Node/Express, MongoDB, Vite, GitHub, Vercel/Render",
    }}
  >
    {/* Intro */}
    <section className="space-y-4">
      <div className="text-[13px] font-semibold tracking-wide text-blue-600">
        PURPOSE
      </div>
      <h2 className="text-3xl md:text-[34px] font-semibold leading-tight">
        Turn walk-ins and phone calls into self-serve online bookings
      </h2>
      <p className="text-neutral-700">
        I learned the foundations from a YouTube tutorial and then adapted the
        architecture, UI, and flows for a real nail salon—optimizing for quick
        booking, fewer no-shows, and mobile usability. The site lets customers
        browse services, pick time slots, and get confirmations without calling
        the salon.
      </p>
    </section>

    {/* Quick stat band */}
    <section className="mt-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 rounded-2xl border border-neutral-200 bg-white p-6">
        <Stat value="&lt; 60s" label="Avg booking completion time" />
        <Stat value="99.9% uptime" label="Cloud-hosted, always available" />
        <Stat value="- 40% calls" label="Reduced admin workload" />
        <Stat value="Multi-device" label="Optimized for phones & desktops" />
      </div>
    </section>

    {/* At-a-glance */}
    <section className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-10 border-t">
      <MetaItem label="Surface">
        Public website connected to the salon calendar
      </MetaItem>
      <MetaItem label="Users">
        New & returning clients booking nail services
      </MetaItem>
      <MetaItem label="Primary KPI">
        Online bookings & reduced phone volume
      </MetaItem>
      <MetaItem label="Result (pilot)">Fewer back-and-forth messages</MetaItem>
    </section>

    {/* Learned vs customized */}
    <section className="space-y-6">
      <div className="text-[13px] font-semibold tracking-wide text-blue-600">
        LEARNED FROM TUTORIAL
      </div>
      <h3 className="text-2xl md:text-[28px] font-semibold">
        Foundations I adopted
      </h3>
      <Bullets
        items={[
          "Project structure & React component patterns.",
          "Service listing & detail page scaffold.",
          "Form handling & validation basics.",
          "Vite + Tailwind workflow and deployment shape.",
        ]}
      />
      <p className="text-neutral-700">
        I reused the learning patterns but reworked the data model, booking
        flow, and UI to match a real salon’s constraints and brand.
      </p>
    </section>

    {/* Customization */}
    <section className="space-y-6">
      <div className="text-[13px] font-semibold tracking-wide text-blue-600">
        MY CUSTOMIZATION
      </div>
      <h3 className="text-2xl md:text-[28px] font-semibold">
        What I changed for a real salon
      </h3>
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h4 className="font-semibold mb-2">Booking flow & rules</h4>
          <Bullets
            items={[
              "Service → staff (optional) → date/time → contact → confirm.",
              "Slot validation (duration & buffer) to prevent overlaps.",
              "Return-visitor shortcut (prefills details by phone/email).",
            ]}
          />
        </div>
        <div>
          <h4 className="font-semibold mb-2">Data model</h4>
          <Bullets
            items={[
              "Collections for services, staff availability, bookings, and blackout dates.",
              "Server validation for conflicts; consistent time-zone handling.",
            ]}
          />
        </div>
      </div>
    </section>

    {/* Screens / Media */}
    <section className="space-y-12">
      <FeatureRow
        title="Service Browsing"
        mediaSrc="/assets/projects/NFBooking/N2.png"
        mediaAlt="NF services"
      >
        Services are grouped (Manicure, Pedicure, Combo). Each card shows
        duration, price, and add-ons. Selecting a service drops you into the
        next step with a pinned, glanceable summary.
      </FeatureRow>

      <FeatureRow
        reverse
        title="Pick Date & Time"
        mediaSrc="/assets/projects/NFBooking/N3.png"
        mediaAlt="NF booking"
      >
        The calendar shows only valid start times considering service duration,
        staff availability, and buffers. If a slot becomes unavailable, server
        guards reject and suggest alternatives.
      </FeatureRow>
    </section>

    {/* Architecture */}
    <section className="space-y-6">
      <div className="text-[13px] font-semibold tracking-wide text-blue-600">
        ARCHITECTURE
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h4 className="font-semibold mb-2">Frontend</h4>
          <Bullets
            items={[
              "React + Vite + Tailwind; route-based pages (services, booking, confirm).",
              "Local form state; server validation for availability & conflicts.",
            ]}
          />
        </div>
        <div>
          <h4 className="font-semibold mb-2">Backend</h4>
          <Bullets
            items={[
              "Node/Express API; MongoDB for services, staff, bookings, blackout dates.",
              "Slot generator considers duration, buffers, staff schedules, and lead time.",
            ]}
          />
        </div>
      </div>
    </section>

    {/* Outcome */}
    <section className="space-y-3">
      <div className="text-[13px] font-semibold tracking-wide text-blue-600">
        OUTCOME
      </div>
      <Bullets
        items={[
          "Shipped a real, branded booking experience based on tutorial foundations.",
          "Reduced back-and-forth DMs; customers complete bookings in under a minute.",
          "Engineered robust slot validation to prevent double-booking.",
        ]}
      />
      <p className="text-neutral-700">
        Next: integrate payments, loyalty profiles, and tighter sync with the
        in-store calendar.
      </p>
    </section>

    {/* CTA to live site */}
    <section className="mt-12">
      <CtaBanner />
    </section>

    {/* Next project */}
    <section className="mt-16">
      <div className="text-neutral-500 mb-2">Next project:</div>
      <Link
        to="/P2"
        className="block rounded-2xl border border-neutral-200 p-8 hover:border-neutral-300 transition"
      >
        <div className="text-3xl font-semibold">
          Nail Salon Management Software
        </div>
        <div className="text-neutral-500 mt-1">
          Back-office ops that power the bookings
        </div>
        <div className="mt-6 overflow-hidden rounded-xl border">
          <img
            src="/assets/projects/NSMS/NS4.png"
            alt="NSMS"
            className="w-full h-[260px] object-cover object-top"
          />
        </div>
      </Link>
    </section>
  </CraftLayout>
);

export default BookingWebsite;

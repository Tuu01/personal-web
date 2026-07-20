// src/pages/Bookingweb.jsx
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

const galleryImages = [
  { src: "/assets/projects/NFBooking/N1.png", alt: "Booking: home" },
  { src: "/assets/projects/NFBooking/N5.png", alt: "Booking screen" },
  { src: "/assets/projects/NFBooking/N6.png", alt: "Booking screen" },
  { src: "/assets/projects/NFBooking/N7.png", alt: "Booking screen" },
  { src: "/assets/projects/NFBooking/N8.png", alt: "Booking screen" },
  { src: "/assets/projects/NFBooking/N9.png", alt: "Booking screen" },
  { src: "/assets/projects/NFBooking/N10.png", alt: "Booking screen" },
  { src: "/assets/projects/NFBooking/N11.png", alt: "Booking screen" },
  { src: "/assets/projects/NFBooking/N12.png", alt: "Booking screen" },
];

const BookingWebsite = () => (
  <CraftLayout
    index="P · 03"
    area="Full-Stack · UX"
    title="Nail Fairy: Online Booking Website"
    sponsor="Live client project"
    tags={["React", "Node / Express", "MongoDB", "UX"]}
    lead="A calm, fast booking flow that turns phone-and-message bookings into self-serve, with strict slot validation and a mobile-first sequence."
    heroImage="/assets/projects/NFBooking/N2.png"
    heroAlt="Nail Fairy booking screen"
    meta={{
      role: "Full-stack dev (React, Tailwind, Node) · UX · Deployment",
      team: "Solo (feedback from salon owners & staff)",
      timeline: "2025 (live pilot)",
      tools: "React, Tailwind, Node/Express, MongoDB, Vite, Vercel/Render",
    }}
  >
    <Reveal>
      <a
        href="https://nailfairy.co.uk/"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center whitespace-nowrap rounded-full bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
      >
        View live site
      </a>
    </Reveal>

    <Chapter
      index="01"
      title="Phone bookings were slow and error-prone"
    >
      <Prose>
        <p>
          The salon needed a flow that minimises back-and-forth messages,
          prevents double-booking, and feels effortless on mobile, where most
          customers book.
        </p>
      </Prose>
    </Chapter>

    <Chapter index="02" title="A short, guided sequence">
      <Prose>
        <p>
          Service, staff (optional), date/time, contact, confirm. The
          interface keeps context visible and validates every step, so customers
          always know where they are and what is left.
        </p>
      </Prose>
    </Chapter>

    <Chapter
      index="03"
      title="Moments that make it feel effortless"
    >
      <TwoUp
        items={[
          {
            src: "/assets/projects/NFBooking/N3.png",
            alt: "Services grid",
            caption: "Service browsing",
          },
          {
            src: "/assets/projects/NFBooking/N4.png",
            alt: "Calendar flow",
            caption: "Date & time selection",
          },
        ]}
      />
      <Prose>
        <p>
          Clear categories with duration and price per card, a pinned summary
          that stays visible while choosing, and a calendar that shows only
          valid slots. Conflicts are blocked server-side with fast fallback
          suggestions.
        </p>
      </Prose>
    </Chapter>

    <Chapter
      index="04"
      title="Pragmatic tools, built for reliability"
    >
      <Reveal>
        <div className="flex flex-wrap gap-2">
          {[
            "React",
            "Tailwind",
            "Node/Express",
            "MongoDB",
            "Vite",
            "Vercel",
          ].map((t) => (
            <span
              key={t}
              className="rounded-full border border-black/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-DarkLava/70"
            >
              {t}
            </span>
          ))}
        </div>
      </Reveal>
    </Chapter>

    <Chapter
      index="05"
      title="Faster bookings, fewer interruptions"
    >
      <Prose>
        <p>
          Customers complete bookings in under a minute. Staff spend less time
          on phone calls and more time on service.
        </p>
      </Prose>
      <Reveal>
        <div className="rounded-2xl border border-black/10 bg-primary/40 p-6 md:p-8">
          <div className="text-[11px] uppercase tracking-[0.25em] text-SageGray">
            Next steps
          </div>
          <ul className="mt-3 space-y-2 font-amiamie font-light text-DarkLava/90 list-disc pl-5 marker:text-gold">
            <li>Payments and deposits</li>
            <li>Loyalty profiles</li>
            <li>Calendar sync with the POS</li>
          </ul>
        </div>
      </Reveal>
    </Chapter>

    <Chapter index="06" title="Selected screens">
      <Gallery images={galleryImages} />
    </Chapter>

    <RelatedProject
      to="/P4"
      label="AI Video Platform"
      title="UX for AI-generated restaurant promos"
      text="Mobile-first discovery, lightweight editing, clear licensing."
      image="/assets/projects/AIPlatform/aip0.png"
      alt="AI video platform"
    />
  </CraftLayout>
);

export default BookingWebsite;

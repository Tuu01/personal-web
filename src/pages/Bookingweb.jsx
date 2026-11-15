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
  Part,
  PartSwitch,
} from "../components/CaseStudy";

const PARTS = [
  { id: "engineering", label: "Engineering" },
  { id: "design", label: "Design" },
];

const galleryImages = [
  { src: "/assets/projects/NFBooking/N1.webp", alt: "Booking: home" },
  { src: "/assets/projects/NFBooking/N5.webp", alt: "Booking screen" },
  { src: "/assets/projects/NFBooking/N6.webp", alt: "Booking screen" },
  { src: "/assets/projects/NFBooking/N7.webp", alt: "Booking screen" },
  { src: "/assets/projects/NFBooking/N8.webp", alt: "Booking screen" },
  { src: "/assets/projects/NFBooking/N9.webp", alt: "Booking screen" },
  { src: "/assets/projects/NFBooking/N10.webp", alt: "Booking screen" },
  { src: "/assets/projects/NFBooking/N11.webp", alt: "Booking screen" },
  { src: "/assets/projects/NFBooking/N12.webp", alt: "Booking screen" },
];

const BookingWebsite = () => (
  <CraftLayout
    index="Engineering · Design"
    area="Full-Stack · UX"
    title="Nail Fairy: Online Booking Website"
    sponsor="Live client project"
    tags={["React", "Node / Express", "MongoDB", "UX"]}
    lead="A calm, fast booking flow that turns phone-and-message bookings into self-serve, with strict slot validation and a mobile-first sequence."
    heroImage="/assets/projects/NFBooking/N2.webp"
    heroAlt="Nail Fairy booking screen"
    meta={{
      role: "Full-stack dev (React, Tailwind, Node) · UX · Deployment",
      team: "Solo (feedback from salon owners & staff)",
      timeline: "2025 (live pilot)",
      tools: "React, Tailwind, Node/Express, MongoDB, Vite, Vercel/Render",
    }}
  >
    <PartSwitch parts={PARTS} />

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

    <Part
      id="engineering"
      label="Engineering"
      intro="How the platform is built, where it runs, and how it became a second business's booking site."
    >
      <Chapter
        index="02"
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
        <Prose>
          <p>
            It is live across two locations, with 332+ appointments booked through it. Stripe payments are
            built but switched off for now.
          </p>
        </Prose>
      </Chapter>

      <Chapter id="penny-hill" index="03" title="One platform, a second business">
        <Prose>
          <p>
            Penny Hill Nail &amp; Spa in Hunslet, Leeds runs on a separate build of the same platform: its own
            services, look and location, with the same three-step booking flow (service, date and time,
            confirm). Live at{" "}
            <a
              href="https://pennyhillbooking.tuuhyped.co.uk"
              target="_blank"
              rel="noreferrer"
              className="text-cobalt underline underline-offset-4"
            >
              pennyhillbooking.tuuhyped.co.uk
            </a>
            .
          </p>
        </Prose>
        <TwoUp
          items={[
            {
              src: "/assets/projects/PennyHill/ph-home.webp",
              alt: "Penny Hill Nail & Spa booking site, home page",
              caption: "Penny Hill: home",
            },
            {
              src: "/assets/projects/PennyHill/ph-booking.webp",
              alt: "Penny Hill booking flow, step 1 of 3: choose your services",
              caption: "Booking, step 1 of 3",
            },
          ]}
        />
        <div className="mx-auto grid max-w-[560px] grid-cols-2 gap-3">
          <FullImage src="/assets/projects/PennyHill/ph-phone-home.webp" alt="Penny Hill home page on a phone" caption="Phone: home" />
          <FullImage
            src="/assets/projects/PennyHill/ph-phone-services.webp"
            alt="Penny Hill services list on a phone"
            caption="Phone: services"
          />
        </div>
      </Chapter>
    </Part>

    <Part
      id="design"
      label="Design"
      intro="The brand for the stall, and the booking flow customers use on their phones."
    >
      <Chapter index="04" title="The Nail Fairy brand">
        <Prose>
          <p>
            The Nail Fairy is a walk-in nail stall on Darley Street Market, Bradford, open since 2004. I made its
            first logo in 2024, then the full identity, finished in 2026. Nothing has been printed yet; the next
            Nail Fairy build will use it.
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Brand case study coming soon</p>
        </Prose>
      </Chapter>

      <Chapter index="05" title="A short, guided sequence">
        <Prose>
          <p>
            Service, staff (optional), date/time, contact, confirm. The
            interface keeps context visible and validates every step, so customers
            always know where they are and what is left.
          </p>
        </Prose>
      </Chapter>

      <Chapter
        index="06"
        title="Moments that make it feel effortless"
      >
        <TwoUp
          items={[
            {
              src: "/assets/projects/NFBooking/N3.webp",
              alt: "Services grid",
              caption: "Service browsing",
            },
            {
              src: "/assets/projects/NFBooking/N4.webp",
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
    </Part>

    <Chapter
      index="07"
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
          <ul className="mt-3 space-y-2 font-amiamie font-normal text-DarkLava/90 list-disc pl-5 marker:text-gold">
            <li>Payments and deposits</li>
            <li>Loyalty profiles</li>
            <li>Calendar sync with the POS</li>
          </ul>
        </div>
      </Reveal>
    </Chapter>

    <Chapter index="08" title="Selected screens">
      <Gallery images={galleryImages} />
    </Chapter>

    <RelatedProject
      to="/work/splento"
      label="AI Video Platform"
      title="UX for AI-generated restaurant promos"
      text="Mobile-first discovery, lightweight editing, clear licensing."
      image="/assets/projects/AIPlatform/aip0.webp"
      alt="AI video platform"
    />
  </CraftLayout>
);

export default BookingWebsite;

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
} from "../components/CaseStudy";

const PARTS = [
  { id: "engineering", label: "Engineering", anchors: ["penny-hill"] },
  { id: "design", label: "Design", anchors: ["brand"] },
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
    parts={PARTS}
    area="Full-Stack · UX"
    title="Nail Fairy: Online Booking Website"
    sponsor="Live client project"
    live="https://www.nailfairy.co.uk/"
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
      intro="How the platform is built and where it runs."
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

      {/* Another business on the same platform: kept to an aside so the page
          stays about one website. */}
      <aside
        id="penny-hill"
        className="scroll-mt-[136px] grid items-center gap-6 rounded-xl border border-line p-5 md:grid-cols-[1fr_1.4fr] md:p-6"
      >
        <a
          href="https://pennyhillbooking.tuuhyped.co.uk"
          target="_blank"
          rel="noreferrer"
          className="block overflow-hidden rounded-lg border border-line"
        >
          <img
            src="/assets/projects/PennyHill/ph-home.webp"
            alt="Penny Hill Nail & Spa booking site, home page"
            loading="lazy"
            className="block h-auto w-full"
          />
        </a>
        <div className="flex flex-col gap-2">
          <p className="eyebrow">Reused for a second business</p>
          <h3 className="text-xl font-semibold">Penny Hill Nail &amp; Spa</h3>
          <p className="leading-relaxed text-muted">
            A salon in Hunslet, Leeds runs on a separate build of this platform, with its own services, look and
            location, and the same three-step booking flow.
          </p>
          <a
            href="https://pennyhillbooking.tuuhyped.co.uk"
            target="_blank"
            rel="noreferrer"
            className="w-fit font-semibold text-cobalt underline underline-offset-4 hover:text-ink"
          >
            pennyhillbooking.tuuhyped.co.uk
          </a>
        </div>
      </aside>
    </Part>

    <Part
      id="design"
      label="Design"
      intro="The booking flow customers use on their phones, and the brand for the stall."
    >
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

      <Chapter id="brand" index="04" title="The Nail Fairy brand">
        <Prose>
          <p>
            The Nail Fairy is a walk-in nail stall on Darley Street Market, Bradford, open since 2004. I made its
            first logo in 2024, then the full identity, finished in 2026. Nothing has been printed yet; the next
            Nail Fairy build will use it.
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Brand case study coming soon</p>
        </Prose>
      </Chapter>
    </Part>

    <Chapter
      index={{ engineering: "03", design: "05" }}
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

    <Chapter index={{ engineering: "04", design: "06" }} title="Selected screens">
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

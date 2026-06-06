// src/pages/Nsms.jsx
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

const stats = [
  { value: "< 3s", label: "Common task time" },
  { value: "99%", label: "Test case pass" },
  { value: "4", label: "Core modules" },
  { value: "300+", label: "Build hours" },
];

const galleryImages = [
  { src: "/assets/projects/NSMS/NS1.png", alt: "NSMS screen" },
  { src: "/assets/projects/NSMS/NS5.png", alt: "NSMS screen" },
  { src: "/assets/projects/NSMS/NS6.png", alt: "NSMS screen" },
];

export default function Nsms() {
  return (
    <CraftLayout
      index="P · 02"
      area="Full-Stack · Desktop"
      title="POS System - NSMS"
      sponsor="University final project"
      tags={["Scheduling", "POS", "Inventory", "Reporting"]}
      lead="A fast desktop point-of-sale that keeps appointments, sales, and inventory in sync, with keyboard-first flows for busy front-desk staff."
      heroImage="/assets/projects/NSMS/NS4.png"
      heroAlt="NSMS dashboard"
      meta={{
        role: "Full-stack developer (solo)",
        team: "Owners · Front-desk · Technicians (stakeholder feedback)",
        timeline: "~300 hours · Feb–May 2024",
        tools:
          "C# (WinForms + Guna UI), SQL Server 2022, Stored Procedures, Git",
      }}
    >
      <Chapter
        index="01"
        kicker="Flow"
        title="From booking to checkout without context switching"
      >
        <Prose>
          <p>
            Appointments, walk-ins, and checkout live on one surface. Staff stay
            in a single mental model with fast navigation and clear validation.
          </p>
        </Prose>
        <Reveal>
          <ul className="font-amiamie font-light text-DarkLava/90 list-disc pl-5 marker:text-gold space-y-2 max-w-[60ch]">
            <li>Service selection → staff → time → confirm</li>
            <li>POS with quick add-ons and invoice printing</li>
            <li>Inventory with low-stock alerts</li>
            <li>Revenue dashboards by day / month / year</li>
          </ul>
        </Reveal>
        <Reveal>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-black/10 p-4"
              >
                <div className="font-amiamie font-black text-2xl text-black">
                  {s.value}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-SageGray">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Chapter>

      <Chapter index="02" kicker="Screens" title="The day-to-day surfaces">
        <TwoUp
          items={[
            {
              src: "/assets/projects/NSMS/NS2.png",
              alt: "NSMS calendar",
              caption: "Appointments — day/week with conflict checks",
            },
            {
              src: "/assets/projects/NSMS/NS3.png",
              alt: "NSMS inventory",
              caption: "Inventory — real-time status & low-stock",
            },
          ]}
        />
        <FullImage
          src="/assets/projects/NSMS/NS4.png"
          alt="NSMS reporting"
          caption="Reporting — KPIs powered by stored procedures"
        />
      </Chapter>

      <Chapter
        index="03"
        kicker="Outcome"
        title="Dependable ops for a high-traffic salon"
      >
        <Prose>
          <p>
            Stakeholders validated the workflow. The team adopted inventory
            alerts and relied on the dashboards for weekly decisions.
          </p>
        </Prose>
        <Reveal>
          <div className="rounded-2xl border border-black/10 bg-primary/40 p-6 md:p-8">
            <div className="text-[11px] uppercase tracking-[0.25em] text-SageGray">
              Next steps
            </div>
            <ul className="mt-3 space-y-2 font-amiamie font-light text-DarkLava/90 list-disc pl-5 marker:text-gold">
              <li>Role-based access and audit logs</li>
              <li>Deeper POS and scheduler linking</li>
              <li>Resizable UI for varied stations</li>
            </ul>
          </div>
        </Reveal>
      </Chapter>

      <Chapter index="04" kicker="Gallery" title="Selected screens">
        <Gallery images={galleryImages} />
      </Chapter>

      <RelatedProject
        to="/P3"
        label="Booking Website"
        title="A calm, fast booking flow for salons"
        text="Mobile-first flow with strict slot validation."
        image="/assets/projects/NFBooking/N1.png"
        alt="Booking website"
      />
    </CraftLayout>
  );
}

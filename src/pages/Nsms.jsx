// src/pages/Nsms.jsx
import React from "react";
import { Link } from "react-router-dom";
import CraftLayout from "./CraftLayout";

const StatCard = ({ value, label }) => (
  <div className="rounded-2xl border border-black/10 bg-white p-4">
    <div className="text-2xl font-semibold tracking-tight text-black">
      {value}
    </div>
    <div className="text-[11px] uppercase tracking-widest text-black/50">
      {label}
    </div>
  </div>
);

const Panel = ({ title, text, image, alt }) => (
  <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] items-center">
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-widest text-black/40">
        {title}
      </div>
      <p className="text-black/70 leading-relaxed">{text}</p>
    </div>
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
      <img
        src={image}
        alt={alt}
        loading="lazy"
        className="h-[220px] w-full object-cover object-top md:h-[260px]"
      />
    </div>
  </div>
);

export default function Nsms() {
  return (
    <CraftLayout
      title="POS System (NSMS)"
      sponsor="University Final Project"
      meta={{
        role: "Full-stack developer (solo)",
        team: "Owners - Front-desk - Technicians (stakeholder feedback)",
        timeline: "~300 hours - Feb-May 2024",
        tools: "C# (WinForms + Guna UI), SQL Server 2022, Stored Procedures, Git",
      }}
    >
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-black/10 bg-[#f4f4f2]">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#e6e6e0] blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#f0eee9] blur-3xl" />
        <div className="relative grid gap-8 p-6 md:p-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-5">
            <div className="text-[11px] uppercase tracking-[0.35em] text-black/50">
              POS System
            </div>
            <h1 className="text-3xl md:text-[40px] leading-tight font-semibold">
              A fast desktop POS that keeps appointments, sales, and inventory
              in sync
            </h1>
            <p className="text-black/70 leading-relaxed">
              Built for busy front-desk staff with keyboard-first flows, clear
              status cues, and reliable reporting powered by stored procedures.
            </p>
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-widest text-black/50">
              {[
                "Scheduling",
                "POS",
                "Inventory",
                "Reporting",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-black/10 bg-white px-3 py-1"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
            <img
              src="/assets/projects/NSMS/NS4.png"
              alt="NSMS dashboard"
              loading="lazy"
              className="h-[240px] w-full object-cover object-top md:h-[300px]"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-4 md:grid-cols-4">
        <StatCard value="< 3s" label="Common task time" />
        <StatCard value="99%" label="Test case pass" />
        <StatCard value="4" label="Core modules" />
        <StatCard value="300+" label="Build hours" />
      </section>

      {/* Core flow */}
      <section className="grid gap-10 md:grid-cols-2">
        <div className="space-y-3">
          <div className="text-[11px] uppercase tracking-[0.35em] text-black/50">
            Flow
          </div>
          <h2 className="text-2xl md:text-[32px] font-semibold">
            From booking to checkout without context switching
          </h2>
          <p className="text-black/70 leading-relaxed">
            Appointments, walk-ins, and checkout live in one surface. Staff stay
            in a single mental model with fast navigation and clear validation.
          </p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white p-5">
          <ul className="space-y-2 text-black/70">
            <li>Service selection - staff - time - confirm</li>
            <li>POS with quick add-ons and invoice printing</li>
            <li>Inventory with low-stock alerts</li>
            <li>Revenue dashboards by day/month/year</li>
          </ul>
        </div>
      </section>

      {/* Screens */}
      <section className="space-y-8">
        <Panel
          title="Appointments"
          text="Day/Week views with conflict checks and quick add for walk-ins so front-desk stays fast."
          image="/assets/projects/NSMS/NS2.png"
          alt="NSMS calendar"
        />
        <Panel
          title="Inventory"
          text="Real-time item status with images and low-stock indicators for quick answers."
          image="/assets/projects/NSMS/NS3.png"
          alt="NSMS inventory"
        />
        <Panel
          title="Reporting"
          text="KPIs and charts powered by stored procedures for reliable daily decisions."
          image="/assets/projects/NSMS/NS4.png"
          alt="NSMS reporting"
        />
      </section>

      {/* Outcome */}
      <section className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <div className="text-[11px] uppercase tracking-[0.35em] text-black/50">
            Outcome
          </div>
          <h2 className="text-2xl md:text-[32px] font-semibold">
            Dependable ops for a high-traffic salon
          </h2>
          <p className="text-black/70 leading-relaxed">
            Stakeholders validated the workflow. The team adopted inventory
            alerts and relied on dashboards for weekly decisions.
          </p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white p-6">
          <div className="text-xs uppercase tracking-widest text-black/40">
            Next steps
          </div>
          <ul className="mt-3 space-y-2 text-black/70">
            <li>Role-based access and audit logs</li>
            <li>Deeper POS and scheduler linking</li>
            <li>Resizable UI for varied stations</li>
          </ul>
        </div>
      </section>

      {/* Next project */}
      <section className="mt-10">
        <div className="text-neutral-500 mb-2">Next project:</div>
        <Link
          to="/P3"
          className="group block rounded-3xl border border-black/10 bg-white p-5 md:p-6 hover:border-black/20 transition"
        >
          <div className="grid gap-5 md:grid-cols-[1fr_1fr] items-center">
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-widest text-black/40">
                Java 2D Game
              </div>
              <div className="text-xl md:text-2xl font-semibold">
                A classic side-scroller built from scratch
              </div>
              <div className="text-sm text-black/60">
                Hand-rolled engine, collision system, and sprite animation.
              </div>
              <div className="inline-flex items-center gap-2 text-sm font-medium text-black/70 group-hover:text-black">
                View project <span aria-hidden>&gt;</span>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-black/10 bg-neutral-100">
              <div className="aspect-[16/9] w-full">
                <img
                  src="/assets/projects/Game2D/G1.2.png"
                  alt="2D game"
                  loading="lazy"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </Link>
      </section>
    </CraftLayout>
  );
}

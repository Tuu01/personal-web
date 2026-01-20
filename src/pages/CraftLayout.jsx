import React from "react";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import GridLinesGlobal from "../components/GridLinesGlobal";
import ReactLenis from "lenis/react";

const CraftLayout = ({ title, sponsor, meta, heroImage, children }) => (
  <ReactLenis
    root
    className="relative w-screen min-h-screen overflow-x-hidden bg-white"
  >
    <GridLinesGlobal />
    <div className="relative z-20">
      <Navbar />

      {/* Hero Image */}
      {heroImage && (
        <div className="w-full max-w-[60vw] mx-auto mt-8">
          <div className="aspect-[16/9] overflow-hidden rounded-2xl border border-neutral-200">
            <img
              src={heroImage}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      )}

      <main className="max-w-[92vw] md:max-w-[76vw] mx-auto px-4 sm:px-6 md:px-8 py-20 space-y-16">
        {/* Hero Header */}
        <div>
          {sponsor && (
            <span className="text-sm text-neutral-600">{sponsor}</span>
          )}
          <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
        </div>

        {/* Metadata Block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-neutral-600">
          {meta.role && (
            <div>
              <span className="font-semibold">Role</span>
              <p>{meta.role}</p>
            </div>
          )}
          {meta.team && (
            <div>
              <span className="font-semibold">Team</span>
              <p>{meta.team}</p>
            </div>
          )}
          {meta.timeline && (
            <div>
              <span className="font-semibold">Timeline</span>
              <p>{meta.timeline}</p>
            </div>
          )}
          {meta.tools && (
            <div>
              <span className="font-semibold">Tools</span>
              <p>{meta.tools}</p>
            </div>
          )}
        </div>

        {children}
      </main>

      {/* Final thicker divider */}
      <div className="relative max-w-[80vw] mx-auto border-b border-neutral-200">
        <div className="w-full h-px bg-neutral-200" />
        <div className="py-10 px-4"></div>

        {/* Same dashed vertical lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 bottom-0 left-1/4 w-px border-l border-dashed border-black/5" />
          <div className="absolute top-0 bottom-0 left-1/2 w-px border-l border-dashed border-black/5" />
          <div className="absolute top-0 bottom-0 left-3/4 w-px border-l border-dashed border-black/5" />
        </div>
      </div>

      <Footer />
    </div>
  </ReactLenis>
);

export default CraftLayout;

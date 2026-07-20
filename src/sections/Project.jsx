// Importing React and required hooks and libraries
import React, { useEffect, useState, useRef } from "react";
import clsx from "clsx"; // Utility to conditionally join classNames
import {
  AnimatePresence,
  motion,
  useScroll,
  useReducedMotion,
} from "framer-motion";
import { Link } from "react-router-dom";

// Sample project data (title, description, role, year, images)
const projects = [
  {
    title: "Badminton Queue",
    to: "/P5",
    description:
      "A match-running app for a Saturday badminton club. It scores every possible game to pick fair, even teams, runs the live queue courtside, and tracks skill with TrueSkill. Built from scratch and shipped. ~30 players.",
    role: "Product Design | Next.js | TypeScript | Firestore",
    year: "2026",
    images: [
      "/assets/projects/BadmintonQueue/bq1.png",
      "/assets/projects/BadmintonQueue/bq2.png",
      "/assets/projects/BadmintonQueue/bq3.png",
      "/assets/projects/BadmintonQueue/bq4.png",
      "/assets/projects/BadmintonQueue/bq5.png",
      "/assets/projects/BadmintonQueue/bq6.png",
      "/assets/projects/BadmintonQueue/bq7.png",
    ],
  },
  {
    title: "AI Video Platform",
    to: "/P4",
    description:
      "User-centred design for a mobile-first platform delivering AI-generated promo videos to restaurants. MSc group project with Splento.",
    role: "UX Research | Interaction Design | Figma",
    year: "2026",
    images: [
      "/assets/projects/AIPlatform/aip1.png",
      "/assets/projects/AIPlatform/aip2.png",
      "/assets/projects/AIPlatform/aip3.png",
      "/assets/projects/AIPlatform/aip4.png",
      "/assets/projects/AIPlatform/aip5.png",
      "/assets/projects/AIPlatform/aip6.png",
      "/assets/projects/AIPlatform/aip0.png",
    ],
  },
  {
    title: "Booking Website",
    to: "/P1",
    description: "Developed and deployed a fully functional booking system.",
    role: "React.js | MongoDB | Tailwind CSS",
    year: "2025",
    images: [
      "/assets/projects/NFBooking/N1.png",
      "/assets/projects/NFBooking/N5.png",
      "/assets/projects/NFBooking/N3.png",
      "/assets/projects/NFBooking/N4.png",
      "/assets/projects/NFBooking/N2.png",
      "/assets/projects/NFBooking/N6.png",
      "/assets/projects/NFBooking/N7.png",
      "/assets/projects/NFBooking/N8.png",
      "/assets/projects/NFBooking/N9.png",
      "/assets/projects/NFBooking/N10.png",
      "/assets/projects/NFBooking/N11.png",
      "/assets/projects/NFBooking/N12.png",
    ],
  },
  {
    title: "POS System",
    to: "/P2",
    description:
      "Built a desktop application to manage bookings, sales, staff, inventory, and reporting.",
    role: "C# | SQL Server | Guna UI Framework",
    year: "2024",
    images: [
      "/assets/projects/NSMS/NS4.png",
      "/assets/projects/NSMS/NS2.png",
      "/assets/projects/NSMS/NS3.png",
      "/assets/projects/NSMS/NS1.png",
      "/assets/projects/NSMS/NS5.png",
      "/assets/projects/NSMS/NS6.png",
    ],
  },
  {
    title: "2D Game",
    to: "/P3",
    description:
      "Developed a desktop 2D action-platformer with a main character and multiple enemies, levels.",
    role: "Java | City Engine",
    year: "2022",
    images: [
      "/assets/projects/Game2D/G1.2.png",
      "/assets/projects/Game2D/G2.2.png",
      "/assets/projects/Game2D/G3.2.png",
      "/assets/projects/Game2D/G4.2.png",
      "/assets/projects/Game2D/G5.2.png",
      "/assets/projects/Game2D/G6.2.png",
    ],
  },
];

// This component renders the S/M/L size toggle buttons
const SMLToggle = ({ size, setSize, className = "" }) => (
  <div className={`mt-4 md:mt-6 self-start ${className}`}>
    <div className="inline-flex border rounded-full px-3 py-1 md:px-4 md:py-1.5 gap-2 md:gap-3 text-xs md:text-base items-center bg-white/90 backdrop-blur shadow-lg">
      {/* Render buttons for each size option */}
      {["S", "M", "L"].map((label) => (
        <button
          key={label}
          onClick={() => setSize(label)} // Update size state when clicked
          className={clsx(
            // min-h-10 keeps the tap target usable on touch; desktop keeps
            // the tighter pill.
            "min-h-10 px-3.5 py-1 sm:min-h-0 sm:px-2.5 md:px-3 md:py-1.5 rounded-full font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
            size === label
              ? "bg-black text-white" // Active button styling
              : "text-black hover:bg-black/10" // Inactive button styling
          )}
        >
          {label}
        </button>
      ))}
    </div>
  </div>
);

// A single grid tile. `layout` animates the S/M/L density change the FLIP
// way (measure, reflow, tween the delta with transforms). `layoutId` on the
// image is what lets it fly into the lightbox and back.
const Thumbnail = ({ src, index, reduceMotion, onOpen }) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // A cached image can finish before React attaches onLoad.
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <motion.div
      layout={!reduceMotion}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="aspect-[3/2]"
    >
      {/* One hover signal only: the border reveal. The scale-up it
          used to pair with was the second, redundant one. */}
      <div className="relative w-full h-full group">
        {/* Border layers (invisible by default) */}
        <div className="absolute inset-0 rounded-[2px] border-[2px] border-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
        <div className="absolute inset-[2px] rounded-[2px] border-[2px] border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />

        {/* Image */}
        <button
          type="button"
          onClick={() => onOpen(src)}
          className="w-full h-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60 rounded-[2px]"
          aria-label={`Open project image ${index + 1}`}
        >
          <motion.img
            ref={imgRef}
            layoutId={reduceMotion ? undefined : `project-image-${src}`}
            src={src}
            alt={`Project image ${index + 1}`}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className={clsx(
              "w-full h-full object-cover rounded-[2px] relative z-0 transition-opacity duration-500",
              loaded ? "opacity-100" : "opacity-0"
            )}
          />
        </button>
      </div>
    </motion.div>
  );
};

// This component renders each individual project section
const ProjectItem = ({ project, size, setSize, setEnlargedImage }) => {
  const ref = useRef(); // Reference to this section for scroll tracking
  const reduceMotion = useReducedMotion();

  // Setup scroll tracking for animation
  useScroll({
    target: ref,
    offset: ["start end", "end start"], // Trigger range for animation
  });

  // Define how many columns of images to show per size
  const gridCols = {
    S: "grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4",
    M: "grid-cols-2 sm:grid-cols-2 gap-4 md:gap-6",
    L: "grid-cols-1 gap-6 md:gap-8",
  };

  return (
    // Wrapper for the entire project section
    <section
      ref={ref}
      className="relative w-full flex flex-col md:flex-row pt-0 max-w-[92vw] md:max-w-[80vw] mx-auto bg-paper"
    >
      {/* LEFT PANEL: Title + Toggle button area */}
      <div className="w-full md:w-[40%] xl:w-[34%] flex flex-col justify-between">
        {/*border border-red-500*/}

        {/* Mobile header: title + toggle on one row */}
        <div className="flex items-start justify-between gap-4 px-4 sm:px-6 pt-6 md:hidden">
          <Link
            to={project.to}
            className="group block cursor-pointer w-fit rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          >
            <h2 className="text-3xl sm:text-4xl leading-[0.95] font-bold tracking-tight break-words transition-colors duration-300 group-hover:text-gold">
              {project.title.split(" ").map((word, i) => (
                <div key={i}>{word}</div>
              ))}
            </h2>
            {/* Always visible: a hover-only label is invisible on touch.
                The rule grows via scale-x, so nothing reflows. */}
            <span className="mt-2 inline-block">
              <span className="block text-[11px] uppercase tracking-[0.2em] text-SageGray/70 transition-colors duration-300 group-hover:text-SageGray">
                View project
              </span>
              <span
                aria-hidden
                className="mt-1 block h-px w-8 origin-left bg-SageGray/40 transition-transform duration-300 ease-out group-hover:scale-x-[2.5]"
              />
            </span>
          </Link>
          <SMLToggle size={size} setSize={setSize} />
        </div>

        {/* Sticky Title */}
        <div className="hidden md:block md:sticky md:top-0 px-4 sm:px-6 md:px-[clamp(32px,6vw,48px)] pt-6 md:pt-[4vh] z-20 bg-paper max-w-none md:max-w-[26rem]">
          <Link
            to={project.to}
            className="group block cursor-pointer w-fit rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-6xl 2xl:text-7xl leading-[0.95] font-bold tracking-tight break-words transition-colors duration-300 group-hover:text-gold">
              {project.title.split(" ").map((word, i) => (
                <div key={i}>{word}</div>
              ))}
            </h2>
            {/* Always visible: a hover-only label is invisible on touch.
                The rule grows via scale-x, so nothing reflows. */}
            <span className="mt-3 inline-block">
              <span className="block text-xs uppercase tracking-[0.2em] text-SageGray/70 transition-colors duration-300 group-hover:text-SageGray">
                View project
              </span>
              <span
                aria-hidden
                className="mt-1.5 block h-px w-10 origin-left bg-SageGray/40 transition-transform duration-300 ease-out group-hover:scale-x-[2.5]"
              />
            </span>
          </Link>
        </div>

        {/* Sticky Toggle */}
        <div className="hidden md:block md:sticky md:bottom-0 px-4 sm:px-6 md:px-[clamp(32px,6vw,48px)] pb-4 z-10">
          <SMLToggle size={size} setSize={setSize} />
        </div>
      </div>

      {/* RIGHT SIDE: Description, role, year, and image grid */}
      <div className="w-full md:w-[60%] xl:w-[66%] flex flex-col gap-6 px-4 sm:px-6 md:px-0 md:pl-0 md:pr-[1vw] pt-6 md:pt-[4vh]">
        {/* Project meta info */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between text-xs sm:text-sm md:text-sm text-black/70 leading-relaxed mb-2">
          <span className="mb-1 md:mb-0 md:mr-4 max-w-xs">
            {project.description}
          </span>
          <span className="mb-1 md:mb-0 md:mr-4 whitespace-nowrap">
            {project.role}
          </span>
          <span className="whitespace-nowrap">{project.year}</span>
        </div>

        {/* Image gallery with layout depending on S/M/L */}
        <div
          className={clsx(
            // No transition here: this animates grid tracks and gap, which
            // are layout properties. Only transform/opacity should animate.
            "grid mb-16 md:mb-24",
            gridCols[size] || "grid-cols-1"
          )}
        >
          {/* Loop through and render images. `layout` animates the S/M/L
              density change the FLIP way: measure, reflow, then tween the
              delta with transforms. Nothing animates a layout property. */}
          {project.images.map((src, i) => (
            <Thumbnail
              key={src}
              src={src}
              index={i}
              reduceMotion={reduceMotion}
              onOpen={setEnlargedImage}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// The parent component that renders all projects
const Project = ({ enlargedImage, setEnlargedImage }) => {
  // Phones start at M. At 375px the S grid renders 99x66px tiles, which is
  // too small to read a UI screenshot. Desktop still opens on S.
  const [size, setSize] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 640px)").matches
      ? "M"
      : "S"
  );
  const closeButtonRef = useRef(null);
  const previouslyFocusedRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!enlargedImage) {
      return;
    }

    // Remember where focus came from, then move it into the dialog.
    previouslyFocusedRef.current = document.activeElement;
    closeButtonRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setEnlargedImage(null);
        return;
      }
      // Close is the only focusable control in here, so Tab stays on it
      // rather than walking the page behind the overlay.
      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocusedRef.current?.focus?.();
    };
  }, [enlargedImage, setEnlargedImage]);

  return (
    <div className="flex flex-col">
      {projects.map((proj, i) => (
        <div key={i}>
          {/* Project Item */}
          <ProjectItem
            project={proj}
            size={size}
            setSize={setSize}
            setEnlargedImage={setEnlargedImage}
          />

          {/* Divider between projects */}
          {i < projects.length - 1 ? (
            // Normal divider
            <div className="relative max-w-[92vw] md:max-w-[80vw] mx-auto border-b border-neutral-200">
              <div className="w-full h-px bg-neutral-200" />
              <div className="py-5 px-4"></div>
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 bottom-0 left-1/4 w-px border-l border-dashed border-black/5" />
                <div className="absolute top-0 bottom-0 left-1/2 w-px border-l border-dashed border-black/5" />
                <div className="absolute top-0 bottom-0 left-3/4 w-px border-l border-dashed border-black/5" />
              </div>
            </div>
          ) : (
            // Final thicker divider with same grid
            <div className="relative max-w-[92vw] md:max-w-[80vw] mx-auto border-b border-neutral-200">
              <div className="w-full h-px bg-neutral-200" />
              <div className="py-10 px-4"></div>

              {/* Same dashed vertical lines */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 bottom-0 left-1/4 w-px border-l border-dashed border-black/5" />
                <div className="absolute top-0 bottom-0 left-1/2 w-px border-l border-dashed border-black/5" />
                <div className="absolute top-0 bottom-0 left-3/4 w-px border-l border-dashed border-black/5" />
              </div>
            </div>
          )}
        </div>
      ))}

      <AnimatePresence>
        {enlargedImage && (
          <motion.div
            key="lightbox"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged project image"
            onClick={() => setEnlargedImage(null)}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setEnlargedImage(null)}
              className="absolute top-4 right-4 z-10 inline-flex min-h-10 items-center rounded-full bg-white/90 px-4 py-1 text-sm text-black hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="Close enlarged image"
            >
              Close
            </button>
            {/* Same layoutId as the thumbnail: the tile flies here and back. */}
            <motion.img
              layoutId={
                reduceMotion ? undefined : `project-image-${enlargedImage}`
              }
              src={enlargedImage}
              alt="Enlarged project"
              className="max-w-[92vw] max-h-[72dvh] sm:max-w-[75vw] sm:max-h-[75dvh] object-contain rounded-[2px] shadow-xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Project;

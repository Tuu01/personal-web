// Importing React and required hooks and libraries
import React, { useState, useRef } from "react";
import clsx from "clsx"; // Utility to conditionally join classNames
import { motion, useInView, useScroll, useTransform } from "framer-motion";


// Sample project data (title, description, role, year, images)
const projects = [
  {
    title: "Booking Website",
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
    title: "Management Software",
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
const SMLToggle = ({ size, setSize }) => (
  <div className="mt-6 self-start">
    <div className="inline-flex border rounded-full px-4 py-1 gap-3 text-base items-center bg-white/90 backdrop-blur shadow-lg">
      {/* Render buttons for each size option */}
      {["S", "M", "L"].map((label) => (
        <button
          key={label}
          onClick={() => setSize(label)} // Update size state when clicked
          className={clsx(
            "px-3 py-1.5 rounded-full font-bold transition-colors",
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

// This component renders each individual project section
const ProjectItem = ({ project, size, setSize, setEnlargedImage }) => {
  const ref = useRef(); // Reference to this section for scroll tracking

  // Setup scroll tracking for animation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // Trigger range for animation
  });

  // Create Y movement animation for title (parallax effect)
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  // Define how many columns of images to show per size
  const gridCols = {
    S: "grid-cols-4 gap-2", // Small = 4 columns
    M: "grid-cols-2 gap-6", // Medium = 2 columns
    L: "grid-cols-1 gap-8", // Large = 1 column
  };

  return (
    // Wrapper for the entire project section
    <section
      ref={ref}
      className="relative w-full flex flex-col md:flex-row pt-0 max-w-[80vw] mx-auto bg-[#ffffff]"
    >
      {/* LEFT PANEL: Title + Toggle button area */}
      <div className="w-full md:w-[40%] pr-0 md:pr-0 flex flex-col justify-between">
        {/*border border-red-500*/}

        {/* Sticky Title */}
        <div className="sticky top-0 px-[clamp(55px,-15vw,48px)] pt-[4vh] z-20 bg-[#ffffff] max-w-[20rem]">
          <h2 className="text-4xl md:text-6xl leading-[0.95] font-bold tracking-tight">
            {project.title.split(" ").map((word, i) => (
              <div key={i}>{word}</div>
            ))}
          </h2>
        </div>

        {/* Sticky Toggle */}
        <div className="sticky bottom-0 px-[clamp(55px,-15vw,48px)] pb-4 z-10">
          <SMLToggle size={size} setSize={setSize} />
        </div>
      </div>

      {/* RIGHT SIDE: Description, role, year, and image grid */}
      {/* <div className="w-full md:w-[70%] flex flex-col gap-6"> */}
      <div className="w-full md:w-[70%] flex flex-col gap-6 pl-[0vw] pr-[1vw] pt-[4vh]">
        {/* Project meta info */}
        <div className="flex flex-col md:flex-row justify-between text-sm text-black/80 leading-relaxed mb-2">
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
            "grid transition-all duration-500 mb-30", // Smooth transition on toggle
            gridCols[size] || "grid-cols-1" // Fallback to 1 column
          )}
        >
          {/* Loop through and render images */}
          {project.images.map((src, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.015 }}
              className="aspect-[3/2] transition-all duration-300"
            >
              <div className="relative w-full h-full group">
                {/* Border layers (invisible by default) */}
                <div className="absolute inset-0 rounded-[2px] border-[2px] border-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
                <div className="absolute inset-[2px] rounded-[2px] border-[2px] border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />

                {/* Image */}
                <img
                  src={src}
                  alt={`img-${i}`}
                  onClick={() => setEnlargedImage(src)}
                  className="w-full h-full object-cover rounded-[2px] relative z-0"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// The parent component that renders all projects
const Project = ({ enlargedImage, setEnlargedImage }) => {
  const [size, setSize] = useState("S");

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
            <div className="relative max-w-[80vw] mx-auto border-b border-neutral-200">
              <div className="w-full h-px bg-neutral-200" />
              <div className="py-5 px-4"></div>
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 bottom-0 left-[20vw] w-px border-l border-dashed border-black/5" />
                <div className="absolute top-0 bottom-0 left-[40vw] w-px border-l border-dashed border-black/5" />
                <div className="absolute top-0 bottom-0 left-[60vw] w-px border-l border-dashed border-black/5" />
              </div>
            </div>
          ) : (
            // Final thicker divider with same grid
            <div className="relative max-w-[80vw] mx-auto border-b border-neutral-200">
              <div className="w-full h-px bg-neutral-200" />
              <div className="py-10 px-4"></div>

              {/* Same dashed vertical lines */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 bottom-0 left-[20vw] w-px border-l border-dashed border-black/5" />
                <div className="absolute top-0 bottom-0 left-[40vw] w-px border-l border-dashed border-black/5" />
                <div className="absolute top-0 bottom-0 left-[60vw] w-px border-l border-dashed border-black/5" />
              </div>
            </div>
          )}
        </div>
      ))}

      {enlargedImage && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={() => setEnlargedImage(null)}
        >
          <img
            src={enlargedImage}
            alt="enlarged"
            className="max-w-[75vw] max-h-[75vh] object-contain rounded-[2px] shadow-xl"
          />
        </div>
      )}
    </div>
  );
};

export default Project;

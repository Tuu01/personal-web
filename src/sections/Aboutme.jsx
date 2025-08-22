import React, { useState } from "react";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import GridLinesGlobal from "../components/GridLinesGlobal";

const sections = [
  {
    title: "Background",
    content: (
      <>
        I’m Trong Tu Luu, a Computer Science graduate from City, University of
        London. I specialize in turning small business challenges into scalable
        tech solutions. From booking platforms for nail salons to custom
        management systems and 2D game engines, I focus on building practical,
        full-stack applications that solve real problems with clean design and
        reliable performance.
      </>
    ),
  },
  {
    title: "Product Thinking",
    content: (
      <>
        I approach projects with both a developer’s precision and an operator’s
        mindset. Running multi-location nail salons has taught me that software
        only matters if it solves real problems fast—whether that’s reducing
        no-shows, cutting admin work, or helping owners make data-driven
        decisions. My goal is to design systems that are clean, intuitive, and
        practical: tools staff actually want to use, and businesses can rely on
        every day.
      </>
    ),
  },
  {
    title: "Things I Love",
    content: (
      <>
        Outside of coding, I enjoy <strong>photography</strong>,{" "}
        <strong>cinematic videography</strong>, and crafting social media
        content. You’ll often find me running, training at the gym, or playing
        badminton. I’m also constantly learning about <strong>AI</strong> and{" "}
        <strong>automation</strong>, always thinking of new ways to build
        smarter solutions.
      </>
    ),
  },
];

const About = () => {
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggleSection = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

  const [openSections, setOpenSections] = useState(
    Array(sections.length).fill(false)
  );

  const toggleSection = (index) => {
    setOpenSections((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };

  return (
    <div className="relative min-h-screen bg-white text-black">
      {/* Grid Lines */}
      <GridLinesGlobal />

      {/* Page Content */}
      <div className="relative z-20">
        <Navbar />
        <main className="max-w-3xl mx-auto px-6 py-30">
          <h1 className="text-4xl font-bold mb-4">Trong Tu Luu</h1>
          <p className="text-lg font-light mb-12 text-black/60">
            Computer Science graduate & full-stack developer. Passionate about
            building real-world systems, scaling small businesses with tech, and
            blending design with automation. Currently helping local brands
            digitize their services and grow online.
          </p>

          {sections.map((sec, i) => (
            <div key={i} className="border-b border-black/10 py-6">
              <button
                onClick={() => toggleSection(i)}
                className="w-full flex justify-between items-center text-left text-lg font-medium"
              >
                {sec.title}
                <span className="text-xl">
                  {openSections === i ? "×" : "+"}
                </span>
              </button>
              {openSections[i] && (
                <div className="mt-4 text-black/60 leading-relaxed text-base">
                  {sec.content}
                </div>
              )}
            </div>
          ))}
        </main>

        <div className="py-2 px-4"></div>

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
        <Footer />
      </div>
    </div>
  );
};

export default About;

// Home.jsx
import React, { useState } from "react";
import { useReducedMotion } from "framer-motion";
import Navbar from "../sections/Navbar";
import Hero from "../sections/Hero";
import Project from "../sections/Project";
import CraftSection from "../sections/Craft";
import Footer from "../sections/Footer";
import GridLinesGlobal from "../components/GridLinesGlobal";
import ReactLenis from "lenis/react";

const Home = () => {
  const [enlargedImage, setEnlargedImage] = useState(null);
  const reduceMotion = useReducedMotion();

  return (
    <ReactLenis
      root
      options={{ smoothWheel: !reduceMotion }}
      className="relative w-full min-h-dvh bg-paper"
    >
      <GridLinesGlobal hidden={!!enlargedImage} />
      {/* The page paints immediately; the 3D hero fades itself in once its
          assets land, rather than holding the whole document behind a gate. */}
      <div className="relative z-20">
        <Navbar />
        <Hero />
        <CraftSection />
        <Project
          enlargedImage={enlargedImage}
          setEnlargedImage={setEnlargedImage}
        />
        <Footer />
      </div>
    </ReactLenis>
  );
};

export default Home;

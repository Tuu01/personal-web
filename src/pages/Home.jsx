// Home.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../sections/Navbar";
import Hero from "../sections/Hero";
import Project from "../sections/Project";
import CraftSection from "../sections/Craft";
import Footer from "../sections/Footer";
import GridLinesGlobal from "../components/GridLinesGlobal";
import ReactLenis from "lenis/react";
import { useProgress } from "@react-three/drei";


const Home = () => {
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState(null); 

  useEffect(() => {
    if (progress === 100) {
      setIsReady(true);
    }
  }, [progress]);

  return (
    <ReactLenis
      root
      className="relative w-screen min-h-screen overflow-x-auto bg-white"
    >
      {/* <GridLinesGlobal /> */}
      <GridLinesGlobal hidden={!!enlargedImage} />
      <div className="relative z-20">
        {!isReady && (
          <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 font-light">
            <p className="mb-4 text-xl tracking-widest animate-pulse">
              Loading {Math.floor(progress)}%
            </p>
            <div className="relative h-1 overflow-hidden rounded w-60 bg-white/20">
              <div
                className="absolute top-0 left-0 h-full transition-all duration-300 bg-white"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
        <div
          className={`${
            isReady ? "opacity-100" : "opacity-0"
          } transition-opacity duration-1000`}
        >
          <Navbar />
          <Hero />
          <CraftSection />
          <Project enlargedImage={enlargedImage} setEnlargedImage={setEnlargedImage}/>
          <Footer />
          {/* <ServiceSummary /> */}
          {/* <Services /> */}
          {/* <About /> */}
          {/* <Works /> */}
          {/* <ContactSummary /> */}
          {/* <Contact /> */}
        </div>
      </div>
    </ReactLenis>
  );
};

export default Home;

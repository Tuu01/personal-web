import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Mac } from "../components/Mac";
import { Environment, Float, useProgress } from "@react-three/drei";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useReducedMotion } from "framer-motion";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1024 });
  const isWide = useMediaQuery({ minWidth: 1280 });
  const reduceMotion = useReducedMotion();

  // Scoped to the canvas only; the rest of the page never waits on this.
  const { active, progress, total, errors } = useProgress();
  const [modelReady, setModelReady] = useState(false);

  useEffect(() => {
    if (total === 0 || errors.length > 0) {
      setModelReady(true);
      return;
    }
    if (!active && progress >= 100) {
      setModelReady(true);
    }
  }, [active, errors.length, progress, total]);

  const macScale = isMobile ? 0.42 : isTablet ? 0.45 : isWide ? 0.6 : 0.5;
  const macY = isMobile ? -0.5 : isTablet ? -0.4 : isWide ? -0.37 : -0.33;
  const cameraPos = isMobile
    ? [0, 0.85, 5.2]
    : isTablet
      ? [0, 0.95, 4.6]
      : [0, 1, 4];
  const cameraFov = isMobile ? 38 : isTablet ? 36 : 35;

  const mac = (
    <group scale={macScale} position={[0, macY, 0]}>
      <Mac />
    </group>
  );

  return (
    <div className="relative h-[55dvh] sm:h-[60dvh] md:h-[80dvh] 2xl:h-[85dvh] w-full">
      <div
        className={`h-full w-full transition-opacity duration-700 ${
          modelReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <Canvas
          shadows
          gl={{ alpha: true }}
          camera={{ position: cameraPos, fov: cameraFov }}
          dpr={[1, 1.5]} // Slightly higher for clearer text
        >
          <Environment preset="city" background={false} />
          <color attach="background" args={["#fdfcfa"]} />
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[0, 2, 2]} // from top-front
            intensity={1.5}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          {/* FLOATING MACBOOK: held still when the visitor asks for less motion */}
          {reduceMotion ? (
            mac
          ) : (
            <Float speed={1.5} floatIntensity={1} rotationIntensity={1}>
              {mac}
            </Float>
          )}
        </Canvas>
      </div>

      <div className="absolute bottom-10 right-8 md:right-[24vw] md:bottom-[14vh] flex items-start gap-2 md:gap-4">
        <div className="hidden md:block w-px h-[1.4rem] bg-black/30 translate-y-[1px]" />
        <div className="text-[11px] sm:text-xs md:text-base font-medium leading-snug text-black/50 text-left">
          <p>I simplify, I humanize.</p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 group text-black/50 hover:text-black transition-colors duration-300 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          >
            <span className="underline underline-offset-4 group-hover:text-black">
              More about me
            </span>
            <span
              className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-black/20 group-hover:border-black/60 transition-colors"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 16 16"
                className="w-3 h-3 text-black/60 group-hover:text-black"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 8h6" />
                <path d="M9 5l3 3-3 3" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;

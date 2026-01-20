import { Canvas } from "@react-three/fiber";
import { Mac } from "../components/Mac";
import { Environment, Float } from "@react-three/drei";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1024 });
  const isWide = useMediaQuery({ minWidth: 1280 });

  const macScale = isMobile ? 0.36 : isTablet ? 0.45 : isWide ? 0.6 : 0.5;
  const macY = isMobile ? -0.55 : isTablet ? -0.45 : isWide ? -0.28 : -0.38;
  const cameraPos = isMobile
    ? [0, 0.85, 5.2]
    : isTablet
      ? [0, 0.95, 4.6]
      : [0, 1, 4];
  const cameraFov = isMobile ? 38 : isTablet ? 36 : 35;

  return (
    <div className="relative h-[55vh] sm:h-[60vh] md:h-[80vh] 2xl:h-[85vh] w-full">
      <Canvas
        shadows
        gl={{ alpha: true }}
        camera={{ position: cameraPos, fov: cameraFov }}
        dpr={[1, 1.5]} // Slightly higher for clearer text
      >
        <Environment preset="city" background={false} />
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[0, 2, 2]} // from top-front
          intensity={1.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* FLOATING MACBOOK */}
        <Float speed={1.5} floatIntensity={1} rotationIntensity={1}>
          <group scale={macScale} position={[0, macY, 0]}>
            <Mac />
          </group>
        </Float>
      </Canvas>

      <div className="absolute bottom-6 right-4 md:right-[19vw] md:bottom-[12vh] flex items-start gap-2 md:gap-4">
        <div className="w-px h-5 md:h-[1.4rem] bg-black/30 translate-y-[1px]" />
        <div className="text-xs sm:text-sm md:text-base font-medium leading-snug text-black/50 text-left">
          <p>I simplify, I humanize.</p>
          <Link
            to="/about"
            className="inline-flex items-center gap-1 group text-black/50 hover:text-black transition-colors duration-300"
          >
            <span className="underline underline-offset-4 group-hover:text-black">
              More about me
            </span>
            <span className="no-underline">-&gt;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
import { Canvas } from "@react-three/fiber";
import { Mac } from "../components/Mac";
import {
  Environment,
  Float,
  Text,
  MeshDistortMaterial,
} from "@react-three/drei";
import GridLinesDashed from "../components/GridLinesDashed";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative h-[60vh] md:h-[80vh] w-full">
      <GridLinesDashed />
      <Canvas
        shadows
        gl={{ alpha: true }}
        camera={{ position: [0, 1, 4], fov: 35 }}
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

        {/* BACK TEXT — now emissive and thick for better clarity */}
        {/* <Text
          fontSize={0.5}
          position={[0, 0.0, -1.5]} // Behind Mac
          color="black"
          anchorX="center"
          anchorY="middle"
          //outlineWidth={0.015}
          outlineColor="#ffffff"
          fillOpacity={1}
          strokeOpacity={1}
        >
          Trong Tu Luu
        </Text> */}
        {/* ROLE TEXT */}
        {/* <Text
          fontSize={0.15}
          position={[0, 0.4, -1.5]} // Slightly above the name
          color="#bfbec1"
          anchorX="center"
          anchorY="middle"
          //outlineWidth={0.01}
          outlineColor="#bfbec1"
          fillOpacity={1}
          strokeOpacity={1}
        >
          Software Engineer
        </Text> */}

        {/* FLOATING MACBOOK */}
        <Float speed={1.5} floatIntensity={1} rotationIntensity={1}>
          <group scale={0.5} position={[0, -0.4, 0]}>
            <Mac />
          </group>
        </Float>
      </Canvas>

      <div className="absolute top-10/12 right-[19vw] -translate-y-1/2 flex items-start gap-4 translate-x-[3.5px]">
        <div className="w-px h-[1.4rem] bg-black/30 translate-y-[1px]" />
        <div className="text-l font-medium leading-snug text-black/50 text-left">
          <p>I simplify, I humanize.</p>
          <Link
            to="/about"
            className="inline-flex items-center gap-1 group text-black/50 hover:text-black transition-colors duration-300"
          >
            <span className="underline underline-offset-4 group-hover:text-black">
              More about me
            </span>
            <span className="no-underline">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;

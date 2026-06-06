// import React, { useEffect, useMemo, useState } from "react";
// import { useThree } from "@react-three/fiber";
// import { Float } from "@react-three/drei";
// import { Mac } from "./Mac";

// function useMacConfig() {
//   const [w, setW] = useState(
//     typeof window !== "undefined" ? window.innerWidth : 1280
//   );
//   useEffect(() => {
//     const onResize = () => setW(window.innerWidth);
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);
//   return useMemo(() => {
//     if (w < 430) {return { scale: 0.26, y: -0.22, camZ: 3.75, fov: 32, float: 1, rot: 1, speed: 1.5 };}
//     // if (w < 640) {return { scale: 0.28, y: -0.22, camZ: 3.70, fov: 32, float: 0.95, rot: 0.95, speed: 1.1 };}
//     // if (w <= 390)  return { scale: 0.26, y: -0.22, camZ: 3.80, fov: 33, float: 1, rot: 1, speed: 1.5 }; // small phones
//     // if (w <= 480)  return { scale: 0.28, y: -0.22, camZ: 3.75, fov: 32, float: 1, rot: 1, speed: 1.5 };
//     if (w <= 640)  return { scale: 0.28, y: -0.22, camZ: 3.70, fov: 32, float: 1, rot: 1, speed: 1.5 };
//     if (w <= 768)  return { scale: 0.32, y: -0.23, camZ: 3.60, fov: 31, float: 1, rot: 1, speed: 1.5 };
//     if (w <= 1024) return { scale: 0.34, y: -0.24, camZ: 3.50, fov: 31, float: 1, rot: 1, speed: 1.5 };
//     if (w <= 1280) return { scale: 0.36, y: -0.24, camZ: 3.40, fov: 30, float: 1, rot: 1, speed: 1.5 };
//     if (w <= 1536) return { scale: 0.38, y: -0.30, camZ: 3.35, fov: 30, float: 1, rot: 1, speed: 1.5 };
//     return             { scale: 0.40, y: -0.32, camZ: 3.30, fov: 30, float: 1, rot: 1, speed: 1.5 };
//   }, [w]);
// }


// export default function MacRig() {
//   const cfg = useMacConfig();
//   const { camera } = useThree();
//   useEffect(() => {
//     camera.position.set(0, 0.92, cfg.camZ);
//     camera.fov = cfg.fov;
//     camera.updateProjectionMatrix();
//   }, [cfg, camera]);
//   return (
//     <Float
//       speed={cfg.speed}
//       floatIntensity={cfg.float}
//       rotationIntensity={cfg.rot}
//       floatingRange={[-0.01, 0.01]}
//     >
//       <group scale={cfg.scale} position={[0, cfg.y, 0]}>
//         <Mac />
//       </group>
//     </Float>
//   );
// }


import React, { useEffect, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Mac } from "./Mac";

export default function MacRig() {
  const { size, camera } = useThree();            // <— canvas pixel size
  const w = size.width;

  const cfg = useMemo(() => {
    // tiers based on canvas width (px)
    if (w < 360)   return { scale: 0.22, y: -0.18, camZ: 3.95, fov: 32, float: 0.9, rot: 0.9, speed: 1.1 };
    if (w < 430)   return { scale: 0.24, y: -0.20, camZ: 3.85, fov: 32, float: 0.95, rot: 0.95, speed: 1.2 };
    if (w < 640)   return { scale: 0.27, y: -0.21, camZ: 3.75, fov: 32, float: 1.0, rot: 1.0, speed: 1.3 };
    if (w < 768)   return { scale: 0.30, y: -0.22, camZ: 3.60, fov: 31, float: 1.0, rot: 1.0, speed: 1.4 };
    if (w < 1024)  return { scale: 0.33, y: -0.24, camZ: 3.50, fov: 31, float: 1.05, rot: 1.05, speed: 1.5 };
    if (w < 1280)  return { scale: 0.36, y: -0.26, camZ: 3.40, fov: 30, float: 1.05, rot: 1.05, speed: 1.5 };
    if (w < 1536)  return { scale: 0.38, y: -0.29, camZ: 3.35, fov: 30, float: 1.05, rot: 1.05, speed: 1.5 };
    return             { scale: 0.40, y: -0.32, camZ: 3.30, fov: 30, float: 1.05, rot: 1.05, speed: 1.5 };
  }, [w]);

  useEffect(() => {
    camera.position.set(0, 0.92, cfg.camZ);
    camera.fov = cfg.fov;
    camera.updateProjectionMatrix();
  }, [cfg, camera]);

  return (
    <Float
      speed={cfg.speed}
      floatIntensity={cfg.float}
      rotationIntensity={cfg.rot}
      floatingRange={[-0.01, 0.01]}
    >
      <group scale={cfg.scale} position={[0, cfg.y, 0]}>
        <Mac />
      </group>
    </Float>
  );
}
// Interactive CAD model of the Shuttlecock Clicker: drag to turn it, swap the
// face like pulling the head off and pushing another on. Lazy-loaded by the
// case study so three.js only arrives when the page is opened.
import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, Center, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { FACES } from "./faces";

// Draco-compressed models; the decoder is three.js's own, served from /draco/.
const DRACO = "/draco/";
FACES.forEach((f) => useGLTF.preload(f.url, DRACO));

function Model({ url }) {
  const { scene } = useGLTF(url, DRACO);
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

export default function ClickerViewer({ face, reduced }) {
  const [spinning, setSpinning] = useState(!reduced);
  const url = FACES.find((f) => f.id === face)?.url ?? FACES[0].url;

  return (
    <Canvas
      dpr={[1, 2]}
      // The face engraving points along +X: start in front of it, a little above.
      camera={{ position: [0.2, 0.07, 0], fov: 30, near: 0.005, far: 2 }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.NeutralToneMapping }}
      aria-hidden="true"
    >
      <hemisphereLight args={["#ffffff", "#b9b6ac", 1.4]} />
      <directionalLight position={[0.3, 0.5, 0.4]} intensity={2.2} />
      <directionalLight position={[-0.4, 0.2, -0.3]} intensity={0.6} />
      <Suspense fallback={null}>
        {/* Fit the whole clicker, skirt included, whatever the canvas shape. */}
        <Bounds fit clip observe margin={1.3}>
          <Model url={url} />
        </Bounds>
      </Suspense>
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        autoRotate={spinning}
        autoRotateSpeed={1.6}
        onStart={() => setSpinning(false)}
      />
    </Canvas>
  );
}

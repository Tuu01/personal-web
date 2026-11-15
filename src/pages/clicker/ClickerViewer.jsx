// Interactive CAD model of the Shuttlecock Clicker, staged like a product
// shot: studio reflections, a soft contact shadow, framing computed from the
// model so it always fits, and a gentle sway that keeps the face towards you.
// Lazy-loaded by the case study so three.js only arrives on this page.
import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, ContactShadows, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { FACES } from "./faces";

// Draco-compressed models; the decoder is three.js's own, served from /draco/.
const DRACO = "/draco/";
FACES.forEach((f) => useGLTF.preload(f.url, DRACO));

// Assembly 55.8 × 60.8 × 55.8 mm (brief). The face engraving points along +X.
const SIZE = { w: 0.0558, h: 0.0608 };
const FOV = 26;
const ELEVATION = 0.22; // radians above the horizon: a slight look down at the dome
const MARGIN = 1.45; // breathing room around the model

function Studio() {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.9;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return (
    <>
      <directionalLight position={[0.3, 0.45, 0.2]} intensity={1.6} />
      <directionalLight position={[-0.25, 0.15, -0.3]} intensity={0.5} />
    </>
  );
}

// Distance that fits the model (with margin) in both directions of the canvas,
// then a ±35° sway around the face until the visitor drags.
function Framing({ controls, sway }) {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  const t0 = useRef(performance.now());
  const touched = useRef(false);

  useEffect(() => {
    const v = THREE.MathUtils.degToRad(FOV) / 2;
    const h = Math.atan(Math.tan(v) * (size.width / size.height));
    const dist =
      Math.max((SIZE.h * MARGIN) / 2 / Math.tan(v), (SIZE.w * MARGIN) / 2 / Math.tan(h)) + SIZE.w / 2;
    camera.position.set(Math.cos(ELEVATION) * dist, Math.sin(ELEVATION) * dist, 0);
    camera.updateProjectionMatrix();
    controls.current?.update();
  }, [camera, size, controls]);

  useEffect(() => {
    const c = controls.current;
    if (!c) return;
    const stop = () => (touched.current = true);
    c.addEventListener("start", stop);
    return () => c.removeEventListener("start", stop);
  }, [controls]);

  useFrame(() => {
    if (!sway || touched.current || !controls.current) return;
    const a = Math.sin((performance.now() - t0.current) / 2600) * 0.6;
    const r = Math.hypot(camera.position.x, camera.position.z);
    camera.position.x = Math.cos(a) * r;
    camera.position.z = Math.sin(a) * r;
    controls.current.update();
  });
  return null;
}

function Model({ url }) {
  const { scene } = useGLTF(url, DRACO);
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

export default function ClickerViewer({ face, reduced, dark }) {
  const controls = useRef(null);
  const url = FACES.find((f) => f.id === face)?.url ?? FACES[0].url;

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0.25, 0.06, 0], fov: FOV, near: 0.005, far: 2 }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.NeutralToneMapping }}
      aria-hidden="true"
    >
      <Studio />
      <Suspense fallback={null}>
        <Model url={url} />
      </Suspense>
      {/* The model is centred, so its base sits at -h/2. */}
      <ContactShadows
        position={[0, -SIZE.h / 2 - 0.0005, 0]}
        scale={0.16}
        far={0.06}
        blur={2.4}
        opacity={dark ? 0.75 : 0.45}
        resolution={512}
      />
      <OrbitControls
        ref={controls}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI * 0.18}
        maxPolarAngle={Math.PI * 0.55}
        target={[0, 0, 0]}
      />
      <Framing controls={controls} sway={!reduced} />
    </Canvas>
  );
}

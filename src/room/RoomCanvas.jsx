// The live 3D room. Loaded lazily by RoomStage so the page, the panel and the
// poster render before three.js arrives.
import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import { Edges, Html, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { blendShots, easings, frustum, positionOf } from "./cameraMath";
import {
  EXTRAS,
  MODEL_URL,
  MOTION,
  OBJECTS,
  OVERVIEW_SHOT,
  ZONES,
  ZONE_ORDER,
  moveFor,
  shotFor,
  tagText,
  zoneTagAnchor,
} from "./model";

// Groups that are the room itself: they never fade, or the zone views would
// float in a grey void.
const STRUCTURE = new Set(["room_shell", "desk"]);
const FADE_TO = MOTION.room_to_zone.fade_rest_to;
const COBALT = { light: "#1F3FD1", dark: "#8A9DFF" };

/* -------------------------------------------------------- scene indexing -- */

// Every mesh gets its own material (they are shared in the file) so it can
// fade on its own, and a record of which zone / object / extra it belongs to.
function indexScene(scene) {
  const meshes = [];
  scene.traverse((o) => {
    if (!o.isMesh) return;
    o.material = o.material.clone();
    let zone = null;
    let item = null;
    let extra = null;
    let top = null;
    for (let p = o; p && p !== scene; p = p.parent) {
      const kind = p.userData?.kind;
      if (kind === "item" && !item) item = p.name;
      if (kind === "extra" && !extra) extra = p.name;
      if (kind === "zone" && !zone) zone = p.userData.slug;
      if (kind === "trigger" && !zone) zone = String(p.userData.opens).replace("zone_", "");
      if (p.parent === scene) top = p.name;
    }
    const m = o.material;
    const info = {
      zone,
      item,
      extra,
      top,
      structural: STRUCTURE.has(top),
      op: 1,
      baseOpacity: m.opacity,
      baseTransparent: m.transparent,
      baseEmissive: m.emissive ? m.emissive.clone() : null,
      baseEmissiveIntensity: m.emissiveIntensity ?? 1,
    };
    o.userData.room = info;
    // The lamp's own parts would block its light at night.
    o.castShadow = extra !== "obj_lamp";
    o.receiveShadow = true;
    meshes.push(o);
  });
  return meshes;
}

function targetOpacity(info, view) {
  if (!view.zone || info.structural || info.zone === view.zone) return 1;
  if (ZONES[view.zone].fadesOut.includes(info.top)) return 0;
  return FADE_TO;
}

function setOpacity(mesh, op) {
  const info = mesh.userData.room;
  const m = mesh.material;
  info.op = op;
  m.opacity = info.baseOpacity * op;
  const transparent = info.baseTransparent || op < 0.999;
  if (m.transparent !== transparent) {
    m.transparent = transparent;
    m.needsUpdate = true;
  }
  mesh.visible = op > 0.01;
}

// Day / night on the materials that glow.
function applyNight(meshes, night) {
  for (const mesh of meshes) {
    const m = mesh.material;
    const info = mesh.userData.room;
    if (!m.emissive) continue;
    switch (m.name) {
      case "window_light":
        if (night) m.emissive.set("#7d8fd9");
        else m.emissive.copy(info.baseEmissive);
        m.emissiveIntensity = night ? 0.55 : info.baseEmissiveIntensity;
        break;
      case "lamp_glow":
        m.emissive.set("#ffc98c");
        m.emissiveIntensity = night ? 2.4 : 0;
        break;
      case "lamp_shade":
        m.emissive.set("#ffd9ad");
        m.emissiveIntensity = night ? 0.5 : 0;
        break;
      case "screen_monitor":
      case "screen_laptop":
      case "screen_tablet":
        m.emissive.set(night ? "#dfe5ff" : "#f4f4ef");
        m.emissiveIntensity = night ? 1.25 : m.name === "screen_monitor" ? 1.1 : 0.35;
        break;
      default:
    }
  }
}

/* ----------------------------------------------------------------- scene -- */

function Lights({ night }) {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    invalidate();
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene, invalidate]);

  useEffect(() => {
    scene.environmentIntensity = night ? 0.1 : 0.5;
    invalidate();
  }, [night, scene, invalidate]);

  return (
    <>
      <hemisphereLight
        args={[night ? "#4a5380" : "#ffffff", night ? "#0b0b0a" : "#b9b6ac", night ? 0.35 : 1.05]}
      />
      <directionalLight
        castShadow
        position={[4.5, 7, 5.5]}
        intensity={night ? 0.12 : 1.7}
        shadow-mapSize={[4096, 4096]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
      >
        {/* Fitted to the room (~4.4 m square) so each shadow texel stays small. */}
        <orthographicCamera attach="shadow-camera" args={[-3.6, 3.6, 3.6, -3.6, 4, 16]} />
      </directionalLight>
      {/* Lamp on the desk and the glow of the monitors, night only. */}
      <pointLight
        position={[0, 1.12, -1.85]}
        color="#ffcf9e"
        intensity={night ? 3.2 : 0}
        distance={5}
        decay={1.6}
        castShadow={night}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.002}
      />
      <pointLight
        position={[-1.55, 1.3, -0.6]}
        color="#d6defc"
        intensity={night ? 1.1 : 0}
        distance={2.6}
        decay={1.6}
      />
    </>
  );
}

function CameraRig({ view, device, freeRect, instant }) {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  const invalidate = useThree((s) => s.invalidate);
  const anim = useRef({ current: shotFor(view, device), to: null, view, device });
  const free = useRef(freeRect);

  useEffect(() => {
    free.current = freeRect;
    invalidate();
  }, [freeRect, invalidate]);

  useEffect(() => {
    const a = anim.current;
    const to = shotFor(view, device);
    const sameView = a.view.zone === view.zone && a.view.object === view.object;
    if (instant || (sameView && a.device !== device)) {
      // Reduced motion, or the layout changed under the same view: cut.
      a.current = to;
      a.to = null;
    } else if (!sameView) {
      const move = moveFor(a.view, view);
      a.from = a.current;
      a.to = to;
      a.start = performance.now();
      a.dur = move.duration_ms;
      a.ease = easings[move.easing] || easings.easeInOutCubic;
    }
    a.view = view;
    a.device = device;
    invalidate();
  }, [view, device, instant, invalidate]);

  // Negative priority: runs before the default render and before the tags
  // (drei Html, priority 0) read the camera.
  useFrame(() => {
    const a = anim.current;
    if (a.to) {
      const t = Math.min(1, (performance.now() - a.start) / a.dur);
      a.current = blendShots(a.from, a.to, a.ease(t));
      if (t >= 1) a.to = null;
      else invalidate();
    }
    const shot = a.current;
    const pos = positionOf(shot.pose);
    camera.position.set(pos[0], pos[1], pos[2]);
    camera.up.set(0, 1, 0);
    camera.lookAt(shot.pose.target[0], shot.pose.target[1], shot.pose.target[2]);
    camera.updateMatrixWorld();
    const f = frustum(shot.win, { w: size.width, h: size.height }, free.current);
    const near = Math.max(0.05, shot.pose.dist * 0.05);
    const far = shot.pose.dist + 25;
    camera.near = near;
    camera.far = far;
    camera.projectionMatrix.makePerspective(
      f.left * near,
      f.right * near,
      f.top * near,
      f.bottom * near,
      near,
      far,
    );
    camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
  }, -1);

  return null;
}

// Fades the rest of the room when a zone is open, and hides the chair where
// it would block the view.
function Fader({ meshes, view, instant }) {
  const invalidate = useThree((s) => s.invalidate);
  const viewRef = useRef(view);

  useEffect(() => {
    viewRef.current = view;
    if (instant) for (const m of meshes) setOpacity(m, targetOpacity(m.userData.room, view));
    invalidate();
  }, [view, meshes, instant, invalidate]);

  useFrame((_, dt) => {
    const v = viewRef.current;
    // Fading in back to the room uses fade_back_ms; both are 400 ms today.
    const ms = v.zone ? MOTION.room_to_zone.fade_ms : MOTION.zone_to_room.fade_back_ms;
    const step = Math.min(dt, 0.05) / (ms / 1000);
    let moving = false;
    for (const m of meshes) {
      const info = m.userData.room;
      const target = targetOpacity(info, v);
      if (info.op === target) continue;
      // The chair fades faster than the rest (hidden_groups_fade_ms).
      const k = target === 0 ? (ms / MOTION.room_to_zone.hidden_groups_fade_ms) * step : step;
      const next = info.op < target ? Math.min(target, info.op + k) : Math.max(target, info.op - k);
      setOpacity(m, next);
      moving = true;
    }
    if (moving) invalidate();
  });

  return null;
}

/** Meshes to outline for the current hover / selection. */
function outlined(meshes, view, hover, tourZone) {
  const out = new Set();
  const zone = hover?.type === "zone" ? hover.id : tourZone;
  const kindOf = (id) => {
    const o = OBJECTS[id];
    return o ? `${o.zone}/${o.label}` : null;
  };
  const kinds = new Set();
  if (hover?.type === "item") kinds.add(kindOf(hover.id));
  if (view.object) kinds.add(kindOf(view.object));
  for (const m of meshes) {
    const info = m.userData.room;
    if (!m.visible) continue;
    if (zone && !view.zone && info.zone === zone) out.add(m);
    if (info.item && kinds.has(kindOf(info.item))) out.add(m);
    if (hover?.type === "extra" && info.extra === hover.id) out.add(m);
  }
  return [...out];
}

// Cobalt outline on a mesh from the file, portalled into the mesh so it
// shares its transform. Edges, not Outlines: Outlines' screen-space hull
// blows up on faces that point straight at the camera.
function OutlineOn({ mesh, color }) {
  return createPortal(<Edges threshold={25} lineWidth={2} color={color} />, mesh);
}

function Tag({ position, active, onClick, onHover, children, hidden }) {
  return (
    <Html position={position} zIndexRange={[12, 10]} style={{ pointerEvents: "none" }}>
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClick}
        onPointerEnter={onHover}
        className={`room-tag ${active ? "is-active" : ""} ${hidden ? "is-hidden" : ""}`}
      >
        {children}
      </button>
    </Html>
  );
}

function Room({ view, device, freeRect, hover, tourZone, theme, instant, onHover, onSelect, onReady }) {
  const { scene } = useGLTF(MODEL_URL, false, true);
  const meshes = useMemo(() => indexScene(scene), [scene]);
  const invalidate = useThree((s) => s.invalidate);
  const night = theme === "dark";

  useEffect(() => {
    applyNight(meshes, night);
    invalidate();
  }, [meshes, night, invalidate]);

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  useEffect(() => invalidate(), [hover, tourZone, invalidate]);

  // Pointer → what it means in the current view. Faded objects cannot be
  // picked, so the zone in front always wins.
  const resolve = (e) => {
    const hit = e.intersections.find((i) => i.object.visible && i.object.userData.room?.op >= 0.5);
    const info = hit?.object.userData.room;
    if (!info) return null;
    if (info.extra === "obj_lamp") return { type: "extra", id: "obj_lamp" };
    if (!view.zone) return info.zone ? { type: "zone", id: info.zone } : null;
    if (info.item && OBJECTS[info.item]?.zone === view.zone) return { type: "item", id: info.item };
    return null;
  };

  const handlers = {
    onPointerMove: (e) => {
      e.stopPropagation();
      onHover(resolve(e));
    },
    onPointerLeave: () => onHover(null),
    onClick: (e) => {
      e.stopPropagation();
      const target = resolve(e);
      if (target) onSelect(target);
    },
  };

  const lines = outlined(meshes, view, hover, tourZone);
  const cobalt = COBALT[theme] || COBALT.light;

  return (
    <>
      <Lights night={night} />
      <CameraRig view={view} device={device} freeRect={freeRect} instant={instant} />
      <Fader meshes={meshes} view={view} instant={instant} />
      <primitive object={scene} {...handlers} />
      {lines.map((m) => (
        <OutlineOn key={m.uuid} mesh={m} color={cobalt} />
      ))}

      {/* Zone tags in the room view, object tags inside a zone. */}
      {ZONE_ORDER.map((slug) => (
        <Tag
          key={slug}
          position={zoneTagAnchor(slug)}
          hidden={!!view.zone}
          active={(hover?.type === "zone" && hover.id === slug) || tourZone === slug}
          onHover={() => onHover({ type: "zone", id: slug })}
          onClick={() => onSelect({ type: "zone", id: slug })}
        >
          <span className="text-cobalt">{ZONES[slug].index}</span>
          {ZONES[slug].label}
        </Tag>
      ))}
      {ZONE_ORDER.flatMap((slug) =>
        ZONES[slug].kinds.map((k) => {
          const obj = OBJECTS[k.objectId];
          const isActive =
            (hover?.type === "item" && OBJECTS[hover.id]?.label === k.label && OBJECTS[hover.id]?.zone === slug) ||
            k.objectIds.includes(view.object);
          return (
            <Tag
              key={k.objectId}
              position={obj.tag_anchor}
              hidden={view.zone !== slug || (view.object && !k.objectIds.includes(view.object))}
              active={isActive}
              onHover={() => onHover({ type: "item", id: k.objectId })}
              onClick={() => onSelect({ type: "item", id: k.objectId })}
            >
              {tagText(obj)}
            </Tag>
          );
        }),
      )}
      <Tag
        position={EXTRAS.obj_lamp.tag_anchor}
        hidden={!(hover?.type === "extra" && hover.id === "obj_lamp")}
        active
        onClick={() => onSelect({ type: "extra", id: "obj_lamp" })}
      >
        {night ? "Switch to day" : "Switch to night"}
      </Tag>
    </>
  );
}

export default function RoomCanvas(props) {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      shadows="percentage"
      camera={{ manual: true, position: positionOf(OVERVIEW_SHOT.pose), near: 1, far: 200 }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.NeutralToneMapping }}
      style={{ touchAction: "pan-y" }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <Room {...props} />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload(MODEL_URL, false, true);

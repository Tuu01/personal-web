import React, { useRef } from "react";
import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";

export function Mac(props) {
  const { nodes } = useGLTF("/models/Macbook.glb");

  const GlassMaterial = (
    <MeshTransmissionMaterial
      resolution={1024}
      samples={6}
      thickness={0.15}
      roughness={0.05}
      transmission={1}
      ior={1.3}
      backside
      distortion={0}
      temporalDistortion={0}
      clearcoat={0.3}
    />
  );

  return (
    <group {...props} dispose={null}>
      <group position={[-0.002, 0.148, -0.601]} rotation={[-2.094, 0, 0]}>
        <mesh geometry={nodes.Plane022.geometry}>{GlassMaterial}</mesh>
        <mesh geometry={nodes.Plane022_1.geometry}>{GlassMaterial}</mesh>
        <mesh geometry={nodes.Plane022_2.geometry}>{GlassMaterial}</mesh>
        <mesh geometry={nodes.Plane022_3.geometry}>{GlassMaterial}</mesh>
        <mesh geometry={nodes.Plane022_4.geometry}>{GlassMaterial}</mesh>
        <mesh geometry={nodes.Plane022_5.geometry}>{GlassMaterial}</mesh>
      </group>
      <mesh
        geometry={nodes.Cylinder.geometry}
        position={[-1.322, 0.126, -0.559]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={0.033}
      >
        {GlassMaterial}
      </mesh>
      <mesh
        geometry={nodes.Plane006.geometry}
        position={[0, 0.129, -0.57]}
        scale={[1, 1, 0.044]}
      >
        {GlassMaterial}
      </mesh>
      <group position={[0.001, 0.011, 0.786]}>
        <mesh geometry={nodes.Circle009.geometry}>{GlassMaterial}</mesh>
        <mesh geometry={nodes.Circle009_1.geometry}>{GlassMaterial}</mesh>
      </group>
      <group position={[0.035, 0.169, 0.264]}>
        <mesh geometry={nodes.Plane005.geometry}>{GlassMaterial}</mesh>
        <mesh geometry={nodes.Plane005_1.geometry}>{GlassMaterial}</mesh>
        <mesh geometry={nodes.Plane005_2.geometry}>{GlassMaterial}</mesh>
        <mesh geometry={nodes.Plane005_3.geometry}>{GlassMaterial}</mesh>
      </group>
      <group position={[0, 0.166, 0.297]}>
        <mesh geometry={nodes.Plane028.geometry}>{GlassMaterial}</mesh>
        <mesh geometry={nodes.Plane028_1.geometry}>{GlassMaterial}</mesh>
      </group>
      <group
        position={[-1.818, 0.131, -0.014]}
        rotation={[-Math.PI, 0, Math.PI / 2]}
        scale={1.381}
      >
        <mesh geometry={nodes.Plane011.geometry}>{GlassMaterial}</mesh>
        <mesh geometry={nodes.Plane011_1.geometry}>{GlassMaterial}</mesh>
      </group>
      <group
        position={[-1.818, 0.131, 0.131]}
        rotation={[-Math.PI, 0, Math.PI / 2]}
        scale={1.381}
      >
        <mesh geometry={nodes.Plane023.geometry}>{GlassMaterial}</mesh>
        <mesh geometry={nodes.Plane023_1.geometry}>{GlassMaterial}</mesh>
      </group>
      <group
        position={[1.821, 0.132, -0.012]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={1.442}
      >
        <mesh geometry={nodes.Plane026.geometry}>{GlassMaterial}</mesh>
        <mesh geometry={nodes.Plane026_1.geometry}>{GlassMaterial}</mesh>
      </group>
      <group
        position={[-1.826, 0.13, -0.179]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[1.114, 1.114, 1.258]}
      >
        <mesh geometry={nodes.Circle003.geometry}>{GlassMaterial}</mesh>
        <mesh geometry={nodes.Circle003_1.geometry}>{GlassMaterial}</mesh>
      </group>
      <group
        position={[1.82, 0.125, -0.206]}
        rotation={[-Math.PI / 2, 1.571, 0]}
        scale={[1.067, 0.985, 1.067]}
      >
        <mesh geometry={nodes.Cube001.geometry}>{GlassMaterial}</mesh>
        <mesh geometry={nodes.Cube001_1.geometry}>{GlassMaterial}</mesh>
      </group>
      <group
        position={[1.821, 0.132, 0.244]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={1.442}
      >
        <mesh geometry={nodes.Plane029.geometry}>{GlassMaterial}</mesh>
        <mesh geometry={nodes.Plane029_1.geometry}>{GlassMaterial}</mesh>
      </group>
      <group
        position={[-1.819, 0.131, 0.256]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={0.017}
      >
        <mesh geometry={nodes.Circle002_1.geometry}>{GlassMaterial}</mesh>
        <mesh geometry={nodes.Circle002_2.geometry}>{GlassMaterial}</mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/Macbook.glb");

"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function CarModel() {
  const { scene } = useGLTF("/models/car.glb");
  try {
    return (
      <Canvas style={{ height: "400px" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} />
        <primitive object={scene} scale={1.5} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    );
  } catch (error) {
    console.error("Error loading model:", error);
    return <div>Error loading 3D model. Check console for details.</div>;
  }
}

export default CarModel;

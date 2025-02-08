"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { useRef, useState } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import type { Group } from "three";

const CreditCard = () => {
  const { scene } = useGLTF("/asset/creditcard.glb");
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  const clonedScene = scene.clone();

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

      // Subtle rotation
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.1;

      // Hover effect
      const scale = hovered
        ? 1 + Math.sin(state.clock.elapsedTime * 8) * 0.01 + 0.05
        : 1;
      groupRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive
        object={clonedScene}
        scale={4} // Increased scale
        position={[0, -0.5, 0]} // Moved down
        rotation={[0, Math.PI / 4, 0]}
      />
    </group>
  );
};

const FinTech3DVisual = () => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Wrapper div with margin-top to move the component down */}
      <div className="mt-44">
        {" "}
        {/* Adjust this value to move up/down */}
        <Canvas
          camera={{ position: [0, 0, 4], fov: 40 }} // Closer camera with narrower FOV
          className="h-[700px]" // Increased height
        >
          <CreditCard />

          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight
            position={[-10, -10, -10]}
            intensity={0.5}
            color="#ffffff"
          />

          <Environment preset="city" />
          <EffectComposer>
            <Bloom
              intensity={0.5}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              height={300}
            />
          </EffectComposer>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>
    </div>
  );
};

export default FinTech3DVisual;

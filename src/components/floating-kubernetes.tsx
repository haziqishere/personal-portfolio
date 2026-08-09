"use client";

import { useMemo } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
// three's own GLTFLoader, not @react-three/drei's useGLTF: drei's loader
// routes through three-stdlib, whose bundled postprocessing passes
// (GlitchPass/SSAOPass) reference `LuminanceFormat` — removed from the
// installed three@^0.180. That breaks the build even though nothing here
// touches postprocessing. Going straight to three's loader sidesteps
// three-stdlib entirely.
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Box3, Mesh, Vector3, type Group } from "three";

const MODEL_URL = "/asset/kubernetes-logo.glb";

// GLB exports carry whatever unit scale the source tool used (often way
// off from three.js's expectations). Normalize every clone's largest
// dimension to this many world units so the per-instance `scale` below
// means something predictable instead of multiplying an unknown base.
const TARGET_SIZE = 2.6;

// Each logo gets its own tiny canvas rendered once at a fixed angle
// (frameloop="demand" — no continuous per-frame WebGL render loop, no
// useFrame). The "floating" is a plain CSS transform on the wrapping div,
// same `.float-icon`/`@keyframes float` the old 2D icon row used — GPU
// compositing, not a three.js scene update, every frame.
const LOGOS: Array<{
  rotation: [number, number, number];
  scale: number;
  size: number;
  floatDuration: number;
  floatDelay: number;
  /** 0-1, how strongly the "lit by the laser beam" glow washes over this
   * logo. With two logos flanking a `justify-center` gap, the beam runs
   * through the empty space between them rather than through either logo,
   * so both sit at roughly the same distance from it. */
  glow: number;
}> = [
  { rotation: [0.7, 0.4, -0.35], scale: 0.5, size: 85, floatDuration: 4.3, floatDelay: -1, glow: 0.5 },
  // Rightmost — confirmed this fills its frame correctly without clipping;
  // treating it as the max, the other stays close behind it.
  { rotation: [0.6, -0.5, 0.4], scale: 0.6, size: 100, floatDuration: 4.7, floatDelay: -0.5, glow: 0.5 },
];

function StaticKubernetesModel({
  rotation,
  scale,
}: {
  rotation: [number, number, number];
  scale: number;
}) {
  const gltf = useLoader(GLTFLoader, MODEL_URL);
  const model = useMemo(() => {
    const clone = gltf.scene.clone(true) as Group;

    // Box3().setFromObject() on the whole scene graph includes any empty/
    // helper nodes the export tool left behind — if one of those sits far
    // from the actual mesh, it inflates the box and the mesh ends up
    // scaled far smaller than TARGET_SIZE actually intends. Union only the
    // real geometry instead.
    const box = new Box3();
    clone.traverse((child) => {
      if ((child as Mesh).isMesh) box.expandByObject(child);
    });
    if (box.isEmpty()) box.setFromObject(clone);

    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const normalizeScale = TARGET_SIZE / maxDim;

    clone.scale.setScalar(normalizeScale);
    // Re-center at the origin too — off-center source geometry would
    // otherwise sit partway out of frame regardless of scale.
    clone.position.set(
      -center.x * normalizeScale,
      -center.y * normalizeScale,
      -center.z * normalizeScale,
    );

    return clone;
  }, [gltf]);

  // Wrapping in a <group>, not passing rotation/scale straight to
  // <primitive>: <primitive object={model} scale={...} /> applies that
  // scale directly onto `model` itself — the same object useMemo already
  // scaled to TARGET_SIZE above — overwriting the normalization on every
  // render. A separate group keeps the two scales independent.
  return (
    <group rotation={rotation} scale={scale}>
      <primitive object={model} />
    </group>
  );
}

interface FloatingKubernetesLogosProps {
  /** Should match LightPillar's own topColor/bottomColor in the same hero,
   * so the logos read as lit by the same beam rather than generic 3D
   * lighting. */
  topColor?: string;
  bottomColor?: string;
}

export function FloatingKubernetesLogos({
  topColor = "#5227FF",
  bottomColor = "#FF9FFC",
}: FloatingKubernetesLogosProps) {
  return (
    <div aria-hidden="true" className="flex flex-wrap items-center justify-center gap-24">
      {LOGOS.map((spec, i) => (
        <div
          key={i}
          className="float-icon relative"
          style={{
            width: spec.size,
            height: spec.size,
            animation: `float ${spec.floatDuration}s ease-in-out infinite`,
            animationDelay: `${spec.floatDelay}s`,
          }}
        >
          <Canvas
            frameloop="demand"
            camera={{ position: [0, 0, 2.3], fov: 40 }}
            gl={{ alpha: true }}
          >
            <ambientLight intensity={1} />
            {/* Sky/ground hemisphere doubles as the "light rises from
                below" cue: groundColor (bottomColor) is the bounce-light
                simulation, keyed to match LightPillar's own bottom hue. */}
            <hemisphereLight args={[topColor, bottomColor, 2]} />
            <directionalLight position={[0, -3, 2]} intensity={3.5} color={bottomColor} />
            <directionalLight position={[0.5, 2, 3]} intensity={1} color={topColor} />
            {/* Sells "lit by the laser beam" as an actual light hitting the
                mesh — real specular highlights on the model's own surface
                normals — instead of a flat CSS overlay sitting on top of
                the canvas. Color matches LaserFlow's own beam color;
                intensity scales with spec.glow (how close this logo sits
                to the beam). */}
            <pointLight position={[0, 3, 2]} intensity={5 * spec.glow} color="#CF9EFF" distance={10} decay={2} />
            <StaticKubernetesModel rotation={spec.rotation} scale={spec.scale} />
          </Canvas>
        </div>
      ))}
    </div>
  );
}

export default FloatingKubernetesLogos;

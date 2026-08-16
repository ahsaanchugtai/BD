import { useMemo, useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Fires a short-lived radial burst of particles from `origin`, then
 * unmounts itself via onDone(). Used for balloon pops, gift explosions,
 * candle-blow-out confetti, and the final celebration.
 */
export default function ParticleBurst({
  origin = [0, 0, 0],
  count = 60,
  color = "#f5c451",
  life = 1.4,
  spread = 3,
  onDone,
}) {
  const pointsRef = useRef();
  const [elapsed, setElapsed] = useState(0);

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = origin[0];
      positions[i * 3 + 1] = origin[1];
      positions[i * 3 + 2] = origin[2];
      const dir = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() * 0.8 + 0.2,
        Math.random() - 0.5
      )
        .normalize()
        .multiplyScalar(spread * (0.5 + Math.random()));
      velocities[i * 3] = dir.x;
      velocities[i * 3 + 1] = dir.y;
      velocities[i * 3 + 2] = dir.z;
    }
    return { positions, velocities };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const arr = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3] * delta;
      arr[i * 3 + 1] += (velocities[i * 3 + 1] - 1.2 * elapsed) * delta;
      arr[i * 3 + 2] += velocities[i * 3 + 2] * delta;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.material.opacity = Math.max(0, 1 - elapsed / life);

    setElapsed((e) => e + delta);
  });

  useEffect(() => {
    if (elapsed > life && onDone) onDone();
  }, [elapsed, life, onDone]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.08}
        transparent
        opacity={1}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

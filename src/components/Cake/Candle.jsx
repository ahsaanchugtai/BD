import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Candle({ position, lit, color = "#fdf6ec" }) {
  const flameRef = useRef();
  const glowRef = useRef();

  useFrame((state) => {
    if (!flameRef.current) return;
    const t = state.clock.getElapsedTime();
    const flicker = 0.85 + Math.sin(t * 12 + position[0] * 5) * 0.12 + Math.sin(t * 27) * 0.04;
    flameRef.current.scale.set(flicker * 0.9, flicker, flicker * 0.9);
    if (glowRef.current) glowRef.current.intensity = lit ? 0.3 + Math.sin(t * 10) * 0.08 : 0;
  });

  return (
    <group position={position}>
      {/* wax body with subtle taper */}
      <mesh castShadow>
        <cylinderGeometry args={[0.038, 0.045, 0.34, 14]} />
        <meshStandardMaterial color={color} roughness={0.55} metalness={0} />
      </mesh>
      {/* spiral stripe accent (simple ring band) */}
      <mesh position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.041, 0.006, 6, 20]} />
        <meshStandardMaterial color="#e8536b" roughness={0.5} />
      </mesh>
      {/* wick */}
      <mesh position={[0, 0.19, 0]}>
        <cylinderGeometry args={[0.006, 0.006, 0.06, 6]} />
        <meshStandardMaterial color="#2b2320" roughness={0.9} />
      </mesh>
      {/* flame - two-tone for realism */}
      <group ref={flameRef} position={[0, 0.24, 0]} visible={lit}>
        <mesh>
          <coneGeometry args={[0.042, 0.13, 10]} />
          <meshStandardMaterial color="#ff9d3d" emissive="#ff7a1a" emissiveIntensity={2.4} toneMapped={false} />
        </mesh>
        <mesh position={[0, -0.01, 0]} scale={[0.55, 0.55, 0.55]}>
          <coneGeometry args={[0.042, 0.13, 10]} />
          <meshStandardMaterial color="#fff3c4" emissive="#ffe066" emissiveIntensity={3} toneMapped={false} />
        </mesh>
      </group>
      {lit && <pointLight ref={glowRef} position={[0, 0.28, 0]} intensity={0.3} distance={1.1} color="#ffae42" />}
    </group>
  );
}

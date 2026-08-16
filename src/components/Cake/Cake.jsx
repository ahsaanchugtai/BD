import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Candle from "./Candle";
import birthdayConfig from "../../config/birthdayConfig";

// Small ganache/icing drip hanging just over a tier's edge.
function Drip({ angle, radius, color, height = 0.1, r = 0.035 }) {
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  return (
    <mesh position={[x, -height / 2, z]} castShadow>
      <capsuleGeometry args={[r, height * 0.4, 4, 8]} />
      <meshStandardMaterial color={color} roughness={0.5} metalness={0} />
    </mesh>
  );
}

function DripRing({ count, radius, y, color, height, r }) {
  const angles = useMemo(
    () => Array.from({ length: count }, (_, i) => (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.12),
    [count]
  );
  return (
    <group position={[0, y, 0]}>
      {angles.map((a, i) => (
        <Drip key={i} angle={a} radius={radius} color={color} height={height} r={r} />
      ))}
    </group>
  );
}

// Small sugar-pearl trim — elegant, subtle, reads as bakery detail rather
// than a big lump.
function PearlTrim({ count, radius, y, color = "#ffffff" }) {
  const angles = useMemo(
    () => Array.from({ length: count }, (_, i) => (i / count) * Math.PI * 2),
    [count]
  );
  return (
    <group position={[0, y, 0]}>
      {angles.map((a, i) => (
        <mesh key={i} position={[Math.cos(a) * radius, 0, Math.sin(a) * radius]} castShadow>
          <sphereGeometry args={[0.028, 10, 10]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

function Sprinkles({ count, radius }) {
  const sprinkles = useMemo(() => {
    const colors = ["#ff7ab6", "#7ad0ff", "#ffe066", "#a78bfa", "#ffffff"];
    return Array.from({ length: count }, () => {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * radius;
      return {
        pos: [Math.cos(a) * r, 0.015, Math.sin(a) * r],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });
  }, [count, radius]);

  return (
    <group>
      {sprinkles.map((s, i) => (
        <mesh key={i} position={s.pos} rotation={s.rot} castShadow>
          <cylinderGeometry args={[0.009, 0.009, 0.045, 5]} />
          <meshStandardMaterial color={s.color} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

export default function Cake({ lit = false }) {
  const groupRef = useRef();

  const candlePositions = useMemo(() => {
    const n = birthdayConfig.cake.candleCount;
    const arr = [];
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2;
      arr.push([Math.cos(angle) * 0.36, 1.14, Math.sin(angle) * 0.36]);
    }
    return arr;
  }, []);

  const candleColors = ["#fdf6ec", "#f9dede", "#dcefe0", "#dee6f9", "#fdf0da"];

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 0.7) * 0.05;
    groupRef.current.rotation.y = t * 0.06;
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* ceramic plate */}
      <mesh position={[0, -0.32, 0]} receiveShadow>
        <cylinderGeometry args={[1.5, 1.5, 0.05, 48]} />
        <meshStandardMaterial color="#f4f1ea" roughness={0.25} metalness={0.05} />
      </mesh>
      <mesh position={[0, -0.295, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.46, 0.014, 8, 48]} />
        <meshStandardMaterial color={birthdayConfig.colors.gold} roughness={0.4} emissive={birthdayConfig.colors.gold} emissiveIntensity={0.15} />
      </mesh>

      {/* tier 1 - base, rich chocolate */}
      <mesh position={[0, -0.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.1, 1.16, 0.55, 40]} />
        <meshStandardMaterial color="#6b4226" roughness={0.55} metalness={0} />
      </mesh>
      <DripRing count={13} radius={1.11} y={0.2} color="#8a5a34" height={0.14} r={0.045} />

      {/* tier 2 - middle, raspberry pink */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.78, 0.86, 0.5, 36]} />
        <meshStandardMaterial color="#ec7ea3" roughness={0.55} metalness={0} />
      </mesh>
      <PearlTrim count={20} radius={0.8} y={0.73} color="#fff4f8" />

      {/* tier 3 - top, vanilla cream where candles sit */}
      <mesh position={[0, 0.93, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.58, 0.38, 32]} />
        <meshStandardMaterial color="#fffaf1" roughness={0.5} metalness={0} />
      </mesh>
      <PearlTrim count={16} radius={0.52} y={1.08} color={birthdayConfig.colors.gold} />

      {/* gold trim rings marking each tier boundary */}
      <mesh position={[0, 0.225, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.98, 0.025, 10, 48]} />
        <meshStandardMaterial color={birthdayConfig.colors.gold} emissive={birthdayConfig.colors.gold} emissiveIntensity={0.2} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.72, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.7, 0.02, 10, 48]} />
        <meshStandardMaterial color={birthdayConfig.colors.gold} emissive={birthdayConfig.colors.gold} emissiveIntensity={0.2} roughness={0.35} />
      </mesh>

      {/* sprinkles on top tier */}
      <group position={[0, 1.13, 0]}>
        <Sprinkles count={22} radius={0.4} />
      </group>

      {/* cherry on top, just off-center from the candles */}
      <group position={[0, 1.24, 0.24]}>
        <mesh castShadow>
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshStandardMaterial color="#c81d3f" roughness={0.2} metalness={0.05} />
        </mesh>
        <mesh position={[0.015, 0.075, 0]} rotation={[0, 0, -0.4]}>
          <cylinderGeometry args={[0.007, 0.007, 0.075, 5]} />
          <meshStandardMaterial color="#5a3a1a" roughness={0.8} />
        </mesh>
      </group>

      {/* candles */}
      {candlePositions.map((pos, i) => (
        <Candle key={i} position={pos} lit={lit} color={candleColors[i % candleColors.length]} />
      ))}
    </group>
  );
}

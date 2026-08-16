import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import birthdayConfig from "../../config/birthdayConfig";

export default function Lighting({ shadows = true, warmth = 1 }) {
  const pulseRef = useRef();

  useFrame((state) => {
    if (!pulseRef.current) return;
    const t = state.clock.getElapsedTime();
    pulseRef.current.intensity = (0.6 + Math.sin(t * 1.4) * 0.15) * warmth;
  });

  return (
    <>
      <ambientLight intensity={0.45} color={birthdayConfig.colors.white} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.8}
        color={birthdayConfig.colors.white}
        castShadow={shadows}
        shadow-mapSize-width={shadows ? 1024 : 256}
        shadow-mapSize-height={shadows ? 1024 : 256}
      />
      <pointLight
        ref={pulseRef}
        position={[0, 2.5, 0]}
        intensity={0.6}
        color={birthdayConfig.colors.gold}
        distance={10}
      />
      <pointLight
        position={[-4, 1, -3]}
        intensity={0.4}
        color={birthdayConfig.colors.purple}
        distance={12}
      />
      <pointLight
        position={[4, 1, -3]}
        intensity={0.4}
        color={birthdayConfig.colors.pink}
        distance={12}
      />
      <fog attach="fog" args={[birthdayConfig.colors.background, 6, 20]} />
    </>
  );
}

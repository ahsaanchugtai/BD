import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import ParticleBurst from "../Particles/ParticleBurst";
import { useAudio } from "../../hooks/useAudio";
import birthdayConfig from "../../config/birthdayConfig";

export default function Balloon({ position, color, isMobile }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [popped, setPopped] = useState(false);
  const [burst, setBurst] = useState(false);
  const seed = useRef(Math.random() * Math.PI * 2);
  const { playOneShot } = useAudio();

  useFrame((state) => {
    if (!meshRef.current || popped) return;
    const t = state.clock.getElapsedTime() + seed.current;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.6) * 0.25;
    meshRef.current.position.x = position[0] + Math.sin(t * 0.3) * 0.15;
    meshRef.current.rotation.z = Math.sin(t * 0.4) * 0.08;
    const targetScale = hovered ? 1.12 : 1;
    meshRef.current.scale.lerp(
      { x: targetScale, y: targetScale, z: targetScale },
      0.1
    );
  });

  const handleClick = (e) => {
    e.stopPropagation();
    if (popped) return;
    playOneShot(birthdayConfig.music.balloonPop);
    setBurst(true);
    gsap.to(meshRef.current.scale, {
      x: 0.01,
      y: 0.01,
      z: 0.01,
      duration: 0.25,
      ease: "back.in(3)",
      onComplete: () => setPopped(true),
    });
  };

  return (
    <group position={position}>
      {!popped && (
        <mesh
          ref={meshRef}
          onPointerOver={() => !isMobile && setHovered(true)}
          onPointerOut={() => !isMobile && setHovered(false)}
          onClick={handleClick}
          castShadow
        >
          <sphereGeometry args={[0.45, 24, 24]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 0.6 : 0.2}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
      )}
      {burst && (
        <ParticleBurst
          origin={[0, 0, 0]}
          color={color}
          count={40}
          onDone={() => setBurst(false)}
        />
      )}
    </group>
  );
}

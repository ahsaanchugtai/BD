import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import birthdayConfig from "../../config/birthdayConfig";

export default function GiftBox({ opened }) {
  const lidRef = useRef();
  const lightRef = useRef();
  const groupRef = useRef();

  useEffect(() => {
    if (opened && lidRef.current) {
      gsap.to(lidRef.current.rotation, {
        x: -Math.PI / 1.6,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.to(lidRef.current.position, {
        y: 1.05,
        z: -0.5,
        duration: 0.8,
        ease: "power3.out",
      });
      if (lightRef.current) {
        gsap.to(lightRef.current, { intensity: 3, duration: 0.6, ease: "power2.out" });
      }
    }
  }, [opened]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.4, 1.1, 1.4]} />
        <meshStandardMaterial color={birthdayConfig.colors.purple} roughness={0.4} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.22, 1.12, 1.42]} />
        <meshStandardMaterial color={birthdayConfig.colors.gold} emissive={birthdayConfig.colors.gold} emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.42, 1.12, 0.22]} />
        <meshStandardMaterial color={birthdayConfig.colors.gold} emissive={birthdayConfig.colors.gold} emissiveIntensity={0.3} />
      </mesh>

      <group ref={lidRef} position={[0, 0.62, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.5, 0.25, 1.5]} />
          <meshStandardMaterial color={birthdayConfig.colors.purple} roughness={0.35} metalness={0.25} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <torusKnotGeometry args={[0.12, 0.045, 60, 12]} />
          <meshStandardMaterial color={birthdayConfig.colors.gold} emissive={birthdayConfig.colors.gold} emissiveIntensity={0.5} />
        </mesh>
      </group>

      {opened && (
        <pointLight ref={lightRef} position={[0, 0.4, 0]} intensity={0} distance={6} color={birthdayConfig.colors.white} />
      )}
    </group>
  );
}

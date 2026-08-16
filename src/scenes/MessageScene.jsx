import ParticleField from "../components/Particles/ParticleField";
import birthdayConfig from "../config/birthdayConfig";

export default function MessageScene({ quality }) {
  return (
    <group>
      <ParticleField count={Math.round(quality.particles * 0.35)} radius={7} color={birthdayConfig.colors.pink} size={0.03} />
      <mesh position={[0, 0.6, -1]}>
        <icosahedronGeometry args={[0.35, 1]} />
        <meshStandardMaterial
          color={birthdayConfig.colors.pink}
          emissive={birthdayConfig.colors.pink}
          emissiveIntensity={0.7}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

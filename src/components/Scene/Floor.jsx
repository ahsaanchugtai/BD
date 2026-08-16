import birthdayConfig from "../../config/birthdayConfig";

export default function Floor({ shadows = true }) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.4, 0]} receiveShadow={shadows}>
        <circleGeometry args={[7, 64]} />
        <meshStandardMaterial
          color={birthdayConfig.colors.background}
          metalness={0.6}
          roughness={0.35}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.39, 0]}>
        <ringGeometry args={[2.6, 2.65, 64]} />
        <meshBasicMaterial color={birthdayConfig.colors.gold} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

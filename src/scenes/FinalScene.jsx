import ParticleField from "../components/Particles/ParticleField";
import BalloonField from "../components/Balloons/BalloonField";
import birthdayConfig from "../config/birthdayConfig";

export default function FinalScene({ quality, isMobile }) {
  return (
    <group>
      <ParticleField count={quality.particles} radius={11} color={birthdayConfig.colors.gold} size={0.035} />
      <BalloonField isMobile={isMobile} />
    </group>
  );
}

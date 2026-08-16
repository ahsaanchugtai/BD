import BalloonField from "../components/Balloons/BalloonField";
import ParticleField from "../components/Particles/ParticleField";
import birthdayConfig from "../config/birthdayConfig";

export default function BirthdayScene({ quality, isMobile }) {
  return (
    <group>
      <ParticleField count={quality.particles} radius={10} color={birthdayConfig.colors.white} size={0.025} />
      <BalloonField isMobile={isMobile} />
    </group>
  );
}

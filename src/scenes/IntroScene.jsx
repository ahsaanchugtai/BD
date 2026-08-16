import ParticleField from "../components/Particles/ParticleField";
import birthdayConfig from "../config/birthdayConfig";

export default function IntroScene({ quality }) {
  return <ParticleField count={quality.particles} radius={9} color={birthdayConfig.colors.white} size={0.03} />;
}

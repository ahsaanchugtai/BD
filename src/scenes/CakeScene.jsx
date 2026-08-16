import { useEffect, useRef, useState } from "react";
import Cake from "../components/Cake/Cake";
import ParticleBurst from "../components/Particles/ParticleBurst";
import birthdayConfig from "../config/birthdayConfig";
import { useScene, CAKE_STAGES } from "../hooks/useScene";

export default function CakeScene() {
  const { cakeStage } = useScene();
  const [burst, setBurst] = useState(false);
  const firedRef = useRef(false);

  useEffect(() => {
    if (cakeStage === CAKE_STAGES.BLOWN && !firedRef.current) {
      firedRef.current = true;
      setBurst(true);
    }
    if (cakeStage === CAKE_STAGES.INTRO) {
      firedRef.current = false; // reset after a restart
    }
  }, [cakeStage]);

  return (
    <group>
      <Cake lit={cakeStage === CAKE_STAGES.LIT || cakeStage === CAKE_STAGES.WISH} />
      {burst && (
        <ParticleBurst
          origin={[0, -0.2, 0]}
          color={birthdayConfig.colors.gold}
          count={80}
          onDone={() => setBurst(false)}
        />
      )}
    </group>
  );
}

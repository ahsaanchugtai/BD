import { useEffect, useRef, useState } from "react";
import GiftBox from "../components/Gift/GiftBox";
import ParticleBurst from "../components/Particles/ParticleBurst";
import birthdayConfig from "../config/birthdayConfig";
import { useScene } from "../hooks/useScene";

export default function GiftScene() {
  const { giftOpened } = useScene();
  const [burst, setBurst] = useState(false);
  const firedRef = useRef(false);

  useEffect(() => {
    if (giftOpened && !firedRef.current) {
      firedRef.current = true;
      setBurst(true);
    }
    if (!giftOpened) firedRef.current = false; // reset after a restart
  }, [giftOpened]);

  return (
    <group>
      <GiftBox opened={giftOpened} />
      {burst && (
        <ParticleBurst
          origin={[0, 0.5, 0]}
          color={birthdayConfig.colors.white}
          count={100}
          spread={4}
          onDone={() => setBurst(false)}
        />
      )}
    </group>
  );
}

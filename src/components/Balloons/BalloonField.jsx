import { useMemo } from "react";
import Balloon from "./Balloon";
import birthdayConfig from "../../config/birthdayConfig";

export default function BalloonField({ isMobile }) {
  const colors = [
    birthdayConfig.colors.pink,
    birthdayConfig.colors.purple,
    birthdayConfig.colors.softBlue,
    birthdayConfig.colors.gold,
  ];

  const balloons = useMemo(() => {
    const arr = [];
    const count = isMobile ? 7 : 12;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3.2 + Math.random() * 1.5;
      arr.push({
        position: [
          Math.cos(angle) * radius,
          Math.random() * 1.5 - 0.2,
          Math.sin(angle) * radius - 1,
        ],
        color: colors[i % colors.length],
      });
    }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  return (
    <group>
      {balloons.map((b, i) => (
        <Balloon key={i} position={b.position} color={b.color} isMobile={isMobile} />
      ))}
    </group>
  );
}

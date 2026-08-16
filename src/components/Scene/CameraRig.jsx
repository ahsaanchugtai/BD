import { useGyro } from "../../hooks/useGyro";
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";

// Per-scene camera targets. Positions are gentle, cinematic, no sudden jumps.
export const CAMERA_TARGETS = {
  LOADING: { pos: [0, 0, 8], look: [0, 0, 0] },
  INTRO: { pos: [0, 0.4, 7], look: [0, 0, 0] },
  BIRTHDAY_ROOM: { pos: [0, 1.4, 9], look: [0, 0.5, 0] },
  CAKE: { pos: [0, 1.3, 6.6], look: [0, 0.35, 0] },
  MESSAGE: { pos: [0, 0.6, 5], look: [0, 0.6, 0] },
  GIFT: { pos: [0, 1, 4], look: [0, 0.7, 0] },
  FINAL: { pos: [0, 1.6, 10], look: [0, 1, 0] },
};

export default function CameraRig({ scene, isMobile }) {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const parallax = useRef({ x: 0, y: 0 });
  const { tilt } = useGyro(isMobile);

  useEffect(() => {
    if (isMobile) return;
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [isMobile]);

  useEffect(() => {
    const target = CAMERA_TARGETS[scene] || CAMERA_TARGETS.BIRTHDAY_ROOM;
    gsap.to(camera.position, {
      x: target.pos[0],
      y: target.pos[1],
      z: target.pos[2],
      duration: 1.3,
      ease: "power3.inOut",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  useFrame(() => {
    const target = CAMERA_TARGETS[scene] || CAMERA_TARGETS.BIRTHDAY_ROOM;
    const source = isMobile ? tilt.current : mouse.current;
    parallax.current.x += (source.x - parallax.current.x) * 0.03;
    parallax.current.y += (source.y - parallax.current.y) * 0.03;

    const lookTarget = new THREE.Vector3(
      target.look[0] + parallax.current.x * 0.6,
      target.look[1] - parallax.current.y * 0.3,
      target.look[2]
    );
    camera.lookAt(lookTarget);
  });

  return null;
}

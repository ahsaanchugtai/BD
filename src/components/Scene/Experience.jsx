import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import CameraRig from "./CameraRig";
import Lighting from "./Lighting";
import Floor from "./Floor";
import IntroScene from "../../scenes/IntroScene";
import BirthdayScene from "../../scenes/BirthdayScene";
import CakeScene from "../../scenes/CakeScene";
import MessageScene from "../../scenes/MessageScene";
import GiftScene from "../../scenes/GiftScene";
import FinalScene from "../../scenes/FinalScene";
import { useScene } from "../../hooks/useScene";
import { useResponsive } from "../../hooks/useResponsive";

const SCENE_COMPONENTS = {
  INTRO: IntroScene,
  BIRTHDAY_ROOM: BirthdayScene,
  CAKE: CakeScene,
  MESSAGE: MessageScene,
  GIFT: GiftScene,
  FINAL: FinalScene,
};

export default function Experience() {
  const { scene, runId } = useScene();
  const { isMobile, quality } = useResponsive();

  const ActiveScene = SCENE_COMPONENTS[scene] || IntroScene;

  return (
    <Canvas
      key={runId}
      shadows={quality.shadows}
      dpr={quality.dpr}
      camera={{ fov: 45, position: [0, 0.4, 7] }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#050313"]} />
      <CameraRig scene={scene} isMobile={isMobile} />
      <Lighting shadows={quality.shadows} />
      <Floor shadows={quality.shadows} />
      <Suspense fallback={null}>
        <ActiveScene quality={quality} isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}

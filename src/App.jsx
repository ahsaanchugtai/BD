import { SceneProvider, useScene } from "./hooks/useScene";
import { AudioProvider } from "./hooks/useAudio";
import { useResponsive } from "./hooks/useResponsive";
import LoadingScreen from "./components/UI/LoadingScreen";
import MusicToggle from "./components/UI/MusicToggle";
import Experience from "./components/Scene/Experience";
import SceneOverlay from "./components/SceneOverlay";

function AppShell() {
  const { scene, goTo, runId } = useScene();
  const { isMobile } = useResponsive();

  return (
    <div className="app-root">
      {scene === "LOADING" ? (
        <LoadingScreen onEnter={() => goTo("INTRO")} />
      ) : (
        <>
          <Experience />
          <SceneOverlay scene={scene} isMobile={isMobile} runId={runId} />
          <MusicToggle />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AudioProvider>
      <SceneProvider>
        <AppShell />
      </SceneProvider>
    </AudioProvider>
  );
}

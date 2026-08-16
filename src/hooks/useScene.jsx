import { createContext, useCallback, useContext, useState } from "react";

// Ordered list of every scene the experience moves through.
export const SCENES = [
  "LOADING",
  "INTRO",
  "BIRTHDAY_ROOM",
  "CAKE",
  "MESSAGE",
  "GIFT",
  "FINAL",
];

export const CAKE_STAGES = {
  INTRO: "intro",
  LIT: "lit",
  WISH: "wish",
  BLOWN: "blown",
};

const SceneContext = createContext(null);

export function SceneProvider({ children }) {
  const [scene, setScene] = useState("LOADING");
  const [runId, setRunId] = useState(0); // bumped on restart to reset child state

  // Interaction state that both a 3D scene (inside <Canvas>) and the DOM
  // overlay (outside <Canvas>) need to read/write. Keeping it here — rather
  // than inside the 3D scene component itself — means the overlay never has
  // to reach into the canvas's React tree to drive it.
  const [cakeStage, setCakeStage] = useState(CAKE_STAGES.INTRO);
  const [giftOpened, setGiftOpened] = useState(false);

  const goTo = useCallback((next) => {
    if (SCENES.includes(next)) setScene(next);
  }, []);

  const next = useCallback(() => {
    setScene((current) => {
      const idx = SCENES.indexOf(current);
      return SCENES[Math.min(idx + 1, SCENES.length - 1)];
    });
  }, []);

  // Step back to the previous scene. Stops at INTRO — there's nothing
  // useful to go "back" to before the journey has started.
  const prev = useCallback(() => {
    setScene((current) => {
      const idx = SCENES.indexOf(current);
      const floor = SCENES.indexOf("INTRO");
      return SCENES[Math.max(idx - 1, floor)];
    });
  }, []);

  const restart = useCallback(() => {
    setRunId((id) => id + 1);
    setCakeStage(CAKE_STAGES.INTRO);
    setGiftOpened(false);
    setScene("INTRO");
  }, []);

  return (
    <SceneContext.Provider
      value={{
        scene,
        goTo,
        next,
        prev,
        restart,
        runId,
        cakeStage,
        setCakeStage,
        giftOpened,
        setGiftOpened,
      }}
    >
      {children}
    </SceneContext.Provider>
  );
}

export function useScene() {
  const ctx = useContext(SceneContext);
  if (!ctx) throw new Error("useScene must be used inside <SceneProvider>");
  return ctx;
}

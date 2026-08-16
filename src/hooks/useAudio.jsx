import { useCallback, useEffect, useState } from "react";
import birthdayConfig from "../config/birthdayConfig";

// ------------------------------------------------------------------
// Audio engine lives OUTSIDE React state/context on purpose.
//
// React Three Fiber's <Html> (used by every in-canvas scene overlay)
// portals its children back into real DOM through a separate reconciler
// root. React Context created above <Canvas> is not guaranteed to bridge
// into that portal, so any button inside a scene that called
// `useContext(AudioContext)` could throw and crash the whole app the
// moment it rendered. Module-level state has no such boundary — it works
// identically whether a component lives outside the canvas (LoadingScreen,
// MusicToggle) or deep inside a scene's <Html> overlay (every "Continue"
// button, "Light the Candles", etc).
// ------------------------------------------------------------------

let enabled = true;
let unlocked = false;
let bgAudio = null;
const listeners = new Set();

function notify() {
  listeners.forEach((fn) => fn(enabled));
}

function unlock() {
  if (unlocked) return;
  unlocked = true;
  const src = birthdayConfig.music.background;
  if (!src || src.startsWith("[")) return; // placeholder, no real file yet
  try {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.4;
    bgAudio = audio;
    if (enabled) audio.play().catch(() => {});
  } catch {
    /* ignore */
  }
}

function playOneShot(src) {
  if (!enabled || !src || src.startsWith("[")) return;
  try {
    const sfx = new Audio(src);
    sfx.volume = 0.6;
    sfx.play().catch(() => {});
  } catch {
    /* ignore */
  }
}

function toggleMute() {
  enabled = !enabled;
  if (bgAudio) {
    if (enabled) bgAudio.play().catch(() => {});
    else bgAudio.pause();
  }
  notify();
}

/**
 * Drop-in replacement for the old context-based hook. Works identically
 * whether called from a normal DOM component or from inside a Canvas
 * <Html> overlay — no <AudioProvider> wrapper required.
 */
export function useAudio() {
  const [isEnabled, setIsEnabled] = useState(enabled);

  useEffect(() => {
    const listener = (val) => setIsEnabled(val);
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);

  return {
    enabled: isEnabled,
    unlock: useCallback(() => unlock(), []),
    playOneShot: useCallback((src) => playOneShot(src), []),
    toggleMute: useCallback(() => toggleMute(), []),
  };
}

// Kept as a harmless no-op wrapper so existing `<AudioProvider>` usage in
// App.jsx doesn't require a structural change — it just renders children.
export function AudioProvider({ children }) {
  return children;
}

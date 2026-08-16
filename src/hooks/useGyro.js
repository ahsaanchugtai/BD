import { useCallback, useEffect, useRef } from "react";

/**
 * Reads device orientation (gyroscope) and exposes it via a ref so
 * CameraRig can read it every frame without re-rendering React.
 *
 * iOS Safari requires an explicit user gesture to grant motion-sensor
 * permission — call `requestPermission()` from a tap/click handler (e.g.
 * the "Enter" button) before this will report any values on iOS. Android
 * and desktop don't need this and will just start reporting immediately.
 */
export function useGyro(enabled) {
  const tilt = useRef({ x: 0, y: 0 });
  const baseline = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const onOrientation = (e) => {
      if (e.beta === null || e.gamma === null) return;

      if (!baseline.current) {
        baseline.current = { beta: e.beta, gamma: e.gamma };
      }

      const dGamma = e.gamma - baseline.current.gamma;
      const dBeta = e.beta - baseline.current.beta;

      tilt.current.x = Math.max(-1, Math.min(1, dGamma / 30));
      tilt.current.y = Math.max(-1, Math.min(1, dBeta / 30));
    };

    window.addEventListener("deviceorientation", onOrientation);
    return () => window.removeEventListener("deviceorientation", onOrientation);
  }, [enabled]);

  const requestPermission = useCallback(async () => {
    const DOE = window.DeviceOrientationEvent;
    if (DOE && typeof DOE.requestPermission === "function") {
      try {
        const result = await DOE.requestPermission();
        return result === "granted";
      } catch {
        return false;
      }
    }
    return true;
  }, []);

  return { tilt, requestPermission };
}

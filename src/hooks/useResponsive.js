import { useEffect, useState } from "react";

function detectTier() {
  if (typeof window === "undefined") return "HIGH";
  const ua = navigator.userAgent;
  const isIOS =
    /iPhone|iPad|iPod/i.test(ua) ||
    // iPadOS 13+ reports as "Macintosh" but exposes multi-touch
    (ua.includes("Macintosh") && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(ua);
  const isMobile = isIOS || isAndroid;
  const cores = navigator.hardwareConcurrency || 4;

  // Safari never implements navigator.deviceMemory, so treating its
  // absence as "4GB" (the common fallback pattern) silently downgrades
  // every iPhone to the lowest tier regardless of actual hardware. iOS
  // does expose hardwareConcurrency reliably, so lean on that instead.
  if (isIOS) {
    if (cores >= 6) return "MEDIUM"; // iPhone 8 / SE2 and newer
    return "LOW"; // older/entry-level devices
  }

  if (isAndroid) {
    const hasMemInfo = "deviceMemory" in navigator;
    const mem = hasMemInfo ? navigator.deviceMemory : null;
    if (cores <= 4 || (hasMemInfo && mem <= 4)) return "LOW";
    return "MEDIUM";
  }

  if (isMobile) return "MEDIUM";
  if (cores <= 4) return "MEDIUM";
  return "HIGH";
}

// Central place that decides particle counts, shadows, DPR, etc.
export function useResponsive() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1920
  );
  const [tier] = useState(detectTier);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  const quality = {
    LOW: { particles: 150, shadows: false, dpr: [1, 1], postFX: false },
    MEDIUM: { particles: 400, shadows: false, dpr: [1, 1.5], postFX: false },
    HIGH: { particles: 900, shadows: true, dpr: [1, 2], postFX: true },
  }[tier];

  return { width, isMobile, isTablet, tier, quality };
}

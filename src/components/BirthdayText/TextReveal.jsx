import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Sequentially reveals an array of lines with fade + rise, then calls
 * onComplete. Used for the intro sequence, cake prompts, and final message.
 */
export default function TextReveal({ lines, onComplete, holdLast = true, className = "" }) {
  const containerRef = useRef();

  useEffect(() => {
    const els = containerRef.current.querySelectorAll(".reveal-line");
    const tl = gsap.timeline({
      onComplete: () => onComplete && onComplete(),
    });

    // Each line fades in, holds, then CROSSFADES into the next line (the
    // next line's fade-in starts while this one is still fading out) so
    // there's never a moment with nothing on screen.
    let cursor = 0;
    els.forEach((el, i) => {
      const isLast = i === els.length - 1;
      tl.fromTo(
        el,
        { opacity: 0, y: 46 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        cursor
      );
      const holdDuration = 0.6;
      const fadeOutStart = cursor + 0.5 + holdDuration;
      if (!isLast || !holdLast) {
        tl.to(el, { opacity: 0, y: -10, duration: 0.5, ease: "power2.in" }, fadeOutStart);
        // next line begins fading in partway through this fade-out (crossfade)
        cursor = fadeOutStart + 0.2;
      } else {
        cursor = fadeOutStart;
      }
    });

    return () => tl.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines]);

  return (
    <div ref={containerRef} className={`text-reveal ${className}`}>
      {lines.map((line, i) => (
        <p className="reveal-line" key={i}>
          {line}
        </p>
      ))}
    </div>
  );
}

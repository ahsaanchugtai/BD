/**
 * A pulsing/animated GIF shown right at the start of the experience,
 * above the intro text — the opening "hero" moment, similar to a GIF
 * greeting card. Plain DOM <img>, not routed through the 3D canvas.
 */
export default function GifHero({ src, alt = "" }) {
  if (!src) return null;
  return (
    <div className="gif-hero">
      <img src={src} alt={alt} loading="eager" />
    </div>
  );
}

import { useAudio } from "../../hooks/useAudio";

export default function MusicToggle() {
  const { enabled, toggleMute } = useAudio();

  return (
    <button
      className="music-toggle"
      onClick={toggleMute}
      aria-label={enabled ? "Mute music" : "Unmute music"}
    >
      {enabled ? "🔊" : "🔇"}
    </button>
  );
}

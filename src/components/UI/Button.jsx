import { useAudio } from "../../hooks/useAudio";
import birthdayConfig from "../../config/birthdayConfig";

export default function Button({ children, onClick, variant = "primary", small = false, ...rest }) {
  const { playOneShot } = useAudio();

  const handleClick = (e) => {
    playOneShot(birthdayConfig.music.uiClick);
    onClick && onClick(e);
  };

  return (
    <button
      className={`btn btn-${variant} ${small ? "btn-small" : ""}`}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
}

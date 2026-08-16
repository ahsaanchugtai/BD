import { useGyro } from "../../hooks/useGyro";
import { useEffect, useState } from "react";
import Button from "./Button";
import birthdayConfig from "../../config/birthdayConfig";
import { useAudio } from "../../hooks/useAudio";

export default function LoadingScreen({ onEnter }) {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const { unlock } = useAudio();
  const { requestPermission } = useGyro(false);
  const handleEnter = () => {
    unlock();
    requestPermission();
    onEnter();
  };

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 18);
        if (next >= 100) {
          clearInterval(id);
          setTimeout(() => setReady(true), 400);
        }
        return next;
      });
    }, 220);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="loading-screen">
      <div className="loading-particles" aria-hidden="true">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {!ready ? (
        <div className="loading-copy">
          <p>{birthdayConfig.loading.preparing}</p>
          <div className="loading-bar">
            <div className="loading-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      ) : (
        <div className="loading-copy fade-in">
          <p>{birthdayConfig.loading.ready}</p>
          <Button onClick={handleEnter}>{birthdayConfig.loading.enterCta}</Button>
        </div>
      )}
    </div>
  );
}

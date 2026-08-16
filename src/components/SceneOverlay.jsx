import { useState } from "react";
import TextReveal from "./BirthdayText/TextReveal";
import Button from "./UI/Button";
import GifHero from "./UI/GifHero";
import Certificate from "./UI/Certificate";
import birthdayConfig from "../config/birthdayConfig";
import { useScene, CAKE_STAGES } from "../hooks/useScene";
import { useAudio } from "../hooks/useAudio";

function IntroOverlay() {
  const { next } = useScene();
  const [linesDone, setLinesDone] = useState(false);
  return (
    <>
      <GifHero src={birthdayConfig.intro.gif?.src} alt={birthdayConfig.intro.gif?.alt} />
      <TextReveal lines={birthdayConfig.intro.lines} onComplete={() => setLinesDone(true)} />
      {linesDone && (
        <Button onClick={next} variant="ghost">
          {birthdayConfig.intro.cta}
        </Button>
      )}
    </>
  );
}

function NavRow({ onNext, nextLabel = "Continue →" }) {
  const { prev } = useScene();
  return (
    <div className="nav-row">
      <Button onClick={prev} variant="ghost" small>
        ← Back
      </Button>
      <Button onClick={onNext} variant="ghost">
        {nextLabel}
      </Button>
    </div>
  );
}

function BirthdayOverlay({ isMobile }) {
  const { next } = useScene();
  return (
    <>
      <p className="hint-text">
        {isMobile ? "Tap the balloons ✨" : "Move your mouse. Click the balloons ✨"}
      </p>
      <NavRow onNext={next} />
    </>
  );
}

function CakeOverlay() {
  const { next, cakeStage, setCakeStage } = useScene();
  const { playOneShot } = useAudio();

  const handleLight = () => {
    playOneShot(birthdayConfig.music.candleIgnite);
    setCakeStage(CAKE_STAGES.LIT);
    setTimeout(() => setCakeStage(CAKE_STAGES.WISH), 1200);
  };

  const handleBlow = () => setCakeStage(CAKE_STAGES.BLOWN);

  return (
    <>
      {cakeStage === CAKE_STAGES.INTRO && (
        <div className="fade-in">
          <p>{birthdayConfig.cake.intro1}</p>
          <p>{birthdayConfig.cake.intro2}</p>
          <NavRow onNext={handleLight} nextLabel={birthdayConfig.cake.lightButton} />
        </div>
      )}
      {cakeStage === CAKE_STAGES.LIT && <p className="fade-in">✨</p>}
      {cakeStage === CAKE_STAGES.WISH && (
        <div className="fade-in">
          <p>{birthdayConfig.cake.wish}</p>
          <p>{birthdayConfig.cake.blowPrompt}</p>
          <Button onClick={handleBlow}>{birthdayConfig.cake.blowButton}</Button>
        </div>
      )}
      {cakeStage === CAKE_STAGES.BLOWN && (
        <div className="fade-in">
          <NavRow onNext={next} />
        </div>
      )}
    </>
  );
}

function MessageOverlay() {
  const { next } = useScene();
  const [showMessage, setShowMessage] = useState(false);
  return (
    <>
      {!showMessage && (
        <TextReveal
          lines={[birthdayConfig.message.lead1, birthdayConfig.message.lead2]}
          onComplete={() => setShowMessage(true)}
        />
      )}
      {showMessage && (
        <div className="fade-in message-body">
          <p>{birthdayConfig.message.body}</p>
          <NavRow onNext={next} />
        </div>
      )}
    </>
  );
}

function GiftOverlay() {
  const { next, giftOpened, setGiftOpened } = useScene();
  const { playOneShot } = useAudio();

  const handleOpen = () => {
    playOneShot(birthdayConfig.music.giftOpen);
    setGiftOpened(true);
  };

  return (
    <>
      {!giftOpened ? (
        <div className="fade-in">
          <p>{birthdayConfig.gift.intro1}</p>
          <p>{birthdayConfig.gift.intro2}</p>
          <NavRow onNext={handleOpen} nextLabel={birthdayConfig.gift.button} />
        </div>
      ) : (
        <div className="fade-in">
          <Certificate />
          <NavRow onNext={next} />
        </div>
      )}
    </>
  );
}

function FinalOverlay() {
  const { restart } = useScene();
  return (
    <>
      <TextReveal
        lines={[birthdayConfig.final.headline, birthdayConfig.final.name, birthdayConfig.final.closing]}
        holdLast
        className="final-overlay"
      />
      <Button onClick={restart} variant="ghost">
        {birthdayConfig.final.restartButton}
      </Button>
    </>
  );
}

const OVERLAYS = {
  INTRO: IntroOverlay,
  BIRTHDAY_ROOM: BirthdayOverlay,
  CAKE: CakeOverlay,
  MESSAGE: MessageOverlay,
  GIFT: GiftOverlay,
  FINAL: FinalOverlay,
};

/**
 * Rendered as a normal sibling of <Canvas> — NOT inside it — so it's plain
 * fixed-position DOM with no 3D-projection quirks. Every scene's copy and
 * controls live in this single bottom-anchored panel, keyed by scene+runId
 * so it slides up fresh each time (see .overlay-bottom / @keyframes
 * panelSlideUp in global.css) and local text-reveal state resets cleanly.
 */
export default function SceneOverlay({ scene, isMobile, runId }) {
  const Overlay = OVERLAYS[scene];
  if (!Overlay) return null;

  return (
    <div className="overlay-bottom" key={`${scene}-${runId}`}>
      <Overlay isMobile={isMobile} />
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import birthdayConfig from "../config/birthdayConfig";

function Icon({ name, ...props }) {
  const paths = {
    arrow: <><path d="M4 12h16M14 6l6 6-6 6" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />,
    music: <><path d="M9 18V5l12-2v13M9 8l12-2" /><ellipse cx="6" cy="18" rx="3" ry="3" /><ellipse cx="18" cy="16" rx="3" ry="3" /></>,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    gift: <><path d="M3 10h18v4H3zM5 14v7h14v-7M12 10v11" /><path d="M12 10C3 10 5 2 9 4c2 1 3 6 3 6Zm0 0c9 0 7-8 3-6-2 1-3 6-3 6Z" /></>,
    letter: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
    sparkle: <><path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" /></>,
  };
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}

function Flower({ transform, color = "#dca6a5" }) {
  return (
    <g transform={transform}>
      {[0, 72, 144, 216, 288].map((angle) => <ellipse key={angle} cx="0" cy="-12" rx="10" ry="17" fill={color} transform={`rotate(${angle})`} opacity=".85" />)}
      <circle r="7" fill="#f4e5c7" />
      <circle r="3" fill="#b69a68" />
    </g>
  );
}

function Botanical({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 260 380" fill="none" aria-hidden="true">
      <g stroke="#8c9879" strokeWidth="1.7">
        <path d="M130 365C90 260 142 140 85 35M126 322C165 266 190 230 211 159M113 222C59 194 44 158 27 108M119 167C157 132 176 95 180 59" />
        <path d="M115 287c-36-1-57-25-54-43 29-5 48 17 54 43Z" fill="#acb69b" />
        <path d="M139 297c2-31 26-48 44-41-4 24-19 38-44 41Z" fill="#c0c7ae" />
        <path d="M113 185c-32-4-50-23-49-40 28-3 44 14 49 40Z" fill="#a4b08f" />
        <path d="M128 150c1-30 20-48 37-43 0 24-15 39-37 43Z" fill="#b7c09f" />
        <path d="M92 84c-24-6-35-23-32-37 23 2 32 15 32 37Z" fill="#b7c09f" />
        <path d="M186 209c4-27 23-39 37-33-4 20-16 31-37 33Z" fill="#acb69b" />
      </g>
      <Flower transform="translate(89 37) scale(.95)" color="#d998a1" />
      <Flower transform="translate(29 109) scale(.7)" color="#e4bdb5" />
      <Flower transform="translate(181 59) scale(.7)" color="#e4bdb5" />
      <Flower transform="translate(211 150) scale(.85)" color="#d998a1" />
      <Flower transform="translate(113 227) scale(1.1)" color="#dca6a5" />
    </svg>
  );
}

function CakeArt({ stage }) {
  return (
    <svg className="cake-art" viewBox="0 0 480 450" role="img" aria-label={`A blush birthday cake with ${stage === "lit" ? "glowing" : stage === "blown" ? "blown-out" : "unlit"} candles and flowers`}>
      <defs>
        <linearGradient id="cake-icing" x1="0" x2="1"><stop stopColor="#efd8ce" /><stop offset=".45" stopColor="#fff1e8" /><stop offset="1" stopColor="#dec0b9" /></linearGradient>
        <linearGradient id="cake-top" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#fff4eb" /><stop offset="1" stopColor="#e8c6c0" /></linearGradient>
        <linearGradient id="cake-plate"><stop stopColor="#c3a783" /><stop offset=".5" stopColor="#f4e6c8" /><stop offset="1" stopColor="#c3a783" /></linearGradient>
      </defs>
      <ellipse cx="240" cy="407" rx="157" ry="15" fill="#8e5e62" opacity=".1" />
      <path d="M226 345h28l8 54h-44Z" fill="url(#cake-plate)" />
      <ellipse cx="240" cy="399" rx="71" ry="10" fill="url(#cake-plate)" />
      <ellipse cx="240" cy="342" rx="158" ry="27" fill="url(#cake-plate)" />
      <path d="M103 225v98c0 33 274 33 274 0v-98Z" fill="url(#cake-icing)" />
      <ellipse cx="240" cy="225" rx="137" ry="31" fill="url(#cake-top)" />
      <path d="M106 230c10 19 28 8 33 26 6 25 18 17 20-2 3-22 30-5 35-3 8 4 10 25 20 24 13-1 8-23 20-25 17-3 24 25 36 14 8-8 3-24 17-19 15 5 12 34 27 25 11-6 5-28 19-28 12 0 18 12 29 7 8-4 10-12 13-17" fill="none" stroke="#fff6ed" strokeWidth="10" strokeLinecap="round" />
      <path d="M111 318c62 21 189 24 258 0" stroke="#cf9a9a" strokeWidth="8" fill="none" strokeDasharray="1 13" strokeLinecap="round" />
      <path d="M177 182v50c0 24 126 24 126 0v-50Z" fill="url(#cake-icing)" />
      <ellipse cx="240" cy="182" rx="63" ry="17" fill="#fff4e9" />
      <path d="M181 186c11 11 18 0 22 11s12 11 15 0 12-5 17-3 8 18 16 9 5-16 15-11 10 11 17 6 11-10 17-11" stroke="#fff9ee" fill="none" strokeWidth="6" strokeLinecap="round" />
      {[215, 240, 265].map((position, index) => (
        <g key={position}>
          <rect x={position - 4} y={123 + index % 2 * 6} width="8" height="58" rx="2" fill={index === 1 ? "#b69a68" : "#c58491"} />
          <path d={`M${position - 4} 145l8-5m-8 19 8-5m-8 19 8-5`} stroke="#fff1e5" strokeWidth="2" />
          <path d={`M${position} ${123 + index % 2 * 6}v-8`} stroke="#70564b" strokeWidth="2" />
          {stage === "lit" && <g className="candle-flame" style={{ animationDelay: `${index * .2}s` }}><path d={`M${position} ${116 + index % 2 * 6}c-17-12-5-22 0-30 5 8 17 18 0 30Z`} fill="#e9b66c" /><path d={`M${position} ${114 + index % 2 * 6}c-7-7-2-11 0-17 3 6 8 10 0 17Z`} fill="#fff4cf" /></g>}
        </g>
      ))}
      <g stroke="#899373" strokeWidth="3" fill="none"><path d="M126 296c21-24 29-40 24-65M145 254c-21-1-30-13-30-23 19 0 28 8 30 23M150 241c16-4 24-15 23-25-15 1-22 11-23 25M307 205c17-1 36-17 39-40" /></g>
      <Flower transform="translate(128 288) scale(.8)" color="#c88b96" />
      <Flower transform="translate(145 259) scale(.65)" color="#dfaaa8" />
      <Flower transform="translate(308 210) scale(.65)" color="#c88b96" />
      <Flower transform="translate(332 191) scale(.45)" color="#dfaaa8" />
      <text x="258" y="301" textAnchor="middle" fill="#9b6873" fontFamily="Georgia, serif" fontStyle="italic" fontSize="20">for you</text>
    </svg>
  );
}

function MusicButton() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => () => audioRef.current?.pause(), []);

  async function toggleMusic() {
    setError("");
    if (!audioRef.current) {
      audioRef.current = new Audio(birthdayConfig.music.background);
      audioRef.current.loop = true;
      audioRef.current.volume = .3;
    }
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
      return;
    }
    setPending(true);
    try {
      await audioRef.current.play();
      setPlaying(true);
    } catch {
      setError("Music couldn’t play. Try again.");
    } finally {
      setPending(false);
    }
  }

  return <div className="music-control"><button className="music-button" onClick={toggleMusic} aria-pressed={playing} disabled={pending}><Icon name="music" /><span>{pending ? "Starting…" : playing ? "Music on" : "Play music"}</span><span className={`music-dot ${playing ? "is-playing" : ""}`} /></button>{error && <span className="music-error" role="status">{error}</span>}</div>;
}

export default function BirthdayPage() {
  const [cakeStage, setCakeStage] = useState("unlit");
  const [giftOpened, setGiftOpened] = useState(false);
  const [modal, setModal] = useState(null);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!modal) return;
    const dialog = dialogRef.current;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [modal]);

  function openModal(kind, event) {
    triggerRef.current = event.currentTarget;
    setModal(kind);
    if (kind === "gift") setGiftOpened(true);
  }

  function restart() {
    setCakeStage("unlit");
    setGiftOpened(false);
    document.getElementById("celebrate").scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  function handleDialogKeyDown(event) {
    if (event.key !== "Tab") return;
    const controls = dialogRef.current.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]');
    const firstControl = controls[0];
    const lastControl = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === firstControl) {
      event.preventDefault();
      lastControl?.focus();
    } else if (!event.shiftKey && document.activeElement === lastControl) {
      event.preventDefault();
      firstControl?.focus();
    }
  }

  return (
    <div className="birthday-page">
      <a className="skip-link" href="#main">Skip to celebration</a>
      <header className="site-header">
        <a href="#home" className="wordmark" aria-label={`${birthdayConfig.final.name}, home`}>{birthdayConfig.final.name}<span className="wordmark-star" aria-hidden="true">✧</span><span className="wordmark-caption">A LITTLE CELEBRATION</span></a>
        <nav aria-label="Main navigation"><a href="#celebrate">The celebration</a><a href="#little-things">Just for you</a></nav>
        <MusicButton />
      </header>

      <main id="main">
        <section className="hero section-wrap" id="home" aria-labelledby="birthday-title">
          <div className="hero-copy">
            <div className="eyebrow"><span className="short-line" /> A DAY AS LOVELY AS YOU</div>
            <h1 id="birthday-title">Happy birthday,<br /><em>{birthdayConfig.final.name}.</em><span className="heading-sparkle" aria-hidden="true">✧</span></h1>
            <p className="hero-description">A little joy. A little magic. A whole lot of love.<br />This little corner of the world is all yours today.</p>
            <a className="button button-primary" href="#celebrate">Let’s celebrate you <Icon name="arrow" /></a>
            <div className="hero-note"><Icon name="heart" width="15" height="15" /> Made with love, just for you</div>
          </div>
          <div className="hero-art">
            <div className="art-arch"><div className="arch-border" /><span className="art-kicker">TODAY, WE CELEBRATE</span><span className="art-script">beautiful you</span><CakeArt stage={cakeStage} /><span className="arch-caption">MAKE A WISH & LET IT BLOOM</span></div>
            <Botanical className="botanical botanical-left" /><Botanical className="botanical botanical-right" />
            <div className="birthday-seal"><Icon name="heart" /><span>with love,<br />always</span></div>
            <span className="art-sparkle sparkle-one" aria-hidden="true">✧</span><span className="art-sparkle sparkle-two" aria-hidden="true">✦</span>
          </div>
        </section>

        <div className="wish-ribbon" aria-hidden="true"><span>A little more laughter</span><Icon name="sparkle" /><span>A little more wonder</span><Icon name="sparkle" /><span>A beautiful new chapter</span><Icon name="sparkle" /><span>All the love you deserve</span></div>

        <section id="celebrate" className="celebrate-section section-wrap" aria-labelledby="celebrate-title">
          <div className="celebrate-intro"><span className="eyebrow">YOUR BIRTHDAY MOMENT</span><h2 id="celebrate-title">Close your eyes.<br /><em>Make a little wish.</em></h2><p>For the dreams you’re chasing, the places you’ll go, and all the beautiful things yet to come.</p><span className="handwritten">Here’s to your next chapter.</span></div>
          <div className={`wish-card ${cakeStage === "blown" ? "wish-complete" : ""}`}>
            <div className="wish-card-top"><span className="eyebrow">A WISH, JUST FOR YOU</span><Icon name="sparkle" /></div>
            <div className="candle-display" aria-hidden="true">{[0, 1, 2, 3, 4].map((index) => <div className="little-candle" key={index} style={{ "--candle-height": `${56 + index % 3 * 13}px`, "--delay": `${index * .16}s` }}>{cakeStage === "lit" && <span className="little-flame" />}<span className="candle-wick" /><span className="candle-body" /></div>)}</div>
            <div className="wish-status" role="status" aria-live="polite"><h3>{cakeStage === "unlit" ? "A little spark of magic" : cakeStage === "lit" ? "Your wish starts here" : "May your wish come true"}</h3><p>{cakeStage === "unlit" ? "Light the candles. Your moment is waiting." : cakeStage === "lit" ? "Think of something wonderful. Ready?" : "Here’s to a year full of beautiful possibilities."}</p></div>
            <button className="button button-primary" onClick={() => setCakeStage(cakeStage === "unlit" ? "lit" : cakeStage === "lit" ? "blown" : "unlit")}>{cakeStage === "unlit" ? "Light the candles" : cakeStage === "lit" ? "Make a wish & blow them out" : "Make another wish"}<Icon name={cakeStage === "blown" ? "heart" : "sparkle"} /></button>
            {cakeStage === "blown" && <div className="confetti" aria-hidden="true">{Array.from({ length: 16 }, (_, index) => <span key={index} style={{ "--left": `${5 + index * 6}%`, "--delay": `${index % 4 * .09}s`, "--rotation": `${index * 39}deg` }} />)}</div>}
          </div>
        </section>

        <section className="little-things section-wrap" id="little-things" aria-labelledby="little-things-title">
          <div className="section-heading"><div><span className="eyebrow">THOUGHTFULLY WRAPPED IN LOVE</span><h2 id="little-things-title">A few little things,<br /><em>just for you.</em></h2></div><p>Because the best gifts aren’t always things.<br />Sometimes, they’re a feeling.</p></div>
          <div className="surprise-grid">
            <article className="letter-card"><div className="envelope-art" aria-hidden="true"><div className="letter-paper"><span>Dear {birthdayConfig.final.name},</span><i /><i /><i /></div><div className="envelope-front" /><span className="envelope-seal"><Icon name="heart" /></span></div><div className="surprise-copy"><span className="eyebrow">01 / WORDS FROM THE HEART</span><h3>A note to keep close.</h3><p>A few words to remind you just how special you are.</p><button className="text-button" onClick={(event) => openModal("letter", event)}>Read your letter <Icon name="arrow" /></button></div></article>
            <article className="gift-card"><div className={`gift-art ${giftOpened ? "gift-opened" : ""}`} aria-hidden="true"><div className="gift-bow" /><div className="gift-lid" /><div className="gift-body" /><div className="gift-tag">for {birthdayConfig.final.name}</div></div><div className="surprise-copy"><span className="eyebrow">02 / A LITTLE SOMETHING EXTRA</span><h3>A surprise with your name on it.</h3><p>A tiny gift, a little smile. Go on, it’s all yours.</p><button className="text-button" onClick={(event) => openModal("gift", event)}>{giftOpened ? "See your surprise again" : "Unwrap your surprise"}<Icon name="arrow" /></button></div></article>
          </div>
        </section>

        <section className="closing-section" aria-labelledby="closing-title"><Botanical className="closing-botanical" /><span className="eyebrow">TODAY & EVERY DAY</span><h2 id="closing-title">The world is a little lovelier<br /><em>with you in it.</em></h2><p>{birthdayConfig.final.closing}</p><span className="handwritten">Happy birthday, {birthdayConfig.final.name}.</span><button className="text-button" onClick={restart}>Celebrate all over again <Icon name="arrow" /></button></section>
      </main>

      <footer className="site-footer"><a href="#home" className="footer-wordmark">{birthdayConfig.final.name}<span aria-hidden="true">✧</span></a><span>A little celebration. A lot of love.</span><span>Made just for {birthdayConfig.final.name} <Icon name="heart" width="14" height="14" /></span></footer>

      <dialog ref={dialogRef} className={`surprise-dialog ${modal === "gift" ? "certificate-dialog" : ""}`} aria-labelledby="dialog-title" onKeyDown={handleDialogKeyDown} onCancel={(event) => { event.preventDefault(); setModal(null); }} onClick={(event) => { if (event.target === dialogRef.current) { const bounds = dialogRef.current.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setModal(null); } }}>
        <button className="dialog-close" aria-label="Close surprise" onClick={() => setModal(null)} autoFocus><Icon name="close" /></button>
        {modal === "letter" ? <div className="letter-content"><Icon name="letter" width="32" height="32" /><span className="eyebrow">A NOTE FROM THE HEART</span><h2 id="dialog-title">Dear {birthdayConfig.final.name},</h2><p>{birthdayConfig.message.body}</p><p>{birthdayConfig.final.closing}</p><span className="handwritten">With love, always.</span><button className="button button-primary" onClick={() => setModal(null)}>Keep this close <Icon name="heart" /></button></div> : modal === "gift" ? <div className="certificate-content"><span className="certificate-emblem"><Icon name="gift" width="34" height="34" /></span><span className="eyebrow">{birthdayConfig.certificate.title}</span><p className="certificate-preamble">{birthdayConfig.certificate.awardedTo}</p><h2 id="dialog-title">{birthdayConfig.certificate.name}</h2><p className="certificate-achievement">has officially earned the title of<br /><strong>{birthdayConfig.certificate.achievement}</strong></p><p>{birthdayConfig.certificate.funnyText}</p><div className="certificate-signature"><span className="handwritten">{birthdayConfig.certificate.signature}</span><span>AWARDED WITH LOVE & A LITTLE LAUGHTER</span></div><button className="button button-primary" onClick={() => setModal(null)}>Love it. Thank you! <Icon name="heart" /></button></div> : null}
      </dialog>
    </div>
  );
}

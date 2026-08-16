// ============================================================
// BIRTHDAY CONFIG — the ONLY file you should need to edit
// to personalize this experience for someone.
// ============================================================

const birthdayConfig = {
  name: "NOOR",

  seo: {
    title: "Happy Birthday ❤️",
    description: "A little surprise for someone special.",
  },

  intro: {
    gif: {
      src: "/gif/opening.gif",
      alt: "Happy Birthday",
    },
    lines: [
      "Hey…",
      "I made something for you.",
      "And this isn't just a website…",
      "It's a little journey.",
    ],
    cta: "✨ Let's Begin",
  },

  loading: {
    preparing: "Preparing something special…",
    ready: "Ready?",
    enterCta: "✨ Enter",
  },

  cake: {
    intro1: "Someone has a birthday today…",
    intro2: "🎂 Let's light the candles.",
    lightButton: "Light the Candles",
    wish: "Make a wish…",
    blowPrompt: "Now blow them out.",
    blowButton: "Blow Out Candles",
    candleCount: 5,
  },

  message: {
    lead1: "And now…",
    lead2: "Something I really wanted to tell you.",
    body: "Keep believing in yourself, stay curious, learn from every mistake, and always chase your dreams with courage, kindness, and confidence. Happy Birthday!",
  },

  gift: {
    intro1: "There's one more thing…",
    intro2: "Open it.",
    button: "🎁 Open Gift",
  },

  // Shown as a fun "award" card right after the gift is opened.
  // Change `name` and `funnyText` to personalize it — everything else
  // is optional flavor text.
  certificate: {
    title: "Certificate of Achievement",
    awardedTo: "This certifies that",
    name: "Noor",
    achievement: "Perfect Reel Viewer",
    funnyText:
      'For demonstrating world-class dedication to the ancient art of scrolling, achieving over 9,000 hours of continuous reel-watching, and mastering the rare skill of saying "just one more video" 47 times in a row without ever meaning it.',
    signature: "The Management",
    seal: "🏅",
  },

  final: {
    headline: "Happy Birthday ❤️",
    name: "Noor",
    closing:
      "May your days be filled with happiness, your dreams become reality, and your life always have reasons to smile.",
    restartButton: "✨ Experience Again",
  },

  music: {
    // Demo placeholder tones so the experience is fully testable out of the
    // box. Swap these for real files whenever you're ready — see README.
    background: "/audio/birthday-bg.wav",
    candleIgnite: "/audio/candle-ignite.wav",
    balloonPop: "/audio/balloon-pop.wav",
    giftOpen: "/audio/gift-open.wav",
    uiClick: "/audio/ui-click.wav",
    celebration: "/audio/celebration.wav",
  },

  colors: {
    background: "#050313",
    purple: "#8b5cf6",
    pink: "#ec4899",
    softBlue: "#60a5fa",
    gold: "#f5c451",
    white: "#f8f7ff",
  },
};

export default birthdayConfig;

# 🎂 Interactive 3D Birthday Website

A cinematic, interactive 3D birthday experience built with React, Three.js,
and React Three Fiber. Enter, explore a glowing 3D world, light candles on a
birthday cake, browse a photo gallery, watch personal videos, read a
personal message, open a 3D gift, and land on a final celebration screen.
Opens with a pulsing GIF greeting. Every scene has a Back button.

## Tech stack

- React + Vite
- Three.js / React Three Fiber / @react-three/drei
- GSAP (cinematic animation & camera movement)
- HTML5 Audio (sound, unlocked on first interaction)
- Plain CSS (no framework needed for the overlay UI)

## Experience flow

```
LOADING → INTRO → BIRTHDAY_ROOM → CAKE → MEMORIES → VIDEOS → MESSAGE → GIFT → FINAL
```

Scene state lives in `src/hooks/useScene.jsx`. The 3D canvas
(`src/components/Scene/Experience.jsx`) swaps the active scene component;
each scene lives in `src/scenes/`.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

## 🎨 Personalize it — the only file you need to touch

Everything personal (name, message, opening GIF, music, colors) lives in:

```
src/config/birthdayConfig.js
```

Open it and replace the placeholders:

```js
name: "[NAME]"                       → their name
message.body: "[PERSONAL MESSAGE]"   → your birthday message
music.background: "[BACKGROUND MUSIC]" → e.g. "/audio/my-song.mp3"
```

### Replacing the opening GIF

`public/gif/opening.gif` ships with a simple placeholder (a pulsing heart).
Swap in your own GIF at that path, or change `birthdayConfig.intro.gif.src`
to point anywhere else in `public/`.

### Replacing photos

Drop your images into `public/images/` and point `birthdayConfig.photos[].src`
at them. Any number of photos works — the gallery lays them out in an arc
automatically. Tap a photo to bring it forward; the bottom panel shows its
caption and a Close button.

### Adding your videos

Drop up to 3 (or more — just add entries) video files into `public/videos/`
and update `birthdayConfig.videos[].src` to point at them. Until you do,
each slot shows a friendly "drop your video here" placeholder card instead
of a broken player. Tap a video to play it with native controls.

### Adding music / sound effects

Demo audio is already in `public/audio/` — a synthesized "Happy Birthday to
You" music-box melody for the background track, plus warm chime SFX for
candles/balloons/gift. Swap any of them out by dropping your own file into
`public/audio/` and updating the path in `birthdayConfig.music`. Nothing
plays automatically — browsers block autoplay, so the background track
only starts the moment the person clicks **"✨ Enter."** Missing/placeholder
paths (still starting with `[`) are silently skipped.

### About the font

The brief asked for **Rustic Roadway** — that's a paid/personal-use-only
script font from Letterara Studio, not on Google Fonts, and not legally
redistributable in this project. **Dancing Script** (free, Google Fonts)
is used as a similarly warm handwritten stand-in for headings, paired with
Playfair Display for smaller text. If you own a Rustic Roadway license,
drop the font file at `public/fonts/RusticRoadway.woff2` and uncomment the
`@font-face` block at the top of `src/styles/global.css` — every heading
picks it up automatically via the `--font-display` CSS variable.

## Project structure

```
src/
  components/
    Scene/         camera rig, lighting, floor, Canvas wrapper
    Cake/           3D cake + candles
    Balloons/       interactive poppable balloons
    Gift/           3D gift box open animation
    Particles/      reusable particle field + burst effects
    BirthdayText/   animated text reveal
    UI/             buttons, loading screen, music toggle
  scenes/            one file per stage of the journey
  hooks/             useScene, useAudio, useResponsive
  config/            birthdayConfig.js  ← personalize here
  styles/            global.css
```

## Performance & responsiveness

`src/hooks/useResponsive.js` detects device tier (cores/memory/mobile) and
scales particle count, shadow quality, and render resolution accordingly —
low-end phones automatically get a lighter scene instead of a scaled-down
desktop one. Mouse-parallax camera movement is disabled on mobile in favor
of tap interactions.

## Accessibility

- All interactive elements are real `<button>`s with visible focus states.
- `prefers-reduced-motion` disables non-essential CSS animation.
- A persistent mute control is always available.
- Text overlays maintain contrast against the dark scene background.

## Deploying to Vercel

1. Push this project to a GitHub repo.
2. Go to vercel.com/new and import the repo.
3. Vercel auto-detects Vite (`vercel.json` is included). Click **Deploy**.
4. Share the generated URL 🎉

No environment variables or backend are required — this is a pure static
frontend build.

## What's still a placeholder

No real personal content was invented, per request. Replace:
- `[NAME]` → recipient's name
- `[PERSONAL MESSAGE]` → your message
- `public/gif/opening.gif` → your own opening GIF
- `public/images/photo1.jpg` etc. → real photos
- `public/videos/` → your own video files (see `birthdayConfig.videos`)
- `[BACKGROUND MUSIC]` and the SFX paths → real audio files (optional)

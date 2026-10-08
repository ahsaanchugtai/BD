# Noor’s Birthday Celebration

A personal birthday website with an elegant blush-and-cream theme, botanical illustrations, refined typography, and a responsive layout. The celebration opens immediately without a loading screen or a WebGL requirement.

## Birthday experience

- Light the candles, make a wish, and blow them out; the illustrated hero cake follows the same candle state.
- Read Noor’s personal letter in a keyboard-accessible dialog.
- Unwrap the original playful achievement certificate.
- Play or pause the included birthday music. Audio starts only after clicking the music button, and playback errors offer a retry.
- Restart the celebration to reset the candles and gift.

## Personalization

Edit `src/config/birthdayConfig.js` to change `final.name`, `message.body`, `final.closing`, certificate details, or `music.background`. Update the name in `certificate.name` as well when changing the recipient. The browser title and social metadata are in `index.html`.

The theme, spacing, responsive rules, and animations are in `src/styles/birthday.css`. The page uses Cormorant Garamond, DM Sans, and La Belle Aurore from Google Fonts with local font fallbacks. Cake, flowers, letter, and gift visuals are drawn with SVG and CSS; they do not depend on external image services.

## Development

The active frontend uses React and Vite. Install dependencies with `npm install`, start a local development server with `npm run dev`, and check code with `npm run lint`.

Netlify runs the configured `npm run build` command and publishes `dist`. The page does not require a database, authentication, or environment variables.

## Accessibility

The site includes a skip link, semantic navigation, visible keyboard focus, native modal dialogs with Escape-to-close and focus restoration, live candle-state announcements, mobile layouts, browser zoom support, and reduced-motion styling.

The previous 3D scene components and global stylesheet remain in the repository but are not imported by the redesigned page.

#!/usr/bin/env bash
set -e

if [ ! -f "src/config/birthdayConfig.js" ]; then
  echo "⚠️  Run this from your birthday-3d project root."
  exit 1
fi

echo "→ Adding certificate config..."
python3 - << 'PYEOF'
import re
with open('src/config/birthdayConfig.js') as f:
    content = f.read()

if 'certificate:' not in content:
    marker = '''  gift: {
    intro1: "There's one more thing…",
    intro2: "Open it.",
    button: "🎁 Open Gift",
  },
'''
    replacement = '''  gift: {
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
    name: "[NAME]",
    achievement: "Perfect Reel Viewer",
    funnyText:
      'For demonstrating world-class dedication to the ancient art of scrolling, achieving over 9,000 hours of continuous reel-watching, and mastering the rare skill of saying "just one more video" 47 times in a row without ever meaning it.',
    signature: "The Management",
    seal: "🏅",
  },
'''
    content = content.replace(marker, replacement)
    with open('src/config/birthdayConfig.js', 'w') as f:
        f.write(content)
    print("  done")
else:
    print("  already present, skipping")
PYEOF

echo "→ Creating Certificate component..."
cat > src/components/UI/Certificate.jsx << 'JSXEOF'
import { createPortal } from "react-dom";
import birthdayConfig from "../../config/birthdayConfig";

export default function Certificate() {
  const cert = birthdayConfig.certificate;
  const today = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Rendered via a portal straight to <body>. The bottom overlay panel it
  // would otherwise sit inside animates with a CSS transform, and any
  // transformed ancestor becomes the containing block for position:fixed
  // descendants — so without the portal this card would be pinned to the
  // panel's small bottom-of-screen box instead of centering on the real
  // viewport.
  return createPortal(
    <div className="certificate-backdrop">
      <div className="certificate fade-in">
        <span className="certificate-corner tl" />
        <span className="certificate-corner tr" />
        <span className="certificate-corner bl" />
        <span className="certificate-corner br" />

        <div className="certificate-seal">{cert.seal}</div>
        <h2 className="certificate-title">{cert.title}</h2>
        <p className="certificate-awarded-to">{cert.awardedTo}</p>
        <p className="certificate-name">{cert.name}</p>
        <p className="certificate-achievement">{cert.achievement}</p>
        <p className="certificate-funny">{cert.funnyText}</p>

        <div className="certificate-footer">
          <div className="certificate-signature">
            <span>{cert.signature}</span>
            <span className="certificate-line" />
            <span className="certificate-label">Signature</span>
          </div>
          <div className="certificate-date">
            <span>{today}</span>
            <span className="certificate-line" />
            <span className="certificate-label">Date</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
JSXEOF

echo "→ Wiring Certificate into the gift scene..."
python3 - << 'PYEOF'
with open('src/components/SceneOverlay.jsx') as f:
    content = f.read()

if 'Certificate' not in content:
    content = content.replace(
        'import GifHero from "./UI/GifHero";',
        'import GifHero from "./UI/GifHero";\nimport Certificate from "./UI/Certificate";'
    )
    content = content.replace(
        '''      ) : (
        <div className="fade-in">
          <NavRow onNext={next} />
        </div>
      )}''',
        '''      ) : (
        <div className="fade-in">
          <Certificate />
          <NavRow onNext={next} />
        </div>
      )}'''
    )
    with open('src/components/SceneOverlay.jsx', 'w') as f:
        f.write(content)
    print("  done")
else:
    print("  already present, skipping")
PYEOF

echo "→ Adding certificate styles..."
if ! grep -q "certificate-backdrop" src/styles/global.css; then
cat >> src/styles/global.css << 'CSSEOF'

/* ---------- Certificate (shown after opening the gift) ---------- */
.certificate-backdrop {
  position: fixed;
  inset: 0;
  z-index: 6;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  pointer-events: none;
}

.certificate {
  pointer-events: auto;
  position: relative;
  width: min(420px, 100%);
  max-height: 70vh;
  overflow-y: auto;
  padding: 2rem 1.75rem 1.5rem;
  text-align: center;
  color: #3a2a12;
  background: linear-gradient(160deg, #fdf6e3 0%, #f6ead0 55%, #f0dfb8 100%);
  border: 2px solid var(--gold);
  border-radius: 6px;
  box-shadow:
    0 0 0 6px rgba(5, 3, 19, 0.35),
    0 20px 60px rgba(0, 0, 0, 0.55),
    inset 0 0 30px rgba(139, 92, 246, 0.08);
  transform: rotate(-0.6deg);
}

.certificate::before {
  content: "";
  position: absolute;
  inset: 10px;
  border: 1px solid rgba(139, 92, 246, 0.4);
  border-radius: 3px;
  pointer-events: none;
}

.certificate-corner {
  position: absolute;
  width: 22px;
  height: 22px;
  border: 2px solid var(--gold);
}

.certificate-corner.tl { top: 6px; left: 6px; border-right: none; border-bottom: none; }
.certificate-corner.tr { top: 6px; right: 6px; border-left: none; border-bottom: none; }
.certificate-corner.bl { bottom: 6px; left: 6px; border-right: none; border-top: none; }
.certificate-corner.br { bottom: 6px; right: 6px; border-left: none; border-top: none; }

.certificate-seal {
  font-size: 2.4rem;
  line-height: 1;
  margin-bottom: 0.25rem;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.25));
}

.certificate-title {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 5vw, 2.1rem);
  font-weight: 700;
  color: #7a3b12;
  margin: 0.25rem 0 0.75rem;
  letter-spacing: 0.01em;
}

.certificate-awarded-to {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #8a7350;
  margin: 0 0 0.35rem;
}

.certificate-name {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 6vw, 2rem);
  font-weight: 700;
  color: #4a2f0f;
  margin: 0 0 0.5rem;
  border-bottom: 2px solid var(--gold);
  display: inline-block;
  padding: 0 0.5rem 0.2rem;
}

.certificate-achievement {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1rem;
  color: #7a3b12;
  margin: 0.25rem 0 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.certificate-funny {
  font-family: var(--font-heading);
  font-style: italic;
  font-size: 0.85rem;
  line-height: 1.5;
  color: #5a4a30;
  margin: 0 0 1.25rem;
}

.certificate-footer {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
}

.certificate-signature,
.certificate-date {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.certificate-signature span:first-child {
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: #3a2a12;
}

.certificate-date span:first-child {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  color: #3a2a12;
}

.certificate-line {
  width: 90%;
  height: 1px;
  background: rgba(58, 42, 18, 0.4);
  margin: 0.3rem 0 0.2rem;
}

.certificate-label {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #8a7350;
}

@media (max-width: 480px) {
  .certificate {
    padding: 1.5rem 1.25rem 1.25rem;
  }
  .certificate-funny {
    font-size: 0.8rem;
  }
}
CSSEOF
echo "  done"
else
  echo "  already present, skipping"
fi

echo ""
echo "✅ Certificate added. Run: npm run dev"

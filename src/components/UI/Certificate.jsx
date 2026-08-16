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

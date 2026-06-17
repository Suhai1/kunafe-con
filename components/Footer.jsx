// components/Footer.jsx
// ─────────────────────────────────────────────────────────────
// Three-column footer. Server Component — no interactivity.
// ─────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: '#about',    label: 'Our Story'     },
  { href: '#menu',     label: 'Menu'          },
  { href: '#features', label: 'Ingredients'   },
  { href: '#visit',    label: 'How to Order'  },
];

export default function Footer() {
  return (
    <footer id="footer">
      <div className="footer-grid">

        {/* Column 1 — Brand */}
        <div className="footer-col footer-brand">
        <div className="footer-logo">
        <img
          src="/images/logo.png"
          alt="The Kunafe Connoisseur"
          style={{ height: '80px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
        />
        </div>
          <p className="footer-tagline">
            Authentic Middle Eastern desserts, handcrafted with love in
            Port Elizabeth.
          </p>
          <p className="footer-copy">
            &copy; 2026 The Kunafe Connoisseur.<br />All rights reserved.
          </p>
        </div>

        {/* Column 2 — Navigation links */}
        <div className="footer-col">
          <h4>Navigate</h4>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Contact */}
        <div className="footer-col">
          <h4>Get in Touch</h4>
          <ul>
            <li>
              <a
                href="https://wa.me/27837212463"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp: 083 721 2463
              </a>
            </li>
            <li>
              <a href="tel:0837212463">Call: 083 721 2463</a>
            </li>
            <li>
              <span>PE &amp; Uitenhage, South Africa</span>
            </li>
          </ul>
          <a
            href="https://wa.me/27837212463?text=Hi%2C%20I%20would%20like%20to%20place%20an%20order!"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary footer-wa-btn"
          >
            Order on WhatsApp
          </a>
        </div>

      </div>

      <div className="footer-bottom-bar">
  <p>Made with ✦ for lovers of fine pastry</p>
  <p style={{ marginTop: '0.5rem', fontSize: '0.7rem', opacity: '0.4', letterSpacing: '0.1em' }}>
    Powered by <a href="https://bitbite.co.za" style={{ color: 'inherit', textDecoration: 'none' }}>BitBite</a>
  </p>
</div>
    </footer>
  );
}

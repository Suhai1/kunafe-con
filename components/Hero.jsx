// components/Hero.jsx
// ─────────────────────────────────────────────────────────────
// The full-height hero section. No interactivity here —
// it is a Server Component (no "use client" needed).
//
// NOTE ON IMAGES:
// We use a regular <img> tag here instead of Next.js <Image />.
// Next.js <Image /> gives you automatic optimisation (WebP,
// lazy loading, size hints), but it requires more configuration.
// For a beginner migration, plain <img> works identically to
// what the vanilla site used. You can upgrade to <Image />
// later by following the Next.js docs.
// ─────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-bg-pattern"></div>

      <div className="hero-inner">

        {/* Left column — text content */}
        <div className="hero-content">
          <p className="hero-eyebrow reveal-up">
            Port Elizabeth &amp; Uitenhage
          </p>

          <h1 className="hero-title reveal-up">
            <em>Crafted</em> for those<br />who truly taste.
          </h1>

          <p className="hero-sub reveal-up">
            Authentic kunafe &amp; baklava, handmade with creamy cheese
            filling and crowned with crushed pistachios. A tradition you
            can order today.
          </p>

          <div className="hero-actions reveal-up">
            <a href="#menu" className="btn-primary">
              Explore the Menu
            </a>
            <a
              href="https://wa.me/27837212463"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Right column — stacked images */}
        <div className="hero-image-col reveal-right">
          <div className="hero-img-stack">

            {/* Main large image */}
            <div className="hero-img-main">
              <img
                src="/images/kunafe-unbaked-large.jpg"
                alt="Two large unbaked kunafe trays with branded card"
                loading="eager"
              />
            </div>

            {/* Small corner pip image */}
            <div className="hero-img-pip">
              <img
                src="/images/kunafe-baked-slice.jpg"
                alt="Sliced baked kunafe with rose petals"
                loading="eager"
              />
            </div>

            {/* Gold badge */}
            <div className="hero-img-badge">
              <span className="badge-ring">
                Handmade<br />Daily
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* Scroll hint at bottom left */}
      <div className="hero-scroll-hint">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
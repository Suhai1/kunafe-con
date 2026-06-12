// components/Story.jsx
// ─────────────────────────────────────────────────────────────
// The About / Our Story section with stats grid and food photos.
// Server Component — no interactivity.
// ─────────────────────────────────────────────────────────────

const STATS = [
  { num: '100%', label: 'Handmade' },
  { num: '2',    label: 'Cities Served' },
  { num: 'Family', label: 'Sized Trays' },
  { num: '∞',    label: 'Smiles Guaranteed' },
];

export default function Story() {
  return (
    <section id="about">
      <div className="about-grid">

        {/* Left column — text + stats */}
        <div className="about-left reveal-left">
          <p className="section-label">Our Story</p>
          <h2 className="section-title">A dessert with centuries of soul.</h2>

          <p className="body-text">
            The Kunafe Connoisseur was born from a deep love of Middle Eastern
            pastry craftsmanship. We believe kunafe isn&apos;t just a sweet —
            it&apos;s a centrepiece, a conversation, a memory shared around a table.
          </p>
          <p className="body-text">
            Every tray we prepare follows time-honoured technique: fine kataifi
            pastry layered over a luscious cheese filling, soaked in fragrant
            syrup, and finished with a generous crown of crushed pistachios. We
            offer it baked to golden perfection or unbaked so you can finish it
            fresh at home.
          </p>

          {/*
            React concept — .map() for repeated UI.
            Each stat item has the same structure, so we store the
            data in an array and let .map() build the JSX.
            This is cleaner and easier to maintain than copy-pasting
            four identical <div> blocks.
          */}
          <div className="stats-grid">
            {STATS.map((stat) => (
              <div className="stat-item" key={stat.label}>
                <span className="stat-num">{stat.num}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — photos */}
        <div className="about-right reveal-right">
          <div className="about-image-block">

            <div className="about-img-frame">
              <img
                src="/images/kunafe-unbaked-medium.jpg"
                alt="Three medium unbaked kunafe trays with Kunafe Connoisseur branded card"
                loading="lazy"
              />
              <div className="about-img-overlay">
                <p className="about-img-caption">
                  Crafted with love in Port Elizabeth
                </p>
              </div>
            </div>

            <div className="about-pip-row">
              <div className="about-pip">
                <img
                  src="/images/baklava-tray.jpg"
                  alt="Syrup being poured over full baklava tray"
                  loading="lazy"
                />
              </div>
              <div className="about-accent-block">
                <p>
                  &quot;Every bite carries a<br />
                  <em>lifetime of tradition.&quot;</em>
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
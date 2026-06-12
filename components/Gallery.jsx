// components/Gallery.jsx
// ─────────────────────────────────────────────────────────────
// The full-width photo gallery strip between Delivery and
// Ingredients sections. Server Component — no interactivity.
// ─────────────────────────────────────────────────────────────

const PHOTOS = [
  {
    src: '/images/kunafe-unbaked-large.jpg',
    alt: 'Two large unbaked kunafe trays on wooden board',
    tall: true,
  },
  {
    src: '/images/kunafe-baked-large.jpg',
    alt: 'Golden baked kunafe overhead with rose petals',
    tall: false,
  },
  {
    src: '/images/baklava-tray.jpg',
    alt: 'Syrup being poured over full baklava tray',
    tall: false,
  },
  {
    src: '/images/kunafe-unbaked-medium.jpg',
    alt: 'Three medium kunafe trays with branded card',
    tall: true,
  },
  {
    src: '/images/baklava-block.jpg',
    alt: 'Individual baklava block on plate with fork',
    tall: false,
  },
];

export default function Gallery() {
  return (
    <section id="gallery">

      <div className="gallery-header reveal-up">
        <p className="section-label">The Real Thing</p>
        <h2 className="section-title">Golden, gooey, &amp; gorgeous.</h2>
      </div>

      <div className="gallery-strip">
        {PHOTOS.map((photo, index) => (
          <div
            key={photo.alt}
            className={`gallery-item${photo.tall ? ' tall' : ''} reveal-up`}
            style={{ animationDelay: `${index * 0.06}s` }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
            />
          </div>
        ))}
      </div>

    </section>
  );
}
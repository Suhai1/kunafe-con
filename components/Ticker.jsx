// components/Ticker.jsx
// ─────────────────────────────────────────────────────────────
// The scrolling marquee strip between the hero and about section.
// Pure static JSX — no interactivity needed.
// The animation is handled entirely by CSS (@keyframes ticker).
// ─────────────────────────────────────────────────────────────

// The ticker items, defined as an array so we can .map() them
// instead of repeating HTML twice manually.
const TICKER_ITEMS = [
  'Authentic Kunafe',
  'Handmade Daily',
  'Creamy Cheese Filling',
  'Crushed Pistachios',
  'Baked or Unbaked',
  'Family Trays Available',
  'Same Day on Request',
  'PE & Uitenhage',
];

export default function Ticker() {
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {/*
          React concept — .map():
          .map() loops over an array and returns a new array of JSX
          elements. React renders that array as a list of elements.

          Vanilla equivalent:
            items.forEach(item => {
              html += `<span>${item}</span><span class="ticker-dot">✦</span>`;
            });

          The `key` prop is REQUIRED when rendering lists. React uses
          it to track which item is which between re-renders.
          Use a unique, stable value — never use the array index
          if the list can reorder, but for a static ticker it is fine.

          We render TWICE (original + duplicate) so the CSS animation
          loops seamlessly — same trick as the vanilla version.
        */}
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => (
          <span key={index}>
            {item}
            <span className="ticker-dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

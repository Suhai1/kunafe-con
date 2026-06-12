'use client';

// components/MenuCard.jsx
// ─────────────────────────────────────────────────────────────
// A single menu item card. This replaces the template literal
// HTML string that app.js built with innerHTML.
//
// Props received:
//   - item        → the menu item object (name, price, img, etc.)
//   - index       → position in the list (used for animation delay)
//   - onAddToCart → function to call when "Add to Order" is clicked
//
// Vanilla equivalent (the messy string version):
//   menuGrid.innerHTML = items.map((item, i) => `
//     <article class="menu-card" style="animation-delay:${i * 0.06}s">
//       ...
//       <button class="add-btn" data-id="${item.id}">Add to Order</button>
//     </article>
//   `).join('');
//   // Then separately: find all .add-btn and add click listeners
//
// React equivalent:
//   - The whole card is JSX, not a string
//   - onClick={handleAdd} is declared right on the button
//   - No data-id attribute needed — we already have the item object
//   - No querySelector needed — onClick calls the function directly
// ─────────────────────────────────────────────────────────────

export default function MenuCard({ item, index, onAddToCart }) {

  // When clicked, call the onAddToCart function that was passed
  // down from page.jsx. We pass the whole item object — no need
  // to look it up by ID like the vanilla version did.
  function handleAdd() {
    onAddToCart(item);
  }

  return (
    <article
      className="menu-card"
      // CSS animation stagger — same as the vanilla inline style
      style={{ animationDelay: `${index * 0.06}s` }}
    >

      {/* Card image with badge overlaid */}
      <div className="card-img-wrap">
        <img
          src={item.img}
          alt={item.imgAlt}
          loading="lazy"
        />
        <span className={`card-badge ${item.badgeClass}`}>
          {item.badge}
        </span>
      </div>

      {/* Card text body */}
      <div className="card-body">
        <h3 className="card-name">{item.name}</h3>
        <p className="card-desc">{item.desc}</p>

        <div className="card-footer">
          <div>
            <div className="card-price">R{item.price}</div>
            <div className="card-serves">{item.serves}</div>
          </div>

          {/*
            React concept — Event handlers:
            onClick={handleAdd} attaches the click handler directly
            in JSX. React handles adding and removing the listener
            automatically. No addEventListener, no removeEventListener.
          */}
          <button
            className="add-btn"
            onClick={handleAdd}
            aria-label={`Add ${item.name} to order`}
          >
            Add to Order
          </button>
        </div>
      </div>

    </article>
  );
}

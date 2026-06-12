'use client';

// components/CartItem.jsx
// ─────────────────────────────────────────────────────────────
// A single item row inside the cart drawer.
//
// Props received:
//   - item        → { id, name, price, qty }
//   - onChangeQty → function(id, delta) — called when +/- clicked
//   - onRemove    → function(id)        — called when Remove clicked
//
// Vanilla equivalent (from app.js updateCartUI):
//   cartItemsEl.innerHTML = cart.map(item => `
//     <div class="cart-item" data-id="${item.id}">
//       ...
//       <button class="qty-dec" data-id="${item.id}">−</button>
//       <span>${item.qty}</span>
//       <button class="qty-inc" data-id="${item.id}">+</button>
//       <button class="remove-item" data-id="${item.id}">Remove</button>
//     </div>
//   `).join('');
//   // Then: find all buttons and re-attach event listeners
//
// React equivalent:
//   - JSX instead of HTML strings
//   - onClick on each button instead of querySelector + addEventListener
//   - No data-id needed — we have the item object directly
// ─────────────────────────────────────────────────────────────

export default function CartItem({ item, onChangeQty, onRemove }) {
  return (
    <div className="cart-item">

      <div>
        <div className="cart-item-name">{item.name}</div>
        <div className="cart-item-price">R{item.price} each</div>
      </div>

      <div className="cart-item-controls">

        <div className="qty-controls">
          {/* Decrease quantity — calls onChangeQty with delta -1 */}
          <button
            className="qty-btn"
            onClick={() => onChangeQty(item.id, -1)}
            aria-label="Decrease quantity"
          >
            −
          </button>

          <span className="qty-num">{item.qty}</span>

          {/* Increase quantity — calls onChangeQty with delta +1 */}
          <button
            className="qty-btn"
            onClick={() => onChangeQty(item.id, +1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Remove item entirely */}
        <button
          className="remove-item"
          onClick={() => onRemove(item.id)}
          aria-label="Remove item"
        >
          Remove
        </button>

      </div>
    </div>
  );
}

'use client';

// components/CartButton.jsx
// ─────────────────────────────────────────────────────────────
// The floating cart button in the bottom-right corner.
// It only appears when there are items in the cart.
//
// Props received:
//   - totalQty → total number of items across all cart entries
//   - onOpen   → function to open the cart drawer
//
// Vanilla equivalent:
//   if (qty > 0) {
//     cartBtn.style.display = 'flex';
//     cartCount.textContent = qty;
//   } else {
//     cartBtn.style.display = 'none';
//   }
//
// React equivalent:
//   {totalQty > 0 && <button>...</button>}
//   This is called "conditional rendering" — the button only
//   exists in the DOM when totalQty is greater than 0.
// ─────────────────────────────────────────────────────────────

export default function CartButton({ totalQty, onOpen }) {

  // React concept — Conditional rendering with &&:
  // If totalQty > 0 is FALSE, nothing is rendered (null).
  // If totalQty > 0 is TRUE, the button is rendered.
  // This replaces style.display = 'none' / 'flex'.
  if (totalQty === 0) return null;

  return (
    <button
      className="cart-float"
      aria-label="Open cart"
      onClick={onOpen}
    >
      🛒{' '}
      {/*
        {totalQty} renders the number inside the button.
        Whenever totalQty changes (because cart state changed
        in page.jsx), React re-renders this component and the
        number updates automatically.
      */}
      <span>{totalQty}</span>
    </button>
  );
}

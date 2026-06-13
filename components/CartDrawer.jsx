'use client';

// components/CartDrawer.jsx
// ─────────────────────────────────────────────────────────────
// The slide-out cart drawer. The most complex component.
//
// Props received:
//   - isOpen      → boolean: whether the drawer is visible
//   - onClose     → function to close the drawer
//   - cart        → array of cart items [{ id, name, price, qty }]
//   - totalPrice  → number: sum of all item totals
//   - onChangeQty → function(id, delta) for +/- buttons
//   - onRemove    → function(id) for remove button
//
// This component owns two pieces of its own state:
//   - instructions → the text in the special instructions textarea
//   - cooldown     → seconds remaining on the WhatsApp resend cooldown
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import CartItem from './CartItem';
import { WHATSAPP_NUMBER } from '@/data/menu';
import { supabase } from '@/lib/supabase';


const WA_PATH =
  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  totalPrice,
  onChangeQty,
  onRemove,
}) {

  // ── Local state ─────────────────────────────────────────
  // Special instructions text — local to CartDrawer because
  // no other component needs to know about it.
  const [instructions, setInstructions] = useState('');

  // Cooldown counter. 0 = no cooldown active.
  // When the user clicks "Send", we set this to 30.
  // A useEffect counts it down to 0, one second at a time.
  const [cooldown, setCooldown] = useState(0);

  // ── useEffect: lock body scroll ─────────────────────────
  // When the drawer opens, we prevent the background from scrolling.
  // When it closes, we restore scrolling.
  //
  // Vanilla equivalent:
  //   document.body.style.overflow = isOpen ? 'hidden' : '';
  //
  // We do it in useEffect because document.body is a browser API
  // that only exists on the client, not during server rendering.
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    // Cleanup: always restore scroll when this effect re-runs or
    // when the component unmounts.
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]); // Re-run whenever `isOpen` changes.

  // ── useEffect: countdown timer ──────────────────────────
  // Vanilla equivalent:
  //   waCooldownTimer = setInterval(() => {
  //     waCooldownSeconds--;
  //     if (waCooldownSeconds <= 0) clearInterval(waCooldownTimer);
  //   }, 1000);
  //
  // React approach:
  //   - When `cooldown` becomes > 0, start a 1-second interval.
  //   - Each tick calls setCooldown(prev => prev - 1).
  //   - When `cooldown` reaches 0, the effect re-runs, finds
  //     cooldown === 0, and does nothing (no interval starts).
  //   - The cleanup function clears the interval on every re-run
  //     to prevent multiple intervals stacking up.
  //
  // KEY INSIGHT: We use the functional form `prev => prev - 1`
  // inside setInterval because the interval's closure would
  // otherwise "stale-close" over the initial value of `cooldown`.
  useEffect(() => {
    if (cooldown <= 0) return; // No timer needed.

    const timer = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup: clear the interval if the component re-renders
    // or unmounts while the timer is running.
    return () => clearInterval(timer);
  }, [cooldown]); // Re-run when cooldown value changes.

  // ── WhatsApp order handler ──────────────────────────────
  // Vanilla equivalent: the whatsappBtn click listener in app.js.
  async function handleWhatsAppOrder() {
    if (cart.length === 0) {
      alert('Please add at least one item to your order.');
      return;
    }
    if (cooldown > 0) return; // Still in cooldown.

    // Build the message string — identical logic to vanilla.
    const lines = cart.map(c => `• ${c.name} x${c.qty} — R${c.price * c.qty}`);
    let message = `Hello! I'd like to place an order from The Kunafe Connoisseur:\n\n`;
    message += lines.join('\n');
    message += `\n\n*Total: R${totalPrice}*`;
    if (instructions.trim()) {
      message += `\n\nSpecial instructions: ${instructions.trim()}`;
    }
    message += `\n\nPlease confirm availability and arrange delivery/collection. Thank you!`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    // Log to Supabase
    try {
      await supabase.from('order_clicks').insert({
        business_id: 'kunafe-con',
        business_name: 'The Kunafe Connoisseur',
        items: cart.map(c => ({
          name: c.name,
          qty: c.qty,
          price: c.price
        })),
        total: totalPrice,
      });
    } catch (err) {
      console.error('Analytics error:', err);
    }

    // Start the 30-second cooldown.
    // Setting this state will trigger the useEffect above.
    setCooldown(30);
  }

  // ── JSX ─────────────────────────────────────────────────
  return (
    <>
      {/*
        Backdrop overlay — clicking it closes the drawer.
        React concept — conditional className:
          isOpen ? 'cart-overlay open' : 'cart-overlay'
        The CSS transition handles the fade in/out.
      */}
      <div
        className={`cart-overlay${isOpen ? ' open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* The drawer itself */}
      <aside className={`cart-drawer${isOpen ? ' open' : ''}`}>

        {/* Header */}
        <div className="cart-header">
          <h3>Your Order</h3>
          <button
            className="cart-close"
            onClick={onClose}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Items list */}
        <div className="cart-items">
          {/*
            React concept — conditional rendering with ternary:
            If cart is empty, show the empty message.
            Otherwise, map over cart items and render a CartItem for each.

            Vanilla equivalent:
              if (cart.length === 0) {
                cartItemsEl.innerHTML = '<div class="cart-empty">...</div>';
              } else {
                cartItemsEl.innerHTML = cart.map(...).join('');
              }
          */}
          {cart.length === 0 ? (
            <div className="cart-empty">
              Your order is empty.<br />
              Add something delicious from the menu.
            </div>
          ) : (
            cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onChangeQty={onChangeQty}
                onRemove={onRemove}
              />
            ))
          )}
        </div>

        {/* Footer — instructions, total, send button */}
        <div className="cart-footer">

          <div className="cart-instructions">
            <label htmlFor="specialInstructions">
              Special Instructions
            </label>
            {/*
              React concept — controlled input:
              value={instructions} makes React own the input's value.
              onChange updates our `instructions` state on every keystroke.
              This replaces document.getElementById('specialInstructions').value
              in the vanilla version.
            */}
            <textarea
              id="specialInstructions"
              rows={3}
              placeholder="Any notes? e.g. extra syrup, allergen info…"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>

          <div className="cart-total">
            <span>Estimated Total</span>
            {/*
              className="cart-total-amount" replaces the vanilla id="cartTotal".
              We renamed it in globals.css at the same time.
            */}
            <span className="cart-total-amount">R{totalPrice}</span>
          </div>

          {/*
            The WhatsApp send button.
            Disabled and semi-transparent during cooldown.
            React handles this via the `disabled` prop and inline style —
            no manual DOM manipulation needed.
          */}
          <button
            className="btn-primary btn-wa"
            onClick={handleWhatsAppOrder}
            disabled={cooldown > 0}
            style={{ opacity: cooldown > 0 ? 0.5 : 1 }}
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d={WA_PATH} />
            </svg>
            Send Order via WhatsApp
          </button>

          {/*
            Cooldown message — only shown when cooldown > 0.
            Vanilla: waCooldownEl.style.display = 'block'
            React:   {cooldown > 0 && <p>...</p>}
          */}
          {cooldown > 0 && (
            <p className="wa-cooldown">
              You can send another message in {cooldown}s
            </p>
          )}

        </div>
      </aside>
    </>
  );
}

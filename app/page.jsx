'use client';

// app/page.jsx
// ─────────────────────────────────────────────────────────────
// The home page. This file does two jobs:
//
//  1. It assembles every section component into one page.
//  2. It owns all the shared state: cart items, active menu
//     tab, and whether the cart drawer is open.
//
// WHY STATE LIVES HERE (lifting state up):
//   The cart is needed by MenuCard (to add items), CartButton
//   (to show the count badge), and CartDrawer (to edit items).
//   Because multiple components need the same data, we keep
//   it in their shared parent — this file — and pass it down
//   as props. This is the core React pattern called
//   "lifting state up".
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react';

import Navbar       from '@/components/Navbar';
import Hero         from '@/components/Hero';
import Ticker       from '@/components/Ticker';
import Story        from '@/components/Story';
import MenuSection  from '@/components/MenuSection';
import Delivery     from '@/components/Delivery';
import Gallery      from '@/components/Gallery';
import Ingredients  from '@/components/Ingredients';
import Visit        from '@/components/Visit';
import Footer       from '@/components/Footer';
import CartButton   from '@/components/CartButton';
import CartDrawer   from '@/components/CartDrawer';

export default function HomePage() {

  // ── CART STATE ──────────────────────────────────────────
  // Vanilla: let cart = [];
  // React:   const [cart, setCart] = useState([]);
  //
  // useState([]) means:
  //   - cart      → the current value (starts as an empty array)
  //   - setCart   → the function you call to change it
  //
  // RULE: Never mutate state directly (e.g. cart.push(item)).
  // Always call setCart() with a new array. React watches
  // setCart — when you call it, React re-renders everything
  // that uses `cart`.
  const [cart, setCart] = useState(() => {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem('kunafe-cart');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
});

  // ── DRAWER STATE ────────────────────────────────────────
  // Vanilla: cartDrawer.classList.add('open')
  // React:   setIsCartOpen(true)
  //
  // Instead of reaching into the DOM to add/remove a CSS class,
  // we keep a boolean. The CartDrawer component reads this
  // boolean and applies the 'open' class itself via JSX.
  const [isCartOpen, setIsCartOpen] = useState(false);

  // ── ACTIVE MENU TAB STATE ───────────────────────────────
  const [activeTab, setActiveTab] = useState('kunafe');

  // ── SCROLL REVEAL ──────────────────────────────────────────
  // Vanilla equivalent (from app.js):
  //   const revealObserver = new IntersectionObserver(...)
  //   document.querySelectorAll('.reveal-up, ...').forEach(...)
  //
  // React equivalent: same logic, wrapped in useEffect so it
  // runs AFTER the page has first rendered (DOM is ready).
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const targets = document.querySelectorAll(
      '.reveal-up, .reveal-left, .reveal-right'
    );
    targets.forEach((el) => observer.observe(el));

    // Cleanup: disconnect when the component unmounts.
    return () => observer.disconnect();
  }, []); // Empty [] = run once after the first render only.

  // ── CART FUNCTIONS ──────────────────────────────────────
  // These replace addToCart(), removeFromCart(), and changeQty()
  // from app.js. They all work the same way, but instead of
  // manually patching the DOM afterwards, they call setCart()
  // which triggers a React re-render automatically.

  function addToCart(item) {
    setCart(prev => {
      // `prev` is the current cart array.
      // We never mutate it — we return a new array instead.
      const existing = prev.find(c => c.id === item.id);
      if (existing) {
        // Item already in cart — return a new array where
        // just that item's qty is incremented.
        return prev.map(c =>
          c.id === item.id ? { ...c, qty: c.qty + 1 } : c
        );
      }
      // New item — add it to the end of the array.
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(c => c.id !== id));
  }

  function changeQty(id, delta) {
    setCart(prev => {
      const item = prev.find(c => c.id === id);
      if (!item) return prev;
      // If qty would drop to 0, remove the item entirely.
      if (item.qty + delta <= 0) return prev.filter(c => c.id !== id);
      return prev.map(c =>
        c.id === id ? { ...c, qty: c.qty + delta } : c
      );
    });
  }

  // ── DERIVED VALUES ──────────────────────────────────────
  // These are not state — they are calculated from state.
  // React recalculates them every time the component re-renders.
  // Vanilla equivalent: getTotal() and getTotalQty() functions.

  useEffect(() => {
  localStorage.setItem('kunafe-cart', JSON.stringify(cart));
  }, [cart]);
  
  const totalQty   = cart.reduce((sum, c) => sum + c.qty, 0);
  const totalPrice = cart.reduce((sum, c) => sum + c.price * c.qty, 0);

  // ── RENDER ──────────────────────────────────────────────
  // JSX looks like HTML but it is JavaScript. A few rules:
  //   - class=""  becomes  className=""  (class is reserved in JS)
  //   - All tags must be closed, even <img /> and <br />
  //   - JavaScript expressions go inside { curly braces }
  //   - You can only return ONE root element (we use a Fragment <>)
  //
  // Props (the attributes on each component) work like HTML
  // attributes, except they can pass any JavaScript value:
  //   <CartButton totalQty={totalQty} />
  //   This passes the number `totalQty` to the CartButton component.
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Ticker />
        <Story />

        {/*
          MenuSection needs to know:
          - which tab is active (activeTab)
          - how to change the tab (setActiveTab)
          - how to add items to the cart (addToCart)
        */}
        <MenuSection
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onAddToCart={addToCart}
        />

        <Delivery />
        <Gallery />
        <Ingredients />
        <Visit />
        <Footer />
      </main>

      {/*
        CartButton and CartDrawer sit outside <main> so they
        float/slide over the page content, just like in the
        vanilla version where they were at the bottom of <body>.
      */}
      <CartButton
        totalQty={totalQty}
        onOpen={() => setIsCartOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        totalPrice={totalPrice}
        onChangeQty={changeQty}
        onRemove={removeFromCart}
      />
    </>
  );
}

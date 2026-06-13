'use client';

// components/Navbar.jsx
// ─────────────────────────────────────────────────────────────
// Fixed navigation bar.
//
// Vanilla JS did this:
//   window.addEventListener('scroll', () => {
//     navbar.classList.toggle('scrolled', window.scrollY > 40);
//   });
//   navToggle.addEventListener('click', () => {
//     navLinks.classList.toggle('open');
//   });
//
// React does this:
//   - useEffect adds the scroll listener once, after mount.
//   - useState holds `isScrolled` and `isMobileOpen`.
//   - The className on each element reacts to those booleans.
//   - No getElementById, no classList — just state + JSX.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react';

export default function Navbar() {

  // Tracks whether the page has scrolled past 40px.
  // When true, we add the 'scrolled' class which darkens the nav.
  const [isScrolled, setIsScrolled] = useState(false);

  // Tracks whether the mobile hamburger menu is open.
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // ── useEffect: scroll listener ──────────────────────────
  // useEffect(() => { ... }, []) means:
  //   - Run the function ONCE after the component first appears.
  //   - The empty [] is the "dependency array" — no deps means
  //     it only runs on mount (first render), not on updates.
  //
  // The function we return at the end is a CLEANUP function.
  // React calls it when the component is removed from the page.
  // We use it to remove the scroll listener, preventing memory leaks.
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 40);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup: remove the listener when the component unmounts.
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty array = run once on mount only.

  // ── Smooth scroll helper ────────────────────────────────
  // Replaces the document.querySelectorAll('a[href^="#"]') loop
  // from app.js. We handle it here so we can also close the
  // mobile menu at the same time.
  function handleNavClick(e, href) {
    e.preventDefault();
    setIsMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }

  // ── JSX ─────────────────────────────────────────────────
  // Notice: className instead of class (JavaScript reserved word).
  // Template literals work fine: `nav-links${isMobileOpen ? ' open' : ''}`
  //
  // The `id="navbar"` stays because the CSS uses #navbar for styling.
  return (
    <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
      <div className="nav-inner">

        {/* Logo — clicking scrolls to top */}
        <a
          href="#hero"
        className="nav-logo"
        onClick={(e) => handleNavClick(e, '#hero')}
        >
        <img
        src="/images/logo.png"
        alt="The Kunafe Connoisseur"
        style={{ height: '52px', width: 'auto', objectFit: 'contain' }}
        />
        </a>

        {/* Hamburger button — only visible on mobile via CSS */}
        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={isMobileOpen}
          onClick={() => setIsMobileOpen(prev => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Nav links — 'open' class added when isMobileOpen is true */}
        <ul className={`nav-links${isMobileOpen ? ' open' : ''}`}>
          <li>
            <a href="#about" onClick={(e) => handleNavClick(e, '#about')}>
              Our Story
            </a>
          </li>
          <li>
            <a href="#menu" onClick={(e) => handleNavClick(e, '#menu')}>
              Menu
            </a>
          </li>
          <li>
            <a href="#features" onClick={(e) => handleNavClick(e, '#features')}>
              Ingredients
            </a>
          </li>
          <li>
            <a href="#visit" onClick={(e) => handleNavClick(e, '#visit')}>
              Order &amp; Hours
            </a>
          </li>
          <li>
            <a
              href="#menu"
              className="nav-cta"
              onClick={(e) => handleNavClick(e, '#menu')}
            >
              Order Now
            </a>
          </li>
        </ul>

      </div>
    </nav>
  );
}

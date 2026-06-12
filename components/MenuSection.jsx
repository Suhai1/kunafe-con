'use client';

// components/MenuSection.jsx
// ─────────────────────────────────────────────────────────────
// The full menu section. It contains the tabs and the card grid.
//
// This component receives props from page.jsx:
//   - activeTab     → which tab is currently selected
//   - setActiveTab  → function to change the active tab
//   - onAddToCart   → function to add an item to the cart
//
// WHY "use client"?
//   MenuSection receives `onAddToCart` which is a function
//   that calls `setCart` in page.jsx. Functions passed as
//   props must stay on the client side.
// ─────────────────────────────────────────────────────────────

import { MENU } from '@/data/menu';
import MenuTabs from './MenuTabs';
import MenuCard from './MenuCard';

// Props destructuring: we pull out the three props by name.
// This is equivalent to:
//   function MenuSection(props) {
//     const activeTab    = props.activeTab;
//     const setActiveTab = props.setActiveTab;
//     const onAddToCart  = props.onAddToCart;
//   }
export default function MenuSection({ activeTab, setActiveTab, onAddToCart }) {

  // Get the items for the currently active tab.
  // Vanilla equivalent: const items = MENU[tab] || [];
  const items = MENU[activeTab] || [];

  return (
    <section id="menu">

      <div className="menu-header reveal-up">
        <p className="section-label">The Menu</p>
        <h2 className="section-title">Choose your indulgence.</h2>
        <p className="menu-intro">
          All items are made to order. Place your order in advance — same-day
          requests considered depending on availability.
        </p>
      </div>

      {/*
        MenuTabs handles the tab buttons.
        We pass it the current tab and the function to change it.
      */}
      <MenuTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/*
        React concept — .map() to render a list of components.
        For each item in the active tab, we render a MenuCard.
        Each card gets the item data and the addToCart function.

        Vanilla equivalent:
          menuGrid.innerHTML = items.map(item => `<article>...</article>`).join('');
          // then manually re-attach event listeners

        React:
          - No innerHTML strings
          - No event listener re-attachment
          - Just a .map() that returns JSX components
          - Each component manages its own onClick internally
      */}
      <div className="menu-grid">
        {items.map((item, index) => (
          <MenuCard
            key={item.id}
            item={item}
            index={index}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

    </section>
  );
}

'use client';

// components/MenuTabs.jsx
// ─────────────────────────────────────────────────────────────
// The tab buttons above the menu grid (Kunafe / Baklava).
//
// Props received:
//   - activeTab   → the currently selected tab ('kunafe' or 'baklava')
//   - onTabChange → function to call when a tab is clicked
//
// Vanilla equivalent:
//   tabBtns.forEach(btn => {
//     btn.addEventListener('click', () => {
//       tabBtns.forEach(b => b.classList.remove('active'));
//       btn.classList.add('active');
//       renderMenu(btn.dataset.tab);
//     });
//   });
//
// React equivalent:
//   - onClick calls onTabChange(tab)
//   - page.jsx updates activeTab state
//   - MenuSection re-renders with the new tab's items
//   - className={`tab-btn${activeTab === tab ? ' active' : ''}`}
//     automatically applies the 'active' class to the right button
// ─────────────────────────────────────────────────────────────

// The available tabs, defined as data so we can .map() them.
const TABS = [
  { id: 'kunafe',  label: 'Kunafe'  },
  { id: 'baklava', label: 'Baklava' },
];

export default function MenuTabs({ activeTab, onTabChange }) {
  return (
    <div className="menu-tabs reveal-up">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          // Conditional className: 'tab-btn active' if this is the active tab,
          // otherwise just 'tab-btn'.
          className={`tab-btn${activeTab === tab.id ? ' active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

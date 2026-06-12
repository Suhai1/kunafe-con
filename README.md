# The Kunafe Connoisseur — Next.js App

A Next.js 14 (App Router) conversion of the vanilla HTML/CSS/JS
Kunafe Connoisseur restaurant landing page with WhatsApp ordering.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project structure

```
kunafe-con/
├── app/
│   ├── globals.css       ← All styles (converted from styles.css)
│   ├── layout.jsx        ← Root HTML shell + SEO metadata
│   └── page.jsx          ← Home page + all shared state (cart, tab, drawer)
│
├── components/
│   ├── Navbar.jsx        ← Fixed nav with scroll detection + mobile menu
│   ├── Hero.jsx          ← Full-height hero section
│   ├── Ticker.jsx        ← Scrolling marquee strip
│   ├── Story.jsx         ← About / Our Story section
│   ├── MenuSection.jsx   ← Menu container (tabs + card grid)
│   ├── MenuTabs.jsx      ← Tab switcher buttons
│   ├── MenuCard.jsx      ← Single menu item card
│   ├── Gallery.jsx       ← Photo grid strip
│   ├── Delivery.jsx      ← CTA banner section
│   ├── Ingredients.jsx   ← Tag cloud section
│   ├── Visit.jsx         ← Hours + ordering info section
│   ├── Footer.jsx        ← Three-column footer
│   ├── CartButton.jsx    ← Floating cart button
│   ├── CartDrawer.jsx    ← Slide-out cart with WhatsApp ordering
│   └── CartItem.jsx      ← Single cart row (qty controls + remove)
│
├── data/
│   └── menu.js           ← Menu data + WhatsApp number (edit here)
│
├── public/
│   └── assets/           ← Put local images here if needed
│
├── next.config.js        ← Allows Unsplash image URLs
├── package.json
└── README.md
```

---

## Key React concepts used

| Concept | Where |
|---|---|
| `useState` | `page.jsx` (cart, tab, drawer), `Navbar` (scroll, mobile menu), `CartDrawer` (instructions, cooldown) |
| `useEffect` | `Navbar` (scroll listener), `page.jsx` (IntersectionObserver), `CartDrawer` (body scroll lock, cooldown timer) |
| Props | Every component receives data from its parent |
| Lifting state up | Cart state lives in `page.jsx` and flows down to `MenuCard`, `CartButton`, and `CartDrawer` |
| Conditional rendering | `CartButton` (`if qty === 0 return null`), `CartDrawer` (empty state, cooldown message) |
| `.map()` | `Ticker`, `Story`, `MenuSection`, `MenuTabs`, `Visit`, `Footer`, `CartDrawer`, `Gallery`, `Ingredients` |
| Event handlers | `onClick` on all buttons, `onChange` on the textarea |
| `"use client"` | Only on interactive components: `Navbar`, `MenuSection`, `MenuTabs`, `MenuCard`, `CartButton`, `CartDrawer`, `CartItem`, `page.jsx` |

---

## To update the menu

Edit `data/menu.js` only. Add, remove, or change items in the
`kunafe` or `baklava` arrays. The page re-renders automatically.

## To change the WhatsApp number

Change `WHATSAPP_NUMBER` in `data/menu.js`.

---

## Checklist — test these after running `npm run dev`

- [ ] Page loads without errors in the browser console
- [ ] Navbar goes dark when you scroll down
- [ ] Mobile hamburger menu opens and closes (resize to < 900px)
- [ ] Clicking a nav link smooth-scrolls to the right section
- [ ] Kunafe / Baklava tabs switch the menu cards
- [ ] "Add to Order" button on a card shows the floating cart button
- [ ] Cart count in the floating button matches items added
- [ ] Floating cart button opens the cart drawer
- [ ] + and − buttons change item quantity
- [ ] Quantity reaching 0 removes the item
- [ ] Remove button removes the item
- [ ] Cart empty state shows when all items removed
- [ ] Estimated total updates correctly
- [ ] Special instructions textarea accepts text
- [ ] "Send Order via WhatsApp" opens wa.me with the correct message
- [ ] WhatsApp button is disabled for 30 seconds after sending
- [ ] Cooldown countdown displays correctly
- [ ] Clicking the backdrop closes the cart drawer
- [ ] Scroll reveal animations fire as you scroll down
- [ ] Site is fully responsive at 375px, 768px, and 1200px

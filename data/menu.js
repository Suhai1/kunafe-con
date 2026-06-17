// data/menu.js
// ─────────────────────────────────────────────────────────────
// All menu items live here. To add, remove, or update items,
// this is the only file you need to touch.
// ─────────────────────────────────────────────────────────────

export const WHATSAPP_NUMBER = '27837212463';

export const MENU = {
  kunafe: [
    {
      id: 'ku-med-unbaked',
      name: 'Medium Kunafe — Unbaked',
      desc: 'Our classic kunafe ready to bake at home. Creamy cheese filling layered in golden kataifi pastry, finished with crushed pistachios. Serves 4–6.',
      price: 140,
      serves: 'Serves 4–6',
      badge: 'Popular',
      badgeClass: 'badge-popular',
      img: '/images/kunafe-unbaked-medium.jpg',
      imgAlt: 'Medium unbaked kunafe trays with branded Kunafe Connoisseur card',
    },
    {
      id: 'ku-med-baked',
      name: 'Medium Kunafe — Baked',
      desc: 'Freshly baked to perfection. Same irresistible cheese filling and pistachio crown, served ready to enjoy. Serves 4–6.',
      price: 160,
      serves: 'Serves 4–6',
      badge: 'Ready to Eat',
      badgeClass: 'badge-signature',
      img: '/images/kunafe-baked-slice.jpg',
      imgAlt: 'Sliced baked kunafe with rose petals and pistachios',
    },
    {
      id: 'ku-large-unbaked',
      name: 'Large Kunafe — Unbaked',
      desc: 'The showstopper for gatherings. A generous family-sized tray you finish in your own oven. Creamy, fragrant, and utterly spectacular. Serves 12–16.',
      price: 300,
      serves: 'Serves 12–16',
      badge: 'Family Tray',
      badgeClass: 'badge-premium',
      img: '/images/kunafe-unbaked-large.jpg',
      imgAlt: 'Two large unbaked kunafe trays on wooden board',
    },
    {
      id: 'ku-large-baked',
      name: 'Large Kunafe — Baked',
      desc: 'Our largest tray, baked golden and ready for your table. The centrepiece every celebration deserves. Serves 12–16.',
      price: 320,
      serves: 'Serves 12–16',
      badge: 'Signature',
      badgeClass: 'badge-signature',
      img: '/images/kunafe-baked-large.jpg',
      imgAlt: 'Golden baked kunafe overhead with rose petals and pistachios',
    },
  ],
  baklava: [
    {
      id: 'bak-full',
      name: 'Baklava Full Tray',
      desc: 'A complete tray of our handcrafted baklava. Layers of delicate filo pastry, premium nuts, and fragrant honey syrup. Perfect for gifting or entertaining.',
      price: 700,
      serves: 'Full Tray',
      badge: 'Premium',
      badgeClass: 'badge-premium',
      img: '/images/baklava-tray.jpg',
      imgAlt: 'Full baklava tray with syrup being poured',
    },
    
    // Temporarily removed — add back when available
// {
//   id:         'bak-dozen',
//   name:       'Baklava — 1 Dozen',
//   desc:       'Twelve pieces of our golden, nut-filled baklava. A sweet gift or the perfect addition to your dessert spread.',
//   price:      70,
//   serves:     '12 Pieces',
//   badge:      'Popular',
//   badgeClass: 'badge-popular',
//   img:        '/images/baklava-dozen.jpg',
//   imgAlt:     'Baklava dozen pieces in delivery boxes',
// },
    
    {
      id: 'bak-block',
      name: 'Baklava Big Blocks',
      desc: 'Our generously cut baklava blocks — thick, rich, and indulgent. Sold in 4\'s.',
      price: 25,
      serves: 'Per Block',
      badge: 'Individual',
      badgeClass: 'badge-signature',
      img: '/images/baklava-block.jpg',
      imgAlt: 'Individual baklava block on plate with fork',
    },
  ],
};
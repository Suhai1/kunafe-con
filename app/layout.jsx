// app/layout.jsx
// ─────────────────────────────────────────────────────────────
// This is the root layout. It wraps every page in the app.
// Think of it as the <html>, <head>, and <body> from index.html.
//
// Next.js reads the `metadata` export automatically and puts
// the right <meta> tags into the <head> for you — no manual
// HTML needed.
// ─────────────────────────────────────────────────────────────

import './globals.css';

// The `metadata` object replaces all the <meta> tags from index.html.
// Next.js turns this into real HTML <meta> tags at build time.
export const metadata = {
  title: 'The Kunafe Connoisseur — Artisan Middle Eastern Desserts | PE & Uitenhage',
  description:
    'The Kunafe Connoisseur crafts authentic, handmade kunafe and baklava in Port Elizabeth and Uitenhage. Family-sized trays, creamy cheese filling, baked or unbaked. Order via WhatsApp.',
  keywords:
    'kunafe, kunafa, baklava, Middle Eastern desserts, Port Elizabeth, PE, Uitenhage, halaal, artisan, handmade, pistachio',
  robots: 'index, follow',
  themeColor: '#8B7340',
  openGraph: {
    title: 'The Kunafe Connoisseur — Handcrafted Kunafe & Baklava',
    description:
      'Authentic kunafe with creamy cheese filling, topped with crushed pistachios. Family-sized trays available in PE & Uitenhage. Order via WhatsApp today.',
    url: 'https://thekunafeconnoisseur.co.za/',
    siteName: 'The Kunafe Connoisseur',
    images: [
      {
        url: 'https://thekunafeconnoisseur.co.za/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Kunafe Connoisseur',
    description:
      'Authentic handmade kunafe and baklava in Port Elizabeth & Uitenhage.',
    images: ['https://thekunafeconnoisseur.co.za/og-image.jpg'],
  },
};

// RootLayout is a component. It receives `children` as a prop.
// `children` = whatever page content Next.js is rendering right now.
// On the home page, children = the content from app/page.jsx.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        Next.js automatically fills in the <head> using the `metadata`
        object above. You do not write <head> manually.
      */}
      <body>
        {/*
          `children` is rendered here — between the opening and
          closing <body> tags. This is where your page content appears.
        */}
        {children}
      </body>
    </html>
  );
}

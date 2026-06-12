// components/Ingredients.jsx
// ─────────────────────────────────────────────────────────────
// The ingredients / features tag cloud section.
// Server Component — no interactivity.
// ─────────────────────────────────────────────────────────────

// Each tag has text and an optional extra CSS class.
const TAGS = [
  { text: 'Kataifi Pastry',   cls: 'tag-large'  },
  { text: 'Pistachios',       cls: ''            },
  { text: 'Rose Syrup',       cls: 'tag-accent'  },
  { text: 'Creamy Cheese',    cls: 'tag-large'   },
  { text: 'Orange Blossom',   cls: ''            },
  { text: 'Golden Butter',    cls: 'tag-accent'  },
  { text: 'Walnuts',          cls: ''            },
  { text: 'Flaky Filo',       cls: 'tag-large'   },
  { text: 'Honey',            cls: 'tag-accent'  },
  { text: 'Pure Cane Sugar',  cls: ''            },
  { text: 'Cardamom',         cls: ''            },
  { text: 'Love & Craft',     cls: 'tag-large'   },
];

export default function Ingredients() {
  return (
    <section id="features">

      <div className="features-header reveal-up">
        <p className="section-label">What goes in</p>
        <h2 className="section-title">Every ingredient tells a story.</h2>
      </div>

      <div className="tag-cloud reveal-up">
        {TAGS.map((tag) => (
          // Template literal builds the className string.
          // `tag tag-large` or `tag tag-accent` or just `tag`.
          <span
            key={tag.text}
            className={`tag${tag.cls ? ` ${tag.cls}` : ''}`}
          >
            {tag.text}
          </span>
        ))}
      </div>

    </section>
  );
}

import { useState, useEffect } from "react";
import { NAV_LINKS } from "../data";

export default function Nav({ scrollY }) {
  const [open,   setOpen]   = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    // Watch sections whose IDs match a nav href (strip the #)
    const ids = NAV_LINKS
      .filter(l => l.href.startsWith('#') && l.href !== '#top')
      .map(l => l.href.slice(1));

    const els = ids
      .map(id => document.getElementById(id))
      .filter(Boolean);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive('#' + entry.target.id);
        });
      },
      // Thin band at ~25% from the top — whichever section sits there is "active"
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <nav className={`nav${scrollY > 60 ? " scrolled" : ""}`}>
      <a href="#top" className="nav-logo">SKL</a>

      <button
        className={`nav-toggle${open ? " open" : ""}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle navigation"
      >
        <span /><span /><span />
      </button>

      <div className={`nav-links${open ? " open" : ""}`}>
        {NAV_LINKS.map(l => (
          <a
            key={l.key}
            href={l.href}
            className={`nav-link${l.href === active ? ' nav-link--active' : ''}`}
            target={l.href.startsWith('http') ? '_blank' : undefined}
            rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            onClick={() => setOpen(false)}
          >
            <span className="nav-key">[{l.key}]</span> {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

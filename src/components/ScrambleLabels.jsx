import { useEffect } from 'react';

const CHARS = '!<>-_\\/[]{}=+*^?#@~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function scramble(el, original, duration = 1400) {
  const total = Math.round(duration / 48);
  let frame = 0;
  let raf;

  const tick = () => {
    const revealed = Math.floor((frame / total) * original.length);
    let out = '';
    for (let i = 0; i < original.length; i++) {
      if (i < revealed || original[i] === ' ' || original[i] === '/') {
        out += original[i]; // keep slashes stable — they're part of the path
      } else {
        out += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
    }
    el.textContent = out;
    frame++;
    if (frame <= total) {
      raf = requestAnimationFrame(tick);
    } else {
      el.textContent = original;
    }
  };

  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

export default function ScrambleLabels() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const labels = document.querySelectorAll('.section-label');

    // Save originals before any manipulation
    const originals = new Map();
    labels.forEach(el => originals.set(el, el.textContent));

    const cancellers = new Map();

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const original = originals.get(el);
          if (!original) return;
          if (reduced) { el.textContent = original; return; }
          const cancel = scramble(el, original);
          cancellers.set(el, cancel);
          obs.unobserve(el);
        });
      },
      { threshold: 0.6 }
    );

    labels.forEach(el => obs.observe(el));

    return () => {
      obs.disconnect();
      cancellers.forEach(cancel => cancel());
    };
  }, []);

  return null;
}

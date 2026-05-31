import { useEffect } from 'react';

const MAX_TILT = 7; // degrees

export default function CardTilt() {
  useEffect(() => {
    const cards = document.querySelectorAll('.project-card, .skill-card');
    const listeners = new Map();

    cards.forEach(card => {
      const onMove = function (e) {
        const r = this.getBoundingClientRect();
        const x = (e.clientX - r.left)  / r.width  - 0.5; // -0.5 → 0.5
        const y = (e.clientY - r.top)   / r.height - 0.5;
        this.style.transition = 'transform 0.08s linear, background 0.2s';
        this.style.transform  =
          `perspective(700px) rotateX(${-y * MAX_TILT}deg) rotateY(${x * MAX_TILT}deg)`;
      };

      const onLeave = function () {
        // spring-back easing: slight overshoot then settle
        this.style.transition = 'transform 0.55s cubic-bezier(0.34,1.56,0.64,1), background 0.2s';
        this.style.transform  = 'none';
      };

      card.addEventListener('mousemove',  onMove);
      card.addEventListener('mouseleave', onLeave);
      listeners.set(card, { onMove, onLeave });
    });

    return () => {
      listeners.forEach(({ onMove, onLeave }, card) => {
        card.removeEventListener('mousemove',  onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return null;
}

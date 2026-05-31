import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const ref = useRef(null);
  const state = useRef({ x: -1000, y: -1000, tx: -1000, ty: -1000, raf: null });

  useEffect(() => {
    const s = state.current;

    const onMove = (e) => { s.tx = e.clientX; s.ty = e.clientY; };
    window.addEventListener('mousemove', onMove, { passive: true });

    const tick = () => {
      s.raf = requestAnimationFrame(tick);
      s.x += (s.tx - s.x) * 0.08;
      s.y += (s.ty - s.y) * 0.08;
      // Only transform updates — no layout, no paint, pure compositor
      ref.current.style.transform = `translate(${s.x - 350}px, ${s.y - 350}px)`;
    };
    s.raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(s.raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" />;
}

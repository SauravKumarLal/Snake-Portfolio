import { useRef, useEffect, useCallback } from "react";

export default function GenerativeArt({ width = 600, height = 400 }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);

  const draw = useCallback((ctx, t) => {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    ctx.clearRect(0, 0, w, h);

    const count = 80;
    const cx = w / 2;
    const cy = h / 2;

    for (let i = 0; i < count; i++) {
      const ratio = i / count;
      const angle = ratio * Math.PI * 6 + t * 0.4;
      const radius = ratio * Math.min(w, h) * 0.42;
      const twist = Math.sin(t * 0.3 + ratio * 8) * 30;

      const x = cx + Math.cos(angle) * radius + twist;
      const y = cy + Math.sin(angle) * radius * 0.6 + Math.cos(angle + t * 0.2) * 20;
      const size = 1.5 + ratio * 3;
      const alpha = 0.15 + ratio * 0.6;

      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(168,164,255,${alpha})`;
      ctx.fill();

      if (i > 0) {
        const pr = (i - 1) / count;
        const pa = pr * Math.PI * 6 + t * 0.4;
        const pRadius = pr * Math.min(w, h) * 0.42;
        const pTwist = Math.sin(t * 0.3 + pr * 8) * 30;
        const px = cx + Math.cos(pa) * pRadius + pTwist;
        const py = cy + Math.sin(pa) * pRadius * 0.6 + Math.cos(pa + t * 0.2) * 20;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(99,91,255,${alpha * 0.35})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }

    for (let i = 0; i < 60; i++) {
      const a = (i / 60) * Math.PI * 2 + t * 0.15;
      const r = Math.min(w, h) * 0.44 + Math.sin(a * 3 + t) * 8;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r * 0.6;
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(168,164,255,0.18)`;
      ctx.fill();
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const loop = () => {
      timeRef.current += 0.008;
      draw(ctx, timeRef.current);
      animRef.current = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(animRef.current);
  }, [width, height, draw]);

  return <canvas ref={canvasRef} style={{ width, height, display: "block" }} />;
}

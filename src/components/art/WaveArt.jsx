import { useRef, useEffect } from "react";

export default function WaveArt({ width = 300, height = 200 }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const loop = () => {
      timeRef.current += 0.01;
      const t = timeRef.current;
      ctx.clearRect(0, 0, width, height);

      for (let row = 0; row < 12; row++) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 3) {
          const y =
            height * 0.1 +
            row * (height / 13) +
            Math.sin(x * 0.015 + t + row * 0.8) * 8 +
            Math.cos(x * 0.008 + t * 1.3) * 4;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(99,91,255,${0.08 + row * 0.025})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
      animRef.current = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(animRef.current);
  }, [width, height]);

  return <canvas ref={canvasRef} style={{ width, height, display: "block" }} />;
}

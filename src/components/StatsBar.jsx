import { useEffect, useRef, useState } from 'react';

const STATS = [
  {
    to: 7000, duration: 1800,
    format: v => v.toLocaleString() + '+',
    label: 'Active users',
  },
  {
    to: 400,  duration: 1500,
    format: v => v + '+',
    label: 'Enterprise customers',
  },
  {
    to: 99.7, duration: 1600, float: true,
    format: v => v.toFixed(1) + '%',
    label: 'API failure reduction',
  },
  {
    to: 40,   duration: 1400,
    format: v => v + '%',
    label: 'AI accuracy improvement',
  },
];

function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

export default function StatsBar() {
  const [values,    setValues]    = useState(STATS.map(() => 0));
  const [triggered, setTriggered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || triggered) return;
        setTriggered(true);
        obs.disconnect();

        const start = performance.now();
        const tick = (now) => {
          const next = STATS.map((stat, i) => {
            const t = Math.min((now - start) / stat.duration, 1);
            return stat.float
              ? stat.to * easeOutCubic(t)
              : Math.round(stat.to * easeOutCubic(t));
          });
          setValues(next);
          if (next.some((v, i) => v < STATS[i].to)) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [triggered]);

  return (
    <div className="stats-bar" ref={ref}>
      <div className="stats-bar__inner">
        {STATS.map((stat, i) => (
          <div key={i} className="stat-item">
            <p className="stat-value">{stat.format(values[i])}</p>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState } from "react";
import { EXPERIENCE } from "../data";
import WaveArt from "./art/WaveArt";

const PREVIEW = 3; // bullets shown by default

function ExpBlock({ exp }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore   = exp.bullets.length > PREVIEW;
  const visible   = expanded ? exp.bullets : exp.bullets.slice(0, PREVIEW);
  const remaining = exp.bullets.length - PREVIEW;

  return (
    <div className="exp-block">
      <div className="exp-header">
        <div>
          <h3 className="exp-company">{exp.company}</h3>
          <p className="exp-role">{exp.role}</p>
        </div>
        <div className="exp-meta">
          <p className="exp-period">{exp.period}</p>
          <p className="exp-location">{exp.location}</p>
        </div>
      </div>

      <ul className="exp-list">
        {visible.map((b, j) => (
          <li key={j} className="exp-item">{b}</li>
        ))}
      </ul>

      {hasMore && (
        <button
          className="exp-toggle"
          onClick={() => setExpanded(e => !e)}
        >
          {expanded
            ? '[ — collapse ]'
            : `[ + ${remaining} more ]`}
        </button>
      )}
    </div>
  );
}

export default function Experience({ artSize }) {
  return (
    <section id="experience" className="section">
      <div className="section-header">
        <p className="section-label">/Experience</p>
        <div className="section-art">
          <span className="fig-label">[ Fig. 2 ] — fourier wave decomposition</span>
          <WaveArt width={Math.min(artSize.w, 320)} height={140} />
        </div>
      </div>

      {EXPERIENCE.map(exp => (
        <ExpBlock key={exp.company} exp={exp} />
      ))}
    </section>
  );
}

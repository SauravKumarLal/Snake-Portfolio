import { LEADERSHIP } from "../data";

export default function Leadership() {
  return (
    <section id="leadership" className="section">
      <div className="section-header">
        <p className="section-label">/Leadership</p>
      </div>

      {LEADERSHIP.map((l) => (
        <div key={l.org} className="exp-block">
          <div className="exp-header">
            <div>
              <h3 className="exp-company">{l.org}</h3>
              <p className="exp-role">{l.role}</p>
            </div>
            <div className="exp-meta">
              <p className="exp-period">{l.period}</p>
            </div>
          </div>
          <ul className="exp-list">
            {l.bullets.map((b, i) => (
              <li key={i} className="exp-item">{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

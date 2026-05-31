import { EDUCATION } from "../data";

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="section-header">
        <p className="section-label">/Education</p>
      </div>

      <div className="edu-list">
        {EDUCATION.map((e) => (
          <div key={e.school} className="edu-block">
            <div className="exp-header">
              <div>
                <h3 className="exp-company">{e.school}</h3>
                <p className="exp-role">{e.degree}</p>
                {e.note && <p className="edu-note">{e.note}</p>}
              </div>
              <div className="exp-meta">
                <p className="exp-period">{e.period}</p>
                {e.location && <p className="exp-location">{e.location}</p>}
                <p className="edu-grade">{e.grade}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

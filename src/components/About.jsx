import { ABOUT_BLURB, SKILLS } from "../data";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="section-header">
        <p className="section-label">/About</p>
      </div>

      <p className="about-blurb">{ABOUT_BLURB}</p>

      <p className="skills-subheader">Technical Skills</p>
      <div className="skills-grid">
        {SKILLS.map((s) => (
          <div key={s.cat} className="skill-card">
            <p className="skill-cat">{s.cat}</p>
            <p className="skill-items">{s.items}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

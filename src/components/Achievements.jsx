import { ACHIEVEMENTS } from "../data";

export default function Achievements() {
  return (
    <section id="achievements" className="section">
      <div className="section-header">
        <p className="section-label">/Achievements</p>
      </div>

      <div className="achieve-list">
        {ACHIEVEMENTS.map((a, i) => (
          <div key={i} className="achieve-item">
            <span className="achieve-bullet">◆</span>
            <span>{a}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

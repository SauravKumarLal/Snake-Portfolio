import { PROJECTS } from "../data";
import { useState, useEffect } from "react";

const DEPLOY_STEPS = [
  { text: "compiling TypeScript...",    stat: "1.8s",   delay: 500  },
  { text: "running test suite...",      stat: "47/47",  delay: 1100 },
  { text: "pushing to AWS...",          stat: "OK",     delay: 1800 },
  { text: "invalidating CloudFront...", stat: "OK",     delay: 2400 },
];
const LIVE_DELAY  = 3200;
const RESET_DELAY = 6200;

function DeployTerminal() {
  const [steps,   setSteps]   = useState([]);
  const [live,    setLive]    = useState(false);
  const [cycle,   setCycle]   = useState(0);

  useEffect(() => {
    setSteps([]);
    setLive(false);

    const timers = DEPLOY_STEPS.map((s, i) =>
      setTimeout(() => setSteps(prev => [...prev, i]), s.delay)
    );
    const t1 = setTimeout(() => setLive(true),  LIVE_DELAY);
    const t2 = setTimeout(() => setCycle(c => c + 1), RESET_DELAY);

    return () => { timers.forEach(clearTimeout); clearTimeout(t1); clearTimeout(t2); };
  }, [cycle]);

  return (
    <div className="project-card deploy-card" aria-hidden="true">
      <div className="deploy-header">
        <span className="deploy-dot deploy-dot--red"   />
        <span className="deploy-dot deploy-dot--yellow"/>
        <span className="deploy-dot deploy-dot--green" />
        <span className="deploy-title">deploy.sh</span>
      </div>

      <p className="deploy-cmd">
        <span className="deploy-prompt">sauravkrlal@prod:~$</span> npm run deploy
      </p>

      <div className="deploy-steps">
        {DEPLOY_STEPS.map((s, i) => (
          <div key={i} className={`deploy-step${steps.includes(i) ? " deploy-step--in" : ""}`}>
            <span className="deploy-step-text">{s.text}</span>
            <span className="deploy-step-stat">{s.stat} <span className="deploy-tick">✓</span></span>
          </div>
        ))}
      </div>

      {live && (
        <p className="deploy-live">
          <span className="deploy-live-dot">●</span>
          {" "}live · serving <strong>7,000+</strong> users
        </p>
      )}
    </div>
  );
}

function CollaborateCard() {
  return (
    <div className="project-card collab-card">
      <p className="collab-prompt">~/collaborate $</p>
      <h3 className="collab-heading">Have an idea?</h3>
      <p className="collab-sub">
        I build distributed systems, GenAI pipelines, and full-stack products.
        Let's ship something together.
      </p>
      <a href="#contact" className="collab-cta">[ Get in touch ] →</a>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-header">
        <p className="section-label">/Projects</p>
      </div>

      <div className="projects-grid">
        {PROJECTS.map((p, i) => (
          <div key={p.name} className="project-card">
            <div className="project-idx">{String(i + 1).padStart(2, "0")}</div>
            <h3 className="project-name">{p.name}</h3>
            <p className="project-desc">{p.desc}</p>
            <p className="project-detail">{p.detail}</p>
            {p.stack && <p className="project-stack">{p.stack}</p>}
            {p.links.length > 0 && (
              <div className="project-links">
                {p.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    [{l.label}] →
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}

        <DeployTerminal />
        <CollaborateCard />
      </div>
    </section>
  );
}

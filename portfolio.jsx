import { useState, useEffect, useRef, useCallback } from "react";

// --- Generative Art Canvas Component ---
function GenerativeArt({ width = 600, height = 400, seed = 42 }) {
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
      const y =
        cy + Math.sin(angle) * radius * 0.6 + Math.cos(angle + t * 0.2) * 20;

      const size = 1.5 + ratio * 3;
      const alpha = 0.15 + ratio * 0.6;

      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();

      if (i > 0) {
        const prevRatio = (i - 1) / count;
        const prevAngle = prevRatio * Math.PI * 6 + t * 0.4;
        const prevRadius = prevRatio * Math.min(w, h) * 0.42;
        const prevTwist = Math.sin(t * 0.3 + prevRatio * 8) * 30;
        const px = cx + Math.cos(prevAngle) * prevRadius + prevTwist;
        const py =
          cy +
          Math.sin(prevAngle) * prevRadius * 0.6 +
          Math.cos(prevAngle + t * 0.2) * 20;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.25})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }

    // outer ring
    for (let i = 0; i < 60; i++) {
      const a = (i / 60) * Math.PI * 2 + t * 0.15;
      const r = Math.min(w, h) * 0.44 + Math.sin(a * 3 + t) * 8;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r * 0.6;
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, 0.2)`;
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

// --- Second art variant for experience section ---
function WaveArt({ width = 300, height = 200 }) {
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
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.06 + row * 0.02})`;
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

// --- Data ---
const NAV_LINKS = [
  { key: "A", label: "About", href: "#about" },
  { key: "E", label: "Experience", href: "#experience" },
  { key: "P", label: "Projects", href: "#projects" },
  { key: "C", label: "Contact", href: "#contact" },
  { key: "L", label: "LinkedIn", href: "https://linkedin.com/in/sauravkrlal" },
  { key: "G", label: "GitHub", href: "https://github.com/SauravKumarLal" },
];

const SKILLS = [
  {
    cat: "Backend & Distributed Systems",
    items:
      "Node.js, TypeScript, Express.js, REST APIs, Microservices, Apache Kafka, WebSockets, Redis",
  },
  { cat: "Auth & Security", items: "OAuth2, Azure AD, SSO, JWT, RBAC" },
  {
    cat: "AI/ML & GenAI",
    items: "AWS Bedrock, Claude, GPT, LangChain, RAG, MCP, Milvus, ChromaDB",
  },
  { cat: "Databases & Search", items: "MongoDB, Elasticsearch, MySQL" },
  {
    cat: "Infrastructure",
    items: "Linux, Nginx, IIS, Jenkins, PM2, Load Balancing",
  },
  { cat: "Programming", items: "JavaScript, TypeScript, Python, C++, SQL" },
];

const EXPERIENCE = [
  {
    company: "Ramco Systems",
    role: "Software Engineer",
    period: "Feb 2025 — Present",
    location: "Chennai, India",
    bullets: [
      "Own and maintain end-to-end backend systems for the rTask ecosystem, serving 7,000+ users across 400+ enterprise customers and supporting 8–9 lakh API requests daily.",
      "Act as the primary technical owner for a 4-member engineering team, driving task planning, code reviews, release coordination, and production issue resolution.",
      "Reduced API failures from 8,000/day to less than 20/day through deep log analysis, root-cause debugging, and performance tuning.",
      "Design and maintain distributed backend services using Node.js, TypeScript, Kafka, Redis, MongoDB, Elasticsearch, and WebSockets.",
      "Design enterprise authentication flows using OAuth2, Azure AD, JWT access/refresh token lifecycles, and RBAC.",
      "Built secure Model Context Protocol (MCP) integrations with token-based authentication and per-user authorization for enterprise AI workflows.",
      "Implemented production-grade RAG pipelines using LangChain, AWS Bedrock, Milvus, and ChromaDB, improving AI response accuracy by 40%.",
      "Integrated Claude and GPT models via AWS Bedrock, enabling intelligent automation handling 10K+ monthly enterprise AI queries.",
    ],
  },
  {
    company: "Samsung R&D Institute",
    role: "Research Intern",
    period: "Dec 2023 — Apr 2024",
    location: "Bengaluru, India",
    bullets: [
      "Developed and optimized GAN-based generative models for automated video generation, reducing processing time by 20%.",
      "Implemented deep learning pipelines leveraging Open Sora Plan framework for efficient video format processing and model training.",
    ],
  },
];

const PROJECTS = [
  {
    name: "CleanUpX",
    desc: "AI-Powered Waste Management",
    detail:
      "Intelligent waste management platform integrating Gemini AI for automated waste classification and quantity estimation. Location-based reporting with Google Maps API and token-based reward system. Built with Next.js, TypeScript, TailwindCSS.",
    links: [
      { label: "Live", href: "https://cleanupx.vercel.app/" },
      { label: "Code", href: "https://github.com/SauravKumarLal/EcoSmart" },
    ],
  },
  {
    name: "DeepNPR",
    desc: "License Plate Recognition",
    detail:
      "Deep learning model for automatic localization and classification of Hindi/Nepalese license plates, recognizing all 34 Devanagari script characters using CNN architectures. Designed for real-time inference in resource-constrained environments.",
    links: [],
  },
];

const CERTS = [
  {
    name: "AWS Certified Solutions Architect — Associate",
    date: "Jan 2024",
    href: "https://www.credly.com/badges/2418975b-3e59-4801-9d3f-18b100fc8fc2/public_url",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    date: "Dec 2023",
    href: "https://www.credly.com/badges/6add308d-f199-41b9-8418-a33ad229da96/public_url",
  },
];

// --- Marquee Banner ---
function MarqueeBanner() {
  const text =
    "BACKEND ENGINEER · DISTRIBUTED SYSTEMS · GENERATIVE AI · SAURAV KUMAR LAL · ";
  return (
    <div style={marqueeStyles.outer}>
      <div style={marqueeStyles.track}>
        <span style={marqueeStyles.text} aria-hidden="true">
          {text}
        </span>
        <span style={marqueeStyles.text} aria-hidden="true">
          {text}
        </span>
        <span style={marqueeStyles.text} aria-hidden="true">
          {text}
        </span>
      </div>
    </div>
  );
}

// --- Main App ---
export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [artSize, setArtSize] = useState({ w: 500, h: 350 });

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });

    const updateSize = () => {
      const w = Math.min(window.innerWidth - 48, 560);
      setArtSize({ w, h: Math.min(w * 0.65, 380) });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <div style={styles.root}>
      <style>{globalCSS}</style>

      {/* NAV */}
      <nav
        style={{
          ...styles.nav,
          backdropFilter: scrollY > 60 ? "blur(12px)" : "none",
          background: scrollY > 60 ? "rgba(8,8,8,0.85)" : "transparent",
          borderBottom:
            scrollY > 60
              ? "1px solid rgba(255,255,255,0.06)"
              : "1px solid transparent",
        }}
      >
        <a href="#top" style={styles.navLogo}>
          SKL
        </a>
        <div style={styles.navLinks}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.key}
              href={l.href}
              style={styles.navLink}
              target={l.href.startsWith("http") ? "_blank" : undefined}
            >
              <span style={styles.navKey}>[{l.key}]</span> {l.label}
            </a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="top" style={styles.hero}>
        <div style={styles.heroGrid}>
          <div style={styles.heroText}>
            <p style={styles.heroLabel}>/Welcome</p>
            <h1 style={styles.heroName}>
              Saurav Kumar
              <br />
              Lal
            </h1>
            <p style={styles.heroTagline}>
              Backend Engineer · Distributed Systems ·<br />
              Authentication & Security · GenAI Platforms
            </p>
            <div style={styles.heroLinks}>
              <a href="mailto:sauravkrlal@gmail.com" style={styles.heroLink}>
                sauravkrlal@gmail.com
              </a>
              <span style={styles.heroDot}>·</span>
              <a
                href="https://sauravkrlal.vercel.app/"
                style={styles.heroLink}
                target="_blank"
              >
                Portfolio
              </a>
              <span style={styles.heroDot}>·</span>
              <a
                href="https://leetcode.com/sauravkrlal/"
                style={styles.heroLink}
                target="_blank"
              >
                LeetCode
              </a>
            </div>
          </div>
          <div style={styles.heroArt}>
            <span style={styles.figLabel}>[ Fig. 1 ]</span>
            <GenerativeArt width={artSize.w} height={artSize.h} />
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="about" style={styles.section}>
        <div style={styles.sectionHeader}>
          <p style={styles.sectionLabel}>/Technical Skills</p>
        </div>
        <div style={styles.skillsGrid}>
          {SKILLS.map((s) => (
            <div key={s.cat} style={styles.skillCard}>
              <p style={styles.skillCat}>{s.cat}</p>
              <p style={styles.skillItems}>{s.items}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={styles.section}>
        <div style={styles.sectionHeader}>
          <p style={styles.sectionLabel}>/Experience</p>
          <div style={styles.sectionArt}>
            <span style={styles.figLabel}>[ Fig. 2 ]</span>
            <WaveArt width={Math.min(artSize.w, 320)} height={140} />
          </div>
        </div>
        {EXPERIENCE.map((exp, i) => (
          <div key={i} style={styles.expBlock}>
            <div style={styles.expHeader}>
              <div>
                <h3 style={styles.expCompany}>{exp.company}</h3>
                <p style={styles.expRole}>{exp.role}</p>
              </div>
              <div style={styles.expMeta}>
                <p style={styles.expPeriod}>{exp.period}</p>
                <p style={styles.expLocation}>{exp.location}</p>
              </div>
            </div>
            <ul style={styles.expList}>
              {exp.bullets.map((b, j) => (
                <li key={j} style={styles.expItem}>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* PROJECTS */}
      <section id="projects" style={styles.section}>
        <div style={styles.sectionHeader}>
          <p style={styles.sectionLabel}>/Projects</p>
        </div>
        <div style={styles.projectsGrid}>
          {PROJECTS.map((p, i) => (
            <div key={i} style={styles.projectCard}>
              <div style={styles.projectIdx}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 style={styles.projectName}>{p.name}</h3>
              <p style={styles.projectDesc}>{p.desc}</p>
              <p style={styles.projectDetail}>{p.detail}</p>
              {p.links.length > 0 && (
                <div style={styles.projectLinks}>
                  {p.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      style={styles.projectLink}
                    >
                      [{l.label}] →
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <p style={styles.sectionLabel}>/Certifications</p>
        </div>
        <div style={styles.certsGrid}>
          {CERTS.map((c, i) => (
            <div key={i} style={styles.certRow}>
              <div style={styles.certInfo}>
                <p style={styles.certName}>{c.name}</p>
                <p style={styles.certDate}>{c.date}</p>
              </div>
              <a href={c.href} target="_blank" style={styles.certLink}>
                [Verify] →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <p style={styles.sectionLabel}>/Achievements</p>
        </div>
        <div style={styles.achieveList}>
          <div style={styles.achieveItem}>
            <span style={styles.achieveBullet}>◆</span>
            <span>
              1st Prize — Copilot Hackathon at Ramco Systems, building AI-driven
              solutions using LLM-based workflows.
            </span>
          </div>
          <div style={styles.achieveItem}>
            <span style={styles.achieveBullet}>◆</span>
            <span>
              2nd Place — DEVSOC'23 (50-hour hackathon by Codechef-VIT) among
              108 teams, 450+ participants.
            </span>
          </div>
          <div style={styles.achieveItem}>
            <span style={styles.achieveBullet}>◆</span>
            <span>500+ DSA problems solved on LeetCode and GeeksforGeeks.</span>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <p style={styles.sectionLabel}>/Education</p>
        </div>
        <div style={styles.eduBlock}>
          <h3 style={styles.expCompany}>
            Vellore Institute of Technology, Vellore
          </h3>
          <p style={styles.expRole}>
            B.Tech — Computer Science & Engineering (Minor in Information
            Security)
          </p>
          <div style={styles.eduMeta}>
            <span style={styles.expPeriod}>2021 — 2025</span>
            <span style={styles.certLink}>CGPA: 9.27</span>
          </div>
        </div>
      </section>

      {/* MARQUEE BANNER */}
      <MarqueeBanner />

      {/* CONTACT / FOOTER */}
      <footer id="contact" style={styles.footer}>
        <div style={styles.footerInner}>
          <p style={styles.sectionLabel}>/Contact</p>
          <h2 style={styles.footerHeading}>Let's build something.</h2>
          <div style={styles.footerLinks}>
            <a href="mailto:sauravkrlal@gmail.com" style={styles.footerLink}>
              Email
            </a>
            <a
              href="https://linkedin.com/in/sauravkrlal"
              target="_blank"
              style={styles.footerLink}
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/SauravKumarLal"
              target="_blank"
              style={styles.footerLink}
            >
              GitHub
            </a>
            <a
              href="https://leetcode.com/sauravkrlal/"
              target="_blank"
              style={styles.footerLink}
            >
              LeetCode
            </a>
          </div>
          <p style={styles.footerCopy}>© 2026 Saurav Kumar Lal</p>
        </div>
      </footer>
    </div>
  );
}

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&family=Instrument+Sans:wght@400;500;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { background: #080808; }

  ::selection {
    background: rgba(255,255,255,0.15);
    color: #fff;
  }

  a { text-decoration: none; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-33.333%); }
  }
`;

const mono = "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace";
const sans = "'Instrument Sans', 'Helvetica Neue', sans-serif";

const styles = {
  root: {
    background: "#080808",
    color: "#e8e8e8",
    minHeight: "100vh",
    fontFamily: sans,
    fontSize: 15,
    lineHeight: 1.65,
    overflowX: "hidden",
  },

  // NAV
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 32px",
    transition: "all 0.3s ease",
  },
  navLogo: {
    fontFamily: mono,
    fontSize: 16,
    fontWeight: 600,
    color: "#fff",
    letterSpacing: "0.05em",
  },
  navLinks: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
  },
  navLink: {
    fontFamily: mono,
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    transition: "color 0.2s",
    letterSpacing: "0.02em",
  },
  navKey: {
    color: "rgba(255,255,255,0.25)",
    marginRight: 2,
  },

  // HERO
  hero: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    padding: "120px 32px 80px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  heroGrid: {
    maxWidth: 1120,
    margin: "0 auto",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 48,
    flexWrap: "wrap",
  },
  heroText: {
    flex: "1 1 400px",
    animation: "fadeUp 0.8s ease both",
  },
  heroLabel: {
    fontFamily: mono,
    fontSize: 12,
    color: "rgba(255,255,255,0.35)",
    marginBottom: 24,
    letterSpacing: "0.05em",
  },
  heroName: {
    fontFamily: mono,
    fontSize: "clamp(32px, 5vw, 56px)",
    fontWeight: 600,
    lineHeight: 1.1,
    color: "#fff",
    marginBottom: 20,
    letterSpacing: "-0.02em",
  },
  heroTagline: {
    fontFamily: sans,
    fontSize: 15,
    color: "rgba(255,255,255,0.5)",
    lineHeight: 1.6,
    marginBottom: 28,
  },
  heroLinks: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  heroLink: {
    fontFamily: mono,
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    borderBottom: "1px solid rgba(255,255,255,0.15)",
    paddingBottom: 1,
    transition: "color 0.2s",
  },
  heroDot: {
    color: "rgba(255,255,255,0.2)",
  },
  heroArt: {
    flex: "0 1 auto",
    position: "relative",
    animation: "fadeUp 1s ease 0.2s both",
  },
  figLabel: {
    fontFamily: mono,
    fontSize: 11,
    color: "rgba(255,255,255,0.2)",
    position: "absolute",
    top: -20,
    left: 0,
  },

  // SECTIONS
  section: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "72px 32px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 40,
    flexWrap: "wrap",
    gap: 24,
  },
  sectionLabel: {
    fontFamily: mono,
    fontSize: 12,
    color: "rgba(255,255,255,0.35)",
    letterSpacing: "0.05em",
  },
  sectionArt: {
    position: "relative",
  },

  // SKILLS
  skillsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: 1,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
  },
  skillCard: {
    padding: "20px 24px",
    background: "#080808",
  },
  skillCat: {
    fontFamily: mono,
    fontSize: 12,
    fontWeight: 500,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 8,
    letterSpacing: "0.03em",
  },
  skillItems: {
    fontSize: 13,
    color: "rgba(255,255,255,0.4)",
    lineHeight: 1.6,
  },

  // EXPERIENCE
  expBlock: {
    padding: "32px 0",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  },
  expHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
    flexWrap: "wrap",
    gap: 12,
  },
  expCompany: {
    fontFamily: mono,
    fontSize: 16,
    fontWeight: 500,
    color: "#fff",
  },
  expRole: {
    fontFamily: sans,
    fontSize: 14,
    color: "rgba(255,255,255,0.45)",
    marginTop: 4,
  },
  expMeta: {
    textAlign: "right",
  },
  expPeriod: {
    fontFamily: mono,
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
  },
  expLocation: {
    fontSize: 12,
    color: "rgba(255,255,255,0.25)",
    marginTop: 2,
  },
  expList: {
    listStyle: "none",
    padding: 0,
  },
  expItem: {
    fontSize: 14,
    color: "rgba(255,255,255,0.55)",
    lineHeight: 1.7,
    paddingLeft: 16,
    position: "relative",
    marginBottom: 8,
    borderLeft: "1px solid rgba(255,255,255,0.08)",
  },

  // PROJECTS
  projectsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
    gap: 1,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
  },
  projectCard: {
    padding: "28px 28px",
    background: "#080808",
  },
  projectIdx: {
    fontFamily: mono,
    fontSize: 11,
    color: "rgba(255,255,255,0.2)",
    marginBottom: 12,
  },
  projectName: {
    fontFamily: mono,
    fontSize: 18,
    fontWeight: 500,
    color: "#fff",
    marginBottom: 4,
  },
  projectDesc: {
    fontFamily: sans,
    fontSize: 13,
    color: "rgba(255,255,255,0.4)",
    marginBottom: 14,
  },
  projectDetail: {
    fontSize: 13,
    color: "rgba(255,255,255,0.45)",
    lineHeight: 1.7,
    marginBottom: 16,
  },
  projectLinks: {
    display: "flex",
    gap: 16,
  },
  projectLink: {
    fontFamily: mono,
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    transition: "color 0.2s",
  },

  // CERTS
  certsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
  },
  certRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 24px",
    background: "#080808",
    flexWrap: "wrap",
    gap: 12,
  },
  certInfo: {},
  certName: {
    fontFamily: mono,
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
  },
  certDate: {
    fontSize: 12,
    color: "rgba(255,255,255,0.3)",
    marginTop: 2,
  },
  certLink: {
    fontFamily: mono,
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    transition: "color 0.2s",
  },

  // ACHIEVEMENTS
  achieveList: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  achieveItem: {
    display: "flex",
    gap: 14,
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    lineHeight: 1.65,
  },
  achieveBullet: {
    color: "rgba(255,255,255,0.2)",
    flexShrink: 0,
    marginTop: 2,
    fontSize: 8,
  },

  // EDUCATION
  eduBlock: {
    padding: "24px",
    border: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.02)",
  },
  eduMeta: {
    display: "flex",
    gap: 20,
    marginTop: 8,
  },

  // FOOTER
  footer: {
    borderTop: "1px solid rgba(255,255,255,0.06)",
    padding: "80px 32px",
  },
  footerInner: {
    maxWidth: 1120,
    margin: "0 auto",
  },
  footerHeading: {
    fontFamily: mono,
    fontSize: "clamp(24px, 3vw, 36px)",
    fontWeight: 500,
    color: "#fff",
    margin: "20px 0 32px",
  },
  footerLinks: {
    display: "flex",
    gap: 24,
    flexWrap: "wrap",
    marginBottom: 48,
  },
  footerLink: {
    fontFamily: mono,
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
    borderBottom: "1px solid rgba(255,255,255,0.12)",
    paddingBottom: 2,
    transition: "color 0.2s",
  },
  footerCopy: {
    fontFamily: mono,
    fontSize: 11,
    color: "rgba(255,255,255,0.15)",
  },
};

const marqueeStyles = {
  outer: {
    overflow: "hidden",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    padding: "28px 0",
    cursor: "default",
    userSelect: "none",
  },
  track: {
    display: "inline-flex",
    whiteSpace: "nowrap",
    animation: "marquee 22s linear infinite",
    willChange: "transform",
  },
  text: {
    fontFamily: mono,
    fontSize: "clamp(48px, 8vw, 96px)",
    fontWeight: 600,
    letterSpacing: "-0.02em",
    color: "transparent",
    WebkitTextStroke: "1px rgba(255,255,255,0.18)",
    paddingRight: 0,
  },
};

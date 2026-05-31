import { useState, useEffect } from "react";
import GenerativeArt from "./art/GenerativeArt";

const PROMPT = "sauravkrlal@portfolio:~$";

export default function Hero({ artSize }) {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let i = 0,
      iv;
    const delay = setTimeout(() => {
      iv = setInterval(() => {
        i++;
        setTyped(PROMPT.slice(0, i));
        if (i >= PROMPT.length) {
          clearInterval(iv);
          setDone(true);
        }
      }, 52);
    }, 380);
    return () => {
      clearTimeout(delay);
      clearInterval(iv);
    };
  }, []);

  const copyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("sauravkrlal@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="top" className="hero">
      <div className="hero-grid">
        <div className="hero-text">
          <p className="hero-label">
            {typed}
            {!done && <span className="hero-label-cursor">|</span>}
          </p>
          <h1 className="hero-name">
            Saurav Kumar
            <br />
            Lal
          </h1>
          <div className="hero-status">
            <span className="status-dot" />
            <span className="status-text">
              Software Engineer @ Ramco Systems • B.Tech CSE, VIT Vellore '25
            </span>
          </div>
          <p className="hero-tagline">
            Backend Engineer · Distributed Systems ·
            <br />
            Authentication &amp; Security · GenAI Platforms
          </p>
          <div className="hero-links">
            <a
              href="mailto:sauravkrlal@gmail.com"
              className={`hero-link${copied ? " hero-link--copied" : ""}`}
              onClick={copyEmail}
              title="Click to copy"
            >
              {copied ? "Copied" : "sauravkrlal@gmail.com"}
              <svg
                className="copy-icon"
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {copied ? (
                  <polyline points="20 6 9 17 4 12" />
                ) : (
                  <>
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </>
                )}
              </svg>
            </a>
            <span className="hero-dot">·</span>
            <a
              href="https://drive.google.com/file/d/1PQ3Co9UKQbPMHB9lRWneeLMYz_YvLPIP/view"
              className="hero-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
            <span className="hero-dot">·</span>
            <a
              href="https://leetcode.com/sauravkrlal/"
              className="hero-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              LeetCode
            </a>
          </div>
        </div>

        <div className="hero-art">
          <span className="fig-label">
            [ Fig. 1 ] — generative field simulation
          </span>
          <GenerativeArt width={artSize.w} height={artSize.h} />
        </div>
      </div>
    </section>
  );
}

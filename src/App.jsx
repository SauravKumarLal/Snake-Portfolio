import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import CursorGlow from "./components/CursorGlow";
import ScrambleLabels from "./components/ScrambleLabels";
import CardTilt from "./components/CardTilt";
import BootSequence from "./components/BootSequence";
import StatsBar from "./components/StatsBar";
import ProgressBar from "./components/ProgressBar";
import TerminalWidget from "./components/TerminalWidget";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Achievements from "./components/Achievements";
import Leadership from "./components/Leadership";
import Education from "./components/Education";
import Footer from "./components/Footer";
import { NAV_LINKS } from "./data";

export default function App() {
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

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const link = NAV_LINKS.find((l) => l.key.toLowerCase() === e.key.toLowerCase());
      if (!link) return;

      if (link.href.startsWith("http")) {
        window.open(link.href, "_blank", "noopener,noreferrer");
      } else {
        document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <BootSequence />
      <ProgressBar />
      <TerminalWidget />
      <CursorGlow />
      <ScrambleLabels />
      <CardTilt />
      <Nav scrollY={scrollY} />
      <Hero artSize={artSize} />
      <StatsBar />
      <About />
      <Experience artSize={artSize} />
      <Projects />
      <Certifications />
      <Achievements />
      <Leadership />
      <Education />
      <Footer />
    </>
  );
}

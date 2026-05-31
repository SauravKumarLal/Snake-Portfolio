import { useState, useEffect } from 'react';

const LINES = [
  { text: 'Initializing runtime environment...',  ok: true,  delay: 0    },
  { text: 'Loading distributed systems...',        ok: true,  delay: 340  },
  { text: 'Mounting authentication services...',   ok: true,  delay: 680  },
  { text: 'Connecting to AWS Bedrock...',          ok: true,  delay: 1020 },
  { text: 'Starting portfolio daemon...',          ok: true,  delay: 1360 },
];

const PROMPT_DELAY = 1800;
const FADE_DELAY   = 2600;

export default function BootSequence() {
  // Only show once per browser session
  const [visible,     setVisible]     = useState(() => !sessionStorage.getItem('booted'));
  const [shownLines,  setShownLines]  = useState([]);
  const [showPrompt,  setShowPrompt]  = useState(false);
  const [fading,      setFading]      = useState(false);

  useEffect(() => {
    if (!visible) return;

    const timers = LINES.map((line, i) =>
      setTimeout(() => setShownLines(prev => [...prev, i]), line.delay)
    );

    const t1 = setTimeout(() => setShowPrompt(true), PROMPT_DELAY);

    const t2 = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem('booted', '1');
      }, 550);
    }, FADE_DELAY);

    return () => { timers.forEach(clearTimeout); clearTimeout(t1); clearTimeout(t2); };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={`boot-overlay${fading ? ' boot-overlay--out' : ''}`}>
      <div className="boot-terminal">
        {LINES.map((line, i) =>
          shownLines.includes(i) && (
            <div key={i} className="boot-line">
              <span className="boot-tag">[BOOT]</span>
              <span className="boot-text"> {line.text}</span>
              {line.ok && <span className="boot-ok">[ OK ]</span>}
            </div>
          )
        )}
        {showPrompt && (
          <div className="boot-prompt">
            <span className="boot-prompt-label">sauravkrlal@portfolio:~$</span>
            <span className="boot-prompt-cursor">_</span>
          </div>
        )}
      </div>
    </div>
  );
}

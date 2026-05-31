import { useState, useEffect, useRef } from "react";
import { ABOUT_BLURB, SKILLS, PROJECTS } from "../data";

const RESUME =
  "https://drive.google.com/file/d/1PQ3Co9UKQbPMHB9lRWneeLMYz_YvLPIP/view";

// ── synth sounds ─────────────────────────────────────────────────────────────
function makeSounds() {
  let ctx = null;
  const ac = () => {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  };
  const tone = (freq, type, dur, vol = 0.07) => {
    try {
      const c = ac(),
        o = c.createOscillator(),
        g = c.createGain();
      o.connect(g);
      g.connect(c.destination);
      o.type = type;
      o.frequency.value = freq;
      g.gain.setValueAtTime(vol, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
      o.start(c.currentTime);
      o.stop(c.currentTime + dur);
    } catch (_) {}
  };
  return {
    key: () => tone(1100, "sine", 0.018, 0.04),
    enter: () => {
      tone(700, "sine", 0.055, 0.08);
      setTimeout(() => tone(900, "sine", 0.04, 0.06), 35);
    },
    error: () => tone(180, "square", 0.1, 0.06),
    open: () => {
      [500, 700, 900].forEach((f, i) =>
        setTimeout(() => tone(f, "sine", 0.06, 0.04), i * 45),
      );
    },
    eat: () => {
      tone(600, "sine", 0.04, 0.07);
      setTimeout(() => tone(900, "sine", 0.03, 0.05), 30);
    },
    die: () => {
      [300, 200, 150].forEach((f, i) =>
        setTimeout(() => tone(f, "square", 0.08, 0.06), i * 60),
      );
    },
  };
}

// ── snake game (canvas-based) ────────────────────────────────────────────────
const COLS = 28;
const ROWS = 13;
const CELL = 16;
const CW = COLS * CELL; // 448
const CH = ROWS * CELL; // 208
const TICK = 120;

function rndFood(snake) {
  let f;
  do {
    f = {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS),
    };
  } while (snake.some((s) => s.x === f.x && s.y === f.y));
  return f;
}

function drawFrame(canvas, { snake, food, alive }) {
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#07090f";
  ctx.fillRect(0, 0, CW, CH);

  // Subtle grid lines
  ctx.strokeStyle = "rgba(255,255,255,0.04)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= COLS; x++) {
    ctx.beginPath();
    ctx.moveTo(x * CELL, 0);
    ctx.lineTo(x * CELL, CH);
    ctx.stroke();
  }
  for (let y = 0; y <= ROWS; y++) {
    ctx.beginPath();
    ctx.moveTo(0, y * CELL);
    ctx.lineTo(CW, y * CELL);
    ctx.stroke();
  }

  // Food — green circle with glow
  const fx = food.x * CELL + CELL / 2;
  const fy = food.y * CELL + CELL / 2;
  ctx.shadowBlur = 10;
  ctx.shadowColor = "#4ade80";
  ctx.fillStyle = "#4ade80";
  ctx.beginPath();
  ctx.arc(fx, fy, CELL / 2 - 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Snake — rounded rects, fading opacity tail
  snake.forEach((seg, i) => {
    const alpha = Math.max(0.35, 1 - i * 0.04);
    ctx.fillStyle = i === 0 ? "#635BFF" : `rgba(99,91,255,${alpha})`;
    const pad = i === 0 ? 1 : 2;
    const x = seg.x * CELL + pad;
    const y = seg.y * CELL + pad;
    const s = CELL - pad * 2;
    ctx.beginPath();
    ctx.roundRect(x, y, s, s, i === 0 ? 4 : 3);
    ctx.fill();
  });

  // Game-over overlay
  if (!alive) {
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0, 0, CW, CH);
  }
}

function SnakeGame({ onExit, sounds, muted }) {
  const canvasRef = useRef(null);
  const g = useRef({
    snake: [
      { x: 14, y: 6 },
      { x: 13, y: 6 },
      { x: 12, y: 6 },
    ],
    dir: { x: 1, y: 0 },
    next: { x: 1, y: 0 },
    food: { x: 21, y: 4 },
    score: 0,
    alive: true,
  });
  const [score, setScore] = useState(0);
  const [alive, setAlive] = useState(true);

  // Initial draw
  useEffect(() => {
    if (canvasRef.current) drawFrame(canvasRef.current, g.current);
  }, []);

  // Keyboard
  useEffect(() => {
    const MAP = {
      ArrowUp: { x: 0, y: -1 },
      w: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
      s: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 },
      a: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
      d: { x: 1, y: 0 },
    };
    const onKey = (e) => {
      if (e.key === "q" || e.key === "Escape") {
        e.preventDefault();
        onExit();
        return;
      }
      const nd = MAP[e.key];
      if (!nd) return;
      e.preventDefault();
      const cur = g.current.dir;
      if (nd.x === -cur.x && nd.y === -cur.y) return;
      g.current.next = nd;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onExit]);

  // Game loop
  useEffect(() => {
    const id = setInterval(() => {
      const s = g.current;
      if (!s.alive) return;
      s.dir = s.next;
      const head = {
        x: (s.snake[0].x + s.dir.x + COLS) % COLS,
        y: (s.snake[0].y + s.dir.y + ROWS) % ROWS,
      };
      if (s.snake.some((p) => p.x === head.x && p.y === head.y)) {
        s.alive = false;
        if (!muted) sounds?.die();
        if (canvasRef.current) drawFrame(canvasRef.current, s);
        setAlive(false);
        return;
      }
      const ate = head.x === s.food.x && head.y === s.food.y;
      s.snake = [
        head,
        ...s.snake.slice(0, ate ? undefined : s.snake.length - 1),
      ];
      if (ate) {
        s.score += 10;
        s.food = rndFood(s.snake);
        if (!muted) sounds?.eat();
        setScore(s.score);
      }
      if (canvasRef.current) drawFrame(canvasRef.current, s);
    }, TICK);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="tw-game">
      <p className="tw-game-hud">
        <span className="tw-accent">SNAKE</span>
        <span className="tw-muted">
          {" "}
          score: {score} · W A S D / ↑ ↓ ← → · Q to quit
        </span>
      </p>
      <canvas
        ref={canvasRef}
        width={CW}
        height={CH}
        className="tw-game-canvas"
      />
      {!alive && (
        <p className="tw-game-over">
          <span className="tw-err">● GAME OVER</span>
          <span className="tw-muted"> final score: {score} · Q to exit</span>
        </p>
      )}
    </div>
  );
}

// ── command resolver ─────────────────────────────────────────────────────────
function resolve(raw, history) {
  const cmd = raw.trim().toLowerCase();

  if (cmd === "") return { lines: [] };
  if (cmd === "clear") return { clear: true };
  if (cmd === "snake") return { game: "snake" };

  if (cmd === "help")
    return {
      lines: [
        { t: "Available commands:", c: "accent" },
        { t: "" },
        { t: "  whoami              who is this engineer?", c: "muted" },
        { t: "  ls                  list all sections", c: "muted" },
        { t: "  cat about.md        read about section", c: "muted" },
        { t: "  cat skills.json     view tech stack", c: "muted" },
        { t: "  cat projects.json   list projects", c: "muted" },
        { t: "  cat contact.md      contact info", c: "muted" },
        { t: "  open resume         open resume PDF", c: "muted" },
        { t: "  open linkedin       open LinkedIn profile", c: "muted" },
        { t: "  open github         open GitHub profile", c: "muted" },
        { t: "  open leetcode       open LeetCode profile", c: "muted" },
        { t: "  sudo hire saurav    make the right call", c: "muted" },
        { t: "  ping                check availability", c: "muted" },
        { t: "  uname -a            system information", c: "muted" },
        { t: "  date                current timestamp", c: "muted" },
        { t: "  history             command history", c: "muted" },
        { t: "  clear               clear terminal", c: "muted" },
        { t: "  snake               play snake 🐍", c: "muted" },
      ],
    };

  if (cmd === "whoami")
    return {
      lines: [
        { t: "Saurav Kumar Lal", c: "accent" },
        { t: "  Role     : Software Engineer @ Ramco Systems" },
        { t: "  Location : Chennai, India" },
        { t: "  Focus    : Distributed Systems · GenAI · Auth" },
        { t: "  Status   : ● open to work", c: "ok" },
      ],
    };

  if (cmd === "ls" || cmd === "ls -la")
    return {
      lines: [
        { t: "drwxr-xr-x  about/", c: "accent" },
        { t: "drwxr-xr-x  experience/", c: "accent" },
        { t: "drwxr-xr-x  projects/", c: "accent" },
        { t: "drwxr-xr-x  certifications/", c: "accent" },
        { t: "drwxr-xr-x  achievements/", c: "accent" },
        { t: "-rw-r--r--  resume.pdf" },
        { t: "-rw-r--r--  contact.md" },
      ],
    };

  if (cmd === "cat about.md") return { lines: [{ t: ABOUT_BLURB }] };
  if (cmd === "cat skills.json")
    return {
      lines: [
        { t: "{", c: "muted" },
        ...SKILLS.map((s) => ({ t: `  "${s.cat}": "${s.items}"` })),
        { t: "}", c: "muted" },
      ],
    };
  if (cmd === "cat projects.json")
    return {
      lines: PROJECTS.map((p, i) => ({
        t: `${String(i + 1).padStart(2, "0")}  ${p.name} — ${p.desc}`,
      })),
    };
  if (cmd === "cat contact.md" || cmd === "contact")
    return {
      lines: [
        { t: "Email    : sauravkrlal@gmail.com", c: "accent" },
        { t: "LinkedIn : linkedin.com/in/sauravkrlal" },
        { t: "GitHub   : github.com/SauravKumarLal" },
        { t: "LeetCode : leetcode.com/sauravkrlal" },
      ],
    };

  if (cmd === "open resume" || cmd === "cat resume.pdf") {
    window.open(RESUME, "_blank", "noopener,noreferrer");
    return {
      lines: [
        { t: "Opening resume.pdf...", c: "ok" },
        { t: "↗ Redirecting to Google Drive", c: "muted" },
      ],
    };
  }

  if (cmd === "open linkedin") {
    window.open(
      "https://linkedin.com/in/sauravkrlal",
      "_blank",
      "noopener,noreferrer",
    );
    return {
      lines: [
        { t: "Opening LinkedIn...", c: "ok" },
        { t: "↗ linkedin.com/in/sauravkrlal", c: "muted" },
      ],
    };
  }

  if (cmd === "open github") {
    window.open(
      "https://github.com/SauravKumarLal",
      "_blank",
      "noopener,noreferrer",
    );
    return {
      lines: [
        { t: "Opening GitHub...", c: "ok" },
        { t: "↗ github.com/SauravKumarLal", c: "muted" },
      ],
    };
  }

  if (cmd === "open leetcode") {
    window.open(
      "https://leetcode.com/sauravkrlal/",
      "_blank",
      "noopener,noreferrer",
    );
    return {
      lines: [
        { t: "Opening LeetCode...", c: "ok" },
        { t: "↗ leetcode.com/sauravkrlal", c: "muted" },
      ],
    };
  }

  if (cmd === "sudo hire saurav")
    return {
      lines: [
        { t: "[sudo] password for recruiter: ••••••••", c: "muted" },
        { t: "Verifying credentials...", c: "muted" },
        { t: "" },
        { t: "Permission granted.", c: "ok" },
        { t: "✓ Calendar invite sent", c: "ok" },
        { t: "✓ Offer letter drafted", c: "ok" },
        { t: "✓ Team notified", c: "ok" },
        { t: "" },
        { t: "● Welcome aboard, Saurav!", c: "accent" },
      ],
    };

  if (cmd === "ping" || cmd === "ping saurav")
    return {
      lines: [
        { t: "PING sauravkrlal (available) — 56 bytes", c: "muted" },
        {
          t: `64 bytes: icmp_seq=0 ttl=64 time=${(Math.random() * 4 + 0.8).toFixed(1)}ms`,
        },
        { t: "1 packet transmitted, 1 received, 0% packet loss" },
        { t: "● Status: open to work", c: "ok" },
      ],
    };

  if (cmd === "date") return { lines: [{ t: new Date().toString() }] };
  if (cmd === "uname" || cmd === "uname -a")
    return {
      lines: [
        {
          t: "SauravOS 2.0.25 #1 SMP Distributed-Ready GenAI-Enabled Auth-Hardened x86_64",
        },
      ],
    };

  if (cmd === "history")
    return {
      lines: history.length
        ? history.map((c, i) => ({
            t: `  ${String(i + 1).padStart(4)}  ${c}`,
            c: "muted",
          }))
        : [{ t: "No commands in history yet.", c: "muted" }],
    };

  return {
    lines: [
      { t: `bash: ${raw.trim()}: command not found`, c: "err" },
      { t: "Type 'help' to see available commands.", c: "muted" },
    ],
  };
}

const WELCOME = [
  {
    t: "sauravkrlal's interactive terminal. Type 'help' to explore.",
    c: "accent",
  },
  { t: "" },
];

// ── main widget ──────────────────────────────────────────────────────────────
export default function TerminalWidget() {
  const [open, setOpen] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [entries, setEntries] = useState([]);
  const [input, setInput] = useState("");
  const [cmdHist, setCmdHist] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [muted, setMuted] = useState(false);
  const [game, setGame] = useState(null);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const sounds = useRef(null);

  useEffect(() => {
    if (open && !sounds.current) sounds.current = makeSounds();
  }, [open]);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries]);
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 60);
      setTimeout(() => {
        if (!muted) sounds.current?.open();
      }, 80);
    }
  }, [open]);

  const sfx = (name) => {
    if (!muted) sounds.current?.[name]();
  };

  const run = () => {
    const raw = input;
    const result = resolve(raw, cmdHist);

    if (result?.clear) {
      setEntries([]);
      setInput("");
      sfx("enter");
      return;
    }

    if (result?.game) {
      sfx("enter");
      if (raw.trim()) {
        setCmdHist((h) => [...h, raw.trim()]);
        setHistIdx(-1);
      }
      setGame(result.game);
      setInput("");
      return;
    }

    const isError = result.lines?.[0]?.c === "err";
    sfx(isError ? "error" : "enter");
    if (raw.trim()) {
      setCmdHist((h) => [...h, raw.trim()]);
      setHistIdx(-1);
    }
    setEntries((e) => [...e, { cmd: raw, lines: result.lines }]);
    setInput("");
  };

  const onKey = (e) => {
    if (e.key === "Enter") {
      run();
      return;
    }
    if (e.key.length === 1) sfx("key");
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = Math.min(histIdx + 1, cmdHist.length - 1);
      setHistIdx(idx);
      setInput(cmdHist[cmdHist.length - 1 - idx] ?? "");
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = Math.max(histIdx - 1, -1);
      setHistIdx(idx);
      setInput(idx === -1 ? "" : (cmdHist[cmdHist.length - 1 - idx] ?? ""));
    }
  };

  const exitGame = () => {
    setGame(null);
    setTimeout(() => inputRef.current?.focus(), 60);
  };

  return (
    <>
      {!open && <p className="tw-snake-hint">try 'snake' 🐍</p>}

      <button
        className={`tw-toggle${open ? " tw-toggle--open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle terminal"
      >
        {open ? "✕" : ">_"}
      </button>

      {open && (
        <div
          className={`tw-panel${maximized ? " tw-panel--max" : ""}`}
          onClick={() => !game && inputRef.current?.focus()}
        >
          {/* title bar */}
          <div className="tw-bar">
            <div className="tw-dots">
              <span
                className="tw-dot tw-dot--r"
                onClick={() => {
                  setOpen(false);
                  setMaximized(false);
                }}
              />
              <span
                className="tw-dot tw-dot--y"
                onClick={() => setMaximized(false)}
              />
              <span
                className="tw-dot tw-dot--g"
                onClick={(e) => {
                  e.stopPropagation();
                  setMaximized((m) => !m);
                }}
              />
            </div>
            <span className="tw-bar-title">
              {game
                ? "snake — sauravkrlal@portfolio"
                : "terminal — sauravkrlal@portfolio"}
            </span>
            <button
              className="tw-mute"
              onClick={(e) => {
                e.stopPropagation();
                setMuted((m) => !m);
              }}
              title={muted ? "Unmute" : "Mute"}
            >
              {muted ? "🔇" : "🔊"}
            </button>
          </div>

          {/* game mode */}
          {game === "snake" && (
            <div className="tw-output">
              <SnakeGame
                onExit={exitGame}
                sounds={sounds.current}
                muted={muted}
              />
            </div>
          )}

          {/* terminal mode */}
          {!game && (
            <>
              <div className="tw-output">
                {WELCOME.map((l, i) => (
                  <div key={`w${i}`} className={`tw-line tw-${l.c ?? "def"}`}>
                    {l.t}
                  </div>
                ))}
                {entries.map((entry, i) => (
                  <div key={i}>
                    <div className="tw-line tw-input-echo">
                      <span className="tw-ps">~$</span> {entry.cmd}
                    </div>
                    {entry.lines.map((l, j) => (
                      <div key={j} className={`tw-line tw-${l.c ?? "def"}`}>
                        {l.t}
                      </div>
                    ))}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
              <div className="tw-input-row">
                <span className="tw-ps">~$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  className="tw-input"
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  placeholder="type a command..."
                />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

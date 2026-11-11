import { useState, useEffect, useRef, createContext, useContext } from "react";
import Pfp from "./real.png";
import resume from "./Resume.pdf";
import {
  Code2 as Github, Link as Linkedin, Mail,
  Layers, Globe, Brain, Target, BarChart3,
  MapPin, Briefcase, GraduationCap, Award, Download,
  ScanLine, FlaskConical, Leaf, Train, Stethoscope, Hammer, Cpu,
  Sun, Moon,
} from "lucide-react";

// ─── TOKENS (light + dark) ───────────────────────────────────────────────────
const FONTS = {
  font: "'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono: "'Source Code Pro', ui-monospace, Menlo, Consolas, monospace",
};

const THEMES = {
  light: {
    ...FONTS,
    bg: "#f4f6f5", card: "#ffffff", bar: "#f6f9f7",
    text: "#273239", heading: "#1f2b31", muted: "#5c6a72", faint: "#8b979e",
    border: "#dfe5e2", divider: "#eaefec",
    green: "#2f8d46", greenDark: "#1f6b34", greenSoft: "#eaf6ed", greenInk: "#1f6b34", btnText: "#ffffff",
    blue: "#1a73c7", purple: "#7b4fd0", orange: "#d98200", yellow: "#e89b00", red: "#e5363d", teal: "#0f8a8a",
    chip: "#f1f5f3", chipText: "#3f4d55", hover: "#f7fbf8", scroll: "#c9d3ce", shadow: "rgba(31,43,49,0.04)",
    footer: "#1f2d27", footerText: "#b7c5bd", footerFaint: "#8da096",
    termBg: "#222d33", termText: "#e6edf0", termMuted: "#9db0b8", termPrompt: "#6fe08a",
  },
  dark: {
    ...FONTS,
    bg: "#101518", card: "#182024", bar: "#1d262b",
    text: "#dbe3e7", heading: "#f2f6f8", muted: "#9aa9b1", faint: "#6d7c85",
    border: "#2a353b", divider: "#222c31",
    green: "#3da85a", greenDark: "#2f8d46", greenSoft: "#1b2d22", greenInk: "#6fe08a", btnText: "#08140c",
    blue: "#5aa9f0", purple: "#ab8cf2", orange: "#f0a53a", yellow: "#f5b73a", red: "#ff6b72", teal: "#3cc0c0",
    chip: "#222c32", chipText: "#c3ced4", hover: "#1c262b", scroll: "#34404a", shadow: "rgba(0,0,0,0.3)",
    footer: "#0c1114", footerText: "#9fb0a8", footerFaint: "#6f8279",
    termBg: "#0d1215", termText: "#e6edf0", termMuted: "#8fa2ab", termPrompt: "#6fe08a",
  },
};

const ThemeCtx = createContext(THEMES.light);
const useC = () => useContext(ThemeCtx);

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyle = () => {
  const C = useC();
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&family=Source+Code+Pro:wght@400;500;600&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; scroll-padding-top: 70px; }
      body {
        background: ${C.bg};
        color: ${C.text};
        font-family: ${C.font};
        line-height: 1.55;
        -webkit-font-smoothing: antialiased;
        text-align: left;
        min-width: 320px;
      }
      body, .card, .bar, .badge, .btn, nav { transition: background-color 0.25s, border-color 0.25s, color 0.25s; }
      a { text-decoration: none; color: inherit; }
      h1, h2, h3, h4 { text-align: left; color: ${C.heading}; font-family: ${C.font}; }
      p { text-align: left; }
      ::selection { background: ${C.green}; color: ${C.btnText}; }
      ::-webkit-scrollbar { width: 8px; height: 8px; }
      ::-webkit-scrollbar-track { background: ${C.bg}; }
      ::-webkit-scrollbar-thumb { background: ${C.scroll}; border-radius: 4px; }

      .card {
        background: ${C.card};
        border: 1px solid ${C.border};
        border-radius: 8px;
        overflow: hidden;
        margin-bottom: 16px;
        box-shadow: 0 1px 2px ${C.shadow};
      }
      .bar {
        display: flex; align-items: center; gap: 10px;
        padding: 9px 16px; background: ${C.bar};
        border-bottom: 1px solid ${C.border};
        font-family: ${C.mono}; font-size: 12px; color: ${C.muted};
      }
      .bar .sq { width: 8px; height: 8px; border-radius: 2px; background: ${C.green}; display: block; }

      .sec { padding: 20px 24px; border-bottom: 1px solid ${C.divider}; }
      .sec:last-child { border-bottom: none; }
      .sec > h2 { border-left: 4px solid ${C.green}; padding-left: 10px; }

      .btn {
        display: inline-flex; align-items: center; gap: 7px;
        border-radius: 6px; padding: 7px 16px;
        font-size: 14px; font-weight: 700; cursor: pointer;
        font-family: ${C.font};
      }
      .btn-p { background: ${C.green}; color: ${C.btnText}; border: 1px solid ${C.green}; }
      .btn-p:hover { background: ${C.greenDark}; border-color: ${C.greenDark}; }
      .btn-s { background: ${C.card}; color: ${C.green}; border: 1px solid ${C.green}; }
      .btn-s:hover { background: ${C.greenSoft}; }
      .btn:focus-visible, a:focus-visible, input:focus-visible, button:focus-visible { outline: 2px solid ${C.green}; outline-offset: 2px; }

      .icon-btn {
        width: 34px; height: 34px; display: inline-flex; align-items: center; justify-content: center;
        background: transparent; color: ${C.text}; border: 1px solid ${C.border}; border-radius: 6px; cursor: pointer;
      }
      .icon-btn:hover { border-color: ${C.green}; color: ${C.green}; }

      .badge {
        display: inline-block; padding: 2px 11px;
        font-size: 12.5px; font-weight: 600;
        background: ${C.chip}; border: 1px solid ${C.border}; border-radius: 14px;
        margin: 3px 6px 3px 0; color: ${C.chipText};
      }

      .nav-item {
        display: flex; align-items: center; gap: 6px; height: 54px;
        color: ${C.text}; font-size: 14px; font-weight: 600; padding: 0 12px;
        cursor: pointer; border-bottom: 3px solid transparent;
      }
      .nav-item:hover { color: ${C.green}; border-bottom-color: ${C.green}; }

      .row { border-left: 3px solid transparent; transition: background 0.15s, border-color 0.15s; }
      .row:hover { background: ${C.hover}; border-left-color: ${C.green}; }

      .cursor {
        display: inline-block; width: 8px; height: 1.05em; margin-left: 3px;
        background: ${C.green}; vertical-align: -3px;
        animation: blink 1.05s steps(2, start) infinite;
      }
      @keyframes blink { to { visibility: hidden; } }

      .term-input {
        flex: 1; min-width: 0; background: transparent; border: none; outline: none;
        color: ${C.termText}; font-family: ${C.mono}; font-size: 13px; caret-color: ${C.termPrompt};
      }

      @media (max-width: 860px) {
        .layout { grid-template-columns: 1fr !important; }
        .hide-mob { display: none !important; }
        .sidebar-sticky { position: static !important; }
        .sec { padding: 18px 16px; }
      }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { scroll-behavior: auto !important; transition-duration: 0.01ms !important; animation: none !important; }
      }
    `}</style>
  );
};

// ─── SMALL HELPERS ───────────────────────────────────────────────────────────
// A "window": header strip with a filename, then the content
function Win({ id, file, children, accent }) {
  const C = useC();
  return (
    <section className="card" id={id} style={accent ? { borderTop: `4px solid ${C.green}` } : undefined}>
      <div className="bar">
        <span className="sq" />
        <span>{file}</span>
      </div>
      {children}
    </section>
  );
}

// types its text out once, then leaves a blinking cursor
function Typed({ text }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(text.length); return; }
    if (n >= text.length) return;
    const t = setTimeout(() => setN(n + 1), 42);
    return () => clearTimeout(t);
  }, [n, text]);
  return <>{text.slice(0, n)}<span className="cursor" /></>;
}

const tagColor = (color) => ({ color, background: `${color}14`, borderColor: `${color}44` });

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav({ mode, onToggle }) {
  const C = useC();
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: C.card,
      borderBottom: `1px solid ${C.border}`,
      height: 54, display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        maxWidth: 1128, width: "100%", padding: "0 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            width: 32, height: 32, borderRadius: 6, background: C.green, color: C.btnText,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, fontSize: 18,
          }}>Y</span>
          <span className="hide-mob" style={{ fontSize: 20, fontWeight: 800, color: C.green, letterSpacing: "-0.01em" }}>
            Yuvraj<span style={{ color: C.heading }}>.</span>
          </span>
        </a>

        <div className="hide-mob" style={{ display: "flex", alignItems: "center" }}>
          {[
            { label: "Home",     href: "#top",       icon: <Globe size={15} /> },
            { label: "Resume",   href: "#resume",    icon: <GraduationCap size={15} /> },
            { label: "Projects", href: "#projects",  icon: <Github size={15} /> },
            { label: "Skills",   href: "#stack",     icon: <Layers size={15} /> },
            { label: "DSA",      href: "#dsa",       icon: <Brain size={15} /> },
            { label: "Contact",  href: "#contact",   icon: <Mail size={15} /> },
          ].map(item => (
            <a key={item.label} href={item.href} className="nav-item">
              {item.icon}
              {item.label}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            type="button"
            className="icon-btn"
            onClick={onToggle}
            aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={mode === "dark" ? "Light mode" : "Dark mode"}
          >
            {mode === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a href="mailto:pawaryuvraj334@gmail.com" className="btn btn-p" style={{ fontSize: 13, padding: "5px 14px" }}>
            <Mail size={14} /> Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── PROFILE ─────────────────────────────────────────────────────────────────
function Profile() {
  const C = useC();
  return (
    <Win id="top" file="~/yuvraj — profile" accent>
      <div style={{ padding: "26px 24px 24px" }}>
        <div style={{ display: "flex", gap: 22, alignItems: "center", flexWrap: "wrap" }}>
          {/* Avatar: circle crop */}
          <div style={{
            width: 112, height: 112, borderRadius: "50%", overflow: "hidden", flexShrink: 0,
            border: `3px solid ${C.green}`, boxShadow: `0 0 0 4px ${C.greenSoft}`,
          }}>
            <img
              src={Pfp}
              alt="Yuvraj Pawar"
              style={{
                width: "100%", height: "100%", display: "block",
                objectFit: "cover", objectPosition: "30% 70%", transform: "scale(1.0)",
              }}
            />
          </div>

          <div style={{ flex: 1, minWidth: 240 }}>
            <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em" }}>
              Yuvraj Pawar
            </h1>
            <p style={{ fontSize: 16, fontWeight: 600, color: C.green, marginTop: 4, minHeight: 24 }}>
              <Typed text="Computer Science Student · Building Software Systems" />
            </p>
            <p style={{ fontSize: 14, color: C.muted, marginTop: 4 }}>
              Systems · AI Integration · Full-Stack Development · DSA
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
              <MapPin size={13} color={C.muted} />
              <span style={{ fontSize: 13, color: C.muted }}>Pune, India</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.green, marginLeft: 4 }}>
                · Available for opportunities
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
          <a href="mailto:pawaryuvraj334@gmail.com" className="btn btn-p"><Mail size={14} /> Contact</a>
          <a href="https://github.com/yuvi969" target="_blank" rel="noreferrer" className="btn btn-s"><Github size={14} /> GitHub</a>
          <a href={resume} download className="btn btn-s"><Download size={14} /> Resume</a>
        </div>

        {/* stat tiles, like the GFG profile page */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12, marginTop: 22 }}>
          {[
            { label: "Projects",        value: "5+"   },
            { label: "Problems Solved", value: "320+" },
            { label: "GFG Score",       value: "759"  },
          ].map(s => (
            <div key={s.label} style={{
              padding: "12px 16px", borderRadius: 8, background: C.greenSoft,
              border: `1px solid ${C.green}30`,
            }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: C.muted }}>{s.label}</p>
              <p style={{ fontSize: 24, fontWeight: 800, color: C.greenInk, lineHeight: 1.2 }}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </Win>
  );
}

// ─── TERMINAL ────────────────────────────────────────────────────────────────
const COMMANDS = {
  help: ["about · projects · skills · contact · resume · ls · clear"],
  whoami: ["yuvraj"],
  ls: ["about.md  projects.jsx  recognition.log  skills.json  dsa.cpp  resume.pdf"],
  about: [
    "CS student. Diploma done, B.Tech in progress.",
    "Into systems, AI integration, full-stack and DSA.",
  ],
  projects: [
    "clinic-queue-management",
    "railway-fault-detection",
    "ecosimple",
    "answer-sheet-rechecking-tool",
    "generic-medicine-recommender",
    "smart-lock-8051",
    "mudraverse  (in progress)",
  ],
  skills: [
    "languages : C++, JavaScript, Python, Java, C",
    "frontend  : React, Tailwind, HTML/CSS",
    "backend   : Node, Express, Flask, Spring Boot",
    "database  : MongoDB, PostgreSQL",
  ],
  contact: [
    "email    : pawaryuvraj334@gmail.com",
    "github   : github.com/yuvi969",
    "linkedin : linkedin.com/in/yuvraj-pawar",
  ],
};

function Terminal() {
  const C = useC();
  const [lines, setLines] = useState([{ t: "out", v: "hey, you found the terminal. type 'help' :)" }]);
  const [val, setVal] = useState("");
  const boxRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [lines]);

  const run = (e) => {
    e.preventDefault();
    const raw = val.trim();
    setVal("");
    if (!raw) return;
    const cmd = raw.toLowerCase();
    if (cmd === "clear") { setLines([]); return; }
    if (cmd === "resume") window.open(resume, "_blank");
    const out = cmd === "resume"
      ? ["opening resume.pdf ..."]
      : COMMANDS[cmd] || [`command not found: ${raw}  (try 'help')`];
    setLines(prev => [...prev, { t: "in", v: raw }, ...out.map(v => ({ t: "out", v }))]);
  };

  return (
    <Win file="terminal — try typing something">
      <div
        ref={boxRef}
        onClick={() => inputRef.current && inputRef.current.focus()}
        style={{
          padding: "14px 18px", height: 190, overflowY: "auto", cursor: "text",
          fontFamily: C.mono, fontSize: 13, lineHeight: 1.7, background: C.termBg,
        }}
      >
        {lines.map((l, i) => (
          <div key={i} style={{ color: l.t === "in" ? C.termText : C.termMuted, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {l.t === "in" && <span style={{ color: C.termPrompt }}>~ $ </span>}
            {l.v}
          </div>
        ))}
        <form onSubmit={run} style={{ display: "flex", alignItems: "center" }}>
          <span style={{ color: C.termPrompt, whiteSpace: "pre" }}>~ $ </span>
          <input
            ref={inputRef}
            className="term-input"
            value={val}
            onChange={e => setVal(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            aria-label="terminal input"
          />
        </form>
      </div>
    </Win>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  const C = useC();
  return (
    <Win id="about" file="about.md">
      <div className="sec">
        <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 14 }}>About</h2>
        <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.75, maxWidth: 680 }}>
          Hey there! I'm a Computer Science student who enjoys learning about computers, networks,
          and new technologies. Over the past few years, I've worked on a bunch of development
          projects, and I think I've gained some solid hands-on experience through them.
        </p>
        <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.75, maxWidth: 680, marginTop: 12 }}>
          Right now, I'm focusing on Data Structures & Algorithms and strengthening my understanding
          of core computer science subjects. I'm always looking to learn something new and improve my skills.
        </p>
        <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.75, maxWidth: 680, marginTop: 12 }}>
          I'm currently looking for an internship where I can gain hands-on experience by working
          with experienced people and learning from them. :)
        </p>
      </div>
    </Win>
  );
}

// ─── RESUME ───────────────────────────────────────────────────────────────────
function Resume() {
  const C = useC();
  return (
    <Win id="resume" file="resume.pdf">
      <div className="sec">
        <div style={{
          padding: "14px 16px", background: C.greenSoft,
          border: `1px dashed ${C.green}80`, borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
        }}>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: C.heading }}>Want the full picture?</p>
            <p style={{ fontSize: 13, color: C.muted }}>Download my resume as a PDF</p>
          </div>
          <a href={resume} download className="btn btn-p"><Download size={14} /> Download Resume</a>
        </div>
      </div>

      <div className="sec">
        <p style={{ fontSize: 13, fontWeight: 700, color: C.faint, marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.06em" }}>Highlights</p>
        {[
          { color: C.green,  label: "GFG Coding Score 759",              sub: "GeeksForGeeks" },
          { color: C.orange, label: "320+ Problems Solved",              sub: "GFG and LeetCode combined" },
          { color: C.purple, label: "Paper accepted at ICCUBEA 2026",     sub: "Railway Fault Detection research" },
          { color: C.blue,   label: "Top 25 at PCCOE Hackathon",         sub: "Out of 300 teams" },
        ].map(a => (
          <div key={a.label} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.color, marginTop: 7, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: C.heading }}>{a.label}</p>
              <p style={{ fontSize: 13, color: C.muted }}>{a.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="sec">
        <p style={{ fontSize: 13, fontWeight: 700, color: C.faint, marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.06em" }}>Education</p>

        {/* Diploma */}
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 20 }}>
          <div style={{ width: 42, height: 42, borderRadius: 8, background: C.greenSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <GraduationCap size={19} color={C.green} />
          </div>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>Diploma in Computer Science</h3>
            <p style={{ fontSize: 14, color: C.muted }}>2023 – 2026</p>
            <p style={{ fontSize: 13, color: C.faint, marginTop: 4 }}>
              Applied Machine Learning · Cloud Computing · Software Engineering · Mobile App Development · Backend (Node.js/Express) · Capstone Project
            </p>
            <p style={{ fontSize: 13, fontWeight: 700, color: C.green, marginTop: 4 }}>CGPA: 8.24 / 10</p>
          </div>
        </div>

        <div style={{ borderLeft: `2px solid ${C.border}`, marginLeft: 20, height: 16, marginBottom: 20 }} />

        {/* B.Tech */}
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{ width: 42, height: 42, borderRadius: 8, background: C.greenSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <GraduationCap size={19} color={C.green} />
          </div>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>B.Tech in Computer Science</h3>
            <p style={{ fontSize: 14, color: C.muted }}>2026 – 2029</p>
            <p style={{ fontSize: 13, color: C.faint, marginTop: 4 }}>Lateral entry after Diploma</p>
          </div>
        </div>
      </div>
    </Win>
  );
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    icon: Stethoscope,
    title: "Clinic Appointment & Queue Management",
    subtitle: "Full-stack healthcare management system",
    desc: "A clinic management platform for booking appointments and managing patient queues. Uses PostgreSQL transactions to prevent double-booking, JWT-based authentication, and Socket.IO for real-time queue updates.",
    tech: ["React", "Node.js", "Express", "PostgreSQL", "JWT", "Socket.IO"],
  },
  {
    icon: Train,
    title: "Railway Fault Detection",
    subtitle: "IEEE Research Paper · ICCUBEA 2026",
    desc: "Comparative study of deep-learning approaches for automated railway track fault inspection. Implements ResNet18 for image-level fault classification and YOLOv8 for detecting and localizing damaged regions using bounding boxes. Evaluates detection performance on railway track and structural crack datasets.",
    tech: ["Python", "ResNet18", "YOLOv8", "Deep Learning", "Computer Vision"],
  },
  {
    icon: Leaf,
    title: "EcoSimple",
    subtitle: "Environmental awareness platform",
    desc: "An environmental dashboard designed to make pollution data easier to understand. Features an interactive Pune AQI map, pollution visualizations, and a carbon footprint calculator to help users understand their environmental impact.",
    tech: ["React", "Vite", "Tailwind CSS", "React Leaflet", "Recharts"],
  },
  {
    icon: ScanLine,
    title: "Answer Sheet Rechecking Tool",
    subtitle: "AI-powered answer sheet evaluation",
    github: "https://github.com/AniketBankar2004/Answer_Sheet_Evaluation",
    desc: "An automated answer-sheet evaluation pipeline that processes handwritten responses using OpenCV and OCR, then leverages Groq-hosted LLMs to evaluate answers and generate structured feedback.",
    tech: ["Python", "OpenCV", "OCR", "Groq API", "React", "Node.js"],
  },
  {
    icon: FlaskConical,
    title: "Generic Medicine Recommender",
    subtitle: "Affordable medicine alternatives",
    github: "https://github.com/yuvi969/PCCOEHACKATHON",
    desc: "A medicine recommendation platform that helps users discover lower-cost generic alternatives to branded medicines by comparing medicine names, compositions, and available pricing.",
    tech: ["React", "Node.js", "Express", "MongoDB", "REST API"],
  },
  {
    icon: Cpu,
    title: "Smart Lock using Keypad",
    subtitle: "Microprocessor & Microcontroller project",
    desc: "An embedded security system built around the 8051 microcontroller. Uses a 4x4 matrix keypad for password input, with LED indicators and a buzzer to provide access-status and feedback.",
    tech: ["8051 Microcontroller", "Embedded C", "4x4 Keypad", "LEDs", "Buzzer"],
  },
];


function Projects() {
  const C = useC();
  return (
    <Win id="projects" file="projects.jsx">
      <div className="sec" style={{ paddingBottom: 16 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800 }}>Featured Projects</h2>
      </div>

      {PROJECTS.map(p => (
        <div key={p.title} className="sec row" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{
            width: 42, height: 42, borderRadius: 8, background: C.greenSoft,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <p.icon size={19} color={C.green} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: C.muted }}>{p.subtitle}</p>
              </div>
              {p.github && (
                <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-s" style={{ fontSize: 13, padding: "4px 12px", flexShrink: 0 }}>
                  <Github size={13} /> Code
                </a>
              )}
            </div>
            <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.65, marginTop: 8 }}>{p.desc}</p>
            <div style={{ marginTop: 10 }}>
              {p.tech.map(t => <span key={t} className="badge">{t}</span>)}
            </div>
          </div>
        </div>
      ))}

      {/* what I'm working on right now */}
      <div className="sec row" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        <div style={{
          width: 42, height: 42, borderRadius: 8, border: `1px dashed ${C.green}`,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Hammer size={19} color={C.green} />
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>MudraVerse</h3>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.green, background: C.greenSoft, borderRadius: 12, padding: "2px 10px" }}>
              building now
            </span>
          </div>
          <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.65, marginTop: 6 }}>
            Making sign language easier to learn. Interactive lessons with 3D environments and computer vision, starting with Indian Sign Language.
          </p>
          <div style={{ marginTop: 10 }}>
            {["Unity", "Blender", "Computer Vision", "Indian Sign Language"].map(t => <span key={t} className="badge">{t}</span>)}
          </div>
        </div>
      </div>
    </Win>
  );
}

// ─── HACKATHONS ───────────────────────────────────────────────────────────────
// "ck" is a colour key, looked up in the current theme when rendering
const HACKATHONS = [
  { icon: Award, ck: "orange", title: "Smart India Hackathon",   tag: "Top 100",        desc: "Made it to the top 100 in my college's internal selection round." },
  { icon: Award, ck: "blue",   title: "PCCOE Hackathon",         tag: "Top 25",         desc: "Finished in the top 25 out of 300 teams." },
  { icon: Train, ck: "purple", title: "Railway Fault Detection", tag: "Paper accepted", desc: "Our research on railway fault detection was accepted at ICUBEA 2026." },
];

function Hackathons() {
  const C = useC();
  return (
    <Win id="hackathons" file="hackathons.log">
      <div className="sec" style={{ paddingBottom: 16 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800 }}>Hackathons & Research</h2>
      </div>
      {HACKATHONS.map(h => {
        const col = C[h.ck];
        return (
          <div key={h.title} className="sec row" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{
              width: 42, height: 42, borderRadius: 8, background: `${col}18`,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <h.icon size={19} color={col} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <h3 style={{ fontSize: 16, fontWeight: 700 }}>{h.title}</h3>
                <span style={{ fontSize: 12, fontWeight: 700, padding: "2px 10px", borderRadius: 12, color: col, background: `${col}18` }}>{h.tag}</span>
              </div>
              <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6, marginTop: 4 }}>{h.desc}</p>
            </div>
          </div>
        );
      })}
    </Win>
  );
}

// ─── TECH STACK ───────────────────────────────────────────────────────────────
function TechStack() {
  const C = useC();
  const STACK = [
    { label: "Languages", color: C.orange, items: ["JavaScript", "Python", "C++", "Java", "SQL"] },
    { label: "Frontend",  color: C.blue,   items: ["React.js", "Tailwind CSS", "HTML / CSS"] },
    { label: "Backend",   color: C.purple, items: ["Node.js", "Express.js", "Flask", "Spring Boot", "REST APIs", "JWT", "Socket.IO"] },
    { label: "Database",  color: C.green,  items: ["MongoDB", "PostgreSQL"] },
    { label: "Tools",     color: C.teal,   items: ["Git", "GitHub", "Postman"] },
  ];
  return (
    <Win id="stack" file="skills.json">
      <div className="sec" style={{ paddingBottom: 16 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800 }}>Skills & Technologies</h2>
      </div>
      <div className="sec">
        {STACK.map((g, i) => (
          <div key={g.label} style={{ marginBottom: i < STACK.length - 1 ? 16 : 0 }}>
            <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, color: g.color }}>{g.label}</p>
            <div>{g.items.map(t => <span key={t} className="badge" style={tagColor(g.color)}>{t}</span>)}</div>
          </div>
        ))}
      </div>
    </Win>
  );
}

// ─── DSA ──────────────────────────────────────────────────────────────────────
function DSA() {
  const C = useC();
  const gfgSolved = 271, gfgScore = 759;
  const gfgBasic = 40, gfgEasy = 102, gfgMedium = 115, gfgHard = 14;
  const lcEasy = 23, lcMed = 24, lcHard = 3, lcTotal = 50;
  const iconBox = (color) => ({
    width: 40, height: 40, borderRadius: 8, background: `${color}18`,
    display: "flex", alignItems: "center", justifyContent: "center",
  });
  return (
    <Win id="dsa" file="dsa.cpp">
      <div className="sec" style={{ paddingBottom: 16 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800 }}>Problem Solving</h2>
      </div>

      <div className="sec">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div style={iconBox(C.green)}><Target size={18} color={C.green} /></div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 16, color: C.heading }}>GeeksForGeeks</p>
            <p style={{ fontSize: 13, color: C.muted }}>Coding practice platform</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 32, marginBottom: 14 }}>
          <div>
            <p style={{ fontSize: 26, fontWeight: 800, color: C.green }}>{gfgScore}</p>
            <p style={{ fontSize: 12, color: C.muted }}>Coding score</p>
          </div>
          <div>
            <p style={{ fontSize: 26, fontWeight: 800, color: C.heading }}>{gfgSolved}</p>
            <p style={{ fontSize: 12, color: C.muted }}>Problems solved</p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 13, color: C.muted }}>Progress</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.green }}>{Math.round((gfgSolved / 500) * 100)}%</span>
        </div>
        <div style={{ height: 7, background: C.divider, borderRadius: 4, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(gfgSolved / 500) * 100}%`, background: C.green, borderRadius: 4 }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginTop: 16 }}>
          {[
            { label: "Easy",   count: gfgEasy,   color: C.green  },
            { label: "Medium", count: gfgMedium, color: C.yellow },
            { label: "Hard",   count: gfgHard,   color: C.red    },
            { label: "Basic",  count: gfgBasic,  color: C.blue   },
          ].map(item => (
            <div key={item.label} style={{
              padding: "10px 8px", borderRadius: 8, textAlign: "center",
              border: `1px solid ${item.color}33`, background: `${item.color}12`,
            }}>
              <p style={{ fontSize: 20, fontWeight: 800, color: item.color, marginBottom: 2 }}>{item.count}</p>
              <p style={{ fontSize: 12, fontWeight: 600, color: C.muted }}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="sec">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div style={iconBox(C.yellow)}><BarChart3 size={18} color={C.yellow} /></div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 16, color: C.heading }}>LeetCode</p>
            <p style={{ fontSize: 13, color: C.muted }}>{lcTotal} problems solved</p>
          </div>
        </div>
        {[
          { label: "Easy",   count: lcEasy, color: C.green  },
          { label: "Medium", count: lcMed,  color: C.yellow },
          { label: "Hard",   count: lcHard, color: C.red    },
        ].map(b => (
          <div key={b.label} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontSize: 13, color: C.muted }}>{b.label}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: b.color }}>{b.count}</span>
            </div>
            <div style={{ height: 6, background: C.divider, borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(b.count / lcTotal) * 100}%`, background: b.color, borderRadius: 3 }} />
            </div>
          </div>
        ))}
      </div>

      <div className="sec">
        <div style={{
          padding: "14px 16px", background: C.greenSoft,
          border: `1px dashed ${C.green}80`, borderRadius: 8,
          display: "flex", gap: 10, alignItems: "flex-start",
        }}>
          <Brain size={16} color={C.green} style={{ marginTop: 2, flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: C.heading, marginBottom: 4 }}>Current focus</p>
            <p style={{ fontSize: 14, color: C.muted }}>Trees · Graphs · Dynamic Programming · System Design</p>
          </div>
        </div>
      </div>
    </Win>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar() {
  const C = useC();
  return (
    <div>
      <Win file="connect.json">
        {[
          { icon: Mail,     label: "Email",    sub: "pawaryuvraj334@gmail.com",     href: "mailto:pawaryuvraj334@gmail.com" },
          { icon: Github,   label: "GitHub",   sub: "github.com/yuvi969",           href: "https://github.com/yuvi969" },
          { icon: Linkedin, label: "LinkedIn", sub: "linkedin.com/in/yuvraj-pawar", href: "https://www.linkedin.com/in/yuvraj-pawar-7256aa2b2/" },
        ].map(item => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("mailto") ? "_self" : "_blank"}
            rel="noreferrer"
            className="sec row"
            style={{ display: "flex", alignItems: "center", gap: 12 }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 8, background: C.greenSoft,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <item.icon size={15} color={C.green} />
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: C.heading }}>{item.label}</p>
              <p style={{ fontSize: 12, color: C.muted, overflow: "hidden", textOverflow: "ellipsis" }}>{item.sub}</p>
            </div>
          </a>
        ))}
      </Win>

      <Win file="open-to.txt">
        <div className="sec">
          {[
            { icon: GraduationCap, label: "Internships",     color: C.green  },
            { icon: Briefcase,     label: "Full-time Roles", color: C.blue   },
            { icon: Github,        label: "Project Collabs", color: C.purple },
          ].map(item => (
            <div key={item.label} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "8px 10px", borderRadius: 6,
              background: `${item.color}16`, marginBottom: 6,
            }}>
              <item.icon size={14} color={item.color} />
              <span style={{ fontSize: 14, fontWeight: 600 }}>{item.label}</span>
            </div>
          ))}
          <p style={{ fontSize: 12, color: C.muted, marginTop: 8 }}>I will try to respond ASAP :)</p>
        </div>
      </Win>

      <Win file="stats.json">
        <div className="sec">
          {[
            { label: "GFG Score",    value: "759", color: C.green  },
            { label: "GFG Problems", value: "271", color: C.green  },
            { label: "LeetCode",     value: "50",  color: C.yellow },
            { label: "Projects",     value: "5+",  color: C.blue   },
          ].map(s => (
            <div key={s.label} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "8px 0", borderBottom: `1px solid ${C.divider}`,
            }}>
              <span style={{ fontSize: 14, color: C.muted }}>{s.label}</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: s.color }}>{s.value}</span>
            </div>
          ))}
        </div>
      </Win>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const C = useC();
  return (
    <footer id="contact" style={{ background: C.footer, padding: "40px 16px" }}>
      <div style={{
        maxWidth: 1128, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 20,
      }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6, color: "#fff" }}>
            Let's build something<span style={{ color: C.termPrompt }}>.</span>
          </h2>
          <p style={{ fontSize: 14, color: C.footerText, lineHeight: 1.6 }}>
            Open to internships and interesting projects.<br />
            I will respond ASAP :)
          </p>
          <p style={{ fontSize: 12, color: C.footerFaint, marginTop: 12 }}>© 2026 Yuvraj Pawar</p>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a href="mailto:pawaryuvraj334@gmail.com" className="btn btn-p"><Mail size={14} /> Send Email</a>
          <a href="https://www.linkedin.com/in/yuvraj-pawar-7256aa2b2/" target="_blank" rel="noreferrer" className="btn btn-s"><Linkedin size={14} /> LinkedIn</a>
          <a href="https://github.com/yuvi969" target="_blank" rel="noreferrer" className="btn btn-s"><Github size={14} /> GitHub</a>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  // start from the saved choice, else the device's light/dark setting
  const [mode, setMode] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark" || saved === "light") return saved;
    } catch (e) { /* storage blocked, ignore */ }
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    try { localStorage.setItem("theme", mode); } catch (e) { /* ignore */ }
    document.documentElement.style.colorScheme = mode;
  }, [mode]);

  const toggle = () => setMode(m => (m === "dark" ? "light" : "dark"));

  return (
    <ThemeCtx.Provider value={THEMES[mode]}>
      <GlobalStyle />
      <Nav mode={mode} onToggle={toggle} />
      <div style={{ paddingTop: 54 }}>
        <div
          className="layout"
          style={{
            maxWidth: 1128, margin: "24px auto", padding: "0 16px",
            display: "grid",
            gridTemplateColumns: "minmax(0, 3fr) minmax(0, 1fr)",
            gap: 20, alignItems: "start",
          }}
        >
          <main>
            <Profile />
            <Terminal />
            <About />
            <Resume />
            <Projects />
            <Hackathons />
            <TechStack />
            <DSA />
          </main>
          <aside>
            <div className="sidebar-sticky" style={{ position: "sticky", top: 70 }}>
              <Sidebar />
            </div>
          </aside>
        </div>
        <Footer />
      </div>
    </ThemeCtx.Provider>
  );
}
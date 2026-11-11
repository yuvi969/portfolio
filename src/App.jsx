import { useState, useEffect, useRef } from "react";
import Pfp from "./real.png";
import resume from "./Resume.pdf";
import {
  Code2 as Github, Link as Linkedin, Mail,
  Layers, Globe, Brain, Target, BarChart3,
  MapPin, Briefcase, GraduationCap, Award, Download,
  ScanLine, FlaskConical, Leaf, Train, Stethoscope, Hammer,
} from "lucide-react";

// ─── TOKENS ──────────────────────────────────────────────────────────────────
const C = {
  bg: "#14151c",
  card: "#1b1d27",
  bar: "#232635",
  text: "#d9dcec",
  muted: "#8e94b0",
  faint: "#5d6382",
  border: "#2e3246",
  divider: "#262a3b",
  pink: "#ff7eb6",
  pinkHover: "#ff9cc7",
  cyan: "#6fd8f0",
  purple: "#b794f6",
  green: "#7ee787",
  orange: "#ffb366",
  red: "#ff6b7a",
  font: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace",
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');

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
    a { text-decoration: none; color: inherit; }
    h1, h2, h3, h4 { text-align: left; color: #fff; }
    p { text-align: left; }
    ::selection { background: ${C.pink}; color: #14151c; }
    ::-webkit-scrollbar { width: 8px; height: 8px; }
    ::-webkit-scrollbar-track { background: ${C.bg}; }
    ::-webkit-scrollbar-thumb { background: #2b2f45; border-radius: 4px; }

    .card {
      background: ${C.card};
      border: 1px solid ${C.border};
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 16px;
    }
    .bar {
      display: flex; align-items: center; gap: 14px;
      padding: 9px 14px; background: ${C.bar};
      border-bottom: 1px solid ${C.border};
      font-family: ${C.mono}; font-size: 12px; color: ${C.muted};
    }
    .dots { display: flex; gap: 6px; }
    .dots i { width: 10px; height: 10px; border-radius: 50%; background: #3a3f58; display: block; }
    .card:hover .dots i:nth-child(1) { background: ${C.red}; }
    .card:hover .dots i:nth-child(2) { background: ${C.orange}; }
    .card:hover .dots i:nth-child(3) { background: ${C.green}; }
    .dots i { transition: background 0.25s; }

    .sec { padding: 20px 24px; border-bottom: 1px solid ${C.divider}; }
    .sec:last-child { border-bottom: none; }

    .btn {
      display: inline-flex; align-items: center; gap: 7px;
      border-radius: 6px; padding: 7px 15px;
      font-size: 14px; font-weight: 500; cursor: pointer;
      transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
      font-family: ${C.font};
    }
    .btn:hover { transform: translateY(-1px); }
    .btn-p { background: ${C.pink}; color: #14151c; border: 1px solid ${C.pink}; font-weight: 600; }
    .btn-p:hover { background: ${C.pinkHover}; }
    .btn-s { background: transparent; color: ${C.text}; border: 1px solid ${C.border}; }
    .btn-s:hover { border-color: ${C.cyan}; color: ${C.cyan}; }
    .btn:focus-visible, a:focus-visible, input:focus-visible { outline: 2px solid ${C.cyan}; outline-offset: 2px; }

    .badge {
      display: inline-block; padding: 2px 10px;
      font-family: ${C.mono}; font-size: 12px;
      border: 1px solid ${C.border}; border-radius: 4px;
      margin: 3px 6px 3px 0; color: ${C.muted};
    }

    .nav-item {
      display: flex; align-items: center; gap: 6px;
      color: ${C.muted}; font-size: 13px; padding: 4px 11px;
      cursor: pointer; transition: color 0.15s;
    }
    .nav-item:hover { color: ${C.cyan}; }

    .row { border-left: 2px solid transparent; transition: background 0.15s, border-color 0.15s; }
    .row:hover { background: rgba(255,255,255,0.02); border-left-color: ${C.pink}; }

    .cursor {
      display: inline-block; width: 9px; height: 1.05em; margin-left: 3px;
      background: ${C.pink}; vertical-align: -3px;
      animation: blink 1.05s steps(2, start) infinite;
    }
    @keyframes blink { to { visibility: hidden; } }

    .term-input {
      flex: 1; min-width: 0; background: transparent; border: none; outline: none;
      color: ${C.text}; font-family: ${C.mono}; font-size: 13px; caret-color: ${C.pink};
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

// ─── SMALL HELPERS ───────────────────────────────────────────────────────────
// A "window": title bar with a filename, then the content
function Win({ id, file, children }) {
  return (
    <section className="card" id={id}>
      <div className="bar">
        <span className="dots"><i /><i /><i /></span>
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

const tagColor = (color) => ({ color, borderColor: `${color}55` });

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(20,21,28,0.9)", backdropFilter: "blur(14px)",
      borderBottom: `1px solid ${C.border}`,
      height: 54, display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        maxWidth: 1128, width: "100%", padding: "0 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            width: 32, height: 32, borderRadius: 6, background: C.pink, color: "#14151c",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: C.mono, fontWeight: 700, fontSize: 16,
          }}>Y</span>
          <span className="hide-mob" style={{ fontFamily: C.mono, fontSize: 14, fontWeight: 500 }}>
            Yuvraj<span style={{ color: C.pink }}>.</span>
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

        <a href="mailto:pawaryuvraj334@gmail.com" className="btn btn-p" style={{ fontSize: 13, padding: "5px 14px" }}>
          <Mail size={14} /> Hire Me
        </a>
      </div>
    </nav>
  );
}

// ─── PROFILE ─────────────────────────────────────────────────────────────────
function Profile() {
  return (
    <Win id="top" file="~/yuvraj — whoami">
      <div style={{ padding: "26px 24px 24px" }}>
        <div style={{ display: "flex", gap: 22, alignItems: "center", flexWrap: "wrap" }}>
          {/* Avatar: circle crop, image zoomed inside it */}
          <div style={{
            width: 112, height: 112, borderRadius: "50%", overflow: "hidden", flexShrink: 0,
            border: `2px solid ${C.pink}`, boxShadow: `0 0 0 5px ${C.card}, 0 0 0 6px ${C.border}`,
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
            <h1 style={{ fontFamily: C.mono, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>
              Yuvraj Pawar
            </h1>
            <p style={{ fontFamily: C.mono, fontSize: 14, color: C.cyan, marginTop: 6, minHeight: 22 }}>
              <Typed text="Computer Science Student · Building Software Systems" />
            </p>
            <p style={{ fontSize: 14, color: C.muted, marginTop: 6 }}>
              Systems · AI Integration · Full-Stack Development · DSA
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
              <MapPin size={13} color={C.muted} />
              <span style={{ fontSize: 13, color: C.muted }}>Pune, India</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: C.green, marginLeft: 4 }}>
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

        <div style={{
          display: "flex", gap: 32, marginTop: 22, paddingTop: 18,
          borderTop: `1px solid ${C.divider}`, flexWrap: "wrap",
        }}>
          {[
            { label: "Projects",        value: "5+",   color: C.cyan   },
            { label: "Problems Solved", value: "320+", color: C.orange },
            { label: "GFG Score",       value: "759",  color: C.green  },
          ].map(s => (
            <div key={s.label}>
              <p style={{ fontFamily: C.mono, fontSize: 20, fontWeight: 700, color: s.color }}>{s.value}</p>
              <p style={{ fontSize: 12, color: C.muted }}>{s.label}</p>
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
    "mudraverse  (in progress)",
  ],
  skills: [
    "languages : JavaScript, Python, C++, Java",
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
          fontFamily: C.mono, fontSize: 13, lineHeight: 1.7, background: "#161822",
        }}
      >
        {lines.map((l, i) => (
          <div key={i} style={{ color: l.t === "in" ? C.text : C.muted, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {l.t === "in" && <span style={{ color: C.pink }}>~ $ </span>}
            {l.v}
          </div>
        ))}
        <form onSubmit={run} style={{ display: "flex", alignItems: "center" }}>
          <span style={{ color: C.pink, whiteSpace: "pre" }}>~ $ </span>
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
  return (
    <Win id="about" file="about.md">
      <div className="sec">
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>About</h2>
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
  return (
    <Win id="resume" file="resume.pdf">
      <div className="sec">
        <div style={{
          padding: "14px 16px", background: "rgba(255,126,182,0.05)",
          border: `1px dashed ${C.pink}66`, borderRadius: 6,
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
        }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>Want the full picture?</p>
            <p style={{ fontSize: 13, color: C.muted }}>Download my resume as a PDF</p>
          </div>
          <a href={resume} download className="btn btn-p"><Download size={14} /> Download Resume</a>
        </div>
      </div>

      <div className="sec">
        <p style={{ fontFamily: C.mono, fontSize: 12, color: C.faint, marginBottom: 14 }}>// highlights</p>
        {[
          { color: C.green,  label: "GFG Coding Score 759",              sub: "GeeksForGeeks" },
          { color: C.orange, label: "320+ Problems Solved",              sub: "GFG and LeetCode combined" },
          { color: C.purple, label: "Paper accepted at ICUBEA 2026",     sub: "Railway Fault Detection research" },
          { color: C.cyan,   label: "Top 25 at PCCOE Hackathon",         sub: "Out of 300 teams" },
        ].map(a => (
          <div key={a.label} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: a.color, marginTop: 7, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 14, fontWeight: 500, color: "#fff" }}>{a.label}</p>
              <p style={{ fontSize: 13, color: C.muted }}>{a.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="sec">
        <p style={{ fontFamily: C.mono, fontSize: 12, color: C.faint, marginBottom: 14 }}>// education</p>

        {/* Diploma */}
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 20 }}>
          <div style={{ width: 42, height: 42, borderRadius: 6, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <GraduationCap size={19} color={C.cyan} />
          </div>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 600 }}>Diploma in Computer Science</h3>
            <p style={{ fontSize: 14, color: C.muted }}>2023 – 2026</p>
            <p style={{ fontSize: 13, color: C.faint, marginTop: 4 }}>
              Applied Machine Learning · Cloud Computing · Software Engineering · Mobile App Development · Backend (Node.js/Express) · Capstone Project
            </p>
            <p style={{ fontFamily: C.mono, fontSize: 13, color: C.green, marginTop: 4 }}>CGPA: 8.24 / 10</p>
          </div>
        </div>

        <div style={{ borderLeft: `2px solid ${C.border}`, marginLeft: 20, height: 16, marginBottom: 20 }} />

        {/* B.Tech */}
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{ width: 42, height: 42, borderRadius: 6, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <GraduationCap size={19} color={C.cyan} />
          </div>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 600 }}>B.Tech in Computer Science</h3>
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
    subtitle: "Appointment booking for clinics",
    desc: "Handles appointment booking and the waiting queue for a clinic. Booking is transactional, patients log in with JWT, and the queue updates in real time over Socket.IO.",
    tech: ["React", "Node.js", "Express", "PostgreSQL", "JWT", "Socket.IO"],
  },
  {
    icon: Train,
    title: "Railway Fault Detection",
    subtitle: "Research paper · ICUBEA 2026",
    desc: "Research on finding railway surface faults automatically. Compares image classification and object detection, uses Grad-CAM to see what the model looks at, and GANs for data augmentation.",
    tech: ["Python", "ResNet18", "YOLOv8", "Grad-CAM", "GAN"],
  },
  {
    icon: Leaf,
    title: "EcoSimple",
    subtitle: "Environmental tech project",
    desc: "A project about making environmental information easier to understand and act on.",
    tech: ["Web Development", "Environmental Data"],
  },
  {
    icon: ScanLine,
    title: "Answer Sheet Rechecking Tool",
    subtitle: "AI-powered answer sheet evaluation",
    github: "https://github.com/AniketBankar2004/Answer_Sheet_Evaluation",
    desc: "Uses OCR and Groq LLM to extract handwritten answers via OpenCV and score them through LLM reasoning. Full pipeline from image input to structured feedback.",
    tech: ["Python", "OpenCV", "Groq API", "Node.js", "React"],
  },
  {
    icon: FlaskConical,
    title: "Generic Medicine Recommender",
    subtitle: "Cost-effective medicine alternatives",
    github: "https://github.com/yuvi969/PCCOEHACKATHON",
    desc: "Recommends generic alternatives to branded medicines by comparing composition, efficacy data, and pricing through a REST API backend.",
    tech: ["Node.js", "Express", "MongoDB", "React"],
  },
];

function Projects() {
  return (
    <Win id="projects" file="projects.jsx">
      <div className="sec" style={{ paddingBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600 }}>Featured Projects</h2>
      </div>

      {PROJECTS.map(p => (
        <div key={p.title} className="sec row" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{
            width: 42, height: 42, borderRadius: 6, border: `1px solid ${C.border}`,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <p.icon size={19} color={C.pink} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 600 }}>{p.title}</h3>
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
          width: 42, height: 42, borderRadius: 6, border: `1px dashed ${C.green}88`,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Hammer size={19} color={C.green} />
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <h3 style={{ fontSize: 15, fontWeight: 600 }}>MudraVerse</h3>
            <span style={{ fontFamily: C.mono, fontSize: 11, color: C.green, border: `1px solid ${C.green}55`, borderRadius: 4, padding: "1px 8px" }}>
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
const HACKATHONS = [
  { icon: Award, color: C.orange, title: "Smart India Hackathon", tag: "Top 100",  desc: "Made it to the top 100 in my college's internal selection round." },
  { icon: Award, color: C.cyan,   title: "PCCOE Hackathon",       tag: "Top 25",   desc: "Finished in the top 25 out of 300 teams." },
  { icon: Train, color: C.purple, title: "Railway Fault Detection", tag: "Paper accepted", desc: "Our research on railway fault detection was accepted at ICUBEA 2026." },
];

function Hackathons() {
  return (
    <Win id="hackathons" file="hackathons.log">
      <div className="sec" style={{ paddingBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600 }}>Hackathons & Research</h2>
      </div>
      {HACKATHONS.map(h => (
        <div key={h.title} className="sec row" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{
            width: 42, height: 42, borderRadius: 6, border: `1px solid ${h.color}55`,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <h.icon size={19} color={h.color} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <h3 style={{ fontSize: 15, fontWeight: 600 }}>{h.title}</h3>
              <span style={{ fontFamily: C.mono, fontSize: 11, padding: "1px 8px", borderRadius: 4, color: h.color, border: `1px solid ${h.color}55` }}>{h.tag}</span>
            </div>
            <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6, marginTop: 4 }}>{h.desc}</p>
          </div>
        </div>
      ))}
    </Win>
  );
}

// ─── TECH STACK ───────────────────────────────────────────────────────────────
function TechStack() {
  const STACK = [
    { label: "Languages", color: C.orange, items: ["JavaScript", "Python", "C++", "Java", "SQL"] },
    { label: "Frontend",  color: C.cyan,   items: ["React.js", "Tailwind CSS", "HTML / CSS"] },
    { label: "Backend",   color: C.purple, items: ["Node.js", "Express.js", "Flask", "Spring Boot", "REST APIs", "JWT", "Socket.IO"] },
    { label: "Database",  color: C.green,  items: ["MongoDB", "PostgreSQL"] },
    { label: "Tools",     color: C.pink,   items: ["Git", "GitHub", "Postman"] },
  ];
  return (
    <Win id="stack" file="skills.json">
      <div className="sec" style={{ paddingBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600 }}>Skills & Technologies</h2>
      </div>
      <div className="sec">
        {STACK.map((g, i) => (
          <div key={g.label} style={{ marginBottom: i < STACK.length - 1 ? 16 : 0 }}>
            <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, color: g.color }}>{g.label}</p>
            <div>{g.items.map(t => <span key={t} className="badge" style={tagColor(g.color)}>{t}</span>)}</div>
          </div>
        ))}
      </div>
    </Win>
  );
}

// ─── DSA ──────────────────────────────────────────────────────────────────────
function DSA() {
  const gfgSolved = 271, gfgScore = 759;
  const gfgBasic = 40, gfgEasy = 102, gfgMedium = 115, gfgHard = 14;
  const lcEasy = 23, lcMed = 24, lcHard = 3, lcTotal = 50;
  const iconBox = (color) => ({
    width: 40, height: 40, borderRadius: 6, border: `1px solid ${color}55`,
    display: "flex", alignItems: "center", justifyContent: "center",
  });
  return (
    <Win id="dsa" file="dsa.cpp">
      <div className="sec" style={{ paddingBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600 }}>Problem Solving</h2>
      </div>

      <div className="sec">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div style={iconBox(C.green)}><Target size={18} color={C.green} /></div>
          <div>
            <p style={{ fontWeight: 600, fontSize: 15, color: "#fff" }}>GeeksForGeeks</p>
            <p style={{ fontSize: 13, color: C.muted }}>Coding practice platform</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 32, marginBottom: 14 }}>
          <div>
            <p style={{ fontFamily: C.mono, fontSize: 24, fontWeight: 700, color: C.green }}>{gfgScore}</p>
            <p style={{ fontSize: 12, color: C.muted }}>Coding score</p>
          </div>
          <div>
            <p style={{ fontFamily: C.mono, fontSize: 24, fontWeight: 700, color: "#fff" }}>{gfgSolved}</p>
            <p style={{ fontSize: 12, color: C.muted }}>Problems solved</p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 13, color: C.muted }}>Progress</span>
          <span style={{ fontFamily: C.mono, fontSize: 13, color: C.green }}>{Math.round((gfgSolved / 500) * 100)}%</span>
        </div>
        <div style={{ height: 6, background: C.divider, borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(gfgSolved / 500) * 100}%`, background: C.green, borderRadius: 3 }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginTop: 16 }}>
          {[
            { label: "Easy",   count: gfgEasy,   color: C.green  },
            { label: "Medium", count: gfgMedium, color: C.orange },
            { label: "Hard",   count: gfgHard,   color: C.red    },
            { label: "Basic",  count: gfgBasic,  color: C.cyan   },
          ].map(item => (
            <div key={item.label} style={{
              padding: "10px 8px", borderRadius: 6, textAlign: "center",
              border: `1px solid ${item.color}33`, background: `${item.color}0f`,
            }}>
              <p style={{ fontFamily: C.mono, fontSize: 18, fontWeight: 700, color: item.color, marginBottom: 2 }}>{item.count}</p>
              <p style={{ fontSize: 11, color: C.muted }}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="sec">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div style={iconBox(C.orange)}><BarChart3 size={18} color={C.orange} /></div>
          <div>
            <p style={{ fontWeight: 600, fontSize: 15, color: "#fff" }}>LeetCode</p>
            <p style={{ fontSize: 13, color: C.muted }}>{lcTotal} problems solved</p>
          </div>
        </div>
        {[
          { label: "Easy",   count: lcEasy, color: C.green  },
          { label: "Medium", count: lcMed,  color: C.orange },
          { label: "Hard",   count: lcHard, color: C.red    },
        ].map(b => (
          <div key={b.label} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontSize: 13, color: C.muted }}>{b.label}</span>
              <span style={{ fontFamily: C.mono, fontSize: 13, color: b.color }}>{b.count}</span>
            </div>
            <div style={{ height: 5, background: C.divider, borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(b.count / lcTotal) * 100}%`, background: b.color, borderRadius: 3 }} />
            </div>
          </div>
        ))}
      </div>

      <div className="sec">
        <div style={{
          padding: "14px 16px", background: "rgba(111,216,240,0.05)",
          border: `1px dashed ${C.cyan}66`, borderRadius: 6,
          display: "flex", gap: 10, alignItems: "flex-start",
        }}>
          <Brain size={16} color={C.cyan} style={{ marginTop: 2, flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 4 }}>Current focus</p>
            <p style={{ fontSize: 14, color: C.muted }}>Trees · Graphs · Dynamic Programming · System Design</p>
          </div>
        </div>
      </div>
    </Win>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar() {
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
              width: 36, height: 36, borderRadius: 6, border: `1px solid ${C.border}`,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <item.icon size={15} color={C.pink} />
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: "#fff" }}>{item.label}</p>
              <p style={{ fontSize: 12, color: C.muted, overflow: "hidden", textOverflow: "ellipsis" }}>{item.sub}</p>
            </div>
          </a>
        ))}
      </Win>

      <Win file="open-to.txt">
        <div className="sec">
          {[
            { icon: GraduationCap, label: "Internships",     color: C.green  },
            { icon: Briefcase,     label: "Full-time Roles", color: C.cyan   },
            { icon: Github,        label: "Project Collabs", color: C.purple },
          ].map(item => (
            <div key={item.label} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "8px 10px", borderRadius: 6,
              background: `${item.color}12`, marginBottom: 6,
            }}>
              <item.icon size={14} color={item.color} />
              <span style={{ fontSize: 14, fontWeight: 500 }}>{item.label}</span>
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
            { label: "LeetCode",     value: "50",  color: C.orange },
            { label: "Projects",     value: "5+",  color: C.cyan   },
          ].map(s => (
            <div key={s.label} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "8px 0", borderBottom: `1px solid ${C.divider}`,
            }}>
              <span style={{ fontSize: 14, color: C.muted }}>{s.label}</span>
              <span style={{ fontFamily: C.mono, fontSize: 14, fontWeight: 700, color: s.color }}>{s.value}</span>
            </div>
          ))}
        </div>
      </Win>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer id="contact" style={{
      background: "#101118", borderTop: `1px solid ${C.border}`,
      padding: "40px 16px",
    }}>
      <div style={{
        maxWidth: 1128, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 20,
      }}>
        <div>
          <h2 style={{ fontFamily: C.mono, fontSize: 24, fontWeight: 700, marginBottom: 6 }}>
            Let's build something<span style={{ color: C.pink }}>.</span>
          </h2>
          <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6 }}>
            Open to internships and interesting projects.<br />
            I will respond ASAP :)
          </p>
          <p style={{ fontFamily: C.mono, fontSize: 12, color: C.faint, marginTop: 12 }}>© 2026 Yuvraj Pawar</p>
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
  return (
    <>
      <GlobalStyle />
      <Nav />
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
    </>
  );
}
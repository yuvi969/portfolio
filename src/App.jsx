import { useState } from "react";
import Pfp from "./real.jpeg";
import resume from "./myresume.pdf";
import {
  Code2 as Github, Link as Linkedin, Mail,
  Layers, Database, Server, Globe, FlaskConical, ScanLine,
  Leaf, Building2, Train, Brain, Target, BarChart3,
  MapPin, Briefcase, GraduationCap,
} from "lucide-react";

// ─── TOKENS ──────────────────────────────────────────────────────────────────
const C = {
  blue: "#0a66c2",
  blueHover: "#004182",
  bg: "#f3f2ef",
  card: "#ffffff",
  text: "rgba(0,0,0,0.9)",
  muted: "rgba(0,0,0,0.6)",
  faint: "rgba(0,0,0,0.35)",
  border: "#e0e0df",
  divider: "rgba(0,0,0,0.08)",
  font: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background: ${C.bg};
      color: ${C.text};
      font-family: ${C.font};
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      text-align: left;
    }
    a { text-decoration: none; color: inherit; }
    h1, h2, h3, h4 { text-align: left; color: #000; }
    p { text-align: left; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: ${C.bg}; }
    ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }

    .card {
      background: ${C.card};
      border: 1px solid ${C.border};
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 8px;
    }
    .sec { padding: 20px 24px; border-bottom: 1px solid ${C.divider}; }
    .sec:last-child { border-bottom: none; }

    .btn {
      display: inline-flex; align-items: center; gap: 6px;
      border-radius: 24px; padding: 6px 18px;
      font-size: 15px; font-weight: 600; cursor: pointer;
      transition: all 0.15s ease; font-family: ${C.font};
      text-decoration: none;
    }
    .btn-p { background: ${C.blue}; color: #fff; border: none; }
    .btn-p:hover { background: ${C.blueHover}; }
    .btn-s {
      background: transparent; color: ${C.blue};
      border: 1.5px solid ${C.blue};
    }
    .btn-s:hover { background: rgba(10,102,194,0.08); }

    .badge {
      display: inline-block; padding: 3px 12px;
      font-size: 13px; font-weight: 500;
      background: rgba(0,0,0,0.07); border-radius: 14px;
      margin: 3px 3px 3px 0; color: ${C.text};
    }

    .nav-item {
      display: flex; flex-direction: column; align-items: center; gap: 2px;
      color: ${C.muted}; font-size: 12px; padding: 4px 12px;
      cursor: pointer; text-decoration: none; transition: color 0.15s;
    }
    .nav-item:hover { color: ${C.text}; }

    @media (max-width: 860px) {
      .layout { grid-template-columns: 1fr !important; }
      .hide-mob { display: none !important; }
      .sidebar-sticky { position: static !important; }
    }
  `}</style>
);

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(255,255,255,0.97)",
      borderBottom: `1px solid ${C.border}`,
      height: 52, display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        maxWidth: 1128, width: "100%", padding: "0 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 6, background: C.blue,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 17, fontFamily: "Georgia, serif" }}>Y</span>
          </div>
          <span className="hide-mob" style={{ fontWeight: 600, fontSize: 15 }}>Yuvraj Pawar</span>
        </div>

        <div className="hide-mob" style={{ display: "flex", alignItems: "center" }}>
          {[
            { label: "Home",     href: "#top",      icon: <Globe size={20} /> },
            { label: "Resume", href: "#resume", icon: <GraduationCap size={20} /> },
            { label: "Projects", href: "#projects",  icon: <Github size={20} /> },
            { label: "Skills",   href: "#stack",     icon: <Layers size={20} /> },
            { label: "DSA",      href: "#dsa",       icon: <Brain size={20} /> },
            { label: "Contact",  href: "#contact",   icon: <Mail size={20} /> },
          ].map(item => (
            <a key={item.label} href={item.href} className="nav-item">
              {item.icon}
              {item.label}
            </a>
          ))}
        </div>

        <a href="mailto:pawaryuvraj334@gmail.com" className="btn btn-p" style={{ fontSize: 14, padding: "5px 16px" }}>
          <Mail size={14} /> Hire Me
        </a>
      </div>
    </nav>
  );
}

// ─── PROFILE ─────────────────────────────────────────────────────────────────
function Profile() {
  return (
    // overflow visible so avatar can sit on top of banner
    <div style={{
      background: C.card, border: `1px solid ${C.border}`,
      borderRadius: 8, marginBottom: 8,
    }} id="top">
      {/* Banner */}
     <div style={{
  height: 160,
  borderRadius: "8px 8px 0 0",
  position: "relative",
  overflow: "hidden",
  background: `
    linear-gradient(135deg, #0a66c2, #004182),
    repeating-linear-gradient(
      0deg,
      rgba(255,255,255,0.05) 0px,
      rgba(255,255,255,0.05) 1px,
      transparent 1px,
      transparent 20px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(255,255,255,0.05) 0px,
      rgba(255,255,255,0.05) 1px,
      transparent 1px,
      transparent 20px
    )
  `,
}}>

  {/* Inject keyframes */}
  <style>
    {`
      @keyframes float {
        0% {
          transform: translateY(0px) translateX(0px);
          opacity: 0.6;
        }
        50% {
          transform: translateY(-20px) translateX(10px);
          opacity: 1;
        }
        100% {
          transform: translateY(-40px) translateX(-10px);
          opacity: 0;
        }
      }
    `}
  </style>

  {/* Particles */}
  {[...Array(12)].map((_, i) => (
    <span
      key={i}
      style={{
        position: "absolute",
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.6)",
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animation: `float ${6 + Math.random() * 6}s linear infinite`,
        opacity: 0.6,
      }}
    />
  ))}

</div>
      {/* Body */}
      <div style={{ padding: "0 24px 24px" }}>

        {/* Avatar row: avatar floats up, buttons sit to the right */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
          {/* Avatar — negative margin pulls it up over the banner */}
          <img
            src={Pfp}
            alt="Yuvraj Pawar"
            style={{
              width: 128, height: 128, borderRadius: "50%",
              border: "4px solid #fff",
              marginTop: -56,
               position: "relative", // ✅ add
               zIndex: 1, 
              objectFit: "cover",
              objectPosition: "center 15%",
              flexShrink: 0,
              boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
              display: "block",
            }}
          />

          {/* Action buttons — aligned to top right */}
          <div style={{ display: "flex", gap: 8, paddingTop: 16 }}>
            <a href="https://github.com/yuvi969" target="_blank" rel="noreferrer" className="btn btn-s" style={{ fontSize: 14 }}>
              <Github size={14} /> GitHub
            </a>
            <a href="mailto:pawaryuvraj334@gmail.com" className="btn btn-p" style={{ fontSize: 14 }}>
              <Mail size={14} /> Contact
            </a>
          </div>
        </div>

        {/* Name & headline */}
        <div style={{ marginTop: 12, textAlign: "left" }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#000" }}>Yuvraj Pawar</h1>
          <p style={{ fontSize: 15, color: "#444", marginTop: 4 }}>
            Computer Science Student · Building Software Systems
          </p>
          <p style={{ fontSize: 14, color: "#666", marginTop: 2 }}>
            Systems · AI Integration · Full-Stack Development · DSA
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
            <MapPin size={13} color="#666" />
            <span style={{ fontSize: 14, color: "#666" }}>India</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.blue, marginLeft: 4 }}>
              · Available for opportunities
            </span>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: "flex", gap: 28, marginTop: 16,
          paddingTop: 16, borderTop: "1px solid rgba(0,0,0,0.1)",
        }}>
          {[
            { label: "Projects",        value: "3+"   },
            { label: "Problems Solved", value: "307+" },
            { label: "GFG Score",       value: "759"  },
          ].map(s => (
            <div key={s.label}>
              <p style={{ fontSize: 16, fontWeight: 700, color: C.blue }}>{s.value}</p>
              <p style={{ fontSize: 12, color: "#666" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <div className="card">
      <div className="sec">
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>About</h2>
        <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.7 }}>
         Hey! I'm a CS student who loves exploring new tech and learning out how things work. Right now, I'm focused on leveling up my DSA skills and diving into full-stack development. I also have a big interest in machine learning and love learning how different ML concepts work under the hood. :-)
        </p>
        
      </div>
    </div>
  );
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────
const PROJECTS = [
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
  {
    icon: Globe,
    title: "GatherUp",
    subtitle: "Location-based event platform",
    github: "https://github.com/AniketBankar2004/hackathon_gather_up",
    desc: "Full-stack event discovery platform with JWT authentication, geospatial filtering, and a clean separation between public discovery and protected management routes.",
    tech: ["Spring Boot", "React", "MongoDB", "JWT", "Geolocation"],
  },
];

function Projects() {
  return (
    <div className="card" id="projects">
      <div className="sec" style={{ paddingBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700 }}>Featured Projects</h2>
      </div>
      {PROJECTS.map(p => (
        <div key={p.title} className="sec" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{
            width: 44, height: 44, borderRadius: 8,
            background: "rgba(10,102,194,0.08)", border: "1px solid rgba(10,102,194,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <p.icon size={20} color={C.blue} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: C.muted }}>{p.subtitle}</p>
              </div>
              <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-s" style={{ fontSize: 13, padding: "4px 14px", flexShrink: 0 }}>
                <Github size={13} /> Code
              </a>
            </div>
            <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6, marginTop: 8 }}>{p.desc}</p>
            <div style={{ marginTop: 10 }}>
              {p.tech.map(t => <span key={t} className="badge">{t}</span>)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── HACKATHONS ───────────────────────────────────────────────────────────────
const HACKATHONS = [
  { icon: Leaf,      color: "#057642", title: "EcoSnap",                       tag: "24h Hackathon", desc: "Environmental data web app — snap photos to log and analyze local pollution & biodiversity metrics in real time." },
  { icon: Building2, color: "#0a66c2", title: "SimCity AI",                    tag: "Hackathon",     desc: "Multi-agent urban policy simulator where AI agents model competing city stakeholders to forecast policy impact." },
  { icon: Train,     color: "#5f4b8b", title: "Railway Track Fault Detection", tag: "Research",      desc: "Object detection study using YOLOv8 for automated railway track fault localization with high-precision defect classification." },
];

function Hackathons() {
  return (
    <div className="card" id="hackathons">
      <div className="sec" style={{ paddingBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700 }}>Hackathons & Research</h2>
      </div>
      {HACKATHONS.map(h => (
        <div key={h.title} className="sec" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{
            width: 44, height: 44, borderRadius: 8,
            background: `${h.color}12`, border: `1px solid ${h.color}25`,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <h.icon size={20} color={h.color} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700 }}>{h.title}</h3>
              <span style={{
                fontSize: 12, padding: "2px 10px", borderRadius: 12,
                background: `${h.color}12`, color: h.color, fontWeight: 600,
              }}>{h.tag}</span>
            </div>
            <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6, marginTop: 4 }}>{h.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── TECH STACK ───────────────────────────────────────────────────────────────
function TechStack() {
  const STACK = [
    { label: "Frontend",  items: ["React.js", "Tailwind CSS", "HTML / CSS"] },
    { label: "Backend",   items: ["Node.js", "Express.js", "Flask", "Spring Boot"] },
    { label: "Database",  items: ["MongoDB", "PostgreSQL", "SQL"] },
    { label: "Languages", items: ["JavaScript", "Python", "C++", "Java"] },
  ];
  return (
    <div className="card" id="stack">
      <div className="sec" style={{ paddingBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700 }}>Skills & Technologies</h2>
      </div>
      <div className="sec">
        {STACK.map((g, i) => (
          <div key={g.label} style={{ marginBottom: i < STACK.length - 1 ? 16 : 0 }}>
            <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{g.label}</p>
            <div>{g.items.map(t => <span key={t} className="badge">{t}</span>)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── DSA ──────────────────────────────────────────────────────────────────────
function DSA() {
  const gfgSolved = 267, gfgScore = 759;
  const lcEasy = 21, lcMed = 16, lcHard = 3, lcTotal = 40;
  return (
    <div className="card" id="dsa">
      <div className="sec" style={{ paddingBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700 }}>Problem Solving</h2>
      </div>

      <div className="sec">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: "#2f8d4612", border: "1px solid #2f8d4625", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Target size={18} color="#2f8d46" />
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 15 }}>GeeksForGeeks</p>
            <p style={{ fontSize: 13, color: C.muted }}>Coding practice platform</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 32, marginBottom: 14 }}>
          <div>
            <p style={{ fontSize: 22, fontWeight: 700, color: "#2f8d46" }}>{gfgScore}</p>
            <p style={{ fontSize: 12, color: C.muted }}>Coding score</p>
          </div>
          <div>
            <p style={{ fontSize: 22, fontWeight: 700 }}>{gfgSolved}</p>
            <p style={{ fontSize: 12, color: C.muted }}>Problems solved</p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 13, color: C.muted }}>Progress toward 500</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#2f8d46" }}>{Math.round((gfgSolved/500)*100)}%</span>
        </div>
        <div style={{ height: 6, background: C.divider, borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(gfgSolved/500)*100}%`, background: "#2f8d46", borderRadius: 3 }} />
        </div>
      </div>

      <div className="sec">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: "#ffa11612", border: "1px solid #ffa11625", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BarChart3 size={18} color="#ffa116" />
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 15 }}>LeetCode</p>
            <p style={{ fontSize: 13, color: C.muted }}>{lcTotal} problems solved</p>
          </div>
        </div>
        {[
          { label: "Easy",   count: lcEasy, color: "#057642" },
          { label: "Medium", count: lcMed,  color: "#ffa116" },
          { label: "Hard",   count: lcHard, color: "#e5363d" },
        ].map(b => (
          <div key={b.label} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontSize: 13, color: C.muted }}>{b.label}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: b.color }}>{b.count}</span>
            </div>
            <div style={{ height: 5, background: C.divider, borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(b.count/lcTotal)*100}%`, background: b.color, borderRadius: 3 }} />
            </div>
          </div>
        ))}
      </div>

      <div className="sec">
        <div style={{
          padding: "14px 16px", background: "rgba(10,102,194,0.05)",
          border: "1px solid rgba(10,102,194,0.12)", borderRadius: 8,
          display: "flex", gap: 10, alignItems: "flex-start",
        }}>
          <Brain size={16} color={C.blue} style={{ marginTop: 2, flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Current focus</p>
            <p style={{ fontSize: 14, color: C.muted }}>Trees · Graphs · Dynamic Programming · System Design</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── RESUME ───────────────────────────────────────────────────────────────────
function Resume() {
  return (
    <div className="card" id="resume">
      <div className="sec" style={{ paddingBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700 }}>Resume</h2>
      </div>

 {/* Download */}
      <div className="sec">
        <div style={{ padding: "14px 16px", background: "rgba(10,102,194,0.05)", border: "1px solid rgba(10,102,194,0.12)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600 }}>Want the full picture?</p>
            <p style={{ fontSize: 13, color: C.muted }}>Download my resume as a PDF</p>
          </div>
          <a href="/resume.pdf" download className="btn btn-p" style={{ fontSize: 14 }}>↓ Download Resume</a>
        </div>
      </div>


      <div className="sec">
        <p style={{ fontSize: 13, fontWeight: 700, color: C.muted, letterSpacing: 1, marginBottom: 14, textTransform: "uppercase" }}>Highlights</p>
        {[
          { color: "#057642", label: "GFG Coding Score 759",        sub: "Top performer on GeeksForGeeks" },
          { color: "#ffa116", label: "307+ Problems Solved",         sub: "Across GFG and LeetCode combined" },
          { color: "#5f4b8b", label: "3 Hackathon Projects",         sub: "Built and shipped in 24–48hr sprints" },
          { color: C.blue,    label: "Full-Stack Portfolio",         sub: "React · Spring Boot · Node.js · MongoDB" },
        ].map(a => (
          <div key={a.label} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.color, marginTop: 5, flexShrink: 0 }}/>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600 }}>{a.label}</p>
              <p style={{ fontSize: 13, color: C.muted }}>{a.sub}</p>
            </div>
          </div>
        ))}
      </div>
      

      <div className="sec">
  <p style={{ fontSize: 13, fontWeight: 700, color: C.muted, letterSpacing: 1, marginBottom: 14, textTransform: "uppercase" }}>Education</p>
  
  {/* Diploma */}
  <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 20 }}>
    <div style={{ width: 44, height: 44, borderRadius: 8, background: "rgba(10,102,194,0.08)", border: "1px solid rgba(10,102,194,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <GraduationCap size={20} color={C.blue} />
    </div>
    <div>
      <h3 style={{ fontSize: 15, fontWeight: 700 }}>Diploma in Computer Science</h3>
      <p style={{ fontSize: 14, color: C.muted }}>2023 – 2026</p>
      <p style={{ fontSize: 13, color: C.faint, marginTop: 4 }}>Data Structures · DBMS · OS · Computer Networks · Software Engineering</p>
    </div>
  </div>

  {/* Divider */}
  <div style={{ borderLeft: `2px solid ${C.border}`, marginLeft: 21, height: 16, marginBottom: 20 }}/>

  {/* B.Tech */}
  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
    <div style={{ width: 44, height: 44, borderRadius: 8, background: "rgba(10,102,194,0.08)", border: "1px solid rgba(10,102,194,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <GraduationCap size={20} color={C.blue} />
    </div>
    <div>
      <h3 style={{ fontSize: 15, fontWeight: 700 }}>B.Tech in Computer Science</h3>
      <p style={{ fontSize: 14, color: C.muted }}>2026 – 2029 · Upcoming</p>
      <p style={{ fontSize: 13, color: C.faint, marginTop: 4 }}>Lateral entry after Diploma</p>
    </div>
  </div>
</div>
    </div>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar() {
  return (
    <div>
      <div className="card">
        <div className="sec" style={{ paddingBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>Connect</h3>
        </div>
        {[
          { icon: Mail,     label: "Email",    sub: "pawaryuvraj334@gmail.com",     href: "mailto:pawaryuvraj334@gmail.com" },
          { icon: Github,   label: "GitHub",   sub: "github.com/yuvi969",           href: "https://github.com/yuvi969" },
          { icon: Linkedin, label: "LinkedIn", sub: "linkedin.com/in/yuvraj-pawar", href: "https://www.linkedin.com/in/yuvraj-pawar-7256aa2b2/" },
        ].map((item, i, arr) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("mailto") ? "_self" : "_blank"}
            rel="noreferrer"
            className="sec"
            style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.02)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(10,102,194,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <item.icon size={15} color={C.blue} />
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{item.label}</p>
              <p style={{ fontSize: 12, color: C.muted }}>{item.sub}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="card">
        <div className="sec" style={{ paddingBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>Open To</h3>
        </div>
        <div className="sec">
          {[
            { icon: Briefcase,     label: "Full-time Roles", color: C.blue    },
            { icon: GraduationCap, label: "Internships",     color: "#057642" },
            { icon: Github,        label: "Project Collabs", color: "#5f4b8b" },
          ].map(item => (
            <div key={item.label} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "8px 10px", borderRadius: 6,
              background: `${item.color}08`, marginBottom: 6,
            }}>
              <item.icon size={14} color={item.color} />
              <span style={{ fontSize: 14, fontWeight: 500 }}>{item.label}</span>
            </div>
          ))}
          <p style={{ fontSize: 12, color: C.muted, marginTop: 8 }}>💬 Responds within 24 hours</p>
        </div>
      </div>

      <div className="card">
        <div className="sec" style={{ paddingBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>At a Glance</h3>
        </div>
        <div className="sec">
          {[
            { label: "GFG Score",    value: "759", color: "#057642" },
            { label: "GFG Problems", value: "267", color: "#057642" },
            { label: "LeetCode",     value: "40",  color: "#ffa116" },
            { label: "Projects",     value: "3+",  color: C.blue    },
          ].map(s => (
            <div key={s.label} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "8px 0", borderBottom: `1px solid ${C.divider}`,
            }}>
              <span style={{ fontSize: 14, color: C.muted }}>{s.label}</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: s.color }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer id="contact" style={{
      background: C.card, borderTop: `1px solid ${C.border}`,
      padding: "40px 16px",
    }}>
      <div style={{
        maxWidth: 1128, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 20,
      }}>
        {/* Left: heading + subtext */}
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Let's build something.</h2>
          <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>
            Open to full-time roles, internships, and interesting projects.<br />
            I respond within 24 hours.
          </p>
          <p style={{ fontSize: 12, color: C.faint, marginTop: 12 }}>© 2025 Yuvraj Pawar · Built with React</p>
        </div>

        {/* Right: buttons */}
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
      <div style={{ paddingTop: 52 }}>
        <div
          className="layout"
          style={{
            maxWidth: 1128, margin: "20px auto", padding: "0 16px",
            display: "grid",
            gridTemplateColumns: "minmax(0, 3fr) minmax(0, 1fr)",
            gap: 20, alignItems: "start",
          }}
        >
          <main>
            <Profile />
            <About />
             <Resume /> 
            <Projects />
            <Hackathons />
            <TechStack />
            <DSA />
          </main>
          <aside>
            <div className="sidebar-sticky" style={{ position: "sticky", top: 60 }}>
              <Sidebar />
            </div>
          </aside>
        </div>
        <Footer />
      </div>
    </>
  );
}
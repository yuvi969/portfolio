import Pfp from "./real.png";
import resume from "./Resume.pdf";
import {
  Github, Linkedin, Mail, Layers, Globe, Brain, Target, BarChart3,
  MapPin, Briefcase, GraduationCap, Code2, Award, Download, ArrowUpRight,
  ScanLine, FlaskConical, Leaf, Train, Stethoscope, Sparkles,
} from "lucide-react";

// ─── TOKENS ──────────────────────────────────────────────────────────────────
const C = {
  accent: "#c4f06a",
  accentHover: "#d5ff83",
  bg: "#101110",
  card: "#171917",
  cardSoft: "#1d211e",
  text: "#e9e9e6",
  heading: "#f1f2ed",
  muted: "#a0a69f",
  faint: "#737b73",
  border: "rgba(235,240,231,0.12)",
  divider: "rgba(235,240,231,0.08)",
  font: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  display: "'Manrope', 'DM Sans', sans-serif",
  mono: "'DM Mono', monospace",
};

// small mono label used for categories / section meta
const mono = {
  fontFamily: C.mono, fontSize: 10, letterSpacing: "0.1em",
  textTransform: "uppercase", color: C.faint,
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; scroll-padding-top: 72px; }
    body {
      background: ${C.bg};
      color: ${C.text};
      font-family: ${C.font};
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      text-align: left;
      min-width: 320px;
    }
    a { text-decoration: none; color: inherit; }
    h1, h2, h3, h4 { text-align: left; color: ${C.heading}; font-family: ${C.display}; letter-spacing: -0.03em; }
    p { text-align: left; }
    ::selection { background: ${C.accent}; color: #111; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: ${C.bg}; }
    ::-webkit-scrollbar-thumb { background: #2b302a; border-radius: 3px; }

    .card {
      background: ${C.card};
      border: 1px solid ${C.border};
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 14px;
    }
    .sec { padding: 22px 26px; border-bottom: 1px solid ${C.divider}; }
    .sec:last-child { border-bottom: none; }

    .btn {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      border-radius: 3px; padding: 9px 16px;
      font-size: 13px; font-weight: 700; cursor: pointer;
      transition: transform 0.2s, background 0.2s, border-color 0.2s, color 0.2s;
      font-family: ${C.font};
    }
    .btn:hover { transform: translateY(-2px); }
    .btn-p { background: ${C.accent}; color: #12150e; border: 1px solid ${C.accent}; }
    .btn-p:hover { background: ${C.accentHover}; }
    .btn-s { background: transparent; color: ${C.text}; border: 1px solid ${C.border}; }
    .btn-s:hover { border-color: ${C.accent}; color: ${C.accent}; }
    .btn:focus-visible, a:focus-visible { outline: 2px solid ${C.accent}; outline-offset: 2px; }

    .badge {
      display: inline-block; padding: 5px 9px;
      font-family: ${C.mono}; font-size: 10px;
      border: 1px solid ${C.border}; border-radius: 2px;
      margin: 3px 6px 3px 0; color: #b5bcb1;
    }

    .nav-item {
      display: flex; align-items: center; gap: 6px;
      color: ${C.muted}; font-size: 13px; padding: 4px 12px;
      cursor: pointer; transition: color 0.2s;
    }
    .nav-item:hover { color: ${C.accent}; }

    .project-row { transition: background 0.2s; }
    .project-row:hover { background: ${C.cardSoft}; }

    @media (max-width: 860px) {
      .layout { grid-template-columns: 1fr !important; }
      .hide-mob { display: none !important; }
      .sidebar-sticky { position: static !important; }
      .sec { padding: 20px 18px; }
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { scroll-behavior: auto !important; transition-duration: 0.01ms !important; }
    }
  `}</style>
);

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(16,17,16,0.88)", backdropFilter: "blur(18px)",
      borderBottom: `1px solid ${C.border}`,
      height: 56, display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        maxWidth: 1128, width: "100%", padding: "0 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%", background: C.accent,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <span style={{ color: "#111", fontWeight: 800, fontSize: 17, fontFamily: C.display }}>Y</span>
          </div>
          <span className="hide-mob" style={{ fontFamily: C.mono, fontWeight: 500, fontSize: 12, letterSpacing: "0.09em" }}>
            YUVRAJ PAWAR<span style={{ color: C.accent }}>.</span>
          </span>
        </a>

        <div className="hide-mob" style={{ display: "flex", alignItems: "center" }}>
          {[
            { label: "Home",        href: "#top",          icon: <Globe size={15} /> },
            { label: "Resume",      href: "#resume",       icon: <GraduationCap size={15} /> },
            { label: "Projects",    href: "#projects",     icon: <Code2 size={15} /> },
            { label: "Recognition", href: "#recognition",  icon: <Award size={15} /> },
            { label: "Skills",      href: "#stack",        icon: <Layers size={15} /> },
            { label: "DSA",         href: "#dsa",          icon: <Brain size={15} /> },
            { label: "Contact",     href: "#contact",      icon: <Mail size={15} /> },
          ].map(item => (
            <a key={item.label} href={item.href} className="nav-item">
              {item.icon}
              {item.label}
            </a>
          ))}
        </div>

        <a href="mailto:pawaryuvraj334@gmail.com" className="btn btn-p" style={{ fontSize: 12, padding: "8px 14px" }}>
          <Mail size={14} /> Hire Me
        </a>
      </div>
    </nav>
  );
}

// ─── PROFILE ─────────────────────────────────────────────────────────────────
function Profile() {
  return (
    <div className="card" id="top" style={{ overflow: "visible" }}>
      {/* Banner: grid + soft accent glow */}
      <div style={{
        height: 150, borderRadius: "4px 4px 0 0", position: "relative", overflow: "hidden",
        background: `
          radial-gradient(ellipse at 80% 0%, rgba(196,240,106,0.14), transparent 60%),
          linear-gradient(rgba(220,230,210,0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(220,230,210,0.07) 1px, transparent 1px),
          #141714
        `,
        backgroundSize: "auto, 36px 36px, 36px 36px, auto",
      }}>
        <span style={{ ...mono, position: "absolute", top: 16, right: 20 }}>01 / Portfolio</span>
        <span style={{ ...mono, position: "absolute", bottom: 14, right: 20 }}>2026</span>
      </div>

      <div style={{ padding: "0 26px 26px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
          {/* Portrait frame */}
          <div style={{
            width: 124, height: 148, marginTop: -64, padding: 6, position: "relative", zIndex: 1,
            border: "1px solid rgba(196,240,106,0.45)", background: "#252a24",
            transform: "rotate(3deg)", boxShadow: "12px 12px 0 rgba(196,240,106,0.07)", flexShrink: 0,
          }}>
            <img
              src={Pfp} alt="Yuvraj Pawar"
              style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", filter: "saturate(0.8)" }}
            />
          </div>

          <div style={{ display: "flex", gap: 8, paddingTop: 16, flexWrap: "wrap" }}>
            <a href={resume} download className="btn btn-s"><Download size={14} /> Download CV</a>
            <a href="https://github.com/yuvi969" target="_blank" rel="noreferrer" className="btn btn-s">
              <Github size={14} /> GitHub
            </a>
            <a href="mailto:pawaryuvraj334@gmail.com" className="btn btn-p">
              <Mail size={14} /> Contact
            </a>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, ...mono, color: C.accent, marginBottom: 12 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.accent, boxShadow: "0 0 12px rgba(196,240,106,0.55)" }} />
            Computer Science · Software Development
          </div>
          <h1 style={{ fontSize: "clamp(30px, 4.4vw, 46px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.05em" }}>
            Building useful things <span style={{ color: C.accent }}>with thoughtful code.</span>
          </h1>
          <p style={{ fontSize: 15, color: C.muted, marginTop: 14, maxWidth: 560, lineHeight: 1.8 }}>
            I'm Yuvraj, a Computer Science student interested in building software systems,
            exploring emerging technology and turning ideas into working products.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, fontSize: 13, color: C.faint, flexWrap: "wrap" }}>
            <MapPin size={13} /> Pune, India
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: C.faint }} />
            <span style={{ color: C.accent, fontWeight: 600 }}>Open to internships & collaborations</span>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 32, marginTop: 20, paddingTop: 18, borderTop: `1px solid ${C.border}`, flexWrap: "wrap" }}>
          {[
            { label: "Projects",        value: "5+"   },
            { label: "Problems Solved", value: "307+" },
            { label: "GFG Score",       value: "759"  },
          ].map(s => (
            <div key={s.label}>
              <p style={{ fontSize: 20, fontWeight: 700, color: C.accent, fontFamily: C.display }}>{s.value}</p>
              <p style={{ ...mono, marginTop: 2 }}>{s.label}</p>
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
    <div className="card" id="about">
      <div className="sec">
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 14 }}>Curious by default.</h2>
        <p style={{ fontFamily: C.display, fontSize: 18, fontWeight: 600, color: "#e8ebe3", lineHeight: 1.5, letterSpacing: "-0.02em", marginBottom: 14, maxWidth: 680 }}>
          I enjoy understanding how things work — and using that understanding to build things that are useful.
        </p>
        <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.9, maxWidth: 690 }}>
          I'm pursuing a B.Tech in Computer Science after completing a diploma in the same field.
          My interests span full-stack development, problem-solving and applied AI. I like working
          across the stack, learning unfamiliar tools and collaborating with people to turn early
          ideas into working software.
        </p>
        <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.9, maxWidth: 690, marginTop: 12 }}>
          I'm currently looking for an internship where I can learn from experienced people while
          building real things.
        </p>
      </div>
    </div>
  );
}

// ─── RESUME ───────────────────────────────────────────────────────────────────
function Resume() {
  const EDU = [
    {
      title: "B.Tech in Computer Science",
      years: "2026 – 2029",
      note: "Lateral entry after Diploma",
    },
    {
      title: "Diploma in Computer Science",
      years: "2023 – 2026",
      note: "Applied Machine Learning · Cloud Computing · Software Engineering · Mobile App Development · Backend (Node.js/Express) · Capstone Project",
      cgpa: "CGPA: 8.24 / 10",
    },
  ];
  return (
    <div className="card" id="resume">
      <div className="sec" style={{ paddingBottom: 16 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>Resume</h2>
      </div>

      <div className="sec">
        <div style={{
          padding: "14px 16px", background: "rgba(196,240,106,0.04)",
          border: "1px dashed rgba(196,240,106,0.35)", borderRadius: 3,
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
        }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600 }}>Want the full picture?</p>
            <p style={{ fontSize: 13, color: C.muted }}>Download my resume as a PDF</p>
          </div>
          <a href={resume} download className="btn btn-p"><Download size={14} /> Download Resume</a>
        </div>
      </div>

      <div className="sec">
        <p style={{ ...mono, marginBottom: 16 }}>Highlights</p>
        {[
          { color: C.accent,  label: "ICUBEA '26 — Research Paper Accepted", sub: "Railway Fault Detection research" },
          { color: "#8fb7ff", label: "Top 25 · PCCOE Hackathon",             sub: "Among 300 participating teams" },
          { color: "#ffa116", label: "307+ Problems Solved",                  sub: "Across GeeksForGeeks and LeetCode" },
          { color: "#c9a7ff", label: "Full-Stack Projects",                   sub: "React · Node.js · Express · PostgreSQL · MongoDB" },
        ].map(a => (
          <div key={a.label} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.color, marginTop: 6, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 14, fontWeight: 600 }}>{a.label}</p>
              <p style={{ fontSize: 13, color: C.muted }}>{a.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="sec">
        <p style={{ ...mono, marginBottom: 16 }}>Education</p>
        {EDU.map((e, i) => (
          <div key={e.title}>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{
                width: 42, height: 42, border: `1px solid ${C.border}`, borderRadius: 3,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <GraduationCap size={19} color={C.accent} />
              </div>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700 }}>{e.title}</h3>
                <p style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>{e.years}</p>
                <p style={{ fontSize: 13, color: C.faint, marginTop: 4, lineHeight: 1.6 }}>{e.note}</p>
                {e.cgpa && <p style={{ fontSize: 13, fontWeight: 600, color: C.accent, marginTop: 4 }}>{e.cgpa}</p>}
              </div>
            </div>
            {i < EDU.length - 1 && (
              <div style={{ borderLeft: `1px solid ${C.border}`, marginLeft: 21, height: 18, margin: "10px 0 10px 21px" }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    icon: Stethoscope,
    title: "Clinic Appointment & Queue Management",
    category: "Full-stack development",
    desc: "A clinic workflow platform for appointment booking and queue management, built with transactional booking logic, patient authentication and real-time queue updates.",
    tech: ["React", "Node.js", "Express", "PostgreSQL", "JWT", "Socket.IO"],
  },
  {
    icon: Train,
    title: "Railway Fault Detection",
    category: "Research · Computer vision",
    desc: "Research on automated railway surface-fault detection, exploring image classification and object detection alongside model interpretability and data augmentation.",
    tech: ["Python", "ResNet18", "YOLOv8", "Grad-CAM", "GAN"],
  },
  {
    icon: Leaf,
    title: "EcoSimple",
    category: "Environmental technology",
    desc: "An environmental technology project focused on making environmental information easier to understand and act on.",
    tech: ["Web Development", "Environmental Data"],
  },
  {
    icon: ScanLine,
    title: "Answer Sheet Rechecking Tool",
    category: "AI · Full-stack development",
    github: "https://github.com/AniketBankar2004/Answer_Sheet_Evaluation",
    desc: "An assisted answer-sheet evaluation pipeline that extracts handwritten responses and uses language-model reasoning to generate structured evaluation feedback.",
    tech: ["Python", "OpenCV", "Groq API", "Node.js", "React"],
  },
  {
    icon: FlaskConical,
    title: "Generic Medicine Recommender",
    category: "Full-stack development",
    github: "https://github.com/yuvi969/PCCOEHACKATHON",
    desc: "A platform for exploring lower-cost generic alternatives to branded medicines through medicine-composition and pricing comparisons.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
  },
];

function Projects() {
  return (
    <div className="card" id="projects">
      <div className="sec" style={{ paddingBottom: 16 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>Projects & research.</h2>
        <p style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>A selection of things I've built, explored and contributed to.</p>
      </div>

      {PROJECTS.map((p, i) => (
        <div key={p.title} className="sec project-row" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{
            width: 42, height: 42, border: `1px solid ${C.border}`, borderRadius: 3,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <p.icon size={19} color={C.accent} strokeWidth={1.7} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <div>
                <p style={{ ...mono, color: C.accent, marginBottom: 4 }}>
                  {String(i + 1).padStart(2, "0")} <span style={{ color: C.faint, marginLeft: 8 }}>{p.category}</span>
                </p>
                <h3 style={{ fontSize: 16, fontWeight: 650 }}>{p.title}</h3>
              </div>
              {p.github && (
                <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-s" style={{ fontSize: 12, padding: "6px 12px", flexShrink: 0 }}>
                  <Github size={13} /> Code <ArrowUpRight size={13} />
                </a>
              )}
            </div>
            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.8, marginTop: 8, maxWidth: 560 }}>{p.desc}</p>
            <div style={{ marginTop: 10 }}>
              {p.tech.map(t => <span key={t} className="badge">{t}</span>)}
            </div>
          </div>
        </div>
      ))}

      {/* Work in progress */}
      <div className="sec">
        <div style={{
          display: "flex", gap: 16, alignItems: "flex-start", padding: 18,
          border: "1px dashed rgba(196,240,106,0.35)", background: "rgba(196,240,106,0.035)", borderRadius: 3,
        }}>
          <div style={{
            width: 42, height: 42, border: "1px solid rgba(196,240,106,0.3)", borderRadius: 3,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <Sparkles size={19} color={C.accent} />
          </div>
          <div>
            <p style={{ ...mono, color: C.accent, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent }} />
              Currently building · Work in progress
            </p>
            <h3 style={{ fontSize: 18, fontWeight: 650, margin: "8px 0 4px" }}>MudraVerse</h3>
            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.75 }}>
              Exploring more accessible sign-language learning through interactive experiences,
              3D environments and computer vision.
            </p>
            <div style={{ marginTop: 10 }}>
              {["Unity", "Blender", "Computer Vision", "Indian Sign Language"].map(t => <span key={t} className="badge">{t}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── RECOGNITION ──────────────────────────────────────────────────────────────
const RECOGNITION = [
  { label: "Hackathon", value: "TOP 100",    title: "Smart India Hackathon",  desc: "Top 100 in the college internal selection round." },
  { label: "Hackathon", value: "TOP 25",     title: "PCCOE Hackathon",        desc: "Placed among 300 participating teams." },
  { label: "Research",  value: "ICUBEA ’26", title: "Research Paper Accepted", desc: "Railway Fault Detection research accepted at the ICUBEA 2026 conference." },
];

function Recognition() {
  return (
    <div className="card" id="recognition">
      <div className="sec" style={{ paddingBottom: 16 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>Milestones along the way.</h2>
        <p style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>Moments and outcomes from collaborative projects and research.</p>
      </div>
      {RECOGNITION.map(r => (
        <div key={r.title} className="sec" style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ minWidth: 130 }}>
            <p style={{ ...mono, display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <Award size={13} color={C.accent} /> {r.label}
            </p>
            <p style={{ fontFamily: C.display, fontSize: 26, fontWeight: 800, color: C.accent, letterSpacing: "-0.05em", lineHeight: 1 }}>
              {r.value}
            </p>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <h3 style={{ fontSize: 16, fontWeight: 650 }}>{r.title}</h3>
            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginTop: 4 }}>{r.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── TECH STACK ───────────────────────────────────────────────────────────────
function TechStack() {
  const STACK = [
    { label: "Languages",         items: ["C++", "JavaScript", "Python", "Java", "SQL"] },
    { label: "Frontend",          items: ["React", "HTML", "CSS", "Tailwind CSS"] },
    { label: "Backend",           items: ["Node.js", "Express.js", "REST APIs", "JWT", "Socket.IO"] },
    { label: "Databases & Tools", items: ["PostgreSQL", "MongoDB", "Git", "GitHub", "Postman"] },
    { label: "Areas of interest", items: ["Full-Stack Development", "Computer Vision", "AI Integration", "Data Structures & Algorithms"] },
  ];
  return (
    <div className="card" id="stack">
      <div className="sec" style={{ paddingBottom: 16 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>Technologies I work with.</h2>
        <p style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>Used across coursework, projects and experimentation.</p>
      </div>
      <div className="sec">
        {STACK.map((g, i) => (
          <div key={g.label} style={{ marginBottom: i < STACK.length - 1 ? 18 : 0 }}>
            <p style={{ ...mono, color: C.accent, marginBottom: 8 }}>{g.label}</p>
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
  const gfgBasic = 34, gfgEasy = 107, gfgMedium = 115, gfgHard = 11;
  const lcEasy = 21, lcMed = 16, lcHard = 3, lcTotal = 40;
  const iconBox = (color) => ({
    width: 40, height: 40, borderRadius: 3, border: `1px solid ${color}40`, background: `${color}14`,
    display: "flex", alignItems: "center", justifyContent: "center",
  });
  return (
    <div className="card" id="dsa">
      <div className="sec" style={{ paddingBottom: 16 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>Problem solving.</h2>
      </div>

      <div className="sec">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={iconBox("#2f8d46")}><Target size={18} color="#4cc16a" /></div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 15 }}>GeeksForGeeks</p>
            <p style={{ fontSize: 13, color: C.muted }}>Coding practice platform</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 32, marginBottom: 16 }}>
          <div>
            <p style={{ fontSize: 24, fontWeight: 700, color: C.accent, fontFamily: C.display }}>{gfgScore}</p>
            <p style={mono}>Coding score</p>
          </div>
          <div>
            <p style={{ fontSize: 24, fontWeight: 700, fontFamily: C.display }}>{gfgSolved}</p>
            <p style={mono}>Problems solved</p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 13, color: C.muted }}>Progress</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.accent }}>{Math.round((gfgSolved / 500) * 100)}%</span>
        </div>
        <div style={{ height: 6, background: C.divider, borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(gfgSolved / 500) * 100}%`, background: C.accent, borderRadius: 3 }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginTop: 18 }}>
          {[
            { label: "Easy",   count: gfgEasy,   color: "#4cc16a" },
            { label: "Medium", count: gfgMedium, color: "#ffa116" },
            { label: "Hard",   count: gfgHard,   color: "#ff6b6f" },
            { label: "Basic",  count: gfgBasic,  color: "#7aa8ff" },
          ].map(item => (
            <div key={item.label} style={{
              padding: "10px 8px", borderRadius: 3, textAlign: "center",
              border: `1px solid ${item.color}30`, background: `${item.color}10`,
            }}>
              <p style={{ fontSize: 18, fontWeight: 700, color: item.color, marginBottom: 2, fontFamily: C.display }}>{item.count}</p>
              <p style={{ fontSize: 11, color: C.muted }}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="sec">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={iconBox("#ffa116")}><BarChart3 size={18} color="#ffa116" /></div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 15 }}>LeetCode</p>
            <p style={{ fontSize: 13, color: C.muted }}>{lcTotal} problems solved</p>
          </div>
        </div>
        {[
          { label: "Easy",   count: lcEasy, color: "#4cc16a" },
          { label: "Medium", count: lcMed,  color: "#ffa116" },
          { label: "Hard",   count: lcHard, color: "#ff6b6f" },
        ].map(b => (
          <div key={b.label} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontSize: 13, color: C.muted }}>{b.label}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: b.color }}>{b.count}</span>
            </div>
            <div style={{ height: 5, background: C.divider, borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(b.count / lcTotal) * 100}%`, background: b.color, borderRadius: 3 }} />
            </div>
          </div>
        ))}
      </div>

      <div className="sec">
        <div style={{
          padding: "14px 16px", background: "rgba(196,240,106,0.04)",
          border: "1px dashed rgba(196,240,106,0.35)", borderRadius: 3,
          display: "flex", gap: 10, alignItems: "flex-start",
        }}>
          <Brain size={16} color={C.accent} style={{ marginTop: 2, flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Current focus</p>
            <p style={{ fontSize: 13, color: C.muted }}>Trees · Graphs · Dynamic Programming · System Design</p>
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
        <div className="sec" style={{ paddingBottom: 14 }}>
          <p style={{ ...mono, color: C.accent }}>Connect</p>
        </div>
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
            className="sec"
            style={{ display: "flex", alignItems: "center", gap: 12 }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 3, border: `1px solid ${C.border}`,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <item.icon size={15} color={C.accent} />
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 14, fontWeight: 600 }}>{item.label}</p>
              <p style={{ fontSize: 12, color: C.muted, overflow: "hidden", textOverflow: "ellipsis" }}>{item.sub}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="card">
        <div className="sec" style={{ paddingBottom: 14 }}>
          <p style={{ ...mono, color: C.accent }}>Open to</p>
        </div>
        <div className="sec">
          {[
            { icon: GraduationCap, label: "Internships",     color: C.accent },
            { icon: Github,        label: "Collaborations",  color: "#8fb7ff" },
            { icon: Briefcase,     label: "Project Collabs", color: "#c9a7ff" },
          ].map(item => (
            <div key={item.label} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "8px 10px", borderRadius: 3,
              background: "rgba(255,255,255,0.03)", marginBottom: 6,
            }}>
              <item.icon size={14} color={item.color} />
              <span style={{ fontSize: 13, fontWeight: 500 }}>{item.label}</span>
            </div>
          ))}
          <p style={{ fontSize: 12, color: C.muted, marginTop: 8 }}>I will try to respond ASAP :)</p>
        </div>
      </div>

      <div className="card">
        <div className="sec" style={{ paddingBottom: 14 }}>
          <p style={{ ...mono, color: C.accent }}>At a glance</p>
        </div>
        <div className="sec">
          {[
            { label: "GFG Score",    value: "759", color: C.accent },
            { label: "GFG Problems", value: "267", color: C.accent },
            { label: "LeetCode",     value: "40",  color: "#ffa116" },
            { label: "Projects",     value: "5+",  color: "#8fb7ff" },
          ].map(s => (
            <div key={s.label} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "8px 0", borderBottom: `1px solid ${C.divider}`,
            }}>
              <span style={{ fontSize: 13, color: C.muted }}>{s.label}</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: s.color, fontFamily: C.display }}>{s.value}</span>
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
    <footer id="contact" style={{ background: "#0c0e0c", borderTop: `1px solid ${C.border}`, padding: "64px 16px 0" }}>
      <div style={{
        maxWidth: 1128, margin: "0 auto",
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        flexWrap: "wrap", gap: 32, paddingBottom: 56,
      }}>
        <div>
          <p style={{ ...mono, color: C.accent, marginBottom: 14 }}>Get in touch</p>
          <h2 style={{ fontSize: "clamp(30px, 4.4vw, 48px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.05em" }}>
            Have something <span style={{ color: C.accent }}>interesting in mind?</span>
          </h2>
          <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.8, marginTop: 14, maxWidth: 420 }}>
            I'm always happy to connect, exchange ideas and explore opportunities to build.
          </p>
          <a href="mailto:pawaryuvraj334@gmail.com" className="btn btn-p" style={{ marginTop: 22 }}>
            Say hello <ArrowUpRight size={15} />
          </a>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a href="https://www.linkedin.com/in/yuvraj-pawar-7256aa2b2/" target="_blank" rel="noreferrer" className="btn btn-s"><Linkedin size={14} /> LinkedIn</a>
          <a href="https://github.com/yuvi969" target="_blank" rel="noreferrer" className="btn btn-s"><Github size={14} /> GitHub</a>
          <a href={resume} target="_blank" rel="noreferrer" className="btn btn-s"><Download size={14} /> Resume</a>
        </div>
      </div>

      <div style={{
        maxWidth: 1128, margin: "0 auto", minHeight: 64, borderTop: `1px solid ${C.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
        ...mono, fontSize: 9,
      }}>
        <span>© 2026 Yuvraj Pawar</span>
        <span>Designed & built with curiosity.</span>
        <a href="#top" style={{ color: C.accent }}>Back to top ↑</a>
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
      <div style={{ paddingTop: 56 }}>
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
            <About />
            <Resume />
            <Projects />
            <Recognition />
            <TechStack />
            <DSA />
          </main>
          <aside>
            <div className="sidebar-sticky" style={{ position: "sticky", top: 72 }}>
              <Sidebar />
            </div>
          </aside>
        </div>
        <Footer />
      </div>
    </>
  );
}
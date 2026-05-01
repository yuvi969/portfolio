import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Code2 as Github, Link as Linkedin, Mail, Terminal, Code2, Layers, Database,
  Cpu, Brain, ChevronRight, ExternalLink, ArrowUpRight,
  Zap, Box, Server, Globe, Trophy, FlaskConical, ScanLine,
  FileSearch, Leaf, Building2, Train, Copy, Check,
  BarChart3, Target, Hash
} from "lucide-react";
import pfp from "./real.jpeg";
// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const C = {
  bg: "#0d0608",
  card: "#130a0d",
  border: "#2a1520",
  borderHover: "#3d2030",
  text: "#f0e0e5",
  muted: "#7a5060",
  subtle: "#4a2535",
  accent: "#ff6b9d",
  accentSoft: "#ff9ec4",
  accentCoral: "#ff8c7a",
  accentDim: "rgba(255,107,157,0.08)",
  accentGreen: "#ff6b9d",
};

// ─── UTILITY ─────────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

function useInViewAnim(threshold = 0.15) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return [ref, inView];
}

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background: ${C.bg};
      color: ${C.text};
      font-family: 'JetBrains Mono', monospace;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    ::-webkit-scrollbar { width: 2px; }
    ::-webkit-scrollbar-track { background: ${C.bg}; }
    ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 2px; }

    .syne { font-family: 'Syne', sans-serif; }
    .mono { font-family: 'JetBrains Mono', monospace; }

    .accent { color: ${C.accent}; }

    .btn-primary {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 12px 28px;
      background: ${C.accent}; color: #000;
      font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px;
      border: none; border-radius: 4px; cursor: pointer;
      transition: all 0.2s ease; text-decoration: none;
      letter-spacing: 0.02em;
    }
    .btn-primary:hover { background: #fff; transform: translateY(-1px); }

    .btn-outline {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 11px 28px;
      background: transparent; color: ${C.text};
      font-family: 'Syne', sans-serif; font-weight: 600; font-size: 14px;
      border: 1px solid ${C.border}; border-radius: 4px; cursor: pointer;
      transition: all 0.2s ease; text-decoration: none;
      letter-spacing: 0.02em;
    }
    .btn-outline:hover { border-color: ${C.accent}; color: ${C.accent}; transform: translateY(-1px); }

    .section-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px; font-weight: 500;
      color: ${C.accent}; letter-spacing: 0.2em;
      text-transform: uppercase; margin-bottom: 12px;
    }

    .card {
      background: ${C.card};
      border: 1px solid ${C.border};
      border-radius: 8px;
      transition: border-color 0.2s ease;
    }
    .card:hover { border-color: ${C.borderHover}; }

    /* Grid background */
    .grid-bg {
      background-image:
        linear-gradient(rgba(255,107,157,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,107,157,0.03) 1px, transparent 1px);
      background-size: 48px 48px;
    }

    /* Syntax highlight tokens */
    .tok-keyword { color: #e688b5; }
    .tok-string  { color: #a3e48d; }
    .tok-fn      { color: #82aaff; }
    .tok-comment { color: #6a4050; }
    .tok-var     { color: #ffb3c6; }
    .tok-num     { color: #ffcba4; }
    .tok-prop    { color: ${C.accent}; }
    .tok-punct   { color: #f4a0c0; }

    .nav-link {
      color: ${C.muted}; font-size: 13px; font-weight: 400;
      text-decoration: none; transition: color 0.15s;
      letter-spacing: 0.05em;
    }
    .nav-link:hover { color: ${C.text}; }

    @media (max-width: 768px) {
      .hide-mobile { display: none; }
    }
  `}</style>
);

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 40px", height: 60,
        background: scrolled ? "rgba(13,6,8,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <span className="syne" style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.01em" }}>
        <span style={{ color: C.accent }}>{"<"}</span>
        Yuvraj
        <span style={{ color: C.accent }}>{"/>"}</span>
      </span>
      <div className="hide-mobile" style={{ display: "flex", gap: 32 }}>
        {["about","projects","hackathons","stack","dsa","contact"].map(s => (
          <a key={s} href={`#${s}`} className="nav-link mono">{s}</a>
        ))}
      </div>
      <a href="mailto:pawaryuvraj334@gmail.com" className="btn-outline" style={{ padding: "7px 18px", fontSize: 12 }}>
        <Mail size={13} /> hire me
      </a>
    </motion.nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="grid-bg"
      style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "120px 24px 80px", position: "relative", overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Radial glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: 600, height: 600,
        background: "radial-gradient(circle, rgba(255,107,157,0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "20%", right: "10%",
        width: 300, height: 300,
        background: "radial-gradient(circle, rgba(255,140,122,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* 📸 PHOTO AVATAR — replace src with your image path e.g. "./yuvraj.jpg" */}
      
      <motion.img
        src={pfp}
        alt="Yuvraj Pawar"
        {...fadeUp(0.05)}
        style={{
          width: 120, height: 120, borderRadius: "50%",
          objectFit: "cover", oobjectPosition: "center 15%",
          border: `3px solid ${C.accent}`,
          boxShadow: `0 0 32px rgba(255,107,157,0.35), 0 0 0 6px rgba(255,107,157,0.08)`,
          marginBottom: 28,
        }}
      />

      {/* Badge */}
      <motion.div {...fadeUp(0.1)} style={{ marginBottom: 24 }}>
        <span className="mono" style={{
          fontSize: 11, letterSpacing: "0.2em", color: C.accent,
          border: `1px solid rgba(255,107,157,0.25)`,
          padding: "5px 14px", borderRadius: 100,
          background: "rgba(255,107,157,0.05)",
        }}>
          available for opportunities
        </span>
      </motion.div>

      {/* Name */}
      <motion.h1
        {...fadeUp(0.2)}
        className="syne"
        style={{
          fontSize: "clamp(52px, 10vw, 120px)",
          fontWeight: 800, lineHeight: 0.95,
          letterSpacing: "-0.03em", marginBottom: 20,
          background: "linear-gradient(135deg, #ffffff 40%, #ff6b9d 80%, #ff9ec4 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}
      >
        Yuvraj<br />Pawar
      </motion.h1>

      {/* Subtitle */}
      <motion.div {...fadeUp(0.35)} style={{ marginBottom: 12 }}>
        <p className="syne" style={{
          fontSize: "clamp(16px, 3vw, 22px)",
          fontWeight: 600, color: C.muted, letterSpacing: "0.01em",
        }}>
          Full Stack Developer{" "}
          <span style={{ color: C.border }}>·</span>{" "}
          <span style={{ color: C.accent }}>AI Systems Builder</span>
        </p>
      </motion.div>

      <motion.p {...fadeUp(0.45)} className="mono" style={{
        fontSize: 13, color: C.subtle, maxWidth: 480, lineHeight: 1.8,
        marginBottom: 48,
      }}>
        // MERN · AI Integration · DSA<br />
        // Building systems that solve real problems
      </motion.p>

      {/* CTAs */}
      <motion.div {...fadeUp(0.55)} style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        <a href="#projects" className="btn-primary">
          View Projects <ChevronRight size={15} />
        </a>
        <a href="https://github.com/yuvi969" target="_blank" rel="noreferrer" className="btn-outline">
          <Github size={15} /> GitHub
        </a>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        style={{ position: "absolute", bottom: 40, color: C.subtle }}
      >
        <div style={{ width: 1, height: 40, background: `linear-gradient(${C.subtle}, transparent)`, margin: "0 auto" }} />
      </motion.div>
    </section>
  );
}

// ─── ABOUT / TERMINAL ─────────────────────────────────────────────────────────
function About() {
  const [ref, inView] = useInViewAnim();
  const lines = [
    { type: "comment", text: "// whoami.js — last updated 2025" },
    { type: "blank" },
    { type: "code", parts: [
      { t: "keyword", v: "const " }, { t: "var", v: "developer" },
      { t: "punct", v: " = " }, { t: "punct", v: "{" }
    ]},
    { type: "code", indent: 2, parts: [
      { t: "prop", v: "  name" }, { t: "punct", v: ": " },
      { t: "string", v: '"Yuvraj Pawar"' }, { t: "punct", v: "," }
    ]},
    { type: "code", indent: 2, parts: [
      { t: "prop", v: "  role" }, { t: "punct", v: ": " },
      { t: "string", v: '"CS Undergraduate → Full-Stack & AI Engineer"' }, { t: "punct", v: "," }
    ]},
    { type: "code", indent: 2, parts: [
      { t: "prop", v: "  focus" }, { t: "punct", v: ": " },
      { t: "punct", v: "[" }
    ]},
    { type: "code", indent: 4, parts: [{ t: "string", v: '    "OCR pipelines"' }, { t: "punct", v: "," }] },
    { type: "code", indent: 4, parts: [{ t: "string", v: '    "LLM integration"' }, { t: "punct", v: "," }] },
    { type: "code", indent: 4, parts: [{ t: "string", v: '    "Scalable MERN backends"' }, { t: "punct", v: "," }] },
    { type: "code", indent: 4, parts: [{ t: "string", v: '    "System design & optimization"' }] },
    { type: "code", indent: 2, parts: [{ t: "punct", v: "  ]," }] },
    { type: "code", indent: 2, parts: [
      { t: "prop", v: "  currently" }, { t: "punct", v: ": " },
      { t: "string", v: '"deep in DSA + building in public"' }
    ]},
    { type: "code", parts: [{ t: "punct", v: "};" }] },
    { type: "blank" },
    { type: "comment", text: "// I build real systems. Shipping > theorizing." },
  ];

  return (
    <section id="about" style={{ padding: "100px 24px", maxWidth: 880, margin: "0 auto" }}>
      <div ref={ref}>
        <motion.p className="section-label" {...(inView ? fadeUp(0) : { initial: { opacity: 0 } })}>
          01 · about
        </motion.p>
        <motion.h2
          className="syne"
          style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 40 }}
          {...(inView ? fadeUp(0.1) : { initial: { opacity: 0 } })}
        >
          The person behind the code.
        </motion.h2>

        <motion.div
          className="card"
          style={{ overflow: "hidden" }}
          {...(inView ? fadeUp(0.2) : { initial: { opacity: 0 } })}
        >
          <div style={{
            padding: "10px 16px", borderBottom: `1px solid ${C.border}`,
            display: "flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.02)",
          }}>
            {["#ff5f57","#febc2e","#28c840"].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
            ))}
            <span className="mono" style={{ fontSize: 11, color: C.muted, marginLeft: 8 }}>
              ~/yuvraj/whoami.js
            </span>
          </div>

          <div style={{ padding: "28px 32px", overflowX: "auto" }}>
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.25 + i * 0.04, duration: 0.35 }}
                style={{
                  display: "flex", alignItems: "baseline",
                  minHeight: line.type === "blank" ? 14 : 26,
                }}
              >
                <span className="mono" style={{ fontSize: 12, color: C.subtle, minWidth: 36, userSelect: "none" }}>
                  {line.type !== "blank" ? i + 1 : ""}
                </span>
                {line.type === "comment" && (
                  <span className="mono tok-comment" style={{ fontSize: 13 }}>{line.text}</span>
                )}
                {line.type === "code" && (
                  <span className="mono" style={{ fontSize: 13 }}>
                    {line.parts?.map((p, pi) => (
                      <span key={pi} className={`tok-${p.t}`}>{p.v}</span>
                    ))}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── CODE SNIPPET CARD ────────────────────────────────────────────────────────
function CodeCard({ project, delay, inView }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(project.snippet.map(l => l.map(t => t.v).join("")).join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className="card"
      style={{ overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ borderColor: C.borderHover, y: -3 }}
    >
      <div style={{
        padding: "10px 14px", borderBottom: `1px solid ${C.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(255,255,255,0.015)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {["#ff5f57","#febc2e","#28c840"].map(c => (
            <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
          ))}
          <span className="mono" style={{ fontSize: 11, color: C.muted, marginLeft: 6 }}>
            {project.file}
          </span>
        </div>
        <button
          onClick={handleCopy}
          style={{ background: "none", border: "none", cursor: "pointer", color: C.subtle, display: "flex" }}
        >
          {copied ? <Check size={13} color="#a3e48d" /> : <Copy size={13} />}
        </button>
      </div>

      <div style={{ padding: "20px 20px 16px", flex: 1, overflowX: "auto" }}>
        {project.snippet.map((line, li) => (
          <div key={li} style={{ display: "flex", minHeight: 22 }}>
            <span className="mono" style={{ fontSize: 11, color: C.subtle, minWidth: 28, userSelect: "none" }}>
              {li + 1}
            </span>
            <span className="mono" style={{ fontSize: 12, lineHeight: 1.7 }}>
              {line.map((tok, ti) => (
                <span key={ti} className={`tok-${tok.c}`}>{tok.v}</span>
              ))}
            </span>
          </div>
        ))}
      </div>

      <div style={{ padding: "16px 20px 20px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <project.icon size={15} color={C.accent} />
            <h3 className="syne" style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em" }}>
              {project.title}
            </h3>
          </div>
          <a href={project.github} className="mono" style={{
            fontSize: 11, color: C.muted, display: "flex", alignItems: "center", gap: 4,
            textDecoration: "none", transition: "color 0.15s",
          }}
            onMouseEnter={e => e.target.style.color = C.accent}
            onMouseLeave={e => e.target.style.color = C.muted}
          >
            GitHub <ArrowUpRight size={11} />
          </a>
        </div>
        <p className="mono" style={{ fontSize: 11, color: C.muted, lineHeight: 1.7, marginBottom: 14 }}>
          {project.desc}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {project.tech.map(t => (
            <span key={t} className="mono" style={{
              fontSize: 10, padding: "3px 8px",
              border: `1px solid ${C.border}`, borderRadius: 3,
              color: C.subtle, letterSpacing: "0.05em",
            }}>{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── PROJECTS DATA ────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    title: "Answer Sheet Rechecking Tool",
    file: "answerCheck.py",
     github: "https://github.com/AniketBankar2004/Answer_Sheet_Evaluation",
    icon: ScanLine,
    desc: "AI-powered answer sheet evaluation using OCR and Groq LLM. Extracts handwritten answers via OpenCV, scores them through LLM reasoning.",
    tech: ["Python", "OpenCV", "Groq API", "Node.js", "React"],
    snippet: [
      [{ c:"keyword",v:"import" }, { c:"plain",v:" cv2, pytesseract" }],
      [{ c:"keyword",v:"from" }, { c:"plain",v:" groq " }, { c:"keyword",v:"import" }, { c:"plain",v:" Groq" }],
      [{ c:"plain",v:"" }],
      [{ c:"keyword",v:"def" }, { c:"fn",v:" extract_answers" }, { c:"punct",v:"(img_path):" }],
      [{ c:"plain",v:"  img " }, { c:"punct",v:"=" }, { c:"plain",v:" cv2" }, { c:"punct",v:"." }, { c:"fn",v:"imread" }, { c:"punct",v:"(img_path)" }],
      [{ c:"plain",v:"  gray " }, { c:"punct",v:"=" }, { c:"plain",v:" cv2" }, { c:"punct",v:"." }, { c:"fn",v:"cvtColor" }, { c:"punct",v:"(img, cv2.COLOR_BGR2GRAY)" }],
      [{ c:"plain",v:"  text " }, { c:"punct",v:"=" }, { c:"plain",v:" pytesseract" }, { c:"punct",v:"." }, { c:"fn",v:"image_to_string" }, { c:"punct",v:"(gray)" }],
      [{ c:"keyword",v:"  return" }, { c:"plain",v:" text" }],
      [{ c:"plain",v:"" }],
      [{ c:"keyword",v:"def" }, { c:"fn",v:" score_with_llm" }, { c:"punct",v:"(answer, rubric):" }],
      [{ c:"plain",v:"  client " }, { c:"punct",v:"=" }, { c:"plain",v:" Groq()" }],
      [{ c:"comment",v:"  # Returns structured score + feedback" }],
    ]
  },
  {
    title: "Generic Medicine Recommender",
    file: "mediRec.js",
     github: "https://github.com/yuvi969/PCCOEHACKATHON",
    icon: FlaskConical,
    desc: "Recommends cost-effective generic alternatives to branded medicines. Compares composition, efficacy data, and pricing through a REST API.",
    tech: ["Node.js", "Express", "MongoDB", "React", "REST API"],
    snippet: [
      [{ c:"keyword",v:"const" }, { c:"plain",v:" express " }, { c:"punct",v:"=" }, { c:"fn",v:"require" }, { c:"punct",v:"(" }, { c:"string",v:"'express'" }, { c:"punct",v:")" }],
      [{ c:"keyword",v:"const" }, { c:"plain",v:" Medicine " }, { c:"punct",v:"=" }, { c:"fn",v:"require" }, { c:"punct",v:"(" }, { c:"string",v:"'./models/Medicine'" }, { c:"punct",v:")" }],
      [{ c:"plain",v:"" }],
      [{ c:"comment",v:"// POST /api/recommend" }],
      [{ c:"plain",v:"router" }, { c:"punct",v:"." }, { c:"fn",v:"post" }, { c:"punct",v:"(" }, { c:"string",v:"'/recommend'" }, { c:"punct",v:", async (req, res) => {" }],
      [{ c:"plain",v:"  " }, { c:"keyword",v:"const" }, { c:"plain",v:" { brandName } " }, { c:"punct",v:"=" }, { c:"plain",v:" req.body;" }],
      [{ c:"keyword",v:"  const" }, { c:"plain",v:" branded " }, { c:"punct",v:"= await" }, { c:"plain",v:" Medicine" }, { c:"punct",v:"." }, { c:"fn",v:"findOne" }, { c:"punct",v:"({ brandName });" }],
      [{ c:"keyword",v:"  const" }, { c:"plain",v:" generics " }, { c:"punct",v:"= await" }, { c:"plain",v:" Medicine" }, { c:"punct",v:"." }, { c:"fn",v:"find" }, { c:"punct",v:"({" }],
      [{ c:"plain",v:"    isGeneric" }, { c:"punct",v:":" }, { c:"keyword",v:"true" }],
      [{ c:"punct",v:"  })" }, { c:"plain",v:"." }, { c:"fn",v:"sort" }, { c:"punct",v:"({" }, { c:"plain",v:" price" }, { c:"punct",v:": 1 });" }],
      [{ c:"plain",v:"  res" }, { c:"punct",v:"." }, { c:"fn",v:"json" }, { c:"punct",v:"({ branded, generics });" }],
      [{ c:"punct",v:"});" }],
    ]
  },
  {
    title: "GatherUp",
    file: "SecurityConfig.java",
    github: "https://github.com/AniketBankar2004/hackathon_gather_up",
    icon: Globe,
    desc: "Built a full-stack location-based event platform. Features JWT authentication, geospatial filtering, and secure REST APIs with a clean separation of public discovery endpoints and protected management routes.",
    tech: ["Spring Boot", "React", "MongoDB", "JWT", "Geolocation"],
    snippet: [
      [{ c:"keyword",v:"@Configuration" }],
      [{ c:"keyword",v:"@EnableWebSecurity" }],
      [{ c:"keyword",v:"public class " }, { c:"fn",v:"SecurityConfig" }, { c:"punct",v:" {" }],
      [{ c:"plain",v:"" }],
      [{ c:"plain",v:"  " }, { c:"keyword",v:"@Bean" }],
      [{ c:"keyword",v:"  public " }, { c:"fn",v:"SecurityFilterChain" }, { c:"plain",v:" filterChain" }, { c:"punct",v:"(HttpSecurity http) {" }],
      [{ c:"comment",v:"    // Advanced JWT stateless auth & routing" }],
      [{ c:"plain",v:"    http" }, { c:"punct",v:"." }, { c:"fn",v:"cors" }, { c:"punct",v:"()." }, { c:"fn",v:"and" }, { c:"punct",v:"()." }, { c:"fn",v:"csrf" }, { c:"punct",v:"()." }, { c:"fn",v:"disable" }, { c:"punct",v:"()" }],
      [{ c:"plain",v:"      ." }, { c:"fn",v:"authorizeHttpRequests" }, { c:"punct",v:"(auth -> auth" }],
      [{ c:"plain",v:"        ." }, { c:"fn",v:"requestMatchers" }, { c:"punct",v:"(" }, { c:"string",v:'"/api/events/nearby"' }, { c:"punct",v:")." }, { c:"fn",v:"permitAll" }, { c:"punct",v:"()" }, { c:"comment",v:" // Public" }],
      [{ c:"plain",v:"        ." }, { c:"fn",v:"requestMatchers" }, { c:"punct",v:"(" }, { c:"string",v:'"/api/events/manage/**"' }, { c:"punct",v:")." }, { c:"fn",v:"authenticated" }, { c:"punct",v:"()" }, { c:"comment",v:" // Protected" }],
      [{ c:"plain",v:"      )" }],
      [{ c:"plain",v:"      ." }, { c:"fn",v:"sessionManagement" }, { c:"punct",v:"()" }],
      [{ c:"plain",v:"      ." }, { c:"fn",v:"sessionCreationPolicy" }, { c:"punct",v:"(" }, { c:"plain",v:"SessionCreationPolicy" }, { c:"punct",v:"." }, { c:"plain",v:"STATELESS" }, { c:"punct",v:")" }],
      [{ c:"plain",v:"      ." }, { c:"fn",v:"addFilterBefore" }, { c:"punct",v:"(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);" }],
      [{ c:"plain",v:"" }],
      [{ c:"keyword",v:"    return " }, { c:"plain",v:"http" }, { c:"punct",v:"." }, { c:"fn",v:"build" }, { c:"punct",v:"();" }],
      [{ c:"punct",v:"  }" }],
      [{ c:"punct",v:"}" }],
    ]
  },
];

function Projects() {
  const [ref, inView] = useInViewAnim();
  return (
    <section id="projects" style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
      <div ref={ref}>
        <motion.p className="section-label" {...(inView ? fadeUp(0) : { initial: { opacity: 0 } })}>
          02 · featured projects
        </motion.p>
        <motion.h2
          className="syne"
          style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 16 }}
          {...(inView ? fadeUp(0.1) : { initial: { opacity: 0 } })}
        >
          Systems I've shipped.
        </motion.h2>
        <motion.p
          className="mono"
          style={{ fontSize: 13, color: C.muted, marginBottom: 56 }}
          {...(inView ? fadeUp(0.15) : { initial: { opacity: 0 } })}
        >
          // Real code. Real problems. Real solutions.
        </motion.p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 20,
        }}>
          {PROJECTS.map((p, i) => (
            <CodeCard key={p.title} project={p} delay={0.2 + i * 0.12} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── HACKATHONS ───────────────────────────────────────────────────────────────
const HACKATHONS = [
  {
    icon: Leaf,
    title: "EcoSnap",
    tag: "24h Hackathon",
    desc: "Built an environmental data web app that lets users snap photos to log and analyze local pollution & biodiversity metrics in real time.",
    accent: C.accent,
  },
  {
    icon: Building2,
    title: "SimCity AI",
    tag: "Hackathon",
    desc: "Developed a multi-agent urban policy simulator where AI agents model competing city stakeholders to forecast the impact of policy decisions.",
    accent: "#82aaff",
  },
  {
    icon: Train,
    title: "Railway Track Fault Detection",
    tag: "Research",
    desc: "Conducted study on Object Detection using YOLOv8 for automated railway track fault localization — achieving high precision on defect classification.",
    accent: "#c792ea",
  },
];

function Hackathons() {
  const [ref, inView] = useInViewAnim();
  return (
    <section id="hackathons" style={{
      padding: "100px 24px",
      background: "rgba(255,255,255,0.008)",
      borderTop: `1px solid ${C.border}`,
      borderBottom: `1px solid ${C.border}`,
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={ref}>
          <motion.p className="section-label" {...(inView ? fadeUp(0) : { initial: { opacity: 0 } })}>
            03 · hackathons & research
          </motion.p>
          <motion.h2
            className="syne"
            style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 56 }}
            {...(inView ? fadeUp(0.1) : { initial: { opacity: 0 } })}
          >
            Built under pressure.
          </motion.h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {HACKATHONS.map((h, i) => (
              <motion.div
                key={h.title}
                className="card"
                style={{ padding: "28px 32px", display: "flex", alignItems: "flex-start", gap: 24 }}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
                whileHover={{ borderColor: h.accent + "40", x: 4 }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 8,
                  background: h.accent + "12",
                  border: `1px solid ${h.accent}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <h.icon size={20} color={h.accent} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                    <h3 className="syne" style={{ fontSize: 18, fontWeight: 700 }}>{h.title}</h3>
                    <span className="mono" style={{
                      fontSize: 10, padding: "2px 8px", borderRadius: 3,
                      background: h.accent + "15", color: h.accent,
                      border: `1px solid ${h.accent}30`, letterSpacing: "0.1em",
                    }}>{h.tag}</span>
                  </div>
                  <p className="mono" style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>{h.desc}</p>
                </div>
                <ArrowUpRight size={16} color={C.subtle} style={{ flexShrink: 0 }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TECH STACK ───────────────────────────────────────────────────────────────
const STACK = [
  {
    label: "Frontend", icon: Globe,
    items: [{ name: "React.js", icon: Layers }, { name: "Tailwind CSS", icon: Zap }, { name: "HTML / CSS", icon: Code2 }]
  },
  {
    label: "Backend", icon: Server,
    items: [{ name: "Node.js", icon: Box }, { name: "Express.js", icon: ChevronRight }, { name: "Flask", icon: FlaskConical }]
  },
  {
    label: "Database", icon: Database,
    items: [{ name: "MongoDB", icon: Database }, { name: "PostgreSQL", icon: Database }, { name: "SQL", icon: Database }]
  },
  {
    label: "Languages", icon: Terminal,
    items: [{ name: "JavaScript", icon: Hash }, { name: "Python", icon: Hash }, { name: "C++", icon: Hash }, { name: "Java", icon: Hash }]
  },
];

function TechStack() {
  const [ref, inView] = useInViewAnim();
  return (
    <section id="stack" style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <div ref={ref}>
        <motion.p className="section-label" {...(inView ? fadeUp(0) : { initial: { opacity: 0 } })}>04 · tech stack</motion.p>
        <motion.h2
          className="syne"
          style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 56 }}
          {...(inView ? fadeUp(0.1) : { initial: { opacity: 0 } })}
        >
          The tools I wield.
        </motion.h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {STACK.map((group, gi) => (
            <motion.div
              key={group.label}
              className="card"
              style={{ padding: "24px" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + gi * 0.1, duration: 0.5 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <group.icon size={14} color={C.accent} />
                <span className="mono" style={{ fontSize: 11, color: C.accent, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  {group.label}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {group.items.map((item, ii) => (
                  <motion.div
                    key={item.name}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "8px 12px", borderRadius: 4,
                      border: `1px solid ${C.border}`,
                      background: "rgba(255,255,255,0.02)",
                      transition: "all 0.15s",
                    }}
                    initial={{ opacity: 0, x: -8 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + gi * 0.1 + ii * 0.06 }}
                    whileHover={{ borderColor: C.accent + "40", x: 4 }}
                  >
                    <item.icon size={12} color={C.subtle} />
                    <span className="mono" style={{ fontSize: 13 }}>{item.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── DSA ──────────────────────────────────────────────────────────────────────
function DSA() {
  const [ref, inView] = useInViewAnim();
  const gfgScore = 759, gfgSolved = 267;
  const lcEasy = 21, lcMed = 16, lcHard = 3;
  const lcTotal = lcEasy + lcMed + lcHard;
  const bars = [
    { label: "Easy", count: lcEasy, total: lcTotal, color: "#a3e48d" },
    { label: "Medium", count: lcMed, total: lcTotal, color: "#ffcba4" },
    { label: "Hard", count: lcHard, total: lcTotal, color: "#ffb3c6" },
  ];

  return (
    <section id="dsa" style={{
      padding: "100px 24px",
      background: "rgba(255,255,255,0.008)",
      borderTop: `1px solid ${C.border}`,
      borderBottom: `1px solid ${C.border}`,
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }} ref={ref}>
        <motion.p className="section-label" {...(inView ? fadeUp(0) : { initial: { opacity: 0 } })}>
          05 · problem solving
        </motion.p>
        <motion.h2
          className="syne"
          style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 56 }}
          {...(inView ? fadeUp(0.1) : { initial: { opacity: 0 } })}
        >
          Algorithmic thinking.
        </motion.h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {/* GFG */}
          <motion.div className="card" style={{ padding: "32px" }}
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
              <Target size={16} color={C.accent} />
              <span className="mono" style={{ fontSize: 12, color: C.accent, letterSpacing: "0.1em" }}>GEEKSFORGEEKS</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
  <div>
    <p className="syne" style={{ fontSize: 36, fontWeight: 800, color: C.accent, lineHeight: 1, letterSpacing: "-0.03em" }}>
      {gfgScore}
    </p>
    <p className="mono" style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>coding score</p>
  </div>
  <div>
    <p className="syne" style={{ fontSize: 36, fontWeight: 800, color: C.text, lineHeight: 1, letterSpacing: "-0.03em" }}>
      {gfgSolved}
    </p>
    <p className="mono" style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>problems solved</p>
  </div>
</div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span className="mono" style={{ fontSize: 11, color: C.muted }}>progress</span>
                <span className="mono" style={{ fontSize: 11, color: C.accent }}>{Math.round((gfgSolved / 500) * 100)}% of 500</span>
              </div>
              <div style={{ height: 4, background: C.border, borderRadius: 2, overflow: "hidden" }}>
                <motion.div
                  style={{ height: "100%", background: C.accent, borderRadius: 2 }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${(gfgSolved / 500) * 100}%` } : {}}
                  transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>

          {/* LeetCode */}
<motion.div className="card" style={{ padding: "32px", minWidth: 0, overflow: "hidden" }}
  initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
  transition={{ delay: 0.3, duration: 0.5 }}
>
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
    <BarChart3 size={16} color={C.accentSoft} />
    <span className="mono" style={{ fontSize: 12, color: C.accentSoft, letterSpacing: "0.1em" }}>LEETCODE</span>
  </div>
  <div style={{ marginBottom: 28, minWidth: 0 }}>
    <p className="syne" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.03em" }}>{lcTotal}</p>
    <p className="mono" style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>problems solved</p>
  </div>
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    {bars.map((b, i) => (
      <div key={b.label}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
          <span className="mono" style={{ fontSize: 11, color: C.muted }}>{b.label}</span>
          <span className="mono" style={{ fontSize: 11, color: b.color }}>{b.count}</span>
        </div>
        <div style={{ height: 3, background: C.border, borderRadius: 2, overflow: "hidden" }}>
          <motion.div
            style={{ height: "100%", background: b.color, borderRadius: 2 }}
            initial={{ width: 0 }}
            animate={inView ? { width: `${(b.count / lcTotal) * 100}%` } : {}}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>
    ))}
  </div>
</motion.div>

          {/* Philosophy */}
          <motion.div className="card" style={{ padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <Brain size={16} color={C.muted} />
                <span className="mono" style={{ fontSize: 12, color: C.muted, letterSpacing: "0.1em" }}>APPROACH</span>
              </div>
              <p className="mono" style={{ fontSize: 13, color: C.muted, lineHeight: 1.9, marginBottom: 20 }}>
                DSA is the lens through which I design systems. Understanding time & space complexity isn't an interview skill — it's an engineering discipline.
              </p>
            </div>
            <div style={{
              padding: "14px 16px",
              background: C.accentDim,
              border: `1px solid rgba(255,107,157,0.15)`,
              borderRadius: 6,
            }}>
              <p className="mono" style={{ fontSize: 12, color: C.accent, lineHeight: 1.7 }}>
                <span style={{ color: C.muted }}>{">"} </span>
                Focused on: Trees, Graphs, DP, System Design
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const [ref, inView] = useInViewAnim();
  const links = [
    { icon: Mail, label: "pawaryuvraj334@gmail.com", href: "mailto:pawaryuvraj334@gmail.com" },
    { icon: Github, label: "GitHub", href: "https://github.com/yuvi969" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/yuvraj-pawar-7256aa2b2/" },
  ];
  return (
    <footer id="contact" style={{ padding: "100px 24px 60px", textAlign: "center" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }} ref={ref}>
        <motion.p className="section-label" style={{ marginBottom: 20 }}
          {...(inView ? fadeUp(0) : { initial: { opacity: 0 } })}
        >
          06 · contact
        </motion.p>
        <motion.h2
          className="syne"
          style={{
            fontSize: "clamp(32px,7vw,72px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 20,
            background: "linear-gradient(135deg, #fff 50%, #ff6b9d 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}
          {...(inView ? fadeUp(0.1) : { initial: { opacity: 0 } })}
        >
          Let's build something.
        </motion.h2>
        <motion.p className="mono" style={{ fontSize: 13, color: C.muted, marginBottom: 48, lineHeight: 1.8 }}
          {...(inView ? fadeUp(0.2) : { initial: { opacity: 0 } })}
        >
          Open to full-time roles, internships, and interesting projects.<br />
          I respond within 24 hours.
        </motion.p>
        <motion.div
          style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 64 }}
          {...(inView ? fadeUp(0.3) : { initial: { opacity: 0 } })}
        >
          {links.map(link => (
            <a key={link.label} href={link.href}
              target={link.href.startsWith("mailto") ? "_self" : "_blank"}
              rel="noreferrer" className="btn-outline"
            >
              <link.icon size={13} /> {link.label}
            </a>
          ))}
        </motion.div>
        <motion.div
          style={{ borderTop: `1px solid ${C.border}`, paddingTop: 32 }}
          {...(inView ? fadeUp(0.4) : { initial: { opacity: 0 } })}
        >
          <p className="mono" style={{ fontSize: 11, color: C.subtle }}>© 2025 Yuvraj Pawar · Designed & built with precision</p>
          <p className="mono" style={{ fontSize: 11, color: C.subtle, marginTop: 4 }}>React · Tailwind · Framer Motion</p>
        </motion.div>
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
      <main>
        <Hero />
        <About />
        <Projects />
        <Hackathons />
        <TechStack />
        <DSA />
        <Footer />
      </main>
    </>
  );
}
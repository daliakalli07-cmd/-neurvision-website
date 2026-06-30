
import { useState, useEffect, useRef } from "react";
import ArchitectureDiagram from "./components/ArchitectureDiagram.jsx";
import HexDiagram from "./components/HexDiagram";
const NAV_LINKS = ["Services", "Technology", "Architecture", "Results", "Team", "Contact"];

const SERVICES = [
  {
    icon: "◈",
    title: "Real-Time Vision AI",
    subtitle: "Edge Inference Engine",
    desc: "YOLOv8-powered object detection running entirely on-device. Parts classified in under 30 ms — no cloud dependency, no latency bottleneck.",
    tags: ["YOLOv8", "NVIDIA Jetson", "CUDA", "OpenCV"],
  },
  {
    icon: "⬡",
    title: "Industrial Communication",
    subtitle: "OPC UA Protocol Bridge",
    desc: "Bidirectional data exchange between edge AI and PLCs via OPC UA. Seamlessly integrates with Siemens S7-1200 and any Industry 4.0 compliant controller.",
    tags: ["OPC UA", "Siemens S7-1200", "TIA Portal", "asyncua"],
  },
  {
    icon: "⬢",
    title: "Supervision Dashboard",
    subtitle: "Web-Based HMI",
    desc: "React-based industrial interface delivering live MJPEG video, part counters, conveyor control (RUN / STOP / EMERGENCY), and real-time PLC status.",
    tags: ["React 18", "FastAPI", "MJPEG", "REST API"],
  },
  {
    icon: "◉",
    title: "Edge–Cloud Hybrid Storage",
    subtitle: "Distributed Data Architecture",
    desc: "Critical real-time data — detections, alarms, machine states — stays local for zero-latency operations. Historical logs, statistics, and reports sync to cloud for long-term analytics and multi-site access.",
    tags: ["Edge Storage", "Cloud Archive", "Grafana", "Time-Series DB"],
  },
  {
    icon: "△",
    title: "Model Training & Deployment",
    subtitle: "Custom Vision Models",
    desc: "End-to-end training pipeline on Roboflow: dataset curation, annotation, augmentation, transfer learning, and export-ready .pt weights deployed directly to your edge device.",
    tags: ["Roboflow", "Transfer Learning", "mAP 99.3%", "PyTorch"],
  },
  {
    icon: "⬟",
    title: "System Integration",
    subtitle: "Turnkey IIoT Setup",
    desc: "Full deployment on-site: hardware configuration, network setup via ZeroTier VPN, OPC UA commissioning, model tuning, and operator training.",
    tags: ["NVIDIA Jetson", "ZeroTier VPN", "Docker", "Ubuntu JetPack"],
  },
];

const METRICS = [
  { value: "99.3%", label: "mAP@50 Detection Accuracy" },
  { value: "<30ms", label: "Inference Latency on Edge" },
  { value: "100%", label: "Edge-Local Real-Time Operations" },
  { value: "2", label: "Material Classes Classified" },
];

const STACK = [
  { layer: "Presentation", items: ["React 18", "Vite", "MJPEG Stream", "REST Polling"], color: "#4FC3F7" },
  { layer: "Business Logic", items: ["FastAPI", "Uvicorn (ASGI)", "YOLOv8 Inference", "OPC UA Client"], color: "#29B6F6" },
  { layer: "Communication", items: ["OPC UA / TCP", "RTSP Camera Feed", "ZeroTier VPN", "HTTP REST"], color: "#0288D1" },
  { layer: "Edge Hardware", items: ["NVIDIA Jetson Orin Nano", "GPU Ampere 1024 CUDA", "Siemens S7-1200 PLC", "Dahua IP Camera"], color: "#01579B" },
  { layer: "Cloud Archive", items: ["Historical Data Sync", "Long-Term Statistics", "Remote Dashboard Access", "Scalable Multi-Site"], color: "#7B1FA2" },
];

const RESULTS = [
  { piece: "Metal Parts", detected: 45, total: 48, rate: 93.75, color: "#4FC3F7" },
  { piece: "Plastic Parts", detected: 36, total: 43, rate: 83.7, color: "#29B6F6" },
];

const TEAM = [
  {
    name: "Kalli Dalia",
    role: "Vision AI & Full-Stack",
    focus: "Computer vision architecture, YOLOv8 deployment, FastAPI backend, React frontend",
  },
  {
    name: "Lellouche Malak",
    role: "Industrial Automation",
    focus: "PLC programming, OPC UA configuration, TIA Portal integration, conveyor control logic",
  },
];

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth <= 768);
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
  const [activeNav, setActiveNav] = useState("Services");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [counters, setCounters] = useState({ map: 0, latency: 0, edge: 0 });
  const [arcVisible, setArcVisible] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);
  const arcRef = useRef(null);
  const metricsRef = useRef(null);
  const [metricsVisible, setMetricsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setArcVisible(true); }, { threshold: 0.2 });
    if (arcRef.current) obs.observe(arcRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setMetricsVisible(true); }, { threshold: 0.3 });
    if (metricsRef.current) obs.observe(metricsRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
    setMenuOpen(false);
  };

  return (
    <div style={styles.root}>
      {/* ── NAV ── */}
      <nav style={{ ...styles.nav, ...(scrolled ? styles.navScrolled : {}) }}>
  <div style={styles.navInner}>
    <div style={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <span style={styles.logoMark}>⬡</span>
      <span style={styles.logoText}>NEURVISION</span>
    </div>

    <div style={{
      ...styles.navLinks,
      display: isMobile ? "none" : "flex",
    }}>
      {NAV_LINKS.map((l) => (
        <button
          key={l}
          style={{ ...styles.navLink, ...(activeNav === l ? styles.navLinkActive : {}) }}
          onClick={() => scrollTo(l)}
        >
          {l}
        </button>
      ))}
    </div>

    <button style={{
      ...styles.ctaBtn,
      display: isMobile ? "none" : "block",
    }} onClick={() => scrollTo("Contact")}>Get in Touch</button>

    <button style={{
      ...styles.burger,
      display: isMobile ? "block" : "none",
    }} onClick={() => setMenuOpen(!menuOpen)}>☰</button>
  </div>

  {menuOpen && (
    <div style={styles.mobileMenu}>
      {NAV_LINKS.map((l) => (
        <button key={l} style={styles.mobileLink} onClick={() => scrollTo(l)}>{l}</button>
      ))}
    </div>
  )}
</nav>

      {/* ── HERO ── */}
   <section style={{
  ...styles.hero,
  flexDirection: isMobile ? "column" : "row",
  padding: isMobile ? "100px 16px 40px" : "100px 24px 60px",
}}>
  <div style={styles.heroGrid}>
    {Array.from({ length: 64 }).map((_, i) => (
      <div key={i} style={{ ...styles.heroCell, opacity: Math.random() * 0.15 + 0.02 }} />
    ))}
  </div>
  <div style={styles.heroContent}>
    <div style={styles.heroBadge}>
      <span style={styles.heroBadgeDot} />
      USTHB TechInnov
    </div>
    <h1 style={styles.heroH1}>
      Industrial AI<br />
      <span style={styles.heroAccent}>that runs at the edge</span>
    </h1>
    <p style={styles.heroSub}>
      NEURVISION delivers real-time machine vision, OPC UA industrial communication,
      and web supervision — all processed locally on embedded hardware.
      No cloud dependency for critical operations.
    </p>
    <div style={styles.heroActions}>
      <button style={styles.heroPrimary} onClick={() => scrollTo("Services")}>Explore Services</button>
      <button style={styles.heroSecondary} onClick={() => scrollTo("Architecture")}>View Architecture</button>
    </div>
    <div style={styles.heroPlatforms}>
      {["NVIDIA Jetson Orin Nano", "YOLOv8", "OPC UA", "Siemens S7-1200"].map((p) => (
        <span key={p} style={styles.heroPill}>{p}</span>
      ))}
    </div>
  </div>

  {!isMobile && (
    <div style={styles.heroVisual}>
      <HexDiagram />
    </div>
  )}
</section>

      {/* ── METRICS BAND ── */}
      <section ref={metricsRef} style={styles.metricsBand}>
        {METRICS.map((m, i) => (
          <div key={i} style={styles.metricItem}>
            <span style={{ ...styles.metricValue, opacity: metricsVisible ? 1 : 0, transform: metricsVisible ? "translateY(0)" : "translateY(20px)", transition: `all 0.6s ease ${i * 0.15}s` }}>
              {m.value}
            </span>
            <span style={styles.metricLabel}>{m.label}</span>
          </div>
        ))}
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={styles.section}>
        <div style={styles.sectionInner}>
          <p style={styles.eyebrow}>What We Build</p>
          <h2 style={styles.sectionH2}>Six capabilities.<br />One integrated platform.</h2>
          <div style={styles.servicesGrid}>
            {SERVICES.map((s, i) => (
              <div
                key={i}
                style={{ ...styles.serviceCard, ...(hoveredService === i ? styles.serviceCardHover : {}) }}
                onMouseEnter={() => setHoveredService(i)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <span style={styles.serviceIcon}>{s.icon}</span>
                <p style={styles.serviceSubtitle}>{s.subtitle}</p>
                <h3 style={styles.serviceTitle}>{s.title}</h3>
                <p style={styles.serviceDesc}>{s.desc}</p>
                <div style={styles.tagRow}>
                  {s.tags.map((t) => <span key={t} style={styles.tag}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY ── */}
      <section id="technology" style={{ ...styles.section, background: "#060D1F" }}>
        <div style={styles.sectionInner}>
          <p style={styles.eyebrow}>Under the Hood</p>
          <h2 style={styles.sectionH2}>Edge-first by design.<br />Not as an afterthought.</h2>
          <div style={styles.techGrid}>
            <div style={styles.techLeft}>
              <p style={styles.techPara}>
                Traditional industrial vision systems route video through the cloud,
                introducing latency, bandwidth costs, and single-points-of-failure.
                NEURVISION inverts this model.
              </p>
              <p style={styles.techPara}>
                The NVIDIA Jetson Orin Nano — with its 1024-core Ampere GPU and 40 TOPS of
                AI performance — runs the full inference pipeline locally.
                The Siemens S7-1200 PLC receives commands and sensor data over OPC UA,
                a secure, standards-based industrial protocol designed for exactly this kind of
                machine-to-machine communication.
              </p>
              <p style={styles.techPara}>
                For long-term analytics and multi-site reporting, we layer in a hybrid
                Edge–Cloud architecture: critical real-time data stays on-device,
                while historical records, statistics, and backups sync to the cloud
                when bandwidth allows — optimizing performance without sacrificing insight.
              </p>
              <div style={styles.techHighlights}>
                {[
                  ["40 TOPS", "AI performance on Jetson"],
                  ["193 epochs", "Training on 136 annotated images"],
                  ["8 s interval", "Anti-duplicate part counting"],
                  ["1 Hz", "Dashboard polling frequency"],
                ].map(([v, l]) => (
                  <div key={v} style={styles.techStat}>
                    <span style={styles.techStatVal}>{v}</span>
                    <span style={styles.techStatLabel}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={styles.techRight}>
              <div style={styles.specCard}>
                <p style={styles.specTitle}>Hardware Spec</p>
                {[
                  ["Platform", "NVIDIA Jetson Orin Nano 8 GB"],
                  ["GPU", "Ampere — 1024 CUDA + 32 Tensor cores"],
                  ["CPU", "6× Arm Cortex-A78AE @ 1.7 GHz"],
                  ["Memory", "8 GB LPDDR5, 68 GB/s bandwidth"],
                  ["AI Perf.", "40 TOPS (INT8)"],
                  ["Power", "7–15 W"],
                  ["PLC", "Siemens S7-1200 CPU 1214C"],
                  ["Camera", "Dahua DH-IPC-HDW1220SP, 1080p"],
                  ["Protocol", "OPC UA over TCP/IP LAN"],
                  ["OS", "Ubuntu 22.04 LTS + JetPack SDK"],
                ].map(([k, v]) => (
                  <div key={k} style={styles.specRow}>
                    <span style={styles.specKey}>{k}</span>
                    <span style={styles.specVal}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE ── */}
      <section id="architecture" ref={arcRef} style={styles.section}>
        <div style={styles.sectionInner}>
          <p style={styles.eyebrow}>System Design</p>
          <h2 style={styles.sectionH2}>Five layers.<br />Full-stack industrial intelligence.</h2>
          <ArchitectureDiagram />
          {/* Original 2D stack removed. Paste the Architecture3D component above styles. */}
          {/*
            {STACK.map((layer, i) => (
              <div
                key={layer.layer}
                style={{
                  ...styles.arcLayer,
                  borderLeft: `3px solid ${layer.color}`,
                  opacity: arcVisible ? 1 : 0,
                  transform: arcVisible ? "translateX(0)" : "translateX(-30px)",
                  transition: `all 0.5s ease ${i * 0.12}s`,
                }}
              >
                <div style={styles.arcLayerLeft}>
                  <span style={{ ...styles.arcDot, background: layer.color }} />
                  <span style={styles.arcLayerName}>{layer.layer}</span>
                </div>
                <div style={styles.arcItems}>
                  {layer.items.map((it) => (
                    <span key={it} style={{ ...styles.arcItem, borderColor: layer.color + "44" }}>{it}</span>
                  ))}
                </div>
              </div>
            ))}
          */}
          <div style={styles.arcNote}>
            <span style={styles.arcNoteIcon}>↑</span>
            Layers 1–4 operate fully offline on the edge device. Layer 5 syncs non-critical historical data to cloud storage — ensuring real-time operations are never dependent on connectivity.
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section id="results" style={{ ...styles.section, background: "#060D1F" }}>
        <div style={styles.sectionInner}>
          <p style={styles.eyebrow}>Validated Performance</p>
          <h2 style={styles.sectionH2}>Tested on a real<br />industrial conveyor station.</h2>
          <div style={styles.resultsGrid}>
            <div style={styles.resultsLeft}>
              <p style={styles.resultsIntro}>
                All metrics were obtained on the Festo MecLab Transportband didactic station,
                sorting metal and plastic cylindrical parts in real operating conditions —
                variable lighting, parts in motion, over a sustained 30-minute run.
              </p>
              {RESULTS.map((r) => (
                <div key={r.piece} style={styles.resultBar}>
                  <div style={styles.resultBarHeader}>
                    <span style={styles.resultBarLabel}>{r.piece}</span>
                    <span style={{ ...styles.resultBarRate, color: r.color }}>{r.rate}%</span>
                  </div>
                  <div style={styles.resultBarTrack}>
                    <div style={{ ...styles.resultBarFill, width: `${r.rate}%`, background: r.color }} />
                  </div>
                  <span style={styles.resultBarSub}>{r.detected} detected out of {r.total} actual</span>
                </div>
              ))}
              <div style={styles.resultTotal}>
                <span style={styles.resultTotalLabel}>Overall Detection Rate</span>
                <span style={styles.resultTotalVal}>89.0%</span>
                <span style={styles.resultTotalSub}>81 / 91 parts correctly identified</span>
              </div>
            </div>
            <div style={styles.resultsRight}>
              <div style={styles.trainingCard}>
                <p style={styles.trainingTitle}>Model Training Summary</p>
                {[
                  ["Architecture", "YOLOv8 (Ultralytics)"],
                  ["Dataset", "136 annotated images"],
                  ["Classes", "Metal · Plastic"],
                  ["Epochs", "193"],
                  ["Training Time", "~20 minutes"],
                  ["mAP@50", "99.3%"],
                  ["mAP@50–95", "89.0%"],
                  ["Precision", "98.2%"],
                  ["Recall", "98.8%"],
                  ["Input Size", "640 × 640 px"],
                  ["Augmentation", "Rotation · Flip · Brightness"],
                  ["Platform", "Roboflow Train + PyTorch"],
                ].map(([k, v]) => (
                  <div key={k} style={styles.specRow}>
                    <span style={styles.specKey}>{k}</span>
                    <span style={{ ...styles.specVal, color: "#4FC3F7" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" style={styles.section}>
        <div style={styles.sectionInner}>
          <p style={styles.eyebrow}>The People Behind It</p>
          <h2 style={styles.sectionH2}>Built by engineers.<br />For industrial reality.</h2>
          <p style={styles.teamIntro}>
            NEURVISION was co-founded as a Master's thesis project at USTHB — Université des Sciences et Technologies Houari Boumediene, Algiers — and has since been validated by NVIDIA Inception Program and Microsoft Founders Hub, and incubated at USTHB TechInnov.
          </p>
          <div style={styles.teamGrid}>
            {TEAM.map((m, i) => (
              <div key={i} style={styles.teamCard}>
                <div style={styles.teamAvatar}>
                  {m.name.split(" ").map(w => w[0]).join("")}
                </div>
                <h3 style={styles.teamName}>{m.name}</h3>
                <p style={styles.teamRole}>{m.role}</p>
                <p style={styles.teamFocus}>{m.focus}</p>
              </div>
            ))}
          </div>
          <div style={styles.validationRow}>
            {["NVIDIA Inception Program", "Microsoft Founders Hub", "USTHB TechInnov"].map((v) => (
              <div key={v} style={styles.validationBadge}>{v}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ ...styles.section, background: "#060D1F" }}>
        <div style={styles.sectionInner}>
          <p style={styles.eyebrow}>Get in Touch</p>
          <h2 style={styles.sectionH2}>Ready to bring<br />AI to your production line?</h2>
          <div style={styles.contactGrid}>
            <div style={styles.contactLeft}>
              <p style={styles.contactPara}>
                Whether you're looking to integrate vision AI into an existing line,
                commission a custom OPC UA setup, or explore what Edge Computing
                could do for your facility — we want to hear about your process.
              </p>
              <p style={styles.contactPara}>
                We work with manufacturing engineers, automation teams, and research labs.
                Every project starts with understanding your hardware, your protocol stack,
                and your real throughput requirements.
              </p>
              <div style={styles.contactDetails}>
                <div style={styles.contactRow}><span style={styles.contactIcon}>◈</span><span>USTHB TechInnov Incubator, Algiers, Algeria</span></div>
                <div style={styles.contactRow}><span style={styles.contactIcon}>⬡</span><span>neurvision@usthb.dz</span></div>
                
              </div>
            </div>
            <div style={styles.contactRight}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerLogo}>
            <span style={styles.logoMark}>⬡</span>
            <span style={styles.logoText}>NEURVISION</span>
          </div>
          <p style={styles.footerTagline}>Industrial AI · Edge Computing · OPC UA · Vision Systems</p>
          <p style={styles.footerCopy}>© 2026 NEURVISION — USTHB, Algiers. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: "1e4b0a27-ce75-4cf4-b5de-b02718a9ae7a",
        name: form.name,
        email: form.email,
        message: form.message,
      }),
    });

    const data = await res.json();
    setLoading(false);
    if (data.success) setSent(true);
  };

  if (sent) return (
    <div style={styles.sentMsg}>
      <span style={styles.sentIcon}>✓</span>
      <p style={styles.sentText}>Message received. We'll reply within 48 hours.</p>
    </div>
  );

  return (
    <div style={styles.formCard}>
      {[["Your name", "name", "text"], ["Your email", "email", "email"]].map(([ph, k, t]) => (
        <input key={k} type={t} placeholder={ph} value={form[k]} onChange={update(k)} style={styles.formInput} />
      ))}
      <textarea placeholder="Describe your use case or ask a question" value={form.message} onChange={update("message")} style={styles.formTextarea} rows={5} />
      <button style={styles.formBtn} onClick={submit} disabled={loading}>
        {loading ? "Sending…" : "Send Message →"}
      </button>
    </div>
  );
}

const styles = {
  root: {
    background: "#080F20",
    color: "#C8D8F0",
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    minHeight: "100vh",
    overflowX: "hidden",
  },
  // NAV
  nav: {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    background: "transparent",
    transition: "background 0.3s, box-shadow 0.3s",
  },
  navScrolled: {
    background: "rgba(6,10,24,0.95)",
    backdropFilter: "blur(12px)",
    boxShadow: "0 1px 0 rgba(79,195,247,0.15)",
  },
  navInner: {
    maxWidth: 1200, margin: "0 auto", padding: "0 24px",
    height: 64, display: "flex", alignItems: "center", gap: 24,
  },
  logo: {
    display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
    flexShrink: 0,
  },
  logoMark: { color: "#4FC3F7", fontSize: 22, lineHeight: 1 },
  logoText: {
    color: "#E8F4FF", fontSize: 15, fontWeight: 700,
    letterSpacing: "0.12em", textTransform: "uppercase",
  },
  navLinks: {
    display: "flex", gap: 4, marginLeft: "auto",
    "@media (max-width: 768px)": { display: "none" },
  },
  navLink: {
    background: "none", border: "none", cursor: "pointer",
    color: "#8BA8C8", fontSize: 13, fontWeight: 500,
    padding: "6px 12px", borderRadius: 4,
    transition: "color 0.2s",
    letterSpacing: "0.03em",
  },
  navLinkActive: { color: "#4FC3F7" },
  ctaBtn: {
    background: "transparent", border: "1px solid #4FC3F7",
    color: "#4FC3F7", fontSize: 12, fontWeight: 600,
    padding: "7px 18px", borderRadius: 4, cursor: "pointer",
    letterSpacing: "0.05em", transition: "background 0.2s",
    flexShrink: 0,
  },
  burger: {
    display: "none", background: "none", border: "none",
    color: "#4FC3F7", fontSize: 22, cursor: "pointer",
    padding: 4,
  },
  mobileMenu: {
    background: "rgba(6,10,24,0.98)",
    borderTop: "1px solid rgba(79,195,247,0.15)",
    display: "flex", flexDirection: "column", padding: "12px 24px 20px",
  },
  mobileLink: {
    background: "none", border: "none", color: "#C8D8F0",
    fontSize: 15, padding: "12px 0", cursor: "pointer", textAlign: "left",
    borderBottom: "1px solid rgba(79,195,247,0.08)",
  },
  // HERO
  hero: {
    minHeight: "100vh", position: "relative",
    display: "flex", alignItems: "center",
    padding: "100px 24px 60px",
    maxWidth: 1200, margin: "0 auto",
    gap: 48,
  },
  heroGrid: {
    position: "absolute", inset: 0,
    display: "grid", gridTemplateColumns: "repeat(8, 1fr)",
    pointerEvents: "none", zIndex: 0,
  },
  heroCell: {
    border: "0.5px solid rgba(79,195,247,0.06)",
  },
  heroContent: { position: "relative", zIndex: 1, maxWidth: 580, flex: "1 1 0" },
  heroBadge: {
    display: "inline-flex", alignItems: "center", gap: 8,
    background: "rgba(79,195,247,0.08)",
    border: "1px solid rgba(79,195,247,0.2)",
    borderRadius: 20, padding: "5px 14px",
    fontSize: 11, color: "#4FC3F7",
    letterSpacing: "0.05em", marginBottom: 28, fontWeight: 500,
  },
  heroBadgeDot: {
    width: 6, height: 6, borderRadius: "50%",
    background: "#4FC3F7",
    boxShadow: "0 0 6px #4FC3F7",
    animation: "pulse 2s infinite",
  },
  heroH1: {
    fontSize: "clamp(36px, 5vw, 62px)",
    fontWeight: 800, lineHeight: 1.1,
    color: "#E8F4FF", margin: "0 0 20px",
    letterSpacing: "-0.02em",
  },
  heroAccent: {
    color: "transparent",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    backgroundImage: "linear-gradient(135deg, #4FC3F7 0%, #29B6F6 50%, #0288D1 100%)",
  },
  heroSub: {
    fontSize: 17, lineHeight: 1.7, color: "#8BA8C8",
    margin: "0 0 36px", maxWidth: 480,
  },
  heroActions: { display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 36 },
  heroPrimary: {
    background: "#4FC3F7", color: "#080F20",
    border: "none", borderRadius: 6,
    padding: "13px 28px", fontSize: 14, fontWeight: 700,
    cursor: "pointer", letterSpacing: "0.03em",
    transition: "background 0.2s",
  },
  heroSecondary: {
    background: "transparent", color: "#C8D8F0",
    border: "1px solid rgba(200,216,240,0.25)",
    borderRadius: 6, padding: "13px 28px",
    fontSize: 14, fontWeight: 500,
    cursor: "pointer", letterSpacing: "0.03em",
  },
  heroPlatforms: { display: "flex", flexWrap: "wrap", gap: 8 },
  heroPill: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(200,216,240,0.12)",
    borderRadius: 4, padding: "4px 10px",
    fontSize: 11, color: "#8BA8C8",
    letterSpacing: "0.04em",
  },
 heroVisual: {
  flex: "0 0 420px",
  height: "420px",
  position: "relative",
  zIndex: 1,
},
  hexWrap: { width: "100%", aspectRatio: "1" },
  hexSvg: { width: "100%", height: "100%" },
  // METRICS BAND
  metricsBand: {
    background: "rgba(79,195,247,0.05)",
    borderTop: "1px solid rgba(79,195,247,0.15)",
    borderBottom: "1px solid rgba(79,195,247,0.15)",
    display: "flex", flexWrap: "wrap",
    maxWidth: "100%",
  },
  metricItem: {
    flex: "1 1 200px",
    display: "flex", flexDirection: "column",
    alignItems: "center", padding: "40px 20px",
    borderRight: "1px solid rgba(79,195,247,0.1)",
  },
  metricValue: {
    fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800,
    color: "#4FC3F7", letterSpacing: "-0.02em",
    fontVariantNumeric: "tabular-nums",
  },
  metricLabel: {
    fontSize: 12, color: "#6888A8", marginTop: 6,
    textAlign: "center", letterSpacing: "0.04em",
  },
  // SECTIONS
  section: { padding: "100px 24px", background: "#080F20" },
  sectionInner: { maxWidth: 1100, margin: "0 auto" },
  eyebrow: {
    fontSize: 11, color: "#4FC3F7", letterSpacing: "0.15em",
    textTransform: "uppercase", fontWeight: 600, margin: "0 0 16px",
  },
  sectionH2: {
    fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800,
    color: "#E8F4FF", lineHeight: 1.15,
    letterSpacing: "-0.02em", margin: "0 0 60px",
  },
  // SERVICES
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: 2, border: "1px solid rgba(79,195,247,0.1)",
  },
  serviceCard: {
    background: "#080F20",
    padding: "36px 32px",
    border: "1px solid rgba(79,195,247,0.07)",
    transition: "background 0.25s, border-color 0.25s",
    cursor: "default",
  },
  serviceCardHover: {
    background: "rgba(79,195,247,0.04)",
    borderColor: "rgba(79,195,247,0.25)",
  },
  serviceIcon: { fontSize: 24, color: "#4FC3F7", display: "block", marginBottom: 16 },
  serviceSubtitle: {
    fontSize: 11, color: "#4FC3F7", letterSpacing: "0.1em",
    textTransform: "uppercase", fontWeight: 600, margin: "0 0 8px",
  },
  serviceTitle: {
    fontSize: 20, fontWeight: 700, color: "#E8F4FF",
    margin: "0 0 14px", letterSpacing: "-0.01em",
  },
  serviceDesc: {
    fontSize: 14, lineHeight: 1.7, color: "#7A98B8",
    margin: "0 0 20px",
  },
  tagRow: { display: "flex", flexWrap: "wrap", gap: 6 },
  tag: {
    background: "rgba(79,195,247,0.08)",
    border: "1px solid rgba(79,195,247,0.2)",
    borderRadius: 3, padding: "3px 8px",
    fontSize: 11, color: "#4FC3F7",
    letterSpacing: "0.03em",
  },
  // TECH
  techGrid: { display: "flex", gap: 60, flexWrap: "wrap" },
  techLeft: { flex: "1 1 360px" },
  techRight: { flex: "0 1 380px" },
  techPara: { fontSize: 15, lineHeight: 1.8, color: "#8BA8C8", margin: "0 0 20px" },
  techHighlights: {
    display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 36,
  },
  techStat: {
    background: "rgba(79,195,247,0.05)",
    border: "1px solid rgba(79,195,247,0.15)",
    borderRadius: 6, padding: "16px 20px",
  },
  techStatVal: {
    display: "block", fontSize: 22, fontWeight: 800,
    color: "#4FC3F7", fontVariantNumeric: "tabular-nums",
  },
  techStatLabel: { display: "block", fontSize: 12, color: "#6888A8", marginTop: 4 },
  specCard: {
    background: "rgba(4,8,20,0.8)",
    border: "1px solid rgba(79,195,247,0.2)",
    borderRadius: 8, padding: "28px 28px",
  },
  specTitle: {
    fontSize: 11, color: "#4FC3F7", letterSpacing: "0.12em",
    textTransform: "uppercase", fontWeight: 600,
    margin: "0 0 20px", paddingBottom: 12,
    borderBottom: "1px solid rgba(79,195,247,0.15)",
  },
  specRow: {
    display: "flex", justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid rgba(79,195,247,0.06)",
    gap: 12,
  },
  specKey: { fontSize: 12, color: "#6888A8", flexShrink: 0 },
  specVal: { fontSize: 12, color: "#C8D8F0", textAlign: "right" },
  // ARCHITECTURE
  arcStack: { display: "flex", flexDirection: "column", gap: 2 },
  arcLayer: {
    display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap",
    background: "rgba(4,8,20,0.6)",
    border: "1px solid rgba(79,195,247,0.08)",
    borderRadius: 4, padding: "20px 28px",
  },
  arcLayerLeft: { display: "flex", alignItems: "center", gap: 12, minWidth: 160 },
  arcDot: { width: 8, height: 8, borderRadius: "50%", flexShrink: 0 },
  arcLayerName: { fontSize: 13, fontWeight: 700, color: "#E8F4FF", letterSpacing: "0.03em" },
  arcItems: { display: "flex", flexWrap: "wrap", gap: 8 },
  arcItem: {
    background: "rgba(79,195,247,0.06)",
    border: "1px solid",
    borderRadius: 4, padding: "4px 12px",
    fontSize: 12, color: "#8BA8C8",
  },
  arcNote: {
    marginTop: 24, padding: "16px 20px",
    background: "rgba(79,195,247,0.06)",
    border: "1px solid rgba(79,195,247,0.2)",
    borderRadius: 6, fontSize: 13, color: "#8BA8C8",
    lineHeight: 1.6, display: "flex", gap: 10, alignItems: "flex-start",
  },
  arcNoteIcon: { color: "#4FC3F7", fontSize: 16, flexShrink: 0, marginTop: 1 },
  // RESULTS
  resultsGrid: { display: "flex", gap: 60, flexWrap: "wrap" },
  resultsLeft: { flex: "1 1 360px" },
  resultsRight: { flex: "0 1 380px" },
  resultsIntro: { fontSize: 15, lineHeight: 1.8, color: "#7A98B8", marginBottom: 36 },
  resultBar: { marginBottom: 28 },
  resultBarHeader: { display: "flex", justifyContent: "space-between", marginBottom: 8 },
  resultBarLabel: { fontSize: 14, fontWeight: 600, color: "#C8D8F0" },
  resultBarRate: { fontSize: 18, fontWeight: 800, fontVariantNumeric: "tabular-nums" },
  resultBarTrack: {
    height: 6, background: "rgba(79,195,247,0.1)",
    borderRadius: 3, overflow: "hidden",
  },
  resultBarFill: { height: "100%", borderRadius: 3, transition: "width 1s ease" },
  resultBarSub: { fontSize: 12, color: "#6888A8", display: "block", marginTop: 6 },
  resultTotal: {
    marginTop: 36, padding: "20px 24px",
    background: "rgba(79,195,247,0.05)",
    border: "1px solid rgba(79,195,247,0.2)",
    borderRadius: 6,
  },
  resultTotalLabel: { display: "block", fontSize: 11, color: "#4FC3F7", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 },
  resultTotalVal: { display: "block", fontSize: 36, fontWeight: 800, color: "#E8F4FF" },
  resultTotalSub: { display: "block", fontSize: 12, color: "#6888A8", marginTop: 4 },
  trainingCard: {
    background: "rgba(4,8,20,0.8)",
    border: "1px solid rgba(79,195,247,0.2)",
    borderRadius: 8, padding: "28px",
  },
  trainingTitle: {
    fontSize: 11, color: "#4FC3F7", letterSpacing: "0.12em",
    textTransform: "uppercase", fontWeight: 600,
    margin: "0 0 20px", paddingBottom: 12,
    borderBottom: "1px solid rgba(79,195,247,0.15)",
  },
  // TEAM
  teamIntro: { fontSize: 15, lineHeight: 1.8, color: "#7A98B8", maxWidth: 620, marginBottom: 48 },
  teamGrid: { display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 48 },
  teamCard: {
    flex: "1 1 300px", background: "rgba(4,8,20,0.6)",
    border: "1px solid rgba(79,195,247,0.12)",
    borderRadius: 8, padding: "36px 32px",
  },
  teamAvatar: {
    width: 52, height: 52, borderRadius: "50%",
    background: "rgba(79,195,247,0.12)",
    border: "2px solid rgba(79,195,247,0.4)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 18, fontWeight: 800, color: "#4FC3F7",
    marginBottom: 20,
  },
  teamName: { fontSize: 20, fontWeight: 700, color: "#E8F4FF", margin: "0 0 6px" },
  teamRole: { fontSize: 12, color: "#4FC3F7", letterSpacing: "0.08em", margin: "0 0 14px" },
  teamFocus: { fontSize: 13, color: "#7A98B8", lineHeight: 1.7 },
  validationRow: { display: "flex", gap: 12, flexWrap: "wrap" },
  validationBadge: {
    background: "rgba(79,195,247,0.07)",
    border: "1px solid rgba(79,195,247,0.25)",
    borderRadius: 4, padding: "8px 16px",
    fontSize: 12, color: "#4FC3F7", fontWeight: 600,
    letterSpacing: "0.04em",
  },
  // CONTACT
  contactGrid: { display: "flex", gap: 60, flexWrap: "wrap" },
  contactLeft: { flex: "1 1 360px" },
  contactRight: { flex: "0 1 420px" },
  contactPara: { fontSize: 15, lineHeight: 1.8, color: "#7A98B8", marginBottom: 20 },
  contactDetails: { marginTop: 32, display: "flex", flexDirection: "column", gap: 14 },
  contactRow: { display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "#8BA8C8" },
  contactIcon: { color: "#4FC3F7", fontSize: 16, flexShrink: 0 },
  formCard: {
    background: "rgba(4,8,20,0.7)",
    border: "1px solid rgba(79,195,247,0.18)",
    borderRadius: 8, padding: "32px",
    display: "flex", flexDirection: "column", gap: 14,
  },
  formInput: {
    background: "rgba(79,195,247,0.04)",
    border: "1px solid rgba(79,195,247,0.18)",
    borderRadius: 4, padding: "12px 16px",
    color: "#C8D8F0", fontSize: 14, outline: "none",
    width: "100%", boxSizing: "border-box",
  },
  formTextarea: {
    background: "rgba(79,195,247,0.04)",
    border: "1px solid rgba(79,195,247,0.18)",
    borderRadius: 4, padding: "12px 16px",
    color: "#C8D8F0", fontSize: 14, outline: "none",
    resize: "vertical", width: "100%", boxSizing: "border-box",
    fontFamily: "inherit",
  },
  formBtn: {
    background: "#4FC3F7", color: "#080F20",
    border: "none", borderRadius: 4, padding: "13px 24px",
    fontSize: 14, fontWeight: 700, cursor: "pointer",
    letterSpacing: "0.04em", transition: "background 0.2s",
    alignSelf: "flex-start",
  },
  sentMsg: {
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", gap: 16, minHeight: 200,
    border: "1px solid rgba(79,195,247,0.25)", borderRadius: 8,
    background: "rgba(79,195,247,0.05)", padding: 40,
  },
  sentIcon: { fontSize: 36, color: "#4FC3F7" },
  sentText: { fontSize: 15, color: "#C8D8F0", textAlign: "center" },
  // FOOTER
  footer: {
    borderTop: "1px solid rgba(79,195,247,0.12)",
    padding: "40px 24px", textAlign: "center",
  },
  footerInner: { maxWidth: 800, margin: "0 auto" },
  footerLogo: {
    display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12,
  },
  footerTagline: { fontSize: 13, color: "#6888A8", margin: "0 0 8px", letterSpacing: "0.04em" },
  footerCopy: { fontSize: 12, color: "#3A5068" },
 


};

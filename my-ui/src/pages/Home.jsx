import { useState, useEffect, useRef } from "react";

function useIsMobile(bp = 640) {
  const [mobile, setMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < bp
  );
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < bp);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [bp]);
  return mobile;
}

const DATA = {
  phone: "263777881550",
  phoneDisplay: "+263 77 788 1550",
  contact: "Tyrol",
  rate: 93,
};

const steps = [
  { num: "01", title: "Contact", desc: "WhatsApp or call Tyrol directly. We respond immediately." },
  { num: "02", title: "Choose method", desc: "Pay by Cash in Zimbabwe or use EcoCash — your choice." },
  { num: "03", title: "Lock rate", desc: "We confirm the exchange rate. You know exactly what your recipient receives." },
  { num: "04", title: "Delivered", desc: "Funds arrive in India swiftly. Khonapho khonapho." },
];

const trust = [
  { title: "Personal accountability", desc: "Every transfer handled with care. You deal with a real person, not a system." },
  { title: "Competitive rates", desc: "Daily-updated exchange rates. We make sure more reaches your family." },
  { title: "Fast processing", desc: "We don't keep your family waiting. Quick and reliable every time." },
  { title: "Direct access", desc: "WhatsApp Tyrol any time. No hold music. No bots. No queues." },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(20px)",
      transition: `opacity 0.6s ${delay}s ease, transform 0.6s ${delay}s ease`,
    }}>
      {children}
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const mobile = useIsMobile();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, width: "100%", zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: mobile ? "14px 5vw" : "18px 6vw",
      background: scrolled ? "rgba(253,250,247,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
      transition: "background 0.3s",
      boxSizing: "border-box",
    }}>
      <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
          background: "#1A5C35", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="white" strokeWidth="1.2" fill="none" />
            <line x1="7" y1="1" x2="7" y2="13" stroke="white" strokeWidth="1" />
            <ellipse cx="7" cy="7" rx="3" ry="6" stroke="white" strokeWidth="1" fill="none" />
            <line x1="1" y1="7" x2="13" y2="7" stroke="white" strokeWidth="1" />
          </svg>
        </div>
        <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.05rem", fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.3px" }}>
          Chifaz Transfer
        </span>
      </a>

      <div style={{ display: "flex", alignItems: "center", gap: mobile ? 0 : 28 }}>
        {!mobile && ["How it works", "Rates", "Contact"].map(l => (
          <a key={l} href={`#${l.split(" ")[0].toLowerCase()}`}
            style={{ fontSize: "0.82rem", fontWeight: 500, color: "#666", textDecoration: "none" }}>
            {l}
          </a>
        ))}
        <a href={`https://wa.me/${DATA.phone}`} style={{
          background: "#1A5C35", color: "white",
          padding: mobile ? "9px 14px" : "9px 20px",
          borderRadius: 4, marginLeft: mobile ? 0 : 8,
          fontSize: "0.82rem", fontWeight: 600, textDecoration: "none",
        }}>
          {mobile ? "Send →" : "Send money"}
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  const [mounted, setMounted] = useState(false);
  const mobile = useIsMobile();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const show = (delay) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "none" : "translateY(16px)",
    transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
  });

  return (
    <section id="how" style={{
      minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: mobile ? "100px 5vw 60px" : "120px 6vw 80px",
      background: "#FDFAF7",
    }}>
      <div style={{ width: "100%", textAlign: "center" }}>

        <div style={{ ...show(0.05), display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 24 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2EA85A", display: "inline-block", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2EA85A" }}>
            Live & operating
          </span>
        </div>

        <h1 style={{
          ...show(0.18),
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: mobile ? "2.6rem" : "clamp(2.8rem, 6vw, 4.2rem)",
          fontWeight: 800, lineHeight: 1.08,
          color: "#111", marginBottom: 20, letterSpacing: "-0.02em",
        }}>
          Send money<br />
          <span style={{ color: "#B87000", fontStyle: "italic" }}>to India</span>
        </h1>

        <p style={{ ...show(0.3), fontSize: "0.95rem", color: "#777", lineHeight: 1.8, maxWidth: 400, margin: "0 auto 36px" }}>
          From Zimbabwe and South Africa — fast, personal, transparent. Direct to your family.
        </p>

        <div style={{ ...show(0.42), display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 36, flexWrap: "wrap" }}>
          {["🇿🇦 South Africa", "🇿🇼 Zimbabwe"].map(c => (
            <span key={c} style={{ fontSize: "0.82rem", fontWeight: 500, color: "#444", padding: "6px 12px", background: "white", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 4 }}>{c}</span>
          ))}
          <span style={{ color: "#B87000" }}>→</span>
          <span style={{ fontSize: "0.82rem", fontWeight: 500, color: "#444", padding: "6px 12px", background: "white", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 4 }}>🇮🇳 India</span>
        </div>

        <div style={{
          ...show(0.52),
          display: "flex",
          flexDirection: mobile ? "column" : "row",
          background: "white", border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: 8, overflow: "hidden",
          boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
          marginBottom: 36,
          width: "100%",
        }}>
          {[
            { label: "Today's rate", value: `$1 = ${DATA.rate} ₹`, accent: "#B87000" },
            { label: "Cash charge", value: "5%", accent: "#1A5C35" },
            { label: "EcoCash charge", value: "6%", accent: "#1A5C35" },
          ].map((item, i) => (
            <div key={i} style={{
              flex: 1,
              padding: mobile ? "16px 20px" : "22px 28px",
              textAlign: "center",
              borderBottom: mobile && i < 2 ? "1px solid rgba(0,0,0,0.06)" : "none",
              borderRight: !mobile && i < 2 ? "1px solid rgba(0,0,0,0.06)" : "none",
            }}>
              <div style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", marginBottom: 5 }}>{item.label}</div>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: mobile ? "1.3rem" : "1.55rem", fontWeight: 800, color: item.accent, lineHeight: 1 }}>{item.value}</div>
            </div>
          ))}
        </div>

        <div style={{ ...show(0.64), display: "flex", gap: 10, justifyContent: "center", flexDirection: mobile ? "column" : "row", flexWrap: "wrap" }}>
          <a href={`https://wa.me/${DATA.phone}`} style={{
            background: "#1A5C35", color: "white",
            padding: "13px 28px", borderRadius: 4,
            fontWeight: 600, fontSize: "0.88rem", textDecoration: "none", textAlign: "center",
          }}>
            WhatsApp us now
          </a>
          <a href="#rates" style={{
            background: "transparent", color: "#444",
            border: "1px solid rgba(0,0,0,0.12)",
            padding: "13px 28px", borderRadius: 4,
            fontWeight: 500, fontSize: "0.88rem", textDecoration: "none", textAlign: "center",
          }}>
            See rates →
          </a>
        </div>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }`}</style>
    </section>
  );
}

function HowItWorks() {
  const mobile = useIsMobile();
  return (
    <section style={{ background: "#F7F3EE", padding: mobile ? "70px 5vw" : "100px 6vw" }}>
      <div style={{ width: "100%" }}>
        <FadeIn>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B87000", marginBottom: 10 }}>Simple process</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", marginBottom: 44, letterSpacing: "-0.02em" }}>
            Four steps to send
          </h2>
        </FadeIn>

        <div style={{
          display: "grid",
          gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4, 1fr)",
          gap: mobile ? 12 : 2,
        }}>
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{
                background: "white",
                padding: mobile ? "22px 18px" : "32px 26px",
                borderRight: !mobile && i < steps.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
                borderRadius: mobile ? 6 : 0,
                height: "100%", boxSizing: "border-box",
              }}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "2rem", fontWeight: 800, color: "rgba(184,112,0,0.15)", lineHeight: 1, marginBottom: 16 }}>{s.num}</div>
                <h3 style={{ fontSize: "0.88rem", fontWeight: 700, color: "#111", marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: "0.78rem", color: "#888", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Rates() {
  const [amount, setAmount] = useState(100);
  const mobile = useIsMobile();
  const fee = amount * 0.05;
  const received = Math.round((amount - fee) * DATA.rate);

  return (
    <section id="rates" style={{ background: "#FDFAF7", padding: mobile ? "70px 5vw" : "100px 6vw" }}>
      <div style={{ width: "100%" }}>
        <FadeIn>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B87000", marginBottom: 10 }}>Pricing</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", marginBottom: 8, letterSpacing: "-0.02em" }}>
            Transparent rates
          </h2>
          <p style={{ fontSize: "0.88rem", color: "#888", marginBottom: 44 }}>No hidden fees. What you see is what your family gets.</p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)", gap: 16 }}>
          <FadeIn>
            <div style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 8, padding: mobile ? "28px 22px" : "36px 32px" }}>
              <div style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", marginBottom: 6 }}>
                ZW + ZA → IN Exchange rate
              </div>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: mobile ? "2rem" : "2.4rem", fontWeight: 800, color: "#B87000", marginBottom: 24 }}>
                $1 = {DATA.rate} ₹
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[{ label: "Cash", val: "5%" }, { label: "EcoCash", val: "6%" }].map(c => (
                  <div key={c.label} style={{ background: "#F4F9F1", border: "1px solid rgba(26,92,53,0.12)", borderRadius: 4, padding: "10px 14px" }}>
                    <div style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2EA85A", marginBottom: 3 }}>{c.label}</div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1A5C35" }}>{c.val} charge</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 8, padding: mobile ? "28px 22px" : "36px 32px" }}>
              <div style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", marginBottom: 18 }}>Calculator</div>
              <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, color: "#999", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
                You send (USD $)
              </label>
              <input
                type="number" min="1" value={amount}
                onChange={e => setAmount(Math.max(1, Number(e.target.value) || 0))}
                style={{
                  width: "100%", padding: "11px 14px",
                  border: "1.5px solid rgba(0,0,0,0.1)", borderRadius: 4,
                  fontFamily: "inherit", fontSize: "1rem", fontWeight: 600, color: "#111",
                  background: "#FDFAF7", outline: "none", boxSizing: "border-box",
                }}
              />
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(0,0,0,0.06)", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <div style={{ fontSize: "0.7rem", color: "#aaa", marginBottom: 4 }}>Recipient receives (cash / 5%)</div>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: mobile ? "1.7rem" : "2rem", fontWeight: 800, color: "#1A5C35" }}>
                    ₹{received.toLocaleString("en-IN")}
                  </div>
                </div>
                <div style={{ fontSize: "0.72rem", color: "#ccc" }}>Rate: {DATA.rate} ₹/$</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function WhyChifaz() {
  const mobile = useIsMobile();
  return (
    <section id="why" style={{ background: "#F7F3EE", padding: mobile ? "70px 5vw" : "100px 6vw" }}>
      <div style={{ width: "100%" }}>
        <FadeIn>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B87000", marginBottom: 10 }}>Why us</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#111", marginBottom: 44, letterSpacing: "-0.02em" }}>
            Built on trust
          </h2>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 12 }}>
          {trust.map((t, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 6, padding: mobile ? "20px 16px" : "28px 22px", height: "100%", boxSizing: "border-box" }}>
                <div style={{ width: 24, height: 3, background: "#B87000", borderRadius: 2, marginBottom: 14 }} />
                <h4 style={{ fontSize: mobile ? "0.82rem" : "0.88rem", fontWeight: 700, color: "#111", marginBottom: 7 }}>{t.title}</h4>
                <p style={{ fontSize: "0.78rem", color: "#888", lineHeight: 1.65 }}>{t.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const mobile = useIsMobile();
  return (
    <section id="contact" style={{ background: "#111D16", padding: mobile ? "70px 5vw" : "100px 6vw" }}>
      <div style={{ width: "100%", textAlign: "center" }}>
        <FadeIn>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 10 }}>Get started</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "white", marginBottom: 12, letterSpacing: "-0.02em" }}>
            Ready to send?
          </h2>
          <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 44 }}>
            One message is all it takes. We'll have your money moving within minutes.
          </p>

          <div style={{
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8, padding: mobile ? "28px 20px" : "36px", marginBottom: 24,
            width: "100%", boxSizing: "border-box",
          }}>
            <div style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 10 }}>
              Call or WhatsApp
            </div>
            <a href={`https://wa.me/${DATA.phone}`} style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: mobile ? "1.6rem" : "2rem",
              fontWeight: 800, color: "#E8B84B", textDecoration: "none", display: "block", marginBottom: 8,
            }}>
              {DATA.phoneDisplay}
            </a>
            <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>
              Contact: <strong style={{ color: "rgba(255,255,255,0.65)" }}>{DATA.contact}</strong> — Cash payments (ZIM)
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 36, flexWrap: "wrap" }}>
            {[
              { dot: "#4de88a", text: "Mon – Sat: Half day" },
              { dot: "#f07070", text: "Sunday: Closed" },
            ].map(h => (
              <div key={h.text} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4, padding: "9px 14px" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: h.dot, display: "inline-block", flexShrink: 0 }} />
                <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)" }}>{h.text}</span>
              </div>
            ))}
          </div>

          <a href={`https://wa.me/${DATA.phone}`} style={{
            display: "inline-block", background: "white", color: "#1A5C35",
            padding: mobile ? "13px 32px" : "15px 44px", borderRadius: 4,
            fontWeight: 700, fontSize: "0.88rem", textDecoration: "none",
          }}>
            Start your transfer
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  const mobile = useIsMobile();
  return (
    <footer style={{
      background: "#080F0A", padding: "20px 5vw",
      display: "flex", alignItems: "center",
      justifyContent: mobile ? "center" : "space-between",
      flexDirection: mobile ? "column" : "row",
      gap: 6, textAlign: mobile ? "center" : "left",
      width: "100%", boxSizing: "border-box",
    }}>
      <div>
        <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontSize: "0.95rem", color: "#E8B84B" }}>Chifaz Transfer</span>
        <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.25)", marginLeft: 14 }}>© 2026 · ZIM & SA → India</span>
      </div>
      <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.2)" }}>
        Powered by <strong style={{ color: "rgba(255,255,255,0.35)" }}>Controlled Motives</strong>
      </div>
    </footer>
  );
}

export default function ChifazTransfer() {
  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: "#FDFAF7", width: "100%" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,800;1,800&family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <a href={`https://wa.me/${DATA.phone}`} style={{
        position: "fixed", bottom: 22, right: 20, zIndex: 200,
        background: "#25D366", color: "white",
        width: 50, height: 50, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.3rem", textDecoration: "none",
        boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
      }} title="WhatsApp Us">
        💬
      </a>

      <Nav />
      <Hero />
      <HowItWorks />
      <Rates />
      <WhyChifaz />
      <Contact />
      <Footer />
    </div>
  );
}
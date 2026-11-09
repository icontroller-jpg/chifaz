import { useState, useEffect, useRef } from "react";

/* ───────────── Palette (from the colour reference) ───────────── */
const C = {
  cyan: "#00B2DB",
  sky: "#0090BF",
  blue: "#0172B0",
  royal: "#023C85",
  night: "#03045A",
  bg: "#EEF3F9",
  ink: "#071033",
  mute: "#5B6785",
  gold: "#F3C969",
};

const DATA = {
  phone: "263777881550",
  phoneDisplay: "+263 777 881 550",
  contact: "Tyrol",
  rate: 96.5,
  fees: { cash: 5, ecocash: 6 },
};

const FONT = `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", "Segoe UI", system-ui, sans-serif`;

const steps = [
  { num: "01", title: "Contact", desc: "WhatsApp or call Tyrol directly. We respond immediately." },
  { num: "02", title: "Choose method", desc: "Pay by cash in Zimbabwe or use EcoCash, your choice." },
  { num: "03", title: "Lock rate", desc: "We confirm the exchange rate, so you know exactly what your recipient receives." },
  { num: "04", title: "Delivered", desc: "Funds arrive in India swiftly. Khonapho khonapho." },
];

const trust = [
  { title: "Personal accountability", desc: "Every transfer is handled with care. You deal with a real person, not a system." },
  { title: "Competitive rates", desc: "Daily-updated exchange rates, so more reaches your family." },
  { title: "Fast processing", desc: "We don't keep your family waiting. Quick and reliable every time." },
  { title: "Direct access", desc: "WhatsApp Tyrol any time. No hold music, no bots, no queues." },
];

/* ───────────── Hooks ───────────── */
function useIsMobile(bp = 760) {
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

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(18px)",
        transition: `opacity .6s ${delay}s ease, transform .6s ${delay}s ease`,
        height: "100%",
      }}
    >
      {children}
    </div>
  );
}

/* ───────────── Global glossy styles ───────────── */
const css = `
.cz *{box-sizing:border-box}
.cz a:focus-visible,.cz button:focus-visible,.cz input:focus-visible{outline:3px solid ${C.cyan};outline-offset:3px}
.cz-glass{
  background:linear-gradient(180deg,rgba(255,255,255,.88),rgba(255,255,255,.58));
  border:1px solid rgba(255,255,255,.75);
  box-shadow:0 1px 0 rgba(255,255,255,.95) inset,0 -1px 0 rgba(2,60,133,.04) inset,0 14px 36px rgba(2,60,133,.12),0 2px 6px rgba(2,60,133,.06);
  backdrop-filter:blur(22px) saturate(180%);
  -webkit-backdrop-filter:blur(22px) saturate(180%);
}
.cz-glass-dark{
  background:linear-gradient(180deg,rgba(255,255,255,.16),rgba(255,255,255,.05));
  border:1px solid rgba(255,255,255,.22);
  box-shadow:0 1px 0 rgba(255,255,255,.35) inset,0 18px 40px rgba(0,0,20,.35);
  backdrop-filter:blur(24px) saturate(160%);
  -webkit-backdrop-filter:blur(24px) saturate(160%);
}
.cz-btn{
  position:relative;overflow:hidden;display:inline-flex;align-items:center;justify-content:center;
  padding:14px 28px;border-radius:999px;border:0;cursor:pointer;font:600 15px ${FONT};text-decoration:none;
  color:#fff;letter-spacing:-.01em;
  background:linear-gradient(180deg,#27CDEF 0%,${C.blue} 52%,${C.royal} 100%);
  box-shadow:0 1px 0 rgba(255,255,255,.6) inset,0 -2px 4px rgba(3,4,90,.35) inset,0 8px 20px rgba(1,114,176,.38);
  transition:transform .18s ease,box-shadow .18s ease,filter .18s ease;
}
.cz-btn::before{content:"";position:absolute;left:6%;right:6%;top:2px;height:48%;border-radius:999px;
  background:linear-gradient(180deg,rgba(255,255,255,.55),rgba(255,255,255,.04));pointer-events:none}
.cz-btn:hover{transform:translateY(-1px);filter:brightness(1.06)}
.cz-btn:active{transform:translateY(1px) scale(.99)}
.cz-btn.dark{background:linear-gradient(180deg,#1b2a8a 0%,${C.royal} 45%,${C.night} 100%)}
.cz-btn.light{color:${C.royal};background:linear-gradient(180deg,#fff,#dbe9f6);
  box-shadow:0 1px 0 #fff inset,0 -2px 4px rgba(2,60,133,.12) inset,0 8px 20px rgba(0,0,30,.25)}
.cz-btn.light::before{background:linear-gradient(180deg,rgba(255,255,255,.9),rgba(255,255,255,0))}
.cz-btn.ghost{color:${C.royal};background:rgba(255,255,255,.55);border:1px solid rgba(255,255,255,.9);
  box-shadow:0 1px 0 #fff inset,0 6px 16px rgba(2,60,133,.12);backdrop-filter:blur(14px)}
.cz-btn.ghost::before{display:none}
.cz-input{width:100%;padding:14px 16px;border-radius:14px;border:1px solid rgba(2,60,133,.14);font:600 20px ${FONT};
  color:${C.ink};background:linear-gradient(180deg,#f3f7fc,#fff);box-shadow:0 2px 5px rgba(2,60,133,.08) inset;outline:none}
.cz-seg{display:grid;grid-template-columns:1fr 1fr;gap:4px;padding:4px;border-radius:14px;
  background:rgba(2,60,133,.08);box-shadow:0 1px 3px rgba(2,60,133,.12) inset}
.cz-seg button{border:0;border-radius:11px;padding:10px;font:600 14px ${FONT};color:${C.mute};background:transparent;cursor:pointer;transition:all .2s}
.cz-seg button[aria-pressed="true"]{color:${C.royal};background:linear-gradient(180deg,#fff,#eef4fb);
  box-shadow:0 1px 0 #fff inset,0 3px 8px rgba(2,60,133,.18)}
@keyframes czpulse{0%,100%{opacity:1}50%{opacity:.35}}
@keyframes czfloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@media (prefers-reduced-motion:reduce){.cz *{animation:none!important;transition:none!important}}
`;

/* ───────────── Nav ───────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const mobile = useIsMobile();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const linkColor = scrolled ? C.mute : "rgba(255,255,255,.85)";

  return (
    <nav
      className={scrolled ? "cz-glass" : ""}
      style={{
        position: "fixed", top: 0, left: 0, width: "100%", zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: mobile ? "12px 5vw" : "14px 6vw",
        borderRadius: 0, border: scrolled ? undefined : "none",
        transition: "background .3s",
      }}
    >
      <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{
          width: 32, height: 32, borderRadius: 10, display: "grid", placeItems: "center",
          background: `linear-gradient(180deg,#27CDEF,${C.royal})`,
          boxShadow: "0 1px 0 rgba(255,255,255,.6) inset,0 4px 10px rgba(1,114,176,.4)",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
        <span style={{ fontWeight: 700, fontSize: "1.05rem", letterSpacing: "-.02em", color: scrolled ? C.ink : "#fff" }}>
          Chifaz Transfer
        </span>
      </a>

      <div style={{ display: "flex", alignItems: "center", gap: mobile ? 0 : 28 }}>
        {!mobile &&
          [["How it works", "#how"], ["Rates", "#rates"], ["Contact", "#contact"]].map(([l, h]) => (
            <a key={l} href={h} style={{ fontSize: ".9rem", fontWeight: 500, color: linkColor, textDecoration: "none" }}>
              {l}
            </a>
          ))}
        <a href={`https://wa.me/${DATA.phone}`} className="cz-btn" style={{ padding: mobile ? "9px 18px" : "10px 22px", fontSize: 14 }}>
          Send money
        </a>
      </div>
    </nav>
  );
}

/* ───────────── Hero case illustration ───────────── */
function Case({ size }) {
  return (
    <svg
      viewBox="0 0 300 290" width={size} height={size * (290 / 300)} role="img"
      aria-label="Case holding Zimbabwe and India cards with a globe"
      style={{ filter: "drop-shadow(0 28px 28px rgba(3,4,90,.35))", animation: "czfloat 6s ease-in-out infinite", flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="cz-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#27CDEF" />
          <stop offset=".5" stopColor={C.blue} />
          <stop offset="1" stopColor={C.royal} />
        </linearGradient>
        <linearGradient id="cz-gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".6" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="cz-globe" cx=".35" cy=".3" r=".9">
          <stop offset="0" stopColor="#3a58d6" />
          <stop offset=".6" stopColor={C.royal} />
          <stop offset="1" stopColor={C.night} />
        </radialGradient>
      </defs>
      <path d="M105 94V76a14 14 0 0 1 14-14h62a14 14 0 0 1 14 14v18" fill="none" stroke="#9fb7d6" strokeWidth="12" strokeLinecap="round" />
      {/* Zimbabwe card */}
      <g transform="rotate(-9 110 110)">
        <rect x="52" y="30" width="100" height="70" rx="9" fill="#fff" />
        {["#319b3a", "#ffd200", "#d40000", "#000", "#d40000", "#ffd200", "#319b3a"].map((f, i) => (
          <rect key={i} x="52" y={30 + i * 10} width="100" height="10" fill={f} clipPath="inset(0 round 9px)" />
        ))}
        <path d="M52 30l46 35-46 35z" fill="#fff" />
      </g>
      {/* India card */}
      <g transform="rotate(8 190 110)">
        <rect x="150" y="26" width="100" height="70" rx="9" fill="#fff" />
        <path d="M159 26h82a9 9 0 0 1 9 9v14H150V35a9 9 0 0 1 9-9z" fill="#ff9933" />
        <path d="M150 72h100v15a9 9 0 0 1-9 9h-82a9 9 0 0 1-9-9z" fill="#138808" />
        <circle cx="200" cy="61" r="9" fill="none" stroke="#000a8c" strokeWidth="2" />
      </g>
      {/* body */}
      <rect x="20" y="94" width="260" height="170" rx="26" fill="url(#cz-body)" />
      <rect x="26" y="98" width="248" height="70" rx="22" fill="url(#cz-gloss)" />
      <rect x="20.5" y="94.5" width="259" height="169" rx="26" fill="none" stroke="#fff" strokeOpacity=".35" />
      {/* globe */}
      <circle cx="150" cy="190" r="52" fill="url(#cz-globe)" />
      <g fill="none" stroke="#9be8f7" strokeOpacity=".8" strokeWidth="1.6">
        <ellipse cx="150" cy="190" rx="22" ry="52" />
        <path d="M98 190h104M108 162h84M108 218h84" />
      </g>
      <ellipse cx="132" cy="162" rx="22" ry="12" fill="#fff" opacity=".28" transform="rotate(-25 132 162)" />
      <circle cx="150" cy="190" r="52" fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth="1.5" />
    </svg>
  );
}

/* ───────────── Hero (split headline) ───────────── */
function Hero() {
  const [mounted, setMounted] = useState(false);
  const mobile = useIsMobile();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const show = (d) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "none" : "translateY(16px)",
    transition: `opacity .7s ${d}s ease, transform .7s ${d}s ease`,
  });

  const h1 = {
    fontSize: mobile ? "2.3rem" : "clamp(2.4rem,4.6vw,3.9rem)",
    fontWeight: 700, letterSpacing: "-.04em", lineHeight: 1.02,
    color: C.ink, margin: 0,
  };

  const feats = [
    { v: `$1 = ₹${DATA.rate}`, l: "Today's exchange rate", c: C.blue },
    { v: `${DATA.fees.cash}%`, l: "Charge when you pay cash", c: C.royal },
    { v: `${DATA.fees.ecocash}%`, l: "Charge when you pay by EcoCash", c: C.royal },
    { v: "WhatsApp", l: "Personal support, every transfer", c: C.royal },
  ];

  return (
    <section style={{ position: "relative", background: C.bg, overflow: "hidden" }}>
      {/* sky */}
      <div style={{
        position: "absolute", inset: "0 0 auto 0", height: mobile ? 400 : 500,
        background: `linear-gradient(180deg,${C.night} 0%,${C.royal} 28%,${C.blue} 62%,${C.sky} 82%,${C.cyan} 100%)`,
      }}>
        <div style={{ position: "absolute", left: "50%", top: -240, width: 900, height: 900, marginLeft: -450, borderRadius: "50%",
          background: "radial-gradient(closest-side,rgba(0,178,219,.4),transparent)" }} />
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true"
          style={{ position: "absolute", bottom: -1, left: 0, width: "100%", height: mobile ? 70 : 120, display: "block" }}>
          <path d="M0 50C240 110 480 120 720 78S1200 0 1440 56V120H0Z" fill={C.bg} />
        </svg>
      </div>

      <div style={{ position: "relative", maxWidth: 1180, margin: "0 auto", padding: mobile ? "96px 5vw 0" : "120px 6vw 0" }}>
        <div style={{
          ...show(0.05),
          display: "grid",
          gridTemplateColumns: mobile ? "1fr" : "1fr auto 1fr",
          alignItems: "center", gap: mobile ? 8 : 24, justifyItems: "center",
        }}>
          <h1 style={{ ...h1, textAlign: mobile ? "center" : "right", justifySelf: mobile ? "center" : "end", marginTop: mobile ? 0 : 120, order: mobile ? 2 : 1 }}>
            Send from<br />Zimbabwe.
          </h1>
          <div style={{ order: mobile ? 1 : 2 }}><Case size={mobile ? 220 : 300} /></div>
          <h1 style={{ ...h1, textAlign: mobile ? "center" : "left", justifySelf: mobile ? "center" : "start", marginTop: mobile ? 0 : 120, order: 3 }}>
            Received<br />in India.
          </h1>
        </div>

        <div style={{ ...show(0.25), textAlign: "center", padding: "34px 0 54px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 18, padding: "6px 14px", borderRadius: 999 }} className="cz-glass">
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#1fc46a", animation: "czpulse 2s infinite" }} />
            <span style={{ fontSize: ".82rem", fontWeight: 600, color: C.royal }}>Live and operating</span>
          </div>
          <p style={{ maxWidth: 480, margin: "0 auto 26px", color: C.mute, fontSize: "1.05rem", lineHeight: 1.6 }}>
            Fast, secure and reliable transfers from Zimbabwe and South Africa, direct to your family in India.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`https://wa.me/${DATA.phone}`} className="cz-btn dark">WhatsApp us now</a>
            <a href="#rates" className="cz-btn ghost">See rates</a>
          </div>
        </div>

        <div className="cz-glass" style={{
          ...show(0.4),
          display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4,1fr)",
          borderRadius: 24, overflow: "hidden", transform: mounted ? "translateY(0)" : "translateY(16px)",
        }}>
          {feats.map((f, i) => (
            <div key={f.l} style={{
              padding: mobile ? "18px 16px" : "26px 28px",
              borderRight: (mobile ? i % 2 === 0 : i < 3) ? "1px solid rgba(2,60,133,.08)" : "none",
              borderBottom: mobile && i < 2 ? "1px solid rgba(2,60,133,.08)" : "none",
            }}>
              <div style={{ fontSize: mobile ? "1.3rem" : "1.7rem", fontWeight: 700, letterSpacing: "-.03em", color: f.c }}>{f.v}</div>
              <div style={{ fontSize: ".8rem", color: C.mute, marginTop: 4, lineHeight: 1.4 }}>{f.l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: mobile ? 64 : 96 }} />
    </section>
  );
}

/* ───────────── Section wrapper ───────────── */
function Section({ id, children, bg, pad }) {
  const mobile = useIsMobile();
  return (
    <section id={id} style={{ background: bg || "transparent", padding: mobile ? "56px 5vw" : pad || "88px 6vw" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

const h2 = {
  fontSize: "clamp(1.9rem,3.6vw,2.8rem)", fontWeight: 700, letterSpacing: "-.035em",
  lineHeight: 1.08, color: C.ink, margin: "0 0 12px",
};

/* ───────────── How it works ───────────── */
function HowItWorks() {
  const mobile = useIsMobile();
  return (
    <Section id="how">
      <FadeIn>
        <h2 style={h2}>Four steps to send.</h2>
        <p style={{ color: C.mute, margin: "0 0 40px", fontSize: "1.02rem" }}>No branch visits. No paperwork queues.</p>
      </FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4,1fr)", gap: mobile ? 12 : 16 }}>
        {steps.map((s, i) => (
          <FadeIn key={s.num} delay={i * 0.08}>
            <div className="cz-glass" style={{ borderRadius: 22, padding: mobile ? "20px 16px" : "28px 24px", height: "100%" }}>
              <div style={{
                width: 38, height: 38, borderRadius: 12, display: "grid", placeItems: "center", marginBottom: 18,
                fontWeight: 700, fontSize: ".9rem", color: "#fff",
                background: `linear-gradient(180deg,#27CDEF,${C.royal})`,
                boxShadow: "0 1px 0 rgba(255,255,255,.55) inset,0 6px 14px rgba(1,114,176,.35)",
              }}>{s.num}</div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, letterSpacing: "-.02em", color: C.ink, margin: "0 0 6px" }}>{s.title}</h3>
              <p style={{ fontSize: ".88rem", color: C.mute, lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/* ───────────── Rates + calculator ───────────── */
function Rates() {
  const [amount, setAmount] = useState(100);
  const [method, setMethod] = useState("cash");
  const mobile = useIsMobile();
  const pct = DATA.fees[method];
  const fee = amount * (pct / 100);
  const received = Math.round((amount - fee) * DATA.rate);

  return (
    <Section id="rates" bg={`linear-gradient(180deg,${C.bg},#E2ECF7)`}>
      <FadeIn>
        <h2 style={h2}>Transparent rates.</h2>
        <p style={{ color: C.mute, margin: "0 0 40px", fontSize: "1.02rem" }}>No hidden fees. What you see is what your family gets.</p>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 18 }}>
        <FadeIn>
          <div style={{
            borderRadius: 28, padding: mobile ? "28px 22px" : "40px 36px", height: "100%", color: "#fff", position: "relative", overflow: "hidden",
            background: `linear-gradient(160deg,${C.blue},${C.royal} 55%,${C.night})`,
            boxShadow: "0 1px 0 rgba(255,255,255,.35) inset,0 24px 50px rgba(3,4,90,.3)",
          }}>
            <div style={{ position: "absolute", right: -80, top: -80, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(closest-side,rgba(0,178,219,.55),transparent)" }} />
            <div style={{ position: "relative" }}>
              <div style={{ fontSize: ".9rem", color: "rgba(255,255,255,.7)", marginBottom: 8 }}>Zimbabwe and South Africa to India</div>
              <div style={{ fontSize: mobile ? "2.4rem" : "3.2rem", fontWeight: 700, letterSpacing: "-.04em", marginBottom: 26 }}>
                $1 = <span style={{ color: C.gold }}>₹{DATA.rate}</span>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[["Cash", DATA.fees.cash], ["EcoCash", DATA.fees.ecocash]].map(([l, v]) => (
                  <div key={l} className="cz-glass-dark" style={{ borderRadius: 16, padding: "12px 18px" }}>
                    <div style={{ fontSize: ".78rem", color: "rgba(255,255,255,.7)" }}>{l}</div>
                    <div style={{ fontSize: "1.15rem", fontWeight: 700 }}>{v}% charge</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="cz-glass" style={{ borderRadius: 28, padding: mobile ? "28px 22px" : "36px 34px", height: "100%" }}>
            <label htmlFor="cz-amt" style={{ display: "block", fontSize: ".85rem", fontWeight: 600, color: C.mute, marginBottom: 8 }}>You send (USD)</label>
            <input id="cz-amt" className="cz-input" type="number" min="1" inputMode="decimal" value={amount}
              onChange={(e) => setAmount(Math.max(0, Number(e.target.value) || 0))} />

            <div style={{ fontSize: ".85rem", fontWeight: 600, color: C.mute, margin: "18px 0 8px" }}>Pay with</div>
            <div className="cz-seg" role="group" aria-label="Payment method">
              <button type="button" aria-pressed={method === "cash"} onClick={() => setMethod("cash")}>Cash · {DATA.fees.cash}%</button>
              <button type="button" aria-pressed={method === "ecocash"} onClick={() => setMethod("ecocash")}>EcoCash · {DATA.fees.ecocash}%</button>
            </div>

            <div style={{ marginTop: 22, paddingTop: 20, borderTop: "1px solid rgba(2,60,133,.1)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".88rem", color: C.mute, marginBottom: 6 }}>
                <span>Service charge</span><span>${fee.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontSize: ".9rem", color: C.mute }}>Recipient receives</span>
                <span style={{ fontSize: mobile ? "2rem" : "2.4rem", fontWeight: 700, letterSpacing: "-.04em", color: C.royal }}>
                  ₹{received.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
            <a className="cz-btn" style={{ width: "100%", marginTop: 20 }}
              href={`https://wa.me/${DATA.phone}?text=${encodeURIComponent(`Hi Chifaz, I want to send $${amount} to India (${method === "cash" ? "cash" : "EcoCash"}).`)}`}>
              Continue on WhatsApp
            </a>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

/* ───────────── Why Chifaz ───────────── */
function WhyChifaz() {
  const mobile = useIsMobile();
  return (
    <Section id="why">
      <FadeIn>
        <h2 style={h2}>Built on trust.</h2>
        <p style={{ color: C.mute, margin: "0 0 40px", fontSize: "1.02rem" }}>A real person handles every transfer, start to finish.</p>
      </FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4,1fr)", gap: mobile ? 12 : 16 }}>
        {trust.map((t, i) => (
          <FadeIn key={t.title} delay={i * 0.08}>
            <div className="cz-glass" style={{ borderRadius: 22, padding: mobile ? "20px 16px" : "26px 22px", height: "100%" }}>
              <div style={{ width: 28, height: 4, borderRadius: 4, marginBottom: 16, background: `linear-gradient(90deg,${C.cyan},${C.royal})` }} />
              <h3 style={{ fontSize: mobile ? ".95rem" : "1.02rem", fontWeight: 700, letterSpacing: "-.02em", color: C.ink, margin: "0 0 6px" }}>{t.title}</h3>
              <p style={{ fontSize: ".86rem", color: C.mute, lineHeight: 1.6, margin: 0 }}>{t.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/* ───────────── Contact ───────────── */
function Contact() {
  const mobile = useIsMobile();
  return (
    <section id="contact" style={{
      position: "relative", overflow: "hidden", padding: mobile ? "64px 5vw" : "100px 6vw",
      background: `linear-gradient(180deg,${C.royal} 0%,${C.night} 100%)`,
    }}>
      <div style={{ position: "absolute", left: "50%", top: -260, width: 800, height: 800, marginLeft: -400, borderRadius: "50%", background: "radial-gradient(closest-side,rgba(0,178,219,.35),transparent)" }} />
      <div style={{ position: "relative", maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <h2 style={{ ...h2, color: "#fff" }}>Ready to send?</h2>
          <p style={{ color: "rgba(255,255,255,.65)", lineHeight: 1.7, margin: "0 0 36px" }}>
            One message is all it takes. We'll have your money moving within minutes.
          </p>

          <div className="cz-glass-dark" style={{ borderRadius: 26, padding: mobile ? "26px 18px" : "34px", marginBottom: 20 }}>
            <div style={{ fontSize: ".85rem", color: "rgba(255,255,255,.6)", marginBottom: 8 }}>Call or WhatsApp</div>
            <a href={`https://wa.me/${DATA.phone}`} style={{ display: "block", fontSize: mobile ? "1.7rem" : "2.2rem", fontWeight: 700, letterSpacing: "-.03em", color: C.gold, textDecoration: "none", marginBottom: 6 }}>
              {DATA.phoneDisplay}
            </a>
            <div style={{ fontSize: ".85rem", color: "rgba(255,255,255,.6)" }}>
              Contact <strong style={{ color: "#fff" }}>{DATA.contact}</strong> for cash payments in Zimbabwe
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
            {[["#4de88a", "Mon to Sat: half day"], ["#f07070", "Sunday: closed"]].map(([c, t]) => (
              <div key={t} className="cz-glass-dark" style={{ display: "flex", alignItems: "center", gap: 8, borderRadius: 999, padding: "8px 16px" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: c }} />
                <span style={{ fontSize: ".85rem", color: "rgba(255,255,255,.8)" }}>{t}</span>
              </div>
            ))}
          </div>

          <a href={`https://wa.me/${DATA.phone}`} className="cz-btn light" style={{ padding: "16px 44px" }}>Start your transfer</a>
        </FadeIn>
      </div>
    </section>
  );
}

/* ───────────── Footer ───────────── */
function Footer() {
  const mobile = useIsMobile();
  return (
    <footer style={{
      background: "#02032e", padding: "20px 5vw", display: "flex", alignItems: "center",
      justifyContent: mobile ? "center" : "space-between", flexDirection: mobile ? "column" : "row",
      gap: 6, textAlign: mobile ? "center" : "left",
    }}>
      <div>
        <span style={{ fontWeight: 700, fontSize: ".95rem", color: C.gold, letterSpacing: "-.02em" }}>Chifaz Transfer</span>
        <span style={{ fontSize: ".78rem", color: "rgba(255,255,255,.4)", marginLeft: 14 }}>© 2026 · Zimbabwe and South Africa to India</span>
      </div>
      <div style={{ fontSize: ".78rem", color: "rgba(255,255,255,.35)" }}>
        Powered by <strong style={{ color: "rgba(255,255,255,.6)" }}>Controlled Motives</strong>
      </div>
    </footer>
  );
}

/* ───────────── Root ───────────── */
export default function ChifazTransfer() {
  return (
    <div className="cz" style={{ fontFamily: FONT, background: C.bg, width: "100%", color: C.ink, WebkitFontSmoothing: "antialiased" }}>
      <style>{css}</style>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <a
        href={`https://wa.me/${DATA.phone}`} title="WhatsApp us" aria-label="WhatsApp us"
        style={{
          position: "fixed", bottom: 22, right: 20, zIndex: 200, width: 54, height: 54, borderRadius: "50%",
          display: "grid", placeItems: "center", fontSize: "1.35rem", textDecoration: "none", color: "#fff",
          background: "linear-gradient(180deg,#4be58a,#1fa855)",
          boxShadow: "0 1px 0 rgba(255,255,255,.6) inset,0 10px 24px rgba(31,168,85,.45)",
        }}
      >
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
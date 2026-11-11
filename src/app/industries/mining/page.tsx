"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import BrochurePreview from "../../components/BrochurePreview";
import { ArrowRight } from "../../components/Icons";
import OptimizedVideo from "../../components/OptimizedVideo";
import { useContactForm } from "../../components/useContactForm";

const APPLICATIONS = [
  { title: "Slurry Transport", desc: "PFP-RX and bi-metal piping systems engineered for high-velocity abrasive slurries in grinding, classification and flotation circuits." },
  { title: "Tailings & Water Management", desc: "Large-diameter pipe, fittings and valves for tailings distribution, return water systems and process water infrastructure." },
  { title: "Hydrometallurgy & Leaching", desc: "Corrosion-resistant alloy and lined piping for acid leach circuits, SX-EW plants and pressure oxidation systems." },
  { title: "Crushing & Screening", desc: "Wear-resistant pipe and custom fabricated spools for material handling, dust suppression and plant utility systems." },
  { title: "Gas & Reagent Distribution", desc: "Stainless steel, RTP and specialty piping for oxygen, reagent dosing, lime slurry and other process chemical systems." },
  { title: "Critical Minerals Processing", desc: "Specialist piping supply for emerging lithium, rare earth, nickel sulphate and battery materials processing facilities." },
];

const PFV_TABS = [
  {
    id: "pipe", label: "Pipe", image: "/pfv-pipes.jpg",
    specs: [
      { label: "Sizes", value: "½\" – 60\"" },
      { label: "Schedules", value: "All standard, non-standard, and heavy wall" },
      { label: "Manufacturing", value: "Seamless & Welded" },
      { label: "End Types", value: "Plain, Bevelled & Threaded" },
      { label: "Materials", value: "Carbon steel, stainless steel & alloys" },
      { label: "Compliance", value: "All dimensional standards" },
    ],
  },
  {
    id: "fittings", label: "Fittings", image: "/pfv-fittings.jpg",
    specs: [
      { label: "Sizes", value: "½\" – 60\"" },
      { label: "Schedules", value: "All standard, non-standard and heavy wall" },
      { label: "Types", value: "Butt-weld, Socket-weld, Threaded" },
      { label: "Materials", value: "Carbon steel, stainless steel & alloys" },
      { label: "Compliance", value: "All dimensional standards (ASME, MSS, DIN, etc.)" },
    ],
  },
  {
    id: "valves", label: "Valves", image: "/pfv-valve.jpg",
    specs: [
      { label: "Actuation", value: "Manual & Automated Actuation Valves" },
      { label: "Pressure Classes", value: "ANSI 150 – 2500 & API ratings" },
      { label: "Types", value: "Gate, Globe, Check, Ball, Butterfly & Specialty" },
      { label: "End Connections", value: "Flanged, Butt-weld, Socket-weld, Threaded" },
      { label: "Materials", value: "Carbon steel, stainless steel & alloys" },
      { label: "Compliance", value: "API, ASME, ISO & other international standards" },
    ],
  },
  {
    id: "flanges", label: "Flanges", image: "/pfv-flanges.jpg",
    specs: [
      { label: "Sizes", value: "½\" – 60\"" },
      { label: "Pressure Classes", value: "ANSI 150 – 2500 & API ratings" },
      { label: "Types", value: "Weld Neck, Slip-On, Blind, Lap Joint, Socket Weld, Threaded & Orifice" },
      { label: "Facing Options", value: "RF, RTJ, FF, Custom" },
      { label: "Materials", value: "Carbon steel, stainless steel & alloys" },
      { label: "Compliance", value: "ASME, API, DIN & other dimensional standards" },
    ],
  },
  {
    id: "bolting", label: "Bolting", image: "/pfv-bolting.jpg",
    specs: [
      { label: "Sizes", value: "Full range to suit flanges & pressure ratings" },
      { label: "Types", value: "Stud Bolts, Heavy Hex Bolts, Anchor Bolts, Nuts & Washers" },
      { label: "Materials", value: "Carbon steel, B7/L7, stainless steel, duplex & exotic alloys" },
      { label: "Coatings", value: "Black, Zinc, PTFE, Xylan & custom coatings" },
      { label: "Compliance", value: "ASTM, ASME, DIN, ISO standards" },
    ],
  },
  {
    id: "connectors", label: "Connectors & Couplings", image: "/pfv-coupling.jpg",
    specs: [
      { label: "Types", value: "Mechanical couplings, Grooved couplings, Clamp connectors" },
      { label: "Applications", value: "High-pressure, high-temperature, corrosive & abrasive services" },
      { label: "Materials", value: "Carbon steel, stainless steel, duplex & specialised alloys" },
      { label: "Compliance", value: "API, ASME & project-specific standards" },
    ],
  },
];

const RX_CAPABILITIES = [
  { label: "Technology", detail: "Engineered piping solutions in Reinforced Thermoplastic Pipe (RTP), Lined Steel or Co-Extruded Polyethylene (PE)\u2014designed for all applications, with optional wear-resistant layers for superior performance in abrasive environments." },
  { label: "Pipe Sizes", detail: "50mm \u2013 900mm in standard and custom lengths" },
  { label: "Wear Life", detail: "Up to 10x longer service life compared to standard carbon steel in abrasive slurry" },
  { label: "Applications", detail: "Grinding circuits, cyclone feed, tailings, concentrate lines, ash handling and high-wear mineral transport" },
  { label: "Fittings", detail: "Full range of lined elbows, tees, reducers and transition pieces" },
];

const CAPABILITIES = [
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 2v2m8-2v2m-4-2v2M3 12h18M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Shutdown Supply",
    desc: "Strategic stockholding and rapid mobilisation capability for planned shutdowns and emergency breakdowns across remote mine sites.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Wear Expertise",
    desc: "Deep experience in abrasion-resistant materials, wear liner systems and slurry piping design for extending service life.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Remote Site Delivery",
    desc: "Proven logistics capability delivering to remote mine sites across the Pilbara, Goldfields, Queensland and Northern Territory.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Material Selection",
    desc: "Expert guidance on material selection for wear, corrosion and high-temperature applications specific to mineral processing.",
  },
];

export default function MiningPage() {
  const { status, errorMessage, handleSubmit } = useContactForm({ industry: "Mining Sector" });
  const [activeTab, setActiveTab] = useState(0);
  const tab = PFV_TABS[activeTab];
  const appTrackRef = useRef<HTMLDivElement>(null);
  const appOuterRef = useRef<HTMLDivElement>(null);

  // Applications marquee
  useEffect(() => {
    const outer = appOuterRef.current;
    const track = appTrackRef.current;
    if (!outer || !track) return;

    let off = 0;
    let dragging = false;
    let startX = 0;
    let vel = 0;
    let lastX = 0;
    let raf: number;

    function getHalf() { return track!.scrollWidth / 2; }

    function loop() {
      if (!dragging) {
        off += 0.4;
        const h = getHalf();
        if (off >= h) off -= h;
        track!.style.transform = `translateX(-${off}px)`;
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    const onDown = (e: MouseEvent) => { dragging = true; outer!.classList.add("grabbing"); startX = e.clientX; lastX = e.clientX; };
    const onMove = (e: MouseEvent) => {
      if (!dragging) return;
      const h = getHalf();
      off += (startX - e.clientX) * 0.85;
      vel = e.clientX - lastX;
      lastX = e.clientX;
      if (off < 0) off += h;
      if (off >= h) off -= h;
      track!.style.transform = `translateX(-${off}px)`;
      startX = e.clientX;
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      outer!.classList.remove("grabbing");
      const go = () => {
        const h = getHalf();
        if (Math.abs(vel) > 0.3) {
          off -= vel * 0.5;
          vel *= 0.92;
          if (off < 0) off += h;
          if (off >= h) off -= h;
          track!.style.transform = `translateX(-${off}px)`;
          requestAnimationFrame(go);
        } else {
          raf = requestAnimationFrame(loop);
        }
      };
      requestAnimationFrame(go);
    };

    outer.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { cancelAnimationFrame(raf); outer.removeEventListener("mousedown", onDown); window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="ind-hero">
        <OptimizedVideo src="/hero-mining.mp4" className="ind-hero-video" priority />
        <div className="ind-hero-overlay" />
        <div className="ind-hero-content rv">
          <span className="prod-accent-label">Industry</span>
          <h1 className="ind-hero-title">
            Mining <span className="g">Sector</span>
          </h1>
          <p className="ind-hero-blurb">
            Wear-resistant piping, process plant components and shutdown supply
            for Australia&apos;s mining and mineral processing operations.
          </p>
          <Link href="#ind-contact" className="btn-hero-cta">
            Discuss Your Project <ArrowRight />
          </Link>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="ind-overview">
        <div className="ind-container rv">
          <div className="ind-overview-grid">
            <div className="ind-overview-text">
              <span className="prod-accent-label">Overview</span>
              <h2>Built for <span className="g">Tough Conditions</span></h2>
              <p>
                Mining operations demand piping solutions that can withstand
                extreme abrasion, corrosive process chemicals and the relentless
                demands of 24/7 production. PFP supplies the products and
                expertise that keep mineral processing plants running.
              </p>
              <p>
                From iron ore and gold through to lithium, rare earths and base
                metals, we supply wear-resistant piping, corrosion-resistant
                lined systems and the full range of conventional piping
                components. Our Perth warehouse provides strategic stockholding
                for rapid response to both planned shutdowns and emergency
                breakdowns across Western Australia and beyond.
              </p>
            </div>
            <div className="ind-overview-img">
              <Image src="/MINING_LYNAS_RARE_EARTHS.jpg" alt="Mining operations" width={600} height={420} style={{ width: "100%", height: "auto", borderRadius: 12, objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      {/* KEY APPLICATIONS — MARQUEE */}
      <section className="ind-applications">
        <div className="ind-container">
          <div className="ind-apps-header rv">
            <span className="prod-accent-label">Applications</span>
            <h2>Where We <span className="g">Deliver</span></h2>
          </div>
        </div>
        <div className="ind-apps-marquee" ref={appOuterRef}>
          <div className="ind-apps-track" ref={appTrackRef}>
            {[...APPLICATIONS, ...APPLICATIONS].map((app, i) => (
              <div key={i} className="ind-app-card">
                <h3>{app.title}</h3>
                <p>{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PIPE, FITTINGS & VALVES — TABBED */}
      <section className="ind-pfv-section">
        <div className="ind-container">
          <div className="ind-pfv-header rv">
            <span className="prod-accent-label">PFP Solutions</span>
            <h2>Pipe, Fittings &amp; <span className="g">Valves</span></h2>
            <p>Complete range of piping components for mining and mineral processing applications.</p>
          </div>

          <div className="pfv-tabs rv d1">
            {PFV_TABS.map((t, i) => (
              <button
                key={t.id}
                className={`pfv-tab${activeTab === i ? " active" : ""}`}
                onClick={() => setActiveTab(i)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="pfv-panel rv d2">
            <div className="pfv-panel-img">
              <Image src={tab.image} alt={tab.label} width={600} height={400} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div className="pfv-panel-content">
              <h3 className="pfv-panel-title">{tab.label}</h3>
              <div className="pfv-spec-list">
                {tab.specs.map((s, i) => (
                  <div key={i} className="pfv-spec-row">
                    <span className="pfv-spec-label">{s.label}</span>
                    <span className="pfv-spec-value">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link href="/products/pipe-fittings-valves" className="btn-hero-cta">
              View Full Product Range <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* PFP-RX WEAR RESISTANT — BREAKOUT LAYOUT */}
      <section className="ind-rx-section ind-rx-dark">
        <div className="ind-rx-layout">
          <div className="ind-rx-content rv">
            <span className="prod-accent-label">PFP Solutions</span>
            <h2 className="ind-rx-title">PFP-RX <span className="g">Wear Resistant Piping</span></h2>
            <p className="ind-rx-desc">Purpose-built abrasion-resistant piping delivering up to 10x longer service life in the harshest slurry and mineral transport applications.</p>

            <div className="ind-rx-features">
              {RX_CAPABILITIES.map((c) => (
                <div key={c.label} className="ind-rx-feat">
                  <div className="ind-rx-feat-marker" />
                  <div>
                    <h4>{c.label}</h4>
                    <p>{c.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/products/pfp-rx-abrasion" className="btn-hero-cta">
              Explore PFP-RX <ArrowRight />
            </Link>
          </div>
          <div className="ind-rx-image">
            <Image
              src="/pfp-rx-render.webp"
              alt="PFP-RX Wear Resistant Piping"
              width={900}
              height={700}
              style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "right center" }}
            />
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="ind-capabilities">
        <div className="ind-container">
          <div className="ind-caps-header rv">
            <span className="prod-accent-label">Why PFP</span>
            <h2>Our <span className="g">Capabilities</span></h2>
          </div>
          <div className="ind-caps-grid">
            {CAPABILITIES.map((c, i) => (
              <div key={c.title} className={`ind-cap-card rv${i > 0 ? ` d${i}` : ""}`}>
                <div className="ind-cap-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BROCHURE DOWNLOAD */}
      <section className="ind-brochure-section">
        <div className="ind-brochure-layout">
          <div className="ind-brochure-content rv">
            <span className="prod-accent-label dark">Brochure</span>
            <h2 className="ind-brochure-title">Download the Mining &amp; Process Industries <span className="g">Brochure</span>.</h2>
            <p className="ind-brochure-desc">
              A complete guide to PFP&rsquo;s piping solutions for mining, mineral processing and chemical applications —
              including PFP-RX wear resistant piping, reinforced thermoplastic pipe, composite lined systems, and the
              full range of fittings and valves.
            </p>
            <div className="ind-brochure-meta">
              <span className="ind-brochure-meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
                <strong>PDF</strong>
              </span>
              <span className="ind-brochure-meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                <strong>0.9&thinsp;MB</strong>
              </span>
              <span className="ind-brochure-meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Updated 2026
              </span>
            </div>
            <a
              href="/brochures/pfp-mining-process-industries-brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brochure-download"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Brochure
            </a>
          </div>
          <div className="rv d1">
            <BrochurePreview
              pdfHref="/brochures/pfp-mining-process-industries-brochure.pdf"
              coverSrc="/brochures/mining-brochure-cover.jpg"
              coverAlt="PFP Mining & Process Industries Brochure cover"
              hoverLabel="Download PDF"
            />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="ind-contact" id="ind-contact">
        <div className="ind-container">
          <div className="prod-contact-grid">
            <div className="rv">
              <span className="prod-accent-label" style={{ color: "var(--green)" }}>Contact Us</span>
              <h2 className="prod-contact-h2">Discuss Your <span className="g">Mining Project</span></h2>
              <p className="prod-contact-desc">Speak to our team about piping supply for your next mining or mineral processing project.</p>
              <div className="prod-offices">
                <div className="prod-off">
                  <div className="prod-off-city">Perth (HQ)</div>
                  <div className="prod-off-info">Unit 1, 245 Barrington St, Bibra Lake WA 6163<br /><a href="tel:+61863990600">+61 8 6399 0600</a><br /><a href="mailto:salesperth@pfp.com.au">salesperth@pfp.com.au</a></div>
                </div>
                <div className="prod-off">
                  <div className="prod-off-city">Brisbane</div>
                  <div className="prod-off-info"><a href="tel:+61414035166">+61 414 035 166</a><br /><a href="mailto:salesqld@pfp.com.au">salesqld@pfp.com.au</a></div>
                </div>
                <div className="prod-off">
                  <div className="prod-off-city">Melbourne</div>
                  <div className="prod-off-info"><a href="tel:+61414035166">+61 414 035 166</a><br /><a href="mailto:salesvic@pfp.com.au">salesvic@pfp.com.au</a></div>
                </div>
              </div>
            </div>
            <form className="prod-form rv d1" onSubmit={handleSubmit}>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} aria-hidden="true" />
              <div className="crow">
                <div className="cg"><label htmlFor="mf-name">Name</label><input id="mf-name" name="name" type="text" placeholder="Full name" required /></div>
                <div className="cg"><label htmlFor="mf-company">Company</label><input id="mf-company" name="company" type="text" placeholder="Company name" /></div>
              </div>
              <div className="crow">
                <div className="cg"><label htmlFor="mf-email">Email</label><input id="mf-email" name="email" type="email" placeholder="Work email" required /></div>
                <div className="cg"><label htmlFor="mf-phone">Phone</label><input id="mf-phone" name="phone" type="tel" placeholder="+61 8 0000 0000" /></div>
              </div>
              <div className="cg"><label htmlFor="mf-message">Message</label><textarea id="mf-message" name="message" placeholder="Tell us about your project or enquiry..."></textarea></div>
              {status === "error" && errorMessage && (
                <div role="alert" style={{ color: "#c44", fontSize: 13, marginTop: 8 }}>{errorMessage}</div>
              )}
              <button type="submit" className="csubmit" disabled={status === "submitting" || status === "success"} style={status === "success" ? { background: "#15361c" } : {}}>
                {status === "success" ? "✓ Sent — We'll be in touch shortly" : status === "submitting" ? "Sending…" : <>Submit Enquiry <ArrowRight /></>}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { ArrowRight } from "../../components/Icons";
import OptimizedVideo from "../../components/OptimizedVideo";
import { useContactForm } from "../../components/useContactForm";

const APPLICATIONS = [
  { title: "Acid & Caustic Systems", desc: "Exotic alloy and lined piping for sulphuric, hydrochloric, nitric and phosphoric acid circuits, plus caustic soda and bleach systems." },
  { title: "Alumina Refining", desc: "High-temperature caustic-resistant piping for digestion, clarification, precipitation and calcination in Bayer process alumina refineries." },
  { title: "Water Treatment", desc: "Duplex, stainless and non-metallic piping for desalination, industrial water treatment and effluent management systems." },
  { title: "Fertiliser Production", desc: "Corrosion-resistant piping for ammonia, urea, MAP/DAP and superphosphate production across granulation, reactor and storage systems." },
  { title: "Pharmaceutical & Food Grade", desc: "Electropolished stainless steel piping, sanitary fittings and high-purity components for clean-in-place and hygienic process systems." },
  { title: "Heat Transfer Systems", desc: "Shell-and-tube exchangers, plate heat exchangers and replacement tube bundles in exotic alloys for corrosive thermal duty applications." },
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

const CL_CAPABILITIES = [
  { label: "Liner Material", detail: "PTFE (Polytetrafluoroethylene) — chemically inert to virtually all acids, solvents and caustics" },
  { label: "Pipe Sizes", detail: "1\" \u2013 24\" in carbon or stainless outer with PTFE liner" },
  { label: "Applications", detail: "Concentrated acid circuits, solvent lines, caustic systems, chloride environments and high-purity chemical transfer" },
  { label: "Temperature Range", detail: "Continuous service to 200\u00B0C with excellent chemical resistance across the full pH spectrum" },
  { label: "Fittings", detail: "PTFE-lined elbows, tees, reducers, expansion joints and custom fabricated spools" },
];

const HX_CAPABILITIES = [
  { label: "Types", detail: "Shell-and-tube, plate heat exchangers, replacement tube bundles and custom-fabricated units" },
  { label: "Materials", detail: "Stainless steel, duplex, super duplex, titanium, Hastelloy, Inconel and other exotic alloys" },
  { label: "Standards", detail: "ASME VIII, TEMA, AS 1210 and project-specific design codes" },
  { label: "Services", detail: "New build supply, replacement bundles, retubing, thermal design review and material upgrades" },
  { label: "Applications", detail: "Chemical reactors, acid coolers, vent condensers, process heaters and utility heat recovery" },
];

const CAPABILITIES = [
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 2v2m8-2v2m-4-2v2M3 12h18M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Corrosion Engineering",
    desc: "Deep expertise in material selection for aggressive chemical environments — acids, caustics, solvents and high-purity applications.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Quality & Compliance",
    desc: "ISO 9001 certified with full material traceability, PMI testing and compliance with ASME, AS and international standards.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Exotic Alloy Sourcing",
    desc: "Access to Hastelloy, Inconel, titanium, Monel and other specialty alloys through our global mill relationships.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Turnaround Support",
    desc: "Planned maintenance and turnaround supply packages with pre-staging, kitting and expedited delivery to site.",
  },
];

export default function ChemicalProcessingPage() {
  const { status, errorMessage, handleSubmit } = useContactForm({ industry: "Chemical Processing" });
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
        <OptimizedVideo src="/hero-chemical.mp4" className="ind-hero-video" priority noWebm />
        <div className="ind-hero-overlay" />
        <div className="ind-hero-content rv">
          <span className="prod-accent-label">Industry</span>
          <h1 className="ind-hero-title">
            Chemical <span className="g">Processing</span>
          </h1>
          <p className="ind-hero-blurb">
            Corrosion-resistant piping, exotic alloys and specialty components
            for chemical plants, refineries and processing facilities.
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
              <h2>Engineered for <span className="g">Corrosive Environments</span></h2>
              <p>
                Chemical processing facilities operate with some of the most
                aggressive media in industry — concentrated acids, caustic
                solutions, high-temperature solvents and reactive intermediates.
                Piping integrity is not just an operational concern, it&apos;s a
                safety imperative.
              </p>
              <p>
                PFP supplies the specialist materials these environments demand:
                duplex and super duplex stainless steels, Hastelloy, Inconel,
                titanium and other exotic alloys, alongside cost-effective CRA-lined
                and thermoplastic alternatives. We work closely with engineering
                teams to ensure the right material is specified for every service
                condition.
              </p>
            </div>
            <div className="ind-overview-img">
              <Image src="/PROCESSING_QAL_REFINERY.jpg" alt="Chemical processing plant" width={600} height={420} style={{ width: "100%", height: "auto", borderRadius: 12, objectFit: "cover" }} />
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
            <p>Complete range of piping components for chemical and process industry applications.</p>
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

      {/* COMPOSITE LINED — PTFE */}
      <section className="ind-linepipe-section">
        <div className="ind-container">
          <div className="ind-lp-header rv">
            <span className="prod-accent-label">PFP Solutions</span>
            <h2>PTFE Lined <span className="g">Piping Systems</span></h2>
            <p>PTFE-lined steel pipe providing ultimate chemical resistance for the most aggressive acid, solvent and caustic services.</p>
          </div>
          <div className="ind-lp-grid rv d1">
            <div className="ind-lp-img">
              <Image src="/COMPOSITE_LINED_STEEL.jpg" alt="Composite Lined PTFE Pipe" width={600} height={420} style={{ width: "100%", height: "auto", borderRadius: 12, objectFit: "cover" }} />
            </div>
            <div className="ind-lp-content">
              <div className="ind-lp-caps">
                {CL_CAPABILITIES.map((c) => (
                  <div key={c.label} className="ind-lp-cap-row">
                    <span className="ind-lp-cap-label">{c.label}</span>
                    <span className="ind-lp-cap-detail">{c.detail}</span>
                  </div>
                ))}
              </div>
              <Link href="/products/composite-lined" className="btn-hero-cta" style={{ marginTop: 24 }}>
                Explore Composite Lined <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HEAT EXCHANGERS */}
      <section className="ind-feature-light">
        <div className="ind-container">
          <div className="ind-lp-header rv">
            <span className="prod-accent-label">PFP Solutions</span>
            <h2>Heat Exchanger <span className="g">Fabrication</span></h2>
            <p>Custom-built and replacement heat exchangers in exotic alloys for corrosive chemical process and thermal duty applications.</p>
          </div>
          <div className="ind-lp-grid rv d1">
            <div className="ind-lp-img">
              <Image src="/HEAT_EXCHANGERS.jpg" alt="Heat Exchanger Fabrication" width={600} height={420} style={{ width: "100%", height: "100%", maxHeight: 380, borderRadius: 12, objectFit: "cover" }} />
            </div>
            <div className="ind-lp-content">
              <div className="ind-lp-caps">
                {HX_CAPABILITIES.map((c) => (
                  <div key={c.label} className="ind-lp-cap-row">
                    <span className="ind-lp-cap-label">{c.label}</span>
                    <span className="ind-lp-cap-detail">{c.detail}</span>
                  </div>
                ))}
              </div>
              <Link href="/products/heat-exchangers" className="btn-hero-cta" style={{ marginTop: 24 }}>
                Explore Heat Exchangers <ArrowRight />
              </Link>
            </div>
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

      {/* CONTACT */}
      <section className="ind-contact" id="ind-contact">
        <div className="ind-container">
          <div className="prod-contact-grid">
            <div className="rv">
              <span className="prod-accent-label" style={{ color: "var(--green)" }}>Contact Us</span>
              <h2 className="prod-contact-h2">Discuss Your <span className="g">Processing Project</span></h2>
              <p className="prod-contact-desc">Speak to our team about piping supply for your chemical or process industry project.</p>
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
                <div className="cg"><label htmlFor="cpf-name">Name</label><input id="cpf-name" name="name" type="text" placeholder="Full name" required /></div>
                <div className="cg"><label htmlFor="cpf-company">Company</label><input id="cpf-company" name="company" type="text" placeholder="Company name" /></div>
              </div>
              <div className="crow">
                <div className="cg"><label htmlFor="cpf-email">Email</label><input id="cpf-email" name="email" type="email" placeholder="Work email" required /></div>
                <div className="cg"><label htmlFor="cpf-phone">Phone</label><input id="cpf-phone" name="phone" type="tel" placeholder="+61 8 0000 0000" /></div>
              </div>
              <div className="cg"><label htmlFor="cpf-message">Message</label><textarea id="cpf-message" name="message" placeholder="Tell us about your project or enquiry..."></textarea></div>
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

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { ArrowRight, DiagArrow } from "../components/Icons";
import { InteractiveGlobe } from "@/components/ui/interactive-globe";

const STATS: { num: number; prefix?: string; suffix: string; label: string }[] = [
  { num: 250, prefix: "$", suffix: "M+", label: "Project Supply" },
  { num: 500, suffix: "km+", label: "Pipeline Delivered" },
  { num: 30, suffix: "+", label: "Years Experience" },
  { num: 3, suffix: "", label: "Australian Offices" },
  { num: 15, suffix: "+", label: "Major Client Partnerships" },
  { num: 100, suffix: "%", label: "Australian Owned" },
];

const VALUES = [
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Agility",
    desc: "We move fast and adapt quickly. Our lean structure allows us to respond to changing project requirements and tight timelines with speed and flexibility.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Excellence",
    desc: "ISO 9001 certified with a proprietary quality management system. Every product undergoes rigorous inspection and testing before delivery.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Value",
    desc: "We focus on delivering value-driven solutions — optimising material selection and supply strategy to reduce total project cost without compromising quality.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Alignment",
    desc: "We align with our clients' goals from day one. Our team integrates with project teams to ensure seamless coordination across procurement, logistics and delivery.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Expertise",
    desc: "Decades of technical knowledge across piping, valves, heat exchangers and specialty materials. Our engineers provide guidance from FEED through to commissioning.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Reliability",
    desc: "On-time, every time. Our supply chain infrastructure and warehousing capability means we consistently deliver on schedule, even on the most demanding timelines.",
  },
];

/* ── Count-up number component ─────────────────────────────── */
function CountUp({ target, prefix, suffix, duration = 2000 }: { target: number; prefix?: string; suffix: string; duration?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    let raf: number;
    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return (
    <div ref={ref} className="about-exp-val">
      {prefix}{value.toLocaleString()}{suffix}
    </div>
  );
}

const INDUSTRIES = [
  { src: "/ENERGY_ICHTHYS_2.jpg", alt: "Energy Sector", title: "Energy Sector", href: "/industries/energy" },
  { src: "/MINING_LYNAS_RARE_EARTHS.jpg", alt: "Mining Sector", title: "Mining Sector", href: "/industries/mining" },
  { src: "/PROCESSING_QAL_REFINERY.jpg", alt: "Chemical Processing", title: "Chemical Processing", href: "/industries/chemical-processing" },
];

export default function AboutPage() {
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

      {/* HERO BANNER */}
      <section className="about-hero">
        <div className="about-hero-bg" style={{ backgroundImage: "url('/about-hero.jpg')" }}></div>
        <div className="about-hero-overlay"></div>
        <div className="about-hero-inner">
          <div className="sec-lbl" style={{ marginBottom: 16 }}><DiagArrow />About Us</div>
          <h1 className="about-hero-h1">Your Partner<br />in <span className="g">Piping</span></h1>
          <p className="about-hero-sub">100% Australian-owned. Delivering engineered piping solutions to the energy, mining and process industries since 1987.</p>
        </div>
        <div className="about-hero-caption">PFP — Osborne Park, c. 1994</div>
      </section>

      {/* WHO WE ARE */}
      <section className="about-section about-who">
        <div className="about-container">
          <div className="about-two-col">
            <div className="rv">
              <div className="sec-lbl dark" style={{ justifyContent: "flex-start", marginBottom: 16 }}><DiagArrow />Who We Are</div>
              <h2 className="about-h2">A Leading Supplier of Engineered <span className="g">Piping Solutions</span></h2>
              <p className="about-body">Founded in 1987, PFP (Aust) Pty Ltd has grown into a leading supplier of engineered piping solutions, fittings, valves, and custom-fabricated equipment for the energy, mining, and process industries. Following a period of international ownership, the company is now 100% Australian-owned once again, with its original founder and management team restoring its long-standing commitment to supporting major projects across the region.</p>
              <p className="about-body">Today, PFP delivers a comprehensive offering spanning bulk piping, exotic alloys, composite-lined systems, valves, and heat exchangers. The business has experienced significant growth in recent years, driven by its agility, technical expertise, and focus on providing value-driven solutions for complex projects.</p>
              <p className="about-body">With decades of industry experience, PFP continues to partner with Owners &amp; Operators, EPCs, and fabricators to deliver reliable, high-quality supply solutions that support some of Australia&apos;s largest energy, resource, and chemical-processing developments.</p>
            </div>
            <div className="rv d1">
              <div className="about-globe-wrap">
                <InteractiveGlobe />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BADGES */}
      <section className="about-section about-badges-section">
        <div className="about-container">
          <div className="about-badges-grid rv">
            <div className="about-badge">
              <Image src="/badge-aus-owned.png" alt="Wholly Australian Owned & Operated" width={800} height={267} style={{ width: "100%", height: "auto" }} />
            </div>
            <div className="about-badge">
              <Image src="/badge-established.png" alt="Established 1987 in Perth, Western Australia" width={800} height={267} style={{ width: "100%", height: "auto" }} />
            </div>
            <div className="about-badge">
              <Image src="/badge-iso.png" alt="ISO 9001:2015 Quality Management System Certified" width={800} height={267} style={{ width: "100%", height: "auto" }} />
            </div>
            <div className="about-badge">
              <Image src="/badge-pipebase.png" alt="Pipebase - Fully Integrated and Proprietary Quality Management System" width={800} height={267} style={{ width: "100%", height: "auto" }} />
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES WE SERVE */}
      <section className="about-section about-industries-section">
        <div className="about-container">
          <div className="sec-lbl" style={{ marginBottom: 16 }}><DiagArrow />Industries We Serve</div>
          <h2 className="about-h2 rv" style={{ textAlign: "center", color: "var(--white)" }}><span className="g">Industries</span> We Serve</h2>
          <div className="about-ind-grid">
            {INDUSTRIES.map((ind, i) => (
              <Link href={ind.href} key={i} className={`about-ind-card rv${i === 1 ? " d1" : i === 2 ? " d2" : ""}`}>
                <Image src={ind.src} alt={ind.alt} width={500} height={340} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div className="about-ind-overlay">
                  <h3>{ind.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOCUS & VALUES */}
      <section className="about-section about-values-section">
        <div className="about-container">
          <div className="sec-lbl dark" style={{ marginBottom: 16 }}><DiagArrow />Focus &amp; Values</div>
          <div className="about-mission rv">
            <h3>Mission Statement</h3>
            <p>Our mission is to partner with our clients from the earliest stages of the project lifecycle, driving the best possible outcomes by ensuring access to high-quality materials, innovative solutions, and reliable supply. We are committed to delivering on time and to project requirements, guided by the following focus areas and values.</p>
          </div>
          <div className="about-values-grid">
            {VALUES.map((v, i) => (
              <div key={i} className={`about-value-card rv${i < 3 ? ` d${i + 1}` : ""}`}>
                <div className="about-value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS & UPDATES */}
      <section className="about-section about-news-section">
        <div className="about-container">
          <div className="sec-lbl dark" style={{ marginBottom: 16 }}><DiagArrow />News &amp; Updates</div>
          <h2 className="about-h2 rv" style={{ textAlign: "center" }}>Latest <span className="g">Updates</span></h2>
          <p className="about-body rv" style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 40px", color: "rgba(0,0,0,0.5)" }}>
            Follow us on LinkedIn for the latest project news, product updates, and industry insights.
          </p>
          <div className="about-news-grid">
            {[
              { title: "PFP Group Announcement — Appointment of General Manager", date: "09 Dec 2020", tag: "Company News", slug: "michael-ward-appointed-general-manager" },
              { title: "PFP Re-Acquired by Founder", date: "10 Apr 2019", tag: "Company News", slug: "pfp-reacquired-by-founder" },
            ].map((article, i) => (
              <Link href={`/news/${article.slug}`} key={i} className={`about-news-card rv${i === 1 ? " d1" : ""}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div className="about-news-placeholder">
                  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" opacity="0.3">
                    <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div className="about-news-content">
                  <span className="about-news-date">{article.date}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--green)" }}>{article.tag}</span>
                  <h4>{article.title}</h4>
                </div>
              </Link>
            ))}
          </div>

          {/* LinkedIn CTA */}
          <div className="rv d2" style={{ textAlign: "center", marginTop: 40 }}>
            <a
              href="https://www.linkedin.com/company/pfp-aust-pty-ltd"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "14px 32px", background: "#0A66C2", color: "#fff",
                borderRadius: 6, fontSize: 15, fontWeight: 600,
                textDecoration: "none", transition: "opacity 0.2s",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Follow PFP on LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-section about-cta-section">
        <div className="about-container" style={{ textAlign: "center" }}>
          <h2 className="about-h2 rv" style={{ color: "var(--white)" }}>Ready to Discuss Your <span className="g">Next Project?</span></h2>
          <p className="about-body rv d1" style={{ color: "rgba(255,255,255,0.7)", maxWidth: 600, margin: "0 auto 32px" }}>Our team is ready to provide expert guidance on material selection, supply strategy and project delivery.</p>
          <Link href="/#contact" className="btn-dark rv d2" style={{ background: "var(--green)", margin: "0 auto" }}>
            Contact Us<ArrowRight />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

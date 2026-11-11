"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Nav from "./components/Nav";
import OptimizedVideo from "./components/OptimizedVideo";
import { useContactForm } from "./components/useContactForm";

const SLIDES = [
  { lines: [["Flexible", false], ["Global Supply", true], ["Network", false]] as [string, boolean][] },
  { lines: [["Complete", false], ["Mining", true], ["Solutions", false]] as [string, boolean][] },
  { lines: [["Chemical", false], ["Processing", true], ["Expertise", false]] as [string, boolean][] },
];

const PRODUCTS = [
  { src: "/pfv-about.jpg", alt: "Pipes Fittings Valves", title: "Pipes, Fittings & Valves", href: "/products/pipe-fittings-valves" },
  { src: "/LINEPIPE.JPG", alt: "Linepipe", title: "Linepipe & Coating Solutions", href: "/products/linepipe-coating" },
  { src: "/REINFORCED_THERMOPLASTIC.png", alt: "Reinforced Thermoplastic", title: "Reinforced Thermoplastic Pipe", href: "/products/reinforced-thermoplastic" },
  { src: "/COMPOSITE_LINED_STEEL.jpg", alt: "PTFE Lined Steel", title: "PTFE Lined Piping Systems", href: "/products/composite-lined" },
  { src: "/pfprx-about.jpg", alt: "PFP-RX Abrasion Resistance", title: "PFP-RX Wear Resistant Piping", href: "/products/pfp-rx-abrasion" },
  { src: "/CRA_CLAD_PIPE___COMPONENTS.jpg", alt: "CRA Clad Pipe", title: "Bi-Metal Piping Solutions", href: "/products/bi-metal" },
  { src: "/hx-fabrication.jpg", alt: "Heat Exchangers", title: "Heat Exchangers, Parts & Fabrication", href: "/products/heat-exchangers" },
  { src: "/SPECIALTY_FABRICATION.jpg", alt: "Specialty Fabrication", title: "Specialty Fabrication & Forged Items", href: "/products/specialty-fabrication" },
];

const INDUSTRIES = [
  { src: "/ENERGY_ICHTHYS_2.jpg", alt: "Energy Sector", title: "Energy Sector", href: "/industries/energy" },
  { src: "/PROCESSING_QAL_REFINERY.jpg", alt: "Mining Sector", title: "Mining Sector", href: "/industries/mining" },
  { src: "/MINING_LYNAS_RARE_EARTHS.jpg", alt: "Chemical Processing", title: "Chemical Processing", href: "/industries/chemical-processing" },
];

const CLIENT_LOGOS = [
  { src: "/1.png", alt: "Tronox" },
  { src: "/2.png", alt: "Shell" },
  { src: "/3.png", alt: "Rio Tinto" },
  { src: "/4.png", alt: "Woodside Energy" },
  { src: "/5.png", alt: "Santos" },
  { src: "/6.png", alt: "Subsea 7" },
  { src: "/7.png", alt: "Exxon" },
  { src: "/8.png", alt: "South32" },
  { src: "/9.png", alt: "Saipem" },
  { src: "/10.png", alt: "Queensland Alumina" },
  { src: "/11.png", alt: "Mitsui EP" },
  { src: "/12.png", alt: "Chevron" },
  { src: "/13.png", alt: "Lynas Rare Earths" },
  { src: "/14.png", alt: "INPEX" },
  { src: "/15.png", alt: "BHP" },
];

const ArrowRight = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const ArrowLeft = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const ArrowRightSm = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const DiagArrow = () => (
  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
);

const DiagArrowSm = () => (
  <svg width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
);

function scrollToEl(selector: string) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  const [curSlide, setCurSlide] = useState(0);
  const [headlineOpacity, setHeadlineOpacity] = useState(1);
  const { status, errorMessage, handleSubmit } = useContactForm({ source: "/" });

  const slideTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prodTrackRef = useRef<HTMLDivElement>(null);
  const prodOffsetRef = useRef(0);
  const prodRafRef = useRef<number>(0);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const marqueeOuterRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  // Hero slide auto-advance
  const goToSlide = useCallback((i: number) => {
    const next = ((i % 3) + 3) % 3;
    setHeadlineOpacity(0);
    setTimeout(() => {
      setCurSlide(next);
      setHeadlineOpacity(1);
    }, 350);
  }, []);

  const resetSlideTimer = useCallback(() => {
    if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    slideTimerRef.current = setInterval(() => {
      setHeadlineOpacity(0);
      setTimeout(() => {
        setCurSlide((prev) => (prev + 1) % 3);
        setHeadlineOpacity(1);
      }, 400);
    }, 6500);
  }, []);

  useEffect(() => {
    resetSlideTimer();
    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    };
  }, [resetSlideTimer]);

  // Simple product carousel - no infinite loop, clamps at edges
  const prodAnimatingRef = useRef(false);

  const prodShift = useCallback((direction: number) => {
    if (prodAnimatingRef.current) return;
    const track = prodTrackRef.current;
    if (!track) return;

    // Measure actual card width + gap dynamically for responsive layouts
    const firstCard = track.querySelector('.prod-card') as HTMLElement | null;
    const cardStep = firstCard ? firstCard.offsetWidth + 20 : 460;

    // Clamp: don't go below 0 or beyond max
    const totalWidth = track.scrollWidth;
    const viewportWidth = track.parentElement?.clientWidth || 0;
    const maxOffset = Math.max(0, totalWidth - viewportWidth);
    const target = Math.min(maxOffset, Math.max(0, prodOffsetRef.current + direction * cardStep));
    if (target === prodOffsetRef.current) return;

    prodAnimatingRef.current = true;
    const start = prodOffsetRef.current;
    const diff = target - start;
    const duration = 400;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = start + diff * ease;
      prodOffsetRef.current = current;
      track.style.transform = `translateX(-${current}px)`;

      if (progress < 1) {
        prodRafRef.current = requestAnimationFrame(animate);
      } else {
        prodOffsetRef.current = target;
        track.style.transform = `translateX(-${target}px)`;
        prodAnimatingRef.current = false;
      }
    };
    cancelAnimationFrame(prodRafRef.current);
    prodRafRef.current = requestAnimationFrame(animate);
  }, []);

  // Marquee animation
  useEffect(() => {
    const outer = marqueeOuterRef.current;
    const track = marqueeTrackRef.current;
    if (!outer || !track) return;

    let off = 0;
    let dragging = false;
    let startX = 0;
    let vel = 0;
    let lastX = 0;
    let raf: number;

    function getHalf() {
      return track!.scrollWidth / 2;
    }

    function loop() {
      if (!dragging) {
        off += 0.5;
        const h = getHalf();
        if (off >= h) off -= h;
        track!.style.transform = `translateX(-${off}px)`;
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    const onDown = (e: MouseEvent) => {
      dragging = true;
      outer!.classList.add("grabbing");
      startX = e.clientX;
      lastX = e.clientX;
      cancelAnimationFrame(raf);
    };
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

    const onTouchStart = (e: TouchEvent) => {
      dragging = true;
      startX = e.touches[0].clientX;
      cancelAnimationFrame(raf);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging) return;
      const h = getHalf();
      off += (startX - e.touches[0].clientX) * 0.85;
      if (off < 0) off += h;
      if (off >= h) off -= h;
      track!.style.transform = `translateX(-${off}px)`;
      startX = e.touches[0].clientX;
    };
    const onTouchEnd = () => {
      dragging = false;
      raf = requestAnimationFrame(loop);
    };

    outer.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    outer.addEventListener("touchstart", onTouchStart, { passive: true });
    outer.addEventListener("touchmove", onTouchMove, { passive: true });
    outer.addEventListener("touchend", onTouchEnd);

    return () => {
      cancelAnimationFrame(raf);
      outer.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      outer.removeEventListener("touchstart", onTouchStart);
      outer.removeEventListener("touchmove", onTouchMove);
      outer.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // Intersection Observer for reveal animations
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
      <section className="hero" id="hero" ref={heroRef}
        onMouseEnter={() => { if (slideTimerRef.current) clearInterval(slideTimerRef.current); }}
        onMouseLeave={resetSlideTimer}
      >
        <div className={`hero-slide${curSlide === 0 ? " active" : ""}`}>
          <OptimizedVideo src="/hero-energy.mp4" className="hero-video" priority />
        </div>
        <div className={`hero-slide${curSlide === 1 ? " active" : ""}`}>
          <OptimizedVideo src="/hero-mining.mp4" className="hero-video" priority />
        </div>
        <div className={`hero-slide${curSlide === 2 ? " active" : ""}`}>
          <OptimizedVideo src="/hero-chemical.mp4" className="hero-video" priority noWebm />
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-side">
          <button className="side-btn" onClick={() => { goToSlide(curSlide + 1); resetSlideTimer(); }}>&#8250;</button>
          <button className="side-btn" onClick={() => { goToSlide(curSlide - 1); resetSlideTimer(); }}>&#8249;</button>
        </div>
        <div className="hero-inner">
          <div className="hero-logo-wrap">
            <Image src="/Primary_Wordmark_Green_White_RGB.png" alt="PFP (Aust) Pty Ltd" width={500} height={212} priority style={{ width: "auto", height: 212 }} />
          </div>
          <div className="hero-tabs">
            {["Energy Sector", "Mining Sector", "Chemical Processing"].map((label, i) => (
              <div key={i} className={`hero-tab${curSlide === i ? " active" : ""}`} onClick={() => { goToSlide(i); resetSlideTimer(); }}>
                <span className="tab-dot"></span>{label}
              </div>
            ))}
          </div>
          <h1 className="hero-headline" style={{ opacity: headlineOpacity }}>
            {SLIDES[curSlide].lines.map(([text, dim], i) => (
              <span key={i} className={`line${dim ? " dim" : ""}`}>{text}</span>
            ))}
          </h1>
        </div>
        <button
          className="hero-scroll"
          onClick={() => scrollToEl("#products")}
          aria-label="Scroll to products"
          type="button"
        >
          <span className="hero-scroll-label">Scroll</span>
          <span className="hero-scroll-icon" aria-hidden="true">
            <svg width="14" height="20" viewBox="0 0 14 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="1" width="12" height="18" rx="6" />
              <line x1="7" y1="5" x2="7" y2="9" />
            </svg>
          </span>
        </button>
      </section>

      {/* PRODUCTS */}
      <section className="products" id="products">
        <div className="sec-lbl"><DiagArrow />Products</div>
        <div className="prod-viewport">
          <div className="prod-track" ref={prodTrackRef}>
            {PRODUCTS.map((p, i) => (
              <a key={i} href={p.href} className="prod-card">
                <div className="prod-card-img">
                  <Image src={p.src} alt={p.alt} width={440} height={304} draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <span className="prod-card-overlay"><span className="prod-card-view">View Product <DiagArrowSm /></span></span>
                </div>
                <h3>{p.title}<span className="prod-card-arrow"><DiagArrowSm /></span></h3>
              </a>
            ))}
          </div>
        </div>
        <div className="prod-controls">
          <button className="ctrl-arr" onClick={() => prodShift(-1)}><ArrowLeft /></button>
          <button className="ctrl-arr" onClick={() => prodShift(1)}><ArrowRightSm /></button>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="solutions" id="about">
        <div className="sec-lbl dark"><DiagArrow />Solutions</div>
        <p className="sol-title rv">Over <span className="g">Thirty</span> Years of Providing Complete <span className="g">Project Solutions.</span></p>
        <div className="sol-grid">
          <div className="wheel-img rv">
            <Image src="/Diagram_No_BG_No_Title.png" alt="PFP Capability Wheel" width={1758} height={1758} style={{ width: "100%", height: "auto" }} />
          </div>
          <div className="rv d1">
            <div className="stat-row">
              <div className="stat-arrow">&#8594;</div>
              <div className="stat-val">+ $250 Million<br />in Projects</div>
            </div>
            <p className="sol-body">PFP is a wholly Australian-owned project supply solutions specialist, providing piping, valve and lining systems for the energy and process industries. We support projects of all sizes by combining technical expertise with reliable global and local supply chains.</p>
            <button className="btn-dark" onClick={() => scrollToEl("#contact")}>
              Discuss Your Project<ArrowRight />
            </button>
            <div className="sol-divider"></div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="industries" id="industries">
        <div className="sec-lbl"><DiagArrow />Industries</div>
        <p className="ind-title rv"><span className="g">Industries</span> We <span className="g">Serve</span></p>
        <div className="ind-grid">
          {INDUSTRIES.map((ind, i) => (
            <Link key={i} href={ind.href} className={`ind-card rv${i === 1 ? " d1" : i === 2 ? " d2" : ""}`}>
              <Image src={ind.src} alt={ind.alt} width={400} height={380} style={{ width: "100%", height: 380, objectFit: "cover" }} />
              <div className="ind-overlay">
                <div className="ind-tag"><DiagArrowSm />Industries</div>
                <h3>{ind.title}</h3>
                <div className="ind-btn">
                  Learn More
                  <span className="ic">
                    <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CLIENTS */}
      <section className="clients">
        <div className="sec-lbl dark" style={{ marginBottom: 32 }}><DiagArrow />Our Clients</div>
        <div className="marquee-outer" ref={marqueeOuterRef}>
          <div className="marquee-track" ref={marqueeTrackRef}>
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
              <div key={i} className="client-logo-item">
                <Image src={logo.src} alt={logo.alt} width={640} height={240} draggable={false} style={{ height: 60, width: "auto", objectFit: "contain" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <div className="contact-inner">
          <div className="rv">
            <p className="sec-lbl" style={{ justifyContent: "flex-start", marginBottom: 16 }}><DiagArrow />Contact Us</p>
            <h2 className="contact-h2">Get In<br /><span className="g">Touch</span><br />With Us</h2>
            <p className="contact-desc">Reach out and a member of our team will respond within the same business day.</p>
            <div className="offices">
              <div className="off">
                <div className="off-city">Perth</div>
                <div className="off-info">Unit 1, 245 Barrington St, Bibra Lake WA 6163<br /><a href="tel:+61863990600">+61 8 6399 0600</a> · <a href="mailto:salesperth@pfp.com.au">salesperth@pfp.com.au</a></div>
              </div>
              <div className="off">
                <div className="off-city">Brisbane</div>
                <div className="off-info"><a href="tel:+61414035166">+61 414 035 166</a> · <a href="mailto:salesqld@pfp.com.au">salesqld@pfp.com.au</a></div>
              </div>
              <div className="off">
                <div className="off-city">Melbourne</div>
                <div className="off-info"><a href="tel:+61414035166">+61 414 035 166</a> · <a href="mailto:salesvic@pfp.com.au">salesvic@pfp.com.au</a></div>
              </div>
            </div>
          </div>
          <form className="cform rv d1" onSubmit={handleSubmit}>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} aria-hidden="true" />
            <div className="crow">
              <div className="cg"><label htmlFor="cf-name">Name</label><input id="cf-name" name="name" type="text" placeholder="Full name" required /></div>
              <div className="cg"><label htmlFor="cf-company">Company</label><input id="cf-company" name="company" type="text" placeholder="Company name" /></div>
            </div>
            <div className="crow">
              <div className="cg"><label htmlFor="cf-email">Email</label><input id="cf-email" name="email" type="email" placeholder="Work email" required /></div>
              <div className="cg"><label htmlFor="cf-phone">Phone</label><input id="cf-phone" name="phone" type="tel" placeholder="+61 8 0000 0000" /></div>
            </div>
            <div className="cg"><label htmlFor="cf-message">Message</label><textarea id="cf-message" name="message" placeholder="Tell us about your project or enquiry…"></textarea></div>
            {status === "error" && errorMessage && (
              <div role="alert" style={{ color: "#c44", fontSize: 13, marginTop: 8 }}>{errorMessage}</div>
            )}
            <button type="submit" className="csubmit" disabled={status === "submitting" || status === "success"} style={status === "success" ? { background: "#15361c" } : {}}>
              {status === "success" ? "✓ Sent — We'll be in touch shortly" : status === "submitting" ? "Sending…" : <>Submit Enquiry<ArrowRight /></>}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="foot-grid">
          <div>
            <div className="foot-logo">
              <Image src="/Primary_Wordmark_Green_White_RGB.png" alt="PFP" width={240} height={56} style={{ height: 56, width: "auto" }} />
            </div>
            <a href="#contact" className="foot-cta" onClick={(e) => { e.preventDefault(); scrollToEl("#contact"); }}>Get in Touch</a>
          </div>
          <div className="foot-col">
            <h4>Contact Us</h4>
            <div className="foot-addr">
              <strong>PFP (Aust) Pty Ltd</strong><br />
              Unit 1, 245 Barrington Street<br />
              Bibra Lake WA 6163<br />
              Australia<br /><br />
              ABN 31 062 673 223
            </div>
          </div>
          <div className="foot-col">
            <h4>Navigation</h4>
            <ul className="foot-links">
              <li><a href="/about">About Us</a></li>
              <li><a href="#products" onClick={(e) => { e.preventDefault(); scrollToEl("#products"); }}>Products</a></li>
              <li><a href="#industries" onClick={(e) => { e.preventDefault(); scrollToEl("#industries"); }}>Industries</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToEl("#contact"); }}>Contact</a></li>
              <li><a href="/resources">Resources</a></li>
              <li><a href="/news">News &amp; Updates</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <p>&copy; 2026 PFP (Aust) Pty Ltd. All rights reserved.</p>
          <p>ISO 9001:2015 — Bureau Veritas Certified</p>
        </div>
      </footer>
    </>
  );
}

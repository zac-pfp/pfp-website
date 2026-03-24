"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

const SLIDES = [
  { lines: [["Flexible", false], ["Global Supply", true], ["Network", false]] as [string, boolean][] },
  { lines: [["Complete", false], ["Mining", true], ["Solutions", false]] as [string, boolean][] },
  { lines: [["Chemical", false], ["Processing", true], ["Expertise", false]] as [string, boolean][] },
];

const PRODUCTS = [
  { src: "/PIPES__FITTINGS___VALVES.jpeg", alt: "Pipes Fittings Valves", title: "Pipes, Fittings & Valves" },
  { src: "/LINEPIPE.JPG", alt: "Linepipe", title: "Linepipe & Coating Solutions" },
  { src: "/REINFORCED_THERMOPLASTIC.png", alt: "Reinforced Thermoplastic", title: "Reinforced Thermoplastic Pipe" },
  { src: "/COMPOSITE_LINED_STEEL.jpg", alt: "Composite Lined Steel", title: "Abrasion Resistant Lined Steel" },
  { src: "/CRA_CLAD_PIPE___COMPONENTS.jpg", alt: "CRA Clad Pipe", title: "Bi-Metal Piping Solutions" },
  { src: "/HEAT_EXCHANGERS.jpg", alt: "Heat Exchangers", title: "Heat Exchangers & Fabrication" },
  { src: "/SPECIALTY_FABRICATION.jpg", alt: "Specialty Fabrication", title: "Specialty Fabrication Services" },
];

const INDUSTRIES = [
  { src: "/ENERGY_ICHTHYS_2.jpg", alt: "Energy Sector", title: "Energy Sector" },
  { src: "/PROCESSING_QAL_REFINERY.jpg", alt: "Mining Sector", title: "Mining Sector" },
  { src: "/MINING_LYNAS_RARE_EARTHS.jpg", alt: "Chemical Processing", title: "Chemical Processing" },
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
  const [dropOpen, setDropOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [prodPage, setProdPage] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const slideTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prodTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prodTrackRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const marqueeOuterRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const TOTAL = PRODUCTS.length;
  const VIS = 4;
  const PAGES = TOTAL - VIS + 1;

  // Nav scroll effect
  useEffect(() => {
    const handler = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

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
      setCurSlide((prev) => {
        const next = (prev + 1) % 3;
        setHeadlineOpacity(0);
        setTimeout(() => setHeadlineOpacity(1), 350);
        return next;
      });
    }, 6500);
  }, []);

  useEffect(() => {
    resetSlideTimer();
    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    };
  }, [resetSlideTimer]);

  // Product carousel auto-advance
  const prodNext = useCallback(() => {
    setProdPage((p) => (p < PAGES - 1 ? p + 1 : 0));
  }, [PAGES]);

  useEffect(() => {
    prodTimerRef.current = setInterval(prodNext, 4000);
    return () => {
      if (prodTimerRef.current) clearInterval(prodTimerRef.current);
    };
  }, [prodNext]);

  // Product drag
  const prodDragRef = useRef({ dragging: false, startX: 0, offset: 0 });

  const handleProdMouseDown = (e: React.MouseEvent) => {
    prodDragRef.current.dragging = true;
    prodDragRef.current.startX = e.clientX;
    const track = prodTrackRef.current;
    if (track) {
      track.classList.add("dragging");
      const m = new DOMMatrix(getComputedStyle(track).transform);
      prodDragRef.current.offset = m.m41;
    }
    if (prodTimerRef.current) clearInterval(prodTimerRef.current);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!prodDragRef.current.dragging) return;
      const track = prodTrackRef.current;
      if (track) {
        track.style.transform = `translateX(${prodDragRef.current.offset + (e.clientX - prodDragRef.current.startX)}px)`;
      }
    };
    const handleMouseUp = (e: MouseEvent) => {
      if (!prodDragRef.current.dragging) return;
      prodDragRef.current.dragging = false;
      prodTrackRef.current?.classList.remove("dragging");
      const dx = e.clientX - prodDragRef.current.startX;
      if (Math.abs(dx) > 60) {
        setProdPage((p) => {
          if (dx < 0) return Math.min(p + 1, PAGES - 1);
          return Math.max(p - 1, 0);
        });
      }
      prodTimerRef.current = setInterval(prodNext, 4000);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [PAGES, prodNext]);

  // Product track position
  useEffect(() => {
    const track = prodTrackRef.current;
    if (track && track.children[0]) {
      const cw = (track.children[0] as HTMLElement).offsetWidth + 20;
      track.style.transform = `translateX(-${prodPage * cw}px)`;
    }
  }, [prodPage]);

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

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#solDrop") && !target.closest("#dropdown")) {
        setDropOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <>
      {/* NAV */}
      <nav className={navScrolled ? "scrolled" : ""}>
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            <Image src="/Primary_Wordmark_Green_White_RGB.png" alt="PFP Your Partner in Piping" width={180} height={36} style={{ height: 36, width: "auto" }} />
          </a>
          <div className="nav-left">
            <a href="#about" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToEl("#about"); }}>About Us</a>
            <div style={{ position: "relative" }}>
              <div className={`nav-link has-drop${dropOpen ? " open" : ""}`} id="solDrop" onClick={() => setDropOpen(!dropOpen)}>Solutions</div>
              <div className={`dropdown${dropOpen ? " open" : ""}`} id="dropdown">
                <div className="drop-col">
                  <h4>Industries</h4>
                  <div className="drop-item" onClick={() => { scrollToEl("#industries"); setDropOpen(false); }}><span className="di-dot"></span>Energy Sector</div>
                  <div className="drop-item" onClick={() => { scrollToEl("#industries"); setDropOpen(false); }}><span className="di-dot"></span>Mining Sector</div>
                  <div className="drop-item" onClick={() => { scrollToEl("#industries"); setDropOpen(false); }}><span className="di-dot"></span>Chemical Processing</div>
                </div>
                <div className="drop-col">
                  <h4>Products &amp; Services</h4>
                  <div className="drop-item" onClick={() => { scrollToEl("#products"); setDropOpen(false); }}><span className="di-dot"></span>Pipe Fittings &amp; Valves</div>
                  <div className="drop-item" onClick={() => { scrollToEl("#products"); setDropOpen(false); }}><span className="di-dot"></span>Linepipe &amp; Coating Solutions</div>
                  <div className="drop-item" onClick={() => { scrollToEl("#products"); setDropOpen(false); }}><span className="di-dot"></span>Reinforced Thermoplastic Pipe</div>
                  <div className="drop-item" onClick={() => { scrollToEl("#products"); setDropOpen(false); }}><span className="di-dot"></span>PTFE Lined Systems</div>
                  <div className="drop-item" onClick={() => { scrollToEl("#products"); setDropOpen(false); }}><span className="di-dot"></span>Abrasion Resistant Lined Steel</div>
                  <div className="drop-item" onClick={() => { scrollToEl("#products"); setDropOpen(false); }}><span className="di-dot"></span>Bi-Metal Piping Solutions</div>
                  <div className="drop-item" onClick={() => { scrollToEl("#products"); setDropOpen(false); }}><span className="di-dot"></span>Heat Exchangers &amp; Fabrication</div>
                </div>
              </div>
            </div>
            <a href="#resources" className="nav-link">Resources</a>
          </div>
          <div className="nav-right">
            <button className="btn-contact" onClick={() => scrollToEl("#contact")}>Contact Us</button>
            <div className="hamburger"><span></span><span></span></div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero" ref={heroRef}
        onMouseEnter={() => { if (slideTimerRef.current) clearInterval(slideTimerRef.current); }}
        onMouseLeave={resetSlideTimer}
      >
        <div className={`hero-slide${curSlide === 0 ? " active" : ""}`} style={{ backgroundImage: "url('/ENERGY_ICHTHYS_2.jpg')" }}></div>
        <div className={`hero-slide${curSlide === 1 ? " active" : ""}`} style={{ backgroundImage: "url('/PROCESSING_QAL_REFINERY.jpg')" }}></div>
        <div className={`hero-slide${curSlide === 2 ? " active" : ""}`} style={{ backgroundImage: "url('/MINING_LYNAS_RARE_EARTHS.jpg')" }}></div>
        <div className="hero-overlay"></div>
        <div className="hero-side">
          <button className="side-btn" onClick={() => { goToSlide(curSlide + 1); resetSlideTimer(); }}>&#8250;</button>
          <button className="side-btn" onClick={() => { goToSlide(curSlide - 1); resetSlideTimer(); }}>&#8249;</button>
        </div>
        <div className="hero-inner">
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
          <a href="#about" className="btn-pill" onClick={(e) => { e.preventDefault(); scrollToEl("#about"); }}>
            Learn More
            <span className="pill-circle"><ArrowRight /></span>
          </a>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="products" id="products">
        <div className="sec-lbl"><DiagArrow />Products</div>
        <div className="prod-viewport">
          <div className="prod-track" ref={prodTrackRef} onMouseDown={handleProdMouseDown}>
            {PRODUCTS.map((p, i) => (
              <div key={i} className={`prod-card rv${i === 1 ? " d1" : i === 2 ? " d2" : i === 3 ? " d3" : ""}`}>
                <div className="prod-card-img">
                  <Image src={p.src} alt={p.alt} width={400} height={276} draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <h3>{p.title}</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="prod-controls">
          <button className="ctrl-arr" onClick={() => setProdPage((p) => (p > 0 ? p - 1 : PAGES - 1))}><ArrowLeft /></button>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {Array.from({ length: PAGES }).map((_, i) => (
              <div key={i} className={`prod-dot${prodPage === i ? " active" : ""}`} onClick={() => setProdPage(i)}></div>
            ))}
          </div>
          <button className="ctrl-arr" onClick={() => setProdPage((p) => (p < PAGES - 1 ? p + 1 : 0))}><ArrowRightSm /></button>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="solutions" id="about">
        <div className="sec-lbl dark"><DiagArrow />Solutions</div>
        <p className="sol-title rv">Over <span className="g">Thirty</span> Years of Providing Complete <span className="g">Project Solutions.</span></p>
        <div className="sol-grid">
          <div className="wheel-img rv">
            <Image src="/Diagram_No_BG_No_Title.png" alt="PFP Capability Wheel" width={520} height={520} style={{ width: "100%", height: "auto" }} />
          </div>
          <div className="rv d1">
            <div className="stat-row">
              <div className="stat-arrow">&#8594;</div>
              <div className="stat-val">+ $250 Million<br />in Projects</div>
            </div>
            <p className="sol-body">PFP is a wholly Australian-owned project supply solutions specialist, providing piping, valve and lining systems for the energy and process industries. We support projects of all sizes by combining technical expertise with reliable global and local supply chains.</p>
            <button className="btn-dark" onClick={() => scrollToEl("#contact")}>
              Learn More<ArrowRight />
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
            <div key={i} className={`ind-card rv${i === 1 ? " d1" : i === 2 ? " d2" : ""}`}>
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
            </div>
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
                <Image src={logo.src} alt={logo.alt} width={130} height={38} draggable={false} style={{ maxHeight: 38, maxWidth: 130, width: "auto", height: "auto", objectFit: "contain" }} />
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
                <div className="off-info"><a href="tel:+61425558457">+61 425 558 457</a> · <a href="mailto:salesqld@pfp.com.au">salesqld@pfp.com.au</a></div>
              </div>
              <div className="off">
                <div className="off-city">Melbourne</div>
                <div className="off-info"><a href="tel:+61425558457">+61 425 558 457</a> · <a href="mailto:salesvic@pfp.com.au">salesvic@pfp.com.au</a></div>
              </div>
            </div>
          </div>
          <form className="cform rv d1" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
            <div className="crow">
              <div className="cg"><label>Name</label><input type="text" placeholder="John Smith" required /></div>
              <div className="cg"><label>Company</label><input type="text" placeholder="Acme Resources Ltd" /></div>
            </div>
            <div className="crow">
              <div className="cg"><label>Email</label><input type="email" placeholder="j@company.com.au" required /></div>
              <div className="cg"><label>Phone</label><input type="tel" placeholder="+61 8 0000 0000" /></div>
            </div>
            <div className="cg">
              <label>Office</label>
              <select><option value="">Select nearest office</option><option>Perth</option><option>Brisbane</option><option>Melbourne</option></select>
            </div>
            <div className="cg"><label>Message</label><textarea placeholder="Tell us about your project or enquiry…"></textarea></div>
            <button type="submit" className="csubmit" disabled={submitted} style={submitted ? { background: "#15361c" } : {}}>
              {submitted ? "✓ Sent — We'll be in touch shortly" : <>Submit Enquiry<ArrowRight /></>}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="foot-grid">
          <div>
            <div className="foot-logo">
              <Image src="/Primary_Wordmark_Green_White_RGB.png" alt="PFP" width={180} height={40} style={{ height: 40, width: "auto" }} />
            </div>
            <p className="foot-tagline">Market leader in the supply of piping, valving and pressure vessel components — servicing the Australasian region for over 30 years.</p>
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
              <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToEl("#about"); }}>About Us</a></li>
              <li><a href="#products" onClick={(e) => { e.preventDefault(); scrollToEl("#products"); }}>Products</a></li>
              <li><a href="#industries" onClick={(e) => { e.preventDefault(); scrollToEl("#industries"); }}>Industries</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToEl("#contact"); }}>Contact</a></li>
              <li><a href="#">Resources</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <p>&copy; 2026 PFP (Aust) Pty Ltd. All rights reserved.</p>
          <p>ISO 9001 &middot; ISO 14001 &middot; OHSAS 18001 — Bureau Veritas Certified</p>
        </div>
      </footer>
    </>
  );
}

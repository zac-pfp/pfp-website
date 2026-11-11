"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import ProductLayout from "../../components/ProductLayout";
import BrochurePreview from "../../components/BrochurePreview";
import Image from "next/image";

function ConnectorCard({ name, images, labels, delay }: { name: string; images: string[]; labels: string[]; delay: number }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isHovering = useRef(false);

  const startCycle = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % images.length);
    }, 1200);
  }, [images.length]);

  const stopCycle = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stopCycle();
  }, [stopCycle]);

  return (
    <div
      className={`conn-card rv d${delay}`}
      onMouseEnter={() => { isHovering.current = true; startCycle(); }}
      onMouseLeave={() => { isHovering.current = false; stopCycle(); }}
    >
      <div className="conn-card-viewer">
        {images.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`${name} — ${labels[i]}`}
            width={400}
            height={400}
            className={`conn-card-img${activeIdx === i ? " active" : ""}`}
          />
        ))}
        <div className="conn-card-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>
          Hover to rotate
        </div>
      </div>
      <div className="conn-card-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`conn-dot${activeIdx === i ? " active" : ""}`}
            onClick={() => { stopCycle(); setActiveIdx(i); }}
            aria-label={labels[i]}
          />
        ))}
      </div>
      <h3 className="conn-card-name">{name}</h3>
      <span className="conn-card-view">{labels[activeIdx]}</span>
    </div>
  );
}

export default function RTPPage() {
  return (
    <ProductLayout
      title="Reinforced Thermoplastic Pipe."
      subtitle="PFP PRODUCT RANGE"
      blurb="Reinforced Thermoplastic Pipe (RTP) is an advanced composite piping system engineered for demanding oil & gas, water, mining, and industrial applications. RTP is rapidly replacing traditional steel pipelines where corrosion, installation cost, and maintenance risk are critical concerns."
      heroImage="/product-rtp.png"
      heroImageAlt="Reinforced Thermoplastic Pipe"
      heroVariant="mesh"
      heroSeed={167}
    >
      {/* TWO-COLUMN INTRO */}
      <section className="prod-intro-section">
        <div className="prod-container">
          <div className="prod-intro-grid rv">
            <div className="prod-intro-img">
              <Image src="/REINFORCED_THERMOPLASTIC.png" alt="RTP pipe system" width={600} height={500} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
            </div>
            <div className="prod-intro-text">
              <span className="prod-accent-label">About This Product</span>
              <h2 className="prod-intro-h2">Next Generation Pipeline Solution</h2>
              <p>Combining a thermoplastic liner with high-strength fibre reinforcement, RTP delivers exceptional pressure performance, corrosion resistance, and long service life, all while being lightweight and easy to install.</p>
              <p>With over 15,000km of RTP manufactured and in service globally, this proven technology offers significant advantages over traditional steel pipelines in total cost of ownership.</p>
            </div>
          </div>
        </div>
      </section>

      {/* REINFORCEMENT LAYERS — 4 CATEGORY CARDS */}
      <section className="prod-section prod-dark-section">
        <div className="prod-container">
          <span className="prod-accent-label">Reinforcement Layers</span>
          <h2 className="prod-section-h2">Explore reinforcement options.</h2>

          <div className="rtp-reinf-grid">
            <div className="rtp-reinf-card rv">
              <div className="rtp-reinf-icon">
                <Image src="/rtp-icon-diameter.png" alt="Size & Length" width={200} height={200} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <h3>Size &amp; Length</h3>
              <span className="rtp-reinf-value">DN50 — DN900</span>
              <p>Spool lengths from 12m up to 2,000m depending on reinforcement type and diameter.</p>
            </div>

            <div className="rtp-reinf-card rv d1">
              <div className="rtp-reinf-icon">
                <Image src="/rtp-icon-reinforcement.png" alt="Reinforcement Type" width={200} height={200} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <h3>Reinforcement Type</h3>
              <ul className="rtp-reinf-list">
                <li>Polyester Polyethylene</li>
                <li>Glass Fibre</li>
                <li>Aramid Fibre</li>
                <li>Steel Cord Tape</li>
              </ul>
            </div>

            <div className="rtp-reinf-card rv d2">
              <div className="rtp-reinf-icon">
                <Image src="/rtp-icon-temp.png" alt="Temperature" width={200} height={200} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <h3>Temperature</h3>
              <span className="rtp-reinf-value">Up to 110+°C</span>
              <p>Operating temperature range varies by reinforcement layer and liner material.</p>
            </div>

            <div className="rtp-reinf-card rv d3">
              <div className="rtp-reinf-icon">
                <Image src="/rtp-feat-pressure.png" alt="Pressure" width={200} height={200} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <h3>Pressure</h3>
              <span className="rtp-reinf-value">Up to 32 MPa</span>
              <p>Pressure ratings varies by reinforcement layers and material</p>
            </div>
          </div>
        </div>
      </section>

      {/* KEY FEATURES — ICON CARDS */}
      <section className="prod-section prod-light-section">
        <div className="prod-container">
          <span className="prod-accent-label dark">Key Features</span>
          <h2 className="prod-section-h2">Key features &amp; benefits.</h2>
          <div className="rtp-features-grid rtp-features-4col">
            <div className="rtp-feature-card rv">
              <div className="rtp-feature-icon rtp-feature-icon-lg">
                <Image src="/rtp-feat-stability.png" alt="Product Stability" width={200} height={200} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <h3>Product Stability</h3>
              <p>Backed by extensive R&amp;D and over 15,000 km of manufacturing experience, our high-pressure RTP is engineered under strict standards to ensure consistent quality, reliability, and performance.</p>
            </div>

            <div className="rtp-feature-card rv d1">
              <div className="rtp-feature-icon rtp-feature-icon-lg">
                <Image src="/rtp-feat-spoolable.png" alt="Spoolable & Fast Construction" width={200} height={200} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <h3>Spoolable &amp; Fast Construction</h3>
              <p>Flexible and spoolable up to DN225, the pipe can be supplied in continuous lengths of 150–2,000 m, reducing joints by over 95%. Fixed-length options (6–22 m) cut joints by 60% and double installation efficiency.</p>
            </div>

            <div className="rtp-feature-card rv d2">
              <div className="rtp-feature-icon rtp-feature-icon-lg">
                <Image src="/rtp-feat-pressure.png" alt="Pressure Resistance" width={200} height={200} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <h3>Pressure Resistance</h3>
              <p>Manufactured using cross-wrapped high-strength continuous fibre or steel cord prepreg tape, the layers form an integrated structure capable of withstanding internal pressures up to 32 MPa.</p>
            </div>

            <div className="rtp-feature-card rv d3">
              <div className="rtp-feature-icon rtp-feature-icon-lg">
                <Image src="/rtp-feat-corrosion.png" alt="Corrosion Resistance" width={200} height={200} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <h3>Corrosion Resistance</h3>
              <p>Constructed from advanced polymer composites, the pipe resists a wide range of corrosive media, extending service life by more than 10 years. Non-metallic sleeve joints eliminate the corrosion issues commonly found with metal fittings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PFP-RX */}
      <section className="prod-section prod-dark-section">
        <div className="prod-container">
          <div className="rtp-pfprx-layout">
            <div className="rtp-pfprx-content">
              <span className="prod-accent-label">PFP-RX</span>
              <h2 className="prod-section-h2">Explore RTP as part of PFP-RX Product range</h2>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
                PFP (Aust) offers the most flexible and wear resistant products for slurry applications.
              </p>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>
                Our RTP with PFP-RX Wear Resistant Layer combines all the benefits of Reinforced Thermoplastic Pipe (RTP) with advanced wear technology, providing significant performance advantages over conventional systems.
              </p>
              <h3 style={{ color: "var(--white)", fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Key Benefits</h3>
              <ul style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.8, marginBottom: 16, paddingLeft: 20, listStyle: "disc" }}>
                <li>Exceptional Wear Resistance – Industry-leading polymer performance, exceeding materials such as HDPE, UHMWPE and PU.</li>
                <li>Ultra-Low Friction – Pipe roughness (&epsilon;) of 0.0015–0.015 mm, helping reduce pumping energy and improve flow efficiency.</li>
                <li>Flexible &amp; Durable – Designed to perform in demanding slurry environments.</li>
              </ul>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>
                Discover a smarter solution for slurry transport.
              </p>
              <a
                href="/products/pfp-rx-abrasion"
                className="prod-cta-link"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 32px",
                  background: "var(--green)",
                  color: "var(--white)",
                  borderRadius: 6,
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
              >
                Explore PFP-RX Range
                <span style={{ fontSize: 18 }}>&rarr;</span>
              </a>
            </div>
            <BrochurePreview
              pdfHref="/brochures/pfp-rx-wear-resistant-piping.pdf"
              coverSrc="/brochures/rx-brochure-cover.jpg"
              coverAlt="PFP-RX Wear Resistant Piping brochure cover"
              variant="dark"
              hoverLabel="View Brochure"
            />
          </div>
        </div>
      </section>

      {/* GAS & HYDROGEN RTP SOLUTIONS */}
      <section className="prod-section prod-light-section rtp-gas-section">
        <div className="rtp-gas-layout">
          <div className="rtp-gas-content">
            <span className="prod-accent-label dark">Gas &amp; Hydrogen</span>
            <h2 className="prod-section-h2" style={{ color: "var(--black)" }}>Gas &amp; Hydrogen Pipeline Solutions.</h2>
            <p style={{ color: "rgba(0,0,0,0.6)", fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>
              Reinforced Thermoplastic Pipe is ideally suited for hydrogen and natural gas transport applications. Its non-metallic construction eliminates hydrogen embrittlement concerns while delivering the pressure performance, flexibility, and long service life demanded by next-generation energy infrastructure.
            </p>

            <div className="rtp-gas-features">
              <div className="rtp-gas-feat rv">
                <div className="rtp-gas-feat-marker" />
                <div>
                  <h4>Hydrogen Compatibility</h4>
                  <p>Non-metallic composite construction eliminates hydrogen embrittlement, ensuring safe and reliable transport of hydrogen and hydrogen-blend gases.</p>
                </div>
              </div>
              <div className="rtp-gas-feat rv d1">
                <div className="rtp-gas-feat-marker" />
                <div>
                  <h4>Safety Certifications</h4>
                  <p>Engineered and tested to meet international gas pipeline safety standards, with full traceability and quality assurance throughout manufacturing.</p>
                </div>
              </div>
              <div className="rtp-gas-feat rv d2">
                <div className="rtp-gas-feat-marker" />
                <div>
                  <h4>Long Service Life</h4>
                  <p>Corrosion-free materials and fatigue-resistant reinforcement layers deliver a design life exceeding 20 years with minimal maintenance requirements.</p>
                </div>
              </div>
              <div className="rtp-gas-feat rv d3">
                <div className="rtp-gas-feat-marker" />
                <div>
                  <h4>Reduced Installation Cost</h4>
                  <p>Spoolable, lightweight pipe reduces heavy equipment requirements, speeds installation, and significantly lowers total project cost compared to steel alternatives.</p>
                </div>
              </div>
            </div>

            <a
              href="#product-contact"
              className="prod-cta-link"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 32px",
                background: "var(--dark)",
                color: "var(--white)",
                borderRadius: 6,
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
                transition: "opacity 0.2s",
                marginTop: 8,
              }}
            >
              Coming Soon — Contact Us for Details
            </a>
          </div>
          <div className="rtp-gas-image">
            <Image
              src="/rtp-gas-render.webp"
              alt="Gas & Hydrogen RTP Pipeline"
              width={900}
              height={700}
              style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "right center" }}
            />
          </div>
        </div>
      </section>

      {/* CONNECTION METHODS — INTERACTIVE 3D RENDERS */}
      <section className="prod-section prod-dark-section">
        <div className="prod-container">
          <span className="prod-accent-label">Connection Methods</span>
          <h2 className="prod-section-h2">Connection methods.</h2>
          <div className="prod-spec-grid prod-spec-4col">
            {[
              {
                name: "Clamp Coupling",
                images: ["/conn-clamp-1.webp", "/conn-clamp-2.webp", "/conn-clamp-3.webp", "/conn-clamp-4.webp"],
                labels: ["Iso", "Closeup", "Section Iso", "Section Closeup"],
              },
              {
                name: "Welded",
                images: ["/conn-welded-1.webp", "/conn-welded-2.webp", "/conn-welded-3.webp", "/conn-welded-4.webp"],
                labels: ["Iso", "Closeup", "Section Iso", "Section Closeup"],
              },
              {
                name: "Threaded",
                images: ["/conn-threaded-1.webp", "/conn-threaded-2.webp", "/conn-threaded-3.webp", "/conn-threaded-4.webp"],
                labels: ["Iso", "Section", "Section Iso", "Section Closeup"],
              },
              {
                name: "Flanged",
                images: ["/conn-flanged-1.webp", "/conn-flanged-2.webp", "/conn-flanged-3.webp", "/conn-flanged-4.webp"],
                labels: ["Iso", "Closeup", "Section Iso", "Section Closeup"],
              },
            ].map((conn, ci) => (
              <ConnectorCard key={ci} name={conn.name} images={conn.images} labels={conn.labels} delay={ci} />
            ))}
          </div>
        </div>
      </section>
    </ProductLayout>
  );
}

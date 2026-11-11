"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import ProductLayout from "../../components/ProductLayout";
import Image from "next/image";

/* ── ConnectorCard (same as RTP page) ── */
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
          <Image key={i} src={src} alt={`${name} — ${labels[i]}`} width={400} height={400}
            className={`conn-card-img${activeIdx === i ? " active" : ""}`} />
        ))}
        <div className="conn-card-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>
          Hover to rotate
        </div>
      </div>
      <div className="conn-card-dots">
        {images.map((_, i) => (
          <button key={i} className={`conn-dot${activeIdx === i ? " active" : ""}`}
            onClick={() => { stopCycle(); setActiveIdx(i); }} aria-label={labels[i]} />
        ))}
      </div>
      <h3 className="conn-card-name">{name}</h3>
      <span className="conn-card-view">{labels[activeIdx]}</span>
    </div>
  );
}

/* ── Wear Chart Data ── */
const CHARTS = [
  {
    id: "tailings",
    label: "Coarse Iron Tailings",
    title: "Ring Rope Abrasion Test — Coarse-Grain Iron Tailings Slurry",
    maxY: 1.6,
    yTicks: [0.0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6],
    labels: [50, 100, 150, 200, 250, 300, 350, 400],
    series: [
      { name: "X65", color: "#a8d8ea", data: [1.35, 1.15, 1.08, 1.05, 1.03, 1.0, 1.0, 1.0] },
      { name: "HDPE", color: "#7bb8d4", data: [0.75, 0.68, 0.65, 0.62, 0.60, 0.58, 0.58, 0.57] },
      { name: "UHMWPE", color: "#6b8db5", data: [0.55, 0.47, 0.48, 0.49, 0.45, 0.43, 0.43, 0.43] },
      { name: "PU", color: "#b8c5d6", data: [0.40, 0.35, 0.30, 0.28, 0.25, 0.23, 0.23, 0.22] },
      { name: "PFP-RX POE", color: "var(--green)", data: [0.30, 0.25, 0.23, 0.22, 0.20, 0.19, 0.18, 0.18] },
    ],
  },
  {
    id: "concentrate",
    label: "Coarse Iron Concentrate",
    title: "Ring Rope Abrasion Test — Coarse-Grain Iron Concentrate Slurry",
    maxY: 3.5,
    yTicks: [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5],
    labels: [75, 150, 225, 300, 375, 450],
    series: [
      { name: "Rubber", color: "#6b8db5", data: [3.2, 2.7, 2.3, 2.1, 2.0, 1.9] },
      { name: "X65", color: "#a8d8ea", data: [2.9, 2.0, 1.5, 1.0, 0.9, 0.85] },
      { name: "HDPE", color: "#7bb8d4", data: [0.9, 0.9, 0.87, 0.85, 0.85, 0.83] },
      { name: "UHMWPE", color: "#b8c5d6", data: [0.6, 0.58, 0.55, 0.55, 0.47, 0.45] },
      { name: "PFP-RX POE", color: "var(--green)", data: [0.25, 0.25, 0.25, 0.23, 0.23, 0.23] },
    ],
  },
];

function WearChart({ chart }: { chart: typeof CHARTS[0] }) {
  const [hoveredSeries, setHoveredSeries] = useState<number | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<{ si: number; pi: number; x: number; y: number; val: number } | null>(null);

  const W = 600, H = 360;
  const PAD = { top: 30, right: 20, bottom: 50, left: 48 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const minX = chart.labels[0];
  const maxX = chart.labels[chart.labels.length - 1];
  const xScale = (v: number) => PAD.left + ((v - minX) / (maxX - minX)) * chartW;
  const yScale = (v: number) => PAD.top + (1 - v / chart.maxY) * chartH;

  return (
    <div className="wear-chart-wrap">
      <div className="wear-chart-container">
        <svg viewBox={`0 0 ${W} ${H}`} className="wear-chart-svg"
          onMouseLeave={() => { setHoveredPoint(null); setHoveredSeries(null); }}>
          {chart.yTicks.map((t) => (
            <g key={t}>
              <line x1={PAD.left} y1={yScale(t)} x2={W - PAD.right} y2={yScale(t)} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <text x={PAD.left - 10} y={yScale(t) + 4} textAnchor="end" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="var(--font-poppins)">{t.toFixed(1)}</text>
            </g>
          ))}
          {chart.labels.map((l) => (
            <text key={l} x={xScale(l)} y={H - PAD.bottom + 20} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="var(--font-poppins)">{l}</text>
          ))}
          <line x1={PAD.left} y1={H - PAD.bottom} x2={W - PAD.right} y2={H - PAD.bottom} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

          {chart.series.map((s, si) => {
            const points = s.data.map((d, i) => `${xScale(chart.labels[i])},${yScale(d)}`).join(" ");
            const isActive = hoveredSeries === null || hoveredSeries === si;
            const isPFP = s.name === "PFP-RX POE";
            return (
              <g key={si} style={{ opacity: isActive ? 1 : 0.15, transition: "opacity 0.3s" }}>
                <polyline points={points} fill="none" stroke={s.color} strokeWidth={isPFP ? 3.5 : 2} strokeLinecap="round" strokeLinejoin="round" />
                {s.data.map((d, pi) => (
                  <g key={pi}>
                    <circle cx={xScale(chart.labels[pi])} cy={yScale(d)} r={12} fill="transparent"
                      onMouseEnter={() => { setHoveredSeries(si); setHoveredPoint({ si, pi, x: xScale(chart.labels[pi]), y: yScale(d), val: d }); }}
                      style={{ cursor: "pointer" }} />
                    <circle cx={xScale(chart.labels[pi])} cy={yScale(d)}
                      r={hoveredPoint?.si === si && hoveredPoint?.pi === pi ? 6 : isPFP ? 4.5 : 3}
                      fill={s.color} stroke={hoveredPoint?.si === si && hoveredPoint?.pi === pi ? "var(--white)" : "none"} strokeWidth="2"
                      style={{ transition: "r 0.15s" }} />
                  </g>
                ))}
              </g>
            );
          })}

          {hoveredPoint && (
            <g>
              <rect x={hoveredPoint.x - 52} y={hoveredPoint.y - 38} width={104} height={28} rx={6} fill="rgba(0,0,0,0.85)" />
              <text x={hoveredPoint.x} y={hoveredPoint.y - 20} textAnchor="middle" fill="var(--white)" fontSize="11" fontWeight="600" fontFamily="var(--font-poppins)">
                {chart.series[hoveredPoint.si].name}: {hoveredPoint.val.toFixed(2)}
              </text>
            </g>
          )}
        </svg>
      </div>
      <div className="wear-chart-legend">
        {chart.series.map((s, si) => (
          <button key={si}
            className={`wear-legend-item${hoveredSeries === si ? " active" : ""}${s.name === "PFP-RX POE" ? " pfp" : ""}`}
            onMouseEnter={() => setHoveredSeries(si)}
            onMouseLeave={() => setHoveredSeries(null)}>
            <span className="wear-legend-dot" style={{ background: s.color }} />
            {s.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function PFPRXAbrasionPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeChart, setActiveChart] = useState(0);

  const products = [
    {
      id: "rtp",
      label: "PFP-RX RTP",
      img: "/pfprx-rtp.png",
      size: "DN50 — DN900",
      pressure: "1.6 — 32 MPa",
      lengths: "12 — 500m",
      desc: "Reinforced Thermoplastic Pipe with a PFP-RX wear resistant liner and high-strength fibre reinforcement. Spoolable, flexible, and engineered for medium-to-high pressure slurry and abrasive media applications.",
    },
    {
      id: "lined-steel",
      label: "PFP-RX Lined Steel",
      img: "/pfprx-lined-steel.png",
      size: "DN50 — DN1200",
      pressure: "1.6 — 32 MPa",
      lengths: "12 — 18m",
      desc: "Heavy-duty steel pipe with a mechanically locked PFP-RX POE wear resistant liner. Designed for the highest pressure and most demanding abrasive slurry applications where maximum wear life is critical.",
    },
    {
      id: "coex",
      label: "PFP-RX Co-Extruded PE",
      img: "/pfprx-coex.png",
      size: "DN90 — DN630",
      pressure: "0.8 — 1.6 MPa",
      lengths: "12 — 500m",
      desc: "Co-extruded polyethylene pipe with an integrated PFP-RX POE wear resistant inner layer. Ideal for low-to-medium pressure slurry transport where flexibility and long continuous lengths are required.",
    },
  ];

  const activeProduct = products[activeTab];

  return (
    <ProductLayout
      title="PFP-RX Wear Resistant Piping."
      subtitle="PFP PRODUCT RANGE"
      blurb="Complete pipeline solutions for every slurry application. The PFP-RX Lined Range is a comprehensive family of abrasion-resistant piping systems designed to meet every pressure class and performance demand."
      heroImage="/product-abrasion.jpg"
      heroImageAlt="PFP-RX Wear Resistant Piping"
      heroVariant="mesh"
      heroSeed={91}
      brochureUrl="/brochures/pfp-rx-wear-resistant-piping.pdf"
      brochurePreview="/brochures/rx-brochure-cover.jpg"
      brochurePreviewAlt="PFP-RX Wear Resistant Piping brochure cover"
    >
      {/* TWO-COLUMN INTRO */}
      <section className="prod-intro-section">
        <div className="prod-container">
          <div className="prod-intro-grid rv">
            <div className="prod-intro-img">
              <Image src="/pfprx-about.jpg" alt="PFP-RX wear resistant pipe" width={600} height={500} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
            </div>
            <div className="prod-intro-text">
              <span className="prod-accent-label">About PFP-RX</span>
              <h2 className="prod-intro-h2">Complete Pipeline Solutions for Every Slurry Application</h2>
              <p>PFP supports slurry pipeline applications through a range of engineered lining solutions designed for demanding service conditions. These systems are selected to suit project-specific requirements, including material compatibility, installation methodology, and wear performance.</p>
              <p>The PFP-RX Lined Range has been developed as a structured offering of abrasion-resistant piping systems, covering a range of pressure classes and operating conditions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT RANGE — TABBED */}
      <section className="prod-section prod-dark-section">
        <div className="prod-container">
          <span className="prod-accent-label">Product Range</span>
          <h2 className="prod-section-h2">The PFP-RX product range.</h2>

          <div className="pfv-tabs">
            {products.map((p, i) => (
              <button key={p.id} className={`pfv-tab${activeTab === i ? " active" : ""}`} onClick={() => setActiveTab(i)}>
                {p.label}
              </button>
            ))}
          </div>

          <div className="pfv-panel pfv-panel-centered" key={activeProduct.id}>
            <div className="pfv-panel-img pfv-panel-img-diagram">
              <Image src={activeProduct.img} alt={activeProduct.label} width={500} height={500} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div className="pfv-panel-content">
              <h3 className="pfv-panel-title">{activeProduct.label}</h3>
              <div className="pfv-spec-list">
                <div className="pfv-spec-row">
                  <span className="pfv-spec-label">Size Range</span>
                  <span className="pfv-spec-value">{activeProduct.size}</span>
                </div>
                <div className="pfv-spec-row">
                  <span className="pfv-spec-label">Pressure Range</span>
                  <span className="pfv-spec-value">{activeProduct.pressure}</span>
                </div>
                <div className="pfv-spec-row">
                  <span className="pfv-spec-label">Lengths</span>
                  <span className="pfv-spec-value">{activeProduct.lengths}</span>
                </div>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(0,0,0,0.6)", marginTop: 16 }}>{activeProduct.desc}</p>
            </div>
          </div>

          <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.55)", marginTop: 32, textAlign: "center", maxWidth: 800, marginLeft: "auto", marginRight: "auto" }}>
            Together, these solutions provide a complete, field-proven range of pipeline systems engineered for the efficient transport of liquids, slurries, and abrasive media. The PFP-RX range delivers longer service life, lower maintenance costs, and superior wear performance compared to conventional slurry pipelines.
          </p>
        </div>
      </section>

      {/* KEY FEATURES — ICON CARDS */}
      <section className="prod-section prod-light-section">
        <div className="prod-container">
          <span className="prod-accent-label dark">Key Features</span>
          <h2 className="prod-section-h2">Product features &amp; benefits.</h2>
          <div className="rtp-features-grid">
            <div className="rtp-feature-card rv">
              <div className="rtp-feature-icon rtp-feature-icon-lg">
                <Image src="/rtp-feat-wear.png" alt="Wear Resistance" width={200} height={200} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <h3>Wear Resistance</h3>
              <p>PFP-RX delivers superior wear resistance, significantly outperforming steel, UHMWPE, and HDPE pipes in abrasive slurry and high-velocity transport applications.</p>
            </div>

            <div className="rtp-feature-card rv d1">
              <div className="rtp-feature-icon rtp-feature-icon-lg">
                <Image src="/rtp-feat-hydraulic.png" alt="Hydraulic Properties" width={200} height={200} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <h3>Hydraulic Properties</h3>
              <p>Featuring an exceptionally smooth inner surface, the pipe minimises friction and scaling, boosting flow efficiency by 20&ndash;30% compared to steel pipelines while reducing energy consumption.</p>
            </div>

            <div className="rtp-feature-card rv d2">
              <div className="rtp-feature-icon rtp-feature-icon-lg">
                <Image src="/rtp-feat-stability-nt.png" alt="Product Stability" width={200} height={200} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <h3>Product Stability</h3>
              <p>Backed by extensive R&amp;D and over 15,000 km of manufacturing experience, our high-pressure RTP is engineered under strict standards to ensure consistent quality, reliability, and performance.</p>
            </div>

            <div className="rtp-feature-card rv d3">
              <div className="rtp-feature-icon rtp-feature-icon-lg">
                <Image src="/rtp-feat-spoolable-nt.png" alt="Spoolable & Fast Construction" width={200} height={200} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <h3>Spoolable &amp; Fast Construction</h3>
              <p>RTP and Co-Extruded PE ranges are flexible and spoolable up to DN225, the pipe can be supplied in continuous lengths of 150&ndash;2,000 m, reducing joints by over 95%. Fixed-length options cut joints by 60% and double installation efficiency.</p>
            </div>

            <div className="rtp-feature-card rv d4">
              <div className="rtp-feature-icon rtp-feature-icon-lg">
                <Image src="/rtp-feat-pressure-nt.png" alt="Pressure Resistance" width={200} height={200} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <h3>Pressure Resistance</h3>
              <p>We offer a complete range of products to meet any pressure requirement, with the flexibility to deliver the most cost-effective solutions on the market.</p>
            </div>

            <div className="rtp-feature-card rv d5">
              <div className="rtp-feature-icon rtp-feature-icon-lg">
                <Image src="/rtp-feat-corrosion-nt.png" alt="Corrosion Resistance" width={200} height={200} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <h3>Corrosion Resistance</h3>
              <p>Constructed from advanced polymer, the pipe resists a wide range of corrosive media, extending service life by more than 10 years. Non-metallic sleeve joints eliminate corrosion issues commonly found with metal fittings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ENGINEERED DURABILITY — SIDE-BY-SIDE WITH SELECTABLE CHART */}
      <section className="prod-section prod-alt-section" style={{ background: "var(--dark2)" }}>
        <div className="prod-container">
          <div className="pfprx-durability-grid">
            <div className="pfprx-durability-text">
              <span className="prod-accent-label">Engineered Durability</span>
              <h2 className="prod-section-h2" style={{ color: "var(--white)", textAlign: "left" }}>Proven performance.</h2>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
                Independent Abrasion Testing demonstrates that PFP-RX consistently outperforms all conventional piping materials across multiple slurry types.
              </p>
              <div className="pfprx-chart-tabs">
                {CHARTS.map((c, i) => (
                  <button key={c.id} className={`pfprx-chart-tab${activeChart === i ? " active" : ""}`} onClick={() => setActiveChart(i)}>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="pfprx-durability-chart">
              <WearChart chart={CHARTS[activeChart]} />
            </div>
          </div>
        </div>
      </section>

      {/* CONNECTION METHODS — INTERACTIVE 3D RENDERS */}
      <section className="prod-section prod-light-section">
        <div className="prod-container">
          <span className="prod-accent-label dark">Connection Methods</span>
          <h2 className="prod-section-h2">Connection methods.</h2>
          <div className="prod-spec-grid prod-spec-4col">
            {[
              {
                name: "Clamp Coupling",
                images: ["/conn-clamp-1.webp", "/conn-clamp-2.webp", "/conn-clamp-3.webp", "/conn-clamp-4.webp"],
                labels: ["Iso", "Closeup", "Section Iso", "Section Closeup"],
              },
              {
                name: "Hub-Welded",
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

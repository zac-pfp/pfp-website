"use client";

import { useState } from "react";
import ProductLayout from "../../components/ProductLayout";
import Image from "next/image";
import PipeCalcModal from "../../components/PipeCalcModal";

/* ── Capability Data ── */
const CAPABILITIES = [
  {
    id: "standards",
    label: "Standards & Manufacturing",
    icon: "/lp-icon-standards.png",
    description: "Full compliance with major international linepipe standards and manufacturing methods. Our network of qualified mills enables production in accordance with stringent project specifications.",
    items: [
      { tag: "Seamless", desc: "No weld seam — ideal for high-pressure, critical service applications where maximum integrity is required." },
      { tag: "LSAW", desc: "Longitudinal Submerged Arc Welded pipe, commonly used for large-diameter pipelines in both onshore and offshore applications." },
      { tag: "HFW", desc: "High-Frequency (Electric Resistance) Welded pipe, generally applied in mid-range diameters for standard service conditions." },
      { tag: "API 5L", desc: "Primary linepipe specification for oil and gas applications, covering a range of grades (commonly X42 to X80, with higher grades available)." },
      { tag: "DNV-ST-F101", desc: "Offshore pipeline standard covering design, materials, fabrication, and installation of submarine pipeline systems." },
      { tag: "ASTM", desc: "Standards defining material properties, testing requirements, and quality criteria across a wide range of pipe materials." },
      { tag: "EN", desc: "European standards governing manufacturing, tolerances, and material specifications for linepipe." },
    ],
  },
  {
    id: "diameter",
    label: "Diameter & Thickness",
    icon: "/lp-icon-diameter.png",
    description: "Complete size range coverage for onshore and offshore pipeline projects — from small-bore utility lines through to large-diameter trunk lines.",
    items: [
      { tag: "2\" – 48\"", desc: "Full diameter range covering small-bore process lines through to large-diameter transmission pipelines." },
      { tag: "Standard Wall", desc: "All standard wall thicknesses per API, ASTM, and EN specifications for general service applications." },
      { tag: "Heavy Wall", desc: "Increased wall thickness for high-pressure service, sour gas environments, and deepwater subsea installations." },
      { tag: "Custom Schedules", desc: "Non-standard wall thicknesses manufactured to project-specific requirements and engineering calculations." },
    ],
  },
  {
    id: "testing",
    label: "Testing Procedures",
    icon: "/lp-icon-testing.png",
    description: "Comprehensive non-destructive and destructive testing capabilities ensuring material integrity and full compliance with project specifications.",
    items: [
      { tag: "Ultrasonic (UT)", desc: "Non-destructive testing using sound waves to detect internal defects, laminations, and wall thickness variations." },
      { tag: "Radiographic (RT)", desc: "X-ray or gamma-ray inspection of welds to identify internal defects such as porosity and inclusions." },
      { tag: "Mag-Particle (MT)", desc: "Inspection method for detecting surface and near-surface discontinuities in ferromagnetic materials." },
      { tag: "Dye-Penetrant (PT)", desc: "Inspection method for detecting surface-breaking defects in non-porous materials." },
      { tag: "Hydrostatic", desc: "Pressure testing to verify pipe integrity and leak tightness at specified test pressures." },
      { tag: "Bend Test", desc: "Mechanical testing to assess ductility and weld soundness through guided or free bend specimens." },
      { tag: "DWTT", desc: "Drop Weight Tear Testing to evaluate fracture propagation resistance, typically at specified temperatures." },
      { tag: "CTOD Testing", desc: "Crack Tip Opening Displacement (CTOD) is a fracture mechanics test that measures a material\u2019s resistance to crack propagation, particularly for ductile materials that show significant plastic deformation before failure." },
      { tag: "Charpy V-Notch", desc: "Impact toughness testing at specified temperatures to ensure material performance in low-temperature service." },
    ],
  },
  {
    id: "external",
    label: "External Coating Systems",
    icon: "/lp-icon-external.png",
    description: "Protective external coating systems engineered for pipeline integrity across all operating environments — from buried onshore pipelines to deepwater subsea installations.",
    items: [
      { tag: "FBE", desc: "Fusion Bonded Epoxy — Thermosetting powder coating providing corrosion protection, commonly used as a standalone system or as a base layer in multi-layer coatings." },
      { tag: "3LPP", desc: "Multi-layer coating system designed for elevated temperature service, typically suitable for operating temperatures up to ~140°C." },
      { tag: "3LPE", desc: "Widely used external coating system for buried onshore pipelines, offering robust corrosion protection and mechanical resistance." },
      { tag: "TIC", desc: "Thermal Insulation Coating — Provides thermal insulation for subsea pipelines to maintain product temperature and support flow assurance." },
      { tag: "CWC", desc: "Concrete Weight Coating — High-density concrete coating providing negative buoyancy and on-bottom stability for offshore pipelines." },
    ],
  },
  {
    id: "internal",
    label: "Internal Coating Systems",
    icon: "/lp-icon-internal.png",
    description: "Internal lining and coating solutions designed to enhance flow efficiency, reduce friction losses, and provide corrosion and abrasion resistance.",
    items: [
      { tag: "Liquid Epoxy", desc: "As per API 5L7, flow coating is a thin-film epoxy coating applied in natural gas pipelines to smooth the internal pipe surface for improved flow efficiency and rust resistance. Coating material is a solvent-free epoxy, formulation designed to meet strict environmental regulations." },
      { tag: "Primed FBE Coating", desc: "High-performance, two-layer internal pipe protection system combining a liquid phenolic primer with a fusion bonded epoxy (FBE) topcoat for superior adhesion and long-lasting corrosion resistance. Designed for reliability in demanding environments, it meets key international standards including DEP 31.40.30.39, 09-SAMSS-091, KOC-P-005, PDO-SP-2217, API 5L7, and AWWA C213." },
      { tag: "Polyurethane (PU) Coating", desc: "Two-part, solvent-free, polyurethane (PU) lining for water pipeline, specifically designed for corrosion and abrasion resistance for desalinated water, potable water, oilfield water, sewage, waste water etc. The PU coating is compliant with AWWA C222 and NSF/ANSI 61 (potable water)." },
      { tag: "Cement Mortar Lining (CML)", desc: "CML is widely used for water based medium transmission for oilfield tubulars and line pipe, which has an economical internal corrosion and abrasion resistance." },
    ],
  },
];

export default function LinepipeCoatingPage() {
  const [activeCap, setActiveCap] = useState(0);
  const [calcOpen, setCalcOpen] = useState(false);
  const cap = CAPABILITIES[activeCap];

  return (
    <ProductLayout
      title="Linepipe & Coating Solutions."
      subtitle="PFP PRODUCT RANGE"
      blurb="Supply of carbon steel, stainless steel, and alloy linepipe for the energy sector. Services include hot-induction bending, protective internal and external coatings, concrete weight coating and cathodic protection anodes."
      heroImage="/LINEPIPE.JPG"
      heroImageAlt="Linepipe & Coating Solutions"
      heroVariant="mesh"
      heroSeed={58}
    >
      {/* TWO-COLUMN INTRO */}
      <section className="prod-intro-section">
        <div className="prod-container">
          <div className="prod-intro-grid rv">
            <div className="prod-intro-img">
              <Image src="/LINEPIPE.JPG" alt="Linepipe products" width={600} height={500} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
            </div>
            <div className="prod-intro-text">
              <span className="prod-accent-label">About This Product</span>
              <h2 className="prod-intro-h2">Complete Linepipe & Coating Solutions for the Energy Sector</h2>
              <p>PFP provides end-to-end linepipe supply and coating solutions for onshore and offshore pipeline projects. Our comprehensive range covers standard and exotic grades across all major international specifications, supported by fully integrated logistics to ensure delivery direct to your project location.</p>
              <p>From material supply through to coating application and field joint solutions, we deliver a complete package tailored to your project requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES — INTERACTIVE ICON CARDS */}
      <section className="prod-section prod-dark-section">
        <div className="prod-container">
          <span className="prod-accent-label">Key Features</span>
          <h2 className="prod-section-h2">Explore our product capabilities.</h2>

          {/* Icon selector row */}
          <div className="lp-icon-row">
            {CAPABILITIES.map((c, i) => (
              <button
                key={c.id}
                className={`lp-icon-card${activeCap === i ? " active" : ""}`}
                onClick={() => setActiveCap(i)}
              >
                <div className="lp-icon-card-img">
                  <Image src={c.icon} alt={c.label} width={200} height={200} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
                <span className="lp-icon-card-label">{c.label}</span>
              </button>
            ))}
          </div>

          {/* Detail panel below */}
          <div className="lp-cap-detail" key={cap.id}>
            <p className="lp-cap-desc">{cap.description}</p>
            <div className="lp-cap-items">
              {cap.items.map((item) => (
                <div key={item.tag} className="lp-cap-item">
                  <span className="lp-cap-item-tag">{item.tag}</span>
                  <span className="lp-cap-item-desc">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Calculator CTA */}
          <div style={{ marginTop: 32, textAlign: "center" }}>
            <button
              onClick={() => setCalcOpen(true)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "12px 28px", background: "var(--green)", color: "var(--white)",
                border: "none", borderRadius: 6, fontSize: 14, fontWeight: 600,
                cursor: "pointer", transition: "opacity 0.2s",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="8" y1="10" x2="10" y2="10" /><line x1="14" y1="10" x2="16" y2="10" /><line x1="8" y1="14" x2="10" y2="14" /><line x1="14" y1="14" x2="16" y2="14" /><line x1="8" y1="18" x2="10" y2="18" /><line x1="14" y1="18" x2="16" y2="18" />
              </svg>
              Pipe Weight &amp; CWC Calculator
            </button>
          </div>

          {calcOpen && <PipeCalcModal onClose={() => setCalcOpen(false)} />}
        </div>
      </section>

      {/* CUSTOM SOLUTIONS */}
      <section className="prod-section prod-light-section">
        <div className="prod-container">
          <div className="prod-intro-grid rv">
            <div className="prod-intro-text">
              <span className="prod-accent-label dark">Custom Solutions</span>
              <h2 className="prod-intro-h2">Field Joint Internal Coating Robot</h2>
              <p>Internal field joint coating (IFJC) systems are deployed to provide corrosion protection at girth weld locations for newly constructed pipelines, covering diameters from 8&quot; to 56&quot;. These systems ensure consistent coating quality and efficient application under field conditions.</p>
              <p>Wireless control, integrated video monitoring, and onboard recording systems enable real-time oversight, with all application and inspection activities captured for traceability and quality assurance.</p>
            </div>
            <div className="prod-intro-img">
              <Image src="/ifcj-robot.png" alt="Internal Field Joint Coating Robot" width={600} height={400} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
            </div>
          </div>
        </div>
      </section>

      {/* INTERNAL PRIMED FBE */}
      <section className="prod-section prod-dark-section">
        <div className="prod-container">
          <div className="prod-intro-grid rv">
            <div className="prod-intro-img">
              <Image src="/primed-fbe.png" alt="Internal Primed FBE Coating" width={600} height={400} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
            </div>
            <div className="prod-intro-text">
              <span className="prod-accent-label">Advanced Coating</span>
              <h2 className="prod-section-h2">Internal primed FBE coating.</h2>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.8 }}>Internal primed FBE coating utilises a liquid phenolic epoxy primer in combination with a fusion bonded epoxy topcoat, applied using a controlled post-curing process to ensure strong adhesion, coating uniformity, and enhanced corrosion and abrasion resistance.</p>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.8, marginTop: 16 }}>Suitable for service in seawater, desalinated water, pulp, crude oil, raw natural gas, and other corrosive media.</p>
            </div>
          </div>
        </div>
      </section>
    </ProductLayout>
  );
}

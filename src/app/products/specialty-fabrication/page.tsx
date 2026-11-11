"use client";

import { useState } from "react";
import ProductLayout from "../../components/ProductLayout";
import Image from "next/image";

const FORGING_ITEMS = [
  {
    title: "Equalateral Tees",
    desc: "Custom fabricated equalateral tees for pipeline and process piping applications.",
    specs: ["Carbon steel, alloy, stainless, duplex & exotic alloys", "Project specifications & international codes", "Full material certification & traceability"],
  },
  {
    title: "Wye Pieces",
    desc: "Precision-engineered wye pieces for pipeline distribution and flow diversion systems.",
    specs: ["Wide range of materials to suit project requirements", "Custom sizes to project specifications", "Full material certification & traceability"],
  },
  {
    title: "Buckle Arrestors",
    desc: "Pipeline buckle arrestors for subsea and onshore systems, preventing propagation of pipeline buckling.",
    specs: ["Exacting dimensional tolerances", "Subsea & onshore pipeline systems", "Full material certification & traceability"],
  },
  {
    title: "Custom Forgings",
    desc: "Bespoke forged and machined piping components — nozzles, flanges, couplings and specialty fittings.",
    specs: ["Carbon steel, alloy, stainless, duplex & exotic alloys", "Qualified manufacturers worldwide", "Full material certification & traceability"],
  },
];

const FABRICATION_TABS = [
  {
    id: "spooling",
    label: "Modular Spooling",
    image: "/SF_ModularSpooling.jpg",
    specs: [
      { label: "Description", value: "Pre-fabricated pipeline spools and modules to streamline installation and minimise on-site welding" },
      { label: "Products", value: "Pipeline spools, pre-fabricated modules & assemblies" },
      { label: "Materials", value: "Carbon steel, stainless steel, duplex & exotic alloys" },
      { label: "Standards", value: "Manufactured to project specifications" },
      { label: "Certification", value: "Full material certification & traceability" },
    ],
  },
  {
    id: "subsea",
    label: "Subsea Structures & Assemblies",
    image: "/SF_SubseaStructures.jpg",
    specs: [
      { label: "Description", value: "Fabrication of PLETs, manifolds, WYE structures, and protection frames to offshore specifications" },
      { label: "Products", value: "PLETs, manifolds, WYE structures & protection frames" },
      { label: "Standards", value: "Manufactured to offshore specifications" },
      { label: "Materials", value: "Carbon steel, stainless steel, duplex & exotic alloys" },
      { label: "Certification", value: "Full material certification & traceability" },
    ],
  },
  {
    id: "structural",
    label: "Structural & Skid Fabrication",
    image: "/SF_Structual.jpg",
    specs: [
      { label: "Description", value: "Packaged systems including pig launchers/receivers, metering skids, and injection units, supplied fully assembled and tested" },
      { label: "Products", value: "Pig launchers/receivers, metering skids & injection units" },
      { label: "Delivery", value: "Supplied fully assembled & tested" },
      { label: "Materials", value: "Carbon steel, stainless steel & alloys" },
      { label: "Certification", value: "Full material certification & traceability" },
    ],
  },
  {
    id: "pressure",
    label: "Pressure Equipment & Process Modules",
    image: "/SF_Pressure.jpg",
    specs: [
      { label: "Description", value: "Custom-built skids, frames, and support structures designed for integrated equipment mounting and efficient installation" },
      { label: "Products", value: "Custom skids, frames & support structures" },
      { label: "Design", value: "Integrated equipment mounting & efficient installation" },
      { label: "Materials", value: "Carbon steel, stainless steel, duplex & exotic alloys" },
      { label: "Certification", value: "Full material certification & traceability" },
    ],
  },
];

export default function SpecialtyFabricationPage() {
  const [fabTab, setFabTab] = useState(0);
  const fab = FABRICATION_TABS[fabTab];

  return (
    <ProductLayout
      title="Specialty Fabrication & Forged Items."
      subtitle="PFP PRODUCT RANGE"
      blurb="Custom specialty fabrication and forged items for energy and process industries — including equalateral tees, wye pieces, buckle arrestors, and bespoke piping components manufactured to project specifications."
      heroImage="/product-heat-exchanger.jpg"
      heroImageAlt="Specialty Fabrication & Forged Items"
      heroVariant="mesh"
      heroSeed={203}
    >
      {/* TWO-COLUMN INTRO */}
      <section className="prod-intro-section">
        <div className="prod-container">
          <div className="prod-intro-grid rv">
            <div className="prod-intro-img">
              <Image src="/SF_AboutThisProduct.jpg" alt="Specialty fabrication" width={600} height={500} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
            </div>
            <div className="prod-intro-text">
              <span className="prod-accent-label">About This Product</span>
              <h2 className="prod-intro-h2">Custom Fabrication for Critical Applications</h2>
              <p>PFP provides specialty fabrication and forged items for the energy and process industries. From equalateral tees and wye pieces to buckle arrestors and bespoke piping components, we deliver custom-engineered solutions manufactured to exacting project specifications.</p>
              <p>Our team works closely with clients to interpret project requirements and deliver precision-manufactured components with full material certification and traceability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: FORGINGS & SPECIALTY ITEMS — CARD GRID (dark) */}
      <section className="prod-section prod-dark-section">
        <div className="prod-container">
          <span className="prod-accent-label">Product Range</span>
          <h2 className="prod-section-h2">Forgings &amp; Specialty Items</h2>

          <div className="sfab-grid">
            {FORGING_ITEMS.map((item) => (
              <div key={item.title} className="sfab-card">
                <div className="sfab-card-icon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
                  </svg>
                </div>
                <h3 className="sfab-card-title">{item.title}</h3>
                <p className="sfab-card-desc">{item.desc}</p>
                <ul className="sfab-card-specs">
                  {item.specs.map((spec, i) => (
                    <li key={i}>{spec}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: FABRICATION CAPABILITIES — TABBED (light) */}
      <section className="prod-section prod-light-section">
        <div className="prod-container">
          <span className="prod-accent-label dark">Fabrication Services</span>
          <h2 className="prod-section-h2">Fabrication Capabilities</h2>

          <div className="pfv-tabs">
            {FABRICATION_TABS.map((t, i) => (
              <button key={t.id} className={`pfv-tab${fabTab === i ? " active" : ""}`} onClick={() => setFabTab(i)}>
                {t.label}
              </button>
            ))}
          </div>

          <div className="pfv-panel">
            <div className="pfv-panel-img">
              <Image src={fab.image} alt={fab.label} width={600} height={400} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div className="pfv-panel-content">
              <h3 className="pfv-panel-title">{fab.label}</h3>
              <div className="pfv-spec-list">
                {fab.specs.map((s, i) => (
                  <div key={i} className="pfv-spec-row">
                    <span className="pfv-spec-label">{s.label}</span>
                    <span className="pfv-spec-value">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOT INDUCTION BENDS (dark) */}
      <section className="prod-section prod-dark-section">
        <div className="prod-container">
          <span className="prod-accent-label">Bending</span>
          <h2 className="prod-section-h2">Hot Induction Bends</h2>
          <p style={{ color: "rgba(255,255,255,0.72)", maxWidth: 720, marginBottom: "0.5rem", lineHeight: 1.6 }}>
            Hot induction bends manufactured to ASME B16.49, ISO 15590-1, and DNV-ST-F101 across a broad range of materials and configurations.
          </p>

          <div className="sfab-grid sfab-grid-3">
            <div className="sfab-card">
              <div className="sfab-card-icon">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
              </div>
              <h3 className="sfab-card-title">Carbon Steel</h3>
              <p className="sfab-card-desc">Welded (LSAW, HFW) and Seamless. API 5L grades X42 through X80. Sizes up to 48&quot;.</p>
            </div>

            <div className="sfab-card">
              <div className="sfab-card-icon">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
              </div>
              <h3 className="sfab-card-title">Stainless Steel</h3>
              <p className="sfab-card-desc">Welded and Seamless. 304/304L, 316/316L, Duplex 2205, and Super Duplex 2507.</p>
            </div>

            <div className="sfab-card">
              <div className="sfab-card-icon">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0L21.75 16.5 12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                </svg>
              </div>
              <h3 className="sfab-card-title">Cladded</h3>
              <p className="sfab-card-desc">Weld Overlay (WOL), Explosion Bonded (EB), and Hot Roll Bonded (HRB).</p>
            </div>
          </div>
        </div>
      </section>
    </ProductLayout>
  );
}

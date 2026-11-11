"use client";

import { useState } from "react";
import ProductLayout from "../../components/ProductLayout";
import Image from "next/image";

/* ── Heat Exchanger Parts Tab Data ── */
const PARTS_TABS = [
  {
    id: "tubes",
    label: "Tubes & Tubing",
    image: "/hx-tubes.jpg",
    specs: [
      { label: "Types", value: "Seamless & Welded Tubes, Precision Tubing" },
      { label: "Finned Tubing", value: "L Type, Low & High Fin, Soldered & Extruded" },
      { label: "Accessories", value: "Tube sleeves, straight or flared tube ferrules & inserts" },
      { label: "Insert Types", value: "Seamless, Welded or Machined from Round Bar" },
      { label: "Coil Tube", value: "Seamless coil tube in various alloys" },
      { label: "Materials", value: "Carbon steel, stainless steel, duplex, nickel alloys & titanium" },
    ],
  },
  {
    id: "tubesheets",
    label: "Tube Sheets & Baffles",
    image: "/hx-tubesheet.jpg",
    specs: [
      { label: "Types", value: "Forged & Machined Tube Sheets, Baffles" },
      { label: "Materials", value: "Carbon, Alloy, Stainless, Duplex, Nickel Alloy, Titanium" },
      { label: "Clad Options", value: "Bi-metallic clad materials" },
      { label: "Machining", value: "Precision drilled & machined to project specifications" },
      { label: "Sizes", value: "Custom diameters to suit exchanger shell requirements" },
    ],
  },
  {
    id: "plate",
    label: "Plate & Forgings",
    image: "/hx-plate-forgings.jpg",
    specs: [
      { label: "Materials", value: "Carbon, Alloy, Stainless, Duplex, Nickel Alloy, Titanium" },
      { label: "Clad Options", value: "Bi-metallic clad plate & forgings" },
      { label: "Nozzles", value: "Forged nozzles to project specifications" },
      { label: "Flanges", value: "Shell, Channel & Penny flanges" },
      { label: "Dished Heads", value: "Conical, Hemispherical & Ellipsoidal" },
      { label: "Custom", value: "Custom forgings to order" },
    ],
  },
];

export default function HeatExchangersPage() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = PARTS_TABS[activeTab];

  return (
    <ProductLayout
      title="Heat Exchangers, Parts & Fabrication."
      subtitle="PFP PRODUCT RANGE"
      blurb="Comprehensive heat exchanger fabrication and component supply — from shell and tube exchangers to precision tubing, tube sheets, and specialty parts — manufactured to international codes and quality standards."
      heroImage="/product-heat-exchanger.jpg"
      heroImageAlt="Shell & Tube Heat Exchanger"
      heroVariant="mesh"
      heroSeed={42}
    >
      {/* TWO-COLUMN INTRO */}
      <section className="prod-intro-section">
        <div className="prod-container">
          <div className="prod-intro-grid rv">
            <div className="prod-intro-img">
              <Image src="/hx-fabrication.jpg" alt="Heat exchanger manufacturing" width={600} height={500} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
            </div>
            <div className="prod-intro-text">
              <span className="prod-accent-label">About This Product</span>
              <h2 className="prod-intro-h2">Heat Exchanger Fabrication & Component Supply</h2>
              <p>PFP provides end-to-end heat exchanger solutions, from component supply through to complete fabrication. Our capabilities span shell and tube heat exchangers, precision tubing, tube sheets, baffles, and associated pressure parts — sourced from qualified manufacturers worldwide and manufactured to exacting project specifications.</p>
              <p>Our team offers technical support on material selection, third-party inspection coordination, and full material certification and traceability to meet the most stringent project requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HEAT EXCHANGER PARTS — TABBED */}
      <section className="prod-section prod-dark-section">
        <div className="prod-container">
          <span className="prod-accent-label">Heat Exchanger Parts</span>
          <h2 className="prod-section-h2">Explore our heat exchanger component supply.</h2>

          {/* Tab bar */}
          <div className="pfv-tabs">
            {PARTS_TABS.map((t, i) => (
              <button
                key={t.id}
                className={`pfv-tab${activeTab === i ? " active" : ""}`}
                onClick={() => setActiveTab(i)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Featured panel */}
          <div className="pfv-panel" key={tab.id}>
            <div className="pfv-panel-img">
              <Image
                src={tab.image}
                alt={tab.label}
                width={600}
                height={400}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
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
        </div>
      </section>

      {/* HEAT EXCHANGER FABRICATION (with Standards & Compliance merged in) */}
      <section className="prod-section prod-light-section">
        <div className="prod-container">
          <div className="prod-intro-grid rv">
            <div className="prod-intro-text">
              <span className="prod-accent-label dark">Heat Exchanger Fabrication</span>
              <h2 className="prod-intro-h2">Heat Exchanger Fabrication Services</h2>
              <p>Specialising in shell and tube heat exchangers, we offer full fabrication services aligned with Australian and international safety, design and operational standards.</p>
              <div className="prod-feature-list">
                <div className="prod-feature-item">
                  <strong>Shell and Tube Heat Exchangers</strong> — Complete fabrication from design to delivery
                </div>
                <div className="prod-feature-item">
                  <strong>Condensers & Coolers</strong> — Custom heat exchanger fabrication for process cooling applications
                </div>
                <p style={{ fontWeight: 600, marginTop: "1rem", marginBottom: "0.25rem" }}>Compliance to applicable codes and specifications</p>
                <div className="prod-feature-item">
                  <strong>AS1210, AS1228, AS4041</strong> — Australian pressure equipment design standards
                </div>
                <div className="prod-feature-item">
                  <strong>ASME &quot;U&quot; Stamp</strong> — A1 and A2 certificates and American authorization
                </div>
                <div className="prod-feature-item">
                  <strong>Welding Standards</strong> — AS4458, AS3992, AS3920.1, ISO3834-2
                </div>
                <div className="prod-feature-item">
                  <strong>Quality & Safety</strong> — ISO 9001, 14001, 18001 certified
                </div>
              </div>
            </div>
            <div className="prod-intro-img">
              <Image src="/hx-fabrication2.jpg" alt="Heat exchanger fabrication" width={600} height={500} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
            </div>
          </div>
        </div>
      </section>
    </ProductLayout>
  );
}

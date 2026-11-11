"use client";

import { useState } from "react";
import ProductLayout from "../../components/ProductLayout";
import Image from "next/image";

/* ── Material Grade Data ── */
const MATERIAL_GRADES = [
  {
    id: "carbon",
    label: "Carbon Steel",
    grades: ["A106 Gr.B", "A333 Gr.6", "API 5L X42–X80", "A350 LF2", "A105", "A234 WPB"],
    applications: ["Process piping", "Structural systems", "High-pressure pipelines", "General utility services"],
    tempRange: "-46 °C to 425 °C",
    highlight: "Industry-standard workhorse for oil & gas and mining infrastructure.",
  },
  {
    id: "stainless",
    label: "Stainless Steel",
    grades: ["304 / 304L", "316 / 316L", "321", "347", "310S", "904L"],
    applications: ["Corrosive environments", "Chemical processing", "Food & beverage", "Pharmaceutical"],
    tempRange: "-196 °C to 816 °C",
    highlight: "Superior corrosion resistance for demanding chemical and marine environments.",
  },
  {
    id: "duplex",
    label: "Duplex & Super Duplex",
    grades: ["2205 (UNS S31803)", "2507 (UNS S32750)", "Lean Duplex 2101", "Zeron 100"],
    applications: ["Offshore platforms", "Subsea systems", "Desalination", "High-chloride environments"],
    tempRange: "-50 °C to 300 °C",
    highlight: "Twice the strength of austenitic stainless with excellent chloride resistance.",
  },
  {
    id: "exotic",
    label: "Exotic Alloys",
    grades: ["Hastelloy C-276", "Inconel 625 / 825", "Titanium Gr.2 / Gr.5", "Monel 400", "Alloy 20"],
    applications: ["Extreme corrosion", "High-temperature service", "Sour gas (H₂S)", "Acid processing"],
    tempRange: "-200 °C to 1000 °C+",
    highlight: "Ultimate performance in the most extreme temperature and corrosion conditions.",
  },
];

const PRODUCT_TABS = [
  {
    id: "pipe",
    label: "Pipe",
    image: "/pfv-pipes.jpg",
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
    id: "fittings",
    label: "Fittings",
    image: "/pfv-fittings.jpg",
    specs: [
      { label: "Sizes", value: "½\" – 60\"" },
      { label: "Schedules", value: "All standard, non-standard and heavy wall" },
      { label: "Types", value: "Butt-weld, Socket-weld, Threaded" },
      { label: "Materials", value: "Carbon steel, stainless steel & alloys" },
      { label: "Compliance", value: "All dimensional standards (ASME, MSS, DIN, etc.)" },
    ],
  },
  {
    id: "valves",
    label: "Valves",
    image: "/pfv-valve.jpg",
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
    id: "flanges",
    label: "Flanges",
    image: "/pfv-flanges.jpg",
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
    id: "bolting",
    label: "Bolting",
    image: "/pfv-bolting.jpg",
    specs: [
      { label: "Sizes", value: "Full range to suit flanges & pressure ratings" },
      { label: "Types", value: "Stud Bolts, Heavy Hex Bolts, Anchor Bolts, Nuts & Washers" },
      { label: "Materials", value: "Carbon steel, B7/L7, stainless steel, duplex & exotic alloys" },
      { label: "Coatings", value: "Black, Zinc, PTFE, Xylan & custom coatings" },
      { label: "Compliance", value: "ASTM, ASME, DIN, ISO standards" },
    ],
  },
  {
    id: "connectors",
    label: "Connectors & Couplings",
    image: "/pfv-coupling.jpg",
    specs: [
      { label: "Types", value: "Mechanical couplings, Grooved couplings, Clamp connectors" },
      { label: "Applications", value: "High-pressure, high-temperature, corrosive & abrasive services" },
      { label: "Materials", value: "Carbon steel, stainless steel, duplex & specialised alloys" },
      { label: "Compliance", value: "API, ASME & project-specific standards" },
    ],
  },
];

export default function PipeFittingsValvesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeGrade, setActiveGrade] = useState(0);
  const tab = PRODUCT_TABS[activeTab];
  const grade = MATERIAL_GRADES[activeGrade];

  return (
    <ProductLayout
      title="Pipe Fittings & Valves."
      subtitle="PFP PRODUCT RANGE"
      blurb="PFP supplies tailored piping, bulk material and valve supply solutions across carbon and stainless steels, duplex, super duplex, and exotic alloys including Hastelloy, Inconel, and Titanium."
      heroImage="/PIPES__FITTINGS___VALVES.jpeg"
      heroImageAlt="Pipe Fittings & Valves Supply"
      heroVariant="mesh"
      heroSeed={134}
    >
      {/* TWO-COLUMN INTRO */}
      <section className="prod-intro-section">
        <div className="prod-container">
          <div className="prod-intro-grid rv">
            <div className="prod-intro-img">
              <Image src="/pfv-about.jpg" alt="Steel pipe supply" width={600} height={500} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
            </div>
            <div className="prod-intro-text">
              <span className="prod-accent-label">About This Product</span>
              <h2 className="prod-intro-h2">The Ultimate Solution in Piping & Valve Supply</h2>
              <p>With over 30 years of experience, PFP provides comprehensive pipe, fitting, flange and valve supply solutions for Australia&apos;s most demanding projects. Our extensive product range covers everything from standard carbon steel to high-performance exotic alloys.</p>
              <p>We leverage our flexible global supply chain with approved mills across Europe and Asia to deliver competitive pricing, quality assurance and on-time logistics support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT RANGE — TABBED */}
      <section className="prod-section prod-dark-section">
        <div className="prod-container">
          <span className="prod-accent-label">Product Range</span>
          <h2 className="prod-section-h2">Explore our complete product range.</h2>

          {/* Tab bar */}
          <div className="pfv-tabs">
            {PRODUCT_TABS.map((t, i) => (
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

      {/* SUPPLY SOLUTIONS */}
      <section className="prod-section prod-light-section">
        <div className="prod-container">
          <div className="pfv-supply-grid">
            {/* LEFT — Flywheel */}
            <div className="pfv-supply-flywheel">
              <Image src="/Diagram_No_BG_No_Title.png" alt="PFP Project Solutions Flywheel" width={1758} height={1758} style={{ width: "100%", height: "auto" }} />
            </div>

            {/* RIGHT — Text + Interactive Material Grades */}
            <div className="pfv-supply-content">
              <span className="prod-accent-label dark">Supply Solutions</span>
              <h2 className="prod-intro-h2">Over Thirty Years of Project Supply Solutions</h2>
              <p>Utilising our network of approved mills and stockists across Europe and Asia, along with trusted and innovative emerging mills, we maintain a flexible approach to supply and are well equipped to deliver a broad range of material grades.</p>

              {/* Grade selector buttons */}
              <div className="pfv-grade-tabs">
                {MATERIAL_GRADES.map((g, i) => (
                  <button
                    key={g.id}
                    className={`pfv-grade-tab${activeGrade === i ? " active" : ""}`}
                    onClick={() => setActiveGrade(i)}
                  >
                    {g.label}
                  </button>
                ))}
              </div>

              {/* Expanded grade detail */}
              <div className="pfv-grade-detail" key={grade.id}>
                <p className="pfv-grade-highlight">{grade.highlight}</p>

                <div className="pfv-grade-info-grid">
                  <div className="pfv-grade-info-col">
                    <h4>Common Grades</h4>
                    <ul className="pfv-grade-list">
                      {grade.grades.map((g) => (
                        <li key={g}>{g}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="pfv-grade-info-col">
                    <h4>Key Applications</h4>
                    <ul className="pfv-grade-list">
                      {grade.applications.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                    <div className="pfv-grade-temp">
                      <span className="pfv-grade-temp-label">Service Temp Range</span>
                      <span className="pfv-grade-temp-value">{grade.tempRange}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ProductLayout>
  );
}

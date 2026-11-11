"use client";

import { useState, useEffect, useMemo } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

/* ── Pipe Schedule Reference Data ── */
// OD values per NPS, and WT values per schedule. Source: ASME B36.10M / B36.19M
const SCHEDULES = ["5S","10S","10","20","30","STD","40","60","XS","80","100","120","140","160","XXS"] as const;

type ScheduleRow = {
  nps: string;
  od: number;
  wt: Partial<Record<typeof SCHEDULES[number], number>>;
};

const PIPE_DATA: ScheduleRow[] = [
  { nps: '1/8"',  od: 10.29,  wt: { "10S": 1.24, "10": 1.24, STD: 1.73, "40": 1.73, XS: 2.41, "80": 2.41 } },
  { nps: '1/4"',  od: 13.72,  wt: { "10S": 1.65, "10": 1.65, STD: 2.24, "40": 2.24, XS: 3.02, "80": 3.02 } },
  { nps: '3/8"',  od: 17.15,  wt: { "10S": 1.65, "10": 1.65, STD: 2.31, "40": 2.31, XS: 3.20, "80": 3.20 } },
  { nps: '1/2"',  od: 21.34,  wt: { "5S": 1.65, "10S": 2.11, "10": 2.11, STD: 2.77, "40": 2.77, XS: 3.73, "80": 3.73, "160": 4.78, XXS: 7.47 } },
  { nps: '3/4"',  od: 26.67,  wt: { "5S": 1.65, "10S": 2.11, "10": 2.11, STD: 2.87, "40": 2.87, XS: 3.91, "80": 3.91, "160": 5.56, XXS: 7.82 } },
  { nps: '1"',    od: 33.40,  wt: { "5S": 1.65, "10S": 2.77, "10": 2.77, STD: 3.38, "40": 3.38, XS: 4.55, "80": 4.55, "160": 6.35, XXS: 9.09 } },
  { nps: '1¼"',  od: 42.16,  wt: { "5S": 1.65, "10S": 2.77, "10": 2.77, STD: 3.56, "40": 3.56, XS: 4.85, "80": 4.85, "160": 6.35, XXS: 9.70 } },
  { nps: '1½"',  od: 48.26,  wt: { "5S": 1.65, "10S": 2.77, "10": 2.77, STD: 3.68, "40": 3.68, XS: 5.08, "80": 5.08, "160": 7.14, XXS: 10.15 } },
  { nps: '2"',    od: 60.33,  wt: { "5S": 1.65, "10S": 2.77, "10": 2.77, STD: 3.91, "40": 3.91, XS: 5.54, "80": 5.54, "160": 8.74, XXS: 11.07 } },
  { nps: '2½"',  od: 73.03,  wt: { "5S": 2.11, "10S": 3.05, "10": 3.05, STD: 5.16, "40": 5.16, XS: 7.01, "80": 7.01, "160": 9.53, XXS: 14.02 } },
  { nps: '3"',    od: 88.90,  wt: { "5S": 2.11, "10S": 3.05, "10": 3.05, STD: 5.49, "40": 5.49, XS: 7.62, "80": 7.62, "160": 11.13, XXS: 15.24 } },
  { nps: '3½"',  od: 101.60, wt: { "5S": 2.11, "10S": 3.05, "10": 3.05, STD: 5.74, "40": 5.74, XS: 8.08, "80": 8.08 } },
  { nps: '4"',    od: 114.30, wt: { "5S": 2.11, "10S": 3.05, "10": 3.05, STD: 6.02, "40": 6.02, "60": 7.14, XS: 8.56, "80": 8.56, "100": 11.13, "120": 13.49, "160": 17.12, XXS: 17.12 } },
  { nps: '5"',    od: 141.30, wt: { "5S": 2.77, "10S": 3.40, "10": 3.40, STD: 6.55, "40": 6.55, "60": 9.53, XS: 9.53, "80": 12.70, "100": 15.88, "120": 19.05, "160": 22.23, XXS: 22.23 } },
  { nps: '6"',    od: 168.28, wt: { "5S": 2.77, "10S": 3.40, "10": 3.40, STD: 7.11, "40": 7.11, "60": 10.97, XS: 10.97, "80": 14.27, "100": 18.26, "120": 21.95, "160": 28.58, XXS: 28.58 } },
  { nps: '8"',    od: 219.08, wt: { "5S": 2.77, "10S": 3.76, "10": 3.76, "20": 6.35, "30": 7.04, STD: 8.18, "40": 8.18, "60": 12.70, XS: 12.70, "80": 15.09, "100": 18.26, "120": 23.01, "140": 25.40, "160": 28.58, XXS: 22.23 } },
  { nps: '10"',   od: 273.05, wt: { "5S": 3.40, "10S": 4.19, "10": 4.19, "20": 6.35, "30": 7.80, STD: 9.27, "40": 9.27, "60": 12.70, XS: 12.70, "80": 18.26, "100": 21.44, "120": 25.40, "140": 28.58, "160": 33.32, XXS: 25.40 } },
  { nps: '12"',   od: 323.85, wt: { "5S": 3.96, "10S": 4.57, "10": 4.57, "20": 6.35, "30": 8.38, STD: 9.53, "40": 10.31, "60": 14.27, XS: 12.70, "80": 21.44, "100": 25.40, "120": 28.58, "140": 33.32, "160": 38.10, XXS: 25.40 } },
  { nps: '14"',   od: 355.60, wt: { "5S": 3.96, "10S": 4.78, "10": 6.35, "20": 7.92, "30": 9.53, STD: 9.53, "40": 11.13, "60": 15.09, XS: 12.70, "80": 19.05, "100": 23.83, "120": 27.79, "140": 31.75, "160": 35.71 } },
  { nps: '16"',   od: 406.40, wt: { "5S": 4.19, "10S": 4.78, "10": 6.35, "20": 7.92, "30": 9.53, STD: 9.53, "40": 12.70, "60": 16.66, XS: 12.70, "80": 21.44, "100": 26.19, "120": 30.96, "140": 36.53, "160": 40.49 } },
  { nps: '18"',   od: 457.20, wt: { "5S": 4.19, "10S": 4.78, "10": 6.35, "20": 7.92, STD: 9.53, "30": 11.13, "40": 14.27, "60": 19.05, XS: 12.70, "80": 23.83, "100": 29.36, "120": 34.93, "140": 39.67, "160": 45.24 } },
  { nps: '20"',   od: 508.00, wt: { "5S": 4.78, "10S": 5.54, "10": 6.35, "20": 9.53, STD: 9.53, "30": 12.70, "40": 15.09, "60": 20.62, XS: 12.70, "80": 26.19, "100": 32.54, "120": 38.10, "140": 44.45, "160": 50.01 } },
  { nps: '24"',   od: 609.60, wt: { "5S": 5.54, "10S": 6.35, "10": 6.35, "20": 9.53, STD: 9.53, "30": 14.27, "40": 17.48, "60": 24.61, XS: 12.70, "80": 30.96, "100": 38.89, "120": 46.02, "140": 52.37, "160": 59.54 } },
  { nps: '30"',   od: 762.00, wt: { "5S": 6.35, "10S": 7.92, "10": 7.92, STD: 9.53, "20": 12.70, "30": 15.88, XS: 12.70 } },
  { nps: '36"',   od: 914.40, wt: { "5S": 7.92, "10S": 7.92, "10": 9.53, STD: 9.53, "20": 12.70, "30": 16.66, "40": 19.05, XS: 12.70 } },
  { nps: '42"',   od: 1066.80, wt: { STD: 9.53, "20": 12.70, "30": 16.66, XS: 12.70 } },
  { nps: '48"',   od: 1219.20, wt: { STD: 9.53, "20": 12.70, "30": 16.66, XS: 12.70 } },
];

/* ── Common NPS (Nominal Pipe Sizes) for quick-select ── */
const COMMON_SIZES = [
  { label: '1"', od: 33.40 },
  { label: '1.5"', od: 48.26 },
  { label: '2"', od: 60.33 },
  { label: '3"', od: 88.90 },
  { label: '4"', od: 114.30 },
  { label: '6"', od: 168.28 },
  { label: '8"', od: 219.08 },
  { label: '10"', od: 273.05 },
  { label: '12"', od: 323.85 },
  { label: '14"', od: 355.60 },
  { label: '16"', od: 406.40 },
  { label: '18"', od: 457.20 },
  { label: '20"', od: 508.00 },
  { label: '24"', od: 609.60 },
  { label: '30"', od: 762.00 },
  { label: '36"', od: 914.40 },
  { label: '42"', od: 1066.80 },
  { label: '48"', od: 1219.20 },
];

export default function ToolsPage() {
  const [od, setOd] = useState("");
  const [wt, setWt] = useState("");
  const [length, setLength] = useState("1");
  const [qty, setQty] = useState("1");
  const [result, setResult] = useState<{ massPerM: number; totalMass: number; totalLength: number; concreteMassPerM?: number; concreteTotalMass?: number; coatedLength?: number; combinedMassPerM?: number; combinedTotalMass?: number } | null>(null);
  const [selectedNps, setSelectedNps] = useState<number | null>(null);
  const [cwcEnabled, setCwcEnabled] = useState(false);
  const [cwcThickness, setCwcThickness] = useState("");
  const [cwcDensity, setCwcDensity] = useState("3040");
  const [cwcCutback, setCwcCutback] = useState("300");
  const [schedFilter, setSchedFilter] = useState<string>("ALL");
  const [sizeFilter, setSizeFilter] = useState<string>("ALL");
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: string } | null>(null);

  /* Filtered pipe data */
  const filteredData = useMemo(() => {
    if (sizeFilter === "ALL") return PIPE_DATA;
    if (sizeFilter === "SMALL") return PIPE_DATA.filter((r) => r.od <= 60.33);
    if (sizeFilter === "MID") return PIPE_DATA.filter((r) => r.od > 60.33 && r.od <= 323.85);
    if (sizeFilter === "LARGE") return PIPE_DATA.filter((r) => r.od > 323.85);
    return PIPE_DATA;
  }, [sizeFilter]);

  const visibleSchedules = useMemo(() => {
    if (schedFilter === "ALL") return [...SCHEDULES];
    if (schedFilter === "COMMON") return ["STD", "XS", "XXS", "40", "80", "160"] as const;
    return [...SCHEDULES];
  }, [schedFilter]);

  /* Intersection observer for reveal animations */
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

  function calculate() {
    const D = parseFloat(od);
    const t = parseFloat(wt);
    const L = parseFloat(length) || 1;
    const Q = parseInt(qty) || 1;

    if (!D || !t || D <= 0 || t <= 0) return;
    if (t >= D / 2) return; // wall thickness can't be >= half the OD

    // M = (D - t) * t * 0.02466
    const massPerM = Math.round((D - t) * t * 0.02466 * 100) / 100;
    const totalLength = L * Q;
    const totalMass = Math.round(massPerM * totalLength * 100) / 100;

    // Concrete weight coating (optional)
    // W = (π/4) × (OD_c² - OD_p²) × ρ  — all in metres, result in kg/m
    let concreteMassPerM: number | undefined;
    let concreteTotalMass: number | undefined;
    let coatedLength: number | undefined;
    let combinedMassPerM: number | undefined;
    let combinedTotalMass: number | undefined;

    if (cwcEnabled) {
      const cwcT = parseFloat(cwcThickness);
      const rho = parseFloat(cwcDensity);
      if (cwcT > 0 && rho > 0) {
        const odP = D / 1000; // pipe OD in metres
        const odC = (D + 2 * cwcT) / 1000; // OD including concrete in metres
        concreteMassPerM = Math.round((Math.PI / 4) * (odC * odC - odP * odP) * rho * 100) / 100;

        // Cutback: concrete stops short of each pipe end (default 300mm each end)
        const cutbackMm = parseFloat(cwcCutback) || 0;
        const coatedLengthPerJoint = Math.max(L - (2 * cutbackMm / 1000), 0);
        coatedLength = Math.round(coatedLengthPerJoint * Q * 100) / 100;

        concreteTotalMass = Math.round(concreteMassPerM * coatedLength * 100) / 100;
        combinedMassPerM = Math.round((massPerM + concreteMassPerM) * 100) / 100;
        combinedTotalMass = Math.round((totalMass + concreteTotalMass) * 100) / 100;
      }
    }

    setResult({ massPerM, totalMass, totalLength, concreteMassPerM, concreteTotalMass, coatedLength, combinedMassPerM, combinedTotalMass });
  }

  function handleNpsClick(index: number, odVal: number) {
    setSelectedNps(index);
    setOd(odVal.toFixed(2));
  }

  function handleReset() {
    setOd("");
    setWt("");
    setLength("1");
    setQty("1");
    setResult(null);
    setSelectedNps(null);
    setCwcEnabled(false);
    setCwcThickness("");
    setCwcDensity("3040");
    setCwcCutback("300");
  }

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="res-hero">
        <div className="res-hero-content">
          <span className="prod-accent-label">Tools</span>
          <h1 className="res-hero-title">Engineering Tools</h1>
          <p className="res-hero-blurb">Pipe weight calculators, coating estimators, and schedule reference tables to support your engineering decisions.</p>
        </div>
      </section>

      {/* PIPE WEIGHT CALCULATOR */}
      <section className="prod-section prod-light-section">
        <div className="prod-container">
          <div className="res-calc-wrapper rv">
            <div className="res-calc-header">
              <span className="prod-accent-label dark">Engineering Calculator</span>
              <h2 className="prod-intro-h2">Pipe Weight Calculator</h2>
              <p className="res-calc-formula-note">Calculate the theoretical weight of steel pipe per metre and total project weight using the standard formula.</p>
            </div>

            {/* Formula display */}
            <div className="res-formula-bar">
              <div className="res-formula-eq">
                <span className="res-formula-var">M</span>
                <span className="res-formula-op">=</span>
                <span className="res-formula-expr">( D &minus; t ) &times; t &times; 0.02466</span>
              </div>
              <div className="res-formula-legend">
                <span><strong>M</strong> = Mass (kg/m)</span>
                <span><strong>D</strong> = Outside Diameter (mm)</span>
                <span><strong>t</strong> = Wall Thickness (mm)</span>
              </div>
            </div>

            <div className="res-calc-grid">
              {/* LEFT — Inputs */}
              <div className="res-calc-inputs">
                {/* Quick NPS selector */}
                <div className="res-calc-field">
                  <label className="res-calc-label">Quick Select — Nominal Pipe Size</label>
                  <div className="res-nps-grid">
                    {COMMON_SIZES.map((s, i) => (
                      <button
                        key={s.label}
                        className={`res-nps-btn${selectedNps === i ? " active" : ""}`}
                        onClick={() => handleNpsClick(i, s.od)}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* OD input */}
                <div className="res-calc-field">
                  <label className="res-calc-label" htmlFor="calc-od">Outside Diameter (mm)</label>
                  <input
                    id="calc-od"
                    type="number"
                    step="0.01"
                    min="0"
                    className="res-calc-input"
                    placeholder="e.g. 219.08"
                    value={od}
                    onChange={(e) => { setOd(e.target.value); setSelectedNps(null); }}
                  />
                </div>

                {/* Wall thickness input */}
                <div className="res-calc-field">
                  <label className="res-calc-label" htmlFor="calc-wt">Wall Thickness (mm)</label>
                  <input
                    id="calc-wt"
                    type="number"
                    step="0.01"
                    min="0"
                    className="res-calc-input"
                    placeholder="e.g. 8.18"
                    value={wt}
                    onChange={(e) => setWt(e.target.value)}
                  />
                </div>

                {/* Length + Qty row */}
                <div className="res-calc-row">
                  <div className="res-calc-field">
                    <label className="res-calc-label" htmlFor="calc-len">Pipe Length (m)</label>
                    <input
                      id="calc-len"
                      type="number"
                      step="0.01"
                      min="0"
                      className="res-calc-input"
                      placeholder="12"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                    />
                  </div>
                  <div className="res-calc-field">
                    <label className="res-calc-label" htmlFor="calc-qty">Quantity</label>
                    <input
                      id="calc-qty"
                      type="number"
                      step="1"
                      min="1"
                      className="res-calc-input"
                      placeholder="1"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    />
                  </div>
                </div>

                {/* Concrete Weight Coating — Optional */}
                <div className="res-cwc-toggle">
                  <button
                    className={`res-cwc-toggle-btn${cwcEnabled ? " active" : ""}`}
                    onClick={() => setCwcEnabled(!cwcEnabled)}
                    type="button"
                  >
                    <span className="res-cwc-toggle-track">
                      <span className="res-cwc-toggle-knob" />
                    </span>
                    <span>Add Concrete Weight Coating</span>
                  </button>
                </div>

                {cwcEnabled && (
                  <div className="res-cwc-fields rv on">
                    <div className="res-cwc-formula-bar">
                      <span className="res-formula-var">W</span>
                      <span className="res-formula-op">=</span>
                      <span className="res-formula-expr">( &pi;/4 ) &times; ( OD<sub>c</sub>&sup2; &minus; OD<sub>p</sub>&sup2; ) &times; &rho;</span>
                    </div>
                    <div className="res-calc-row">
                      <div className="res-calc-field">
                        <label className="res-calc-label" htmlFor="calc-cwc-t">Concrete Thickness (mm)</label>
                        <input
                          id="calc-cwc-t"
                          type="number"
                          step="1"
                          min="0"
                          className="res-calc-input"
                          placeholder="e.g. 40"
                          value={cwcThickness}
                          onChange={(e) => setCwcThickness(e.target.value)}
                        />
                      </div>
                      <div className="res-calc-field">
                        <label className="res-calc-label" htmlFor="calc-cwc-rho">Concrete Density (kg/m³)</label>
                        <input
                          id="calc-cwc-rho"
                          type="number"
                          step="10"
                          min="0"
                          className="res-calc-input"
                          placeholder="3040"
                          value={cwcDensity}
                          onChange={(e) => setCwcDensity(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="res-calc-field">
                      <label className="res-calc-label" htmlFor="calc-cwc-cutback">Cutback Allowance per End (mm)</label>
                      <div className="res-cwc-cutback-row">
                        <input
                          id="calc-cwc-cutback"
                          type="number"
                          step="10"
                          min="0"
                          className="res-calc-input"
                          placeholder="300"
                          value={cwcCutback}
                          onChange={(e) => setCwcCutback(e.target.value)}
                        />
                        <span className="res-cwc-cutback-note">Coating stops {cwcCutback || "0"} mm from each end ({((parseFloat(cwcCutback) || 0) * 2)} mm total per joint)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="res-calc-actions">
                  <button className="res-calc-btn-primary" onClick={calculate}>Calculate Weight</button>
                  <button className="res-calc-btn-secondary" onClick={handleReset}>Reset</button>
                </div>
              </div>

              {/* RIGHT — Results */}
              <div className="res-calc-results">
                {result ? (
                  <div className="res-result-card">
                    <div className="res-result-main">
                      <span className="res-result-label">Steel Weight per Metre</span>
                      <span className="res-result-value">{result.massPerM}<span className="res-result-unit"> kg/m</span></span>
                    </div>
                    <div className="res-result-divider" />
                    <div className="res-result-secondary">
                      <div className="res-result-row">
                        <span className="res-result-row-label">Weight per Joint</span>
                        <span className="res-result-row-value">{(result.massPerM * (parseFloat(length) || 1)).toFixed(2)} kg</span>
                      </div>
                      <div className="res-result-row">
                        <span className="res-result-row-label">Total Length</span>
                        <span className="res-result-row-value">{result.totalLength.toFixed(2)} m</span>
                      </div>
                      <div className="res-result-row">
                        <span className="res-result-row-label">Total Steel Weight</span>
                        <span className="res-result-row-value">{result.totalMass.toFixed(2)} kg</span>
                      </div>
                      <div className="res-result-row">
                        <span className="res-result-row-label">Total Steel Weight</span>
                        <span className="res-result-row-value">{(result.totalMass / 1000).toFixed(3)} tonnes</span>
                      </div>
                    </div>

                    {/* Concrete Weight Coating results */}
                    {result.concreteMassPerM != null && (
                      <>
                        <div className="res-result-divider" />
                        <div className="res-result-cwc-header">
                          <span className="res-result-label">Concrete Coating Weight</span>
                          <span className="res-result-value res-result-value-sm">{result.concreteMassPerM}<span className="res-result-unit"> kg/m</span></span>
                        </div>
                        <div className="res-result-secondary">
                          <div className="res-result-row">
                            <span className="res-result-row-label">Coated Length per Joint</span>
                            <span className="res-result-row-value">{((parseFloat(length) || 1) - (2 * (parseFloat(cwcCutback) || 0) / 1000)).toFixed(2)} m</span>
                          </div>
                          <div className="res-result-row">
                            <span className="res-result-row-label">Total Coated Length</span>
                            <span className="res-result-row-value">{result.coatedLength?.toFixed(2)} m</span>
                          </div>
                          <div className="res-result-row">
                            <span className="res-result-row-label">Total Concrete Weight</span>
                            <span className="res-result-row-value">{result.concreteTotalMass?.toFixed(2)} kg</span>
                          </div>
                          <div className="res-result-row">
                            <span className="res-result-row-label">Total Concrete Weight</span>
                            <span className="res-result-row-value">{((result.concreteTotalMass || 0) / 1000).toFixed(3)} tonnes</span>
                          </div>
                        </div>
                        <div className="res-result-divider" />
                        <div className="res-result-combined">
                          <div className="res-result-row res-result-row-combined">
                            <span className="res-result-row-label">Combined Weight per Metre</span>
                            <span className="res-result-row-value">{result.combinedMassPerM?.toFixed(2)} kg/m</span>
                          </div>
                          <div className="res-result-row res-result-row-combined">
                            <span className="res-result-row-label">Combined Total Weight</span>
                            <span className="res-result-row-value">{result.combinedTotalMass?.toFixed(2)} kg</span>
                          </div>
                          <div className="res-result-row res-result-row-combined">
                            <span className="res-result-row-label">Combined Total Weight</span>
                            <span className="res-result-row-value">{((result.combinedTotalMass || 0) / 1000).toFixed(3)} tonnes</span>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="res-result-params">
                      <span>OD: {od} mm</span>
                      <span>WT: {wt} mm</span>
                      <span>Length: {length} m</span>
                      <span>Qty: {qty}</span>
                      {result.concreteMassPerM != null && (
                        <>
                          <span>CWC: {cwcThickness} mm</span>
                          <span>Density: {cwcDensity} kg/m³</span>
                          <span>Cutback: {cwcCutback} mm/end</span>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="res-result-empty">
                    <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    <p>Enter pipe dimensions and click <strong>Calculate Weight</strong> to see results.</p>
                  </div>
                )}

                {/* Pipe cross-section visual */}
                {od && wt && parseFloat(od) > 0 && parseFloat(wt) > 0 && parseFloat(wt) < parseFloat(od) / 2 && (
                  <div className="res-pipe-visual">
                    <svg viewBox="0 0 200 200" className="res-pipe-svg">
                      {/* Outer circle */}
                      <circle cx="100" cy="100" r="85" fill="none" stroke="var(--green)" strokeWidth="2" />
                      {/* Inner circle */}
                      <circle
                        cx="100" cy="100"
                        r={Math.max(85 - (85 * (parseFloat(wt) / (parseFloat(od) / 2))), 10)}
                        fill="none" stroke="var(--green)" strokeWidth="1.5" strokeDasharray="4 2"
                      />
                      {/* Wall fill */}
                      <circle cx="100" cy="100" r="85" fill="rgba(70,184,103,0.08)" />
                      <circle
                        cx="100" cy="100"
                        r={Math.max(85 - (85 * (parseFloat(wt) / (parseFloat(od) / 2))), 10)}
                        fill="var(--white)"
                      />
                      {/* OD label */}
                      <line x1="15" y1="100" x2="185" y2="100" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" strokeDasharray="3 2" />
                      <text x="100" y="24" textAnchor="middle" fontSize="9" fill="rgba(0,0,0,0.5)" fontWeight="600">OD: {od} mm</text>
                      {/* WT label */}
                      <text x="100" y="192" textAnchor="middle" fontSize="9" fill="rgba(0,0,0,0.5)" fontWeight="600">WT: {wt} mm</text>
                    </svg>
                  </div>
                )}
              </div>
            </div>

            <p className="res-calc-disclaimer">Calculated weights are theoretical based on plain-end carbon steel pipe (density 7.85 g/cm³). Concrete coating weight uses W = (π/4) × (OD<sub>c</sub>² − OD<sub>p</sub>²) × ρ. Actual weights may vary by manufacturing tolerance, material grade, and end finish.</p>
          </div>
        </div>
      </section>

      {/* PIPE SCHEDULE REFERENCE TABLE */}
      <section className="prod-section prod-dark-section">
        <div className="prod-container">
          <div className="res-calc-wrapper rv">
            <div className="res-calc-header">
              <span className="prod-accent-label">Reference Table</span>
              <h2 className="prod-section-h2">Pipe Schedule Wall Thickness Reference</h2>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.7, maxWidth: 700 }}>
                Wall thickness (mm) by NPS and schedule per ASME B36.10M / B36.19M. Click any cell to load it into the weight calculator above.
              </p>
            </div>

            {/* Filters */}
            <div className="res-sched-filters">
              <div className="res-sched-filter-group">
                <span className="res-sched-filter-label">Size Range</span>
                <div className="res-sched-filter-btns">
                  {[
                    { id: "ALL", label: "All Sizes" },
                    { id: "SMALL", label: '≤ 2"' },
                    { id: "MID", label: '2½" – 12"' },
                    { id: "LARGE", label: '14" +' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      className={`res-sched-filter-btn${sizeFilter === f.id ? " active" : ""}`}
                      onClick={() => setSizeFilter(f.id)}
                    >{f.label}</button>
                  ))}
                </div>
              </div>
              <div className="res-sched-filter-group">
                <span className="res-sched-filter-label">Schedules</span>
                <div className="res-sched-filter-btns">
                  {[
                    { id: "ALL", label: "All Schedules" },
                    { id: "COMMON", label: "Common" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      className={`res-sched-filter-btn${schedFilter === f.id ? " active" : ""}`}
                      onClick={() => setSchedFilter(f.id)}
                    >{f.label}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="res-sched-table-wrap">
              <table className="res-sched-table">
                <thead>
                  <tr>
                    <th className="res-sched-th-sticky">NPS</th>
                    <th className="res-sched-th-sticky">OD (mm)</th>
                    {visibleSchedules.map((s) => (
                      <th key={s}>{s}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, ri) => (
                    <tr key={row.nps}>
                      <td className="res-sched-td-nps">{row.nps}</td>
                      <td className="res-sched-td-od">{row.od.toFixed(2)}</td>
                      {visibleSchedules.map((s) => {
                        const val = row.wt[s as keyof typeof row.wt];
                        const isHovered = hoveredCell?.row === ri && hoveredCell?.col === s;
                        return (
                          <td
                            key={s}
                            className={`res-sched-td-val${val ? " has-val" : ""}${isHovered ? " hovered" : ""}`}
                            onMouseEnter={() => val && setHoveredCell({ row: ri, col: s })}
                            onMouseLeave={() => setHoveredCell(null)}
                            onClick={() => val && setHoveredCell(isHovered ? null : { row: ri, col: s })}
                          >
                            {val ? (
                              <>
                                {val.toFixed(2)}
                                {isHovered && (
                                  <span className="res-sched-tooltip">
                                    {row.nps} Sch {s}<br />
                                    WT: {val.toFixed(2)} mm<br />
                                    Weight: {((row.od - val) * val * 0.02466).toFixed(2)} kg/m
                                  </span>
                                )}
                              </>
                            ) : (
                              <span className="res-sched-empty">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="res-calc-disclaimer" style={{ color: "rgba(255,255,255,0.35)" }}>
              Data sourced from ASME B36.10M (carbon & alloy steel) and B36.19M (stainless steel). Click any wall thickness value to calculate pipe weight.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

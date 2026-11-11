"use client";

import { useState } from "react";

const COMMON_SIZES = [
  { label: '2"', od: 60.33 },
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

export default function PipeCalcModal({ onClose }: { onClose: () => void }) {
  const [od, setOd] = useState("");
  const [wt, setWt] = useState("");
  const [length, setLength] = useState("1");
  const [qty, setQty] = useState("1");
  const [selectedNps, setSelectedNps] = useState<number | null>(null);
  const [cwcEnabled, setCwcEnabled] = useState(false);
  const [cwcThickness, setCwcThickness] = useState("");
  const [cwcDensity, setCwcDensity] = useState("3040");
  const [cwcCutback, setCwcCutback] = useState("300");
  const [result, setResult] = useState<{
    massPerM: number; totalMass: number; totalLength: number;
    concreteMassPerM?: number; concreteTotalMass?: number;
    coatedLength?: number; combinedMassPerM?: number; combinedTotalMass?: number;
  } | null>(null);

  function calculate() {
    const D = parseFloat(od);
    const t = parseFloat(wt);
    const L = parseFloat(length) || 1;
    const Q = parseInt(qty) || 1;
    if (!D || !t || D <= 0 || t <= 0 || t >= D / 2) return;

    const massPerM = Math.round((D - t) * t * 0.02466 * 100) / 100;
    const totalLength = L * Q;
    const totalMass = Math.round(massPerM * totalLength * 100) / 100;

    let concreteMassPerM: number | undefined;
    let concreteTotalMass: number | undefined;
    let coatedLength: number | undefined;
    let combinedMassPerM: number | undefined;
    let combinedTotalMass: number | undefined;

    if (cwcEnabled) {
      const cwcT = parseFloat(cwcThickness);
      const rho = parseFloat(cwcDensity);
      if (cwcT > 0 && rho > 0) {
        const odP = D / 1000;
        const odC = (D + 2 * cwcT) / 1000;
        concreteMassPerM = Math.round((Math.PI / 4) * (odC * odC - odP * odP) * rho * 100) / 100;
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

  function handleReset() {
    setOd(""); setWt(""); setLength("1"); setQty("1");
    setResult(null); setSelectedNps(null);
    setCwcEnabled(false); setCwcThickness(""); setCwcDensity("3040"); setCwcCutback("300");
  }

  return (
    <div className="calc-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="calc-modal-content">
        <button className="calc-modal-close" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
        <h2 className="calc-modal-title">Pipe Weight Calculator</h2>

        {/* Formula */}
        <div className="res-formula-bar" style={{ marginBottom: 20 }}>
          <div className="res-formula-eq">
            <span className="res-formula-var">M</span>
            <span className="res-formula-op">=</span>
            <span className="res-formula-expr">( D &minus; t ) &times; t &times; 0.02466</span>
          </div>
        </div>

        {/* Quick NPS */}
        <div className="res-calc-field">
          <label className="res-calc-label">Quick Select — NPS</label>
          <div className="res-nps-grid" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
            {COMMON_SIZES.map((s, i) => (
              <button key={s.label} className={`res-nps-btn${selectedNps === i ? " active" : ""}`}
                onClick={() => { setSelectedNps(i); setOd(s.od.toFixed(2)); }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* OD & WT */}
        <div className="res-calc-row" style={{ marginTop: 12 }}>
          <div className="res-calc-field">
            <label className="res-calc-label" htmlFor="modal-od">OD (mm)</label>
            <input id="modal-od" type="number" step="0.01" min="0" className="res-calc-input" placeholder="e.g. 219.08"
              value={od} onChange={(e) => { setOd(e.target.value); setSelectedNps(null); }} />
          </div>
          <div className="res-calc-field">
            <label className="res-calc-label" htmlFor="modal-wt">Wall Thickness (mm)</label>
            <input id="modal-wt" type="number" step="0.01" min="0" className="res-calc-input" placeholder="e.g. 8.18"
              value={wt} onChange={(e) => setWt(e.target.value)} />
          </div>
        </div>

        {/* Length & Qty */}
        <div className="res-calc-row">
          <div className="res-calc-field">
            <label className="res-calc-label" htmlFor="modal-len">Length (m)</label>
            <input id="modal-len" type="number" step="0.01" min="0" className="res-calc-input" placeholder="12"
              value={length} onChange={(e) => setLength(e.target.value)} />
          </div>
          <div className="res-calc-field">
            <label className="res-calc-label" htmlFor="modal-qty">Quantity</label>
            <input id="modal-qty" type="number" step="1" min="1" className="res-calc-input" placeholder="1"
              value={qty} onChange={(e) => setQty(e.target.value)} />
          </div>
        </div>

        {/* CWC Toggle */}
        <div className="res-cwc-toggle">
          <button className={`res-cwc-toggle-btn${cwcEnabled ? " active" : ""}`} onClick={() => setCwcEnabled(!cwcEnabled)} type="button">
            <span className="res-cwc-toggle-track"><span className="res-cwc-toggle-knob" /></span>
            <span>Add Concrete Weight Coating</span>
          </button>
        </div>

        {cwcEnabled && (
          <div className="res-cwc-fields" style={{ marginBottom: 12 }}>
            <div className="res-calc-row">
              <div className="res-calc-field">
                <label className="res-calc-label" htmlFor="modal-cwc-t">Concrete Thickness (mm)</label>
                <input id="modal-cwc-t" type="number" step="1" min="0" className="res-calc-input" placeholder="e.g. 40"
                  value={cwcThickness} onChange={(e) => setCwcThickness(e.target.value)} />
              </div>
              <div className="res-calc-field">
                <label className="res-calc-label" htmlFor="modal-cwc-rho">Density (kg/m³)</label>
                <input id="modal-cwc-rho" type="number" step="10" min="0" className="res-calc-input" placeholder="3040"
                  value={cwcDensity} onChange={(e) => setCwcDensity(e.target.value)} />
              </div>
            </div>
            <div className="res-calc-field" style={{ marginTop: 8 }}>
              <label className="res-calc-label" htmlFor="modal-cwc-cb">Cutback per End (mm)</label>
              <div className="res-cwc-cutback-row">
                <input id="modal-cwc-cb" type="number" step="10" min="0" className="res-calc-input" placeholder="300"
                  value={cwcCutback} onChange={(e) => setCwcCutback(e.target.value)} />
                <span className="res-cwc-cutback-note">{((parseFloat(cwcCutback) || 0) * 2)} mm total per joint</span>
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="res-calc-actions" style={{ marginTop: 16 }}>
          <button className="res-calc-btn-primary" onClick={calculate}>Calculate</button>
          <button className="res-calc-btn-secondary" onClick={handleReset}>Reset</button>
        </div>

        {/* Results */}
        {result && (
          <div style={{ marginTop: 20, padding: 20, background: "var(--dark2)", borderRadius: 10, color: "var(--white)" }}>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "rgba(255,255,255,0.45)" }}>Steel Weight</span>
              <div style={{ fontSize: 28, fontWeight: 700, color: "var(--green)" }}>{result.massPerM} <span style={{ fontSize: 14, fontWeight: 400, color: "rgba(255,255,255,0.5)" }}>kg/m</span></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
              <span>Total Length</span><span style={{ textAlign: "right", color: "var(--white)", fontWeight: 600 }}>{result.totalLength.toFixed(2)} m</span>
              <span>Total Steel Weight</span><span style={{ textAlign: "right", color: "var(--white)", fontWeight: 600 }}>{result.totalMass.toFixed(2)} kg</span>
              <span>Total Steel Weight</span><span style={{ textAlign: "right", color: "var(--white)", fontWeight: 600 }}>{(result.totalMass / 1000).toFixed(3)} t</span>
            </div>

            {result.concreteMassPerM != null && (
              <>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", margin: "12px 0", paddingTop: 12 }}>
                  <span style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "rgba(255,255,255,0.45)" }}>Concrete Coating</span>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "var(--green)" }}>{result.concreteMassPerM} <span style={{ fontSize: 14, fontWeight: 400, color: "rgba(255,255,255,0.5)" }}>kg/m</span></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
                  <span>Coated Length</span><span style={{ textAlign: "right", color: "var(--white)", fontWeight: 600 }}>{result.coatedLength?.toFixed(2)} m</span>
                  <span>Total CWC Weight</span><span style={{ textAlign: "right", color: "var(--white)", fontWeight: 600 }}>{result.concreteTotalMass?.toFixed(2)} kg</span>
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", margin: "12px 0", paddingTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px", fontSize: 13, color: "var(--green)", fontWeight: 700 }}>
                  <span>Combined per Metre</span><span style={{ textAlign: "right" }}>{result.combinedMassPerM?.toFixed(2)} kg/m</span>
                  <span>Combined Total</span><span style={{ textAlign: "right" }}>{result.combinedTotalMass?.toFixed(2)} kg</span>
                  <span>Combined Total</span><span style={{ textAlign: "right" }}>{((result.combinedTotalMass || 0) / 1000).toFixed(3)} t</span>
                </div>
              </>
            )}
          </div>
        )}

        <p style={{ fontSize: 11, color: "rgba(0,0,0,0.35)", marginTop: 12, lineHeight: 1.5 }}>
          Theoretical weights based on carbon steel (7.85 g/cm³). <a href="/tools" style={{ color: "var(--green)" }}>Full calculator &amp; pipe schedule table →</a>
        </p>
      </div>
    </div>
  );
}

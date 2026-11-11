"use client";

import ProductLayout from "../../components/ProductLayout";
import Image from "next/image";

export default function CompositeLinedPage() {
  const products = [
    {
      name: "PTFE",
      fullName: "Polytetrafluoroethylene",
      size: "25NB – 600NB",
      pressure: "CLASS 150 / 300",
      temp: "Up to +200°C",
      chemRes: "Excellent",
      abrasionRes: "Good",
      desc: "Outstanding chemical resistance across virtually the entire pH range. Ideal for handling aggressive acids, alkalis, and solvents.",
    },
    {
      name: "PFA",
      fullName: "Perfluoroalkoxy Alkane",
      size: "25NB – 300NB",
      pressure: "CLASS 150 / 300",
      temp: "Up to +200°C",
      chemRes: "Excellent",
      abrasionRes: "Good",
      desc: "Similar properties to PTFE with improved flow characteristics and weldability. Excellent for high-purity applications.",
    },
    {
      name: "PVDF",
      fullName: "Polyvinylidene Fluoride",
      size: "25NB – 300NB",
      pressure: "CLASS 150 / 300",
      temp: "Up to +135°C",
      chemRes: "Very Good",
      abrasionRes: "Very Good",
      desc: "Excellent mechanical strength combined with chemical resistance. Suitable for high-purity and abrasive chemical slurries.",
    },
    {
      name: "PP",
      fullName: "Polypropylene",
      size: "25NB – 300NB",
      pressure: "CLASS 150 / 300",
      temp: "-60°C to +100°C",
      chemRes: "Good",
      abrasionRes: "Good",
      desc: "Cost-effective corrosion protection for a wide range of acids, bases, and organic solvents at moderate temperatures.",
    },
    {
      name: "HDPE",
      fullName: "High-Density Polyethylene",
      size: "25NB – 600NB",
      pressure: "CLASS 150",
      temp: "-50°C to +80°C",
      chemRes: "Good",
      abrasionRes: "Excellent",
      desc: "Excellent abrasion and impact resistance. Ideal for slurry transport, mining, and water treatment applications.",
    },
    {
      name: "ETFE",
      fullName: "Ethylene Tetrafluoroethylene",
      size: "25NB – 300NB",
      pressure: "CLASS 150 / 300",
      temp: "Up to +150°C",
      chemRes: "Excellent",
      abrasionRes: "Very Good",
      desc: "High mechanical strength with excellent chemical resistance. Superior abrasion resistance compared to PTFE and PFA.",
    },
  ];

  const rows = [
    { label: "Size Range", key: "size" as const },
    { label: "Pressure Class", key: "pressure" as const },
    { label: "Temperature", key: "temp" as const },
    { label: "Chemical Resistance", key: "chemRes" as const },
    { label: "Abrasion Resistance", key: "abrasionRes" as const },
  ];

  return (
    <ProductLayout
      title="PTFE Lined Piping Systems."
      subtitle="PFP PRODUCT RANGE"
      blurb="PTFE lined piping systems provide proven chemical resistance, thermal stability, and long-term corrosion protection for critical chemical processing applications. Our range also includes PFA, PVDF, PP, HDPE, and ETFE lined pipe and fittings."
      heroImage="/product-ptfe.jpg"
      heroImageAlt="Composite Lined Piping System"
      heroVariant="mesh"
      heroSeed={23}
    >
      {/* TWO-COLUMN INTRO */}
      <section className="prod-intro-section">
        <div className="prod-container">
          <div className="prod-intro-grid rv">
            <div className="prod-intro-img">
              <Image src="/COMPOSITE_LINED_STEEL.jpg" alt="Composite lined pipe system" width={600} height={500} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
            </div>
            <div className="prod-intro-text">
              <span className="prod-accent-label">About This Product</span>
              <h2 className="prod-intro-h2">Lining Solutions for Corrosive Environments</h2>
              <p>Our Fluoropolymer lined piping systems combine robust steel exteriors with advanced polymer linings — including PTFE, PFA, PVDF, PP, HDPE, and ETFE — to safely handle aggressive acids, alkalis, and solvents across a wide range of temperatures and pressures.</p>
              <p>Our lined piping systems are ASTM F1545-15A type tested and engineered to handle highly corrosive mediums across a broad range of flow, pressure and temperature requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* LINING OPTIONS — COMPARISON TABLE */}
      <section className="prod-section prod-dark-section">
        <div className="prod-container">
          <span className="prod-accent-label">Lining Options</span>
          <h2 className="prod-section-h2">Compare our lining options.</h2>

          <div className="cl-table-wrap">
            <table className="cl-table">
              <thead>
                <tr>
                  <th className="cl-th cl-th-label"></th>
                  {products.map((p) => (
                    <th key={p.name} className="cl-th cl-th-product">{p.name}<span className="cl-th-fullname">{p.fullName}</span></th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.key} className="cl-tr">
                    <td className="cl-td cl-td-label">{row.label}</td>
                    {products.map((p) => (
                      <td key={p.name} className="cl-td cl-td-value">
                        {row.key === "chemRes" || row.key === "abrasionRes" ? (
                          <span className={`cl-rating cl-rating-${p[row.key].toLowerCase().replace(/\s/g, "-")}`}>
                            {p[row.key]}
                          </span>
                        ) : (
                          p[row.key]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="cl-tr cl-tr-desc">
                  <td className="cl-td cl-td-label">Description</td>
                  {products.map((p) => (
                    <td key={p.name} className="cl-td cl-td-desc">{p.desc}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* KEY FEATURES */}
      <section className="prod-section prod-light-section">
        <div className="prod-container">
          <span className="prod-accent-label dark">Key Features</span>
          <h2 className="prod-section-h2">Key features & benefits.</h2>
          <div className="prod-feature-list">
            <div className="prod-feature-item">
              <strong>ASTM F1545-15A Type Tested</strong> — Engineered to handle highly corrosive mediums across a broad range of flow, pressure &amp; temperature requirements.
            </div>
            <div className="prod-feature-item">
              <strong>Custom & Complex Fabrication</strong> — We interpret isometric drawings to provide pricing and availability on complex engineered solutions.
            </div>
            <div className="prod-feature-item">
              <strong>Inspections & Testing</strong> — Hydrostatic testing &amp; 100% spark test at 15 KV.
            </div>
            <div className="prod-feature-item">
              <strong>Rapid Installation</strong> — Flanged ends enabling rapid and low complexity installation.
            </div>
          </div>
        </div>
      </section>
    </ProductLayout>
  );
}

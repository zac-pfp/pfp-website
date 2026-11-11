"use client";

// no state needed
import ProductLayout from "../../components/ProductLayout";
import Image from "next/image";

export default function BiMetalPage() {
  return (
    <ProductLayout
      title="Bi-Metal Piping Solutions."
      subtitle="PFP PRODUCT RANGE"
      blurb="Corrosion-Resistant Alloy (CRA) Metallurgically bonded, weld overlay clad, and explosion-bonded cladding piping solutions. Partnering with leading global manufacturers, we deliver engineered systems for demanding, highly corrosive environments."
      heroImage="/product-bimetal.jpg"
      heroImageAlt="Bi-Metal Piping"
      heroVariant="mesh"
      heroSeed={7}
    >
      {/* TWO-COLUMN INTRO */}
      <section className="prod-intro-section">
        <div className="prod-container">
          <div className="prod-intro-grid rv">
            <div className="prod-intro-img">
              <Image src="/CRA_CLAD_PIPE___COMPONENTS.jpg" alt="CRA clad pipe components" width={600} height={500} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
            </div>
            <div className="prod-intro-text">
              <span className="prod-accent-label">About This Product</span>
              <h2 className="prod-intro-h2">Engineered for the Harshest Environments</h2>
              <p>Bi-metal piping combines a high-strength carbon or alloy steel outer pipe with a corrosion-resistant alloy (CRA) inner lining. This dual-material approach delivers the mechanical properties needed for structural integrity while providing exceptional chemical resistance at the process-contact surface.</p>
              <p>Ideal for wet CO₂ and harsh oil &amp; gas environments, bi-metal systems offer a cost-effective alternative to solid alloy construction while maximising long-term asset integrity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT RANGE */}
      <section className="prod-section prod-dark-section">
        <div className="prod-container">
          <span className="prod-accent-label">Bi-Metal Product Range</span>
          <h2 className="prod-section-h2">Explore our bi-metal product range.</h2>

          {/* Shared Specs */}
          <div className="bm-specs rv">
            <div className="bm-spec-row">
              <span className="bm-spec-label">Size Range</span>
              <div className="bm-spec-tags">
                <span className="bm-tag bm-tag-highlight">4&quot; — 72&quot;</span>
              </div>
            </div>
            <div className="bm-spec-row">
              <span className="bm-spec-label">Outer (Substrate)</span>
              <div className="bm-spec-tags">
                {["API 5LB", "HYCS", "LTCS", "SMLS", "ERW", "HFW/HFI", "LSAW"].map((t) => (
                  <span key={t} className="bm-tag">{t}</span>
                ))}
              </div>
            </div>
            <div className="bm-spec-row">
              <span className="bm-spec-label">Inner (CRA Liner)</span>
              <div className="bm-spec-tags">
                {["316L", "317LMN", "6 Mo", "904L", "Duplex", "Alloy 825", "Alloy 625", "Nickel 200/201", "Stellite"].map((t) => (
                  <span key={t} className="bm-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Manufacturing Methods */}
          <h3 className="bm-methods-label rv">Three Manufacturing Methods</h3>
          <div className="bm-methods-grid rv">
            <div className="bm-method-card">
              <div className="bm-method-icon">
                <Image src="/bm-wol.png" alt="Weld Overlay" width={120} height={120} style={{ width: 80, height: 80, objectFit: "contain" }} />
              </div>
              <h4 className="bm-method-title">Weld Overlay</h4>
              <p className="bm-method-desc">A CRA layer is applied to the substrate via automated welding, producing a metallurgically bonded lining with excellent corrosion resistance. Ideal for complex geometries and field repairs.</p>
            </div>
            <div className="bm-method-card">
              <div className="bm-method-icon">
                <Image src="/bm-explosion.png" alt="Explosion Bonded" width={120} height={120} style={{ width: 80, height: 80, objectFit: "contain" }} />
              </div>
              <h4 className="bm-method-title">Explosion Bonded</h4>
              <p className="bm-method-desc">Controlled detonation creates an extremely strong metallurgical bond between the CRA liner and carbon steel substrate. Delivers superior bond strength and is well-suited for plate and large-diameter applications.</p>
            </div>
            <div className="bm-method-card">
              <div className="bm-method-icon">
                <Image src="/bm-hrb.png" alt="Hot Roll Bonded" width={120} height={120} style={{ width: 80, height: 80, objectFit: "contain" }} />
              </div>
              <h4 className="bm-method-title">Hot Roll Bonded</h4>
              <p className="bm-method-desc">Heat and pressure during rolling produce a continuous metallurgical bond with excellent uniformity and consistency across the full pipe length. Offers high-volume production efficiency.</p>
            </div>
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
              <strong>Cost Efficiency</strong> — Reduce both CAPEX and OPEX with bi-metal, offering a cost-effective alternative to solid CRA, reducing overall material cost while maintaining required corrosion performance.
            </div>
            <div className="prod-feature-item">
              <strong>Metallurgically Bonded</strong> — Manufactured using established processes such as weld overlay, explosion bonding, and roll bonding, ensuring reliable bond integrity and structural performance.
            </div>
            <div className="prod-feature-item">
              <strong>Applicable in Harsh Conditions</strong> — Applicable for wet CO₂, sour service, and other corrosive environments across oil &amp; gas and process applications, providing enhanced corrosion resistance and durability.
            </div>
            <div className="prod-feature-item">
              <strong>Induction Bends</strong> — Induction bending available up to 36&quot; in accordance with ASME B16.49, ISO 15590-1, and DNV-ST-F101.
            </div>
          </div>
        </div>
      </section>

      {/* CLADDED FABRICATION */}
      <section className="prod-section prod-dark-section">
        <div className="prod-container">
          <div className="prod-intro-grid rv">
            <div className="prod-intro-text">
              <span className="prod-accent-label">Fabrication</span>
              <h2 className="prod-section-h2">Cladded fabrication services.</h2>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.8 }}>We deliver seamless project execution by combining pipe spool fabrication / speciality clad fabrication to our material supply solutions. From ready-to-install prefabricated piping to cladded pressure vessels or components, our expertise drives efficiency, reliability, and cost control.</p>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.8, marginTop: 16 }}>Offering:</p>
              <div className="prod-feature-list" style={{ marginTop: 16 }}>
                <div className="prod-feature-item">
                  <strong>FEA and calculation</strong>
                </div>
                <div className="prod-feature-item">
                  <strong>CRA Weld overlay cladding &amp; DSS Prefabrication</strong>
                </div>
                <div className="prod-feature-item">
                  <strong>Cladded Pressure Vessels and Heat Exchangers</strong>
                </div>
                <div className="prod-feature-item">
                  <strong>Cladded Specialty Forgings – Tee. Wye-Pieces, Flanges</strong>
                </div>
                <div className="prod-feature-item">
                  <strong>Cladded induction bending services</strong>
                </div>
                <div className="prod-feature-item">
                  <strong>Anti-corrosion external painting for spools</strong>
                </div>
              </div>
            </div>
            <div className="prod-intro-img">
              <Image src="/SPECIALTY_FABRICATION.jpg" alt="Cladded fabrication" width={600} height={500} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
            </div>
          </div>
        </div>
      </section>
    </ProductLayout>
  );
}

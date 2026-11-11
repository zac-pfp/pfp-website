"use client";

import { useEffect } from "react";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

type DownloadFile = {
  name: string;
  href: string;
  size: string;
};

type DownloadCategory = {
  title: string;
  description: string;
  icon: React.ReactNode;
  files: DownloadFile[];
};

const DOWNLOAD_CATEGORIES: DownloadCategory[] = [
  {
    title: "Product Brochures",
    description: "Comprehensive product overviews covering our full range of pipe fittings, flanges, and specialty items.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        <path d="M8 7h6" />
        <path d="M8 11h8" />
      </svg>
    ),
    files: [
      {
        name: "PFP Energy Sector Brochure",
        href: "/brochures/pfp-energy-sector-brochure.pdf",
        size: "1.8 MB",
      },
      {
        name: "PFP Mining & Process Industries Brochure",
        href: "/brochures/pfp-mining-process-industries-brochure.pdf",
        size: "0.9 MB",
      },
      {
        name: "PFP-RX Wear Resistant Piping",
        href: "/brochures/pfp-rx-wear-resistant-piping.pdf",
        size: "3.6 MB",
      },
    ],
  },
  {
    title: "Technical Data Sheets",
    description: "Detailed specifications, dimensional data, pressure ratings, and material properties for all product lines.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
        <path d="M8 13h8" />
        <path d="M8 17h8" />
        <path d="M8 9h2" />
      </svg>
    ),
    files: [],
  },
  {
    title: "Certificates & Approvals",
    description: "Quality certifications, material test reports, and third-party approval documentation.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
    files: [
      {
        name: "Bureau Veritas Certificate 2023 (AU005622-1)",
        href: "/brochures/pfp-bv-certificate-2023.pdf",
        size: "0.2 MB",
      },
    ],
  },
];

export default function ResourcesPage() {
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

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="res-hero">
        <div className="res-hero-content">
          <span className="prod-accent-label">Resources</span>
          <h1 className="res-hero-title">Resources &amp; Downloads</h1>
          <p className="res-hero-blurb">Product brochures, technical data sheets, and documentation to support your project requirements.</p>
        </div>
      </section>

      {/* DOWNLOAD CATEGORIES */}
      <section className="prod-section prod-light-section">
        <div className="prod-container">
          <div className="rv">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span className="prod-accent-label dark">Documentation</span>
              <h2 className="prod-intro-h2">Downloads &amp; Documentation</h2>
              <p style={{ color: "rgba(0,0,0,0.5)", fontSize: 15, lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>
                Access product brochures, technical specifications, certification documents, and installation guides.
              </p>
            </div>

            <div className="res-dl-grid">
              {DOWNLOAD_CATEGORIES.map((cat) => (
                <div key={cat.title} className="res-dl-card">
                  <div className="res-dl-card-icon">{cat.icon}</div>
                  <h3 className="res-dl-card-title">{cat.title}</h3>
                  <p className="res-dl-card-desc">{cat.description}</p>

                  {cat.files.length > 0 ? (
                    <div className="res-dl-files">
                      {cat.files.map((f) => (
                        <a
                          key={f.href}
                          href={f.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="res-dl-file"
                        >
                          <span className="res-dl-file-icon" aria-hidden="true">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                              <path d="M14 2v6h6" />
                            </svg>
                          </span>
                          <span className="res-dl-file-meta">
                            <span className="res-dl-file-name">{f.name}</span>
                            <span className="res-dl-file-size">PDF · {f.size}</span>
                          </span>
                          <span className="res-dl-file-arrow" aria-hidden="true">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                          </span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <span className="res-dl-badge">Coming Soon</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA — Link to Tools */}
      <section className="prod-section prod-dark-section">
        <div className="prod-container" style={{ textAlign: "center", paddingTop: 64, paddingBottom: 64 }}>
          <span className="prod-accent-label">Engineering Tools</span>
          <h2 className="prod-section-h2" style={{ marginBottom: 16, textAlign: "center", maxWidth: "none" }}>Looking for Calculators &amp; Reference Tables?</h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, lineHeight: 1.7, maxWidth: 540, margin: "0 auto 32px" }}>
            Use our pipe weight calculator, concrete coating estimator, and pipe schedule reference table.
          </p>
          <Link href="/tools" className="res-calc-btn-primary" style={{ display: "inline-block", textDecoration: "none" }}>
            Go to Engineering Tools
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

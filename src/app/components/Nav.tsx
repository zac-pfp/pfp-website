"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  const [dropOpen, setDropOpen] = useState(false);
  const [resDropOpen, setResDropOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileIndOpen, setMobileIndOpen] = useState(false);
  const [mobileProdOpen, setMobileProdOpen] = useState(false);
  const [mobileResOpen, setMobileResOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#solDrop") && !target.closest("#dropdown")) {
        setDropOpen(false);
      }
      if (!target.closest("#resDrop") && !target.closest("#resDropdown")) {
        setResDropOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav className={navScrolled ? "scrolled" : ""}>
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <Image src="/PFP_Circle_Green_RGB.png" alt="PFP" width={36} height={36} style={{ height: 36, width: "auto" }} />
          </Link>
          <div className="nav-left">
            <Link href="/about" className="nav-link">About Us</Link>
            <div style={{ position: "relative" }}>
              <div className={`nav-link has-drop${dropOpen ? " open" : ""}`} id="solDrop" onClick={() => setDropOpen(!dropOpen)}>Solutions</div>
              <div className={`dropdown${dropOpen ? " open" : ""}`} id="dropdown">
                <div className="drop-col">
                  <h4>Industries</h4>
                  <Link href="/industries/energy" className="drop-item" onClick={() => setDropOpen(false)}><span className="di-dot"></span>Energy Sector</Link>
                  <Link href="/industries/mining" className="drop-item" onClick={() => setDropOpen(false)}><span className="di-dot"></span>Mining Sector</Link>
                  <Link href="/industries/chemical-processing" className="drop-item" onClick={() => setDropOpen(false)}><span className="di-dot"></span>Chemical Processing</Link>
                </div>
                <div className="drop-col">
                  <h4>Products &amp; Services</h4>
                  <Link href="/products/pipe-fittings-valves" className="drop-item" onClick={() => setDropOpen(false)}><span className="di-dot"></span>Pipe Fittings &amp; Valves</Link>
                  <Link href="/products/linepipe-coating" className="drop-item" onClick={() => setDropOpen(false)}><span className="di-dot"></span>Linepipe &amp; Coating Solutions</Link>
                  <Link href="/products/reinforced-thermoplastic" className="drop-item" onClick={() => setDropOpen(false)}><span className="di-dot"></span>Reinforced Thermoplastic Pipe</Link>
                  <Link href="/products/composite-lined" className="drop-item" onClick={() => setDropOpen(false)}><span className="di-dot"></span>PTFE Lined Piping Systems</Link>
                  <Link href="/products/pfp-rx-abrasion" className="drop-item" onClick={() => setDropOpen(false)}><span className="di-dot"></span>PFP-RX Wear Resistant Piping</Link>
                  <Link href="/products/bi-metal" className="drop-item" onClick={() => setDropOpen(false)}><span className="di-dot"></span>Bi-Metal Piping Solutions</Link>
                  <Link href="/products/heat-exchangers" className="drop-item" onClick={() => setDropOpen(false)}><span className="di-dot"></span>Heat Exchangers, Parts &amp; Fabrication</Link>
                  <Link href="/products/specialty-fabrication" className="drop-item" onClick={() => setDropOpen(false)}><span className="di-dot"></span>Specialty Fabrication &amp; Forged Items</Link>
                </div>
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <div className={`nav-link has-drop${resDropOpen ? " open" : ""}`} id="resDrop" onClick={() => setResDropOpen(!resDropOpen)}>Resources</div>
              <div className={`res-dropdown${resDropOpen ? " open" : ""}`} id="resDropdown">
                <Link href="/resources" className="drop-item" onClick={() => setResDropOpen(false)}><span className="di-dot"></span>Resources</Link>
                <Link href="/tools" className="drop-item" onClick={() => setResDropOpen(false)}><span className="di-dot"></span>Tools</Link>
                <Link href="/news" className="drop-item" onClick={() => setResDropOpen(false)}><span className="di-dot"></span>News &amp; Updates</Link>
              </div>
            </div>
          </div>
          <div className="nav-right">
            <Link href="/#contact" className="btn-contact">Contact Us</Link>
            <div className={`hamburger${mobileOpen ? " active" : ""}`} onClick={() => setMobileOpen(!mobileOpen)}>
              <span></span><span></span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu${mobileOpen ? " open" : ""}`}>
        <div className="mobile-menu-inner">
          <Link href="/about" className="mobile-link" onClick={() => setMobileOpen(false)}>About Us</Link>
          <div className="mobile-link" onClick={() => setMobileIndOpen(!mobileIndOpen)}>
            Industries
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ marginLeft: 8, transform: mobileIndOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
          {mobileIndOpen && (
            <div className="mobile-sub">
              <Link href="/industries/energy" className="mobile-sub-link" onClick={() => setMobileOpen(false)}>Energy Sector</Link>
              <Link href="/industries/mining" className="mobile-sub-link" onClick={() => setMobileOpen(false)}>Mining Sector</Link>
              <Link href="/industries/chemical-processing" className="mobile-sub-link" onClick={() => setMobileOpen(false)}>Chemical Processing</Link>
            </div>
          )}
          <div className="mobile-link" onClick={() => setMobileProdOpen(!mobileProdOpen)}>
            Products
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ marginLeft: 8, transform: mobileProdOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
          {mobileProdOpen && (
            <div className="mobile-sub">
              <Link href="/products/pipe-fittings-valves" className="mobile-sub-link" onClick={() => setMobileOpen(false)}>Pipe Fittings &amp; Valves</Link>
              <Link href="/products/linepipe-coating" className="mobile-sub-link" onClick={() => setMobileOpen(false)}>Linepipe &amp; Coating Solutions</Link>
              <Link href="/products/reinforced-thermoplastic" className="mobile-sub-link" onClick={() => setMobileOpen(false)}>Reinforced Thermoplastic Pipe</Link>
              <Link href="/products/composite-lined" className="mobile-sub-link" onClick={() => setMobileOpen(false)}>PTFE Lined Piping Systems</Link>
              <Link href="/products/pfp-rx-abrasion" className="mobile-sub-link" onClick={() => setMobileOpen(false)}>PFP-RX Wear Resistant Piping</Link>
              <Link href="/products/bi-metal" className="mobile-sub-link" onClick={() => setMobileOpen(false)}>Bi-Metal Piping Solutions</Link>
              <Link href="/products/heat-exchangers" className="mobile-sub-link" onClick={() => setMobileOpen(false)}>Heat Exchangers, Parts &amp; Fabrication</Link>
              <Link href="/products/specialty-fabrication" className="mobile-sub-link" onClick={() => setMobileOpen(false)}>Specialty Fabrication &amp; Forged Items</Link>
            </div>
          )}
          <div className="mobile-link" onClick={() => setMobileResOpen(!mobileResOpen)}>
            Resources
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ marginLeft: 8, transform: mobileResOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
          {mobileResOpen && (
            <div className="mobile-sub">
              <Link href="/resources" className="mobile-sub-link" onClick={() => setMobileOpen(false)}>Resources</Link>
              <Link href="/tools" className="mobile-sub-link" onClick={() => setMobileOpen(false)}>Tools</Link>
              <Link href="/news" className="mobile-sub-link" onClick={() => setMobileOpen(false)}>News &amp; Updates</Link>
            </div>
          )}
          <Link href="/#contact" className="mobile-link mobile-contact-btn" onClick={() => setMobileOpen(false)}>Contact Us</Link>
        </div>
      </div>
    </>
  );
}

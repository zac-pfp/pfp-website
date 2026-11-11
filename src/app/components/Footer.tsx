"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="foot-grid">
        <div>
          <div className="foot-logo">
            <Image src="/Primary_Wordmark_Green_White_RGB.png" alt="PFP" width={240} height={56} style={{ height: 56, width: "auto" }} />
          </div>
          <Link href="/#contact" className="foot-cta">Get in Touch</Link>
        </div>
        <div className="foot-col">
          <h4>Contact Us</h4>
          <div className="foot-addr">
            <strong>PFP (Aust) Pty Ltd</strong><br />
            Unit 1, 245 Barrington Street<br />
            Bibra Lake WA 6163<br />
            Australia<br /><br />
            ABN 31 062 673 223
          </div>
        </div>
        <div className="foot-col">
          <h4>Navigation</h4>
          <ul className="foot-links">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/#products">Products</Link></li>
            <li><Link href="/#industries">Industries</Link></li>
            <li><Link href="/#contact">Contact</Link></li>
            <li><Link href="/resources">Resources</Link></li>
            <li><Link href="/news">News &amp; Updates</Link></li>
          </ul>
        </div>
      </div>
      <div className="foot-bottom">
        <p>&copy; 2026 PFP (Aust) Pty Ltd. All rights reserved.</p>
        <p>ISO 9001:2015 — Bureau Veritas Certified</p>
      </div>
    </footer>
  );
}

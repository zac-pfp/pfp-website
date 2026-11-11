"use client";

import { useEffect } from "react";
import Link from "next/link";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

const ArrowLeft = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const ArrowRight = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function ArticlePage() {
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

      <article className="news-article">
        <div className="news-article-inner rv">
          <Link href="/news" className="news-back-link">
            <ArrowLeft /> Back to News
          </Link>

          <div className="news-article-meta">
            <span className="news-card-tag">Company News</span>
            <span className="news-card-date">09 December 2020</span>
          </div>

          <h1 className="news-article-title">PFP Group Announcement</h1>
          <p className="news-article-subtitle">
            Appointment of Michael Ward as General Manager
          </p>

          <div className="news-article-body">
            <p>To our valued suppliers, partners and clients.</p>

            <p>
              PFP (Aust) are pleased to announce the appointment of Michael Ward
              to the position of General Manager.
            </p>

            <p>
              Michael has worked in the oil and gas industry for over 10 years.
              In this time Michael has built strong relationships within the
              Australian market and developed a unique understanding of
              clients&apos; needs.
            </p>

            <p>
              Michael will be working with the team to ensure continued success
              of PFP (Aust), its suppliers, partners and clients.
            </p>

            <p>
              We would like to congratulate Michael and wish him all the very
              best as he leads the company into a very bright future.
            </p>

            <p className="news-article-signoff">
              Kind regards,
              <br />
              <strong>Paul Montague</strong>
              <br />
              PFP Holdings Group Director
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="news-container rv d1">
          <div className="news-cta-box">
            <div className="news-cta-text">
              <h2>Have a Project Enquiry?</h2>
              <p>Get in touch with our team — we respond within the same business day.</p>
            </div>
            <Link href="/#contact" className="btn-hero-cta">
              Contact Us <ArrowRight />
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}

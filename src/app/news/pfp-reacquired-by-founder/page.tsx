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
            <span className="news-card-date">10 April 2019</span>
          </div>

          <h1 className="news-article-title">PFP Re-Acquired by Founder</h1>
          <p className="news-article-subtitle">PFP Group Announcement</p>

          <div className="news-article-body">
            <p>
              To our valued team members, suppliers, partners and clients.
            </p>

            <p>
              I am writing to inform you of some very important changes in the
              PFP Group.
            </p>

            <p>
              Effective 22nd February 2019, I am pleased to announce as the
              original founder of PFP I have re-acquired the group from UMW
              Holdings Bhd.
            </p>

            <p>
              During the year of 2018, UMW took the strategic decision to exit
              many of their Oil and Gas services related businesses including
              PFP. At this time trading restrictions were imposed that
              unfortunately meant for a period PFP was unable to meet our client
              expectations in terms of product and service range and delivery. I
              am pleased to announce those restrictions are now behind us and
              once again we can be a leading supplier of piping and pressure
              vessel components to resources and energy sectors.
            </p>

            <p>
              We look forward to working with all of you to continue the success
              of PFP. We would also like to take this opportunity to thank the
              staff and clients in particular for their patience and forbearance
              during this transition.
            </p>

            <div className="news-about-section">
              <h3>About Paul Montague</h3>
              <p className="news-about-role">PFP Holdings Group Director</p>
              <ul>
                <li>Founder of PFP</li>
                <li>
                  Co-Founder of Profab Group (now wholly owned by NOV)
                </li>
                <li>
                  Founder and Director of Cladtek, one of the largest specialist
                  CRA cladding groups in the world
                </li>
              </ul>
            </div>

            <div className="news-about-section">
              <h3>About PFP Group</h3>
              <p>
                Leading supplier, international trader and stockist of the
                complete range of piping and pressure vessel components,
                including butt weld fittings, flanges, pipe, compact flanges and
                mechanical joints.
              </p>
            </div>

            <p className="news-article-signoff">
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

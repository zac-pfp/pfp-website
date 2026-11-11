"use client";

import { useEffect } from "react";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const ARTICLES = [
  {
    slug: "michael-ward-appointed-general-manager",
    date: "09 Dec 2020",
    author: "Paul Montague",
    title: "PFP Group Announcement — Appointment of General Manager",
    excerpt:
      "PFP (Aust) are pleased to announce the appointment of Michael Ward to the position of General Manager.",
    tag: "Company News",
  },
  {
    slug: "pfp-reacquired-by-founder",
    date: "10 Apr 2019",
    author: "Paul Montague",
    title: "PFP Re-Acquired by Founder",
    excerpt:
      "Effective 22nd February 2019, PFP founder Paul Montague has re-acquired the group from UMW Holdings Bhd.",
    tag: "Company News",
  },
];

const ArrowRight = () => (
  <svg
    width="13"
    height="13"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    viewBox="0 0 24 24"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function NewsPage() {
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
      <section className="news-hero">
        <div className="news-hero-inner">
          <span className="prod-accent-label">PFP NEWS</span>
          <h1 className="news-hero-title">
            Latest <span className="g">Updates</span>
          </h1>
          <p className="news-hero-blurb">
            Stay informed with the latest announcements, project updates and
            company news from PFP (Aust) Pty Ltd.
          </p>
        </div>
      </section>

      {/* ARTICLE LIST */}
      <section className="news-list-section">
        <div className="news-container">
          {ARTICLES.map((a, i) => (
            <Link
              key={a.slug}
              href={`/news/${a.slug}`}
              className={`news-card rv${i > 0 ? ` d${i}` : ""}`}
            >
              <div className="news-card-meta">
                <span className="news-card-tag">{a.tag}</span>
                <span className="news-card-date">{a.date}</span>
              </div>
              <h2 className="news-card-title">{a.title}</h2>
              <p className="news-card-excerpt">{a.excerpt}</p>
              <div className="news-card-cta">
                Read Article <ArrowRight />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="news-cta-section rv">
        <div className="news-container">
          <div className="news-cta-box">
            <div className="news-cta-text">
              <h2>Have a Project Enquiry?</h2>
              <p>
                Get in touch with our team — we respond within the same business
                day.
              </p>
            </div>
            <Link href="/#contact" className="btn-hero-cta">
              Contact Us <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

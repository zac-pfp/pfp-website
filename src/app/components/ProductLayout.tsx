"use client";

import { useEffect, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Nav from "./Nav";
import Footer from "./Footer";
import BrochurePreview from "./BrochurePreview";
import { ArrowRight, DiagArrow } from "./Icons";
import { useContactForm } from "./useContactForm";
import { FluidParticlesBackground } from "@/components/ui/fluid-particles-background";
import { EtheralShadow } from "@/components/ui/etheral-shadow";

interface ProductLayoutProps {
  title: string;
  subtitle?: string;
  blurb: string;
  heroImage: string;
  heroImageAlt: string;
  heroVariant?: "image" | "mesh";
  heroSeed?: number;
  /** Public URL of the downloadable product brochure. When omitted, the brochure CTA section is hidden. */
  brochureUrl?: string;
  /** Cover-page preview image shown on the right of the brochure CTA. */
  brochurePreview?: string;
  /** Alt text for the brochure preview image. */
  brochurePreviewAlt?: string;
  children: ReactNode;
}

export default function ProductLayout({ title, subtitle, blurb, heroImage, heroImageAlt, heroVariant = "image", heroSeed = 0, brochureUrl, brochurePreview, brochurePreviewAlt, children }: ProductLayoutProps) {
  const { status, errorMessage, handleSubmit } = useContactForm({ productInterest: title });

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

      {/* FULL-WIDTH CINEMATIC HERO */}
      <section className={`prod-hero-v2${heroVariant === "mesh" ? " prod-hero-mesh" : ""}`}>
        {heroVariant === "image" ? (
          <>
            <Image src={heroImage} alt={heroImageAlt} fill style={{ objectFit: "cover" }} priority />
            <div className="prod-hero-v2-overlay" />
            <div className="prod-hero-particles">
              <FluidParticlesBackground
                particleCount={900}
                noiseIntensity={0.0025}
                particleSize={{ min: 0.5, max: 1.8 }}
                particleColor={[70, 184, 103]}
                particleColorAlt={[255, 255, 255]}
                trailBackground="rgba(0, 0, 0, 0.06)"
              />
            </div>
          </>
        ) : (
          <EtheralShadow
            color="rgba(50, 140, 75, 1)"
            animation={{ scale: 100, speed: 65, seed: heroSeed }}
            noise={{ opacity: 0.6, scale: 1.2 }}
            sizing="stretch"
            style={{ position: "absolute", inset: 0 }}
          />
        )}

        <div className="prod-hero-v2-content">
          {subtitle && <span className="prod-hero-v2-subtitle">{subtitle}</span>}
          <h1 className="prod-hero-v2-title">{title}</h1>
          <p className="prod-hero-v2-blurb">{blurb}</p>
          <Link href="#product-contact" className="btn-hero-cta">
            Enquire Now<ArrowRight />
          </Link>
        </div>
      </section>

      {/* PRODUCT-SPECIFIC CONTENT */}
      {children}

      {/* BROCHURE / CATALOGUE CTA — only renders when a brochure URL is provided */}
      {brochureUrl && (
        <section className="prod-catalogue-section">
          <div className="prod-container">
            <div className={`prod-catalogue-inner rv${brochurePreview ? " with-preview" : ""}`}>
              <div className="prod-catalogue-text">
                <span className="prod-accent-label">Resources</span>
                <h2 className="prod-catalogue-h2">Download our product brochure.</h2>
                <p className="prod-catalogue-desc">Get detailed specifications, technical data and application information for {title}.</p>
                <a
                  href={brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hero-cta"
                  style={{ marginTop: 8 }}
                >
                  Download Brochure<ArrowRight />
                </a>
              </div>
              {brochurePreview && (
                <div className="prod-catalogue-preview">
                  <BrochurePreview
                    pdfHref={brochureUrl}
                    coverSrc={brochurePreview}
                    coverAlt={brochurePreviewAlt || `${title} brochure cover`}
                    hoverLabel="Download PDF"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CONTACT */}
      <section className="prod-section prod-contact-section" id="product-contact">
        <div className="prod-container">
          <div className="prod-contact-grid">
            <div className="rv">
              <span className="prod-accent-label" style={{ color: "var(--green)" }}>Contact Us</span>
              <h2 className="prod-contact-h2">Get In <span className="g">Touch</span></h2>
              <p className="prod-contact-desc">Speak to our team about {title.toLowerCase()} for your next project.</p>
              <div className="prod-offices">
                <div className="prod-off">
                  <div className="prod-off-city">Perth (HQ)</div>
                  <div className="prod-off-info">Unit 1, 245 Barrington St, Bibra Lake WA 6163<br /><a href="tel:+61863990600">+61 8 6399 0600</a><br /><a href="mailto:salesperth@pfp.com.au">salesperth@pfp.com.au</a></div>
                </div>
                <div className="prod-off">
                  <div className="prod-off-city">Brisbane</div>
                  <div className="prod-off-info"><a href="tel:+61414035166">+61 414 035 166</a><br /><a href="mailto:salesqld@pfp.com.au">salesqld@pfp.com.au</a></div>
                </div>
                <div className="prod-off">
                  <div className="prod-off-city">Melbourne</div>
                  <div className="prod-off-info"><a href="tel:+61414035166">+61 414 035 166</a><br /><a href="mailto:salesvic@pfp.com.au">salesvic@pfp.com.au</a></div>
                </div>
              </div>
            </div>
            <form className="prod-form rv d1" onSubmit={handleSubmit}>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} aria-hidden="true" />
              <div className="crow">
                <div className="cg"><label htmlFor="pf-name">Name</label><input id="pf-name" name="name" type="text" placeholder="Full name" required /></div>
                <div className="cg"><label htmlFor="pf-company">Company</label><input id="pf-company" name="company" type="text" placeholder="Company name" /></div>
              </div>
              <div className="crow">
                <div className="cg"><label htmlFor="pf-email">Email</label><input id="pf-email" name="email" type="email" placeholder="Work email" required /></div>
                <div className="cg"><label htmlFor="pf-phone">Phone</label><input id="pf-phone" name="phone" type="tel" placeholder="+61 8 0000 0000" /></div>
              </div>
              <div className="cg"><label htmlFor="pf-message">Message</label><textarea id="pf-message" name="message" placeholder="Tell us about your project or enquiry..."></textarea></div>
              {status === "error" && errorMessage && (
                <div role="alert" style={{ color: "#c44", fontSize: 13, marginTop: 8 }}>{errorMessage}</div>
              )}
              <button type="submit" className="csubmit" disabled={status === "submitting" || status === "success"} style={status === "success" ? { background: "#15361c" } : {}}>
                {status === "success" ? "✓ Sent — We'll be in touch shortly" : status === "submitting" ? "Sending…" : <>Submit Enquiry<ArrowRight /></>}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

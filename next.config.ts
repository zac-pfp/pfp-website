import type { NextConfig } from "next";

/**
 * Content Security Policy.
 *
 * Tuned for this site's actual runtime needs:
 * - 'unsafe-inline' for script-src — required for Next.js 16's hydration bootstrap
 * - 'unsafe-inline' for style-src — required for inline styles from emotion-style libraries (etheral-shadow)
 * - framerusercontent.com — etheral-shadow component fetches decorative noise PNGs from there
 * - data: for images — used for base64 favicons/icons and inline SVG masks
 * - No connect-src for third parties — site only talks to its own /api/contact endpoint
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob: https://framerusercontent.com",
  "media-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=(), serial=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Content-Security-Policy", value: CSP },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [32, 48, 64, 96, 128, 192, 256],
  },

  // Don't expose Next.js version in X-Powered-By
  poweredByHeader: false,

  /**
   * Apply security headers to every response.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },

  /**
   * 301 redirects from the legacy WordPress site to the new structure.
   * These preserve SEO ranking authority — Google treats 301s as "the page
   * has moved permanently" and transfers link equity from old URL to new.
   *
   * Trailing-slash variants are handled via `:slash(/?)` so both `/about-us`
   * and `/about-us/` redirect to the same destination.
   */
  async redirects() {
    return [
      // Core pages
      { source: "/about-us:slash(/?)", destination: "/about", permanent: true },
      { source: "/contact:slash(/?)", destination: "/#contact", permanent: true },
      { source: "/contact-us:slash(/?)", destination: "/#contact", permanent: true },
      { source: "/resources-downloads:slash(/?)", destination: "/resources", permanent: true },
      { source: "/announcements:slash(/?)", destination: "/news", permanent: true },
      { source: "/home-new:slash(/?)", destination: "/", permanent: true },

      // Industry pages
      { source: "/mining:slash(/?)", destination: "/industries/mining", permanent: true },
      { source: "/oil-and-gas:slash(/?)", destination: "/industries/energy", permanent: true },
      { source: "/oil-gas:slash(/?)", destination: "/industries/energy", permanent: true },
      { source: "/energy:slash(/?)", destination: "/industries/energy", permanent: true },
      { source: "/petrochemical:slash(/?)", destination: "/industries/chemical-processing", permanent: true },
      { source: "/chemical-processing:slash(/?)", destination: "/industries/chemical-processing", permanent: true },
      { source: "/processing:slash(/?)", destination: "/industries/chemical-processing", permanent: true },

      // Lining / fluoropolymer pages — old site grouped these under various URLs
      { source: "/lining-solutions:slash(/?)", destination: "/products/composite-lined", permanent: true },
      { source: "/lining-connection-solutions:slash(/?)", destination: "/products/composite-lined", permanent: true },
      { source: "/ptfe:slash(/?)", destination: "/products/composite-lined", permanent: true },
      { source: "/pfa:slash(/?)", destination: "/products/composite-lined", permanent: true },
      { source: "/pvdf:slash(/?)", destination: "/products/composite-lined", permanent: true },
      { source: "/pp:slash(/?)", destination: "/products/composite-lined", permanent: true },
      { source: "/hdpe:slash(/?)", destination: "/products/composite-lined", permanent: true },
      { source: "/etfe:slash(/?)", destination: "/products/composite-lined", permanent: true },

      // Generic legacy product / service pages
      { source: "/project-solutions:slash(/?)", destination: "/", permanent: true },
      { source: "/products:slash(/?)", destination: "/#products", permanent: true },
      { source: "/services:slash(/?)", destination: "/#products", permanent: true },
      { source: "/solutions:slash(/?)", destination: "/", permanent: true },
      { source: "/fittings:slash(/?)", destination: "/products/pipe-fittings-valves", permanent: true },
      { source: "/valves:slash(/?)", destination: "/products/pipe-fittings-valves", permanent: true },
      { source: "/flanges:slash(/?)", destination: "/products/pipe-fittings-valves", permanent: true },
      { source: "/linepipe:slash(/?)", destination: "/products/linepipe-coating", permanent: true },
      { source: "/coatings:slash(/?)", destination: "/products/linepipe-coating", permanent: true },
      { source: "/heat-exchangers:slash(/?)", destination: "/products/heat-exchangers", permanent: true },
      { source: "/fabrication:slash(/?)", destination: "/products/specialty-fabrication", permanent: true },
      { source: "/specialty-fabrication:slash(/?)", destination: "/products/specialty-fabrication", permanent: true },

      // WordPress upload paths — point users at the new resources hub
      { source: "/wp-content/:path*", destination: "/resources", permanent: true },
      { source: "/wp-admin/:path*", destination: "/", permanent: true },
      { source: "/wp-includes/:path*", destination: "/", permanent: true },
      { source: "/wp-login.php", destination: "/", permanent: true },
      { source: "/wp-json/:path*", destination: "/", permanent: true },
      { source: "/feed:slash(/?)", destination: "/news", permanent: true },
      { source: "/rss:slash(/?)", destination: "/news", permanent: true },
    ];
  },
};

export default nextConfig;

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "PFP (Aust) — Engineered Piping Solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #15361c 0%, #19302a 60%, #0f2614 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top — accent bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 18,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#46b867",
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: 56,
              height: 3,
              background: "#46b867",
              display: "flex",
            }}
          />
          PFP (Aust) Pty Ltd
        </div>

        {/* Middle — main headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "white",
              display: "flex",
            }}
          >
            Engineered Piping
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            <span style={{ color: "white" }}>Solutions for </span>
            <span style={{ color: "#46b867", marginLeft: 16 }}>Australia</span>
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 400,
              color: "rgba(255,255,255,0.65)",
              marginTop: 14,
              letterSpacing: "-0.005em",
              display: "flex",
            }}
          >
            Energy &middot; Mining &middot; Chemical Processing
          </div>
        </div>

        {/* Bottom — site URL + tagline */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            color: "rgba(255,255,255,0.55)",
            borderTop: "1px solid rgba(255,255,255,0.15)",
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex" }}>100% Australian-owned. Established 1987.</div>
          <div
            style={{
              display: "flex",
              fontWeight: 600,
              color: "#46b867",
              letterSpacing: "0.04em",
            }}
          >
            pfp.com.au
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

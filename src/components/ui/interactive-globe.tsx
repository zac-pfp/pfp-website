"use client";

import { useEffect, useRef, useCallback } from "react";
import createGlobe from "cobe";

/* ── Marker data ─────────────────────────────────────────────── */
interface GlobeMarker {
  id: string;
  location: [number, number];
  label: string;
  sublabel?: string;
  type: "office" | "supply";
  size: number;
}

const MARKERS: GlobeMarker[] = [
  // PFP Offices
  { id: "perth", location: [-31.95, 115.86], label: "Perth", sublabel: "Headquarters", type: "office", size: 0.07 },
  { id: "brisbane", location: [-27.47, 153.03], label: "Brisbane", sublabel: "Regional Office", type: "office", size: 0.05 },
  { id: "melbourne", location: [-37.81, 144.96], label: "Melbourne", sublabel: "Regional Office", type: "office", size: 0.05 },
  // Supply chain
  { id: "india", location: [19.08, 72.88], label: "India", sublabel: "Pipe & Fittings Manufacturing", type: "supply", size: 0.035 },
  { id: "china", location: [31.23, 121.47], label: "China", sublabel: "Linepipe, Fittings & Valves", type: "supply", size: 0.035 },
  { id: "korea", location: [37.57, 126.98], label: "South Korea", sublabel: "Premium Linepipe & Steel", type: "supply", size: 0.035 },
  { id: "singapore", location: [1.35, 103.82], label: "Singapore", sublabel: "Trading & Logistics Hub", type: "supply", size: 0.035 },
  { id: "japan", location: [35.68, 139.69], label: "Japan", sublabel: "Premium Steel & Alloys", type: "supply", size: 0.035 },
  { id: "thailand", location: [13.76, 100.5], label: "Thailand", sublabel: "Fittings & Fabrication", type: "supply", size: 0.035 },
  { id: "italy", location: [45.46, 9.19], label: "Italy", sublabel: "Valves & Specialty Forgings", type: "supply", size: 0.035 },
  { id: "germany", location: [51.23, 6.77], label: "Germany", sublabel: "Engineered Valves & Fittings", type: "supply", size: 0.035 },
  { id: "france", location: [48.86, 2.35], label: "France", sublabel: "PTFE Lined Piping Systems", type: "supply", size: 0.035 },
  { id: "uk", location: [51.51, -0.13], label: "United Kingdom", sublabel: "RTP & Specialty Products", type: "supply", size: 0.035 },
  { id: "us", location: [29.76, -95.37], label: "United States", sublabel: "Coatings & Technology", type: "supply", size: 0.035 },
  { id: "uae", location: [24.47, 54.37], label: "UAE", sublabel: "Regional Supply & Logistics", type: "supply", size: 0.035 },
  { id: "saudi", location: [24.71, 46.67], label: "Saudi Arabia", sublabel: "Project Supply", type: "supply", size: 0.035 },
  { id: "taiwan", location: [25.04, 121.57], label: "Taiwan", sublabel: "Steel & Fittings", type: "supply", size: 0.035 },
  { id: "vietnam", location: [10.82, 106.63], label: "Vietnam", sublabel: "Fabrication & Manufacturing", type: "supply", size: 0.035 },
];

/* ── Helpers ──────────────────────────────────────────────────── */
function latLngToAngles(lat: number, lng: number): [number, number] {
  return [
    Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2),
    (lat * Math.PI) / 180,
  ];
}

const PFP_GREEN: [number, number, number] = [70 / 255, 184 / 255, 103 / 255];

/* ── Component ────────────────────────────────────────────────── */
export function InteractiveGlobe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    isPausedRef.current = true;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    isPausedRef.current = false;
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        };
      }
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerUp]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    let globe: ReturnType<typeof createGlobe> | null = null;
    let animationId: number;

    // Start centered on Australia
    const [initPhi, initTheta] = latLngToAngles(-25, 130);
    let phi = initPhi;
    const baseTheta = initTheta * 0.6;

    function init() {
      const width = canvas.offsetWidth;
      if (width === 0 || globe) return;

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width: width * 2,
        height: width * 2,
        phi: initPhi,
        theta: baseTheta,
        dark: 0,
        diffuse: 2.0,
        mapSamples: 24000,
        mapBrightness: 4,
        baseColor: [0.92, 0.92, 0.92],
        markerColor: PFP_GREEN,
        glowColor: [0.88, 0.96, 0.90],
        markerElevation: 0,
        markers: MARKERS.map((m) => ({
          location: m.location,
          size: 0,
          id: m.id,
        })),
        opacity: 0.85,
        offset: [0, 0],
      } as any);

      function animate() {
        if (!isPausedRef.current) phi += 0.002;
        globe!.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: baseTheta + thetaOffsetRef.current + dragOffset.current.theta,
        });
        animationId = requestAnimationFrame(animate);
      }
      animate();
      setTimeout(() => {
        if (canvas) canvas.style.opacity = "1";
      }, 100);
    }

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect();
          init();
        }
      });
      ro.observe(canvas);
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (globe) globe.destroy();
    };
  }, []);

  return (
    <div className={className} style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <style>{`
        @keyframes pfp-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      <div style={{ position: "relative", width: "100%", maxWidth: 460, aspectRatio: "1" }}>
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          style={{
            width: "100%",
            height: "100%",
            cursor: "grab",
            opacity: 0,
            transition: "opacity 1.2s ease",
            borderRadius: "50%",
            touchAction: "none",
          }}
        />

        {/* ── Office labels ── */}
        {MARKERS.filter((m) => m.type === "office").map((m) => (
          <div
            key={m.id}
            style={{
              position: "absolute",
              positionAnchor: `--cobe-${m.id}`,
              bottom: "anchor(top)",
              left: "anchor(center)",
              translate: "-50% 0",
              marginBottom: 4,
              padding: "0.25rem 0.5rem",
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(6px)",
              borderRadius: 4,
              boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
              pointerEvents: "none" as const,
              whiteSpace: "nowrap" as const,
              opacity: `var(--cobe-visible-${m.id}, 0)`,
              filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 8px))`,
              transition: "opacity 0.4s, filter 0.4s",
              zIndex: 6,
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: "0.6rem", fontWeight: 700, color: "#46b867",
              letterSpacing: "0.02em",
            }}
          >
            {m.label}{m.id === "perth" ? " (HQ)" : ""}
          </div>
        ))}

        {/* ── Supply chain labels ── */}
        {MARKERS.filter((m) => m.type === "supply").map((m) => (
          <div
            key={m.id}
            style={{
              position: "absolute",
              positionAnchor: `--cobe-${m.id}`,
              bottom: "anchor(top)",
              left: "anchor(center)",
              translate: "-50% 0",
              marginBottom: 4,
              padding: "0.2rem 0.45rem",
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(6px)",
              borderRadius: 3,
              boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
              pointerEvents: "none" as const,
              whiteSpace: "nowrap" as const,
              opacity: `var(--cobe-visible-${m.id}, 0)`,
              filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 8px))`,
              transition: "opacity 0.4s, filter 0.4s",
              zIndex: 5,
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: "0.5rem", fontWeight: 600, color: "#ff5e5b",
              letterSpacing: "0.02em",
            }}
          >
            {m.label}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{
        display: "flex",
        gap: 12,
        fontSize: 11,
        fontWeight: 600,
        marginTop: 12,
        justifyContent: "center",
      }}>
        <span style={{
          color: "#46b867",
          background: "rgba(0,0,0,0.55)",
          padding: "4px 10px",
          borderRadius: 4,
          boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
        }}>PFP Offices</span>
        <span style={{
          color: "#ff5e5b",
          background: "rgba(0,0,0,0.55)",
          padding: "4px 10px",
          borderRadius: 4,
          boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
        }}>Global Supply Chain</span>
      </div>
    </div>
  );
}

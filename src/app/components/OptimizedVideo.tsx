"use client";

import { useEffect, useRef } from "react";

interface OptimizedVideoProps {
  src: string;
  className?: string;
  poster?: string;
  preload?: "none" | "metadata" | "auto";
  priority?: boolean;
  /** Skip the WebM source — useful when the WebM is larger than the MP4. */
  noWebm?: boolean;
}

/**
 * OptimizedVideo — serves WebM (VP9) with MP4 fallback,
 * poster frame, and mobile-aware loading.
 *
 * - WebM source is derived from the MP4 path (e.g., hero-energy.mp4 → hero-energy.webm)
 * - Poster is derived from the MP4 path (e.g., hero-energy.mp4 → hero-energy-poster.jpg)
 * - On slow connections, shows poster only (no video load)
 */
export default function OptimizedVideo({
  src,
  className = "",
  poster,
  preload,
  priority = false,
  noWebm = false,
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Derive WebM and poster paths from MP4 src
  const webmSrc = src.replace(/\.mp4$/, ".webm");
  const posterSrc = poster || src.replace(/\.mp4$/, "-poster.jpg");
  const effectivePreload = priority ? "metadata" : (preload || "none");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check for data-saver / slow connection — skip video entirely
    const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (conn?.saveData || conn?.effectiveType === "2g") {
      return; // Keep poster, don't load video
    }

    // For non-priority videos, lazy-load with IntersectionObserver
    if (!priority) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.load();
              video.play().catch(() => {});
              obs.unobserve(video);
            }
          });
        },
        { rootMargin: "200px" }
      );
      obs.observe(video);
      return () => obs.disconnect();
    }
  }, [priority]);

  return (
    <video
      ref={videoRef}
      className={className}
      poster={posterSrc}
      preload={effectivePreload}
      autoPlay={priority}
      loop
      muted
      playsInline
    >
      {!noWebm && <source src={webmSrc} type="video/webm" />}
      <source src={src} type="video/mp4" />
    </video>
  );
}

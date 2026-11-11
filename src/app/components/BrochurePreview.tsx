import Image from "next/image";

interface BrochurePreviewProps {
  /** Public URL of the PDF — when provided, the preview becomes a download link. */
  pdfHref?: string;
  /** Cover image (first-page render) — A4 portrait recommended. */
  coverSrc: string;
  /** Alt text for the cover image. */
  coverAlt: string;
  /** Darker shadows for use on dark backgrounds. */
  variant?: "light" | "dark";
  /** Label shown in the hover badge (link variant only). */
  hoverLabel?: string;
}

/**
 * 3D-tilted brochure cover mockup with spine shadow and hover lift.
 * Optionally wraps in a download link when `pdfHref` is set.
 */
export default function BrochurePreview({
  pdfHref,
  coverSrc,
  coverAlt,
  variant = "light",
  hoverLabel = "View PDF",
}: BrochurePreviewProps) {
  const classes = `brochure-preview${variant === "dark" ? " brochure-preview-dark" : ""}`;

  const inner = (
    <>
      <div className="brochure-preview-inner">
        <Image
          src={coverSrc}
          alt={coverAlt}
          width={680}
          height={962}
          sizes="(max-width: 480px) 240px, (max-width: 768px) 280px, 340px"
        />
      </div>
      {pdfHref && (
        <span className="brochure-preview-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
          {hoverLabel}
        </span>
      )}
    </>
  );

  if (pdfHref) {
    return (
      <a
        href={pdfHref}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={coverAlt}
      >
        {inner}
      </a>
    );
  }

  return <div className={classes}>{inner}</div>;
}

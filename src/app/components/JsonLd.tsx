/**
 * JsonLd — renders a <script type="application/ld+json"> tag with the given schema object(s).
 * Server component (no "use client") so it streams as HTML and is visible to AI/SEO crawlers.
 *
 * Pass a single object or an array of schema objects.
 *
 * Security: serialised JSON is escaped to prevent any literal `</script>` or HTML-special
 * sequences from breaking out of the script tag. Even though the only inputs are
 * compile-time constants from src/lib/schemas.ts, this is defence-in-depth.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const json = Array.isArray(data) ? data : [data];
  return (
    <>
      {json.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(item) }}
        />
      ))}
    </>
  );
}

/**
 * Safely serialise an object to a JSON string suitable for embedding inside
 * a <script> tag in HTML. Escapes the characters that could otherwise
 * terminate the script tag or be interpreted as HTML.
 */
function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

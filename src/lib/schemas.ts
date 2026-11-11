/**
 * Shared JSON-LD schema builders for PFP (Aust).
 * These tell Google, Bing, ChatGPT, Claude, Perplexity, and other AI/search engines
 * exactly who PFP is, what we sell, where we are, and how to cite us.
 */

export const SITE_URL = "https://pfp.com.au";

const PFP_LOGO = `${SITE_URL}/Primary_Wordmark_Green_White_RGB.png`;
const PFP_OG = `${SITE_URL}/opengraph-image`;

/**
 * Organization — root identity. Cited by AI when asked "who is PFP".
 */
export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "PFP (Aust) Pty Ltd",
  alternateName: ["PFP", "PFP Aust", "Pipe Fittings & Process"],
  url: SITE_URL,
  logo: PFP_LOGO,
  image: PFP_OG,
  description:
    "100% Australian-owned supplier of engineered piping solutions, fittings, valves, and custom-fabricated equipment for the energy, mining, and chemical processing industries since 1987.",
  foundingDate: "1987",
  foundingLocation: {
    "@type": "Place",
    name: "Perth, Western Australia",
  },
  taxID: "ABN 31 062 673 223",
  vatID: "ABN 31 062 673 223",
  areaServed: [
    { "@type": "Country", name: "Australia" },
    { "@type": "AdministrativeArea", name: "Western Australia" },
    { "@type": "AdministrativeArea", name: "Queensland" },
    { "@type": "AdministrativeArea", name: "Victoria" },
    { "@type": "AdministrativeArea", name: "South Australia" },
    { "@type": "AdministrativeArea", name: "Northern Territory" },
  ],
  knowsAbout: [
    "Pipe fittings and valves",
    "Linepipe and external coatings",
    "Reinforced thermoplastic pipe (RTP)",
    "Fluoropolymer lined piping (PTFE, PFA, PVDF, ETFE)",
    "PFP-RX wear resistant piping",
    "Bi-metal and CRA clad piping",
    "Heat exchangers and tube bundles",
    "Specialty fabrication and modular spooling",
    "Subsea structures",
    "Oil and gas piping supply",
    "Mining piping supply",
    "Chemical processing piping supply",
  ],
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", name: "ISO 9001:2015 Quality Management System (Bureau Veritas Certified)" },
  ],
  sameAs: [
    "https://www.linkedin.com/company/pfp-aust-pty-ltd",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Unit 1, 245 Barrington Street",
    addressLocality: "Bibra Lake",
    addressRegion: "WA",
    postalCode: "6163",
    addressCountry: "AU",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      areaServed: "AU-WA",
      telephone: "+61-8-6399-0600",
      email: "salesperth@pfp.com.au",
      availableLanguage: ["English"],
    },
    {
      "@type": "ContactPoint",
      contactType: "sales",
      areaServed: "AU-QLD",
      telephone: "+61-414-035-166",
      email: "salesqld@pfp.com.au",
      availableLanguage: ["English"],
    },
    {
      "@type": "ContactPoint",
      contactType: "sales",
      areaServed: "AU-VIC",
      telephone: "+61-414-035-166",
      email: "salesvic@pfp.com.au",
      availableLanguage: ["English"],
    },
  ],
};

/**
 * LocalBusiness — for "near me" and geographic queries.
 * Cited by AI for "pipe supplier in Perth" or "Bibra Lake industrial supplier".
 */
export const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: "PFP (Aust) Pty Ltd",
  image: PFP_OG,
  logo: PFP_LOGO,
  url: SITE_URL,
  telephone: "+61-8-6399-0600",
  email: "salesperth@pfp.com.au",
  priceRange: "$$$",
  description:
    "Perth-based supplier of engineered piping solutions: pipe fittings, valves, linepipe, RTP, fluoropolymer-lined systems, PFP-RX wear-resistant piping, bi-metal piping, heat exchangers and specialty fabrication. Serving energy, mining and chemical processing projects across Australia since 1987.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Unit 1, 245 Barrington Street",
    addressLocality: "Bibra Lake",
    addressRegion: "WA",
    postalCode: "6163",
    addressCountry: "AU",
  },
  geo: {
    "@type": "GeoCoordinates",
    // Bibra Lake industrial estate, Western Australia
    latitude: -32.0975,
    longitude: 115.8267,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  areaServed: [
    { "@type": "Country", name: "Australia" },
    { "@type": "City", name: "Perth" },
    { "@type": "City", name: "Brisbane" },
    { "@type": "City", name: "Melbourne" },
    { "@type": "AdministrativeArea", name: "Western Australia" },
    { "@type": "AdministrativeArea", name: "Pilbara" },
  ],
};

/**
 * Website schema — gives AI a search action and confirms the site identity.
 */
export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "PFP (Aust)",
  description:
    "Engineered piping solutions for Australia's energy, mining and chemical processing industries.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-AU",
};

interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * BreadcrumbList — helps AI understand site hierarchy.
 */
export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

interface ProductSchemaInput {
  name: string;
  description: string;
  url: string;
  image?: string;
  brochureUrl?: string;
  category?: string;
  /** Specifications as label/value pairs — rendered as additionalProperty. */
  specs?: { label: string; value: string }[];
}

/**
 * Product schema — one per product page.
 * Tells AI the product specs in a structured way it can confidently cite.
 */
export function productSchema(p: ProductSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    url: `${SITE_URL}${p.url}`,
    ...(p.image ? { image: p.image.startsWith("http") ? p.image : `${SITE_URL}${p.image}` } : {}),
    category: p.category || "Industrial Piping",
    brand: { "@type": "Brand", name: "PFP (Aust)" },
    manufacturer: { "@id": `${SITE_URL}/#organization` },
    ...(p.brochureUrl
      ? {
          subjectOf: {
            "@type": "DigitalDocument",
            name: `${p.name} — Product Brochure`,
            url: `${SITE_URL}${p.brochureUrl}`,
            encodingFormat: "application/pdf",
          },
        }
      : {}),
    ...(p.specs && p.specs.length > 0
      ? {
          additionalProperty: p.specs.map((s) => ({
            "@type": "PropertyValue",
            name: s.label,
            value: s.value,
          })),
        }
      : {}),
  };
}

interface ServiceSchemaInput {
  name: string;
  description: string;
  url: string;
  serviceType: string;
}

/**
 * Service schema — for industry pages (Energy, Mining, Chemical Processing).
 */
export function serviceSchema(s: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    url: `${SITE_URL}${s.url}`,
    serviceType: s.serviceType,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [{ "@type": "Country", name: "Australia" }],
  };
}

interface ArticleSchemaInput {
  headline: string;
  description: string;
  url: string;
  datePublished: string; // ISO 8601
  dateModified?: string;
  author?: string;
  image?: string;
}

/**
 * NewsArticle schema — for news articles.
 */
export function articleSchema(a: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: a.headline,
    description: a.description,
    url: `${SITE_URL}${a.url}`,
    datePublished: a.datePublished,
    dateModified: a.dateModified || a.datePublished,
    author: a.author
      ? { "@type": "Person", name: a.author }
      : { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    ...(a.image ? { image: a.image.startsWith("http") ? a.image : `${SITE_URL}${a.image}` } : { image: PFP_OG }),
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${a.url}` },
  };
}

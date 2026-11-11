import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import { breadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Resources & Downloads — Brochures, Data Sheets & Certifications",
  description:
    "Download PFP product brochures, technical data sheets, certifications and approval documentation for our complete piping solutions range.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
        ])}
      />
      {children}
    </>
  );
}

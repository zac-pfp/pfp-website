import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { productSchema, breadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Specialty Fabrication & Forged Items — Modular Spools, Subsea Structures",
  description:
    "Specialty fabrication, modular spooling, subsea structures, structural fabrication and forged piping items custom-engineered for energy, mining and chemical processing projects.",
  alternates: { canonical: "/products/specialty-fabrication" },
};

export default function SFLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          productSchema({
            name: "Specialty Fabrication & Forged Items",
            description:
              "Specialty fabrication services including modular spooling, subsea structures, structural fabrication, pressure equipment and forged piping items — custom-engineered for energy, mining and chemical processing projects.",
            url: "/products/specialty-fabrication",
            image: "/SPECIALTY_FABRICATION.jpg",
            category: "Specialty Fabrication",
            specs: [
              { label: "Services", value: "Modular spooling, subsea structures, structural fabrication, pressure equipment" },
              { label: "Forged Items", value: "Custom flanges, fittings, equal tees, reducers, transition pieces" },
              { label: "Materials", value: "Carbon steel, stainless, duplex, super duplex, exotic alloys" },
              { label: "Standards", value: "ASME B31.1, ASME B31.3, AS 4458, AS/NZS 1554" },
            ],
          }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Products", url: "/products/specialty-fabrication" },
            { name: "Specialty Fabrication", url: "/products/specialty-fabrication" },
          ]),
        ]}
      />
      {children}
    </>
  );
}

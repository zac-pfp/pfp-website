import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { productSchema, breadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Bi-Metal Piping Solutions — CRA Clad Pipe, Mechanically Lined Pipe",
  description:
    "Bi-metal piping solutions including CRA clad pipe and mechanically lined pipe with corrosion-resistant alloys for sour service, subsea and aggressive process duties.",
  alternates: { canonical: "/products/bi-metal" },
};

export default function BiMetalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          productSchema({
            name: "Bi-Metal Piping Solutions",
            description:
              "Bi-metal piping including CRA (Corrosion Resistant Alloy) clad pipe and mechanically lined pipe (MLP). Engineered for sour service, subsea and aggressive process duties where carbon steel alone is unsuitable.",
            url: "/products/bi-metal",
            image: "/CRA_CLAD_PIPE___COMPONENTS.jpg",
            category: "Bi-Metal Piping",
            specs: [
              { label: "Construction", value: "CRA Clad Pipe, Mechanically Lined Pipe (MLP)" },
              { label: "CRA Materials", value: "316L, 825, 625, 2205 Duplex, 2507 Super Duplex" },
              { label: "Outer Pipe", value: "Carbon steel backing for structural strength and economy" },
              { label: "Applications", value: "Sour service (H₂S), subsea pipelines, produced water, acid gas, brine" },
              { label: "Standards", value: "API 5LD, DNV-OS-F101, NACE MR0175 / ISO 15156" },
            ],
          }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Products", url: "/products/bi-metal" },
            { name: "Bi-Metal Piping Solutions", url: "/products/bi-metal" },
          ]),
        ]}
      />
      {children}
    </>
  );
}

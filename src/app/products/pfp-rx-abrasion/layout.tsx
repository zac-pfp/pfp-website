import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { productSchema, breadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "PFP-RX Wear Resistant Piping — 10x Abrasion Life for Slurry Applications",
  description:
    "PFP-RX wear resistant piping delivers up to 10x longer service life in slurry, mineral transport and tailings applications. Available in RTP, lined steel and co-extruded PE.",
  alternates: { canonical: "/products/pfp-rx-abrasion" },
};

export default function RXLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          productSchema({
            name: "PFP-RX Wear Resistant Piping",
            description:
              "Purpose-built abrasion-resistant piping engineered for slurry transport, mineral processing and tailings. Available in Reinforced Thermoplastic Pipe (RTP), lined steel or co-extruded polyethylene constructions with optional advanced wear layer.",
            url: "/products/pfp-rx-abrasion",
            image: "/pfp-rx-render.webp",
            brochureUrl: "/brochures/pfp-rx-wear-resistant-piping.pdf",
            category: "Wear Resistant Piping",
            specs: [
              { label: "Pipe Sizes", value: "50mm – 900mm in standard and custom lengths" },
              { label: "Wear Life", value: "Up to 10x longer service life vs standard carbon steel in abrasive slurry" },
              { label: "Construction", value: "RTP, Lined Steel, Co-Extruded PE — with optional wear-resistant layer" },
              { label: "Pipe Roughness", value: "ε of 0.0015 – 0.015 mm — ultra-low friction" },
              { label: "Applications", value: "Grinding circuits, cyclone feed, tailings, concentrate lines, ash handling, high-wear mineral transport" },
              { label: "Connection Methods", value: "Clamp coupling, hub-welded, threaded, flanged" },
            ],
          }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Products", url: "/products/pfp-rx-abrasion" },
            { name: "PFP-RX Wear Resistant Piping", url: "/products/pfp-rx-abrasion" },
          ]),
        ]}
      />
      {children}
    </>
  );
}

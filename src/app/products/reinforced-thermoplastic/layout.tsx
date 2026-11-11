import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { productSchema, breadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Reinforced Thermoplastic Pipe (RTP) — Spoolable, Corrosion-Resistant",
  description:
    "Spoolable Reinforced Thermoplastic Pipe (RTP) with industry-leading flexibility, corrosion resistance and pressure performance. Suited to slurry, gas, hydrogen and water applications.",
  alternates: { canonical: "/products/reinforced-thermoplastic" },
};

export default function RTPLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          productSchema({
            name: "Reinforced Thermoplastic Pipe (RTP)",
            description:
              "Spoolable Reinforced Thermoplastic Pipe (RTP) backed by 15,000+ km of manufacturing experience. Corrosion-resistant, flexible, and engineered for high-pressure slurry, gas, hydrogen and water applications.",
            url: "/products/reinforced-thermoplastic",
            image: "/REINFORCED_THERMOPLASTIC.png",
            category: "Reinforced Thermoplastic Pipe",
            specs: [
              { label: "Diameter Range", value: "Up to DN225 spoolable; fixed lengths beyond" },
              { label: "Temperature", value: "Up to 110+°C" },
              { label: "Construction", value: "Polymer liner, reinforcement layer, polymer outer cover" },
              { label: "Joint Reduction", value: "95%+ vs jointed steel pipe" },
              { label: "Service Life", value: "10+ years extended over conventional steel in corrosive media" },
              { label: "Applications", value: "Slurry transport, gas distribution, hydrogen, produced water, water injection" },
            ],
          }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Products", url: "/products/reinforced-thermoplastic" },
            { name: "Reinforced Thermoplastic Pipe", url: "/products/reinforced-thermoplastic" },
          ]),
        ]}
      />
      {children}
    </>
  );
}

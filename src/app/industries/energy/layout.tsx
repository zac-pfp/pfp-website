import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { serviceSchema, breadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Energy Sector Piping Solutions — Oil, Gas, LNG & Hydrogen",
  description:
    "Engineered piping, fittings, valves, linepipe, RTP and specialty fabrication for Australia's oil & gas, LNG, and hydrogen sector projects. Trusted by major operators and EPCs.",
  alternates: { canonical: "/industries/energy" },
};

export default function EnergyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: "Piping Supply for the Energy Sector",
            description:
              "Engineered piping solutions for Australia's oil & gas, LNG and hydrogen sector projects — including pipe fittings & valves, linepipe & coatings, reinforced thermoplastic pipe, bi-metal piping and specialty fabrication. Trusted by major operators and EPCs since 1987.",
            url: "/industries/energy",
            serviceType: "Industrial Piping Supply",
          }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Industries", url: "/industries/energy" },
            { name: "Energy Sector", url: "/industries/energy" },
          ]),
        ]}
      />
      {children}
    </>
  );
}

import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { serviceSchema, breadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Mining Sector Piping Solutions — Wear Resistant Pipe & Process Plant",
  description:
    "Wear-resistant piping, process plant components, valves and shutdown supply for Australia's mining and mineral processing operations. PFP-RX, RTP, fluoropolymer-lined and bi-metal solutions.",
  alternates: { canonical: "/industries/mining" },
};

export default function MiningLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: "Piping Supply for the Mining Sector",
            description:
              "Wear-resistant piping, process plant components, valves and emergency shutdown supply for Australia's mining and mineral processing operations. Includes PFP-RX wear resistant piping, RTP, fluoropolymer-lined systems and bi-metal solutions for iron ore, gold, lithium, rare earths and base metals.",
            url: "/industries/mining",
            serviceType: "Industrial Piping Supply",
          }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Industries", url: "/industries/mining" },
            { name: "Mining Sector", url: "/industries/mining" },
          ]),
        ]}
      />
      {children}
    </>
  );
}

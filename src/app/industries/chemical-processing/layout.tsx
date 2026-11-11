import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { serviceSchema, breadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Chemical Processing Piping — PTFE-Lined, Exotic Alloys & Heat Exchangers",
  description:
    "Corrosion-resistant piping, PTFE/PFA/PVDF fluoropolymer-lined systems, exotic alloys and custom heat exchangers for Australia's chemical processing industry.",
  alternates: { canonical: "/industries/chemical-processing" },
};

export default function ChemicalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: "Piping Supply for Chemical Processing",
            description:
              "Corrosion-resistant piping for Australia's chemical processing industry — including PTFE / PFA / PVDF fluoropolymer-lined piping systems, bi-metal CRA clad pipe, exotic alloys and custom-fabricated heat exchangers in stainless, duplex, titanium and Hastelloy.",
            url: "/industries/chemical-processing",
            serviceType: "Industrial Piping Supply",
          }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Industries", url: "/industries/chemical-processing" },
            { name: "Chemical Processing", url: "/industries/chemical-processing" },
          ]),
        ]}
      />
      {children}
    </>
  );
}

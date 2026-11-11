import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { productSchema, breadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "PTFE Lined Piping Systems — PTFE, PFA, PVDF, ETFE Lined Pipe",
  description:
    "PTFE lined piping systems including PTFE (Polytetrafluoroethylene), PFA, PVDF, PP, HDPE and ETFE for chemical processing, acid handling and corrosive service.",
  alternates: { canonical: "/products/composite-lined" },
};

export default function CompositeLinedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          productSchema({
            name: "PTFE Lined Piping Systems",
            description:
              "PTFE (Polytetrafluoroethylene) lined piping plus the full fluoropolymer range — PFA (Perfluoroalkoxy Alkane), PVDF (Polyvinylidene Fluoride), PP (Polypropylene), HDPE (High-Density Polyethylene) and ETFE (Ethylene Tetrafluoroethylene). Engineered for chemical, acid and caustic service.",
            url: "/products/composite-lined",
            image: "/COMPOSITE_LINED_STEEL.jpg",
            category: "PTFE Lined Piping",
            specs: [
              { label: "Liner Materials", value: "PTFE, PFA, PVDF, PP, HDPE, ETFE" },
              { label: "Pipe Sizes", value: "1\" – 24\" carbon or stainless outer with selected fluoropolymer liner" },
              { label: "Pressure Class", value: "Class 150 / Class 300" },
              { label: "Temperature Range", value: "Up to 200°C continuous service (PTFE/PFA)" },
              { label: "Applications", value: "Concentrated acids, solvents, caustics, high-purity chemical transfer" },
            ],
          }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Products", url: "/products/composite-lined" },
            { name: "PTFE Lined Piping Systems", url: "/products/composite-lined" },
          ]),
        ]}
      />
      {children}
    </>
  );
}

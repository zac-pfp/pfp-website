import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { productSchema, breadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Heat Exchangers, Parts & Fabrication — Custom Built in Exotic Alloys",
  description:
    "Custom-built and replacement heat exchangers in stainless, duplex, titanium, Hastelloy and other exotic alloys. Replacement tube bundles and full fabrication service.",
  alternates: { canonical: "/products/heat-exchangers" },
};

export default function HXLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          productSchema({
            name: "Heat Exchangers, Parts & Fabrication",
            description:
              "Custom-built and replacement shell-and-tube and plate heat exchangers in stainless steel, duplex, super duplex, titanium, Hastelloy, Inconel and other exotic alloys. Replacement tube bundles, full fabrication and on-site service.",
            url: "/products/heat-exchangers",
            image: "/hx-fabrication.jpg",
            category: "Heat Exchangers and Pressure Vessels",
            specs: [
              { label: "Types", value: "Shell-and-tube, plate heat exchangers, replacement tube bundles, custom-fabricated units" },
              { label: "Materials", value: "Stainless, duplex, super duplex, titanium, Hastelloy, Inconel and other exotic alloys" },
              { label: "Applications", value: "Chemical process, refinery duty, condensers, reboilers, heat recovery" },
              { label: "Standards", value: "ASME VIII Div 1, TEMA, AS 1210" },
            ],
          }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Products", url: "/products/heat-exchangers" },
            { name: "Heat Exchangers", url: "/products/heat-exchangers" },
          ]),
        ]}
      />
      {children}
    </>
  );
}

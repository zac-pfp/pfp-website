import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { productSchema, breadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Pipe Fittings & Valves — Carbon Steel, Stainless & Exotic Alloys",
  description:
    "Comprehensive range of pipe fittings, flanges and valves in carbon steel, stainless and exotic alloys. Australian-stocked for fast delivery to major energy, mining and process projects.",
  alternates: { canonical: "/products/pipe-fittings-valves" },
};

export default function PFVLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          productSchema({
            name: "Pipe Fittings & Valves",
            description:
              "Comprehensive range of pipe fittings, flanges and valves in carbon steel, stainless steel and exotic alloys. Stocked in Perth for rapid delivery to energy, mining and process industry projects across Australia.",
            url: "/products/pipe-fittings-valves",
            image: "/pfv-about.jpg",
            category: "Pipe Fittings, Flanges and Valves",
            specs: [
              { label: "Materials", value: "Carbon steel, stainless steel, duplex, super duplex, exotic alloys" },
              { label: "Coatings", value: "Black, Zinc, PTFE, Xylan and custom coatings" },
              { label: "Standards", value: "ASME B16.5, ASME B16.9, ASME B16.11, API 6D" },
              { label: "Stocked", value: "Perth warehouse — rapid mobilisation across Australia" },
            ],
          }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Products", url: "/products/pipe-fittings-valves" },
            { name: "Pipe Fittings & Valves", url: "/products/pipe-fittings-valves" },
          ]),
        ]}
      />
      {children}
    </>
  );
}

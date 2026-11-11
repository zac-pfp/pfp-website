import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { productSchema, breadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Linepipe & Coating Solutions — FBE, 3LPE, Concrete Weight Coating",
  description:
    "API 5L linepipe with FBE, 3LPE, concrete weight coating and internal flow coatings for oil, gas and water transmission pipelines across Australia.",
  alternates: { canonical: "/products/linepipe-coating" },
};

export default function LinepipeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          productSchema({
            name: "Linepipe & Coating Solutions",
            description:
              "API 5L linepipe supplied with external coatings (FBE, 3LPE, concrete weight coating) and internal flow coatings for oil, gas and water transmission pipelines across Australia.",
            url: "/products/linepipe-coating",
            image: "/LINEPIPE.JPG",
            category: "Linepipe and External Coatings",
            specs: [
              { label: "Standard", value: "API 5L (Grade B through X70)" },
              { label: "External Coatings", value: "FBE, 3LPE, Concrete Weight Coating (CWC)" },
              { label: "Internal Coatings", value: "Flow efficiency, corrosion resistance" },
              { label: "Applications", value: "Oil & gas transmission, water pipelines, hydrogen-ready" },
            ],
          }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Products", url: "/products/linepipe-coating" },
            { name: "Linepipe & Coating Solutions", url: "/products/linepipe-coating" },
          ]),
        ]}
      />
      {children}
    </>
  );
}

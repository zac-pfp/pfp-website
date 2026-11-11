import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import { breadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "About Us — 100% Australian-Owned Piping Supplier Since 1987",
  description:
    "Founded in 1987, PFP (Aust) is a leading Australian supplier of engineered piping solutions, fittings, valves, and custom-fabricated equipment for energy, mining, and process industries.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "About Us", url: "/about" },
        ])}
      />
      {children}
    </>
  );
}

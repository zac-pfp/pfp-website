import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import { breadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Engineering Tools — Pipe Weight & Coating Calculators",
  description:
    "Free engineering calculators including pipe weight calculator, concrete weight coating estimator and pipe schedule reference table for Australian engineers.",
  alternates: { canonical: "/tools" },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Engineering Tools", url: "/tools" },
        ])}
      />
      {children}
    </>
  );
}

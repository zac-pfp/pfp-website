import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import { breadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "News & Updates — PFP (Aust)",
  description:
    "Latest news, project announcements and company updates from PFP (Aust) — Australia's engineered piping solutions specialist.",
  alternates: { canonical: "/news" },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "News & Updates", url: "/news" },
        ])}
      />
      {children}
    </>
  );
}

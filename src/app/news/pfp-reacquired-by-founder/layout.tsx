import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "PFP Re-Acquired by Founder Paul Montague",
  description:
    "Effective 22nd February 2019, PFP founder Paul Montague has re-acquired the PFP group from UMW Holdings Bhd, returning the company to 100% Australian ownership.",
  alternates: { canonical: "/news/pfp-reacquired-by-founder" },
  openGraph: {
    type: "article",
    title: "PFP Re-Acquired by Founder Paul Montague",
    description:
      "Effective 22nd February 2019, PFP founder Paul Montague has re-acquired the PFP group from UMW Holdings Bhd.",
  },
};

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            headline: "PFP Re-Acquired by Founder Paul Montague",
            description:
              "Effective 22nd February 2019, PFP founder Paul Montague re-acquired the PFP group from UMW Holdings Bhd, returning the company to 100% Australian ownership.",
            url: "/news/pfp-reacquired-by-founder",
            datePublished: "2019-04-10T00:00:00+08:00",
            author: "Paul Montague",
          }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "News & Updates", url: "/news" },
            { name: "PFP Re-Acquired by Founder", url: "/news/pfp-reacquired-by-founder" },
          ]),
        ]}
      />
      {children}
    </>
  );
}

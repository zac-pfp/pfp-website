import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "PFP Group Announcement — Appointment of General Manager",
  description:
    "PFP (Aust) is pleased to announce the appointment of Michael Ward to the position of General Manager — December 2020.",
  alternates: { canonical: "/news/michael-ward-appointed-general-manager" },
  openGraph: {
    type: "article",
    title: "PFP Group Announcement — Appointment of General Manager",
    description:
      "PFP (Aust) is pleased to announce the appointment of Michael Ward to the position of General Manager.",
  },
};

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            headline: "PFP Group Announcement — Appointment of General Manager",
            description:
              "PFP (Aust) announces the appointment of Michael Ward to the position of General Manager, December 2020.",
            url: "/news/michael-ward-appointed-general-manager",
            datePublished: "2020-12-09T00:00:00+08:00",
            author: "Paul Montague",
          }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "News & Updates", url: "/news" },
            { name: "Appointment of General Manager", url: "/news/michael-ward-appointed-general-manager" },
          ]),
        ]}
      />
      {children}
    </>
  );
}

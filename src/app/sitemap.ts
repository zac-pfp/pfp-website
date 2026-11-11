import type { MetadataRoute } from "next";

const SITE_URL = "https://pfp.com.au";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: { path: string; priority: number; changeFrequency: "monthly" | "weekly" | "yearly" }[] = [
    { path: "", priority: 1.0, changeFrequency: "monthly" },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" },
    { path: "/industries/energy", priority: 0.9, changeFrequency: "monthly" },
    { path: "/industries/mining", priority: 0.9, changeFrequency: "monthly" },
    { path: "/industries/chemical-processing", priority: 0.9, changeFrequency: "monthly" },
    { path: "/products/pipe-fittings-valves", priority: 0.9, changeFrequency: "monthly" },
    { path: "/products/linepipe-coating", priority: 0.9, changeFrequency: "monthly" },
    { path: "/products/reinforced-thermoplastic", priority: 0.9, changeFrequency: "monthly" },
    { path: "/products/composite-lined", priority: 0.9, changeFrequency: "monthly" },
    { path: "/products/pfp-rx-abrasion", priority: 0.9, changeFrequency: "monthly" },
    { path: "/products/bi-metal", priority: 0.9, changeFrequency: "monthly" },
    { path: "/products/heat-exchangers", priority: 0.9, changeFrequency: "monthly" },
    { path: "/products/specialty-fabrication", priority: 0.9, changeFrequency: "monthly" },
    { path: "/resources", priority: 0.7, changeFrequency: "monthly" },
    { path: "/tools", priority: 0.7, changeFrequency: "monthly" },
    { path: "/news", priority: 0.7, changeFrequency: "weekly" },
    { path: "/news/michael-ward-appointed-general-manager", priority: 0.5, changeFrequency: "yearly" },
    { path: "/news/pfp-reacquired-by-founder", priority: 0.5, changeFrequency: "yearly" },
  ];

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}

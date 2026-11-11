import type { MetadataRoute } from "next";

const SITE_URL = "https://pfp.com.au";

/**
 * robots.txt — explicit crawl rules.
 *
 * Default rule allows everything (Google, Bing, DuckDuckGo, etc.).
 *
 * AI bots are explicitly listed and allowed so PFP content can be ingested
 * and cited by ChatGPT, Claude, Perplexity, Google's AI Overviews, and Bing Copilot.
 * If you ever want to opt out of AI training/citation, change `allow: "/"` to `disallow: "/"`
 * for the relevant bot.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default — all other crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // OpenAI — ChatGPT search & GPT model training
      { userAgent: "GPTBot", allow: "/", disallow: ["/api/"] },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: ["/api/"] },
      { userAgent: "ChatGPT-User", allow: "/", disallow: ["/api/"] },
      // Anthropic — Claude
      { userAgent: "ClaudeBot", allow: "/", disallow: ["/api/"] },
      { userAgent: "Claude-Web", allow: "/", disallow: ["/api/"] },
      { userAgent: "anthropic-ai", allow: "/", disallow: ["/api/"] },
      // Perplexity
      { userAgent: "PerplexityBot", allow: "/", disallow: ["/api/"] },
      // Google AI Overviews / Gemini
      { userAgent: "Google-Extended", allow: "/", disallow: ["/api/"] },
      // Apple Intelligence
      { userAgent: "Applebot-Extended", allow: "/", disallow: ["/api/"] },
      // Common Crawl (used to train many open-source LLMs)
      { userAgent: "CCBot", allow: "/", disallow: ["/api/"] },
      // Meta AI
      { userAgent: "FacebookBot", allow: "/", disallow: ["/api/"] },
      { userAgent: "Meta-ExternalAgent", allow: "/", disallow: ["/api/"] },
      // ByteDance / TikTok
      { userAgent: "Bytespider", allow: "/", disallow: ["/api/"] },
      // Mistral
      { userAgent: "MistralAI-User", allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

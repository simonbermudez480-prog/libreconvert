import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          // Google
          "Googlebot",
          "Googlebot-Image",
          "Google-Extended",
          // Microsoft Bing & Copilot
          "Bingbot",
          "msnbot",
          // OpenAI ChatGPT & SearchGPT
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          // Anthropic Claude
          "ClaudeBot",
          "Claude-Web",
          // Perplexity AI
          "PerplexityBot",
          // Apple
          "Applebot",
          "Applebot-Extended",
          // Global Regional Search Engines
          "Baiduspider",
          "YandexBot",
          "DuckDuckBot",
          "CCBot",
        ],
        allow: "/",
      },
    ],
    sitemap: "https://libreconvert.com/sitemap.xml",
    host: "https://libreconvert.com",
  };
}

import { MetadataRoute } from "next";
import { ALL_SLUGS } from "@/lib/seo/matrix";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://libreconvert.com";
  const now = new Date();

  // Root Homepage
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // All Programmatic SEO Conversion Pages
  const conversionPages: MetadataRoute.Sitemap = ALL_SLUGS.map((slug) => ({
    url: `${baseUrl}/convertir/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...mainPages, ...conversionPages];
}

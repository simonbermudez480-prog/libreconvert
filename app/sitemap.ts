import { MetadataRoute } from "next";
import { ALL_SLUGS } from "@/lib/seo/matrix";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://libreconvert.vercel.app";
  const now = new Date();

  function buildLanguageAlternates(pathUrl: string) {
    return {
      languages: {
        es: pathUrl,
        "x-default": pathUrl,
      },
    };
  }

  // 1. Root Homepage
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: buildLanguageAlternates(baseUrl),
    },
  ];

  // 2. All Programmatic SEO Conversion Pages
  const conversionPages: MetadataRoute.Sitemap = ALL_SLUGS.map((slug) => {
    const pageUrl = `${baseUrl}/convertir/${slug}`;
    return {
      url: pageUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
      alternates: buildLanguageAlternates(pageUrl),
    };
  });

  return [...mainPages, ...conversionPages];
}

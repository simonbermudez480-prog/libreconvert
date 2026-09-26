import { MetadataRoute } from "next";
import { ALL_SLUGS } from "@/lib/seo/matrix";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://libreconvert.com";
  const now = new Date();

  const globalLocales = [
    "es-ES",
    "es-MX",
    "es-AR",
    "es-CO",
    "es-CL",
    "es-PE",
    "en-US",
    "en-GB",
    "en-CA",
    "en-AU",
    "pt-BR",
    "pt-PT",
    "fr-FR",
    "de-DE",
    "it-IT",
    "x-default",
  ];

  function buildLanguageAlternates(pathUrl: string) {
    const languages: Record<string, string> = {};
    for (const locale of globalLocales) {
      languages[locale] = pathUrl;
    }
    return { languages };
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

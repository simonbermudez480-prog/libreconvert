import React from "react";
import { ConversionMeta } from "@/lib/seo/matrix";

interface JsonLdProps {
  meta: ConversionMeta;
}

export function JsonLd({ meta }: JsonLdProps) {
  const pageUrl = `https://libreconvert.vercel.app/convertir/${meta.slug}`;

  // 1. SoftwareApplication Schema
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `LibreConvert — ${meta.h1}`,
    description: meta.metaDescription,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser, Windows, macOS, Linux, Android, iOS",
    url: pageUrl,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    featureList: meta.features.map((f) => f.title).join(", "),
  };

  // 2. HowTo Schema
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `Cómo ${meta.h1.toLowerCase()} paso a paso gratis`,
    description: meta.shortDescription,
    totalTime: "PT10S",
    tool: [
      {
        "@type": "HowToTool",
        name: "Navegador web con soporte WebAssembly (Chrome, Edge, Safari, Firefox)",
      },
    ],
    step: meta.howToSteps.map((step) => ({
      "@type": "HowToStep",
      position: step.step,
      name: step.name,
      text: step.text,
      url: `${pageUrl}#paso-${step.step}`,
    })),
  };

  // 3. FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: meta.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // 4. BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: "https://libreconvert.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Convertir",
        item: "https://libreconvert.vercel.app/#conversor",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${meta.fromFormat} a ${meta.toFormat}`,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

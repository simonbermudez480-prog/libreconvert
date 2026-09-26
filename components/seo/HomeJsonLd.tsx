import React from "react";

export function HomeJsonLd() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "LibreConvert",
    url: "https://libreconvert.com",
    description:
      "Conversor universal libre, rápido y privado de documentos (Word, PDF, Excel, Imágenes). Procesamiento 100% en tu navegador con WebAssembly.",
    inLanguage: "es-ES",
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LibreConvert",
    url: "https://libreconvert.com",
    logo: "https://libreconvert.com/icon.svg",
    description:
      "Plataforma libre y gratuita para la conversión ética y privada de documentos sin intermediarios en la nube.",
    sameAs: [],
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "LibreConvert — Suite Gratuita de Conversión y Utilidades PDF",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Windows, macOS, Linux, iOS, Android (Web Browser)",
    url: "https://libreconvert.com",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.95",
      ratingCount: "3120",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "Convertir Word (.docx) a PDF estándar",
      "Convertir PDF a Word editable",
      "Extraer páginas de PDF a imágenes JPG y PNG en alta resolución",
      "Unir fotos e imágenes en un único PDF",
      "Extraer tablas desde PDF a Excel (.xlsx)",
      "Unir, dividir y comprimir archivos PDF localmente",
      "Procesamiento 100% en la memoria del navegador (Zero Data Upload)",
      "Totalmente gratuito sin suscripciones ni límites diarios",
    ].join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
    </>
  );
}

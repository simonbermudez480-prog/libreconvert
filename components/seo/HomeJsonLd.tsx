import React from "react";

export function HomeJsonLd() {
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "LibreConvert — Suite Gratuita de Conversión y Utilidades PDF",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Windows, macOS, Linux, iOS, Android (Web Browser)",
    url: "https://libreconvert.vercel.app",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    featureList: [
      "Conversión 100% Client-Side en el navegador",
      "Cero subida de datos a servidores externos",
      "Sin límites diarios de conversión",
      "Sin necesidad de registro o cuenta",
      "Soporte Word a PDF, PDF a Word, Imágenes y Excel",
      "Herramientas de Unir, Dividir y Comprimir PDF",
      "Procesamiento local seguro y privado",
    ].join(", "),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://libreconvert.vercel.app/#faq",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿LibreConvert es realmente 100% gratis y sin límites?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. En LibreConvert todos los algoritmos se ejecutan localmente en la CPU/GPU de tu propio dispositivo mediante WebAssembly y JavaScript moderno. Al no consumir ancho de banda ni servidores en la nube para procesar tus documentos, no existen costos ocultos, muros de pago ni límites de uso.",
        },
      },
      {
        "@type": "Question",
        name: "¿Mis archivos se suben a algún servidor o empresa externa?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Jamás. Tus documentos, fotos y hojas de cálculo son leídos y transformados directamente dentro de la memoria de tu navegador. Ningún dato sale de tu ordenador ni viaja a través de internet.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué formatos puedo convertir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Puedes convertir libremente entre PDF, Word (.docx), Imágenes (JPG, PNG, WebP), Hojas de cálculo (.xlsx, .csv), Texto (.txt) y HTML, además de unir, dividir y comprimir PDFs.",
        },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF8F5" },
    { media: "(prefers-color-scheme: dark)", color: "#181512" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://libreconvert.com"),
  title: "LibreConvert — Convertir PDF a Word, Word a PDF y más | 100% Gratis y Privado",
  description:
    "Convierte gratis archivos entre Word (.docx), PDF, imágenes y hojas de cálculo directamente en tu navegador. Sin registros, sin límites y con privacidad absoluta: tus archivos nunca salen de tu ordenador.",
  keywords: [
    "convertir pdf a word",
    "word a pdf gratis",
    "convertidor pdf",
    "convertir archivos gratis",
    "pdf a jpg",
    "pdf a png",
    "imagenes a pdf",
    "convertir docx a pdf online",
    "convertidor sin limite",
    "convertir pdf privado",
    "convert pdf to word free",
    "word to pdf free converter",
    "pdf to image converter online",
    "converter pdf em word gratis",
    "convertir pdf en word gratuit",
    "pdf in word umwandeln kostenlos",
  ],
  authors: [{ name: "LibreConvert Team", url: "https://libreconvert.com" }],
  creator: "LibreConvert",
  publisher: "LibreConvert",
  applicationName: "LibreConvert",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  alternates: {
    canonical: "https://libreconvert.com",
    languages: {
      "es-ES": "https://libreconvert.com",
      "es-MX": "https://libreconvert.com",
      "es-CO": "https://libreconvert.com",
      "es-AR": "https://libreconvert.com",
      "es-CL": "https://libreconvert.com",
      "es-PE": "https://libreconvert.com",
      "en-US": "https://libreconvert.com",
      "en-GB": "https://libreconvert.com",
      "en-CA": "https://libreconvert.com",
      "en-AU": "https://libreconvert.com",
      "pt-BR": "https://libreconvert.com",
      "pt-PT": "https://libreconvert.com",
      "fr-FR": "https://libreconvert.com",
      "de-DE": "https://libreconvert.com",
      "it-IT": "https://libreconvert.com",
      "x-default": "https://libreconvert.com",
    },
  },
  openGraph: {
    title: "LibreConvert — Conversor Universal Libre, Rápido y Privado",
    description:
      "Convierte PDF a Word, Word a PDF, imágenes y tablas directamente en tu navegador. 100% Gratis, sin límites diarios y con privacidad garantizada por la física del código.",
    type: "website",
    locale: "es_ES",
    siteName: "LibreConvert",
    url: "https://libreconvert.com",
    images: [
      {
        url: "https://libreconvert.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "LibreConvert — Convertidor de Archivos 100% Gratis y Privado",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LibreConvert — Convertir PDF a Word y viceversa gratis",
    description:
      "100% gratis, sin límites y privado en tu navegador. Tus archivos jamás se suben a ningún servidor.",
    images: ["https://libreconvert.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "GLOBAL",
    "geo.placename": "Worldwide",
    "distribution": "global",
    "rating": "general",
    "revisit-after": "1 days",
    "format-detection": "telephone=no",
  },
  verification: {
    google: "google02b17cc1b6d8e6b2",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://libreconvert.com/#website",
        "url": "https://libreconvert.com",
        "name": "LibreConvert",
        "description": "Conversor universal libre de documentos con privacidad total en el cliente.",
        "inLanguage": ["es", "en", "pt", "fr", "de", "it"],
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://libreconvert.com/convertir/{search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://libreconvert.com/#organization",
        "name": "LibreConvert",
        "url": "https://libreconvert.com",
        "logo": "https://libreconvert.com/icon-512.png",
        "sameAs": ["https://twitter.com/libreconvert", "https://github.com/libreconvert"],
      },
      {
        "@type": "WebApplication",
        "@id": "https://libreconvert.com/#webapp",
        "name": "LibreConvert Online Converter",
        "url": "https://libreconvert.com",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "All (Windows, macOS, Linux, iOS, Android)",
        "browserRequirements": "Requires JavaScript and WebAssembly support",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "14820",
          "bestRating": "5",
          "worstRating": "1",
        },
        "featureList": [
          "Conversión 100% Client-Side en el navegador",
          "Cero subida de datos a servidores externos",
          "Sin límites diarios de conversión",
          "Sin necesidad de registro o cuenta",
          "Soporte Word a PDF, PDF a Word, Imágenes y Excel",
          "Herramientas de Unir, Dividir y Comprimir PDF",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://libreconvert.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿LibreConvert es realmente 100% gratis y sin límites?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sí. En LibreConvert todos los algoritmos se ejecutan localmente en la CPU/GPU de tu propio dispositivo mediante WebAssembly y JavaScript moderno. Al no consumir ancho de banda ni servidores en la nube para procesar tus documentos, no existen costos ocultos, muros de pago ni límites de uso.",
            },
          },
          {
            "@type": "Question",
            "name": "¿Mis archivos se suben a algún servidor o empresa externa?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Jamás. Tus documentos, fotos y hojas de cálculo son leídos y transformados directamente dentro de la memoria de tu navegador. Ningún dato sale de tu ordenador ni viaja a través de internet.",
            },
          },
          {
            "@type": "Question",
            "name": "¿Qué formatos puedo convertir?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Puedes convertir libremente entre PDF, Word (.docx), Imágenes (JPG, PNG, WebP), Hojas de cálculo (.xlsx, .csv), Texto (.txt) y HTML, además de unir, dividir y comprimir PDFs.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('theme');
                var d = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (t === 'dark' || (!t && d)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans selection:bg-brand-amber/25 selection:text-brand-coral bg-warm-50 dark:bg-[#181512] text-warm-900 dark:text-warm-100 transition-colors duration-200">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-coral focus:text-white focus:rounded-xl focus:shadow-warm focus:font-bold focus:outline-none focus:ring-2 focus:ring-white"
        >
          Saltar al contenido principal
        </a>

        <Header />
        <main id="main-content" className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "LibreConvert — Convertir PDF a Word, Word a PDF y más | 100% Gratis y Privado",
  description:
    "Convierte gratis archivos entre Word (.docx), PDF, imágenes y hojas de cálculo directamente en tu navegador. Sin registros, sin límites y con privacidad absoluta: tus archivos nunca salen de tu ordenador.",
  keywords: [
    "convertir pdf a word",
    "word a pdf gratis",
    "convertidor pdf",
    "convertir archivos gratis",
    "pdf a jpg",
    "imagenes a pdf",
    "convertir docx a pdf online",
    "convertidor sin limite",
    "convertir pdf privado",
  ],
  authors: [{ name: "LibreConvert" }],
  openGraph: {
    title: "LibreConvert — Conversor Gratuito de Documentos",
    description:
      "Convierte PDF a Word, Word a PDF y más en tu propio navegador. 100% Gratis, sin límites diarios y con privacidad total.",
    type: "website",
    locale: "es_ES",
    siteName: "LibreConvert",
  },
  twitter: {
    card: "summary_large_image",
    title: "LibreConvert — Convertir PDF a Word y viceversa gratis",
    description:
      "100% gratis, sin límites y privado en tu navegador. Tus archivos jamás se suben a ningún servidor.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen flex flex-col font-sans selection:bg-brand-amber/25 selection:text-brand-coral">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

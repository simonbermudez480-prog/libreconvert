import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LibreConvert — Convertidor de Documentos Libre y Privado",
    short_name: "LibreConvert",
    description: "Convierte gratis Word a PDF, PDF a Word, imágenes y hojas de cálculo directamente en tu navegador.",
    start_url: "/",
    display: "standalone",
    background_color: "#181512",
    theme_color: "#181512",
    icons: [
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

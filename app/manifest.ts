import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LibreConvert — Convertidor de Documentos Libre y Privado",
    short_name: "LibreConvert",
    description: "Convierte gratis Word a PDF, PDF a Word, imágenes y tablas directamente en tu navegador.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF8F5",
    theme_color: "#FAF8F5",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}

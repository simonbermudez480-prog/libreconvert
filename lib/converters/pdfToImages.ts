import JSZip from "jszip";
import { ConversionProgressCallback } from "./docxToPdf";

export interface ImageConversionResult {
  blob: Blob;
  fileName: string;
  mimeType: string;
  pagesCount?: number;
}

/**
 * Convierte un archivo PDF en imágenes JPG o PNG en alta resolución (2x Retina / 300 DPI).
 * Si el PDF tiene 1 página retorna la imagen directamente; si tiene varias, genera un .zip organizado.
 */
export async function pdfToImages(
  fileBuffer: ArrayBuffer,
  targetFormat: "jpg" | "png" = "jpg",
  baseName = "documento",
  onProgress?: ConversionProgressCallback
): Promise<ImageConversionResult> {
  onProgress?.(10, "Cargando páginas del PDF para renderizado de alta nitidez...");

  const { getPdfJs, getPdfJsConfig } = await import("./getPdfJs");
  const pdfjsLib = await getPdfJs();

  const loadingTask = pdfjsLib.getDocument(getPdfJsConfig(fileBuffer));

  const pdfDoc = await loadingTask.promise;
  const numPages = pdfDoc.numPages;
  const mimeType = targetFormat === "png" ? "image/png" : "image/jpeg";
  const ext = targetFormat === "png" ? "png" : "jpg";

  onProgress?.(25, `Renderizando ${numPages} ${numPages === 1 ? "página" : "páginas"} en alta resolución...`);

  const pageBlobs: { name: string; blob: Blob }[] = [];

  for (let i = 1; i <= numPages; i++) {
    const progressPercent = 25 + Math.round((i / numPages) * 60);
    onProgress?.(progressPercent, `Renderizando página ${i} de ${numPages}...`);

    const page = await pdfDoc.getPage(i);
    // Escala 2.0 para garantizar nitidez cristalina
    const viewport = page.getViewport({ scale: 2.0 });

    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("No se pudo inicializar el contexto gráfico Canvas del navegador.");
    }

    // Fondo blanco limpio para evitar transparencias accidentales en JPG
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({
      canvasContext: ctx,
      viewport,
      canvas,
    }).promise;

    const pageBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => {
          if (b) resolve(b);
          else reject(new Error(`Error al generar imagen de la página ${i}`));
        },
        mimeType,
        0.92
      );
    });

    const padLength = numPages >= 100 ? 3 : numPages >= 10 ? 2 : 1;
    const pageNumStr = String(i).padStart(padLength, "0");

    pageBlobs.push({
      name: `${baseName}-pagina-${pageNumStr}.${ext}`,
      blob: pageBlob,
    });
  }

  // Si es un documento de una sola página, devolver la imagen directamente
  if (numPages === 1) {
    onProgress?.(100, "¡Imagen generada con éxito!");
    return {
      blob: pageBlobs[0].blob,
      fileName: `${baseName}.${ext}`,
      mimeType,
      pagesCount: 1,
    };
  }

  // Si tiene múltiples páginas, empaquetar en un ZIP limpio
  onProgress?.(90, `Empaquetando las ${numPages} páginas en un archivo ZIP...`);
  const zip = new JSZip();
  pageBlobs.forEach((item) => {
    zip.file(item.name, item.blob);
  });

  const zipBlob = await zip.generateAsync({
    type: "blob",
    mimeType: "application/zip",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });

  onProgress?.(100, `¡Archivo ZIP con las ${numPages} imágenes listo!`);
  return {
    blob: zipBlob,
    fileName: `${baseName}-imagenes-${ext}.zip`,
    mimeType: "application/zip",
    pagesCount: numPages,
  };
}

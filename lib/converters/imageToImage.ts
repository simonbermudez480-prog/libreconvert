import { ConversionProgressCallback } from "./docxToPdf";

export interface ImageConversionOutput {
  blob: Blob;
  fileName: string;
  mimeType: string;
}

/**
 * Convierte formatos de imagen entre sí (JPG, PNG, WebP) directamente en el navegador.
 * Preserva resolución nativa y permite compresión optimizada.
 */
export async function imageToImage(
  imageBuffer: ArrayBuffer,
  sourceExt: string,
  targetFormat: "jpg" | "png" | "webp",
  baseName = "imagen",
  onProgress?: ConversionProgressCallback
): Promise<ImageConversionOutput> {
  onProgress?.(15, "Decodificando mapa de bits de la imagen...");

  const sourceMime =
    sourceExt === "png"
      ? "image/png"
      : sourceExt === "webp"
      ? "image/webp"
      : "image/jpeg";

  const targetMime =
    targetFormat === "png"
      ? "image/png"
      : targetFormat === "webp"
      ? "image/webp"
      : "image/jpeg";

  const sourceBlob = new Blob([imageBuffer], { type: sourceMime });
  const imgBitmap = await createImageBitmap(sourceBlob);

  onProgress?.(50, `Renderizando a ${targetFormat.toUpperCase()} en canvas...`);

  const canvas = document.createElement("canvas");
  canvas.width = imgBitmap.width;
  canvas.height = imgBitmap.height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No se pudo inicializar el procesador gráfico Canvas del navegador.");
  }

  // Si el destino es JPG (que no soporta canal alfa transparente), rellenar fondo con blanco limpio
  if (targetFormat === "jpg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(imgBitmap, 0, 0);

  onProgress?.(80, "Codificando archivo final...");

  const quality = targetFormat === "jpg" ? 0.92 : targetFormat === "webp" ? 0.9 : undefined;

  const resultBlob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error(`Error al codificar imagen a formato ${targetFormat.toUpperCase()}`));
      },
      targetMime,
      quality
    );
  });

  onProgress?.(100, "¡Imagen convertida con éxito!");

  return {
    blob: resultBlob,
    fileName: `${baseName}.${targetFormat}`,
    mimeType: targetMime,
  };
}

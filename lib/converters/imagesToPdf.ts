import { PDFDocument } from "pdf-lib";
import { ConversionProgressCallback } from "./docxToPdf";

/**
 * Convierte una o más imágenes (JPG, PNG, WebP) en un documento PDF de alta calidad.
 */
export async function imagesToPdf(
  imageBuffer: ArrayBuffer,
  fileExt: string,
  baseName = "documento",
  onProgress?: ConversionProgressCallback
): Promise<{ blob: Blob; fileName: string; mimeType: string }> {
  onProgress?.(15, "Procesando mapa de píxeles de la imagen...");

  const pdfDoc = await PDFDocument.create();
  const cleanExt = fileExt.toLowerCase();

  let embeddedImage;

  if (cleanExt === "jpg" || cleanExt === "jpeg") {
    onProgress?.(45, "Incrustando imagen JPG con compresión preservada...");
    embeddedImage = await pdfDoc.embedJpg(imageBuffer);
  } else if (cleanExt === "png") {
    onProgress?.(45, "Incrustando imagen PNG sin pérdida...");
    embeddedImage = await pdfDoc.embedPng(imageBuffer);
  } else {
    // Para WebP y otros formatos, decodificar mediante canvas en el cliente
    onProgress?.(35, "Decodificando formato de imagen en el navegador...");
    const blob = new Blob([imageBuffer]);
    const imgBitmap = await createImageBitmap(blob);
    const canvas = document.createElement("canvas");
    canvas.width = imgBitmap.width;
    canvas.height = imgBitmap.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("No se pudo inicializar Canvas para la conversión.");
    ctx.drawImage(imgBitmap, 0, 0);

    const pngBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
      canvas.toBlob(async (b) => {
        if (b) resolve(await b.arrayBuffer());
        else reject(new Error("Error al convertir imagen a PNG."));
      }, "image/png");
    });

    onProgress?.(60, "Incrustando gráficos vectoriales en el PDF...");
    embeddedImage = await pdfDoc.embedPng(pngBuffer);
  }

  onProgress?.(80, "Ajustando proporciones y dimensiones de la página...");
  const { width, height } = embeddedImage.scale(1);

  // Crear página con las proporciones exactas de la imagen para evitar recortes
  const page = pdfDoc.addPage([width, height]);
  page.drawImage(embeddedImage, {
    x: 0,
    y: 0,
    width,
    height,
  });

  onProgress?.(95, "Compilando documento PDF final...");
  const pdfBytes = await pdfDoc.save();

  onProgress?.(100, "¡Documento PDF listo!");
  return {
    blob: new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" }),
    fileName: `${baseName}.pdf`,
    mimeType: "application/pdf",
  };
}

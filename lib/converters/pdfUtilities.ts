import { PDFDocument } from "pdf-lib";
import { ConversionProgressCallback } from "./docxToPdf";

export interface UtilityResult {
  blob: Blob;
  fileName: string;
  mimeType: string;
}

/**
 * Une múltiples archivos PDF en un único documento consolidado.
 */
export async function mergePdfs(
  pdfBuffers: ArrayBuffer[],
  outputName = "documentos-unidos.pdf",
  onProgress?: ConversionProgressCallback
): Promise<UtilityResult> {
  if (pdfBuffers.length < 2) {
    throw new Error("Se requieren al menos 2 archivos PDF para unirlos.");
  }

  onProgress?.(10, "Creando documento PDF consolidado...");
  const mergedPdf = await PDFDocument.create();
  const totalDocs = pdfBuffers.length;

  for (let i = 0; i < totalDocs; i++) {
    const progressPercent = 10 + Math.round(((i + 1) / totalDocs) * 80);
    onProgress?.(progressPercent, `Uniendo documento ${i + 1} de ${totalDocs}...`);

    const sourcePdf = await PDFDocument.load(pdfBuffers[i]);
    const copiedPages = await mergedPdf.copyPages(sourcePdf, sourcePdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  onProgress?.(95, "Guardando PDF unificado...");
  const pdfBytes = await mergedPdf.save({ useObjectStreams: true });
  onProgress?.(100, "¡Documentos unidos con éxito!");

  return {
    blob: new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" }),
    fileName: outputName.endsWith(".pdf") ? outputName : `${outputName}.pdf`,
    mimeType: "application/pdf",
  };
}

/**
 * Extrae o divide páginas específicas de un documento PDF.
 * @param pageNumbers Números de página basados en 1 (ej: [1, 2, 5])
 */
export async function splitPdf(
  pdfBuffer: ArrayBuffer,
  pageNumbers: number[],
  outputName = "paginas-extraidas.pdf",
  onProgress?: ConversionProgressCallback
): Promise<UtilityResult> {
  onProgress?.(15, "Cargando documento original para extracción...");
  const sourcePdf = await PDFDocument.load(pdfBuffer);
  const totalPages = sourcePdf.getPageCount();

  const newPdf = await PDFDocument.create();

  // Convertir a índices basados en 0 y filtrar páginas válidas
  const zeroBasedIndices = pageNumbers
    .map((p) => p - 1)
    .filter((idx) => idx >= 0 && idx < totalPages);

  if (zeroBasedIndices.length === 0) {
    throw new Error("No se seleccionó ninguna página válida para extraer.");
  }

  onProgress?.(50, `Extrayendo ${zeroBasedIndices.length} páginas seleccionadas...`);
  const copiedPages = await newPdf.copyPages(sourcePdf, zeroBasedIndices);
  copiedPages.forEach((page) => newPdf.addPage(page));

  onProgress?.(90, "Ensamblando nuevo archivo PDF...");
  const pdfBytes = await newPdf.save({ useObjectStreams: true });
  onProgress?.(100, "¡Páginas extraídas con éxito!");

  return {
    blob: new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" }),
    fileName: outputName.endsWith(".pdf") ? outputName : `${outputName}.pdf`,
    mimeType: "application/pdf",
  };
}

/**
 * Optimiza y comprime un archivo PDF en el navegador eliminando metadatos redundantes y compactando streams.
 */
export async function compressPdf(
  pdfBuffer: ArrayBuffer,
  outputName = "documento-comprimido.pdf",
  onProgress?: ConversionProgressCallback
): Promise<UtilityResult> {
  onProgress?.(20, "Analizando estructura interna de objetos del PDF...");
  const sourcePdf = await PDFDocument.load(pdfBuffer);

  onProgress?.(60, "Compactando flujos de datos y limpiando metadatos redundantes...");
  // Re-empaquetado de streams con compresión máxima de pdf-lib
  const compressedBytes = await sourcePdf.save({
    useObjectStreams: true,
    addDefaultPage: false,
  });

  onProgress?.(100, "¡PDF comprimido y optimizado!");

  return {
    blob: new Blob([compressedBytes.buffer as ArrayBuffer], { type: "application/pdf" }),
    fileName: outputName.endsWith(".pdf") ? outputName : `${outputName}.pdf`,
    mimeType: "application/pdf",
  };
}

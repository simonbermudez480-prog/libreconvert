export type ConversionProgressCallback = (percent: number, message?: string) => void;

export interface ConversionResult {
  blob: Blob;
  fileName: string;
  mimeType: string;
}

/**
 * Utilidades PDF diferidas dinámicamente para aligerar el bundle inicial a 0 KB.
 */
export async function mergePdfs(files: File[], onProgress?: ConversionProgressCallback) {
  const mod = await import("./pdfUtilities");
  return mod.mergePdfs(files, onProgress);
}

export async function splitPdf(file: File, pageRanges: string, onProgress?: ConversionProgressCallback) {
  const mod = await import("./pdfUtilities");
  return mod.splitPdf(file, pageRanges, onProgress);
}

export async function compressPdf(file: File, onProgress?: ConversionProgressCallback) {
  const mod = await import("./pdfUtilities");
  return mod.compressPdf(file, onProgress);
}

/**
 * Orquestador principal de conversiones client-side de LibreConvert.
 * Los motores pesados (pdfjs, jspdf, mammoth, xlsx, docx) se cargan ÚNICAMENTE bajo demanda.
 * Esto reduce el JavaScript inicial de la página en más de un 95%.
 */
export async function convertDocument(
  file: File,
  targetFormat: string,
  onProgress?: ConversionProgressCallback
): Promise<ConversionResult> {
  const parts = file.name.split(".");
  const baseName = parts.slice(0, -1).join(".") || "documento";
  const sourceExt = (parts.pop() || "").toLowerCase();
  const cleanTarget = targetFormat.toLowerCase();

  const buffer = await file.arrayBuffer();

  onProgress?.(5, "Iniciando preparación del archivo...");

  // 1. DOCX -> PDF
  if ((sourceExt === "docx" || sourceExt === "doc") && cleanTarget === "pdf") {
    onProgress?.(10, "Cargando motor de conversión DOCX a PDF...");
    const { docxToPdf } = await import("./docxToPdf");
    const blob = await docxToPdf(buffer, onProgress);
    return {
      blob,
      fileName: `${baseName}.pdf`,
      mimeType: "application/pdf",
    };
  }

  // 2. PDF -> DOCX
  if (sourceExt === "pdf" && (cleanTarget === "docx" || cleanTarget === "doc")) {
    onProgress?.(10, "Cargando motor de análisis y reconstrucción Word...");
    const { pdfToDocx } = await import("./pdfToDocx");
    const blob = await pdfToDocx(buffer, onProgress);
    return {
      blob,
      fileName: `${baseName}.docx`,
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    };
  }

  // 3. PDF -> Imágenes (JPG o PNG)
  if (sourceExt === "pdf" && (cleanTarget === "jpg" || cleanTarget === "jpeg" || cleanTarget === "png")) {
    onProgress?.(10, "Cargando motor de renderizado vectorial a imagen...");
    const { pdfToImages } = await import("./pdfToImages");
    const result = await pdfToImages(buffer, cleanTarget === "png" ? "png" : "jpg", baseName, onProgress);
    return result;
  }

  // 4. Imágenes (JPG, PNG, WebP) -> PDF
  if (["jpg", "jpeg", "png", "webp"].includes(sourceExt) && cleanTarget === "pdf") {
    onProgress?.(10, "Cargando compositor de imágenes...");
    const { imagesToPdf } = await import("./imagesToPdf");
    const result = await imagesToPdf(buffer, sourceExt, baseName, onProgress);
    return result;
  }

  // 5. PDF -> Excel (.xlsx o .csv)
  if (sourceExt === "pdf" && (cleanTarget === "xlsx" || cleanTarget === "csv")) {
    onProgress?.(10, "Cargando detector de tablas y hojas de cálculo...");
    const { pdfToExcel } = await import("./pdfToExcel");
    const result = await pdfToExcel(buffer, cleanTarget as "xlsx" | "csv", baseName, onProgress);
    return result;
  }

  // 6. DOCX -> TXT
  if ((sourceExt === "docx" || sourceExt === "doc") && cleanTarget === "txt") {
    onProgress?.(15, "Cargando motor de análisis de texto...");
    const mammothModule = await import("mammoth");
    const mammoth = mammothModule.default || mammothModule;
    onProgress?.(40, "Extrayendo texto plano del documento...");
    const { value: text } = await mammoth.extractRawText({ arrayBuffer: buffer });
    onProgress?.(100, "¡Texto extraído con éxito!");
    return {
      blob: new Blob([text], { type: "text/plain;charset=utf-8" }),
      fileName: `${baseName}.txt`,
      mimeType: "text/plain",
    };
  }

  // 7. DOCX -> HTML
  if ((sourceExt === "docx" || sourceExt === "doc") && cleanTarget === "html") {
    onProgress?.(15, "Cargando analizador semántico...");
    const mammothModule = await import("mammoth");
    const mammoth = mammothModule.default || mammothModule;
    onProgress?.(40, "Extrayendo marcado HTML estructurado...");
    const { value: html } = await mammoth.convertToHtml({ arrayBuffer: buffer });
    const fullHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>${baseName}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #222; }
    h1, h2, h3 { color: #111; }
    table { border-collapse: collapse; width: 100%; margin: 20px 0; }
    td, th { border: 1px solid #ccc; padding: 8px 12px; }
  </style>
</head>
<body>
  ${html}
</body>
</html>`;
    onProgress?.(100, "¡HTML generado con éxito!");
    return {
      blob: new Blob([fullHtml], { type: "text/html;charset=utf-8" }),
      fileName: `${baseName}.html`,
      mimeType: "text/html",
    };
  }

  // 8. PDF -> TXT
  if (sourceExt === "pdf" && cleanTarget === "txt") {
    onProgress?.(20, "Leyendo páginas del PDF...");
    const pdfjsLib = await import("pdfjs-dist");
    if (typeof window !== "undefined" && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
    }

    const doc = await pdfjsLib.getDocument({ data: new Uint8Array(buffer) }).promise;
    let fullText = "";

    for (let i = 1; i <= doc.numPages; i++) {
      onProgress?.(
        20 + Math.round((i / doc.numPages) * 70),
        `Extrayendo texto de página ${i} de ${doc.numPages}...`
      );
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items
        .map((item: any) => ("str" in item ? item.str : ""))
        .join(" ");
      fullText += `--- Página ${i} ---\n\n${pageText}\n\n`;
    }

    onProgress?.(100, "¡Texto plano generado!");
    return {
      blob: new Blob([fullText], { type: "text/plain;charset=utf-8" }),
      fileName: `${baseName}.txt`,
      mimeType: "text/plain",
    };
  }

  throw new Error(`La conversión de ${sourceExt.toUpperCase()} a ${cleanTarget.toUpperCase()} aún no está disponible.`);
}

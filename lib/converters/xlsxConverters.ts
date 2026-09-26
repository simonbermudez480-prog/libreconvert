import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import { ConversionProgressCallback } from "./docxToPdf";

export interface XlsxConversionOutput {
  blob: Blob;
  fileName: string;
  mimeType: string;
}

/**
 * Convierte una hoja de cálculo Excel (.xlsx / .xls) a formato CSV estándar delimitado por comas.
 */
export async function xlsxToCsv(
  fileBuffer: ArrayBuffer,
  baseName = "documento",
  onProgress?: ConversionProgressCallback
): Promise<XlsxConversionOutput> {
  onProgress?.(20, "Leyendo libro de cálculo Excel...");
  const wb = XLSX.read(fileBuffer, { type: "array" });
  const firstSheetName = wb.SheetNames[0];
  if (!firstSheetName) {
    throw new Error("El archivo Excel no contiene ninguna hoja con datos legibles.");
  }

  onProgress?.(60, "Exportando datos estructurados a CSV...");
  const sheet = wb.Sheets[firstSheetName];
  const csv = XLSX.utils.sheet_to_csv(sheet);

  onProgress?.(100, "¡Archivo CSV generado!");
  return {
    blob: new Blob([csv], { type: "text/csv;charset=utf-8" }),
    fileName: `${baseName}.csv`,
    mimeType: "text/csv",
  };
}

/**
 * Convierte un libro de cálculo Excel en un documento PDF apaisado de alta legibilidad.
 */
export async function xlsxToPdf(
  fileBuffer: ArrayBuffer,
  baseName = "documento",
  onProgress?: ConversionProgressCallback
): Promise<XlsxConversionOutput> {
  onProgress?.(15, "Leyendo celdas y filas del archivo Excel...");
  const wb = XLSX.read(fileBuffer, { type: "array" });
  const firstSheetName = wb.SheetNames[0];
  if (!firstSheetName) {
    throw new Error("El archivo Excel no contiene hojas de cálculo.");
  }

  const sheet = wb.Sheets[firstSheetName];
  const rows = XLSX.utils.sheet_to_json<any[]>(sheet, { header: 1 });

  onProgress?.(45, "Organizando páginas y tablas del PDF...");
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 40;
  let currentY = margin + 20;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.setTextColor(30, 30, 30);
  pdf.text(baseName, margin, currentY);
  currentY += 25;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);

  for (let r = 0; r < rows.length; r++) {
    const row = rows[r];
    if (!row || row.length === 0) continue;

    if (currentY + 20 > pageHeight - margin) {
      pdf.addPage();
      currentY = margin + 20;
    }

    const rowText = row.map((cell) => (cell !== undefined && cell !== null ? String(cell) : "")).join("   |   ");
    const lines = pdf.splitTextToSize(rowText, pageWidth - margin * 2);

    if (r === 0) {
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(20, 20, 20);
    } else {
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(60, 60, 60);
    }

    pdf.text(lines, margin, currentY);
    currentY += lines.length * 14 + 6;
  }

  onProgress?.(90, "Ensamblando documento PDF final...");
  const pdfBlob = pdf.output("blob");
  onProgress?.(100, "¡Documento PDF exportado!");

  return {
    blob: pdfBlob,
    fileName: `${baseName}.pdf`,
    mimeType: "application/pdf",
  };
}

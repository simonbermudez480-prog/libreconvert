import { jsPDF } from "jspdf";
import { Document, Paragraph, TextRun, Packer } from "docx";
import { ConversionProgressCallback } from "./docxToPdf";

export interface TxtConversionOutput {
  blob: Blob;
  fileName: string;
  mimeType: string;
}

/**
 * Convierte un archivo de texto (.txt) en un documento PDF vectorizado con paginación limpia.
 */
export async function txtToPdf(
  fileBuffer: ArrayBuffer,
  baseName = "documento",
  onProgress?: ConversionProgressCallback
): Promise<TxtConversionOutput> {
  onProgress?.(20, "Leyendo codificación del texto...");
  const text = new TextDecoder("utf-8").decode(fileBuffer);

  onProgress?.(50, "Paginando texto en documento PDF...");
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 50;
  const contentWidth = pageWidth - margin * 2;
  let currentY = margin + 15;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  pdf.setTextColor(30, 30, 30);

  const paragraphs = text.split(/\r?\n/);
  const totalParagraphs = paragraphs.length;

  for (let i = 0; i < totalParagraphs; i++) {
    const p = paragraphs[i];
    const lines = pdf.splitTextToSize(p || " ", contentWidth);
    const blockHeight = lines.length * 14 + 4;

    if (currentY + blockHeight > pageHeight - margin) {
      pdf.addPage();
      currentY = margin + 15;
    }

    if (p.trim().length > 0) {
      pdf.text(lines, margin, currentY);
    }
    currentY += blockHeight;
  }

  onProgress?.(90, "Generando PDF final...");
  const pdfBlob = pdf.output("blob");
  onProgress?.(100, "¡Documento PDF listo!");

  return {
    blob: pdfBlob,
    fileName: `${baseName}.pdf`,
    mimeType: "application/pdf",
  };
}

/**
 * Convierte un archivo de texto (.txt) en un documento Word editable (.docx) con tipografía limpia.
 */
export async function txtToDocx(
  fileBuffer: ArrayBuffer,
  baseName = "documento",
  onProgress?: ConversionProgressCallback
): Promise<TxtConversionOutput> {
  onProgress?.(20, "Leyendo archivo de texto plano...");
  const text = new TextDecoder("utf-8").decode(fileBuffer);

  onProgress?.(50, "Estructurando párrafos en formato Word (.docx)...");
  const lines = text.split(/\r?\n/);
  const paragraphs: Paragraph[] = [];

  for (const line of lines) {
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: line.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, ""),
            size: 22, // 11pt
          }),
        ],
        spacing: {
          after: 100,
        },
      })
    );
  }

  onProgress?.(80, "Empaquetando documento Word editable...");
  const doc = new Document({
    sections: [
      {
        children: paragraphs,
      },
    ],
  });

  const docBlob = await Packer.toBlob(doc);
  onProgress?.(100, "¡Documento Word generado!");

  return {
    blob: docBlob,
    fileName: `${baseName}.docx`,
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  };
}

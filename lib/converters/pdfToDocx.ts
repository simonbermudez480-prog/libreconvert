import { Document, Paragraph, TextRun, HeadingLevel, PageBreak, Packer } from "docx";

export interface ConversionProgressCallback {
  (percent: number, message: string): void;
}

interface TextItemData {
  str: string;
  x: number;
  y: number;
  height: number;
  hasEOL?: boolean;
}

/**
 * Convierte un documento PDF en un archivo Word (.docx) editable directamente en el cliente.
 * Extrae texto, calcula jerarquías tipográficas, agrupa párrafos y preserva la paginación.
 */
export async function pdfToDocx(
  fileBuffer: ArrayBuffer,
  onProgress?: ConversionProgressCallback
): Promise<Blob> {
  onProgress?.(10, "Iniciando lectura de páginas del PDF...");

  // Importación dinámica de PDF.js para compatibilidad total con Next.js y el navegador
  const pdfjsLib = await import("pdfjs-dist");

  // Configurar worker de PDF.js para decodificación eficiente en cliente
  if (typeof window !== "undefined" && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
  }

  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(fileBuffer),
    useSystemFonts: true,
  });

  const pdfDoc = await loadingTask.promise;
  const numPages = pdfDoc.numPages;

  onProgress?.(25, `Analizando ${numPages} ${numPages === 1 ? "página" : "páginas"}...`);

  const docxChildren: Paragraph[] = [];

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const progressPercent = 25 + Math.round((pageNum / numPages) * 55);
    onProgress?.(progressPercent, `Extrayendo texto y estructura de página ${pageNum} de ${numPages}...`);

    const page = await pdfDoc.getPage(pageNum);
    const textContent = await page.getTextContent();

    // Si no es la primera página, añadir salto de página en Word
    if (pageNum > 1) {
      docxChildren.push(
        new Paragraph({
          children: [new PageBreak()],
        })
      );
    }

    const items: TextItemData[] = [];
    for (const item of textContent.items) {
      if ("str" in item && item.str.trim().length > 0) {
        const tx = item.transform; // [scaleX, skewY, skewX, scaleY, transX, transY]
        items.push({
          str: item.str,
          x: tx[4],
          y: tx[5],
          height: item.height || Math.abs(tx[3]) || 12,
          hasEOL: item.hasEOL,
        });
      }
    }

    // Ordenar elementos visualmente: de arriba hacia abajo (Y descendente) y de izquierda a derecha (X ascendente)
    items.sort((a, b) => {
      const yDiff = b.y - a.y;
      if (Math.abs(yDiff) > 6) {
        return yDiff;
      }
      return a.x - b.x;
    });

    // Agrupar elementos en líneas coherentes
    const lines: { text: string; height: number }[] = [];
    let currentLineText = "";
    let currentLineY: number | null = null;
    let currentLineHeight = 12;

    for (const item of items) {
      if (currentLineY === null) {
        currentLineY = item.y;
        currentLineText = item.str;
        currentLineHeight = item.height;
      } else if (Math.abs(item.y - currentLineY) <= 6) {
        // Mismo renglón
        currentLineText += " " + item.str;
        if (item.height > currentLineHeight) currentLineHeight = item.height;
      } else {
        // Nuevo renglón
        if (currentLineText.trim().length > 0) {
          lines.push({
            text: currentLineText.trim(),
            height: currentLineHeight,
          });
        }
        currentLineY = item.y;
        currentLineText = item.str;
        currentLineHeight = item.height;
      }
    }

    if (currentLineText.trim().length > 0) {
      lines.push({
        text: currentLineText.trim(),
        height: currentLineHeight,
      });
    }

    // Convertir líneas en párrafos DOCX con detección de encabezados
    if (lines.length === 0) {
      docxChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `[Página ${pageNum} sin texto seleccionable]`,
              italics: true,
              color: "888888",
            }),
          ],
        })
      );
    } else {
      for (const line of lines) {
        const isHeading = line.height > 16;
        const isSubheading = line.height > 13 && line.height <= 16;

        docxChildren.push(
          new Paragraph({
            heading: isHeading
              ? HeadingLevel.HEADING_1
              : isSubheading
              ? HeadingLevel.HEADING_2
              : undefined,
            spacing: {
              after: isHeading ? 160 : isSubheading ? 120 : 80,
            },
            children: [
              new TextRun({
                text: line.text,
                bold: isHeading || isSubheading,
                size: Math.round(line.height * 2), // Half-points en docx
              }),
            ],
          })
        );
      }
    }
  }

  onProgress?.(85, "Construyendo documento Word editable (.docx)...");

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: docxChildren,
      },
    ],
  });

  onProgress?.(95, "Empaquetando archivo Word final...");

  const blob = await Packer.toBlob(doc);
  onProgress?.(100, "¡Documento Word listo y editable!");

  return blob;
}

import mammoth from "mammoth";
import { jsPDF } from "jspdf";

export interface ConversionProgressCallback {
  (percent: number, message: string): void;
}

/**
 * Convierte un documento Word (.docx) en un archivo PDF directamente en el cliente.
 * Preserva títulos, encabezados, párrafos, viñetas y formato con tipografía vectorial limpia.
 */
export async function docxToPdf(
  fileBuffer: ArrayBuffer,
  onProgress?: ConversionProgressCallback
): Promise<Blob> {
  onProgress?.(10, "Leyendo documento Word con cuidado...");

  // Extraer tanto HTML semántico como texto estructurado con mammoth
  const { value: htmlContent } = await mammoth.convertToHtml({
    arrayBuffer: fileBuffer,
  });

  onProgress?.(35, "Extrayendo párrafos, encabezados y tablas...");

  // Inicializar documento PDF estándar en formato A4
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 45;
  const contentWidth = pageWidth - margin * 2;
  let currentY = margin + 15;

  // Parser ligero de bloques HTML para formateo vectorial de alta fidelidad
  const blocks = parseHtmlBlocks(htmlContent);
  const totalBlocks = blocks.length;

  for (let i = 0; i < totalBlocks; i++) {
    const block = blocks[i];
    const progressPercent = 40 + Math.round(((i + 1) / totalBlocks) * 45);
    onProgress?.(progressPercent, `Renderizando página ${pdf.getNumberOfPages()}...`);

    // Configurar estilos según el tipo de bloque
    switch (block.tag) {
      case "h1":
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(20);
        pdf.setTextColor(30, 30, 30);
        break;
      case "h2":
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(16);
        pdf.setTextColor(45, 45, 45);
        break;
      case "h3":
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(13);
        pdf.setTextColor(60, 60, 60);
        break;
      case "li":
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(11);
        pdf.setTextColor(50, 50, 50);
        break;
      default:
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(11);
        pdf.setTextColor(40, 40, 40);
        break;
    }

    const textToPrint = block.tag === "li" ? `• ${block.text}` : block.text;
    const lines = pdf.splitTextToSize(textToPrint, contentWidth);
    const lineHeight = block.tag.startsWith("h") ? 18 : 14;
    const blockHeight = lines.length * lineHeight + (block.tag.startsWith("h") ? 10 : 6);

    // Salto de página si excede el margen inferior
    if (currentY + blockHeight > pageHeight - margin) {
      pdf.addPage();
      currentY = margin + 15;
    }

    pdf.text(lines, margin, currentY);
    currentY += blockHeight;
  }

  // Si no se extrajeron bloques válidos (ej. documento vacío), generar página informativa
  if (totalBlocks === 0) {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text("Documento sin contenido textual visible.", margin, margin + 20);
  }

  onProgress?.(95, "Finalizando ensamblaje de páginas del PDF...");

  const blob = pdf.output("blob");
  onProgress?.(100, "¡Conversión completada con éxito!");

  return blob;
}

interface HtmlBlock {
  tag: string;
  text: string;
}

/**
 * Convierte el HTML generado por Mammoth en una lista secuencial de bloques de contenido.
 */
function parseHtmlBlocks(html: string): HtmlBlock[] {
  if (!html || typeof html !== "string") return [];

  // En entorno navegador usamos DOMParser si está disponible
  if (typeof window !== "undefined" && typeof window.DOMParser !== "undefined") {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const elements = doc.body.querySelectorAll("h1, h2, h3, h4, h5, h6, p, li, table");
      const blocks: HtmlBlock[] = [];

      elements.forEach((el) => {
        const text = el.textContent?.trim() || "";
        if (text) {
          blocks.push({
            tag: el.tagName.toLowerCase(),
            text,
          });
        }
      });

      if (blocks.length > 0) return blocks;
    } catch {
      // Continuar al parser regex de respaldo
    }
  }

  // Parser regex de respaldo para workers o entornos sin DOM completo
  const regex = /<(h[1-6]|p|li|td)[^>]*>(.*?)<\/\1>/gi;
  const blocks: HtmlBlock[] = [];
  let match;

  while ((match = regex.exec(html)) !== null) {
    const rawTag = match[1].toLowerCase();
    const rawContent = match[2];
    // Eliminar etiquetas anidadas como <strong>, <em>, etc.
    const text = rawContent.replace(/<[^>]+>/g, "").trim();

    if (text) {
      blocks.push({
        tag: rawTag === "td" ? "p" : rawTag,
        text: decodeHtmlEntities(text),
      });
    }
  }

  return blocks;
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

import * as XLSX from "xlsx";
import { ConversionProgressCallback } from "./docxToPdf";

export interface ExcelConversionResult {
  blob: Blob;
  fileName: string;
  mimeType: string;
}

interface TextPosItem {
  str: string;
  x: number;
  y: number;
}

/**
 * Extrae tablas y datos estructurados de un PDF y los convierte en una hoja de cálculo Excel (.xlsx) o CSV.
 */
export async function pdfToExcel(
  fileBuffer: ArrayBuffer,
  targetFormat: "xlsx" | "csv" = "xlsx",
  baseName = "documento",
  onProgress?: ConversionProgressCallback
): Promise<ExcelConversionResult> {
  onProgress?.(10, "Iniciando análisis de tablas y datos en el PDF...");

  const { getPdfJs, getPdfJsConfig } = await import("./getPdfJs");
  const pdfjsLib = await getPdfJs();

  const loadingTask = pdfjsLib.getDocument(getPdfJsConfig(fileBuffer));

  const pdfDoc = await loadingTask.promise;
  const numPages = pdfDoc.numPages;

  onProgress?.(25, `Procesando ${numPages} páginas para detección de columnas...`);

  const wb = XLSX.utils.book_new();
  const allRowsConsolidated: string[][] = [];

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const progressPercent = 25 + Math.round((pageNum / numPages) * 60);
    onProgress?.(progressPercent, `Extrayendo celdas de la página ${pageNum} de ${numPages}...`);

    const page = await pdfDoc.getPage(pageNum);
    const textContent = await page.getTextContent();

    const items: TextPosItem[] = [];
    for (const item of textContent.items) {
      if ("str" in item && item.str.trim().length > 0) {
        const tx = item.transform;
        items.push({
          str: item.str.trim(),
          x: tx[4],
          y: tx[5],
        });
      }
    }

    // Ordenar de arriba a abajo por Y
    items.sort((a, b) => b.y - a.y);

    // Agrupar elementos en filas según su coordenada Y (con tolerancia de 5 unidades)
    const rows: { y: number; cells: { x: number; text: string }[] }[] = [];

    for (const item of items) {
      const existingRow = rows.find((r) => Math.abs(r.y - item.y) <= 5);
      if (existingRow) {
        existingRow.cells.push({ x: item.x, text: item.str });
      } else {
        rows.push({
          y: item.y,
          cells: [{ x: item.x, text: item.str }],
        });
      }
    }

    // Ordenar cada fila por X (de izquierda a derecha) para armar las columnas
    const pageTableData: string[][] = [];

    for (const row of rows) {
      row.cells.sort((a, b) => a.x - b.x);
      const rowStrings = row.cells.map((c) => c.text);
      if (rowStrings.length > 0) {
        pageTableData.push(rowStrings);
        allRowsConsolidated.push(rowStrings);
      }
    }

    // Si tiene contenido, crear hoja independiente para cada página
    if (pageTableData.length > 0 && targetFormat === "xlsx") {
      const ws = XLSX.utils.aoa_to_sheet(pageTableData);
      XLSX.utils.book_append_sheet(wb, ws, `Página ${pageNum}`);
    }
  }

  onProgress?.(90, "Generando libro de cálculo final...");

  // Si no se añadieron hojas o es CSV, usar la consolidada
  if (wb.SheetNames.length === 0 || targetFormat === "csv") {
    const ws = XLSX.utils.aoa_to_sheet(
      allRowsConsolidated.length > 0 ? allRowsConsolidated : [["Sin datos tabulares detectados"]]
    );
    if (targetFormat === "csv") {
      const csvOutput = XLSX.utils.sheet_to_csv(ws);
      onProgress?.(100, "¡Archivo CSV listo!");
      return {
        blob: new Blob([csvOutput], { type: "text/csv;charset=utf-8" }),
        fileName: `${baseName}.csv`,
        mimeType: "text/csv",
      };
    }
    XLSX.utils.book_append_sheet(wb, ws, "Datos");
  }

  const wbout = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
  });

  onProgress?.(100, "¡Hoja de cálculo Excel (.xlsx) lista!");
  return {
    blob: new Blob([wbout], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
    fileName: `${baseName}.xlsx`,
    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  };
}

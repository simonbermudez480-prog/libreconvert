import { ManagedFile } from "@/hooks/useFileHandler";

export interface CleanDownloadInfo {
  downloadName: string;
  isZip: boolean;
  formatLabel: string;
  pagesCount?: number;
}

/**
 * Garantiza de forma determinista que ningún archivo comprimido se descargue
 * con extensión de imagen (ej: .png o .jpg), evitando que Windows intente
 * abrir un archivo ZIP con el visor de fotos de Windows.
 */
export function getCleanDownloadInfo(file: ManagedFile): CleanDownloadInfo {
  let cleanTarget = (file.targetFormat || "pdf").toLowerCase();

  // Si el nombre de archivo resultante especifica el formato real (ej: -imagenes-jpg.zip)
  if (file.resultFileName) {
    const zipMatch = file.resultFileName.match(/-imagenes-([a-z0-9]+)\.zip$/i);
    if (zipMatch) {
      cleanTarget = zipMatch[1].toLowerCase();
    } else {
      const dotMatch = file.resultFileName.match(/\.([a-z0-9]+)$/i);
      if (dotMatch && dotMatch[1].toLowerCase() !== "zip") {
        cleanTarget = dotMatch[1].toLowerCase();
      }
    }
  }

  const rawBase = file.name.replace(/\.[^/.]+$/, "");
  const base = rawBase.startsWith("libreconvert-") ? rawBase : `libreconvert-${rawBase}`;

  // Comprobar rigurosamente si el archivo resultante es un contenedor ZIP
  const isZip = Boolean(
    file.resultFileName?.toLowerCase().endsWith(".zip") ||
    file.resultMimeType === "application/zip" ||
    file.resultBlob?.type === "application/zip" ||
    (file.pagesCount && file.pagesCount > 1 && ["jpg", "jpeg", "png", "webp"].includes(cleanTarget))
  );

  let downloadName = file.resultFileName || "";

  if (downloadName) {
    if (!downloadName.startsWith("libreconvert-")) {
      downloadName = `libreconvert-${downloadName}`;
    }
    // Salvaguarda: Si es ZIP, forzar terminación .zip
    if (isZip && !downloadName.toLowerCase().endsWith(".zip")) {
      downloadName = `${downloadName.replace(/\.[^/.]+$/, "")}.zip`;
    }
    // Salvaguarda: Si NO es ZIP, no permitir terminación .zip
    if (!isZip && downloadName.toLowerCase().endsWith(".zip")) {
      downloadName = `${downloadName.replace(/\.zip$/i, "")}.${cleanTarget}`;
    }
  } else {
    // Si no había resultFileName, construirlo de forma segura
    if (isZip) {
      downloadName = `${base}-imagenes-${cleanTarget}.zip`;
    } else {
      downloadName = `${base}.${cleanTarget}`;
    }
  }

  // Si por alguna razón quedó sin punto de extensión
  if (!downloadName.includes(".")) {
    downloadName = `${downloadName}.${isZip ? "zip" : cleanTarget}`;
  }

  return {
    downloadName,
    isZip,
    formatLabel: isZip ? `ZIP (${cleanTarget.toUpperCase()})` : cleanTarget.toUpperCase(),
    pagesCount: file.pagesCount,
  };
}

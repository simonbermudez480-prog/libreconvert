/**
 * Carga de forma segura y diferida la librería PDF.js sin pasar por Webpack.
 * Esto erradica por completo el bug de Webpack 5 en Next.js:
 * "TypeError: Object.defineProperty called on non-object"
 * Los activos residen localmente en /vendor/pdfjs/ para máxima privacidad y velocidad offline.
 */
export async function getPdfJs(): Promise<any> {
  if (typeof window === "undefined") {
    throw new Error("PDF.js solo puede ejecutarse en el navegador.");
  }

  const win = window as any;
  if (win.pdfjsLib) {
    if (!win.pdfjsLib.GlobalWorkerOptions.workerSrc) {
      win.pdfjsLib.GlobalWorkerOptions.workerSrc = "/vendor/pdfjs/pdf.worker.min.js";
    }
    return win.pdfjsLib;
  }

  await new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector('script[data-pdfjs="true"]') as HTMLScriptElement;
    if (existingScript) {
      if (win.pdfjsLib) return resolve();
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", (e) => reject(e), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "/vendor/pdfjs/pdf.min.js";
    script.setAttribute("data-pdfjs", "true");
    script.onload = () => {
      if (win.pdfjsLib) {
        win.pdfjsLib.GlobalWorkerOptions.workerSrc = "/vendor/pdfjs/pdf.worker.min.js";
        resolve();
      } else {
        reject(new Error("No se encontró el objeto global pdfjsLib tras cargar el script."));
      }
    };
    script.onerror = () => reject(new Error("No se pudo cargar el motor local /vendor/pdfjs/pdf.min.js"));
    document.head.appendChild(script);
  });

  win.pdfjsLib.GlobalWorkerOptions.workerSrc = "/vendor/pdfjs/pdf.worker.min.js";
  return win.pdfjsLib;
}

"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { ManagedFile } from "@/hooks/useFileHandler";
import { formatFileSize } from "@/lib/utils";
import { getCleanDownloadInfo } from "@/lib/utils/downloadHelper";
import { Download, Sparkles, RefreshCw, CheckCircle2, FileText } from "lucide-react";
import { motion } from "framer-motion";

interface CelebrationModalProps {
  completedFiles: ManagedFile[];
  onReset: () => void;
}

export function CelebrationModal({ completedFiles, onReset }: CelebrationModalProps) {
  useEffect(() => {
    // Disparo de confeti festivo orgánico
    try {
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        zIndex: 9999,
      };

      function fire(particleRatio: number, opts: confetti.Options) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
        colors: ["#F59E0B", "#F97316", "#10B981"],
      });
      fire(0.2, {
        spread: 60,
        colors: ["#FB7185", "#6366F1", "#0D9488"],
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    } catch {
      // Ignorar si canvas no está disponible
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full p-6 sm:p-8 rounded-4xl bg-gradient-to-b from-white via-amber-50/30 to-warm-50 dark:from-warm-900 dark:to-warm-950 border-2 border-emerald-400/50 dark:border-emerald-700/50 shadow-glow-emerald text-center"
    >
      {/* Icon */}
      <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto mb-4 shadow-sm">
        <CheckCircle2 className="w-9 h-9" />
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3">
        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
        <span>¡Conversión 100% completada!</span>
      </div>

      <h3 className="text-2xl sm:text-3xl font-black text-warm-900 dark:text-warm-100 tracking-tight">
        Tus archivos están listos para descargar
      </h3>
      <p className="mt-1.5 text-sm sm:text-base text-warm-600 dark:text-warm-400 max-w-lg mx-auto">
        Todo el procesamiento se realizó de forma privada en tu navegador. Tus documentos no salieron de tu dispositivo.
      </p>

      {/* Files List */}
      <div className="mt-6 space-y-3 max-w-xl mx-auto text-left">
        {completedFiles.map((file) => {
          const { downloadName, isZip, formatLabel, pagesCount } = getCleanDownloadInfo(file);
          const targetExt = (file.targetFormat || "jpg").toUpperCase();

          return (
            <div
              key={file.id}
              className="p-4 rounded-2xl bg-white dark:bg-warm-900 border border-warm-200 dark:border-warm-800 shadow-sm hover:border-emerald-400/60 transition-colors"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-warm-100 dark:bg-warm-800 flex items-center justify-center shrink-0 text-brand-coral">
                    {isZip ? <span className="text-xl">📦</span> : <FileText className="w-5 h-5" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-warm-900 dark:text-warm-100 truncate" title={downloadName}>
                      {downloadName}
                    </p>
                    <p className="text-xs text-warm-500">
                      {formatFileSize(file.resultBlob?.size || file.size)} • Formato:{" "}
                      <span className="uppercase font-semibold text-emerald-600 dark:text-emerald-400">
                        {formatLabel}
                      </span>
                      {pagesCount ? ` (${pagesCount} páginas)` : ""}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  {file.resultUrl && (
                    <a
                      href={file.resultUrl}
                      download={downloadName}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold shadow-sm hover:scale-105 active:scale-95 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>{isZip ? `Descargar ZIP (${targetExt})` : `Descargar ${targetExt}`}</span>
                    </a>
                  )}
                </div>
              </div>

              {isZip && (
                <div className="mt-3 text-xs text-stone-700 dark:text-stone-300 bg-amber-500/10 border border-amber-500/25 rounded-xl p-3 flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
                    <span>💡 ¿Cómo abrir este archivo en Windows?</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-stone-600 dark:text-stone-300">
                    Tu documento contenía <strong>{pagesCount || "múltiples"} páginas</strong>. Cada página se convirtió en una imagen <strong>{targetExt}</strong> de alta resolución y se empaquetó en una carpeta comprimida <strong>.ZIP</strong> para que las recibas todas juntas.
                  </p>
                  <p className="text-[11px] font-medium text-stone-600 dark:text-stone-400">
                    ➡️ En Windows: Haz <strong>doble clic</strong> en el archivo descargado para ver tus fotos, o haz <strong>clic derecho &gt; "Extraer todo"</strong>.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        {completedFiles.length > 1 && (
          <button
            type="button"
            onClick={() => {
              completedFiles.forEach((file) => {
                if (file.resultUrl) {
                  const { downloadName } = getCleanDownloadInfo(file);
                  const a = document.createElement("a");
                  a.href = file.resultUrl;
                  a.download = downloadName;
                  a.click();
                }
              });
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md hover:scale-102 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Descargar todos los archivos</span>
          </button>
        )}

        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-warm-100 hover:bg-warm-200 dark:bg-warm-800 dark:hover:bg-warm-700 text-warm-800 dark:text-warm-200 text-sm font-bold transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Convertir más documentos</span>
        </button>
      </div>
    </motion.div>
  );
}

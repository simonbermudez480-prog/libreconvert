"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mergePdfs, splitPdf, compressPdf } from "@/lib/converters/pdfUtilities";
import { ConversionProgress } from "./ConversionProgress";
import {
  X,
  FileText,
  Layers,
  Scissors,
  Minimize2,
  Download,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";

export type ToolType = "merge" | "split" | "compress";

interface PdfToolsModalProps {
  initialTool: ToolType;
  isOpen: boolean;
  onClose: () => void;
}

export function PdfToolsModal({
  initialTool,
  isOpen,
  onClose,
}: PdfToolsModalProps) {
  const [activeTool, setActiveTool] = useState<ToolType>(initialTool);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [splitPagesText, setSplitPagesText] = useState("1-3");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [result, setResult] = useState<{ blob: Blob; fileName: string; url: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleToolChange = (tool: ToolType) => {
    setActiveTool(tool);
    setSelectedFiles([]);
    setResult(null);
    setErrorMessage(null);
  };

  const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newPdfs = Array.from(e.target.files).filter(
        (f) => f.name.toLowerCase().endsWith(".pdf")
      );
      if (activeTool === "merge") {
        setSelectedFiles((prev) => [...prev, ...newPdfs]);
      } else {
        setSelectedFiles(newPdfs.slice(0, 1));
      }
      setResult(null);
      setErrorMessage(null);
      e.target.value = "";
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleExecute = async () => {
    if (selectedFiles.length === 0 || isProcessing) return;

    setIsProcessing(true);
    setResult(null);
    setErrorMessage(null);
    setProgress(5);

    try {
      if (activeTool === "merge") {
        if (selectedFiles.length < 2) {
          throw new Error("Por favor selecciona al menos 2 archivos PDF para unirlos.");
        }
        const buffers = await Promise.all(selectedFiles.map((f) => f.arrayBuffer()));
        const res = await mergePdfs(buffers, "documentos-unidos.pdf", (p, msg) => {
          setProgress(p);
          setStatusMessage(msg);
        });
        const url = URL.createObjectURL(res.blob);
        setResult({ blob: res.blob, fileName: res.fileName, url });
      } else if (activeTool === "split") {
        const buffer = await selectedFiles[0].arrayBuffer();
        // Parsear números de páginas: ej "1-3, 5, 7"
        const pages: number[] = [];
        const parts = splitPagesText.split(",");
        parts.forEach((p) => {
          const range = p.trim().split("-");
          if (range.length === 2) {
            const start = parseInt(range[0]);
            const end = parseInt(range[1]);
            if (!isNaN(start) && !isNaN(end)) {
              for (let i = start; i <= end; i++) pages.push(i);
            }
          } else {
            const single = parseInt(p.trim());
            if (!isNaN(single)) pages.push(single);
          }
        });

        const uniquePages = Array.from(new Set(pages)).sort((a, b) => a - b);
        if (uniquePages.length === 0) {
          throw new Error("Especifica páginas válidas a extraer (ej: 1-3 o 1, 4, 6).");
        }

        const res = await splitPdf(buffer, uniquePages, "paginas-extraidas.pdf", (p, msg) => {
          setProgress(p);
          setStatusMessage(msg);
        });
        const url = URL.createObjectURL(res.blob);
        setResult({ blob: res.blob, fileName: res.fileName, url });
      } else if (activeTool === "compress") {
        const buffer = await selectedFiles[0].arrayBuffer();
        const res = await compressPdf(buffer, "documento-optimizado.pdf", (p, msg) => {
          setProgress(p);
          setStatusMessage(msg);
        });
        const url = URL.createObjectURL(res.blob);
        setResult({ blob: res.blob, fileName: res.fileName, url });
      }

      // Celebración
      try {
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
      } catch {}
    } catch (err: any) {
      setErrorMessage(err.message || "Error al procesar la herramienta PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warm-950/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-2xl bg-white dark:bg-warm-900 rounded-4xl shadow-warm-lg border border-warm-200 dark:border-warm-800 p-6 sm:p-8 overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-2xl text-warm-400 hover:text-warm-700 dark:hover:text-warm-200 hover:bg-warm-100 dark:hover:bg-warm-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200">
              Utilidades PDF
            </span>
            <span className="text-xs text-warm-500 font-semibold">• 100% en tu navegador</span>
          </div>
          <h3 className="text-2xl font-black text-warm-900 dark:text-warm-100 tracking-tight">
            Herramientas Rápidas para tus PDFs
          </h3>
        </div>

        {/* Tool Tabs */}
        <div className="flex gap-2 p-1.5 rounded-2xl bg-warm-100 dark:bg-warm-800/80 mb-6 shrink-0">
          <button
            type="button"
            onClick={() => handleToolChange("merge")}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              activeTool === "merge"
                ? "bg-white dark:bg-warm-900 text-brand-coral shadow-sm"
                : "text-warm-600 dark:text-warm-400 hover:text-warm-950"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Unir PDFs</span>
          </button>
          <button
            type="button"
            onClick={() => handleToolChange("split")}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              activeTool === "split"
                ? "bg-white dark:bg-warm-900 text-brand-coral shadow-sm"
                : "text-warm-600 dark:text-warm-400 hover:text-warm-950"
            }`}
          >
            <Scissors className="w-4 h-4" />
            <span>Dividir / Extraer</span>
          </button>
          <button
            type="button"
            onClick={() => handleToolChange("compress")}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              activeTool === "compress"
                ? "bg-white dark:bg-warm-900 text-brand-coral shadow-sm"
                : "text-warm-600 dark:text-warm-400 hover:text-warm-950"
            }`}
          >
            <Minimize2 className="w-4 h-4" />
            <span>Comprimir PDF</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            multiple={activeTool === "merge"}
            className="hidden"
            onChange={handleAddFiles}
          />

          {/* Error Notice */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 text-rose-800 dark:text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Files List or Add Button */}
          {selectedFiles.length === 0 ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="p-8 rounded-3xl border-2 border-dashed border-warm-300 dark:border-warm-700 hover:border-brand-coral hover:bg-warm-50/60 dark:hover:bg-warm-800/40 cursor-pointer flex flex-col items-center justify-center text-center transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-brand-coral mb-3">
                <Plus className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-warm-900 dark:text-warm-100">
                Selecciona {activeTool === "merge" ? "los archivos PDF a unir" : "el archivo PDF"}
              </p>
              <p className="text-xs text-warm-500 mt-1">Haz clic para buscar en tu dispositivo</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-warm-700 dark:text-warm-300 px-1">
                <span>{selectedFiles.length} {selectedFiles.length === 1 ? "archivo seleccionado" : "archivos seleccionados"}</span>
                {activeTool === "merge" && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-brand-coral hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Añadir más PDFs</span>
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {selectedFiles.map((f, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-2xl bg-warm-50 dark:bg-warm-800/60 border border-warm-200 dark:border-warm-700/80 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <FileText className="w-4 h-4 text-brand-coral shrink-0" />
                      <span className="font-semibold text-warm-900 dark:text-warm-100 truncate">
                        {f.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(i)}
                      className="p-1 text-warm-400 hover:text-rose-500 rounded-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Split tool inputs */}
              {activeTool === "split" && (
                <div className="p-4 rounded-2xl bg-warm-100/60 dark:bg-warm-800/40 border border-warm-200 dark:border-warm-700 space-y-2">
                  <label className="block text-xs font-bold text-warm-800 dark:text-warm-200">
                    Páginas a extraer (ej: 1-3, 5):
                  </label>
                  <input
                    type="text"
                    value={splitPagesText}
                    onChange={(e) => setSplitPagesText(e.target.value)}
                    placeholder="ej: 1-3, 5, 8"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-warm-900 border border-warm-300 dark:border-warm-700 text-xs sm:text-sm font-semibold text-warm-900 dark:text-warm-100 focus:outline-none focus:ring-2 focus:ring-brand-coral"
                  />
                  <p className="text-[11px] text-warm-500">
                    Introduce rangos separados por guión o páginas individuales separadas por coma.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Progress while processing */}
          {isProcessing && (
            <div className="pt-2">
              <ConversionProgress progress={progress} stageMessage={statusMessage} />
            </div>
          )}

          {/* Result Box */}
          {result && (
            <div className="p-4 rounded-3xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 flex items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <p className="text-sm font-black text-emerald-950 dark:text-emerald-100">
                    ¡Documento generado con éxito!
                  </p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">
                    {result.fileName}
                  </p>
                </div>
              </div>
              <a
                href={result.url}
                download={result.fileName}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow flex items-center gap-1.5 transition-transform hover:scale-105"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar</span>
              </a>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="mt-6 pt-4 border-t border-warm-200 dark:border-warm-800 flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-warm-600 hover:bg-warm-100 dark:hover:bg-warm-800 transition-colors"
          >
            Cerrar
          </button>
          <button
            type="button"
            disabled={selectedFiles.length === 0 || isProcessing}
            onClick={handleExecute}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-amber via-brand-coral to-brand-rose text-white text-xs sm:text-sm font-black shadow-warm hover:shadow-warm-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            <span>
              {activeTool === "merge"
                ? "Unir archivos PDF"
                : activeTool === "split"
                ? "Extraer páginas"
                : "Comprimir PDF"}
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

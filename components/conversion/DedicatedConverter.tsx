"use client";

import React, { useState, useRef } from "react";
import { ConversionMeta } from "@/lib/seo/matrix";
import { useFileHandler } from "@/hooks/useFileHandler";
import { convertDocument } from "@/lib/converters";
import { mergePdfs, splitPdf, compressPdf } from "@/lib/converters/pdfUtilities";
import { ConversionProgress } from "./ConversionProgress";
import { CelebrationModal } from "./CelebrationModal";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  FileText,
  Trash2,
  Download,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertCircle,
  Plus,
  Layers,
  Scissors,
  Minimize2,
  RefreshCw,
} from "lucide-react";

interface DedicatedConverterProps {
  meta: ConversionMeta;
}

export function DedicatedConverter({ meta }: DedicatedConverterProps) {
  // Utility States (merge, split, compress)
  const isUtility = !!meta.isUtility;
  const utilityType = meta.utilityType || "merge";

  const [utilityFiles, setUtilityFiles] = useState<File[]>([]);
  const [splitRange, setSplitRange] = useState("1-3");
  const [isProcessingUtility, setIsProcessingUtility] = useState(false);
  const [utilityProgress, setUtilityProgress] = useState(0);
  const [utilityStatus, setUtilityStatus] = useState("");
  const [utilityResult, setUtilityResult] = useState<{
    blob: Blob;
    fileName: string;
    url: string;
  } | null>(null);
  const [utilityError, setUtilityError] = useState<string | null>(null);

  // Standard Converter using useFileHandler
  const {
    files,
    isDragging,
    setIsDragging,
    addFiles,
    removeFile,
    clearFiles,
    updateFileStatus,
    setTargetFormat,
  } = useFileHandler();

  const [isProcessingStandard, setIsProcessingStandard] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // When files are added to standard converter, ensure targetFormat is meta.defaultTarget
  const handleStandardFilesAdded = (incoming: FileList | File[]) => {
    addFiles(incoming);
  };

  React.useEffect(() => {
    if (meta.defaultTarget && files.length > 0) {
      files.forEach((f) => {
        if (f.targetFormat !== meta.defaultTarget) {
          setTargetFormat(f.id, meta.defaultTarget);
        }
      });
    }
  }, [files, meta.defaultTarget, setTargetFormat]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (isUtility) {
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleUtilityFiles(e.dataTransfer.files);
      }
    } else {
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleStandardFilesAdded(e.dataTransfer.files);
      }
    }
  };

  const handleStartConversion = async () => {
    if (files.length === 0 || isProcessingStandard) return;

    setIsProcessingStandard(true);
    setShowCelebration(false);

    for (let i = 0; i < files.length; i++) {
      const item = files[i];
      if (item.status === "completed") continue;

      // Ensure target format corresponds to this dedicated page if not set
      const target = meta.defaultTarget || item.targetFormat;
      updateFileStatus(item.id, "converting", 5);

      try {
        const result = await convertDocument(
          item.file,
          target,
          (percent, msg) => {
            updateFileStatus(item.id, "converting", percent);
          }
        );

        updateFileStatus(
          item.id,
          "completed",
          100,
          result.blob,
          undefined,
          result.fileName,
          result.mimeType,
          result.pagesCount
        );
      } catch (err: any) {
        console.error("Error al convertir:", err);
        updateFileStatus(
          item.id,
          "error",
          0,
          undefined,
          err?.message || "Error al procesar el archivo."
        );
      }
    }

    setIsProcessingStandard(false);
    setShowCelebration(true);
  };

  // --- Handlers for PDF Utilities ---
  const handleUtilityFiles = (fileList: FileList | File[]) => {
    const pdfs = Array.from(fileList).filter((f) =>
      f.name.toLowerCase().endsWith(".pdf")
    );
    if (pdfs.length === 0) return;

    if (utilityType === "merge") {
      setUtilityFiles((prev) => [...prev, ...pdfs]);
    } else {
      setUtilityFiles([pdfs[0]]);
    }
    setUtilityResult(null);
    setUtilityError(null);
  };

  const handleExecuteUtility = async () => {
    if (utilityFiles.length === 0) return;

    setIsProcessingUtility(true);
    setUtilityProgress(10);
    setUtilityError(null);

    try {
      if (utilityType === "merge") {
        if (utilityFiles.length < 2) {
          throw new Error("Por favor añade al menos 2 archivos PDF para combinarlos.");
        }
        setUtilityStatus("Uniendo páginas de tus documentos...");
        const buffers = await Promise.all(utilityFiles.map((f) => f.arrayBuffer()));
        const res = await mergePdfs(buffers, "documentos-unidos.pdf", (percent, msg) => {
          setUtilityProgress(percent);
          if (msg) setUtilityStatus(msg);
        });
        const url = URL.createObjectURL(res.blob);
        setUtilityResult({
          blob: res.blob,
          fileName: res.fileName,
          url,
        });
      } else if (utilityType === "split") {
        setUtilityStatus("Extrayendo las páginas indicadas...");
        const buffer = await utilityFiles[0].arrayBuffer();
        const pages: number[] = [];
        splitRange.split(",").forEach((part) => {
          const trimmed = part.trim();
          if (trimmed.includes("-")) {
            const [start, end] = trimmed.split("-").map((n) => parseInt(n.trim(), 10));
            if (!isNaN(start) && !isNaN(end)) {
              for (let i = start; i <= end; i++) pages.push(i);
            }
          } else {
            const num = parseInt(trimmed, 10);
            if (!isNaN(num)) pages.push(num);
          }
        });
        const uniquePages = Array.from(new Set(pages)).sort((a, b) => a - b);
        if (uniquePages.length === 0) {
          throw new Error("Especifica páginas válidas a extraer (ej: 1-3 o 1, 4, 6).");
        }

        const res = await splitPdf(buffer, uniquePages, `paginas_${utilityFiles[0].name}`, (percent, msg) => {
          setUtilityProgress(percent);
          if (msg) setUtilityStatus(msg);
        });
        const url = URL.createObjectURL(res.blob);
        setUtilityResult({
          blob: res.blob,
          fileName: res.fileName,
          url,
        });
      } else if (utilityType === "compress") {
        setUtilityStatus("Reestructurando y optimizando flujos...");
        const buffer = await utilityFiles[0].arrayBuffer();
        const res = await compressPdf(buffer, `optimizado_${utilityFiles[0].name}`, (percent, msg) => {
          setUtilityProgress(percent);
          if (msg) setUtilityStatus(msg);
        });
        const url = URL.createObjectURL(res.blob);
        setUtilityResult({
          blob: res.blob,
          fileName: res.fileName,
          url,
        });
      }

      const confettiModule = await import("canvas-confetti");
      const confetti = confettiModule.default;
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#E76F51", "#F4A261", "#2A9D8F", "#E9C46A"],
      });
    } catch (err: any) {
      console.error(err);
      setUtilityError(err?.message || "Ocurrió un error al procesar la utilidad.");
    } finally {
      setIsProcessingUtility(false);
      setUtilityProgress(100);
    }
  };

  const completedFiles = files.filter((f) => f.status === "completed");
  const allCompleted = files.length > 0 && files.every((f) => f.status === "completed");

  const averageProgress =
    files.length > 0
      ? files.reduce((acc, f) => acc + f.progress, 0) / files.length
      : 0;

  return (
    <div className="w-full">
      {/* Container Card */}
      <div className="bg-white dark:bg-warm-900 rounded-4xl p-6 sm:p-10 shadow-warm border border-stone-200/80 dark:border-stone-800 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-amber/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-brand-coral/10 rounded-full blur-3xl pointer-events-none" />

        {/* UTILITY MODE (Merge, Split, Compress) */}
        {isUtility ? (
          <div>
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-amber/15 text-brand-amber-dark">
                {utilityType === "merge" && <Layers className="w-3.5 h-3.5" />}
                {utilityType === "split" && <Scissors className="w-3.5 h-3.5" />}
                {utilityType === "compress" && <Minimize2 className="w-3.5 h-3.5" />}
                {meta.badge || "Herramienta Gratuita"}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-800 dark:text-stone-100 mt-2">
                {meta.h1}
              </h1>
              <p className="text-stone-500 dark:text-stone-400 text-sm sm:text-base max-w-xl mx-auto mt-1">
                {meta.subtitle}
              </p>
            </div>

            {/* Drop / Select zone for Utility */}
            <div
              role="button"
              tabIndex={0}
              aria-label="Zona de arrastre o selección de archivos para herramientas PDF"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-8 sm:p-10 text-center cursor-pointer transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral focus-visible:ring-offset-2 ${
                isDragging
                  ? "border-brand-coral bg-brand-coral/5 scale-[1.01]"
                  : "border-stone-300 dark:border-stone-700 hover:border-brand-amber hover:bg-stone-50/60 dark:hover:bg-stone-800/40"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple={utilityType === "merge"}
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) handleUtilityFiles(e.target.files);
                }}
              />
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-brand-amber/15 text-brand-amber flex items-center justify-center shadow-sm">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-base font-semibold text-stone-700 dark:text-stone-200">
                    {utilityType === "merge"
                      ? "Arrastra varios PDFs aquí o haz clic para seleccionarlos"
                      : "Arrastra tu documento PDF aquí o haz clic para seleccionarlo"}
                  </p>
                  <p className="text-xs text-stone-400 mt-1">
                    Solo archivos .pdf • Procesado 100% en tu navegador con privacidad total
                  </p>
                </div>
              </div>
            </div>

            {/* List of files added in Utility */}
            {utilityFiles.length > 0 && (
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    {utilityType === "merge"
                      ? `${utilityFiles.length} archivos para unir`
                      : "Archivo seleccionado"}
                  </span>
                  {utilityType === "merge" && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs font-semibold text-brand-coral hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Añadir más PDFs
                    </button>
                  )}
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {utilityFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-200/70 dark:border-stone-700"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-6 h-6 rounded-full bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {idx + 1}
                        </span>
                        <div className="truncate">
                          <p className="text-sm font-medium text-stone-700 dark:text-stone-200 truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-stone-400">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setUtilityFiles((prev) => prev.filter((_, i) => i !== idx))
                        }
                        className="p-1.5 text-stone-400 hover:text-red-500 rounded-lg hover:bg-stone-200/50 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Additional controls for Split */}
                {utilityType === "split" && (
                  <div className="mt-4 p-4 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-200 dark:border-stone-700">
                    <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                      Páginas a extraer (ejemplo: 1-3, 5):
                    </label>
                    <input
                      type="text"
                      value={splitRange}
                      onChange={(e) => setSplitRange(e.target.value)}
                      placeholder="1-3"
                      className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl text-sm focus:outline-none focus:border-brand-amber font-mono dark:bg-stone-900"
                    />
                    <p className="text-xs text-stone-400 mt-1">
                      Indica las páginas separadas por comas o rangos con guión.
                    </p>
                  </div>
                )}

                {/* Error Banner */}
                {utilityError && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{utilityError}</span>
                  </div>
                )}

                {/* Progress bar */}
                {isProcessingUtility && (
                  <div className="mt-4">
                    <ConversionProgress
                      progress={utilityProgress}
                      stageMessage={utilityStatus}
                    />
                  </div>
                )}

                {/* Utility Result / Download */}
                {utilityResult && !isProcessingUtility && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-brand-emerald/10 border border-brand-emerald/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 mt-4"
                  >
                    <div className="flex items-center gap-2.5 text-brand-emerald text-sm font-semibold">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      <span>¡Listo! Archivo procesado con éxito</span>
                    </div>
                    <a
                      href={utilityResult.url}
                      download={utilityResult.fileName}
                      className="w-full sm:w-auto px-5 py-2.5 bg-brand-emerald hover:bg-brand-emerald/90 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-transform hover:scale-[1.02]"
                    >
                      <Download className="w-4 h-4" />
                      Descargar PDF
                    </a>
                  </motion.div>
                )}

                {/* Action CTA */}
                {!utilityResult && !isProcessingUtility && (
                  <button
                    onClick={handleExecuteUtility}
                    disabled={utilityType === "merge" && utilityFiles.length < 2}
                    className="w-full mt-4 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-brand-amber to-brand-coral text-white font-bold text-base shadow-warm flex items-center justify-center gap-2 hover:opacity-95 transition-all disabled:opacity-50"
                  >
                    <Zap className="w-4 h-4" />
                    {utilityType === "merge" && "Unir PDFs Ahora"}
                    {utilityType === "split" && "Dividir Páginas Ahora"}
                    {utilityType === "compress" && "Comprimir PDF Ahora"}
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          /* STANDARD CONVERSION MODE */
          <div>
            <AnimatePresence>
              {showCelebration && allCompleted ? (
                <CelebrationModal
                  completedFiles={completedFiles}
                  onReset={() => {
                    clearFiles();
                    setShowCelebration(false);
                  }}
                />
              ) : (
                <>
                  <div className="text-center mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-coral/15 text-brand-coral">
                      <Sparkles className="w-3.5 h-3.5" />
                      {meta.badge || "Conversión Rápida"}
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-800 dark:text-stone-100 mt-2">
                      {meta.h1}
                    </h1>
                    <p className="text-stone-500 dark:text-stone-400 text-sm sm:text-base max-w-xl mx-auto mt-1">
                      {meta.subtitle}
                    </p>
                  </div>

                  {/* Dropzone */}
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label={`Zona de arrastre o selección de archivos para convertir a ${meta.toFormat}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        fileInputRef.current?.click();
                      }
                    }}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral focus-visible:ring-offset-2 ${
                      isDragging
                        ? "border-brand-coral bg-brand-coral/5 scale-[1.01]"
                        : "border-stone-300 dark:border-stone-700 hover:border-brand-amber hover:bg-stone-50/60 dark:hover:bg-stone-800/40"
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept={meta.defaultAccept}
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files) handleStandardFilesAdded(e.target.files);
                      }}
                    />
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-amber/20 to-brand-coral/20 text-brand-coral flex items-center justify-center shadow-sm">
                        <UploadCloud className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="text-base sm:text-lg font-semibold text-stone-700 dark:text-stone-200">
                          Arrastra tus archivos de {meta.fromFormat} aquí o pulsa para seleccionarlos
                        </p>
                        <p className="text-xs sm:text-sm text-stone-400 mt-1">
                          También puedes pulsar{" "}
                          <kbd className="px-1.5 py-0.5 bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded text-xs font-mono">
                            Ctrl+V
                          </kbd>{" "}
                          para pegar desde el portapapeles
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Added Files List */}
                  {files.length > 0 && (
                    <div className="mt-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                          {files.length} {files.length === 1 ? "archivo listo" : "archivos listos"}
                        </span>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="text-xs font-semibold text-brand-coral hover:underline flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" /> Añadir más archivos
                        </button>
                      </div>

                      <div className="space-y-2">
                        {files.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-3.5 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-200/80 dark:border-stone-700"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-8 h-8 rounded-lg bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 flex items-center justify-center flex-shrink-0">
                                <FileText className="w-4 h-4" />
                              </div>
                              <div className="truncate">
                                <p className="text-sm font-medium text-stone-700 dark:text-stone-200 truncate">
                                  {item.name}
                                </p>
                                <p className="text-xs text-stone-400">
                                  {(item.size / 1024 / 1024).toFixed(2)} MB • Destino:{" "}
                                  <span className="font-semibold text-brand-coral">
                                    {meta.toFormat}
                                  </span>
                                </p>
                              </div>
                            </div>

                            <button
                              onClick={() => removeFile(item.id)}
                              className="p-1.5 text-stone-400 hover:text-red-500 rounded-lg hover:bg-stone-200/50 transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Conversion Progress */}
                      {isProcessingStandard && (
                        <div className="mt-4">
                          <ConversionProgress progress={averageProgress} />
                        </div>
                      )}

                      {/* Conversion CTA */}
                      {!isProcessingStandard && (
                        <button
                          onClick={handleStartConversion}
                          className="w-full mt-4 py-4 px-6 rounded-2xl bg-gradient-to-r from-brand-amber via-brand-coral to-brand-amber text-white font-extrabold text-base sm:text-lg shadow-warm flex items-center justify-center gap-2 hover:opacity-95 transition-all hover:scale-[1.01]"
                        >
                          <Sparkles className="w-5 h-5" />
                          Convertir a {meta.toFormat} Gratis
                          <ArrowRight className="w-5 h-5 ml-1" />
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

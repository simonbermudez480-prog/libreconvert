"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useFileHandler } from "@/hooks/useFileHandler";
import { Dropzone } from "@/components/conversion/Dropzone";
import { FileCard } from "@/components/conversion/FileCard";
import { CelebrationModal } from "@/components/conversion/CelebrationModal";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { convertDocument } from "@/lib/converters";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  FileCode,
  Image as ImageIcon,
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
  Trash2,
  CheckCircle2,
  Loader2,
} from "lucide-react";

export default function HomePage() {
  const {
    files,
    isDragging,
    setIsDragging,
    addFiles,
    removeFile,
    clearFiles,
    setTargetFormat,
    updateFileStatus,
    notice,
    setNotice,
  } = useFileHandler();

  const [isProcessing, setIsProcessing] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const completedFiles = files.filter((f) => f.status === "completed");
  const allCompleted = files.length > 0 && files.every((f) => f.status === "completed");

  const handleStartConversion = async () => {
    if (files.length === 0 || isProcessing) return;

    setIsProcessing(true);
    setShowCelebration(false);

    for (const item of files) {
      if (item.status === "completed") continue;

      updateFileStatus(item.id, "converting", 5);

      try {
        const result = await convertDocument(
          item.file,
          item.targetFormat,
          (percent) => {
            updateFileStatus(item.id, "converting", percent);
          }
        );

        updateFileStatus(item.id, "completed", 100, result.blob);
      } catch (err: any) {
        console.error("Error al convertir:", err);
        updateFileStatus(
          item.id,
          "error",
          0,
          undefined,
          err?.message || "Ocurrió un error al procesar el archivo localmente."
        );
      }
    }

    setIsProcessing(false);
    setShowCelebration(true);
  };

  const handleReset = () => {
    clearFiles();
    setShowCelebration(false);
  };

  const tools = [
    {
      title: "Word a PDF",
      desc: "Convierte tus documentos .docx a formato PDF con máxima fidelidad visual.",
      from: "DOCX",
      to: "PDF",
      icon: FileText,
      color: "from-blue-500 to-indigo-600",
      accent: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300",
      badge: "Más popular",
    },
    {
      title: "PDF a Word",
      desc: "Transforma tus PDFs en documentos Word (.docx) editables y formateados.",
      from: "PDF",
      to: "DOCX",
      icon: FileText,
      color: "from-brand-coral to-rose-600",
      accent: "bg-orange-50 dark:bg-orange-950/40 text-brand-coral",
      badge: "Editable",
    },
    {
      title: "PDF a Imágenes",
      desc: "Extrae cada página de tu PDF como una imagen JPG o PNG de alta resolución.",
      from: "PDF",
      to: "JPG / PNG",
      icon: ImageIcon,
      color: "from-emerald-500 to-teal-600",
      accent: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300",
    },
    {
      title: "Imágenes a PDF",
      desc: "Une fotos y capturas (JPG, PNG, WebP) en un único archivo PDF ordenado.",
      from: "IMG",
      to: "PDF",
      icon: ImageIcon,
      color: "from-purple-500 to-pink-600",
      accent: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300",
    },
    {
      title: "PDF a Excel",
      desc: "Extrae tablas de datos desde archivos PDF hacia hojas de cálculo (.xlsx).",
      from: "PDF",
      to: "XLSX",
      icon: FileSpreadsheet,
      color: "from-teal-600 to-emerald-700",
      accent: "bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-300",
    },
    {
      title: "Word o PDF a Texto / HTML",
      desc: "Convierte el contenido a texto limpio (.txt) o marcado HTML semántico.",
      from: "DOC / PDF",
      to: "TXT / HTML",
      icon: FileCode,
      color: "from-amber-500 to-yellow-600",
      accent: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-300",
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-8 text-center">
        {/* Top pill notification */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 dark:bg-amber-950/60 border border-amber-300/50 dark:border-amber-700/40 text-xs sm:text-sm font-semibold text-amber-900 dark:text-amber-200 mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 text-brand-coral animate-pulse" />
          <span>100% de procesamiento en tu navegador con privacidad total</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-warm-900 dark:text-warm-50 tracking-tight leading-[1.1] max-w-4xl mx-auto">
          Convierte tus archivos <br />
          <span className="bg-gradient-to-r from-brand-amber via-brand-coral to-brand-rose bg-clip-text text-transparent">
            fácil, gratis y en privado.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-xl text-warm-600 dark:text-warm-300 max-w-2xl mx-auto leading-relaxed">
          Word a PDF, PDF a Word, imágenes y más. Sin límites de archivos, sin registros y sin que tus documentos viajen por servidores externos.
        </p>

        {/* Interactive Dropzone & File Management Section */}
        <div id="conversor" className="mt-10 sm:mt-12 w-full max-w-3xl mx-auto">
          {/* Si ya terminó la conversión y se muestra celebración */}
          <AnimatePresence>
            {showCelebration && allCompleted ? (
              <CelebrationModal completedFiles={completedFiles} onReset={handleReset} />
            ) : (
              <>
                <Dropzone
                  onFilesAdded={addFiles}
                  isDragging={isDragging}
                  setIsDragging={setIsDragging}
                  notice={notice}
                  onClearNotice={() => setNotice(null)}
                />

                {/* Uploaded Files Section */}
                <AnimatePresence>
                  {files.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className="mt-6 space-y-3"
                    >
                      <div className="flex items-center justify-between px-2 text-xs sm:text-sm font-bold text-warm-700 dark:text-warm-300">
                        <span>Archivos preparados ({files.length})</span>
                        {!isProcessing && (
                          <button
                            type="button"
                            onClick={clearFiles}
                            className="flex items-center gap-1 text-xs text-warm-500 hover:text-rose-500 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Limpiar lista</span>
                          </button>
                        )}
                      </div>

                      <div className="space-y-3">
                        {files.map((managedFile) => (
                          <FileCard
                            key={managedFile.id}
                            managedFile={managedFile}
                            onRemove={removeFile}
                            onFormatChange={setTargetFormat}
                          />
                        ))}
                      </div>

                      {/* Primary Action Button */}
                      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <button
                          type="button"
                          disabled={isProcessing}
                          onClick={handleStartConversion}
                          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-amber via-brand-coral to-brand-rose text-white text-base sm:text-lg font-black shadow-warm hover:shadow-warm-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {isProcessing ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>Procesando archivos localmente...</span>
                            </>
                          ) : (
                            <>
                              <Zap className="w-5 h-5" />
                              <span>
                                Convertir {files.length === 1 ? "archivo" : `${files.length} archivos`} ahora (100% Gratis)
                              </span>
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Trust Badges Section */}
      <TrustBadges />

      {/* Popular Tools Grid */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-warm-900 dark:text-warm-50 tracking-tight">
              Todas las conversiones que necesitas
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-warm-600 dark:text-warm-400">
              Partiendo desde Word o PDF hacia cualquier formato común, sin costo alguno.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div
                key={index}
                className="group relative p-6 rounded-3xl bg-white dark:bg-warm-900 border border-warm-200/90 dark:border-warm-800 shadow-warm hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-2xl ${tool.accent} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {tool.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-warm-900 dark:text-warm-100 group-hover:text-brand-coral transition-colors flex items-center gap-2">
                    {tool.title}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-sm text-warm-600 dark:text-warm-400 mt-1.5 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-warm-100 dark:border-warm-800/80 flex items-center justify-between text-xs font-semibold text-warm-500">
                  <span className="px-2 py-1 rounded-lg bg-warm-100 dark:bg-warm-800 text-warm-700 dark:text-warm-300">
                    {tool.from}
                  </span>
                  <span>a</span>
                  <span className="px-2 py-1 rounded-lg bg-warm-100 dark:bg-warm-800 text-warm-700 dark:text-warm-300">
                    {tool.to}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Human Philosophy / FAQ Preview */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-warm-100/60 via-warm-50/40 to-amber-50/50 dark:from-warm-900/60 dark:to-warm-950 border border-warm-200 dark:border-warm-800">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-warm-900 dark:text-warm-100 mb-3">
            ¿Por qué LibreConvert es diferente?
          </h2>
          <p className="text-sm sm:text-base text-warm-600 dark:text-warm-400 leading-relaxed max-w-2xl mx-auto">
            La gran mayoría de conversores online suben tus archivos privados a servidores lejanos para procesarlos y luego te cobran suscripciones mensuales o te bloquean tras 2 o 3 documentos.
            En <strong>LibreConvert</strong>, los algoritmos se descargan una sola vez y corren localmente en la memoria de tu navegador: <strong>privacidad garantizada por la física del código y costo $0 para siempre.</strong>
          </p>
        </div>
      </section>
    </div>
  );
}

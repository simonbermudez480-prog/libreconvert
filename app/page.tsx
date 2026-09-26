"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useFileHandler } from "@/hooks/useFileHandler";
import { Dropzone } from "@/components/conversion/Dropzone";
import { FileCard } from "@/components/conversion/FileCard";
import { CelebrationModal } from "@/components/conversion/CelebrationModal";
import { PdfToolsModal, ToolType } from "@/components/conversion/PdfToolsModal";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { HomeJsonLd } from "@/components/seo/HomeJsonLd";
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
  Layers,
  Scissors,
  Minimize2,
  Heart,
  Coffee,
  GraduationCap,
  Briefcase,
  UserCheck,
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

  // Estado para el modal de utilidades PDF
  const [toolsModalOpen, setToolsModalOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<ToolType>("merge");

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
        console.error("Error al convertir:", err?.stack || err?.message || String(err));
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

  const openPdfTool = (tool: ToolType) => {
    setSelectedTool(tool);
    setToolsModalOpen(true);
  };

  const tools = [
    {
      title: "Word a PDF",
      desc: "Convierte tus documentos .docx a formato PDF con máxima fidelidad visual y tipografía nítida.",
      from: "DOCX",
      to: "PDF",
      icon: FileText,
      color: "from-blue-500 to-indigo-600",
      accent: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300",
      badge: "✨ Más popular",
      action: () => {
        document.getElementById("conversor")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      title: "PDF a Word",
      desc: "Transforma tus PDFs en documentos Word (.docx) editables y formateados con párrafos y títulos.",
      from: "PDF",
      to: "DOCX",
      icon: FileText,
      color: "from-brand-coral to-rose-600",
      accent: "bg-orange-50 dark:bg-orange-950/40 text-brand-coral",
      badge: "✏️ 100% Editable",
      action: () => {
        document.getElementById("conversor")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      title: "PDF a Imágenes",
      desc: "Extrae cada página de tu PDF como una imagen JPG o PNG de alta resolución (2x Retina / 300 DPI).",
      from: "PDF",
      to: "JPG / PNG",
      icon: ImageIcon,
      color: "from-emerald-500 to-teal-600",
      accent: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300",
      badge: "🖼️ Retina 300 DPI",
      action: () => {
        document.getElementById("conversor")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      title: "Imágenes a PDF",
      desc: "Une fotos y capturas (JPG, PNG, WebP) en un único archivo PDF ordenado sin pérdida de calidad.",
      from: "IMG",
      to: "PDF",
      icon: ImageIcon,
      color: "from-purple-500 to-pink-600",
      accent: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300",
      badge: "📑 Fotos a 1 PDF",
      action: () => {
        document.getElementById("conversor")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      title: "PDF a Excel",
      desc: "Detecta y extrae tablas de datos desde archivos PDF hacia hojas de cálculo vivas (.xlsx / .csv).",
      from: "PDF",
      to: "XLSX",
      icon: FileSpreadsheet,
      color: "from-teal-600 to-emerald-700",
      accent: "bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-300",
      badge: "📊 Tablas a celdas",
      action: () => {
        document.getElementById("conversor")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      title: "Word o PDF a Texto / HTML",
      desc: "Convierte el contenido a texto limpio (.txt) o marcado HTML semántico listo para web.",
      from: "DOC / PDF",
      to: "TXT / HTML",
      icon: FileCode,
      color: "from-amber-500 to-yellow-600",
      accent: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-300",
      badge: "📝 Texto limpio",
      action: () => {
        document.getElementById("conversor")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      title: "Unir varios PDF",
      desc: "Combina dos o más archivos PDF en un solo documento consolidado al instante.",
      from: "Varios PDF",
      to: "1 PDF",
      icon: Layers,
      color: "from-indigo-500 to-blue-600",
      accent: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300",
      badge: "🧩 1 Clic",
      action: () => openPdfTool("merge"),
    },
    {
      title: "Dividir / Extraer PDF",
      desc: "Extrae rangos de páginas específicas (ej. 1-3, 5) en un nuevo archivo PDF ligero.",
      from: "PDF",
      to: "Páginas",
      icon: Scissors,
      color: "from-rose-500 to-pink-600",
      accent: "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300",
      badge: "✂️ Por páginas",
      action: () => openPdfTool("split"),
    },
    {
      title: "Comprimir PDF",
      desc: "Reduce el peso de tu archivo PDF compactando flujos de datos y limpiando metadatos.",
      from: "PDF Pesado",
      to: "PDF Ligero",
      icon: Minimize2,
      color: "from-emerald-600 to-teal-700",
      accent: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300",
      badge: "⚡ Súper ligero",
      action: () => openPdfTool("compress"),
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center">
      {/* Schema.org Injections para Homepage */}
      <HomeJsonLd />

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
          Word a PDF, PDF a Word, imágenes, hojas de cálculo y utilidades. Sin límites de archivos, sin registros y sin que tus documentos viajen por servidores externos.
        </p>

        {/* Human Reassurance Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-warm-700 dark:text-warm-200 font-medium">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-warm-900/90 border border-warm-200/90 dark:border-warm-700/80 shadow-xs">
            <Coffee className="w-3.5 h-3.5 text-brand-coral" /> Sin registros ni cuentas
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-warm-900/90 border border-warm-200/90 dark:border-warm-700/80 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Cero archivos en la nube
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-warm-900/90 border border-warm-200/90 dark:border-warm-700/80 shadow-xs">
            <Zap className="w-3.5 h-3.5 text-amber-500" /> Sin límites ni esperas
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-warm-900/90 border border-warm-200/90 dark:border-warm-700/80 shadow-xs">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" /> 100% Gratis para siempre
          </span>
        </div>

        {/* Interactive Dropzone & File Management Section */}
        <div id="conversor" className="mt-8 sm:mt-10 w-full max-w-3xl mx-auto">
          {showCelebration && allCompleted ? (
            <CelebrationModal completedFiles={completedFiles} onReset={handleReset} />
          ) : (
            <div className="w-full">
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
              </div>
            )}
        </div>
      </section>

      {/* Trust Badges Section */}
      <TrustBadges />

      {/* Popular Tools Grid */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-warm-900 dark:text-warm-50 tracking-tight">
              Todas las conversiones y utilidades que necesitas
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-warm-600 dark:text-warm-400">
              Partiendo desde Word o PDF hacia cualquier formato común, sin costo y con privacidad absoluta.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div
                key={index}
                onClick={tool.action}
                className="group relative p-6 rounded-3xl bg-white dark:bg-warm-900 border border-warm-200/90 dark:border-warm-800 shadow-warm hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-pointer"
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

                <div className="mt-5 pt-4 border-t border-warm-100 dark:border-warm-800/80 flex items-center justify-between text-xs">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-warm-100/90 dark:bg-warm-800/90 font-bold text-warm-700 dark:text-warm-300 border border-warm-200/50 dark:border-warm-700/50">
                    <span>{tool.from}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-warm-400 dark:text-warm-500" />
                    <span className="text-brand-coral dark:text-amber-300 font-extrabold">{tool.to}</span>
                  </div>
                  <span className="text-xs font-semibold text-warm-600 dark:text-warm-300 group-hover:text-brand-coral group-hover:translate-x-0.5 transition-all inline-flex items-center gap-1">
                    Probar gratis <ArrowRight className="w-3.5 h-3.5 text-brand-coral" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Real-Life Human Stories Section */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-xs font-bold text-rose-700 dark:text-rose-300 mb-3">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Creado para resolver situaciones reales</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-warm-950 dark:text-warm-50 tracking-tight">
            Diseñado para personas reales y momentos del día a día
          </h2>
          <p className="mt-2 text-sm sm:text-base text-warm-600 dark:text-warm-300 max-w-2xl mx-auto">
            Sin barreras artificiales ni sorpresas desagradables. Pensado con empatía para cuando el tiempo o la privacidad apremia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-warm-900/90 border border-warm-200/90 dark:border-warm-800 shadow-warm flex flex-col justify-between hover:shadow-warm-lg transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-brand-amber flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-brand-coral" />
              </div>
              <h3 className="text-lg font-bold text-warm-900 dark:text-warm-50 mb-2">
                Para Estudiantes e Investigadores
              </h3>
              <p className="text-sm text-warm-600 dark:text-warm-300 leading-relaxed">
                A las 2:00 a.m. antes de entregar tu tesis o trabajo práctico no necesitas una pantalla que te diga <em className="text-warm-800 dark:text-warm-200">"has alcanzado el límite de 2 conversiones gratis"</em>. Convierte tus trabajos sin límites, sin marcas de agua y sin estrés.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-warm-100 dark:border-warm-800 text-xs font-semibold text-warm-500 dark:text-warm-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Cero marcas de agua molestas
            </div>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-warm-900/90 border border-warm-200/90 dark:border-warm-800 shadow-warm flex flex-col justify-between hover:shadow-warm-lg transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-warm-900 dark:text-warm-50 mb-2">
                Para Profesionales y Consultores
              </h3>
              <p className="text-sm text-warm-600 dark:text-warm-300 leading-relaxed">
                Contratos de confidencialidad, balances contables y nóminas nunca deben viajar a servidores de terceros no verificados. En LibreConvert el código se ejecuta en tu navegador: garantía física de privacidad para tus clientes.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-warm-100 dark:border-warm-800 text-xs font-semibold text-warm-500 dark:text-warm-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Privacidad garantizada por arquitectura
            </div>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-warm-900/90 border border-warm-200/90 dark:border-warm-800 shadow-warm flex flex-col justify-between hover:shadow-warm-lg transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-warm-900 dark:text-warm-50 mb-2">
                Para Trámites del Día a Día
              </h3>
              <p className="text-sm text-warm-600 dark:text-warm-300 leading-relaxed">
                ¿El portal del gobierno te pide tu CV o DNI en PDF de menos de 2 MB? Convierte fotos de tu carnet, extrae páginas o compacta documentos en 3 segundos sin tener que crear otra cuenta ni recordar otra contraseña.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-warm-100 dark:border-warm-800 text-xs font-semibold text-warm-500 dark:text-warm-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Sin registro ni spam a tu correo
            </div>
          </div>
        </div>
      </section>

      {/* Human Philosophy / Creator's Manifesto */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-warm-900/90 border border-warm-200 dark:border-warm-700/80 shadow-warm relative overflow-hidden">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/80 border border-amber-300/40 dark:border-amber-700/50 text-brand-coral mx-auto mb-4 shadow-inner">
            <Heart className="w-7 h-7 fill-brand-coral/20" />
          </div>

          <span className="text-xs uppercase tracking-widest font-black text-brand-coral mb-2 block">
            Nuestra Filosofía y Compromiso
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-warm-950 dark:text-white mb-4 tracking-tight">
            La tecnología debe ayudarte, no pedirte tu tarjeta de crédito
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-warm-700 dark:text-warm-200 leading-relaxed max-w-2xl mx-auto font-normal text-left sm:text-center">
            <p>
              Casi todas las páginas de conversión en internet hacen lo mismo: te dejan convertir un archivo y al segundo te bloquean pidiéndote una suscripción de $15 al mes, o peor aún, suben tus facturas y contratos privados a servidores remotos donde nadie sabe qué hacen con tus datos.
            </p>
            <p>
              Construimos <strong className="text-warm-950 dark:text-white font-extrabold underline decoration-brand-amber decoration-2">LibreConvert</strong> como la herramienta que nosotros mismos queríamos usar: rápida, ética, sin anuncios invasivos, sin registros forzados y donde <strong className="text-warm-950 dark:text-white font-extrabold">el 100% del procesamiento ocurre en tu navegador</strong>.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-warm-200/80 dark:border-warm-800 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-semibold text-warm-700 dark:text-warm-300">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Código transparente
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Cero rastreo comercial
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Hecho con ❤️ para las personas
            </span>
          </div>
        </div>
      </section>

      {/* Modal de Utilidades PDF */}
      <PdfToolsModal
        isOpen={toolsModalOpen}
        initialTool={selectedTool}
        onClose={() => setToolsModalOpen(false)}
      />
    </div>
  );
}

"use client";

import React from "react";
import { ManagedFile } from "@/hooks/useFileHandler";
import { FormatSelector } from "./FormatSelector";
import { ConversionProgress } from "./ConversionProgress";
import { formatFileSize } from "@/lib/utils";
import {
  FileText,
  Image as ImageIcon,
  FileSpreadsheet,
  FileCode,
  File,
  X,
  CheckCircle2,
  AlertCircle,
  Download,
} from "lucide-react";

interface FileCardProps {
  managedFile: ManagedFile;
  onRemove: (id: string) => void;
  onFormatChange: (id: string, format: string) => void;
}

export function FileCard({
  managedFile,
  onRemove,
  onFormatChange,
}: FileCardProps) {
  const { id, name, size, ext, targetFormat, status, progress, resultUrl, error } =
    managedFile;

  const getFileIcon = (fileExt: string) => {
    switch (fileExt.toLowerCase()) {
      case "docx":
      case "doc":
        return <FileText className="w-6 h-6 text-blue-500" />;
      case "pdf":
        return <FileText className="w-6 h-6 text-brand-coral" />;
      case "jpg":
      case "jpeg":
      case "png":
      case "webp":
        return <ImageIcon className="w-6 h-6 text-emerald-500" />;
      case "xlsx":
        return <FileSpreadsheet className="w-6 h-6 text-teal-600" />;
      case "txt":
      case "html":
        return <FileCode className="w-6 h-6 text-amber-500" />;
      default:
        return <File className="w-6 h-6 text-warm-500" />;
    }
  };

  return (
    <div className="w-full p-4 sm:p-5 rounded-3xl bg-white dark:bg-warm-900 border border-warm-200/90 dark:border-warm-800 shadow-sm hover:shadow-warm transition-all duration-200 flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Icon & Info */}
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-warm-100 dark:bg-warm-800/80 flex items-center justify-center shrink-0">
            {getFileIcon(ext)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm sm:text-base font-bold text-warm-900 dark:text-warm-100 truncate" title={name}>
              {name}
            </p>
            <div className="flex items-center gap-2 text-xs text-warm-500 mt-0.5">
              <span>{formatFileSize(size)}</span>
              <span>•</span>
              <span className="uppercase font-semibold text-[11px] px-1.5 py-0.5 rounded-lg bg-warm-100 dark:bg-warm-800 text-warm-700 dark:text-warm-300">
                {ext}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Controls & Status */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          {status === "idle" && (
            <FormatSelector
              sourceExt={ext}
              targetFormat={targetFormat}
              onChange={(newFormat) => onFormatChange(id, newFormat)}
            />
          )}

          {status === "completed" && resultUrl && (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Listo
              </span>
              <a
                href={resultUrl}
                download={`libreconvert-${name.replace(/\.[^/.]+$/, "")}.${targetFormat}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold shadow-sm hover:scale-105 active:scale-95 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Descargar</span>
              </a>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-end gap-0.5">
              <div className="flex items-center gap-1.5 text-xs text-rose-500 font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Error en conversión</span>
              </div>
              {error && (
                <span className="text-[11px] text-rose-500/80 dark:text-rose-400/90 max-w-[200px] sm:max-w-xs text-right truncate" title={error}>
                  {error}
                </span>
              )}
            </div>
          )}

          {/* Remove Button */}
          {status !== "converting" && (
            <button
              type="button"
              onClick={() => onRemove(id)}
              className="p-1.5 rounded-xl text-warm-400 hover:text-warm-700 dark:hover:text-warm-200 hover:bg-warm-100 dark:hover:bg-warm-800 transition-colors"
              title="Eliminar archivo"
              aria-label="Eliminar archivo"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar Display while converting */}
      {status === "converting" && (
        <div className="pt-2">
          <ConversionProgress progress={progress} />
        </div>
      )}
    </div>
  );
}

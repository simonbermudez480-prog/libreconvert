"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileText, Image as ImageIcon, Sparkles, AlertTriangle } from "lucide-react";

interface DropzoneProps {
  onFilesAdded: (files: FileList | File[]) => void;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
  notice?: string | null;
  onClearNotice?: () => void;
}

export function Dropzone({
  onFilesAdded,
  isDragging,
  setIsDragging,
  notice,
  onClearNotice,
}: DropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesAdded(e.dataTransfer.files);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesAdded(e.target.files);
      // Reset input so same file can be selected again if needed
      e.target.value = "";
    }
  };

  return (
    <div className="w-full">
      {/* Notice alert */}
      <AnimatePresence>
        {notice && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 text-amber-800 dark:text-amber-200 text-xs sm:text-sm flex items-center justify-between gap-3 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-brand-coral shrink-0" />
              <span>{notice}</span>
            </div>
            {onClearNotice && (
              <button
                type="button"
                onClick={onClearNotice}
                className="text-xs font-bold underline hover:opacity-80"
              >
                Cerrar
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        whileHover={{ scale: 1.008 }}
        whileTap={{ scale: 0.995 }}
        animate={{
          borderColor: isDragging ? "#F97316" : "",
          backgroundColor: isDragging ? "rgba(249, 115, 22, 0.05)" : "",
        }}
        className={`relative cursor-pointer p-8 sm:p-14 rounded-4xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center shadow-warm group ${
          isDragging
            ? "border-brand-coral bg-brand-coral/5 shadow-glow"
            : "border-warm-300/80 dark:border-warm-700 bg-white/80 dark:bg-warm-900/60 hover:border-brand-coral/60 hover:bg-warm-50/50 dark:hover:bg-warm-900"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.doc,.jpg,.jpeg,.png,.webp,.xlsx,.txt,.html"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Floating icon */}
        <motion.div
          animate={isDragging ? { y: -8, scale: 1.1 } : { y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-brand-amber via-brand-coral to-brand-rose p-1 shadow-warm mb-5 group-hover:scale-105 transition-transform"
        >
          <div className="w-full h-full bg-white dark:bg-warm-900 rounded-[22px] flex items-center justify-center text-brand-coral">
            <UploadCloud className="w-8 h-8 sm:w-10 sm:h-10 text-brand-coral" />
          </div>
        </motion.div>

        {/* Text */}
        <h3 className="text-xl sm:text-2xl font-black text-warm-900 dark:text-warm-100 tracking-tight">
          Arrastra y suelta tus archivos aquí
        </h3>
        <p className="mt-2 text-sm sm:text-base text-warm-600 dark:text-warm-400 max-w-md leading-relaxed">
          o <span className="text-brand-coral font-bold underline">haz clic para elegir</span> desde tu ordenador
        </p>

        {/* Ctrl+V Hint */}
        <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-warm-100 dark:bg-warm-800/80 border border-warm-200 dark:border-warm-700/60 text-xs font-semibold text-warm-700 dark:text-warm-300">
          <Sparkles className="w-3.5 h-3.5 text-brand-amber" />
          <span>Atajo directo: También puedes presionar <strong>Ctrl + V</strong> para pegar</span>
        </div>

        {/* Format Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-md">
          {["Word (.docx)", "PDF (.pdf)", "JPG / PNG", "Excel (.xlsx)", "Texto (.txt)"].map(
            (format, i) => (
              <span
                key={i}
                className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-warm-100/80 dark:bg-warm-800 text-warm-600 dark:text-warm-300 border border-warm-200/60 dark:border-warm-700/40"
              >
                {format}
              </span>
            )
          )}
        </div>
      </motion.div>
    </div>
  );
}

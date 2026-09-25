"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2, CheckCircle2 } from "lucide-react";

interface ConversionProgressProps {
  progress: number;
  stageMessage?: string;
  isComplete?: boolean;
}

export function getEmpatheticMicrocopy(progress: number): string {
  if (progress <= 25) {
    return "Examinando la estructura de tu documento con cariño...";
  }
  if (progress <= 55) {
    return "Traduciendo tipografías, párrafos y tablas...";
  }
  if (progress <= 85) {
    return "Dando los toques finales a la maqueta...";
  }
  if (progress < 100) {
    return "Asegurando la máxima nitidez y fidelidad...";
  }
  return "¡Todo listo! Tu nuevo documento ha quedado perfecto.";
}

export function ConversionProgress({
  progress,
  stageMessage,
  isComplete = false,
}: ConversionProgressProps) {
  const displayMessage = stageMessage || getEmpatheticMicrocopy(progress);

  return (
    <div className="w-full p-4 sm:p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 shadow-sm transition-all">
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-warm-900 dark:text-warm-100 min-w-0">
          {isComplete ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          ) : (
            <Loader2 className="w-4 h-4 text-brand-coral animate-spin shrink-0" />
          )}
          <span className="truncate">{displayMessage}</span>
        </div>
        <span className="text-xs sm:text-sm font-extrabold text-brand-coral shrink-0">
          {progress}%
        </span>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full h-3 bg-warm-200/70 dark:bg-warm-800 rounded-full overflow-hidden p-0.5">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-amber via-brand-coral to-brand-rose"
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(5, progress)}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      {/* Encouraging sub-note */}
      <div className="mt-2.5 flex items-center justify-between text-[11px] text-warm-500 dark:text-warm-400">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-brand-amber" />
          Procesado localmente en tu memoria RAM
        </span>
        <span>Cero envío a la nube</span>
      </div>
    </div>
  );
}

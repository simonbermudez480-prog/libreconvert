"use client";

import React from "react";
import { getAvailableTargetFormats } from "@/hooks/useFileHandler";
import { ArrowRight, ChevronDown } from "lucide-react";

interface FormatSelectorProps {
  sourceExt: string;
  targetFormat: string;
  onChange: (newFormat: string) => void;
  disabled?: boolean;
}

export function FormatSelector({
  sourceExt,
  targetFormat,
  onChange,
  disabled = false,
}: FormatSelectorProps) {
  const formats = getAvailableTargetFormats(sourceExt);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-warm-500 uppercase tracking-wider hidden sm:inline">
        Convertir a:
      </span>
      <div className="relative inline-block">
        <select
          value={targetFormat}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="appearance-none bg-warm-100 hover:bg-warm-200/80 dark:bg-warm-800 dark:hover:bg-warm-700/80 text-warm-900 dark:text-warm-100 text-xs sm:text-sm font-bold py-1.5 pl-3 pr-8 rounded-xl border border-warm-300/60 dark:border-warm-700 focus:outline-none focus:ring-2 focus:ring-brand-coral/40 transition-colors cursor-pointer disabled:opacity-50"
        >
          {formats.map((fmt) => (
            <option key={fmt.value} value={fmt.value}>
              {fmt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-warm-600 dark:text-warm-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
}

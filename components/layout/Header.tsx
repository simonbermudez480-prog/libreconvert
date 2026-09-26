"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, FileText, ArrowRightLeft } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-warm-50/80 dark:bg-warm-950/80 border-b border-warm-200/60 dark:border-warm-800/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-brand-amber via-brand-coral to-brand-rose p-0.5 shadow-warm group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-white dark:bg-warm-900 rounded-[14px] flex items-center justify-center text-brand-coral group-hover:rotate-6 transition-transform duration-200">
              <ArrowRightLeft className="w-5 h-5 text-brand-coral" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-warm-900 dark:text-warm-50 font-sans">
                Libre<span className="text-brand-coral">Convert</span>
              </span>
              <span className="hidden xs:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300/40">
                <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                100% Local
              </span>
            </div>
            <span className="text-[11px] font-medium text-warm-600 dark:text-warm-400 -mt-1 hidden sm:block">
              Conversor universal libre, rápido y privado
            </span>
          </div>
        </Link>

        {/* Quick Nav Links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          <Link
            href="/#conversor"
            className="px-3.5 py-1.5 rounded-xl text-sm font-medium text-warm-700 dark:text-warm-300 hover:text-warm-950 dark:hover:text-white hover:bg-warm-200/50 dark:hover:bg-warm-800/50 transition-colors"
          >
            Word a PDF
          </Link>
          <Link
            href="/#conversor"
            className="px-3.5 py-1.5 rounded-xl text-sm font-medium text-warm-700 dark:text-warm-300 hover:text-warm-950 dark:hover:text-white hover:bg-warm-200/50 dark:hover:bg-warm-800/50 transition-colors"
          >
            PDF a Word
          </Link>
          <Link
            href="/#conversor"
            className="px-3.5 py-1.5 rounded-xl text-sm font-medium text-warm-700 dark:text-warm-300 hover:text-warm-950 dark:hover:text-white hover:bg-warm-200/50 dark:hover:bg-warm-800/50 transition-colors"
          >
            PDF a Imágenes
          </Link>
        </nav>

        {/* Right Action / Privacy highlight & Theme */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <ThemeToggle />
          <div className="hidden xs:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-warm-200/50 dark:bg-warm-900 border border-warm-300/50 dark:border-warm-800 text-xs font-semibold text-warm-800 dark:text-warm-200">
            <Sparkles className="w-3.5 h-3.5 text-brand-amber animate-pulse" />
            <span>Siempre Gratis</span>
          </div>
        </div>
      </div>
    </header>
  );
}

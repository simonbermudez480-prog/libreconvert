"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart, ArrowRightLeft } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-warm-100 dark:bg-[#14110F] border-t border-warm-200 dark:border-warm-800/80 py-12 sm:py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12 mb-12">
          {/* Col 1: Brand & Philosophy */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-amber to-brand-coral flex items-center justify-center text-white shadow-sm">
                <ArrowRightLeft className="w-4 h-4" />
              </div>
              <span className="text-xl font-black text-warm-950 dark:text-white">
                Libre<span className="text-brand-coral">Convert</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-warm-700 dark:text-warm-200 max-w-md mb-4 font-normal">
              La alternativa libre, gratuita y privada para convertir tus documentos sin fricciones, sin límites abusivos y sin ceder tus datos a servidores desconocidos.
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-100/90 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700/60 text-xs font-semibold text-emerald-900 dark:text-emerald-200 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Garantía de privacidad: Cero archivos en la nube</span>
            </div>
          </div>

          {/* Col 2: Herramientas Populares */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-warm-950 dark:text-warm-100 mb-4">
              Conversiones Frecuentes
            </h4>
            <ul className="space-y-2.5 text-sm text-warm-700 dark:text-warm-300">
              <li>
                <Link href="/convertir/word-a-pdf" className="hover:text-brand-coral dark:hover:text-brand-amber transition-colors font-medium">
                  Word a PDF (.docx a .pdf)
                </Link>
              </li>
              <li>
                <Link href="/convertir/pdf-a-word" className="hover:text-brand-coral dark:hover:text-brand-amber transition-colors font-medium">
                  PDF a Word (.pdf a .docx)
                </Link>
              </li>
              <li>
                <Link href="/convertir/pdf-a-jpg" className="hover:text-brand-coral dark:hover:text-brand-amber transition-colors font-medium">
                  PDF a Imágenes (JPG / PNG)
                </Link>
              </li>
              <li>
                <Link href="/convertir/imagenes-a-pdf" className="hover:text-brand-coral dark:hover:text-brand-amber transition-colors font-medium">
                  Imágenes a PDF
                </Link>
              </li>
              <li>
                <Link href="/convertir/pdf-a-excel" className="hover:text-brand-coral dark:hover:text-brand-amber transition-colors font-medium">
                  PDF a Excel (.xlsx)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Compromiso & Información */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-warm-950 dark:text-warm-100 mb-4">
              Compromiso Humano
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="block text-warm-900 dark:text-warm-100 font-bold">100% Gratis para siempre</span>
                <span className="text-xs text-warm-600 dark:text-warm-400">Sin costos ocultos ni paywalls</span>
              </li>
              <li>
                <span className="block text-warm-900 dark:text-warm-100 font-bold">Sin límite de uso</span>
                <span className="text-xs text-warm-600 dark:text-warm-400">Convierte sin restricciones</span>
              </li>
              <li>
                <span className="block text-warm-900 dark:text-warm-100 font-bold">Tecnología Wasm / Local</span>
                <span className="text-xs text-warm-600 dark:text-warm-400">Máxima velocidad y seguridad</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-warm-200 dark:border-warm-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-warm-600 dark:text-warm-400">
          <p>© {new Date().getFullYear()} LibreConvert. Todos los derechos liberados para la comunidad.</p>
          <p className="flex items-center gap-1">
            Creado con <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> para un internet más útil y respetuoso.
          </p>
        </div>
      </div>
    </footer>
  );
}

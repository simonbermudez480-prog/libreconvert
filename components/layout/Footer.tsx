"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart, ArrowRightLeft } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-warm-100/70 dark:bg-warm-950 border-t border-warm-200/80 dark:border-warm-800/80 py-12 sm:py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12 mb-12">
          {/* Col 1: Brand & Philosophy */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-amber to-brand-coral flex items-center justify-center text-white">
                <ArrowRightLeft className="w-4 h-4" />
              </div>
              <span className="text-xl font-black text-warm-900 dark:text-warm-100">
                Libre<span className="text-brand-coral">Convert</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-warm-600 dark:text-warm-400 max-w-md mb-4">
              La alternativa libre, gratuita y privada para convertir tus documentos sin fricciones, sin límites abusivos y sin ceder tus datos a servidores desconocidos.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300/40 text-xs font-medium text-emerald-800 dark:text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Garantía de privacidad: Cero archivos en la nube</span>
            </div>
          </div>

          {/* Col 2: Herramientas Populares */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-warm-900 dark:text-warm-200 mb-4">
              Conversiones Frecuentes
            </h4>
            <ul className="space-y-2.5 text-sm text-warm-600 dark:text-warm-400">
              <li>
                <Link href="/#conversor" className="hover:text-brand-coral transition-colors">
                  Word a PDF (.docx a .pdf)
                </Link>
              </li>
              <li>
                <Link href="/#conversor" className="hover:text-brand-coral transition-colors">
                  PDF a Word (.pdf a .docx)
                </Link>
              </li>
              <li>
                <Link href="/#conversor" className="hover:text-brand-coral transition-colors">
                  PDF a Imágenes (JPG / PNG)
                </Link>
              </li>
              <li>
                <Link href="/#conversor" className="hover:text-brand-coral transition-colors">
                  Imágenes a PDF
                </Link>
              </li>
              <li>
                <Link href="/#conversor" className="hover:text-brand-coral transition-colors">
                  PDF a Excel (.xlsx)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Compromiso & Información */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-warm-900 dark:text-warm-200 mb-4">
              Compromiso Humano
            </h4>
            <ul className="space-y-2.5 text-sm text-warm-600 dark:text-warm-400">
              <li>
                <span className="block text-warm-700 dark:text-warm-300 font-medium">100% Gratis para siempre</span>
                <span className="text-xs text-warm-500">Sin costos ocultos ni paywalls</span>
              </li>
              <li>
                <span className="block text-warm-700 dark:text-warm-300 font-medium">Sin límite de uso</span>
                <span className="text-xs text-warm-500">Convierte sin restricciones</span>
              </li>
              <li>
                <span className="block text-warm-700 dark:text-warm-300 font-medium">Tecnología Wasm / Local</span>
                <span className="text-xs text-warm-500">Máxima velocidad y seguridad</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-warm-200 dark:border-warm-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-warm-500 dark:text-warm-400">
          <p>© {new Date().getFullYear()} LibreConvert. Todos los derechos liberados para la comunidad.</p>
          <p className="flex items-center gap-1">
            Creado con <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> para un internet más útil y respetuoso.
          </p>
        </div>
      </div>
    </footer>
  );
}

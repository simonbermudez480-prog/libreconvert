import React from "react";
import { ConversionMeta } from "@/lib/seo/matrix";
import { Sparkles, ShieldCheck, Zap, Lock, Cpu } from "lucide-react";

interface GeoDirectAnswerProps {
  meta: ConversionMeta;
}

export function GeoDirectAnswer({ meta }: GeoDirectAnswerProps) {
  return (
    <article
      itemScope
      itemType="https://schema.org/Question"
      className="bg-gradient-to-br from-amber-500/10 via-brand-amber/5 to-brand-coral/10 dark:from-warm-900/60 dark:to-warm-950/80 border border-brand-amber/30 dark:border-amber-800/40 rounded-3xl p-6 sm:p-8 relative overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-brand-amber text-white flex items-center justify-center flex-shrink-0 shadow-sm">
          <Sparkles className="w-6 h-6" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-amber-dark dark:text-brand-amber mb-1.5">
            <span>Respuesta Directa de IA</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-amber inline-block" />
            <span>GEO Optimizado</span>
          </div>

          <h2
            itemProp="name"
            className="text-xl sm:text-2xl font-black text-stone-800 dark:text-stone-100 mb-3"
          >
            ¿Cómo {meta.h1.toLowerCase()} de forma gratuita y privada?
          </h2>

          <div
            itemProp="acceptedAnswer"
            itemScope
            itemType="https://schema.org/Answer"
            className="text-stone-700 dark:text-stone-200 text-sm sm:text-base leading-relaxed mb-6"
          >
            <p itemProp="text">{meta.directAnswer}</p>
          </div>

          {/* Quick Technical Specs Grid (Highly parsable by LLMs) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-5 border-t border-brand-amber/20 dark:border-amber-800/30">
            {meta.technicalSpecs.map((spec, idx) => (
              <div
                key={idx}
                className="bg-white/90 dark:bg-warm-800/80 backdrop-blur-sm rounded-xl p-3 text-center border border-amber-200/50 dark:border-amber-900/30 shadow-xs"
              >
                <span className="block text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-300 font-bold">
                  {spec.label}
                </span>
                <span className="block text-xs sm:text-sm font-extrabold text-stone-900 dark:text-white mt-1">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

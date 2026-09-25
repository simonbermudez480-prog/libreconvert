"use client";

import React from "react";
import { ShieldCheck, Zap, HeartHandshake } from "lucide-react";

export function TrustBadges() {
  const badges = [
    {
      icon: ShieldCheck,
      color: "from-emerald-500 to-teal-600",
      iconBg: "bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400",
      title: "100% Privado en tu Equipo",
      description:
        "Tus documentos nunca viajan a servidores remotos. El motor convierte todo localmente en tu propio navegador.",
    },
    {
      icon: HeartHandshake,
      color: "from-brand-amber to-brand-coral",
      iconBg: "bg-amber-100 dark:bg-amber-950/70 text-brand-coral",
      title: "Completamente Gratis",
      description:
        "Sin suscripciones sorpresa, sin solicitar tarjeta de crédito y sin muros de pago engañosos. Libre para todos.",
    },
    {
      icon: Zap,
      color: "from-blue-500 to-indigo-600",
      iconBg: "bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400",
      title: "Sin Límites Diarios",
      description:
        "Convierte todos los documentos que quieras sin topes artificiales de '3 archivos al día' ni tiempos de espera forzados.",
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 my-12 sm:my-16">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-warm-900 dark:text-warm-100 tracking-tight">
          Diseñado para personas, con respeto total a tu privacidad
        </h2>
        <p className="mt-2 text-sm sm:text-base text-warm-600 dark:text-warm-400 max-w-2xl mx-auto">
          No almacenamos, no leemos ni compartimos tus archivos. La tecnología corre directamente en tu dispositivo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {badges.map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <div
              key={idx}
              className="relative group p-6 sm:p-7 rounded-3xl bg-white dark:bg-warm-900/90 border border-warm-200/80 dark:border-warm-800 shadow-warm hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-2xl ${badge.iconBg} flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-200`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-warm-900 dark:text-warm-100 mb-2">
                {badge.title}
              </h3>
              <p className="text-sm leading-relaxed text-warm-600 dark:text-warm-400">
                {badge.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

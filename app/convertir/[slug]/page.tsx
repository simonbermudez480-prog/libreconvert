import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CONVERSION_MATRIX, ALL_SLUGS } from "@/lib/seo/matrix";
import { DedicatedConverter } from "@/components/conversion/DedicatedConverter";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { JsonLd } from "@/components/seo/JsonLd";
import { GeoDirectAnswer } from "@/components/seo/GeoDirectAnswer";
import { FaqAccordion } from "@/components/seo/FaqAccordion";
import {
  ChevronRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  FileText,
  Lock,
  Zap,
} from "lucide-react";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const meta = CONVERSION_MATRIX[params.slug];
  if (!meta) return {};

  const canonicalUrl = `https://libreconvert.com/convertir/${meta.slug}`;

  return {
    title: meta.title,
    description: meta.metaDescription,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "es-ES": canonicalUrl,
        "es-MX": canonicalUrl,
        "es-CO": canonicalUrl,
        "es-AR": canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.metaDescription,
      url: canonicalUrl,
      siteName: "LibreConvert",
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.metaDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function ConversionPage({ params }: PageProps) {
  const meta = CONVERSION_MATRIX[params.slug];

  if (!meta) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-stone-50/50 dark:bg-warm-950 pb-20">
      {/* Schema.org Injections */}
      <JsonLd meta={meta} />

      {/* Top Breadcrumb Navigation */}
      <div className="border-b border-stone-200/60 dark:border-stone-800 bg-white/70 dark:bg-warm-900/70 backdrop-blur-sm sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center gap-2 text-xs sm:text-sm text-stone-500 dark:text-stone-400 overflow-x-auto">
          <Link
            href="/"
            className="hover:text-brand-coral transition-colors flex items-center gap-1 font-medium"
          >
            Inicio
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
          <span className="text-stone-400">Convertir</span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
          <span className="text-stone-800 dark:text-stone-200 font-semibold truncate">
            {meta.fromFormat} a {meta.toFormat}
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-8 sm:pt-12">
        {/* Converter Card Section */}
        <div className="mb-12">
          <DedicatedConverter meta={meta} />
        </div>

        {/* Trust Badges */}
        <div className="mb-16">
          <TrustBadges />
        </div>

        {/* Step by Step How-To Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-800 dark:text-stone-100">
              ¿Cómo {meta.h1.toLowerCase()} en 3 simples pasos?
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-sm sm:text-base mt-1.5">
              Sin registros, sin esperas y sin instalar programas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {meta.howToSteps.map((step) => (
              <div
                key={step.step}
                className="bg-white dark:bg-warm-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-sm relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-3 right-4 text-5xl font-black text-stone-100 dark:text-stone-800/60 select-none">
                  {step.step}
                </div>
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-amber/15 text-brand-amber-dark dark:text-brand-amber font-bold text-lg flex items-center justify-center mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100 mb-2">
                    {step.name}
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GEO Direct Answer Section (Generative Engine Optimization) */}
        <section className="mb-16">
          <GeoDirectAnswer meta={meta} />
        </section>

        {/* Key Features Grid */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-800 dark:text-stone-100">
              ¿Por qué elegir LibreConvert para {meta.toFormat}?
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-sm sm:text-base mt-1.5">
              La alternativa moderna, privada y ética frente a las herramientas tradicionales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {meta.features.map((feat, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-warm-900 rounded-3xl p-6 border border-stone-200/80 dark:border-stone-800 shadow-sm flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-emerald/15 text-brand-emerald flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-800 dark:text-stone-100 mb-1">
                    {feat.title}
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs Section with Animated Accessible Accordion */}
        <section className="mb-16">
          <FaqAccordion
            faqs={meta.faqs}
            title="Preguntas Frecuentes"
            subtitle={`Todo lo que necesitas saber sobre la conversión de ${meta.fromFormat} a ${meta.toFormat}.`}
          />
        </section>

        {/* Related Conversions (Internal Linking Mesh) */}
        {meta.relatedSlugs.length > 0 && (
          <section className="mt-16 pt-12 border-t border-stone-200 dark:border-stone-800">
            <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100 mb-6 text-center sm:text-left">
              Otras herramientas que te pueden interesar
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {meta.relatedSlugs.map((slug) => {
                const rel = CONVERSION_MATRIX[slug];
                if (!rel) return null;
                return (
                  <Link
                    key={slug}
                    href={`/convertir/${slug}`}
                    className="p-3.5 bg-white dark:bg-warm-900 hover:bg-stone-50 dark:hover:bg-warm-850 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-brand-amber/50 shadow-sm transition-all group flex flex-col justify-between"
                  >
                    <span className="text-xs font-semibold text-stone-700 dark:text-stone-300 group-hover:text-brand-coral transition-colors">
                      {rel.fromFormat} a {rel.toFormat}
                    </span>
                    <span className="text-[11px] text-stone-400 mt-2 flex items-center gap-1">
                      Convertir gratis{" "}
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

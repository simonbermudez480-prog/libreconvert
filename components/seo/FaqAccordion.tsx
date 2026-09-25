"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
  title?: string;
  subtitle?: string;
}

export function FaqAccordion({
  faqs,
  title = "Preguntas Frecuentes",
  subtitle = "Todo lo que necesitas saber sobre esta herramienta",
}: FaqAccordionProps) {
  // Track open indexes. Default: first item is open
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggleIndex = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section className="w-full">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-800 dark:text-stone-100 flex items-center justify-center gap-2">
          <HelpCircle className="w-7 h-7 text-brand-coral" />
          {title}
        </h2>
        {subtitle && (
          <p className="text-stone-500 dark:text-stone-400 text-sm sm:text-base mt-1.5">
            {subtitle}
          </p>
        )}
      </div>

      <div className="space-y-4 max-w-3xl mx-auto">
        {faqs.map((faq, idx) => {
          const isOpen = openIndexes.includes(idx);
          const contentId = `faq-content-${idx}`;
          const headerId = `faq-header-${idx}`;

          return (
            <div
              key={idx}
              className="bg-white dark:bg-warm-900 rounded-2xl border border-stone-200/90 dark:border-stone-800 shadow-sm overflow-hidden transition-all duration-200"
            >
              <button
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => toggleIndex(idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-stone-50/70 dark:hover:bg-warm-850 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber"
              >
                <span className="text-base sm:text-lg font-bold text-stone-800 dark:text-stone-100">
                  {faq.question}
                </span>
                <span
                  className={`w-8 h-8 rounded-full bg-stone-100 dark:bg-warm-800 flex items-center justify-center text-stone-500 dark:text-stone-400 flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-brand-coral bg-brand-coral/10" : ""
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed border-t border-stone-100 dark:border-stone-800/60">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

# Roadmap: LibreConvert

## Overview

LibreConvert es una plataforma web 100% gratuita y privada para la conversión bidireccional de documentos (iniciando con Word <-> PDF y expandiéndose a imágenes, hojas de cálculo y utilidades PDF). Este roadmap guía la construcción desde la base visual humana y reactiva, pasando por el motor de conversión en Web Workers (Wasm/JS), la suite multiformato, la arquitectura de Programmatic SEO & GEO para dominar las búsquedas y respuestas de IA, hasta el pulido final de rendimiento y experiencia.

## Phases

- [ ] **Phase 1: Arquitectura Base & Sistema de Diseño Humano** - Configuración de Next.js, Tailwind, Framer Motion y zona interactiva Drag & Drop.
- [ ] **Phase 2: Motor de Conversión Núcleo (Word <-> PDF)** - Conversión client-side de DOCX a PDF y PDF a DOCX en Web Workers con feedback empático.
- [ ] **Phase 3: Conversión Multiformato & Utilidades PDF** - Soporte de imágenes (JPG/PNG), Excel, Texto plano, Unir, Dividir y Comprimir PDFs.
- [ ] **Phase 4: Programmatic SEO Matrix, GEO & Geo-targeting** - Rutas dinámicas SSG, Schema.org enriquecido, optimización para motores de IA y sitemaps.
- [ ] **Phase 5: Pulido Visual, Micro-animaciones & Auditoría Core Web Vitals** - Interacciones de deleite, optimización extrema de rendimiento (Lighthouse 95+) y accesibilidad.

## Phase Details

### Phase 1: Arquitectura Base & Sistema de Diseño Humano
**Goal**: Crear la base tecnológica con Next.js App Router, sistema de diseño cálido, accesible y orgánico, y la zona de interacción principal de carga de archivos.
**Depends on**: Nothing (first phase)
**Requirements**: UX-01, UX-03, UX-05, UX-06
**Success Criteria** (what must be TRUE):
  1. El proyecto compila y se ejecuta en Next.js con Tailwind CSS y Framer Motion sin advertencias.
  2. La zona de carga (Drag & Drop) responde visualmente al arrastre de archivos, permite selector de archivos y soporta pegado directo con Ctrl+V.
  3. La interfaz luce cálida, humana y accesible en dispositivos móviles y de escritorio, con insignias de confianza visibles (100% Privado, $0 Costo, Ilimitado).
**Plans**: 2 plans

Plans:
- [ ] 01-01: Inicialización del proyecto Next.js con Tailwind, TypeScript, lucide-react y estructura base de componentes UI.
- [ ] 01-02: Implementación del componente Drag & Drop reactivo con micro-animaciones, validación de extensiones y soporte Ctrl+V.

---

### Phase 2: Motor de Conversión Núcleo (Word <-> PDF)
**Goal**: Implementar la conversión bidireccional entre Word (.docx) y PDF en el cliente utilizando Web Workers, garantizando privacidad absoluta y UI fluida.
**Depends on**: Phase 1
**Requirements**: CORE-01, CORE-02, CORE-07, CORE-08, UX-02, UX-04
**Success Criteria** (what must be TRUE):
  1. Un archivo .docx se convierte a .pdf directamente en el navegador preservando texto, tipografías y formato básico.
  2. Un archivo .pdf se convierte a .docx editable preservando párrafos y estructura de texto.
  3. El procesamiento ocurre en un Web Worker en segundo plano, manteniendo 60fps sin congelar la interfaz.
  4. La barra de progreso muestra microcopy humano y motivador, culminando en animación de confeti y descarga inmediata.
**Plans**: 2 plans

Plans:
- [ ] 02-01: Arquitectura de Web Workers y motor de conversión DOCX a PDF y PDF a DOCX en el navegador.
- [ ] 02-02: Integración de la UI de conversión con estados de progreso empáticos, microcopy dinámico y pantalla de descarga celebratoria.

---

### Phase 3: Conversión Multiformato & Utilidades PDF
**Goal**: Ampliar el ecosistema de conversión a todos los formatos derivados de Word/PDF y añadir utilidades esenciales de manipulación de documentos.
**Depends on**: Phase 2
**Requirements**: CORE-03, CORE-04, CORE-05, CORE-06, UTIL-01, UTIL-02, UTIL-03
**Success Criteria** (what must be TRUE):
  1. Conversión de PDF a JPG/PNG página por página y de imágenes a PDF con calidad configurable.
  2. Conversión de Word/PDF a texto plano (.txt) y HTML semántico.
  3. Extracción de tablas de PDF a hojas de cálculo (.xlsx / .csv).
  4. Herramientas cliente para unir (Merge) múltiples PDFs y dividir (Split) páginas específicas.
**Plans**: 3 plans

Plans:
- [ ] 03-01: Motor de conversión PDF <-> Imágenes (JPG, PNG) y PDF/Word a Texto/HTML.
- [ ] 03-02: Extracción de datos tabulares de PDF a formato Excel (.xlsx/.csv).
- [ ] 03-03: Utilidades cliente de PDF (Unir, Dividir y Comprimir) con interfaz visual de reordenamiento de páginas.

---

### Phase 4: Programmatic SEO Matrix, GEO & Geo-targeting
**Goal**: Desplegar la infraestructura de posicionamiento orgánico para dominar las SERPs de Google y las respuestas generativas de IA (GEO).
**Depends on**: Phase 3
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, GEO-01, GEO-02, GEO-03
**Success Criteria** (what must be TRUE):
  1. Generación estática (SSG) de todas las rutas de conversión (`/convertir/pdf-a-word`, `/convertir/word-a-pdf`, etc.) con metadata única y optimizada para CTR.
  2. Inyección de Schema.org estructurado (`SoftwareApplication`, `HowTo`, `FAQPage`, `BreadcrumbList`) validado sin errores.
  3. Bloques de contenido optimizados para GEO con respuestas directas, pasos claros y preguntas frecuentes en lenguaje natural para ChatGPT Search y Perplexity.
  4. Generación automática de `sitemap.xml` dinámico y archivo `robots.txt`.
**Plans**: 2 plans

Plans:
- [ ] 04-01: Motor de Programmatic SEO con rutas estáticas, generación de metadata, OpenGraph y breadcrumbs para cada par de conversión.
- [ ] 04-02: Implementación de marcado Schema.org, contenido optimizado para GEO (IA Answer Engines), FAQs y sitemap XML dinámico.

---

### Phase 5: Pulido Visual, Micro-animaciones & Auditoría Core Web Vitals
**Goal**: Elevar la experiencia estética para que se sienta verdaderamente humana, alegre y orgánica, alcanzando puntuaciones perfectas en Core Web Vitals.
**Depends on**: Phase 4
**Requirements**: UX-02, UX-04, UX-05, SEO-05
**Success Criteria** (what must be TRUE):
  1. Todas las micro-interacciones (hover, focus, drag, progreso, éxito) se sienten orgánicas, fluidas y cálidas.
  2. Puntuación Lighthouse >= 95 en Performance, Accesibilidad, Mejores Prácticas y SEO (LCP < 1.2s, CLS = 0).
  3. Modo oscuro y claro equilibrados con excelente contraste (WCAG AAA) y soporte completo para teclado y lectores de pantalla.
**Plans**: 1 plan

Plans:
- [ ] 05-01: Pulido visual de animaciones orgánicas, diseño responsivo, accesibilidad WCAG y auditoría Lighthouse de Core Web Vitals.

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Arquitectura Base & Sistema de Diseño Humano | 0/2 | Not started | - |
| 2. Motor de Conversión Núcleo (Word <-> PDF) | 0/2 | Not started | - |
| 3. Conversión Multiformato & Utilidades PDF | 0/3 | Not started | - |
| 4. Programmatic SEO Matrix, GEO & Geo-targeting | 0/2 | Not started | - |
| 5. Pulido Visual, Micro-animaciones & Auditoría Core Web Vitals | 0/1 | Not started | - |

---
*Roadmap defined: 2026-09-25*
*Last updated: 2026-09-25 after initialization*

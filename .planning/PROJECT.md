# LibreConvert - Conversor Gratuito de Documentos (PDF, Word & Más)

## What This Is

LibreConvert es una aplicación web moderna, dinámica y 100% gratuita para convertir archivos bidireccionalmente entre PDF, Word (DOCX) y múltiples formatos derivados (Excel, PowerPoint, Imágenes JPG/PNG, Texto plano, HTML, etc.). Todo el procesamiento ocurre directamente en el navegador del usuario (Client-Side con WebAssembly y JavaScript), garantizando costo de servidor $0 y privacidad absoluta (los documentos jamás salen de la máquina del usuario).

La plataforma está diseñada con una arquitectura hiperfocalizada en SEO y GEO (Generative Engine Optimization) para posicionarse como la opción #1 en Google, Bing y motores de búsqueda de IA (ChatGPT Search, Perplexity, Copilot), con una experiencia de usuario cálida, orgánica, llena de micro-animaciones fluidas y un trato verdaderamente humano.

## Core Value

Conversión instantánea, privada y gratuita de documentos (iniciando con el núcleo Word <-> PDF y sus derivados) con una interfaz hiper-dinámica, intuitiva y humana, sin registros, muros de pago ni límites de uso.

## Business Context

- **Customer**: Estudiantes, profesionales, empresas y cualquier usuario que necesite convertir documentos sin barreras, sin pagar suscripciones y con privacidad total.
- **Revenue model**: 100% gratuito para siempre. Al ejecutarse en el navegador con Wasm/Workers, el costo de infraestructura es $0 (alojable en Cloudflare Pages / Vercel Edge).
- **Success metric**: Posicionamiento #1 en SERPs para términos clave ("convertir pdf a word gratis", "word a pdf online", etc.), presencia destacada en respuestas de IA (GEO), tasa de rebote < 25% y puntuación Core Web Vitals > 95.
- **Strategy notes**: Enfoque en Programmatic SEO + GEO para captar tráfico orgánico masivo mediante landings optimizadas para cada par de conversión y región geográfica.

## Requirements

### Validated

- [x] **UX-01**: Zona de arrastrar y soltar (Drag and Drop) ultra-intuitiva con respuesta física visual, estados activos animados y soporte de pegado (Ctrl+V) de archivos. (Fase 1)
- [x] **UX-03**: Micro-animaciones fluidas con Framer Motion (transiciones de estado, animaciones de entrada/salida y micro-interacciones en botones). (Fase 1)
- [x] **UX-05**: Diseño 100% responsive (Mobile, Tablet y Desktop) con modo oscuro/claro y paleta de colores cálida y accesible (WCAG AAA). (Fase 1)
- [x] **UX-06**: Insignias visibles de confianza ("100% Privado: Tus archivos nunca salen de tu ordenador", "Sin registro", "Sin límites"). (Fase 1)
- [x] **CORE-01**: Conversión de Word (.docx) a PDF directamente en el navegador con preservación de formato, tipografía y tablas. (Fase 2)
- [x] **CORE-02**: Conversión de PDF a Word (.docx) editable en el navegador extrayendo textos, párrafos, encabezados y estilos. (Fase 2)
- [x] **CORE-07**: Ejecución de conversiones en segundo plano con seguimiento continuo de progreso (0% a 100%). (Fase 2)
- [x] **CORE-08**: 100% de procesamiento local: ningún archivo de usuario se envía a servidores de terceros. (Fase 2)
- [x] **UX-02**: Barra de progreso y estados de conversión animados con microcopy empático y humano. (Fase 2)
- [x] **UX-04**: Pantalla de descarga con celebración visual (confeti orgánico) y botón de descarga directa de 1 clic. (Fase 2)

### Active

- [ ] **Motor de Conversión Client-Side (Wasm/JS Workers)**: Conversión en el navegador para Word a PDF, PDF a Word, PDF a Imágenes (JPG/PNG), Imágenes a PDF, y extracción de texto/HTML sin tocar servidores externos.
- [ ] **Programmatic SEO Matrix**: Generación estática (SSG) de landings especializadas para cada combinación de conversión (`/convertir/pdf-a-word`, `/convertir/word-a-pdf`, etc.) con metadata dinámica, OpenGraph y breadcrumbs.
- [ ] **GEO (Generative Engine Optimization) & Structured Data**: Implementación de Schema.org (`SoftwareApplication`, `HowTo`, `FAQPage`), respuestas directas para snippets de IA (Perplexity, ChatGPT Search, Google SGE) y FAQs orientadas a intención de búsqueda.
- [ ] **Arquitectura GEO-Localizada & Multilingüe**: URLs y contenido adaptados al español nativo (España, México, Argentina, Colombia, etc.) con estructura base preparada para internacionalización (`hreflang`).
- [ ] **UI/UX Humana y Dinámica**: Zona drag-and-drop con física de fluidos y estados hover magnéticos, microcopy empático y motivador durante la carga ("Cuidando cada detalle de tu documento..."), barra de progreso animada y celebración con confeti al descargar.
- [ ] **Accesibilidad y Cero Fricción**: Uso inmediato en 1 clic sin registro, sin captcha intrusivo, diseño totalmente adaptativo (Mobile-First / Desktop) y modo oscuro/claro con estética orgánica y cálida.
- [ ] **Herramientas de Utilidad PDF Complementarias**: Funcionalidades cliente para unir PDFs, dividir PDFs, comprimir y rotar páginas.

### Out of Scope

- Servidores backend dedicados pesados con Docker/LibreOffice en v1 — Mantener la infraestructura en costo $0 y máxima privacidad en el cliente.
- Muros de pago (paywalls), límites artificiales de conversión diarios ("3 documentos gratis por día") o planes premium restrictivos.
- Cuentas de usuario obligatorias para convertir o descargar.

## Context

- **Ecosistema**: La mayoría de las herramientas existentes (iLovePDF, Smallpdf, Adobe Online) imponen límites diarios abusivos, suscripciones caras o suben los archivos a servidores remotos donde la privacidad se ve comprometida.
- **Ventaja Competitiva**: LibreConvert ofrece 100% privacidad (procesamiento local con Wasm/JS), velocidad instantánea, disponibilidad ilimitada y una experiencia visual alegre y cercana.
- **Tecnología Frontend**: Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion + Web Workers para mantener el hilo principal a 60-120fps durante las conversiones.

## Constraints

- **Presupuesto/Infraestructura**: Costo de servidor $0. Todo el cómputo pesado de conversión debe correr en el navegador del cliente mediante Web Workers o WebAssembly.
- **Rendimiento**: Core Web Vitals estrictos (LCP < 1.5s, CLS = 0, INP < 100ms) para garantizar ventajas SEO en Google.
- **Privacidad**: Cumplimiento nativo con RGPD / CCPA por diseño (los archivos no viajan por la red).

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Motor 100% Client-Side (Web Workers + Wasm) | Garantiza servicio 100% gratis para siempre sin facturas de servidor y ofrece privacidad total como imán de confianza y SEO | — Pending |
| Next.js App Router con Static Site Generation (SSG) | Máxima velocidad de carga, indexación perfecta para crawlers y optimización para motores de IA (GEO) | — Pending |
| Enfoque Programmatic SEO + GEO Multilingüe | Permite capturar miles de intenciones de búsqueda de cola larga para cada combinación de archivos y país | — Pending |
| Diseño Cálido y Orgánico con Framer Motion | Se desmarca de las herramientas corporativas grises, creando una conexión emocional y humana con el usuario | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-09-25 after initialization*

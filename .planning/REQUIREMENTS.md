# Requirements: LibreConvert

**Defined:** 2026-09-25  
**Core Value:** Conversión instantánea, privada y gratuita de documentos (Word <-> PDF y derivados) con una interfaz hiper-dinámica, intuitiva y humana, sin registros ni límites.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Core Conversion Engine (Client-Side Wasm/JS)

- [x] **CORE-01**: Conversión de Word (.docx) a PDF directamente en el navegador con preservación de formato, tipografía y tablas.
- [x] **CORE-02**: Conversión de PDF a Word (.docx) editable en el navegador extrayendo textos, párrafos, encabezados y estilos.
- [x] **CORE-03**: Conversión de PDF a imágenes (JPG, PNG) con selección de calidad y resolución por página.
- [x] **CORE-04**: Conversión de imágenes (JPG, PNG, WebP) a documento PDF consolidado o por página.
- [x] **CORE-05**: Conversión de Word y PDF a texto plano (.txt) y HTML semántico.
- [x] **CORE-06**: Conversión de PDF a hojas de cálculo (.xlsx / .csv) cuando el documento contiene tablas estructuradas.
- [x] **CORE-07**: Ejecución de conversiones en Web Workers en segundo plano para garantizar 60fps constantes en la interfaz sin congelamientos.
- [x] **CORE-08**: 100% de procesamiento local: ningún archivo de usuario se envía a servidores de terceros, garantizando privacidad y costo $0.

### Programmatic SEO & Web Performance

- [x] **SEO-01**: Arquitectura estática (Next.js SSG) con rutas indexables para cada par de conversión (`/convertir/pdf-a-word`, `/convertir/word-a-pdf`, `/convertir/pdf-a-jpg`, etc.).
- [x] **SEO-02**: Metadatos dinámicos únicos (Title, Meta Description, Canonical URLs, OpenGraph, Twitter Cards) por cada par de conversión optimizados para CTR.
- [x] **SEO-03**: Marcado Schema.org enriquecido (`SoftwareApplication`, `HowTo` con pasos paso a paso, `BreadcrumbList` y `FAQPage`).
- [x] **SEO-04**: Sitemap XML dinámico (`/sitemap.xml`) y directivas de rastreo (`robots.txt`) que priorizan las rutas de conversión clave.
- [x] **SEO-05**: Optimización extrema de Core Web Vitals (LCP < 1.2s, CLS = 0, INP < 100ms) con zero-JS payload innecesario en la carga inicial.

### GEO (Generative Engine Optimization) & Localización

- [x] **GEO-01**: Estructura de contenido semántico pensada para motores de respuesta IA (ChatGPT Search, Perplexity, Google SGE, Copilot) con definiciones concisas, bloques de respuesta directa y preguntas frecuentes (FAQs) con lenguaje natural.
- [x] **GEO-02**: Adaptación geográfica y cultural para el mercado hispanohablante (España, México, Colombia, Argentina, etc.) con términos de búsqueda locales.
- [x] **GEO-03**: Soporte de etiquetas `hreflang` y preparación para futura expansión multilingüe (inglés, portugués, francés).

### UI/UX Humana, Dinámica y Accesible

- [x] **UX-01**: Zona de arrastrar y soltar (Drag and Drop) ultra-intuitiva con respuesta física visual, estados activos animados y soporte de pegado (Ctrl+V) de archivos.
- [x] **UX-02**: Barra de progreso y estados de conversión animados con microcopy empático y humano ("Preparando tus páginas...", "Haciendo la magia...", "Todo listo para ti").
- [x] **UX-03**: Micro-animaciones fluidas con Framer Motion (transiciones de estado, animaciones de entrada/salida y micro-interacciones en botones).
- [x] **UX-04**: Pantalla de descarga con animación de éxito (confeti orgánico, previsualización rápida del archivo y botón de descarga directa de 1 clic).
- [x] **UX-05**: Diseño 100% responsive (Mobile, Tablet y Desktop) con modo oscuro/claro y paleta de colores cálida y accesible (WCAG AAA).
- [x] **UX-06**: Insignias visibles de confianza ("100% Privado: Tus archivos nunca salen de tu ordenador", "Sin registro", "Sin límites").

### Utilidades PDF Rápidas

- [x] **UTIL-01**: Unir múltiples archivos PDF en uno solo con ordenamiento visual interactivo.
- [x] **UTIL-02**: Dividir o extraer páginas de un documento PDF con vista previa de miniaturas.
- [x] **UTIL-03**: Comprimir/optimizar tamaño de PDF en el navegador.

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Formatos Avanzados

- **ADV-01**: Soporte para formatos EPUB, MOBI y Markdown.
- **ADV-02**: Reconocimiento óptico de caracteres (OCR) offline con Tesseract.js para PDFs escaneados.
- **ADV-03**: Firma digital de documentos PDF en el navegador.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Servidores pesados dedicados (Docker/LibreOffice) | Rompe la promesa de $0 costo de servidor y compromete la privacidad del usuario |
| Muros de pago o suscripciones de pago | El producto es 100% gratuito para siempre como estrategia de atracción masiva |
| Registro de usuarios obligatorio | Elimina la fricción de conversión instantánea |

## Traceability

Which phases cover which requirements.

| Requirement | Phase | Status |
|-------------|-------|--------|
| UX-01, UX-03, UX-05, UX-06 | Phase 1: Arquitectura Base & Sistema de Diseño Humano | Completed ✓ |
| CORE-01, CORE-02, CORE-07, CORE-08, UX-02, UX-04 | Phase 2: Motor de Conversión Núcleo (Word <-> PDF) | Completed ✓ |
| CORE-03, CORE-04, CORE-05, CORE-06, UTIL-01, UTIL-02, UTIL-03 | Phase 3: Conversión Multiformato & Utilidades PDF | Completed ✓ |
| SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, GEO-01, GEO-02, GEO-03 | Phase 4: Programmatic SEO Matrix, GEO & Geo-targeting | Completed ✓ |
| UX-02, UX-04, UX-05, SEO-05 | Phase 5: Pulido Visual, Micro-animaciones & Auditoría Core Web Vitals | Completed ✓ |

**Coverage:**
- v1 requirements: 23 total
- Mapped to phases: 23
- Unmapped: 0 ✓
- Completed: 23 of 23 (100%) ✓

---
*Requirements defined: 2026-09-25*
*Last updated: 2026-09-25 after initialization*

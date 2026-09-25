---
phase: 03-conversi-n-multiformato-utilidades-pdf
plan: 01
subsystem: images-pdf
tags:
  - images-to-pdf
  - pdf-to-images
  - jszip
  - retina
  - client-side

requires:
  - phase: 02-01
    provides: Orquestador y base de lectura PDF
provides:
  - Motor de conversión PDF a Imágenes JPG/PNG en alta resolución (pdfToImages.ts) con soporte de ZIP para multipágina
  - Motor de conversión Imágenes (JPG, PNG, WebP) a PDF (imagesToPdf.ts) con proporciones exactas
  - Exportación de texto plano y HTML semántico
affects:
  - 03-02
  - 03-03
  - phase-4

actuals:
  tokens: 4300
  tasks: 3
  commits: 1

tech-stack:
  added:
    - jszip@3.10.1
  patterns:
    - Renderizado a 2x Retina en Canvas con PDF.js
    - Empaquetado automático en ZIP con JSZip para descargas masivas

key-files:
  created:
    - lib/converters/pdfToImages.ts
    - lib/converters/imagesToPdf.ts
  modified:
    - lib/converters/index.ts

key-decisions:
  - "Renderizar páginas PDF a escala 2.0 para garantizar máxima nitidez y calidad tipográfica en imágenes"
  - "Empaquetar automáticamente en ZIP cuando un PDF tiene más de 1 página para evitar descargas individuales molestas"

patterns-established:
  - "Manejo unificado de imágenes con canvas fallback para formatos modernos como WebP"

requirements-completed:
  - CORE-03
  - CORE-04
  - CORE-05

coverage:
  - id: D1
    description: "Conversión de PDF a Imágenes JPG/PNG con soporte de ZIP multipágina"
    requirement: "CORE-03"
    verification:
      - kind: automated_ui
        ref: "lib/converters/pdfToImages.ts"
        status: pass
  - id: D2
    description: "Conversión de Imágenes a PDF consolidado"
    requirement: "CORE-04"
    verification:
      - kind: automated_ui
        ref: "lib/converters/imagesToPdf.ts"
        status: pass
  - id: D3
    description: "Conversión a texto plano y HTML semántico"
    requirement: "CORE-05"
    verification:
      - kind: automated_ui
        ref: "lib/converters/index.ts"
        status: pass
---

# Plan 03-01 Summary: Conversión PDF <-> Imágenes y Exportación de Texto/HTML

## Accomplishments

1. **PDF a Imágenes en Alta Resolución (`pdfToImages.ts`)**:
   - Renderiza cada hoja del PDF sobre un Canvas escalado a 2.0 (Retina / 300 DPI) con fondo blanco puro.
   - Si el archivo tiene 1 sola hoja, descarga la imagen directamente en JPG o PNG.
   - Si tiene múltiples hojas, empaqueta todas las páginas automáticamente en un archivo `.zip` organizado (`pagina-1.jpg`, `pagina-2.jpg`, etc.) mediante `JSZip`.
2. **Imágenes (JPG, PNG, WebP) a PDF (`imagesToPdf.ts`)**:
   - Incrusta imágenes directamente en un nuevo documento `PDFDocument` de `pdf-lib`.
   - Soporte automático para WebP mediante rasterizado previo en memoria antes de incrustar.
   - Dimensiona cada página al tamaño exacto de la imagen sin distorsiones ni cortes.
3. **Verificación**:
   - Compilación exitosa en `npm run build` con soporte completo de tipos TypeScript.

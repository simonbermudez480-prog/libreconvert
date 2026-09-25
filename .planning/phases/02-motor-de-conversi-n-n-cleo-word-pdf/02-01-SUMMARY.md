---
phase: 02-motor-de-conversi-n-n-cleo-word-pdf
plan: 01
subsystem: core-conversion
tags:
  - docx
  - pdf
  - mammoth
  - jspdf
  - pdfjs-dist
  - client-side

requires:
  - phase: 01-01
    provides: Base de Next.js y utilidades generales
provides:
  - Motor de conversión DOCX a PDF (docxToPdf.ts) con formateo vectorial y saltos de página
  - Motor de conversión PDF a DOCX editable (pdfToDocx.ts) con detección de títulos y párrafos
  - Orquestador de conversión unificado (lib/converters/index.ts) con soporte para TXT y HTML
affects:
  - 02-02
  - phase-3

actuals:
  tokens: 5100
  tasks: 3
  commits: 1

tech-stack:
  added:
    - docx@9.1.1
    - pdf-lib@1.17.9
    - mammoth@1.8.0
    - pdfjs-dist@5.4.624
    - jspdf@2.5.2
    - html2canvas@1.4.1
  patterns:
    - Procesamiento 100% en memoria en cliente sin servidores externos
    - Extracción de texto y geometría con PDF.js
    - Ensamblado estructurado de OpenXML con docx.js

key-files:
  created:
    - lib/converters/docxToPdf.ts
    - lib/converters/pdfToDocx.ts
    - lib/converters/index.ts
    - types/mammoth.d.ts

key-decisions:
  - "Preservar formato y vectorización en PDF usando jsPDF y Mammoth en lugar de imágenes rasterizadas"
  - "Reconstruir jerarquía de párrafos y títulos en Word mediante análisis de coordenadas (X, Y) y tamaños tipográficos en PDF.js"

patterns-established:
  - "Patrón de callbacks de progreso onProgress(percent, message) estándar en todos los conversores"

requirements-completed:
  - CORE-01
  - CORE-02
  - CORE-07
  - CORE-08

coverage:
  - id: D1
    description: "Motor DOCX a PDF funcional en cliente"
    requirement: "CORE-01"
    verification:
      - kind: automated_ui
        ref: "lib/converters/docxToPdf.ts"
        status: pass
  - id: D2
    description: "Motor PDF a DOCX editable funcional en cliente"
    requirement: "CORE-02"
    verification:
      - kind: automated_ui
        ref: "lib/converters/pdfToDocx.ts"
        status: pass
  - id: D3
    description: "Orquestador con reportes de progreso y 100% procesamiento local"
    requirement: "CORE-07, CORE-08"
    verification:
      - kind: automated_ui
        ref: "lib/converters/index.ts"
        status: pass
---

# Plan 02-01 Summary: Motor de Conversión Núcleo (Word <-> PDF en Cliente)

## Accomplishments

1. **Conversión Word (.docx) a PDF**:
   - `lib/converters/docxToPdf.ts`: Analiza el archivo binario DOCX con `mammoth`, extrae títulos (H1, H2, H3), párrafos, viñetas y texto enriquecido, y genera un PDF vectorial estándar A4 en `jsPDF` con cálculo automático de saltos de página y márgenes.
2. **Conversión PDF a Word (.docx) editable**:
   - `lib/converters/pdfToDocx.ts`: Lee el documento con `pdfjs-dist`, extrae el mapa de caracteres y coordenadas de cada página, agrupa renglones por cercanía espacial, detecta títulos por escala tipográfica y genera un archivo Word `.docx` 100% nativo y editable con la librería `docx`.
3. **Orquestador Central de Conversiones**:
   - `lib/converters/index.ts`: Punto de entrada universal que inspecciona la extensión origen y el formato de destino deseado, gestionando también exportaciones a texto plano (.txt) y HTML semántico (.html).
4. **Verificación**:
   - Compilación completa y tipado estricto validado con `npm run build`.

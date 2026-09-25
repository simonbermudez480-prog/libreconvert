---
phase: 03-conversi-n-multiformato-utilidades-pdf
plan: 02
subsystem: excel-conversion
tags:
  - excel
  - xlsx
  - csv
  - table-extraction
  - sheetjs

requires:
  - phase: 03-01
    provides: Orquestador y base de procesamiento PDF
provides:
  - Motor de extracción de datos tabulares de PDF a Excel (.xlsx) y CSV (.csv) mediante SheetJS/xlsx
  - Agrupación geométrica de filas y columnas según coordenadas espaciales
affects:
  - 03-03
  - phase-4

actuals:
  tokens: 3900
  tasks: 2
  commits: 1

tech-stack:
  added:
    - xlsx@0.18.5
  patterns:
    - Clustering espacial de texto por bandas horizontales Y y ordenamiento de columnas por X
    - Generación nativa de libros de trabajo binarios XLSX y exportación CSV

key-files:
  created:
    - lib/converters/pdfToExcel.ts
  modified:
    - lib/converters/index.ts

key-decisions:
  - "Generar una pestaña independiente en el libro Excel por cada página del PDF para mantener orden estructural"
  - "Permitir exportación tanto a .xlsx binario moderno como a .csv plano para compatibilidad universal"

patterns-established:
  - "Matriz bidimensional de celdas (Array of Arrays) como estructura intermedia de extracción de tablas"

requirements-completed:
  - CORE-06

coverage:
  - id: D1
    description: "Extracción tabular de PDF a Excel (.xlsx) y CSV (.csv)"
    requirement: "CORE-06"
    verification:
      - kind: automated_ui
        ref: "lib/converters/pdfToExcel.ts"
        status: pass
---

# Plan 03-02 Summary: Extracción de Tablas y Datos a Excel (.xlsx / .csv)

## Accomplishments

1. **Motor de Extracción Tabular (`pdfToExcel.ts`)**:
   - Inspecciona los elementos de texto de cada página del PDF y agrupa los fragmentos en filas según su coordenada vertical $Y$ con una tolerancia de 5 puntos.
   - Ordena los fragmentos de cada fila de izquierda a derecha según su posición horizontal $X$ para construir las columnas correspondientes.
   - Crea un libro de trabajo `XLSX.utils.book_new()` y asigna una pestaña por cada página del documento.
   - Exporta a formato `.xlsx` estándar compatible con Microsoft Excel, Google Sheets y LibreOffice, o a formato `.csv` limpio.
2. **Integración**:
   - Enlazado en `lib/converters/index.ts` y en el selector de formato de la interfaz.
3. **Verificación**:
   - Compilación estática de producción verificada (`npm run build`).

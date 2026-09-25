---
phase: 01-arquitectura-base-sistema-de-dise-o-humano
plan: 02
subsystem: ui
tags:
  - dropzone
  - drag-and-drop
  - clipboard
  - framer-motion
  - format-selector

requires:
  - phase: 01-01
    provides: Base de Next.js, Tailwind con tema cálido y componentes estructurales
provides:
  - Hook useFileHandler con gestión de archivos, validación y soporte global para pegar con Ctrl+V
  - Componente Dropzone con animaciones fluidas en Framer Motion
  - Componente FileCard con desglose de archivo e indicador de estado
  - Componente FormatSelector adaptativo según la extensión de entrada
  - Integración completa en la HomePage
affects:
  - phase-2

actuals:
  tokens: 4800
  tasks: 3
  commits: 1

tech-stack:
  added: []
  patterns:
    - Custom hook reactivo para file handling con soporte de Drag & Drop y Paste event listener
    - Detección semántica de formatos de conversión válidos según la extensión origen
    - Micro-animaciones en Framer Motion con AnimatePresence

key-files:
  created:
    - hooks/useFileHandler.ts
    - components/conversion/Dropzone.tsx
    - components/conversion/FileCard.tsx
    - components/conversion/FormatSelector.tsx
  modified:
    - app/page.tsx

key-decisions:
  - "Soporte nativo para pegar archivos con Ctrl+V / Cmd+V desde el portapapeles para acelerar el flujo del usuario"
  - "Selector de formato inteligente que filtra dinámicamente las opciones disponibles según el archivo cargado"

patterns-established:
  - "Uso de useFileHandler como controlador central de archivos cargados"

requirements-completed:
  - UX-01
  - UX-03

coverage:
  - id: D1
    description: "Zona Drag & Drop reactiva con soporte para arrastrar, explorar y pegar (Ctrl+V)"
    requirement: "UX-01"
    verification:
      - kind: automated_ui
        ref: "components/conversion/Dropzone.tsx y hooks/useFileHandler.ts"
        status: pass
  - id: D2
    description: "FileCard animada con FormatSelector adaptativo y micro-interacciones"
    requirement: "UX-03"
    verification:
      - kind: automated_ui
        ref: "components/conversion/FileCard.tsx y FormatSelector.tsx"
        status: pass
---

# Plan 01-02 Summary: Zona Interactiva Drag & Drop, FileCard y Selector Dinámico

## Accomplishments

1. **Hook `useFileHandler`**:
   - Administra el ciclo de vida de los archivos cargados (agregar, remover, limpiar, actualizar estados).
   - Valida extensiones con mensajes suaves y amigables.
   - Soporte global para pegar con **Ctrl+V / Cmd+V**: cualquier archivo copiado al portapapeles se agrega al instante sin arrastrarlo.
2. **Componente `Dropzone`**:
   - Animado con `framer-motion` (`whileHover`, `whileTap`, elevación y pulso sutil cuando se sobrevuela con un archivo).
   - Diseño acogedor con icono flotante en gradiente ámbar/coral/rosa, textos accesibles y píldoras de formatos soportados.
3. **`FileCard` y `FormatSelector`**:
   - Tarjetas individuales para cada archivo con icono por tipo (Word, PDF, Imagen, Excel, Texto), nombre truncado, tamaño formateado en KB/MB y botón de eliminación suave.
   - Menú de selección de formato de salida adaptado dinámicamente:
     * De **Word** (.docx) a: PDF (.pdf), Texto plano (.txt), HTML (.html).
     * De **PDF** (.pdf) a: Word (.docx), Imágenes (.jpg, .png), Excel (.xlsx), Texto (.txt).
     * De **Imágenes** (.jpg, .png, .webp) a: PDF (.pdf), PNG, JPG.
4. **Verificación**:
   - `npm run build` ejecutado exitosamente con 0 errores de TypeScript y 0 errores de compilación.

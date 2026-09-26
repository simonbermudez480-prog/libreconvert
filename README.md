# LibreConvert — Conversor Universal Libre, Gratuito y Privado

[![Website](https://img.shields.io/badge/Web-libreconvert.vercel.app-F97316?style=for-the-badge&logo=vercel&logoColor=white)](https://libreconvert.vercel.app)
[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![Privacy First](https://img.shields.io/badge/Privacidad-100%25%20Local-10B981?style=for-the-badge&logo=shield&logoColor=white)](https://libreconvert.vercel.app)
[![Licencia](https://img.shields.io/badge/Licencia-MIT-blue?style=for-the-badge)](LICENSE)

**LibreConvert** es una plataforma web moderna y abierta diseñada para convertir archivos entre **Word (.docx), PDF, imágenes (JPG, PNG, WebP), hojas de cálculo (Excel .xlsx / .csv), texto limpio y HTML** con privacidad física absoluta: **el 100% del procesamiento se realiza dentro del navegador del usuario mediante WebAssembly y JavaScript local.**

🌐 **Pruébalo en vivo ahora mismo**: [https://libreconvert.vercel.app](https://libreconvert.vercel.app)

---

## 🌟 Características Principales

* 🔒 **100% Privado en tu Equipo**: Tus documentos, contratos, fotos y hojas de balance nunca se envían a servidores de terceros ni a la nube.
* 💚 **Completamente Gratis**: Sin suscripciones sorpresa, sin solicitar tarjeta de crédito y sin muros de pago engañosos.
* ⚡ **Sin Límites Diarios**: Convierte 1 o 100 documentos sin bloqueos de "espera 2 horas" ni topes artificiales.
* ☕ **Cero Fricción**: Sin crear cuentas, sin contraseñas y sin spam a tu correo.
* 📱 **Diseño Responsive y Accesible**: Modo Claro / Oscuro sincronizado, atajo directo `Ctrl + V` para pegar archivos y soporte táctil en móviles.

---

## 🚀 Herramientas Disponibles

| Herramienta | Formatos | Enlace Directo |
| :--- | :--- | :--- |
| **Word a PDF** | `DOCX → PDF` | [libreconvert.vercel.app/convertir/word-a-pdf](https://libreconvert.vercel.app/convertir/word-a-pdf) |
| **PDF a Word** | `PDF → DOCX` | [libreconvert.vercel.app/convertir/pdf-a-word](https://libreconvert.vercel.app/convertir/pdf-a-word) |
| **PDF a Imágenes** | `PDF → JPG / PNG` | [libreconvert.vercel.app/convertir/pdf-a-jpg](https://libreconvert.vercel.app/convertir/pdf-a-jpg) |
| **Imágenes a PDF** | `IMG → PDF` | [libreconvert.vercel.app/convertir/imagenes-a-pdf](https://libreconvert.vercel.app/convertir/imagenes-a-pdf) |
| **PDF a Excel** | `PDF → XLSX / CSV` | [libreconvert.vercel.app/convertir/pdf-a-excel](https://libreconvert.vercel.app/convertir/pdf-a-excel) |
| **Word o PDF a Texto** | `DOC / PDF → TXT` | [libreconvert.vercel.app/convertir/word-a-texto](https://libreconvert.vercel.app/convertir/word-a-texto) |
| **Unir PDFs** | `Varios PDF → 1 PDF` | [libreconvert.vercel.app](https://libreconvert.vercel.app) |
| **Dividir PDF** | `PDF → Páginas` | [libreconvert.vercel.app](https://libreconvert.vercel.app) |
| **Comprimir PDF** | `PDF Pesado → PDF Ligero` | [libreconvert.vercel.app](https://libreconvert.vercel.app) |

---

## 🛠️ Tecnologías

- **Framework**: Next.js 14 (App Router, Server-Side Pre-rendering & Static Site Generation)
- **Estilos**: Tailwind CSS con paleta cálida (*warm palette*) y soporte WCAG AAA
- **Animaciones**: Framer Motion & Canvas Confetti
- **Motores de Conversión Local**:
  - `docx` & `mammoth` para renderizado y creación de documentos Word
  - `pdf-lib` para manipulación de PDFs, combinación, compresión y extracción
  - `pdfjs-dist` (Web Workers) para renderizado de alta nitidez (Retina 300 DPI)
  - `xlsx` para extracción de tablas estructuradas
  - `jszip` para empaquetado directo de imágenes múltiples
- **SEO & Datos Estructurados**: Schema.org JSON-LD (`WebApplication`, `FAQPage`, `HowTo`), `sitemap.xml`, `robots.txt`, y etiquetas OpenGraph / Twitter Cards.

---

## 💻 Desarrollo Local

```bash
# Clonar el repositorio
git clone https://github.com/simonbermudez480-prog/libreconvert.git

# Entrar al directorio
cd libreconvert

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Libre para la comunidad.

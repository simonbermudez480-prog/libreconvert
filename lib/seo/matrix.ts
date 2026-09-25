export interface ConversionMeta {
  slug: string;
  fromFormat: string;
  toFormat: string;
  badge?: string;
  title: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  shortDescription: string;
  directAnswer: string;
  technicalSpecs: { label: string; value: string }[];
  keywords: string[];
  defaultAccept: string;
  defaultTarget: string;
  isUtility?: boolean;
  utilityType?: "merge" | "split" | "compress";
  howToSteps: { step: number; name: string; text: string }[];
  features: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  relatedSlugs: string[];
}

export const CONVERSION_MATRIX: Record<string, ConversionMeta> = {
  "pdf-a-word": {
    slug: "pdf-a-word",
    fromFormat: "PDF",
    toFormat: "Word",
    badge: "El más utilizado",
    title: "Convertir PDF a Word Gratis Online y Editable (100% Privado) | LibreConvert",
    metaDescription:
      "Convierte archivos PDF a documentos Word (.docx) editables gratis. 100% privado en tu navegador, sin límites diarios, sin registro y sin subir tus archivos a la nube.",
    h1: "Convertir PDF a Word Gratis y Editable",
    subtitle:
      "Transforma cualquier PDF en un documento Word (.docx) editable directamente en tu navegador, conservando la estructura de texto y párrafos con privacidad absoluta.",
    shortDescription: "Convierte PDF a Word (.docx) editable con cero pérdida de privacidad.",
    directAnswer:
      "Para convertir un PDF a Word editable gratis y sin límites: arrastra tu archivo a LibreConvert. La herramienta procesa el documento en la memoria de tu dispositivo usando WebAssembly sin enviar datos a ningún servidor, garantizando privacidad absoluta y descarga instantánea en formato DOCX.",
    technicalSpecs: [
      { label: "Privacidad", value: "100% Local (Navegador)" },
      { label: "Tiempo de espera", value: "0 segundos (Sin colas)" },
      { label: "Límite de tamaño", value: "Ilimitado (Memoria local)" },
      { label: "Costo", value: "$0 Gratis para siempre" },
      { label: "Registro", value: "No requerido" },
    ],
    keywords: [
      "convertir pdf a word",
      "pdf a word gratis",
      "convertir pdf a docx editable",
      "convertidor pdf a word online",
      "pasar pdf a word sin límite",
      "convertir pdf a word seguro privado",
      "pdf to word free spanish",
    ],
    defaultAccept: ".pdf,application/pdf",
    defaultTarget: "docx",
    howToSteps: [
      {
        step: 1,
        name: "Arrastra o selecciona tu archivo PDF",
        text: "Suelta tu archivo en el recuadro superior o pulsa Ctrl+V para pegarlo directamente desde el portapapeles.",
      },
      {
        step: 2,
        name: "Conversión local instantánea",
        text: "LibreConvert analiza la disposición del texto y genera el documento Word (.docx) dentro de tu navegador.",
      },
      {
        step: 3,
        name: "Descarga tu Word editable",
        text: "Haz clic en Descargar para abrir tu documento editable en Microsoft Word, Google Docs o LibreOffice.",
      },
    ],
    features: [
      {
        title: "Texto 100% Editable",
        description: "Reconstruye los párrafos y líneas para que puedas editar, corregir y copiar cualquier parte del documento.",
      },
      {
        title: "Privacidad Blindada",
        description: "Tus contratos, facturas y datos sensibles jamás salen de tu ordenador. Cero servidores externos.",
      },
      {
        title: "Sin Marcas de Agua",
        description: "El documento resultante es limpio y profesional, sin marcas de agua ni restricciones comerciales.",
      },
      {
        title: "Sin Límites Ni Pagos",
        description: "Convierte todos los archivos que quieras al día, de cualquier tamaño, sin tarjetas ni suscripciones.",
      },
    ],
    faqs: [
      {
        question: "¿Cómo convertir un PDF a Word editable gratis?",
        answer:
          "En LibreConvert solo necesitas arrastrar tu archivo PDF a la zona de carga. El navegador procesa la estructura del texto y crea un archivo .docx listo para descargar de forma automática.",
      },
      {
        question: "¿Es seguro convertir documentos confidenciales aquí?",
        answer:
          "Es la opción más segura de internet. A diferencia de conversores tradicionales que envían tus archivos a servidores desconocidos, LibreConvert procesa todo localmente con tecnología WebAssembly.",
      },
      {
        question: "¿Se conserva el formato y la distribución del texto?",
        answer:
          "Sí, el motor calcula las coordenadas espaciales de cada fragmento de texto para reconstruir párrafos y saltos de línea con máxima fidelidad.",
      },
      {
        question: "¿Puedo usarlo en Mac, Windows, Linux y móviles?",
        answer:
          "Sí, funciona fluidamente en cualquier navegador moderno (Chrome, Safari, Edge, Firefox) sin necesidad de instalar ningún software adicional.",
      },
    ],
    relatedSlugs: ["word-a-pdf", "pdf-a-excel", "pdf-a-jpg", "unir-pdf", "comprimir-pdf"],
  },

  "word-a-pdf": {
    slug: "word-a-pdf",
    fromFormat: "Word",
    toFormat: "PDF",
    badge: "Alta fidelidad",
    title: "Convertir Word a PDF Gratis Online (DOCX a PDF Rápido) | LibreConvert",
    metaDescription:
      "Pasa tus documentos de Word (.docx) a PDF gratis con calidad profesional. 100% privado en tu equipo, sin registros, sin esperas y sin límites de archivos.",
    h1: "Convertir Word a PDF Gratis y Sin Límites",
    subtitle:
      "Transforma archivos Word (.docx y .doc) en documentos PDF limpios con tipografía nítida y formato estándar A4, directamente en tu propio navegador.",
    shortDescription: "Convierte documentos Word (.docx) a PDF estándar con calidad vectorial.",
    directAnswer:
      "Para pasar Word a PDF sin costo ni suscripciones: sube tu archivo .docx a LibreConvert. La herramienta compila el texto, títulos y tablas en un PDF vectorial estándar A4 en segundos, sin subir nada a la nube.",
    technicalSpecs: [
      { label: "Privacidad", value: "100% Local (Navegador)" },
      { label: "Tiempo de espera", value: "Instantáneo (< 1 seg)" },
      { label: "Límite de tamaño", value: "Sin límite" },
      { label: "Costo", value: "$0 Gratis para siempre" },
      { label: "Formato salida", value: "PDF Vectorial A4" },
    ],
    keywords: [
      "convertir word a pdf",
      "word a pdf gratis",
      "pasar docx a pdf online",
      "convertir doc a pdf sin límites",
      "guardar word como pdf gratis",
      "convertidor word a pdf privado",
    ],
    defaultAccept: ".docx,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword",
    defaultTarget: "pdf",
    howToSteps: [
      {
        step: 1,
        name: "Carga tu documento Word",
        text: "Arrastra tu archivo .docx o .doc al recuadro o selecciónalo desde tu carpeta.",
      },
      {
        step: 2,
        name: "Generación vectorial",
        text: "LibreConvert analiza la semántica del documento y dibuja la estructura en un PDF de alta fidelidad.",
      },
      {
        step: 3,
        name: "Descarga inmediata",
        text: "Obtén tu PDF listo para imprimir, enviar por correo o firmar digitalmente.",
      },
    ],
    features: [
      {
        title: "Calidad Vectorial Nítida",
        description: "El texto se genera de manera vectorial garantizando máxima nitidez al imprimir o hacer zoom.",
      },
      {
        title: "Estructura y Tablas",
        description: "Mantiene la disposición de títulos, párrafos normales y datos tabulados.",
      },
      {
        title: "Inmediatez Absoluta",
        description: "Sin colas de procesamiento ni cuentas regresivas de espera.",
      },
      {
        title: "100% Privado",
        description: "Ideal para tesis, balances financieros, currículums y documentación legal.",
      },
    ],
    faqs: [
      {
        question: "¿Cómo pasar un documento de Word a PDF gratis?",
        answer:
          "Arrastra tu archivo .docx a LibreConvert y el convertidor generará tu PDF de inmediato sin pedirte correo electrónico ni registrarte.",
      },
      {
        question: "¿Funciona con archivos creados en Google Docs o LibreOffice?",
        answer:
          "Sí, cualquier archivo guardado en formato estándar .docx o .doc es compatible con el motor de conversión.",
      },
      {
        question: "¿Mis documentos se guardan en algún servidor?",
        answer:
          "No. El código se ejecuta dentro de tu navegador web mediante JavaScript/WebAssembly. Nadie más tiene acceso a tus documentos.",
      },
      {
        question: "¿Tiene marcas de agua el PDF generado?",
        answer:
          "No, LibreConvert genera PDFs completamente limpios y profesionales, listos para trámites oficiales y laborales.",
      },
    ],
    relatedSlugs: ["pdf-a-word", "word-a-texto", "pdf-a-jpg", "unir-pdf"],
  },

  "pdf-a-jpg": {
    slug: "pdf-a-jpg",
    fromFormat: "PDF",
    toFormat: "JPG",
    badge: "Retina 300 DPI",
    title: "Convertir PDF a JPG Gratis Online en Alta Resolución | LibreConvert",
    metaDescription:
      "Convierte cada página de tu PDF a imágenes JPG en alta definición (2x Retina). Descarga individual o empaquetada en ZIP automáticamente. 100% privado y gratis.",
    h1: "Convertir PDF a JPG en Alta Resolución",
    subtitle:
      "Extrae y convierte las páginas de tus documentos PDF en imágenes JPG nítidas a escala 2x, con descarga directa o archivo ZIP para documentos de múltiples páginas.",
    shortDescription: "Convierte páginas de PDF a imágenes JPG en alta calidad con empaquetado ZIP automático.",
    directAnswer:
      "Para convertir páginas de PDF a imágenes JPG nítidas: arrastra tu PDF a LibreConvert. La herramienta renderiza cada página en un canvas de alta resolución (2x Retina) y te entrega las imágenes de inmediato (o en un ZIP si tiene varias páginas), todo procesado localmente en tu navegador.",
    technicalSpecs: [
      { label: "Resolución", value: "2.0x Retina (Alta Definición)" },
      { label: "Formato salida", value: "JPG / JPEG" },
      { label: "Múltiples páginas", value: "Auto-empaquetado ZIP" },
      { label: "Privacidad", value: "100% Local" },
      { label: "Costo", value: "$0 Gratis" },
    ],
    keywords: [
      "convertir pdf a jpg",
      "pdf a jpg gratis",
      "pasar pdf a imagen jpg",
      "extraer fotos de pdf",
      "convertir pdf a jpg alta resolucion",
      "pdf a jpg zip",
    ],
    defaultAccept: ".pdf,application/pdf",
    defaultTarget: "jpg",
    howToSteps: [
      {
        step: 1,
        name: "Arrastra tu PDF",
        text: "Sube el documento que contiene las páginas o diapositivas que deseas convertir a imagen.",
      },
      {
        step: 2,
        name: "Renderizado Retina",
        text: "El motor dibuja cada página con resolución mejorada a 300 DPI para evitar imágenes pixeladas.",
      },
      {
        step: 3,
        name: "Descarga en 1 clic",
        text: "Obtén la imagen individual o un archivo ZIP ordenado con todas las páginas.",
      },
    ],
    features: [
      {
        title: "Resolución Retina 2x",
        description: "Textos nítidos y gráficos claros sin el desenfoque habitual de otros conversores online.",
      },
      {
        title: "Empaquetado ZIP Automático",
        description: "Si tu PDF tiene varias páginas, se descargan todas juntas y numeradas en un cómodo ZIP.",
      },
      {
        title: "Sin Límite de Páginas",
        description: "Procesa catálogos, presentaciones o libros completos sin que te cobren por página.",
      },
      {
        title: "Cero Servidores",
        description: "Todo ocurre en tu memoria RAM. Máxima velocidad y privacidad garantizada.",
      },
    ],
    faqs: [
      {
        question: "¿Cómo convertir un PDF de muchas páginas a JPG?",
        answer:
          "Sube tu archivo a LibreConvert. El convertidor procesará todas las páginas y generará automáticamente un archivo comprimido .ZIP con cada página como imagen JPG independiente numerada.",
      },
      {
        question: "¿Pierde calidad el texto al convertir a imagen?",
        answer:
          "No, LibreConvert renderiza a escala 2x Retina para que las letras y diagramas se vean perfectos incluso al hacer zoom o imprimir.",
      },
      {
        question: "¿Tiene costo si el PDF tiene más de 20 páginas?",
        answer:
          "No, LibreConvert es 100% gratis sin importar cuántas páginas tenga tu documento.",
      },
      {
        question: "¿Puedo convertir a PNG en lugar de JPG?",
        answer:
          "Sí, puedes elegir PNG en el selector si necesitas imágenes sin compresión o con fondo transparente.",
      },
    ],
    relatedSlugs: ["pdf-a-png", "imagenes-a-pdf", "pdf-a-word", "dividir-pdf"],
  },

  "pdf-a-png": {
    slug: "pdf-a-png",
    fromFormat: "PDF",
    toFormat: "PNG",
    badge: "Sin pérdida",
    title: "Convertir PDF a PNG Gratis Online (Imágenes Nítidas) | LibreConvert",
    metaDescription:
      "Transforma páginas PDF a imágenes PNG de máxima nitidez sin compresión. Descarga individual o en ZIP para documentos extensos. 100% privado y gratis.",
    h1: "Convertir PDF a PNG con Máxima Fidelidad",
    subtitle:
      "Convierte tus páginas PDF a formato PNG sin pérdida de nitidez, perfecto para diagramas, esquemas gráficos y capturas de alta precisión.",
    shortDescription: "Convierte PDF a imágenes PNG sin pérdida con empaquetado ZIP.",
    directAnswer:
      "Para pasar un PDF a formato PNG sin pérdida de calidad: sube tu documento a LibreConvert. La herramienta procesa cada página en tu navegador y entrega imágenes PNG nítidas con colores fieles y sin artefactos de compresión.",
    technicalSpecs: [
      { label: "Compresión", value: "Lossless (Sin pérdida)" },
      { label: "Formato salida", value: "PNG 24-bit" },
      { label: "Múltiples páginas", value: "Auto-empaquetado ZIP" },
      { label: "Privacidad", value: "100% Local" },
      { label: "Costo", value: "$0 Gratis" },
    ],
    keywords: [
      "convertir pdf a png",
      "pdf a png gratis",
      "pasar pdf a imagenes png",
      "convertir pdf a imagen transparente",
      "pdf a png sin perdida",
    ],
    defaultAccept: ".pdf,application/pdf",
    defaultTarget: "png",
    howToSteps: [
      {
        step: 1,
        name: "Selecciona tu PDF",
        text: "Arrastra el archivo PDF o pégalo desde tu portapapeles con Ctrl+V.",
      },
      {
        step: 2,
        name: "Extracción lossless",
        text: "Cada página se procesa en el canvas del navegador sin degradación de colores.",
      },
      {
        step: 3,
        name: "Guarda tus imágenes",
        text: "Descarga las imágenes PNG listas para usar en diseño, presentaciones o web.",
      },
    ],
    features: [
      {
        title: "Calidad Sin Pérdida",
        description: "El formato PNG preserva líneas finas, tipografías e ilustraciones sin ruido de compresión.",
      },
      {
        title: "Descarga en Lote",
        description: "Recibe un archivo ZIP organizado con todas las páginas convertidas de una sola vez.",
      },
      {
        title: "Privacidad Total",
        description: "Tus imágenes no se comparten ni se almacenan en servidores externos.",
      },
      {
        title: "Gratis y Sin Límites",
        description: "Uso libre ilimitado para diseñadores, estudiantes y empresas.",
      },
    ],
    faqs: [
      {
        question: "¿Qué diferencia hay entre PDF a JPG y PDF a PNG?",
        answer:
          "PNG utiliza compresión sin pérdida (lossless), lo que lo hace ideal para documentos con texto pequeño, tablas y gráficos que requieren máxima nitidez. JPG es más ligero pero puede tener pequeña compresión.",
      },
      {
        question: "¿Cómo se descargan varias páginas?",
        answer:
          "Si el PDF tiene más de una página, LibreConvert crea un archivo .ZIP listo para descomprimir con un solo clic.",
      },
      {
        question: "¿Es necesario registrarse?",
        answer:
          "No, nunca pedimos correo electrónico ni registro para usar ninguna herramienta.",
      },
    ],
    relatedSlugs: ["pdf-a-jpg", "imagenes-a-pdf", "pdf-a-word"],
  },

  "imagenes-a-pdf": {
    slug: "imagenes-a-pdf",
    fromFormat: "Imágenes",
    toFormat: "PDF",
    badge: "Consolidación rápida",
    title: "Convertir Imágenes a PDF Gratis (JPG, PNG, WebP a PDF) | LibreConvert",
    metaDescription:
      "Une y convierte múltiples fotos e imágenes (JPG, PNG, WebP) en un solo documento PDF consolidado. 100% privado en tu navegador, sin límites y gratis.",
    h1: "Convertir Imágenes a PDF (JPG, PNG y WebP)",
    subtitle:
      "Consolida fotos, facturas escaneadas o capturas de pantalla en un documento PDF limpio y ordenado, listo para imprimir o enviar.",
    shortDescription: "Convierte y consolida múltiples imágenes en un único documento PDF.",
    directAnswer:
      "Para convertir fotos o imágenes a un archivo PDF: arrastra tus imágenes (JPG, PNG o WebP) a LibreConvert. La herramienta ajusta las dimensiones de cada imagen y genera un PDF profesional en tu navegador sin subir nada a internet.",
    technicalSpecs: [
      { label: "Formatos soportados", value: "JPG, PNG, WebP, JPEG" },
      { label: "Páginas", value: "Múltiples imágenes por PDF" },
      { label: "Privacidad", value: "100% Local" },
      { label: "Costo", value: "$0 Gratis" },
      { label: "Tiempo", value: "< 2 segundos" },
    ],
    keywords: [
      "convertir imagenes a pdf",
      "fotos a pdf gratis",
      "pasar jpg a pdf",
      "unir fotos en un pdf",
      "convertir png a pdf online",
      "crear pdf con varias fotos",
    ],
    defaultAccept: "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp",
    defaultTarget: "pdf",
    howToSteps: [
      {
        step: 1,
        name: "Arrastra tus imágenes",
        text: "Sube una o varias fotos en formato JPG, PNG o WebP desde tu ordenador o teléfono.",
      },
      {
        step: 2,
        name: "Ajuste de dimensiones",
        text: "El motor calcula la orientación y escala para que cada foto quede perfectamente centrada en su página.",
      },
      {
        step: 3,
        name: "Descarga tu PDF",
        text: "Obtén un único archivo PDF que reúne todas tus imágenes con la máxima calidad original.",
      },
    ],
    features: [
      {
        title: "Soporte Multiformato",
        description: "Combina JPGs, PNGs y fotos WebP modernas en el mismo archivo PDF.",
      },
      {
        title: "Dimensiones Inteligentes",
        description: "Cada página se ajusta al tamaño exacto de la imagen sin recortar detalles importantes.",
      },
      {
        title: "Privacidad de tus Fotos",
        description: "Tus fotos personales o documentos de identidad nunca se transmiten por la red.",
      },
      {
        title: "Sin Límites de Imágenes",
        description: "Crea PDFs con todas las imágenes que necesites en una sola operación.",
      },
    ],
    faqs: [
      {
        question: "¿Puedo subir fotos desde mi teléfono móvil?",
        answer:
          "Sí, LibreConvert es totalmente compatible con navegadores móviles en Android y iPhone/iPad.",
      },
      {
        question: "¿Se reduce la calidad de mis fotografías al convertirlas a PDF?",
        answer:
          "No, las imágenes se incrustan directamente en el contenedor PDF preservando sus píxeles originales.",
      },
      {
        question: "¿Puedo combinar imágenes JPG y PNG en el mismo PDF?",
        answer:
          "Sí, puedes seleccionar o arrastrar imágenes de diferentes formatos simultáneamente.",
      },
    ],
    relatedSlugs: ["pdf-a-jpg", "pdf-a-png", "unir-pdf", "word-a-pdf"],
  },

  "jpg-a-pdf": {
    slug: "jpg-a-pdf",
    fromFormat: "JPG",
    toFormat: "PDF",
    badge: "Rápido y ligero",
    title: "Convertir JPG a PDF Gratis Online en Segundos | LibreConvert",
    metaDescription:
      "Pasa fotos y archivos JPG a documento PDF gratis. Sin marcas de agua, sin registros y procesado 100% en tu propio navegador web.",
    h1: "Convertir JPG a PDF Gratis Online",
    subtitle:
      "Transforma tus fotos y documentos escaneados en formato JPG a un PDF profesional listo para compartir o imprimir.",
    shortDescription: "Convierte imágenes JPG a PDF de manera instantánea y privada.",
    directAnswer:
      "Para pasar una imagen JPG a PDF gratis: sube tu foto JPG a LibreConvert. La herramienta crea un documento PDF con la imagen incrustada en segundos, directamente en tu navegador y sin registro.",
    technicalSpecs: [
      { label: "Formato entrada", value: "JPG / JPEG" },
      { label: "Formato salida", value: "PDF Estándar" },
      { label: "Privacidad", value: "100% Local" },
      { label: "Costo", value: "$0 Gratis" },
    ],
    keywords: [
      "convertir jpg a pdf",
      "jpg a pdf gratis",
      "pasar imagen a pdf",
      "foto a pdf online",
      "convertidor jpg a pdf sin limite",
    ],
    defaultAccept: "image/jpeg,.jpg,.jpeg",
    defaultTarget: "pdf",
    howToSteps: [
      {
        step: 1,
        name: "Sube tu archivo JPG",
        text: "Arrastra la imagen o pégala con Ctrl+V.",
      },
      {
        step: 2,
        name: "Incrustación en PDF",
        text: "LibreConvert crea el contenedor PDF preservando las proporciones de tu fotografía.",
      },
      {
        step: 3,
        name: "Descarga instantánea",
        text: "Descarga tu archivo PDF con un solo clic.",
      },
    ],
    features: [
      {
        title: "Calidad Original",
        description: "No recorta ni recomprime innecesariamente tus imágenes.",
      },
      {
        title: "Totalmente Privado",
        description: "Tus fotos no se suben a la nube.",
      },
      {
        title: "Gratuito Sin Muros",
        description: "Sin suscripciones ni límites de uso.",
      },
      {
        title: "Rápido y Fácil",
        description: "En menos de 2 clics tienes tu documento listo.",
      },
    ],
    faqs: [
      {
        question: "¿Cómo convertir una foto JPG a PDF?",
        answer: "Simplemente arrastra tu imagen al conversor y haz clic en Descargar PDF.",
      },
      {
        question: "¿Se puede hacer desde el móvil?",
        answer: "Sí, funciona de inmediato en navegadores de teléfonos Android y iOS.",
      },
    ],
    relatedSlugs: ["png-a-pdf", "imagenes-a-pdf", "pdf-a-jpg"],
  },

  "png-a-pdf": {
    slug: "png-a-pdf",
    fromFormat: "PNG",
    toFormat: "PDF",
    badge: "Fondo transparente",
    title: "Convertir PNG a PDF Gratis Online | LibreConvert",
    metaDescription:
      "Convierte imágenes PNG a documentos PDF en segundos. Preserva la nitidez y colores originales con privacidad absoluta.",
    h1: "Convertir PNG a PDF Gratis Online",
    subtitle:
      "Pasa capturas de pantalla, esquemas y gráficos PNG a un documento PDF formal con bordes limpios y sin pérdidas.",
    shortDescription: "Convierte imágenes PNG a formato PDF vectorial de forma privada.",
    directAnswer:
      "Para convertir una imagen PNG a PDF: arrastra tu archivo PNG a LibreConvert. La herramienta procesa la imagen en tu dispositivo y genera un archivo PDF listo para descargar.",
    technicalSpecs: [
      { label: "Formato entrada", value: "PNG" },
      { label: "Formato salida", value: "PDF" },
      { label: "Privacidad", value: "100% Local" },
      { label: "Costo", value: "$0 Gratis" },
    ],
    keywords: [
      "convertir png a pdf",
      "png a pdf gratis",
      "pasar captura a pdf",
      "convertidor png a pdf",
    ],
    defaultAccept: "image/png,.png",
    defaultTarget: "pdf",
    howToSteps: [
      { step: 1, name: "Sube tu PNG", text: "Arrastra tu imagen PNG al recuadro." },
      { step: 2, name: "Generación de página", text: "Se empaqueta la imagen en un lienzo PDF a medida." },
      { step: 3, name: "Descarga", text: "Guarda tu nuevo archivo PDF al instante." },
    ],
    features: [
      { title: "Nitidez de líneas", description: "Ideal para diagramas técnicos y capturas de texto." },
      { title: "Privacidad", description: "Procesamiento en tu propio navegador sin enviar datos a internet." },
      { title: "Sin registro", description: "Comienza a convertir al instante." },
    ],
    faqs: [
      { question: "¿Es gratis?", answer: "Sí, 100% gratuito sin límites de archivos ni marcas de agua." },
      { question: "¿Es compatible con capturas de pantalla?", answer: "Totalmente compatible con capturas de macOS, Windows y teléfonos." },
    ],
    relatedSlugs: ["jpg-a-pdf", "imagenes-a-pdf", "pdf-a-png"],
  },

  "pdf-a-excel": {
    slug: "pdf-a-excel",
    fromFormat: "PDF",
    toFormat: "Excel",
    badge: "Extracción de Tablas",
    title: "Convertir PDF a Excel Gratis Online (.xlsx y .csv) | LibreConvert",
    metaDescription:
      "Extrae tablas y datos estructurados de tus archivos PDF a hojas de cálculo de Excel (.xlsx) y CSV. 100% gratis, sin registros y privado.",
    h1: "Convertir PDF a Excel Gratis y Sin Límites",
    subtitle:
      "Convierte tablas de estados financieros, facturas y reportes PDF en hojas de cálculo de Microsoft Excel (.xlsx) editables directamente en tu navegador.",
    shortDescription: "Extrae tablas de PDF a hojas de cálculo de Excel (.xlsx) y CSV editables.",
    directAnswer:
      "Para extraer tablas de un PDF a Excel gratis: arrastra tu PDF a LibreConvert. La herramienta detecta las líneas y columnas tabuladas y las exporta a un archivo .xlsx editable en segundos sin que los datos bancarios o confidenciales salgan de tu ordenador.",
    technicalSpecs: [
      { label: "Formatos salida", value: ".XLSX (Excel) y .CSV" },
      { label: "Detección", value: "Tablas y coordenadas espaciales" },
      { label: "Privacidad", value: "100% Local (Client-Side)" },
      { label: "Costo", value: "$0 Gratis para siempre" },
    ],
    keywords: [
      "convertir pdf a excel",
      "pdf a excel gratis",
      "extraer tablas de pdf a excel",
      "pasar pdf a xlsx",
      "pdf a excel sin limite",
      "convertidor pdf a excel privado",
    ],
    defaultAccept: ".pdf,application/pdf",
    defaultTarget: "xlsx",
    howToSteps: [
      {
        step: 1,
        name: "Arrastra tu PDF con tablas",
        text: "Sube el extracto bancario, factura o reporte que contiene filas y columnas.",
      },
      {
        step: 2,
        name: "Detección tabular",
        text: "LibreConvert agrupa los textos según su alineación horizontal y vertical en celdas.",
      },
      {
        step: 3,
        name: "Descarga tu archivo Excel",
        text: "Abre y edita las fórmulas o números en Microsoft Excel, Google Sheets o LibreOffice Calc.",
      },
    ],
    features: [
      {
        title: "Ideal para Datos Financieros",
        description: "Al procesarse 100% en local, tus extractos de cuenta y salarios están completamente protegidos.",
      },
      {
        title: "Exportación XLSX y CSV",
        description: "Compatible con cualquier software de análisis de datos y bases de datos.",
      },
      {
        title: "Sin Muros de Pago",
        description: "Muchas webs cobran por extraer tablas a Excel; en LibreConvert es gratis para siempre.",
      },
      {
        title: "Sin Registro",
        description: "No necesitas registrarte ni dejar tu correo corporativo.",
      },
    ],
    faqs: [
      {
        question: "¿Cómo pasar tablas de un PDF a Excel gratis?",
        answer:
          "Sube tu PDF a LibreConvert. La herramienta examina la posición de los textos para crear una cuadrícula de filas y columnas, entregándote un archivo .xlsx listo para usar.",
      },
      {
        question: "¿Es seguro convertir balances y extractos bancarios?",
        answer:
          "Es la solución más segura disponible, ya que el algoritmo se ejecuta en la memoria de tu navegador y ningún dato viaja a servidores remotos.",
      },
      {
        question: "¿Puedo exportar a formato CSV?",
        answer:
          "Sí, puedes seleccionar CSV en el menú desplegable si vas a importar los datos a un software de contabilidad o base de datos.",
      },
    ],
    relatedSlugs: ["pdf-a-csv", "pdf-a-word", "pdf-a-texto", "unir-pdf"],
  },

  "pdf-a-csv": {
    slug: "pdf-a-csv",
    fromFormat: "PDF",
    toFormat: "CSV",
    badge: "Para bases de datos",
    title: "Convertir PDF a CSV Gratis Online (Datos Tabulados) | LibreConvert",
    metaDescription:
      "Convierte tablas de PDF a formato CSV de texto plano separado por comas. Ideal para bases de datos y scripts de análisis. 100% gratis y privado.",
    h1: "Convertir PDF a CSV Gratis",
    subtitle:
      "Exporta los datos de tus documentos PDF a texto delimitado por comas (.csv) para facilitar su importación a sistemas contables y motores SQL.",
    shortDescription: "Exporta tablas y datos de PDF a formato CSV estándar de forma local.",
    directAnswer:
      "Para convertir datos de un PDF a archivo CSV: sube el documento a LibreConvert y selecciona formato de salida CSV. La herramienta procesa el texto en celdas tabuladas y te entrega el archivo .csv al instante sin intermediarios.",
    technicalSpecs: [
      { label: "Delimitador", value: "Coma (,)" },
      { label: "Codificación", value: "UTF-8" },
      { label: "Privacidad", value: "100% Local" },
      { label: "Costo", value: "$0 Gratis" },
    ],
    keywords: [
      "convertir pdf a csv",
      "pdf a csv gratis",
      "pasar tablas pdf a csv",
      "extraer datos pdf csv",
    ],
    defaultAccept: ".pdf,application/pdf",
    defaultTarget: "csv",
    howToSteps: [
      { step: 1, name: "Sube tu archivo PDF", text: "Arrastra el archivo con datos tabulados al convertidor." },
      { step: 2, name: "Estructuración CSV", text: "El motor genera los registros delimitados por comas en codificación UTF-8." },
      { step: 3, name: "Descarga tu .csv", text: "Listo para importar en Python, R, Excel o PostgreSQL." },
    ],
    features: [
      { title: "Texto delimitado estándar", description: "Formato universal compatible con cualquier sistema informático." },
      { title: "Codificación UTF-8", description: "Respeta acentos, eñes y caracteres especiales en español." },
      { title: "Seguridad total", description: "Tus datos nunca tocan ningún servidor en la nube." },
    ],
    faqs: [
      { question: "¿Qué delimitador utiliza?", answer: "Genera archivos CSV estándar con separación por comas y codificación UTF-8." },
      { question: "¿Tiene límite de filas?", answer: "No tiene límite de filas; procesa todo lo que soporte la memoria de tu dispositivo." },
    ],
    relatedSlugs: ["pdf-a-excel", "pdf-a-word", "pdf-a-texto"],
  },

  "pdf-a-texto": {
    slug: "pdf-a-texto",
    fromFormat: "PDF",
    toFormat: "Texto",
    badge: "Ligero y limpio",
    title: "Convertir PDF a Texto Plano (.txt) Gratis Online | LibreConvert",
    metaDescription:
      "Extrae todo el texto de tus archivos PDF a texto plano (.txt) sin formato ni complicaciones. Rápido, 100% privado en tu navegador y sin límites.",
    h1: "Convertir PDF a Texto Plano (.txt) Gratis",
    subtitle:
      "Extrae el contenido textual de tus documentos PDF de manera limpia y sin elementos innecesarios, perfecto para análisis, resúmenes o copiar y pegar.",
    shortDescription: "Extrae el texto de cualquier archivo PDF a formato .txt sin pérdida de datos.",
    directAnswer:
      "Para extraer todo el texto de un PDF a un archivo .txt gratis: arrastra el PDF a LibreConvert. La herramienta procesa página por página en tu navegador extrayendo todos los caracteres legibles y te entrega un archivo de texto descargable en segundos.",
    technicalSpecs: [
      { label: "Formato salida", value: "Texto plano (.txt) UTF-8" },
      { label: "Organización", value: "Separación por páginas" },
      { label: "Privacidad", value: "100% Local" },
      { label: "Costo", value: "$0 Gratis" },
    ],
    keywords: [
      "convertir pdf a texto",
      "pdf a txt gratis",
      "extraer texto de pdf",
      "pasar pdf a bloc de notas",
      "convertir pdf a texto plano online",
    ],
    defaultAccept: ".pdf,application/pdf",
    defaultTarget: "txt",
    howToSteps: [
      { step: 1, name: "Arrastra tu PDF", text: "Suelta el documento que deseas convertir en el área de carga." },
      { step: 2, name: "Extracción de caracteres", text: "El motor lee todos los objetos de texto y los separa por páginas." },
      { step: 3, name: "Descarga tu .txt", text: "Abre el texto en el Bloc de Notas, VS Code o cualquier editor." },
    ],
    features: [
      { title: "Texto Limpio", description: "Sin imágenes pesadas ni tipografías complejas: solo el contenido esencial." },
      { title: "Separadores de Página", description: "Indica claramente dónde inicia y termina cada página del documento original." },
      { title: "Privacidad Total", description: "Procesado enteramente en tu ordenador sin subir nada a la red." },
    ],
    faqs: [
      { question: "¿Extrae texto de documentos escaneados?", answer: "Extrae todo el texto seleccionable del PDF original." },
      { question: "¿Conserva acentos y tildes?", answer: "Sí, genera archivos codificados en UTF-8 para garantizar la ortografía correcta en español." },
    ],
    relatedSlugs: ["word-a-texto", "pdf-a-word", "pdf-a-excel"],
  },

  "word-a-texto": {
    slug: "word-a-texto",
    fromFormat: "Word",
    toFormat: "Texto",
    badge: "Extracción instantánea",
    title: "Convertir Word a Texto Plano (.docx a .txt) Gratis | LibreConvert",
    metaDescription:
      "Extrae el texto de tus documentos Word (.docx y .doc) a texto plano (.txt) en 1 segundo. 100% gratis, sin registro y privado.",
    h1: "Convertir Word a Texto Plano (.txt)",
    subtitle:
      "Limpia el formato y obtén el texto en bruto de tus archivos Word para reutilizarlo en código, notas o bases de conocimiento.",
    shortDescription: "Extrae texto puro de archivos Word (.docx) sin formato residual.",
    directAnswer:
      "Para convertir Word a texto plano gratis: sube tu archivo .docx a LibreConvert. La herramienta extrae el contenido textual en crudo en milisegundos sin enviar ningún dato a la nube.",
    technicalSpecs: [
      { label: "Formato entrada", value: ".DOCX y .DOC" },
      { label: "Formato salida", value: ".TXT (UTF-8)" },
      { label: "Velocidad", value: "Menos de 1 segundo" },
      { label: "Privacidad", value: "100% Local" },
    ],
    keywords: [
      "convertir word a texto",
      "docx a txt gratis",
      "extraer texto de word",
      "word a bloc de notas",
    ],
    defaultAccept: ".docx,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    defaultTarget: "txt",
    howToSteps: [
      { step: 1, name: "Sube tu Word", text: "Arrastra tu archivo .docx o .doc." },
      { step: 2, name: "Extracción directa", text: "Se extraen los párrafos sin estilos complejos." },
      { step: 3, name: "Descarga", text: "Guarda tu archivo .txt listo para copiar." },
    ],
    features: [
      { title: "Súper Rápido", description: "Procesamiento inmediato en menos de un parpadeo." },
      { title: "Cero Publicidad", description: "Sin anuncios intrusivos ni registros obligatorios." },
      { title: "Seguro y Privado", description: "Tus escritos nunca salen de tu ordenador." },
    ],
    faqs: [
      { question: "¿Funciona con archivos .docx grandes?", answer: "Sí, maneja documentos de cientos de páginas en segundos." },
      { question: "¿Es gratis?", answer: "100% gratuito sin límites de conversión." },
    ],
    relatedSlugs: ["word-a-pdf", "pdf-a-texto", "pdf-a-word"],
  },

  "unir-pdf": {
    slug: "unir-pdf",
    fromFormat: "PDFs",
    toFormat: "PDF Unificado",
    badge: "Utilidad esencial",
    title: "Unir PDF Gratis Online — Combinar y Juntar Varios PDFs | LibreConvert",
    metaDescription:
      "Une y junta múltiples archivos PDF en un solo documento organizado. 100% gratis, sin límites de cantidad ni tamaño, y con privacidad total en tu navegador.",
    h1: "Unir Archivos PDF Gratis Online",
    subtitle:
      "Combina varios documentos PDF en un único archivo consolidado en segundos. Sin subir tus archivos a ningún servidor y sin marcas de agua.",
    shortDescription: "Une múltiples documentos PDF en uno solo con privacidad absoluta.",
    directAnswer:
      "Para unir dos o más archivos PDF gratis: arrastra los documentos a LibreConvert. La herramienta combina todas las páginas en el orden deseado dentro de tu propio navegador mediante WebAssembly y te permite descargar el PDF unificado de inmediato sin enviar tus archivos a internet.",
    technicalSpecs: [
      { label: "Cantidad de archivos", value: "Ilimitada" },
      { label: "Límite de tamaño", value: "Sin límite artificial" },
      { label: "Privacidad", value: "100% Local (Navegador)" },
      { label: "Costo", value: "$0 Gratis" },
      { label: "Marcas de agua", value: "Ninguna" },
    ],
    keywords: [
      "unir pdf",
      "unir pdf gratis",
      "juntar varios pdf en uno",
      "combinar pdfs online",
      "fusionar pdf gratis sin limite",
      "unir pdf privado seguro",
    ],
    defaultAccept: ".pdf,application/pdf",
    defaultTarget: "pdf",
    isUtility: true,
    utilityType: "merge",
    howToSteps: [
      {
        step: 1,
        name: "Arrastra tus documentos PDF",
        text: "Sube dos o más archivos PDF que quieras unir en un solo documento.",
      },
      {
        step: 2,
        name: "Combinación en memoria",
        text: "El motor de LibreConvert fusiona las páginas secuencialmente sin comprimir ni degradar la calidad.",
      },
      {
        step: 3,
        name: "Descarga tu PDF único",
        text: "Obtén tu documento final listo para enviar o imprimir.",
      },
    ],
    features: [
      {
        title: "Ilimitado y Sin Esperas",
        description: "Une 2, 5 o 50 archivos sin tener que esperar colas ni pagar suscripciones.",
      },
      {
        title: "Calidad 100% Original",
        description: "No altera las fuentes vectoriales ni la resolución de las imágenes internas.",
      },
      {
        title: "Privacidad Total",
        description: "Los archivos se procesan en tu equipo. Ideal para contratos y documentos legales.",
      },
      {
        title: "Sin Marcas de Agua",
        description: "Tu PDF final es completamente limpio y profesional.",
      },
    ],
    faqs: [
      {
        question: "¿Cómo unir varios archivos PDF en uno solo gratis?",
        answer:
          "En LibreConvert pulsa el botón de Unir PDF, selecciona los archivos que deseas juntar y haz clic en Descargar. Todo el proceso toma solo unos segundos.",
      },
      {
        question: "¿Hay límite en la cantidad de PDFs que puedo unir?",
        answer:
          "No, a diferencia de otros servicios con límites de 3 a 5 archivos, en LibreConvert puedes combinar los que desees porque el cálculo se hace en tu ordenador.",
      },
      {
        question: "¿Se pierden marcadores o enlaces interactivos?",
        answer:
          "Se preserva la estructura de páginas y contenidos originales del documento.",
      },
    ],
    relatedSlugs: ["dividir-pdf", "comprimir-pdf", "pdf-a-word", "word-a-pdf"],
  },

  "dividir-pdf": {
    slug: "dividir-pdf",
    fromFormat: "PDF",
    toFormat: "Páginas Divididas",
    badge: "Extracción selectiva",
    title: "Dividir PDF Gratis Online — Extraer y Separar Páginas | LibreConvert",
    metaDescription:
      "Divide y extrae páginas específicas de un archivo PDF gratis. Separa un PDF grande en partes o extrae solo las páginas que necesitas de forma 100% privada.",
    h1: "Dividir PDF y Extraer Páginas Gratis",
    subtitle:
      "Separa páginas específicas de tus documentos PDF de manera visual y rápida sin subir tus datos a ningún servidor externo.",
    shortDescription: "Divide documentos PDF y extrae las páginas exactas que necesitas.",
    directAnswer:
      "Para dividir un PDF o extraer solo ciertas páginas gratis: sube tu archivo a LibreConvert, indica el rango de páginas (ej: 1-3, 5) y descarga el nuevo archivo PDF generado al instante en tu propio navegador.",
    technicalSpecs: [
      { label: "Rangos soportados", value: "Páginas individuales o rangos (ej: 1-5)" },
      { label: "Privacidad", value: "100% Local" },
      { label: "Costo", value: "$0 Gratis" },
      { label: "Tiempo", value: "< 1 segundo" },
    ],
    keywords: [
      "dividir pdf",
      "dividir pdf gratis",
      "separar paginas pdf",
      "extraer hojas de un pdf",
      "partir pdf en varios",
    ],
    defaultAccept: ".pdf,application/pdf",
    defaultTarget: "pdf",
    isUtility: true,
    utilityType: "split",
    howToSteps: [
      { step: 1, name: "Sube tu archivo PDF", text: "Arrastra el documento que deseas recortar o dividir." },
      { step: 2, name: "Indica las páginas", text: "Escribe el rango que necesitas (por ejemplo '1-3' para las tres primeras)." },
      { step: 3, name: "Descarga tu nuevo PDF", text: "Obtén un nuevo PDF que solo contiene las páginas seleccionadas." },
    ],
    features: [
      { title: "Rápido y Preciso", description: "Selecciona únicamente las páginas que te interesan compartir." },
      { title: "Documentos Más Ligeros", description: "Elimina páginas pesadas o innecesarias de tus archivos." },
      { title: "Privacidad Garantizada", description: "Nada se transmite por internet: todo se procesa en tu navegador." },
    ],
    faqs: [
      { question: "¿Cómo extraer solo una página de un PDF?", answer: "Ingresa el número de página que deseas (ejemplo '1') en el campo de rango y descarga tu documento resultante." },
      { question: "¿Se modifica el archivo original de mi equipo?", answer: "No, tu archivo original se mantiene intacto. Se genera un nuevo archivo independiente para descargar." },
    ],
    relatedSlugs: ["unir-pdf", "comprimir-pdf", "pdf-a-word"],
  },

  "comprimir-pdf": {
    slug: "comprimir-pdf",
    fromFormat: "PDF Pesado",
    toFormat: "PDF Optimizado",
    badge: "Ahorro de espacio",
    title: "Comprimir PDF Gratis Online — Reducir Tamaño de Archivo | LibreConvert",
    metaDescription:
      "Reduce el tamaño y peso de tus archivos PDF gratis para enviarlos por email o subirlos a portales web. 100% privado en tu navegador, sin límites de MB.",
    h1: "Comprimir PDF y Reducir Tamaño Gratis",
    subtitle:
      "Optimiza el peso de tus documentos PDF eliminando flujos redundantes y reestructurando objetos para que pesen mucho menos sin perder legibilidad.",
    shortDescription: "Comprime y reduce el tamaño de tus documentos PDF para compartirlos con facilidad.",
    directAnswer:
      "Para comprimir un PDF pesado gratis sin subirlo a la nube: arrastra tu archivo a LibreConvert. La herramienta reconstruye la estructura del PDF re-empaquetando los flujos de datos en tu propio navegador para obtener un archivo más ligero sin comprometer tu privacidad.",
    technicalSpecs: [
      { label: "Optimización", value: "Compresión de flujos de objetos" },
      { label: "Privacidad", value: "100% Local" },
      { label: "Costo", value: "$0 Gratis para siempre" },
      { label: "Límite", value: "Sin límite de megabytes" },
    ],
    keywords: [
      "comprimir pdf",
      "reducir tamano pdf gratis",
      "bajar peso a un pdf",
      "optimizar pdf online gratis",
      "comprimir pdf para enviar por correo",
    ],
    defaultAccept: ".pdf,application/pdf",
    defaultTarget: "pdf",
    isUtility: true,
    utilityType: "compress",
    howToSteps: [
      { step: 1, name: "Arrastra tu PDF pesado", text: "Sube el documento que pesa demasiado para adjuntar." },
      { step: 2, name: "Optimización inteligente", text: "LibreConvert reestructura los objetos y flujos internos del documento." },
      { step: 3, name: "Descarga optimizada", text: "Guarda tu nuevo PDF listo para enviar por correo o subir a cualquier plataforma." },
    ],
    features: [
      { title: "Listo para Enviar por Correo", description: "Evita el molesto error de 'archivo demasiado pesado' en Gmail o Outlook." },
      { title: "Sin Registro Ni Límites", description: "Comprime archivos de cualquier tamaño sin pagar cuotas." },
      { title: "Privacidad Absoluta", description: "Tu información personal y financiera nunca sale de tu dispositivo." },
    ],
    faqs: [
      { question: "¿Cuánto se reduce el peso de mi PDF?", answer: "Depende de la cantidad de objetos y redundancias del archivo original, logrando habitualmente reducciones significativas manteniendo la legibilidad del texto." },
      { question: "¿Es seguro comprimir documentos de identidad o facturas?", answer: "Totalmente seguro: el proceso se ejecuta íntegramente dentro de tu navegador web sin enviar una sola copia a la nube." },
    ],
    relatedSlugs: ["unir-pdf", "dividir-pdf", "pdf-a-word"],
  },
};

export const ALL_SLUGS = Object.keys(CONVERSION_MATRIX);

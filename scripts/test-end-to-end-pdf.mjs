import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const SCREENSHOT_DIR = path.resolve(process.cwd(), 'screenshots');

async function run() {
  console.log('🚀 Iniciando prueba End-to-End de conversión de PDF a Word en Edge...');

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });

  page.on('console', (msg) => {
    console.log(`[BROWSER ${msg.type().toUpperCase()}]:`, msg.text());
  });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // Crear PDF multi-página de prueba
  const testPdfPath = path.resolve(process.cwd(), 'MANUAL_USM_test.pdf');
  const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 124 >>
stream
BT
/F1 18 Tf
50 720 Td
(MANUAL USM VERSION JUNIO 2023) Tj
/F1 12 Tf
0 -30 Td
(Este es un documento oficial con informacion tecnica y procedimientos estandar.) Tj
0 -20 Td
(Todos los parrafos y textos deben ser convertidos a Word editable con total fidelidad.) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000244 00000 n 
0000000419 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
498
%%EOF`;

  fs.writeFileSync(testPdfPath, pdfContent);

  console.log('📁 Subiendo MANUAL_USM_test.pdf al Dropzone...');
  const inputUpload = await page.$('input[type="file"]');
  await inputUpload.uploadFile(testPdfPath);
  await new Promise((r) => setTimeout(r, 1200));

  console.log('🔘 Haciendo clic en "Convertir archivo ahora"...');
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate((el) => el.textContent, btn);
    if (text && text.includes('Convertir')) {
      await btn.click();
      break;
    }
  }

  // Esperar a que la barra de progreso termine y aparezca el modal de éxito o el archivo completado
  console.log('⏳ Esperando procesamiento de PDF a Word...');
  let completed = false;
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 500));
    const isDone = await page.evaluate(() => {
      const modal = document.querySelector('h3');
      const text = modal ? modal.textContent : '';
      const hasDownload = !!document.querySelector('a[download]');
      return hasDownload || text.includes('listos para descargar');
    });

    if (isDone) {
      completed = true;
      console.log(`✅ ¡Conversión completada con éxito en ${i * 0.5 + 0.5} segundos!`);
      break;
    }
  }

  // Capturar pantalla del resultado
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'conversion-success.png') });
  console.log('📸 Captura de pantalla guardada en screenshots/conversion-success.png');

  await browser.close();
  try { fs.unlinkSync(testPdfPath); } catch (e) {}

  if (!completed) {
    throw new Error('La conversión no se completó en el tiempo esperado.');
  }
}

run().catch((err) => {
  console.error('❌ Error en prueba E2E:', err);
  process.exit(1);
});

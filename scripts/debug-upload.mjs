import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function run() {
  console.log('🚀 Iniciando Edge para reproducir la conversión de PDF...');

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();

  // Escuchar todos los errores del navegador
  page.on('console', async (msg) => {
    try {
      const args = await Promise.all(
        msg.args().map(async (arg) => {
          try {
            return await arg.executionContext().evaluate((val) => {
              if (val instanceof Error) {
                return `${val.name}: ${val.message}\n${val.stack}`;
              }
              return val;
            }, arg);
          } catch (e) {
            return arg.toString();
          }
        })
      );
      console.log(`[BROWSER CONSOLE ${msg.type().toUpperCase()}]:`, ...args);
    } catch (e) {
      console.log(`[BROWSER CONSOLE ${msg.type().toUpperCase()}]:`, msg.text());
    }
  });

  page.on('pageerror', (err) => {
    console.error(`[BROWSER UNCAUGHT ERROR]:`, err.message, err.stack);
  });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // Crear un PDF de prueba mínimo válido
  const samplePdfPath = path.resolve(process.cwd(), 'sample_test.pdf');
  const minimalPdf = `%PDF-1.4
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
<< /Length 44 >>
stream
BT
/F1 24 Tf
100 700 Td
(MANUAL USM PRUEBA DE CONVERSION) Tj
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
0000000338 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
417
%%EOF`;
  fs.writeFileSync(samplePdfPath, minimalPdf);

  console.log('📁 Cargando archivo sample_test.pdf en el Dropzone...');
  const inputUpload = await page.$('input[type="file"]');
  if (!inputUpload) {
    console.error('No se encontró el input file');
    await browser.close();
    return;
  }

  await inputUpload.uploadFile(samplePdfPath);
  await new Promise((r) => setTimeout(r, 1000));

  // Buscar el botón de convertir
  console.log('🔘 Haciendo clic en "Convertir archivo ahora"...');
  const buttons = await page.$$('button');
  let clicked = false;
  for (const btn of buttons) {
    const text = await page.evaluate((el) => el.textContent, btn);
    if (text && text.includes('Convertir')) {
      console.log(`  -> Encontrado botón: "${text.trim().substring(0, 40)}"`);
      await btn.click();
      clicked = true;
      break;
    }
  }

  if (!clicked) {
    console.log('Buscando cualquier botón de conversión...');
    for (const btn of buttons) {
      const text = await page.evaluate((el) => el.textContent, btn);
      if (text && text.includes('Convertir')) {
        await btn.click();
        clicked = true;
        break;
      }
    }
  }

  // Esperar a que ocurra el proceso o error
  console.log('⏳ Esperando resultado de conversión (5 segundos)...');
  await new Promise((r) => setTimeout(r, 5000));

  // Verificar el estado del archivo en pantalla
  const statusInfo = await page.evaluate(() => {
    const errorText = document.querySelector('.text-rose-500')?.textContent || null;
    const titleError = document.querySelector('[title]')?.getAttribute('title') || null;
    const completed = document.querySelector('.text-emerald-600')?.textContent || null;
    return { errorText, titleError, completed, html: document.body.innerHTML.substring(0, 500) };
  });

  console.log('📊 Estado de la UI tras intentar convertir:');
  console.log('  Error visible:', statusInfo.errorText);
  console.log('  Title error (tooltip):', statusInfo.titleError);
  console.log('  Éxito visible:', statusInfo.completed);

  await browser.close();
  try { fs.unlinkSync(samplePdfPath); } catch (e) {}
}

run().catch(console.error);

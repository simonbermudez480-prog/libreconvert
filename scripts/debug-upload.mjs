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
  await page.setViewport({ width: 1440, height: 900 });

  // Escuchar todos los errores del navegador
  page.on('console', (msg) => {
    console.log(`[BROWSER ${msg.type().toUpperCase()}]: ${msg.text()}`);
  });

  page.on('pageerror', (err) => {
    console.error(`[BROWSER UNCAUGHT ERROR]:`, err.message, err.stack);
  });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // Usar el archivo real del usuario (¡NUNCA BORRAR!)
  const samplePdfPath = 'C:\\Users\\simon\\Downloads\\MANUAL USM version junio2023.pdf';
  console.log('📁 Cargando archivo real del usuario:', samplePdfPath);
  const inputUpload = await page.$('input[type="file"]');
  if (!inputUpload) {
    console.error('No se encontró el input file');
    await browser.close();
    return;
  }

  await inputUpload.uploadFile(samplePdfPath);
  await new Promise((r) => setTimeout(r, 1500));

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

  // Polling hasta 40 segundos para ver si termina o da error
  console.log('⏳ Esperando resultado de conversión (hasta 40 segundos)...');
  let finished = false;
  let statusInfo = null;

  for (let i = 0; i < 40; i++) {
    await new Promise((r) => setTimeout(r, 1000));
    statusInfo = await page.evaluate(() => {
      // Buscar badges en las tarjetas de archivo
      const badges = Array.from(document.querySelectorAll('span')).map(s => s.textContent?.trim() || '');
      const hasErrorBadge = badges.some(t => t.includes('Error') || t.includes('Fallo'));
      const hasCompletedBadge = badges.some(t => t.includes('Completado') || t.includes('Descargar'));
      
      const errorDiv = document.querySelector('p.text-xs.text-rose-500, p.text-rose-500, div[class*="text-rose"]');
      const errorMsg = errorDiv ? errorDiv.textContent : null;

      const progressEl = document.querySelector('[role="progressbar"], div[class*="bg-indigo-600"]');
      const progressText = progressEl ? progressEl.getAttribute('style') : null;

      return { hasErrorBadge, hasCompletedBadge, errorMsg, progressText, badges: badges.filter(b => b.length > 0 && b.length < 30) };
    });

    if (statusInfo.hasErrorBadge || statusInfo.hasCompletedBadge) {
      console.log(`  -> Estado final detectado a los ${i + 1}s:`, statusInfo);
      finished = true;
      break;
    } else {
      if ((i + 1) % 5 === 0) {
        console.log(`  ... procesando (${i + 1}s)...`, statusInfo);
      }
    }
  }

  if (!finished) {
    console.log('  -> Tiempo de espera agotado.');
  }

  const screenshotsDir = path.resolve('screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }
  const screenshotPath = path.join(screenshotsDir, 'debug-real-file-result.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`📸 Captura guardada en: ${screenshotPath}`);

  console.log('📊 Estado final de la UI:');
  console.log('  Error visible:', statusInfo?.errorText);
  console.log('  Title error (tooltip):', statusInfo?.titleError);
  console.log('  Éxito visible:', statusInfo?.completed);

  await browser.close();
}

run().catch(console.error);

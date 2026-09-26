import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const SCREENSHOT_DIR = path.resolve(process.cwd(), 'screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function run() {
  console.log('🚀 Iniciando Edge headless para captura visual...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });

  // 1. Captura en Modo Claro (Homepage)
  console.log('📸 Capturando Homepage en Modo Claro...');
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  // Asegurar que no tenga clase dark
  await page.evaluate(() => document.documentElement.classList.remove('dark'));
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'home-light.png'), fullPage: true });

  // 2. Captura en Modo Oscuro (Homepage)
  console.log('📸 Capturando Homepage en Modo Oscuro...');
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
  await page.evaluate(() => document.documentElement.classList.add('dark'));
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'home-dark.png'), fullPage: true });

  console.log('📸 Capturando sección de contraste "¿Por qué LibreConvert?" en Modo Oscuro...');
  const sections = await page.$$('section');
  for (const s of sections) {
    const text = await page.evaluate(el => el.textContent, s);
    if (text && text.includes('Por qué LibreConvert')) {
      await s.screenshot({ path: path.join(SCREENSHOT_DIR, 'contrast-diff-dark.png') });
      console.log('  -> Guardado contrast-diff-dark.png');
      break;
    }
  }

  const footer = await page.$('footer');
  if (footer) {
    await footer.screenshot({ path: path.join(SCREENSHOT_DIR, 'footer-dark.png') });
  }

  // 4. Captura en Modo Oscuro de /convertir/pdf-a-word
  console.log('📸 Capturando /convertir/pdf-a-word en Modo Oscuro...');
  await page.goto('http://localhost:3000/convertir/pdf-a-word', { waitUntil: 'networkidle2' });
  await page.evaluate(() => document.documentElement.classList.add('dark'));
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'convertir-pdf-word-dark.png'), fullPage: true });

  await browser.close();
  console.log('✅ Todas las capturas generadas con éxito en:', SCREENSHOT_DIR);
}

run().catch((err) => {
  console.error('Error durante la captura:', err);
  process.exit(1);
});

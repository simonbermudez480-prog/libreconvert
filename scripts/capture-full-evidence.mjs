import puppeteer from 'puppeteer-core';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function captureEvidence() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1800 });

  // 1. Dark Mode full page
  await page.goto('http://localhost:3000/convertir/pdf-a-word', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.resolve('screenshots/conversion-dark-full.png'), fullPage: true });

  // 2. Light Mode full page
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.resolve('screenshots/conversion-light-full.png'), fullPage: true });

  await browser.close();
  console.log('✅ Capturas completas tomadas en modo oscuro y claro.');
}

captureEvidence().catch(console.error);

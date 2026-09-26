import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function capture() {
  const screenshotsDir = path.resolve('screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1400,1000'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 1000, deviceScaleFactor: 1 });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // === 1. LIGHT MODE CAPTURE ===
  await page.evaluate(() => {
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
  });
  await new Promise(r => setTimeout(r, 600));

  // Light Mode full page
  await page.screenshot({ path: path.join(screenshotsDir, 'home-human-light.png'), fullPage: true });

  // Light Mode Tool Cards Grid
  const toolsGrid = await page.$('div.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
  if (toolsGrid) {
    await toolsGrid.screenshot({ path: path.join(screenshotsDir, 'tools-grid-light.png') });
  }

  // Light Mode Human Stories & Manifesto Section
  await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h2'));
    const h2 = headings.find(h => h.innerText.includes('Diseñado para personas reales'));
    if (h2) h2.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(screenshotsDir, 'human-stories-light.png') });

  // === 2. DARK MODE CAPTURE ===
  await page.evaluate(() => {
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await new Promise(r => setTimeout(r, 600));

  // Dark Mode full page
  await page.screenshot({ path: path.join(screenshotsDir, 'home-human-dark.png'), fullPage: true });

  // Dark Mode Tool Cards Grid
  const toolsGridDark = await page.$('div.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
  if (toolsGridDark) {
    await toolsGridDark.screenshot({ path: path.join(screenshotsDir, 'tools-grid-dark.png') });
  }

  // Dark Mode Human Stories & Manifesto Section
  await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h2'));
    const h2 = headings.find(h => h.innerText.includes('Diseñado para personas reales'));
    if (h2) h2.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(screenshotsDir, 'human-stories-dark.png') });

  await browser.close();
  console.log('ALL_PRECISE_SCREENSHOTS_CAPTURED');
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});

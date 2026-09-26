import puppeteer from 'puppeteer-core';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function verifySingleHome() {
  const browser = await puppeteer.launch({ executablePath: EDGE_PATH, headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  const fileInput = await page.waitForSelector('input[type="file"]');
  await fileInput.uploadFile(path.resolve('test-singlepage.pdf'));
  await new Promise(r => setTimeout(r, 1000));
  const selectFormat = await page.$('select');
  if (selectFormat) await page.select('select', 'jpg');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.innerText.includes('Convertir'));
    if (btn) btn.click();
  });
  await page.waitForSelector('a[download]', { timeout: 15000 });
  const info = await page.evaluate(() => {
    const a = document.querySelector('a[download]');
    return { download: a.getAttribute('download'), buttonText: a.innerText };
  });
  console.log('SINGLE PAGE ON HOME RESULT:', info);
  await browser.close();
}

verifySingleHome().catch(console.error);

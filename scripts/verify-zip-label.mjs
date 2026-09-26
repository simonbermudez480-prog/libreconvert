import puppeteer from 'puppeteer-core';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function verifyZipLabel() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3000/convertir/pdf-a-jpg', { waitUntil: 'networkidle2' });

  const fileInput = await page.waitForSelector('input[type="file"]');
  await fileInput.uploadFile(path.resolve('test-multipage.pdf'));

  const delay = (ms) => new Promise(r => setTimeout(r, ms));
  await delay(1000);

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.innerText.includes('Convertir'));
    if (btn) btn.click();
  });

  await page.waitForSelector('a[download]', { timeout: 15000 });

  const info = await page.evaluate(() => {
    const a = document.querySelector('a[download]');
    const cardText = a?.closest('.p-4')?.innerText;
    return {
      download: a?.getAttribute('download'),
      buttonText: a?.innerText,
      cardText: cardText?.split('\n').filter(Boolean),
    };
  });

  console.log('VERIFIED MODAL DATA:');
  console.log(JSON.stringify(info, null, 2));

  const scPath = path.resolve('screenshots/pdf-to-image-verified-label.png');
  await page.screenshot({ path: scPath, fullPage: false });
  console.log('Screenshot saved to:', scPath);

  await browser.close();
}

verifyZipLabel().catch(console.error);

import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function testSingle() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  const downloadDir = path.resolve('test-downloads-single');
  if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir, { recursive: true });

  const client = await page.target().createCDPSession();
  await client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: downloadDir,
  });

  console.log('Navigating to http://localhost:3000/convertir/pdf-a-jpg...');
  await page.goto('http://localhost:3000/convertir/pdf-a-jpg', { waitUntil: 'networkidle2' });

  const fileInput = await page.waitForSelector('input[type="file"]');
  await fileInput.uploadFile(path.resolve('test-singlepage.pdf'));
  console.log('File uploaded.');

  await new Promise(r => setTimeout(r, 1000));

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.innerText.includes('Convertir'));
    if (btn) btn.click();
  });
  console.log('Clicked convert button.');

  await page.waitForSelector('a[download]', { timeout: 15000 });
  const info = await page.evaluate(() => {
    const a = document.querySelector('a[download]');
    return { download: a.getAttribute('download'), text: a.innerText };
  });
  console.log('SINGLE PAGE RESULT:', info);

  await page.click('a[download]');
  await new Promise(r => setTimeout(r, 2000));

  const files = fs.readdirSync(downloadDir);
  console.log('DOWNLOADED:', files);
  for (const f of files) {
    const full = path.join(downloadDir, f);
    const buf = fs.readFileSync(full);
    console.log(f, 'size:', buf.length, 'hex:', buf.slice(0, 8).toString('hex'));
  }

  await browser.close();
}

testSingle().catch(console.error);

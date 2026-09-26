import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import JSZip from 'jszip';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function testUserRealPdf() {
  const userPdf = 'C:\\Users\\simon\\Downloads\\MANUAL USM version junio2023.pdf';
  if (!fs.existsSync(userPdf)) {
    console.error('User PDF not found at', userPdf);
    return;
  }

  console.log('Testing with real user file:', userPdf, 'size:', (fs.statSync(userPdf).size / 1024 / 1024).toFixed(2), 'MB');

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  const downloadDir = path.resolve('test-downloads-user-pdf');
  if (fs.existsSync(downloadDir)) fs.rmSync(downloadDir, { recursive: true, force: true });
  fs.mkdirSync(downloadDir, { recursive: true });

  const client = await page.target().createCDPSession();
  await client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: downloadDir,
  });

  page.on('console', msg => {
    if (msg.type() === 'error') console.log('PAGE ERROR:', msg.text());
  });

  const delay = (ms) => new Promise(r => setTimeout(r, ms));

  console.log('Navigating to http://localhost:3000/convertir/pdf-a-jpg...');
  await page.goto('http://localhost:3000/convertir/pdf-a-jpg', { waitUntil: 'networkidle2' });

  const fileInput = await page.waitForSelector('input[type="file"]');
  await fileInput.uploadFile(userPdf);
  console.log('User PDF uploaded to /convertir/pdf-a-jpg.');

  await delay(1000);

  // Click Convertir button
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.innerText.includes('Convertir'));
    if (btn) btn.click();
  });
  console.log('Clicked convert button, converting all 156 pages...');

  // Wait for celebration modal (may take 20-30s for 156 pages)
  await page.waitForSelector('a[download]', { timeout: 120000 });
  console.log('Conversion completed! Download link appeared.');

  const info = await page.evaluate(() => {
    const a = document.querySelector('a[download]');
    const cardText = a?.closest('.p-4')?.innerText;
    return {
      download: a?.getAttribute('download'),
      href: a?.getAttribute('href'),
      buttonText: a?.innerText,
      cardText: cardText?.split('\n').filter(Boolean),
    };
  });
  console.log('CELEBRATION MODAL DISPLAY & ATTRIBUTES:');
  console.log(JSON.stringify(info, null, 2));

  // Take screenshot of the CelebrationModal for visual evidence
  const scPath = path.resolve('screenshots/pdf-to-image-user-success.png');
  await page.screenshot({ path: scPath, fullPage: false });
  console.log('Screenshot saved to:', scPath);

  // Click download
  await page.click('a[download]');
  await delay(3000);

  const downloadedFiles = fs.readdirSync(downloadDir);
  console.log('FILES IN DOWNLOAD DIR:', downloadedFiles);

  for (const f of downloadedFiles) {
    const full = path.join(downloadDir, f);
    const stat = fs.statSync(full);
    const fd = fs.openSync(full, 'r');
    const header = Buffer.alloc(10);
    fs.readSync(fd, header, 0, 10, 0);
    fs.closeSync(fd);
    console.log(`Downloaded: ${f}, Size: ${(stat.size / 1024 / 1024).toFixed(2)} MB, Header: ${header.toString('hex')} (Text: ${header.toString('utf-8')})`);

    // Verify it is a valid ZIP with 156 valid JPG images
    const buf = fs.readFileSync(full);
    const zip = await JSZip.loadAsync(buf);
    const entries = Object.keys(zip.files);
    console.log(`Total valid images in ZIP: ${entries.length}`);
    const sample = await zip.file(entries[0]).async('nodebuffer');
    console.log(`First image (${entries[0]}) header: ${sample.slice(0, 4).toString('hex')} (is JPEG: ${sample.slice(0, 4).toString('hex') === 'ffd8ffe0'})`);
  }

  await browser.close();
}

testUserRealPdf().catch(console.error);

import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function testPdfToImage() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  
  // Set download behavior
  const downloadDir = path.resolve('test-downloads');
  if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir, { recursive: true });

  const client = await page.target().createCDPSession();
  await client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: downloadDir,
  });

  // Track console errors
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('PAGE ERROR:', msg.text());
  });

  const delay = (ms) => new Promise(r => setTimeout(r, ms));

  console.log('--- TEST 1: Dedicated Page /convertir/pdf-a-jpg ---');
  await page.goto('http://localhost:3000/convertir/pdf-a-jpg', { waitUntil: 'networkidle2' });

  const fileInput = await page.$('input[type="file"]');
  const testPdfPath = path.resolve('test-multipage.pdf');
  await fileInput.uploadFile(testPdfPath);
  console.log('File uploaded to /convertir/pdf-a-jpg');

  await delay(1000);

  // Click start conversion
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.innerText.includes('Convertir'));
    if (btn) btn.click();
  });
  console.log('Clicking convert button...');

  // Wait for celebration modal or download button
  await page.waitForSelector('a[download]', { timeout: 15000 });
  console.log('Download link appeared!');

  const downloadInfo = await page.evaluate(() => {
    const link = document.querySelector('a[download]');
    return {
      href: link?.getAttribute('href'),
      download: link?.getAttribute('download'),
      text: link?.innerText,
    };
  });
  console.log('DOWNLOAD INFO IN DEDICATED CONVERTER:', downloadInfo);

  // Click download
  await page.click('a[download]');
  await delay(2000);

  console.log('--- TEST 2: Homepage / ---');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  const homeFileInput = await page.$('input[type="file"]');
  await homeFileInput.uploadFile(testPdfPath);
  console.log('File uploaded to Homepage');
  await delay(1000);

  // Select format JPG
  // Check format selector
  const selectFormat = await page.$('select');
  if (selectFormat) {
    await page.select('select', 'jpg');
    console.log('Selected format: jpg');
  }

  // Click Convertir button
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.innerText.includes('Convertir'));
    if (btn) btn.click();
  });
  console.log('Clicked home convert button...');

  await page.waitForSelector('a[download]', { timeout: 15000 });
  console.log('Home download link appeared!');

  const homeDownloadInfo = await page.evaluate(() => {
    const link = document.querySelector('a[download]');
    return {
      href: link?.getAttribute('href'),
      download: link?.getAttribute('download'),
      text: link?.innerText,
    };
  });
  console.log('DOWNLOAD INFO ON HOMEPAGE:', homeDownloadInfo);

  await page.click('a[download]');
  await delay(2000);

  // Check downloaded files
  const downloadedFiles = fs.readdirSync(downloadDir);
  console.log('DOWNLOADED FILES IN DIRECTORY:', downloadedFiles);

  for (const f of downloadedFiles) {
    const full = path.join(downloadDir, f);
    const stat = fs.statSync(full);
    const fd = fs.openSync(full, 'r');
    const header = Buffer.alloc(10);
    fs.readSync(fd, header, 0, 10, 0);
    fs.closeSync(fd);
    console.log(`File: ${f}, Size: ${stat.size} bytes, Header Hex: ${header.toString('hex')}, Header Text: ${header.toString('utf-8')}`);
  }

  await browser.close();
}

testPdfToImage().catch(console.error);

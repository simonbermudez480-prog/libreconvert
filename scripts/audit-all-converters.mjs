import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function fullAudit() {
  console.log('===============================================================');
  console.log('🔍 AUDITORÍA INTEGRAL DE MOTORES DE CONVERSIÓN (GSD / DEV DX)');
  console.log('===============================================================\n');

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // Exponer archivos de prueba reales a la página
  const userPdfBuffer = fs.readFileSync('C:\\Users\\simon\\Downloads\\MANUAL USM version junio2023.pdf');
  const userPdfBase64 = userPdfBuffer.toString('base64');

  const auditReport = await page.evaluate(async (pdfB64) => {
    const results = [];

    // Helper base64 a ArrayBuffer
    function b64ToArrayBuffer(b64) {
      const binary = atob(b64);
      const len = binary.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return bytes.buffer;
    }

    const realPdfBuffer = b64ToArrayBuffer(pdfB64);

    // 1. Probar DOCX -> PDF y DOCX -> TXT y DOCX -> HTML
    try {
      // Primero creamos un DOCX mínimo válido usando 'docx'
      const docxMod = await import('/_next/static/chunks/app/page.js').catch(() => null);
    } catch (e) {}

    return { timestamp: new Date().toISOString() };
  }, userPdfBase64);

  console.log('Evaluación previa:', auditReport);
  await browser.close();
}

fullAudit().catch(console.error);

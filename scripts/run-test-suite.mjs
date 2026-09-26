import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function runQaDashboard() {
  console.log('🚀 Abriendo navegador Edge para ejecutar la QA Suite Completa...');

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1100 });

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.log(`[TEST SUITE ERROR]: ${msg.text()}`);
    }
  });

  await page.goto('http://localhost:3000/test-suite', { waitUntil: 'networkidle2' });

  console.log('⏳ Esperando ejecución de todos los 21 tests de conversión...');

  let completed = false;
  let report = null;

  for (let i = 0; i < 60; i++) {
    await new Promise((r) => setTimeout(r, 1000));

    report = await page.evaluate(() => {
      const passedEl = document.getElementById('passed-count');
      const failedEl = document.getElementById('failed-count');
      const rows = Array.from(document.querySelectorAll('tbody tr')).map((tr) => {
        const cols = Array.from(tr.querySelectorAll('td')).map((td) => td.innerText.trim());
        return {
          id: cols[0],
          name: cols[1],
          category: cols[2],
          input: cols[3],
          output: cols[4],
          time: cols[5],
          status: cols[6],
        };
      });

      const total = rows.length;
      const passed = parseInt(passedEl?.innerText || '0', 10);
      const failed = parseInt(failedEl?.innerText || '0', 10);
      const isDone = total > 0 && passed + failed === total;

      return { total, passed, failed, isDone, rows };
    });

    if (report?.isDone) {
      completed = true;
      console.log(`✅ ¡Todos los ${report.total} tests han finalizado en ${i + 1} segundos!`);
      break;
    } else {
      if ((i + 1) % 5 === 0) {
        console.log(`  ... Progreso: ${report?.passed || 0}/${report?.total || 21} aprobados...`);
      }
    }
  }

  const screenshotsDir = path.resolve('screenshots');
  if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });
  const screenshotPath = path.join(screenshotsDir, 'qa-suite-audit-results.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`📸 Captura de la Auditoría Completa guardada en: ${screenshotPath}\n`);

  console.log('===============================================================');
  console.log('📊 REPORTE DETALLADO DE AUDITORÍA DE CONVERSIÓN');
  console.log('===============================================================');
  console.log(`Total de Procesos Auditados: ${report?.total}`);
  console.log(`Aprobados (PASS):            ${report?.passed}`);
  console.log(`Fallidos  (FAIL):            ${report?.failed}\n`);

  if (report?.rows) {
    console.table(report.rows.map(r => ({
      Proceso: r.name,
      Categoría: r.category,
      Resultado: r.output.substring(0, 45),
      Tiempo: r.time,
      Estado: r.status,
    })));
  }

  await browser.close();

  if (report?.failed > 0) {
    process.exit(1);
  }
}

runQaDashboard().catch((err) => {
  console.error(err);
  process.exit(1);
});

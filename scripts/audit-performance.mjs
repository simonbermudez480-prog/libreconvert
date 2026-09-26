import puppeteer from 'puppeteer-core';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function auditUrl(url) {
  console.log(`\n==================================================`);
  console.log(`🔍 AUDITANDO: ${url}`);
  console.log(`==================================================`);

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();

  let totalTransferBytes = 0;
  const requests = [];

  page.on('response', async (response) => {
    try {
      const headers = response.headers();
      const length = headers['content-length'] ? parseInt(headers['content-length'], 10) : 0;
      totalTransferBytes += length;
      requests.push({
        url: response.url(),
        status: response.status(),
        type: response.request().resourceType(),
        size: length,
      });
    } catch (e) {}
  });

  const startTime = Date.now();
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  const totalLoadTime = Date.now() - startTime;

  // 1. Performance & Core Web Vitals from browser Performance API
  const metrics = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');
    const fcp = paint.find((p) => p.name === 'first-contentful-paint')?.startTime || 0;

    return {
      fcp: Math.round(fcp),
      domContentLoaded: Math.round(nav ? nav.domContentLoadedEventEnd - nav.startTime : 0),
      loadTime: Math.round(nav ? nav.loadEventEnd - nav.startTime : 0),
      jsHeapUsedSize: performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) : 'N/A',
    };
  });

  // 2. SEO Audit
  const seo = await page.evaluate(() => {
    const title = document.title;
    const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
    const robots = document.querySelector('meta[name="robots"]')?.getAttribute('content');
    const h1s = Array.from(document.querySelectorAll('h1')).map((h) => h.innerText.trim());
    const h2s = Array.from(document.querySelectorAll('h2')).map((h) => h.innerText.trim());
    const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
    const ogDesc = document.querySelector('meta[property="og:description"]')?.getAttribute('content');
    const hreflangs = Array.from(document.querySelectorAll('link[rel="alternate"]')).map((l) => ({
      lang: l.getAttribute('hreflang'),
      href: l.getAttribute('href'),
    }));

    // JSON-LD
    const jsonLdScripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(
      (s) => {
        try {
          return JSON.parse(s.textContent || '{}');
        } catch (e) {
          return { error: 'Invalid JSON' };
        }
      }
    );

    return {
      title,
      metaDesc,
      canonical,
      robots,
      h1Count: h1s.length,
      h1s,
      h2Count: h2s.length,
      h2s,
      ogTitle,
      ogDesc,
      hreflangs,
      jsonLdCount: jsonLdScripts.length,
      jsonLdTypes: jsonLdScripts.map((j) => j['@type'] || j.error),
      jsonLdRaw: jsonLdScripts,
    };
  });

  // 3. Resource breakdown
  const jsRequests = requests.filter((r) => r.type === 'script');
  const totalJsSize = jsRequests.reduce((acc, r) => acc + r.size, 0);

  console.log(`\n⚡ RENDIMIENTO:`);
  console.log(`  - FCP (First Contentful Paint): ${metrics.fcp} ms`);
  console.log(`  - DOM Content Loaded: ${metrics.domContentLoaded} ms`);
  console.log(`  - Tiempo Total Carga: ${totalLoadTime} ms`);
  console.log(`  - Memoria JS Heap: ${metrics.jsHeapUsedSize} MB`);
  console.log(`  - Peticiones Totales: ${requests.length}`);
  console.log(`  - Scripts JS: ${jsRequests.length} archivos (~${Math.round(totalJsSize / 1024)} KB transferidos)`);

  console.log(`\n🎯 SEO AUDIT:`);
  console.log(`  - Title (${seo.title?.length || 0} car.): "${seo.title}"`);
  console.log(`  - Description (${seo.metaDesc?.length || 0} car.): "${seo.metaDesc}"`);
  console.log(`  - Canonical: ${seo.canonical || '❌ NO DEFINIDO'}`);
  console.log(`  - H1 count: ${seo.h1Count} ${seo.h1Count === 1 ? '✅' : '⚠️'}`);
  if (seo.h1s.length) console.log(`    H1: "${seo.h1s[0]}"`);
  console.log(`  - H2 count: ${seo.h2Count}`);
  console.log(`  - Hreflangs: ${seo.hreflangs.length} enlaces alternativos`);
  console.log(`  - OpenGraph Title: ${seo.ogTitle ? '✅' : '❌'}`);

  console.log(`\n🤖 GEO (Generative Engine Optimization) & SCHEMA.ORG:`);
  console.log(`  - Esquemas JSON-LD detectados: ${seo.jsonLdCount}`);
  console.log(`  - Tipos Schema: ${JSON.stringify(seo.jsonLdTypes)}`);

  await browser.close();

  return { metrics, seo, requestsCount: requests.length, totalJsSize };
}

async function run() {
  console.log('🚀 INICIANDO AUDITORÍA INTEGRAL DE SEO, GEO Y RENDIMIENTO...');
  await auditUrl('http://localhost:3000');
  await auditUrl('http://localhost:3000/convertir/pdf-a-word');
  await auditUrl('http://localhost:3000/convertir/word-a-pdf');
}

run().catch(console.error);

import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function auditSeoAndGeo() {
  console.log('================================================================');
  console.log('🌐 AUDITORÍA EXHAUSTIVA DE SEO MUNDIAL, GEO, FAVICONS Y OPENGRAPH');
  console.log('================================================================\n');

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. AUDITORÍA DE ARCHIVOS FÍSICOS DE BRANDING
  console.log('▶️ 1. Verificando Conjunto Completo de Iconos y Favicons en public/...');
  const requiredFiles = [
    'public/favicon.ico',
    'public/favicon-32x32.png',
    'public/apple-touch-icon.png',
    'public/icon-192.png',
    'public/icon-512.png',
    'public/og-image.png',
    'public/icon.svg',
  ];

  const fileChecks = requiredFiles.map((file) => {
    const exists = fs.existsSync(path.resolve(file));
    const size = exists ? fs.statSync(path.resolve(file)).size : 0;
    return { file, exists, size };
  });

  console.table(fileChecks.map(f => ({
    Archivo: f.file,
    Estado: f.exists ? '✅ PRESENTE' : '❌ FALTA',
    Tamaño: f.exists ? `${(f.size / 1024).toFixed(1)} KB` : '-',
  })));

  // 2. AUDITORÍA DE ROBOTS.TXT
  console.log('\n▶️ 2. Auditando robots.txt para Motores de Búsqueda y Rastreadores IA...');
  const robotsRes = await page.goto('http://localhost:3000/robots.txt');
  const robotsText = await robotsRes.text();
  console.log('  Contenido de robots.txt:\n' + robotsText.split('\n').map(l => '    ' + l).join('\n'));

  const hasGptBot = robotsText.includes('GPTBot');
  const hasPerplexity = robotsText.includes('PerplexityBot');
  const hasClaude = robotsText.includes('ClaudeBot');
  const hasSitemap = robotsText.includes('sitemap.xml');
  console.log('  Verificación de Bots IA:');
  console.log(`    - GPTBot (ChatGPT/SearchGPT):  ${hasGptBot ? '✅ PERMITIDO' : '❌ FALTA'}`);
  console.log(`    - PerplexityBot:             ${hasPerplexity ? '✅ PERMITIDO' : '❌ FALTA'}`);
  console.log(`    - ClaudeBot:                 ${hasClaude ? '✅ PERMITIDO' : '❌ FALTA'}`);
  console.log(`    - Enlace a Sitemap.xml:      ${hasSitemap ? '✅ PRESENTE' : '❌ FALTA'}`);

  // 3. AUDITORÍA DE SITEMAP.XML
  console.log('\n▶️ 3. Auditando sitemap.xml...');
  const sitemapRes = await page.goto('http://localhost:3000/sitemap.xml');
  const sitemapText = await sitemapRes.text();
  const totalUrlsInSitemap = (sitemapText.match(/<loc>/g) || []).length;
  const hasHreflangInSitemap = sitemapText.includes('hreflang') || sitemapText.includes('xhtml:link');
  console.log(`  Total URLs indexadas en sitemap: ${totalUrlsInSitemap}`);
  console.log(`  Hreflang multi-idioma en sitemap: ${hasHreflangInSitemap ? '✅ CONFIGURADO' : '⚠️ ESTÁNDAR XML'}`);

  // 4. AUDITORÍA DE METADATOS Y GEO EN HOMEPAGE
  console.log('\n▶️ 4. Auditando Metadata, GEO y OpenGraph en Homepage (http://localhost:3000)...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  const homeSeo = await page.evaluate(() => {
    const title = document.title;
    const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
    const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
    const ogDesc = document.querySelector('meta[property="og:description"]')?.getAttribute('content');
    const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content');
    const twitterCard = document.querySelector('meta[name="twitter:card"]')?.getAttribute('content');
    const geoRegion = document.querySelector('meta[name="geo.region"]')?.getAttribute('content');
    const distribution = document.querySelector('meta[name="distribution"]')?.getAttribute('content');

    const hreflangs = Array.from(document.querySelectorAll('link[rel="alternate"][hreflang]')).map(el => ({
      lang: el.getAttribute('hreflang'),
      href: el.getAttribute('href'),
    }));

    const jsonLdScripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(el => {
      try {
        return JSON.parse(el.textContent || '{}');
      } catch (e) {
        return null;
      }
    });

    return {
      title,
      metaDesc,
      canonical,
      ogTitle,
      ogDesc,
      ogImage,
      twitterCard,
      geoRegion,
      distribution,
      hreflangsCount: hreflangs.length,
      hreflangsSample: hreflangs.slice(0, 6),
      jsonLdCount: jsonLdScripts.length,
      jsonLdTypes: jsonLdScripts.flatMap(s => (s && s['@graph'] ? s['@graph'].map(g => g['@type']) : [s ? s['@type'] : null])),
    };
  });

  console.log('  Título de la página:       ', homeSeo.title);
  console.log('  Meta descripción:          ', homeSeo.metaDesc);
  console.log('  URL Canónica:              ', homeSeo.canonical);
  console.log('  OpenGraph Banner:          ', homeSeo.ogImage);
  console.log('  Twitter Card:              ', homeSeo.twitterCard);
  console.log('  Meta GEO Region:           ', homeSeo.geoRegion);
  console.log('  Distribución Mundial:      ', homeSeo.distribution);
  console.log(`  Total Hreflang Multi-País:  ${homeSeo.hreflangsCount} configurados`);
  console.log('  Tipos Schema.org JSON-LD:  ', homeSeo.jsonLdTypes);

  // 5. AUDITORÍA EN PÁGINA PROGRAMÁTICA (PDF A WORD)
  console.log('\n▶️ 5. Auditando Página de Conversión Programática (http://localhost:3000/convertir/pdf-a-word)...');
  await page.goto('http://localhost:3000/convertir/pdf-a-word', { waitUntil: 'networkidle2' });

  const converterSeo = await page.evaluate(() => {
    const title = document.title;
    const h1 = document.querySelector('h1')?.innerText;
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
    const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content');
    const jsonLdScripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(el => {
      try {
        return JSON.parse(el.textContent || '{}');
      } catch (e) {
        return null;
      }
    });

    return {
      title,
      h1,
      canonical,
      ogImage,
      jsonLdTypes: jsonLdScripts.map(s => s['@type']).filter(Boolean),
    };
  });

  console.log('  Título:                    ', converterSeo.title);
  console.log('  Encabezado H1:             ', converterSeo.h1);
  console.log('  URL Canónica:              ', converterSeo.canonical);
  console.log('  OpenGraph Banner:          ', converterSeo.ogImage);
  console.log('  Esquemas Schema.org:       ', converterSeo.jsonLdTypes);

  // Captura de evidencia visual de la página con metadatos
  const scPath = path.resolve('screenshots/seo-geo-audit-verified.png');
  await page.screenshot({ path: scPath, fullPage: false });
  console.log(`\n📸 Captura guardada en: ${scPath}`);

  await browser.close();
  console.log('\n================================================================');
  console.log('🏁 AUDITORÍA DE SEO Y GEO COMPLETADA CON ÉXITO');
  console.log('================================================================');
}

auditSeoAndGeo().catch(console.error);

import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function generateAssets() {
  console.log('🎨 Generando conjunto completo de Iconos, Favicon y OpenGraph...');

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // 1. Renderizar Logo Cuadrado para Iconos (180x180, 192x192, 512x512, 32x32)
  const iconSvgHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            width: 512px;
            height: 512px;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .box {
            width: 512px;
            height: 512px;
            border-radius: 110px;
            background: #181512;
            border: 12px solid #E76F51;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            box-shadow: 0 20px 50px rgba(0,0,0,0.6);
          }
          svg {
            width: 300px;
            height: 300px;
          }
        </style>
      </head>
      <body>
        <div class="box">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 26H48M48 26L38 16M48 26L38 36" stroke="#E76F51" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M48 38H16M16 38L26 28M16 38L26 48" stroke="#F4A261" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </body>
    </html>
  `;

  await page.setContent(iconSvgHtml);
  await page.setViewport({ width: 512, height: 512, deviceScaleFactor: 1 });

  // 512x512
  const icon512Path = path.resolve('public/icon-512.png');
  await page.screenshot({ path: icon512Path, omitBackground: true });
  console.log('  ✅ Creado:', icon512Path);

  // 192x192
  await page.setViewport({ width: 192, height: 192, deviceScaleFactor: 1 });
  const icon192Path = path.resolve('public/icon-192.png');
  await page.screenshot({ path: icon192Path, omitBackground: true });
  console.log('  ✅ Creado:', icon192Path);

  // 180x180 (Apple Touch Icon)
  await page.setViewport({ width: 180, height: 180, deviceScaleFactor: 1 });
  const appleTouchPath = path.resolve('public/apple-touch-icon.png');
  await page.screenshot({ path: appleTouchPath, omitBackground: true });
  console.log('  ✅ Creado:', appleTouchPath);

  // 32x32 Favicon PNG
  await page.setViewport({ width: 32, height: 32, deviceScaleFactor: 1 });
  const favicon32Path = path.resolve('public/favicon-32x32.png');
  await page.screenshot({ path: favicon32Path, omitBackground: true });
  console.log('  ✅ Creado:', favicon32Path);

  // Favicon.ico (usamos la imagen PNG de 32x32 copiada como favicon.ico para compatibilidad máxima)
  fs.copyFileSync(favicon32Path, path.resolve('public/favicon.ico'));
  console.log('  ✅ Creado: public/favicon.ico');

  // 2. Renderizar OpenGraph Banner (1200 x 630)
  const ogHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
          body {
            width: 1200px;
            height: 630px;
            background: #181512;
            color: #FAF8F5;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 70px 80px;
            position: relative;
            overflow: hidden;
          }
          .glow {
            position: absolute;
            width: 600px;
            height: 600px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(231,111,81,0.18) 0%, rgba(244,162,97,0.05) 50%, transparent 70%);
            top: -100px;
            right: -100px;
          }
          .header {
            display: flex;
            align-items: center;
            gap: 20px;
            z-index: 10;
          }
          .logo-badge {
            width: 64px;
            height: 64px;
            border-radius: 18px;
            background: #241E1A;
            border: 2px solid #E76F51;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .logo-text {
            font-size: 38px;
            font-weight: 900;
            letter-spacing: -1px;
            color: #ffffff;
          }
          .logo-text span {
            color: #E76F51;
          }
          .pill {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            background: rgba(16, 185, 129, 0.15);
            border: 1px solid rgba(16, 185, 129, 0.4);
            border-radius: 30px;
            color: #34D399;
            font-size: 16px;
            font-weight: 700;
            width: fit-content;
            margin-bottom: 24px;
          }
          .content {
            z-index: 10;
            max-width: 900px;
          }
          h1 {
            font-size: 58px;
            font-weight: 900;
            line-height: 1.1;
            letter-spacing: -1.5px;
            margin-bottom: 20px;
          }
          h1 span {
            background: linear-gradient(135deg, #F4A261, #E76F51);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          p {
            font-size: 24px;
            line-height: 1.4;
            color: #A89A8D;
          }
          .footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid #302822;
            padding-top: 30px;
            z-index: 10;
          }
          .features {
            display: flex;
            gap: 30px;
            font-size: 18px;
            font-weight: 700;
            color: #E8DCCF;
          }
          .domain {
            font-size: 22px;
            font-weight: 800;
            color: #E76F51;
          }
        </style>
      </head>
      <body>
        <div class="glow"></div>
        <div class="header">
          <div class="logo-badge">
            <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
              <path d="M16 26H48M48 26L38 16M48 26L38 36" stroke="#E76F51" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M48 38H16M16 38L26 28M16 38L26 48" stroke="#F4A261" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="logo-text">Libre<span>Convert</span></div>
        </div>

        <div class="content">
          <div class="pill">
            <span>🛡️ 100% Client-Side Wasm • Cero Servidores</span>
          </div>
          <h1>Convertir Word a PDF, PDF a Word y más <span>gratis y privado</span></h1>
          <p>Tus archivos jamás abandonan tu ordenador. Sin registros, sin límites diarios y con velocidad instantánea.</p>
        </div>

        <div class="footer">
          <div class="features">
            <span>✓ Word / PDF / JPG / Excel</span>
            <span>✓ Privacidad Absoluta</span>
            <span>✓ 100% Gratis</span>
          </div>
          <div class="domain">libreconvert.com</div>
        </div>
      </body>
    </html>
  `;

  await page.setContent(ogHtml);
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  const ogImagePath = path.resolve('public/og-image.png');
  await page.screenshot({ path: ogImagePath });
  console.log('  ✅ Creado:', ogImagePath);

  await browser.close();
  console.log('🎉 Todos los iconos y gráficos de branding generados con éxito.');
}

generateAssets().catch(console.error);

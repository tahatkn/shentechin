/* İkon üretici.  Çalıştırma:  node tools/favicon.mjs

   Neden var: Google arama sonuçlarında site ikonu göstermek için
   /favicon.ico adresinde GERÇEK bir dosya ve 48 pikselin katı boyutlarda
   PNG'ler bekliyor. Yalnızca SVG ikonu olan siteler arama sonucunda
   çoğu zaman boş bir küre ikonu ile çıkıyor.

   Üretilenler (hepsi depoya işlenir, derleme bunlara bağımlı DEĞİLDİR):
     favicon.ico            16 + 32 + 48  (klasik konum, Googlebot buraya bakar)
     favicon-96x96.png      96   = 48 × 2
     icon-192.png           192  = 48 × 4   (manifest)
     icon-512.png           512  = 48 × ... (manifest, "any")
     icon-maskable-512.png  512  (manifest, "maskable" — %80 güvenli alan)
     apple-touch-icon.png   180  (iOS ana ekran)

   Nasıl: ImageMagick'in kendi SVG çizici gradyanı ve yolu boşa çıkarıyor
   (test edildi: düz siyah kare). Bu yüzden çizim, makinede zaten yüklü olan
   Chrome ile 512 px'te bir kez çiziliyor; küçük boyutlar bu ana görüntüden
   Lanczos ile indiriliyor. ICO paketini ImageMagick yazıyor (PNG → ICO
   yolunda SVG çiziciye ihtiyaç yok).

   macOS'ta headless Chrome pencereyi 500 CSS pikselin altına indirmiyor;
   ana görüntünün 512 px olmasının sebebi budur. */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/* ---------------------------------------------------------------
   Çizim — favicon.svg ile birebir aynı olmalı
   --------------------------------------------------------------- */

/* pad: kenardaki boşluk oranı. Maskable ikonda çizim %80'lik güvenli
   dairenin içinde kalmalı, bu yüzden zemin taşar, nabız küçülür. */
function artwork({ radius = 14, pad = 0 } = {}) {
  const pulse = `<path d="M7 37h13l7-19 7 25 5-6h18" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`;
  const inner = pad === 0 ? pulse
    : `<g transform="translate(${(64 * pad).toFixed(2)} ${(64 * pad).toFixed(2)}) scale(${(1 - pad * 2).toFixed(4)})">${pulse}</g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="#38bdf8"/><stop offset="1" stop-color="#2563eb"/>
</linearGradient></defs>
<rect width="64" height="64" rx="${radius}" fill="url(#g)"/>
${inner}</svg>`;
}

/* ---------------------------------------------------------------
   Chrome
   --------------------------------------------------------------- */

const CHROME_CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser'
];

function runChrome(chrome, args, outFile) {
  return new Promise((resolve, reject) => {
    const child = spawn(chrome, [
      '--headless=old', '--disable-gpu', '--hide-scrollbars',
      '--no-first-run', '--no-default-browser-check', '--disable-extensions',
      '--disable-background-networking', '--disable-sync',
      '--force-device-scale-factor=1', '--force-color-profile=srgb',
      '--default-background-color=00000000',
      `--user-data-dir=${fs.mkdtempSync(path.join(os.tmpdir(), 'stq-icon-'))}`,
      ...args
    ], { stdio: 'ignore' });

    let settled = false;
    const done = (err) => {
      if (settled) return;
      settled = true;
      clearInterval(poll); clearTimeout(cap);
      try { child.kill('SIGKILL'); } catch { /* zaten bitmiş */ }
      err ? reject(err) : resolve();
    };
    child.on('error', done);
    child.on('exit', () => done());

    let last = -1, stable = 0;
    const poll = setInterval(() => {
      const size = fs.existsSync(outFile) ? fs.statSync(outFile).size : 0;
      if (size > 0 && size === last) { if (++stable >= 3) done(); } else stable = 0;
      last = size;
    }, 200);
    const cap = setTimeout(() => done(new Error('Chrome zaman aşımı')), 30000);
  });
}

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: ['ignore', 'ignore', 'pipe'] });
    let err = '';
    child.stderr.on('data', (d) => { err += d; });
    child.on('error', reject);
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd}: ${err.trim()}`))));
  });
}

/* Chrome ile tek bir 512 px ana görüntü çiz. */
async function master(chrome, svg, out) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'stq-svg-'));
  const html = path.join(tmp, 'i.html');
  fs.writeFileSync(html, `<!DOCTYPE html><meta charset="utf-8">
<style>html,body{margin:0;padding:0;background:transparent}
svg{display:block;width:512px;height:512px}</style>${svg}`);
  if (fs.existsSync(out)) fs.rmSync(out);
  await runChrome(chrome, [
    `--screenshot=${out}`, '--window-size=512,512', '--virtual-time-budget=3000',
    'file://' + html
  ], out);
  fs.rmSync(tmp, { recursive: true, force: true });
  if (!fs.existsSync(out)) throw new Error('ana görüntü yazılamadı: ' + out);
}

/* ---------------------------------------------------------------
   Akış
   --------------------------------------------------------------- */

const chrome = CHROME_CANDIDATES.find((p) => fs.existsSync(p));
if (!chrome) {
  console.error('Chrome bulunamadı — ikonlar üretilemedi.');
  console.error('Depodaki mevcut ikonlar korundu.');
  process.exit(1);
}

const work = fs.mkdtempSync(path.join(os.tmpdir(), 'stq-icons-'));
const squareMaster = path.join(work, 'square.png');   /* köşeleri yuvarlak */
const fullMaster = path.join(work, 'full.png');       /* taşan zemin, maskable */

await master(chrome, artwork({ radius: 14 }), squareMaster);
await master(chrome, artwork({ radius: 0, pad: 0.14 }), fullMaster);

const resize = (src, size, out) =>
  run('magick', [src, '-filter', 'Lanczos', '-resize', `${size}x${size}`,
    '-strip', '-define', 'png:color-type=6', path.join(ROOT, out)]);

/* Google arama sonucu ikonu: 48'in katı olan boyutlar. */
await resize(squareMaster, 96, 'favicon-96x96.png');
await resize(squareMaster, 192, 'icon-192.png');
await resize(squareMaster, 512, 'icon-512.png');
await resize(squareMaster, 180, 'apple-touch-icon.png');
await resize(fullMaster, 512, 'icon-maskable-512.png');

/* ICO: 16 + 32 + 48 tek dosyada. Googlebot etiket bulamazsa doğrudan
   /favicon.ico adresini ister; oradan 404 dönmesi ikonun hiç çıkmamasının
   en yaygın sebebi. */
await run('magick', [
  squareMaster, '-filter', 'Lanczos',
  '-define', 'icon:auto-resize=48,32,16',
  path.join(ROOT, 'favicon.ico')
]);

/* favicon.svg çizimle aynı kalsın — vektör sürüm tarayıcı sekmesi için. */
fs.writeFileSync(path.join(ROOT, 'favicon.svg'),
  artwork({ radius: 14 }).replace('<svg ', '<svg role="img" aria-label="ShenTechin MED" ') + '\n');

fs.rmSync(work, { recursive: true, force: true });

const report = ['favicon.ico', 'favicon.svg', 'favicon-96x96.png', 'icon-192.png',
  'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png'];
for (const f of report) {
  const b = fs.statSync(path.join(ROOT, f)).size;
  console.log(`  ${f.padEnd(24)} ${(b / 1024).toFixed(1)} KB`);
}
console.log('İkonlar üretildi.');

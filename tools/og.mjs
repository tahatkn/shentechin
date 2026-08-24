/* Sayfa başına sosyal paylaşım görseli üretir.

     node tools/og.mjs

   İSTEĞE BAĞLI bir adımdır: build.mjs bu görselleri ÜRETMEZ, yalnızca
   diskte varsa kullanır (yoksa varsayılan görsele düşer). Böylece sitenin
   derlenmesi ImageMagick kurulu olmayan bir makinede de çalışır.

   Çıktı: assets/og/<anahtar>-<dil>.png  (1200x630, PNG8, ~10-20 KB)
   Gereksinim: ImageMagick 7 (`magick`). Yazı tipi tools/fonts/ içinde. */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { UI, t } from './i18n.mjs';
import { LANGS } from './lib/routes.mjs';
import { TESTS } from './content-tests.mjs';
import { ARTICLES } from './content-articles.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'assets/og');
const BOLD = path.join(ROOT, 'tools/fonts/PlusJakartaSans-Bold.ttf');
const MED = path.join(ROOT, 'tools/fonts/PlusJakartaSans-Medium.ttf');

/* Kategori tonları — core.css'teki koyu tema değerleriyle aynı aile */
const TONE = {
  sleep: '#7dd3fc', skin: '#f9a8d4', diet: '#86efac', stress: '#fcd34d',
  heart: '#fca5a5', focus: '#d8b4fe', fitness: '#fdba74', immunity: '#bef264',
  tech: '#a5b4fc', brand: '#7aa2f7'
};

function has(cmd) {
  try { execFileSync('command', ['-v', cmd], { shell: true, stdio: 'ignore' }); return true; }
  catch { return false; }
}

if (!has('magick')) {
  console.error('ImageMagick (magick) bulunamadı — OG görselleri atlandı.');
  console.error('Kurulum:  brew install imagemagick');
  process.exit(0);
}
for (const f of [BOLD, MED]) {
  if (!fs.existsSync(f)) { console.error(`Yazı tipi eksik: ${f}`); process.exit(1); }
}

fs.mkdirSync(OUT, { recursive: true });
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'stq-og-'));

function textFile(name, value) {
  const p = path.join(tmp, name);
  fs.writeFileSync(p, value);
  return p;
}

/* caption: kendisine geçilmiş bir pointsize varsa onu kullanır, kutuya
   sığdırmaya çalışmaz. Bu yüzden puntoyu başlık uzunluğuna göre biz veriyoruz. */
function titleSize(s) {
  const n = s.length;
  if (n <= 20) return 78;
  if (n <= 34) return 66;
  if (n <= 52) return 56;
  if (n <= 74) return 47;
  return 40;
}

function render({ key, lang, eyebrow, title, tone }) {
  const accent = TONE[tone] || TONE.brand;
  const out = path.join(OUT, `${key}-${lang}.png`);

  const titleFile = textFile('t.txt', title);
  const eyebrowFile = textFile('e.txt', eyebrow);

  const args = [
    /* Zemin düz renk: yumuşak gradyan 8-bit palete indirildiğinde bantlanır
       ve PNG'yi gereksiz büyütür. Derinliği çizgi katmanı veriyor. */
    '-size', '1200x630', 'xc:#0d1526',
    '-fill', '#111c33', '-draw', 'rectangle 0,0 1200,4',

    /* sağda tonun yumuşak halkası */
    '-fill', 'none', '-stroke', accent, '-strokewidth', '3',
    '-draw', 'stroke-opacity 0.30 circle 1010,300 1010,60',
    '-draw', 'stroke-opacity 0.18 circle 1010,300 1010,10',
    '-draw', 'stroke-opacity 0.45 arc 830,120 1190,480 -90,110',
    '-stroke', 'none',

    /* marka */
    '-font', BOLD, '-fill', '#ffffff', '-pointsize', '30',
    '-gravity', 'NorthWest', '-annotate', '+80+70', 'ShenTechin',
    '-font', MED, '-fill', accent, '-pointsize', '22',
    '-annotate', '+263+78', 'MED',

    /* üst etiket */
    '-font', MED, '-fill', accent, '-pointsize', '26',
    '-annotate', '+80+196', `@${eyebrowFile}`,

    /* başlık — kutuya sığdırılarak sarılır */
    '(', '-background', 'none', '-fill', '#ffffff', '-font', BOLD,
    '-pointsize', String(titleSize(title)),
    '-size', '830x250', '-gravity', 'NorthWest', `caption:@${titleFile}`, ')',
    '-gravity', 'NorthWest', '-geometry', '+80+250', '-composite',

    /* alt çizgi + adres */
    '-fill', accent, '-draw', 'fill-opacity 0.9 rectangle 80,540 140,545',
    '-font', MED, '-fill', '#93a4c0', '-pointsize', '24',
    '-gravity', 'NorthWest', '-annotate', '+80+568', 'shentechin.com',

    '-strip', '-colors', '64', '-define', 'png:compression-level=9', `PNG8:${out}`
  ];

  execFileSync('magick', args);
  return out;
}

/* ---------------- üretilecek görseller ---------------- */

const jobs = [];
for (const lang of LANGS) {
  jobs.push({
    key: 'home', lang, tone: 'brand',
    eyebrow: t(lang, 'trust_1') + ' · ' + t(lang, 'trust_3'),
    title: t(lang, 'hero_title').replace(/<br>/g, ' ')
  });
  jobs.push({
    key: 'about', lang, tone: 'brand',
    eyebrow: t(lang, 'nav_about'),
    title: t(lang, 'about_hero_title')
  });
  jobs.push({
    key: 'insights', lang, tone: 'focus',
    eyebrow: t(lang, 'nav_insights'),
    title: t(lang, 'blog_hero_title')
  });
  for (const test of TESTS) {
    jobs.push({
      key: `test-${test.id}`, lang, tone: test.id,
      eyebrow: t(lang, 'test_meta_quick'),
      title: test[lang].name
    });
  }
  for (const a of ARTICLES) {
    jobs.push({
      key: `art-${a.slug}`, lang, tone: a.tone,
      eyebrow: t(lang, a.badgeKey),
      title: a[lang].title
    });
  }
}

let total = 0;
for (const job of jobs) {
  const file = render(job);
  total += fs.statSync(file).size;
}

/* Varsayılan görseli de küçült (166 KB → ~30 KB) */
const def = path.join(ROOT, 'assets/img/og-default.png');
if (fs.existsSync(def)) {
  const before = fs.statSync(def).size;
  execFileSync('magick', [def, '-strip', '-resize', '1200x630!', '-colors', '160',
    '-define', 'png:compression-level=9', `PNG8:${def}`]);
  console.log(`og-default.png: ${(before / 1024).toFixed(0)} KB → ${(fs.statSync(def).size / 1024).toFixed(0)} KB`);
}

fs.rmSync(tmp, { recursive: true, force: true });
console.log(`${jobs.length} OG görseli üretildi, ortalama ${(total / jobs.length / 1024).toFixed(0)} KB.`);
console.log('Şimdi `node tools/build.mjs` çalıştırın: sayfalar bu görselleri kullanmaya başlar.');

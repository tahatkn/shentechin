/* Görsel regresyon + duman testi.

     node tools/visual.mjs            # referanslarla karşılaştır
     node tools/visual.mjs --update   # referansları yeniden yaz
     node tools/visual.mjs --smoke    # yalnızca DOM denetimleri (hızlı)
     node tools/visual.mjs --only=home,quiz

   Playwright ya da başka bir npm paketi GEREKTİRMEZ: makinede zaten kurulu
   olan Chrome'u headless modda çağırır. Böylece siteyle birlikte taşınan
   bir node_modules ağacı doğmaz.

   Ne yapar:
   1. Her sayfayı iki genişlik (dar/masaüstü), iki dil ve iki temada
      ekran görüntüsüne alır. Dar sütun 500 px: headless Chrome bunun
      altına inmiyor (ayrıntı için VIEWPORTS'un yanındaki nota bakın).
   2. Görüntüleri tools/baseline/ altındaki referanslarla piksel piksel
      karşılaştırır. Fark eşiği aşarsa çıkışta hata verir ve farkı
      tools/.visual/ altına yazar.
   3. Sayfanın JavaScript çalıştıktan SONRAKİ DOM'unu alıp işlevsel
      denetimler yapar (test ekranında 10 düğme var mı, koyu tema
      uygulanmış mı, sonuç ekranı sayı basmış mı...).

   Referanslar depoya girmek zorunda değildir; ilk çalıştırmada üretilir. */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import zlib from 'node:zlib';
import http from 'node:http';
import { execFileSync, spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { LANGS, url } from './lib/routes.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SHOT_DIR = path.join(ROOT, 'tools/.visual');
const BASE_DIR = path.join(ROOT, 'tools/baseline');
const PORT = 8787;

const argv = process.argv.slice(2);
const UPDATE = argv.includes('--update');
const SMOKE_ONLY = argv.includes('--smoke');
const ONLY = (argv.find((a) => a.startsWith('--only=')) || '').replace('--only=', '')
  .split(',').filter(Boolean);

/* Farkın kabul edilebilir üst sınırı (yüzde). Yazı tipi kenar yumuşatması
   sürüm farklarında küçük oynamalar yapabildiği için sıfır değil. */
const THRESHOLD = 0.35;

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

const CHROME = CHROME_CANDIDATES.find((p) => fs.existsSync(p));
if (!CHROME) {
  console.error('Chrome bulunamadı. Denenen yollar:\n  ' + CHROME_CANDIDATES.join('\n  '));
  process.exit(1);
}

const profileRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'stq-chrome-'));

/* Chrome, --dump-dom / --screenshot işini bitirdikten sonra kendiliğinden
   kapanmıyor (hem eski hem yeni headless modunda). Bu yüzden çıktının
   büyümesi durunca süreci biz sonlandırıyoruz. */
function runChrome(extraArgs, { outFile, seat } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(CHROME, [
      '--headless=old',
      '--disable-gpu',
      '--hide-scrollbars',
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-extensions',
      '--disable-background-networking',
      '--disable-sync',
      '--force-device-scale-factor=1',
      '--force-color-profile=srgb',
      '--font-render-hinting=none',
      /* Animasyonları dondurur: dönen hero halkaları olmasa her kare
         birbirinden farklı çıkar ve karşılaştırma anlamsızlaşır.
         CSS zaten prefers-reduced-motion altında süreleri sıfırlıyor. */
      '--force-prefers-reduced-motion',
      `--user-data-dir=${path.join(profileRoot, 'p' + (seat || 0))}`,
      ...extraArgs
    ], { stdio: ['ignore', 'pipe', 'ignore'] });

    let out = [];
    let bytes = 0;
    child.stdout.on('data', (d) => { out.push(d); bytes += d.length; });

    let settled = false;
    const done = (err) => {
      if (settled) return;
      settled = true;
      clearInterval(poll);
      clearTimeout(cap);
      try { child.kill('SIGKILL'); } catch { /* zaten bitmiş */ }
      err ? reject(err) : resolve(Buffer.concat(out));
    };

    child.on('error', done);
    child.on('exit', () => done());

    /* Çıktı üç turdur büyümüyorsa iş bitmiştir. */
    let lastSize = -1, stable = 0;
    const poll = setInterval(() => {
      const size = outFile
        ? (fs.existsSync(outFile) ? fs.statSync(outFile).size : 0)
        : bytes;
      if (size > 0 && size === lastSize) {
        if (++stable >= 3) done();
      } else stable = 0;
      lastSize = size;
    }, 250);

    const cap = setTimeout(() => done(new Error('Chrome zaman aşımı')), 30000);
  });
}

async function screenshot(pageUrl, out, width, height, seat) {
  if (fs.existsSync(out)) fs.rmSync(out);
  /* Bütçe cömert: sonuç sayfası soru bankasını ve bant metinlerini
     ardışık iki istekle yüklüyor; kısa bütçede kare bazen bu iş bitmeden
     alınıyor ve karşılaştırma yanıltıcı biçimde kırmızıya dönüyor. */
  await runChrome([
    `--screenshot=${out}`,
    `--window-size=${width},${height}`,
    '--virtual-time-budget=9000',
    pageUrl
  ], { outFile: out, seat });
  if (!fs.existsSync(out)) throw new Error('ekran görüntüsü yazılamadı');
}

async function domOf(pageUrl, seat) {
  const buf = await runChrome([
    '--dump-dom',
    '--window-size=1280,900',
    '--virtual-time-budget=4000',
    pageUrl
  ], { seat });
  const html = buf.toString('utf8');
  if (html.length < 500) throw new Error('DOM boş döndü');
  return html;
}

/* Basit eşzamanlılık havuzu — 72 ekran görüntüsünü tek tek almak uzun sürüyor. */
async function pool(items, worker, size = 4) {
  const queue = items.slice();
  let seat = 0;
  await Promise.all(Array.from({ length: Math.min(size, queue.length) }, () => {
    const mySeat = seat++;
    return (async () => {
      while (queue.length) await worker(queue.shift(), mySeat);
    })();
  }));
}

/* ---------------------------------------------------------------
   Basit statik sunucu (Chrome file:// altında script yükleyemiyor)
   --------------------------------------------------------------- */

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2', '.json': 'application/json', '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json', '.txt': 'text/plain; charset=utf-8'
};

function serve() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '');
      if (rel === '' || rel.endsWith('/')) rel += 'index.html';
      const file = path.join(ROOT, rel);
      if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        res.writeHead(404); res.end('not found'); return;
      }
      res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

/* ---------------------------------------------------------------
   PNG çözümleyici — piksel karşılaştırması için
   (bağımlılık kullanmamak adına yalnızca ihtiyaç duyulan kadarı)
   --------------------------------------------------------------- */

function decodePng(buf) {
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error('PNG değil');
  let pos = 8;
  let width = 0, height = 0, depth = 0, colour = 0, interlace = 0;
  const idat = [];
  let palette = null, alphaPalette = null;

  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === 'IHDR') {
      width = data.readUInt32BE(0); height = data.readUInt32BE(4);
      depth = data[8]; colour = data[9]; interlace = data[12];
    } else if (type === 'PLTE') palette = Buffer.from(data);
    else if (type === 'tRNS') alphaPalette = Buffer.from(data);
    else if (type === 'IDAT') idat.push(Buffer.from(data));
    else if (type === 'IEND') break;
    pos += 12 + len;
  }

  if (depth !== 8) throw new Error(`desteklenmeyen bit derinliği: ${depth}`);
  if (interlace !== 0) throw new Error('interlace destelenmiyor');

  const channels = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[colour];
  if (!channels) throw new Error(`desteklenmeyen renk tipi: ${colour}`);

  const raw = zlib.inflateSync(Buffer.concat(idat));
  const bpp = channels;
  const stride = width * bpp;
  const out = Buffer.alloc(height * stride);

  let rp = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[rp++];
    const row = raw.subarray(rp, rp + stride);
    rp += stride;
    const cur = out.subarray(y * stride, (y + 1) * stride);
    const prev = y > 0 ? out.subarray((y - 1) * stride, y * stride) : null;

    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? cur[x - bpp] : 0;
      const b = prev ? prev[x] : 0;
      const c = prev && x >= bpp ? prev[x - bpp] : 0;
      let v = row[x];
      if (filter === 1) v += a;
      else if (filter === 2) v += b;
      else if (filter === 3) v += (a + b) >> 1;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        v += (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
      }
      cur[x] = v & 0xff;
    }
  }

  /* RGBA'ya çevir */
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0, o = 0; i < width * height; i++, o += 4) {
    if (colour === 3) {
      const idx = out[i];
      rgba[o] = palette[idx * 3]; rgba[o + 1] = palette[idx * 3 + 1]; rgba[o + 2] = palette[idx * 3 + 2];
      rgba[o + 3] = alphaPalette && idx < alphaPalette.length ? alphaPalette[idx] : 255;
    } else if (colour === 0) {
      rgba[o] = rgba[o + 1] = rgba[o + 2] = out[i]; rgba[o + 3] = 255;
    } else if (colour === 4) {
      rgba[o] = rgba[o + 1] = rgba[o + 2] = out[i * 2]; rgba[o + 3] = out[i * 2 + 1];
    } else if (colour === 2) {
      rgba[o] = out[i * 3]; rgba[o + 1] = out[i * 3 + 1]; rgba[o + 2] = out[i * 3 + 2]; rgba[o + 3] = 255;
    } else {
      rgba[o] = out[i * 4]; rgba[o + 1] = out[i * 4 + 1];
      rgba[o + 2] = out[i * 4 + 2]; rgba[o + 3] = out[i * 4 + 3];
    }
  }

  return { width, height, data: rgba };
}

/* Farklı piksel oranı (%). Kenar yumuşatmasından gelen çok küçük
   sapmaları saymamak için kanal başına 12 birimlik tolerans var. */
export function diffRatio(aBuf, bBuf) {
  const a = decodePng(aBuf);
  const b = decodePng(bBuf);
  if (a.width !== b.width || a.height !== b.height) return 100;

  let differing = 0;
  const total = a.width * a.height;
  for (let i = 0; i < total; i++) {
    const o = i * 4;
    if (Math.abs(a.data[o] - b.data[o]) > 12 ||
        Math.abs(a.data[o + 1] - b.data[o + 1]) > 12 ||
        Math.abs(a.data[o + 2] - b.data[o + 2]) > 12) differing++;
  }
  return (differing / total) * 100;
}

/* ---------------------------------------------------------------
   Denetlenecek sayfalar
   --------------------------------------------------------------- */

const CASES = [
  { id: 'home', path: (l) => url('home', l) },
  { id: 'about', path: (l) => url('about', l) },
  { id: 'insights', path: (l) => url('insights', l) },
  { id: 'test', path: (l) => url('test', l, 'sleep') },
  { id: 'article', path: (l) => url('article', l, 'sleep-cycles-explained') },
  { id: 'quiz', path: (l) => `${url('quiz', l)}?type=sleep&mode=full` },
  { id: 'result', path: (l) => `${url('result', l)}#r=sleep.q.8735a27615` },
  /* 25 soruluk sürüm: eylem planı, hekim uyarısı ve alan açıklamaları
     yalnızca burada tam hâliyle çiziliyor. */
  { id: 'report', path: (l) => `${url('result', l)}#r=sleep.f.3666686668699669662296664` },
  { id: 'legal', path: (l) => url('privacy', l) },
  { id: 'notfound', path: (l) => url('notfound', l) }
];

/* NOT: macOS'ta headless Chrome, görüntü alanını 500 CSS pikselin altına
   indirmiyor (--window-size=390 istendiğinde bile inner=500 oluyor ve
   ekran görüntüsü kırpılıyor). Bu yüzden "dar" sütun 500 px.
   500 px, ≤900 ve ≤620 kırılımlarını tetikler; yalnızca ≤380'e özel
   kurallar burada denetlenmez — onlar için gerçek cihaz/DevTools gerekir. */
const VIEWPORTS = [
  { id: 'n', width: 500, height: 1400 },
  { id: 'd', width: 1280, height: 1600 }
];

/* ---------------------------------------------------------------
   DOM duman testleri
   --------------------------------------------------------------- */

const SMOKE = [
  {
    name: 'test ekranı 1-10 ölçeğini çiziyor',
    url: (l) => `${url('quiz', l)}?type=sleep&mode=quick`,
    check: (dom) => {
      const buttons = (dom.match(/class="scale-btn"/g) || []).length;
      if (buttons !== 10) return `10 ölçek düğmesi bekleniyordu, ${buttons} bulundu`;
      if (!/data-scale-low[^>]*>[^<]+</.test(dom)) return 'ölçek ucu metni boş';
      if (/>…</.test(dom.split('id="question-text"')[1] || '')) return 'soru metni yüklenmemiş';
      return null;
    }
  },
  {
    name: 'paylaşılan sonuç bağlantısı puanı çözüyor',
    url: (l) => `${url('result', l)}#r=sleep.q.8735a27615`,
    check: (dom) => {
      const m = dom.match(/id="ring-num"[^>]*>([^<]*)</);
      if (!m) return 'skor elemanı yok';
      /* İngilizce "37%", Türkçe "%37" — ikisi de geçerli. */
      if (!/^(?:%\s?\d+|\d+\s?%)$/.test(m[1].trim())) return `skor basılmamış: "${m[1]}"`;
      if (!/id="shared-note"(?![^>]*hidden)/.test(dom)) return 'paylaşılan sonuç şeridi görünmüyor';
      return null;
    }
  },
  {
    name: 'tam rapor eylem planını ve kaynakları çiziyor',
    url: (l) => `${url('result', l)}#r=sleep.f.3666686668699669662296664`,
    check: (dom) => {
      const steps = (dom.match(/class="plan__item"/g) || []).length;
      if (steps < 3) return `eylem planında 3+ madde bekleniyordu, ${steps} bulundu`;
      if (!/class="plan__why"/.test(dom)) return 'eylem gerekçesi yok';
      const refs = (dom.match(/pubmed\.ncbi\.nlm\.nih\.gov\/[0-9]+\//g) || []).length;
      if (refs < 5) return `kaynak listesi eksik (${refs})`;
      if (!/class="basis__item"/.test(dom)) return 'bilimsel temel listesi yok';
      const rows = (dom.match(/class="theme-row__todo"/g) || []).length;
      if (rows !== 5) return `5 alan açıklaması bekleniyordu, ${rows} bulundu`;
      return null;
    }
  },
  {
    name: 'hekim uyarısı doğru cevap bileşiminde tetikleniyor',
    url: (l) => `${url('result', l)}#r=sleep.f.3666686668699669662296664`,
    check: (dom) => {
      if (!/id="flags-panel"(?![^>]*hidden)/.test(dom)) return 'uyarı paneli açılmadı';
      const flags = (dom.match(/class="flag"/g) || []).length;
      return flags >= 1 ? null : 'uyarı metni basılmamış';
    }
  },
  {
    name: 'temiz cevaplarda hekim uyarısı çıkmıyor',
    /* Yön farkına dikkat: ters kodlu sorularda 1, diğerlerinde 10 —
       "hepsine 10" demek horlamaya da 10 demek olurdu. Bu dizi %100. */
    url: (l) => `${url('result', l)}#r=sleep.f.aa11a11111a1111aaaaa1111a`,
    check: (dom) => (/id="flags-panel"[^>]*hidden/.test(dom) ? null : 'uyarı paneli gereksiz açıldı')
  },
  {
    name: 'sonuç yokken boş durum gösteriliyor',
    url: (l) => url('result', l),
    check: (dom) => (/class="result-empty"/.test(dom) ? null : 'boş durum kutusu yok')
  },
  {
    name: 'koyu tema adres parametresiyle uygulanıyor',
    url: (l) => `${url('home', l)}?theme=dark`,
    check: (dom) => (/<html[^>]*data-theme="dark"/.test(dom) ? null : 'data-theme=dark uygulanmadı')
  },
  {
    name: 'ana sayfada dokuz test kartı var',
    url: (l) => url('home', l),
    check: (dom) => {
      const cards = (dom.match(/class="tcard[ "]/g) || []).length;
      return cards === 9 ? null : `9 kart bekleniyordu, ${cards} bulundu`;
    }
  },
  {
    name: 'makalede içindekiler ve diyagram render oluyor',
    url: (l) => url('article', l, 'heart-rate-variability'),
    check: (dom) => {
      if (!/class="toc"/.test(dom)) return 'içindekiler yok';
      if (!/<svg class="diagram"/.test(dom)) return 'diyagram yok';
      return null;
    }
  }
];

/* ---------------------------------------------------------------
   Akış
   --------------------------------------------------------------- */

const base = `http://127.0.0.1:${PORT}`;
const failures = [];
const notes = [];

const server = await serve();

try {
  /* --- duman testleri --- */
  console.log('DOM denetimleri');
  const smokeJobs = [];
  for (const s of SMOKE) for (const lang of LANGS) smokeJobs.push({ s, lang });

  await pool(smokeJobs, async ({ s, lang }, seat) => {
    const target = base + s.url(lang);
    let problem;
    try {
      problem = s.check(await domOf(target, seat));
    } catch (e) {
      problem = `sayfa yüklenemedi: ${e.message.split('\n')[0]}`;
    }
    const label = `${s.name} [${lang}]`;
    if (problem) { failures.push(`${label} — ${problem}`); console.log(`  ✗ ${label}`); }
    else console.log(`  ✓ ${label}`);
  });

  /* --- görsel karşılaştırma --- */
  if (!SMOKE_ONLY) {
    fs.mkdirSync(SHOT_DIR, { recursive: true });
    fs.mkdirSync(BASE_DIR, { recursive: true });

    const cases = ONLY.length ? CASES.filter((c) => ONLY.includes(c.id)) : CASES;
    console.log(`\nEkran görüntüleri (${cases.length} sayfa × ${VIEWPORTS.length} genişlik × ${LANGS.length} dil × 2 tema)`);

    /* Her Chrome profilini önce ısıt: yazı tipleri ve script'ler HTTP
       önbelleğine girsin. Soğuk profilde ilk sayfa, font inerken bir kare
       yakalayabiliyor ve karşılaştırma sebepsiz kırmızıya dönüyor. */
    const seats = Math.min(4, LANGS.length * 2);
    await Promise.all(Array.from({ length: seats }, (_, seat) =>
      (async () => {
        for (const lang of LANGS) {
          try { await domOf(base + url('home', lang), seat); } catch { /* ısınma zorunlu değil */ }
        }
      })()
    ));

    const shotJobs = [];
    for (const c of cases) {
      for (const lang of LANGS) {
        for (const vp of VIEWPORTS) {
          for (const theme of ['light', 'dark']) {
            shotJobs.push({ c, lang, vp, theme });
          }
        }
      }
    }

    await pool(shotJobs, async ({ c, lang, vp, theme }, seat) => {
      const name = `${c.id}-${lang}-${vp.id}-${theme}.png`;
      const shot = path.join(SHOT_DIR, name);
      const baseline = path.join(BASE_DIR, name);

      const p = c.path(lang);
      const [pathPart, hash] = p.split('#');
      const target = base + pathPart + (pathPart.includes('?') ? '&' : '?') +
        `theme=${theme}` + (hash ? '#' + hash : '');

      try {
        await screenshot(target, shot, vp.width, vp.height, seat);
      } catch (e) {
        failures.push(`${name} — ekran görüntüsü alınamadı: ${e.message}`);
        return;
      }

      if (UPDATE || !fs.existsSync(baseline)) {
        fs.copyFileSync(shot, baseline);
        notes.push(name);
        console.log(`  + ${name}`);
        return;
      }

      let ratio;
      try {
        ratio = diffRatio(fs.readFileSync(baseline), fs.readFileSync(shot));
      } catch (e) {
        failures.push(`${name} — karşılaştırma hatası: ${e.message}`);
        return;
      }

      /* Eşleşmezse bir kez daha dene: kalan oynamaların hepsi zamanlama
         kaynaklı; gerçek bir regresyon ikinci denemede de kalır. */
      if (ratio > THRESHOLD) {
        try {
          await screenshot(target, shot, vp.width, vp.height, seat);
          ratio = diffRatio(fs.readFileSync(baseline), fs.readFileSync(shot));
        } catch (e) { /* ilk ölçüm geçerli kalsın */ }
      }

      if (ratio > THRESHOLD) {
        failures.push(`${name} — %${ratio.toFixed(2)} piksel farkı (sınır %${THRESHOLD})`);
        console.log(`  ✗ ${name}  %${ratio.toFixed(2)}`);
      } else {
        console.log(`  ✓ ${name}  %${ratio.toFixed(2)}`);
      }
    });
  }
} finally {
  server.close();
  fs.rmSync(profileRoot, { recursive: true, force: true });
}

/* ---------------------------------------------------------------
   Özet
   --------------------------------------------------------------- */

console.log('');
if (notes.length) {
  console.log(`${notes.length} referans görüntü yazıldı (tools/baseline/).`);
  console.log('Bunları gözle kontrol edin; bundan sonraki çalıştırmalar bunlarla karşılaştıracak.');
}
if (failures.length) {
  console.error(`\n${failures.length} sorun:`);
  for (const f of failures) console.error('  • ' + f);
  console.error(`\nFarklı görüntüler: ${path.relative(ROOT, SHOT_DIR)}/`);
  process.exit(1);
}
console.log('Bütün denetimler geçti.');

/* Bağımlılıksız doğrulama takımı.  Çalıştırma:

     node --test tools/check.mjs

   Amaç: sitenin sessizce bozulabileceği yerleri yakalamak. Burada
   yakalanmayan hatalar canlıda ancak birileri fark ederse görülür:
   yanlış puanlama, eksik bir çeviri anahtarı, kırık bir iç bağlantı,
   var olmayan bir OG görseline verilen referans, şişmiş bir sayfa.

   Sayfaların derlenmiş olmasını bekler (önce `node tools/build.mjs`). */

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { UI, RUNTIME_KEYS, t } from './i18n.mjs';
import { LANGS, SITE, url, filePath, TEST_TR_SLUG, ARTICLE_TR_SLUG } from './lib/routes.mjs';
import { QUESTIONS, TEST_IDS } from './lib/questions.mjs';
import { TESTS } from './content-tests.mjs';
import { ARTICLES } from './content-articles.mjs';
import { LEGAL } from './content-legal.mjs';
import { RESULT_TEXTS } from './content-results.mjs';
import { minifyCss } from './lib/minify.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const exists = (p) => fs.existsSync(path.join(ROOT, p));

/* Derlenmiş bütün sayfalar */
const PAGES = [];
for (const lang of LANGS) {
  for (const kind of ['home', 'about', 'insights', 'quiz', 'result', 'notfound']) {
    PAGES.push({ kind, lang, file: filePath(kind, lang) });
  }
  for (const l of LEGAL) PAGES.push({ kind: l.slug, lang, file: filePath(l.slug, lang) });
  for (const x of TESTS) PAGES.push({ kind: 'test', lang, slug: x.id, file: filePath('test', lang, x.id) });
  for (const a of ARTICLES) PAGES.push({ kind: 'article', lang, slug: a.slug, file: filePath('article', lang, a.slug) });
}

/* ===============================================================
   1. PUANLAMA
   =============================================================== */

const MAX = 10;
const scoreOf = (data, qi, v) => (data.reverse.includes(qi) ? MAX + 1 - v : v);

function percent(data, indices, answers) {
  const n = indices.length;
  const raw = indices.reduce((sum, qi, i) => sum + scoreOf(data, qi, answers[i]), 0);
  return Math.round(((raw - n) / (n * MAX - n)) * 100);
}

test('puanlama: her cevap 1 iken sonuç 0, 10 iken 100', () => {
  for (const id of TEST_IDS) {
    const data = QUESTIONS[id];
    for (const indices of [data.quick, data.q.en.map((_, i) => i)]) {
      const worst = indices.map((qi) => (data.reverse.includes(qi) ? MAX : 1));
      const best = indices.map((qi) => (data.reverse.includes(qi) ? 1 : MAX));
      assert.equal(percent(data, indices, worst), 0, `${id}: en kötü cevaplar 0 vermeli`);
      assert.equal(percent(data, indices, best), 100, `${id}: en iyi cevaplar 100 vermeli`);
    }
  }
});

test('puanlama: ters kodlanmış soruda yüksek cevap puanı düşürür', () => {
  for (const id of TEST_IDS) {
    const data = QUESTIONS[id];
    const rev = data.quick.find((qi) => data.reverse.includes(qi));
    const fwd = data.quick.find((qi) => !data.reverse.includes(qi));
    if (rev === undefined || fwd === undefined) continue;
    assert.ok(scoreOf(data, rev, 9) < scoreOf(data, rev, 2), `${id}: ters soru yanlış yönde`);
    assert.ok(scoreOf(data, fwd, 9) > scoreOf(data, fwd, 2), `${id}: düz soru yanlış yönde`);
  }
});

test('puanlama: sonuç her zaman 0-100 aralığında ve monoton', () => {
  for (const id of TEST_IDS) {
    const data = QUESTIONS[id];
    const idx = data.quick;
    let previous = -1;
    for (let v = 1; v <= MAX; v++) {
      const answers = idx.map((qi) => (data.reverse.includes(qi) ? MAX + 1 - v : v));
      const p = percent(data, idx, answers);
      assert.ok(p >= 0 && p <= 100, `${id}: ${p} aralık dışı`);
      assert.ok(p > previous, `${id}: puan artmıyor (${previous} → ${p})`);
      previous = p;
    }
  }
});

test('puanlama: bant sınırları sonuç metinleriyle uyuşuyor', () => {
  const band = (p) => (p >= 80 ? 'good' : p >= 50 ? 'mid' : 'low');
  assert.equal(band(0), 'low');
  assert.equal(band(49), 'low');
  assert.equal(band(50), 'mid');
  assert.equal(band(79), 'mid');
  assert.equal(band(80), 'good');
  assert.equal(band(100), 'good');
  for (const lang of LANGS) {
    for (const id of TEST_IDS) {
      const entry = RESULT_TEXTS[lang][id];
      assert.ok(entry, `${lang}/${id}: sonuç metni yok`);
      for (const b of ['low', 'mid', 'good']) {
        assert.ok(entry.bands[b] && entry.bands[b].label && entry.bands[b].text,
          `${lang}/${id}/${b}: eksik bant metni`);
      }
    }
  }
});

/* ===============================================================
   2. SORU BANKASI
   =============================================================== */

test('soru bankası: yapı ve indeks aralıkları tutarlı', () => {
  for (const id of TEST_IDS) {
    const d = QUESTIONS[id];
    assert.equal(d.id, id);
    assert.equal(d.q.en.length, 25, `${id}: EN soru sayısı`);
    assert.equal(d.q.tr.length, 25, `${id}: TR soru sayısı`);
    assert.equal(d.anchors.length, 25, `${id}: anchors uzunluğu`);
    assert.equal(d.groups.length, 25, `${id}: groups uzunluğu`);
    assert.equal(d.quick.length, 10, `${id}: kısa sürüm 10 soru olmalı`);

    for (const qi of d.reverse) assert.ok(qi >= 0 && qi < 25, `${id}: reverse indeksi ${qi}`);
    for (const qi of d.quick) assert.ok(qi >= 0 && qi < 25, `${id}: quick indeksi ${qi}`);
    assert.equal(new Set(d.quick).size, 10, `${id}: quick tekrar eden indeks içeriyor`);
    assert.equal(new Set(d.reverse).size, d.reverse.length, `${id}: reverse tekrar içeriyor`);

    for (const lang of LANGS) {
      d.q[lang].forEach((q, i) => {
        assert.ok(q.trim().length > 5, `${id}[${i}] ${lang}: soru çok kısa`);
        assert.ok(!/\(1\s*:/.test(q), `${id}[${i}] ${lang}: soru metninde ölçek parantezi kalmış`);
      });
    }
  }
});

test('soru bankası: her sorunun bir ölçek ucu var', () => {
  for (const id of TEST_IDS) {
    const d = QUESTIONS[id];
    d.anchors.forEach((key, i) => {
      if (key === null) {
        const custom = d.anchorText && d.anchorText[i];
        assert.ok(custom, `${id}[${i}]: anchor null ama anchorText yok`);
        for (const lang of LANGS) {
          assert.ok(custom[lang] && custom[lang].low && custom[lang].high,
            `${id}[${i}] ${lang}: özel ölçek ucu eksik`);
        }
      } else {
        for (const lang of LANGS) {
          assert.ok(UI[lang][`scale_${key}_low`], `${lang}: scale_${key}_low yok`);
          assert.ok(UI[lang][`scale_${key}_high`], `${lang}: scale_${key}_high yok`);
        }
      }
    });
  }
});

test('soru bankası: her soru bir alana ait ve alan adları iki dilde var', () => {
  for (const id of TEST_IDS) {
    const d = QUESTIONS[id];
    const keys = new Set(d.groups);
    assert.ok(keys.size >= 3, `${id}: en az üç alan bekleniyor`);
    d.groups.forEach((g, i) => assert.ok(g, `${id}[${i}]: alan atanmamış`));
    for (const lang of LANGS) {
      for (const k of keys) {
        assert.ok(d.groupNames[lang] && d.groupNames[lang][k],
          `${id}: ${lang} için "${k}" alan adı yok`);
      }
    }
  }
});

/* ===============================================================
   3. ÇEVİRİLER
   =============================================================== */

test('çeviri: EN ve TR anahtar kümeleri birebir aynı', () => {
  const en = Object.keys(UI.en).sort();
  const tr = Object.keys(UI.tr).sort();
  const onlyEn = en.filter((k) => !UI.tr[k]);
  const onlyTr = tr.filter((k) => !UI.en[k]);
  assert.deepEqual(onlyEn, [], 'TR tarafında eksik anahtarlar');
  assert.deepEqual(onlyTr, [], 'EN tarafında eksik anahtarlar');
});

test('çeviri: boş metin yok ve TR metni EN ile birebir aynı değil', () => {
  const sameAllowed = new Set([
    'footer_copy', 'res_whatsapp', 'badge_meta', 'blog_author', 'scale_speed_high'
  ]);
  for (const lang of LANGS) {
    for (const [k, v] of Object.entries(UI[lang])) {
      assert.ok(typeof v === 'string' && v.trim().length > 0, `${lang}/${k}: boş`);
    }
  }
  const identical = Object.keys(UI.en)
    .filter((k) => UI.en[k] === UI.tr[k] && !sameAllowed.has(k));
  assert.deepEqual(identical, [], 'Çevrilmemiş (EN ile aynı) anahtarlar');
});

test('çeviri: çalışma zamanı anahtarları sözlükte mevcut', () => {
  for (const group of Object.values(RUNTIME_KEYS)) {
    for (const key of group) {
      for (const lang of LANGS) {
        assert.ok(UI[lang][key] !== undefined, `${lang}: çalışma zamanı anahtarı yok — ${key}`);
      }
    }
  }
});

test('çeviri: {yer tutucu} kalıpları iki dilde de aynı', () => {
  const holders = (s) => (s.match(/\{[a-z]+\}/g) || []).sort().join(',');
  for (const k of Object.keys(UI.en)) {
    assert.equal(holders(UI.tr[k]), holders(UI.en[k]), `${k}: yer tutucular uyuşmuyor`);
  }
});

/* ===============================================================
   4. DERLENMİŞ SAYFALAR
   =============================================================== */

test('sayfa: her sayfa diske yazılmış', () => {
  for (const p of PAGES) assert.ok(exists(p.file), `eksik sayfa: ${p.file}`);
});

test('sayfa: başlık, açıklama, canonical ve OG etiketleri var', () => {
  for (const p of PAGES) {
    const html = read(p.file);
    assert.match(html, /<title>[^<]{10,}<\/title>/, `${p.file}: başlık yok`);
    assert.match(html, /<meta name="description" content="[^"]{40,}"/, `${p.file}: açıklama kısa/yok`);
    assert.match(html, /rel="canonical" href="https:\/\/shentechin\.com/, `${p.file}: canonical yok`);
    assert.match(html, /property="og:image" content="https:\/\//, `${p.file}: og:image yok`);
    assert.match(html, /<html lang="(en|tr)"/, `${p.file}: html lang yok`);
  }
});

test('sayfa: yer tutucu (%anahtar%) kalmamış', () => {
  for (const p of PAGES) {
    const html = read(p.file);
    const left = html.match(/%[a-z]+%/g);
    assert.equal(left, null, `${p.file}: çözülmemiş yer tutucu ${left}`);
  }
});

test('sayfa: hreflang çiftleri karşılıklı ve doğru', () => {
  for (const p of PAGES) {
    const html = read(p.file);
    const en = html.match(/hreflang="en" href="([^"]+)"/);
    const tr = html.match(/hreflang="tr" href="([^"]+)"/);
    assert.ok(en && tr, `${p.file}: hreflang eksik`);
    assert.equal(en[1], SITE + url(p.kind, 'en', p.slug), `${p.file}: EN alternatifi yanlış`);
    assert.equal(tr[1], SITE + url(p.kind, 'tr', p.slug), `${p.file}: TR alternatifi yanlış`);
  }
});

test('sayfa: JSON-LD geçerli JSON', () => {
  for (const p of PAGES) {
    const html = read(p.file);
    const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    assert.ok(m, `${p.file}: JSON-LD yok`);
    const parsed = JSON.parse(m[1].replace(/\\u003c/g, '<'));
    assert.equal(parsed['@context'], 'https://schema.org');
    assert.ok(Array.isArray(parsed['@graph']) && parsed['@graph'].length >= 3, `${p.file}: @graph zayıf`);
  }
});

test('sayfa: test ve sonuç ekranı arama motorundan gizli', () => {
  for (const lang of LANGS) {
    for (const kind of ['quiz', 'result', 'notfound']) {
      assert.match(read(filePath(kind, lang)), /name="robots" content="noindex/,
        `${kind}/${lang}: noindex yok`);
    }
  }
});

/* ===============================================================
   5. BAĞLANTILAR VE VARLIKLAR
   =============================================================== */

function resolveHref(href) {
  const clean = href.split('#')[0].split('?')[0];
  if (clean === '' || clean === '/') return 'index.html';
  const rel = clean.replace(/^\//, '');
  return rel.endsWith('/') ? `${rel}index.html` : rel;
}

test('bağlantı: bütün iç bağlantılar var olan bir dosyayı gösteriyor', () => {
  const broken = [];
  for (const p of PAGES) {
    const html = read(p.file);
    for (const m of html.matchAll(/href="(\/[^"#][^"]*)"/g)) {
      const target = resolveHref(m[1]);
      if (!exists(target)) broken.push(`${p.file} → ${m[1]}`);
    }
  }
  assert.deepEqual(broken, [], 'kırık iç bağlantılar');
});

test('varlık: referans verilen script, font ve görseller diskte', () => {
  const missing = [];
  for (const p of PAGES) {
    const html = read(p.file);
    for (const m of html.matchAll(/(?:src|href|content)="https:\/\/shentechin\.com(\/assets\/[^"]+)"/g)) {
      if (!exists(m[1].slice(1))) missing.push(`${p.file} → ${m[1]}`);
    }
    for (const m of html.matchAll(/<script src="(\/assets\/[^"]+)"/g)) {
      if (!exists(m[1].slice(1))) missing.push(`${p.file} → ${m[1]}`);
    }
  }
  assert.deepEqual(missing, [], 'eksik varlıklar');
});

test('varlık: her testin veri ve sonuç metni dosyası var', () => {
  for (const id of TEST_IDS) {
    assert.ok(exists(`assets/js/data/${id}.js`), `${id}: veri dosyası yok`);
    for (const lang of LANGS) {
      assert.ok(exists(`assets/js/results/${id}.${lang}.js`), `${id}.${lang}: sonuç metni yok`);
    }
  }
});

test('sitemap: bütün adresler diskte var ve gizli sayfa içermiyor', () => {
  const xml = read('sitemap.xml');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  /* dil başına: ana sayfa + yazılar + hakkımızda + 9 test + 4 makale + 3 yasal */
  const expected = LANGS.length * (3 + TESTS.length + ARTICLES.length + LEGAL.length);
  assert.equal(locs.length, expected, `sitemap adres sayısı beklenenden farklı`);
  assert.equal(new Set(locs).size, locs.length, 'sitemap tekrar eden adres içeriyor');
  for (const loc of locs) {
    const rel = resolveHref(loc.replace(SITE, ''));
    assert.ok(exists(rel), `sitemap'te olmayan sayfa: ${loc}`);
    assert.ok(!/quiz\.html|result\.html|test\.html|sonuc\.html/.test(loc), `sitemap gizli sayfa içeriyor: ${loc}`);
  }
});

/* ===============================================================
   6. İÇERİK BÜTÜNLÜĞÜ
   =============================================================== */

test('içerik: test tanıtım sayfaları iki dilde eksiksiz', () => {
  for (const x of TESTS) {
    for (const lang of LANGS) {
      const c = x[lang];
      assert.ok(c.name && c.title && c.desc && c.lede, `${x.id}/${lang}: alan eksik`);
      assert.equal(c.measures.length, 5, `${x.id}/${lang}: 5 madde bekleniyor`);
      assert.ok(c.faq.length >= 3, `${x.id}/${lang}: en az 3 SSS`);
      for (const f of c.faq) assert.ok(f.q && f.a, `${x.id}/${lang}: eksik SSS`);
    }
    assert.ok(TEST_TR_SLUG[x.id], `${x.id}: Türkçe slug yok`);
  }
});

test('içerik: makaleler iki dilde eksiksiz ve tarihleri geçerli', () => {
  const seen = new Set();
  for (const a of ARTICLES) {
    assert.match(a.date, /^\d{4}-\d{2}-\d{2}$/, `${a.slug}: tarih biçimi`);
    assert.ok(!Number.isNaN(Date.parse(a.date)), `${a.slug}: geçersiz tarih`);
    assert.ok(!seen.has(a.date), `${a.slug}: tarih başka makaleyle aynı`);
    seen.add(a.date);
    assert.ok(ARTICLE_TR_SLUG[a.slug], `${a.slug}: Türkçe slug yok`);
    assert.ok(TEST_IDS.includes(a.relatedTest), `${a.slug}: relatedTest geçersiz`);
    for (const lang of LANGS) {
      assert.ok(a[lang].title && a[lang].desc && a[lang].dek && a[lang].body, `${a.slug}/${lang}: alan eksik`);
      assert.ok(a[lang].body.split('<h2>').length >= 4, `${a.slug}/${lang}: en az 3 ara başlık`);
    }
  }
  assert.equal(ARTICLES.filter((a) => a.featured).length, 1, 'tam olarak bir öne çıkan makale olmalı');
});

test('içerik: makale sayfalarında diyagram ve içindekiler var', () => {
  for (const a of ARTICLES) {
    for (const lang of LANGS) {
      const html = read(filePath('article', lang, a.slug));
      assert.match(html, /<svg class="diagram"/, `${a.slug}/${lang}: diyagram yok`);
      assert.match(html, /class="toc"/, `${a.slug}/${lang}: içindekiler yok`);
      assert.match(html, /<h2 id="s-1">/, `${a.slug}/${lang}: başlık kimliği yok`);
    }
  }
});

test('içerik: örnek soru gerçek soru bankasından geliyor', () => {
  for (const x of TESTS) {
    for (const lang of LANGS) {
      const html = read(filePath('test', lang, x.id));
      const data = QUESTIONS[x.id];
      const expected = data.q[lang][data.quick[0]];
      assert.ok(html.includes(expected), `${x.id}/${lang}: örnek soru eşleşmiyor`);
    }
  }
});

/* ===============================================================
   7. PERFORMANS BÜTÇESİ
   =============================================================== */

const BUDGET = {
  pageGzip: 16 * 1024,      /* tek sayfa, gzip sonrası (CSS gömülü) */
  cssMin: 40 * 1024,        /* en büyük CSS paketi */
  /* Dosya başına gzip sınırı. app.js her sayfada olduğu için en sıkısı;
     result.js yalnızca sonuç ekranında ve defer ile yükleniyor. */
  jsGzip: { 'app.js': 4.5 * 1024, 'quiz.js': 6 * 1024, 'result.js': 9 * 1024 },
  fontTotal: 60 * 1024,     /* iki alt küme birlikte */
  ogImage: 40 * 1024        /* tek sosyal görsel */
};

test('bütçe: hiçbir sayfa gzip sonrası sınırı aşmıyor', async () => {
  const { gzipSync } = await import('node:zlib');
  const over = [];
  for (const p of PAGES) {
    const size = gzipSync(fs.readFileSync(path.join(ROOT, p.file)), { level: 9 }).length;
    if (size > BUDGET.pageGzip) over.push(`${p.file}: ${(size / 1024).toFixed(1)} KB`);
  }
  assert.deepEqual(over, [], `sayfa bütçesi aşıldı (sınır ${BUDGET.pageGzip / 1024} KB gzip)`);
});

test('bütçe: JavaScript ve font dosyaları sınır içinde', async () => {
  const { gzipSync } = await import('node:zlib');
  for (const [name, limit] of Object.entries(BUDGET.jsGzip)) {
    /* Tel üzerinde giden boyut gzip sonrasıdır; ham boyut yanıltıcıdır. */
    const size = gzipSync(fs.readFileSync(path.join(ROOT, 'assets/js', name)), { level: 9 }).length;
    assert.ok(size <= limit, `${name}: ${(size / 1024).toFixed(1)} KB gz > ${(limit / 1024).toFixed(1)} KB`);
  }
  const fonts = ['assets/fonts/pjs-latin.woff2', 'assets/fonts/pjs-latin-ext.woff2']
    .reduce((a, f) => a + fs.statSync(path.join(ROOT, f)).size, 0);
  assert.ok(fonts <= BUDGET.fontTotal, `fontlar: ${(fonts / 1024).toFixed(1)} KB`);
});

test('bütçe: sosyal görseller sınır içinde', () => {
  if (!exists('assets/og')) return;
  const over = fs.readdirSync(path.join(ROOT, 'assets/og'))
    .filter((f) => f.endsWith('.png'))
    .map((f) => ({ f, size: fs.statSync(path.join(ROOT, 'assets/og', f)).size }))
    .filter((x) => x.size > BUDGET.ogImage)
    .map((x) => `${x.f}: ${(x.size / 1024).toFixed(0)} KB`);
  assert.deepEqual(over, [], 'OG görsel bütçesi aşıldı');
});

test('bütçe: sayfada engelleyici harici istek yok', () => {
  for (const p of PAGES) {
    const html = read(p.file);
    assert.ok(!/<link[^>]+rel="stylesheet"/.test(html), `${p.file}: harici stylesheet var`);
    assert.ok(!/fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs|unpkg|jsdelivr/.test(html),
      `${p.file}: üçüncü taraf kaynak var`);
    const headScripts = (html.split('</head>')[0].match(/<script src=/g) || []).length;
    assert.equal(headScripts, 0, `${p.file}: <head> içinde engelleyici script var`);
    for (const m of html.matchAll(/<script src="[^"]+"([^>]*)>/g)) {
      assert.match(m[1], /defer|async/, `${p.file}: defer'siz script`);
    }
  }
});

/* ===============================================================
   8. ERİŞİLEBİLİRLİK VE STİL SAĞLIĞI
   =============================================================== */

test('erişilebilirlik: temel işaretler her sayfada', () => {
  for (const p of PAGES) {
    const html = read(p.file);
    assert.match(html, /class="skip-link"/, `${p.file}: atlama bağlantısı yok`);
    assert.match(html, /id="main"/, `${p.file}: main yok`);
    assert.equal((html.match(/<h1[ >]/g) || []).length <= 1, true, `${p.file}: birden çok h1`);
    for (const m of html.matchAll(/<button([^>]*)>/g)) {
      assert.match(m[1], /type="/, `${p.file}: type'sız button`);
    }
    assert.ok(!/<img(?![^>]*\balt=)/.test(html), `${p.file}: alt'sız img`);
  }
});

test('stil: yorum içindeki kesme işareti CSS yutmuyor', () => {
  /* Gerçek bir hatanın nöbetçisi: küçültücü tırnakları yorumlardan ÖNCE
     korursa, "CSS'ten" gibi bir yorumdaki kesme işareti bir sonraki
     kesme işaretine kadarki kuralları sessizce siliyordu. */
  const src = `/* CSS'ten gelir */
.a { color: red; }
.b[data-x='y'] { color: blue; }
.c { color: green; }`;
  const out = minifyCss(src);
  assert.match(out, /\.a\{color:red\}/, '.a kuralı kayboldu');
  assert.match(out, /\.b\[data-x='y'\]/, '.b seçicisi bozuldu');
  assert.match(out, /\.c\{color:green\}/, '.c kuralı kayboldu');
  assert.ok(!out.includes('CSS'), 'yorum çıktıda kalmış');
});

test('stil: her CSS kaynağındaki kurallar pakete eksiksiz giriyor', () => {
  const dir = path.join(ROOT, 'assets/css/src');
  for (const f of fs.readdirSync(dir)) {
    const raw = fs.readFileSync(path.join(dir, f), 'utf8');
    const out = minifyCss(raw);
    const selectors = [...raw.matchAll(/^\.([a-z][a-z0-9_-]*)/gm)].map((m) => m[1]);
    const missing = [...new Set(selectors)].filter((sel) => !out.includes('.' + sel));
    assert.deepEqual(missing, [], `${f}: küçültme sırasında kaybolan seçiciler`);
  }
});

test('stil: derlenmiş sayfalar kendi paketlerinin kurallarını taşıyor', () => {
  const need = {
    'result.html': ['.ring__track', '.ring__value', ".score[data-band='low']", '.theme-row__fill'],
    'quiz.html': ['.scale-btn', '.qcard', '.progress__fill'],
    'index.html': ['.tcard', '.hero-art__ring', '.finder-chip'],
    'about.html': ['.stats-bar', '.method-card', '.band-list'],
    'insights.html': ['.feature', '.post__art'],
    'tests/sleep/index.html': ['.test-hero', '.sample-cell', '.faq-item']
  };
  for (const [file, selectors] of Object.entries(need)) {
    const css = read(file).match(/<style>([\s\S]*?)<\/style>/)[1];
    for (const sel of selectors) {
      assert.ok(css.includes(sel), `${file}: paketten eksik kural — ${sel}`);
    }
  }
});

test('stil: CSS küçültücü calc/clamp boşluklarını bozmuyor', () => {
  const src = 'a{width:calc(100% - 10px);font-size:clamp(1rem, 2vw + 1px, 3rem)}';
  const out = minifyCss(src);
  assert.match(out, /2vw \+ 1px/, 'clamp içindeki + boşluğu silinmiş');
  assert.match(out, /100% - 10px/, 'calc içindeki - boşluğu bozulmuş');
});

test('stil: her CSS kaynağı küçültülebiliyor ve süslü parantezler dengeli', () => {
  const dir = path.join(ROOT, 'assets/css/src');
  for (const f of fs.readdirSync(dir)) {
    const raw = fs.readFileSync(path.join(dir, f), 'utf8');
    const out = minifyCss(raw);
    const open = (out.match(/{/g) || []).length;
    const close = (out.match(/}/g) || []).length;
    assert.equal(open, close, `${f}: parantezler dengesiz`);
    assert.ok(out.length < raw.length, `${f}: küçültme etkisiz`);
  }
});

test('stil: kullanılan bütün data-tone değerleri tanımlı', () => {
  const core = read('assets/css/src/core.css');
  const defined = new Set([...core.matchAll(/\[data-tone='([a-z]+)'\]/g)].map((m) => m[1]));
  const used = new Set();
  for (const p of PAGES) {
    for (const m of read(p.file).matchAll(/data-tone="([a-z]+)"/g)) used.add(m[1]);
  }
  for (const tone of used) assert.ok(defined.has(tone), `core.css'te tanımsız ton: ${tone}`);
});

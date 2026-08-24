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
import { QUESTIONS, TEST_IDS, dataFile } from './lib/questions.mjs';
import { BANKS } from './content-questions.mjs';
import { SCIENCE } from './content-science.mjs';
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

/* ---------------------------------------------------------------
   İkonlar (arama sonucundaki site ikonu)

   Google, arama sonucunda ikon gösterebilmek için ikonu KENDİ tarayıp
   indirebilmeli. Sessizce bozulan üç şey var ve üçü de burada denetlenir:
   dosyanın gerçekten diskte olması, sayfadaki <link> hedeflerinin var
   olması ve manifest'in var olmayan bir dosyayı göstermemesi.
   --------------------------------------------------------------- */

const bin = (p) => fs.readFileSync(path.join(ROOT, p));

/* PNG boyutu IHDR'den okunur: 8 bayt imza + 4 uzunluk + 4 tip + 4 en + 4 boy */
function pngSize(rel) {
  const b = bin(rel);
  assert.equal(b.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `${rel}: PNG değil`);
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
}

/* ICO dizini: 2 bayt ayrılmış + 2 bayt tip(1) + 2 bayt adet, sonra 16'şar bayt */
function icoSizes(rel) {
  const b = bin(rel);
  assert.equal(b.readUInt16LE(0), 0, `${rel}: ICO başlığı bozuk`);
  assert.equal(b.readUInt16LE(2), 1, `${rel}: ICO tipi ikon değil`);
  const n = b.readUInt16LE(4);
  assert.ok(n >= 1, `${rel}: ICO boş`);
  return Array.from({ length: n }, (_, i) => {
    const at = 6 + i * 16;
    return (b[at] === 0 ? 256 : b[at]) + 'x' + (b[at + 1] === 0 ? 256 : b[at + 1]);
  });
}

const ICON_FILES = {
  'favicon-96x96.png': 96,
  'icon-192.png': 192,
  'icon-512.png': 512,
  'icon-maskable-512.png': 512,
  'apple-touch-icon.png': 180
};

test('ikon: favicon.ico var ve 48 pikseli içeriyor', () => {
  assert.ok(exists('favicon.ico'), 'favicon.ico yok — Googlebot etiket bulamazsa doğrudan buraya bakar');
  const sizes = icoSizes('favicon.ico');
  assert.ok(sizes.includes('48x48'), `favicon.ico 48x48 içermiyor: ${sizes.join(', ')}`);
  assert.ok(sizes.includes('32x32'), `favicon.ico 32x32 içermiyor: ${sizes.join(', ')}`);
  assert.ok(sizes.includes('16x16'), `favicon.ico 16x16 içermiyor: ${sizes.join(', ')}`);
});

test('ikon: PNG ikonlar diskte ve kare, boyutları 48in katı', () => {
  for (const [file, size] of Object.entries(ICON_FILES)) {
    assert.ok(exists(file), `${file} yok`);
    const { w, h } = pngSize(file);
    assert.equal(w, size, `${file}: en ${w}, beklenen ${size}`);
    assert.equal(h, size, `${file}: boy ${h}, beklenen ${size}`);
  }
  /* Google arama sonucu ikonu için 48'in katı olan en az bir boyut şart. */
  const multiples = Object.values(ICON_FILES).filter((n) => n % 48 === 0);
  assert.ok(multiples.length >= 2, '48in katı olan yeterli PNG ikon yok (96, 192)');
});

test('ikon: favicon.svg geçerli ve tek renk kaynağına bağlı değil', () => {
  const svg = read('favicon.svg');
  assert.ok(/^<svg[\s\S]*<\/svg>\s*$/.test(svg.trim()), 'favicon.svg gövdesi bozuk');
  assert.ok(svg.includes('viewBox="0 0 64 64"'), 'favicon.svg viewBox kare değil');
  assert.ok(!svg.includes('currentColor'), 'favicon.svg currentColor kullanamaz — bağlamsız indirilir');
});

test('ikon: her sayfa ikon etiketlerini taşıyor ve hedefler diskte', () => {
  const required = [
    '<link rel="icon" href="/favicon.ico" sizes="48x48">',
    '<link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any">',
    '<link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">',
    '<link rel="manifest" href="/site.webmanifest">'
  ];
  const missing = [];
  for (const p of PAGES) {
    const html = read(p.file);
    for (const tag of required) if (!html.includes(tag)) missing.push(`${p.file} → ${tag}`);
    for (const m of html.matchAll(/<link rel="(?:icon|apple-touch-icon|manifest)"[^>]*href="(\/[^"]+)"/g)) {
      if (!exists(m[1].slice(1))) missing.push(`${p.file} → hedef yok: ${m[1]}`);
    }
  }
  assert.deepEqual(missing, [], 'ikon etiketi eksik ya da hedefi yok');
});

test('ikon: manifest ikonlarının hepsi diskte ve bildirdiği boyutta', () => {
  const mf = JSON.parse(read('site.webmanifest'));
  assert.ok(Array.isArray(mf.icons) && mf.icons.length >= 4, 'manifest ikon listesi yetersiz');
  for (const ic of mf.icons) {
    const rel = ic.src.slice(1);
    assert.ok(exists(rel), `manifest: ${ic.src} diskte yok`);
    if (rel.endsWith('.png')) {
      const { w, h } = pngSize(rel);
      assert.ok(ic.sizes.split(' ').includes(`${w}x${h}`),
        `manifest: ${ic.src} gerçekte ${w}x${h}, bildirilen "${ic.sizes}"`);
    }
  }
  assert.ok(mf.icons.some((i) => i.purpose === 'maskable'), 'manifest maskable ikon içermiyor');
});

test('ikon: robots.txt ikon dosyalarını engellemiyor', () => {
  const rules = read('robots.txt')
    .split(/\r?\n/)
    .filter((l) => /^Disallow:/i.test(l))
    .map((l) => l.split(':')[1].trim())
    .filter(Boolean);
  const icons = ['/favicon.ico', '/favicon.svg', '/favicon-96x96.png', '/icon-192.png',
    '/icon-512.png', '/icon-maskable-512.png', '/apple-touch-icon.png', '/site.webmanifest'];
  for (const icon of icons) {
    for (const rule of rules) {
      assert.ok(!icon.startsWith(rule), `robots.txt ${icon} dosyasını engelliyor (${rule})`);
    }
  }
});

/* ---------------------------------------------------------------
   Soru bankası yapısı ve bilimsel katman

   Buradaki testler içeriğin sessizce çürümesini engelliyor: kayan bir
   alan anahtarı, eksik kalan bir eylem metni ya da elle düzenlenmiş
   (ve bir sonraki derlemede silinecek) bir üretilmiş dosya.
   --------------------------------------------------------------- */

test('soru bankası: her testte 5 alan × 5 soru, kısa sürümde alan başına 2', () => {
  for (const id of TEST_IDS) {
    const bank = BANKS[id];
    const doms = Object.keys(bank.domains);
    assert.equal(doms.length, 5, `${id}: 5 alan bekleniyordu, ${doms.length} var`);
    assert.equal(bank.q.length, 25, `${id}: 25 soru bekleniyordu, ${bank.q.length} var`);
    for (const d of doms) {
      const all = bank.q.filter((q) => q.d === d).length;
      const quick = bank.q.filter((q) => q.d === d && q.k).length;
      assert.equal(all, 5, `${id}.${d}: 5 soru bekleniyordu, ${all} var`);
      assert.equal(quick, 2, `${id}.${d}: kısa sürümde 2 soru bekleniyordu, ${quick} var`);
    }
    for (const q of bank.q) {
      assert.ok(bank.domains[q.d], `${id}: bilinmeyen alan "${q.d}"`);
      assert.ok(q.a, `${id}: ölçek ucu tanımsız`);
      for (const lang of LANGS) assert.ok(q[lang] && q[lang].length > 10, `${id}.${lang}: soru metni eksik`);
    }
    for (const lang of LANGS) {
      const texts = bank.q.map((q) => q[lang]);
      const dup = texts.filter((x, i) => texts.indexOf(x) !== i);
      assert.deepEqual(dup, [], `${id}.${lang}: aynı soru iki kez var`);
    }
  }
});

test('bilimsel katman: her soruya bir eylem, her alana bir açıklama var', () => {
  for (const id of TEST_IDS) {
    const sci = SCIENCE[id];
    assert.ok(sci, `${id}: bilimsel katman yok`);
    for (const d of Object.keys(BANKS[id].domains)) {
      const dom = sci.domains[d];
      assert.ok(dom, `${id}.${d}: alan metni yok`);
      for (const lang of LANGS) {
        for (const part of ['why', 'low', 'high']) {
          assert.ok(dom[lang] && dom[lang][part] && dom[lang][part].length > 40,
            `${id}.${d}.${lang}.${part}: metin eksik ya da çok kısa`);
        }
      }
    }
    for (let i = 0; i < 25; i++) {
      const a = sci.actions[i];
      assert.ok(a, `${id} q${i}: eylem yok`);
      for (const lang of LANGS) {
        assert.ok(a[lang] && a[lang].do && a[lang].do.length > 15, `${id} q${i}.${lang}: eylem metni eksik`);
        assert.ok(a[lang] && a[lang].why && a[lang].why.length > 30, `${id} q${i}.${lang}: gerekçe eksik`);
      }
    }
    for (const lang of LANGS) {
      assert.ok(Array.isArray(sci.basis[lang]) && sci.basis[lang].length >= 3,
        `${id}.${lang}: bilimsel temel listesi yetersiz`);
    }
  }
});

test('bilimsel katman: kaynaklar geçerli PMID taşıyor ve iki dilde yazılı', () => {
  for (const id of TEST_IDS) {
    const refs = SCIENCE[id].refs;
    assert.ok(refs.length >= 5, `${id}: en az 5 kaynak bekleniyordu, ${refs.length} var`);
    const seen = new Set();
    for (const r of refs) {
      assert.match(r.pmid, /^[0-9]{6,8}$/, `${id}: geçersiz PMID "${r.pmid}"`);
      assert.ok(!seen.has(r.pmid), `${id}: aynı kaynak iki kez (${r.pmid})`);
      seen.add(r.pmid);
      for (const lang of LANGS) {
        assert.ok(r[lang] && r[lang].length > 25, `${id}.${lang}: kaynak künyesi eksik (${r.pmid})`);
        assert.match(r[lang], /\b(19|20)[0-9]{2}\b/, `${id}.${lang}: kaynakta yıl yok (${r.pmid})`);
      }
    }
  }
});

test('bilimsel katman: uyarı kuralları var olan sorulara bağlı ve tetiklenebilir', () => {
  for (const id of TEST_IDS) {
    const flags = SCIENCE[id].flags;
    assert.ok(flags.length >= 1, `${id}: hiç uyarı kuralı yok`);
    for (const f of flags) {
      assert.ok(Array.isArray(f.q) && f.q.length, `${id}: uyarı soru listesi boş`);
      for (const qi of f.q) {
        assert.ok(Number.isInteger(qi) && qi >= 0 && qi < 25, `${id}: geçersiz uyarı indeksi ${qi}`);
      }
      assert.ok(f.at >= 1 && f.at <= 9, `${id}: uyarı eşiği aralık dışı (${f.at})`);
      assert.ok(f.need >= 1 && f.need <= f.q.length, `${id}: uyarı "need" değeri tutarsız`);
      for (const lang of LANGS) {
        assert.ok(f[lang] && f[lang].length > 80, `${id}.${lang}: uyarı metni eksik`);
      }
    }
  }
});

test('bilimsel katman: her uyarı kuralı tetiklenebiliyor ve sağlıklı cevapta susuyor', () => {
  /* Sonuç sayfasındaki kuralın aynısı. Buradaki asıl risk hiç tetiklenmeyen
     (ölü) ya da her sonuçta tetiklenen (gürültü) bir kural. */
  const fires = (data, flag, answers) => {
    const byIndex = {};
    answers.forEach((v, qi) => { byIndex[qi] = scoreOf(data, qi, v); });
    const asked = flag.q.filter((qi) => byIndex[qi] !== undefined);
    if (asked.length < flag.need) return false;
    return asked.filter((qi) => byIndex[qi] <= flag.at).length >= flag.need;
  };

  for (const id of TEST_IDS) {
    const data = QUESTIONS[id];
    /* Sağlıklı cevap: ters kodlu soruda 1, diğerlerinde 10 — ikisi de en iyi puan. */
    const best = data.q.en.map((_, qi) => (data.reverse.includes(qi) ? 1 : MAX));
    /* En kötü cevap: tam tersi. */
    const worst = data.q.en.map((_, qi) => (data.reverse.includes(qi) ? MAX : 1));

    for (const flag of SCIENCE[id].flags) {
      assert.ok(fires(data, flag, worst),
        `${id}: uyarı hiç tetiklenmiyor (q=${flag.q.join(',')}, at=${flag.at}, need=${flag.need})`);
      assert.ok(!fires(data, flag, best),
        `${id}: uyarı sağlıklı cevaplarda da tetikleniyor (q=${flag.q.join(',')})`);
    }
    /* Tam sürümde en az bir kural tetiklenebilmeli, hepsi birden değil. */
    const allFire = SCIENCE[id].flags.every((f) => fires(data, f, worst));
    assert.ok(allFire, `${id}: en kötü cevaplarda bile bazı uyarılar sessiz`);
  }
});

test('üretim: assets altındaki soru bankaları kaynakla birebir aynı', () => {
  for (const id of TEST_IDS) {
    const onDisk = read(`assets/js/data/${id}.js`);
    assert.equal(onDisk, dataFile(id),
      `assets/js/data/${id}.js elle düzenlenmiş ya da eski — node tools/build.mjs çalıştırın`);
  }
});

test('rapor metni: üretilen dosya iki dilde de eksiksiz ve çalıştırılabilir', () => {
  for (const id of TEST_IDS) {
    for (const lang of LANGS) {
      const src = read(`assets/js/results/${id}.${lang}.js`);
      const win = {};
      new Function('window', src)(win);
      const r = win.RESULT_TEXT;
      assert.ok(r && r.name, `${id}.${lang}: RESULT_TEXT yok`);
      for (const band of ['good', 'mid', 'low']) {
        assert.ok(r.bands[band] && r.bands[band].label && r.bands[band].text,
          `${id}.${lang}: ${band} bandı eksik`);
      }
      assert.equal(Object.keys(r.actions).length, 25, `${id}.${lang}: 25 eylem bekleniyordu`);
      assert.equal(Object.keys(r.domains).length, 5, `${id}.${lang}: 5 alan bekleniyordu`);
      assert.ok(r.refs.length >= 5 && r.refs.every((x) => x.p && x.t), `${id}.${lang}: kaynaklar eksik`);
      assert.ok(r.flags.every((f) => Array.isArray(f.q) && f.at && f.n && f.t),
        `${id}.${lang}: uyarı kuralı eksik alan içeriyor`);
      /* Alan anahtarları soru bankasındakilerle aynı olmalı. */
      for (const key of Object.keys(r.domains)) {
        assert.ok(QUESTIONS[id].groups.includes(key), `${id}.${lang}: kullanılmayan alan "${key}"`);
      }
    }
  }
});

test('sonuç sayfası: kişiye özel bölümlerin kapları iki dilde de var', () => {
  for (const lang of LANGS) {
    const html = read(filePath('result', lang));
    for (const id of ['plan', 'flags', 'flags-panel', 'breakdown', 'basis', 'refs', 'evidence-panel']) {
      assert.ok(html.includes(`id="${id}"`), `${lang} sonuç sayfası: #${id} yok`);
    }
  }
});

test('test tanıtım sayfası: bilimsel temel ve kaynaklar basılı', () => {
  for (const x of TESTS) {
    for (const lang of LANGS) {
      const html = read(filePath('test', lang, x.id));
      const links = (html.match(/pubmed\.ncbi\.nlm\.nih\.gov\/[0-9]+\//g) || []);
      assert.ok(links.length >= 5, `${x.id}.${lang}: PubMed bağlantısı yetersiz (${links.length})`);
      assert.ok(html.includes('class="basis__item"'), `${x.id}.${lang}: bilimsel temel listesi yok`);
      /* Bağlantılar yeni sekmede açılıyorsa rel zorunlu. */
      for (const m of html.matchAll(/<a href="https:\/\/pubmed[^"]+"([^>]*)>/g)) {
        assert.match(m[1], /rel="noopener noreferrer"/, `${x.id}.${lang}: PubMed bağlantısında rel eksik`);
      }
    }
  }
});

test('varsayılan sürüm 25 soruluk tam değerlendirme', () => {
  for (const lang of LANGS) {
    const home = read(filePath('home', lang));
    assert.ok(!/mode=quick/.test(home), `${lang} ana sayfa: kart hâlâ kısa sürüme gidiyor`);
    assert.equal((home.match(/mode=full/g) || []).length, TESTS.length,
      `${lang} ana sayfa: dokuz kartın hepsi tam sürüme gitmiyor`);
    for (const x of TESTS) {
      const page = read(filePath('test', lang, x.id));
      const primary = /<a class="btn btn--primary" href="[^"]*mode=full"/.test(page);
      assert.ok(primary, `${x.id}.${lang}: birincil düğme tam sürüme gitmiyor`);
    }
  }
  const quiz = read('assets/js/quiz.js');
  assert.match(quiz, /params\.get\('mode'\) === 'quick' \? 'quick' : 'full'/,
    'quiz.js varsayılanı hâlâ kısa sürüm');
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

test('içerik: her makale doğrulanmış kaynak listesi taşıyor', () => {
  for (const a of ARTICLES) {
    assert.ok(Array.isArray(a.refs) && a.refs.length >= 4, `${a.slug}: en az 4 kaynak bekleniyordu`);
    const seen = new Set();
    for (const r of a.refs) {
      assert.match(r.pmid, /^[0-9]{6,8}$/, `${a.slug}: geçersiz PMID "${r.pmid}"`);
      assert.ok(!seen.has(r.pmid), `${a.slug}: aynı kaynak iki kez (${r.pmid})`);
      seen.add(r.pmid);
      for (const lang of LANGS) {
        assert.ok(r[lang] && r[lang].length > 25, `${a.slug}.${lang}: kaynak künyesi eksik`);
      }
    }
    assert.match(a.modified || a.date, /^\d{4}-\d{2}-\d{2}$/, `${a.slug}: gözden geçirme tarihi geçersiz`);
    assert.ok((a.modified || a.date) >= a.date, `${a.slug}: gözden geçirme tarihi yayından önce`);

    for (const lang of LANGS) {
      const html = read(filePath('article', lang, a.slug));
      for (const r of a.refs) {
        assert.ok(html.includes(`pubmed.ncbi.nlm.nih.gov/${r.pmid}/`),
          `${a.slug}.${lang}: ${r.pmid} sayfada yok`);
      }
      const ld = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]
        .replace(/\\u003c/g, '<'));
      const art = ld['@graph'].find((n) => n['@type'] === 'Article');
      assert.ok(art, `${a.slug}.${lang}: Article düğümü yok`);
      assert.equal(art.citation.length, a.refs.length, `${a.slug}.${lang}: JSON-LD kaynak sayısı farklı`);
      assert.equal(art.dateModified, a.modified || a.date, `${a.slug}.${lang}: dateModified yanlış`);
    }
  }
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
     result.js yalnızca sonuç ekranında ve defer ile yükleniyor — kişiye
     özel plan, alan analizi, uyarı kuralları ve kaynak listesi orada
     çizildiği için sınırı daha geniş. */
  jsGzip: { 'app.js': 4.5 * 1024, 'quiz.js': 6 * 1024, 'result.js': 12 * 1024 },
  /* Test başına yüklenen iki dosya: soru bankası ve o testin rapor metni.
     İkisi de yalnızca ilgili test açıldığında iniyor. */
  dataGzip: 4 * 1024,
  resultTextGzip: 8 * 1024,
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

test('bütçe: soru bankası ve rapor metni dosyaları sınır içinde', async () => {
  const { gzipSync } = await import('node:zlib');
  const gz = (rel) => gzipSync(fs.readFileSync(path.join(ROOT, rel)), { level: 9 }).length;
  const over = [];
  for (const id of TEST_IDS) {
    const d = gz(`assets/js/data/${id}.js`);
    if (d > BUDGET.dataGzip) over.push(`data/${id}.js: ${(d / 1024).toFixed(1)} KB`);
    for (const lang of LANGS) {
      const r = gz(`assets/js/results/${id}.${lang}.js`);
      if (r > BUDGET.resultTextGzip) over.push(`results/${id}.${lang}.js: ${(r / 1024).toFixed(1)} KB`);
    }
  }
  assert.deepEqual(over, [], 'test başına dosya bütçesi aşıldı');
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

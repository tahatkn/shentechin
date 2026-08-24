/* Ortak sayfa iskeleti: <head>, navigasyon, alt bilgi.
   Bütün HTML dosyaları buradan üretilir.

   Öne çıkan kararlar:
   - CSS sayfaya GÖMÜLÜR. Toplam ~4 KB gzip; harici bir istek beklemeden
     ilk boyama yapılır. Tekrar ziyaretlerde service worker devrede.
   - <head> içinde yalnızca tek bir küçük satır içi script var (tema),
     çünkü boyamadan önce çalışması gerekiyor. Geri kalan her şey defer.
   - Metinler derleme sırasında yerleştirilir; sayfa tek dillidir.
   - Her sayfa kendi Türkçe/İngilizce karşılığına hreflang ile bağlanır. */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { icon, sprite } from './icons.mjs';
import { UI, t } from './i18n.mjs';
import { SITE, url, absUrl } from './lib/routes.mjs';
import { minifyCss } from './lib/minify.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CSS_DIR = path.join(ROOT, 'assets/css/src');

/* ---------- CSS paketleri (derleme başına bir kez küçültülür) ---------- */
const cssCache = new Map();

function cssBundle(files) {
  const key = files.join('|');
  if (cssCache.has(key)) return cssCache.get(key);
  const out = minifyCss(
    ['core.css', ...files].map((f) => fs.readFileSync(path.join(CSS_DIR, f), 'utf8')).join('\n')
  );
  cssCache.set(key, out);
  return out;
}

/* ---------- yer tutucu adresler ---------- */
export function expand(text, lang) {
  return text
    .replace(/%disclaimer%/g, url('disclaimer', lang))
    .replace(/%privacy%/g, url('privacy', lang))
    .replace(/%terms%/g, url('terms', lang))
    .replace(/%home%/g, url('home', lang))
    .replace(/%insights%/g, url('insights', lang))
    .replace(/%about%/g, url('about', lang));
}

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ---------- tema betiği ----------
   Boyamadan ÖNCE çalışması gerektiği için sayfaya gömülü tek script budur.
   Sıra: adresteki ?theme= > kullanıcının kaydettiği seçim > sistem tercihi.
   Adres parametresi hem "koyu temayla bağlantı paylaşma"yı hem de
   tools/visual.mjs'in iki temayı da ekran görüntüsüne alabilmesini sağlar. */
const THEME_SCRIPT =
  `(function(){try{var q=/[?&]theme=(dark|light)/.exec(location.search);` +
  `var t=q?q[1]:localStorage.getItem('stq:theme');` +
  `if(t!=='dark'&&t!=='light')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';` +
  `document.documentElement.setAttribute('data-theme',t);}catch(e){}` +
  `document.documentElement.classList.add('js-on');})()`;

/* ---------- navigasyon ---------- */
function nav(lang, active, alternate) {
  const cur = (id) => (active === id ? ' aria-current="page"' : '');
  const other = lang === 'tr' ? 'en' : 'tr';
  const otherLabel = other === 'tr' ? 'TR' : 'EN';

  return `<a class="skip-link" href="#main">${t(lang, 'skip_link')}</a>
<nav class="navbar">
<a href="${url('home', lang)}" class="logo">ShenTechin<span class="med-badge">MED</span></a>
<ul class="nav-links" id="primary-nav">
<li><a href="${url('home', lang)}#tests"${cur('tests')}>${t(lang, 'nav_tests')}</a></li>
<li><a href="${url('insights', lang)}"${cur('insights')}>${t(lang, 'nav_insights')}</a></li>
<li><a href="${url('about', lang)}"${cur('about')}>${t(lang, 'nav_about')}</a></li>
</ul>
<div class="nav-tools">
<a class="lang-link" href="${alternate}" hreflang="${other}" data-lang-switch="${other}" title="${esc(t(lang, 'lang_other'))}">${otherLabel}</a>
<button class="icon-btn theme-btn" type="button" data-theme-btn aria-pressed="false" aria-label="${esc(t(lang, 'theme_toggle'))}">
${icon('moon', 'icon-moon')}${icon('sun', 'icon-sun')}
</button>
<button class="icon-btn nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="${esc(t(lang, 'nav_menu'))}">
${icon('menu', 'icon-menu')}${icon('close', 'icon-close')}
</button>
</div>
</nav>`;
}

/* ---------- alt bilgi ---------- */
const TEST_IDS = ['sleep', 'skin', 'diet', 'stress', 'heart', 'focus', 'fitness', 'immunity', 'tech'];

function footer(lang) {
  const tests = TEST_IDS
    .map((id) => `<li><a href="${url('test', lang, id)}">${t(lang, `test_${id}_name`)}</a></li>`)
    .join('\n');

  return `<footer>
<div class="footer-inner">
<div class="footer-brand">
<a href="${url('home', lang)}" class="logo">ShenTechin<span class="med-badge">MED</span></a>
<p>${t(lang, 'footer_tagline')}</p>
</div>
<div class="footer-col">
<h4>${t(lang, 'footer_col_tests')}</h4>
<ul>
${tests}
</ul>
</div>
<div class="footer-col">
<h4>${t(lang, 'footer_col_learn')}</h4>
<ul>
<li><a href="${url('insights', lang)}">${t(lang, 'nav_insights')}</a></li>
<li><a href="${url('about', lang)}">${t(lang, 'nav_about')}</a></li>
</ul>
</div>
<div class="footer-col">
<h4>${t(lang, 'footer_col_legal')}</h4>
<ul>
<li><a href="${url('disclaimer', lang)}">${t(lang, 'footer_disclaimer')}</a></li>
<li><a href="${url('privacy', lang)}">${t(lang, 'footer_privacy')}</a></li>
<li><a href="${url('terms', lang)}">${t(lang, 'footer_terms')}</a></li>
</ul>
</div>
</div>
<div class="footer-bottom">
<span>${t(lang, 'footer_copy')}</span>
<span>${t(lang, 'footer_note')}</span>
</div>
</footer>`;
}

/* ---------- dil öneri şeridi ---------- */
function langOffer(lang, alternate) {
  const other = lang === 'tr' ? 'en' : 'tr';
  return `<aside class="lang-offer" hidden>
<p>${t(lang, 'lang_offer')}</p>
<a class="btn btn--primary btn--sm" href="${alternate}" hreflang="${other}" data-lang-switch="${other}">${t(lang, 'lang_offer_btn')}</a>
<button class="btn btn--quiet btn--sm" type="button" data-lang-dismiss>${t(lang, 'lang_offer_close')}</button>
</aside>`;
}

/* ---------- yapılandırılmış veri ---------- */
function jsonLd(opts, lang) {
  const graph = [];
  const orgId = SITE + '/#org';
  const siteId = SITE + '/#website';

  graph.push({
    '@type': 'Organization',
    '@id': orgId,
    name: 'ShenTechin MED',
    url: SITE,
    logo: SITE + '/icon-512.png',
    description: t(lang, 'footer_tagline')
  });

  graph.push({
    '@type': 'WebSite',
    '@id': siteId,
    url: SITE,
    name: 'ShenTechin MED',
    inLanguage: lang,
    publisher: { '@id': orgId }
  });

  const pageId = opts.canonical + '#page';
  graph.push({
    '@type': 'WebPage',
    '@id': pageId,
    url: opts.canonical,
    name: opts.title,
    description: opts.desc,
    inLanguage: lang,
    isPartOf: { '@id': siteId },
    ...(opts.breadcrumb ? { breadcrumb: { '@id': opts.canonical + '#crumb' } } : {})
  });

  if (opts.breadcrumb) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': opts.canonical + '#crumb',
      itemListElement: opts.breadcrumb.map((c, i) => ({
        '@type': 'ListItem', position: i + 1, name: c.name,
        ...(c.url ? { item: c.url } : {})
      }))
    });
  }

  if (opts.article) {
    graph.push({
      '@type': 'Article',
      '@id': opts.canonical + '#article',
      headline: opts.article.headline,
      description: opts.desc,
      inLanguage: lang,
      datePublished: opts.article.date,
      dateModified: opts.article.modified || opts.article.date,
      author: { '@type': 'Person', name: 'Dr. ShenTechin' },
      publisher: { '@id': orgId },
      image: opts.ogImage,
      mainEntityOfPage: { '@id': pageId },
      articleSection: opts.article.section,
      wordCount: opts.article.words,
      ...(opts.article.citations && opts.article.citations.length
        ? {
          citation: opts.article.citations.map((c) => ({
            '@type': 'ScholarlyArticle',
            name: c[lang],
            identifier: 'PMID:' + c.pmid,
            url: 'https://pubmed.ncbi.nlm.nih.gov/' + c.pmid + '/'
          }))
        }
        : {})
    });
  }

  if (opts.faq && opts.faq.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': opts.canonical + '#faq',
      mainEntity: opts.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a }
      }))
    });
  }

  if (opts.quiz) {
    graph.push({
      '@type': 'Quiz',
      '@id': opts.canonical + '#quiz',
      name: opts.quiz.name,
      about: { '@type': 'Thing', name: opts.quiz.about },
      educationalLevel: 'beginner',
      assesses: opts.quiz.about,
      inLanguage: lang,
      isAccessibleForFree: true,
      provider: { '@id': orgId },
      numberOfQuestions: 25
    });
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
    .replace(/</g, '\\u003c');
}

/* ---------------------------------------------------------------
   page(opts)
   opts = {
     kind, lang, slug, active, title, desc, ogImage, ogType,
     css: [...], scripts: [...], inlineJs, bodyClass, main,
     noindex, breadcrumb, article, faq, quiz, icons: [...]
   }
   --------------------------------------------------------------- */
export function page(opts) {
  const lang = opts.lang;
  const canonical = absUrl(opts.kind, lang, opts.slug);
  const altEn = absUrl(opts.kind, 'en', opts.slug);
  const altTr = absUrl(opts.kind, 'tr', opts.slug);
  const alternate = url(opts.kind, lang === 'tr' ? 'en' : 'tr', opts.slug);
  const ogImage = opts.ogImage || SITE + '/assets/img/og-default.png';

  const css = cssBundle(opts.css || []);
  const scripts = ['app.js', ...(opts.scripts || [])];

  /* Gövdeyi önce kur, sonra içinde gerçekten kullanılan ikonları tara.
     Böylece her sayfa 35 sembollük setin tamamını değil yalnızca
     kendi ikonlarını taşır. */
  const body = [
    nav(lang, opts.active, alternate),
    opts.main,
    footer(lang),
    langOffer(lang, alternate)
  ].join('\n');

  const used = [...new Set([...body.matchAll(/href="#i-([a-z0-9-]+)"/g)].map((m) => m[1]))].sort();

  const head = `<!DOCTYPE html>
<html lang="${lang}" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(opts.title)}</title>
<meta name="description" content="${esc(opts.desc)}">
<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="en" href="${altEn}">
<link rel="alternate" hreflang="tr" href="${altTr}">
<link rel="alternate" hreflang="x-default" href="${altEn}">
${opts.noindex ? '<meta name="robots" content="noindex, follow">' : ''}
<meta name="theme-color" content="#f8fafc">
<meta property="og:type" content="${opts.ogType || 'website'}">
<meta property="og:site_name" content="ShenTechin MED">
<meta property="og:locale" content="${lang === 'tr' ? 'tr_TR' : 'en_GB'}">
<meta property="og:title" content="${esc(opts.title)}">
<meta property="og:description" content="${esc(opts.desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(opts.title)}">
<meta name="twitter:description" content="${esc(opts.desc)}">
<meta name="twitter:image" content="${ogImage}">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon-96x96.png" type="image/png" sizes="96x96">
<link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any">
<link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/assets/fonts/pjs-latin.woff2" as="font" type="font/woff2" crossorigin>${
    lang === 'tr'
      ? '\n<link rel="preload" href="/assets/fonts/pjs-latin-ext.woff2" as="font" type="font/woff2" crossorigin>'
      : ''
  }
<style>${css}</style>
<script>${THEME_SCRIPT}</script>
<script type="application/ld+json">${jsonLd({ ...opts, canonical, ogImage }, lang)}</script>
</head>
<body${opts.bodyClass ? ` class="${opts.bodyClass}"` : ''}>
${sprite(used)}
${body}
${opts.inlineJs ? `<script>${opts.inlineJs}</script>` : ''}
${scripts.map((f) => `<script src="/assets/js/${f}" defer></script>`).join('\n')}
</body>
</html>
`;

  return expand(head, lang);
}

export { icon, UI, t, url, absUrl, SITE };

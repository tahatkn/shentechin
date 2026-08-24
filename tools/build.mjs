/* Bütün HTML sayfalarını üretir.  Çalıştırma:  node tools/build.mjs

   Her sayfa iki dilde ayrı ayrı yazılır:
     İngilizce  →  /            (eski adresler korunur)
     Türkçe     →  /tr/         (Türkçe slug'larla)

   İçerik kaynakları: content-tests, content-articles, content-legal,
   content-results, i18n. Ortak iskelet: shell.mjs. */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { page, icon, expand } from './shell.mjs';
import { t, UI, RUNTIME_KEYS } from './i18n.mjs';
import { SITE, LANGS, url, absUrl, filePath, TEST_TR_SLUG, ARTICLE_TR_SLUG } from './lib/routes.mjs';
import { minifyHtml, minifyJs } from './lib/minify.mjs';
import { TESTS } from './content-tests.mjs';
import { ARTICLES } from './content-articles.mjs';
import { LEGAL } from './content-legal.mjs';
import { RESULT_TEXTS } from './content-results.mjs';
import { ILLUSTRATIONS, heroArt, bandChart, DIAGRAMS, sampleScale } from './illustrations.mjs';
import { sampleQuestion, QUESTIONS, TEST_IDS, dataFile } from './lib/questions.mjs';
import { SCIENCE } from './content-science.mjs';
import { serviceWorker, manifest } from './sw.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const written = [];

function write(rel, content) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
  written.push(rel);
}

function writePage(rel, html) { write(rel, minifyHtml(html)); }

/* ---------------------------------------------------------------
   Yardımcılar
   --------------------------------------------------------------- */

const byId = Object.fromEntries(TESTS.map((x) => [x.id, x]));

/* Sayfaya gömülecek çalışma zamanı sözlüğü ve adresler. */
function runtime(lang, keys, extra = {}) {
  const dict = Object.fromEntries(keys.map((k) => [k, expand(t(lang, k), lang)]));
  const globals = {
    T: dict,
    HOME_URL: url('home', lang),
    QUIZ_URL: url('quiz', lang),
    RESULT_URL: url('result', lang),
    ...extra
  };
  return minifyJs(
    Object.entries(globals)
      .map(([k, v]) => `window.${k}=${JSON.stringify(v)};`)
      .join('')
  );
}

/* OG görseli yalnızca gerçekten üretilmişse kullanılır; yoksa varsayılana
   düşer (bkz. node tools/og.mjs). */
function ogFor(key, lang) {
  const rel = `assets/og/${key}-${lang}.png`;
  return fs.existsSync(path.join(ROOT, rel)) ? `${SITE}/${rel}` : `${SITE}/assets/img/og-default.png`;
}

const dateLabel = (iso, lang) =>
  new Date(iso + 'T00:00:00Z').toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-GB',
    { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

function wordCount(html) {
  return html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
}

/* Makale gövdesine başlık kimlikleri, içindekiler listesi ve diyagram ekler. */
function prepareArticle(article, lang) {
  const raw = article[lang].body;
  const headings = [];
  let n = 0;

  let body = raw.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, text) => {
    n += 1;
    const id = `s-${n}`;
    headings.push({ id, text: text.replace(/<[^>]+>/g, '') });
    return `<h2 id="${id}">${text}</h2>`;
  });

  const diagram = DIAGRAMS[article.slug];
  if (diagram) {
    const at = body.indexOf('<h2 id="s-1">');
    const svg = diagram(lang);
    body = at === -1 ? body + svg : body.slice(0, at) + svg + body.slice(at);
  }

  const words = wordCount(raw);
  const minutes = Math.max(2, Math.round(words / (lang === 'tr' ? 180 : 210)));

  return { body, headings, minutes, words };
}

/* ---------------------------------------------------------------
   ANA SAYFA
   --------------------------------------------------------------- */

const GROUPS = [
  { key: 'rest', ids: ['sleep', 'stress', 'immunity'] },
  { key: 'body', ids: ['diet', 'fitness', 'heart'] },
  { key: 'mind', ids: ['focus', 'tech', 'skin'] }
];

function testCard(id, lang) {
  const test = byId[id];
  return `<article class="tcard reveal" data-tone="${id}">
<div class="tcard__art">${ILLUSTRATIONS[id]}</div>
<div class="tcard__body">
<span class="tcard__meta">${icon('clock')} ${t(lang, 'card_meta')}</span>
<h4><a href="${url('test', lang, id)}" data-card-name>${test[lang].name}</a></h4>
<p class="tcard__desc">${t(lang, `card_${id}_desc`)}</p>
<div class="tcard__actions">
<a class="tcard__start" href="${url('quiz', lang)}?type=${id}&amp;mode=full" data-start-link>${t(lang, 'btn_start')}</a>
<a class="tcard__more" href="${url('test', lang, id)}">${t(lang, 'btn_details')}</a>
</div>
</div>
</article>`;
}

function homeMain(lang) {
  const groups = GROUPS.map((g) => `<section class="group">
<div class="group__head">
<h3>${t(lang, `group_${g.key}`)}</h3>
<p>${t(lang, `group_${g.key}_desc`)}</p>
</div>
<div class="grid">
${g.ids.map((id) => testCard(id, lang)).join('\n')}
</div>
</section>`).join('\n');

  const chips = ['sleep', 'stress', 'focus', 'fitness', 'diet', 'tech', 'immunity', 'skin', 'heart']
    .map((id) => `<button type="button" class="finder-chip" data-test="${id}" aria-pressed="false">${t(lang, `finder_${id}`)}</button>`)
    .join('\n');

  return `<header class="hero">
<div class="hero-grid">
<div class="hero-content">
<span class="doctor-badge">${icon('stethoscope')} ${t(lang, 'hero_badge')}</span>
<h1>${t(lang, 'hero_title')}</h1>
<p class="hero-lede">${t(lang, 'hero_desc')}</p>
<div class="hero-actions">
<a href="#tests" class="btn btn--primary">${t(lang, 'hero_btn')} ${icon('arrow-right')}</a>
<a href="${url('about', lang)}" class="btn btn--ghost">${t(lang, 'hero_btn2')}</a>
</div>
<div class="hero-trust">
<span>${icon('check')} ${t(lang, 'trust_1')}</span>
<span>${icon('lock')} ${t(lang, 'trust_2')}</span>
<span>${icon('clock')} ${t(lang, 'trust_3')}</span>
</div>
</div>
<div class="hero-visual">${heroArt()}</div>
</div>
</header>

<main id="main">
<section class="section section--tight">
<div class="wrap">
<div class="finder reveal">
<div class="finder__head">
<h2>${t(lang, 'finder_title')}</h2>
<p>${t(lang, 'finder_desc')}</p>
</div>
<div class="finder__chips">
${chips}
</div>
<div class="finder__answer">
<p>${t(lang, 'finder_result')}</p>
<a class="btn btn--primary btn--sm" href="#" data-finder-slot></a>
</div>
</div>
</div>
</section>

<section class="section" id="tests">
<div class="wrap">
<div class="section-head">
<h2>${t(lang, 'cat_title')}</h2>
<p>${t(lang, 'cat_desc')}</p>
</div>
${groups}
</div>
</section>

<p class="home-note">${t(lang, 'home_note')}</p>
</main>`;
}

/* ---------------------------------------------------------------
   HAKKIMIZDA
   --------------------------------------------------------------- */

function aboutMain(lang) {
  const bands = ['low', 'mid', 'good'].map((b) => {
    const range = b === 'low' ? '0–49' : b === 'mid' ? '50–79' : '80–100';
    return `<li data-band="${b}">
<span class="band-list__name">${t(lang, `band_${b}_name`)}</span>
<span class="band-list__range">${range}</span>
<span class="band-list__desc">${t(lang, `band_${b}_about`)}</span>
</li>`;
  }).join('\n');

  return `<header class="doc-hero">
<div class="doc-hero__inner">
<h1>${t(lang, 'about_hero_title')}</h1>
<p class="lede">${t(lang, 'about_hero_desc')}</p>
</div>
</header>

<div class="stats-bar">
<div class="stat-item">${icon('stethoscope')} <span>${t(lang, 'stat_1')}</span></div>
<div class="stat-item">${icon('check')} <span>${t(lang, 'stat_2')}</span></div>
<div class="stat-item">${icon('shield-check')} <span>${t(lang, 'stat_3')}</span></div>
</div>

<main id="main">
<div class="about-grid">
<div>
<div class="info-block reveal">
<div class="info-block__icon">${icon('target')}</div>
<h2>${t(lang, 'mission_title')}</h2>
<p>${t(lang, 'mission_desc')}</p>
</div>
<div class="info-block reveal">
<div class="info-block__icon">${icon('lock')}</div>
<h2>${t(lang, 'privacy_title')}</h2>
<p>${t(lang, 'privacy_desc')}</p>
</div>
<div class="info-block reveal">
<div class="info-block__icon">${icon('book-open')}</div>
<h2>${t(lang, 'evidence_title')}</h2>
<p>${t(lang, 'evidence_desc')}</p>
</div>
<div class="info-block reveal">
<div class="info-block__icon">${icon('alert-triangle')}</div>
<h2>${t(lang, 'honest_title')}</h2>
<p>${t(lang, 'honest_desc')}</p>
</div>
${bandChart(lang)}
</div>
<aside class="method-card">
<span class="eyebrow">${t(lang, 'method_title')}</span>
<h3>${t(lang, 'method_name')}</h3>
<p>${t(lang, 'method_desc')}</p>
<h3 class="mt-6">${t(lang, 'bands_title')}</h3>
<ul class="band-list">
${bands}
</ul>
</aside>
</div>
</main>`;
}

/* ---------------------------------------------------------------
   YAZILAR (LİSTE)
   --------------------------------------------------------------- */

function insightsMain(lang) {
  const feat = ARTICLES.find((a) => a.featured);
  const rest = ARTICLES.filter((a) => !a.featured);

  const cards = rest.map((a) => `<article class="post reveal" data-tone="${a.tone}">
<div class="post__art">${ILLUSTRATIONS[a.tone]}</div>
<div class="post__body">
<span class="badge">${t(lang, a.badgeKey)}</span>
<h3><a href="${url('article', lang, a.slug)}">${a[lang].title}</a></h3>
<p class="post__excerpt">${a[lang].desc}</p>
<div class="post-foot">
<span>${dateLabel(a.date, lang)}</span>
<span class="read-link">${t(lang, 'blog_read')} ${icon('arrow-right')}</span>
</div>
</div>
</article>`).join('\n');

  return `<header class="blog-hero">
<div class="wrap">
<h1>${t(lang, 'blog_hero_title')}</h1>
<p>${t(lang, 'blog_hero_desc')}</p>
</div>
</header>

<main id="main">
<div class="blog-wrap">
<article class="feature reveal" data-tone="${feat.tone}">
<div class="feature__art">${ILLUSTRATIONS[feat.tone]}</div>
<div class="feature__body">
<span class="badge">${t(lang, feat.badgeKey)}</span>
<h2><a href="${url('article', lang, feat.slug)}">${feat[lang].title}</a></h2>
<p>${feat[lang].desc}</p>
<div class="post-foot">
<span class="author"><span class="author__avatar">${icon('user-round')}</span> ${t(lang, 'blog_author')}</span>
<a href="${url('article', lang, feat.slug)}" class="read-link">${t(lang, 'blog_read_full')} ${icon('arrow-right')}</a>
</div>
</div>
</article>
<div class="post-grid">
${cards}
</div>
</div>
</main>`;
}

/* ---------------------------------------------------------------
   MAKALE
   --------------------------------------------------------------- */

function articleMain(article, lang, prepared) {
  const idx = ARTICLES.indexOf(article);
  const next = ARTICLES[(idx + 1) % ARTICLES.length];
  const test = byId[article.relatedTest];

  const toc = prepared.headings.length >= 3
    ? `<nav class="toc" aria-label="${t(lang, 'art_toc')}">
<h2>${t(lang, 'art_toc')}</h2>
<ol>
${prepared.headings.map((h) => `<li><a href="#${h.id}">${h.text}</a></li>`).join('\n')}
</ol>
</nav>`
    : '';

  return `<div class="read-progress" aria-hidden="true"></div>
<header class="doc-hero" data-tone="${article.tone}">
<div class="doc-hero__inner">
<span class="badge">${t(lang, article.badgeKey)}</span>
<h1>${article[lang].title}</h1>
<div class="doc-meta">
<span>${icon('user-round')} ${t(lang, 'blog_author')}</span>
<span>${icon('calendar')} ${dateLabel(article.date, lang)}</span>
<span>${icon('check')} ${t(lang, 'art_updated').replace('{date}', dateLabel(article.modified || article.date, lang))}</span>
<span>${icon('book-open')} ${t(lang, 'art_reading_time').replace('{n}', prepared.minutes)}</span>
</div>
</div>
</header>

<main id="main">
<div class="article-layout${toc ? '' : ' article-layout--plain'}">
<article class="prose">
<p><strong>${article[lang].dek}</strong></p>
${prepared.body}

<section class="doc-section">
<h2>${t(lang, 'art_refs')}</h2>
<p class="refs__desc">${t(lang, 'art_refs_desc')}</p>
<ol class="refs">
${article.refs.map((r) => `<li><a href="https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/" target="_blank" rel="noopener noreferrer">${r[lang]}</a><span class="ref__id">PMID ${r.pmid}</span></li>`).join('\n')}
</ol>
</section>

<div class="callout callout--warn"><p>${t(lang, 'art_disclaimer')}</p></div>

<section class="doc-cta">
<h2>${t(lang, 'art_cta_title')}</h2>
<p>${t(lang, 'art_cta_desc')}</p>
<a class="btn btn--primary" href="${url('test', lang, test.id)}">${t(lang, 'art_cta_btn')} ${icon('arrow-right')}</a>
</section>

<a class="next-article" href="${url('article', lang, next.slug)}">
<span class="next-article__label">${t(lang, 'art_next')}</span>
<h3>${next[lang].title}</h3>
<p>${next[lang].desc}</p>
</a>
</article>
${toc}
</div>
</main>`;
}

/* ---------------------------------------------------------------
   TEST TANITIM SAYFASI
   --------------------------------------------------------------- */

function testMain(test, lang) {
  const c = test[lang];
  const others = TESTS.filter((x) => x.id !== test.id).slice(0, 4);
  const sample = sampleQuestion(test.id, lang);
  const sci = SCIENCE[test.id];
  const low = sample.custom ? (sample.custom[lang] || sample.custom.en).low : t(lang, `scale_${sample.anchorKey}_low`);
  const high = sample.custom ? (sample.custom[lang] || sample.custom.en).high : t(lang, `scale_${sample.anchorKey}_high`);

  return `<header class="test-hero" data-tone="${test.id}">
<div class="test-hero__art">${ILLUSTRATIONS[test.id]}</div>
<h1>${c.name}</h1>
<p class="lede">${c.lede}</p>
<div class="test-actions">
<a class="btn btn--primary" href="${url('quiz', lang)}?type=${test.id}&amp;mode=full">${t(lang, 'test_start_full')} ${icon('arrow-right')}</a>
<a class="btn btn--ghost" href="${url('quiz', lang)}?type=${test.id}&amp;mode=quick">${t(lang, 'test_start_quick')}</a>
</div>
<div class="meta-row">
<span>${icon('clock')} ${t(lang, 'test_meta_len')}</span>
<span>${icon('list-checks')} ${t(lang, 'test_meta_short')}</span>
<span>${icon('lock')} ${t(lang, 'test_meta_free')}</span>
</div>
</header>

<main id="main" data-tone="${test.id}">
<section class="doc-section">
<h2>${t(lang, 'test_measures')}</h2>
<ul class="measure-list">
${c.measures.map((m) => `<li>${icon('check')}<span>${m}</span></li>`).join('\n')}
</ul>
</section>

<section class="doc-section">
<h2>${t(lang, 'test_sample')}</h2>
${sampleScale(sample.text, low, high)}
<p class="sample-note">${t(lang, 'test_sample_note')}</p>
</section>

<section class="doc-section">
<h2>${t(lang, 'test_who')}</h2>
<p>${c.who}</p>
</section>

<section class="doc-section">
<h2>${t(lang, 'test_bands')}</h2>
${bandChart(lang)}
</section>

<section class="doc-section">
<h2>${t(lang, 'test_faq')}</h2>
${c.faq.map((f) => `<div class="faq-item"><h3>${f.q}</h3><p>${f.a}</p></div>`).join('\n')}
</section>

<section class="doc-section">
<h2>${t(lang, 'test_basis')}</h2>
<p>${t(lang, 'test_basis_desc')}</p>
<ul class="basis">
${sci.basis[lang].map((b) => `<li class="basis__item">${b}</li>`).join('\n')}
</ul>
<h3 class="refs__title">${t(lang, 'test_refs')}</h3>
<ol class="refs">
${sci.refs.map((r) => `<li><a href="https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/" target="_blank" rel="noopener noreferrer">${r[lang]}</a><span class="ref__id">PMID ${r.pmid}</span></li>`).join('\n')}
</ol>
</section>

<section class="doc-section">
<div class="callout callout--warn"><p>${t(lang, 'test_warn')}</p></div>
</section>

<section class="doc-section pb-10">
<h2>${t(lang, 'test_related')}</h2>
<div class="related-grid">
${others.map((o) => `<a href="${url('test', lang, o.id)}" data-tone="${o.id}">${icon(o.icon)} ${o[lang].name}</a>`).join('\n')}
</div>
</section>
</main>`;
}

/* ---------------------------------------------------------------
   TEST EKRANI
   --------------------------------------------------------------- */

function quizMain(lang) {
  return `<main id="main" class="quiz-shell">
<div class="quiz-top">
<a href="${url('home', lang)}" class="btn btn--quiet">${icon('arrow-left')} ${t(lang, 'quiz_back')}</a>
<span class="quiz-saved">${icon('check')} ${t(lang, 'quiz_saved')}</span>
</div>

<div class="resume">
<p>${t(lang, 'quiz_resume_text')}</p>
<button type="button" class="btn btn--primary btn--sm" data-resume-yes>${t(lang, 'quiz_resume_yes')}</button>
<button type="button" class="btn btn--quiet btn--sm" data-resume-no>${t(lang, 'quiz_resume_no')}</button>
</div>

<div class="quiz-main" hidden>
<div class="progress">
<div class="progress__meta">
<span class="progress__count">…</span>
<span class="progress__right">
<span class="progress__left-time"></span>
<span class="progress__mode">${t(lang, 'quiz_mode_full')}</span>
</span>
</div>
<div class="progress__track" role="progressbar" aria-valuemin="0" aria-valuenow="0" aria-valuemax="25">
<div class="progress__seen"></div>
<div class="progress__fill"></div>
</div>
</div>

<section class="qcard">
<div class="qcard__inner">
<span class="qcard__index"></span>
<h2 id="question-text" tabindex="-1">…</h2>
<div class="scale-legend">
<span data-scale-low></span>
<span data-scale-high></span>
</div>
<div class="scale" role="radiogroup" aria-labelledby="question-text"></div>
</div>
<p class="scale-hint"><kbd>1</kbd>–<kbd>9</kbd>, <kbd>0</kbd> = 10 · <kbd>Enter</kbd> ›</p>
</section>

<div class="qfoot">
<button type="button" class="btn btn--quiet prev-btn" disabled>${icon('arrow-left')} ${t(lang, 'quiz_prev')}</button>
<label class="auto-toggle"><input type="checkbox" data-auto checked> ${t(lang, 'quiz_auto')}</label>
<button type="button" class="btn btn--primary next-btn" disabled><span class="next-label">${t(lang, 'quiz_next')}</span> ${icon('chevron-right')}</button>
</div>

<p class="quiz-note">${t(lang, 'quiz_disclaimer')}</p>
</div>

<p class="visually-hidden" role="status" aria-live="polite" data-live></p>
</main>`;
}

/* ---------------------------------------------------------------
   SONUÇ
   --------------------------------------------------------------- */

function resultMain(lang) {
  return `<main id="main" class="result-wrap">
<div class="shared-note" id="shared-note" hidden>
${icon('info')} <span>${t(lang, 'res_shared_note')}</span>
<a class="btn btn--primary btn--sm" id="again-btn" href="${url('home', lang)}">${t(lang, 'res_shared_cta')}</a>
</div>

<div class="result-grid">
<div>
<section class="panel score">
<span class="score__label" id="result-test-label"></span>
<svg class="ring" viewBox="0 0 200 200" aria-hidden="true">
<circle class="ring__track" cx="100" cy="100" r="86"></circle>
<circle class="ring__value" cx="100" cy="100" r="86"></circle>
<text class="ring__num" id="ring-num" x="100" y="96" dominant-baseline="middle">…</text>
<text class="ring__unit" x="100" y="126">${t(lang, 'res_of100')}</text>
</svg>
<h1 id="result-title">${t(lang, 'res_analyzing')}</h1>
<span class="band-chip" id="band-chip"></span>
<div class="score__text" id="result-text"></div>
<p class="score__from" id="result-from"></p>
<div class="med-note">
<span class="med-note__icon">${icon('alert-triangle')}</span>
<span>${t(lang, 'res_disclaimer')}</span>
</div>
</section>

<section class="panel panel--plan">
<h2>${icon('list-checks')} ${t(lang, 'res_plan_title')}</h2>
<p>${t(lang, 'res_plan_desc')}</p>
<ol class="plan" id="plan"></ol>
</section>

<section class="panel panel--flag" id="flags-panel" hidden>
<h2>${icon('alert-triangle')} ${t(lang, 'res_flags_title')}</h2>
<p>${t(lang, 'res_flags_desc')}</p>
<ul class="flags" id="flags"></ul>
</section>

<section class="panel">
<h2>${t(lang, 'res_breakdown_title')}</h2>
<p>${t(lang, 'res_breakdown_desc')}</p>
<div class="themes" id="breakdown"></div>
</section>

</div>

<div>
<section class="panel">
<h2>${t(lang, 'res_share_title')}</h2>
<p>${t(lang, 'res_share_desc')}</p>
<div class="share-row">
<button type="button" class="share-btn share-btn--native" data-share="native" hidden>${icon('share')} ${t(lang, 'res_native')}</button>
<button type="button" class="share-btn share-btn--x" data-share="x">${icon('x-brand')} ${t(lang, 'res_x')}</button>
<button type="button" class="share-btn share-btn--wa" data-share="whatsapp">${icon('whatsapp')} ${t(lang, 'res_whatsapp')}</button>
<button type="button" class="share-btn share-btn--ghost" data-share="copy">${icon('link')} <span data-copy-label>${t(lang, 'res_copy')}</span></button>
<button type="button" class="share-btn share-btn--ghost" data-share="image">${icon('image')} ${t(lang, 'res_image')}</button>
</div>
<p class="share-hint">${t(lang, 'res_image_hint')}</p>
<canvas id="share-canvas" width="1080" height="1080"></canvas>
</section>

<section class="panel">
<h2>${icon('check')} ${t(lang, 'res_best_title')}</h2>
<ul class="answers" id="best"></ul>
</section>

<section class="panel" id="history-panel" hidden>
<h2>${icon('trending-up')} ${t(lang, 'res_history_title')}</h2>
<p>${t(lang, 'res_history_desc')}</p>
<svg class="spark" id="spark" viewBox="0 0 300 54" aria-hidden="true"></svg>
<div class="history" id="history-list"></div>
<button type="button" class="btn btn--quiet btn--sm mt-4" id="history-clear">${t(lang, 'res_history_clear')}</button>
</section>

<section class="panel">
<h2>${t(lang, 'res_expert')}</h2>
<p>${t(lang, 'res_expert_desc')}</p>
<div class="actions">
<a class="action-btn action-btn--mail" id="mail-btn" href="mailto:info@shentechin.com">${icon('mail')} ${t(lang, 'res_premium')}</a>
<p class="action-note">${t(lang, 'res_premium_note')}</p>
<a class="action-btn" id="retake-btn" href="${url('home', lang)}">${icon('refresh')} ${t(lang, 'res_again')}</a>
<button type="button" class="action-btn" id="remind-btn">${icon('bell')} ${t(lang, 'res_remind')}</button>
<p class="action-note">${t(lang, 'res_remind_note')}</p>
<button type="button" class="action-btn no-print" id="print-btn">${icon('printer')} ${t(lang, 'res_print')}</button>
<a class="action-btn" href="${url('home', lang)}">${icon('arrow-left')} ${t(lang, 'res_retry')}</a>
</div>
</section>

<section class="panel panel--evidence" id="evidence-panel">
<h2>${icon('book-open')} ${t(lang, 'res_basis_title')}</h2>
<p>${t(lang, 'res_basis_desc')}</p>
<ul class="basis" id="basis"></ul>
<h3 class="refs__title">${t(lang, 'res_refs_title')}</h3>
<p class="refs__desc">${t(lang, 'res_refs_desc')}</p>
<ol class="refs" id="refs"></ol>
</section>

<section class="panel">
<h2>${t(lang, 'res_read_title')}</h2>
<div class="read-next">
${ARTICLES.map((a) => `<a href="${url('article', lang, a.slug)}">${icon('book-open')} ${a[lang].title}</a>`).join('\n')}
</div>
</section>
</div>
</div>
</main>`;
}

/* ---------------------------------------------------------------
   YASAL + 404
   --------------------------------------------------------------- */

function legalMain(l, lang) {
  const c = l[lang];
  return `<header class="doc-hero">
<div class="doc-hero__inner">
<h1>${c.h1}</h1>
<div class="doc-meta"><span>${icon('clock')} ${c.updated}</span></div>
</div>
</header>
<main id="main">
<div class="article-layout article-layout--plain">
<article class="prose">${c.body}</article>
</div>
</main>`;
}

function notFoundMain(lang) {
  return `<main id="main" class="notfound">
<div class="notfound__code">404</div>
<h1>${t(lang, 'nf_title')}</h1>
<p>${t(lang, 'nf_desc')}</p>
<a class="btn btn--primary" href="${url('home', lang)}">${icon('arrow-left')} ${t(lang, 'nf_btn')}</a>
</main>`;
}

/* ---------------------------------------------------------------
   SAYFALARI YAZ
   --------------------------------------------------------------- */

for (const lang of LANGS) {
  /* --- ana sayfa --- */
  writePage(filePath('home', lang), page({
    kind: 'home', lang, active: 'tests',
    title: t(lang, 'home_doc_title'), desc: t(lang, 'home_doc_desc'),
    ogImage: ogFor('home', lang),
    css: ['home.css'], main: homeMain(lang),
    breadcrumb: [{ name: 'ShenTechin MED', url: absUrl('home', lang) }]
  }));

  /* --- hakkımızda --- */
  writePage(filePath('about', lang), page({
    kind: 'about', lang, active: 'about',
    title: t(lang, 'about_doc_title'), desc: t(lang, 'about_doc_desc'),
    ogImage: ogFor('about', lang),
    css: ['doc.css'], main: aboutMain(lang),
    breadcrumb: [
      { name: 'ShenTechin MED', url: absUrl('home', lang) },
      { name: t(lang, 'nav_about') }
    ]
  }));

  /* --- yazılar listesi --- */
  writePage(filePath('insights', lang), page({
    kind: 'insights', lang, active: 'insights',
    title: t(lang, 'blog_doc_title'), desc: t(lang, 'blog_doc_desc'),
    ogImage: ogFor('insights', lang),
    css: ['blog.css'], main: insightsMain(lang),
    breadcrumb: [
      { name: 'ShenTechin MED', url: absUrl('home', lang) },
      { name: t(lang, 'nav_insights') }
    ]
  }));

  /* --- test ekranı --- */
  writePage(filePath('quiz', lang), page({
    kind: 'quiz', lang, noindex: true,
    title: t(lang, 'quiz_doc_title'), desc: t(lang, 'quiz_doc_desc'),
    css: ['quiz.css'], scripts: ['quiz.js'],
    inlineJs: runtime(lang, RUNTIME_KEYS.quiz),
    main: quizMain(lang)
  }));

  /* --- sonuç --- */
  writePage(filePath('result', lang), page({
    kind: 'result', lang, noindex: true,
    title: t(lang, 'res_doc_title'), desc: t(lang, 'res_doc_desc'),
    css: ['result.css'], scripts: ['result.js'],
    inlineJs: runtime(lang, RUNTIME_KEYS.result),
    main: resultMain(lang)
  }));

  /* --- 404 --- */
  writePage(filePath('notfound', lang), page({
    kind: 'notfound', lang, noindex: true,
    title: `${t(lang, 'nf_title')} — ShenTechin MED`, desc: t(lang, 'nf_desc'),
    css: ['doc.css'], main: notFoundMain(lang)
  }));

  /* --- yasal --- */
  for (const l of LEGAL) {
    writePage(filePath(l.slug, lang), page({
      kind: l.slug, lang,
      title: l[lang].title, desc: l[lang].desc,
      css: ['doc.css'], main: legalMain(l, lang),
      breadcrumb: [
        { name: 'ShenTechin MED', url: absUrl('home', lang) },
        { name: l[lang].h1 }
      ]
    }));
  }

  /* --- test tanıtım sayfaları --- */
  for (const test of TESTS) {
    writePage(filePath('test', lang, test.id), page({
      kind: 'test', lang, slug: test.id, active: 'tests',
      title: test[lang].title, desc: test[lang].desc,
      ogImage: ogFor(`test-${test.id}`, lang),
      css: ['doc.css'], main: testMain(test, lang),
      faq: test[lang].faq,
      quiz: { name: test[lang].name, about: test[lang].name },
      breadcrumb: [
        { name: 'ShenTechin MED', url: absUrl('home', lang) },
        { name: t(lang, 'nav_tests'), url: absUrl('home', lang) },
        { name: test[lang].name }
      ]
    }));
  }

  /* --- makaleler --- */
  for (const article of ARTICLES) {
    const prepared = prepareArticle(article, lang);
    writePage(filePath('article', lang, article.slug), page({
      kind: 'article', lang, slug: article.slug, active: 'insights',
      title: `${article[lang].title} — ShenTechin MED`, desc: article[lang].desc,
      ogType: 'article', ogImage: ogFor(`art-${article.slug}`, lang),
      css: ['doc.css'], main: articleMain(article, lang, prepared),
      article: {
        headline: article[lang].title,
        date: article.date,
        modified: article.modified || article.date,
        section: t(lang, article.badgeKey),
        words: prepared.words,
        citations: article.refs
      },
      breadcrumb: [
        { name: 'ShenTechin MED', url: absUrl('home', lang) },
        { name: t(lang, 'nav_insights'), url: absUrl('insights', lang) },
        { name: article[lang].title }
      ]
    }));
  }
}

/* --- /insights/ ve /tr/yazilar/ boşta kalmasın --- */
for (const [dir, target] of [['insights/index.html', url('insights', 'en')], ['tr/yazilar/index.html', url('insights', 'tr')]]) {
  write(dir, `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<title>Insights — ShenTechin MED</title>
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="${SITE}${target}">
<meta http-equiv="refresh" content="0; url=${target}">
</head><body><p><a href="${target}">ShenTechin MED</a></p></body></html>
`);
}

/* ---------------------------------------------------------------
   SORU BANKALARI VE SONUÇ METİNLERİ

   İkisi de tarayıcıya ayrı dosya olarak gider ve ikisi de tools/
   altındaki kaynaktan üretilir. Daha önce sonuç metinleri elle
   yazılmış dosyalarda duruyordu ve content-results.mjs'e yapılan bir
   değişiklik siteye hiç ulaşmıyordu — bu döngü artık kapalı.
   --------------------------------------------------------------- */

for (const id of TEST_IDS) {
  write(`assets/js/data/${id}.js`, dataFile(id));
}

for (const lang of LANGS) {
  for (const id of TEST_IDS) {
    const band = RESULT_TEXTS[lang][id];
    const sci = SCIENCE[id];
    const payload = {
      name: band.name,
      bands: band.bands,
      basis: sci.basis[lang],
      /* p = PubMed kimliği, t = kaynak künyesi */
      refs: sci.refs.map((r) => ({ p: r.pmid, t: r[lang] })),
      domains: Object.fromEntries(
        Object.entries(sci.domains).map(([k, v]) => [k, v[lang]])
      ),
      actions: Object.fromEntries(
        Object.entries(sci.actions).map(([k, v]) => [k, v[lang]])
      ),
      /* q = soru indeksleri, at = puan eşiği, n = kaç tanesi eşiğin altında olmalı */
      flags: sci.flags.map((f) => ({ q: f.q, at: f.at, n: f.need, t: f[lang] }))
    };
    write(`assets/js/results/${id}.${lang}.js`,
      `window.RESULT_TEXT=${JSON.stringify(payload)};\n`);
  }
}

/* ---------------------------------------------------------------
   SITEMAP / ROBOTS / SW / MANIFEST
   --------------------------------------------------------------- */

const TODAY = '2026-08-24';

const entries = [];
for (const lang of LANGS) {
  const add = (kind, slug, priority, lastmod = TODAY) => {
    entries.push({
      loc: absUrl(kind, lang, slug),
      alt: LANGS.map((l) => ({ lang: l, href: absUrl(kind, l, slug) })),
      priority, lastmod
    });
  };
  add('home', null, lang === 'en' ? '1.0' : '0.9');
  add('insights', null, '0.8');
  add('about', null, '0.6');
  for (const test of TESTS) add('test', test.id, '0.9');
  for (const a of ARTICLES) add('article', a.slug, '0.7', a.modified || a.date);
  for (const l of LEGAL) add(l.slug, null, '0.3');
}

write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.map((e) => `  <url>
    <loc>${e.loc}</loc>
${e.alt.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.href}"/>`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${e.alt[0].href}"/>
    <lastmod>${e.lastmod}</lastmod>
    <priority>${e.priority}</priority>
  </url>`).join('\n')}
</urlset>
`);

write('robots.txt', `User-agent: *
Allow: /
Disallow: /quiz.html
Disallow: /result.html
Disallow: /tr/test.html
Disallow: /tr/sonuc.html

Sitemap: ${SITE}/sitemap.xml
`);

write('site.webmanifest', manifest('en'));

/* Service worker sürümü: kaynak dosyaların içeriğinden türetilir, böylece
   yalnızca gerçekten bir şey değiştiğinde önbellek tazelenir. */
const stamp = [
  'assets/js/app.js', 'assets/js/quiz.js', 'assets/js/result.js',
  'assets/css/src/core.css', 'tools/build.mjs'
].map((f) => fs.statSync(path.join(ROOT, f)).size).join('-');

write('sw.js', serviceWorker(stamp, [
  url('home', 'en'),
  url('home', 'tr'),
  '/assets/js/app.js',
  '/assets/js/quiz.js',
  '/assets/js/result.js',
  '/assets/fonts/pjs-latin.woff2',
  '/assets/fonts/pjs-latin-ext.woff2',
  '/favicon.svg',
  '/favicon-96x96.png',
  '/icon-192.png',
  '/site.webmanifest'
]));

/* ---------------------------------------------------------------
   ÖZET
   --------------------------------------------------------------- */

const html = written.filter((f) => f.endsWith('.html'));
console.log(`${written.length} dosya yazıldı (${html.length} HTML sayfası).`);
console.log(`  EN: ${html.filter((f) => !f.startsWith('tr/')).length}   TR: ${html.filter((f) => f.startsWith('tr/')).length}`);
const bytes = written.reduce((a, f) => a + fs.statSync(path.join(ROOT, f)).size, 0);
console.log(`  Toplam: ${(bytes / 1024).toFixed(0)} KB`);

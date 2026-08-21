/* Tüm HTML sayfalarını üretir.  Çalıştırma:  node tools/build.mjs
   İçerik kaynakları: content-tests.mjs, content-articles.mjs, content-legal.mjs
   Ortak iskelet: shell.mjs — nav, footer, meta ve ikon sprite'ı tek yerden gelir. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { page, icon, SITE } from './shell.mjs';
import { TESTS } from './content-tests.mjs';
import { ARTICLES } from './content-articles.mjs';
import { LEGAL } from './content-legal.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const written = [];

function write(rel, html) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html);
  written.push(rel);
}

/* İki dilli uzun metin bloğu */
const bi = (en, tr) => `<div data-lang-block="en">${en}</div>\n<div data-lang-block="tr" hidden>${tr}</div>`;

/* ---------------- ANA SAYFA ---------------- */
function homeMain() {
  const cards = TESTS.map(t => `        <article class="card">
            <div class="card-icon" style="background:${t.bg};color:${t.fg};">${icon(t.icon)}</div>
            <h3><a href="tests/${t.slug}/" data-i18n="card_${t.id}_title">${t.en.name}</a></h3>
            <p data-i18n="card_${t.id}_desc">${t.en.desc}</p>
            <a href="quiz.html?type=${t.id}&amp;mode=quick" class="start-test-btn" data-i18n="btn_start">Start quick test</a>
            <a href="tests/${t.slug}/" class="read-link" style="margin-top:14px" data-i18n="btn_details">About this test</a>
        </article>`).join('\n');

  return `<header class="hero">
    <div class="hero-content">
        <div class="doctor-badge-container">
            <span class="doctor-badge">${icon('stethoscope')} <span data-i18n="hero_badge">Written and reviewed by a medical doctor</span></span>
        </div>
        <h1 data-i18n="hero_title">Understand your everyday<br>health habits</h1>
        <p data-i18n="hero_desc">Nine short self-assessments on the habits that shape how you sleep, eat, move and focus.</p>
        <a href="#test-section" class="cta-button" data-i18n="hero_btn">Choose an assessment</a>
        <div class="hero-trust">
            <span>${icon('check')} <span data-i18n="trust_1">Free, no sign-up</span></span>
            <span>${icon('lock')} <span data-i18n="trust_2">Answers stay in your browser</span></span>
            <span>${icon('clock')} <span data-i18n="trust_3">10 questions, ~2 minutes</span></span>
        </div>
    </div>
</header>

<main id="main">
<section id="test-section" class="container">
    <div class="section-title">
        <h2 data-i18n="cat_title">Assessment categories</h2>
        <p data-i18n="cat_desc">Pick the area you're curious about.</p>
    </div>
    <div class="grid-container">
${cards}
    </div>
</section>
<p class="home-note" data-i18n="home_note">These assessments are educational self-checks, not medical tests.</p>
</main>`;
}

/* ---------------- HAKKIMIZDA ---------------- */
function aboutMain() {
  return `<header class="about-hero">
    <div class="container" style="padding:0">
        <h1 data-i18n="about_hero_title">What this site is — and what it isn't</h1>
        <p data-i18n="about_hero_desc">A small, free collection of health-habit self-assessments.</p>
    </div>
</header>

<div class="stats-bar">
    <div class="stat-item">${icon('stethoscope')} <span data-i18n="stat_1">Written by a doctor</span></div>
    <div class="stat-item">${icon('check')} <span data-i18n="stat_2">Free and anonymous</span></div>
    <div class="stat-item">${icon('shield-check')} <span data-i18n="stat_3">No accounts, no tracking</span></div>
</div>

<main id="main">
<section class="container about-content">
    <div class="text-section">
        <div class="info-block">
            <div class="icon-box">${icon('target')}</div>
            <h2 data-i18n="mission_title">Our aim</h2>
            <p data-i18n="mission_desc">To help people notice the everyday habits behind how they feel.</p>
        </div>
        <div class="info-block">
            <div class="icon-box">${icon('lock')}</div>
            <h2 data-i18n="privacy_title">Privacy</h2>
            <p data-i18n="privacy_desc">There are no accounts and no sign-up.</p>
        </div>
        <div class="info-block">
            <div class="icon-box">${icon('alert-triangle')}</div>
            <h2 data-i18n="honest_title">What we don't claim</h2>
            <p data-i18n="honest_desc">These are self-assessments, not clinical instruments.</p>
        </div>
    </div>
    <aside class="doctor-card">
        <div class="doc-img-placeholder">${icon('compass')}</div>
        <span class="doc-title" data-i18n="method_title">Method</span>
        <h3 data-i18n="method_name">How scoring works</h3>
        <p style="margin-top:15px" data-i18n="method_desc">Each assessment has 25 questions rated 1–10.</p>
    </aside>
</section>
</main>`;
}

/* ---------------- YAZILAR (LİSTE) ---------------- */
function insightsMain() {
  const feat = ARTICLES.find(a => a.featured);
  const rest = ARTICLES.filter(a => !a.featured);
  const cards = rest.map((a, i) => `        <article class="article-card">
            <div class="card-img-top" style="background:${a.bg};color:${a.fg};">${icon(a.icon)}</div>
            <div class="article-body">
                <span class="badge ${a.badge}" data-i18n="${a.badgeKey}">${a.badge}</span>
                <h3 class="article-title"><a href="insights/${a.slug}/" data-i18n="art_${i + 1}_title">${a.en.title}</a></h3>
                <p class="article-excerpt" data-i18n="art_${i + 1}_desc">${a.en.desc}</p>
                <div class="article-footer">
                    <span data-i18n="art_date">21 August 2026</span>
                    <a href="insights/${a.slug}/" class="read-link"><span data-i18n="blog_read">Read</span> ${icon('arrow-right')}</a>
                </div>
            </div>
        </article>`).join('\n');

  return `<header class="insights-hero">
    <div class="container" style="padding:0">
        <h1 data-i18n="blog_hero_title">Plain-language health explainers</h1>
        <p data-i18n="blog_hero_desc">Short pieces on the mechanisms behind the habits our assessments ask about.</p>
    </div>
</header>

<main id="main">
<section class="container blog-container" style="padding-top:0">
    <article class="featured-article">
        <div class="featured-img" style="background:${feat.bg};color:${feat.fg};">${icon(feat.icon)}</div>
        <div class="featured-content">
            <span class="badge ${feat.badge}" data-i18n="${feat.badgeKey}">${feat.badge}</span>
            <h2><a href="insights/${feat.slug}/" data-i18n="art_feat_title">${feat.en.title}</a></h2>
            <p data-i18n="art_feat_desc">${feat.en.desc}</p>
            <div class="article-footer">
                <div class="author-box">
                    <span class="author-avatar">${icon('user-round')}</span>
                    <span data-i18n="blog_author">Dr. ShenTechin</span>
                </div>
                <a href="insights/${feat.slug}/" class="read-link"><span data-i18n="blog_read_full">Read the full piece</span> ${icon('arrow-right')}</a>
            </div>
        </div>
    </article>
    <div class="articles-grid">
${cards}
    </div>
</section>
</main>`;
}

/* ---------------- TEST EKRANI ---------------- */
function quizMain() {
  return `<nav class="quiz-nav">
    <a href="index.html" class="back-link">${icon('arrow-left')} <span data-i18n="quiz_back">Give up &amp; return</span></a>
    <a href="index.html" class="logo logo-small">ShenTechin<span class="med-badge">MED</span></a>
</nav>

<main id="main" class="quiz-container">
    <div class="resume-bar">
        <span data-i18n="quiz_resume_text">You have an unfinished attempt at this assessment.</span>
        <button type="button" class="resume-yes" data-i18n="quiz_resume_yes">Continue</button>
        <button type="button" class="resume-no" data-i18n="quiz_resume_no">Start over</button>
    </div>

    <div class="quiz-main">
        <div class="progress-header">
            <div class="progress-meta">
                <span id="question-count">…</span>
                <span class="quiz-mode-label"></span>
            </div>
            <div class="progress-bar-bg" role="progressbar" aria-valuemin="0" aria-valuenow="0" aria-valuemax="10">
                <div class="progress-bar-fill" style="width:0%"></div>
            </div>
        </div>

        <div class="question-card">
            <h2 id="question-text" tabindex="-1">…</h2>
            <div class="scale-legend">
                <span data-i18n="quiz_scale_low">1 — Not at all / rarely</span>
                <span data-i18n="quiz_scale_high">Very much / always — 10</span>
            </div>
            <div class="options-grid" role="radiogroup" aria-labelledby="question-text"></div>
        </div>

        <div class="quiz-footer">
            <button type="button" class="nav-btn prev-btn" disabled data-i18n="quiz_prev">Previous</button>
            <button type="button" class="nav-btn next-btn" disabled>
                <span class="next-label">Next</span> ${icon('chevron-right')}
            </button>
        </div>

        <p class="quiz-disclaimer" data-i18n="quiz_disclaimer">Your answers stay in your browser.</p>
    </div>
</main>`;
}

/* ---------------- SONUÇ ---------------- */
function resultMain() {
  return `<main id="main">
<div class="container result-container" style="padding-top:20px">
    <section class="result-card">
        <span class="result-test-label" id="result-test-label"></span>
        <div class="score-circle-container">
            <div class="circular-progress" id="score-circle"><span class="progress-value" id="score-text">…</span></div>
        </div>
        <h1 id="result-title" style="color:var(--text-light);font-size:1.5rem;" data-i18n="res_analyzing">Preparing your summary…</h1>
        <div id="result-desc" class="result-desc"></div>
        <div class="medical-disclaimer">
            <span class="disclaimer-icon">${icon('alert-triangle')}</span>
            <span data-i18n="res_disclaimer">This summary reflects the answers you gave, nothing more. It is not a diagnosis.</span>
        </div>
    </section>

    <section class="action-card">
        <h2 style="font-size:1.3rem;margin-top:0;color:var(--secondary)" data-i18n="res_share_title">Share your result</h2>
        <p data-i18n="res_share_desc">Send it to a friend and compare habits.</p>
        <div class="share-buttons">
            <button type="button" class="share-btn native" data-share="native" hidden>${icon('share')} <span data-i18n="res_native">Share</span></button>
            <button type="button" class="share-btn x-share" data-share="x">${icon('x-brand')} <span data-i18n="res_x">Share on X</span></button>
            <button type="button" class="share-btn whatsapp" data-share="whatsapp">${icon('whatsapp')} <span data-i18n="res_whatsapp">WhatsApp</span></button>
        </div>
        <hr style="border:0;border-top:1px solid var(--border);margin:30px 0">
        <h2 style="font-size:1.3rem;color:var(--secondary)" data-i18n="res_expert">Questions about your result?</h2>
        <p data-i18n="res_expert_desc">Write to us and we'll point you to the right reading.</p>
        <div class="result-buttons-container">
            <a class="premium-btn" id="premium-btn" href="mailto:info@shentechin.com">${icon('mail')} <span data-i18n="res_premium">Send us a message</span></a>
            <p class="premium-note" data-i18n="res_premium_note">This is not a medical consultation service.</p>
            <a class="retry-btn" href="index.html">${icon('refresh')} <span data-i18n="res_retry">Take another assessment</span></a>
        </div>
    </section>
</div>
</main>`;
}

/* ---------------- TEST TANITIM SAYFASI ---------------- */
function testMain(t) {
  const others = TESTS.filter(x => x.id !== t.id).slice(0, 4);
  const block = (c, lang) => `
    <header class="test-hero">
        <div class="test-hero-icon" style="background:${t.bg};color:${t.fg};">${icon(t.icon)}</div>
        <h1>${c.name}</h1>
        <p class="lede">${c.lede}</p>
        <div class="test-actions">
            <a class="cta-button" href="../../quiz.html?type=${t.id}&amp;mode=quick">${lang === 'en' ? 'Start short version' : 'Kısa sürümü başlat'} ${icon('arrow-right')}</a>
            <a class="btn-secondary" href="../../quiz.html?type=${t.id}&amp;mode=full">${lang === 'en' ? 'Detailed version' : 'Detaylı sürüm'}</a>
        </div>
        <div class="test-meta">
            <span>${icon('clock')} ${lang === 'en' ? '10 questions · about 2 minutes' : '10 soru · yaklaşık 2 dakika'}</span>
            <span>${icon('list-checks')} ${lang === 'en' ? '25 questions in the detailed version' : 'Detaylı sürümde 25 soru'}</span>
            <span>${icon('lock')} ${lang === 'en' ? 'Free and anonymous' : 'Ücretsiz ve anonim'}</span>
        </div>
    </header>

    <section class="test-section">
        <h2>${lang === 'en' ? 'What it looks at' : 'Neye bakıyor'}</h2>
        <ul class="measure-list">${c.measures.map(m => `<li>${icon('check')}<span>${m}</span></li>`).join('')}</ul>
    </section>

    <section class="test-section">
        <h2>${lang === 'en' ? 'Who it is for' : 'Kimin için'}</h2>
        <p style="color:var(--text-light);line-height:1.8">${c.who}</p>
    </section>

    <section class="test-section">
        <h2>${lang === 'en' ? 'Common questions' : 'Sık sorulanlar'}</h2>
        ${c.faq.map(f => `<div class="faq-item"><h3>${f.q}</h3><p>${f.a}</p></div>`).join('')}
    </section>

    <section class="test-section" style="padding-bottom:20px">
        <div class="callout warn"><p>${lang === 'en'
          ? 'This is an educational self-assessment, not a medical test. It cannot diagnose anything. Read the <a href="../../disclaimer.html">medical disclaimer</a> before you start.'
          : 'Bu, eğitim amaçlı bir öz-değerlendirmedir, tıbbi test değildir. Hiçbir şeye teşhis koyamaz. Başlamadan önce <a href="../../disclaimer.html">tıbbi uyarıyı</a> okuyun.'}</p></div>
    </section>

    <section class="test-section" style="padding-bottom:70px">
        <h2>${lang === 'en' ? 'Other assessments' : 'Diğer değerlendirmeler'}</h2>
        <div class="related-tests">${others.map(o => `<a href="../${o.slug}/">${icon(o.icon)} ${o[lang].name}</a>`).join('')}</div>
    </section>`;

  return `<main id="main">${bi(block(t.en, 'en'), block(t.tr, 'tr'))}</main>`;
}

/* ---------------- MAKALE ---------------- */
function articleMain(a) {
  const block = (c, lang) => `
    <header class="doc-hero">
        <span class="badge ${a.badge}">${lang === 'en' ? { neuro: 'Stress', diet: 'Metabolism', sleep: 'Sleep', cardio: 'Heart' }[a.badge] : { neuro: 'Stres', diet: 'Metabolizma', sleep: 'Uyku', cardio: 'Kalp' }[a.badge]}</span>
        <h1>${c.title}</h1>
        <div class="doc-meta">
            <span>${icon('user-round')} Dr. ShenTechin</span>
            <span>${icon('calendar')} ${lang === 'en' ? '21 August 2026' : '21 Ağustos 2026'}</span>
        </div>
    </header>
    <article class="prose">
        <p><strong>${c.dek}</strong></p>
        ${c.body}
        <div class="callout warn"><p>${lang === 'en'
          ? 'This article is general information, not medical advice, and it is not a substitute for seeing a healthcare professional about your own situation.'
          : 'Bu yazı genel bilgidir, tıbbi tavsiye değildir ve kendi durumunuz için bir sağlık profesyoneline başvurmanın yerini tutmaz.'}</p></div>
    </article>
    <section class="doc-cta">
        <h2>${lang === 'en' ? 'Curious where you stand?' : 'Kendi durumunuzu merak ettiniz mi?'}</h2>
        <p>${lang === 'en' ? 'Take the related self-assessment — 10 questions, about two minutes.' : 'İlgili öz-değerlendirmeyi yapın — 10 soru, yaklaşık iki dakika.'}</p>
        <a class="cta-button" href="../../tests/${a.relatedTest}/">${lang === 'en' ? 'Go to the assessment' : 'Değerlendirmeye git'} ${icon('arrow-right')}</a>
    </section>`;

  return `<main id="main">${bi(block(a.en, 'en'), block(a.tr, 'tr'))}</main>`;
}

/* ---------------- YASAL ---------------- */
function legalMain(l) {
  const block = (c, lang) => `
    <header class="doc-hero">
        <h1>${c.h1}</h1>
        <div class="doc-meta"><span>${icon('clock')} ${lang === 'en' ? 'Last updated' : 'Son güncelleme'}: ${c.updated}</span></div>
    </header>
    <article class="prose">${c.body}</article>
    <div style="height:60px"></div>`;
  return `<main id="main">${bi(block(l.en, 'en'), block(l.tr, 'tr'))}</main>`;
}

/* ---------------- 404 ---------------- */
function notFoundMain() {
  return `<main id="main" class="notfound">
    <h1>404</h1>
    ${bi(`<h2>Page not found</h2><p>The page you were looking for isn't here. It may have moved, or the link may be wrong.</p>`,
         `<h2>Sayfa bulunamadı</h2><p>Aradığınız sayfa burada değil. Taşınmış ya da bağlantı hatalı olabilir.</p>`)}
    <a class="cta-button" href="/index.html">${icon('arrow-left')} <span data-i18n="footer_all_tests">All assessments</span></a>
</main>`;
}

/* ---------------- SAYFALARI YAZ ---------------- */
ARTICLES[0].relatedTest = 'stress';
ARTICLES[1].relatedTest = 'diet';
ARTICLES[2].relatedTest = 'sleep';
ARTICLES[3].relatedTest = 'heart';

write('index.html', page({
  path: 'index.html', depth: 0, active: 'tests',
  title: 'ShenTechin Med — Free health habit self-assessments',
  desc: 'Nine free, anonymous self-assessments on sleep, skin, nutrition, stress, heart habits, focus, fitness, immunity and screen time. Written by a medical doctor. Not a diagnosis.',
  titleKey: 'home_doc_title', descKey: 'home_doc_desc',
  css: ['home.css'], bundles: ['home.js'], main: homeMain()
}));

write('about.html', page({
  path: 'about.html', depth: 0, active: 'about',
  title: 'About — ShenTechin Med',
  desc: 'Who makes ShenTechin Med, how the assessments are built and scored, and what they deliberately do not claim to do.',
  titleKey: 'about_doc_title', descKey: 'about_doc_desc',
  css: ['home.css', 'pages.css'], bundles: ['about.js'], main: aboutMain()
}));

write('insights.html', page({
  path: 'insights.html', depth: 0, active: 'insights',
  title: 'Insights — ShenTechin Med',
  desc: 'Plain-language explainers on stress, sleep, metabolism and heart rate variability, written by a medical doctor.',
  titleKey: 'blog_doc_title', descKey: 'blog_doc_desc',
  css: ['home.css', 'pages.css'], bundles: ['insights.js'], main: insightsMain()
}));

write('quiz.html', page({
  path: 'quiz.html', depth: 0, noindex: true,
  title: 'Assessment — ShenTechin Med',
  desc: 'Answer the questions to see your habit summary.',
  css: ['home.css', 'quiz.css', 'pages.css'], bundles: ['quiz.js'],
  bodyClass: 'quiz-body', scripts: ['quiz-engine.js'], main: quizMain()
}));

write('result.html', page({
  path: 'result.html', depth: 0, noindex: true,
  title: 'Your result — ShenTechin Med',
  desc: 'Your habit summary from the assessment you just completed.',
  css: ['home.css', 'pages.css'], bundles: ['results.js'],
  scripts: ['result.js'], main: resultMain()
}));

write('404.html', page({
  path: '404.html', depth: 0, noindex: true,
  title: 'Page not found — ShenTechin Med',
  desc: 'This page does not exist.',
  css: ['home.css', 'pages.css'], main: notFoundMain()
}));

for (const l of LEGAL) {
  write(`${l.slug}.html`, page({
    path: `${l.slug}.html`, depth: 0,
    title: l.en.title, desc: l.en.desc,
    css: ['home.css', 'pages.css'], main: legalMain(l)
  }));
}

for (const t of TESTS) {
  write(`tests/${t.slug}/index.html`, page({
    path: `tests/${t.slug}/index.html`, depth: 2, active: 'tests',
    title: t.en.title, desc: t.en.desc,
    css: ['home.css', 'pages.css'], main: testMain(t)
  }));
}

for (const a of ARTICLES) {
  write(`insights/${a.slug}/index.html`, page({
    path: `insights/${a.slug}/index.html`, depth: 2, active: 'insights',
    title: a.en.title, desc: a.en.desc, ogType: 'article',
    css: ['home.css', 'pages.css'], main: articleMain(a)
  }));
}

/* /insights/ adresi boşta kalmasın: listeye yönlendir */
write('insights/index.html', `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<title>Insights — ShenTechin Med</title>
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="${SITE}/insights.html">
<meta http-equiv="refresh" content="0; url=../insights.html">
</head><body><p><a href="../insights.html">Insights</a></p></body></html>
`);

/* ---------------- SITEMAP + ROBOTS ---------------- */
const TODAY = '2026-08-21';
const urls = [
  ['', '1.0'], ['about.html', '0.6'], ['insights.html', '0.8'],
  ...LEGAL.map(l => [`${l.slug}.html`, '0.3']),
  ...TESTS.map(t => [`tests/${t.slug}/`, '0.9']),
  ...ARTICLES.map(a => [`insights/${a.slug}/`, '0.7'])
];
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([u, p]) => `  <url><loc>${SITE}/${u}</loc><lastmod>${TODAY}</lastmod><priority>${p}</priority></url>`).join('\n')}
</urlset>
`);

write('robots.txt', `User-agent: *
Allow: /
Disallow: /quiz.html
Disallow: /result.html

Sitemap: ${SITE}/sitemap.xml
`);

console.log(`${written.length} dosya yazıldı:`);
console.log(written.map(f => '  ' + f).join('\n'));

/* Ortak sayfa iskeleti: <head>, navigasyon, alt bilgi.
   Tüm HTML dosyaları buradan üretilir; böylece 22 sayfada nav/footer/meta
   kopyala-yapıştır ile birbirinden ayrışmaz. */
import { icon, sprite, ALL_ICONS } from './icons.mjs';

export const SITE = 'https://shentechin.com';
export const OG_IMAGE = SITE + '/assets/img/og-default.png';

const TEST_LINKS = [
  ['sleep', 'test_sleep_name'], ['skin', 'test_skin_name'], ['diet', 'test_diet_name'],
  ['stress', 'test_stress_name'], ['heart', 'test_heart_name'], ['focus', 'test_focus_name'],
  ['fitness', 'test_fitness_name'], ['immunity', 'test_immunity_name'], ['tech', 'test_tech_name']
];

function nav(p, active) {
  const cur = (id) => (active === id ? ' aria-current="page"' : '');
  return `<a class="skip-link" href="#main" data-i18n="skip_link">Skip to main content</a>
<nav class="navbar">
    <a href="${p}index.html" class="logo">ShenTechin<span class="med-badge">MED</span></a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" data-i18n-attr="aria-label:nav_menu">
        ${icon('menu', 'icon-menu')}${icon('close', 'icon-close')}
    </button>
    <ul class="nav-links" id="primary-nav">
        <li><a href="${p}index.html#test-section"${cur('tests')} data-i18n="nav_tests">Tests</a></li>
        <li><a href="${p}insights.html"${cur('insights')} data-i18n="nav_insights">Insights</a></li>
        <li><a href="${p}about.html"${cur('about')} data-i18n="nav_about">About</a></li>
        <li class="lang-switcher" role="group" data-i18n-attr="aria-label:lang_label">
            <button type="button" class="lang-btn" data-lang-btn data-lang="en" aria-pressed="true">EN</button>
            <button type="button" class="lang-btn" data-lang-btn data-lang="tr" aria-pressed="false">TR</button>
        </li>
    </ul>
</nav>`;
}

function footer(p) {
  const tests = TEST_LINKS
    .map(([slug, key]) => `<li><a href="${p}tests/${slug}/" data-i18n="${key}">${slug}</a></li>`)
    .join('\n                ');
  return `<footer>
    <div class="footer-inner">
        <div class="footer-brand">
            <a href="${p}index.html" class="logo">ShenTechin<span class="med-badge">MED</span></a>
            <p data-i18n="footer_tagline">Free, anonymous self-assessments on everyday health habits.</p>
        </div>
        <div class="footer-col">
            <h4 data-i18n="footer_col_tests">Assessments</h4>
            <ul>
                ${tests}
            </ul>
        </div>
        <div class="footer-col">
            <h4 data-i18n="footer_col_learn">Learn</h4>
            <ul>
                <li><a href="${p}insights.html" data-i18n="nav_insights">Insights</a></li>
                <li><a href="${p}about.html" data-i18n="nav_about">About</a></li>
            </ul>
        </div>
        <div class="footer-col">
            <h4 data-i18n="footer_col_legal">Legal</h4>
            <ul>
                <li><a href="${p}disclaimer.html" data-i18n="footer_disclaimer">Medical Disclaimer</a></li>
                <li><a href="${p}privacy.html" data-i18n="footer_privacy">Privacy Policy</a></li>
                <li><a href="${p}terms.html" data-i18n="footer_terms">Terms of Use</a></li>
            </ul>
        </div>
    </div>
    <div class="footer-bottom">
        <span data-i18n="footer_copy">&copy; 2026 ShenTechin Med.</span>
        <span data-i18n="footer_note">These assessments are not medical diagnoses.</span>
    </div>
</footer>`;
}

/* opts: { path, depth, title, desc, titleKey, descKey, css, bundles, scripts,
           bodyClass, active, main, noindex, ogType } */
export function page(opts) {
  const p = '../'.repeat(opts.depth || 0);
  const canonical = SITE + '/' + (opts.path === 'index.html' ? '' : opts.path.replace(/index\.html$/, ''));
  const css = ['base.css', ...(opts.css || [])];
  const bundles = ['common.js', ...(opts.bundles || [])];

  return `<!DOCTYPE html>
<html lang="en"${opts.titleKey ? ` data-i18n-title="${opts.titleKey}"` : ''}${opts.descKey ? ` data-i18n-desc="${opts.descKey}"` : ''}>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${opts.title}</title>
<meta name="description" content="${opts.desc}">
<link rel="canonical" href="${canonical}">
${opts.noindex ? '<meta name="robots" content="noindex, follow">\n' : ''}<meta property="og:type" content="${opts.ogType || 'website'}">
<meta property="og:site_name" content="ShenTechin Med">
<meta property="og:title" content="${opts.title}">
<meta property="og:description" content="${opts.desc}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${OG_IMAGE}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${opts.title}">
<meta name="twitter:description" content="${opts.desc}">
<meta name="twitter:image" content="${OG_IMAGE}">
<meta name="theme-color" content="#2563eb">

<link rel="icon" href="${p}favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${p}apple-touch-icon.png">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap">
${css.map(f => `<link rel="stylesheet" href="${p}assets/css/${f}">`).join('\n')}

<script>
/* Dili ilk boyamadan önce ayarla; EN dışında bir dil seçiliyse
   çeviri uygulanana kadar gövdeyi gizleyerek metin sıçramasını önle. */
(function(){try{var l=localStorage.getItem('selectedLang');if(l!=='en'&&l!=='tr')l='en';
document.documentElement.lang=l;if(l!=='en')document.documentElement.classList.add('i18n-swap');}catch(e){}})();
</script>
<script src="${p}assets/js/analytics.js"></script>
<script src="${p}assets/js/i18n.js"></script>
${bundles.map(f => `<script src="${p}assets/js/i18n/${f}"></script>`).join('\n')}
</head>
<body${opts.bodyClass ? ` class="${opts.bodyClass}"` : ''}>
${sprite(ALL_ICONS)}
${nav(p, opts.active)}
${opts.main}
${footer(p)}
<script src="${p}assets/js/nav.js" defer></script>
${(opts.scripts || []).map(f => `<script src="${p}assets/js/${f}" defer></script>`).join('\n')}
</body>
</html>
`;
}

export { icon };

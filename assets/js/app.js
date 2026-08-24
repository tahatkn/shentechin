/* ShenTechin MED — her sayfada çalışan küçük arayüz katmanı.
   Her bölüm kendi DOM'u yoksa sessizce atlanır, böylece tek dosya
   bütün sayfa tiplerine hizmet eder. Sayfa JavaScript olmadan da
   tam olarak okunabilir; buradaki her şey ek konfor. */
(function (w, d) {
  'use strict';

  var root = d.documentElement;
  var reduced = w.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     0. OLAY KATMANI
     Varsayılan olarak HİÇBİR üçüncü taraf izleyici yüklemez; yalnızca
     olayları toplar ve sayfada bir sağlayıcı varsa ona iletir.
     Bir izleyici eklerseniz gizlilik politikasını da güncelleyin.
     --------------------------------------------------------- */
  var queue = [];
  var DEBUG = /[?&]stdebug=1/.test(w.location.search);

  w.stAnalytics = {
    track: function (name, props) {
      props = props || {};
      queue.push({ name: name, props: props });
      if (DEBUG && w.console) w.console.log('[analytics]', name, props);
      try {
        if (typeof w.plausible === 'function') w.plausible(name, { props: props });
        if (typeof w.gtag === 'function') w.gtag('event', name, props);
        if (w.posthog && typeof w.posthog.capture === 'function') w.posthog.capture(name, props);
      } catch (e) { /* izleme hiçbir zaman sayfayı bozmamalı */ }
    },
    events: function () { return queue.slice(); }
  };

  /* ---------------------------------------------------------
     1. TEMA
     --------------------------------------------------------- */
  var THEME_KEY = 'stq:theme';

  /* Adresteki ?theme= her şeyi geçer: koyu temayla bağlantı paylaşmayı ve
     görsel regresyon aracının iki temayı da çekmesini mümkün kılar. */
  function urlTheme() {
    var m = /[?&]theme=(dark|light)/.exec(w.location.search);
    return m ? m[1] : null;
  }

  function storedTheme() {
    try { return w.localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }

  function systemTheme() {
    return w.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    var meta = d.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0b1220' : '#f8fafc');
    d.querySelectorAll('[data-theme-btn]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(theme === 'dark'));
    });
  }

  function initTheme() {
    d.querySelectorAll('[data-theme-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        try { w.localStorage.setItem(THEME_KEY, next); } catch (e) {}
        applyTheme(next);
      });
    });
    /* Kullanıcı açık bir seçim yapmadıysa sistem tercihini izlemeyi sürdür. */
    var mq = w.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function () { if (!urlTheme() && !storedTheme()) applyTheme(systemTheme()); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    applyTheme(urlTheme() || storedTheme() || systemTheme());
  }

  /* ---------------------------------------------------------
     2. NAVİGASYON
     --------------------------------------------------------- */
  function initNav() {
    var bar = d.querySelector('.navbar');
    var toggle = d.querySelector('.nav-toggle');
    var links = d.getElementById('primary-nav');

    if (bar) {
      var onScroll = function () { bar.classList.toggle('is-scrolled', w.scrollY > 8); };
      onScroll();
      w.addEventListener('scroll', onScroll, { passive: true });
    }

    if (!toggle || !links) return;

    function close(focusToggle) {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      if (focusToggle) toggle.focus();
    }

    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      links.classList.toggle('is-open', !open);
      toggle.setAttribute('aria-expanded', String(!open));
    });

    links.addEventListener('click', function (e) { if (e.target.closest('a')) close(false); });

    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') close(true);
    });

    /* Menü açıkken dışarı tıklamak kapatır. */
    d.addEventListener('click', function (e) {
      if (toggle.getAttribute('aria-expanded') !== 'true') return;
      if (!bar.contains(e.target)) close(false);
    });

    /* Odak menünün dışına çıkarsa kapat (klavye kullanıcısı için). */
    d.addEventListener('focusin', function (e) {
      if (toggle.getAttribute('aria-expanded') !== 'true') return;
      if (!bar.contains(e.target)) close(false);
    });
  }

  /* ---------------------------------------------------------
     3. GÖRÜNÜR ALANA GİRİNCE BELİRME
     --------------------------------------------------------- */
  function initReveal() {
    var items = d.querySelectorAll('.reveal');
    if (!items.length) return;
    root.classList.add('js-on');

    if (reduced || !('IntersectionObserver' in w)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }

    var io = new w.IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        /* Aynı grupta arka arkaya gelen kartlar 60 ms arayla belirir. */
        var siblings = el.parentElement ? Array.prototype.slice.call(el.parentElement.children) : [el];
        var idx = siblings.indexOf(el);
        el.style.setProperty('--reveal-delay', Math.min(idx, 6) * 60 + 'ms');
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------
     4. DİL ÖNERİSİ
     --------------------------------------------------------- */
  var LANG_KEY = 'stq:lang';
  var LANG_SEEN = 'stq:lang-asked';

  function initLangOffer() {
    var alt = d.querySelector('link[rel="alternate"][hreflang]:not([hreflang="x-default"])');
    var switcher = d.querySelector('[data-lang-switch]');
    if (!switcher) return;

    /* Kullanıcının açık seçimini hatırla. */
    switcher.addEventListener('click', function () {
      try { w.localStorage.setItem(LANG_KEY, switcher.getAttribute('data-lang-switch')); } catch (e) {}
    });

    var banner = d.querySelector('.lang-offer');
    if (!banner) return;

    var chosen = null, asked = null;
    try {
      chosen = w.localStorage.getItem(LANG_KEY);
      asked = w.localStorage.getItem(LANG_SEEN);
    } catch (e) {}

    var pageLang = root.lang || 'en';
    var prefers = (w.navigator.languages || [w.navigator.language || 'en'])[0].slice(0, 2).toLowerCase();

    if (chosen || asked || prefers === pageLang || (prefers !== 'tr' && prefers !== 'en')) return;

    banner.hidden = false;
    banner.querySelector('[data-lang-dismiss]').addEventListener('click', function () {
      try { w.localStorage.setItem(LANG_SEEN, '1'); } catch (e) {}
      banner.hidden = true;
    });
  }

  /* ---------------------------------------------------------
     5. MAKALE: OKUMA İLERLEMESİ + İÇİNDEKİLER
     --------------------------------------------------------- */
  function initArticle() {
    var article = d.querySelector('.prose');
    var barEl = d.querySelector('.read-progress');

    if (article && barEl) {
      var tick = function () {
        var top = article.offsetTop;
        var height = article.offsetHeight - w.innerHeight * 0.55;
        var p = height > 0 ? (w.scrollY - top) / height : 0;
        barEl.style.transform = 'scaleX(' + Math.min(1, Math.max(0, p)) + ')';
      };
      tick();
      w.addEventListener('scroll', tick, { passive: true });
      w.addEventListener('resize', tick);
    }

    var tocLinks = d.querySelectorAll('.toc a');
    if (!tocLinks.length || !('IntersectionObserver' in w)) return;

    var map = {};
    tocLinks.forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      var h = d.getElementById(id);
      if (h) map[id] = a;
    });

    var spy = new w.IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        tocLinks.forEach(function (a) { a.classList.remove('is-active'); });
        var a = map[entry.target.id];
        if (a) a.classList.add('is-active');
      });
    }, { rootMargin: '-15% 0px -70% 0px' });

    Object.keys(map).forEach(function (id) { spy.observe(d.getElementById(id)); });
  }

  /* ---------------------------------------------------------
     6. ANA SAYFA: "NEREDEN BAŞLAYAYIM?"
     --------------------------------------------------------- */
  function initFinder() {
    var finder = d.querySelector('.finder');
    if (!finder) return;

    var chips = finder.querySelectorAll('.finder-chip');
    var answer = finder.querySelector('.finder__answer');
    var slot = finder.querySelector('[data-finder-slot]');

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var id = chip.getAttribute('data-test');
        var card = d.querySelector('.tcard[data-tone="' + id + '"]');
        if (!card) return;

        chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });

        var link = card.querySelector('[data-start-link]');
        slot.textContent = card.querySelector('[data-card-name]').textContent;
        slot.setAttribute('href', link ? link.getAttribute('href') : '#');
        answer.classList.add('is-on');

        d.querySelectorAll('.tcard').forEach(function (c) { c.classList.remove('is-suggested'); });
        card.classList.add('is-suggested');
        card.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
      });
    });
  }

  /* ---------------------------------------------------------
     7. SERVICE WORKER
     --------------------------------------------------------- */
  function initSW() {
    if (!('serviceWorker' in w.navigator)) return;
    if (w.location.protocol !== 'https:' && w.location.hostname !== 'localhost') return;
    w.addEventListener('load', function () {
      w.navigator.serviceWorker.register('/sw.js').catch(function () { /* çevrimdışı desteği isteğe bağlı */ });
    });
  }

  /* ---------------------------------------------------------
     Başlat
     --------------------------------------------------------- */
  function boot() {
    initTheme();
    initNav();
    initReveal();
    initLangOffer();
    initArticle();
    initFinder();
    initSW();
  }

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', boot);
  else boot();
})(window, document);

/* ShenTechin Med — dil motoru.
   Sayfa metinleri data-i18n anahtarlarıyla işaretlenir; sözlükler
   assets/js/i18n/*.js paketlerinden gelir. Bu dosya paketlerden ÖNCE yüklenmelidir. */
(function (w, d) {
    'use strict';

    var SUPPORTED = ['en', 'tr'];
    var STORAGE_KEY = 'selectedLang';
    var bundles = [];
    var dict = null;

    function normalize(lang) {
        return SUPPORTED.indexOf(lang) === -1 ? 'en' : lang;
    }

    function read() {
        try { return normalize(w.localStorage.getItem(STORAGE_KEY)); }
        catch (e) { return 'en'; }
    }

    function merge() {
        dict = { en: {}, tr: {} };
        for (var i = 0; i < bundles.length; i++) {
            SUPPORTED.forEach(function (lang) {
                var part = bundles[i][lang] || {};
                for (var k in part) {
                    if (Object.prototype.hasOwnProperty.call(part, k)) dict[lang][k] = part[k];
                }
            });
        }
    }

    var I18N = {
        register: function (bundle) { bundles.push(bundle); dict = null; },

        current: read,

        /* Anahtarı çevirir. Karşılığı yoksa İngilizceye, o da yoksa anahtara düşer. */
        t: function (key, lang) {
            if (!dict) merge();
            lang = normalize(lang || read());
            var v = dict[lang][key];
            if (v === undefined) v = dict.en[key];
            return v === undefined ? key : v;
        },

        apply: function (lang) {
            if (!dict) merge();
            lang = normalize(lang || read());
            var table = dict[lang];

            d.documentElement.lang = lang;

            d.querySelectorAll('[data-i18n]').forEach(function (el) {
                var v = table[el.getAttribute('data-i18n')];
                if (v !== undefined) el.innerHTML = v;
            });

            /* data-i18n-attr="aria-label:key;title:key" */
            d.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
                el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
                    var bits = pair.split(':');
                    if (bits.length !== 2) return;
                    var v = table[bits[1].trim()];
                    if (v !== undefined) el.setAttribute(bits[0].trim(), v);
                });
            });

            /* Uzun metinli sayfalar (makale, yasal, test tanıtımı) her iki dili de
               HTML içinde tutar; burada sadece doğru olan gösterilir. Böylece
               metin hem tarayıcıda hem arama motorunda iki dilde de mevcut olur. */
            d.querySelectorAll('[data-lang-block]').forEach(function (el) {
                el.hidden = el.getAttribute('data-lang-block') !== lang;
            });

            /* Uzun metinli sayfalarda ayrı bir başlık anahtarı yok; görünen
               bloğun H1'inden türet ki sekme başlığı da dile uysun. */
            var visibleH1 = d.querySelector('[data-lang-block]:not([hidden]) h1');
            if (visibleH1 && !d.documentElement.hasAttribute('data-i18n-title')) {
                d.title = visibleH1.textContent.trim() + ' — ShenTechin Med';
            }

            var titleKey = d.documentElement.getAttribute('data-i18n-title');
            if (titleKey && table[titleKey]) d.title = table[titleKey];

            var descKey = d.documentElement.getAttribute('data-i18n-desc');
            var descEl = d.querySelector('meta[name="description"]');
            if (descKey && descEl && table[descKey]) descEl.setAttribute('content', table[descKey]);

            d.querySelectorAll('.lang-btn').forEach(function (btn) {
                btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
            });

            d.documentElement.classList.remove('i18n-swap');
            w.dispatchEvent(new CustomEvent('i18n:applied', { detail: { lang: lang } }));
        },

        set: function (lang) {
            lang = normalize(lang);
            try { w.localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
            I18N.apply(lang);
            if (w.stAnalytics) w.stAnalytics.track('language_changed', { lang: lang });
        }
    };

    w.I18N = I18N;

    /* Geriye dönük uyumluluk: eski sayfalarda setLanguage('tr') çağrısı olabilir. */
    w.setLanguage = function (lang) { I18N.set(lang); };

    function boot() {
        I18N.apply(read());
        d.querySelectorAll('.lang-btn').forEach(function (btn) {
            btn.addEventListener('click', function () { I18N.set(btn.dataset.lang); });
        });
    }

    if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', boot);
    else boot();

    /* Emniyet supabı: bir hata olursa sayfa görünmez kalmasın. */
    w.setTimeout(function () { d.documentElement.classList.remove('i18n-swap'); }, 1500);
})(window, document);

/* ShenTechin Med — sonuç sayfası.
   Not: Eski sürümdeki "Toplumdaki Yeri: Top %X" ifadesi kaldırıldı.
   Elimizde gerçek bir popülasyon dağılımı olmadığı için o sayı uydurmaydı;
   yerine skorun hangi aralığa düştüğünü söyleyen dürüst bir bant etiketi kondu. */
(function (w, d) {
    'use strict';

    var CONTACT = 'info@shentechin.com';   // <-- kendi adresinizle değiştirin
    var SITE = 'https://shentechin.com';

    function bandOf(pct) {
        if (pct >= 80) return 'good';
        if (pct >= 50) return 'mid';
        return 'low';
    }

    var BAND_COLOR = { good: '#15803d', mid: '#b45309', low: '#b91c1c' };

    function readResult() {
        try {
            var raw = w.localStorage.getItem('stq:result');
            if (!raw) return null;
            var r = JSON.parse(raw);
            if (!r || typeof r.percent !== 'number' || !r.type) return null;
            if (r.percent < 0 || r.percent > 100) return null;
            return r;
        } catch (e) { return null; }
    }

    function showEmpty() {
        var wrap = d.querySelector('.result-container');
        if (!wrap) return;
        wrap.className = 'result-empty';
        wrap.innerHTML =
            '<h1 data-i18n="res_empty_title">No result to show yet</h1>' +
            '<p data-i18n="res_empty_desc">Complete one of the assessments and your result will appear here.</p>' +
            '<a class="cta-button" href="index.html" data-i18n="res_empty_btn">Choose a test</a>';
        if (w.I18N) w.I18N.apply();
    }

    function texts(type) {
        var lang = w.I18N.current();
        var table = w.I18N_RESULTS || {};
        var byLang = table[lang] || table.en || {};
        return byLang[type] || (table.en || {})[type] || null;
    }

    function render(result) {
        var t = texts(result.type);
        if (!t) { showEmpty(); return; }

        var pct = result.percent;
        var band = bandOf(pct);
        var color = BAND_COLOR[band];

        var circle = d.getElementById('score-circle');
        var scoreText = d.getElementById('score-text');
        circle.style.background = 'conic-gradient(' + color + ' ' + (3.6 * pct) + 'deg, #f1f5f9 0deg)';
        circle.setAttribute('role', 'img');
        circle.setAttribute('aria-label', w.I18N.t('res_score_aria') + ' ' + pct + ' / 100');
        scoreText.textContent = pct + '%';
        scoreText.style.color = color;

        var label = d.getElementById('result-test-label');
        if (label) label.textContent = t.name;

        var titleEl = d.getElementById('result-title');
        titleEl.textContent = t.bands[band].label;
        titleEl.style.color = color;

        d.getElementById('result-desc').innerHTML =
            '<span class="band-box" style="border-left:4px solid ' + color + '">' +
                w.I18N.t('res_band_' + band) +
            '</span>' +
            '<span class="risk-text">' + t.bands[band].text + '</span>';

        var premium = d.getElementById('premium-btn');
        if (premium) {
            premium.setAttribute('href', 'mailto:' + CONTACT +
                '?subject=' + encodeURIComponent('ShenTechin Med — ' + t.name));
        }

        w.stAnalytics.track('result_viewed', {
            test: result.type, mode: result.mode, percent: pct, band: band
        });
    }

    function shareText() {
        var r = readResult();
        if (!r) return '';
        var t = texts(r.type);
        return w.I18N.t('res_share_text')
            .replace('{score}', r.percent + '%')
            .replace('{test}', t ? t.name : '');
    }

    function share(platform) {
        var text = shareText();
        w.stAnalytics.track('result_shared', { platform: platform });

        if (platform === 'native' && w.navigator.share) {
            w.navigator.share({ title: 'ShenTechin Med', text: text, url: SITE })
                .catch(function () { /* kullanıcı vazgeçti */ });
            return;
        }
        var url;
        if (platform === 'x') {
            url = 'https://x.com/intent/post?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(SITE);
        } else {
            url = 'https://wa.me/?text=' + encodeURIComponent(text + ' ' + SITE);
        }
        w.open(url, '_blank', 'noopener');
    }

    function boot() {
        var result = readResult();
        if (!result) { showEmpty(); return; }

        render(result);
        w.addEventListener('i18n:applied', function () { render(result); });

        d.querySelectorAll('[data-share]').forEach(function (btn) {
            btn.addEventListener('click', function () { share(btn.dataset.share); });
        });

        /* Web Share API yoksa "Paylaş" düğmesini gizle, klasik butonlar kalsın. */
        var nativeBtn = d.querySelector('[data-share="native"]');
        if (nativeBtn && !w.navigator.share) nativeBtn.hidden = true;
    }

    if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', boot);
    else boot();
})(window, document);

/* ShenTechin Med — olay katmanı.
   Varsayılan olarak HİÇBİR üçüncü taraf izleyici yüklemez; sadece olayları
   toplar ve sayfada bir sağlayıcı varsa ona iletir.

   Etkinleştirmek için: sayfaya Plausible / GA4 / PostHog snippet'ini ekleyin.
   Buradaki kod window.plausible, window.gtag veya window.posthog'u otomatik yakalar.
   Üçüncü taraf izleyici eklerseniz gizlilik politikasını da güncellemeniz gerekir. */
(function (w) {
    'use strict';

    var queue = [];
    var DEBUG = /[?&]stdebug=1/.test(w.location.search);

    function send(name, props) {
        try {
            if (typeof w.plausible === 'function') w.plausible(name, { props: props });
            if (typeof w.gtag === 'function') w.gtag('event', name, props);
            if (w.posthog && typeof w.posthog.capture === 'function') w.posthog.capture(name, props);
        } catch (e) { /* izleme hiçbir zaman sayfayı bozmamalı */ }
    }

    w.stAnalytics = {
        track: function (name, props) {
            props = props || {};
            queue.push({ name: name, props: props });
            if (DEBUG) w.console && console.log('[analytics]', name, props);
            send(name, props);
        },
        events: function () { return queue.slice(); }
    };
})(window);

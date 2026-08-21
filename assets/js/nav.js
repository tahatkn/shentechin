/* ShenTechin Med — mobil menü. */
(function (d) {
    'use strict';

    function boot() {
        var toggle = d.querySelector('.nav-toggle');
        var links = d.getElementById('primary-nav');
        if (!toggle || !links) return;

        function close() {
            links.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        }

        toggle.addEventListener('click', function () {
            var open = toggle.getAttribute('aria-expanded') === 'true';
            links.classList.toggle('is-open', !open);
            toggle.setAttribute('aria-expanded', String(!open));
        });

        links.addEventListener('click', function (e) {
            if (e.target.closest('a')) close();
        });

        d.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') close();
        });
    }

    if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', boot);
    else boot();
})(document);

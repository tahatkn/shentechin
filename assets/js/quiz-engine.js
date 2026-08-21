/* ShenTechin Med — test motoru.
   Eski logic.js'in yerini alır. Başlıca farklar:
   - Cevaplar bir dizide tutulur; "Önceki" ile geri gidip cevabı değiştirmek
     artık puanı iki kez saymaz.
   - Ters kodlama: yüksek cevabın olumsuz olduğu sorular 11 - cevap olarak puanlanır.
   - Puan 0-100 aralığına normalize edilir (tüm cevaplar 1 iken %10 değil %0 olur).
   - İlerleme localStorage'a yazılır; sayfa yenilenirse kaldığı yerden devam eder.
   - Dil değişiminde sayfa yeniden yüklenmez, sorular yerinde güncellenir. */
(function (w, d) {
    'use strict';

    var TYPES = ['sleep', 'skin', 'diet', 'stress', 'heart', 'focus', 'fitness', 'immunity', 'tech'];
    var SCALE_MAX = 10;

    var state = {
        type: 'sleep',
        mode: 'quick',
        indices: [],   // soru bankasındaki gerçek indeksler
        answers: [],   // indices ile aynı sırada; null = cevaplanmadı
        pos: 0,
        data: null
    };

    var el = {};

    function progressKey() { return 'stq:progress:' + state.type + ':' + state.mode; }

    /* ---------- veri yükleme ---------- */

    function loadData(type, done, fail) {
        var s = d.createElement('script');
        s.src = 'assets/js/data/' + type + '.js';
        s.onload = function () { done(w.QUIZ_DATA); };
        s.onerror = fail;
        d.head.appendChild(s);
    }

    function showFatal() {
        var c = d.querySelector('.quiz-container');
        if (!c) return;
        c.innerHTML =
            '<div class="result-empty">' +
            '<h1 data-i18n="quiz_error_title">This test could not be loaded</h1>' +
            '<p data-i18n="quiz_error_desc">The link may be broken. You can pick a test from the home page.</p>' +
            '<a class="cta-button" href="index.html" data-i18n="quiz_error_btn">Back to tests</a>' +
            '</div>';
        if (w.I18N) w.I18N.apply();
    }

    /* ---------- puanlama ---------- */

    function isReverse(qIndex) { return state.data.reverse.indexOf(qIndex) !== -1; }

    function scoreOf(qIndex, value) {
        return isReverse(qIndex) ? (SCALE_MAX + 1 - value) : value;
    }

    /* 0-100 arası normalize skor. Her cevap en az 1 puan getirdiği için
       ham toplamdan mümkün olan en düşük toplam çıkarılır. */
    function normalizedPercent() {
        var n = state.indices.length;
        var raw = 0;
        for (var i = 0; i < n; i++) raw += scoreOf(state.indices[i], state.answers[i]);
        var min = n * 1, max = n * SCALE_MAX;
        return Math.round(((raw - min) / (max - min)) * 100);
    }

    /* ---------- ilerleme kaydı ---------- */

    function save() {
        try {
            w.localStorage.setItem(progressKey(), JSON.stringify({
                answers: state.answers, pos: state.pos, v: 1
            }));
        } catch (e) {}
    }

    function clearSaved() {
        try { w.localStorage.removeItem(progressKey()); } catch (e) {}
    }

    function readSaved() {
        try {
            var raw = w.localStorage.getItem(progressKey());
            if (!raw) return null;
            var p = JSON.parse(raw);
            if (!p || !Array.isArray(p.answers) || p.answers.length !== state.indices.length) return null;
            if (!p.answers.some(function (a) { return a !== null; })) return null;
            return p;
        } catch (e) { return null; }
    }

    /* ---------- render ---------- */

    function questionText(i) {
        var lang = w.I18N ? w.I18N.current() : 'en';
        var list = state.data.q[lang] || state.data.q.en;
        return list[state.indices[i]];
    }

    function render() {
        el.question.textContent = questionText(state.pos);
        el.options.innerHTML = '';

        var chosen = state.answers[state.pos];

        for (var v = 1; v <= SCALE_MAX; v++) {
            var b = d.createElement('button');
            b.type = 'button';
            b.className = 'scale-btn';
            b.textContent = String(v);
            b.setAttribute('role', 'radio');
            b.setAttribute('aria-checked', String(chosen === v));
            b.setAttribute('aria-label', String(v) + ' / ' + SCALE_MAX);
            b.tabIndex = (chosen === v || (chosen === null && v === 1)) ? 0 : -1;
            b.dataset.value = String(v);
            el.options.appendChild(b);
        }

        updateProgress();
        updateButtons();
    }

    function updateProgress() {
        var n = state.indices.length;
        el.count.textContent = w.I18N.t('quiz_question') + ' ' + (state.pos + 1) + ' / ' + n;
        el.bar.style.width = (((state.pos + 1) / n) * 100) + '%';
        el.bar.parentElement.setAttribute('aria-valuenow', String(state.pos + 1));
        el.bar.parentElement.setAttribute('aria-valuemax', String(n));
    }

    function updateButtons() {
        var answered = state.answers[state.pos] !== null;
        el.next.disabled = !answered;
        el.prev.disabled = state.pos === 0;
        var last = state.pos === state.indices.length - 1;
        el.next.querySelector('.next-label').textContent =
            w.I18N.t(last ? 'quiz_finish' : 'quiz_next');
    }

    function select(value) {
        state.answers[state.pos] = value;
        el.options.querySelectorAll('.scale-btn').forEach(function (b) {
            var on = Number(b.dataset.value) === value;
            b.setAttribute('aria-checked', String(on));
            b.tabIndex = on ? 0 : -1;
        });
        save();
        updateButtons();
    }

    function go(delta) {
        var next = state.pos + delta;
        if (next < 0 || next >= state.indices.length) return;
        state.pos = next;
        save();
        render();
        el.question.focus();
    }

    function finish() {
        var pct = normalizedPercent();
        try {
            w.localStorage.setItem('stq:result', JSON.stringify({
                type: state.type, mode: state.mode, percent: pct,
                count: state.indices.length, at: Date.now(), v: 1
            }));
        } catch (e) {}
        clearSaved();
        w.stAnalytics.track('quiz_completed', {
            test: state.type, mode: state.mode, percent: pct, questions: state.indices.length
        });
        w.location.href = 'result.html';
    }

    /* ---------- olaylar ---------- */

    function wireEvents() {
        el.options.addEventListener('click', function (e) {
            var btn = e.target.closest('.scale-btn');
            if (btn) select(Number(btn.dataset.value));
        });

        el.options.addEventListener('keydown', function (e) {
            var btns = Array.prototype.slice.call(el.options.querySelectorAll('.scale-btn'));
            var idx = btns.indexOf(d.activeElement);
            if (idx === -1) return;
            var to = null;
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') to = (idx + 1) % btns.length;
            else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') to = (idx - 1 + btns.length) % btns.length;
            if (to !== null) {
                e.preventDefault();
                btns[to].focus();
                select(Number(btns[to].dataset.value));
            }
        });

        /* 1-9 ve 0 (=10) tuşlarıyla hızlı cevaplama.
           Devam-et çubuğu açıkken test henüz başlamadığı için tuşlar yok sayılır. */
        d.addEventListener('keydown', function (e) {
            if (e.metaKey || e.ctrlKey || e.altKey) return;
            if (el.main.hidden) return;
            if (/^[0-9]$/.test(e.key)) {
                select(e.key === '0' ? 10 : Number(e.key));
            } else if (e.key === 'Enter' && !el.next.disabled && d.activeElement !== el.prev) {
                advance();
            }
        });

        el.next.addEventListener('click', advance);
        el.prev.addEventListener('click', function () { go(-1); });

        w.addEventListener('i18n:applied', function () {
            if (state.data) render();
        });
    }

    function advance() {
        if (state.answers[state.pos] === null) return;
        w.stAnalytics.track('quiz_question_answered', {
            test: state.type, mode: state.mode, index: state.pos + 1
        });
        if (state.pos === state.indices.length - 1) finish();
        else go(1);
    }

    /* ---------- başlangıç ---------- */

    function start(resume) {
        if (resume) {
            state.answers = resume.answers;
            state.pos = Math.min(Math.max(resume.pos | 0, 0), state.indices.length - 1);
        }
        el.resume.classList.remove('is-visible');
        el.main.hidden = false;
        render();
        w.stAnalytics.track('quiz_started', {
            test: state.type, mode: state.mode,
            questions: state.indices.length, resumed: !!resume
        });
    }

    function boot() {
        var params = new w.URLSearchParams(w.location.search);
        var t = params.get('type');
        state.type = TYPES.indexOf(t) === -1 ? 'sleep' : t;
        state.mode = params.get('mode') === 'full' ? 'full' : 'quick';

        el.question = d.getElementById('question-text');
        el.options = d.querySelector('.options-grid');
        el.count = d.getElementById('question-count');
        el.bar = d.querySelector('.progress-bar-fill');
        el.next = d.querySelector('.next-btn');
        el.prev = d.querySelector('.prev-btn');
        el.resume = d.querySelector('.resume-bar');
        el.main = d.querySelector('.quiz-main');
        el.modeLabel = d.querySelector('.quiz-mode-label');

        if (!el.question || !el.options) return;

        loadData(state.type, function (data) {
            if (!data || data.id !== state.type) { showFatal(); return; }
            state.data = data;
            state.indices = state.mode === 'quick'
                ? data.quick.slice()
                : data.q.en.map(function (_, i) { return i; });
            state.answers = state.indices.map(function () { return null; });

            if (el.modeLabel) {
                el.modeLabel.setAttribute('data-i18n', state.mode === 'quick' ? 'quiz_mode_quick' : 'quiz_mode_full');
                el.modeLabel.innerHTML = w.I18N.t(state.mode === 'quick' ? 'quiz_mode_quick' : 'quiz_mode_full');
            }

            wireEvents();

            var saved = readSaved();
            if (saved) {
                el.resume.classList.add('is-visible');
                el.main.hidden = true;
                el.resume.querySelector('.resume-yes').addEventListener('click', function () { start(saved); });
                el.resume.querySelector('.resume-no').addEventListener('click', function () { clearSaved(); start(null); });
            } else {
                start(null);
            }
        }, showFatal);
    }

    if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', boot);
    else boot();
})(window, document);

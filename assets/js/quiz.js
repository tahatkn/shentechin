/* ShenTechin Med — test motoru.

   Puanlama kuralı (değişmedi): `reverse` listesindeki sorular 11 - cevap
   olarak çevrilir, toplam 0-100 aralığına normalize edilir.

   Bu sürümde eklenenler:
   - Her sorunun kendi ölçek uçları (data.anchors) — "1 = hiç / 10 = çok"
     her soruya uymuyordu.
   - Yön duyarlı geçiş animasyonu ve isteğe bağlı otomatik ilerleme.
   - İlerleme çubuğu artık cevaplanan soruyu gösteriyor; ilk soruda %10 dolu
     görünmüyor.
   - Cevaplar sonuç sayfasına da taşınıyor (kırılım ekranı için).
   - Ekran okuyucu için canlı bölge duyurusu.
*/
(function (w, d) {
  'use strict';

  var T = w.T || {};
  var TYPES = ['sleep', 'skin', 'diet', 'stress', 'heart', 'focus', 'fitness', 'immunity', 'tech'];
  var MAX = 10;
  var SEC_PER_Q = 5;

  var state = {
    type: 'sleep', mode: 'quick',
    indices: [], answers: [], pos: 0, data: null,
    dir: 1, auto: true
  };

  var el = {};

  function fmt(key, vars) {
    var s = T[key] || key;
    Object.keys(vars || {}).forEach(function (k) {
      s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]);
    });
    return s;
  }

  var progressKey = function () { return 'stq:progress:' + state.type + ':' + state.mode; };

  /* ---------- veri ---------- */

  function loadData(type, done, fail) {
    var s = d.createElement('script');
    s.src = '/assets/js/data/' + type + '.js';
    s.onload = function () { done(w.QUIZ_DATA); };
    s.onerror = fail;
    d.head.appendChild(s);
  }

  function showFatal() {
    var c = d.querySelector('.quiz-shell');
    if (!c) return;
    c.textContent = '';
    var box = d.createElement('div');
    box.className = 'result-empty';
    var h = d.createElement('h1');
    h.textContent = T.quiz_error_title || 'This test could not be loaded';
    var p = d.createElement('p');
    p.textContent = T.quiz_error_desc || '';
    var a = d.createElement('a');
    a.className = 'btn btn--primary';
    a.href = w.HOME_URL || '/';
    a.textContent = T.quiz_error_btn || 'Back';
    box.append(h, p, a);
    c.appendChild(box);
  }

  /* ---------- puanlama ---------- */

  function isReverse(qi) { return state.data.reverse.indexOf(qi) !== -1; }
  function scoreOf(qi, v) { return isReverse(qi) ? (MAX + 1 - v) : v; }

  function percent() {
    var n = state.indices.length, raw = 0;
    for (var i = 0; i < n; i++) raw += scoreOf(state.indices[i], state.answers[i]);
    return Math.round(((raw - n) / (n * MAX - n)) * 100);
  }

  /* ---------- kayıt ---------- */

  function save() {
    try {
      w.localStorage.setItem(progressKey(), JSON.stringify({
        answers: state.answers, pos: state.pos, v: 2
      }));
    } catch (e) {}
    flashSaved();
  }

  var savedTimer = null;
  function flashSaved() {
    if (!el.saved) return;
    el.saved.classList.add('is-on');
    clearTimeout(savedTimer);
    savedTimer = setTimeout(function () { el.saved.classList.remove('is-on'); }, 1400);
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

  /* ---------- metinler ---------- */

  function lang() { return d.documentElement.lang === 'tr' ? 'tr' : 'en'; }

  function questionText(i) {
    var list = state.data.q[lang()] || state.data.q.en;
    return list[state.indices[i]];
  }

  /* Sorunun ölçek uçları: önce soruya özel metin, yoksa adlandırılmış çift. */
  function anchorsFor(i) {
    var qi = state.indices[i];
    var custom = state.data.anchorText && state.data.anchorText[qi];
    if (custom) {
      var c = custom[lang()] || custom.en;
      return { low: c.low, high: c.high };
    }
    var key = (state.data.anchors && state.data.anchors[qi]) || 'freq';
    return { low: T['scale_' + key + '_low'] || '1', high: T['scale_' + key + '_high'] || '10' };
  }

  /* ---------- çizim ---------- */

  function render() {
    var chosen = state.answers[state.pos];
    var a = anchorsFor(state.pos);
    var n = state.indices.length;

    el.inner.classList.remove('is-back');
    /* animasyonu yeniden tetikle */
    void el.inner.offsetWidth;
    if (state.dir < 0) el.inner.classList.add('is-back');

    el.index.textContent = fmt('quiz_question', {}) + ' ' + (state.pos + 1) + ' / ' + n;
    el.question.textContent = questionText(state.pos);
    el.low.textContent = a.low;
    el.high.textContent = a.high;

    el.scale.innerHTML = '';
    for (var v = 1; v <= MAX; v++) {
      var b = d.createElement('button');
      b.type = 'button';
      b.className = 'scale-btn';
      b.textContent = String(v);
      b.style.setProperty('--i', String(v));
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', String(chosen === v));
      b.setAttribute('aria-label', v + ' / ' + MAX + (v === 1 ? ' — ' + a.low : v === MAX ? ' — ' + a.high : ''));
      b.tabIndex = (chosen === v || (chosen === null && v === 1)) ? 0 : -1;
      b.dataset.value = String(v);
      el.scale.appendChild(b);
    }

    updateProgress();
    updateButtons();
    announce();
  }

  function announce() {
    if (!el.live) return;
    el.live.textContent = fmt('quiz_announce', {
      n: state.pos + 1, total: state.indices.length, text: questionText(state.pos)
    });
  }

  function answeredCount() {
    return state.answers.filter(function (a) { return a !== null; }).length;
  }

  function updateProgress() {
    var n = state.indices.length;
    var done = answeredCount();

    el.count.textContent = fmt('quiz_answered', { done: done, total: n });
    el.fill.style.width = (done / n) * 100 + '%';
    el.seen.style.width = ((state.pos + 1) / n) * 100 + '%';

    el.track.setAttribute('aria-valuenow', String(done));
    el.track.setAttribute('aria-valuemax', String(n));

    var left = n - done;
    if (el.time) {
      el.time.textContent = left === 0 ? ''
        : left * SEC_PER_Q < 45 ? (T.quiz_left_short || '')
        : fmt('quiz_left_min', { n: Math.max(1, Math.round(left * SEC_PER_Q / 60)) });
    }
  }

  function updateButtons() {
    var answered = state.answers[state.pos] !== null;
    var last = state.pos === state.indices.length - 1;
    el.next.disabled = !answered;
    el.prev.disabled = state.pos === 0;
    el.nextLabel.textContent = last ? (T.quiz_finish || 'See result') : (T.quiz_next || 'Next');
  }

  /* ---------- etkileşim ---------- */

  var advanceTimer = null;

  function select(value, viaKeyboard) {
    var wasEmpty = state.answers[state.pos] === null;
    state.answers[state.pos] = value;

    el.scale.querySelectorAll('.scale-btn').forEach(function (b) {
      var on = Number(b.dataset.value) === value;
      b.setAttribute('aria-checked', String(on));
      b.tabIndex = on ? 0 : -1;
    });

    save();
    updateProgress();
    updateButtons();

    /* Otomatik ilerleme yalnızca ilk kez cevaplanan sorularda çalışır;
       geri dönüp cevabını düzelten kullanıcıyı ileri fırlatmaz. */
    clearTimeout(advanceTimer);
    if (state.auto && wasEmpty && !viaKeyboard) {
      advanceTimer = setTimeout(function () { advance(); }, 340);
    } else if (state.auto && wasEmpty && viaKeyboard) {
      advanceTimer = setTimeout(function () { advance(); }, 220);
    }
  }

  function go(delta) {
    var next = state.pos + delta;
    if (next < 0 || next >= state.indices.length) return;
    state.dir = delta;
    state.pos = next;
    save();
    render();
    if (delta < 0 || !state.auto) el.question.focus();
  }

  function advance() {
    if (state.answers[state.pos] === null) return;
    if (state.pos === state.indices.length - 1) finish();
    else go(1);
  }

  function finish() {
    var pct = percent();
    var answers = state.indices.map(function (qi, i) { return [qi, state.answers[i]]; });
    try {
      w.localStorage.setItem('stq:result', JSON.stringify({
        v: 2, type: state.type, mode: state.mode, percent: pct,
        count: state.indices.length, at: Date.now(), answers: answers
      }));
      /* geçmiş — en fazla 12 kayıt */
      var hk = 'stq:history:' + state.type;
      var hist = [];
      try { hist = JSON.parse(w.localStorage.getItem(hk)) || []; } catch (e) {}
      hist.push({ at: Date.now(), percent: pct, mode: state.mode });
      w.localStorage.setItem(hk, JSON.stringify(hist.slice(-12)));
    } catch (e) {}

    clearSaved();
    w.location.href = (w.RESULT_URL || '/result.html');
  }

  function wire() {
    el.scale.addEventListener('click', function (e) {
      var btn = e.target.closest('.scale-btn');
      if (btn) select(Number(btn.dataset.value), false);
    });

    el.scale.addEventListener('keydown', function (e) {
      var btns = Array.prototype.slice.call(el.scale.querySelectorAll('.scale-btn'));
      var idx = btns.indexOf(d.activeElement);
      if (idx === -1) return;
      var to = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') to = Math.min(idx + 1, btns.length - 1);
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') to = Math.max(idx - 1, 0);
      else if (e.key === 'Home') to = 0;
      else if (e.key === 'End') to = btns.length - 1;
      if (to === null) return;
      e.preventDefault();
      btns[to].focus();
      select(Number(btns[to].dataset.value), true);
    });

    /* 1-9 ve 0 (=10) ile hızlı cevaplama; ok tuşlarıyla sorular arası gezinme */
    d.addEventListener('keydown', function (e) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (el.main.hidden) return;
      var tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        select(e.key === '0' ? 10 : Number(e.key), true);
      } else if (e.key === 'Enter' && !el.next.disabled) {
        e.preventDefault();
        clearTimeout(advanceTimer);
        advance();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        go(-1);
      }
    });

    el.next.addEventListener('click', function () { clearTimeout(advanceTimer); advance(); });
    el.prev.addEventListener('click', function () { clearTimeout(advanceTimer); go(-1); });

    if (el.autoBox) {
      el.autoBox.addEventListener('change', function () {
        state.auto = el.autoBox.checked;
        try { w.localStorage.setItem('stq:auto', state.auto ? '1' : '0'); } catch (e) {}
      });
    }
  }

  /* ---------- başlangıç ---------- */

  function start(resume) {
    if (resume) {
      state.answers = resume.answers;
      state.pos = Math.min(Math.max(resume.pos | 0, 0), state.indices.length - 1);
    }
    el.resume.classList.remove('is-on');
    el.main.hidden = false;
    render();
  }

  function boot() {
    var params = new w.URLSearchParams(w.location.search);
    var t = params.get('type');
    state.type = TYPES.indexOf(t) === -1 ? 'sleep' : t;
    state.mode = params.get('mode') === 'full' ? 'full' : 'quick';

    try { state.auto = w.localStorage.getItem('stq:auto') !== '0'; } catch (e) {}

    el.main = d.querySelector('.quiz-main');
    el.inner = d.querySelector('.qcard__inner');
    el.index = d.querySelector('.qcard__index');
    el.question = d.getElementById('question-text');
    el.scale = d.querySelector('.scale');
    el.low = d.querySelector('[data-scale-low]');
    el.high = d.querySelector('[data-scale-high]');
    el.count = d.querySelector('.progress__count');
    el.time = d.querySelector('.progress__left-time');
    el.track = d.querySelector('.progress__track');
    el.fill = d.querySelector('.progress__fill');
    el.seen = d.querySelector('.progress__seen');
    el.next = d.querySelector('.next-btn');
    el.nextLabel = d.querySelector('.next-label');
    el.prev = d.querySelector('.prev-btn');
    el.resume = d.querySelector('.resume');
    el.saved = d.querySelector('.quiz-saved');
    el.live = d.querySelector('[data-live]');
    el.autoBox = d.querySelector('[data-auto]');
    el.mode = d.querySelector('.progress__mode');

    if (!el.question || !el.scale) return;
    if (el.autoBox) el.autoBox.checked = state.auto;

    loadData(state.type, function (data) {
      if (!data || data.id !== state.type) { showFatal(); return; }
      state.data = data;
      state.indices = state.mode === 'quick'
        ? data.quick.slice()
        : data.q.en.map(function (_, i) { return i; });
      state.answers = state.indices.map(function () { return null; });

      wire();

      var saved = readSaved();
      if (saved) {
        el.resume.classList.add('is-on');
        el.main.hidden = true;
        el.resume.querySelector('[data-resume-yes]').addEventListener('click', function () { start(saved); });
        el.resume.querySelector('[data-resume-no]').addEventListener('click', function () { clearSaved(); start(null); });
      } else {
        start(null);
      }
    }, showFatal);
  }

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', boot);
  else boot();
})(window, document);

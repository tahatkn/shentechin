/* ShenTechin MED — sonuç sayfası.

   Yeni: puanın nereden geldiğini gösteren alan kırılımı, en zayıf üç cevap,
   tarayıcıda tutulan geçmiş, paylaşılabilir bağlantı (cevaplar adres
   çubuğunda kodlanır — sunucu yok), kare paylaşım görseli, takvim
   hatırlatıcısı ve yazdırma.

   Güvenlik notu: adres çubuğundan gelen veri KULLANICI GİRDİSİDİR.
   Yalnızca sayıya çevrilip aralık denetimi yapılır; hiçbir zaman
   innerHTML'e verilmez. Ekrandaki tüm metinler ya derleme zamanı
   sabitlerinden ya da soru bankasından gelir. */
(function (w, d) {
  'use strict';

  var T = w.T || {};
  var TYPES = ['sleep', 'skin', 'diet', 'stress', 'heart', 'focus', 'fitness', 'immunity', 'tech'];
  var CONTACT = 'info@shentechin.com';   /* <-- kendi adresinizle değiştirin */
  var MAX = 10;
  var CODE = '123456789a';

  var BAND_VAR = { good: '--ok', mid: '--warn', low: '--danger' };
  /* Paylaşım kartını <canvas> ile çizerken somut bir renk gerekiyor;
     token okunamazsa bu değerler kullanılır. */
  var BAND_FALLBACK = { good: '#15803d', mid: '#b45309', low: '#b91c1c' };

  function fmt(key, vars) {
    var s = T[key] || key;
    Object.keys(vars || {}).forEach(function (k) {
      s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]);
    });
    return s;
  }

  function lang() { return d.documentElement.lang === 'tr' ? 'tr' : 'en'; }

  /* Türkçede yüzde işareti sayıdan ÖNCE gelir: %60. Intl bunu kendi bilir. */
  var pctFormat = null;
  function pct(n) {
    if (!pctFormat) {
      try {
        pctFormat = new Intl.NumberFormat(lang() === 'tr' ? 'tr-TR' : 'en-GB',
          { style: 'percent', maximumFractionDigits: 0 });
      } catch (e) {
        pctFormat = { format: function (v) { return Math.round(v * 100) + '%'; } };
      }
    }
    return pctFormat.format(n / 100);
  }
  function bandOf(p) { return p >= 80 ? 'good' : p >= 50 ? 'mid' : 'low'; }

  function bandColour(band) {
    var v = '';
    try { v = getComputedStyle(d.documentElement).getPropertyValue(BAND_VAR[band]).trim(); } catch (e) {}
    return v || BAND_FALLBACK[band];
  }

  /* ---------------------------------------------------------
     1. SONUCU BUL — önce adres çubuğu, sonra yerel kayıt
     --------------------------------------------------------- */

  function decodeHash() {
    var m = /[#&]r=([a-z]+)\.([qf])\.([1-9a]+)/.exec(w.location.hash || '');
    if (!m) return null;
    if (TYPES.indexOf(m[1]) === -1) return null;
    var vals = [];
    for (var i = 0; i < m[3].length; i++) {
      var v = CODE.indexOf(m[3][i]) + 1;
      if (v < 1 || v > MAX) return null;
      vals.push(v);
    }
    if (vals.length !== 10 && vals.length !== 25) return null;
    return { type: m[1], mode: m[2] === 'f' ? 'full' : 'quick', raw: vals, shared: true };
  }

  function readStored() {
    try {
      var r = JSON.parse(w.localStorage.getItem('stq:result'));
      if (!r || typeof r.percent !== 'number' || TYPES.indexOf(r.type) === -1) return null;
      if (r.percent < 0 || r.percent > 100) return null;
      return r;
    } catch (e) { return null; }
  }

  function encodeHash(result) {
    if (!result.answers) return '';
    var s = result.answers.map(function (pair) { return CODE[pair[1] - 1]; }).join('');
    return '#r=' + result.type + '.' + (result.mode === 'full' ? 'f' : 'q') + '.' + s;
  }

  /* ---------------------------------------------------------
     2. VERİ DOSYASI
     --------------------------------------------------------- */

  function loadScript(src, done, fail) {
    var s = d.createElement('script');
    s.src = src;
    s.onload = done;
    s.onerror = fail;
    d.head.appendChild(s);
  }

  /* Soru bankası + o testin bant metinleri. Metinler test ve dil başına
     ayrı dosyada tutulur (~1,2 KB), böylece sonuç sayfası dokuz testin
     metnini birden taşımaz. */
  function loadAll(type, done, fail) {
    loadScript('/assets/js/data/' + type + '.js', function () {
      var data = w.QUIZ_DATA;
      loadScript('/assets/js/results/' + type + '.' + lang() + '.js', function () {
        done(data, w.RESULT_TEXT);
      }, fail);
    }, fail);
  }

  /* ---------------------------------------------------------
     3. PUANLAMA
     --------------------------------------------------------- */

  function scoreOf(data, qi, v) {
    return data.reverse.indexOf(qi) !== -1 ? (MAX + 1 - v) : v;
  }

  function normalise(scores) {
    var n = scores.length;
    if (!n) return 0;
    var raw = scores.reduce(function (a, b) { return a + b; }, 0);
    return Math.round(((raw - n) / (n * MAX - n)) * 100);
  }

  /* ---------------------------------------------------------
     4. EKRAN
     --------------------------------------------------------- */

  function el(id) { return d.getElementById(id); }

  function paintRing(value, band) {
    var circle = d.querySelector('.ring__value');
    var num = d.querySelector('.ring__num');
    var svg = d.querySelector('.ring');
    if (!circle) return;

    var r = Number(circle.getAttribute('r')) || 86;
    var circ = 2 * Math.PI * r;
    var colour = bandColour(band);

    /* Halkanın görünümü tamamen ÖĞENİN KENDİ satır içi stiline yazılır.
       Daha önce stroke rengi .score'dan miras alınan --band-color'a,
       kesik deseni de --circ değişkenine bağlıydı; bu ikisi ara sıra
       boyama anında çözülmeyip halkayı "tam daire, marka mavisi" hâlinde
       gösteriyordu. Satır içi değerler böyle bir yarışa açık değil. */
    circle.style.strokeDasharray = circ.toFixed(1) + ' ' + circ.toFixed(1);
    circle.style.stroke = colour;

    var scoreBox = d.querySelector('.score');
    scoreBox.setAttribute('data-band', band);
    scoreBox.style.setProperty('--band-color', colour);

    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', (T.res_score_aria || '') + ' ' + value + ' / 100');

    var reduced = w.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var target = circ - (circ * value) / 100;

    /* Doğru değeri ÖNCE yaz. Sayaç animasyonu yalnızca bir süstür;
       sekme arka plandayken requestAnimationFrame çalışmaz ve o durumda
       ekranda "…" kalmasındansa doğru sayının durması gerekir. */
    num.textContent = pct(value);

    /* Son durumu geçiş KAPALIYKEN yaz: aksi hâlde yay, 1,1 saniyelik
       geçişin ortasında boyanabiliyor ve ilk kare boş halka çıkıyor. */
    circle.style.transition = 'none';
    circle.style.strokeDashoffset = target;
    void circle.getBoundingClientRect();

    if (reduced || d.visibilityState !== 'visible') return;

    var dur = 1100;
    var t0 = null;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      num.textContent = pct(Math.round(value * eased));
      if (p < 1) w.requestAnimationFrame(step);
      else num.textContent = pct(value);
    }
    /* Animasyon: başlangıcı geri al, geçişi aç, hedefe bırak. */
    circle.style.strokeDashoffset = circ;
    void circle.getBoundingClientRect();
    circle.style.transition = '';
    circle.style.strokeDashoffset = target;
    w.requestAnimationFrame(step);

    /* Emniyet supabı: animasyon herhangi bir sebeple takılırsa
       nihai değer yine de görünsün. */
    w.setTimeout(function () { num.textContent = pct(value); }, dur + 200);
  }

  function renderBreakdown(data, texts, pairs) {
    var host = el('breakdown');
    if (!host || !data.groups || !data.groupNames) return;

    var names = data.groupNames[lang()] || data.groupNames.en;
    var buckets = {};
    pairs.forEach(function (p) {
      var g = data.groups[p[0]];
      if (!g) return;
      (buckets[g] = buckets[g] || []).push(scoreOf(data, p[0], p[1]));
    });

    var keys = Object.keys(buckets).filter(function (k) { return names[k]; });
    if (keys.length < 2) { host.closest('.panel').hidden = true; return; }

    var rows = keys.map(function (k) { return { key: k, pct: normalise(buckets[k]) }; })
      .sort(function (a, b) { return a.pct - b.pct; });

    host.textContent = '';
    rows.forEach(function (row, i) {
      var wrapper = d.createElement('div');
      wrapper.className = 'theme-row';

      var top = d.createElement('div');
      top.className = 'theme-row__top';
      var name = d.createElement('span');
      name.className = 'theme-row__name';
      name.textContent = names[row.key];
      var val = d.createElement('span');
      val.className = 'theme-row__val';
      val.textContent = pct(row.pct);
      top.append(name, val);

      var bar = d.createElement('div');
      bar.className = 'theme-row__bar';
      var fill = d.createElement('div');
      fill.className = 'theme-row__fill';
      wrapper.setAttribute('data-band', bandOf(row.pct));
      bar.appendChild(fill);

      wrapper.append(top, bar);

      /* Alanın ne ölçtüğü ve bu puanda ne yapılacağı. Metin derleme
         zamanı sabitidir; 70 eşiği "koru" ile "üzerinde çalış" ayrımı. */
      var note = texts && texts.domains && texts.domains[row.key];
      if (note) {
        var why = d.createElement('p');
        why.className = 'theme-row__why';
        why.textContent = note.why;
        var todo = d.createElement('p');
        todo.className = 'theme-row__todo';
        todo.textContent = row.pct >= 70 ? note.high : note.low;
        wrapper.append(why, todo);
      }

      host.appendChild(wrapper);

      /* Çubuklar sırayla dolar. Hareketi azaltma tercihi varsa bekletmeden
         yerine koy — hem tercihe saygı, hem de görsel regresyon aracının
         her seferinde aynı kareyi yakalayabilmesi için. */
      if (w.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        fill.style.width = row.pct + '%';
      } else {
        setTimeout(function () { fill.style.width = row.pct + '%'; }, 120 + i * 90);
      }
    });
  }

  function renderAnswers(data, pairs) {
    var texts = data.q[lang()] || data.q.en;

    var scored = pairs.map(function (p) {
      return { qi: p[0], raw: p[1], score: scoreOf(data, p[0], p[1]) };
    }).sort(function (a, b) { return a.score - b.score; });

    function list(hostId, items, good) {
      var host = el(hostId);
      if (!host) return;
      var panel = host.closest('.panel');
      if (!items.length) { if (panel) panel.hidden = true; return; }
      host.textContent = '';
      items.forEach(function (it) {
        var li = d.createElement('li');
        li.className = 'answer' + (good ? ' answer--good' : '');

        var chip = d.createElement('span');
        chip.className = 'answer__score';
        chip.textContent = it.raw + '/' + MAX;

        var body = d.createElement('span');
        body.className = 'answer__q';
        body.textContent = texts[it.qi];

        var meta = d.createElement('span');
        meta.className = 'answer__meta';
        meta.textContent = (T.res_answer_label || '') + ': ' + it.raw + ' / ' + MAX;
        body.appendChild(meta);

        li.append(chip, body);
        host.appendChild(li);
      });
    }

    /* Zayıf cevaplar artık eylem planında, gerekçesiyle birlikte duruyor;
       burada yalnızca lehine çalışanlar kalır. Eşik 8: gerçekten güçlü
       olmayan bir cevabı "güçlü yanınız" diye sunmak yanıltıcı olurdu. */
    list('best', scored.slice().reverse().filter(function (x) { return x.score >= 8; }).slice(0, 3), true);
  }

  /* ---------------------------------------------------------
     4b. KİŞİYE ÖZEL EYLEM PLANI

     Puanı en çok düşüren cevaplar alınır ve YALNIZCA onların
     eylemi gösterilir. Raporun kişiye özel olan kısmı budur:
     iki kişi aynı toplam puanı alsa bile farklı bir plan görür.
     --------------------------------------------------------- */

  function weakest(data, pairs, limit) {
    var scored = pairs.map(function (p) {
      return { qi: p[0], raw: p[1], score: scoreOf(data, p[0], p[1]) };
    }).sort(function (a, b) { return a.score - b.score; });

    /* Zaten iyi olan cevaplar için "eylem" göstermek yanıltıcı olur;
       ama plan da tamamen boş kalmasın diye en az üç madde tutulur. */
    var weak = scored.filter(function (x) { return x.score <= 8; });
    return (weak.length >= 3 ? weak : scored).slice(0, limit);
  }

  function renderPlan(data, texts, pairs) {
    var host = el('plan');
    if (!host || !texts || !texts.actions) return;
    var panel = host.closest('.panel');

    var items = weakest(data, pairs, 5);
    if (!items.length) { if (panel) panel.hidden = true; return; }

    var qtext = data.q[lang()] || data.q.en;
    host.textContent = '';

    items.forEach(function (it, i) {
      var action = texts.actions[it.qi] || texts.actions[String(it.qi)];
      if (!action) return;

      var li = d.createElement('li');
      li.className = 'plan__item';
      li.setAttribute('data-band', bandOf(Math.round(((it.score - 1) / 9) * 100)));

      var rank = d.createElement('span');
      rank.className = 'plan__rank';
      rank.textContent = String(i + 1);

      var body = d.createElement('div');
      body.className = 'plan__body';

      var doEl = d.createElement('h3');
      doEl.className = 'plan__do';
      doEl.textContent = action.do;

      var whyEl = d.createElement('p');
      whyEl.className = 'plan__why';
      whyEl.textContent = action.why;

      var from = d.createElement('p');
      from.className = 'plan__from';
      var chip = d.createElement('span');
      chip.className = 'plan__chip';
      chip.textContent = it.raw + '/' + MAX;
      var q = d.createElement('span');
      q.textContent = qtext[it.qi];
      from.append(chip, q);

      body.append(doEl, whyEl, from);
      li.append(rank, body);
      host.appendChild(li);
    });

    if (panel) panel.hidden = !host.childNodes.length;
  }

  /* ---------------------------------------------------------
     4c. HEKİME GÖTÜRÜLECEK İŞARETLER

     Kural tabanlı. Tanı KOYMAZ: belirli cevaplar bir arada
     düştüğünde "bu tabloyu bir hekime gösterin" der.
     Kısa sürümde sorulmayan sorular sayıma girmez; bu yüzden
     eşiğe ulaşacak kadar soru sorulmadıysa uyarı hiç çıkmaz.
     --------------------------------------------------------- */

  function renderFlags(data, texts, pairs) {
    var host = el('flags');
    if (!host || !texts || !texts.flags || !texts.flags.length) return;
    var panel = el('flags-panel');

    var byIndex = {};
    pairs.forEach(function (p) { byIndex[p[0]] = scoreOf(data, p[0], p[1]); });

    var hits = texts.flags.filter(function (f) {
      var asked = f.q.filter(function (qi) { return byIndex[qi] !== undefined; });
      if (asked.length < f.n) return false;
      var below = asked.filter(function (qi) { return byIndex[qi] <= f.at; });
      return below.length >= f.n;
    });

    if (!hits.length) { if (panel) panel.hidden = true; return; }

    host.textContent = '';
    hits.forEach(function (f) {
      var li = d.createElement('li');
      li.className = 'flag';
      var ic = d.createElement('span');
      ic.className = 'flag__mark';
      ic.setAttribute('aria-hidden', 'true');
      ic.textContent = '!';
      var txt = d.createElement('p');
      txt.textContent = f.t;
      li.append(ic, txt);
      host.appendChild(li);
    });
    if (panel) panel.hidden = false;
  }

  /* ---------------------------------------------------------
     4d. BİLİMSEL TEMEL VE KAYNAKLAR

     PubMed kimlikleri derleme zamanı sabitidir; bağlantılar
     doğrudan ilgili kaydı açar.
     --------------------------------------------------------- */

  function renderEvidence(texts) {
    var basisHost = el('basis');
    var refHost = el('refs');
    if (!texts) return;

    if (basisHost && texts.basis && texts.basis.length) {
      basisHost.textContent = '';
      texts.basis.forEach(function (b) {
        var li = d.createElement('li');
        li.className = 'basis__item';
        li.textContent = b;
        basisHost.appendChild(li);
      });
    }

    if (refHost && texts.refs && texts.refs.length) {
      refHost.textContent = '';
      texts.refs.forEach(function (r) {
        var li = d.createElement('li');
        var a = d.createElement('a');
        a.href = 'https://pubmed.ncbi.nlm.nih.gov/' + encodeURIComponent(r.p) + '/';
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = r.t;
        var id = d.createElement('span');
        id.className = 'ref__id';
        id.textContent = 'PMID ' + r.p;
        li.append(a, id);
        refHost.appendChild(li);
      });
    } else {
      var panel = el('evidence-panel');
      if (panel) panel.hidden = true;
    }
  }

  /* ---------------------------------------------------------
     5. GEÇMİŞ
     --------------------------------------------------------- */

  function renderHistory(type, current) {
    var panel = el('history-panel');
    if (!panel) return;
    var hist = [];
    try { hist = JSON.parse(w.localStorage.getItem('stq:history:' + type)) || []; } catch (e) {}
    hist = hist.filter(function (h) { return h && typeof h.percent === 'number'; });

    if (hist.length < 2) { panel.hidden = true; return; }
    panel.hidden = false;

    /* sparkline */
    var svg = el('spark');
    if (svg) {
      var pts = hist.slice(-8);
      var w0 = 300, h0 = 54, pad = 6;
      var stepX = pts.length > 1 ? (w0 - pad * 2) / (pts.length - 1) : 0;
      var xy = pts.map(function (p, i) {
        return [pad + i * stepX, pad + (1 - p.percent / 100) * (h0 - pad * 2)];
      });
      var line = xy.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' ');
      var area = line + ' L' + xy[xy.length - 1][0].toFixed(1) + ' ' + (h0 - pad) + ' L' + xy[0][0].toFixed(1) + ' ' + (h0 - pad) + ' Z';

      svg.setAttribute('viewBox', '0 0 ' + w0 + ' ' + h0);
      svg.textContent = '';
      var ns = 'http://www.w3.org/2000/svg';
      var pa = d.createElementNS(ns, 'path');
      pa.setAttribute('class', 'spark__area'); pa.setAttribute('d', area);
      var pl = d.createElementNS(ns, 'path');
      pl.setAttribute('class', 'spark__line'); pl.setAttribute('d', line);
      svg.append(pa, pl);
      xy.forEach(function (p) {
        var c = d.createElementNS(ns, 'circle');
        c.setAttribute('class', 'spark__dot');
        c.setAttribute('cx', p[0].toFixed(1)); c.setAttribute('cy', p[1].toFixed(1)); c.setAttribute('r', '2.6');
        svg.appendChild(c);
      });
    }

    var host = el('history-list');
    host.textContent = '';
    hist.slice(-5).reverse().forEach(function (h, i, arr) {
      var row = d.createElement('div');
      row.className = 'history__row';

      var date = d.createElement('span');
      date.className = 'history__date';
      date.textContent = new Date(h.at).toLocaleDateString(lang() === 'tr' ? 'tr-TR' : 'en-GB',
        { day: 'numeric', month: 'short' });

      var score = d.createElement('span');
      score.className = 'history__score';
      score.textContent = pct(h.percent);

      var delta = d.createElement('span');
      var prev = arr[i + 1];
      if (prev) {
        var diff = h.percent - prev.percent;
        var key = diff > 0 ? 'up' : diff < 0 ? 'down' : 'same';
        delta.className = 'history__delta history__delta--' + key;
        delta.textContent = fmt('res_history_delta_' + key, { n: Math.abs(diff) });
      }

      row.append(date, score, delta);
      host.appendChild(row);
    });

    var clear = el('history-clear');
    if (clear) {
      clear.addEventListener('click', function () {
        try { w.localStorage.removeItem('stq:history:' + type); } catch (e) {}
        panel.hidden = true;
      });
    }
  }

  /* ---------------------------------------------------------
     6. PAYLAŞIM
     --------------------------------------------------------- */

  function shareUrl(result) {
    return w.location.origin + w.location.pathname + encodeHash(result);
  }

  function shareText(result, testName) {
    return fmt('res_share_text', { score: pct(result.percent), test: testName });
  }

  function drawCard(result, testName, bandLabel, colour, done) {
    var canvas = el('share-canvas');
    if (!canvas) return done(null);
    var S = 1080;
    canvas.width = S; canvas.height = S;
    var c = canvas.getContext('2d');

    var dark = d.documentElement.getAttribute('data-theme') === 'dark';
    var bg = dark ? '#0b1220' : '#0f172a';

    c.fillStyle = bg; c.fillRect(0, 0, S, S);

    /* arka plan halkaları */
    c.strokeStyle = 'rgba(255,255,255,.06)'; c.lineWidth = 2;
    [430, 350, 270].forEach(function (r) {
      c.beginPath(); c.arc(S / 2, 470, r, 0, Math.PI * 2); c.stroke();
    });

    /* skor halkası */
    var R = 200, LW = 34;
    c.lineWidth = LW; c.lineCap = 'round';
    c.strokeStyle = 'rgba(255,255,255,.12)';
    c.beginPath(); c.arc(S / 2, 470, R, 0, Math.PI * 2); c.stroke();
    c.strokeStyle = colour;
    c.beginPath();
    c.arc(S / 2, 470, R, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * result.percent) / 100);
    c.stroke();

    var family = '"Plus Jakarta Sans", system-ui, sans-serif';
    c.textAlign = 'center'; c.textBaseline = 'middle';

    var line = function (text, weight, size, fill, y) {
      c.fillStyle = fill;
      c.font = weight + ' ' + size + 'px ' + family;
      c.fillText(text, S / 2, y);
    };

    line('ShenTechin MED', 800, 34, 'rgba(255,255,255,.85)', 110);
    line(pct(result.percent), 800, 150, '#ffffff', 460);
    line(T.res_of100 || 'out of 100', 700, 30, 'rgba(255,255,255,.55)', 556);
    line(testName, 800, 54, '#ffffff', 790);
    line(bandLabel, 700, 34, colour, 856);
    line('shentechin.com', 600, 28, 'rgba(255,255,255,.4)', 990);

    canvas.toBlob(function (blob) { done(blob); }, 'image/png');
  }

  function download(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = d.createElement('a');
    a.href = url; a.download = filename;
    d.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }

  function icsFor(result, testName) {
    var when = new Date(Date.now() + 14 * 864e5);
    var y = when.getUTCFullYear();
    var pad = function (n) { return String(n).padStart(2, '0'); };
    var stamp = y + pad(when.getUTCMonth() + 1) + pad(when.getUTCDate()) + 'T090000Z';
    var end = y + pad(when.getUTCMonth() + 1) + pad(when.getUTCDate()) + 'T091500Z';
    var body = fmt('res_remind_body', {
      score: pct(result.percent), test: testName, url: w.location.origin
    });
    return [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//ShenTechin MED//EN',
      'BEGIN:VEVENT',
      'UID:' + result.type + '-' + Date.now() + '@shentechin.com',
      'DTSTAMP:' + stamp, 'DTSTART:' + stamp, 'DTEND:' + end,
      'SUMMARY:' + fmt('res_remind_title', { test: testName }),
      'DESCRIPTION:' + body.replace(/\n/g, '\\n'),
      'END:VEVENT', 'END:VCALENDAR'
    ].join('\r\n');
  }

  /* Bağlantıyı panoya kopyala.
     Clipboard API izin isteyebilir ve reddedilebilir; o yüzden önce eski
     execCommand yöntemine, o da olmazsa adresi görünür kılmaya düşüyoruz.
     Burada prompt()/alert() KULLANILMAZ: ikisi de sayfayı kilitliyor. */
  function copyLink(btn, url) {
    var label = btn.querySelector('[data-copy-label]') || btn;
    var original = label.textContent;

    var flash = function (text) {
      label.textContent = text;
      setTimeout(function () { label.textContent = original; }, 1800);
    };

    var legacy = function () {
      try {
        var box = d.createElement('textarea');
        box.value = url;
        box.setAttribute('readonly', '');
        box.style.cssText = 'position:fixed;top:-1000px;opacity:0';
        d.body.appendChild(box);
        box.select();
        var ok = d.execCommand && d.execCommand('copy');
        box.remove();
        return !!ok;
      } catch (e) { return false; }
    };

    var fallback = function () {
      if (legacy()) { flash(T.res_copied || 'Copied'); return; }
      /* Son çare: adresi seçilebilir biçimde göster. */
      var out = d.getElementById('copy-fallback');
      if (!out) {
        out = d.createElement('input');
        out.id = 'copy-fallback';
        out.className = 'copy-fallback';
        out.setAttribute('readonly', '');
        btn.parentElement.insertAdjacentElement('afterend', out);
      }
      out.value = url;
      out.hidden = false;
      out.select();
    };

    if (w.navigator.clipboard && w.navigator.clipboard.writeText) {
      w.navigator.clipboard.writeText(url)
        .then(function () { flash(T.res_copied || 'Copied'); })
        .catch(fallback);
    } else {
      fallback();
    }
  }

  function wireShare(result, testName, bandLabel, colour) {
    d.querySelectorAll('[data-share]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var kind = btn.getAttribute('data-share');
        var url = shareUrl(result);
        var text = shareText(result, testName);

        if (kind === 'native' && w.navigator.share) {
          w.navigator.share({ title: 'ShenTechin MED', text: text, url: url }).catch(function () {});
        } else if (kind === 'x') {
          w.open('https://x.com/intent/post?text=' + encodeURIComponent(text) +
            '&url=' + encodeURIComponent(url), '_blank', 'noopener');
        } else if (kind === 'whatsapp') {
          w.open('https://wa.me/?text=' + encodeURIComponent(text + ' ' + url), '_blank', 'noopener');
        } else if (kind === 'copy') {
          copyLink(btn, url);
        } else if (kind === 'image') {
          drawCard(result, testName, bandLabel, colour, function (blob) {
            if (blob) download(blob, 'shentechin-' + result.type + '.png');
          });
        }
      });
    });

    var nativeBtn = d.querySelector('[data-share="native"]');
    if (nativeBtn && !w.navigator.share) nativeBtn.hidden = true;

    var img = d.querySelector('[data-share="image"]');
    if (img && !(el('share-canvas') && el('share-canvas').toBlob)) img.hidden = true;

    var remind = el('remind-btn');
    if (remind) {
      remind.addEventListener('click', function () {
        download(new Blob([icsFor(result, testName)], { type: 'text/calendar' }),
          'shentechin-' + result.type + '.ics');
      });
    }

    var printBtn = el('print-btn');
    if (printBtn) printBtn.addEventListener('click', function () { w.print(); });
  }

  /* ---------------------------------------------------------
     7. AKIŞ
     --------------------------------------------------------- */

  function showEmpty() {
    var wrap = d.querySelector('.result-wrap');
    if (!wrap) return;
    wrap.textContent = '';
    var box = d.createElement('div');
    box.className = 'result-empty';
    var h = d.createElement('h1'); h.textContent = T.res_empty_title || '';
    var p = d.createElement('p'); p.textContent = T.res_empty_desc || '';
    var a = d.createElement('a');
    a.className = 'btn btn--primary';
    a.href = w.HOME_URL || '/';
    a.textContent = T.res_empty_btn || '';
    box.append(h, p, a);
    wrap.appendChild(box);
  }

  function boot() {
    var shared = decodeHash();
    var result = shared || readStored();
    if (!result) { showEmpty(); return; }

    loadAll(result.type, function (data, texts) {
      if (!data || data.id !== result.type) { showEmpty(); return; }

      /* Paylaşılan sonuçta cevaplar ham geldi; soru indekslerini modda eşle. */
      var pairs;
      if (shared) {
        var idx = result.mode === 'quick'
          ? data.quick.slice()
          : data.q.en.map(function (_, i) { return i; });
        if (idx.length !== result.raw.length) { showEmpty(); return; }
        pairs = idx.map(function (qi, i) { return [qi, result.raw[i]]; });
        result.answers = pairs;
        result.count = pairs.length;
        result.percent = normalise(pairs.map(function (p) { return scoreOf(data, p[0], p[1]); }));
      } else {
        pairs = Array.isArray(result.answers) ? result.answers : [];
      }

      var band = bandOf(result.percent);
      var colour = bandColour(band);   /* yalnızca <canvas> kartı için */
      var testName = (texts && texts.name) || result.type;
      var bandInfo = texts && texts.bands ? texts.bands[band] : null;

      /* başlık alanı */
      var labelEl = el('result-test-label');
      if (labelEl) labelEl.textContent = testName;
      var scoreBox = d.querySelector('.score');
      if (scoreBox) scoreBox.setAttribute('data-tone', result.type);

      var titleEl = el('result-title');
      if (titleEl) titleEl.textContent = bandInfo ? bandInfo.label : '';

      var chip = el('band-chip');
      if (chip) chip.textContent = T['res_band_' + band] || '';

      var textEl = el('result-text');
      /* Bant metni derleme zamanı sabitidir ve <strong> içerir; kullanıcı
         girdisi değildir. */
      if (textEl && bandInfo) textEl.innerHTML = bandInfo.text;

      var fromEl = el('result-from');
      if (fromEl) {
        fromEl.textContent = fmt('res_from', {
          mode: T['res_mode_' + (result.mode === 'full' ? 'full' : 'quick')] || '',
          n: result.count || pairs.length
        });
      }

      paintRing(result.percent, band);

      renderEvidence(texts);

      if (pairs.length) {
        renderPlan(data, texts, pairs);
        renderFlags(data, texts, pairs);
        renderBreakdown(data, texts, pairs);
        renderAnswers(data, pairs);
      } else {
        ['plan', 'breakdown', 'best'].forEach(function (id) {
          var n = el(id); if (n && n.closest('.panel')) n.closest('.panel').hidden = true;
        });
        var fp = el('flags-panel'); if (fp) fp.hidden = true;
      }

      if (shared) {
        var note = el('shared-note');
        if (note) note.hidden = false;
        var again = el('again-btn');
        if (again) again.href = (w.QUIZ_URL || '/quiz.html') + '?type=' + result.type +
          '&mode=' + (result.mode === 'full' ? 'full' : 'quick');
      } else {
        renderHistory(result.type, result.percent);
      }

      var mail = el('mail-btn');
      if (mail) {
        mail.setAttribute('href', 'mailto:' + CONTACT + '?subject=' +
          encodeURIComponent('ShenTechin MED — ' + testName));
      }

      var retake = el('retake-btn');
      if (retake) {
        retake.href = (w.QUIZ_URL || '/quiz.html') + '?type=' + result.type +
          '&mode=' + (result.mode === 'full' ? 'full' : 'quick');
      }

      wireShare(result, testName, bandInfo ? bandInfo.label : '', colour);
    }, showEmpty);
  }

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', boot);
  else boot();
})(window, document);

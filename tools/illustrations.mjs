/* Siteye özgü çizim seti.
   Hepsi satır içi SVG; harici görsel yok, hiçbiri ağdan bir şey indirmez.

   Kural: çizgiler currentColor ile çizilir, dolgular currentColor'ın düşük
   opaklıklı hâlidir. Böylece her illüstrasyon bulunduğu kartın "ton" rengini
   alır ve koyu temada ayrıca uğraşmadan doğru görünür. */

const A = (lang, en, tr) => (lang === 'tr' ? tr : en);

/* ---------------------------------------------------------------
   1. KATEGORİ İLLÜSTRASYONLARI  (200 x 140, dekoratif)
   --------------------------------------------------------------- */

const wrap = (body) =>
  `<svg class="ill" viewBox="0 0 200 140" fill="none" aria-hidden="true" focusable="false" ` +
  `stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;

/* yumuşak arka plan lekesi */
const blob = (d) => `<path d="${d}" fill="currentColor" opacity=".10" stroke="none"/>`;
const dot = (x, y, r = 3) => `<circle cx="${x}" cy="${y}" r="${r}" fill="currentColor" stroke="none"/>`;

export const ILLUSTRATIONS = {
  /* Uyku — hilal, yıldızlar, gece boyunca inip çıkan uyku eğrisi */
  sleep: wrap(`
    ${blob('M132 18a34 34 0 1 0 34 34 27 27 0 0 1-34-34Z')}
    <path d="M134 20a32 32 0 1 0 32 32 25 25 0 0 1-32-32Z"/>
    ${dot(60, 30, 2.5)}${dot(84, 18, 2)}${dot(44, 54, 2)}
    <path d="M56 22v8M52 26h8" stroke-width="2.5"/>
    <path d="M20 108c14 0 14-26 28-26s14 34 28 34 14-40 28-40 14 22 28 22 14-10 28-10"
          opacity=".9"/>
    <path d="M20 124h160" opacity=".25" stroke-width="2.5"/>
  `),

  /* Cilt — yanak eğrisi, su damlası, güneş yayı */
  skin: wrap(`
    ${blob('M52 122c-18-32-8-74 28-90 34-15 66 6 70 38 4 30-16 52-46 52Z')}
    <path d="M60 124c-16-30-8-70 26-84 30-13 60 6 62 36"/>
    <path d="M148 78c0 11-9 20-20 20s-20-9-20-20c0-12 12-24 20-34 8 10 20 22 20 34Z"/>
    <path d="M40 42a26 26 0 0 1 26-26" opacity=".55"/>
    <path d="M30 30 24 24M52 16l-3-8M18 46h-8" stroke-width="2.5" opacity=".55"/>
    ${dot(96, 60, 2.5)}${dot(78, 88, 2)}${dot(112, 106, 2)}
  `),

  /* Beslenme — kâse, içindekiler, yeşillik */
  diet: wrap(`
    ${blob('M34 74h132c0 34-30 54-66 54S34 108 34 74Z')}
    <path d="M32 76h136c0 32-30 52-68 52S32 108 32 76Z"/>
    <path d="M18 76h164" opacity=".55"/>
    <path d="M100 60c0-18 12-30 30-32-2 20-12 32-30 32Z"/>
    <path d="M100 60c-14 0-24-8-28-22 16 2 26 10 28 22Z" opacity=".65"/>
    <path d="M100 60V36"/>
    ${dot(62, 96, 3)}${dot(88, 104, 3)}${dot(116, 98, 3)}
  `),

  /* Stres — baş silueti, içeride sıkışan sarmal */
  stress: wrap(`
    ${blob('M56 128V96C40 86 34 68 40 50 47 28 70 14 96 16c30 2 50 24 48 52-1 18-10 28-24 34v26Z')}
    <path d="M62 128v-30C48 88 42 72 47 55c6-20 26-33 50-31 27 2 45 22 43 47-1 16-9 26-22 32v25"/>
    <path d="M96 46c-11 0-18 8-18 17s7 15 15 15 12-5 12-11-4-9-9-9-7 3-7 6"/>
    <path d="M156 40l14-10M162 68h18M154 96l14 10" stroke-width="2.5" opacity=".5"/>
    <path d="M44 40 30 30M38 68H20M46 96l-14 10" stroke-width="2.5" opacity=".5"/>
  `),

  /* Kalp — kalp konturu ve içinden geçen ritim çizgisi */
  heart: wrap(`
    ${blob('M100 126 46 76C28 58 30 32 50 22c14-7 32-3 50 14 18-17 36-21 50-14 20 10 22 36 4 54Z')}
    <path d="M100 124 52 76C34 58 36 34 54 25c14-7 32-2 46 15 14-17 32-22 46-15 18 9 20 33 2 51Z"/>
    <path d="M22 74h34l8-16 12 40 14-52 12 34 8-6h56" stroke-width="3.2"/>
  `),

  /* Odaklanma — hedef, dışarıdan çekilen dikkat noktaları */
  focus: wrap(`
    ${blob('M100 26a44 44 0 1 1 0 88 44 44 0 0 1 0-88Z')}
    <circle cx="100" cy="70" r="42"/>
    <circle cx="100" cy="70" r="25" opacity=".7"/>
    ${dot(100, 70, 6)}
    <path d="M100 12v10M100 118v10M158 70h10M32 70h10" stroke-width="2.5"/>
    <path d="M14 26c14 6 22 14 26 26M186 26c-14 6-22 14-26 26" opacity=".45" stroke-width="2.5"/>
    ${dot(16, 24, 2.5)}${dot(184, 24, 2.5)}${dot(28, 116, 2.5)}
  `),

  /* Kondisyon — yükselen çubuklar, hareket yayı, dambıl */
  fitness: wrap(`
    ${blob('M28 124h148v10H28Z')}
    <path d="M20 124h160" opacity=".5"/>
    <rect x="34" y="88" width="24" height="36" rx="6"/>
    <rect x="72" y="66" width="24" height="58" rx="6" opacity=".85"/>
    <rect x="110" y="42" width="24" height="82" rx="6" opacity=".7"/>
    <path d="M150 34v24M162 26v40M174 34v24" stroke-width="3.2"/>
    <path d="M150 46h24"/>
    <path d="M28 60c10-16 24-26 42-30" opacity=".45" stroke-width="2.5"/>
  `),

  /* Bağışıklık — kalkan, çarpıp dağılan parçacıklar */
  immunity: wrap(`
    ${blob('M100 16 44 34v40c0 32 26 52 56 62 30-10 56-30 56-62V34Z')}
    <path d="M100 20 50 36v36c0 30 24 48 50 58 26-10 50-28 50-58V36Z"/>
    <path d="m84 74 12 12 24-26"/>
    ${dot(24, 42, 3)}${dot(176, 42, 3)}${dot(18, 92, 2.5)}${dot(182, 92, 2.5)}
    <path d="M32 34 20 26M168 34l12-8M30 104l-12 8M170 104l12 8" stroke-width="2.5" opacity=".5"/>
  `),

  /* Dijital denge — telefon, bildirim baloncukları, terazi çizgisi */
  tech: wrap(`
    ${blob('M74 16h52v108H74Z')}
    <rect x="72" y="14" width="56" height="112" rx="10"/>
    <path d="M92 26h16"/>
    ${dot(100, 112, 3)}
    <circle cx="146" cy="44" r="12" opacity=".8"/>
    <circle cx="164" cy="76" r="8" opacity=".55"/>
    <circle cx="150" cy="102" r="5" opacity=".4"/>
    <path d="M40 52a26 26 0 1 0 24 34 20 20 0 0 1-24-34Z" opacity=".8"/>
  `)
};

/* ---------------------------------------------------------------
   2. HERO — nefes ritminde dönen "alışkanlık halkaları"
   --------------------------------------------------------------- */

export function heroArt() {
  return `<svg class="hero-art" viewBox="0 0 320 320" fill="none" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="ha1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="var(--ring-1a)"/><stop offset="1" stop-color="var(--ring-1b)"/>
    </linearGradient>
    <linearGradient id="ha2" x1="1" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="var(--ring-2a)"/><stop offset="1" stop-color="var(--ring-2b)"/>
    </linearGradient>
    <linearGradient id="ha3" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0" stop-color="var(--ring-3a)"/><stop offset="1" stop-color="var(--ring-3b)"/>
    </linearGradient>
  </defs>
  <circle class="hero-art__halo" cx="160" cy="160" r="150"/>
  <circle class="hero-art__track" cx="160" cy="160" r="128"/>
  <circle class="hero-art__track" cx="160" cy="160" r="98"/>
  <circle class="hero-art__track" cx="160" cy="160" r="68"/>
  <circle class="hero-art__ring hero-art__ring--1" cx="160" cy="160" r="128" stroke="url(#ha1)"/>
  <circle class="hero-art__ring hero-art__ring--2" cx="160" cy="160" r="98"  stroke="url(#ha2)"/>
  <circle class="hero-art__ring hero-art__ring--3" cx="160" cy="160" r="68"  stroke="url(#ha3)"/>
  <circle class="hero-art__core" cx="160" cy="160" r="30"/>
  <path class="hero-art__pulse" d="M132 160h14l6-13 10 28 9-22 6 7h11"/>
</svg>`;
}

/* ---------------------------------------------------------------
   3. PUAN BANDI ÇİZELGESİ  (hakkımızda + test sayfaları)
   --------------------------------------------------------------- */

export function bandChart(lang) {
  const low = A(lang, 'Needs attention', 'Dikkat gerekiyor');
  const mid = A(lang, 'Mixed', 'Karışık');
  const good = A(lang, 'Strong', 'Güçlü');
  const title = A(lang, 'How a 0–100 score maps to the three bands',
    '0–100 puanın üç banda nasıl eşlendiği');

  return `<figure class="figure">
<svg class="diagram" viewBox="0 0 480 120" role="img" aria-labelledby="bc-t">
  <title id="bc-t">${title}</title>
  <rect x="10" y="34" width="216" height="34" rx="8" class="dg-band dg-band--low"/>
  <rect x="230" y="34" width="140" height="34" rx="8" class="dg-band dg-band--mid"/>
  <rect x="374" y="34" width="96" height="34" rx="8" class="dg-band dg-band--good"/>
  <text class="dg-label" x="118" y="56">${low}</text>
  <text class="dg-label" x="300" y="56">${mid}</text>
  <text class="dg-label" x="422" y="56">${good}</text>
  <text class="dg-tick" x="10" y="90">0</text>
  <text class="dg-tick" x="228" y="90">49</text>
  <text class="dg-tick" x="372" y="90">79</text>
  <text class="dg-tick" x="470" y="90" text-anchor="end">100</text>
</svg>
</figure>`;
}

/* ---------------------------------------------------------------
   4. MAKALE DİYAGRAMLARI
   --------------------------------------------------------------- */

/* Kortizolün gün içi eğrisi: sağlıklı ritim vs kronik yüksek taban */
function cortisolDiagram(lang) {
  const title = A(lang,
    'Daily cortisol: a healthy rhythm rises in the morning and falls at night; under chronic stress the baseline stays high and the curve flattens.',
    'Gün içi kortizol: sağlıklı ritim sabah yükselir, gece düşer; kronik streste taban düzey yüksek kalır ve eğri düzleşir.');
  const l1 = A(lang, 'Healthy rhythm', 'Sağlıklı ritim');
  const l2 = A(lang, 'Chronic stress', 'Kronik stres');
  return `<figure class="figure">
<svg class="diagram" viewBox="0 0 480 240" role="img" aria-labelledby="cd-t">
  <title id="cd-t">${title}</title>
  <line class="dg-axis" x1="46" y1="20" x2="46" y2="186"/>
  <line class="dg-axis" x1="46" y1="186" x2="462" y2="186"/>
  <line class="dg-grid" x1="46" y1="60" x2="462" y2="60"/>
  <line class="dg-grid" x1="46" y1="120" x2="462" y2="120"/>
  <path class="dg-line dg-line--2"
        d="M46 128C90 122 120 118 150 120s70 10 110 8 90-10 152-14"/>
  <path class="dg-line dg-line--1"
        d="M46 150C64 148 76 96 96 52s44-6 64 34 40 60 70 66 84 14 132 16"/>
  <text class="dg-tick" x="46" y="206">06:00</text>
  <text class="dg-tick" x="180" y="206">12:00</text>
  <text class="dg-tick" x="310" y="206">18:00</text>
  <text class="dg-tick" x="462" y="206" text-anchor="end">00:00</text>
  <text class="dg-axis-label" x="20" y="104" transform="rotate(-90 20 104)">${A(lang, 'Cortisol', 'Kortizol')}</text>
  <g class="dg-legend">
    <line class="dg-line dg-line--1" x1="60" y1="226" x2="86" y2="226"/>
    <text class="dg-tick" x="94" y="230">${l1}</text>
    <line class="dg-line dg-line--2" x1="230" y1="226" x2="256" y2="226"/>
    <text class="dg-tick" x="264" y="230">${l2}</text>
  </g>
</svg>
<figcaption>${A(lang,
  'The problem is rarely the peak. It is the baseline that never comes back down.',
  'Sorun genellikle tepe noktası değildir. Bir daha aşağı inmeyen taban düzeydir.')}</figcaption>
</figure>`;
}

/* Kalori: beklenen düşüş vs metabolik uyum sonrası gerçekleşen */
function calorieDiagram(lang) {
  const title = A(lang,
    'Predicted weight loss follows a straight line; actual loss flattens as intake is underestimated and energy expenditure adapts downward.',
    'Öngörülen kilo kaybı düz bir çizgi izler; alınan enerji olduğundan az tahmin edildiği ve harcama aşağı yönlü uyum sağladığı için gerçekleşen kayıp düzleşir.');
  return `<figure class="figure">
<svg class="diagram" viewBox="0 0 480 230" role="img" aria-labelledby="cl-t">
  <title id="cl-t">${title}</title>
  <line class="dg-axis" x1="52" y1="20" x2="52" y2="176"/>
  <line class="dg-axis" x1="52" y1="176" x2="462" y2="176"/>
  <line class="dg-grid" x1="52" y1="64" x2="462" y2="64"/>
  <line class="dg-grid" x1="52" y1="120" x2="462" y2="120"/>
  <path class="dg-line dg-line--dash dg-line--2" d="M52 30 462 168"/>
  <path class="dg-line dg-line--1" d="M52 30c60 40 96 62 132 78s84 24 140 28 92 4 138 4"/>
  <g class="dg-gap">
    <line x1="392" y1="140" x2="392" y2="106" class="dg-arrow"/>
    <text class="dg-tick" x="384" y="100" text-anchor="end">${A(lang, 'the gap', 'aradaki fark')}</text>
  </g>
  <text class="dg-tick" x="52" y="196">${A(lang, 'week 0', '0. hafta')}</text>
  <text class="dg-tick" x="462" y="196" text-anchor="end">${A(lang, 'week 24', '24. hafta')}</text>
  <g class="dg-legend">
    <line class="dg-line dg-line--dash dg-line--2" x1="60" y1="216" x2="86" y2="216"/>
    <text class="dg-tick" x="94" y="220">${A(lang, 'What the maths predicts', 'Hesabın öngördüğü')}</text>
    <line class="dg-line dg-line--1" x1="280" y1="216" x2="306" y2="216"/>
    <text class="dg-tick" x="314" y="220">${A(lang, 'What usually happens', 'Genelde olan')}</text>
  </g>
</svg>
<figcaption>${A(lang,
  'Both sides of the equation move — and they move towards each other.',
  'Denklemin iki tarafı da hareket eder — ve birbirine doğru hareket ederler.')}</figcaption>
</figure>`;
}

/* Hipnogram: gece boyunca uyku evreleri */
function hypnogramDiagram(lang) {
  const title = A(lang,
    'A hypnogram across one night: deep sleep dominates the first half, REM periods get longer towards morning.',
    'Bir gecelik hipnogram: derin uyku ilk yarıya hâkimdir, REM dönemleri sabaha doğru uzar.');
  const stages = [
    [A(lang, 'Awake', 'Uyanık'), 34],
    [A(lang, 'REM', 'REM'), 68],
    [A(lang, 'Light', 'Yüzeysel'), 102],
    [A(lang, 'Deep', 'Derin'), 136]
  ];
  const rows = stages.map(([n, y]) =>
    `<line class="dg-grid" x1="96" y1="${y}" x2="466" y2="${y}"/>` +
    `<text class="dg-tick" x="88" y="${y + 4}" text-anchor="end">${n}</text>`).join('');

  /* basamaklı yol: [x, y] köşe noktaları */
  const pts = [
    [96, 34], [112, 34], [112, 102], [140, 102], [140, 136], [186, 136],
    [186, 102], [206, 102], [206, 68], [228, 68], [228, 102], [258, 102],
    [258, 136], [292, 136], [292, 102], [312, 102], [312, 68], [344, 68],
    [344, 102], [372, 102], [372, 136], [386, 136], [386, 102], [404, 102],
    [404, 68], [438, 68], [438, 102], [452, 102], [452, 34], [466, 34]
  ];
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0] + ' ' + p[1]).join(' ');

  return `<figure class="figure">
<svg class="diagram" viewBox="0 0 480 200" role="img" aria-labelledby="hy-t">
  <title id="hy-t">${title}</title>
  <rect x="96" y="24" width="180" height="130" class="dg-zone dg-zone--deep"/>
  <rect x="276" y="24" width="190" height="130" class="dg-zone dg-zone--rem"/>
  <text class="dg-zone-label" x="186" y="18">${A(lang, 'deep-sleep half', 'derin uyku yarısı')}</text>
  <text class="dg-zone-label" x="371" y="18">${A(lang, 'REM-heavy half', 'REM ağırlıklı yarı')}</text>
  ${rows}
  <path class="dg-line dg-line--1" d="${d}"/>
  <text class="dg-tick" x="96" y="176">23:00</text>
  <text class="dg-tick" x="270" y="176">03:00</text>
  <text class="dg-tick" x="466" y="176" text-anchor="end">07:00</text>
</svg>
<figcaption>${A(lang,
  'Cutting the night short does not remove a slice of everything — it removes REM first.',
  'Geceyi kısa kesmek her şeyden eşit bir dilim almaz — önce REM’i alır.')}</figcaption>
</figure>`;
}

/* HRV: metronom gibi atan kalp vs sağlıklı değişken aralıklar */
function hrvDiagram(lang) {
  const title = A(lang,
    'Two heartbeat strips with the same average rate: the metronome-like one has low variability, the uneven one has high variability.',
    'Ortalama hızı aynı olan iki kalp atımı şeridi: metronom gibi olanın değişkenliği düşük, düzensiz olanınki yüksektir.');

  const beat = (x, y) =>
    `<path class="dg-line dg-line--1" d="M${x} ${y}l4-8 5 20 5-16 4 4"/>`;
  const even = [110, 160, 210, 260, 310, 360, 410].map((x) => beat(x, 56)).join('');
  const uneven = [110, 148, 206, 246, 316, 358, 424].map((x) => beat(x, 136)).join('');
  const gapMarks = (ys, xs) => xs.slice(0, -1).map((x, i) =>
    `<line class="dg-gap-line" x1="${x + 9}" y1="${ys}" x2="${xs[i + 1] + 9}" y2="${ys}"/>`).join('');

  return `<figure class="figure">
<svg class="diagram" viewBox="0 0 480 190" role="img" aria-labelledby="hv-t">
  <title id="hv-t">${title}</title>
  <text class="dg-axis-label" x="12" y="40">${A(lang, 'Low HRV', 'Düşük HRV')}</text>
  <line class="dg-grid" x1="96" y1="56" x2="466" y2="56"/>
  ${even}
  ${gapMarks(80, [110, 160, 210, 260, 310, 360, 410])}
  <text class="dg-tick" x="96" y="98">${A(lang, 'intervals nearly identical', 'aralıklar neredeyse aynı')}</text>

  <text class="dg-axis-label" x="12" y="120">${A(lang, 'High HRV', 'Yüksek HRV')}</text>
  <line class="dg-grid" x1="96" y1="136" x2="466" y2="136"/>
  ${uneven}
  ${gapMarks(160, [110, 148, 206, 246, 316, 358, 424])}
  <text class="dg-tick" x="96" y="180">${A(lang, 'intervals vary beat to beat', 'aralıklar atımdan atıma değişir')}</text>
</svg>
<figcaption>${A(lang,
  'Same average heart rate, different nervous systems. More variation is generally the better sign.',
  'Aynı ortalama kalp hızı, farklı sinir sistemleri. Daha fazla değişkenlik genellikle daha iyi işarettir.')}</figcaption>
</figure>`;
}

export const DIAGRAMS = {
  'chronic-stress-and-the-body': cortisolDiagram,
  'why-calorie-counting-fails': calorieDiagram,
  'sleep-cycles-explained': hypnogramDiagram,
  'heart-rate-variability': hrvDiagram
};

/* ---------------------------------------------------------------
   5. TEST SAYFASI — örnek soru maketi
   --------------------------------------------------------------- */

export function sampleScale(question, lowLabel, highLabel, marked = 7) {
  const cells = Array.from({ length: 10 }, (_, i) => {
    const v = i + 1;
    return `<span class="sample-cell${v === marked ? ' is-on' : ''}" aria-hidden="true">${v}</span>`;
  }).join('');
  return `<div class="sample-q">
  <p class="sample-q__text">${question}</p>
  <div class="sample-q__legend"><span>${lowLabel}</span><span>${highLabel}</span></div>
  <div class="sample-q__scale">${cells}</div>
</div>`;
}

/* ---------------------------------------------------------------
   6. OG GÖRSELİ — kaynak SVG (tools/og.mjs bunu PNG'ye çevirir)
   --------------------------------------------------------------- */

export function ogCategoryMark(id) {
  return ILLUSTRATIONS[id] || ILLUSTRATIONS.sleep;
}

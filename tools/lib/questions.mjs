/* Soru bankalarını derleme biçimine çevirir.

   Kaynak `tools/content-questions.mjs`; soru başına tek nesne tutar.
   Tarayıcıya giden `assets/js/data/<test>.js` ise paralel diziler
   kullanır (küçük ve hızlı). Dönüşüm burada, tek yerde yapılır —
   böylece `reverse` ve `quick` indeksleri elle yazılmaz, dolayısıyla
   kayamaz.

   Not: eski sürümde bu dosya üretilmiş `.js` dosyalarını okuyordu.
   Artık ters yönde çalışıyor: kaynak `tools/` içinde, üretilen dosyayı
   `build.mjs` yazıyor. */

import { BANKS } from '../content-questions.mjs';

export const TEST_IDS = Object.keys(BANKS);

/* content-questions biçimi → window.QUIZ_DATA biçimi */
function compile(id) {
  const bank = BANKS[id];
  const anchors = [];
  const anchorText = {};

  bank.q.forEach((q, i) => {
    if (typeof q.a === 'string') {
      anchors.push(q.a);
    } else {
      anchors.push(null);
      anchorText[i] = q.a;
    }
  });

  return {
    id,
    reverse: bank.q.map((q, i) => (q.r ? i : -1)).filter((i) => i >= 0),
    quick: bank.q.map((q, i) => (q.k ? i : -1)).filter((i) => i >= 0),
    anchors,
    anchorText,
    groups: bank.q.map((q) => q.d),
    groupNames: {
      en: Object.fromEntries(Object.entries(bank.domains).map(([k, v]) => [k, v.en])),
      tr: Object.fromEntries(Object.entries(bank.domains).map(([k, v]) => [k, v.tr]))
    },
    q: {
      en: bank.q.map((q) => q.en),
      tr: bank.q.map((q) => q.tr)
    }
  };
}

export const QUESTIONS = Object.fromEntries(TEST_IDS.map((id) => [id, compile(id)]));

/* Tarayıcıya yazılacak dosyanın gövdesi. */
export function dataFile(id) {
  return `/* ShenTechin MED — "${id}" soru bankası.
   ÜRETİLEN DOSYA. Elle düzenlemeyin; kaynağı tools/content-questions.mjs.
   Yeniden üretmek için: node tools/build.mjs */
window.QUIZ_DATA=${JSON.stringify(QUESTIONS[id])};
`;
}

/* Test tanıtım sayfasında gösterilecek örnek soru:
   kısa sürümün ilk sorusu — kullanıcı testi açtığında karşılaşacağı soru. */
export function sampleQuestion(id, lang) {
  const data = QUESTIONS[id];
  const qi = (data.quick && data.quick[0] !== undefined) ? data.quick[0] : 0;
  const list = data.q[lang] || data.q.en;
  return {
    index: qi, text: list[qi],
    anchorKey: (data.anchors && data.anchors[qi]) || 'freq',
    custom: data.anchorText && data.anchorText[qi]
  };
}

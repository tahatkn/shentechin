/* Soru bankalarını derleme sırasında okur.

   Veri dosyaları tarayıcı için yazıldığından `window.QUIZ_DATA = {...}`
   biçiminde. Burada sahte bir `window` ile çalıştırıp aynı nesneyi
   Node tarafında elde ediyoruz — böylece test tanıtım sayfasındaki
   örnek soru ile testin gerçek sorusu birbirinden ayrışamaz. */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const DATA_DIR = path.join(ROOT, 'assets/js/data');

export const TEST_IDS = ['sleep', 'skin', 'diet', 'stress', 'heart', 'focus', 'fitness', 'immunity', 'tech'];

function load(id) {
  const src = fs.readFileSync(path.join(DATA_DIR, `${id}.js`), 'utf8');
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(src, ctx, { filename: `${id}.js` });
  const data = ctx.window.QUIZ_DATA;
  if (!data || data.id !== id) throw new Error(`${id}.js beklenen QUIZ_DATA'yı vermedi`);
  return data;
}

export const QUESTIONS = Object.fromEntries(TEST_IDS.map((id) => [id, load(id)]));

/* Test tanıtım sayfasında gösterilecek örnek soru:
   kısa sürümün ilk sorusu — kullanıcı testi açtığında karşılaşacağı soru. */
export function sampleQuestion(id, lang) {
  const data = QUESTIONS[id];
  const qi = (data.quick && data.quick[0] !== undefined) ? data.quick[0] : 0;
  const list = data.q[lang] || data.q.en;
  return { index: qi, text: list[qi], anchorKey: (data.anchors && data.anchors[qi]) || 'freq',
           custom: data.anchorText && data.anchorText[qi] };
}

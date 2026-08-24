/* Bağımlılıksız, kasıtlı olarak muhafazakâr küçültücüler.
   Amaç agresif sıkıştırma değil; gzip'in zaten yaptığı işi tekrarlamadan
   kaynak dosyalardaki yorum ve girintiyi çıkarmak. Hiçbiri satır birleştirmez,
   dolayısıyla ASI (otomatik noktalı virgül) tuzağına düşmez. */

/* ---------- CSS ---------- */
/* Yorumları atar, boşlukları daraltır, gereksiz noktalı virgülleri siler.
   url(...) ve tırnak içi metinler korunur. */
export function minifyCss(src) {
  /* SIRA ÖNEMLİ: önce yorumlar, sonra tırnak koruması.
     Tersi yapılırsa bir yorum içindeki kesme işareti (örn. "CSS'ten")
     dize başlangıcı sanılır ve bir sonraki kesme işaretine kadar olan
     GERÇEK CSS sessizce yutulur. */
  let s = src.replace(/\/\*[\s\S]*?\*\//g, '');

  const strings = [];
  s = s.replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|url\([^)]*\)/g, (m) => {
    strings.push(m);
    return `\u0000${strings.length - 1}\u0000`;
  });

  s = s.replace(/\s+/g, ' ');
  /* DİKKAT: "+" ve "~" burada YOK.
     calc() ve clamp() içinde "1rem + 2vw" ifadesindeki boşluklar
     dilin bir parçasıdır; silinirse bildirim tümüyle geçersiz olur.
     ">" güvenli, çünkü yalnızca seçicilerde geçiyor. */
  s = s.replace(/\s*([{}:;,>])\s*/g, '$1');
  s = s.replace(/;}/g, '}');
  s = s.replace(/\s*!important/g, '!important');
  s = s.replace(/@media\(/g, '@media (');
  s = s.replace(/\band\(/g, 'and (');
  s = s.trim();

  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => strings[Number(i)]);
}

/* ---------- JS ---------- */
/* Yalnızca yorumları ve satır başı girintisini kaldırır; satırları
   birleştirmez. Tırnak, şablon dizesi ve regex içerikleri korunur. */
export function minifyJs(src) {
  let out = '';
  let i = 0;
  const n = src.length;
  let prevSignificant = '';

  const regexAllowedBefore = /[=(,:[!&|?{};+\-*/%~^<>]$/;

  while (i < n) {
    const c = src[i];
    const c2 = src[i + 1];

    /* satır yorumu */
    if (c === '/' && c2 === '/') {
      while (i < n && src[i] !== '\n') i++;
      continue;
    }
    /* blok yorumu */
    if (c === '/' && c2 === '*') {
      i += 2;
      while (i < n && !(src[i] === '*' && src[i + 1] === '/')) i++;
      i += 2;
      continue;
    }
    /* dizeler */
    if (c === '"' || c === "'" || c === '`') {
      const quote = c;
      let j = i + 1;
      while (j < n) {
        if (src[j] === '\\') { j += 2; continue; }
        if (src[j] === quote) break;
        j++;
      }
      const chunk = src.slice(i, j + 1);
      out += chunk;
      prevSignificant = quote;
      i = j + 1;
      continue;
    }
    /* regex literal */
    if (c === '/' && regexAllowedBefore.test(prevSignificant)) {
      let j = i + 1;
      let inClass = false;
      let ok = false;
      while (j < n) {
        const d = src[j];
        if (d === '\\') { j += 2; continue; }
        if (d === '\n') break;
        if (d === '[') inClass = true;
        else if (d === ']') inClass = false;
        else if (d === '/' && !inClass) { ok = true; break; }
        j++;
      }
      if (ok) {
        while (j + 1 < n && /[a-z]/.test(src[j + 1])) j++;
        out += src.slice(i, j + 1);
        prevSignificant = '/';
        i = j + 1;
        continue;
      }
    }

    out += c;
    if (!/\s/.test(c)) prevSignificant = c;
    i++;
  }

  return out
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join('\n');
}

/* ---------- HTML ---------- */
/* Yorumları ve satır başı girintisini kaldırır. Satır içi elemanlar arasındaki
   anlamlı tek boşluk korunur; yalnızca girinti ve boş satırlar gider. */
export function minifyHtml(src) {
  return src
    .replace(/<!--(?!\[if)[\s\S]*?-->/g, '')
    .split('\n')
    .map((line) => line.replace(/^[ \t]+/, ''))
    .filter((line) => line.length > 0)
    .join('\n');
}

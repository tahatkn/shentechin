/* Site haritası: her sayfanın iki dildeki kalıcı adresi tek yerde durur.
   Bağlantılar kök-mutlak (/about.html) üretilir; böylece sayfa hangi klasörde
   olursa olsun "../../" hesabı yapmak gerekmez ve dil değiştirici doğrudan
   karşılık gelen adrese bağlanabilir.

   İngilizce adresler ESKİ HÂLİYLE KALIR (zaten dizinlenmiş durumdalar).
   Türkçe taraf /tr/ altında ve Türkçe slug'larla yayınlanır. */

export const SITE = 'https://shentechin.com';
export const LANGS = ['en', 'tr'];

/* Test kimliği → Türkçe slug */
export const TEST_TR_SLUG = {
  sleep: 'uyku',
  skin: 'cilt',
  diet: 'beslenme',
  stress: 'stres',
  heart: 'kalp',
  focus: 'odaklanma',
  fitness: 'kondisyon',
  immunity: 'bagisiklik',
  tech: 'dijital-denge'
};

/* Makale slug'ı → Türkçe slug */
export const ARTICLE_TR_SLUG = {
  'chronic-stress-and-the-body': 'kronik-stres-ve-beden',
  'why-calorie-counting-fails': 'kalori-saymak-neden-yetmez',
  'sleep-cycles-explained': 'uyku-evreleri',
  'heart-rate-variability': 'kalp-hizi-degiskenligi'
};

/* Sabit sayfalar */
const STATIC = {
  home: { en: '', tr: 'tr/' },
  about: { en: 'about.html', tr: 'tr/hakkinda.html' },
  insights: { en: 'insights.html', tr: 'tr/yazilar.html' },
  quiz: { en: 'quiz.html', tr: 'tr/test.html' },
  result: { en: 'result.html', tr: 'tr/sonuc.html' },
  privacy: { en: 'privacy.html', tr: 'tr/gizlilik.html' },
  terms: { en: 'terms.html', tr: 'tr/kullanim-kosullari.html' },
  disclaimer: { en: 'disclaimer.html', tr: 'tr/tibbi-uyari.html' },
  notfound: { en: '404.html', tr: 'tr/404.html' }
};

/* Bir rotanın verilen dildeki yolu (site kökünden, baştaki / olmadan). */
export function routePath(kind, lang, slug) {
  if (kind === 'test') {
    return lang === 'tr' ? `tr/testler/${TEST_TR_SLUG[slug]}/` : `tests/${slug}/`;
  }
  if (kind === 'article') {
    return lang === 'tr' ? `tr/yazilar/${ARTICLE_TR_SLUG[slug]}/` : `insights/${slug}/`;
  }
  const r = STATIC[kind];
  if (!r) throw new Error(`Bilinmeyen rota: ${kind}`);
  return r[lang];
}

/* Sayfa içinde kullanılacak kök-mutlak bağlantı. */
export function url(kind, lang, slug) {
  return '/' + routePath(kind, lang, slug);
}

/* Diske yazılacak dosya yolu (dizin adresleri index.html alır). */
export function filePath(kind, lang, slug) {
  const p = routePath(kind, lang, slug);
  return p === '' || p.endsWith('/') ? `${p}index.html` : p;
}

/* Mutlak (canonical) adres. */
export function absUrl(kind, lang, slug) {
  return SITE + url(kind, lang, slug);
}

export const STATIC_KINDS = Object.keys(STATIC);

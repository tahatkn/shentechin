# ShenTechin Med

Statik site, GitHub Pages üzerinde `shentechin.com` adresinde yayında.
Derleme adımı sunucuda yok — repoya konan HTML doğrudan yayınlanır.

## Yerelde çalıştırma

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

`file://` ile açmayın: test verisi ve dil paketleri script olarak yüklendiği için
tarayıcı bunları dosya protokolünde engelleyebilir.

## Sayfaları yeniden üretme

`nav`, `footer`, `<head>` meta etiketleri ve SVG ikon seti 22 sayfada tekrar
ettiği için HTML dosyaları elle değil bir üreticiyle yazılıyor:

```bash
node tools/build.mjs
```

| Dosya | İçerik |
|---|---|
| `tools/build.mjs` | Sayfa şablonları + hangi sayfanın üretileceği |
| `tools/shell.mjs` | Ortak `<head>`, navigasyon, alt bilgi, meta/OG etiketleri |
| `tools/icons.mjs` | Satır içi SVG ikon seti (Font Awesome'ın yerine) |
| `tools/content-tests.mjs` | 9 test tanıtım sayfasının iki dilli metni |
| `tools/content-articles.mjs` | 4 makalenin iki dilli tam metni |
| `tools/content-legal.mjs` | Gizlilik, kullanım koşulları, tıbbi uyarı |

**Önemli:** Bu sayfaların içeriğini `tools/` altındaki dosyalardan düzenleyin.
Üretilen `.html` dosyalarını doğrudan düzenlerseniz, `build.mjs` bir sonraki
çalıştırmada değişikliğinizi silecektir.

`build.mjs` ayrıca `sitemap.xml` ve `robots.txt` dosyalarını da üretir.

## Arayüz metinleri (i18n)

Nav, ana sayfa, sonuç ekranı gibi kısa metinler `assets/js/i18n/*.js` içindeki
sözlüklerde tutulur ve HTML'de `data-i18n="anahtar"` ile işaretlenir.
Uzun metinli sayfalar (makale, yasal, test tanıtımı) bunun yerine
`data-lang="en" / data-lang="tr"` blokları kullanır; her iki dil de HTML
içindedir, `assets/js/i18n.js` yalnızca doğru olanı gösterir.

## Soru bankası ve puanlama

Her testin soruları `assets/js/data/<test>.js` içinde:

```js
window.QUIZ_DATA = {
  id: "sleep",
  reverse: [0, 1, 3, ...],   // yüksek cevabın SAĞLIK AÇISINDAN OLUMSUZ olduğu sorular
  quick:   [0, 1, 2, ...],   // kısa sürümde sorulan 10 sorunun indeksi
  q: { en: [...25 soru], tr: [...25 soru] }
};
```

`reverse` listesindeki sorular puanlanırken `11 - cevap` olarak çevrilir; bu
sayede "horlar mısınız?" ile "dinç uyanır mısınız?" aynı yöne bakar. Toplam,
0–100 aralığına normalize edilir (`(ham - n) / (9n)`), yani tüm cevaplar 1 iken
sonuç %10 değil %0 olur.

Soru metinlerini değiştirirseniz `reverse` listesinin hâlâ doğru olduğundan emin
olun — yanlış bir indeks sessizce yanlış puan üretir.

## Analitik

`assets/js/analytics.js` olayları toplar ama **varsayılan olarak hiçbir yere
göndermez.** Sayfaya Plausible, GA4 veya PostHog snippet'i eklerseniz olaylar
otomatik olarak oraya akar. Bir izleyici eklerseniz `tools/content-legal.mjs`
içindeki gizlilik politikasını da güncelleyin.

Olaylar: `quiz_started`, `quiz_question_answered`, `quiz_completed`,
`result_viewed`, `result_shared`, `language_changed`.
Tarayıcı konsolunda görmek için adrese `?stdebug=1` ekleyin.

## Değiştirmeniz gereken yer

`info@shentechin.com` adresi iki yerde geçiyor — çalışan bir adresle değiştirin:
`assets/js/result.js` (`CONTACT`) ve `tools/content-legal.mjs` (`CONTACT`).

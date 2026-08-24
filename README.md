# ShenTechin Med

Statik site, GitHub Pages üzerinde `shentechin.com` adresinde yayında.
Sunucuda derleme adımı yok — depoya konan HTML doğrudan yayınlanır.

Sitede **hiçbir üçüncü taraf isteği yok**: yazı tipleri, ikonlar ve çizimler
kendi alan adımızdan geliyor. Sayfalar CSS'i gömülü taşıdığı için ilk boyama
tek bir HTTP isteğiyle gerçekleşir.

## Yerelde çalıştırma

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

`file://` ile açmayın: soru bankaları ve sonuç metinleri script olarak
yüklendiği için tarayıcı bunları dosya protokolünde engeller.

Faydalı adres parametreleri:

| Parametre | İşe yarar |
|---|---|
| `?theme=dark` / `?theme=light` | Temayı zorlar (paylaşım ve test için) |
| `?stdebug=1` | Olay katmanını konsola yazar |
| `quiz.html?type=sleep&mode=full` | 25 soruluk sürüm |

## Günlük iş akışı

```bash
node tools/build.mjs          # bütün sayfaları üret   (~1 sn)
node --test tools/check.mjs   # 33 doğrulama testi     (~1 sn)
node tools/visual.mjs --smoke # gerçek tarayıcıda duman testi (~40 sn)
```

Bir şeyi değiştirdikten sonra bu üçünü çalıştırın. `check.mjs` yeşilse
puanlama, çeviriler, bağlantılar, meta etiketler ve performans bütçesi
yerindedir.

## Sayfalar nereden üretiliyor

`nav`, `footer`, `<head>`, ikon seti ve gömülü CSS 44 sayfada tekrar ettiği
için HTML dosyaları elle değil bir üreticiyle yazılıyor.

| Dosya | İçerik |
|---|---|
| `tools/build.mjs` | Sayfa şablonları ve hangi sayfanın üretileceği |
| `tools/shell.mjs` | Ortak `<head>`, nav, alt bilgi, meta/OG/JSON-LD |
| `tools/i18n.mjs` | Bütün arayüz metinleri (EN + TR) |
| `tools/illustrations.mjs` | Kategori çizimleri, hero animasyonu, makale diyagramları |
| `tools/icons.mjs` | Satır içi SVG ikon seti |
| `tools/content-tests.mjs` | 9 test tanıtım sayfasının iki dilli metni |
| `tools/content-articles.mjs` | 4 makalenin iki dilli tam metni |
| `tools/content-legal.mjs` | Gizlilik, kullanım koşulları, tıbbi uyarı |
| `tools/content-results.mjs` | Sonuç ekranındaki bant metinleri |
| `tools/lib/routes.mjs` | İki dilli adres haritası (tek doğruluk kaynağı) |
| `tools/lib/minify.mjs` | Bağımlılıksız CSS/JS/HTML küçültücü |
| `tools/lib/questions.mjs` | Soru bankalarını derleme sırasında okur |

**Önemli:** İçeriği `tools/` altındaki dosyalardan düzenleyin. Üretilen
`.html` dosyalarını doğrudan düzenlerseniz `build.mjs` bir sonraki
çalıştırmada değişikliğinizi siler.

`build.mjs` ayrıca `sitemap.xml`, `robots.txt`, `sw.js` ve
`site.webmanifest` dosyalarını da üretir.

## İki dillilik

Çeviri **derleme sırasında** uygulanır; tarayıcıda dil değiştiren bir script
yoktur. Her sayfa tek dilde, hazır metinle diske yazılır:

```
İngilizce   /                  /about.html      /tests/sleep/
Türkçe      /tr/               /tr/hakkinda.html /tr/testler/uyku/
```

Böylece arama motoru Türkçe içeriği görür, ilk boyamadan önce çalışan
engelleyici bir script kalmaz ve metin sıçraması (FOUC) diye bir sorun olmaz.
Sayfalar birbirine `hreflang` ile bağlıdır; dil düğmesi karşılık gelen
adrese giden gerçek bir bağlantıdır.

Yeni bir metin eklerken `tools/i18n.mjs` içine **iki dilde birden** yazın —
`check.mjs` eksik anahtarı ve çevrilmemiş (EN ile birebir aynı) metni
hata olarak bildirir.

Yalnızca JavaScript'in ürettiği metinler (test soruları, sonuç ekranı)
ilgili sayfaya küçük bir sözlük olarak gömülür: `RUNTIME_KEYS`.

## Soru bankası ve puanlama

Her testin soruları `assets/js/data/<test>.js` içinde:

```js
window.QUIZ_DATA = {
  id: "sleep",
  reverse: [0, 1, 3, ...],      // yüksek cevabın SAĞLIK AÇISINDAN OLUMSUZ olduğu sorular
  quick:   [0, 1, 2, ...],      // kısa sürümde sorulan 10 sorunun indeksi
  anchors: ["freq", null, ...], // her sorunun 1 ve 10 uçlarının adı
  anchorText: { 0: { en: {low, high}, tr: {low, high} } },  // soruya özel uçlar
  groups:  ["onset", "room", ...],   // sonuç ekranındaki alan kırılımı
  groupNames: { en: {...}, tr: {...} },
  q: { en: [...25 soru], tr: [...25 soru] }
};
```

`reverse` listesindeki sorular puanlanırken `11 - cevap` olarak çevrilir; bu
sayede "horlar mısınız?" ile "dinç uyanır mısınız?" aynı yöne bakar. Toplam
`(ham - n) / (9n)` ile 0–100 aralığına normalize edilir, yani tüm cevaplar 1
iken sonuç %10 değil %0 olur.

`anchors` değerleri `tools/i18n.mjs` içindeki `scale_<ad>_low/high`
anahtarlarına karşılık gelir: `freq`, `amount`, `quality`, `agree`,
`regular`, `long`, `easy`, `comfort`, `lowhigh`, `speed`.

Soru metinlerini değiştirirseniz `reverse` listesinin hâlâ doğru olduğundan
emin olun — yanlış bir indeks sessizce yanlış puan üretir. `check.mjs`
yönü (ters soruda yüksek cevap puanı düşürmeli) ve uç değerleri
(hepsi 1 → %0, hepsi 10 → %100) denetler.

## Sonuç sayfası

- Cevaplar sonuç sayfasına taşınır; puanın hangi alanlardan geldiği ve
  puanı en çok düşüren üç cevap oradan çıkar.
- Sonuç bağlantısı cevapları adresin `#` sonrasında kodlar
  (`#r=sleep.q.8735a27615`). Tarayıcılar bu bölümü sunucuya göndermez;
  paylaşım tamamen istemci tarafındadır. Bunu gizlilik politikası anlatıyor.
- "Görsel olarak kaydet" kartı `<canvas>` ile tarayıcıda çizilir.
- Geçmiş `localStorage`'da, test başına en fazla 12 kayıt tutulur.

## Görseller

Kategori çizimleri, hero animasyonu ve makale diyagramları
`tools/illustrations.mjs` içinde elle yazılmış satır içi SVG'dir. Çizgiler
`currentColor` ile çizilir, dolgular onun düşük opaklıklı hâlidir; böylece
her çizim bulunduğu kartın ton rengini alır ve koyu temada ayrıca
uğraşmadan doğru görünür.

Sosyal paylaşım görselleri **isteğe bağlı** bir adımla üretilir:

```bash
node tools/og.mjs      # ImageMagick + tools/fonts/*.ttf gerektirir
node tools/build.mjs   # sayfalar üretilen görselleri kullanmaya başlar
```

`build.mjs` bu görselleri üretmez, yalnızca diskte varsa kullanır; yoksa
`assets/img/og-default.png` dosyasına düşer. Böylece site ImageMagick
kurulu olmayan bir makinede de derlenir.

## Tema

Açık/koyu seçimi `<html data-theme>` ile yapılır. Sıra:
adresteki `?theme=` › kullanıcının kaydettiği seçim › sistem tercihi.
Seçimi boyamadan önce uygulayan küçük satır içi script, sayfadaki tek
engelleyici script'tir.

Renkler `assets/css/src/core.css` içindeki token'lardan gelir. Doğrudan
hex yazmayın; `--fg`, `--bg-elev`, `--brand`, `--tone` gibi token'ları
kullanın ki koyu tema kendiliğinden doğru olsun.

## Çevrimdışı çalışma

`sw.js` her derlemede yeniden yazılır ve sürüm damgası kaynak dosyaların
boyutundan türetilir; içerik değişince eski önbellek otomatik temizlenir.
Sayfalar önce ağdan alınır (taze içerik), varlıklar önbellekten anında
verilip arka planda tazelenir.

## Testler

```bash
node --test tools/check.mjs
```

33 test; puanlama, soru bankası bütünlüğü, çeviri paritesi, üretilen
sayfaların meta etiketleri, iç bağlantılar, sitemap, erişilebilirlik
işaretleri ve performans bütçesi.

Performans bütçesi (aşılırsa test kırmızı olur):

| Ölçü | Sınır |
|---|---|
| Sayfa (gzip, CSS gömülü) | 16 KB |
| Tek JS dosyası (gzip) | 8 KB |
| İki yazı tipi alt kümesi | 60 KB |
| Sosyal görsel | 40 KB |
| `<head>` içinde engelleyici script | 0 |
| Üçüncü taraf istek | 0 |

## Görsel regresyon

```bash
node tools/visual.mjs --smoke    # yalnızca DOM denetimleri (hızlı)
node tools/visual.mjs            # referanslarla piksel karşılaştırması
node tools/visual.mjs --update   # referansları yenile
node tools/visual.mjs --only=quiz,result
```

Playwright kurmaz; makinede zaten yüklü olan Chrome'u headless çağırır ve
PNG karşılaştırmasını kendi içinde yapar. Referanslar `tools/baseline/`
altında; ilk çalıştırmada üretilir.

Bilinen sınır: macOS'ta headless Chrome görüntü alanını 500 CSS pikselin
altına indirmiyor, bu yüzden "dar" sütun 500 px. 500 px, `≤900` ve `≤620`
kırılımlarını tetikler; yalnızca `≤380`e özel kurallar burada denetlenmez.

## Analitik

`assets/js/app.js` içindeki olay katmanı olayları toplar ama **varsayılan
olarak hiçbir yere göndermez.** Sayfaya Plausible, GA4 veya PostHog
snippet'i eklerseniz olaylar otomatik oraya akar. Bir izleyici eklerseniz
`tools/content-legal.mjs` içindeki gizlilik politikasını da güncelleyin —
şu an "üçüncü taraf yok" diyor.

## Değiştirmeniz gereken yer

`info@shentechin.com` adresi iki yerde geçiyor — çalışan bir adresle
değiştirin: `assets/js/result.js` (`CONTACT`) ve `tools/content-legal.mjs`
(`CONTACT`).

# ShenTechin MED

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
| `quiz.html?type=sleep` | 25 soruluk tam sürüm (varsayılan) |
| `quiz.html?type=sleep&mode=quick` | 10 soruluk kısa sürüm |
| `result.html#r=sleep.f.<25 karakter>` | Hazır bir rapor açar |

## Günlük iş akışı

```bash
node tools/build.mjs          # bütün sayfaları üret   (~1 sn)
node --test tools/check.mjs   # 53 doğrulama testi     (~1 sn)
node tools/visual.mjs --smoke # gerçek tarayıcıda duman testi (~40 sn)
```

Bir şeyi değiştirdikten sonra bu üçünü çalıştırın. `check.mjs` yeşilse
puanlama, çeviriler, bağlantılar, meta etiketler, ikonlar, bilimsel katman
ve performans bütçesi yerindedir.

## Sayfalar nereden üretiliyor

`nav`, `footer`, `<head>`, ikon seti ve gömülü CSS 46 sayfada tekrar ettiği
için HTML dosyaları elle değil bir üreticiyle yazılıyor.

| Dosya | İçerik |
|---|---|
| `tools/build.mjs` | Sayfa şablonları ve hangi sayfanın üretileceği |
| `tools/shell.mjs` | Ortak `<head>`, nav, alt bilgi, meta/OG/JSON-LD |
| `tools/i18n.mjs` | Bütün arayüz metinleri (EN + TR) |
| `tools/content-questions.mjs` | **9 testin 25'er sorusu — tek doğruluk kaynağı** |
| `tools/content-science.mjs` | **Alan analizleri, soru başına eylem, uyarı kuralları, kaynaklar** |
| `tools/content-tests.mjs` | 9 test tanıtım sayfasının iki dilli metni |
| `tools/content-articles.mjs` | 4 makalenin iki dilli tam metni ve kaynakları |
| `tools/content-legal.mjs` | Gizlilik, kullanım koşulları, tıbbi uyarı |
| `tools/content-results.mjs` | Sonuç ekranındaki bant metinleri |
| `tools/illustrations.mjs` | Kategori çizimleri, hero animasyonu, makale diyagramları |
| `tools/icons.mjs` | Satır içi SVG ikon seti |
| `tools/favicon.mjs` | favicon.ico ve PNG ikon seti üretici (isteğe bağlı adım) |
| `tools/lib/routes.mjs` | İki dilli adres haritası (tek doğruluk kaynağı) |
| `tools/lib/minify.mjs` | Bağımlılıksız CSS/JS/HTML küçültücü |
| `tools/lib/questions.mjs` | Soru bankasını tarayıcı biçimine çevirir |

**Önemli:** İçeriği `tools/` altındaki dosyalardan düzenleyin. Üretilen
`.html`, `assets/js/data/*.js` ve `assets/js/results/*.js` dosyalarını
doğrudan düzenlerseniz `build.mjs` bir sonraki çalıştırmada değişikliğinizi
siler — `check.mjs` bunu ayrıca bir hata olarak bildirir.

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

Kaynak `tools/content-questions.mjs`. Her testte **5 alan × 5 soru = 25 soru**
var; kısa sürüm her alandan 2 soru alır (10 soru). Soru başına tek bir nesne
tutulur:

```js
{ d:'onset',            // alan (sonuç ekranındaki kırılım)
  a:'freq',             // ölçek ucu: i18n anahtarı ya da {en:{low,high},tr:{…}}
  r:true,               // ters kodlu: yüksek cevap SAĞLIK AÇISINDAN OLUMSUZ
  k:true,               // kısa sürümde de sorulur
  src:'ISI madde 2',    // dayandığı ölçek — sayfada görünmez
  en:'…', tr:'…' }
```

`build.mjs` bunu `assets/js/data/<test>.js` içindeki paralel dizi biçimine
çevirir. `reverse` ve `quick` indeksleri **elle yazılmaz**, `r` ve `k`
bayraklarından türetilir — eskiden puanı sessizce ters çeviren en büyük
risk buydu.

Puanlama: ters kodlu sorular `11 - cevap` olarak çevrilir, toplam
`(ham - n) / (9n)` ile 0–100 aralığına normalize edilir. `check.mjs` yönü
(ters soruda yüksek cevap puanı düşürmeli) ve uç değerleri denetler.

`a` değerleri `tools/i18n.mjs` içindeki `scale_<ad>_low/high` anahtarlarına
karşılık gelir: `freq`, `amount`, `quality`, `agree`, `regular`, `long`,
`easy`, `comfort`, `lowhigh`, `speed`.

## Bilimsel katman

`tools/content-science.mjs` raporun kişiye özel kısmını taşır. Test başına:

| Alan | İçerik |
|---|---|
| `basis` | Testin hangi ölçeklerden uyarlandığı (PSQI, ISI, ESS, PSS-10, MEDAS, LE8 …) |
| `refs` | PubMed kimliğiyle kaynaklar — **57 PMID'in tamamı E-utilities ile doğrulandı** |
| `domains` | Alan başına: ne ölçüyor, düşükse ne yapılır, yüksekse ne korunur |
| `actions` | **Soru başına** eylem (`do`) ve gerekçe (`why`) |
| `flags` | Belirli cevap bileşimlerinde hekime yönlendirme |

Sonuç sayfası, puanı en çok düşüren cevapları alır ve **yalnızca onların**
eylemini gösterir; raporun kişiye özel olmasının sebebi budur. İki kişi aynı
toplam puanı alsa bile farklı bir plan görür.

`flags` biçimi: `{ q:[soru indeksleri], at:eşik, need:kaç tanesi }`. Eşik
puanlanmış değere göredir (ters kodlu sorular çevrildikten sonra; 1 en kötü,
10 en iyi). Kısa sürümde sorulmamış sorular sayıma girmez.

**Kural:** kaynağı olmayan sayısal iddia yazmayın. Bir sayı veriliyorsa
(dakika, saat, porsiyon, eşik) arkasında `refs` içindeki bir çalışma ya da
kılavuz olmalı. `check.mjs` PMID biçimini, tekrarı ve künyede yıl olmasını
denetler; yeni bir PMID eklerken gerçekten var olduğunu doğrulayın:

```bash
curl -s "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id=26039963" | head
```

## Sonuç sayfası

- **Eylem planı** — en zayıf 5 cevap, her biri için ne yapılacağı ve neden.
- **Hekime danışmaya değer** — kural tabanlı; tanı koymaz, örüntü eşler.
- **Puan nereden geldi** — 5 alanın her biri için puan, ne ölçtüğü ve o
  düzeyde ne yapılacağı.
- **Lehinize çalışanlar** — 8 ve üzeri puan alan cevaplar.
- **Bu değerlendirme neye dayanıyor** — ölçek listesi ve PubMed bağlantıları.
- Sonuç bağlantısı cevapları adresin `#` sonrasında kodlar
  (`#r=sleep.f.3666686668699669662296664`). Tarayıcılar bu bölümü sunucuya
  göndermez; paylaşım tamamen istemci tarafındadır.
- "Görsel olarak kaydet" kartı `<canvas>` ile tarayıcıda çizilir.
- Geçmiş `localStorage`'da, test başına en fazla 12 kayıt tutulur.

## İkonlar (arama sonucundaki site ikonu)

Google, arama sonucunda ikon gösterebilmek için `/favicon.ico` adresinde
gerçek bir dosya ve 48 pikselin katı boyutlarda PNG bekler. Yalnızca SVG
ikonu olan siteler çoğu zaman ikonsuz çıkar.

```bash
node tools/favicon.mjs   # Chrome + ImageMagick gerektirir
```

Üretilenler (hepsi depoya işlenir, derleme bunlara bağımlı değildir):
`favicon.ico` (16+32+48), `favicon-96x96.png`, `icon-192.png`,
`icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png`,
`favicon.svg`.

`check.mjs` altı ayrı testle şunu denetler: dosyalar diskte mi, ICO gerçekten
48 pikseli içeriyor mu, her sayfa doğru `<link>` etiketlerini taşıyor mu,
manifest var olmayan bir dosyayı gösteriyor mu ve `robots.txt` ikonları
engelliyor mu.

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

53 test; puanlama, soru bankası yapısı, bilimsel katmanın bütünlüğü,
üretilen dosyaların kaynakla eşleşmesi, çeviri paritesi, meta etiketler,
ikonlar, iç bağlantılar, sitemap, erişilebilirlik ve performans bütçesi.

Performans bütçesi (aşılırsa test kırmızı olur):

| Ölçü | Sınır |
|---|---|
| Sayfa (gzip, CSS gömülü) | 16 KB |
| `app.js` (gzip) | 4,5 KB |
| `quiz.js` (gzip) | 6 KB |
| `result.js` (gzip) | 12 KB |
| Test başına soru bankası (gzip) | 4 KB |
| Test başına rapor metni (gzip) | 8 KB |
| İki yazı tipi alt kümesi | 60 KB |
| Sosyal görsel | 40 KB |
| `<head>` içinde engelleyici script | 0 |
| Üçüncü taraf istek | 0 |

## Görsel regresyon

```bash
node tools/visual.mjs --smoke    # yalnızca DOM denetimleri (hızlı)
node tools/visual.mjs            # 80 referansla piksel karşılaştırması
node tools/visual.mjs --update   # referansları yenile
node tools/visual.mjs --only=report,quiz
```

Playwright kurmaz; makinede zaten yüklü olan Chrome'u headless çağırır ve
PNG karşılaştırmasını kendi içinde yapar. Referanslar `tools/baseline/`
altında.

DOM duman testleri ayrıca şunları denetler: tam raporun eylem planını ve
kaynakları çizmesi, hekim uyarısının doğru cevap bileşiminde tetiklenmesi
ve temiz cevaplarda tetiklenmemesi.

Bilinen sınır: macOS'ta headless Chrome görüntü alanını 500 CSS pikselin
altına indirmiyor, bu yüzden "dar" sütun 500 px.

## Analitik

`assets/js/app.js` içindeki olay katmanı olayları toplar ama **varsayılan
olarak hiçbir yere göndermez.** Bir izleyici eklerseniz
`tools/content-legal.mjs` içindeki gizlilik politikasını da güncelleyin —
şu an "üçüncü taraf yok" diyor.

## Değiştirmeniz gereken yer

`info@shentechin.com` adresi iki yerde geçiyor — çalışan bir adresle
değiştirin: `assets/js/result.js` (`CONTACT`) ve `tools/content-legal.mjs`
(`CONTACT`).

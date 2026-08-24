/* Gizlilik, kullanım koşulları ve tıbbi uyarı sayfalarının metni.
   İçerik sitenin GERÇEKTE yaptığını anlatır: sunucu yok, hesap yok,
   veriler tarayıcıda. Siteye izleyici veya form eklerseniz burayı güncelleyin. */
const CONTACT = 'info@shentechin.com';
const UPDATED_EN = '21 August 2026';
const UPDATED_TR = '21 Ağustos 2026';

export const LEGAL = [
{ slug:'disclaimer', icon:'alert-triangle', active:null,
  en:{ title:'Medical Disclaimer — ShenTechin MED',
    desc:'ShenTechin MED provides educational self-assessments only. They are not medical advice, not a diagnosis, and not a substitute for professional care.',
    h1:'Medical Disclaimer', updated:UPDATED_EN,
    body:`<div class="callout warn"><p><strong>If you are experiencing a medical emergency, stop reading and call your local emergency number (112 in Türkiye).</strong> Do not use this website to assess an urgent problem.</p></div>

<h2>These assessments are not medical tests</h2>
<p>Everything on ShenTechin MED is provided for general education and self-reflection. The assessments ask you to rate your own habits on a scale and then add up your answers. That is the whole mechanism. They cannot examine you, measure anything, or detect a disease.</p>

<h2>What they are not</h2>
<ul>
<li><strong>Not a diagnosis.</strong> No result on this site diagnoses any condition, and no result should be read as ruling one out either.</li>
<li><strong>Not validated clinical instruments.</strong> These questionnaires were written for this website. They are not standardised, validated or clinically tested screening tools, and they have not been compared against any clinical reference.</li>
<li><strong>Not personalised medical advice.</strong> The result text is written in advance for a score range. It is not tailored to you, your history, your medication or your circumstances.</li>
<li><strong>Not population statistics.</strong> We do not compare your score to any population, because we hold no such data.</li>
<li><strong>Not AI-generated.</strong> There is no model interpreting your answers. Your score is arithmetic and the accompanying text is pre-written.</li>
</ul>

<h2>No doctor–patient relationship</h2>
<p>Using this website does not create a doctor–patient relationship between you and anyone associated with ShenTechin MED. Content written or reviewed by a medical doctor is still general information, not treatment of you specifically.</p>

<h2>Please do not delay care</h2>
<p>Never disregard professional medical advice, or delay seeking it, because of something you read here or because of a score you received. If you have a symptom that worries you, a healthcare professional is the correct place to take it.</p>
<p>Some symptoms need direct medical attention rather than a questionnaire — including chest pain or tightness, breathlessness on mild effort, fainting, palpitations, unexplained weight loss, persistent fatigue lasting weeks, a wound that will not heal, and any thought of harming yourself.</p>

<h2>Accuracy and changes</h2>
<p>We try to keep the content correct and current, but we make no warranty that it is complete, accurate or applicable to your situation. Medical understanding changes; pages here may not be updated at the same pace. Content may be changed or removed at any time without notice.</p>

<h2>Questions</h2>
<p>Write to <a href="mailto:${CONTACT}">${CONTACT}</a>. Please note we cannot give personal medical advice by email and will not attempt to.</p>` },
  tr:{ title:'Tıbbi Uyarı — ShenTechin MED',
    desc:'ShenTechin MED yalnızca eğitim amaçlı öz-değerlendirmeler sunar. Bunlar tıbbi tavsiye değildir, teşhis değildir ve profesyonel bakımın yerini tutmaz.',
    h1:'Tıbbi Uyarı', updated:UPDATED_TR,
    body:`<div class="callout warn"><p><strong>Acil bir tıbbi durum yaşıyorsanız okumayı bırakın ve 112'yi arayın.</strong> Acil bir sorunu değerlendirmek için bu web sitesini kullanmayın.</p></div>

<h2>Bu değerlendirmeler tıbbi test değildir</h2>
<p>ShenTechin MED'deki her şey genel bilgilendirme ve öz-değerlendirme amacıyla sunulur. Testler kendi alışkanlıklarınızı bir ölçek üzerinde puanlamanızı ister ve cevaplarınızı toplar. Mekanizmanın tamamı budur. Sizi muayene edemez, bir şey ölçemez veya bir hastalık saptayamazlar.</p>

<h2>Ne değildirler</h2>
<ul>
<li><strong>Teşhis değildir.</strong> Bu sitedeki hiçbir sonuç herhangi bir hastalığa tanı koymaz; hiçbir sonuç bir hastalığı dışladı biçiminde de okunmamalıdır.</li>
<li><strong>Doğrulanmış klinik ölçüm araçları değildir.</strong> Bu anketler bu web sitesi için yazılmıştır. Standardize edilmiş, valide edilmiş veya klinik olarak test edilmiş tarama araçları değildir ve herhangi bir klinik referansla karşılaştırılmamıştır.</li>
<li><strong>Kişiye özel tıbbi tavsiye değildir.</strong> Sonuç metni bir puan aralığı için önceden yazılmıştır. Size, geçmişinize, ilaçlarınıza veya koşullarınıza göre uyarlanmamıştır.</li>
<li><strong>Toplum istatistiği değildir.</strong> Puanınızı hiçbir toplumla karşılaştırmıyoruz, çünkü elimizde böyle bir veri yok.</li>
<li><strong>Yapay zekâ üretimi değildir.</strong> Cevaplarınızı yorumlayan bir model yoktur. Puanınız aritmetiktir ve yanındaki metin önceden yazılmıştır.</li>
</ul>

<h2>Hekim–hasta ilişkisi doğmaz</h2>
<p>Bu web sitesini kullanmanız, sizinle ShenTechin MED ile ilişkili herhangi bir kişi arasında hekim–hasta ilişkisi doğurmaz. Bir hekim tarafından yazılmış veya gözden geçirilmiş içerik de genel bilgidir; özel olarak sizin tedaviniz değildir.</p>

<h2>Lütfen başvurunuzu geciktirmeyin</h2>
<p>Burada okuduğunuz bir şey ya da aldığınız bir puan nedeniyle profesyonel tıbbi tavsiyeyi asla göz ardı etmeyin ve başvurmayı ertelemeyin. Sizi endişelendiren bir belirtiniz varsa, onu götüreceğiniz doğru yer bir sağlık profesyonelidir.</p>
<p>Bazı belirtiler anket değil doğrudan tıbbi değerlendirme gerektirir — göğüs ağrısı veya sıkışma, hafif eforda nefes darlığı, bayılma, çarpıntı, açıklanamayan kilo kaybı, haftalarca süren yorgunluk, iyileşmeyen bir yara ve kendinize zarar verme düşüncesi dâhil.</p>

<h2>Doğruluk ve değişiklikler</h2>
<p>İçeriği doğru ve güncel tutmaya çalışıyoruz, ancak eksiksiz, doğru veya sizin durumunuza uygun olduğuna dair hiçbir garanti vermiyoruz. Tıbbi bilgi değişir; buradaki sayfalar aynı hızda güncellenmeyebilir. İçerik önceden haber verilmeksizin her zaman değiştirilebilir veya kaldırılabilir.</p>

<h2>Sorular</h2>
<p><a href="mailto:${CONTACT}">${CONTACT}</a> adresine yazabilirsiniz. E-posta ile kişiye özel tıbbi tavsiye veremediğimizi ve vermeye çalışmayacağımızı lütfen not edin.</p>` }},

{ slug:'privacy', icon:'lock', active:null,
  en:{ title:'Privacy Policy — ShenTechin MED',
    desc:'What ShenTechin MED stores (almost nothing), where it is stored (your own browser), and the third parties involved.',
    h1:'Privacy Policy', updated:UPDATED_EN,
    body:`<p>ShenTechin MED is a static website with no server-side application, no user accounts and no database. This policy describes exactly what happens to information when you use it.</p>

<h2>What we collect</h2>
<p><strong>Nothing is sent to us.</strong> There is no sign-up, no contact form and no back end to receive data. Your answers to the assessments, your score and your language choice never leave your device by any mechanism we control.</p>

<h2>What is stored in your browser</h2>
<p>We use your browser's <code>localStorage</code> — not cookies — to remember three things:</p>
<ul>
<li><code>selectedLang</code> — whether you chose English or Turkish.</li>
<li><code>stq:progress:…</code> — an unfinished assessment, so you can close the tab and continue later.</li>
<li><code>stq:result</code> — your most recent score, so the result page can display it.</li>
</ul>
<p>This data stays on your device, is readable only by this website, and can be removed at any time by clearing site data in your browser settings. Using private/incognito mode clears it when you close the window.</p>

<h2>Third parties</h2>
<p>One third party necessarily sees a technical record of your visit:</p>
<ul>
<li><strong>GitHub Pages</strong> hosts this site. As with any web host, GitHub's servers process your IP address and browser user-agent in order to deliver the pages, and may retain them in server logs. We have no access to those logs.</li>
</ul>
<p>The typeface is served from this domain, not from Google Fonts, so loading a page contacts no other company. There are no embedded videos, maps, comment systems or social widgets.</p>
<p>We do not run advertising, we do not embed social media widgets, and we do not use tracking pixels.</p>

<h2>Analytics</h2>
<p>The site contains an internal event layer that records actions such as "an assessment was started" in the page's memory. <strong>At the time of writing, no analytics provider is connected</strong>, so these events are not transmitted anywhere and disappear when you close the tab. If we ever connect one, this policy will be updated before it goes live and the relevant consent requirements will be met.</p>

<h2>Sharing</h2>
<p>The result page offers buttons to share your score on X or WhatsApp, through your device's own share sheet, or as a copied link. Nothing is shared unless you press one of those buttons.</p>
<p>A shared link carries your answers encoded in the part of the address after the <code>#</code>. Browsers never transmit that part to a server, so the answers travel only inside the message you send &mdash; but anyone holding the link can open the same result. Treat it like any other personal message. The &ldquo;save as image&rdquo; button draws the card in your browser and saves it to your device; it is not uploaded anywhere.</p>

<h2>Your rights</h2>
<p>Under Turkish data protection law (KVKK) and, for visitors in the EU/EEA, the GDPR, you have rights of access, rectification, erasure and objection regarding personal data held about you. Because we hold no personal data about you on any server, there is nothing for us to retrieve, correct or delete — and you can erase everything this site has stored by clearing your browser data. If you would like to exercise a right or ask a question, write to <a href="mailto:${CONTACT}">${CONTACT}</a>.</p>

<h2>Children</h2>
<p>This site is not directed at children and the content assumes an adult reader. We do not knowingly collect information from anyone, including children.</p>

<h2>Changes</h2>
<p>If this policy changes, the date at the top of this page changes with it. Material changes — in particular, connecting any analytics or advertising service — will be reflected here before they take effect.</p>` },
  tr:{ title:'Gizlilik Politikası — ShenTechin MED',
    desc:'ShenTechin MED neyi saklıyor (neredeyse hiçbir şey), nerede saklıyor (kendi tarayıcınızda) ve devreye giren üçüncü taraflar.',
    h1:'Gizlilik Politikası', updated:UPDATED_TR,
    body:`<p>ShenTechin MED; sunucu tarafı uygulaması, kullanıcı hesabı ve veritabanı olmayan statik bir web sitesidir. Bu politika, siteyi kullandığınızda bilgilere tam olarak ne olduğunu anlatır.</p>

<h2>Ne topluyoruz</h2>
<p><strong>Bize hiçbir şey gönderilmiyor.</strong> Kayıt yok, iletişim formu yok ve veri alacak bir arka uç yok. Testlere verdiğiniz cevaplar, puanınız ve dil tercihiniz, bizim kontrol ettiğimiz hiçbir mekanizmayla cihazınızdan çıkmıyor.</p>

<h2>Tarayıcınızda ne saklanıyor</h2>
<p>Üç şeyi hatırlamak için tarayıcınızın <code>localStorage</code> alanını kullanıyoruz — çerez değil:</p>
<ul>
<li><code>selectedLang</code> — İngilizce mi Türkçe mi seçtiğiniz.</li>
<li><code>stq:progress:…</code> — yarım kalan bir değerlendirme; sekmeyi kapatıp sonra devam edebilesiniz diye.</li>
<li><code>stq:result</code> — en son puanınız; sonuç sayfası gösterebilsin diye.</li>
</ul>
<p>Bu veriler cihazınızda kalır, yalnızca bu web sitesi tarafından okunabilir ve tarayıcı ayarlarınızdan site verilerini temizleyerek istediğiniz an silinebilir. Gizli sekme kullanırsanız pencereyi kapattığınızda temizlenir.</p>

<h2>Üçüncü taraflar</h2>
<p>Ziyaretinizin teknik kaydını zorunlu olarak tek bir üçüncü taraf görür:</p>
<ul>
<li><strong>GitHub Pages</strong> bu siteyi barındırıyor. Her web barındırıcısında olduğu gibi, GitHub'ın sunucuları sayfaları iletebilmek için IP adresinizi ve tarayıcı bilgisinizi işler ve sunucu kayıtlarında tutabilir. Bu kayıtlara erişimimiz yok.</li>
</ul>
<p>Yazı tipi Google Fonts'tan değil, bu alan adından sunuluyor; dolayısıyla bir sayfayı açmak başka hiçbir şirketle iletişim kurmuyor. Gömülü video, harita, yorum sistemi veya sosyal medya bileşeni yok.</p>
<p>Reklam yayınlamıyoruz, sosyal medya bileşeni gömmüyoruz ve izleme pikseli kullanmıyoruz.</p>

<h2>Analitik</h2>
<p>Sitede, "bir değerlendirme başlatıldı" gibi eylemleri sayfanın belleğine kaydeden dâhilî bir olay katmanı var. <strong>Bu yazının yazıldığı tarihte bağlı bir analitik sağlayıcı yoktur</strong>; dolayısıyla bu olaylar hiçbir yere iletilmiyor ve sekmeyi kapattığınızda kayboluyor. İleride bir sağlayıcı bağlarsak, yayına alınmadan önce bu politika güncellenecek ve ilgili açık rıza gereklilikleri karşılanacaktır.</p>

<h2>Paylaşım</h2>
<p>Sonuç sayfasında puanınızı X veya WhatsApp üzerinden, cihazınızın kendi paylaşım menüsüyle ya da kopyalanan bir bağlantı olarak paylaşma düğmeleri var. Siz bu düğmelerden birine basmadıkça hiçbir şey paylaşılmaz.</p>
<p>Paylaşılan bağlantı, cevaplarınızı adresin <code>#</code> işaretinden sonraki bölümünde kodlanmış olarak taşır. Tarayıcılar bu bölümü hiçbir sunucuya iletmez; yani cevaplar yalnızca gönderdiğiniz mesajın içinde yolculuk eder &mdash; ama bağlantıya sahip olan herkes aynı sonucu açabilir. Onu da diğer kişisel mesajlarınız gibi değerlendirin. &ldquo;Görsel olarak kaydet&rdquo; düğmesi kartı tarayıcınızda çizip cihazınıza kaydeder; hiçbir yere yüklenmez.</p>

<h2>Haklarınız</h2>
<p>6698 sayılı KVKK ve AB/AEA'daki ziyaretçiler için GDPR kapsamında; hakkınızda tutulan kişisel verilere erişme, düzeltme, silme ve itiraz etme haklarına sahipsiniz. Hiçbir sunucuda hakkınızda kişisel veri tutmadığımız için getirecek, düzeltecek veya silecek bir şeyimiz yok — bu sitenin sakladığı her şeyi tarayıcı verilerinizi temizleyerek silebilirsiniz. Bir hakkınızı kullanmak veya soru sormak isterseniz <a href="mailto:${CONTACT}">${CONTACT}</a> adresine yazın.</p>

<h2>Çocuklar</h2>
<p>Bu site çocuklara yönelik değildir ve içerik yetişkin bir okuyucu varsayar. Çocuklar dâhil hiç kimseden bilerek bilgi toplamıyoruz.</p>

<h2>Değişiklikler</h2>
<p>Bu politika değişirse, sayfanın başındaki tarih de onunla birlikte değişir. Esaslı değişiklikler — özellikle herhangi bir analitik veya reklam hizmetinin bağlanması — yürürlüğe girmeden önce burada yansıtılacaktır.</p>` }},

{ slug:'terms', icon:'file-text', active:null,
  en:{ title:'Terms of Use — ShenTechin MED',
    desc:'The terms under which ShenTechin MED is made available: educational use, no warranty, and limits of liability.',
    h1:'Terms of Use', updated:UPDATED_EN,
    body:`<p>By using shentechin.com you agree to these terms. If you do not agree with them, please do not use the site.</p>

<h2>1. What this service is</h2>
<p>ShenTechin MED provides free, educational self-assessment questionnaires and written articles about everyday health habits. It is an information service. It is not a healthcare service, it does not provide medical advice or treatment, and using it creates no doctor–patient relationship. Please read the <a href="disclaimer.html">medical disclaimer</a>, which forms part of these terms.</p>

<h2>2. Acceptable use</h2>
<p>You may read, use and share the content for your own personal, non-commercial purposes. You may not:</p>
<ul>
<li>present the assessments or their results as medical, diagnostic or clinically validated;</li>
<li>republish substantial parts of the content as your own, or reproduce it commercially without permission;</li>
<li>attempt to disrupt the site or use automated means to overload it.</li>
</ul>

<h2>3. No warranty</h2>
<p>The site is provided "as is" and "as available". We make no warranty that the content is accurate, complete, current or fit for any particular purpose, and no warranty that the site will be uninterrupted or error-free. Health information changes over time and pages here may not always reflect the latest evidence.</p>

<h2>4. Limitation of liability</h2>
<p>To the fullest extent permitted by applicable law, we accept no liability for any loss or damage arising from your use of, or reliance on, this website or its content — including any decision to seek, delay or not seek medical care. Nothing in these terms limits liability that cannot lawfully be limited.</p>

<h2>5. Intellectual property</h2>
<p>The text, questionnaires, design and code of this site belong to ShenTechin MED unless stated otherwise. The typeface, Plus Jakarta Sans, is used under the SIL Open Font License and is served from this domain.</p>

<h2>6. External links</h2>
<p>Where we link to other websites, we do so for convenience. We do not control them and are not responsible for their content, accuracy or privacy practices.</p>

<h2>7. Changes and availability</h2>
<p>We may change, suspend or withdraw any part of the site, including individual assessments, at any time and without notice. We may also update these terms; the date at the top of this page shows when they last changed. Continuing to use the site after a change means you accept the updated terms.</p>

<h2>8. Governing law</h2>
<p>These terms are governed by the laws of the Republic of Türkiye, and the courts of Türkiye shall have jurisdiction over any dispute arising from them. If you use the site from elsewhere, you are responsible for compliance with your own local laws.</p>

<h2>9. Contact</h2>
<p><a href="mailto:${CONTACT}">${CONTACT}</a></p>` },
  tr:{ title:'Kullanım Koşulları — ShenTechin MED',
    desc:'ShenTechin MED\'in sunulduğu koşullar: eğitim amaçlı kullanım, garanti verilmemesi ve sorumluluk sınırları.',
    h1:'Kullanım Koşulları', updated:UPDATED_TR,
    body:`<p>shentechin.com adresini kullanarak bu koşulları kabul etmiş olursunuz. Koşulları kabul etmiyorsanız lütfen siteyi kullanmayın.</p>

<h2>1. Bu hizmet nedir</h2>
<p>ShenTechin MED, gündelik sağlık alışkanlıkları üzerine ücretsiz ve eğitim amaçlı öz-değerlendirme anketleri ile yazılar sunar. Bir bilgilendirme hizmetidir. Sağlık hizmeti değildir, tıbbi tavsiye veya tedavi sağlamaz ve kullanımı hekim–hasta ilişkisi doğurmaz. Bu koşulların bir parçasını oluşturan <a href="disclaimer.html">tıbbi uyarıyı</a> lütfen okuyun.</p>

<h2>2. Kabul edilebilir kullanım</h2>
<p>İçeriği kendi kişisel ve ticari olmayan amaçlarınız için okuyabilir, kullanabilir ve paylaşabilirsiniz. Şunları yapamazsınız:</p>
<ul>
<li>değerlendirmeleri veya sonuçlarını tıbbi, tanısal ya da klinik olarak doğrulanmış gibi sunmak;</li>
<li>içeriğin önemli bölümlerini kendinizinmiş gibi yeniden yayımlamak veya izinsiz ticari olarak çoğaltmak;</li>
<li>siteyi kesintiye uğratmaya çalışmak veya otomatik araçlarla aşırı yüklemek.</li>
</ul>

<h2>3. Garanti verilmemesi</h2>
<p>Site "olduğu gibi" ve "mevcut hâliyle" sunulur. İçeriğin doğru, eksiksiz, güncel veya belirli bir amaca uygun olduğuna dair hiçbir garanti vermiyoruz; sitenin kesintisiz veya hatasız çalışacağına dair de garanti vermiyoruz. Sağlık bilgisi zamanla değişir ve buradaki sayfalar her zaman en güncel kanıtı yansıtmayabilir.</p>

<h2>4. Sorumluluğun sınırlandırılması</h2>
<p>Yürürlükteki hukukun izin verdiği azami ölçüde; bu web sitesini veya içeriğini kullanmanızdan ya da ona güvenmenizden doğan hiçbir zarardan — tıbbi bakıma başvurma, geciktirme veya başvurmama kararı dâhil — sorumluluk kabul etmiyoruz. Bu koşullardaki hiçbir hüküm, hukuken sınırlandırılamayacak sorumluluğu sınırlandırmaz.</p>

<h2>5. Fikrî mülkiyet</h2>
<p>Bu sitenin metinleri, anketleri, tasarımı ve kodu, aksi belirtilmedikçe ShenTechin MED'e aittir. Yazı tipi Plus Jakarta Sans, SIL Open Font License kapsamında kullanılmakta ve bu alan adından sunulmaktadır.</p>

<h2>6. Dış bağlantılar</h2>
<p>Başka web sitelerine verdiğimiz bağlantılar kolaylık amaçlıdır. Bu siteler bizim denetimimizde değildir; içeriklerinden, doğruluklarından veya gizlilik uygulamalarından sorumlu değiliz.</p>

<h2>7. Değişiklikler ve erişilebilirlik</h2>
<p>Sitenin herhangi bir bölümünü, tek tek değerlendirmeler dâhil, dilediğimiz zaman ve önceden haber vermeksizin değiştirebilir, askıya alabilir veya kaldırabiliriz. Bu koşulları da güncelleyebiliriz; sayfanın başındaki tarih en son ne zaman değiştiklerini gösterir. Bir değişiklikten sonra siteyi kullanmaya devam etmeniz, güncellenmiş koşulları kabul ettiğiniz anlamına gelir.</p>

<h2>8. Uygulanacak hukuk</h2>
<p>Bu koşullar Türkiye Cumhuriyeti hukukuna tabidir ve bunlardan doğan uyuşmazlıklarda Türkiye mahkemeleri yetkilidir. Siteyi başka bir ülkeden kullanıyorsanız, kendi yerel mevzuatınıza uygunluktan siz sorumlusunuz.</p>

<h2>9. İletişim</h2>
<p><a href="mailto:${CONTACT}">${CONTACT}</a></p>` }}
];

export { CONTACT };

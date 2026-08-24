/* Yazılar bölümündeki 4 makalenin tam metni. İki dil de HTML içinde durur. */
export const ARTICLES = [
{ slug:'chronic-stress-and-the-body', featured:true, badge:'neuro', badgeKey:'badge_neuro',
  tone:'stress', relatedTest:'stress', icon:'brain', date:'2026-08-19',
  en:{ title:'What chronic stress actually does to the body',
    desc:'Stress is a hormonal loop with a beginning, a purpose and an off switch. Understanding where the switch is makes it easier to use.',
    dek:'Stress is not only a feeling. It is a hormonal loop with a beginning, a purpose and an off switch — and understanding where that switch is makes it easier to use.',
    body:`<p>The stress response is not a design flaw. It is one of the most useful systems the body has, and it is very good at what it evolved to do: get you through a short, sharp emergency and then stand down. The trouble is the standing down.</p>

<h2>The loop, briefly</h2>
<p>When your brain registers a threat, a small region called the hypothalamus signals the pituitary gland, which signals the adrenal glands, which release cortisol. This chain is usually called the <strong>HPA axis</strong>. Cortisol does sensible things in an emergency: it frees up glucose for fast energy, sharpens attention, and temporarily deprioritises processes that can wait — digestion, growth, reproduction, parts of the immune response.</p>
<p>Crucially, cortisol also switches itself off. Rising levels feed back to the hypothalamus and pituitary and tell them to stop signalling. In a well-functioning system the whole episode is over within an hour or two and the body returns to baseline.</p>

<h2>Where it goes wrong</h2>
<p>The system assumes threats are brief. A deadline that lasts four months, a difficult household, financial pressure with no end date — none of these resolve, so the loop never fully completes. Instead of a spike and a return, you get a chronically elevated baseline with a blunted daily rhythm.</p>
<p>That matters because everything cortisol deprioritises during an emergency stays deprioritised. Sleep becomes lighter and more fragmented. Digestion becomes unreliable. Appetite shifts, usually towards fast energy. Muscles stay in a low-level state of readiness, which is where the jaw clenching, shoulder tension and tension headaches come from. Concentration narrows, which is useful when there is one thing to escape and unhelpful when there are eleven things to do.</p>

<div class="callout"><p>None of this means stress "causes" a specific disease in a specific person. It means the conditions in which the body repairs itself are quietly being deferred, and deferral has a cost that accumulates.</p></div>

<h2>Why "just relax" fails</h2>
<p>The off switch is not conscious. You cannot decide to lower cortisol any more than you can decide to lower your blood pressure. What you can do is change the inputs the system is reading — and the system reads behaviour far more reliably than it reads intention.</p>
<p>Three inputs do most of the work:</p>
<ul>
<li><strong>Sleep.</strong> Cortisol regulation and sleep are mutually dependent: poor sleep raises stress reactivity, and elevated stress fragments sleep. Fixing sleep first is not avoidance — it is usually the highest-leverage move available.</li>
<li><strong>Movement.</strong> Physical activity gives the stress response somewhere to go and completes the loop it was built for. It does not need to be strenuous; regular beats intense.</li>
<li><strong>Genuine off-duty time.</strong> Not scrolling, not "resting" while monitoring messages. The system distinguishes between being unoccupied and being off-duty, and only the second one counts.</li>
</ul>

<h2>When it is more than stress</h2>
<p>Chronic stress and several treatable medical conditions produce overlapping symptoms — persistent fatigue, poor concentration, disturbed sleep, low mood. Thyroid disorders, anaemia, sleep apnoea and depression are all on that list, and all are diagnosable. If symptoms have persisted for months, assuming "it is just stress" is the one interpretation worth being suspicious of.</p>
<p>If you are having panic attacks, if your mood has been consistently low, or if you have stopped being able to switch off at all, that is a reason to speak to a doctor or psychologist. Not because stress is dangerous in some dramatic sense, but because these are treatable, and treatment works better earlier.</p>` },
  tr:{ title:'Kronik stres bedende gerçekte ne yapar?',
    desc:'Stres, başlangıcı, amacı ve bir kapatma düğmesi olan hormonal bir döngüdür. O düğmenin nerede olduğunu bilmek onu kullanmayı kolaylaştırır.',
    dek:'Stres yalnızca bir his değildir. Başlangıcı, amacı ve bir kapatma düğmesi olan hormonal bir döngüdür — o düğmenin nerede olduğunu bilmek onu kullanmayı kolaylaştırır.',
    body:`<p>Stres yanıtı bir tasarım hatası değildir. Bedenin sahip olduğu en işe yarar sistemlerden biridir ve evrimleştiği işi çok iyi yapar: kısa ve keskin bir acil durumdan sizi geçirir, sonra geri çekilir. Sorun, geri çekilme kısmındadır.</p>

<h2>Döngü, kısaca</h2>
<p>Beyniniz bir tehdit algıladığında hipotalamus adlı küçük bir bölge hipofiz bezine, o da böbrek üstü bezlerine sinyal gönderir ve kortizol salınır. Bu zincire genellikle <strong>HPA ekseni</strong> denir. Kortizol acil durumda makul işler yapar: hızlı enerji için glukozu serbest bırakır, dikkati keskinleştirir ve bekleyebilecek süreçleri geçici olarak arka plana atar — sindirim, büyüme, üreme, bağışıklık yanıtının bazı parçaları.</p>
<p>Önemlisi, kortizol kendini kapatır da. Yükselen düzeyler hipotalamus ve hipofize geri bildirim vererek sinyali kesmelerini söyler. İyi çalışan bir sistemde tüm bu olay bir iki saat içinde biter ve beden başlangıç düzeyine döner.</p>

<h2>Nerede bozuluyor</h2>
<p>Sistem, tehditlerin kısa olduğunu varsayar. Dört ay süren bir teslim tarihi, zor bir ev ortamı, bitiş tarihi olmayan bir maddi baskı — bunların hiçbiri çözülmez, dolayısıyla döngü hiçbir zaman tamamlanmaz. Bir yükseliş ve geri dönüş yerine, günlük ritmi körelmiş, sürekli yüksek bir taban düzey elde edersiniz.</p>
<p>Bu önemli, çünkü kortizolün acil durumda arka plana attığı ne varsa arka planda kalır. Uyku hafifler ve bölünür. Sindirim güvenilmez hâle gelir. İştah kayar, genellikle hızlı enerjiye doğru. Kaslar düşük düzeyli bir hazır bekleme hâlinde kalır; çene sıkma, omuz gerginliği ve gerilim tipi baş ağrısı buradan gelir. Dikkat daralır — kaçılacak tek bir şey varken faydalı, yapılacak on bir şey varken zararlıdır.</p>

<div class="callout"><p>Bunların hiçbiri stresin belirli bir kişide belirli bir hastalığa "yol açtığı" anlamına gelmez. Bedenin kendini onardığı koşulların sessizce ertelendiği anlamına gelir; ertelemenin de biriken bir maliyeti vardır.</p></div>

<h2>"Sakin ol" neden işe yaramıyor</h2>
<p>Kapatma düğmesi bilinçli değildir. Kortizolü düşürmeye, tansiyonunuzu düşürmeye karar verebileceğinizden fazla karar veremezsiniz. Yapabileceğiniz şey, sistemin okuduğu girdileri değiştirmektir — ve sistem davranışı, niyetten çok daha güvenilir biçimde okur.</p>
<p>İşin çoğunu üç girdi yapar:</p>
<ul>
<li><strong>Uyku.</strong> Kortizol düzenlenmesi ile uyku karşılıklı bağımlıdır: kötü uyku stres tepkiselliğini artırır, yüksek stres uykuyu böler. Önce uykuyu düzeltmek kaçmak değildir — genellikle elinizdeki en yüksek getirili hamledir.</li>
<li><strong>Hareket.</strong> Fiziksel aktivite, stres yanıtına gidecek bir yer verir ve kurulduğu döngüyü tamamlar. Zorlu olması gerekmez; düzenli olan yoğun olanı yener.</li>
<li><strong>Gerçekten görev dışı zaman.</strong> Kaydırmak değil, mesajları takip ederek "dinlenmek" değil. Sistem, meşgul olmamakla görev dışı olmayı ayırt eder ve yalnızca ikincisi sayılır.</li>
</ul>

<h2>Stresten fazlası olduğunda</h2>
<p>Kronik stres ile tedavi edilebilir birkaç tıbbi durum örtüşen belirtiler üretir — süregelen yorgunluk, zayıf konsantrasyon, bozulmuş uyku, düşük ruh hâli. Tiroid hastalıkları, anemi, uyku apnesi ve depresyon bu listededir ve hepsinin tanısı konabilir. Belirtiler aylardır sürüyorsa, kuşkuyla yaklaşılmaya değer tek yorum "sadece stres" varsayımıdır.</p>
<p>Panik atak geçiriyorsanız, ruh hâliniz sürekli düşükse ya da artık hiç kapanamıyorsanız, bu bir hekime veya psikoloğa danışmak için gerekçedir. Stres dramatik anlamda tehlikeli olduğu için değil; bunlar tedavi edilebilir olduğu ve tedavi erken başlayınca daha iyi işlediği için.</p>` }},

{ slug:'why-calorie-counting-fails', badge:'diet', badgeKey:'badge_meta',
  tone:'diet', relatedTest:'diet', icon:'leaf', date:'2026-07-03',
  en:{ title:'Why calorie counting stops working for so many people',
    desc:'Calories in, calories out is not wrong — it is incomplete. Here is what the model leaves out and what to do instead.',
    dek:'Calories in, calories out is not wrong — it is just incomplete. Here is what the model leaves out, and what to do instead.',
    body:`<p>Energy balance is real physics. If you take in less energy than you use, you lose weight. The reason calorie counting so often stops working is not that the principle is false — it is that both sides of the equation are much harder to know, and much more responsive to each other, than the model implies.</p>

<h2>Problem one: the numbers are estimates</h2>
<p>The calorie figure on a package is an average derived from analysis, and regulators allow meaningful tolerance around it. Portion sizes at home vary. Cooking method changes how much energy you actually absorb — the same food eaten raw, cooked, whole or blended does not deliver identical energy. Meanwhile the "out" side is worse: activity tracker estimates for energy expenditure are notoriously rough.</p>
<p>Small errors would not matter if they were random. They are not. They tend to run in the same direction — under-recording what is eaten, over-crediting what is burned — and they accumulate.</p>

<h2>Problem two: the two sides are connected</h2>
<p>The model treats intake and expenditure as independent. They are not. Eat substantially less for a sustained period and the body responds: resting energy use drifts down, spontaneous movement decreases — you fidget less, walk a bit slower, take the stairs less often, mostly without noticing — and hunger signalling increases.</p>
<p>This is not a malfunction. It is a system defending against what it interprets as scarcity, and it is why the same deficit produces less weight loss in month four than it did in month one.</p>

<div class="callout"><p>The practical consequence: a plan that depends on permanently out-willing your own hunger signalling is not a plan. It is a countdown.</p></div>

<h2>Problem three: adherence is the real variable</h2>
<p>When diets are compared head to head over a year or more, the differences between them tend to be smaller than the differences between people who stuck to them and people who did not. That points somewhere useful. The question worth asking about any eating change is not "is this optimal?" but "could I still be doing this in a year?"</p>

<h2>What tends to work better</h2>
<p>None of this makes tracking useless. Used briefly, it is an excellent way to learn what you are actually eating — most people are surprised, in both directions. Used permanently, as the mechanism that holds the whole thing together, it usually fails.</p>
<ul>
<li><strong>Build structure before restriction.</strong> Predictable meals reduce the decisions you have to win. Most overeating happens in the gaps.</li>
<li><strong>Prioritise protein and fibre.</strong> Not because they are magic, but because they affect how full you feel per calorie, which lowers the amount of willpower the plan requires.</li>
<li><strong>Change liquid calories first.</strong> Sugary drinks deliver energy with almost no effect on satiety. It is the least painful place to start.</li>
<li><strong>Judge by trajectory, not by day.</strong> Daily weight moves mostly with water and food volume. Weekly averages tell you something; single readings do not.</li>
</ul>

<h2>When to get help</h2>
<p>If you have repeated cycles of losing and regaining weight, a history of disordered eating, or a medical condition affected by diet — diabetes, thyroid disease, kidney disease — this is the point to work with a dietitian rather than another plan. Not because you lack discipline, but because the useful adjustments in those situations are specific, and generic advice is a poor substitute for them.</p>` },
  tr:{ title:'Kalori saymak neden bu kadar çok kişide işe yaramaz oluyor?',
    desc:'"Alınan kalori, harcanan kalori" yanlış değil — eksik. Modelin dışarıda bıraktıkları ve bunun yerine ne yapılabileceği.',
    dek:'"Alınan kalori, harcanan kalori" yanlış değil — sadece eksik. Modelin dışarıda bıraktıkları ve bunun yerine ne yapılabileceği.',
    body:`<p>Enerji dengesi gerçek bir fizik yasasıdır. Harcadığınızdan az enerji alırsanız kilo verirsiniz. Kalori saymanın bu kadar sık işlemez hâle gelmesinin nedeni ilkenin yanlış olması değil — denklemin her iki tarafının da bilinmesinin çok daha zor ve birbirlerine çok daha duyarlı olmasıdır.</p>

<h2>Birinci sorun: sayılar tahmindir</h2>
<p>Paketin üzerindeki kalori değeri analizden türetilmiş bir ortalamadır ve mevzuat bunun etrafında ciddi bir tolerans tanır. Evdeki porsiyonlar değişir. Pişirme yöntemi gerçekte ne kadar enerji emdiğinizi değiştirir — aynı besin çiğ, pişmiş, bütün ya da blenderdan geçmiş hâlde aynı enerjiyi vermez. "Harcanan" taraf ise daha kötüdür: aktivite takipçilerinin enerji harcaması tahminleri bilinen biçimde kabadır.</p>
<p>Küçük hatalar rastgele olsaydı sorun olmazdı. Değiller. Genellikle aynı yönde işlerler — yenilen eksik kaydedilir, yakılan fazla sayılır — ve birikirler.</p>

<h2>İkinci sorun: iki taraf birbirine bağlı</h2>
<p>Model, alımı ve harcamayı birbirinden bağımsız sayar. Değiller. Uzun süre belirgin biçimde az yiyin, beden yanıt verir: dinlenme enerji harcaması aşağı kayar, kendiliğinden hareket azalır — daha az kıpırdanır, biraz daha yavaş yürür, merdiveni daha az kullanırsınız, çoğunlukla fark etmeden — ve açlık sinyali artar.</p>
<p>Bu bir arıza değildir. Kıtlık olarak yorumladığı şeye karşı kendini savunan bir sistemdir ve aynı açığın dördüncü ayda birinci aydakinden daha az kilo kaybı üretmesinin nedeni budur.</p>

<div class="callout"><p>Pratik sonuç: kendi açlık sinyalinizi kalıcı olarak iradeyle yenmeye dayanan bir plan, plan değildir. Geri sayımdır.</p></div>

<h2>Üçüncü sorun: asıl değişken sürdürülebilirlik</h2>
<p>Diyetler bir yıl ve üzeri sürelerle karşılaştırıldığında, aralarındaki farklar genellikle diyete sadık kalanlarla kalmayanlar arasındaki farktan küçük çıkar. Bu, işe yarar bir yere işaret ediyor. Herhangi bir beslenme değişikliği için sorulmaya değer soru "bu en iyisi mi?" değil, "bir yıl sonra hâlâ bunu yapıyor olabilir miyim?" sorusudur.</p>

<h2>Daha iyi işleyen yaklaşım</h2>
<p>Bunların hiçbiri takibi işe yaramaz kılmaz. Kısa süreli kullanıldığında, gerçekte ne yediğinizi öğrenmenin mükemmel bir yoludur — çoğu kişi her iki yönde de şaşırır. Kalıcı olarak, her şeyi bir arada tutan mekanizma olarak kullanıldığında ise genellikle başarısız olur.</p>
<ul>
<li><strong>Kısıtlamadan önce düzen kurun.</strong> Öngörülebilir öğünler, kazanmanız gereken karar sayısını azaltır. Aşırı yemenin çoğu boşluklarda olur.</li>
<li><strong>Protein ve lifi öne alın.</strong> Sihirli oldukları için değil, kalori başına ne kadar tok hissettirdiklerini etkiledikleri için — bu da planın gerektirdiği irade miktarını düşürür.</li>
<li><strong>Önce sıvı kalorileri değiştirin.</strong> Şekerli içecekler tokluğa neredeyse hiç etki etmeden enerji verir. Başlamak için en az acı veren yer burasıdır.</li>
<li><strong>Günle değil eğilimle değerlendirin.</strong> Günlük tartı çoğunlukla su ve besin hacmiyle oynar. Haftalık ortalamalar bir şey söyler; tek ölçümler söylemez.</li>
</ul>

<h2>Ne zaman destek almalı</h2>
<p>Tekrarlayan kilo verip alma döngüleriniz, düzensiz yeme geçmişiniz ya da beslenmeden etkilenen bir hastalığınız varsa — diyabet, tiroid hastalığı, böbrek hastalığı — burası yeni bir plan yerine bir diyetisyenle çalışma noktasıdır. Disiplininiz eksik olduğu için değil; bu durumlarda işe yarayan düzenlemeler özgül olduğu ve genel tavsiye onların yerini kötü doldurduğu için.</p>` }},

{ slug:'sleep-cycles-explained', badge:'sleep', badgeKey:'badge_sleep',
  tone:'sleep', relatedTest:'sleep', icon:'moon', date:'2026-06-12',
  en:{ title:'Sleep cycles, explained without the jargon',
    desc:'Deep sleep and REM do different jobs and are not spread evenly across the night. That has practical consequences for when you go to bed.',
    dek:'Deep sleep and REM do different jobs, and they are not distributed evenly across the night. That has practical consequences for when you go to bed.',
    body:`<p>A night of sleep is not one continuous state. It is a sequence of cycles, each lasting roughly ninety minutes, and within each cycle you move through stages that do measurably different things. The useful part is that these stages are not evenly distributed — which is why <em>when</em> you sleep changes what you get out of it.</p>

<h2>The stages</h2>
<p>Sleep is usually divided into non-REM and REM. Non-REM has light stages, where you drift and are easily woken, and a deep stage — slow-wave sleep — where the body is at its least responsive. Waking someone from deep sleep produces that heavy, disoriented feeling of not knowing where you are.</p>
<p>REM sleep is different again: brain activity looks close to waking, most vivid dreaming happens here, and the body's voluntary muscles are temporarily paralysed, which is generally a good thing given what you are dreaming about.</p>

<h2>The uneven distribution</h2>
<p>Here is the part most people do not know. Deep sleep is concentrated in the <strong>first half</strong> of the night. REM is concentrated in the <strong>second half</strong>, with REM periods getting longer towards morning.</p>
<p>The practical consequences follow directly:</p>
<ul>
<li>Going to bed two hours late but waking at your usual time costs you disproportionately more <strong>REM</strong>, because you cut the end of the night.</li>
<li>Waking two hours early costs you REM as well, for the same reason — which is part of why early waking feels emotionally rough.</li>
<li>Deep sleep is more protected. The body prioritises it, which is why one bad night leaves you tired but not catastrophically so, while a run of short nights compounds.</li>
</ul>

<div class="callout"><p>This is also why "I'll catch up at the weekend" works less well than it feels like it should. You recover some deep sleep quickly, but the REM debt takes longer, and shifting your schedule by three hours on Saturday creates a fresh problem on Monday.</p></div>

<h2>What the stages appear to do</h2>
<p>Deep sleep is associated with physical restoration: growth hormone release, tissue repair, and clearance processes in the brain that are more active during sleep than waking. REM is more associated with memory consolidation and emotional processing — one reason a difficult event often feels somewhat less sharp after a good night, and noticeably worse after a bad one.</p>

<h2>What actually helps</h2>
<p>You cannot direct your sleep architecture — there is no technique for "getting more deep sleep" on demand, and consumer devices that claim to measure your stages do so approximately. What you can influence is whether the cycles get to run undisturbed:</p>
<ul>
<li><strong>A consistent wake time.</strong> More effective than a consistent bedtime, because it anchors the whole rhythm and bedtime tends to follow.</li>
<li><strong>Enough total time.</strong> Cycles are around ninety minutes; cutting an hour usually removes a meaningful part of one.</li>
<li><strong>Dark, cool, quiet.</strong> Unglamorous, and it does more than most of what gets sold for sleep.</li>
<li><strong>Alcohol earlier or not at all.</strong> It shortens the time to fall asleep and then suppresses REM and fragments the second half of the night — which is why sleep after drinking feels unrefreshing despite the hours.</li>
</ul>

<h2>When to see someone</h2>
<p>Loud snoring with pauses in breathing, gasping awake, or heavy daytime sleepiness despite adequate hours are not habit problems. They are reasons to talk to a doctor about sleep apnoea, which is common, frequently missed, and very treatable once identified.</p>` },
  tr:{ title:'Uyku evreleri, jargonsuz anlatım',
    desc:'Derin uyku ile REM farklı işler görür ve gece boyunca eşit dağılmaz. Bunun yatma saatiniz açısından pratik sonuçları var.',
    dek:'Derin uyku ile REM farklı işler görür ve gece boyunca eşit dağılmazlar. Bunun yatma saatiniz açısından pratik sonuçları var.',
    body:`<p>Bir gecelik uyku tek ve sürekli bir hâl değildir. Her biri kabaca doksan dakika süren döngüler dizisidir ve her döngü içinde ölçülebilir biçimde farklı işler yapan evrelerden geçersiniz. İşin faydalı kısmı şu: bu evreler eşit dağılmaz — bu yüzden <em>ne zaman</em> uyuduğunuz, uykudan ne aldığınızı değiştirir.</p>

<h2>Evreler</h2>
<p>Uyku genellikle REM dışı ve REM olarak ikiye ayrılır. REM dışı uykunun, dalıp çıktığınız ve kolay uyandığınız hafif evreleri ile bedenin en az tepkili olduğu derin evresi — yavaş dalga uykusu — vardır. Birini derin uykudan uyandırmak, nerede olduğunu bilememenin verdiği o ağır ve şaşkın hissi üretir.</p>
<p>REM uykusu ise bambaşkadır: beyin aktivitesi uyanıklığa yakın görünür, canlı rüyaların çoğu burada olur ve bedenin istemli kasları geçici olarak felçlidir — rüyada gördükleriniz düşünülünce genellikle iyi bir şeydir.</p>

<h2>Eşit olmayan dağılım</h2>
<p>Çoğu kişinin bilmediği kısım burası. Derin uyku gecenin <strong>ilk yarısında</strong> yoğunlaşır. REM ise <strong>ikinci yarısında</strong> yoğunlaşır ve REM dönemleri sabaha doğru uzar.</p>
<p>Pratik sonuçlar doğrudan buradan çıkar:</p>
<ul>
<li>İki saat geç yatıp her zamanki saatte kalkmak orantısız biçimde daha çok <strong>REM</strong>'e mal olur, çünkü gecenin sonunu kesersiniz.</li>
<li>İki saat erken uyanmak da aynı nedenle REM'e mal olur — erken uyanmanın duygusal olarak yıpratıcı hissettirmesinin bir nedeni budur.</li>
<li>Derin uyku daha korunaklıdır. Beden onu önceliklendirir; bu yüzden tek kötü gece sizi yorgun bırakır ama yıkmaz, arka arkaya kısa geceler ise birikir.</li>
</ul>

<div class="callout"><p>"Hafta sonu telafi ederim" yaklaşımının hissettirdiği kadar iyi işlememesinin nedeni de budur. Derin uykunun bir kısmını hızlı geri alırsınız ama REM borcu daha uzun sürer; üstelik cumartesi düzeninizi üç saat kaydırmak pazartesiye yeni bir sorun yaratır.</p></div>

<h2>Evrelerin yaptığı görünen işler</h2>
<p>Derin uyku fiziksel onarımla ilişkilendirilir: büyüme hormonu salınımı, doku onarımı ve beyinde uyanıklığa göre uykuda daha etkin olan temizlenme süreçleri. REM ise daha çok bellek pekiştirme ve duygusal işlemeyle ilişkilendirilir — zor bir olayın iyi bir geceden sonra biraz daha az keskin, kötü bir geceden sonra belirgin biçimde daha ağır hissettirmesinin bir nedeni budur.</p>

<h2>Gerçekte ne işe yarar</h2>
<p>Uyku mimarinizi yönlendiremezsiniz — istendiğinde "daha çok derin uyku almanın" bir tekniği yoktur ve evrelerinizi ölçtüğünü söyleyen tüketici cihazları bunu yaklaşık olarak yapar. Etkileyebileceğiniz şey, döngülerin kesintisiz işleyip işlemediğidir:</p>
<ul>
<li><strong>Sabit bir kalkış saati.</strong> Sabit yatış saatinden daha etkilidir, çünkü tüm ritmi sabitler ve yatış saati onu takip etme eğilimindedir.</li>
<li><strong>Yeterli toplam süre.</strong> Döngüler yaklaşık doksan dakikadır; bir saat kesmek genellikle bir döngünün anlamlı bir parçasını götürür.</li>
<li><strong>Karanlık, serin, sessiz.</strong> Gösterişsizdir ve uyku için satılan şeylerin çoğundan fazlasını yapar.</li>
<li><strong>Alkolü erkene almak ya da hiç almamak.</strong> Uykuya dalma süresini kısaltır, ardından REM'i baskılar ve gecenin ikinci yarısını böler — saatler yeterli olsa bile içkiden sonraki uykunun dinlendirmemesinin nedeni budur.</li>
</ul>

<h2>Ne zaman başvurmalı</h2>
<p>Nefes duraklamalarının eşlik ettiği yüksek horlama, boğulur gibi uyanma ya da yeterli saate rağmen ağır gün içi uyku hâli alışkanlık sorunu değildir. Bunlar, yaygın olan, sık atlanan ve saptandığında çok iyi tedavi edilen uyku apnesi için bir hekimle konuşma gerekçesidir.</p>` }},

{ slug:'heart-rate-variability', badge:'cardio', badgeKey:'badge_cardio',
  tone:'heart', relatedTest:'heart', icon:'heart-pulse', date:'2026-07-28',
  en:{ title:'Heart rate variability: what it is and what it isn’t',
    desc:'HRV has become the headline number on every wearable. It does say something real — but far less precisely than the apps suggest.',
    dek:'HRV has become the headline number on every wearable. It does say something real — but far less precisely than the apps suggest.',
    body:`<p>A healthy heart does not beat like a metronome. Even at complete rest the interval between beats varies slightly from one to the next, and heart rate variability — HRV — is simply a measure of how much. Counter-intuitively, more variation is generally the better sign.</p>

<h2>Why variation is good</h2>
<p>Your heart rate is under continuous adjustment from two branches of the autonomic nervous system. The sympathetic branch speeds things up; the parasympathetic branch, working mainly through the vagus nerve, slows things down. The two are constantly negotiating, and the beat-to-beat variation is the visible residue of that negotiation.</p>
<p>When the parasympathetic side has good influence — you are rested, recovered, not under acute pressure — the adjustments are frequent and fine-grained, and variability is higher. Under stress, illness, or after hard training, sympathetic activity dominates, the negotiation stops, and the rhythm becomes more uniform. A very steady resting heartbeat is not a sign of a well-tuned engine; it is closer to the opposite.</p>

<h2>What it can reasonably tell you</h2>
<p>HRV is genuinely responsive to things worth noticing. It tends to drop with poor sleep, alcohol, acute illness, and heavy training load, and to recover as those resolve. Used as a <strong>personal trend</strong>, tracked at a consistent time — typically overnight or first thing in the morning — it can be a useful early signal that you are more depleted than you feel.</p>

<div class="callout warn"><p>What it cannot do is compare you meaningfully to anyone else. Absolute HRV values vary enormously between individuals, and they decline with age. Someone else's number tells you nothing about yours.</p></div>

<h2>Where the apps overreach</h2>
<p>Three things are worth knowing before you take a daily HRV score seriously.</p>
<ul>
<li><strong>Measurement method matters.</strong> Chest straps read electrical activity directly. Wrist and finger devices infer beat timing optically, through blood flow. The optical approach is more convenient and less precise, and precision is exactly what a variability measure depends on.</li>
<li><strong>Context dominates.</strong> Body position, breathing rate, time of day, caffeine, and how well you slept all move HRV substantially. Comparing this morning to yesterday morning only works if the conditions were similar.</li>
<li><strong>A "readiness score" is an interpretation, not a measurement.</strong> The underlying number may be real; the recommendation built on top of it is a proprietary guess about what it means for you.</li>
</ul>

<h2>A sensible way to use it</h2>
<p>If you already have a device, treat HRV as one input among several, and give more weight to the obvious ones: how you slept, how you feel, whether you are getting ill. Watch the multi-day direction rather than any single reading. And do not let a low number talk you out of a walk — light activity almost always helps recovery rather than hindering it.</p>
<p>If you do not have a device, you are not missing much. Sleep duration and consistency, resting heart rate, and simply how you feel on stairs carry most of the same information for free.</p>

<h2>What HRV is not</h2>
<p>HRV is not a diagnostic test and it is not a screening tool for heart disease. An irregular pulse, palpitations, chest tightness, breathlessness on mild effort or fainting are all reasons to see a doctor directly — they are assessed with an ECG and a clinical examination, not with a wearable's daily score.</p>` },
  tr:{ title:'Kalp hızı değişkenliği (HRV): ne olduğu ve ne olmadığı',
    desc:'HRV her akıllı saatin manşet sayısı hâline geldi. Gerçek bir şey söylüyor — ama uygulamaların ima ettiğinden çok daha az kesinlikle.',
    dek:'HRV her akıllı saatin manşet sayısı hâline geldi. Gerçek bir şey söylüyor — ama uygulamaların ima ettiğinden çok daha az kesinlikle.',
    body:`<p>Sağlıklı bir kalp metronom gibi atmaz. Tam dinlenme hâlinde bile atımlar arasındaki aralık birinden diğerine biraz değişir; kalp hızı değişkenliği — HRV — bunun ne kadar olduğunun ölçüsüdür. Sezgiye aykırı biçimde, daha fazla değişkenlik genellikle daha iyi işarettir.</p>

<h2>Değişkenlik neden iyi</h2>
<p>Kalp hızınız otonom sinir sisteminin iki kolundan sürekli ayar alır. Sempatik kol hızlandırır; ağırlıklı olarak vagus siniri üzerinden çalışan parasempatik kol yavaşlatır. İkisi sürekli pazarlık hâlindedir ve atımdan atıma değişkenlik, bu pazarlığın görünür tortusudur.</p>
<p>Parasempatik taraf iyi etkiliyken — dinlenmişken, toparlanmışken, akut baskı altında değilken — ayarlar sık ve ince olur, değişkenlik yükselir. Stres, hastalık ya da ağır antrenman sonrasında sempatik etkinlik baskın gelir, pazarlık durur ve ritim tekdüzeleşir. Çok düzenli bir dinlenme nabzı iyi ayarlanmış bir motorun işareti değildir; tersine yakındır.</p>

<h2>Makul olarak ne söyleyebilir</h2>
<p>HRV, fark edilmeye değer şeylere gerçekten duyarlıdır. Kötü uyku, alkol, akut hastalık ve ağır antrenman yüküyle düşme, bunlar geçtikçe toparlanma eğilimindedir. Tutarlı bir saatte — genellikle gece boyunca ya da sabah ilk iş — ölçülen <strong>kişisel bir eğilim</strong> olarak kullanıldığında, hissettiğinizden daha tükenmiş olduğunuza dair faydalı bir erken sinyal olabilir.</p>

<div class="callout warn"><p>Yapamayacağı şey, sizi başkasıyla anlamlı biçimde karşılaştırmaktır. Mutlak HRV değerleri kişiden kişiye muazzam ölçüde değişir ve yaşla düşer. Başkasının sayısı sizinki hakkında hiçbir şey söylemez.</p></div>

<h2>Uygulamalar nerede fazla ileri gidiyor</h2>
<p>Günlük bir HRV skorunu ciddiye almadan önce bilinmeye değer üç şey var.</p>
<ul>
<li><strong>Ölçüm yöntemi önemlidir.</strong> Göğüs bantları elektriksel etkinliği doğrudan okur. Bilek ve parmak cihazları atım zamanlamasını kan akışı üzerinden optik olarak çıkarır. Optik yaklaşım daha pratik ve daha az hassastır; hassasiyet ise bir değişkenlik ölçümünün tam da dayandığı şeydir.</li>
<li><strong>Bağlam belirleyicidir.</strong> Vücut pozisyonu, solunum hızı, günün saati, kafein ve ne kadar iyi uyuduğunuz HRV'yi ciddi biçimde oynatır. Bu sabahı dün sabahla karşılaştırmak ancak koşullar benzerse işe yarar.</li>
<li><strong>"Hazır olma skoru" bir ölçüm değil bir yorumdur.</strong> Altındaki sayı gerçek olabilir; üzerine kurulan öneri, onun sizin için ne anlama geldiğine dair tescilli bir tahmindir.</li>
</ul>

<h2>Makul bir kullanım biçimi</h2>
<p>Halihazırda bir cihazınız varsa, HRV'yi birkaç girdiden biri olarak görün ve bariz olanlara daha fazla ağırlık verin: nasıl uyuduğunuza, nasıl hissettiğinize, hastalanıp hastalanmadığınıza. Tek bir ölçüm yerine birkaç günlük yönü izleyin. Ve düşük bir sayının sizi yürüyüşten vazgeçirmesine izin vermeyin — hafif aktivite toparlanmayı neredeyse her zaman engellemek yerine destekler.</p>
<p>Cihazınız yoksa çok şey kaçırmıyorsunuz. Uyku süresi ve düzeni, dinlenme nabzı ve merdivende nasıl hissettiğiniz aynı bilginin çoğunu ücretsiz taşır.</p>

<h2>HRV ne değildir</h2>
<p>HRV bir tanı testi değildir ve kalp hastalığı için bir tarama aracı değildir. Düzensiz nabız, çarpıntı, göğüste sıkışma, hafif eforda nefes darlığı veya bayılma doğrudan hekime başvurma gerekçesidir — bunlar bir akıllı saatin günlük skoruyla değil, EKG ve klinik muayeneyle değerlendirilir.</p>` }}
];

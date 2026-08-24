/* BİLİMSEL KATMAN — sonuç raporunun kişiye özel kısmı.

   Her test için dört şey:

     basis     testin hangi ölçeklerden uyarlandığı (test tanıtım
               sayfasında ve sonuç raporunda görünür)
     refs      PubMed kimliğiyle birlikte kaynaklar. PMID'lerin tamamı
               PubMed E-utilities ile doğrulandı; uydurma kaynak YOK.
     domains   alan başına: bu alan neyi ölçüyor, düşük çıkarsa ne
               yapılır, yüksek çıkarsa ne korunur
     actions   SORU BAŞINA eylem. Sonuç sayfası, puanı en çok düşüren
               cevapları alır ve yalnızca onların eylemini gösterir —
               kişiye özel olmasının sebebi budur.
     flags     belirli cevaplar bir araya geldiğinde hekime yönlendirme.
               Tanı koymaz; "bu tabloyu bir hekime gösterin" der.

   Dil: teşhis dili yok, kaynağı olmayan sayısal iddia yok. Bir sayı
   veriliyorsa (dakika, saat, porsiyon) arkasında refs'teki bir çalışma
   ya da kılavuz vardır.

   flags biçimi: { q: [soru indeksleri], at: eşik, need: kaç tanesi }
   Eşik PUANLANMIŞ değere göredir (ters kodlu sorular çevrildikten
   sonra); 1 en kötü, 10 en iyi. Yani "at: 4" = "bu soruda durum kötü". */

/* ---------------------------------------------------------------
   UYKU
   --------------------------------------------------------------- */

const sleep = {
  basis: {
    en: ['Pittsburgh Sleep Quality Index (PSQI)', 'Insomnia Severity Index (ISI)',
      'Epworth Sleepiness Scale (ESS)', 'STOP-Bang apnoea screen',
      'AASM/SRS sleep duration consensus'],
    tr: ['Pittsburgh Uyku Kalitesi İndeksi (PSQI)', 'Uykusuzluk Şiddeti İndeksi (ISI)',
      'Epworth Uykululuk Ölçeği (ESS)', 'STOP-Bang apne taraması',
      'AASM/SRS uyku süresi uzlaşısı']
  },
  refs: [
    { pmid: '26039963', en: 'Watson NF et al. Recommended amount of sleep for a healthy adult: AASM & SRS joint consensus. Sleep. 2015', tr: 'Watson NF ve ark. Sağlıklı erişkin için önerilen uyku süresi: AASM ve SRS ortak uzlaşısı. Sleep. 2015' },
    { pmid: '2748771', en: 'Buysse DJ et al. The Pittsburgh Sleep Quality Index. Psychiatry Res. 1989', tr: 'Buysse DJ ve ark. Pittsburgh Uyku Kalitesi İndeksi. Psychiatry Res. 1989' },
    { pmid: '11438246', en: 'Bastien CH et al. Validation of the Insomnia Severity Index. Sleep Med. 2001', tr: 'Bastien CH ve ark. Uykusuzluk Şiddeti İndeksi doğrulaması. Sleep Med. 2001' },
    { pmid: '1798888', en: 'Johns MW. A new method for measuring daytime sleepiness: the Epworth sleepiness scale. Sleep. 1991', tr: 'Johns MW. Gündüz uykululuğunu ölçmek için yeni bir yöntem: Epworth ölçeği. Sleep. 1991' },
    { pmid: '26378880', en: 'Chung F et al. STOP-Bang questionnaire: screening for obstructive sleep apnoea. Chest. 2016', tr: 'Chung F ve ark. STOP-Bang anketi: obstrüktif uyku apnesi taraması. Chest. 2016' },
    { pmid: '24235903', en: 'Drake C et al. Caffeine taken 0, 3 or 6 hours before bed. J Clin Sleep Med. 2013', tr: 'Drake C ve ark. Yatmadan 0, 3 ve 6 saat önce alınan kafein. J Clin Sleep Med. 2013' },
    { pmid: '25535358', en: 'Chang AM et al. Evening use of light-emitting eReaders. PNAS. 2015', tr: 'Chang AM ve ark. Akşam saatlerinde ışık yayan okuyucu kullanımı. PNAS. 2015' },
    { pmid: '27136449', en: 'Qaseem A et al. Management of chronic insomnia in adults: ACP guideline (CBT-I first line). Ann Intern Med. 2016', tr: 'Qaseem A ve ark. Erişkinde kronik uykusuzluk yönetimi: ACP kılavuzu (ilk seçenek BDT-U). Ann Intern Med. 2016' }
  ],
  domains: {
    duration: {
      en: { why: 'The AASM and the Sleep Research Society put the adult requirement at seven hours or more on a regular basis; below that, the risks they list are not subtle ones. Regularity matters on its own — a bedtime that moves around behaves like permanent mild jet lag.',
        low: 'Fix the wake-up time first, including at the weekend, and let the bedtime follow it. A constant rising time is the single strongest anchor for the body clock and it costs nothing.',
        high: 'Your duration and rhythm are the part that is working. They are also the first thing a busy month takes away, so treat them as fixed rather than flexible.' },
      tr: { why: 'AASM ve Uyku Araştırmaları Derneği erişkin için düzenli olarak yedi saat ve üzerini işaret ediyor; altına inildiğinde sıraladıkları riskler küçük şeyler değil. Düzen tek başına da önemli: sürekli kayan bir yatış saati kalıcı hafif jet lag gibi davranıyor.',
        low: 'Önce kalkış saatini sabitleyin — hafta sonu dâhil — yatış saati onu kendiliğinden izler. Sabit kalkış saati biyolojik saatin en güçlü çıpasıdır ve hiçbir maliyeti yoktur.',
        high: 'Süre ve ritim sizde çalışan taraf. Yoğun bir ayın ilk feda ettiği şey de tam olarak bu ikisidir; esnek değil sabit muamelesi yapın.' }
    },
    onset: {
      en: { why: 'Taking more than half an hour to fall asleep, or lying awake in the middle of the night, are the two items that define insomnia on the ISI. Worry about sleep is itself scored on that scale — the anxiety keeps the loop running.',
        low: 'The evidence-based first-line treatment is not a pill: the American College of Physicians recommends cognitive behavioural therapy for insomnia (CBT-I). Its simplest rule is to get out of bed if you have been awake for twenty minutes, and go back only when sleepy.',
        high: 'You fall asleep and stay asleep. Protect the association between bed and sleep — no working, no scrolling, no lying awake for an hour hoping.' },
      tr: { why: 'Uykuya dalmanın yarım saati aşması ve gecenin ortasında uyanık kalmak, ISI ölçeğinde uykusuzluğu tanımlayan iki maddedir. Uykuya dair kaygı da aynı ölçekte puanlanır — endişe döngüyü ayakta tutar.',
        low: 'Kanıta dayalı ilk seçenek bir hap değil: Amerikan Hekimler Koleji, uykusuzluk için bilişsel davranışçı terapiyi (BDT-U) öneriyor. En basit kuralı şudur: yirmi dakikadır uyanıksanız yataktan kalkın, ancak uykunuz geldiğinde dönün.',
        high: 'Uykuya dalıyor ve uykuda kalıyorsunuz. Yatak ile uyku arasındaki çağrışımı koruyun — yatakta çalışmak, kaydırmak, bir saat umutla uyanık yatmak yok.' }
    },
    day: {
      en: { why: 'The Epworth scale measures the thing that actually matters clinically: not how tired you feel, but how likely you are to fall asleep when you should be awake. Sleepiness at the wheel is the item that carries real danger.',
        low: 'Daytime sleepiness that survives a good night is a signal, not a personality trait. Rule out the mechanical causes first — snoring, breathing pauses, restless legs, iron or thyroid problems — before assuming you simply need more discipline.',
        high: 'You are awake when you are meant to be awake, which is the outcome the whole system exists for. Watch this domain if it starts to slip: it usually moves before the others do.' },
      tr: { why: 'Epworth ölçeği klinik olarak asıl önemli olanı ölçer: ne kadar yorgun hissettiğinizi değil, uyanık olmanız gereken bir anda uyuyakalma olasılığınızı. Direksiyon başındaki uykululuk gerçek tehlike taşıyan maddedir.',
        low: 'İyi bir geceden sonra bile geçmeyen gündüz uykululuğu bir kişilik özelliği değil, bir işarettir. Daha fazla disiplin gerektiğini varsaymadan önce mekanik nedenleri eleyin: horlama, nefes durması, huzursuz bacak, demir ya da tiroit sorunları.',
        high: 'Uyanık olmanız gereken saatte uyanıksınız; bütün sistemin var olma sebebi bu sonuç. Bu alan kaymaya başlarsa dikkat edin: genelde diğerlerinden önce hareket eder.' }
    },
    env: {
      en: { why: 'This is the part of sleep you can engineer. In a controlled trial, caffeine taken six hours before bed still cut total sleep by about an hour — and the drinkers did not notice. Evening screen light delays melatonin and pushes the whole night later.',
        low: 'Change the room before you change yourself: dark, quiet, cool, and a last caffeine no later than early afternoon. These are the cheapest gains available in the whole assessment.',
        high: 'Your environment is not fighting you, which is why the rest of your answers can be read at face value. Keep the caffeine cut-off — it is the easiest one to let drift.' },
      tr: { why: 'Uykunun mühendislikle çözülebilen kısmı burası. Kontrollü bir çalışmada yatmadan altı saat önce alınan kafein toplam uykuyu yaklaşık bir saat kısalttı — üstelik içenler bunu fark etmedi. Akşam ekran ışığı melatonini geciktirip bütün geceyi ileri itiyor.',
        low: 'Kendinizi değiştirmeden önce odayı değiştirin: karanlık, sessiz, serin ve son kafein en geç öğleden hemen sonra. Bu testteki en ucuz kazanç burada.',
        high: 'Ortamınız size karşı çalışmıyor; diğer cevaplarınızın olduğu gibi okunabilmesinin sebebi bu. Kafein saatini koruyun — en kolay kayan kural odur.' }
    },
    risk: {
      en: { why: 'These items are drawn from screening tools, not from sleep hygiene advice. Loud snoring with witnessed pauses is the core of the STOP-Bang screen for obstructive sleep apnoea — a condition that is common, treatable, and easy to live with undiagnosed for years.',
        low: 'This is the one domain where the right next step is a person, not a habit. Take these answers to a doctor and ask specifically about a sleep study; untreated apnoea keeps blood pressure and daytime sleepiness high no matter what else you fix.',
        high: 'None of the mechanical warning signs are prominent in your answers, so your score is genuinely about habits rather than an underlying disorder.' },
      tr: { why: 'Bu maddeler uyku hijyeni önerilerinden değil, tarama araçlarından alındı. Tanıklı nefes duraklamalarıyla birlikte yüksek sesli horlama, obstrüktif uyku apnesi için STOP-Bang taramasının çekirdeğidir — yaygın, tedavi edilebilir ve yıllarca tanı almadan yaşanabilen bir durum.',
        low: 'Doğru adımın alışkanlık değil bir kişi olduğu tek alan burası. Bu cevapları bir hekime götürün ve özellikle uyku testini sorun; tedavi edilmemiş apne, başka ne düzeltirseniz düzeltin tansiyonu ve gündüz uykululuğunu yüksek tutar.',
        high: 'Cevaplarınızda mekanik uyarı işaretlerinin hiçbiri öne çıkmıyor; yani puanınız altta yatan bir bozukluğu değil gerçekten alışkanlıkları anlatıyor.' }
    }
  },
  actions: {
    0: { en: { do: 'Move bedtime fifteen minutes earlier each week until you are waking without an alarm.', why: 'Adults need seven hours or more on a regular basis; jumping straight to a two-hour change usually fails, a quarter-hour step does not.' },
      tr: { do: 'Alarmsız uyanana kadar her hafta yatış saatini on beş dakika öne çekin.', why: 'Erişkinin düzenli olarak yedi saat ve üzerine ihtiyacı var; iki saatlik ani değişim genelde tutmaz, çeyrek saatlik adım tutar.' } },
    1: { en: { do: 'Pick one bedtime and keep it within a thirty-minute window, seven nights a week.', why: 'A bedtime that moves keeps shifting the body clock, so the sleep you do get is worse quality even when the hours add up.' },
      tr: { do: 'Tek bir yatış saati seçin ve haftanın yedi gecesi otuz dakikalık bir pencerede tutun.', why: 'Kayan yatış saati biyolojik saati sürekli oynatır; saatler tutsa bile aldığınız uyku daha düşük kaliteli olur.' } },
    2: { en: { do: 'Cap the weekend lie-in at one hour past your workday wake-up time.', why: 'A wake-up that shifts by hours between the week and the weekend produces the same misalignment as flying across time zones.' },
      tr: { do: 'Hafta sonu geç kalkmayı, iş günü kalkış saatinizin en fazla bir saat sonrasıyla sınırlayın.', why: 'Hafta içi ile hafta sonu arasında saatlerce kayan kalkış saati, zaman dilimleri arası uçmakla aynı uyumsuzluğu yaratır.' } },
    3: { en: { do: 'Add the missing sleep to the front of the night on weekdays rather than the back of Sunday morning.', why: 'Catch-up sleep repays some of the debt but does not undo the daytime cost of the short nights that created it.' },
      tr: { do: 'Eksik uykuyu pazar sabahının sonuna değil, hafta içi gecenin başına ekleyin.', why: 'Telafi uykusu borcun bir kısmını öder ama onu yaratan kısa gecelerin gündüz maliyetini geri almaz.' } },
    4: { en: { do: 'Track hours in bed for one week before deciding you are a person who needs less sleep.', why: 'Most people who believe they need six hours are simply used to being tired; the measurement usually disagrees with the belief.' },
      tr: { do: 'Az uykuya ihtiyacı olan biri olduğunuza karar vermeden önce bir hafta boyunca yatakta geçen saatleri kaydedin.', why: 'Altı saatin yettiğine inanan çoğu kişi aslında yorgunluğa alışmıştır; ölçüm genellikle inancı doğrulamaz.' } },
    5: { en: { do: 'If you are still awake after twenty minutes, get up, go to another room in dim light, and return only when sleepy.', why: 'This is the core move in CBT-I, the treatment the American College of Physicians recommends before any medication.' },
      tr: { do: 'Yirmi dakika sonra hâlâ uyanıksanız kalkın, loş ışıkta başka bir odaya geçin ve ancak uykunuz gelince dönün.', why: 'Bu, Amerikan Hekimler Koleji\'nin her ilaçtan önce önerdiği tedavi olan BDT-U\'nun temel hamlesidir.' } },
    6: { en: { do: 'Keep the room dark and do not check the time when you wake — turn the clock away.', why: 'Clock-watching converts a normal brief awakening into an alert, calculating mind, which is what actually keeps you up.' },
      tr: { do: 'Uyandığınızda oda karanlık kalsın ve saate bakmayın — saati ters çevirin.', why: 'Saate bakmak, normal ve kısa bir uyanmayı hesap yapan uyanık bir zihne dönüştürür; sizi asıl ayakta tutan budur.' } },
    7: { en: { do: 'Get bright light into your eyes within an hour of waking, outdoors if possible.', why: 'Early waking that you cannot reverse often reflects a body clock running early; morning light is the strongest signal for shifting it.' },
      tr: { do: 'Uyandıktan sonraki bir saat içinde gözlerinize parlak ışık alın, mümkünse dışarıda.', why: 'Geri çevrilemeyen erken uyanma çoğu zaman erkene kaymış bir biyolojik saati yansıtır; sabah ışığı onu kaydırmanın en güçlü sinyalidir.' } },
    8: { en: { do: 'Write tomorrow down before you get into bed — tasks, worries, the lot, on paper.', why: 'Offloading the list gives the mind a reason to stop rehearsing it; racing thoughts at lights-out are a scored item on the insomnia index, not a character flaw.' },
      tr: { do: 'Yatağa girmeden önce yarını yazın — işler, endişeler, hepsi kâğıda.', why: 'Listeyi dışarı boşaltmak zihne provayı bırakması için bir sebep verir; ışıklar sönerken hızlanan düşünceler bir karakter kusuru değil, uykusuzluk indeksinde puanlanan bir maddedir.' } },
    9: { en: { do: 'Stop measuring your sleep for two weeks — no tracker scores, no counting.', why: 'Worry about sleep is itself an item on the Insomnia Severity Index; monitoring feeds the worry and the worry costs you sleep.' },
      tr: { do: 'İki hafta boyunca uykunuzu ölçmeyi bırakın — takip puanı yok, sayım yok.', why: 'Uykuya dair endişe, Uykusuzluk Şiddeti İndeksi\'nde başlı başına bir maddedir; ölçmek endişeyi besler, endişe de uykuya mal olur.' } },
    10: { en: { do: 'Open the curtains and get outside within thirty minutes of waking, before the first coffee.', why: 'Morning daylight sharpens the wake signal and brings the following night\'s sleep pressure forward; caffeine masks the problem instead.' },
      tr: { do: 'Uyandıktan sonraki otuz dakika içinde perdeleri açıp dışarı çıkın, ilk kahveden önce.', why: 'Sabah gün ışığı uyanıklık sinyalini keskinleştirir ve ertesi gecenin uyku baskısını öne çeker; kafein ise sorunu yalnızca maskeler.' } },
    11: { en: { do: 'Note when you doze off for a week and take that list to a doctor if it happens most days.', why: 'Falling asleep while sitting quietly is what the Epworth scale actually measures, and a high score is the standard trigger for investigating apnoea.' },
      tr: { do: 'Bir hafta boyunca uyuklama anlarınızı not edin; çoğu gün oluyorsa bu listeyi hekime götürün.', why: 'Sessizce otururken uyuyakalmak Epworth ölçeğinin ölçtüğü şeydir ve yüksek puan apne araştırmasının standart tetikleyicisidir.' } },
    12: { en: { do: 'Do not drive when this happens. Pull over, and treat it as a medical question, not a willpower one.', why: 'Sleepiness at the wheel is the highest-risk item on the Epworth scale; it is the one answer here that can cost someone their life.' },
      tr: { do: 'Bu olduğunda araç kullanmayın. Kenara çekin ve bunu irade değil, tıbbi bir soru olarak ele alın.', why: 'Direksiyon başındaki uykululuk Epworth ölçeğinin en yüksek riskli maddesidir; burada birinin hayatına mal olabilecek tek cevap odur.' } },
    13: { en: { do: 'Book the demanding part of your day for the two hours when you are reliably sharpest.', why: 'Daytime impairment is a scored insomnia item; matching the hard work to your best window buys function back while the sleep itself is being fixed.' },
      tr: { do: 'Günün zorlu işini, güvenilir biçimde en keskin olduğunuz iki saate koyun.', why: 'Gündüz işlev kaybı puanlanan bir uykusuzluk maddesidir; zor işi en iyi pencerenize denk getirmek, uyku düzelene kadar işlevi geri kazandırır.' } },
    14: { en: { do: 'Take a ten-minute walk outside at the point the slump usually hits, instead of a third coffee.', why: 'The early-afternoon dip is a normal circadian trough; light and movement lift it without stealing from the coming night.' },
      tr: { do: 'Düşüşün genelde geldiği saatte üçüncü kahve yerine on dakika dışarıda yürüyün.', why: 'Öğleden sonra düşüşü normal bir sirkadiyen çukurdur; ışık ve hareket onu, gelen geceden çalmadan kaldırır.' } },
    15: { en: { do: 'Make the room dark enough that you cannot see your own hand — blackout curtains, or a mask.', why: 'Light reaching the eye at night suppresses melatonin and fragments sleep even when you do not wake fully.' },
      tr: { do: 'Odayı kendi elinizi göremeyeceğiniz kadar karartın — karartma perdesi ya da göz bandı.', why: 'Gece göze ulaşan ışık melatonini baskılar ve tam uyanmasanız bile uykuyu parçalar.' } },
    16: { en: { do: 'Mask what you cannot remove — a fan, white noise, or earplugs.', why: 'Night-time noise triggers brief arousals you do not remember; the sleep looks whole and does not feel it.' },
      tr: { do: 'Kaldıramadığınızı maskeleyin — vantilatör, beyaz gürültü ya da kulak tıkacı.', why: 'Gece gürültüsü hatırlamadığınız kısa uyanmalar tetikler; uyku dışarıdan bütün görünür ama öyle hissettirmez.' } },
    17: { en: { do: 'Replace the pillow first — it is the cheap half of the problem and it is usually the guilty half.', why: 'Neck position drives most mattress complaints; a mattress lasts years, a pillow does not, and people replace them in the wrong order.' },
      tr: { do: 'Önce yastığı değiştirin — sorunun ucuz yarısı odur ve genellikle suçlu olan da odur.', why: 'Yatak şikâyetlerinin çoğunu boyun pozisyonu belirler; yatak yıllarca dayanır, yastık dayanmaz ve insanlar bunları yanlış sırayla değiştirir.' } },
    18: { en: { do: 'Set a caffeine cut-off eight hours before bed and hold it for two weeks.', why: 'In a controlled trial, caffeine taken six hours before bed still cut total sleep by about an hour — and participants did not notice the loss.' },
      tr: { do: 'Yatmadan sekiz saat öncesine bir kafein sınırı koyun ve iki hafta boyunca bozmayın.', why: 'Kontrollü bir çalışmada yatmadan altı saat önce alınan kafein bile toplam uykuyu yaklaşık bir saat kısalttı — üstelik katılımcılar bu kaybı fark etmedi.' } },
    19: { en: { do: 'Put the phone on the charger in another room an hour before bed.', why: 'Evening screen light delays melatonin, pushes sleep onset later and blunts next-morning alertness — measured, not assumed.' },
      tr: { do: 'Telefonu yatmadan bir saat önce başka bir odada şarja takın.', why: 'Akşam ekran ışığı melatonini geciktirir, uykuya dalışı öteler ve ertesi sabahki uyanıklığı köreltir — varsayım değil, ölçüm.' } },
    20: { en: { do: 'Ask someone to listen for pauses in your breathing, then take that answer to a doctor.', why: 'Loud snoring with witnessed pauses is the core of the STOP-Bang screen; obstructive sleep apnoea is common, treatable and routinely missed for years.' },
      tr: { do: 'Birinden nefesinizde duraklama olup olmadığını dinlemesini isteyin, sonra bu cevabı bir hekime götürün.', why: 'Tanıklı duraklamalarla birlikte yüksek sesli horlama STOP-Bang taramasının çekirdeğidir; obstrüktif uyku apnesi yaygın, tedavi edilebilir ve yıllarca gözden kaçan bir durumdur.' } },
    21: { en: { do: 'Mention the dry mouth and morning headache together at your next appointment.', why: 'That combination points at mouth-breathing and disturbed night-time breathing rather than at the room being too dry.' },
      tr: { do: 'Bir sonraki görüşmenizde ağız kuruluğu ile sabah baş ağrısını birlikte söyleyin.', why: 'Bu ikili, odanın kuru olmasından çok ağız solunumuna ve gece bozulan solunuma işaret eder.' } },
    22: { en: { do: 'Ask for a ferritin test before trying anything else for restless legs.', why: 'Low iron stores are a common and correctable driver of restless legs, and ferritin is a routine blood test.' },
      tr: { do: 'Huzursuz bacak için başka bir şey denemeden önce ferritin testi isteyin.', why: 'Düşük demir depoları huzursuz bacağın yaygın ve düzeltilebilir bir nedenidir; ferritin rutin bir kan testidir.' } },
    23: { en: { do: 'Do not stop a prescribed sleeping tablet on your own — ask about tapering alongside CBT-I.', why: 'Alcohol shortens sleep latency but fragments the second half of the night; hypnotics stopped abruptly cause rebound insomnia, which is why the guideline pairs tapering with therapy.' },
      tr: { do: 'Reçeteli bir uyku hapını kendi başınıza bırakmayın — BDT-U ile birlikte kademeli azaltmayı sorun.', why: 'Alkol uykuya dalışı kısaltır ama gecenin ikinci yarısını parçalar; aniden kesilen hipnotikler geri tepme uykusuzluğu yapar, kılavuzun azaltmayı terapiyle eşleştirmesinin sebebi budur.' } },
    24: { en: { do: 'Score your sleep once a week rather than every morning, and look at the trend.', why: 'The global rating is the single item that best tracks change; nightly scoring measures noise and feeds the worry.' },
      tr: { do: 'Uykunuzu her sabah değil, haftada bir puanlayın ve eğilime bakın.', why: 'Genel değerlendirme, değişimi en iyi izleyen tek maddedir; her gece puanlamak gürültüyü ölçer ve endişeyi besler.' } }
  },
  flags: [
    { q: [20, 11, 12], at: 4, need: 2,
      en: 'Loud snoring, witnessed breathing pauses and heavy daytime sleepiness appear together in your answers. That is the pattern the STOP-Bang screen was built for. Ask a doctor about a sleep study rather than working on habits first — untreated apnoea keeps sleepiness and blood pressure high whatever else you change.',
      tr: 'Cevaplarınızda yüksek sesli horlama, tanıklı nefes duraklamaları ve belirgin gündüz uykululuğu bir arada görünüyor. Bu, STOP-Bang taramasının tam olarak arandığı örüntüdür. Alışkanlıklarla uğraşmadan önce bir hekime uyku testini sorun — tedavi edilmemiş apne, başka ne değiştirirseniz değiştirin uykululuğu ve tansiyonu yüksek tutar.' },
    { q: [5, 6, 7, 9], at: 4, need: 3,
      en: 'Difficulty falling asleep, night-time waking and daytime worry about sleep are all present. When that persists for three months or more it meets the description of chronic insomnia, and the recommended first-line treatment is CBT-I — therapy, not medication. Ask your doctor about access to it.',
      tr: 'Uykuya dalma güçlüğü, gece uyanmaları ve gün içinde uykuya dair endişe bir arada. Bu tablo üç ay ve üzeri sürdüğünde kronik uykusuzluk tanımına uyar ve önerilen ilk seçenek tedavi BDT-U\'dur — ilaç değil, terapi. Hekiminize buna nasıl erişebileceğinizi sorun.' },
    { q: [12], at: 3, need: 1,
      en: 'You reported feeling sleepy at the wheel or somewhere dozing off would be dangerous. Treat that as urgent: it is the highest-risk item in this assessment and it needs a medical opinion, not a change of routine.',
      tr: 'Direksiyon başında ya da uyuklamanın tehlikeli olacağı bir yerde uykunuzun geldiğini belirttiniz. Bunu acil olarak ele alın: bu testteki en yüksek riskli maddedir ve rutin değişikliği değil, tıbbi görüş gerektirir.' }
  ]
};


/* ---------------------------------------------------------------
   CİLT
   --------------------------------------------------------------- */

const skin = {
  basis: {
    en: ['Randomised sunscreen trials (Nambour)', 'AAD acne guideline',
      'AAD atopic dermatitis guideline', 'ABCDE mole rule', 'Fitzpatrick sun-reactive skin types'],
    tr: ['Randomize güneş koruyucu çalışmaları (Nambour)', 'AAD akne kılavuzu',
      'AAD atopik dermatit kılavuzu', 'ABCDE ben kuralı', 'Fitzpatrick deri tipleri']
  },
  refs: [
    { pmid: '23732711', en: 'Hughes MC et al. Sunscreen and prevention of skin ageing: a randomised trial. Ann Intern Med. 2013', tr: 'Hughes MC ve ark. Güneş koruyucu ve cilt yaşlanmasının önlenmesi: randomize çalışma. Ann Intern Med. 2013' },
    { pmid: '21135266', en: 'Green AC et al. Reduced melanoma after regular sunscreen use. J Clin Oncol. 2011', tr: 'Green AC ve ark. Düzenli güneş koruyucu kullanımı sonrası melanomda azalma. J Clin Oncol. 2011' },
    { pmid: '26897386', en: 'Zaenglein AL et al. Guidelines of care for the management of acne vulgaris. J Am Acad Dermatol. 2016', tr: 'Zaenglein AL ve ark. Akne vulgaris yönetimi bakım kılavuzu. J Am Acad Dermatol. 2016' },
    { pmid: '24813302', en: 'Eichenfield LF et al. Guidelines of care for atopic dermatitis: management and treatment. J Am Acad Dermatol. 2014', tr: 'Eichenfield LF ve ark. Atopik dermatit bakım kılavuzu: yönetim ve tedavi. J Am Acad Dermatol. 2014' },
    { pmid: '17951030', en: 'Morita A. Tobacco smoke causes premature skin ageing. J Dermatol Sci. 2007', tr: 'Morita A. Tütün dumanı erken cilt yaşlanmasına yol açıyor. J Dermatol Sci. 2007' },
    { pmid: '25266053', en: 'Oyetakin-White P et al. Does poor sleep quality affect skin ageing? Clin Exp Dermatol. 2015', tr: 'Oyetakin-White P ve ark. Kötü uyku kalitesi cilt yaşlanmasını etkiliyor mu? Clin Exp Dermatol. 2015' },
    { pmid: '30096883', en: 'Juhl CR et al. Dairy intake and acne vulgaris: meta-analysis of 78,529 people. Nutrients. 2018', tr: 'Juhl CR ve ark. Süt tüketimi ve akne vulgaris: 78.529 kişilik meta-analiz. Nutrients. 2018' }
  ],
  domains: {
    sun: {
      en: { why: 'This is the only part of skincare with randomised trial evidence behind it. In the Nambour trial, adults assigned to daily sunscreen showed no detectable increase in skin ageing over four and a half years, while the discretionary-use group did — and the same cohort had roughly half the melanoma rate a decade later.',
        low: 'Daily sunscreen on the face is the highest-yield change available anywhere in this assessment. Everything else in a routine is optimisation; this one has trial evidence for both ageing and cancer.',
        high: 'You are doing the part that actually changes outcomes. The failure mode from here is seasonal drift — sunscreen quietly stops in October and does not come back until June.' },
      tr: { why: 'Cilt bakımının randomize çalışma kanıtı olan tek kısmı burası. Nambour çalışmasında günlük güneş koruyucuya atanan erişkinlerde dört buçuk yılda ölçülebilir bir cilt yaşlanması artışı görülmedi, isteğe bağlı kullanan grupta görüldü — aynı grupta on yıl sonra melanom oranı da yaklaşık yarı yarıya düşüktü.',
        low: 'Yüze her gün güneş koruyucu, bu testteki en yüksek getirili değişiklik. Rutindeki her şey ince ayardır; bunun ise hem yaşlanma hem kanser için çalışma kanıtı var.',
        high: 'Sonucu gerçekten değiştiren kısmı yapıyorsunuz. Buradan sonraki risk mevsimsel kayma: güneş koruyucu ekimde sessizce biter ve hazirana kadar geri gelmez.' }
    },
    barrier: {
      en: { why: 'A skin barrier is a physical thing — lipids between cells holding water in and irritants out. Cleansing too hot, too often or too harshly removes those lipids; moisturiser puts them back. This is why dermatology guidelines put emollients at the base of eczema care rather than at the end.',
        low: 'Strip the routine back to three steps — a gentle cleanser, a moisturiser, sunscreen — and hold it for four weeks before adding anything. Most irritated skin improves by subtraction.',
        high: 'A simple routine done daily beats an elaborate one done occasionally, and your answers describe the first. Keep the moisturiser going even in the weeks your skin behaves.' },
      tr: { why: 'Cilt bariyeri fiziksel bir şey: hücreler arasında suyu içeride, tahriş edicileri dışarıda tutan lipidler. Fazla sıcak, fazla sık ya da fazla sert temizlik bu lipidleri alır; nemlendirici geri koyar. Dermatoloji kılavuzlarının nemlendiriciyi egzama bakımının sonuna değil temeline koymasının sebebi budur.',
        low: 'Rutini üç adıma indirin — yumuşak temizleyici, nemlendirici, güneş koruyucu — ve bir şey eklemeden önce dört hafta koruyun. Tahriş olmuş ciltlerin çoğu ekleyerek değil çıkararak düzelir.',
        high: 'Her gün yapılan basit bir rutin, ara sıra yapılan gösterişli bir rutini yener; cevaplarınız birincisini anlatıyor. Cildinizin uslu durduğu haftalarda da nemlendiriciyi bırakmayın.' }
    },
    irritate: {
      en: { why: 'Most of what people call "sensitive skin" is skin that is being handled roughly. Squeezing a spot pushes inflammation deeper and is the main route to the dark marks and scars that outlast the spot itself by months.',
        low: 'Pick the one habit here you do most often and stop just that one for a month. Trying to change all of them at once is how people end up changing none.',
        high: 'You are not adding damage on top of whatever else is happening, which means the rest of your score reflects real biology rather than handling.' },
      tr: { why: '"Hassas cilt" denen şeyin çoğu, sert muamele gören cilttir. Bir sivilceyi sıkmak iltihabı derine iter ve sivilcenin kendisinden aylarca uzun yaşayan koyu lekelerin ve izlerin ana yoludur.',
        low: 'Buradaki en sık yaptığınız tek alışkanlığı seçin ve bir ay boyunca yalnızca onu bırakın. Hepsini birden değiştirmeye çalışmak, hiçbirini değiştirememenin yoludur.',
        high: 'Olan biten her neyse üstüne hasar eklemiyorsunuz; bu da puanınızın geri kalanının muameleyi değil gerçek biyolojiyi yansıttığı anlamına gelir.' }
    },
    inside: {
      en: { why: 'Skin is downstream of the rest of the body. Poor sleepers showed higher measured signs of skin ageing and slower barrier recovery after a controlled stress; tobacco smoke damages collagen and elastin directly, which is why smokers\' skin ages visibly earlier.',
        low: 'The lever here is not a cream. Sleep and tobacco move skin more than any product in the price range people usually consider.',
        high: 'The internal side is not working against your skin, so topical care has a fair chance of showing its effect.' },
      tr: { why: 'Cilt, bedenin geri kalanının aşağı havzasıdır. Kötü uyuyanlarda ölçülen cilt yaşlanması işaretleri daha yüksek, kontrollü bir zorlanmadan sonra bariyer toparlanması daha yavaş bulundu; tütün dumanı kollajen ve elastini doğrudan bozar, sigara içenlerin cildinin gözle görülür biçimde erken yaşlanmasının sebebi budur.',
        low: 'Buradaki kaldıraç bir krem değil. Uyku ve tütün, insanların düşündüğü fiyat aralığındaki hiçbir üründen daha çok etki eder.',
        high: 'İç taraf cildinize karşı çalışmıyor; bu da topikal bakımın etkisini gösterebilmesi için adil bir şans demek.' }
    },
    watch: {
      en: { why: 'Acne, rosacea and eczema respond to treatment, not to more products — the dermatology guidelines are explicit that persistent disease needs prescription care. Separately, a mole that changes shape, colour or size is the single sign worth acting on quickly.',
        low: 'Something on your skin is not settling. That is a referral, not a shopping list: the guideline threshold for treating acne is persistence and distress, not severity.',
        high: 'You are watching your skin and you would act on a change, which is the whole of self-surveillance done properly.' },
      tr: { why: 'Akne, rozase ve egzama daha fazla ürüne değil tedaviye yanıt verir — dermatoloji kılavuzları inatçı hastalığın reçeteli bakım gerektirdiğini açıkça söyler. Ayrıca şekil, renk ya da boyut değiştiren bir ben, hızla harekete geçmeyi hak eden tek işarettir.',
        low: 'Cildinizde geçmeyen bir şey var. Bu bir alışveriş listesi değil, bir yönlendirmedir: kılavuzun akne tedavisi eşiği şiddet değil, kalıcılık ve rahatsızlıktır.',
        high: 'Cildinizi izliyorsunuz ve bir değişiklikte harekete geçerdiniz; düzgün yapılan öz-takip tam olarak budur.' }
    }
  },
  actions: {
    0: { en: { do: 'Put sunscreen next to your toothbrush and apply it every morning, rain or shine.', why: 'In a randomised trial, daily use prevented measurable skin ageing over four and a half years; discretionary use did not.' },
      tr: { do: 'Güneş koruyucuyu diş fırçanızın yanına koyun ve her sabah, yağmur çamur demeden sürün.', why: 'Randomize bir çalışmada günlük kullanım dört buçuk yılda ölçülebilir cilt yaşlanmasını önledi; isteğe bağlı kullanım önlemedi.' } },
    1: { en: { do: 'Keep the same sunscreen habit through winter and on overcast days.', why: 'UVA passes through cloud and window glass; it is the wavelength that drives ageing, and it does not take the winter off.' },
      tr: { do: 'Aynı güneş koruyucu alışkanlığını kışın ve kapalı havalarda da sürdürün.', why: 'UVA bulutu ve cam pencereyi geçer; yaşlanmayı sürükleyen dalga boyu odur ve kışın tatile çıkmaz.' } },
    2: { en: { do: 'Move what you can out of the 11:00–16:00 window, and take shade when you cannot.', why: 'UV index peaks around solar noon; the same activity three hours later carries a fraction of the dose.' },
      tr: { do: 'Yapabildiğinizi 11.00–16.00 aralığının dışına alın, alamıyorsanız gölgeye geçin.', why: 'UV indeksi öğle saatinde zirve yapar; aynı etkinlik üç saat sonra bu dozun küçük bir kısmını taşır.' } },
    3: { en: { do: 'Stop using sunbeds. There is no dose that tans without also causing the damage.', why: 'Tanning is the visible record of DNA damage; sunbed use is classed as a human carcinogen and raises melanoma risk, especially with early exposure.' },
      tr: { do: 'Solaryumu bırakın. Hasar vermeden bronzlaştıran bir doz yok.', why: 'Bronzluk, DNA hasarının gözle görülür kaydıdır; solaryum kullanımı insan karsinojeni olarak sınıflanır ve özellikle erken yaşta melanom riskini artırır.' } },
    4: { en: { do: 'Add a wide-brimmed hat and sleeves — they work while sunscreen is wearing off.', why: 'Sunscreen is almost always applied thinner than the tested amount; fabric and shade do not depend on reapplication.' },
      tr: { do: 'Geniş kenarlı şapka ve uzun kol ekleyin — güneş koruyucunun etkisi azalırken onlar çalışmaya devam eder.', why: 'Güneş koruyucu neredeyse her zaman test edilenden ince sürülür; kumaş ve gölge ise yeniden sürmeye bağlı değildir.' } },
    5: { en: { do: 'Do the same three steps at the same two times every day for four weeks before judging anything.', why: 'Skin cell turnover takes about a month, so a routine changed weekly is never given long enough to show whether it works.' },
      tr: { do: 'Aynı üç adımı, günde aynı iki saatte, dört hafta boyunca yapın; öncesinde hiçbir şeye karar vermeyin.', why: 'Cilt hücre yenilenmesi yaklaşık bir ay sürer; haftada bir değiştirilen rutine işe yarayıp yaramadığını gösterecek süre hiç verilmemiş olur.' } },
    6: { en: { do: 'Apply moisturiser within three minutes of washing, while the skin is still damp.', why: 'Emollients work by trapping the water that is already there; applied to dry skin they have much less to hold.' },
      tr: { do: 'Nemlendiriciyi yıkandıktan sonraki üç dakika içinde, cilt hâlâ nemliyken sürün.', why: 'Nemlendiriciler hâlihazırda orada olan suyu hapsederek çalışır; kuru cilde sürüldüğünde tutacak çok daha az şey bulurlar.' } },
    7: { en: { do: 'Wash with lukewarm water and a cleanser that does not leave the skin feeling tight.', why: 'That tight feeling is the barrier lipids being stripped; it is the start of the dryness-irritation loop, not a sign of cleanliness.' },
      tr: { do: 'Ilık suyla ve cildi gergin bırakmayan bir temizleyiciyle yıkayın.', why: 'O gerginlik hissi bariyer lipidlerinin sıyrılmasıdır; temizliğin değil, kuruluk-tahriş döngüsünün başlangıcının işaretidir.' } },
    8: { en: { do: 'Cut exfoliation to once a week and stop entirely if the skin is stinging.', why: 'Over-exfoliated skin looks red and reactive and is usually mistaken for skin that needs more treatment, which makes it worse.' },
      tr: { do: 'Peelingi haftada bire indirin, cildiniz yanıyorsa tamamen durdurun.', why: 'Aşırı peeling görmüş cilt kızarık ve tepkili görünür ve genelde daha fazla işlem gerektiren cilt sanılır; bu da durumu kötüleştirir.' } },
    9: { en: { do: 'Introduce one new product at a time and give it two weeks alone.', why: 'When several things change together, a reaction cannot be traced to its cause and the whole routine gets abandoned.' },
      tr: { do: 'Yeni ürünleri teker teker ekleyin ve her birine tek başına iki hafta verin.', why: 'Birkaç şey birlikte değişince bir tepkinin kaynağı bulunamaz ve bütün rutin terk edilir.' } },
    10: { en: { do: 'Keep micellar water and a cloth by the bed for the nights you cannot face the sink.', why: 'Makeup left overnight traps sebum and debris against the skin; the barrier to removing it is effort, so lower the effort.' },
      tr: { do: 'Lavaboya gidemeyeceğiniz geceler için yatağın yanında misel su ve bir mendil bulundurun.', why: 'Gece boyunca kalan makyaj sebumu ve kiri cilde hapseder; çıkarmanın önündeki engel çabadır, o hâlde çabayı düşürün.' } },
    11: { en: { do: 'Cover the spot instead of squeezing it — a hydrocolloid patch removes the option.', why: 'Squeezing pushes inflammation deeper and is the main cause of the dark marks and scars that outlast the spot by months.' },
      tr: { do: 'Sivilceyi sıkmak yerine üstünü kapatın — hidrokolloid bant seçeneği ortadan kaldırır.', why: 'Sıkmak iltihabı derine iter ve sivilceden aylarca uzun yaşayan koyu lekelerin ve izlerin başlıca sebebidir.' } },
    12: { en: { do: 'Switch to fragrance-free versions of everything that touches your skin, laundry detergent included.', why: 'Fragrance is the most common cause of contact dermatitis, and detergent residue stays on fabric that sits against skin all night.' },
      tr: { do: 'Cildinize değen her şeyi kokusuz sürümüyle değiştirin, çamaşır deterjanı dâhil.', why: 'Koku, temas dermatitinin en yaygın nedenidir ve deterjan kalıntısı bütün gece cilde temas eden kumaşta kalır.' } },
    13: { en: { do: 'Clean whatever rubs — phone screen, helmet lining, collar — and give the skin a break from it daily.', why: 'Friction plus occlusion is a well-described trigger for spots in exactly the pattern of whatever is pressing on the skin.' },
      tr: { do: 'Sürtünen ne varsa temizleyin — telefon ekranı, kask astarı, yaka — ve cilde her gün ondan ara verin.', why: 'Sürtünme ile kapalılık birleşince, cilde bastıran şeyin tam deseninde sivilce çıkışı iyi tanımlanmış bir tetikleyicidir.' } },
    14: { en: { do: 'Change the pillowcase twice a week, and after any night you slept in product.', why: 'Pillowcases collect sebum and residue and press them back against the face for eight hours a night.' },
      tr: { do: 'Yastık kılıfını haftada iki kez ve ürünle uyuduğunuz her geceden sonra değiştirin.', why: 'Yastık kılıfı sebum ve kalıntı toplar ve bunları gecede sekiz saat boyunca yüze geri bastırır.' } },
    15: { en: { do: 'Treat sleep as part of the routine — the same seven hours you would give any other repair process.', why: 'Poor sleepers showed higher measured signs of skin ageing and slower barrier recovery after a controlled skin stress.' },
      tr: { do: 'Uykuyu rutinin parçası sayın — herhangi bir onarım sürecine vereceğiniz yedi saatin aynısı.', why: 'Kötü uyuyanlarda ölçülen cilt yaşlanması işaretleri daha yüksek, kontrollü bir cilt zorlanmasından sonra bariyer toparlanması daha yavaş bulundu.' } },
    16: { en: { do: 'If you smoke, put quitting above every product decision you are weighing.', why: 'Tobacco smoke damages collagen and elastin directly; it is the reason smokers\' skin ages visibly earlier than non-smokers of the same age.' },
      tr: { do: 'Sigara içiyorsanız bırakmayı, tarttığınız her ürün kararının önüne koyun.', why: 'Tütün dumanı kollajen ve elastini doğrudan bozar; sigara içenlerin cildinin aynı yaştaki içmeyenlerden gözle görülür biçimde erken yaşlanmasının sebebi budur.' } },
    17: { en: { do: 'If acne is active, try four weeks without milk and see whether anything changes for you.', why: 'A meta-analysis of 78,529 people found a modest but consistent association between dairy intake and acne; modest means worth testing on yourself, not worth panicking about.' },
      tr: { do: 'Aktif akneniz varsa dört hafta sütü bırakıp sizde bir şey değişiyor mu bakın.', why: '78.529 kişilik bir meta-analiz süt tüketimi ile akne arasında küçük ama tutarlı bir ilişki buldu; küçük demek, panik yapmaya değil kendinizde denemeye değer demektir.' } },
    18: { en: { do: 'Drink to thirst across the day rather than trying to hit a target in the evening.', why: 'Dehydration shows on skin, but drinking beyond your needs does not add anything — the effect has a floor, not a ceiling.' },
      tr: { do: 'Akşam bir hedefi tutturmaya çalışmak yerine gün boyunca susadıkça için.', why: 'Susuz kalmak cilde yansır ama ihtiyacınızın ötesinde içmek bir şey eklemez — etkinin tavanı değil, tabanı vardır.' } },
    19: { en: { do: 'Note what your skin does in the two weeks after a stressful period, not during it.', why: 'Stress-linked flares usually lag the stress itself, so people connect them to the wrong week and change the wrong thing.' },
      tr: { do: 'Cildinizin ne yaptığını stresli dönemin sırasında değil, sonraki iki haftada not edin.', why: 'Strese bağlı alevlenmeler genelde stresin kendisinden geriden gelir; bu yüzden insanlar onları yanlış haftaya bağlar ve yanlış şeyi değiştirir.' } },
    20: { en: { do: 'Book a dermatologist rather than trying a fourth product.', why: 'Acne, rosacea and eczema respond to prescription treatment; the guideline threshold is persistence and distress, not how severe it looks to someone else.' },
      tr: { do: 'Dördüncü ürünü denemek yerine bir dermatoloğa randevu alın.', why: 'Akne, rozase ve egzama reçeteli tedaviye yanıt verir; kılavuzun eşiği başkasına ne kadar ağır göründüğü değil, kalıcılık ve rahatsızlıktır.' } },
    21: { en: { do: 'Photograph your moles once a year against a ruler, in the same light.', why: 'The ABCDE rule depends on noticing change, and change is far easier to see against last year\'s photograph than against memory.' },
      tr: { do: 'Benlerinizi yılda bir kez, aynı ışıkta ve bir cetvelin yanında fotoğraflayın.', why: 'ABCDE kuralı değişimi fark etmeye dayanır ve değişimi geçen yılın fotoğrafında görmek, hafızada görmekten çok daha kolaydır.' } },
    22: { en: { do: 'Mention night-time itching specifically — it changes what a doctor considers.', why: 'Itch that wakes you is a marker of severity in eczema guidelines and is one of the things treatment is measured against.' },
      tr: { do: 'Gece kaşıntısını özellikle söyleyin — bu, hekimin değerlendirmesini değiştirir.', why: 'Uykudan uyandıran kaşıntı egzama kılavuzlarında şiddet göstergesidir ve tedavinin başarısı bunun üzerinden ölçülür.' } },
    23: { en: { do: 'Set a one-month rule: anything that has not cleared by then gets looked at.', why: 'A fixed deadline turns "I will give it a bit longer" into a decision, which is where most delayed skin diagnoses come from.' },
      tr: { do: 'Bir ay kuralı koyun: o zamana kadar geçmeyen her şey gösterilir.', why: 'Sabit bir süre, "biraz daha bekleyeyim"i bir karara dönüştürür; geciken cilt tanılarının çoğu tam olarak oradan çıkar.' } },
    24: { en: { do: 'Photograph your face in the same light once a month instead of judging it in the mirror.', why: 'Day-to-day appearance is dominated by lighting and mood; a monthly photograph is the only comparison that shows the trend.' },
      tr: { do: 'Aynada değerlendirmek yerine ayda bir kez yüzünüzü aynı ışıkta fotoğraflayın.', why: 'Günlük görünümü ışık ve ruh hâli belirler; eğilimi gösteren tek karşılaştırma aylık fotoğraftır.' } }
  },
  flags: [
    { q: [20, 22], at: 4, need: 2,
      en: 'Persistent spots or redness together with itching that wakes you is the combination dermatology guidelines treat rather than manage at home. Ask for a referral — acne, rosacea and eczema all respond to prescription treatment and none of them respond to buying more products.',
      tr: 'Geçmeyen sivilce ya da kızarıklığın, uykudan uyandıran kaşıntıyla birlikte olması, dermatoloji kılavuzlarının evde yönetmek yerine tedavi ettiği tablodur. Yönlendirme isteyin — akne, rozase ve egzamanın üçü de reçeteli tedaviye yanıt verir, hiçbiri daha fazla ürün almaya yanıt vermez.' },
    { q: [21], at: 3, need: 1,
      en: 'You said you would not notice a mole changing. Take ten minutes to photograph your moles, and ask a doctor to look at any that are asymmetric, have ragged borders, more than one colour, are wider than 6 mm, or have changed at all.',
      tr: 'Bir benin değiştiğini fark etmeyeceğinizi belirttiniz. On dakika ayırıp benlerinizi fotoğraflayın ve asimetrik olan, kenarları düzensiz, birden fazla renk taşıyan, 6 mm\'den geniş ya da herhangi bir şekilde değişmiş olanları bir hekime gösterin.' },
    { q: [3], at: 3, need: 1,
      en: 'Regular sunbed use came through in your answers. It is classified as a human carcinogen and the risk rises with earlier and more frequent exposure — this is the single change on this page with the largest long-term effect.',
      tr: 'Cevaplarınızda düzenli solaryum kullanımı öne çıktı. Solaryum insan karsinojeni olarak sınıflanır ve risk erken ve sık maruziyetle artar — bu sayfadaki en büyük uzun vadeli etkiye sahip tek değişiklik budur.' }
  ]
};


/* ---------------------------------------------------------------
   BESLENME
   --------------------------------------------------------------- */

const diet = {
  basis: {
    en: ['MEDAS-14 Mediterranean adherence screener', 'DASH dietary pattern',
      'NOVA ultra-processed food classification', 'WHO sodium and free-sugar guidance'],
    tr: ['MEDAS-14 Akdeniz diyeti uyum ölçeği', 'DASH beslenme örüntüsü',
      'NOVA ultra-işlenmiş gıda sınıflaması', 'DSÖ sodyum ve serbest şeker önerileri']
  },
  refs: [
    { pmid: '21508208', en: 'Schröder H et al. A short screener is valid for assessing Mediterranean diet adherence (MEDAS). J Nutr. 2011', tr: 'Schröder H ve ark. Akdeniz diyeti uyumunu ölçen kısa tarama geçerlidir (MEDAS). J Nutr. 2011' },
    { pmid: '29897866', en: 'Estruch R et al. Primary prevention of cardiovascular disease with a Mediterranean diet (PREDIMED). N Engl J Med. 2018', tr: 'Estruch R ve ark. Akdeniz diyetiyle kardiyovasküler hastalığın birincil önlenmesi (PREDIMED). N Engl J Med. 2018' },
    { pmid: '31105044', en: 'Hall KD et al. Ultra-processed diets cause excess calorie intake and weight gain: inpatient randomised trial. Cell Metab. 2019', tr: 'Hall KD ve ark. Ultra-işlenmiş diyetler fazla kalori alımına ve kilo artışına yol açıyor: yatarak randomize çalışma. Cell Metab. 2019' },
    { pmid: '28338764', en: 'Aune D et al. Fruit and vegetable intake and risk of cardiovascular disease, cancer and mortality. Int J Epidemiol. 2017', tr: 'Aune D ve ark. Sebze-meyve alımı ile kalp-damar hastalığı, kanser ve ölüm riski. Int J Epidemiol. 2017' },
    { pmid: '30638909', en: 'Reynolds A et al. Carbohydrate quality and human health: series of meta-analyses. Lancet. 2019', tr: 'Reynolds A ve ark. Karbonhidrat kalitesi ve insan sağlığı: meta-analiz serisi. Lancet. 2019' },
    { pmid: '20693348', en: 'Malik VS et al. Sugar-sweetened beverages and risk of metabolic syndrome and type 2 diabetes. Diabetes Care. 2010', tr: 'Malik VS ve ark. Şekerle tatlandırılmış içecekler, metabolik sendrom ve tip 2 diyabet riski. Diabetes Care. 2010' },
    { pmid: '11136953', en: 'Sacks FM et al. Effects on blood pressure of reduced dietary sodium and the DASH diet. N Engl J Med. 2001', tr: 'Sacks FM ve ark. Azaltılmış sodyum ve DASH diyetinin kan basıncına etkisi. N Engl J Med. 2001' },
    { pmid: '29676281', en: 'Wood AM et al. Risk thresholds for alcohol consumption: 599,912 drinkers. Lancet. 2018', tr: 'Wood AM ve ark. Alkol tüketiminde risk eşikleri: 599.912 kişi. Lancet. 2018' }
  ],
  domains: {
    pattern: {
      en: { why: 'Meal rhythm is the scaffolding the rest of the diet hangs on. When breakfast and lunch are unpredictable, the evening is left to compensate — and evening eating is where portion control, ultra-processed food and alcohol all cluster.',
        low: 'Make two meals predictable before you change what is in them. Structure fixes more evening overeating than any rule about what to avoid.',
        high: 'Your rhythm is stable, which is why what you eat can actually be judged on its merits rather than on how hungry you were by 20:00.' },
      tr: { why: 'Öğün ritmi, beslenmenin geri kalanının asıldığı iskelettir. Kahvaltı ve öğle öngörülemez olduğunda telafiyi akşam üstlenir — porsiyon kontrolü, ultra-işlenmiş gıda ve alkol de akşamda kümelenir.',
        low: 'İçeriğini değiştirmeden önce iki öğünü öngörülebilir kılın. Akşam aşırı yemeyi, neyden kaçınılacağına dair her kuraldan çok düzen çözer.',
        high: 'Ritminiz oturmuş; yediklerinizin, saat 20.00\'de ne kadar aç olduğunuza göre değil kendi değerine göre yargılanabilmesinin sebebi bu.' }
    },
    plants: {
      en: { why: 'This is the best-evidenced part of any diet. Pooling 95 studies, risk of cardiovascular disease, cancer and death kept falling up to about 800 g of fruit and vegetables a day — roughly ten portions, with most of the benefit already banked by five.',
        low: 'Add rather than remove. One extra portion at two meals is a bigger change than any elimination, and it is the only dietary move with dose-response evidence this consistent.',
        high: 'You are already in the range where the curve flattens. Variety is the remaining lever — different plants feed different parts of the gut microbiome.' },
      tr: { why: 'Her beslenmenin en iyi kanıtlanmış kısmı burası. 95 çalışmanın birleştirildiği analizde kalp-damar hastalığı, kanser ve ölüm riski günde yaklaşık 800 g sebze-meyveye kadar düşmeye devam etti — kabaca on porsiyon; faydanın çoğu ise beşte zaten cepte.',
        low: 'Çıkarmak yerine ekleyin. İki öğüne birer porsiyon eklemek her eleme denemesinden büyük bir değişikliktir ve doz-yanıt kanıtı bu kadar tutarlı olan tek beslenme hamlesidir.',
        high: 'Eğrinin düzleştiği aralıktasınız. Kalan kaldıraç çeşitlilik — farklı bitkiler bağırsak mikrobiyotasının farklı kısımlarını besler.' }
    },
    protein: {
      en: { why: 'The PREDIMED trial randomised nearly 7,500 people at cardiovascular risk to a Mediterranean pattern with extra-virgin olive oil or nuts, and saw fewer major cardiovascular events than in the low-fat control group. The fat quality, not the fat quantity, is what separated the arms.',
        low: 'Swap the fat before you cut it: olive oil for the cooking fat, fish twice a week, processed meat down to occasional.',
        high: 'Your protein and fat sources look like the pattern that was actually tested in a trial, which is a rarer thing in nutrition than it sounds.' },
      tr: { why: 'PREDIMED çalışması kardiyovasküler riski olan yaklaşık 7.500 kişiyi sızma zeytinyağı ya da kuruyemişle desteklenmiş Akdeniz örüntüsüne randomize etti ve düşük yağlı kontrol grubuna göre daha az majör kardiyovasküler olay gördü. Kolları ayıran şey yağın miktarı değil kalitesiydi.',
        low: 'Yağı kesmeden önce değiştirin: pişirme yağı zeytinyağı, haftada iki kez balık, işlenmiş et ara sıraya insin.',
        high: 'Protein ve yağ kaynaklarınız gerçekten bir çalışmada test edilmiş örüntüye benziyor; bu, beslenmede kulağa geldiğinden daha nadir bir durumdur.' }
    },
    processed: {
      en: { why: 'In a controlled inpatient trial where both diets were matched for calories, sugar, fat, fibre and salt on offer, people ate about 500 kcal a day more on the ultra-processed menu and gained weight — without reporting that it tasted better. The food itself changed how much was eaten.',
        low: 'The target is not "eating less". It is putting fewer decisions in the hands of food that is engineered to be eaten quickly.',
        high: 'You are mostly eating food that does not override your own appetite signals, which is the mechanism that trial actually demonstrated.' },
      tr: { why: 'Her iki menünün kalori, şeker, yağ, lif ve tuz açısından eşitlendiği kontrollü bir yatan hasta çalışmasında insanlar ultra-işlenmiş menüde günde yaklaşık 500 kcal fazla yedi ve kilo aldı — üstelik daha lezzetli bulduklarını söylemeden. Ne kadar yendiğini gıdanın kendisi değiştirdi.',
        low: 'Hedef "daha az yemek" değil. Hızlı yenmek üzere tasarlanmış gıdanın eline daha az karar bırakmak.',
        high: 'Çoğunlukla kendi iştah sinyallerinizi ezmeyen gıdalar yiyorsunuz; o çalışmanın gösterdiği mekanizma tam olarak budur.' }
    },
    salt: {
      en: { why: 'In the DASH-Sodium trial, lowering sodium reduced blood pressure at every level tested, and the lowest sodium arm on the DASH pattern gave the largest drop of all. Most of that sodium is not in the salt cellar — it is already in bread, cheese, cured meat and ready meals.',
        low: 'Read the label before you move the salt cellar. Cutting three packaged items usually beats cooking without salt, and it does not make food taste of nothing.',
        high: 'Sodium and alcohol are not quietly undoing the rest of your diet, which is where a lot of otherwise good eating patterns leak.' },
      tr: { why: 'DASH-Sodyum çalışmasında sodyumu azaltmak test edilen her düzeyde kan basıncını düşürdü; en düşük sodyumla DASH örüntüsü en büyük düşüşü verdi. Bu sodyumun çoğu tuzlukta değil — ekmekte, peynirde, şarküteride ve hazır yemekte zaten var.',
        low: 'Tuzluğu kaldırmadan önce etiketi okuyun. Üç paketli ürünü çıkarmak genelde tuzsuz pişirmekten iyi sonuç verir ve yemeğin tadını yok etmez.',
        high: 'Sodyum ve alkol beslenmenizin geri kalanını sessizce bozmuyor; iyi giden pek çok beslenme düzeninin su aldığı yer tam da burasıdır.' }
    }
  },
  actions: {
    0: { en: { do: 'Fix breakfast and lunch to a thirty-minute window and leave dinner flexible.', why: 'Predictable early meals stop the evening from doing the compensating, which is where most unplanned eating happens.' },
      tr: { do: 'Kahvaltı ve öğle yemeğini otuz dakikalık bir pencereye sabitleyin, akşamı esnek bırakın.', why: 'Öngörülebilir erken öğünler telafiyi akşamdan alır; plansız yemenin çoğu tam orada olur.' } },
    1: { en: { do: 'Keep one no-preparation meal on hand for the days you would otherwise skip.', why: 'Skipped meals are almost always repaid later with interest; a boring meal eaten on time beats a good one eaten at 22:00.' },
      tr: { do: 'Atlayacağınız günler için hazırlık gerektirmeyen tek bir öğünü el altında tutun.', why: 'Atlanan öğün neredeyse her zaman sonradan faiziyle ödenir; zamanında yenen sıkıcı bir öğün, 22.00\'de yenen iyi bir öğünü yener.' } },
    2: { en: { do: 'Set a kitchen-closed time three hours before bed.', why: 'A large meal close to sleep raises overnight glucose and reflux and shifts the whole night later; a fixed cut-off is easier to keep than a portion rule.' },
      tr: { do: 'Yatmadan üç saat öncesine bir "mutfak kapandı" saati koyun.', why: 'Uykuya yakın büyük bir öğün gece boyu glukozu ve reflüyü artırır ve bütün geceyi ileri iter; sabit bir saat, porsiyon kuralından daha kolay tutulur.' } },
    3: { en: { do: 'Before eating outside a meal, drink a glass of water and wait ten minutes.', why: 'Stress and boredom eating is fast and automatic; a short delay is enough for the intention to catch up with the hand.' },
      tr: { do: 'Öğün dışı bir şey yemeden önce bir bardak su için ve on dakika bekleyin.', why: 'Stres ve can sıkıntısı yemesi hızlı ve otomatiktir; kısa bir gecikme niyetin eli yakalamasına yeter.' } },
    4: { en: { do: 'Cook one extra portion each time and eat it the next day.', why: 'Home cooking raises diet quality mainly by removing the decision at the moment you are hungriest.' },
      tr: { do: 'Her pişirdiğinizde bir porsiyon fazla yapın ve ertesi gün onu yiyin.', why: 'Evde pişirmek beslenme kalitesini asıl olarak en aç olduğunuz andaki kararı ortadan kaldırarak yükseltir.' } },
    5: { en: { do: 'Put a vegetable on the plate at two meals a day before changing anything else.', why: 'Pooled across 95 studies, risk of heart disease, cancer and death kept falling up to around ten portions a day — five already captures most of it.' },
      tr: { do: 'Başka hiçbir şeyi değiştirmeden önce günde iki öğünde tabağa sebze koyun.', why: '95 çalışmanın birleştirildiği analizde kalp hastalığı, kanser ve ölüm riski günde yaklaşık on porsiyona kadar düşmeyi sürdürdü — beş porsiyon çoğunu zaten yakalıyor.' } },
    6: { en: { do: 'Cook pulses once a week and keep a tin in the cupboard for the other days.', why: 'Three servings a week is the threshold the Mediterranean adherence screener uses, and tinned counts.' },
      tr: { do: 'Haftada bir kez baklagil pişirin, diğer günler için dolapta bir konserve bulundurun.', why: 'Akdeniz uyum ölçeğinin kullandığı eşik haftada üç porsiyondur ve konserve de sayılır.' } },
    7: { en: { do: 'Swap one refined grain a day for a wholegrain — bulgur instead of rice, wholemeal instead of white.', why: 'Across meta-analyses, higher whole grain and fibre intake tracked with lower rates of heart disease, type 2 diabetes and colorectal cancer.' },
      tr: { do: 'Günde bir rafine tahılı tam tahılla değiştirin — pirinç yerine bulgur, beyaz yerine tam buğday.', why: 'Meta-analizlerde yüksek tam tahıl ve lif alımı; kalp hastalığı, tip 2 diyabet ve kolorektal kanser oranlarının düşüklüğüyle birlikte gidiyor.' } },
    8: { en: { do: 'Keep a bag of unsalted nuts where you would otherwise reach for a biscuit.', why: 'Nuts were one of the two supplemented arms in PREDIMED, and a handful three times a week is the screener threshold.' },
      tr: { do: 'Bisküviye uzanacağınız yere bir paket tuzsuz kuruyemiş koyun.', why: 'Kuruyemiş, PREDIMED\'de desteklenen iki koldan biriydi; ölçeğin eşiği haftada üç kez bir avuçtur.' } },
    9: { en: { do: 'Aim for a different plant food each day of the week rather than the same three.', why: 'Different plants feed different bacterial groups in the gut; variety is a separate lever from quantity.' },
      tr: { do: 'Aynı üç bitki yerine haftanın her günü farklı bir bitkisel gıdayı hedefleyin.', why: 'Farklı bitkiler bağırsakta farklı bakteri gruplarını besler; çeşitlilik miktardan ayrı bir kaldıraçtır.' } },
    10: { en: { do: 'Put fish on the shopping list twice a week — tinned oily fish counts.', why: 'Fish twice weekly is a scored item on the Mediterranean adherence screener used in the PREDIMED trial.' },
      tr: { do: 'Alışveriş listesine haftada iki kez balık yazın — konserve yağlı balık da sayılır.', why: 'Haftada iki kez balık, PREDIMED çalışmasında kullanılan Akdeniz uyum ölçeğinde puanlanan bir maddedir.' } },
    11: { en: { do: 'Move processed meat from a daily item to a weekly one.', why: 'Processed meat is classified as carcinogenic to humans for colorectal cancer; frequency is the part you control.' },
      tr: { do: 'İşlenmiş eti günlük bir üründen haftalık bir ürüne taşıyın.', why: 'İşlenmiş et, kolorektal kanser açısından insanda kanserojen olarak sınıflandırılmıştır; kontrol edebildiğiniz kısım sıklıktır.' } },
    12: { en: { do: 'Make olive oil the default cooking fat and keep the others for specific dishes.', why: 'Extra-virgin olive oil was the supplement in one of PREDIMED\'s two intervention arms, not an incidental detail.' },
      tr: { do: 'Zeytinyağını varsayılan pişirme yağı yapın, diğerlerini belirli yemeklere saklayın.', why: 'Sızma zeytinyağı, PREDIMED\'in iki müdahale kolundan birinin takviyesiydi; tesadüfi bir ayrıntı değil.' } },
    13: { en: { do: 'Move deep-fried food to something you eat out, not something you make at home.', why: 'Repeatedly heated frying oil generates compounds linked to cardiovascular risk; making it inconvenient is more reliable than resolving to eat less of it.' },
      tr: { do: 'Kızartmayı evde yaptığınız değil, dışarıda yediğiniz bir şey hâline getirin.', why: 'Tekrar tekrar ısıtılan kızartma yağı, kardiyovasküler riskle ilişkilendirilen bileşikler üretir; onu zahmetli kılmak, az yemeye karar vermekten daha güvenilirdir.' } },
    14: { en: { do: 'Put a protein source on the plate first, then build the meal around it.', why: 'Protein at each meal supports satiety and muscle maintenance; ordering the plate decides the meal more reliably than willpower does.' },
      tr: { do: 'Tabağa önce bir protein kaynağı koyun, öğünü onun etrafında kurun.', why: 'Her öğünde protein tokluğu ve kas korunumunu destekler; tabağı sıralamak öğünü iradeden daha güvenilir biçimde belirler.' } },
    15: { en: { do: 'Replace one sugary drink a day with water or unsweetened tea.', why: 'A meta-analysis of over 300,000 people linked one to two sugary drinks a day with a clearly higher rate of type 2 diabetes and metabolic syndrome.' },
      tr: { do: 'Günde bir şekerli içeceği su ya da şekersiz çayla değiştirin.', why: '300.000\'den fazla kişiyi kapsayan bir meta-analiz, günde bir-iki şekerli içeceği belirgin biçimde daha yüksek tip 2 diyabet ve metabolik sendrom oranıyla ilişkilendirdi.' } },
    16: { en: { do: 'Choose the version with a short ingredient list you could buy separately.', why: 'On an inpatient trial with matched nutrients, people ate about 500 kcal a day more on the ultra-processed menu and gained weight.' },
      tr: { do: 'İçindekileri ayrı ayrı satın alabileceğiniz kadar kısa olan sürümü seçin.', why: 'Besinleri eşitlenmiş bir yatan hasta çalışmasında insanlar ultra-işlenmiş menüde günde yaklaşık 500 kcal fazla yedi ve kilo aldı.' } },
    17: { en: { do: 'Keep sweets out of the house and buy them one portion at a time.', why: 'Availability at home predicts intake better than intention does; the decision is made at the shop, not at the cupboard.' },
      tr: { do: 'Tatlıyı evde bulundurmayın, tek porsiyonluk alın.', why: 'Evdeki bulunurluk, tüketimi niyetten daha iyi öngörür; karar dolapta değil markette verilir.' } },
    18: { en: { do: 'Check salt and sugar per 100 g, not per portion, on two products you buy weekly.', why: 'Portion sizes on packs are chosen by the manufacturer; per-100 g is the only number that compares two products fairly.' },
      tr: { do: 'Haftalık aldığınız iki üründe tuz ve şekere porsiyon başına değil, 100 g başına bakın.', why: 'Ambalajdaki porsiyon boyutunu üretici seçer; iki ürünü adil karşılaştıran tek sayı 100 g başına olandır.' } },
    19: { en: { do: 'Pick two nights a week that are always cooked at home.', why: 'Restaurant and delivery meals carry more salt, fat and larger portions than the same dish made at home — the difference is structural, not occasional.' },
      tr: { do: 'Haftada her zaman evde pişirilecek iki akşam seçin.', why: 'Restoran ve paket servis öğünleri, aynı yemeğin evde yapılan hâline göre daha çok tuz, yağ ve daha büyük porsiyon taşır — fark rastlantısal değil yapısaldır.' } },
    20: { en: { do: 'Taste before you salt, and take the salt cellar off the table.', why: 'In the DASH-Sodium trial, lower sodium reduced blood pressure at every level tested, with the biggest drop at the lowest intake.' },
      tr: { do: 'Tuz atmadan önce tadın ve tuzluğu sofradan kaldırın.', why: 'DASH-Sodyum çalışmasında düşük sodyum test edilen her düzeyde kan basıncını düşürdü; en büyük düşüş en düşük alımdaydı.' } },
    21: { en: { do: 'Keep a filled bottle where you work and refill it at fixed points in the day.', why: 'Thirst is a late signal; a visible bottle changes intake far more reliably than remembering to drink does.' },
      tr: { do: 'Çalıştığınız yerde dolu bir şişe bulundurun ve günün sabit noktalarında yeniden doldurun.', why: 'Susama geç gelen bir sinyaldir; görünür bir şişe, içmeyi hatırlamaktan çok daha güvenilir biçimde alımı değiştirir.' } },
    22: { en: { do: 'Keep at least two days a week completely alcohol-free.', why: 'In a pooled analysis of nearly 600,000 drinkers, risk of death rose above roughly 100 g of alcohol a week — about five or six standard drinks.' },
      tr: { do: 'Haftada en az iki günü tamamen alkolsüz geçirin.', why: 'Yaklaşık 600.000 kişilik birleştirilmiş bir analizde ölüm riski haftada kabaca 100 g alkolün üzerinde yükseldi — beş-altı standart içki kadar.' } },
    23: { en: { do: 'Replace the saltiest packaged item you buy weekly with an unsalted version.', why: 'Most dietary sodium arrives already inside bread, cheese, cured meat and ready meals — not from the salt cellar.' },
      tr: { do: 'Haftalık aldığınız en tuzlu paketli ürünü tuzsuz sürümüyle değiştirin.', why: 'Diyetteki sodyumun çoğu tuzluktan değil; ekmek, peynir, şarküteri ve hazır yemeğin içinde hazır gelir.' } },
    24: { en: { do: 'Photograph what you eat for three days rather than trying to remember it.', why: 'Self-reported intake is consistently under-estimated; a three-day photo record is the cheapest way to see the actual pattern.' },
      tr: { do: 'Hatırlamaya çalışmak yerine üç gün boyunca yediklerinizi fotoğraflayın.', why: 'Beyana dayalı alım tutarlı biçimde olduğundan az tahmin edilir; gerçek örüntüyü görmenin en ucuz yolu üç günlük fotoğraf kaydıdır.' } }
  },
  flags: [
    { q: [3, 1], at: 3, need: 2,
      en: 'Frequently skipped meals combined with eating driven by stress rather than hunger is a pattern worth talking to a dietitian or your doctor about — particularly if your weight swings or you have felt out of control around food. This is a common pattern and it responds better to support than to another plan.',
      tr: 'Sık atlanan öğünlerin, açlıktan değil stresten kaynaklanan yemeyle birleşmesi bir diyetisyene ya da hekiminize danışmaya değer bir tablodur — özellikle kilonuz dalgalanıyorsa ya da yemek konusunda kontrolü kaybettiğinizi hissettiyseniz. Bu yaygın bir örüntüdür ve yeni bir plandan çok desteğe yanıt verir.' },
    { q: [20, 23], at: 4, need: 2,
      en: 'Salt is coming in from both the table and packaged food. If you have raised blood pressure, or a family history of it, this is the dietary change with the most direct measured effect — the DASH-Sodium trial saw the largest blood pressure drop in exactly this combination.',
      tr: 'Tuz hem sofradan hem paketli gıdadan geliyor. Tansiyonunuz yüksekse ya da ailenizde yüksek tansiyon varsa, ölçülmüş en doğrudan etkiye sahip beslenme değişikliği budur — DASH-Sodyum çalışması en büyük kan basıncı düşüşünü tam olarak bu bileşimde gördü.' },
    { q: [22], at: 3, need: 1,
      en: 'Alcohol came through as a near-daily habit. Risk of death starts to rise above about 100 g a week in the largest pooled analysis available, and cutting back is easier with a doctor\'s help than alone if drinking has become automatic.',
      tr: 'Alkol neredeyse günlük bir alışkanlık olarak öne çıktı. Mevcut en büyük birleştirilmiş analizde ölüm riski haftada yaklaşık 100 g üzerinde yükselmeye başlıyor; içmek otomatikleştiyse azaltmak tek başınıza değil bir hekimin desteğiyle daha kolaydır.' }
  ]
};


/* ---------------------------------------------------------------
   STRES
   --------------------------------------------------------------- */

const stress = {
  basis: {
    en: ['Perceived Stress Scale (PSS-10)', 'Burnout dimensions (exhaustion, cynicism)',
      'Psychological detachment / recovery research', 'Social support and mortality literature'],
    tr: ['Algılanan Stres Ölçeği (PSS-10)', 'Tükenmişlik boyutları (tükenme, duyarsızlaşma)',
      'Psikolojik kopuş / toparlanma araştırmaları', 'Sosyal destek ve mortalite yazını']
  },
  refs: [
    { pmid: '6668417', en: 'Cohen S et al. A global measure of perceived stress. J Health Soc Behav. 1983', tr: 'Cohen S ve ark. Algılanan stresin genel bir ölçüsü. J Health Soc Behav. 1983' },
    { pmid: '22473079', en: 'Steptoe A, Kivimäki M. Stress and cardiovascular disease. Nat Rev Cardiol. 2012', tr: 'Steptoe A, Kivimäki M. Stres ve kalp-damar hastalığı. Nat Rev Cardiol. 2012' },
    { pmid: '24395196', en: 'Goyal M et al. Meditation programmes for psychological stress and well-being: meta-analysis. JAMA Intern Med. 2014', tr: 'Goyal M ve ark. Psikolojik stres ve iyilik hâli için meditasyon programları: meta-analiz. JAMA Intern Med. 2014' },
    { pmid: '20668659', en: 'Holt-Lunstad J et al. Social relationships and mortality risk: a meta-analytic review. PLoS Med. 2010', tr: 'Holt-Lunstad J ve ark. Sosyal ilişkiler ve ölüm riski: meta-analitik derleme. PLoS Med. 2010' },
    { pmid: '15250815', en: 'Segerstrom SC, Miller GE. Psychological stress and the human immune system: 30 years of inquiry. Psychol Bull. 2004', tr: 'Segerstrom SC, Miller GE. Psikolojik stres ve insan bağışıklık sistemi: 30 yıllık araştırma. Psychol Bull. 2004' },
    { pmid: '16717171', en: 'Spitzer RL et al. A brief measure for assessing generalised anxiety disorder: the GAD-7. Arch Intern Med. 2006', tr: 'Spitzer RL ve ark. Yaygın anksiyete bozukluğunu değerlendiren kısa ölçek: GAD-7. Arch Intern Med. 2006' },
    { pmid: '11556941', en: 'Kroenke K et al. The PHQ-9: validity of a brief depression severity measure. J Gen Intern Med. 2001', tr: 'Kroenke K ve ark. PHQ-9: kısa bir depresyon şiddeti ölçeğinin geçerliliği. J Gen Intern Med. 2001' }
  ],
  domains: {
    load: {
      en: { why: 'The Perceived Stress Scale does not ask how much is happening to you — it asks how unpredictable, uncontrollable and overloaded life has felt in the past month. That framing matters, because two people under identical demands can score very differently, and it is the perception that tracks health outcomes.',
        low: 'When the load is genuinely too high, technique will not fix it. The change that works is subtraction: something has to come off the list, and deciding which is the actual task.',
        high: 'The volume you are carrying is within what you can absorb. Keep an eye on the slow kind of increase — load rarely arrives as one big event.' },
      tr: { why: 'Algılanan Stres Ölçeği başınıza ne kadar şey geldiğini sormaz — son bir ayda hayatın ne kadar öngörülemez, kontrol edilemez ve yüklü hissettirdiğini sorar. Bu çerçeve önemlidir: aynı taleplere maruz iki kişi çok farklı puan alabilir ve sağlık sonuçlarıyla birlikte giden şey algıdır.',
        low: 'Yük gerçekten fazlaysa teknik onu çözmez. İşe yarayan değişiklik çıkarmadır: listeden bir şey inmek zorunda ve asıl iş hangisi olduğuna karar vermektir.',
        high: 'Taşıdığınız hacim soğurabileceğiniz sınırın içinde. Yavaş artışa dikkat edin — yük nadiren tek bir büyük olay olarak gelir.' }
    },
    control: {
      en: { why: 'Controllability is the axis that separates stress that builds you from stress that wears you down. The same workload feels different when you can predict it and decide the order — which is why the reverse-scored items on the PSS are about confidence and things going your way.',
        low: 'Look for the smallest thing you can genuinely decide, and decide it. Restoring even a narrow band of control changes the whole reading, and it is the mechanism behind almost every effective stress intervention.',
        high: 'You feel able to steer, which is the strongest protective factor in this whole assessment. Saying no is the skill that keeps it.' },
      tr: { why: 'Kontrol edilebilirlik, sizi inşa eden stresi sizi yıpratandan ayıran eksendir. Aynı iş yükü, onu öngörebildiğinizde ve sırasına karar verebildiğinizde farklı hissettirir — PSS\'de ters puanlanan maddelerin özgüven ve işlerin yolunda gitmesiyle ilgili olmasının sebebi budur.',
        low: 'Gerçekten karar verebileceğiniz en küçük şeyi bulun ve ona karar verin. Dar bir kontrol şeridini geri kazanmak bile bütün okumayı değiştirir; neredeyse her etkili stres müdahalesinin arkasındaki mekanizma budur.',
        high: 'Dümeni tutabildiğinizi hissediyorsunuz; bu testteki en güçlü koruyucu etken budur. Onu koruyan beceri ise hayır diyebilmektir.' }
    },
    body: {
      en: { why: 'Physical signs usually arrive before anyone admits to being stressed. A clenched jaw, shallow breathing and disturbed sleep are the autonomic system doing what it was built for — the problem is only that it does not switch off between events.',
        low: 'Treat these as data, not as symptoms to push through. Persistent physical signs are the point at which stress stops being a mood and starts being a load on the cardiovascular system.',
        high: 'Your body is not carrying the tension your calendar might justify, which suggests the recovery side is doing its job.' },
      tr: { why: 'Bedensel işaretler genellikle kişi stresli olduğunu kabul etmeden önce gelir. Kilitlenen çene, yüzeyselleşen nefes ve bölünen uyku, otonom sistemin yapmak üzere kurulduğu şeyi yapmasıdır — sorun yalnızca olaylar arasında kapanmamasıdır.',
        low: 'Bunları geçiştirilecek belirtiler değil, veri olarak alın. Kalıcı bedensel işaretler, stresin bir ruh hâli olmaktan çıkıp kalp-damar sistemi üzerinde bir yüke dönüştüğü noktadır.',
        high: 'Bedeniniz, takviminizin haklı çıkarabileceği gerilimi taşımıyor; bu da toparlanma tarafının işini yaptığını gösterir.' }
    },
    recovery: {
      en: { why: 'Recovery is not the absence of work — it is being mentally off-duty, which the research calls psychological detachment. A meta-analysis of 47 trials found moderate evidence that structured mindfulness programmes reduce anxiety, depression and pain; the common ingredient is deliberate, scheduled disengagement.',
        low: 'Put one genuinely off-duty block in the diary and defend it like a meeting. Recovery that is left to whatever time is spare never happens in a busy month.',
        high: 'You get real time off duty, which is the mechanism that makes a heavy load survivable rather than cumulative.' },
      tr: { why: 'Toparlanma işin yokluğu değildir — zihinsel olarak görevden çıkmaktır; araştırmalar buna psikolojik kopuş diyor. 47 çalışmayı kapsayan bir meta-analiz, yapılandırılmış farkındalık programlarının kaygı, depresyon ve ağrıyı azalttığına dair orta düzeyde kanıt buldu; ortak bileşen kasıtlı ve planlanmış kopuştur.',
        low: 'Takvime gerçekten görev dışı tek bir blok koyun ve onu bir toplantı gibi savunun. Artan zamana bırakılan toparlanma yoğun bir ayda hiç gerçekleşmez.',
        high: 'Gerçekten görev dışı zamanınız oluyor; ağır bir yükü birikimli değil katlanılabilir kılan mekanizma budur.' }
    },
    support: {
      en: { why: 'Pooling 148 studies, people with stronger social relationships had a markedly higher likelihood of survival over follow-up — an effect size comparable to well-established risk factors. Support is not a soft variable in this literature.',
        low: 'One conversation with one person who knows you is worth more than any technique on this page. If the coping has shifted towards alcohol, cigarettes or scrolling, that is worth naming rather than tolerating.',
        high: 'You have people, and you would use them. That is the single best predictor here of getting through a bad year intact.' },
      tr: { why: '148 çalışmanın birleştirildiği analizde, güçlü sosyal ilişkileri olanların izlem boyunca hayatta kalma olasılığı belirgin biçimde yüksekti — etkinin büyüklüğü iyi bilinen risk etkenleriyle karşılaştırılabilir düzeydeydi. Bu yazında destek yumuşak bir değişken değildir.',
        low: 'Sizi tanıyan tek bir kişiyle yapılan tek bir konuşma, bu sayfadaki her teknikten değerlidir. Başa çıkma alkole, sigaraya ya da kaydırmaya kaydıysa buna katlanmak yerine adını koymak gerekir.',
        high: 'İnsanlarınız var ve onlara başvurursunuz. Kötü bir yılı sağlam atlatmanın buradaki en iyi göstergesi budur.' }
    }
  },
  actions: {
    0: { en: { do: 'Write down what actually happened, separately from what you feared would happen.', why: 'The Perceived Stress Scale measures the sense of things being unpredictable; separating event from forecast is what shrinks that gap.' },
      tr: { do: 'Gerçekte ne olduğunu, olmasından korktuğunuz şeyden ayrı olarak yazın.', why: 'Algılanan Stres Ölçeği, işlerin öngörülemez hissedilmesini ölçer; olayı tahminden ayırmak o aralığı daraltan şeydir.' } },
    1: { en: { do: 'Take the three heaviest items and decide which one gets postponed this month.', why: 'When difficulties pile past what you can handle, only subtraction changes the score — reordering does not.' },
      tr: { do: 'En ağır üç işi alın ve bu ay hangisinin erteleneceğine karar verin.', why: 'Zorluklar başa çıkabileceğinizin ötesine biriktiğinde puanı yalnızca çıkarma değiştirir; yeniden sıralamak değiştirmez.' } },
    2: { en: { do: 'Say out loud, to the person asking, what will not get done if this is added.', why: 'Overload persists because the trade-off stays invisible; making it explicit moves the decision to the person creating it.' },
      tr: { do: 'Talebi getiren kişiye, bu eklenirse neyin yapılamayacağını yüksek sesle söyleyin.', why: 'Aşırı yük, ödünleşim görünmez kaldığı için sürer; açıkça söylemek kararı onu yaratan kişiye taşır.' } },
    3: { en: { do: 'Put a hard stop on the working day and hold it for two weeks.', why: 'Emotional exhaustion is the first dimension of burnout to appear and the one that responds to a boundary rather than to a holiday.' },
      tr: { do: 'İş gününe kesin bir bitiş saati koyun ve iki hafta boyunca koruyun.', why: 'Duygusal tükenme, tükenmişliğin ilk beliren boyutudur ve tatile değil bir sınıra yanıt veren boyuttur.' } },
    4: { en: { do: 'Name it. Tell one person that you have stopped caring about work you used to care about.', why: 'Cynicism is a recognised burnout dimension, not a character change — and it is the sign that usually arrives too late to be noticed alone.' },
      tr: { do: 'Adını koyun. Bir kişiye, eskiden önemsediğiniz işi artık önemsemediğinizi söyleyin.', why: 'Duyarsızlaşma bir karakter değişimi değil, tanınmış bir tükenmişlik boyutudur — ve genellikle tek başına fark edilemeyecek kadar geç gelen işarettir.' } },
    5: { en: { do: 'List three problems you solved in the past year and keep the list where you can see it.', why: 'Confidence in handling problems is a reverse-scored PSS item; the evidence for it is usually available and simply not consulted.' },
      tr: { do: 'Geçen yıl çözdüğünüz üç sorunu yazın ve listeyi görebileceğiniz bir yerde tutun.', why: 'Sorunlarla baş edebilme özgüveni PSS\'de ters puanlanan bir maddedir; buna dair kanıt genelde vardır, sadece bakılmaz.' } },
    6: { en: { do: 'Note one thing a day that went the way you wanted, however small.', why: 'The sense that things are going your way is a scored item; attention decides what gets counted, and stress narrows attention to what did not.' },
      tr: { do: 'Günde bir kez, ne kadar küçük olursa olsun istediğiniz gibi giden bir şeyi not edin.', why: 'İşlerin yolunda gittiği hissi puanlanan bir maddedir; neyin sayılacağına dikkat karar verir ve stres dikkati gitmeyene daraltır.' } },
    7: { en: { do: 'Split what is worrying you into what you decide and what you only react to, then work only on the first list.', why: 'Loss of control is the central PSS construct; effort spent on the second list produces stress without producing change.' },
      tr: { do: 'Sizi kaygılandıran şeyi, karar verdikleriniz ve yalnızca tepki verdikleriniz diye ayırın; sonra yalnızca ilk listede çalışın.', why: 'Kontrol kaybı PSS\'nin merkezî yapısıdır; ikinci listeye harcanan çaba değişim üretmeden stres üretir.' } },
    8: { en: { do: 'Plan tomorrow at the end of today, not at the start of tomorrow.', why: 'Predictability lowers the physiological cost of the same workload; the plan works because it removes the morning surprise.' },
      tr: { do: 'Yarını yarın sabah değil, bugünün sonunda planlayın.', why: 'Öngörülebilirlik aynı iş yükünün fizyolojik maliyetini düşürür; plan, sabahki sürprizi kaldırdığı için işe yarar.' } },
    9: { en: { do: 'Practise one sentence you can use to decline, and use it once this week.', why: 'Saying no is a skill with a script, not a personality trait; having the words ready is most of the difficulty.' },
      tr: { do: 'Reddetmek için kullanabileceğiniz tek bir cümle hazırlayın ve bu hafta bir kez kullanın.', why: 'Hayır demek bir kişilik özelliği değil, metni olan bir beceridir; zorluğun çoğu sözleri hazır bulundurmaktır.' } },
    10: { en: { do: 'Set two alarms a day to check your jaw and shoulders, and let them drop.', why: 'Sustained muscle tension is one of the earliest measurable stress responses and it persists precisely because it is unconscious.' },
      tr: { do: 'Günde iki alarm kurup çenenizi ve omuzlarınızı kontrol edin, sonra bırakın.', why: 'Sürekli kas gerginliği en erken ölçülebilir stres yanıtlarından biridir ve tam da bilinçdışı olduğu için sürer.' } },
    11: { en: { do: 'Write the worry down at 21:00 with one next step, and close the notebook.', why: 'Stress that reaches sleep is the point at which the load starts compounding, because the recovery mechanism is the thing being damaged.' },
      tr: { do: 'Saat 21.00\'de endişeyi tek bir sonraki adımla birlikte yazın ve defteri kapatın.', why: 'Uykuya ulaşan stres, yükün katlanmaya başladığı noktadır; çünkü zarar gören şey toparlanma mekanizmasının kendisidir.' } },
    12: { en: { do: 'Mention the headaches or stomach trouble to a doctor as stress-related rather than treating them separately.', why: 'Presenting the symptom without the context is how tension headaches and functional gut symptoms end up investigated repeatedly and treated late.' },
      tr: { do: 'Baş ağrısı ya da mide sorununu ayrı ayrı tedavi etmek yerine hekime stresle ilişkili olarak anlatın.', why: 'Belirtiyi bağlamı olmadan anlatmak, gerilim baş ağrısının ve işlevsel bağırsak belirtilerinin tekrar tekrar araştırılıp geç tedavi edilmesinin yoludur.' } },
    13: { en: { do: 'Try a slow exhale — in for four, out for six — for two minutes when it happens.', why: 'A longer exhale than inhale raises vagal activity, which is the fastest available route out of an autonomic surge.' },
      tr: { do: 'Bu olduğunda iki dakika boyunca yavaş nefes verin — dörtte alın, altıda verin.', why: 'Nefes vermenin almadan uzun olması vagal etkinliği artırır; otonom bir yükselişten çıkmanın en hızlı yolu budur.' } },
    14: { en: { do: 'Keep meal times fixed even on the worst weeks, whatever the appetite is doing.', why: 'Stress moves appetite in both directions; a fixed rhythm keeps blood sugar and mood from adding a second problem on top.' },
      tr: { do: 'İştah ne yaparsa yapsın, en kötü haftalarda bile öğün saatlerini sabit tutun.', why: 'Stres iştahı iki yöne birden oynatır; sabit bir ritim, kan şekeri ve ruh hâlinin üste ikinci bir sorun eklemesini önler.' } },
    15: { en: { do: 'Build a fifteen-minute gap between finishing work and doing anything else.', why: 'Psychological detachment is what recovery actually consists of, and it needs a transition rather than an instant switch.' },
      tr: { do: 'İşi bitirmekle başka bir şey yapmak arasına on beş dakikalık bir boşluk koyun.', why: 'Toparlanmanın gerçek içeriği psikolojik kopuştur ve bu, ani bir düğmeden çok bir geçiş gerektirir.' } },
    16: { en: { do: 'Book one off-duty block into the calendar this week and treat it as unmovable.', why: 'Recovery left to spare time never happens in a busy month; the diary entry is the intervention.' },
      tr: { do: 'Bu hafta takvime görev dışı tek bir blok koyun ve onu taşınamaz sayın.', why: 'Artan zamana bırakılan toparlanma yoğun bir ayda hiç olmaz; müdahalenin kendisi takvim kaydıdır.' } },
    17: { en: { do: 'Start with ten minutes a day of something structured rather than waiting to feel like it.', why: 'Across 47 trials, structured mindfulness programmes showed moderate evidence of reducing anxiety, depression and pain — structure was the common element.' },
      tr: { do: 'Canınızın istemesini beklemek yerine günde on dakikalık yapılandırılmış bir şeyle başlayın.', why: '47 çalışmada yapılandırılmış farkındalık programları kaygı, depresyon ve ağrıyı azaltmaya dair orta düzeyde kanıt gösterdi — ortak öge yapılandırılmış olmalarıydı.' } },
    18: { en: { do: 'Take one walk outdoors without headphones or a podcast.', why: 'Outdoor time without input is one of the few reliably restorative activities that does not require learning anything first.' },
      tr: { do: 'Kulaklıksız ve podcast\'siz tek bir açık hava yürüyüşü yapın.', why: 'Girdisiz açık hava zamanı, önce bir şey öğrenmeyi gerektirmeyen ve güvenilir biçimde onarıcı olan az sayıdaki etkinlikten biridir.' } },
    19: { en: { do: 'Judge the weekend by how Monday feels, not by how full it was.', why: 'Recovery is measured by its result; a busy weekend can leave less behind than an empty one.' },
      tr: { do: 'Hafta sonunu ne kadar dolu geçtiğine değil, pazartesinin nasıl hissettirdiğine göre değerlendirin.', why: 'Toparlanma sonucuyla ölçülür; dolu bir hafta sonu boş bir hafta sonundan daha az şey bırakabilir.' } },
    20: { en: { do: 'Message one person today about something other than logistics.', why: 'Pooled across 148 studies, stronger social ties tracked with markedly better survival — the effect is on the scale of established risk factors.' },
      tr: { do: 'Bugün bir kişiye lojistik dışında bir şey hakkında yazın.', why: '148 çalışmanın birleştirildiği analizde güçlü sosyal bağlar belirgin biçimde daha iyi sağkalımla birlikte gitti — etki, yerleşik risk etkenleri ölçeğinde.' } },
    21: { en: { do: 'Pick the substitute before the moment arrives — a walk, a call, a shower.', why: 'Alcohol, cigarettes and scrolling work fast, which is exactly why they win at the moment of decision unless something is already chosen.' },
      tr: { do: 'An gelmeden yerine koyacağınızı seçin — yürüyüş, telefon görüşmesi, duş.', why: 'Alkol, sigara ve kaydırma hızlı çalışır; önceden bir şey seçilmediyse karar anında kazanmalarının sebebi tam olarak budur.' } },
    22: { en: { do: 'Put one face-to-face meeting in the diary for the next two weeks.', why: 'In-person contact is the form of support most strongly associated with health outcomes, and the first one dropped when time is short.' },
      tr: { do: 'Önümüzdeki iki hafta için takvime yüz yüze tek bir buluşma koyun.', why: 'Yüz yüze temas, sağlık sonuçlarıyla en güçlü ilişkilendirilen destek biçimidir ve zaman daraldığında ilk düşen odur.' } },
    23: { en: { do: 'Decide now what would count as the point to ask for help, and write it down.', why: 'A threshold decided in advance is the only one that survives the moment it applies to.' },
      tr: { do: 'Yardım isteme noktasının ne olacağına şimdi karar verin ve yazın.', why: 'Önceden belirlenmiş bir eşik, uygulanacağı anı atlatabilen tek eşiktir.' } },
    24: { en: { do: 'Retake this assessment in a month and compare the domains, not the total.', why: 'Perceived stress moves with circumstances; the domain that moves first tells you which lever is actually working.' },
      tr: { do: 'Bu testi bir ay sonra tekrar yapın ve toplamı değil alanları karşılaştırın.', why: 'Algılanan stres koşullarla oynar; ilk hareket eden alan, hangi kaldıracın gerçekten işe yaradığını söyler.' } }
  },
  flags: [
    { q: [3, 4, 15], at: 3, need: 2,
      en: 'Emotional exhaustion, loss of interest in work you used to care about, and no ability to switch off appear together. Those are the recognised dimensions of burnout, and burnout does not resolve with a holiday. Talk to your doctor or an occupational health service — this is a workload question as much as a personal one.',
      tr: 'Duygusal tükenme, eskiden önemsediğiniz işe ilginizi kaybetmek ve kapatamama bir arada görünüyor. Bunlar tükenmişliğin tanınmış boyutlarıdır ve tükenmişlik tatille geçmez. Hekiminize ya da bir iş sağlığı birimine danışın — bu, kişisel olduğu kadar bir iş yükü sorusudur.' },
    { q: [7, 11, 13], at: 3, need: 2,
      en: 'Feeling unable to control important things, stress cutting into your sleep, and physical arousal without effort are all present. If low mood, constant worry or panic have been part of the past month, that is worth raising with a doctor — brief validated questionnaires like the PHQ-9 and GAD-7 exist precisely so this can be assessed properly in one appointment.',
      tr: 'Önemli şeyleri kontrol edememe hissi, uykunuzu kesen stres ve çaba olmadan gelen bedensel uyarılma bir arada. Son bir ayda çökkünlük, sürekli endişe ya da panik de varsa bunu bir hekimle konuşmaya değer — PHQ-9 ve GAD-7 gibi kısa ve doğrulanmış ölçekler tam da bunun tek görüşmede düzgünce değerlendirilebilmesi için var.' },
    { q: [20, 22], at: 3, need: 2,
      en: 'Your answers describe carrying this without anyone to lean on. Social isolation is not a soft factor in this literature — its association with mortality is comparable to established medical risk factors. One conversation with one person is a reasonable first step, and a doctor counts as that person.',
      tr: 'Cevaplarınız bunu yaslanacak kimse olmadan taşıdığınızı anlatıyor. Bu yazında sosyal yalıtım yumuşak bir etken değildir — ölümle ilişkisi yerleşik tıbbi risk etkenleriyle karşılaştırılabilir. Tek bir kişiyle tek bir konuşma makul bir ilk adımdır ve o kişi bir hekim de olabilir.' }
  ]
};


/* ---------------------------------------------------------------
   KALP
   --------------------------------------------------------------- */

const heart = {
  basis: {
    en: ['AHA Life’s Essential 8', 'INTERHEART modifiable risk factors',
      'ACC/AHA blood pressure guideline', 'DASH-Sodium trial', 'WHO physical activity guidelines'],
    tr: ['AHA Life’s Essential 8', 'INTERHEART değiştirilebilir risk etkenleri',
      'ACC/AHA kan basıncı kılavuzu', 'DASH-Sodyum çalışması', 'DSÖ fiziksel aktivite kılavuzu']
  },
  refs: [
    { pmid: '35766027', en: 'Lloyd-Jones DM et al. Life’s Essential 8: updating the AHA construct of cardiovascular health. Circulation. 2022', tr: 'Lloyd-Jones DM ve ark. Life’s Essential 8: AHA kardiyovasküler sağlık yapısının güncellenmesi. Circulation. 2022' },
    { pmid: '15364185', en: 'Yusuf S et al. Modifiable risk factors for myocardial infarction in 52 countries (INTERHEART). Lancet. 2004', tr: 'Yusuf S ve ark. 52 ülkede kalp krizi için değiştirilebilir risk etkenleri (INTERHEART). Lancet. 2004' },
    { pmid: '29146535', en: 'Whelton PK et al. 2017 ACC/AHA guideline for prevention, detection and management of high blood pressure. J Am Coll Cardiol. 2018', tr: 'Whelton PK ve ark. 2017 ACC/AHA yüksek kan basıncını önleme, saptama ve yönetme kılavuzu. J Am Coll Cardiol. 2018' },
    { pmid: '15213107', en: 'Doll R et al. Mortality in relation to smoking: 50 years’ observations on male British doctors. BMJ. 2004', tr: 'Doll R ve ark. Sigara ve ölüm: İngiliz erkek hekimlerde 50 yıllık gözlem. BMJ. 2004' },
    { pmid: '11136953', en: 'Sacks FM et al. Effects on blood pressure of reduced dietary sodium and the DASH diet. N Engl J Med. 2001', tr: 'Sacks FM ve ark. Azaltılmış sodyum ve DASH diyetinin kan basıncına etkisi. N Engl J Med. 2001' },
    { pmid: '33239350', en: 'Bull FC et al. WHO 2020 guidelines on physical activity and sedentary behaviour. Br J Sports Med. 2020', tr: 'Bull FC ve ark. DSÖ 2020 fiziksel aktivite ve hareketsiz davranış kılavuzu. Br J Sports Med. 2020' },
    { pmid: '29676281', en: 'Wood AM et al. Risk thresholds for alcohol consumption: 599,912 drinkers. Lancet. 2018', tr: 'Wood AM ve ark. Alkol tüketiminde risk eşikleri: 599.912 kişi. Lancet. 2018' }
  ],
  domains: {
    move: {
      en: { why: 'Movement is one of the eight components the American Heart Association scores cardiovascular health on. The WHO target is 150 to 300 minutes of moderate activity a week, and the steepest part of the benefit curve is at the bottom — the move from nothing to something is worth more than the move from a lot to more.',
        low: 'Start where the return is largest: from zero to twenty minutes most days. You do not need a gym or a plan, and the first minutes count for more than the last ones.',
        high: 'You are meeting the target that the guidelines set, which covers one of the eight components outright.' },
      tr: { why: 'Hareket, Amerikan Kalp Derneği\'nin kardiyovasküler sağlığı puanladığı sekiz bileşenden biridir. DSÖ hedefi haftada 150–300 dakika orta şiddette aktivite ve fayda eğrisinin en dik kısmı en altta: hiçten bire geçiş, çoktan daha çoka geçişten değerlidir.',
        low: 'Getirinin en büyük olduğu yerden başlayın: sıfırdan, çoğu gün yirmi dakikaya. Spor salonu ya da plan gerekmiyor; ilk dakikalar sonuncular kadar değil, onlardan çok daha fazla sayıyor.',
        high: 'Kılavuzların koyduğu hedefi tutturuyorsunuz; bu, sekiz bileşenden birini doğrudan karşılıyor.' }
    },
    plate: {
      en: { why: 'In the DASH-Sodium trial, the combination of the DASH eating pattern with the lowest sodium intake produced the largest blood pressure reduction of any arm — a dietary effect on the scale of a drug effect, in a randomised design.',
        low: 'Sodium and vegetables are the two levers with trial evidence behind them. Both move blood pressure, and blood pressure is the risk factor that carries the most population-level weight.',
        high: 'Your plate is close to the pattern that was actually randomised and measured, rather than the pattern that is merely popular.' },
      tr: { why: 'DASH-Sodyum çalışmasında DASH beslenme örüntüsü ile en düşük sodyum alımının birleşimi, tüm kollar arasında en büyük kan basıncı düşüşünü verdi — randomize bir tasarımda, ilaç etkisi ölçeğinde bir beslenme etkisi.',
        low: 'Sodyum ve sebze, arkasında çalışma kanıtı olan iki kaldıraç. İkisi de kan basıncını oynatır ve kan basıncı, toplum düzeyinde en çok ağırlık taşıyan risk etkenidir.',
        high: 'Tabağınız yalnızca popüler olan örüntüye değil, gerçekten randomize edilip ölçülen örüntüye yakın.' }
    },
    nicotine: {
      en: { why: 'Fifty years of follow-up on British doctors showed that lifelong smokers lost about ten years of life compared with non-smokers, and that stopping before 40 avoided most of the excess risk. Nicotine exposure is scored in its own right in Life’s Essential 8, second-hand smoke included.',
        low: 'Stopping is the single largest change available in this entire assessment, and the benefit does not require decades to appear — the risk curve starts bending within the first year.',
        high: 'You are clear of the exposure that outweighs almost every other item on this page.' },
      tr: { why: 'İngiliz hekimlerde elli yıllık izlem, ömür boyu sigara içenlerin içmeyenlere göre yaklaşık on yıl kaybettiğini ve 40 yaşından önce bırakmanın fazladan riskin çoğunu ortadan kaldırdığını gösterdi. Nikotin maruziyeti, pasif içicilik dâhil, Life’s Essential 8\'de kendi başına puanlanır.',
        low: 'Bırakmak, bu testteki en büyük tek değişikliktir ve faydası için on yıllar beklemek gerekmez — risk eğrisi ilk yıl içinde bükülmeye başlar.',
        high: 'Bu sayfadaki neredeyse her maddeden ağır basan maruziyetten uzaksınız.' }
    },
    numbers: {
      en: { why: 'Blood pressure, cholesterol and blood glucose make up three of the eight components, and all three are silent — they cause no symptoms at the stage where treating them changes the outcome most. Knowing the number is the whole of the intervention at this point.',
        low: 'Book the measurements. High blood pressure in particular is common, symptomless and treatable, and the guideline thresholds moved down precisely because earlier action works.',
        high: 'You know your numbers, which means any problem gets found while it is still cheap to fix.' },
      tr: { why: 'Kan basıncı, kolesterol ve kan şekeri sekiz bileşenin üçünü oluşturur ve üçü de sessizdir — tedavi etmenin sonucu en çok değiştirdiği evrede hiçbir belirti vermezler. Bu noktada müdahalenin tamamı sayıyı bilmektir.',
        low: 'Ölçümler için randevu alın. Özellikle yüksek tansiyon yaygın, belirtisiz ve tedavi edilebilirdir; kılavuz eşiklerinin aşağı çekilmesinin sebebi tam olarak erken hareketin işe yaramasıdır.',
        high: 'Sayılarınızı biliyorsunuz; bu, bir sorun varsa hâlâ ucuza çözülebilecekken bulunacağı anlamına gelir.' }
    },
    load: {
      en: { why: 'Sleep was added to the AHA framework in 2022 because the evidence linking short sleep to cardiovascular risk had become hard to ignore. Psychosocial stress was also one of the factors INTERHEART identified across 52 countries as carrying a substantial share of heart attack risk.',
        low: 'Sleep and stress are not the soft edge of heart health — they are scored components, and untreated sleep apnoea keeps blood pressure elevated whatever else is optimised.',
        high: 'The parts of heart health that are easiest to dismiss are in good shape here, which is unusual and worth keeping.' },
      tr: { why: 'Uyku, kısa uykuyu kardiyovasküler riskle ilişkilendiren kanıt göz ardı edilemez hâle geldiği için 2022\'de AHA çerçevesine eklendi. Psikososyal stres de INTERHEART\'ın 52 ülkede kalp krizi riskinin önemli bir bölümünü taşıdığını belirlediği etkenlerden biriydi.',
        low: 'Uyku ve stres, kalp sağlığının yumuşak kenarı değil — puanlanan bileşenlerdir; tedavi edilmemiş uyku apnesi, başka ne iyileştirilirse iyileştirilsin kan basıncını yüksek tutar.',
        high: 'Kalp sağlığının en kolay göz ardı edilen kısımları sizde iyi durumda; bu alışılmadık bir şey ve korunmayı hak ediyor.' }
    }
  },
  actions: {
    0: { en: { do: 'Aim for thirty minutes of brisk walking on five days a week.', why: 'That is the low end of the WHO target of 150 minutes, and the steepest gain on the curve is between doing nothing and doing this.' },
      tr: { do: 'Haftanın beş günü otuz dakika tempolu yürüyüşü hedefleyin.', why: 'Bu, DSÖ\'nün 150 dakikalık hedefinin alt sınırıdır ve eğrideki en dik kazanç, hiçbir şey yapmamakla bunu yapmak arasındadır.' } },
    1: { en: { do: 'Stand up and move for two minutes at the top of every hour.', why: 'Long uninterrupted sitting is associated with higher mortality independently of how much you exercise otherwise.' },
      tr: { do: 'Her saat başı ayağa kalkıp iki dakika hareket edin.', why: 'Uzun kesintisiz oturma, başka ne kadar egzersiz yaptığınızdan bağımsız olarak daha yüksek ölüm oranıyla ilişkilidir.' } },
    2: { en: { do: 'Put one twenty-minute walk into a fixed slot in your day.', why: 'A time that is already decided survives a busy week; an intention to walk when there is time does not.' },
      tr: { do: 'Günde yirmi dakikalık bir yürüyüşü sabit bir saate koyun.', why: 'Önceden belirlenmiş bir saat yoğun bir haftayı atlatır; zaman bulunca yürüme niyeti atlatamaz.' } },
    3: { en: { do: 'Add two short strength sessions a week — bodyweight is enough to start.', why: 'Muscle-strengthening activity is recommended alongside aerobic work in the WHO guidelines and tracks with lower mortality on its own.' },
      tr: { do: 'Haftaya iki kısa kuvvet seansı ekleyin — başlangıç için kendi vücut ağırlığınız yeter.', why: 'Kas kuvvetlendirme, DSÖ kılavuzlarında aerobik çalışmanın yanında önerilir ve tek başına daha düşük ölüm oranıyla birlikte gider.' } },
    4: { en: { do: 'Chest tightness or unusual breathlessness on exertion is a reason to see a doctor, not to train harder.', why: 'Effort-related chest symptoms are how stable angina presents, and it is investigated rather than pushed through.' },
      tr: { do: 'Efor sırasında göğüs sıkışması ya da olağandışı nefes darlığı, daha sıkı çalışmak için değil hekime gitmek için bir sebeptir.', why: 'Eforla ilişkili göğüs belirtileri stabil anjinanın ortaya çıkış biçimidir ve zorlanarak değil araştırılarak ele alınır.' } },
    5: { en: { do: 'Put vegetables on the plate at two meals a day.', why: 'The DASH pattern combined a high vegetable and fruit intake with low sodium and produced the largest blood pressure drop in the trial.' },
      tr: { do: 'Günde iki öğünde tabağa sebze koyun.', why: 'DASH örüntüsü yüksek sebze-meyve alımını düşük sodyumla birleştirdi ve çalışmadaki en büyük kan basıncı düşüşünü verdi.' } },
    6: { en: { do: 'Cut the two saltiest packaged items out of your weekly shop.', why: 'Most sodium arrives already inside bread, cheese, cured meat and ready meals, so the shop is where the reduction actually happens.' },
      tr: { do: 'Haftalık alışverişinizden en tuzlu iki paketli ürünü çıkarın.', why: 'Sodyumun çoğu ekmek, peynir, şarküteri ve hazır yemeğin içinde hazır gelir; azalma asıl olarak markette gerçekleşir.' } },
    7: { en: { do: 'Cook with olive oil and put fish on the menu twice a week.', why: 'This is the pattern PREDIMED randomised people to, and the trial group had fewer major cardiovascular events than the low-fat control.' },
      tr: { do: 'Zeytinyağıyla pişirin ve haftada iki kez balığı menüye koyun.', why: 'PREDIMED\'in insanları randomize ettiği örüntü budur; çalışma grubunda düşük yağlı kontrole göre daha az majör kardiyovasküler olay görüldü.' } },
    8: { en: { do: 'Move red and processed meat from most days to once or twice a week.', why: 'Processed meat is classed as carcinogenic to humans and both are associated with higher cardiovascular risk at high intake.' },
      tr: { do: 'Kırmızı ve işlenmiş eti çoğu günden haftada bir-iki güne indirin.', why: 'İşlenmiş et insanda kanserojen olarak sınıflanır ve yüksek alımda her ikisi de daha yüksek kardiyovasküler riskle ilişkilidir.' } },
    9: { en: { do: 'Replace the daily sugary drink with water, tea or coffee without sugar.', why: 'One to two sugary drinks a day was associated with clearly higher rates of type 2 diabetes and metabolic syndrome across more than 300,000 people.' },
      tr: { do: 'Günlük şekerli içeceği su, çay ya da şekersiz kahveyle değiştirin.', why: '300.000\'den fazla kişide günde bir-iki şekerli içecek, belirgin biçimde daha yüksek tip 2 diyabet ve metabolik sendrom oranıyla ilişkilendirildi.' } },
    10: { en: { do: 'Set a quit date and ask your doctor about combining medication with support.', why: 'Fifty years of follow-up showed lifelong smokers lost about a decade of life, and that stopping before 40 avoided most of the excess risk.' },
      tr: { do: 'Bir bırakma tarihi belirleyin ve hekiminize ilaç ile desteği birleştirmeyi sorun.', why: 'Elli yıllık izlem, ömür boyu içenlerin yaklaşık on yıl kaybettiğini ve 40 yaşından önce bırakmanın fazladan riskin çoğunu ortadan kaldırdığını gösterdi.' } },
    11: { en: { do: 'Make your home and car smoke-free, including for visitors.', why: 'Second-hand smoke is scored as nicotine exposure in the AHA framework because the cardiovascular effect does not require you to be the smoker.' },
      tr: { do: 'Evinizi ve arabanızı, misafirler dâhil, dumansız yapın.', why: 'Pasif içicilik AHA çerçevesinde nikotin maruziyeti olarak puanlanır; çünkü kardiyovasküler etki için sigarayı sizin içmeniz gerekmez.' } },
    12: { en: { do: 'Keep at least three alcohol-free days a week.', why: 'In a pooled analysis of nearly 600,000 drinkers, mortality risk rose above roughly 100 g of alcohol a week.' },
      tr: { do: 'Haftada en az üç günü alkolsüz geçirin.', why: 'Yaklaşık 600.000 kişilik birleştirilmiş bir analizde ölüm riski haftada kabaca 100 g alkolün üzerinde yükseldi.' } },
    13: { en: { do: 'Spread the same amount across the week rather than concentrating it in one night.', why: 'Heavy episodic drinking carries arrhythmia and blood pressure effects that the same weekly total spread out does not.' },
      tr: { do: 'Aynı miktarı tek bir geceye toplamak yerine haftaya yayın.', why: 'Yoğun aralıklı içme, aynı haftalık toplam yayıldığında görülmeyen ritim ve kan basıncı etkileri taşır.' } },
    14: { en: { do: 'Ask specifically about nicotine replacement or varenicline rather than relying on willpower.', why: 'Combining medication with behavioural support roughly doubles quit rates compared with unaided attempts.' },
      tr: { do: 'İradeye güvenmek yerine özellikle nikotin replasmanı ya da vareniklini sorun.', why: 'İlacı davranışsal destekle birleştirmek, desteksiz denemelere göre bırakma oranını kabaca ikiye katlar.' } },
    15: { en: { do: 'Get your blood pressure measured this month — a pharmacy check counts.', why: 'High blood pressure is common, causes no symptoms, and is the risk factor with the largest population-level effect on stroke and heart attack.' },
      tr: { do: 'Bu ay tansiyonunuzu ölçtürün — eczanede ölçüm de sayılır.', why: 'Yüksek tansiyon yaygındır, belirti vermez ve inme ile kalp krizi üzerinde toplum düzeyinde en büyük etkiye sahip risk etkenidir.' } },
    16: { en: { do: 'Ask for a lipid panel and fasting glucose or HbA1c at your next appointment.', why: 'Lipids and glucose are two of the eight components the AHA scores, and both are silent until they are not.' },
      tr: { do: 'Bir sonraki görüşmenizde lipid paneli ve açlık glukozu ya da HbA1c isteyin.', why: 'Lipidler ve glukoz, AHA\'nın puanladığı sekiz bileşenin ikisidir ve ikisi de bir noktaya kadar sessizdir.' } },
    17: { en: { do: 'Measure your waist rather than watching the scale.', why: 'Waist circumference tracks visceral fat, which is the fat depot most closely tied to metabolic and cardiovascular risk.' },
      tr: { do: 'Tartıyı izlemek yerine bel çevrenizi ölçün.', why: 'Bel çevresi visseral yağı izler; metabolik ve kardiyovasküler riske en yakından bağlı yağ deposu odur.' } },
    18: { en: { do: 'If a tablet is causing side effects, say so rather than stopping it quietly.', why: 'Silent discontinuation is the commonest reason blood pressure and lipid treatment fails, and almost every class has an alternative.' },
      tr: { do: 'Bir ilaç yan etki yapıyorsa sessizce bırakmak yerine bunu söyleyin.', why: 'Sessiz bırakma, tansiyon ve lipid tedavisinin başarısız olmasının en yaygın sebebidir ve neredeyse her sınıfın bir alternatifi vardır.' } },
    19: { en: { do: 'Find out at what age relatives had heart problems, and tell your doctor.', why: 'Early events in first-degree relatives change the risk calculation and sometimes the age at which screening should start.' },
      tr: { do: 'Akrabalarınızın kaç yaşında kalp sorunu yaşadığını öğrenin ve hekiminize söyleyin.', why: 'Birinci derece akrabalardaki erken olaylar risk hesabını ve bazen taramaya başlama yaşını değiştirir.' } },
    20: { en: { do: 'Protect seven hours in bed as firmly as you would protect a medication.', why: 'Sleep was added to the AHA cardiovascular health score in 2022 because the link between short sleep and cardiovascular risk is now well established.' },
      tr: { do: 'Yatakta yedi saati, bir ilacı korur gibi kararlılıkla koruyun.', why: 'Uyku, kısa uyku ile kardiyovasküler risk arasındaki bağ artık iyi kurulduğu için 2022\'de AHA kardiyovasküler sağlık puanına eklendi.' } },
    21: { en: { do: 'Treat sustained pressure as a cardiac risk factor and act on it accordingly.', why: 'INTERHEART identified psychosocial stress across 52 countries as carrying a substantial share of heart attack risk.' },
      tr: { do: 'Sürekli baskıyı bir kalp risk etkeni olarak görün ve buna göre davranın.', why: 'INTERHEART, 52 ülkede psikososyal stresin kalp krizi riskinin önemli bir bölümünü taşıdığını belirledi.' } },
    22: { en: { do: 'Raise the snoring with your doctor and ask about a sleep study.', why: 'Untreated obstructive sleep apnoea keeps blood pressure elevated and is a correctable contributor to cardiovascular risk.' },
      tr: { do: 'Horlamayı hekiminize açın ve uyku testini sorun.', why: 'Tedavi edilmemiş obstrüktif uyku apnesi kan basıncını yüksek tutar ve kardiyovasküler riske düzeltilebilir bir katkıdır.' } },
    23: { en: { do: 'Track weight monthly rather than daily, and look only at the direction.', why: 'Body mass index is one of the eight scored components; daily weight is mostly water and tells you nothing about the trend.' },
      tr: { do: 'Kiloyu günlük değil aylık takip edin ve yalnızca yöne bakın.', why: 'Beden kütle indeksi puanlanan sekiz bileşenden biridir; günlük kilo çoğunlukla sudur ve eğilim hakkında bir şey söylemez.' } },
    24: { en: { do: 'Pick the lowest-scoring domain above and work only on that for three months.', why: 'The AHA score improves component by component; spreading effort across all eight at once is how people end up moving none of them.' },
      tr: { do: 'Yukarıdaki en düşük puanlı alanı seçin ve üç ay boyunca yalnızca onunla uğraşın.', why: 'AHA puanı bileşen bileşen iyileşir; çabayı sekize birden yaymak, hiçbirini oynatamamanın yoludur.' } }
  },
  flags: [
    { q: [4], at: 3, need: 1,
      en: 'You reported chest tightness or unusual breathlessness on exertion. That is the classic presentation of exercise-induced angina and it needs assessing before you increase activity — please book an appointment rather than training around it.',
      tr: 'Efor sırasında göğüs sıkışması ya da olağandışı nefes darlığı bildirdiniz. Bu, eforla ortaya çıkan anjinanın klasik tablosudur ve aktiviteyi artırmadan önce değerlendirilmesi gerekir — etrafından dolaşarak antrenman yapmak yerine lütfen randevu alın.' },
    { q: [15, 16], at: 4, need: 2,
      en: 'Your blood pressure, cholesterol and blood sugar have not been measured recently. Three of the eight components of cardiovascular health are numbers you cannot feel, and all three are treatable long before they cause symptoms. A single appointment covers all of them.',
      tr: 'Tansiyon, kolesterol ve kan şekeriniz yakın zamanda ölçülmemiş. Kardiyovasküler sağlığın sekiz bileşeninden üçü hissedemeyeceğiniz sayılardır ve üçü de belirti vermeden çok önce tedavi edilebilir. Tek bir randevu üçünü birden kapsar.' },
    { q: [10, 22], at: 3, need: 2,
      en: 'Daily nicotine use appears alongside heavy snoring. Those two compound each other on blood pressure and night-time oxygen. Ask about both in the same appointment — quitting support and a sleep study are the two interventions with the largest effect available to you here.',
      tr: 'Günlük nikotin kullanımı, belirgin horlamayla birlikte görünüyor. Bu ikisi kan basıncı ve gece oksijeni üzerinde birbirini katlar. İkisini de aynı randevuda sorun — bırakma desteği ve uyku testi, burada elinizdeki en büyük etkiye sahip iki müdahaledir.' }
  ]
};


/* ---------------------------------------------------------------
   ODAKLANMA
   --------------------------------------------------------------- */

const focus = {
  basis: {
    en: ['WHO Adult ADHD Self-Report Scale (ASRS-v1.1) domains',
      'Sleep deprivation and cognition meta-analysis', 'Media multitasking research',
      'Physical activity and cognition (2018 PAG review)'],
    tr: ['DSÖ Erişkin DEHB Öz-Bildirim Ölçeği (ASRS-v1.1) alanları',
      'Uyku yoksunluğu ve biliş meta-analizi', 'Medya çoklu görevi araştırmaları',
      'Fiziksel aktivite ve biliş (2018 PAG derlemesi)']
  },
  refs: [
    { pmid: '15841682', en: 'Kessler RC et al. The WHO Adult ADHD Self-Report Scale (ASRS). Psychol Med. 2005', tr: 'Kessler RC ve ark. DSÖ Erişkin DEHB Öz-Bildirim Ölçeği (ASRS). Psychol Med. 2005' },
    { pmid: '20438143', en: 'Lim J, Dinges DF. Meta-analysis of short-term sleep deprivation on cognitive variables. Psychol Bull. 2010', tr: 'Lim J, Dinges DF. Kısa süreli uyku yoksunluğunun bilişsel değişkenlere etkisi: meta-analiz. Psychol Bull. 2010' },
    { pmid: '32206165', en: 'Madore KP, Wagner AD. Multicosts of multitasking. Cerebrum. 2019', tr: 'Madore KP, Wagner AD. Çoklu görevin çoklu maliyetleri. Cerebrum. 2019' },
    { pmid: '30275312', en: 'Uncapher MR, Wagner AD. Minds and brains of media multitaskers. PNAS. 2018', tr: 'Uncapher MR, Wagner AD. Medya çoklu görevcilerinin zihinleri ve beyinleri. PNAS. 2018' },
    { pmid: '31095081', en: 'Erickson KI et al. Physical activity, cognition and brain outcomes. Med Sci Sports Exerc. 2019', tr: 'Erickson KI ve ark. Fiziksel aktivite, biliş ve beyin sonuçları. Med Sci Sports Exerc. 2019' },
    { pmid: '26677204', en: 'Nehlig A. Effects of coffee and caffeine on brain health and disease. Pract Neurol. 2016', tr: 'Nehlig A. Kahve ve kafeinin beyin sağlığı ve hastalığı üzerine etkileri. Pract Neurol. 2016' }
  ],
  domains: {
    sustain: {
      en: { why: 'Sustained attention is a limited resource that depletes and recovers, not a fixed trait. The ASRS items in this domain — losing the thread while reading, careless mistakes, drifting off mid-conversation — are the everyday form of what attention research measures in the laboratory.',
        low: 'Do not start by trying to concentrate longer. Start by making the block shorter than your current limit and finishing it, then extend. Attention rebuilds from completed blocks, not from failed long ones.',
        high: 'You can hold a thread, which is the raw material everything else in this assessment is built on.' },
      tr: { why: 'Sürdürülen dikkat sabit bir özellik değil, tükenen ve toparlanan sınırlı bir kaynaktır. Bu alandaki ASRS maddeleri — okurken kopmak, dikkatsizlik hatası, konuşmanın ortasında dalmak — dikkat araştırmasının laboratuvarda ölçtüğü şeyin gündelik hâlidir.',
        low: 'Daha uzun odaklanmaya çalışarak başlamayın. Bloğu mevcut sınırınızdan kısa tutup bitirerek başlayın, sonra uzatın. Dikkat, başarısız uzun bloklardan değil tamamlanmış bloklardan yeniden kurulur.',
        high: 'Bir ipi tutabiliyorsunuz; bu testteki diğer her şeyin üzerine kurulduğu ham madde budur.' }
    },
    distract: {
      en: { why: 'Switching between tasks is not free. Each switch leaves part of the attention on the previous task, and heavy media multitaskers perform worse on tests of working memory and sustained attention — the cost shows up on measures, not only in how it feels.',
        low: 'The fix is environmental, not motivational. The phone in another room beats the phone face-down, which beats the phone on silent, and none of them require you to be more disciplined.',
        high: 'You are not paying the switching cost, which is usually the largest single tax on a working day.' },
      tr: { why: 'İşler arasında geçiş yapmak bedava değildir. Her geçiş dikkatin bir kısmını önceki işte bırakır ve yoğun medya çoklu görevcileri çalışma belleği ile sürdürülen dikkat testlerinde daha kötü performans gösterir — maliyet yalnızca hissiyatta değil, ölçümlerde de görünür.',
        low: 'Çözüm motivasyonel değil çevresel. Başka odadaki telefon, ters çevrilmiş telefonu yener; o da sessizdeki telefonu yener ve hiçbiri sizden daha disiplinli olmanızı istemez.',
        high: 'Geçiş maliyetini ödemiyorsunuz; bu genellikle bir iş gününe binen en büyük tek vergidir.' }
    },
    start: {
      en: { why: 'Starting and organising are executive functions, and they fail first when load is high — which is why the ASRS asks about unfinished tasks and lost appointments rather than about intelligence or effort.',
        low: 'Get the list out of your head and onto something external. Working memory is small; using it as storage is what makes starting feel impossible.',
        high: 'Your tasks live outside your head and you finish what you start, which is the difference between capacity and output.' },
      tr: { why: 'Başlatma ve düzenleme yürütücü işlevlerdir ve yük yüksekken ilk onlar bozulur — ASRS\'nin zekâ ya da çaba yerine yarım kalan işleri ve kaçırılan randevuları sormasının sebebi budur.',
        low: 'Listeyi kafanızdan çıkarıp dışsal bir yere alın. Çalışma belleği küçüktür; onu depo olarak kullanmak başlamayı imkânsız hissettiren şeydir.',
        high: 'İşleriniz kafanızın dışında yaşıyor ve başladığınızı bitiriyorsunuz; kapasite ile çıktı arasındaki fark budur.' }
    },
    fuel: {
      en: { why: 'Attention runs on biology. A meta-analysis of short-term sleep deprivation found that sustained attention — the ability to stay on task — was the function most reliably degraded, more than reasoning or memory. Movement works in the other direction, with the 2018 guidelines review reporting improvements in cognition after acute bouts.',
        low: 'Sleep and movement are not adjacent to focus, they are its substrate. No technique compensates for six hours of sleep, and caffeine borrows against the next day rather than adding to this one.',
        high: 'The biological side is not the limiting factor for you, which means technique changes have a fair chance of working.' },
      tr: { why: 'Dikkat biyolojiyle çalışır. Kısa süreli uyku yoksunluğu üzerine bir meta-analiz, en güvenilir biçimde bozulan işlevin sürdürülen dikkat — işte kalabilme — olduğunu buldu; akıl yürütme ve bellekten de fazla. Hareket ters yönde çalışıyor: 2018 kılavuz derlemesi tek seferlik egzersizden sonra bilişte düzelme bildiriyor.',
        low: 'Uyku ve hareket odaklanmanın komşusu değil, zeminidir. Hiçbir teknik altı saatlik uykuyu telafi etmez ve kafein bugüne eklemez, yarından borç alır.',
        high: 'Biyolojik taraf sizde sınırlayıcı etken değil; bu da teknik değişikliklerin işe yaraması için adil bir şans demek.' }
    },
    depth: {
      en: { why: 'Deep work needs an uninterrupted block, and breaks are not the opposite of focus — they are how attention is restored. A day made of fragments produces the feeling of having worked without the output, which then pushes the real work into the evening.',
        low: 'Defend one block rather than optimising the whole day. Two protected hours produce more than eight fragmented ones, and the evening stops being where the work goes.',
        high: 'You get real blocks and you take real breaks, which is the pattern that makes sustained output possible without an evening shift.' },
      tr: { why: 'Derin çalışma kesintisiz bir blok ister ve molalar odaklanmanın zıddı değildir — dikkatin onarıldığı yerdir. Parçalardan oluşan bir gün, çıktı olmadan çalışmış olma hissi üretir; sonra da gerçek iş akşama itilir.',
        low: 'Bütün günü optimize etmek yerine tek bir bloğu savunun. İki korunmuş saat, sekiz parçalı saatten fazlasını üretir ve akşam işin gittiği yer olmaktan çıkar.',
        high: 'Gerçek bloklarınız ve gerçek molalarınız var; akşam mesaisi olmadan sürekli çıktıyı mümkün kılan örüntü budur.' }
    }
  },
  actions: {
    0: { en: { do: 'Set a timer for slightly less than your current limit and stop when it rings.', why: 'Attention rebuilds from blocks you finish; blocks you abandon teach the opposite lesson.' },
      tr: { do: 'Mevcut sınırınızdan biraz kısa bir süre kurun ve zil çaldığında durun.', why: 'Dikkat bitirdiğiniz bloklardan yeniden kurulur; yarıda bıraktığınız bloklar tam tersini öğretir.' } },
    1: { en: { do: 'Read with a finger or cursor under the line for the first ten minutes.', why: 'Losing the thread while reading is a scored ASRS item; an external anchor holds attention that internal effort does not.' },
      tr: { do: 'İlk on dakika satırın altında parmak ya da imleçle okuyun.', why: 'Okurken kopmak puanlanan bir ASRS maddesidir; dışsal bir çıpa, içsel çabanın tutamadığı dikkati tutar.' } },
    2: { en: { do: 'Check the easy work once, at the end, rather than trying to be careful throughout.', why: 'Careless errors on simple tasks come from low arousal, not low effort — a separate checking pass catches what vigilance cannot.' },
      tr: { do: 'Kolay işi baştan sona dikkatli olmaya çalışmak yerine sonda bir kez kontrol edin.', why: 'Basit işlerdeki dikkatsizlik hataları düşük çabadan değil düşük uyarılmadan gelir; ayrı bir kontrol turu, tetikte olmanın yakalayamadığını yakalar.' } },
    3: { en: { do: 'Repeat the last sentence back when you notice you drifted.', why: 'Drifting mid-conversation is on the ASRS; recovering explicitly keeps the thread instead of quietly losing the rest of it.' },
      tr: { do: 'Daldığınızı fark ettiğinizde son cümleyi geri tekrarlayın.', why: 'Konuşma ortasında dalmak ASRS\'de yer alır; açıkça toparlanmak, geri kalanını sessizce kaybetmek yerine ipi elde tutar.' } },
    4: { en: { do: 'Start the day with the task that is hard but clear, not the one that is easy but vague.', why: 'Flow needs a defined next step; vague tasks are where attention leaks even when motivation is high.' },
      tr: { do: 'Güne kolay ama belirsiz olanla değil, zor ama net olan işle başlayın.', why: 'Akış tanımlı bir sonraki adım ister; motivasyon yüksek olsa bile dikkat, belirsiz işlerde sızar.' } },
    5: { en: { do: 'Put the phone in another room while you work — not face-down on the desk.', why: 'Each switch leaves attention behind on the previous task; distance removes the option rather than asking you to resist it.' },
      tr: { do: 'Çalışırken telefonu başka bir odaya koyun — masada ters çevirmeyin.', why: 'Her geçiş dikkatin bir kısmını önceki işte bırakır; mesafe, direnmenizi istemek yerine seçeneği ortadan kaldırır.' } },
    6: { en: { do: 'Turn off every notification except calls from a short list of people.', why: 'An interruption costs more than the seconds it takes, because getting back in is the expensive part.' },
      tr: { do: 'Kısa bir kişi listesinden gelen aramalar dışında bütün bildirimleri kapatın.', why: 'Bir kesinti, aldığı saniyelerden fazlasına mal olur; pahalı olan kısım geri dönmektir.' } },
    7: { en: { do: 'Close every tab that is not part of the current task before you start.', why: 'Heavy media multitaskers perform worse on working memory and sustained attention tests; visible alternatives are part of the load.' },
      tr: { do: 'Başlamadan önce mevcut işe ait olmayan bütün sekmeleri kapatın.', why: 'Yoğun medya çoklu görevcileri çalışma belleği ve sürdürülen dikkat testlerinde daha kötü performans gösterir; görünür alternatifler yükün parçasıdır.' } },
    8: { en: { do: 'Write one sentence about where you are before you get up from a task.', why: 'The cost of an interruption is mostly the re-entry; a written handhold turns minutes of reorientation into seconds.' },
      tr: { do: 'Bir işten kalkmadan önce nerede olduğunuza dair tek bir cümle yazın.', why: 'Kesintinin maliyeti çoğunlukla geri dönüştedir; yazılı bir tutamak, dakikalarca süren yeniden yönelmeyi saniyeye indirir.' } },
    9: { en: { do: 'Agree one signal with the people around you that means do not interrupt.', why: 'Most interruptions are not urgent, but they are also not visible as interruptions to the person making them.' },
      tr: { do: 'Çevrenizdekilerle "bölme" anlamına gelen tek bir işaret üzerinde anlaşın.', why: 'Kesintilerin çoğu acil değildir ama onu yapan kişi için kesinti olarak da görünmez.' } },
    10: { en: { do: 'Define what "finished" means for a task before you start it.', why: 'Unfinished tasks are an ASRS item; most of them stop at the point where the definition of done was never fixed.' },
      tr: { do: 'Bir işe başlamadan önce "bitti"nin ne anlama geldiğini tanımlayın.', why: 'Yarım kalan işler bir ASRS maddesidir; çoğu, bitmişliğin tanımının hiç yapılmadığı noktada durur.' } },
    11: { en: { do: 'Commit to two minutes of the task rather than to finishing it.', why: 'Starting is the executive step that fails, not continuing; the two-minute rule sidesteps it rather than fighting it.' },
      tr: { do: 'İşi bitirmeye değil, iki dakika yapmaya söz verin.', why: 'Bozulan yürütücü adım devam etmek değil başlamaktır; iki dakika kuralı onunla savaşmak yerine yanından dolanır.' } },
    12: { en: { do: 'Keep one list, in one place, and look at it at the same two times each day.', why: 'Working memory holds only a few items; using it for storage is what makes organisation feel impossible.' },
      tr: { do: 'Tek bir listeyi tek bir yerde tutun ve her gün aynı iki saatte ona bakın.', why: 'Çalışma belleği yalnızca birkaç öge tutar; onu depo olarak kullanmak düzeni imkânsız hissettiren şeydir.' } },
    13: { en: { do: 'Put everything with a date straight into the calendar, at the moment you hear it.', why: 'Losing track of appointments is a scored item; capture at the moment of hearing is the only step that reliably works.' },
      tr: { do: 'Tarihi olan her şeyi, duyduğunuz anda doğrudan takvime yazın.', why: 'Randevuları kaçırmak puanlanan bir maddedir; duyulduğu anda kaydetmek güvenilir biçimde işe yarayan tek adımdır.' } },
    14: { en: { do: 'Choose tomorrow’s single most important task tonight.', why: 'Deciding in advance removes the choice from the moment when your executive function is at its weakest.' },
      tr: { do: 'Yarının en önemli tek işini bu akşam seçin.', why: 'Önceden karar vermek, seçimi yürütücü işlevinizin en zayıf olduğu andan alır.' } },
    15: { en: { do: 'Treat seven hours as a work requirement, not a luxury.', why: 'In a meta-analysis of sleep deprivation, sustained attention was the cognitive function most reliably impaired — more than reasoning or memory.' },
      tr: { do: 'Yedi saati bir lüks değil, işin gereği sayın.', why: 'Uyku yoksunluğu meta-analizinde en güvenilir biçimde bozulan bilişsel işlev sürdürülen dikkatti — akıl yürütme ve bellekten de fazla.' } },
    16: { en: { do: 'Put a walk before the block of work you care most about.', why: 'The 2018 physical activity guidelines review reported improved cognition after single bouts of exercise, not only after months of training.' },
      tr: { do: 'En çok önemsediğiniz çalışma bloğunun önüne bir yürüyüş koyun.', why: '2018 fiziksel aktivite kılavuzu derlemesi, yalnızca aylarca antrenmandan sonra değil tek seferlik egzersizden sonra da bilişte düzelme bildirdi.' } },
    17: { en: { do: 'Cap caffeine at two servings and take none after early afternoon.', why: 'Caffeine blocks the sleep-pressure signal rather than adding alertness; the debt is repaid from the following day.' },
      tr: { do: 'Kafeini iki porsiyonla sınırlayın ve öğleden hemen sonrasında bırakın.', why: 'Kafein uyanıklık eklemez, uyku baskısı sinyalini bloke eder; borç ertesi günden ödenir.' } },
    18: { en: { do: 'Eat before the block, not after it.', why: 'Working through hunger costs attention long before it costs energy, and the dip is usually blamed on the task.' },
      tr: { do: 'Öğünü bloktan sonra değil önce yiyin.', why: 'Açlıkla çalışmak, enerjiye mal olmadan çok önce dikkate mal olur ve o düşüş genelde işin üstüne yıkılır.' } },
    19: { en: { do: 'Get outside for ten minutes within an hour of waking.', why: 'Morning light sharpens the alerting system for the whole day and brings the following night’s sleep forward.' },
      tr: { do: 'Uyandıktan sonraki bir saat içinde on dakika dışarı çıkın.', why: 'Sabah ışığı bütün gün için uyarı sistemini keskinleştirir ve ertesi gecenin uykusunu öne çeker.' } },
    20: { en: { do: 'Block ninety minutes in the calendar and mark it busy, before anyone else books it.', why: 'A protected block is the only reliable defence against a day that is fully bookable by other people.' },
      tr: { do: 'Takvimde doksan dakikayı bloklayın ve başkası almadan önce meşgul olarak işaretleyin.', why: 'Korunmuş bir blok, başkalarının tamamen doldurabildiği bir güne karşı tek güvenilir savunmadır.' } },
    21: { en: { do: 'Take the break away from every screen — a window, a corridor, outside.', why: 'Attention recovers during genuinely undemanding time; a break spent scrolling is another task, not a rest.' },
      tr: { do: 'Molayı bütün ekranlardan uzakta verin — pencere, koridor, dışarısı.', why: 'Dikkat gerçekten talepsiz zamanda toparlanır; kaydırarak geçen mola dinlenme değil başka bir iştir.' } },
    22: { en: { do: 'Move one recurring meeting to protect a morning block instead of working late.', why: 'Evening work is usually the symptom of a fragmented day; fixing the fragmentation is what removes it.' },
      tr: { do: 'Geç saate kalmak yerine, sabah bloğunu korumak için tekrarlayan bir toplantıyı taşıyın.', why: 'Akşam çalışması genelde parçalanmış bir günün belirtisidir; onu ortadan kaldıran şey parçalanmayı düzeltmektir.' } },
    23: { en: { do: 'Close mail and chat for the duration of the block, and say so if you need to.', why: 'Availability is a choice with a cost; making the cost visible is usually enough to buy back the block.' },
      tr: { do: 'Blok boyunca posta ve sohbeti kapatın; gerekiyorsa bunu söyleyin.', why: 'Ulaşılabilirlik maliyeti olan bir seçimdir; maliyeti görünür kılmak genelde bloğu geri almaya yeter.' } },
    24: { en: { do: 'If focus has been poor for months and it started in childhood, that is worth assessing properly.', why: 'The ASRS is a screening scale, not a diagnosis — but persistent, lifelong difficulty is exactly what it was designed to flag for a proper assessment.' },
      tr: { do: 'Odaklanma aylardır kötüyse ve çocukluktan beri sürüyorsa, bunu düzgünce değerlendirtmeye değer.', why: 'ASRS bir tanı değil tarama ölçeğidir — ama kalıcı, yaşam boyu süren zorluk tam da düzgün bir değerlendirmeye yönlendirmek için tasarlandığı şeydir.' } }
  },
  flags: [
    { q: [1, 2, 10, 13], at: 4, need: 3,
      en: 'Difficulty finishing tasks, careless mistakes, losing track of appointments and drifting mid-conversation appear together in your answers. These are the domains the WHO adult ADHD screening scale covers. This assessment cannot diagnose anything, but if the pattern has been present since childhood and affects work or relationships, a proper evaluation is a reasonable next step.',
      tr: 'İşleri bitirememe, dikkatsizlik hataları, randevuları kaçırma ve konuşma ortasında dalma cevaplarınızda bir arada görünüyor. Bunlar, DSÖ erişkin DEHB tarama ölçeğinin kapsadığı alanlardır. Bu test hiçbir şeye tanı koyamaz; ancak bu tablo çocukluktan beri sürüyor ve işi ya da ilişkileri etkiliyorsa düzgün bir değerlendirme makul bir sonraki adımdır.' },
    { q: [15], at: 3, need: 1,
      en: 'You are working on well under six hours of sleep. In a meta-analysis of short-term sleep deprivation, sustained attention was the function most reliably impaired — so the focus problem you are trying to solve with technique may be a sleep problem wearing a disguise.',
      tr: 'Altı saatin belirgin biçimde altında bir uykuyla çalışıyorsunuz. Kısa süreli uyku yoksunluğu meta-analizinde en güvenilir biçimde bozulan işlev sürdürülen dikkatti — yani teknikle çözmeye çalıştığınız odaklanma sorunu, kılık değiştirmiş bir uyku sorunu olabilir.' },
    { q: [17], at: 3, need: 1,
      en: 'You need a substantial amount of caffeine simply to function. Caffeine blocks the sleep-pressure signal rather than creating alertness, so a rising requirement usually marks a growing sleep debt rather than a falling tolerance.',
      tr: 'Yalnızca işlev görebilmek için hatırı sayılır miktarda kafeine ihtiyaç duyuyorsunuz. Kafein uyanıklık yaratmaz, uyku baskısı sinyalini bloke eder; bu yüzden artan ihtiyaç genellikle düşen bir toleransı değil büyüyen bir uyku borcunu işaret eder.' }
  ]
};


/* ---------------------------------------------------------------
   KONDİSYON
   --------------------------------------------------------------- */

const fitness = {
  basis: {
    en: ['WHO 2020 physical activity and sedentary behaviour guidelines',
      'US Physical Activity Guidelines for Americans', 'IPAQ activity questionnaire',
      'Step-count and mortality meta-analysis'],
    tr: ['DSÖ 2020 fiziksel aktivite ve hareketsiz davranış kılavuzu',
      'ABD Amerikalılar için Fiziksel Aktivite Kılavuzu', 'IPAQ aktivite anketi',
      'Adım sayısı ve mortalite meta-analizi']
  },
  refs: [
    { pmid: '33239350', en: 'Bull FC et al. WHO 2020 guidelines on physical activity and sedentary behaviour. Br J Sports Med. 2020', tr: 'Bull FC ve ark. DSÖ 2020 fiziksel aktivite ve hareketsiz davranış kılavuzu. Br J Sports Med. 2020' },
    { pmid: '30418471', en: 'Piercy KL et al. The Physical Activity Guidelines for Americans. JAMA. 2018', tr: 'Piercy KL ve ark. Amerikalılar için Fiziksel Aktivite Kılavuzu. JAMA. 2018' },
    { pmid: '35228201', en: 'Momma H et al. Muscle-strengthening activities and risk of mortality and major non-communicable disease. Br J Sports Med. 2022', tr: 'Momma H ve ark. Kas kuvvetlendirici aktiviteler, ölüm ve majör bulaşıcı olmayan hastalık riski. Br J Sports Med. 2022' },
    { pmid: '31434697', en: 'Ekelund U et al. Accelerometer-measured activity, sedentary time and all-cause mortality. BMJ. 2019', tr: 'Ekelund U ve ark. İvmeölçerle ölçülen aktivite, oturma süresi ve tüm nedenlere bağlı ölüm. BMJ. 2019' },
    { pmid: '35247352', en: 'Paluch AE et al. Daily steps and all-cause mortality: meta-analysis of 15 cohorts. Lancet Public Health. 2022', tr: 'Paluch AE ve ark. Günlük adım sayısı ve tüm nedenlere bağlı ölüm: 15 kohortluk meta-analiz. Lancet Public Health. 2022' },
    { pmid: '12900694', en: 'Craig CL et al. International Physical Activity Questionnaire: reliability and validity. Med Sci Sports Exerc. 2003', tr: 'Craig CL ve ark. Uluslararası Fiziksel Aktivite Anketi: güvenilirlik ve geçerlilik. Med Sci Sports Exerc. 2003' }
  ],
  domains: {
    aerobic: {
      en: { why: 'The WHO target for adults is 150 to 300 minutes of moderate activity a week, or 75 to 150 vigorous. The important shape of the evidence is that the curve is steepest at the start: the biggest single gain in the whole dose-response relationship is the step from inactive to lightly active.',
        low: 'Do not aim for 150 minutes. Aim for ten minutes today, and let the number climb from something that already exists.',
        high: 'You are at or above the guideline target, which places you on the flat part of the curve where more brings smaller returns.' },
      tr: { why: 'DSÖ\'nün erişkin hedefi haftada 150–300 dakika orta şiddet ya da 75–150 dakika şiddetli aktivite. Kanıtın önemli şekli şu: eğri en başta en diktir; bütün doz-yanıt ilişkisindeki en büyük tek kazanç, hareketsizden az hareketliye geçiştir.',
        low: '150 dakikayı hedeflemeyin. Bugün on dakikayı hedefleyin ve sayı, zaten var olan bir şeyin üstüne çıksın.',
        high: 'Kılavuz hedefindesiniz ya da üzerindesiniz; bu sizi eğrinin, fazlasının daha az getirdiği düz kısmına yerleştirir.' }
    },
    strength: {
      en: { why: 'Strength work is a separate recommendation, not a substitute for cardio. Pooling 16 studies, muscle-strengthening activity was associated with lower all-cause mortality and lower rates of cardiovascular disease, cancer and diabetes — with the association strongest at around 30 to 60 minutes a week.',
        low: 'Two sessions a week is the recommendation, and the effective dose is smaller than most people assume. Bodyweight counts, and half an hour a week is already in the range where the association appears.',
        high: 'You are covering the recommendation most people skip, which matters more with each decade for both function and independence.' },
      tr: { why: 'Kuvvet çalışması, kardiyonun yerine geçen değil ayrı bir öneridir. 16 çalışmanın birleştirildiği analizde kas kuvvetlendirme; daha düşük tüm nedenlere bağlı ölüm ve daha düşük kalp-damar hastalığı, kanser ve diyabet oranıyla ilişkiliydi — ilişki haftada yaklaşık 30–60 dakikada en güçlüydü.',
        low: 'Öneri haftada iki seans ve etkili doz çoğu kişinin sandığından küçük. Kendi vücut ağırlığınız da sayılır; haftada yarım saat ilişkinin göründüğü aralıkta zaten.',
        high: 'Çoğu insanın atladığı öneriyi karşılıyorsunuz; bu, hem işlev hem bağımsızlık açısından her on yılda daha çok önem kazanır.' }
    },
    daily: {
      en: { why: 'Step count is the most accessible measure of everyday movement, and the meta-analysis of 15 cohorts found mortality falling as steps rose, with the curve flattening at roughly 6,000 to 8,000 steps in older adults and 8,000 to 10,000 in younger ones. Beyond that, more steps did not keep adding benefit.',
        low: 'The target is lower than the folklore. Getting from 3,000 to 7,000 steps captures most of the measured benefit; 10,000 is a marketing number, not a threshold.',
        high: 'Your everyday movement is already in the range where the mortality curve has flattened.' },
      tr: { why: 'Adım sayısı, günlük hareketin en erişilebilir ölçüsü; 15 kohortluk meta-analiz adım arttıkça ölüm oranının düştüğünü, eğrinin yaşlı erişkinlerde kabaca 6.000–8.000, gençlerde 8.000–10.000 adımda düzleştiğini buldu. Ötesinde daha fazla adım fayda eklemedi.',
        low: 'Hedef, söylenceden düşük. 3.000\'den 7.000 adıma çıkmak ölçülmüş faydanın çoğunu yakalar; 10.000 bir eşik değil, bir pazarlama sayısıdır.',
        high: 'Günlük hareketiniz, ölüm eğrisinin düzleştiği aralıkta.' }
    },
    sitting: {
      en: { why: 'Sitting is not simply the absence of exercise. In a harmonised analysis of accelerometer data, mortality rose sharply above about nine and a half hours of sedentary time a day — and the risk from long sitting was substantially offset in people who were also active.',
        low: 'Break the blocks rather than counting the total. Standing up every hour changes the physiology in a way that one gym session in the evening does not fully undo.',
        high: 'Your sitting is not sitting in the range where the risk curve turns sharply upward.' },
      tr: { why: 'Oturmak yalnızca egzersizin yokluğu değildir. İvmeölçer verilerinin uyumlaştırıldığı bir analizde ölüm oranı, günde yaklaşık dokuz buçuk saatlik hareketsizliğin üzerinde belirgin biçimde yükseldi — ve uzun oturmanın riski, aynı zamanda aktif olanlarda önemli ölçüde dengelendi.',
        low: 'Toplamı saymak yerine blokları bölün. Her saat ayağa kalkmak, akşamki tek bir salon seansının tam olarak geri alamadığı biçimde fizyolojiyi değiştirir.',
        high: 'Oturma süreniz, risk eğrisinin sert biçimde yukarı döndüğü aralıkta değil.' }
    },
    capacity: {
      en: { why: 'Capacity is what the training is for. Recovery, pain-free movement and enough sleep decide whether the work accumulates as adaptation or as damage — the adaptation happens between sessions, not during them.',
        low: 'If pain or exhaustion is limiting you, the answer is not more effort. Pain that persists past two weeks is worth assessing, and undertrained recovery makes every session less effective than it looks.',
        high: 'You recover well and move without limitation, which is what makes a plan sustainable over years rather than weeks.' },
      tr: { why: 'Antrenmanın amacı kapasitedir. Toparlanma, ağrısız hareket ve yeterli uyku; çalışmanın uyum olarak mı hasar olarak mı biriktiğine karar verir — uyum seanslar sırasında değil aralarında olur.',
        low: 'Sizi kısıtlayan ağrı ya da tükenmişlikse cevap daha fazla çaba değildir. İki haftayı geçen ağrıyı değerlendirtmek gerekir ve yetersiz toparlanma her seansı göründüğünden daha etkisiz kılar.',
        high: 'İyi toparlanıyor ve kısıtlanmadan hareket ediyorsunuz; bir planı haftalarca değil yıllarca sürdürülebilir kılan şey budur.' }
    }
  },
  actions: {
    0: { en: { do: 'Add ten minutes of brisk walking to a day you already do something on.', why: 'The dose-response curve is steepest at the bottom: the gain from inactive to lightly active is larger than any later increase.' },
      tr: { do: 'Zaten bir şey yaptığınız bir güne on dakika tempolu yürüyüş ekleyin.', why: 'Doz-yanıt eğrisi en altta en diktir: hareketsizden az hareketliye geçişin kazancı, sonraki her artıştan büyüktür.' } },
    1: { en: { do: 'Add one session a week where you get properly out of breath for a few minutes.', why: 'Vigorous activity counts double against the WHO target: 75 minutes of it meets the same recommendation as 150 moderate.' },
      tr: { do: 'Haftaya, birkaç dakika gerçekten nefes nefese kaldığınız bir seans ekleyin.', why: 'Şiddetli aktivite DSÖ hedefine iki kat sayılır: 75 dakikası, 150 dakika orta şiddetle aynı öneriyi karşılar.' } },
    2: { en: { do: 'Fix the days rather than the duration — same days each week, whatever length.', why: 'Consistency survives a bad week; a plan built on duration collapses the first time the duration is not available.' },
      tr: { do: 'Süreyi değil günleri sabitleyin — her hafta aynı günler, süre ne olursa olsun.', why: 'Süreklilik kötü bir haftayı atlatır; süre üzerine kurulu bir plan, süre bulunamadığı ilk anda çöker.' } },
    3: { en: { do: 'Use stairs as the test — three flights without stopping, once a week.', why: 'A repeatable everyday task is a better progress measure than how a session felt, and it needs no equipment.' },
      tr: { do: 'Testi merdivenle yapın — haftada bir kez, durmadan üç kat.', why: 'Tekrarlanabilir gündelik bir görev, seansın nasıl hissettirdiğinden iyi bir ilerleme ölçüsüdür ve ekipman gerektirmez.' } },
    4: { en: { do: 'Change the activity rather than trying harder to like the one you are doing.', why: 'Adherence, not intensity, is what separates a plan that works from one that is technically better and abandoned.' },
      tr: { do: 'Yaptığınız etkinliği sevmeye daha çok çalışmak yerine etkinliği değiştirin.', why: 'İşe yarayan planı, teknik olarak daha iyi ama terk edilen plandan ayıran şey şiddet değil sürekliliktir.' } },
    5: { en: { do: 'Do two twenty-minute strength sessions a week, bodyweight if that is what you have.', why: 'Across 16 studies, muscle-strengthening activity tracked with lower mortality, with the association strongest at 30 to 60 minutes a week.' },
      tr: { do: 'Haftada iki kez yirmi dakikalık kuvvet seansı yapın; elinizde olan buysa kendi vücut ağırlığınızla.', why: '16 çalışmada kas kuvvetlendirme daha düşük ölüm oranıyla birlikte gitti; ilişki haftada 30–60 dakikada en güçlüydü.' } },
    6: { en: { do: 'Cover a push, a pull and a squat in every session.', why: 'Three patterns reach the major muscle groups; missing one is how imbalances and the injuries that follow them develop.' },
      tr: { do: 'Her seansta bir itme, bir çekme ve bir çömelme hareketi yapın.', why: 'Üç kalıp büyük kas gruplarına ulaşır; birini atlamak, dengesizliklerin ve ardından gelen sakatlıkların oluşma yoludur.' } },
    7: { en: { do: 'Write down what you lifted, and add one rep or a small increment next time.', why: 'Progressive overload is the mechanism strength adapts to; without a record, the load quietly stays the same for months.' },
      tr: { do: 'Ne kaldırdığınızı yazın ve bir sonraki sefer bir tekrar ya da küçük bir artış ekleyin.', why: 'Kuvvetin uyum sağladığı mekanizma aşamalı yüklenmedir; kayıt olmadan yük aylarca sessizce aynı kalır.' } },
    8: { en: { do: 'Carry something heavy for a short distance twice a week.', why: 'Loaded carries build grip and trunk strength, which is the part of strength that everyday tasks actually draw on.' },
      tr: { do: 'Haftada iki kez kısa mesafe ağır bir şey taşıyın.', why: 'Yüklü taşımalar kavrama ve gövde kuvvetini geliştirir; gündelik işlerin gerçekten kullandığı kuvvet kısmı budur.' } },
    9: { en: { do: 'Add five minutes of balance or mobility at the end of a session you already do.', why: 'The WHO guidelines recommend balance work in its own right; attaching it to an existing habit is what makes it happen.' },
      tr: { do: 'Zaten yaptığınız bir seansın sonuna beş dakika denge ya da hareketlilik ekleyin.', why: 'DSÖ kılavuzları denge çalışmasını kendi başına önerir; onu var olan bir alışkanlığa iliştirmek gerçekleşmesini sağlar.' } },
    10: { en: { do: 'Aim for 7,000 steps rather than 10,000.', why: 'In a meta-analysis of 15 cohorts, mortality fell as steps rose but the curve flattened around 6,000 to 8,000 — beyond that, more steps added little.' },
      tr: { do: '10.000 yerine 7.000 adımı hedefleyin.', why: '15 kohortluk meta-analizde adım arttıkça ölüm oranı düştü ama eğri 6.000–8.000 civarında düzleşti — ötesinde ek adımların katkısı küçüktü.' } },
    11: { en: { do: 'Pick one regular journey and do it on foot or by bike.', why: 'Active travel converts an existing obligation into activity, which is why it survives when discretionary exercise does not.' },
      tr: { do: 'Düzenli yaptığınız bir yolculuğu seçin ve onu yürüyerek ya da bisikletle yapın.', why: 'Aktif ulaşım, var olan bir zorunluluğu harekete çevirir; isteğe bağlı egzersiz düştüğünde onun ayakta kalmasının sebebi budur.' } },
    12: { en: { do: 'Take the stairs whenever it is fewer than four floors.', why: 'A rule with a clear boundary removes the daily negotiation, and stair climbing is vigorous activity in short bursts.' },
      tr: { do: 'Dört kattan azsa her seferinde merdiveni kullanın.', why: 'Net sınırı olan bir kural günlük pazarlığı ortadan kaldırır; merdiven çıkmak da kısa aralıklarla şiddetli aktivitedir.' } },
    13: { en: { do: 'Move one daily activity outdoors — a call, a coffee, part of the commute.', why: 'Outdoor movement adds daylight and adherence to the same minutes; both make the habit more likely to persist.' },
      tr: { do: 'Günlük bir etkinliği dışarı taşıyın — bir telefon görüşmesi, bir kahve, yolun bir kısmı.', why: 'Açık havada hareket aynı dakikalara gün ışığı ve süreklilik ekler; ikisi de alışkanlığın kalıcı olma olasılığını artırır.' } },
    14: { en: { do: 'Walk for ten minutes after your largest meal of the day.', why: 'Movement after eating blunts the post-meal glucose rise, which is a different benefit from the one training gives.' },
      tr: { do: 'Günün en büyük öğününden sonra on dakika yürüyün.', why: 'Yemek sonrası hareket, öğün sonrası glukoz yükselişini törpüler; bu, antrenmanın sağladığından farklı bir faydadır.' } },
    15: { en: { do: 'Set an hourly reminder to stand for two minutes.', why: 'Mortality rose sharply above about nine and a half hours of sedentary time a day; breaking the blocks is the part you control at a desk.' },
      tr: { do: 'Her saat başı iki dakika ayağa kalkmak için hatırlatıcı kurun.', why: 'Ölüm oranı günde yaklaşık dokuz buçuk saatlik hareketsizliğin üzerinde belirgin yükseldi; masa başında kontrol edebildiğiniz kısım blokları bölmektir.' } },
    16: { en: { do: 'Take calls standing or walking whenever the call does not need a screen.', why: 'Attaching movement to something already in the diary is far more reliable than adding a new activity.' },
      tr: { do: 'Ekran gerekmeyen her aramayı ayakta ya da yürüyerek yapın.', why: 'Hareketi zaten takvimde olan bir şeye iliştirmek, yeni bir etkinlik eklemekten çok daha güvenilirdir.' } },
    17: { en: { do: 'Put one screen-free evening a week in the diary and do something physical instead.', why: 'Leisure sitting is the most changeable part of the total, because unlike work sitting it is entirely yours to schedule.' },
      tr: { do: 'Haftada bir ekransız akşamı takvime koyun ve onun yerine fiziksel bir şey yapın.', why: 'Boş zaman oturması toplamın en değiştirilebilir kısmıdır; çünkü iş oturmasının aksine tamamen sizin planınıza tabidir.' } },
    18: { en: { do: 'Change posture on a schedule — one position for a whole day is the problem, not the chair.', why: 'The physiological cost comes from continuous stillness rather than from any particular position.' },
      tr: { do: 'Duruşu bir programa göre değiştirin — sorun sandalye değil, bütün gün tek bir pozisyon.', why: 'Fizyolojik maliyet belirli bir pozisyondan değil, sürekli hareketsizlikten gelir.' } },
    19: { en: { do: 'Put one full rest day between hard sessions and treat it as part of the plan.', why: 'Adaptation happens between sessions; training on top of incomplete recovery accumulates fatigue rather than fitness.' },
      tr: { do: 'Zorlu seanslar arasına tam bir dinlenme günü koyun ve onu planın parçası sayın.', why: 'Uyum seanslar arasında olur; tamamlanmamış toparlanmanın üstüne antrenman, kondisyon değil yorgunluk biriktirir.' } },
    20: { en: { do: 'Get pain that lasts more than two weeks assessed rather than training around it.', why: 'Persistent pain changes movement patterns, and the compensation usually causes the second injury.' },
      tr: { do: 'İki haftadan uzun süren ağrıyı etrafından dolanarak çalışmak yerine değerlendirtin.', why: 'Kalıcı ağrı hareket kalıplarını değiştirir ve ikinci sakatlığa genellikle bu telafi yol açar.' } },
    21: { en: { do: 'Add sleep before you add training volume.', why: 'Recovery is where adaptation happens; a session added on top of short sleep costs more than it returns.' },
      tr: { do: 'Antrenman hacmi eklemeden önce uyku ekleyin.', why: 'Uyum toparlanmada gerçekleşir; kısa uykunun üstüne eklenen bir seans getirdiğinden fazlasına mal olur.' } },
    22: { en: { do: 'Swap the session for a walk when you are already exhausted, rather than skipping or forcing it.', why: 'A lighter option keeps the habit intact while allowing recovery; all-or-nothing is what breaks long streaks.' },
      tr: { do: 'Zaten tükenmişken seansı atlamak ya da zorlamak yerine yürüyüşle değiştirin.', why: 'Hafif bir seçenek toparlanmaya izin verirken alışkanlığı korur; uzun serileri kıran şey ya hep ya hiçtir.' } },
    23: { en: { do: 'Judge a week by whether you did the sessions, not by how they felt.', why: 'Perceived effort varies with sleep, stress and food; completion is the only measure that reflects the training itself.' },
      tr: { do: 'Bir haftayı seansların nasıl hissettirdiğine göre değil, yapılıp yapılmadığına göre değerlendirin.', why: 'Algılanan efor uykuya, strese ve beslenmeye göre değişir; antrenmanın kendisini yansıtan tek ölçü tamamlanmadır.' } },
    24: { en: { do: 'Retest the same thing in eight weeks — same stairs, same walk, same weight.', why: 'Fitness changes are slow and invisible day to day; a fixed retest is the only way to see the direction.' },
      tr: { do: 'Sekiz hafta sonra aynı şeyi tekrar test edin — aynı merdiven, aynı yürüyüş, aynı ağırlık.', why: 'Kondisyon değişimi yavaş ve günlük olarak görünmezdir; yönü görmenin tek yolu sabit bir yeniden testtir.' } }
  },
  flags: [
    { q: [20], at: 3, need: 1,
      en: 'Pain or stiffness is limiting how you move. Persistent musculoskeletal pain beyond a couple of weeks is worth assessing — training around it usually produces a compensation injury, and most of these conditions respond well to targeted rehabilitation.',
      tr: 'Ağrı ya da tutukluk hareketinizi kısıtlıyor. Birkaç haftayı geçen kas-iskelet ağrısını değerlendirtmeye değer — etrafından dolanarak çalışmak genelde bir telafi sakatlığı üretir ve bu durumların çoğu hedefli rehabilitasyona iyi yanıt verir.' },
    { q: [0, 5, 10], at: 3, need: 3,
      en: 'Aerobic activity, strength work and everyday steps are all low together. That is the position where the return on a small change is largest in the entire evidence base — you do not need a programme, you need twenty minutes on most days.',
      tr: 'Aerobik hareket, kuvvet çalışması ve günlük adımların üçü birden düşük. Bütün kanıt tabanında küçük bir değişikliğin getirisinin en büyük olduğu konum burasıdır — bir programa değil, çoğu gün yirmi dakikaya ihtiyacınız var.' },
    { q: [3], at: 3, need: 1,
      en: 'Climbing three flights of stairs is hard for you. If that is new, or comes with breathlessness or chest discomfort, have it looked at before you increase your training — new exercise intolerance is a symptom worth taking seriously.',
      tr: 'Üç kat merdiven çıkmak size zor geliyor. Bu yeni bir durumsa ya da yanında nefes darlığı veya göğüs rahatsızlığı varsa antrenmanı artırmadan önce baktırın — yeni ortaya çıkan egzersiz intoleransı ciddiye alınmayı hak eden bir belirtidir.' }
  ]
};


/* ---------------------------------------------------------------
   BAĞIŞIKLIK
   --------------------------------------------------------------- */

const immunity = {
  basis: {
    en: ['Experimental viral-challenge sleep studies', 'Exercise immunology (J-curve literature)',
      'Stress and immune function meta-analysis', 'Hand hygiene and vitamin D trial evidence'],
    tr: ['Deneysel viral maruziyet uyku çalışmaları', 'Egzersiz immünolojisi (J eğrisi yazını)',
      'Stres ve bağışıklık işlevi meta-analizi', 'El hijyeni ve D vitamini çalışma kanıtı']
  },
  refs: [
    { pmid: '26118561', en: 'Prather AA et al. Behaviorally assessed sleep and susceptibility to the common cold. Sleep. 2015', tr: 'Prather AA ve ark. Davranışsal ölçülen uyku ve soğuk algınlığına yatkınlık. Sleep. 2015' },
    { pmid: '19139325', en: 'Cohen S et al. Sleep habits and susceptibility to the common cold. Arch Intern Med. 2009', tr: 'Cohen S ve ark. Uyku alışkanlıkları ve soğuk algınlığına yatkınlık. Arch Intern Med. 2009' },
    { pmid: '31193280', en: 'Nieman DC, Wentz LM. The compelling link between physical activity and the body’s defense system. J Sport Health Sci. 2019', tr: 'Nieman DC, Wentz LM. Fiziksel aktivite ile bedenin savunma sistemi arasındaki güçlü bağ. J Sport Health Sci. 2019' },
    { pmid: '15250815', en: 'Segerstrom SC, Miller GE. Psychological stress and the human immune system. Psychol Bull. 2004', tr: 'Segerstrom SC, Miller GE. Psikolojik stres ve insan bağışıklık sistemi. Psychol Bull. 2004' },
    { pmid: '28202713', en: 'Martineau AR et al. Vitamin D supplementation to prevent acute respiratory tract infections: meta-analysis. BMJ. 2017', tr: 'Martineau AR ve ark. Akut solunum yolu enfeksiyonlarını önlemede D vitamini takviyesi: meta-analiz. BMJ. 2017' },
    { pmid: '18556606', en: 'Aiello AE et al. Effect of hand hygiene on infectious disease risk in the community: meta-analysis. Am J Public Health. 2008', tr: 'Aiello AE ve ark. Toplumda el hijyeninin bulaşıcı hastalık riskine etkisi: meta-analiz. Am J Public Health. 2008' },
    { pmid: '26695755', en: 'Sarkar D et al. Alcohol’s effect on host defense. Alcohol Res. 2015', tr: 'Sarkar D ve ark. Alkolün konak savunması üzerindeki etkisi. Alcohol Res. 2015' }
  ],
  domains: {
    sleep: {
      en: { why: 'This is the rare immunity claim with experimental evidence rather than correlation. Volunteers had their sleep measured objectively for a week, were then given nasal drops containing rhinovirus, and were kept in quarantine: those sleeping under six hours were markedly more likely to develop a cold than those sleeping seven or more.',
        low: 'Sleep is the highest-value item in this entire assessment, and it is the only one tested by deliberately infecting people under controlled conditions.',
        high: 'You are on the side of that experiment where people were most likely to shrug the virus off.' },
      tr: { why: 'Bağışıklıkla ilgili, korelasyon değil deney kanıtı olan nadir iddialardan biri. Gönüllülerin uykusu bir hafta nesnel olarak ölçüldü, ardından burun damlasıyla rinovirüs verildi ve karantinada tutuldular: altı saatin altında uyuyanlarda soğuk algınlığı gelişme olasılığı, yedi saat ve üzeri uyuyanlara göre belirgin biçimde yüksekti.',
        low: 'Uyku bu testteki en yüksek değerli maddedir ve insanları kontrollü koşullarda bilerek enfekte ederek sınanmış tek maddedir.',
        high: 'O deneyin, insanların virüsü en kolay atlattığı tarafındasınız.' }
    },
    move: {
      en: { why: 'The relationship between exercise and infection is a J-curve. Regular moderate activity is associated with fewer and shorter respiratory infections, while prolonged very hard efforts without recovery are followed by a temporary window of increased susceptibility.',
        low: 'Moderate and regular beats hard and occasional here — this is one of the few areas where the recommendation is explicitly not "more".',
        high: 'You sit in the part of the curve associated with fewer and milder infections.' },
      tr: { why: 'Egzersiz ile enfeksiyon arasındaki ilişki bir J eğrisidir. Düzenli orta şiddette aktivite, daha az ve daha kısa solunum yolu enfeksiyonuyla ilişkilidir; toparlanmasız uzun ve çok sert eforların ardından ise geçici bir yatkınlık penceresi gelir.',
        low: 'Burada orta ve düzenli olan, sert ve ara sıra olanı yener — önerinin açıkça "daha fazla" olmadığı az sayıdaki alandan biri.',
        high: 'Eğrinin, daha az ve daha hafif enfeksiyonla ilişkili kısmındasınız.' }
    },
    food: {
      en: { why: 'Micronutrient deficiency impairs immune function; supplementing beyond sufficiency mostly does not. The clearest example is vitamin D — a meta-analysis of 25 randomised trials found supplementation reduced acute respiratory infections overall, with the benefit concentrated almost entirely in people who were deficient to begin with.',
        low: 'Fix the deficiency, do not chase the supplement. Food that covers protein, fibre and a wide range of plants does more than any single-nutrient product.',
        high: 'Your intake covers the micronutrients that actually matter, which is where the benefit stops rather than starts.' },
      tr: { why: 'Mikrobesin eksikliği bağışıklık işlevini bozar; yeterliliğin ötesine takviye çoğunlukla bozmaz da düzeltmez de. En net örnek D vitamini: 25 randomize çalışmalık bir meta-analiz, takviyenin akut solunum yolu enfeksiyonlarını genel olarak azalttığını, faydanın ise neredeyse tamamen baştan eksik olanlarda yoğunlaştığını buldu.',
        low: 'Eksikliği giderin, takviyenin peşine düşmeyin. Protein, lif ve geniş bir bitki yelpazesini kapsayan bir beslenme, tek besinli hiçbir üründen fazlasını yapar.',
        high: 'Alımınız gerçekten önemli olan mikrobesinleri kapsıyor; faydanın başladığı değil bittiği yer burasıdır.' }
    },
    stress: {
      en: { why: 'Pooling 30 years of studies, brief acute stress can transiently mobilise parts of the immune response, but chronic stress lasting months was consistently associated with suppression across nearly every measured immune function.',
        low: 'Duration is the variable that matters here, not intensity. A hard week is not the problem; a hard year is.',
        high: 'You are not carrying the kind of sustained load that the immune literature associates with suppression.' },
      tr: { why: '30 yıllık çalışmaların birleştirildiği analizde kısa ve akut stres bağışıklık yanıtının bazı kısımlarını geçici olarak harekete geçirebiliyor; aylarca süren kronik stres ise ölçülen neredeyse her bağışıklık işlevinde tutarlı biçimde baskılanmayla ilişkiliydi.',
        low: 'Burada önemli olan değişken şiddet değil süredir. Sorun zor bir hafta değil, zor bir yıldır.',
        high: 'Bağışıklık yazınının baskılanmayla ilişkilendirdiği türden sürekli bir yük taşımıyorsunuz.' }
    },
    guard: {
      en: { why: 'These are the interventions with the most direct evidence of all: a meta-analysis of community hand-hygiene studies found meaningful reductions in respiratory and gastrointestinal illness, and vaccination is the only item here that prevents a specific disease rather than shifting a general risk.',
        low: 'This domain is not about resilience — it is about exposure. Reducing exposure is faster and more reliable than improving defence.',
        high: 'The barrier side is in place, which is the part of immunity that does not depend on how well you slept.' },
      tr: { why: 'Bunlar hepsi arasında en doğrudan kanıtı olan müdahaleler: toplum düzeyinde el hijyeni çalışmalarının meta-analizi solunum ve sindirim yolu hastalıklarında anlamlı azalma buldu; aşılama ise burada genel bir riski kaydırmak yerine belirli bir hastalığı önleyen tek maddedir.',
        low: 'Bu alan dirençle değil maruziyetle ilgili. Maruziyeti azaltmak, savunmayı iyileştirmekten daha hızlı ve daha güvenilirdir.',
        high: 'Bariyer tarafı yerinde; bağışıklığın ne kadar iyi uyuduğunuza bağlı olmayan kısmı budur.' }
    }
  },
  actions: {
    0: { en: { do: 'Treat seven hours as the floor, especially in the weeks people around you are ill.', why: 'In a controlled viral-challenge study, people sleeping under six hours were markedly more likely to develop a cold after the same exposure.' },
      tr: { do: 'Yedi saati taban kabul edin, özellikle çevrenizdekilerin hasta olduğu haftalarda.', why: 'Kontrollü bir viral maruziyet çalışmasında altı saatin altında uyuyanlarda, aynı maruziyetten sonra soğuk algınlığı gelişme olasılığı belirgin biçimde yüksekti.' } },
    1: { en: { do: 'Work on staying asleep, not just on getting to bed — dark, quiet, cool.', why: 'The earlier common-cold study found sleep efficiency, not just duration, predicted who developed symptoms.' },
      tr: { do: 'Yalnızca yatağa girmeye değil, uykuda kalmaya çalışın — karanlık, sessiz, serin.', why: 'Daha önceki soğuk algınlığı çalışması, kimin belirti geliştirdiğini yalnızca sürenin değil uyku verimliliğinin de öngördüğünü buldu.' } },
    2: { en: { do: 'Keep the same wake time all week, including days off.', why: 'Immune function follows a daily rhythm; a body clock that shifts every few days keeps that rhythm out of phase.' },
      tr: { do: 'Tatil günleri dâhil bütün hafta aynı kalkış saatini koruyun.', why: 'Bağışıklık işlevi günlük bir ritim izler; birkaç günde bir kayan biyolojik saat bu ritmi faz dışında tutar.' } },
    3: { en: { do: 'After a night shift or a night awake, protect the next sleep instead of pushing through.', why: 'Recovery sleep is when the deficit is repaid; skipping it compounds the effect rather than resetting it.' },
      tr: { do: 'Gece vardiyasından ya da uykusuz bir geceden sonra zorlamak yerine bir sonraki uykuyu koruyun.', why: 'Açığın kapandığı yer telafi uykusudur; onu atlamak etkiyi sıfırlamaz, katlar.' } },
    4: { en: { do: 'Take the rest day when you are ill rather than saving it for later.', why: 'Working through an infection extends its course and spreads it; the day off is cheaper now than the week off later.' },
      tr: { do: 'Hastayken dinlenme gününü sonraya saklamak yerine o gün kullanın.', why: 'Enfeksiyonla çalışmak süreyi uzatır ve bulaştırır; bugün bir gün, sonra bir hafta olmaktan ucuzdur.' } },
    5: { en: { do: 'Do thirty minutes of moderate movement most days rather than one hard session a week.', why: 'The evidence describes a J-curve: regular moderate activity tracks with fewer and shorter respiratory infections.' },
      tr: { do: 'Haftada tek bir sert seans yerine çoğu gün otuz dakika orta şiddette hareket edin.', why: 'Kanıt bir J eğrisi tarif ediyor: düzenli orta şiddette aktivite daha az ve daha kısa solunum yolu enfeksiyonuyla birlikte gidiyor.' } },
    6: { en: { do: 'Break long sitting every hour, even on days you have already exercised.', why: 'Prolonged sitting is associated with low-grade inflammation independently of whether you trained that day.' },
      tr: { do: 'O gün egzersiz yapmış olsanız bile uzun oturmayı her saat bölün.', why: 'Uzun süreli oturma, o gün antrenman yapıp yapmadığınızdan bağımsız olarak düşük dereceli enflamasyonla ilişkilidir.' } },
    7: { en: { do: 'Build recovery days into a hard block rather than adding them after it goes wrong.', why: 'Prolonged very hard effort without recovery is followed by a temporary window of increased susceptibility to infection.' },
      tr: { do: 'Toparlanma günlerini iş ters gittikten sonra eklemek yerine zorlu bloğun içine kurun.', why: 'Toparlanmasız uzun ve çok sert eforun ardından enfeksiyona yatkınlığın arttığı geçici bir pencere gelir.' } },
    8: { en: { do: 'Get outside daily, even briefly, and especially in winter.', why: 'Daylight supports both vitamin D synthesis and the circadian rhythm that immune function runs on.' },
      tr: { do: 'Kısa da olsa her gün, özellikle kışın dışarı çıkın.', why: 'Gün ışığı hem D vitamini sentezini hem de bağışıklık işlevinin üzerinde çalıştığı sirkadiyen ritmi destekler.' } },
    9: { en: { do: 'Watch the trend rather than the number — a slow annual climb matters more than any single weight.', why: 'Excess adiposity is associated with chronic low-grade inflammation and a blunted response to vaccination.' },
      tr: { do: 'Sayıya değil eğilime bakın — yavaş yıllık artış, tek bir tartıdan daha önemlidir.', why: 'Fazla yağ dokusu kronik düşük dereceli enflamasyon ve aşıya körelmiş yanıtla ilişkilidir.' } },
    10: { en: { do: 'Put fruit or vegetables at two meals a day rather than buying a multivitamin.', why: 'Deficiency impairs immune function; supplementing past sufficiency mostly does not improve it further.' },
      tr: { do: 'Multivitamin almak yerine günde iki öğüne sebze ya da meyve koyun.', why: 'Eksiklik bağışıklık işlevini bozar; yeterliliğin ötesine takviye çoğunlukla daha fazla iyileştirme sağlamaz.' } },
    11: { en: { do: 'Include a protein source at every meal, particularly if you are ill or over 65.', why: 'Antibodies and immune cells are built from amino acids; intake matters most when demand rises or appetite falls.' },
      tr: { do: 'Her öğüne bir protein kaynağı ekleyin, özellikle hastaysanız ya da 65 yaş üzerindeyseniz.', why: 'Antikorlar ve bağışıklık hücreleri amino asitlerden yapılır; alım, talep arttığında ya da iştah düştüğünde en çok önem kazanır.' } },
    12: { en: { do: 'Eat pulses or wholegrains most days.', why: 'Fibre feeds the gut bacteria that produce short-chain fatty acids, which are involved in regulating immune responses.' },
      tr: { do: 'Çoğu gün baklagil ya da tam tahıl yiyin.', why: 'Lif, bağışıklık yanıtlarının düzenlenmesinde rol oynayan kısa zincirli yağ asitlerini üreten bağırsak bakterilerini besler.' } },
    13: { en: { do: 'If you get little daylight, ask for a vitamin D level rather than guessing.', why: 'Across 25 randomised trials supplementation reduced acute respiratory infections, with the benefit concentrated in people who were deficient.' },
      tr: { do: 'Az gün ışığı alıyorsanız tahmin etmek yerine D vitamini düzeyi isteyin.', why: '25 randomize çalışmada takviye akut solunum yolu enfeksiyonlarını azalttı; fayda eksik olanlarda yoğunlaştı.' } },
    14: { en: { do: 'Keep one properly cooked meal a day even in the busiest weeks.', why: 'Weeks spent on packaged food narrow micronutrient intake exactly when demand from stress and poor sleep is highest.' },
      tr: { do: 'En yoğun haftalarda bile günde bir düzgün pişmiş öğünü koruyun.', why: 'Paketli gıdayla geçen haftalar, stres ve kötü uykudan gelen talebin en yüksek olduğu anda mikrobesin alımını daraltır.' } },
    15: { en: { do: 'Deal with the duration of the stress, not only how it feels day to day.', why: 'Brief stress can transiently mobilise immune responses; stress lasting months was consistently associated with suppression.' },
      tr: { do: 'Yalnızca günlük hissiyatla değil, stresin süresiyle ilgilenin.', why: 'Kısa stres bağışıklık yanıtlarını geçici olarak harekete geçirebilir; aylarca süren stres tutarlı biçimde baskılanmayla ilişkilendirildi.' } },
    16: { en: { do: 'Speak to one person you trust each week, not only when something is wrong.', why: 'Social connection is associated with better outcomes across the immune and cardiovascular literature, and it is easiest to maintain before it is needed.' },
      tr: { do: 'Yalnızca bir şey ters gittiğinde değil, her hafta güvendiğiniz bir kişiyle konuşun.', why: 'Sosyal bağ, bağışıklık ve kalp-damar yazınında daha iyi sonuçlarla ilişkilidir ve sürdürmesi en kolay olduğu zaman ihtiyaç duyulmadan öncedir.' } },
    17: { en: { do: 'Put ten minutes of something genuinely calming into the day, at a fixed time.', why: 'What matters is that the recovery happens regularly rather than which method is chosen.' },
      tr: { do: 'Güne, sabit bir saatte, gerçekten sakinleştiren on dakikalık bir şey koyun.', why: 'Önemli olan hangi yöntemin seçildiği değil, toparlanmanın düzenli olarak gerçekleşmesidir.' } },
    18: { en: { do: 'Treat sleep lost to worry as the priority — it is where stress does most of its damage here.', why: 'Stress and short sleep act on the same outcome, so the combination costs more than either alone.' },
      tr: { do: 'Endişe yüzünden kaybedilen uykuyu öncelik yapın — stresin buradaki asıl hasarı orada oluyor.', why: 'Stres ve kısa uyku aynı sonuç üzerinde etki eder; bu yüzden ikisinin birleşimi tek başlarına olduğundan pahalıdır.' } },
    19: { en: { do: 'Arrange one contact a day that is not work — a call, a walk, a shared meal.', why: 'Loneliness is associated with raised inflammatory markers, and it responds to contact rather than to information.' },
      tr: { do: 'Günde bir kez işle ilgili olmayan bir temas ayarlayın — bir telefon, bir yürüyüş, ortak bir yemek.', why: 'Yalnızlık yükselmiş enflamatuvar belirteçlerle ilişkilidir ve bilgiye değil temasa yanıt verir.' } },
    20: { en: { do: 'Wash your hands on arriving home and before eating, for twenty seconds.', why: 'A meta-analysis of community hand-hygiene studies found meaningful reductions in both respiratory and gastrointestinal illness.' },
      tr: { do: 'Eve girince ve yemekten önce ellerinizi yirmi saniye yıkayın.', why: 'Toplum düzeyinde el hijyeni çalışmalarının meta-analizi hem solunum hem sindirim yolu hastalıklarında anlamlı azalma buldu.' } },
    21: { en: { do: 'Ask your doctor which vaccinations apply to your age and health, and book them together.', why: 'Vaccination is the only item in this assessment that prevents a specific disease rather than shifting a general risk.' },
      tr: { do: 'Hekiminize yaşınıza ve sağlık durumunuza hangi aşıların uygun olduğunu sorun ve hepsini birlikte planlayın.', why: 'Aşılama, bu testte genel bir riski kaydırmak yerine belirli bir hastalığı önleyen tek maddedir.' } },
    22: { en: { do: 'If you smoke, treat quitting as the immunity intervention, because it is the largest one.', why: 'Tobacco smoke damages the airway lining and the clearance mechanism that keeps respiratory infections out.' },
      tr: { do: 'Sigara içiyorsanız bırakmayı bağışıklık müdahalesi sayın; en büyüğü odur.', why: 'Tütün dumanı solunum yolu örtüsünü ve enfeksiyonları dışarıda tutan temizlenme mekanizmasını bozar.' } },
    23: { en: { do: 'Keep heavy drinking sessions out of weeks when you are already run down.', why: 'Acute heavy drinking impairs several parts of host defence, including the airway and the cells that respond first.' },
      tr: { do: 'Zaten yorgun düştüğünüz haftalarda yoğun içme seanslarını dışarıda bırakın.', why: 'Akut yoğun içme, solunum yolu ve ilk yanıt veren hücreler dâhil konak savunmasının birkaç kısmını bozar.' } },
    24: { en: { do: 'Never take leftover antibiotics, and finish the ones you are prescribed as directed.', why: 'Antibiotics do nothing for viral infections and unnecessary courses drive resistance, which is a problem you inherit yourself.' },
      tr: { do: 'Artan antibiyotiği asla kullanmayın; reçete edileni önerildiği gibi tamamlayın.', why: 'Antibiyotikler viral enfeksiyonlara hiçbir şey yapmaz ve gereksiz kürler direnç geliştirir; bu, sonucunu kendinizin devraldığı bir sorundur.' } }
  },
  flags: [
    { q: [0, 15], at: 3, need: 2,
      en: 'Short sleep and sustained stress appear together. Those are the two exposures with the strongest experimental and meta-analytic evidence for reduced resistance to infection, and they reinforce each other. If you get one of them under control, the other usually follows.',
      tr: 'Kısa uyku ve sürekli stres bir arada görünüyor. Bunlar, enfeksiyona direncin azalmasına dair en güçlü deneysel ve meta-analitik kanıta sahip iki maruziyettir ve birbirlerini besler. Birini kontrol altına alırsanız diğeri genellikle onu izler.' },
    { q: [21], at: 3, need: 1,
      en: 'Your vaccinations are not up to date. This is the only item here that prevents a specific illness rather than shifting a general risk, and one appointment usually covers everything that applies to your age and health.',
      tr: 'Aşılarınız güncel değil. Bu, buradaki genel bir riski kaydırmak yerine belirli bir hastalığı önleyen tek maddedir ve tek bir randevu genellikle yaşınıza ve sağlık durumunuza uygun her şeyi kapsar.' },
    { q: [24], at: 3, need: 1,
      en: 'You take antibiotics without a doctor prescribing them. They do nothing for viral infections, and unnecessary courses select for resistant bacteria in your own body — the consequence is personal, not only public.',
      tr: 'Hekim reçete etmeden antibiyotik kullanıyorsunuz. Viral enfeksiyonlara hiçbir etkileri yok ve gereksiz kürler kendi bedeninizde dirençli bakterileri seçer — sonucu yalnızca toplumsal değil, kişiseldir.' }
  ]
};


/* ---------------------------------------------------------------
   DİJİTAL DENGE
   --------------------------------------------------------------- */

const tech = {
  basis: {
    en: ['Smartphone Addiction Scale — Short Version (SAS-SV)',
      'Internet use and sleep meta-analysis', 'Media multitasking research',
      'Screen time and well-being ("Goldilocks") studies'],
    tr: ['Akıllı Telefon Bağımlılığı Ölçeği — Kısa Form (SAS-SV)',
      'İnternet kullanımı ve uyku meta-analizi', 'Medya çoklu görevi araştırmaları',
      'Ekran süresi ve iyilik hâli ("Goldilocks") çalışmaları']
  },
  refs: [
    { pmid: '24391787', en: 'Kwon M et al. The Smartphone Addiction Scale: development and validation of a short version. PLoS One. 2013', tr: 'Kwon M ve ark. Akıllı Telefon Bağımlılığı Ölçeği: kısa formun geliştirilmesi ve doğrulanması. PLoS One. 2013' },
    { pmid: '31336284', en: 'Alimoradi Z et al. Internet addiction and sleep problems: systematic review and meta-analysis. Sleep Med Rev. 2019', tr: 'Alimoradi Z ve ark. İnternet bağımlılığı ve uyku sorunları: sistematik derleme ve meta-analiz. Sleep Med Rev. 2019' },
    { pmid: '25535358', en: 'Chang AM et al. Evening use of light-emitting eReaders. PNAS. 2015', tr: 'Chang AM ve ark. Akşam saatlerinde ışık yayan okuyucu kullanımı. PNAS. 2015' },
    { pmid: '32206165', en: 'Madore KP, Wagner AD. Multicosts of multitasking. Cerebrum. 2019', tr: 'Madore KP, Wagner AD. Çoklu görevin çoklu maliyetleri. Cerebrum. 2019' },
    { pmid: '28085574', en: 'Przybylski AK, Weinstein N. A large-scale test of the Goldilocks hypothesis. Psychol Sci. 2017', tr: 'Przybylski AK, Weinstein N. Goldilocks hipotezinin büyük ölçekli sınanması. Psychol Sci. 2017' },
    { pmid: '30406005', en: 'Twenge JM, Campbell WK. Associations between screen time and lower psychological well-being. Prev Med Rep. 2018', tr: 'Twenge JM, Campbell WK. Ekran süresi ile düşük psikolojik iyilik hâli arasındaki ilişkiler. Prev Med Rep. 2018' },
    { pmid: '26999354', en: 'Andreassen CS et al. Addictive use of social media and video games and psychiatric symptoms. Psychol Addict Behav. 2016', tr: 'Andreassen CS ve ark. Sosyal medya ve video oyunlarının bağımlı kullanımı ile psikiyatrik belirtiler. Psychol Addict Behav. 2016' }
  ],
  domains: {
    amount: {
      en: { why: 'The evidence does not support the idea that any screen time is harmful. A study of more than 120,000 adolescents found a curve rather than a line: moderate use was associated with slightly better well-being than none at all, with the decline only appearing well beyond that point.',
        low: 'The question is not whether to use screens but where your own turning point is. Automatic, unplanned picking-up is the part that predicts problems, not the total.',
        high: 'Your use is in the range the evidence associates with no measurable cost, and it is the automaticity — not the hours — that would change that.' },
      tr: { why: 'Kanıt, her ekran süresinin zararlı olduğu fikrini desteklemiyor. 120.000\'den fazla ergen üzerinde yapılan bir çalışma bir doğru değil bir eğri buldu: ılımlı kullanım, hiç kullanmamaya göre biraz daha iyi iyilik hâliyle ilişkiliydi ve düşüş ancak o noktanın epey ötesinde ortaya çıktı.',
        low: 'Soru ekran kullanıp kullanmamak değil, kendi dönüm noktanızın nerede olduğu. Sorunları öngören şey toplam değil, otomatik ve plansız elinize alma davranışı.',
        high: 'Kullanımınız kanıtın ölçülebilir bir maliyetle ilişkilendirmediği aralıkta; bunu değiştirecek olan şey saatler değil otomatikleşmedir.' }
    },
    night: {
      en: { why: 'This is the most firmly established harm in the whole area. In a controlled crossover study, reading on a light-emitting device before bed suppressed melatonin, delayed the body clock, lengthened the time taken to fall asleep and reduced next-morning alertness — measured, not reported.',
        low: 'If you change one thing here, change this one. Night-time use is where screen time stops being a preference and starts being a physiological effect.',
        high: 'Your nights are protected, which means the rest of your screen use is not being paid for out of your sleep.' },
      tr: { why: 'Bu alandaki en sağlam kurulmuş zarar burası. Kontrollü bir çapraz geçişli çalışmada, yatmadan önce ışık yayan bir cihazdan okumak melatonini baskıladı, biyolojik saati geciktirdi, uykuya dalma süresini uzattı ve ertesi sabahki uyanıklığı azalttı — beyan değil, ölçüm.',
        low: 'Burada tek bir şey değiştirecekseniz bunu değiştirin. Gece kullanımı, ekran süresinin bir tercih olmaktan çıkıp fizyolojik bir etkiye dönüştüğü yerdir.',
        high: 'Geceleriniz korunuyor; bu da geri kalan ekran kullanımınızın bedelinin uykunuzdan ödenmediği anlamına gelir.' }
    },
    attention: {
      en: { why: 'Task switching carries a measurable cost. Heavy media multitaskers perform worse on tests of working memory and sustained attention, and the cost of an interruption is mostly in the re-entry rather than in the seconds it takes.',
        low: 'Distance beats discipline. A phone in another room outperforms every setting you could change on a phone that is within reach.',
        high: 'You are not paying the switching tax, which is usually the largest hidden cost of a connected working day.' },
      tr: { why: 'Görev değiştirmenin ölçülebilir bir maliyeti var. Yoğun medya çoklu görevcileri çalışma belleği ve sürdürülen dikkat testlerinde daha kötü performans gösteriyor; bir kesintinin maliyeti de aldığı saniyelerden çok geri dönüşte.',
        low: 'Mesafe disiplini yener. Başka bir odadaki telefon, elinizin altındaki bir telefonda değiştirebileceğiniz her ayardan iyi çalışır.',
        high: 'Geçiş vergisini ödemiyorsunuz; bu genellikle bağlantılı bir iş gününün en büyük gizli maliyetidir.' }
    },
    mood: {
      en: { why: 'The association between heavy screen use and lower well-being is consistent across large datasets, though the effect sizes are modest and the direction is debated. What is clearer is that use driven by comparison or by an inability to stop is the pattern that tracks with distress.',
        low: 'Change what you use rather than how long. Passive consumption and comparison are the parts of the association that carry the weight, not messaging or creating.',
        high: 'Your time online is not costing you mood, which is the outcome that actually matters more than the hour count.' },
      tr: { why: 'Yoğun ekran kullanımı ile düşük iyilik hâli arasındaki ilişki büyük veri kümelerinde tutarlı; etki büyüklükleri ılımlı ve yön tartışmalı olsa da. Daha net olan şu: karşılaştırmayla ya da durma yetisizliğiyle sürüklenen kullanım, sıkıntıyla birlikte giden örüntüdür.',
        low: 'Ne kadar süre değil, ne kullandığınızı değiştirin. İlişkinin ağırlığını taşıyan kısım pasif tüketim ve karşılaştırmadır; mesajlaşma ya da üretmek değil.',
        high: 'Çevrimiçi zamanınız ruh hâlinize mal olmuyor; asıl önemli olan sonuç, saat sayısından çok budur.' }
    },
    control: {
      en: { why: 'The Smartphone Addiction Scale does not ask how many hours you spend. It asks whether you can stop when you decide to, whether use displaces other things, and whether being without the phone is distressing — the same structure used for other behavioural dependencies.',
        low: 'Build friction rather than resolve. Every effective change here removes the option instead of asking you to resist it.',
        high: 'You can stop when you decide to, which is the actual variable the validated scales are built around.' },
      tr: { why: 'Akıllı Telefon Bağımlılığı Ölçeği kaç saat harcadığınızı sormaz. Karar verdiğinizde durabiliyor musunuz, kullanım başka şeylerin yerini alıyor mu ve telefonsuz kalmak sıkıntı veriyor mu diye sorar — diğer davranışsal bağımlılıklarda kullanılan yapının aynısı.',
        low: 'Karar değil sürtünme inşa edin. Buradaki her etkili değişiklik, direnmenizi istemek yerine seçeneği ortadan kaldırır.',
        high: 'Karar verdiğinizde durabiliyorsunuz; doğrulanmış ölçeklerin etrafında kurulduğu asıl değişken budur.' }
    }
  },
  actions: {
    0: { en: { do: 'Check your own weekly total once, then set a limit twenty per cent below it.', why: 'The evidence describes a curve, not a line — the goal is finding your own turning point rather than reaching zero.' },
      tr: { do: 'Kendi haftalık toplamınıza bir kez bakın, sonra onun yüzde yirmi altına bir sınır koyun.', why: 'Kanıt bir doğru değil bir eğri tarif ediyor — hedef sıfıra inmek değil, kendi dönüm noktanızı bulmak.' } },
    1: { en: { do: 'Move the three apps you open automatically off the home screen.', why: 'Automatic, unplanned checking is the behaviour the addiction scales measure, and it is driven by placement more than by intent.' },
      tr: { do: 'Otomatik olarak açtığınız üç uygulamayı ana ekrandan kaldırın.', why: 'Otomatik ve plansız kontrol, bağımlılık ölçeklerinin ölçtüğü davranıştır ve onu niyetten çok konum sürükler.' } },
    2: { en: { do: 'Turn on a time reminder inside the two apps that surprise you most.', why: 'Losing track of time is a scored item on the smartphone addiction scale; an external cue restores the awareness the app removed.' },
      tr: { do: 'Sizi en çok şaşırtan iki uygulamanın içinde süre hatırlatıcısını açın.', why: 'Zamanın nasıl geçtiğini kaçırmak akıllı telefon bağımlılığı ölçeğinde puanlanan bir maddedir; dışsal bir işaret, uygulamanın kaldırdığı farkındalığı geri verir.' } },
    3: { en: { do: 'Carry something else for the gaps — a book, a notebook, nothing at all.', why: 'Filling every pause is a habit maintained by availability; the pause itself is where attention recovers.' },
      tr: { do: 'Boşluklar için yanınızda başka bir şey taşıyın — bir kitap, bir defter ya da hiçbir şey.', why: 'Her duraklamayı doldurmak, bulunurlukla sürdürülen bir alışkanlıktır; dikkatin toparlandığı yer duraklamanın kendisidir.' } },
    4: { en: { do: 'Say what you are opening the app for, out loud or in your head, before you open it.', why: 'Naming the intention converts an automatic action into a decision, which is the only point at which it can change.' },
      tr: { do: 'Uygulamayı açmadan önce ne için açtığınızı yüksek sesle ya da içinizden söyleyin.', why: 'Niyeti adlandırmak otomatik bir eylemi bir karara dönüştürür; değişebileceği tek nokta budur.' } },
    5: { en: { do: 'Stop screens an hour before sleep — this is the single highest-value change on this page.', why: 'In a controlled crossover study, evening device use suppressed melatonin, delayed sleep onset and reduced next-morning alertness.' },
      tr: { do: 'Ekranları uykudan bir saat önce bırakın — bu sayfadaki en yüksek değerli tek değişiklik budur.', why: 'Kontrollü bir çapraz geçişli çalışmada akşam cihaz kullanımı melatonini baskıladı, uykuya dalışı geciktirdi ve ertesi sabahki uyanıklığı azalttı.' } },
    6: { en: { do: 'Set an alarm for when to stop, not for when to wake.', why: 'A meta-analysis linked problematic internet use with sleep problems and shorter sleep; the mechanism is displacement, and a cut-off addresses it directly.' },
      tr: { do: 'Alarmı uyanmak için değil, durmak için kurun.', why: 'Bir meta-analiz sorunlu internet kullanımını uyku sorunları ve kısalmış uykuyla ilişkilendirdi; mekanizma yer değiştirmedir ve bir bitiş saati bunu doğrudan ele alır.' } },
    7: { en: { do: 'Leave the phone outside the bedroom so a night waking has nothing to reach for.', why: 'Checking the phone converts a brief normal awakening into full alertness, which is what actually costs you the rest of the night.' },
      tr: { do: 'Telefonu yatak odasının dışında bırakın ki gece uyanmasının uzanacağı bir şey olmasın.', why: 'Telefona bakmak kısa ve normal bir uyanmayı tam uyanıklığa çevirir; gecenin geri kalanına asıl mal olan budur.' } },
    8: { en: { do: 'Buy a separate alarm clock — it removes the only real reason the phone is by the bed.', why: 'The alarm is almost always the stated justification; removing it removes the argument along with the device.' },
      tr: { do: 'Ayrı bir çalar saat alın — telefonun yatağın yanında olmasının tek gerçek gerekçesini ortadan kaldırır.', why: 'Alarm neredeyse her zaman öne sürülen gerekçedir; onu kaldırmak cihazla birlikte tartışmayı da kaldırır.' } },
    9: { en: { do: 'Leave the first thirty minutes of the day screen-free.', why: 'Starting the day reactively sets the pattern for it; the messages will still be there half an hour later.' },
      tr: { do: 'Günün ilk otuz dakikasını ekransız bırakın.', why: 'Güne tepkisel başlamak günün örüntüsünü belirler; mesajlar yarım saat sonra da orada olacak.' } },
    10: { en: { do: 'Work in one window at a time and close the rest.', why: 'Heavy media multitaskers perform worse on working memory and sustained attention tests; the cost is measured, not just felt.' },
      tr: { do: 'Tek pencerede çalışın ve diğerlerini kapatın.', why: 'Yoğun medya çoklu görevcileri çalışma belleği ve sürdürülen dikkat testlerinde daha kötü performans gösterir; maliyet yalnızca hissedilen değil ölçülen bir şeydir.' } },
    11: { en: { do: 'Allow notifications only from named people, and turn off everything else.', why: 'Almost no notification is urgent, and the interruption costs more than the message is worth.' },
      tr: { do: 'Bildirimlere yalnızca adını verdiğiniz kişilerden izin verin, gerisini kapatın.', why: 'Neredeyse hiçbir bildirim acil değildir ve kesinti, mesajın değerinden pahalıya mal olur.' } },
    12: { en: { do: 'Pick one thing to do at a time when you are watching or listening.', why: 'Doing two attention-demanding things at once does neither well and makes both take longer.' },
      tr: { do: 'İzlerken ya da dinlerken tek bir şey yapmayı seçin.', why: 'Dikkat isteyen iki şeyi aynı anda yapmak ikisini de iyi yapmaz ve ikisini de uzatır.' } },
    13: { en: { do: 'Write one line about where you are before you look at the phone.', why: 'Re-entry is the expensive part of an interruption; a written handhold turns minutes back into seconds.' },
      tr: { do: 'Telefona bakmadan önce nerede olduğunuza dair tek bir satır yazın.', why: 'Kesintinin pahalı kısmı geri dönüştür; yazılı bir tutamak dakikaları saniyeye çevirir.' } },
    14: { en: { do: 'Leave the phone in another room for your most important block of work.', why: 'Distance is the only intervention that does not depend on resisting the pull each time it appears.' },
      tr: { do: 'En önemli çalışma bloğunuz için telefonu başka bir odaya bırakın.', why: 'Mesafe, her ortaya çıkışında çekime direnmeye bağlı olmayan tek müdahaledir.' } },
    15: { en: { do: 'Unfollow or mute the ten accounts that most often leave you feeling worse.', why: 'The association with lower well-being is concentrated in passive consumption and comparison rather than in screen time as such.' },
      tr: { do: 'Sizi en sık daha kötü hissettiren on hesabı takipten çıkarın ya da sessize alın.', why: 'Düşük iyilik hâliyle ilişki, ekran süresinin kendisinde değil pasif tüketim ve karşılaştırmada yoğunlaşıyor.' } },
    16: { en: { do: 'Swap fifteen minutes of scrolling for one message to a real person.', why: 'Active, directed contact is the part of online time that is not associated with the well-being decline.' },
      tr: { do: 'On beş dakikalık kaydırmayı gerçek bir kişiye yazılmış bir mesajla değiştirin.', why: 'Aktif ve yönlendirilmiş temas, çevrimiçi zamanın iyilik hâlindeki düşüşle ilişkilendirilmeyen kısmıdır.' } },
    17: { en: { do: 'Try leaving the phone at home for one short errand this week.', why: 'Distress at being without the device is a scored item on the addiction scale, and it fades with brief, deliberate exposure.' },
      tr: { do: 'Bu hafta kısa bir işe telefonu evde bırakarak gitmeyi deneyin.', why: 'Cihazsız kalma sıkıntısı bağımlılık ölçeğinde puanlanan bir maddedir ve kısa, kasıtlı maruziyetle azalır.' } },
    18: { en: { do: 'Set a fixed time to read the news once a day and stay out of it otherwise.', why: 'Repeated exposure to distressing news raises distress without adding information you can act on.' },
      tr: { do: 'Günde bir kez haber okumak için sabit bir saat belirleyin ve dışında girmeyin.', why: 'Sıkıntı veren haberlere tekrar tekrar maruz kalmak, harekete geçebileceğiniz bir bilgi eklemeden sıkıntıyı artırır.' } },
    19: { en: { do: 'Keep the apps that leave you feeling connected and cut the ones that do not.', why: 'The distinction that matters in this literature is between interaction and consumption, not between more and less.' },
      tr: { do: 'Sizi bağlı hissettiren uygulamaları tutun, hissettirmeyenleri çıkarın.', why: 'Bu yazında önemli olan ayrım az ile çok arasında değil, etkileşim ile tüketim arasındadır.' } },
    20: { en: { do: 'Set a limit inside the app rather than relying on deciding to stop.', why: 'Difficulty stopping when you intend to is a core item on the smartphone addiction scale; a built-in limit does the stopping for you.' },
      tr: { do: 'Durmaya karar vermeye güvenmek yerine uygulamanın içine sınır koyun.', why: 'Niyet ettiğinizde duramamak akıllı telefon bağımlılığı ölçeğinin temel maddelerindendir; yerleşik bir sınır durma işini sizin yerinize yapar.' } },
    21: { en: { do: 'Pick one recurring block each week that is completely screen-free.', why: 'A repeating, predictable break is easier to sustain than an open-ended intention to use less.' },
      tr: { do: 'Her hafta tamamen ekransız, tekrarlayan tek bir blok seçin.', why: 'Tekrarlayan ve öngörülebilir bir ara, ucu açık bir "daha az kullanma" niyetinden daha kolay sürdürülür.' } },
    22: { en: { do: 'Put the phone face-down and out of sight when you are with people.', why: 'A visible phone reduces the perceived quality of a conversation even when nobody picks it up.' },
      tr: { do: 'İnsanlarla birlikteyken telefonu ters çevirip görüş alanının dışına koyun.', why: 'Görünür bir telefon, kimse eline almasa bile konuşmanın algılanan kalitesini düşürür.' } },
    23: { en: { do: 'Switch the screen to greyscale for a week and see what changes.', why: 'Removing colour removes part of the reward signal the interface is built on; it is friction that costs nothing.' },
      tr: { do: 'Ekranı bir hafta gri tonlamaya alın ve neyin değiştiğine bakın.', why: 'Rengi kaldırmak, arayüzün üzerine kurulduğu ödül sinyalinin bir kısmını kaldırır; hiçbir maliyeti olmayan bir sürtünmedir.' } },
    24: { en: { do: 'Judge the change by your sleep and your mood, not by the hours saved.', why: 'The outcomes that the evidence actually links to screen use are sleep and well-being; the hour count is only a proxy for them.' },
      tr: { do: 'Değişimi kazanılan saatlerle değil, uykunuz ve ruh hâlinizle değerlendirin.', why: 'Kanıtın ekran kullanımıyla gerçekten ilişkilendirdiği sonuçlar uyku ve iyilik hâlidir; saat sayısı yalnızca onların bir vekilidir.' } }
  },
  flags: [
    { q: [5, 6], at: 4, need: 2,
      en: 'Screen use is reaching right up to sleep and pushing your bedtime later. This is the best-evidenced harm in the whole area — a controlled study showed evening device light suppressing melatonin, delaying sleep and blunting next-morning alertness. If you change one thing from this page, change this.',
      tr: 'Ekran kullanımı uykuya kadar uzanıyor ve yatış saatinizi geriye itiyor. Bu alandaki en iyi kanıtlanmış zarar budur — kontrollü bir çalışma, akşam cihaz ışığının melatonini baskıladığını, uykuyu geciktirdiğini ve ertesi sabahki uyanıklığı körelttiğini gösterdi. Bu sayfadan tek bir şey değiştirecekseniz bunu değiştirin.' },
    { q: [17, 20], at: 3, need: 2,
      en: 'Being unable to check your phone causes real distress, and stopping once you have started is hard. Those two items sit at the centre of the validated smartphone addiction scale. This assessment cannot diagnose anything, but if use is displacing sleep, work or relationships, it is worth discussing with a professional.',
      tr: 'Telefonunuza bakamamak gerçek bir sıkıntı yaratıyor ve başladıktan sonra durmak zor. Bu iki madde, doğrulanmış akıllı telefon bağımlılığı ölçeğinin merkezinde yer alır. Bu test hiçbir şeye tanı koyamaz; ancak kullanım uykunun, işin ya da ilişkilerin yerini alıyorsa bunu bir uzmanla konuşmaya değer.' },
    { q: [15, 16], at: 3, need: 2,
      en: 'Scrolling regularly leaves you feeling worse about yourself and comparison is a large part of it. Across large datasets, the well-being association is concentrated in exactly this pattern rather than in screen time as such — changing what you follow tends to matter more than changing how long you look.',
      tr: 'Kaydırmak düzenli olarak sizi kendinizle ilgili daha kötü hissettiriyor ve karşılaştırma bunun büyük bir parçası. Büyük veri kümelerinde iyilik hâliyle ilişki, ekran süresinin kendisinde değil tam olarak bu örüntüde yoğunlaşıyor — ne takip ettiğinizi değiştirmek, ne kadar baktığınızı değiştirmekten genellikle daha çok fark eder.' }
  ]
};

export const SCIENCE = { sleep, skin, diet, stress, heart, focus, fitness, immunity, tech };

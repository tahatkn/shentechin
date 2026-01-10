const uiTranslations = {
    en: {
        nav_tests: "Tests",
        nav_about: "About",
        nav_login: "Login",
        hero_badge: '<i class="fa-solid fa-user-doctor"></i> Doctor Approved',
        hero_title: "Decode Your Health &<br>Personality DNA",
        hero_desc: "Discover yourself with AI-based analysis backed by medical data. Deep analysis in 9 different categories from sleep patterns to skin type.",
        hero_btn: 'Start Test <i class="fa-solid fa-arrow-right"></i>',
        cat_title: "Analysis Categories",
        cat_desc: "Select a topic you are curious about, let's map out your scientific profile.",
        
        // Kart Başlıkları ve Açıklamaları
        card_sleep_title: "Sleep Quality",
        card_sleep_desc: "Analyze your sleep cycle, find out if you are an early bird or a night owl.",
        
        card_skin_title: "Dermatology Profile",
        card_skin_desc: "Determine your skin type, aging risks and dermocosmetic needs.",
        
        card_diet_title: "Metabolic Nutrition",
        card_diet_desc: "Discover how your body reacts to foods and your ideal diet model.",
        
        card_stress_title: "Stress & Cortisol",
        card_stress_desc: "Measure your daily stress load and burnout risk level.",

        card_heart_title: "Heart Health Risks",
        card_heart_desc: "Learn your cardiovascular risk factors and estimated heart age.",

        card_focus_title: "Focus & Attention",
        card_focus_desc: "Measure attention deficit signs and mental focus performance.",

        card_fitness_title: "Physical Fitness",
        card_fitness_desc: "Analyze your activity level and predisposition to sports.",

        card_immunity_title: "Immunity Power",
        card_immunity_desc: "Test your body resistance and defense mechanism against diseases.",

        card_tech_title: "Digital Balance",
        card_tech_desc: "Measure the effect of screen time and tech usage on brain health.",

        btn_start: "Start Analysis",
        footer_text: "&copy; 2026 ShenTechin Med. All rights reserved. These tests are not medical diagnoses.",

        // Quiz Ekranı
        quiz_back: '<i class="fa-solid fa-arrow-left"></i> Give up & Return',
        quiz_next: 'Next <i class="fa-solid fa-chevron-right"></i>',
        quiz_prev: 'Previous',
        
        // Sonuç Ekranı
        res_share_title: "Share Result",
        res_share_desc: "Compare with friends, show your health score.",
        res_tweet: "Tweet",
        res_whatsapp: "WhatsApp",
        res_expert: "Get Expert Opinion",
        res_expert_desc: "What do these results mean? Get detailed comments from our doctors.",
        res_premium: '<i class="fa-solid fa-user-doctor"></i> Talk to Doctor (Premium)',
        res_retry: "Take Another Test",

        // --- ABOUT PAGE (GENERIC & SAFE) ---
        about_hero_title: "The Intersection of Technology & Wellness",
        about_hero_desc: "We combine advanced algorithms with established medical literature to help you understand your body's signals.",
        
        mission_title: "Our Mission",
        mission_desc: "To raise personal health awareness. We provide accessible tools for everyone to gain insights into their physical and mental well-being.",
        
        privacy_title: "Privacy Commitment",
        privacy_desc: "Your journey is private. We do not store personal identifiable health data. All assessments are processed securely and anonymously.",
        
        // Burayı değiştirdik: Kişi değil, Vizyon tanıtıyoruz
        doctor_title: "Our Approach",
        doctor_name: "Evidence-Based Methodology",
        doctor_bio: "Instead of relying on a single opinion, our platform aggregates data from current medical guidelines and psychological research to provide balanced insights.",
        
        // Yalan sayıları kaldırdık, özellik yazdık
        stat_1: "AI Powered",
        stat_2: "Data Driven",
        stat_3: "Scientific Basis",

        // --- DOCTOR IN THE LOOP ---
        doctor_loop_hero: '<i class="fa-solid fa-stethoscope"></i> This platform is designed and supervised by a medical doctor.',
        doctor_loop_result: '<i class="fa-solid fa-stethoscope"></i> Medical interpretation provided under physician-supervised AI.',

        // --- MEDICAL RISK ANALYSIS (EN) ---
        analysis_label: "Clinical Analysis Report",
        percentile_prefix: "Population Percentile:",
        
        // Bu başlıklar artık "İyi/Kötü" değil, "Klinik Durum" bildiriyor
        titles: {
            sleep: { 
                title: "Sleep Architecture Profile", 
                good: "Optimal Circadian Rhythm", 
                bad: "Severe Circadian Disruption",
                // Risk Metinleri (PARA KAZANDIRAN KISIM)
                risk_good: "Your sleep pattern is associated with maximum neuroplasticity and cellular regeneration.",
                risk_avg: "Current pattern suggests mild cortisol elevation. Linked to metabolic slowdown in long-term studies.",
                risk_bad: "Warning: This fragmentation is clinically associated with **2.1x higher cardiovascular risk** and cognitive decline."
            },
            skin: { 
                title: "Dermatological Barrier Status", 
                good: "Intact Lipid Barrier", 
                bad: "Compromised Dermal Barrier",
                risk_good: "High collagen density likely. Aging markers are significantly delayed.",
                risk_avg: "Signs of oxidative stress detected. Pre-cursor to premature wrinkling and dullness.",
                risk_bad: "Critical: High inflammation markers detected. Associated with **accelerated collagen breakdown** and chronic sensitivity."
            },
            diet: { 
                title: "Metabolic Efficiency Index", 
                good: "High Metabolic Flexibility", 
                bad: "Insulin Resistance Pattern",
                risk_good: "Optimal nutrient absorption. Low risk of systemic inflammation.",
                risk_avg: "Glycemic variability observed. Linked to energy crashes and visceral fat accumulation.",
                risk_bad: "Alert: This eating pattern is strongly correlated with **Metabolic Syndrome** and systemic inflammation."
            },
            stress: { 
                title: "Cortisol Load Analysis", 
                good: "Homeostatic Balance", 
                bad: "Chronic Sympathetic Activation",
                risk_good: "Parasympathetic nervous system is dominant. Excellent recovery capacity.",
                risk_avg: "Elevated baseline anxiety. Linked to adrenal fatigue over time.",
                risk_bad: "Danger: Chronic high cortisol is medically linked to **hippocampal atrophy** (memory loss) and immune suppression."
            },
            heart: { 
                title: "Cardiovascular Risk Profile", 
                good: "Athletic Heart Variability", 
                bad: "Elevated Cardiac Load",
                risk_good: "Excellent Heart Rate Variability (HRV). Lowest risk tier.",
                risk_avg: "Sub-optimal vascular elasticity indicated. Early intervention recommended.",
                risk_bad: "High Risk: This lifestyle pattern matches patients with **hypertension** and arterial stiffness."
            },
            focus: { 
                title: "Dopaminergic Regulation", 
                good: "High Executive Function", 
                bad: "Dopamine Dysregulation",
                risk_good: "Prefrontal cortex activity appears optimized for deep work.",
                risk_avg: "Signs of 'Attention Residue'. Productivity is reduced by approx 40%.",
                risk_bad: "Critical: Symptoms align with **Executive Dysfunction**. High risk of burnout and professional stagnation."
            },
            fitness: { 
                title: "Musculoskeletal Integrity", 
                good: "High Anabolic State", 
                bad: "Sedentary Catabolic State",
                risk_good: "Optimal muscle-to-fat ratio potential. Strong metabolic engine.",
                risk_avg: "Signs of sarcopenia (muscle loss) initiation. Metabolic rate is slowing down.",
                risk_bad: "Warning: This activity level is associated with **2x higher all-cause mortality** in medical literature."
            },
            immunity: { 
                title: "Immune Resilience Score", 
                good: "Robust Defense System", 
                bad: "Immunocompromised State",
                risk_good: "High T-cell responsiveness likely. Fast recovery times.",
                risk_avg: "Latency in immune response. Susceptibility to seasonal pathogens.",
                risk_bad: "Alert: Systemic inflammation detected. Linked to **autoimmune flare-ups** and chronic fatigue."
            },
            tech: { 
                title: "Digital Neuro-Health", 
                good: "Digital Autonomy", 
                bad: "Digital Hyper-Stimulation",
                risk_good: "Healthy gray matter density preservation. Low anxiety markers.",
                risk_avg: "Signs of 'Tech-Neck' and digital eye strain detected.",
                risk_bad: "Critical: Pattern matches **'Digital Dementia'** symptoms. Associated with reduced attention span and anxiety."
            }
        }
    },
    tr: {
        nav_tests: "Testler",
        nav_about: "Hakkımızda",
        nav_login: "Giriş Yap",
        hero_badge: '<i class="fa-solid fa-user-doctor"></i> Doktor Onaylı',
        hero_title: "Sağlığınızın ve Kişiliğinizin<br>DNA'sını Çözün",
        hero_desc: "Tıbbi verilerle desteklenmiş, yapay zeka tabanlı analizlerle kendinizi keşfedin. Uyku düzeninden cilt tipinize kadar 9 farklı kategoride derinlemesine analiz.",
        hero_btn: 'Testi Başlat <i class="fa-solid fa-arrow-right"></i>',
        cat_title: "Analiz Kategorileri",
        cat_desc: "Merak ettiğiniz konuyu seçin, bilimsel haritanızı çıkaralım.",
        
        card_sleep_title: "Uyku Kalitesi",
        card_sleep_desc: "Uyku döngünüzü analiz edin, sabah insanı mı gece kuşu mu olduğunuzu öğrenin.",
        
        card_skin_title: "Dermatolojik Profil",
        card_skin_desc: "Cilt tipinizi, yaşlanma risklerinizi ve size özel dermo-kozmetik ihtiyaçları belirleyin.",
        
        card_diet_title: "Metabolik Beslenme",
        card_diet_desc: "Vücudunuzun hangi besinlere nasıl tepki verdiğini ve ideal diyet modelinizi keşfedin.",
        
        card_stress_title: "Stres & Kortizol",
        card_stress_desc: "Günlük stres yükünüzü ve tükenmişlik (burnout) risk seviyenizi ölçün.",

        card_heart_title: "Kalp Risk Analizi",
        card_heart_desc: "Kardiyovasküler risk faktörlerinizi ve kalp yaşı tahmininizi öğrenin.",

        card_focus_title: "Odak & Dikkat",
        card_focus_desc: "Dikkat eksikliği belirtileri ve zihinsel odaklanma performansınızı ölçün.",

        card_fitness_title: "Fiziksel Kondisyon",
        card_fitness_desc: "Hareket seviyenizi ve vücudunuzun spora yatkınlığını analiz edin.",

        card_immunity_title: "Bağışıklık Gücü",
        card_immunity_desc: "Vücut direncinizi ve hastalıklara karşı savunma mekanizmanızı test edin.",

        card_tech_title: "Dijital Denge",
        card_tech_desc: "Ekran sürenizin ve teknoloji kullanımınızın beyin sağlığına etkisini ölçün.",

        btn_start: "Analize Başla",
        footer_text: "&copy; 2026 ShenTechin Med. Tüm hakları saklıdır. Bu testler tıbbi tanı yerine geçmez.",

        quiz_back: '<i class="fa-solid fa-arrow-left"></i> Vazgeç ve Dön',
        quiz_next: 'Sonraki <i class="fa-solid fa-chevron-right"></i>',
        quiz_prev: 'Önceki',

        res_share_title: "Sonucunu Paylaş",
        res_share_desc: "Arkadaşlarınla karşılaştır, sağlık skorunu göster.",
        res_tweet: "Tweetle",
        res_whatsapp: "WhatsApp",
        res_expert: "Uzman Görüşü Al",
        res_expert_desc: "Bu sonuçlar ne anlama geliyor? Uzman doktorlarımızdan detaylı yorum alın.",
        res_premium: '<i class="fa-solid fa-user-doctor"></i> Doktorla Görüş (Premium)',
        res_retry: "Başka Test Çöz",

        // --- HAKKIMIZDA SAYFASI (GÜVENLİ & GENEL) ---
        about_hero_title: "Teknoloji ve Sağlığın Kesişim Noktası",
        about_hero_desc: "Vücudunuzun sinyallerini anlamanız için gelişmiş algoritmaları, yerleşik tıbbi literatür ile birleştiriyoruz.",
        
        mission_title: "Misyonumuz",
        mission_desc: "Kişisel sağlık farkındalığını artırmak. Herkesin fiziksel ve zihinsel durumu hakkında içgörü kazanması için erişilebilir araçlar sunuyoruz.",
        
        privacy_title: "Gizlilik Taahhüdü",
        privacy_desc: "Yolculuğunuz size özeldir. Kişisel kimlik bilgilerini saklamıyoruz. Tüm değerlendirmeler güvenli ve anonim olarak işlenir.",
        
        // Kişi gitti, Metodoloji geldi
        doctor_title: "Yaklaşımımız",
        doctor_name: "Kanıta Dayalı Metodoloji",
        doctor_bio: "Platformumuz tek bir görüşe dayanmak yerine, dengeli içgörüler sunmak için güncel tıbbi kılavuzlardan ve psikolojik araştırmalardan elde edilen verileri derler.",
        
        // Sayılar gitti
        stat_1: "Yapay Zeka",
        stat_2: "Veri Odaklı",
        stat_3: "Bilimsel Temel",

        // --- DOCTOR IN THE LOOP ---
        doctor_loop_hero: '<i class="fa-solid fa-stethoscope"></i> Bu platform bir tıp doktoru tarafından tasarlanmış ve denetlenmektedir.',
        doctor_loop_result: '<i class="fa-solid fa-stethoscope"></i> Tıbbi yorumlama, hekim denetimli yapay zeka altında sağlanmaktadır.',

        // --- MEDİKAL RİSK ANALİZİ (TR) ---
        analysis_label: "Klinik Analiz Raporu",
        percentile_prefix: "Toplumdaki Yeri:",
        
        titles: {
            sleep: { 
                title: "Uyku Mimarisi Profili", 
                good: "Optimal Sirkadiyen Ritim", 
                bad: "Ciddi Sirkadiyen Bozulma",
                // İKNA EDİCİ RİSK METİNLERİ
                risk_good: "Uyku düzeniniz maksimum nöroplastisite ve hücresel yenilenme ile ilişkilidir.",
                risk_avg: "Mevcut düzen hafif kortizol yüksekliğine işaret ediyor. Uzun vadede metabolik yavaşlama ile bağlantılı.",
                risk_bad: "Uyarı: Bu fragmantasyon, klinik olarak **2.1 kat daha yüksek kalp damar riski** ve bilişsel gerileme ile ilişkilidir."
            },
            skin: { 
                title: "Dermatolojik Bariyer Durumu", 
                good: "Sağlam Lipid Bariyeri", 
                bad: "Bozulmuş Dermal Bariyer",
                risk_good: "Yüksek kolajen yoğunluğu muhtemel. Yaşlanma belirtileri önemli ölçüde gecikmiş.",
                risk_avg: "Oksidatif stres belirtileri saptandı. Erken kırışıklık ve matlaşmanın öncüsü.",
                risk_bad: "Kritik: Yüksek enflamasyon belirtileri. **Hızlanmış kolajen yıkımı** ve kronik hassasiyet ile ilişkilidir."
            },
            diet: { 
                title: "Metabolik Verimlilik İndeksi", 
                good: "Yüksek Metabolik Esneklik", 
                bad: "İnsülin Direnci Paterni",
                risk_good: "Optimal besin emilimi. Düşük sistemik enflamasyon riski.",
                risk_avg: "Glisemik değişkenlik gözlemlendi. Enerji düşüşleri ve visseral yağlanma ile bağlantılı.",
                risk_bad: "Alarm: Bu beslenme paterni, **Metabolik Sendrom** ve sistemik ödem ile güçlü bir korelasyona sahiptir."
            },
            stress: { 
                title: "Kortizol Yükü Analizi", 
                good: "Homeostatik Denge", 
                bad: "Kronik Sempatik Aktivasyon",
                risk_good: "Parasempatik sinir sistemi baskın. Mükemmel toparlanma kapasitesi.",
                risk_avg: "Yükselmiş bazal kaygı. Zamanla adrenal yorgunluk riski taşıyor.",
                risk_bad: "Tehlike: Kronik yüksek kortizol, tıbbi olarak **hipokampal atrofi** (hafıza kaybı) ve bağışıklık baskılanması ile bağlantılıdır."
            },
            heart: { 
                title: "Kardiyovasküler Risk Profili", 
                good: "Atletik Kalp Değişkenliği", 
                bad: "Yükselmiş Kardiyak Yük",
                risk_good: "Mükemmel Kalp Hızı Değişkenliği (HRV). En düşük risk grubu.",
                risk_avg: "Vasküler elastikiyette azalma belirtileri. Erken müdahale önerilir.",
                risk_bad: "Yüksek Risk: Bu yaşam tarzı, **hipertansiyon** ve damar sertliği hastalarıyla eşleşmektedir."
            },
            focus: { 
                title: "Dopaminerjik Düzenleme", 
                good: "Yüksek Yürütücü İşlev", 
                bad: "Dopamin Disregülasyonu",
                risk_good: "Prefrontal korteks aktivitesi derin çalışma için optimize görünüyor.",
                risk_avg: "'Dikkat Artığı' belirtileri. Üretkenlik yaklaşık %40 oranında azalmış.",
                risk_bad: "Kritik: Semptomlar **Yürütücü İşlev Bozukluğu** ile örtüşüyor. Yüksek tükenmişlik riski."
            },
            fitness: { 
                title: "Kas-İskelet Bütünlüğü", 
                good: "Yüksek Anabolik Durum", 
                bad: "Sedanter Katabolik Durum",
                risk_good: "Optimal kas-yağ oranı potansiyeli. Güçlü metabolik motor.",
                risk_avg: "Sarkopeni (kas kaybı) başlangıcı belirtileri. Metabolik hız yavaşlıyor.",
                risk_bad: "Uyarı: Bu aktivite seviyesi, tıbbi literatürde **2 kat daha yüksek tüm nedenlere bağlı ölüm riski** ile ilişkilidir."
            },
            immunity: { 
                title: "Bağışıklık Direnç Skoru", 
                good: "Sağlam Savunma Sistemi", 
                bad: "İmmün Yetmezlik Durumu",
                risk_good: "Yüksek T-hücresi tepkisi muhtemel. Hızlı iyileşme süresi.",
                risk_avg: "Bağışıklık tepkisinde gecikme. Mevsimsel patojenlere yatkınlık.",
                risk_bad: "Alarm: Sistemik enflamasyon saptandı. **Otoimmün alevlenmeler** ve kronik yorgunluk ile bağlantılı."
            },
            tech: { 
                title: "Dijital Nöro-Sağlık", 
                good: "Dijital Otonomi", 
                bad: "Dijital Hiper-Stimülasyon",
                risk_good: "Sağlıklı gri madde yoğunluğu korunumu. Düşük anksiyete belirteçleri.",
                risk_avg: "'Tech-Neck' ve dijital göz yorgunluğu belirtileri saptandı.",
                risk_bad: "Kritik: Patern **'Dijital Demans'** semptomlarıyla eşleşiyor. Azalmış dikkat süresi ve anksiyete ile bağlantılı."
            }
        }
    }
};

// Dil Yönetim Fonksiyonu
function setLanguage(lang) {
    localStorage.setItem('selectedLang', lang);
    applyLanguage(lang);
}

function getLanguage() {
    return localStorage.getItem('selectedLang') || 'en'; // Varsayılan İngilizce
}

function applyLanguage(lang) {
    const texts = uiTranslations[lang];
    
    // data-i18n etiketi olan tüm elementleri bul ve içeriğini değiştir
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (texts[key]) {
            element.innerHTML = texts[key];
        }
    });

    // Dil butonlarını güncelle
    const enBtn = document.getElementById('lang-en');
    const trBtn = document.getElementById('lang-tr');
    
    if(enBtn && trBtn) {
        if(lang === 'en') {
            enBtn.style.fontWeight = 'bold';
            trBtn.style.fontWeight = 'normal';
            enBtn.style.opacity = '1';
            trBtn.style.opacity = '0.6';
        } else {
            trBtn.style.fontWeight = 'bold';
            enBtn.style.fontWeight = 'normal';
            trBtn.style.opacity = '1';
            enBtn.style.opacity = '0.6';
        }
    }
}

// Sayfa yüklenince çalıştır
document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(getLanguage());
});
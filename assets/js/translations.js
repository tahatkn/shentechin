const uiTranslations = {
    en: {
        // --- NAVIGATION ---
        nav_tests: "Tests",
        nav_about: "About",
        nav_insights: "Medical Insights",
        nav_login: "Login",

        // --- HOME (INDEX) ---
        hero_badge: '<i class="fa-solid fa-user-doctor"></i> Doctor Approved',
        hero_title: "Decode Your Health &<br>Personality DNA",
        hero_desc: "Discover yourself with AI-based analysis backed by medical data. Deep analysis in 9 different categories from sleep patterns to skin type.",
        hero_btn: 'Start Test <i class="fa-solid fa-arrow-right"></i>',
        cat_title: "Analysis Categories",
        cat_desc: "Select a topic you are curious about, let's map out your scientific profile.",
        
        // Home - Cards
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
        
        // --- ABOUT PAGE ---
        about_hero_title: "The Intersection of Technology & Wellness",
        about_hero_desc: "We combine advanced algorithms with established medical literature to help you understand your body's signals.",
        
        stat_1: "AI Powered",
        stat_2: "Data Driven",
        stat_3: "Scientific Basis",
        
        mission_title: "Our Mission",
        mission_desc: "To raise personal health awareness. We provide accessible tools for everyone to gain insights into their physical and mental well-being.",
        
        privacy_title: "Privacy Commitment",
        privacy_desc: "Your journey is private. We do not store personal identifiable health data. All assessments are processed securely and anonymously.",
        
        doctor_title: "Our Approach",
        doctor_name: "Evidence-Based Methodology",
        doctor_bio: "Instead of relying on a single opinion, our platform aggregates data from current medical guidelines and psychological research to provide balanced insights.",
        
        // --- INSIGHTS (BLOG) PAGE ---
        blog_hero_title: "Clinical Perspectives & Research",
        blog_hero_desc: "Curated medical knowledge, case studies, and the science behind our algorithms.",
        
        // Blog Tags & UI
        badge_neuro: "Neuroscience",
        badge_meta: "Metabolism",
        badge_sleep: "Sleep Medicine",
        badge_cardio: "Cardiology",
        blog_read: "Read",
        blog_read_full: "Read Full Analysis",

        // Featured Article
        art_feat_title: "The Cortisol Connection: How Stress Rewires Your Brain",
        art_feat_desc: "Chronic stress isn't just a feeling; it's a physiological event that alters neural pathways. Understanding the HPA axis is key to regaining control.",

        // Article Grid
        art_1_title: "Why 'Calorie Counting' Fails for 40% of Patients",
        art_1_desc: "Metabolic flexibility varies by genetic profile. Here is why the standard model might not work for you.",
        art_1_date: "Jan 24, 2026",

        art_2_title: "REM Cycle Optimization",
        art_2_desc: "Deep sleep is where physical recovery happens, but REM is for the mind. How to balance both.",
        art_2_date: "Jan 18, 2026",

        art_3_title: "HRV: The Metric You Should Be Tracking",
        art_3_desc: "Heart Rate Variability is the most accurate non-invasive indicator of your nervous system status.",
        art_3_date: "Jan 10, 2026",

        // --- QUIZ INTERFACE ---
        quiz_back: '<i class="fa-solid fa-arrow-left"></i> Give up & Return',
        quiz_next: 'Next <i class="fa-solid fa-chevron-right"></i>',
        quiz_prev: 'Previous',

        // --- RESULT PAGE ---
        doctor_loop_hero: '<i class="fa-solid fa-stethoscope"></i> This platform is designed and supervised by a medical doctor.',
        doctor_loop_result: 'Medical interpretation provided under physician-supervised AI.',
        
        res_share_title: "Share Result",
        res_share_desc: "Compare with friends, show your health score.",
        res_tweet: "Tweet",
        res_whatsapp: "WhatsApp",
        res_expert: "Get Expert Opinion",
        res_expert_desc: "What do these results mean? Get detailed comments from our doctors.",
        res_premium: '<i class="fa-solid fa-user-doctor"></i> Talk to Doctor (Premium)',
        res_retry: "Take Another Test",
        
        // Footer
        footer_text: "&copy; 2026 ShenTechin Med. All rights reserved. These tests are not medical diagnoses.",

        // --- DYNAMIC ANALYSIS LOGIC (Used by result.js) ---
        analysis_label: "Clinical Analysis Report",
        percentile_prefix: "Population Percentile:",
        
        titles: {
            sleep: { 
                title: "Sleep Architecture Profile", 
                good: "Optimal Circadian Rhythm", 
                bad: "Severe Circadian Disruption",
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
        // --- NAVİGASYON ---
        nav_tests: "Testler",
        nav_about: "Hakkımızda",
        nav_insights: "Tıbbi İçgörüler",
        nav_login: "Giriş Yap",

        // --- ANA SAYFA (INDEX) ---
        hero_badge: '<i class="fa-solid fa-user-doctor"></i> Doktor Onaylı',
        hero_title: "Sağlığınızın ve Kişiliğinizin<br>DNA'sını Çözün",
        hero_desc: "Tıbbi verilerle desteklenmiş, yapay zeka tabanlı analizlerle kendinizi keşfedin. Uyku düzeninden cilt tipinize kadar 9 farklı kategoride derinlemesine analiz.",
        hero_btn: 'Testi Başlat <i class="fa-solid fa-arrow-right"></i>',
        cat_title: "Analiz Kategorileri",
        cat_desc: "Merak ettiğiniz konuyu seçin, bilimsel haritanızı çıkaralım.",
        
        // Kartlar
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

        // --- HAKKIMIZDA SAYFASI ---
        about_hero_title: "Teknoloji ve Sağlığın Kesişim Noktası",
        about_hero_desc: "Vücudunuzun sinyallerini anlamanız için gelişmiş algoritmaları, yerleşik tıbbi literatür ile birleştiriyoruz.",
        
        stat_1: "Yapay Zeka",
        stat_2: "Veri Odaklı",
        stat_3: "Bilimsel Temel",
        
        mission_title: "Misyonumuz",
        mission_desc: "Kişisel sağlık farkındalığını artırmak. Herkesin fiziksel ve zihinsel durumu hakkında içgörü kazanması için erişilebilir araçlar sunuyoruz.",
        
        privacy_title: "Gizlilik Taahhüdü",
        privacy_desc: "Yolculuğunuz size özeldir. Kişisel kimlik bilgilerini saklamıyoruz. Tüm değerlendirmeler güvenli ve anonim olarak işlenir.",
        
        doctor_title: "Yaklaşımımız",
        doctor_name: "Kanıta Dayalı Metodoloji",
        doctor_bio: "Platformumuz tek bir görüşe dayanmak yerine, dengeli içgörüler sunmak için güncel tıbbi kılavuzlardan ve psikolojik araştırmalardan elde edilen verileri derler.",

        // --- INSIGHTS (BLOG) SAYFASI ---
        blog_hero_title: "Klinik Perspektifler ve Araştırma",
        blog_hero_desc: "Derlenmiş tıbbi bilgiler, vaka çalışmaları ve algoritmalarımızın arkasındaki bilim.",
        
        // Blog Etiketleri & Arayüz
        badge_neuro: "Nörobilim",
        badge_meta: "Metabolizma",
        badge_sleep: "Uyku Tıbbı",
        badge_cardio: "Kardiyoloji",
        blog_read: "Oku",
        blog_read_full: "Tam Analizi Oku",

        // Öne Çıkan Makale
        art_feat_title: "Kortizol Bağlantısı: Stres Beyninizi Nasıl Yeniden Kabloluyor?",
        art_feat_desc: "Kronik stres sadece bir his değildir; sinir yollarını değiştiren fizyolojik bir olaydır. HPA eksenini anlamak, kontrolü geri kazanmanın anahtarıdır.",

        // Makale Izgarası
        art_1_title: "Neden 'Kalori Saymak' Hastaların %40'ında Başarısız Oluyor?",
        art_1_desc: "Metabolik esneklik genetik profile göre değişir. İşte standart modelin sizin için çalışmayabileceği nedenler.",
        art_1_date: "24 Oca 2026",

        art_2_title: "REM Döngüsü Optimizasyonu",
        art_2_desc: "Derin uyku fiziksel iyileşmenin gerçekleştiği yerdir, ancak REM zihin içindir. İkisi nasıl dengelenir?",
        art_2_date: "18 Oca 2026",

        art_3_title: "HRV: Takip Etmeniz Gereken Metrik",
        art_3_desc: "Kalp Hızı Değişkenliği (HRV), sinir sistemi durumunuzun en doğru, invaziv olmayan göstergesidir.",
        art_3_date: "10 Oca 2026",

        // --- QUIZ ARAYÜZÜ ---
        quiz_back: '<i class="fa-solid fa-arrow-left"></i> Vazgeç ve Dön',
        quiz_next: 'Sonraki <i class="fa-solid fa-chevron-right"></i>',
        quiz_prev: 'Önceki',

        // --- SONUÇ SAYFASI ---
        doctor_loop_hero: '<i class="fa-solid fa-stethoscope"></i> Bu platform bir tıp doktoru tarafından tasarlanmış ve denetlenmektedir.',
        doctor_loop_result: 'Tıbbi yorumlama, hekim denetimli yapay zeka altında sağlanmaktadır.',
        
        res_share_title: "Sonucunu Paylaş",
        res_share_desc: "Arkadaşlarınla karşılaştır, sağlık skorunu göster.",
        res_tweet: "Tweetle",
        res_whatsapp: "WhatsApp",
        res_expert: "Uzman Görüşü Al",
        res_expert_desc: "Bu sonuçlar ne anlama geliyor? Uzman doktorlarımızdan detaylı yorum alın.",
        res_premium: '<i class="fa-solid fa-user-doctor"></i> Doktorla Görüş (Premium)',
        res_retry: "Başka Test Çöz",

        // Footer
        footer_text: "&copy; 2026 ShenTechin Med. Tüm hakları saklıdır. Bu testler tıbbi tanı yerine geçmez.",

        // --- DİNAMİK ANALİZ MANTIĞI (Result.js Tarafından Kullanılır) ---
        analysis_label: "Klinik Analiz Raporu",
        percentile_prefix: "Toplumdaki Yeri:",
        
        titles: {
            sleep: { 
                title: "Uyku Mimarisi Profili", 
                good: "Optimal Sirkadiyen Ritim", 
                bad: "Ciddi Sirkadiyen Bozulma",
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

// --- DİL YÖNETİM FONKSİYONLARI ---

// Dili Ayarla ve Kaydet
function setLanguage(lang) {
    localStorage.setItem('selectedLang', lang);
    applyLanguage(lang);
    // Eğer sonuç sayfasındaysak, sayfayı yenileyerek grafikleri/metinleri güncelle
    if(window.location.pathname.includes('result.html')) {
        location.reload(); 
    }
    // Eğer quiz sayfasındaysak (sorular JS'den çekiliyor), yeniden başlatmak gerekebilir
    if(window.location.pathname.includes('quiz.html')) {
        location.reload();
    }
}

// Kayıtlı Dili Getir
function getLanguage() {
    return localStorage.getItem('selectedLang') || 'en'; // Varsayılan İngilizce
}

// Dili Arayüze Uygula
function applyLanguage(lang) {
    const texts = uiTranslations[lang];
    
    // data-i18n etiketi olan tüm elementleri bul ve içeriğini değiştir
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (texts[key]) {
            element.innerHTML = texts[key];
        }
    });

    // Dil butonlarının stilini güncelle (Aktif olan koyu, pasif olan şeffaf)
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

// Sayfa yüklendiğinde çalıştır
document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(getLanguage());
});
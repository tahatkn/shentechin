document.addEventListener('DOMContentLoaded', () => {
    // 1. Verileri LocalStorage'dan Çek
    const score = parseInt(localStorage.getItem('quizScore')) || 0;
    const maxScore = parseInt(localStorage.getItem('quizMaxScore')) || 250;
    const testType = localStorage.getItem('currentTestType') || 'sleep';
    const lang = localStorage.getItem('selectedLang') || 'en';

    // 2. Yüzdeyi Hesapla
    const percentage = Math.round((score / maxScore) * 100);

    // 3. Renk Belirleme (Trafik Işığı Mantığı)
    let color = "#16a34a"; // Yeşil (İyi)
    if (percentage < 50) color = "#dc2626"; // Kırmızı (Kritik)
    else if (percentage < 80) color = "#d97706"; // Turuncu (Ortalama)

    // 4. Grafiği Çiz (Conic Gradient Animasyonu)
    const circle = document.getElementById('score-circle');
    const scoreText = document.getElementById('score-text');
    
    // Derece hesabı (360 derece üzerinden)
    const degree = 3.6 * percentage;
    
    setTimeout(() => {
        // Dinamik renk ve derece ile grafiği boya
        circle.style.background = `conic-gradient(${color} ${degree}deg, #f1f5f9 0deg)`;
        scoreText.textContent = `%${percentage}`;
        scoreText.style.color = color;
    }, 500);

    // 5. Tıbbi Risk Analizi Metinlerini Hazırla
    // (uiTranslations objesi translations.js dosyasından gelir)
    if (typeof uiTranslations === 'undefined') {
        console.error("Translations file not loaded!");
        return;
    }

    const currentLangData = uiTranslations[lang];
    const t = currentLangData.titles[testType] || currentLangData.titles['sleep'];

    // HTML Elementlerini Seç
    const titleEl = document.getElementById('result-title');
    const descEl = document.getElementById('result-desc');

    // Analiz Mantığı
    let statusTitle = "";     // Örn: Ciddi Sirkadiyen Bozulma
    let riskText = "";        // Örn: Bu durum kalp kriziyle ilişkilidir...
    let percentileText = "";  // Örn: Toplumun en riskli %10'u

    if (percentage >= 80) {
        // İYİ DURUM (Yeşil)
        const topPercent = 100 - percentage; 
        statusTitle = t.good;
        riskText = t.risk_good;
        percentileText = `${currentLangData.percentile_prefix} Top ${topPercent > 0 ? topPercent : 1}% (Optimal)`;
        
        titleEl.style.color = "#16a34a";
    } else if (percentage >= 50) {
        // ORTA DURUM (Turuncu)
        statusTitle = t.title; // Nötr Başlık
        riskText = t.risk_avg;
        percentileText = `${currentLangData.percentile_prefix} Average (Median)`;
        
        titleEl.style.color = "#d97706";
    } else {
        // KÖTÜ DURUM (Kırmızı - Korku Faktörü)
        statusTitle = t.bad;
        riskText = t.risk_bad;
        percentileText = `${currentLangData.percentile_prefix} Bottom ${percentage}% (High Risk Group)`;
        
        titleEl.style.color = "#dc2626";
    }

    // 6. Sonuçları Ekrana Yaz (HTML formatında, bold etiketleri çalışsın diye)
    
    // Başlık: Üstüne ufak "Klinik Rapor" etiketi ekliyoruz
    titleEl.innerHTML = `
        <span style="font-size:0.8rem; opacity:0.7; display:block; margin-bottom:5px; text-transform:uppercase; letter-spacing:1px;">
            ${currentLangData.analysis_label}
        </span>
        ${statusTitle}
    `;

    // Açıklama: Yüzdelik kutusu ve Risk metni
    descEl.innerHTML = `
        <div class="percentile-box" style="border-left: 4px solid ${titleEl.style.color}">
            ${percentileText}
        </div>
        <div class="risk-text">
            ${riskText}
        </div>
    `;

    // 7. Medikal Feragatnameyi (Disclaimer) Dile Göre Güncelle
    const disclaimerEl = document.querySelector('.medical-disclaimer span');
    if(disclaimerEl && currentLangData.doctor_loop_result) {
        disclaimerEl.innerHTML = currentLangData.doctor_loop_result;
    }
});

// SOSYAL MEDYA PAYLAŞIMI
function shareResult(platform) {
    const score = document.getElementById('score-text').textContent;
    const testType = localStorage.getItem('currentTestType') || 'medical';
    const lang = localStorage.getItem('selectedLang') || 'en';
    
    // Test tipini baş harfi büyük yapma (Süsleme)
    const formattedType = testType.charAt(0).toUpperCase() + testType.slice(1);
    
    let text = "";
    const url = "https://www.shentechin.com"; 

    if(lang === 'en') {
        text = `I took the ${formattedType} Risk Analysis at ShenTechin Med. My Clinical Score: ${score}. Check your health status now!`;
    } else {
        text = `ShenTechin Med'de ${formattedType} Risk Analizi yaptım. Klinik Skorum: ${score}. Sen de sağlık durumunu test et!`;
    }
    
    if (platform === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`, '_blank');
    } else if (platform === 'whatsapp') {
        window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, '_blank');
    }
}
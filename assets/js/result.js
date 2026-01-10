document.addEventListener('DOMContentLoaded', () => {
    // Önce "Analiz Yapılıyor" modunu simüle edelim
    const resultContainer = document.querySelector('.result-container');
    
    // Eğer HTML'de bir loading elementi yoksa, varmış gibi davranıp içeriği değiştireceğiz.
    
    // 1.5 saniye bekle (Hesaplama süsü)
    setTimeout(() => {
        showResults();
    }, 1500);
});

function showResults() {
    // 1. Verileri LocalStorage'dan Çek
    const score = parseInt(localStorage.getItem('quizScore')) || 0;
    const maxScore = parseInt(localStorage.getItem('quizMaxScore')) || 250;
    const testType = localStorage.getItem('currentTestType') || 'sleep';
    const lang = localStorage.getItem('selectedLang') || 'en';

    // 2. Yüzdeyi Hesapla
    const percentage = Math.round((score / maxScore) * 100);

    // 3. Renk Belirleme
    let color = "#16a34a"; // Yeşil
    if (percentage < 50) color = "#dc2626"; // Kırmızı
    else if (percentage < 80) color = "#d97706"; // Turuncu

    // 4. Grafiği Çiz
    const circle = document.getElementById('score-circle');
    const scoreText = document.getElementById('score-text');
    const degree = 3.6 * percentage;
    
    circle.style.background = `conic-gradient(${color} ${degree}deg, #f1f5f9 0deg)`;
    scoreText.textContent = `%${percentage}`;
    scoreText.style.color = color;

    // 5. Metinleri Getir (translations.js'den)
    if (typeof uiTranslations === 'undefined') return;

    const currentLangData = uiTranslations[lang];
    const t = currentLangData.titles[testType] || currentLangData.titles['sleep'];

    const titleEl = document.getElementById('result-title');
    const descEl = document.getElementById('result-desc');

    // Analiz Mantığı
    let statusTitle = "";
    let riskText = "";
    let percentileText = "";

    if (percentage >= 80) {
        statusTitle = t.good;
        riskText = t.risk_good;
        percentileText = `${currentLangData.percentile_prefix} Top ${100 - percentage}% (Optimal)`;
        titleEl.style.color = "#16a34a";
    } else if (percentage >= 50) {
        statusTitle = t.title;
        riskText = t.risk_avg;
        percentileText = `${currentLangData.percentile_prefix} Average`;
        titleEl.style.color = "#d97706";
    } else {
        statusTitle = t.bad;
        riskText = t.risk_bad;
        percentileText = `${currentLangData.percentile_prefix} Bottom ${percentage}% (High Risk Group)`;
        titleEl.style.color = "#dc2626";
    }

    // 6. İçeriği Güncelle (SONSUZ YÜKLEME BURADA BİTER)
    // Başlık "Analiz yapılıyor"dan sonuca döner
    titleEl.innerHTML = `
        <span style="font-size:0.8rem; opacity:0.7; display:block; margin-bottom:5px; text-transform:uppercase; letter-spacing:1px; color:#64748b;">
            ${currentLangData.analysis_label}
        </span>
        ${statusTitle}
    `;

    // Açıklama "Lütfen bekleyin"den rapora döner
    descEl.innerHTML = `
        <div class="percentile-box" style="border-left: 4px solid ${titleEl.style.color}">
            ${percentileText}
        </div>
        <div class="risk-text">
            ${riskText}
        </div>
    `;

    // Medikal Uyarı
    const disclaimerEl = document.querySelector('.medical-disclaimer span');
    if(disclaimerEl && currentLangData.doctor_loop_result) {
        disclaimerEl.innerHTML = currentLangData.doctor_loop_result;
    }
}

// Share Fonksiyonu (Aynı Kalıyor)
function shareResult(platform) {
    const score = document.getElementById('score-text').textContent;
    const testType = localStorage.getItem('currentTestType') || 'medical';
    const url = "https://www.shentechin.com"; 
    
    let text = `My Health Score: ${score}. Check yours at ShenTechin Med!`;
    
    if (platform === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`, '_blank');
    } else if (platform === 'whatsapp') {
        window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, '_blank');
    }
}
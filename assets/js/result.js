document.addEventListener('DOMContentLoaded', () => {
    // 1. Tarayıcı hafızasından puanı al
    // (Bunu logic.js'de birazdan kaydedeceğiz)
    const score = parseInt(localStorage.getItem('quizScore')) || 0;
    const maxScore = parseInt(localStorage.getItem('quizMaxScore')) || 50;

    // 2. Yüzdeyi hesapla
    const percentage = Math.round((score / maxScore) * 100);

    // 3. Grafiği güncelle
    const circle = document.getElementById('score-circle');
    const scoreText = document.getElementById('score-text');
    
    // CSS Conic Gradient ile boyama yapıyoruz (Derece hesabı: 360 * yüzde / 100)
    const degree = 3.6 * percentage;
    
    // Animasyonlu geçiş için biraz bekleyip rengi değiştiriyoruz
    setTimeout(() => {
        circle.style.background = `conic-gradient(#2563eb ${degree}deg, #e2e8f0 0deg)`;
        scoreText.textContent = `%${percentage}`;
    }, 500);

    // 4. Sonuç Başlığını ve Metnini Belirle
    const titleEl = document.getElementById('result-title');
    const descEl = document.getElementById('result-desc');

    if (percentage >= 80) {
        titleEl.textContent = "Süper Sağlıklı!";
        titleEl.style.color = "#16a34a"; // Yeşil
        descEl.textContent = "Uyku düzeniniz ve kaliteniz mükemmel seviyede. Biyolojik saatinizle tam uyum içindesiniz.";
    } else if (percentage >= 50) {
        titleEl.textContent = "Ortalama Seviye";
        titleEl.style.color = "#d97706"; // Turuncu
        descEl.textContent = "Bazı konularda iyisiniz ancak uyku hijyenine biraz daha dikkat etmeniz gerekebilir.";
    } else {
        titleEl.textContent = "Riskli Durum";
        titleEl.style.color = "#dc2626"; // Kırmızı
        descEl.textContent = "Uyku kaliteniz düşük görünüyor. Kronik yorgunluk yaşamamak için bir uzmana danışmanız önerilir.";
    }
});

// Sosyal Medya Paylaşımı
function shareResult(platform) {
    const score = document.getElementById('score-text').textContent;
    const text = `ShenTechin Med'de Uyku Analizi yaptım ve sonucum: ${score}. Sen de kendini test et!`;
    const url = "https://www.shentechin.com"; // Senin site adresin

    if (platform === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`, '_blank');
    } else if (platform === 'whatsapp') {
        window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, '_blank');
    }
}
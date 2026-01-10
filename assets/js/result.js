document.addEventListener('DOMContentLoaded', () => {
    // 1. Verileri LocalStorage'dan Çek
    const score = parseInt(localStorage.getItem('quizScore')) || 0;
    const maxScore = parseInt(localStorage.getItem('quizMaxScore')) || 50;
    
    // Hangi testin çözüldüğünü al (Yoksa varsayılan olarak sleep)
    const testType = localStorage.getItem('currentTestType') || 'sleep';

    // 2. Yüzdeyi Hesapla
    const percentage = Math.round((score / maxScore) * 100);

    // 3. Grafiği Çiz (Conic Gradient)
    const circle = document.getElementById('score-circle');
    const scoreText = document.getElementById('score-text');
    
    // Derece hesabı (360 derece üzerinden)
    const degree = 3.6 * percentage;
    
    setTimeout(() => {
        circle.style.background = `conic-gradient(#2563eb ${degree}deg, #e2e8f0 0deg)`;
        scoreText.textContent = `%${percentage}`;
    }, 500);

    // 4. Başlık ve Açıklamayı Dinamik Olarak Belirle
    const titleEl = document.getElementById('result-title');
    const descEl = document.getElementById('result-desc');

    // Test türlerine göre sonuç metinleri
    const titles = {
        sleep: { title: "Uyku Profili", good: "Uykunun Efendisi", bad: "Uykusuz Zombi" },
        skin: { title: "Cilt Sağlığı", good: "Işıltılı ve Canlı", bad: "Yorgun ve Hassas" },
        diet: { title: "Beslenme Düzeni", good: "Sağlıklı Gurme", bad: "Dengesiz Beslenme" },
        stress: { title: "Stres Yönetimi", good: "Zen Ustası", bad: "Stres Küpü" }
    };

    // Mevcut testin başlıklarını seç
    const currentTitles = titles[testType] || titles['sleep'];

    if (percentage >= 80) {
        titleEl.textContent = `Harika: ${currentTitles.good}`;
        titleEl.style.color = "#16a34a"; // Yeşil
        descEl.textContent = "Sonuçlarınız mükemmel seviyede. Biyolojik dengeniz ve alışkanlıklarınız harika görünüyor.";
    } else if (percentage >= 50) {
        titleEl.textContent = `Ortalama: ${currentTitles.title}`;
        titleEl.style.color = "#d97706"; // Turuncu
        descEl.textContent = "Durumunuz genel olarak iyi ancak bazı alışkanlıklarınızı iyileştirerek çok daha iyi hissedebilirsiniz.";
    } else {
        titleEl.textContent = `Riskli: ${currentTitles.bad}`;
        titleEl.style.color = "#dc2626"; // Kırmızı
        descEl.textContent = "Risk seviyeniz yüksek görünüyor. Uzun vadeli sağlık sorunları yaşamamak için bir uzmana danışmanızı öneririz.";
    }
});

// Sosyal Medya Paylaşımı
function shareResult(platform) {
    const score = document.getElementById('score-text').textContent;
    const testType = localStorage.getItem('currentTestType') || 'Medikal';
    
    // Test tipini baş harfi büyük yapma (süsleme)
    const formattedType = testType.charAt(0).toUpperCase() + testType.slice(1);

    const text = `ShenTechin Med'de ${formattedType} Analizi yaptım ve sonucum: ${score}. Sen de kendini test et!`;
    const url = "https://www.shentechin.com"; 

    if (platform === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`, '_blank');
    } else if (platform === 'whatsapp') {
        window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, '_blank');
    }
}
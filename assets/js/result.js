document.addEventListener('DOMContentLoaded', () => {
    const score = parseInt(localStorage.getItem('quizScore')) || 0;
    const maxScore = parseInt(localStorage.getItem('quizMaxScore')) || 50;
    const testType = localStorage.getItem('currentTestType') || 'sleep';
    const lang = localStorage.getItem('selectedLang') || 'en';

    // Yüzde Hesabı
    const percentage = Math.round((score / maxScore) * 100);

    // Grafik Çizimi
    const circle = document.getElementById('score-circle');
    const scoreText = document.getElementById('score-text');
    const degree = 3.6 * percentage;
    
    setTimeout(() => {
        circle.style.background = `conic-gradient(#2563eb ${degree}deg, #e2e8f0 0deg)`;
        scoreText.textContent = `%${percentage}`;
    }, 500);

    // DİL VERİTABANI (SONUÇLAR İÇİN)
    const resultTexts = {
        en: {
            good_prefix: "Great: ",
            avg_prefix: "Average: ",
            bad_prefix: "Risk: ",
            good_desc: "Your results are excellent. Your biological balance and habits look great.",
            avg_desc: "Your condition is generally good, but you can feel much better by improving some habits.",
            bad_desc: "Your risk level seems high. We recommend consulting a specialist to avoid long-term health problems.",
            titles: {
                sleep: { title: "Sleep Profile", good: "Sleep Master", bad: "Sleepless Zombie" },
                skin: { title: "Skin Health", good: "Radiant & Alive", bad: "Tired & Sensitive" },
                diet: { title: "Nutritional Diet", good: "Healthy Gourmet", bad: "Unbalanced Diet" },
                stress: { title: "Stress Management", good: "Zen Master", bad: "Stress Cube" },
                heart: { title: "Heart Health", good: "Heart of Steel", bad: "Risky Cardio" },
                focus: { title: "Focus Level", good: "Laser Focused", bad: "Scattered Mind" },
                fitness: { title: "Physical Condition", good: "Athletic Build", bad: "Sedentary Life" },
                immunity: { title: "Immune System", good: "Iron Shield", bad: "Vulnerable Body" },
                tech: { title: "Digital Balance", good: "Tech Master", bad: "Digital Prisoner" }
            }
        },
        tr: {
            good_prefix: "Harika: ",
            avg_prefix: "Ortalama: ",
            bad_prefix: "Riskli: ",
            good_desc: "Sonuçlarınız mükemmel seviyede. Biyolojik dengeniz ve alışkanlıklarınız harika görünüyor.",
            avg_desc: "Durumunuz genel olarak iyi ancak bazı alışkanlıklarınızı iyileştirerek çok daha iyi hissedebilirsiniz.",
            bad_desc: "Risk seviyeniz yüksek görünüyor. Uzun vadeli sağlık sorunları yaşamamak için bir uzmana danışmanızı öneririz.",
            titles: {
                sleep: { title: "Uyku Profili", good: "Uykunun Efendisi", bad: "Uykusuz Zombi" },
                skin: { title: "Cilt Sağlığı", good: "Işıltılı ve Canlı", bad: "Yorgun ve Hassas" },
                diet: { title: "Beslenme Düzeni", good: "Sağlıklı Gurme", bad: "Dengesiz Beslenme" },
                stress: { title: "Stres Yönetimi", good: "Zen Ustası", bad: "Stres Küpü" },
                heart: { title: "Kalp Sağlığı", good: "Çelik Gibi Kalp", bad: "Riskli Kardiyo" },
                focus: { title: "Odaklanma Seviyesi", good: "Lazer Odaklı", bad: "Dağınık Zihin" },
                fitness: { title: "Fiziksel Kondisyon", good: "Atletik Yapı", bad: "Hareketsiz Yaşam" },
                immunity: { title: "Bağışıklık Sistemi", good: "Demir Kalkan", bad: "Savunmasız Bünye" },
                tech: { title: "Dijital Denge", good: "Teknoloji Hakimi", bad: "Dijital Tutsak" }
            }
        }
    };

    const currentLangData = resultTexts[lang];
    const currentTitles = currentLangData.titles[testType] || currentLangData.titles['sleep'];
    
    const titleEl = document.getElementById('result-title');
    const descEl = document.getElementById('result-desc');

    if (percentage >= 80) {
        titleEl.textContent = `${currentLangData.good_prefix}${currentTitles.good}`;
        titleEl.style.color = "#16a34a";
        descEl.textContent = currentLangData.good_desc;
    } else if (percentage >= 50) {
        titleEl.textContent = `${currentLangData.avg_prefix}${currentTitles.title}`;
        titleEl.style.color = "#d97706";
        descEl.textContent = currentLangData.avg_desc;
    } else {
        titleEl.textContent = `${currentLangData.bad_prefix}${currentTitles.bad}`;
        titleEl.style.color = "#dc2626";
        descEl.textContent = currentLangData.bad_desc;
    }
});

function shareResult(platform) {
    const score = document.getElementById('score-text').textContent;
    const testType = localStorage.getItem('currentTestType') || 'medical';
    const lang = localStorage.getItem('selectedLang') || 'en';
    
    const formattedType = testType.charAt(0).toUpperCase() + testType.slice(1);
    
    let text = "";
    if(lang === 'en') {
        text = `I took the ${formattedType} Analysis at ShenTechin Med. My score: ${score}. Check yourself!`;
    } else {
        text = `ShenTechin Med'de ${formattedType} Analizi yaptım ve sonucum: ${score}. Sen de kendini test et!`;
    }
    
    const url = "https://www.shentechin.com"; 

    if (platform === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`, '_blank');
    } else if (platform === 'whatsapp') {
        window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, '_blank');
    }
}
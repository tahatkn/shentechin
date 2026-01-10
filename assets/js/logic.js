let currentQuestionIndex = 0;
let userScore = 0;
let currentQuizData = []; // Bu artık sadece String dizisi (Sorular)

const questionText = document.getElementById('question-text');
const optionsGrid = document.querySelector('.options-grid');
const countLabel = document.getElementById('question-count');
const progressBar = document.querySelector('.progress-bar-fill');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

document.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('selectedLang') || 'en';
    const urlParams = new URLSearchParams(window.location.search);
    const quizType = urlParams.get('type') || 'sleep';

    if (allQuizzes[lang] && allQuizzes[lang][quizType]) {
        currentQuizData = allQuizzes[lang][quizType];
        localStorage.setItem('currentTestType', quizType);
    } else {
        alert("Quiz error / Test hatası");
        window.location.href = 'index.html';
        return;
    }

    loadQuestion();
});

function loadQuestion() {
    // Veri yapısı değişti: currentQuizData artık sadece soru metinlerinden oluşuyor
    const currentQuestionText = currentQuizData[currentQuestionIndex];
    
    questionText.textContent = currentQuestionText;
    optionsGrid.innerHTML = '';

    // Animasyon
    questionText.style.animation = 'none';
    questionText.offsetHeight; 
    questionText.style.animation = 'fadeIn 0.5s';

    // 10'lu Ölçek Butonlarını Otomatik Üret
    for (let i = 1; i <= 10; i++) {
        const button = document.createElement('button');
        button.classList.add('scale-btn'); // Yeni stil sınıfı
        button.textContent = i;
        
        // Renk geçişi (Kırmızıdan Yeşile veya tam tersi - Standart Mavi yapalım şimdilik)
        // Stagger animasyonu
        button.style.animation = `fadeInUp 0.3s ease forwards ${i * 0.05}s`;
        button.style.opacity = '0'; // Animasyonla gelecek

        button.onclick = () => selectScale(button, i);
        optionsGrid.appendChild(button);
    }

    updateProgress();
    nextBtn.disabled = true;
    nextBtn.style.opacity = "0.5";
    nextBtn.style.cursor = "not-allowed";

    if(currentQuestionIndex === 0) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }
}

function selectScale(selectedButton, value) {
    const allButtons = document.querySelectorAll('.scale-btn');
    allButtons.forEach(btn => btn.classList.remove('selected'));
    
    selectedButton.classList.add('selected');
    
    nextBtn.disabled = false;
    nextBtn.style.opacity = "1";
    nextBtn.style.cursor = "pointer";
    
    // Puanı kaydet (1 ile 10 arası)
    sessionStorage.setItem('tempScore', value);
}

nextBtn.addEventListener('click', () => {
    let score = parseInt(sessionStorage.getItem('tempScore') || 0);
    userScore += score;
    currentQuestionIndex++;

    if (currentQuestionIndex < currentQuizData.length) {
        loadQuestion();
    } else {
        finishQuiz();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        // Puan silme mantığı yok, basit ilerliyoruz
        loadQuestion();
    }
});

function updateProgress() {
    const lang = localStorage.getItem('selectedLang') || 'en';
    const qText = lang === 'en' ? 'Question' : 'Soru';
    countLabel.textContent = `${qText} ${currentQuestionIndex + 1} / ${currentQuizData.length}`;
    const percent = ((currentQuestionIndex + 1) / currentQuizData.length) * 100;
    progressBar.style.width = `${percent}%`;
}

function finishQuiz() {
    // Maksimum puan: Soru Sayısı * 10 (Örn: 25 * 10 = 250)
    const maxScore = currentQuizData.length * 10;
    localStorage.setItem('quizScore', userScore);
    localStorage.setItem('quizMaxScore', maxScore);
    window.location.href = "result.html";
}
let currentQuestionIndex = 0;
let userScore = 0;
let currentQuizData = [];

const questionText = document.getElementById('question-text');
const optionsGrid = document.querySelector('.options-grid');
const countLabel = document.getElementById('question-count');
const progressBar = document.querySelector('.progress-bar-fill');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dili Bul
    const lang = localStorage.getItem('selectedLang') || 'en';

    // 2. Test Tipini Bul
    const urlParams = new URLSearchParams(window.location.search);
    const quizType = urlParams.get('type') || 'sleep';

    // 3. Veriyi Çek (EN veya TR içinden)
    if (allQuizzes[lang] && allQuizzes[lang][quizType]) {
        currentQuizData = allQuizzes[lang][quizType];
        localStorage.setItem('currentTestType', quizType);
    } else {
        alert("Quiz not found / Test bulunamadı");
        window.location.href = 'index.html';
        return;
    }

    loadQuestion();
});

function loadQuestion() {
    const currentQuestion = currentQuizData[currentQuestionIndex];
    
    questionText.textContent = currentQuestion.question;
    optionsGrid.innerHTML = '';

    questionText.style.animation = 'none';
    questionText.offsetHeight; 
    questionText.style.animation = 'fadeIn 0.5s';

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.style.animationDelay = `${index * 0.1}s`;
        
        const letters = ['A', 'B', 'C', 'D', 'E'];
        button.innerHTML = `
            <span class="opt-letter">${letters[index]}</span>
            ${option.text}
        `;
        button.onclick = () => selectOption(button, option.score);
        optionsGrid.appendChild(button);
    });

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

function selectOption(selectedButton, score) {
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => btn.classList.remove('selected'));
    selectedButton.classList.add('selected');
    nextBtn.disabled = false;
    nextBtn.style.opacity = "1";
    nextBtn.style.cursor = "pointer";
    sessionStorage.setItem('tempScore', score);
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
    const maxScore = currentQuizData.length * 10;
    localStorage.setItem('quizScore', userScore);
    localStorage.setItem('quizMaxScore', maxScore);
    window.location.href = "result.html";
}
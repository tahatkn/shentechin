// O anki soru sırası (0'dan başlar)
let currentQuestionIndex = 0;
// Kullanıcının verdiği cevaplar ve puanlar burada tutulacak
let userScore = 0;

// HTML'den gerekli kutuları seçiyoruz (Onları manipüle edeceğiz)
const questionText = document.getElementById('question-text');
const optionsGrid = document.querySelector('.options-grid');
const countLabel = document.getElementById('question-count');
const progressBar = document.querySelector('.progress-bar-fill');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

// Sayfa yüklendiğinde ilk soruyu getir
document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
});

function loadQuestion() {
    // Veritabanından sıradaki soruyu al
    const currentQuestion = quizData[currentQuestionIndex];

    // Soru metnini yaz
    questionText.textContent = currentQuestion.question;

    // Şık kutusunu temizle (Önceki sorunun şıkları kalmasın)
    optionsGrid.innerHTML = '';

    // Şıkları tek tek oluştur
    currentQuestion.options.forEach((option, index) => {
        // Yeni bir buton yarat
        const button = document.createElement('button');
        button.classList.add('option-btn');
        
        // İçeriğini doldur (A, B, C harfleriyle)
        const letters = ['A', 'B', 'C', 'D', 'E'];
        button.innerHTML = `
            <span class="opt-letter">${letters[index]}</span>
            ${option.text}
        `;

        // Tıklanınca ne olacağını belirle
        button.onclick = () => selectOption(button, option.score);

        // Ekrana ekle
        optionsGrid.appendChild(button);
    });

    // İlerleme durumunu güncelle
    updateProgress();
    
    // Sonraki butonunu pasif yap (Seçim yapmadan geçemesin)
    nextBtn.disabled = true;
    nextBtn.style.opacity = "0.5";
    nextBtn.style.cursor = "not-allowed";

    // Önceki butonu kontrolü
    if(currentQuestionIndex === 0) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }
}

function selectOption(selectedButton, score) {
    // Önce tüm butonlardan 'selected' sınıfını kaldır
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => {
        btn.classList.remove('selected');
    });

    // Tıklanan butona 'selected' sınıfını ekle (Yeşil/Mavi olsun)
    selectedButton.classList.add('selected');

    // Puanı kaydet (Basit mantık: Her seçimde puanı güncelliyoruz)
    // Gerçek uygulamada diziye push yapılır ama şimdilik basit tutalım.
    // Not: Bu basit versiyonda geri dönüp değiştirirse puan hatası olabilir,
    // bunu ileride 'state management' ile düzelteceğiz.
    
    // Sonraki butonunu aktif et
    nextBtn.disabled = false;
    nextBtn.style.opacity = "1";
    nextBtn.style.cursor = "pointer";
    
    // Seçimi geçici hafızaya al (Next'e basınca işlenecek)
    sessionStorage.setItem('tempScore', score);
}

// Sonraki butonuna tıklanınca
nextBtn.addEventListener('click', () => {
    // Puanı ekle
    let score = parseInt(sessionStorage.getItem('tempScore') || 0);
    userScore += score;

    // Sırayı artır
    currentQuestionIndex++;

    // Sorular bitti mi?
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        finishQuiz();
    }
});

// Önceki butonu (Basit versiyon: Sadece soruyu geri getirir, puanı silmez şimdilik)
prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

function updateProgress() {
    // Soru sayısını yaz (Soru 1 / 5)
    countLabel.textContent = `Soru ${currentQuestionIndex + 1} / ${quizData.length}`;
    
    // Çubuğu doldur (%)
    const percent = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBar.style.width = `${percent}%`;
}

function finishQuiz() {
    // Toplam alınabilecek maksimum puanı hesapla (Her soru 10 puan varsayarsak)
    // questions.js'deki quizData uzunluğunu kullanıyoruz
    const maxScore = quizData.length * 10;

    // Puanı ve Max Puanı tarayıcı hafızasına (LocalStorage) kaydet
    // Böylece result.html sayfası bu veriyi okuyabilecek.
    localStorage.setItem('quizScore', userScore);
    localStorage.setItem('quizMaxScore', maxScore);

    // Sonuç sayfasına yönlendir
    window.location.href = "result.html";
}
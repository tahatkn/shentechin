// Bu dosya sadece soruları barındırır.
// "score": Bu şık seçilirse eklenecek puan veya tip.

const quizData = [
    {
        id: 1,
        question: "Yatağa yattıktan sonra uykuya dalmanız ortalama ne kadar sürer?",
        options: [
            { text: "Hemen (5-10 dakika içinde)", score: 10 },
            { text: "Bazen zorlanırım (15-30 dakika)", score: 7 },
            { text: "Genelde döner dururum (30-60 dakika)", score: 4 },
            { text: "Çok zor, saatlerce uyanık kalırım (>60 dk)", score: 1 }
        ]
    },
    {
        id: 2,
        question: "Gece uykunuz ne sıklıkla bölünür?",
        options: [
            { text: "Hiç, deliksiz uyurum", score: 10 },
            { text: "Tuvalet ihtiyacı için 1 kez", score: 8 },
            { text: "Hafif seslerde hemen uyanırım", score: 5 },
            { text: "Sürekli uyanır ve tekrar uyumakta zorlanırım", score: 2 }
        ]
    },
    {
        id: 3,
        question: "Sabah uyandığınızda ilk hissettiğiniz şey nedir?",
        options: [
            { text: "Enerjik ve güne hazırım", score: 10 },
            { text: "Biraz mahmurum ama hemen açılırım", score: 8 },
            { text: "Yorgun ve dayak yemiş gibi", score: 4 },
            { text: "Baş ağrısı ve gerginlik", score: 2 }
        ]
    },
    {
        id: 4,
        question: "Gün içinde istemsizce uyukladığınız olur mu?",
        options: [
            { text: "Asla", score: 10 },
            { text: "Sadece yemeklerden sonra hafifçe", score: 8 },
            { text: "Toplantılarda veya TV izlerken sık sık", score: 5 },
            { text: "Evet, araba kullanırken bile zorlanıyorum", score: 1 }
        ]
    },
    {
        id: 5,
        question: "Horlama veya uykuda nefes durması (apne) şikayetiniz var mı?",
        options: [
            { text: "Hayır, sessiz uyurum", score: 10 },
            { text: "Hafif horlama olduğu söyleniyor", score: 7 },
            { text: "Gürültülü horlarım", score: 4 },
            { text: "Nefesim kesilerek uyanıyorum", score: 0 }
        ]
    }
];
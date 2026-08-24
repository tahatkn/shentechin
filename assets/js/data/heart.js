/* ShenTechin Med — "heart" soru bankası.

   reverse:    yüksek cevabın SAĞLIK AÇISINDAN OLUMSUZ olduğu soruların indeksleri.
               Puanlanırken bu sorular 11 - cevap olarak çevrilir.
   quick:      kısa sürümde sorulan 10 sorunun indeksleri.
   anchors:    her sorunun 1 ve 10 uçlarının adı (metinler test ekranına gömülür).
               null olan sorular anchorText'ten kendi metnini alır.
   anchorText: o soruya özel uçlar.
   groups:     sorunun ait olduğu alan; sonuç ekranındaki kırılım bundan çıkar.
   groupNames: alan adları. */
window.QUIZ_DATA = {
  id: "heart",
  reverse: [0,3,4,5,7,8,9,10,11,12,13,14,15,16,17,18,20,23,24],
  quick: [0,1,3,5,7,9,11,12,17,24],
  anchors: ["freq","freq","regular","agree","freq","freq","agree","freq","lowhigh","agree","lowhigh","agree","freq","amount","amount","freq","freq","freq","agree","regular","amount","freq","agree","agree",null],
  anchorText: {
    "24": {
      "en": {
        "low": "Low risk",
        "high": "High risk"
      },
      "tr": {
        "low": "Düşük risk",
        "high": "Yüksek risk"
      }
    }
  },
  groups: ["activity","activity","living","risk","food","living","risk","symptoms","living","risk","living","risk","activity","food","food","symptoms","symptoms","living","symptoms","living","food","food","activity","risk","living"],
  groupNames: {
    en: {
      "activity": "Movement and capacity",
      "food": "Diet",
      "risk": "Known risk factors",
      "symptoms": "Symptoms for a doctor",
      "living": "Lifestyle and follow-up"
    },
    tr: {
      "activity": "Hareket ve kapasite",
      "food": "Beslenme",
      "risk": "Bilinen risk etkenleri",
      "symptoms": "Hekime söylenecek belirtiler",
      "living": "Yaşam tarzı ve takip"
    }
  },
  q: {
    en: [
      "Do you get out of breath climbing stairs?",
      "How often do you engage in cardio?",
      "Do you monitor your blood pressure?",
      "Do you have a family history of heart issues?",
      "How often do you eat fatty/fried foods?",
      "Do you smoke or vape?",
      "Is your cholesterol level in check?",
      "Do you experience chest tightness?",
      "How is your resting heart rate?",
      "Do you have diabetes?",
      "How much stress are you under?",
      "Are you overweight according to BMI?",
      "Do you sit for long periods?",
      "Do you consume high sodium (salt)?",
      "How is your alcohol consumption?",
      "Do you have swollen ankles/feet?",
      "Do you experience heart palpitations?",
      "Do you sleep less than 6 hours?",
      "Do you have sleep apnea?",
      "Do you visit a cardiologist regularly?",
      "How much sugar do you consume?",
      "Do you eat fish or omega-3s?",
      "Can you run for 5 minutes without stopping?",
      "Do you have chronic gum disease?",
      "Overall, rate your heart health risk."
    ],
    tr: [
      "Merdiven çıkarken nefes nefese kalır mısınız?",
      "Ne sıklıkla kardiyo yaparsınız?",
      "Tansiyonunuzu takip eder misiniz?",
      "Ailede kalp rahatsızlığı var mı?",
      "Yağlı/Kızartma ne sıklıkla yersiniz?",
      "Sigara kullanıyor musunuz?",
      "Kolesterol değerleriniz kontrol altında mı?",
      "Göğüste sıkışma hisseder misiniz?",
      "Dinlenme nabzınız ne düzeyde?",
      "Diyabetiniz var mı?",
      "Ne kadar stres altındasınız?",
      "Kilonuz normal sınırın üzerinde mi?",
      "Uzun süre oturarak mı çalışırsınız?",
      "Tuz tüketiminiz fazla mı?",
      "Alkol kullanır mısınız?",
      "Ayak bileklerinizde şişme olur mu?",
      "Kalp çarpıntısı hisseder misiniz?",
      "6 saatten az mı uyursunuz?",
      "Uyku apneniz var mı?",
      "Kardiyoloğa görünür müsünüz?",
      "Şeker tüketiminiz fazla mı?",
      "Balık veya Omega-3 tüketir misiniz?",
      "5 dakika durmadan koşabilir misiniz?",
      "Diş eti probleminiz var mı?",
      "Genel kalp riski seviyenize kaç puan verirsiniz?"
    ]
  }
};

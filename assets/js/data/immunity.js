/* ShenTechin Med — "immunity" soru bankası.

   reverse:    yüksek cevabın SAĞLIK AÇISINDAN OLUMSUZ olduğu soruların indeksleri.
               Puanlanırken bu sorular 11 - cevap olarak çevrilir.
   quick:      kısa sürümde sorulan 10 sorunun indeksleri.
   anchors:    her sorunun 1 ve 10 uçlarının adı (metinler test ekranına gömülür).
               null olan sorular anchorText'ten kendi metnini alır.
   anchorText: o soruya özel uçlar.
   groups:     sorunun ait olduğu alan; sonuç ekranındaki kırılım bundan çıkar.
   groupNames: alan adları. */
window.QUIZ_DATA = {
  id: "immunity",
  reverse: [0,3,4,5,7,10,11,12,13,14,19,23],
  quick: [0,1,6,8,9,10,13,15,19,24],
  anchors: ["freq","speed","regular","freq","freq","amount","lowhigh","freq","agree","quality","freq","freq","agree","freq","agree","regular","freq","quality","regular","lowhigh","agree","agree","freq","freq","quality"],
  anchorText: {},
  groups: ["infections","energy","habits","infections","infections","protective","energy","infections","fuel","fuel","habits","energy","infections","energy","infections","habits","habits","protective","protective","protective","protective","fuel","fuel","habits","protective"],
  groupNames: {
    en: {
      "infections": "How often you get ill",
      "energy": "Energy and recovery",
      "fuel": "Sleep and nutrition",
      "habits": "Daily habits",
      "protective": "Protective factors"
    },
    tr: {
      "infections": "Ne sıklıkla hastalanıyorsunuz",
      "energy": "Enerji ve toparlanma",
      "fuel": "Uyku ve beslenme",
      "habits": "Günlük alışkanlıklar",
      "protective": "Koruyucu etkenler"
    }
  },
  q: {
    en: [
      "How often do you catch a cold?",
      "How fast do your cuts heal?",
      "Do you take vitamins regularly?",
      "How often do you take antibiotics?",
      "Do you get cold sores?",
      "Do you have allergies?",
      "How are your energy levels?",
      "Do you have digestive issues?",
      "Do you get enough sleep?",
      "How healthy is your diet?",
      "Do you smoke?",
      "Are your hands/feet often cold?",
      "Do you have autoimmune issues?",
      "How often do you feel fatigued?",
      "Do you have chronic inflammation?",
      "Do you exercise regularly?",
      "Do you spend time outdoors (Sun)?",
      "How is your hygiene (washing hands)?",
      "Do you get flu shots?",
      "Is your stress level high?",
      "Do you have healthy gums?",
      "Do you maintain a healthy weight?",
      "Do you eat probiotics (yogurt)?",
      "Do you drink alcohol frequently?",
      "Overall, rate your immune strength."
    ],
    tr: [
      "Ne sıklıkla grip olursunuz?",
      "Yaralarınız ne kadar hızlı iyileşir?",
      "Düzenli vitamin alır mısınız?",
      "Antibiyotik kullanır mısınız?",
      "Uçuk çıkarır mısınız?",
      "Alerjiniz var mı?",
      "Enerji seviyeniz nasıl?",
      "Sindirim sorunu yaşar mısınız?",
      "Yeterince uyuyor musunuz?",
      "Beslenmeniz sağlıklı mı?",
      "Sigara içer misiniz?",
      "Elleriniz/Ayaklarınız üşür mü?",
      "Otoimmün hastalığınız var mı?",
      "Yorgun hisseder misiniz?",
      "Vücutta kronik ağrı/yangı var mı?",
      "Egzersiz yapar mısınız?",
      "Güneşe çıkar mısınız?",
      "Hijyene (El yıkama) dikkat eder misiniz?",
      "Grip aşısı olur musunuz?",
      "Stres seviyeniz yüksek mi?",
      "Diş eti sağlığınız iyi mi?",
      "Kilonuz normal mi?",
      "Probiyotik (yoğurt/kefir) tüketir misiniz?",
      "Alkol tüketir misiniz?",
      "Genel bağışıklık gücünüze kaç puan verirsiniz?"
    ]
  }
};

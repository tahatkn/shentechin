/* ShenTechin Med — "tech" soru bankası.

   reverse:    yüksek cevabın SAĞLIK AÇISINDAN OLUMSUZ olduğu soruların indeksleri.
               Puanlanırken bu sorular 11 - cevap olarak çevrilir.
   quick:      kısa sürümde sorulan 10 sorunun indeksleri.
   anchors:    her sorunun 1 ve 10 uçlarının adı (metinler test ekranına gömülür).
               null olan sorular anchorText'ten kendi metnini alır.
   anchorText: o soruya özel uçlar.
   groups:     sorunun ait olduğu alan; sonuç ekranındaki kırılım bundan çıkar.
   groupNames: alan adları. */
window.QUIZ_DATA = {
  id: "tech",
  reverse: [0,1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,21,22],
  quick: [0,1,2,6,8,11,14,17,20,24],
  anchors: ["freq","amount","freq","freq","freq","freq","freq","freq","freq","freq","agree","freq","freq","agree","freq","freq","agree","freq","amount","freq","agree","freq","freq","lowhigh","quality"],
  anchorText: {},
  groups: ["reflex","time","reflex","limits","limits","reflex","mood","limits","body","body","time","reflex","limits","limits","time","time","mood","mood","body","limits","time","reflex","mood","limits","limits"],
  groupNames: {
    en: {
      "reflex": "Reflex checking",
      "time": "Time spent online",
      "body": "Physical effects",
      "mood": "Mood and self-image",
      "limits": "Boundaries you keep"
    },
    tr: {
      "reflex": "Refleks hâline gelmiş kontrol",
      "time": "Çevrimiçi geçen zaman",
      "body": "Fiziksel etkiler",
      "mood": "Ruh hâli ve özdeğer",
      "limits": "Koyduğunuz sınırlar"
    }
  },
  q: {
    en: [
      "Is your phone the first thing you check?",
      "How many hours is your screen time?",
      "Do you feel anxious without your phone?",
      "Do you check phone while eating?",
      "Do you use phone in the bathroom?",
      "Do you get phantom vibration syndrome?",
      "Does social media make you depressed?",
      "Do you text while walking/driving?",
      "Do your eyes hurt from screens?",
      "Do you have neck pain (Tech neck)?",
      "Can you watch a movie without checking phone?",
      "Do you sleep with your phone?",
      "Do you check emails on vacation?",
      "Do you prefer online chat to talking?",
      "Do you lose track of time online?",
      "Do you play video games excessively?",
      "Are you addicted to news/scrolling?",
      "Do you judge your worth by likes?",
      "Does tech affect your sleep?",
      "Do you multitask constantly?",
      "Can you go 24h offline?",
      "Do you check notifications immediately?",
      "Do you shop online impulsively?",
      "Is your digital workspace organized?",
      "Overall, rate your digital balance."
    ],
    tr: [
      "İlk iş telefona bakar mısınız?",
      "Günlük ekran süreniz ne kadar fazla?",
      "Telefonsuz kalınca panik olur musunuz?",
      "Yemekte telefona bakar mısınız?",
      "Tuvalette telefon kullanır mısınız?",
      "Hayali titreşim hisseder misiniz?",
      "Sosyal medya sizi mutsuz eder mi?",
      "Yürürken mesaj yazar mısınız?",
      "Gözleriniz ekrandan ağrır mı?",
      "Boyun ağrısı (Tech neck) var mı?",
      "Telefona bakmadan film izleyebilir misiniz?",
      "Telefonla mı uyursunuz?",
      "Tatilde e-posta kontrol eder misiniz?",
      "Mesajlaşmayı konuşmaya tercih eder misiniz?",
      "İnternette zamanın nasıl geçtiğini unutur musunuz?",
      "Aşırı oyun oynar mısınız?",
      "Sürekli haber akışını yeniler misiniz?",
      "Beğeni sayıları ruh halinizi etkiler mi?",
      "Teknoloji uykunuzu böler mi?",
      "Sürekli çoklu görev (multitask) yapar mısınız?",
      "24 saat internetsiz durabilir misiniz?",
      "Bildirimlere anında bakar mısınız?",
      "İnternetten gereksiz alışveriş yapar mısınız?",
      "Dijital dosyalarınız düzenli mi?",
      "Genel dijital dengenize kaç puan verirsiniz?"
    ]
  }
};

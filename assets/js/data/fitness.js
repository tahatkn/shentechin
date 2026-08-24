/* ShenTechin Med — "fitness" soru bankası.

   reverse:    yüksek cevabın SAĞLIK AÇISINDAN OLUMSUZ olduğu soruların indeksleri.
               Puanlanırken bu sorular 11 - cevap olarak çevrilir.
   quick:      kısa sürümde sorulan 10 sorunun indeksleri.
   anchors:    her sorunun 1 ve 10 uçlarının adı (metinler test ekranına gömülür).
               null olan sorular anchorText'ten kendi metnini alır.
   anchorText: o soruya özel uçlar.
   groups:     sorunun ait olduğu alan; sonuç ekranındaki kırılım bundan çıkar.
   groupNames: alan adları. */
window.QUIZ_DATA = {
  id: "fitness",
  reverse: [3,5,8,22],
  quick: [0,3,5,6,9,10,13,16,20,24],
  anchors: ["amount","agree","amount","freq","lowhigh","freq","freq","lowhigh","freq","lowhigh","freq","freq","speed","freq","quality","freq","agree","agree","freq","lowhigh","easy","amount","freq","agree","quality"],
  anchorText: {},
  groups: ["moving","mobility","strength","stamina","strength","moving","moving","overall","overall","mobility","moving","moving","stamina","moving","mobility","mobility","strength","strength","moving","strength","stamina","overall","stamina","overall","overall"],
  groupNames: {
    en: {
      "moving": "How much you move",
      "strength": "Strength",
      "mobility": "Flexibility and posture",
      "stamina": "Stamina and recovery",
      "overall": "Overall condition"
    },
    tr: {
      "moving": "Ne kadar hareket ediyorsunuz",
      "strength": "Kuvvet",
      "mobility": "Esneklik ve duruş",
      "stamina": "Dayanıklılık ve toparlanma",
      "overall": "Genel durum"
    }
  },
  q: {
    en: [
      "How many days a week do you exercise?",
      "Can you touch your toes?",
      "How many pushups can you do?",
      "Do you get winded walking?",
      "How is your core strength?",
      "Do you sit for more than 8 hours?",
      "How often do you take the stairs instead of the elevator?",
      "How is your balance?",
      "Do you experience back pain?",
      "How flexible are you?",
      "Do you lift weights?",
      "Do you track your steps?",
      "How fast is your walking pace?",
      "Do you participate in sports?",
      "How is your posture?",
      "Do you stretch daily?",
      "Do you feel strong?",
      "Can you plank for 1 minute?",
      "Do you cycle or swim?",
      "How is your muscle definition?",
      "Do you recover quickly from exercise?",
      "Do you enjoy being active?",
      "Do light activities leave you sweaty and out of breath?",
      "Is your BMI in healthy range?",
      "Overall, rate your fitness level."
    ],
    tr: [
      "Haftada kaç gün egzersiz yaparsınız?",
      "Ayak parmaklarınıza dokunabilir misiniz?",
      "Kaç şınav çekebilirsiniz?",
      "Yürürken nefes nefese kalır mısınız?",
      "Karın kaslarınız güçlü mü?",
      "Günde 8 saatten fazla oturur musunuz?",
      "Asansör yerine ne sıklıkla merdiven kullanırsınız?",
      "Dengeniz ne kadar iyi?",
      "Sırt ağrısı çeker misiniz?",
      "Ne kadar esneksiniz?",
      "Ağırlık kaldırır mısınız?",
      "Adım sayınızı takip eder misiniz?",
      "Yürüyüş temponuz hızlı mı?",
      "Spor yapar mısınız?",
      "Duruşunuz (Postür) düzgün mü?",
      "Esneme hareketleri yapar mısınız?",
      "Kendinizi güçlü hissediyor musunuz?",
      "1 dakika plank yapabilir misiniz?",
      "Yüzme veya bisiklet yapar mısınız?",
      "Kaslarınız belirgin mi?",
      "Spordan sonra çabuk toparlanır mısınız?",
      "Hareket etmeyi sever misiniz?",
      "Hafif aktivitelerde bile terleyip nefesiniz kesilir mi?",
      "Kilonuz sağlıklı aralıkta mı?",
      "Genel kondisyonunuza kaç puan verirsiniz?"
    ]
  }
};

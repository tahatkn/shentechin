/* ShenTechin Med — "sleep" soru bankası.

   reverse:    yüksek cevabın SAĞLIK AÇISINDAN OLUMSUZ olduğu soruların indeksleri.
               Puanlanırken bu sorular 11 - cevap olarak çevrilir.
   quick:      kısa sürümde sorulan 10 sorunun indeksleri.
   anchors:    her sorunun 1 ve 10 uçlarının adı (metinler test ekranına gömülür).
               null olan sorular anchorText'ten kendi metnini alır.
   anchorText: o soruya özel uçlar.
   groups:     sorunun ait olduğu alan; sonuç ekranındaki kırılım bundan çıkar.
   groupNames: alan adları. */
window.QUIZ_DATA = {
  id: "sleep",
  reverse: [0,1,3,6,7,8,10,11,12,13,14,15,17,19,20,21,22,23],
  quick: [0,1,2,6,7,9,10,15,20,24],
  anchors: [null,"freq",null,"freq",null,"comfort","freq","freq","freq","regular","freq","agree","freq","freq","freq","freq","lowhigh","freq","comfort","amount","freq","freq","freq","freq","quality"],
  anchorText: {
    "0": {
      "en": {
        "low": "Instantly",
        "high": "Hours"
      },
      "tr": {
        "low": "Hemen",
        "high": "Saatlerce"
      }
    },
    "2": {
      "en": {
        "low": "Exhausted",
        "high": "Fully rested"
      },
      "tr": {
        "low": "Bitkin",
        "high": "Tamamen dinç"
      }
    },
    "4": {
      "en": {
        "low": "Bright",
        "high": "Pitch dark"
      },
      "tr": {
        "low": "Aydınlık",
        "high": "Zifiri karanlık"
      }
    }
  },
  groups: ["onset","onset","rested","onset","room","room","signs","evening","evening","onset","rested","rested","evening","signs","signs","signs","evening","evening","room","room","signs","rested","signs","signs","rested"],
  groupNames: {
    en: {
      "onset": "Falling and staying asleep",
      "rested": "Waking up rested",
      "room": "Bedroom and environment",
      "evening": "Evening habits",
      "signs": "Signs worth noting"
    },
    tr: {
      "onset": "Uykuya dalma ve sürdürme",
      "rested": "Dinç uyanma",
      "room": "Yatak odası ve ortam",
      "evening": "Akşam alışkanlıkları",
      "signs": "Dikkate değer işaretler"
    }
  },
  q: {
    en: [
      "How long does it take you to fall asleep?",
      "How often do you wake up during the night?",
      "How refreshed do you feel in the morning?",
      "How often do you wake up in the middle of a dream?",
      "Rate the darkness of your bedroom.",
      "How comfortable is your mattress/pillow?",
      "Do you snore or have breathing pauses?",
      "Do you consume caffeine close to bedtime?",
      "Do you use screens (phone/TV) in bed?",
      "How consistent is your sleep schedule?",
      "Do you experience daytime sleepiness?",
      "Do you need an alarm to wake up?",
      "Do you take naps during the day?",
      "How often do you have nightmares?",
      "Do you grind your teeth while sleeping?",
      "Do you feel anxious before going to bed?",
      "How physically active are you during the day?",
      "Do you eat heavy meals late at night?",
      "Is your bedroom temperature comfortable?",
      "Do noise levels affect your sleep?",
      "Do you rely on sleeping pills/supplements?",
      "Do you wake up with a headache?",
      "Do you feel paralyzed when waking up?",
      "Do you talk or walk in your sleep?",
      "Overall, how would you rate your sleep quality?"
    ],
    tr: [
      "Uykuya dalmanız ne kadar sürüyor?",
      "Gece ne sıklıkla uyanırsınız?",
      "Sabah ne kadar dinç uyanırsınız?",
      "Rüyanızın ortasında uyandığınız olur mu?",
      "Yatak odanızın karanlık seviyesi nedir?",
      "Yatağınız ve yastığınız ne kadar rahat?",
      "Horlama veya nefes durması yaşar mısınız?",
      "Yatmadan önce kafein tüketir misiniz?",
      "Yatakta telefon/TV kullanır mısınız?",
      "Uyku saatiniz ne kadar düzenli?",
      "Gün içinde uyuklama isteği olur mu?",
      "Uyanmak için alarma ihtiyaç duyar mısınız?",
      "Gün içinde şekerleme yapar mısınız?",
      "Ne sıklıkla kabus görürsünüz?",
      "Uykuda dişlerinizi sıkar mısınız?",
      "Yatmadan önce kaygılı hisseder misiniz?",
      "Gün içinde ne kadar fiziksel aktifsiniz?",
      "Gece geç saatte ağır yemek yer misiniz?",
      "Yatak odası sıcaklığı uygun mu?",
      "Gürültü uykunuzu etkiler mi?",
      "Uyku ilacı kullanır mısınız?",
      "Baş ağrısı ile uyanır mısınız?",
      "Uyanınca hareket edememe (karabasan) olur mu?",
      "Uykuda konuşur veya yürür müsünüz?",
      "Genel olarak uyku kalitenize kaç puan verirsiniz?"
    ]
  }
};

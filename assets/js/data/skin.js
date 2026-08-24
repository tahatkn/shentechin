/* ShenTechin Med — "skin" soru bankası.

   reverse:    yüksek cevabın SAĞLIK AÇISINDAN OLUMSUZ olduğu soruların indeksleri.
               Puanlanırken bu sorular 11 - cevap olarak çevrilir.
   quick:      kısa sürümde sorulan 10 sorunun indeksleri.
   anchors:    her sorunun 1 ve 10 uçlarının adı (metinler test ekranına gömülür).
               null olan sorular anchorText'ten kendi metnini alır.
   anchorText: o soruya özel uçlar.
   groups:     sorunun ait olduğu alan; sonuç ekranındaki kırılım bundan çıkar.
   groupNames: alan adları. */
window.QUIZ_DATA = {
  id: "skin",
  reverse: [0,1,2,3,4,6,7,9,11,12,13,14,15,17,18,20,21,23],
  quick: [0,2,5,7,8,12,16,18,20,24],
  anchors: ["amount","lowhigh","freq","amount","amount",null,"amount","amount","freq","amount","amount","freq","freq","freq","amount","amount","regular","freq","freq","quality","amount","freq","freq","freq","quality"],
  anchorText: {
    "5": {
      "en": {
        "low": "Burns easily",
        "high": "Tans easily"
      },
      "tr": {
        "low": "Kolay yanar",
        "high": "Kolay bronzlaşır"
      }
    }
  },
  groups: ["type","sensitivity","sensitivity","type","sensitivity","type","type","sun","sun","sun","living","routine","living","routine","living","type","routine","routine","sensitivity","living","living","routine","routine","sensitivity","living"],
  groupNames: {
    en: {
      "type": "Skin type and behaviour",
      "sensitivity": "Sensitivity and reactions",
      "sun": "Sun protection and ageing",
      "routine": "Daily routine",
      "living": "Lifestyle factors"
    },
    tr: {
      "type": "Cilt tipi ve davranışı",
      "sensitivity": "Hassasiyet ve tepkiler",
      "sun": "Güneşten korunma ve yaşlanma",
      "routine": "Günlük rutin",
      "living": "Yaşam tarzı etkenleri"
    }
  },
  q: {
    en: [
      "How oily does your T-zone feel during the day?",
      "How sensitive is your skin to new products?",
      "How frequently do you get acne/pimples?",
      "How visible are your pores?",
      "How easily does your skin turn red?",
      "How does your skin react to the sun?",
      "How dry/tight does your skin feel after washing?",
      "Do you have visible fine lines or wrinkles?",
      "How often do you wear sunscreen?",
      "Do you have dark spots or hyperpigmentation?",
      "How much water do you drink daily?",
      "How often do you exfoliate?",
      "Do you smoke or are exposed to smoke?",
      "How often do you wear heavy makeup?",
      "Do you have dark circles under your eyes?",
      "Does your skin feel rough to the touch?",
      "Do you have a consistent skincare routine?",
      "How often do you touch your face?",
      "Do you suffer from eczema or rosacea?",
      "How balanced is your diet regarding vegetables?",
      "Does stress affect your skin condition?",
      "Do you sleep with makeup on?",
      "How often do you change your pillowcases?",
      "Does your skin look dull or tired?",
      "Overall, rate your skin health."
    ],
    tr: [
      "Gün içinde T bölgeniz ne kadar yağlanır?",
      "Cildiniz yeni ürünlere ne kadar hassas?",
      "Ne sıklıkla sivilce çıkarırsınız?",
      "Gözenekleriniz ne kadar belirgin?",
      "Cildiniz ne kadar kolay kızarır?",
      "Güneşte cildiniz nasıl tepki verir?",
      "Yıkadıktan sonra cilt gerginliği ne seviyede?",
      "İnce çizgi veya kırışıklık var mı?",
      "Ne sıklıkla güneş kremi kullanırsınız?",
      "Leke veya pigmentasyon sorunu var mı?",
      "Günde ne kadar su içersiniz?",
      "Peeling/Kese yapar mısınız?",
      "Sigara içer misiniz?",
      "Ne sıklıkla ağır makyaj yaparsınız?",
      "Göz altı morluklarınız var mı?",
      "Cildiniz dokununca pütürlü mü?",
      "Düzenli cilt bakım rutininiz var mı?",
      "Yüzünüze ne sıklıkla dokunursunuz?",
      "Egzama veya gül hastalığınız var mı?",
      "Sebze ağırlıklı besleniyor musunuz?",
      "Stres cildinizi etkiler mi?",
      "Makyajla uyuduğunuz olur mu?",
      "Yastık kılıfını ne sıklıkla değiştirirsiniz?",
      "Cildiniz solgun veya yorgun mu?",
      "Genel olarak cilt sağlığınıza kaç puan verirsiniz?"
    ]
  }
};

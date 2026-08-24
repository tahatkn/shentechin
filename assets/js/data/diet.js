/* ShenTechin Med — "diet" soru bankası.

   reverse:    yüksek cevabın SAĞLIK AÇISINDAN OLUMSUZ olduğu soruların indeksleri.
               Puanlanırken bu sorular 11 - cevap olarak çevrilir.
   quick:      kısa sürümde sorulan 10 sorunun indeksleri.
   anchors:    her sorunun 1 ve 10 uçlarının adı (metinler test ekranına gömülür).
               null olan sorular anchorText'ten kendi metnini alır.
   anchorText: o soruya özel uçlar.
   groups:     sorunun ait olduğu alan; sonuç ekranındaki kırılım bundan çıkar.
   groupNames: alan adları. */
window.QUIZ_DATA = {
  id: "diet",
  reverse: [2,3,4,5,6,8,9,11,12,16,17,19,20,22],
  quick: [1,2,3,4,9,10,13,17,20,24],
  anchors: ["regular","amount","freq","freq","freq","freq","speed","freq","freq","freq","freq","freq","amount","lowhigh","freq","regular","freq","amount","amount","freq","freq","lowhigh","freq","freq","quality"],
  anchorText: {},
  groups: ["structure","plate","plate","drinks","structure","body","structure","drinks","drivers","drivers","structure","drinks","body","plate","body","body","body","body","plate","drinks","structure","drivers","drivers","plate","body"],
  groupNames: {
    en: {
      "structure": "Meal structure and timing",
      "plate": "What ends up on the plate",
      "drinks": "Drinks",
      "drivers": "What drives your eating",
      "body": "How your body responds"
    },
    tr: {
      "structure": "Öğün düzeni ve zamanlaması",
      "plate": "Tabakta ne var",
      "drinks": "İçecekler",
      "drivers": "Yemeyi ne yönlendiriyor",
      "body": "Bedeniniz nasıl yanıt veriyor"
    }
  },
  q: {
    en: [
      "How regularly do you eat breakfast?",
      "How many portions of fruit/veg do you eat daily?",
      "How often do you eat processed/fast food?",
      "Do you drink sugary drinks (soda/juice)?",
      "How often do you eat late at night?",
      "Do you feel bloated after meals?",
      "How quickly do you eat your meals?",
      "Do you track your water intake?",
      "How often do you crave sweets/sugar?",
      "Do you eat emotionally (when stressed)?",
      "How often do you cook at home?",
      "Do you consume alcohol?",
      "Do you have food allergies or intolerances?",
      "How diverse is your diet?",
      "Do you take nutritional supplements?",
      "How is your digestion regularity?",
      "Do you feel energy crashes after lunch?",
      "How much salt do you add to food?",
      "Do you eat whole grains vs white bread?",
      "Do you drink tea/coffee excessively?",
      "Do you skip meals often?",
      "How satisfied do you feel after meals?",
      "Do you diet frequently (Yo-yo dieting)?",
      "Do you read food labels?",
      "Overall, rate your nutritional habits."
    ],
    tr: [
      "Kahvaltıyı ne kadar düzenli yaparsınız?",
      "Günde kaç porsiyon meyve/sebze yersiniz?",
      "Ne sıklıkla fast-food yersiniz?",
      "Şekerli içecek (kola/meyve suyu) tüketir misiniz?",
      "Gece geç saatte ne sıklıkla yersiniz?",
      "Yemekten sonra şişkinlik olur mu?",
      "Yemeği ne kadar hızlı yersiniz?",
      "Su içmeyi takip eder misiniz?",
      "Tatlı kriziniz ne sıklıkla olur?",
      "Stresliyken yemek yer misiniz?",
      "Ne sıklıkla ev yemeği yersiniz?",
      "Alkol tüketiminiz ne seviyede?",
      "Gıda alerjiniz var mı?",
      "Beslenmeniz ne kadar çeşitli?",
      "Vitamin takviyesi alır mısınız?",
      "Sindirim sisteminiz düzenli mi?",
      "Öğle yemeğinden sonra enerji düşüşü olur mu?",
      "Yemeğe ne kadar tuz eklersiniz?",
      "Tam tahıllı ürünler tüketir misiniz?",
      "Aşırı çay/kahve içer misiniz?",
      "Öğün atlar mısınız?",
      "Yemekten sonra tatmin hisseder misiniz?",
      "Sık sık diyet yapar mısınız?",
      "Gıda etiketlerini okur musunuz?",
      "Genel beslenme düzeninize kaç puan verirsiniz?"
    ]
  }
};

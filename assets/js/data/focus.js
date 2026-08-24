/* ShenTechin Med — "focus" soru bankası.

   reverse:    yüksek cevabın SAĞLIK AÇISINDAN OLUMSUZ olduğu soruların indeksleri.
               Puanlanırken bu sorular 11 - cevap olarak çevrilir.
   quick:      kısa sürümde sorulan 10 sorunun indeksleri.
   anchors:    her sorunun 1 ve 10 uçlarının adı (metinler test ekranına gömülür).
               null olan sorular anchorText'ten kendi metnini alır.
   anchorText: o soruya özel uçlar.
   groups:     sorunun ait olduğu alan; sonuç ekranındaki kırılım bundan çıkar.
   groupNames: alan adları. */
window.QUIZ_DATA = {
  id: "focus",
  reverse: [0,1,2,3,5,6,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
  quick: [0,1,2,3,7,8,11,14,20,24],
  anchors: ["freq","freq","amount","freq","agree","freq","freq","lowhigh","amount","freq","freq","freq","amount","freq","freq","amount","freq","agree","amount","agree","amount","lowhigh","freq","freq","quality"],
  anchorText: {},
  groups: ["sustain","sustain","sustain","memory","sustain","restless","memory","execution","execution","restless","sustain","execution","restless","state","memory","execution","sustain","restless","restless","state","execution","state","execution","state","state"],
  groupNames: {
    en: {
      "sustain": "Staying with a task",
      "execution": "Getting things finished",
      "memory": "Slips and forgetting",
      "restless": "Restlessness and impulse",
      "state": "Mental state"
    },
    tr: {
      "sustain": "Bir işin başında kalma",
      "execution": "İşleri bitirebilme",
      "memory": "Unutkanlık ve dalgınlık",
      "restless": "Yerinde duramama ve dürtüsellik",
      "state": "Zihinsel durum"
    }
  },
  q: {
    en: [
      "How often do you zone out in conversations?",
      "Do you struggle to finish tasks?",
      "How easily are you distracted?",
      "Do you lose things (keys/phone) often?",
      "Can you read a book without stopping?",
      "Do you fidget (tap hands/feet)?",
      "Do you make careless mistakes?",
      "How organized is your room/desk?",
      "Do you struggle with time management?",
      "Do you interrupt people when speaking?",
      "How often do you daydream?",
      "Do you procrastinate important tasks?",
      "Is it hard to sit still?",
      "Do you have racing thoughts?",
      "Do you forget appointments?",
      "Do you struggle to follow instructions?",
      "Do you hyperfocus on things you like?",
      "Are you impulsive?",
      "Do you have trouble waiting your turn?",
      "Does caffeine make you sleepy instead of alert?",
      "Do you struggle to prioritize?",
      "How sensitive are you to noise?",
      "Do you start multiple projects at once?",
      "Do you feel mentally exhausted?",
      "Overall, rate your focus ability."
    ],
    tr: [
      "Konuşurken dalıp gider misiniz?",
      "Başladığınız işi bitirmekte zorlanır mısınız?",
      "Dikkatiniz ne kadar kolay dağılır?",
      "Eşyalarınızı sık kaybeder misiniz?",
      "Kitap okurken odaklanabilir misiniz?",
      "Eliniz ayağınız kıpır kıpır mıdır?",
      "Dikkatsizce hatalar yapar mısınız?",
      "Odanız/Masanız ne kadar düzenli?",
      "Zaman yönetimi sorunu yaşar mısınız?",
      "İnsanların sözünü keser misiniz?",
      "Ne sıklıkla hayallere dalarsınız?",
      "Önemli işleri erteler misiniz?",
      "Sabit durmakta zorlanır mısınız?",
      "Zihninizde düşünceler yarışır mı?",
      "Randevuları unutur musunuz?",
      "Talimatları takip etmekte zorlanır mısınız?",
      "Sevdiğiniz işe aşırı odaklanır mısınız?",
      "Dürtüsel davranır mısınız?",
      "Sıranızı beklemekte zorlanır mısınız?",
      "Kafein uykunuzu getirir mi?",
      "Öncelik belirlemekte zorlanır mısınız?",
      "Sese karşı hassas mısınız?",
      "Aynı anda çok işe başlar mısınız?",
      "Zihinsel olarak yorgun hisseder misiniz?",
      "Genel odaklanma yeteneğinize kaç puan verirsiniz?"
    ]
  }
};

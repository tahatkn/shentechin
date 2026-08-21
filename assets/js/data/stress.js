/* ShenTechin Med — "stress" soru bankası.
   reverse: yüksek cevabın SAĞLIK AÇISINDAN OLUMSUZ olduğu soruların indeksleri.
            Puanlanırken bu sorular 11 - cevap olarak çevrilir.
   quick:   kısa sürümde sorulan 10 sorunun indeksleri. */
window.QUIZ_DATA = {
  id: "stress",
  reverse: [0,1,2,3,4,5,9,11,14,15,16,17,19,20,21,22,23,24],
  quick: [0,3,4,6,9,13,15,18,21,24],
  q: {
    en: [
          "How often do you feel overwhelmed?",
          "Do you get irritated by small things?",
          "How often do you feel muscle tension?",
          "Do you have trouble relaxing?",
          "How often do you worry about the future?",
          "Do you clench your jaw?",
          "How is your work/life balance?",
          "Do you have someone to talk to?",
          "How often do you practice mindfulness/meditation?",
          "Do you feel physical symptoms of stress?",
          "How quickly can you calm down after anger?",
          "Do you feel like you are losing control?",
          "How often do you laugh?",
          "Do you have time for hobbies?",
          "Do you feel pressure from social media?",
          "How often do you feel lonely?",
          "Do you procrastinate due to anxiety?",
          "How is your financial stress level?",
          "Do you feel valued at work/school?",
          "Do you suffer from panic attacks?",
          "How often do you cry?",
          "Do you feel burnout?",
          "Are you a perfectionist?",
          "Do you dwell on past mistakes?",
          "Overall, rate your stress level (1: Zen, 10: High Stress)."
    ],
    tr: [
          "Kendinizi ne sıklıkla bunalmış hissedersiniz?",
          "Küçük şeyler sizi sinirlendirir mi?",
          "Kas gerginliği hisseder misiniz?",
          "Gevşemekte zorlanır mısınız?",
          "Gelecek hakkında ne kadar endişelisiniz?",
          "Çenenizi sıkar mısınız?",
          "İş/Yaşam dengeniz nasıl?",
          "Konuşacak birileri var mı?",
          "Meditasyon veya farkındalık çalışır mısınız?",
          "Stresin fiziksel belirtilerini yaşar mısınız?",
          "Sinirlenince ne kadar çabuk sakinleşirsiniz?",
          "Kontrolü kaybediyor gibi hisseder misiniz?",
          "Ne sıklıkla gülersiniz?",
          "Hobilerinize vakit ayırır mısınız?",
          "Sosyal medya sizi baskı altında hissettirir mi?",
          "Kendinizi ne kadar yalnız hissedersiniz?",
          "Kaygı yüzünden işleri erteler misiniz?",
          "Finansal stresiniz ne seviyede?",
          "İş/Okulda değerli hissediyor musunuz?",
          "Panik atak yaşar mısınız?",
          "Ne sıklıkla ağlarsınız?",
          "Tükenmişlik (Burnout) hissediyor musunuz?",
          "Mükemmeliyetçi misiniz?",
          "Geçmiş hatalara takılı kalır mısınız?",
          "Genel stres seviyenize kaç puan verirsiniz?"
    ]
  }
};

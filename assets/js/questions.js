const allQuizzes = {
    // --- İNGİLİZCE (VARSAYILAN) ---
    en: {
        sleep: [
            { question: "How long does it take you to fall asleep?", options: [{text: "Immediately (5-10 mins)", score: 10}, {text: "Sometimes hard (15-30 mins)", score: 7}, {text: "Usually tossing (30-60 mins)", score: 4}, {text: "Very hard (>60 mins)", score: 1}] },
            { question: "How often do you wake up at night?", options: [{text: "Never", score: 10}, {text: "Once", score: 8}, {text: "With slight noises", score: 5}, {text: "Multiple times", score: 2}] },
            { question: "How do you feel when you wake up?", options: [{text: "Energetic", score: 10}, {text: "A bit groggy", score: 8}, {text: "Tired", score: 4}, {text: "Headache/Tense", score: 2}] },
            { question: "Do you remember your dreams?", options: [{text: "Usually vivid", score: 8}, {text: "Sometimes", score: 6}, {text: "Rarely", score: 4}, {text: "Nightmares", score: 2}] },
            { question: "Your bedroom conditions?", options: [{text: "Dark & Cool", score: 10}, {text: "Some street light", score: 7}, {text: "TV/Phone lights", score: 3}, {text: "Noisy/Hot", score: 1}] }
        ],
        skin: [
            { question: "How does your skin feel 1 hour after washing?", options: [{text: "Comfortable", score: 10}, {text: "T-zone oily", score: 8}, {text: "Tight/Dry", score: 4}, {text: "Very oily", score: 6}] },
            { question: "Reaction to sun exposure?", options: [{text: "Tan easily", score: 10}, {text: "Burn then tan", score: 8}, {text: "Burn instantly", score: 4}, {text: "Sun spots appear", score: 5}] },
            { question: "Frequency of acne?", options: [{text: "Never", score: 10}, {text: "Only when stressed", score: 7}, {text: "Constant bumps", score: 5}, {text: "Cystic acne", score: 2}] },
            { question: "Fine lines around eyes?", options: [{text: "None", score: 10}, {text: "Only when smiling", score: 8}, {text: "Visible", score: 5}, {text: "Deep lines", score: 3}] },
            { question: "Daily water intake?", options: [{text: "2.5L+", score: 10}, {text: "1.5-2L", score: 8}, {text: "Only when thirsty", score: 5}, {text: "Almost none", score: 2}] }
        ],
        diet: [
            { question: "Daily meals?", options: [{text: "3 main + snacks", score: 10}, {text: "2 main (IF)", score: 9}, {text: "Irregular", score: 4}, {text: "Heavy night eating", score: 2}] },
            { question: "Vegetable/Fruit intake?", options: [{text: "Every meal", score: 10}, {text: "Daily fruit", score: 8}, {text: "Few times a week", score: 5}, {text: "Rarely", score: 3}] },
            { question: "Sweet cravings?", options: [{text: "Rarely", score: 10}, {text: "Small piece daily", score: 7}, {text: "Every day", score: 4}, {text: "Uncontrollable", score: 1}] },
            { question: "Bloating after meals?", options: [{text: "No", score: 10}, {text: "Sometimes", score: 7}, {text: "Often", score: 4}, {text: "Always", score: 2}] },
            { question: "Processed food intake?", options: [{text: "None", score: 10}, {text: "Weekly treat", score: 7}, {text: "Often", score: 3}, {text: "Mostly processed", score: 1}] }
        ],
        stress: [
            { question: "Reaction to small mishaps?", options: [{text: "Calm", score: 10}, {text: "Annoyed but pass", score: 7}, {text: "Ruins day", score: 4}, {text: "Explosive anger", score: 2}] },
            { question: "Teeth grinding?", options: [{text: "No", score: 10}, {text: "Sometimes in sleep", score: 6}, {text: "Jaw pain often", score: 4}, {text: "Need mouthguard", score: 2}] },
            { question: "Focus issues?", options: [{text: "Sharp focus", score: 10}, {text: "Sometimes drift", score: 7}, {text: "Forgetful", score: 4}, {text: "Brain fog", score: 2}] },
            { question: "Feeling about future?", options: [{text: "Hopeful", score: 10}, {text: "Planned", score: 8}, {text: "Uncertain/Anxious", score: 5}, {text: "Dread", score: 2}] },
            { question: "Shortness of breath?", options: [{text: "Only sports", score: 10}, {text: "When excited", score: 8}, {text: "Randomly", score: 4}, {text: "Panic attacks", score: 2}] }
        ],
        heart: [
            { question: "Breathlessness climbing stairs?", options: [{text: "No", score: 10}, {text: "After 2-3 floors", score: 7}, {text: "Every floor", score: 4}, {text: "Even walking flat", score: 2}] },
            { question: "Family history of heart attack (<50y)?", options: [{text: "No", score: 10}, {text: "Distant relatives", score: 7}, {text: "1st degree", score: 5}, {text: "Multiple people", score: 2}] },
            { question: "Blood pressure?", options: [{text: "120/80 (Ideal)", score: 10}, {text: "Low sometimes", score: 8}, {text: "Borderline", score: 5}, {text: "High (Medicated)", score: 3}] },
            { question: "Smoking?", options: [{text: "Never", score: 10}, {text: "Quit >5 yrs", score: 8}, {text: "Socially", score: 5}, {text: "Regularly", score: 1}] },
            { question: "Chest pain?", options: [{text: "Never", score: 10}, {text: "Only extreme stress", score: 7}, {text: "With effort", score: 4}, {text: "Often at rest", score: 1}] }
        ],
        focus: [
            { question: "Finishing started tasks?", options: [{text: "Always finish", score: 10}, {text: "Sometimes bored", score: 7}, {text: "Often incomplete", score: 4}, {text: "Rarely finish", score: 2}] },
            { question: "Listening to others?", options: [{text: "Fully focused", score: 10}, {text: "Eye contact but drift", score: 6}, {text: "Ask to repeat", score: 4}, {text: "Mind elsewhere", score: 2}] },
            { question: "Losing items?", options: [{text: "Never", score: 10}, {text: "Rarely", score: 8}, {text: "Weekly", score: 5}, {text: "Daily", score: 2}] },
            { question: "Attention to detail?", options: [{text: "High", score: 10}, {text: "Minor errors", score: 7}, {text: "Often miss details", score: 4}, {text: "Avoid details", score: 2}] },
            { question: "Fidgeting?", options: [{text: "Calm", score: 10}, {text: "Only excited", score: 8}, {text: "Often tap hands/feet", score: 5}, {text: "Can't sit still", score: 2}] }
        ],
        fitness: [
            { question: "Exercise frequency?", options: [{text: "4+ days/week", score: 10}, {text: "2-3 days", score: 8}, {text: "Weekends only", score: 5}, {text: "Rarely", score: 1}] },
            { question: "Daily steps?", options: [{text: "10,000+", score: 10}, {text: "7k-10k", score: 8}, {text: "3k-7k", score: 5}, {text: "<3k", score: 2}] },
            { question: "Picking things from floor?", options: [{text: "Easy", score: 10}, {text: "Bend knees a bit", score: 8}, {text: "Back hurts", score: 4}, {text: "Need help", score: 2}] },
            { question: "Muscle strength?", options: [{text: "Strong", score: 10}, {text: "Average", score: 7}, {text: "Feel weak", score: 4}, {text: "Struggle with groceries", score: 2}] },
            { question: "Sitting time?", options: [{text: "Active job", score: 10}, {text: "Desk but breaks", score: 7}, {text: "6-8 hours", score: 4}, {text: "10+ hours", score: 1}] }
        ],
        immunity: [
            { question: "Flu frequency per year?", options: [{text: "Rarely", score: 10}, {text: "Once", score: 8}, {text: "3-4 times", score: 5}, {text: "Constantly sick", score: 2}] },
            { question: "Wound healing?", options: [{text: "Very fast", score: 10}, {text: "Normal", score: 8}, {text: "Slow", score: 5}, {text: "Weeks", score: 2}] },
            { question: "Vitamins?", options: [{text: "Doctor advised", score: 10}, {text: "Healthy diet enough", score: 9}, {text: "Randomly", score: 6}, {text: "None/Bad diet", score: 2}] },
            { question: "Antibiotic usage?", options: [{text: "Years ago", score: 10}, {text: "Once in 2 yrs", score: 8}, {text: "1-2 times/year", score: 5}, {text: "Often", score: 2}] },
            { question: "Cold weather tolerance?", options: [{text: "Good", score: 10}, {text: "Get cold but ok", score: 8}, {text: "Get sick easily", score: 4}, {text: "Can't handle", score: 2}] }
        ],
        tech: [
            { question: "First thing in morning?", options: [{text: "Water/Wash face", score: 10}, {text: "Snooze alarm", score: 8}, {text: "Check notifications", score: 5}, {text: "Scroll social media", score: 2}] },
            { question: "Phone away feeling?", options: [{text: "Free", score: 10}, {text: "Neutral", score: 8}, {text: "Missing something", score: 5}, {text: "Panic", score: 1}] },
            { question: "Screen time?", options: [{text: "<1 hour", score: 10}, {text: "1-3 hours", score: 8}, {text: "3-6 hours", score: 4}, {text: "6+ hours", score: 1}] },
            { question: "Phone while eating?", options: [{text: "Never", score: 10}, {text: "If alone", score: 7}, {text: "Watch videos", score: 4}, {text: "Always", score: 2}] },
            { question: "Screen before sleep?", options: [{text: "Stop 1hr before", score: 10}, {text: "30 mins before", score: 7}, {text: "Until sleep", score: 4}, {text: "Fall asleep with it", score: 1}] }
        ]
    },

    // --- TÜRKÇE ---
    tr: {
        sleep: [
            { question: "Yatağa yattıktan sonra uykuya dalmanız ortalama ne kadar sürer?", options: [{ text: "Hemen (5-10 dakika içinde)", score: 10 }, { text: "Bazen zorlanırım (15-30 dakika)", score: 7 }, { text: "Genelde döner dururum (30-60 dakika)", score: 4 }, { text: "Çok zor, saatlerce uyanık kalırım", score: 1 }] },
            { question: "Gece uykunuz ne sıklıkla bölünür?", options: [{ text: "Hiç, deliksiz uyurum", score: 10 }, { text: "Tuvalet ihtiyacı için 1 kez", score: 8 }, { text: "Hafif seslerde hemen uyanırım", score: 5 }, { text: "Sürekli uyanır ve tekrar uyumakta zorlanırım", score: 2 }] },
            { question: "Sabah uyandığınızda ilk hissettiğiniz şey nedir?", options: [{ text: "Enerjik ve güne hazırım", score: 10 }, { text: "Biraz mahmurum ama hemen açılırım", score: 8 }, { text: "Yorgun ve dayak yemiş gibi", score: 4 }, { text: "Baş ağrısı ve gerginlik", score: 2 }] },
            { question: "Rüyalarınızı ne sıklıkla hatırlarsınız?", options: [{ text: "Genellikle hatırlarım, canlıdır", score: 8 }, { text: "Bazen, parça parça", score: 6 }, { text: "Neredeyse hiç hatırlamam", score: 4 }, { text: "Kabuslarla uyanırım", score: 2 }] },
            { question: "Uyuduğunuz odanın koşulları nasıldır?", options: [{ text: "Zifiri karanlık ve serin (İdeal)", score: 10 }, { text: "Hafif sokak ışığı giriyor", score: 7 }, { text: "Televizyon veya telefon ışığı var", score: 3 }, { text: "Çok sıcak veya gürültülü", score: 1 }] }
        ],
        skin: [
            { question: "Yüzünüzü yıkadıktan 1 saat sonra cildiniz nasıl hisseder?", options: [{ text: "Rahat ve yumuşak", score: 10 }, { text: "T bölgem yağlanır, yanaklarım normal", score: 8 }, { text: "Gergin ve pul pul dökülmeye müsait", score: 4 }, { text: "Aşırı yağlı ve parlak", score: 6 }] },
            { question: "Güneşe çıktığınızda cildinizin tepkisi nedir?", options: [{ text: "Kolayca bronzlaşırım", score: 10 }, { text: "Önce kızarır sonra bronzlaşırım", score: 8 }, { text: "Hemen kızarır ve acır", score: 4 }, { text: "Güneş lekeleri oluşur", score: 5 }] },
            { question: "Sivilce veya akne probleminiz ne sıklıkla olur?", options: [{ text: "Ergenlikten beri hiç olmadı", score: 10 }, { text: "Sadece stresli dönemlerde", score: 7 }, { text: "Sürekli küçük pütürler var", score: 5 }, { text: "Ağrılı ve kistik sivilcelerim var", score: 2 }] },
            { question: "Göz çevrenizde ince çizgiler var mı?", options: [{ text: "Hayır, pürüzsüz", score: 10 }, { text: "Sadece gülerken belli oluyor", score: 8 }, { text: "Evet, belirginleşmeye başladı", score: 5 }, { text: "Derin çizgiler ve kaz ayakları var", score: 3 }] },
            { question: "Günde ne kadar su içersiniz?", options: [{ text: "2.5 Litre ve üzeri", score: 10 }, { text: "1.5 - 2 Litre arası", score: 8 }, { text: "Sadece susadıkça (Az)", score: 5 }, { text: "Neredeyse hiç", score: 2 }] }
        ],
        diet: [
            { question: "Günde kaç öğün yersiniz?", options: [{ text: "3 ana öğün, 1-2 ara öğün", score: 10 }, { text: "Sadece 2 ana öğün (Aralıklı Oruç)", score: 9 }, { text: "Düzensiz, acıktıkça atıştırırım", score: 4 }, { text: "Gece geç saatlerde çok yerim", score: 2 }] },
            { question: "Sebze ve meyve tüketiminiz nasıldır?", options: [{ text: "Her öğünde mutlaka yeşillik vardır", score: 10 }, { text: "Günde en az 1 porsiyon meyve yerim", score: 8 }, { text: "Haftada birkaç kez", score: 5 }, { text: "Sebze sevmem, etçilim", score: 3 }] },
            { question: "Tatlı kriziniz olur mu?", options: [{ text: "Nadiren, canım istemez", score: 10 }, { text: "Yemeklerden sonra ufak bir parça", score: 7 }, { text: "Her gün çikolata/tatlı yerim", score: 4 }, { text: "Durdurulamaz şeker ihtiyacım var", score: 1 }] },
            { question: "Yemekten sonra şişkinlik hisseder misiniz?", options: [{ text: "Hayır, hafif hissederim", score: 10 }, { text: "Bazen, ağır yemeklerden sonra", score: 7 }, { text: "Sık sık gaz ve şişkinlik olur", score: 4 }, { text: "Her yemekten sonra rahatsızım", score: 2 }] },
            { question: "İşlenmiş gıda (cips, bisküvi) tüketiminiz?", options: [{ text: "Evime sokmam", score: 10 }, { text: "Haftada 1-2 kez kaçamak yaparım", score: 7 }, { text: "Pratik olduğu için sık tüketirim", score: 3 }, { text: "Beslenmemin çoğunu oluşturur", score: 1 }] }
        ],
        stress: [
            { question: "Küçük aksiliklere karşı tepkiniz nedir?", options: [{ text: "Sakin kalır, çözüm ararım", score: 10 }, { text: "Biraz sinirlenir ama çabuk geçerim", score: 7 }, { text: "Tüm günüm zehir olur", score: 4 }, { text: "Öfke patlaması yaşarım", score: 2 }] },
            { question: "Dişlerinizi sıktığınızı fark eder misiniz?", options: [{ text: "Hayır", score: 10 }, { text: "Bazen uykuda", score: 6 }, { text: "Evet, çenem sık sık ağrır", score: 4 }, { text: "Diş hekimim plak önerdi", score: 2 }] },
            { question: "Odaklanma sorunu yaşar mısınız?", options: [{ text: "Dikkatim keskindir", score: 10 }, { text: "Bazen dalar giderim", score: 7 }, { text: "Sürekli bir şeyler unuturum", score: 4 }, { text: "Beynim dolu, odaklanamıyorum", score: 2 }] },
            { question: "Gelecek hakkında ne hissediyorsunuz?", options: [{ text: "Umutlu ve heyecanlıyım", score: 10 }, { text: "Planlıyım, kontrol altında", score: 8 }, { text: "Belirsizlik beni endişelendiriyor", score: 5 }, { text: "Sürekli kötü bir şey olacak korkusu", score: 2 }] },
            { question: "Nefes darlığı veya çarpıntı hissi?", options: [{ text: "Spor harici asla olmuyor", score: 10 }, { text: "Heyecanlanınca sadece", score: 8 }, { text: "Durduk yere olduğu oluyor", score: 4 }, { text: "Panik atak geçmişim var", score: 2 }] }
        ],
        heart: [
            { question: "Merdiven çıkarken nefes nefese kalır mısınız?", options: [{ text: "Hayır, koşarak bile çıkarım", score: 10 }, { text: "2-3 kattan sonra biraz", score: 7 }, { text: "Evet, her katta dinlenirim", score: 4 }, { text: "Düz yolda bile zorlanıyorum", score: 2 }] },
            { question: "Ailenizde 50 yaş altı kalp krizi geçmişi var mı?", options: [{ text: "Hayır, bildiğim kadarıyla yok", score: 10 }, { text: "Uzak akrabalarda var", score: 7 }, { text: "Evet, 1. derece akrabamda var", score: 5 }, { text: "Evet, birden çok kişide var", score: 2 }] },
            { question: "Tansiyon değerlerinizi biliyor musunuz?", options: [{ text: "Evet, genelde 12/8 civarı (İdeal)", score: 10 }, { text: "Bazen düşük çıkar", score: 8 }, { text: "Sınırdadır (13-14 civarı)", score: 5 }, { text: "Yüksek tansiyon ilacı kullanıyorum", score: 3 }] },
            { question: "Sigara kullanıyor musunuz?", options: [{ text: "Hayır, asla kullanmadım", score: 10 }, { text: "Bıraktım (5 yıldan fazla oldu)", score: 8 }, { text: "Sosyal içiciyim", score: 5 }, { text: "Evet, düzenli kullanıyorum", score: 1 }] },
            { question: "Göğsünüzde baskı veya ağrı hisseder misiniz?", options: [{ text: "Asla", score: 10 }, { text: "Sadece çok stresliyken", score: 7 }, { text: "Efor sarf edince oluyor", score: 4 }, { text: "Sık sık, dinlenirken bile", score: 1 }] }
        ],
        focus: [
            { question: "Bir işe başladığınızda bitirmekte zorlanır mısınız?", options: [{ text: "Hayır, başladığım işi bitiririm", score: 10 }, { text: "Bazen sıkılıp bırakırım", score: 7 }, { text: "Genelde yarım kalır projelerim", score: 4 }, { text: "Neredeyse hiçbir şeyi bitiremem", score: 2 }] },
            { question: "Biri sizinle konuşurken dinlemekte zorlanır mısınız?", options: [{ text: "Tamamen odaklanırım", score: 10 }, { text: "Göz teması kurarım ama kafa gider", score: 6 }, { text: "Sık sık ne dediklerini tekrar ettiririm", score: 4 }, { text: "Zihnim sürekli başka yerde", score: 2 }] },
            { question: "Eşyalarınızı (anahtar, telefon) sık kaybeder misiniz?", options: [{ text: "Her şeyin yeri bellidir", score: 10 }, { text: "Ayda yılda bir olur", score: 8 }, { text: "Haftada birkaç kez ararım", score: 5 }, { text: "Günde birkaç kez kaybederim", score: 2 }] },
            { question: "Detay gerektiren işlerde hata yapar mısınız?", options: [{ text: "Çok titizimdir, hata yapmam", score: 10 }, { text: "Bazen küçük dikkatsizlikler olur", score: 7 }, { text: "Sık sık gözden kaçırırım", score: 4 }, { text: "Detaylı işlerden kaçarım", score: 2 }] },
            { question: "Sabit durmakta zorlanır mısınız (El ayak oynatma)?", options: [{ text: "Sakin ve durağanım", score: 10 }, { text: "Sadece heyecanlıyken", score: 8 }, { text: "Genelde elim ayağım oynar", score: 5 }, { text: "Yerimde duramam, kıpır kıpırım", score: 2 }] }
        ],
        fitness: [
            { question: "Haftada kaç gün egzersiz yaparsınız?", options: [{ text: "4 gün ve üzeri", score: 10 }, { text: "2-3 gün düzenli", score: 8 }, { text: "Sadece hafta sonları yürüyüş", score: 5 }, { text: "Neredeyse hiç", score: 1 }] },
            { question: "Günlük adım sayınız ortalama kaçtır?", options: [{ text: "10.000 üzeri", score: 10 }, { text: "7.000 - 10.000 arası", score: 8 }, { text: "3.000 - 7.000 arası", score: 5 }, { text: "3.000'den az (Sedanter)", score: 2 }] },
            { question: "Yerden bir şeyi eğilip alırken zorlanır mısınız?", options: [{ text: "Hayır, esneğimdir", score: 10 }, { text: "Biraz dizlerimi kırarım", score: 8 }, { text: "Belim ağrır veya zorlanırım", score: 4 }, { text: "Yardım almadan eğilemem", score: 2 }] },
            { question: "Kas gücünüzü nasıl değerlendirirsiniz?", options: [{ text: "Güçlüyümdür, ağırlık çalışırım", score: 10 }, { text: "Ortalama, kendi işimi görürüm", score: 7 }, { text: "Zayıf hissederim", score: 4 }, { text: "Poşet taşırken bile zorlanırım", score: 2 }] },
            { question: "Masa başı çalışma süreniz nedir?", options: [{ text: "Hareketli bir işim var", score: 10 }, { text: "Masa başı ama sık mola veririm", score: 7 }, { text: "Günde 6-8 saat otururum", score: 4 }, { text: "Günde 10 saatten fazla otururum", score: 1 }] }
        ],
        immunity: [
            { question: "Yılda kaç kez grip veya nezle olursunuz?", options: [{ text: "Neredeyse hiç olmam", score: 10 }, { text: "Yılda 1 kez mevsim geçişinde", score: 8 }, { text: "Yılda 3-4 kez", score: 5 }, { text: "Sürekli hastayım", score: 2 }] },
            { question: "Yaralarınız ne kadar hızlı iyileşir?", options: [{ text: "Çok hızlı, iz kalmaz", score: 10 }, { text: "Normal sürede", score: 8 }, { text: "Yavaş iyileşir", score: 5 }, { text: "Haftalarca kapanmaz", score: 2 }] },
            { question: "Vitamin takviyesi kullanır mısınız?", options: [{ text: "Kan değerlerime göre doktor kontrolünde", score: 10 }, { text: "Düzenli beslenirim gerek kalmaz", score: 9 }, { text: "Aklıma geldikçe alırım", score: 6 }, { text: "Hayır, beslenmem de kötüdür", score: 2 }] },
            { question: "Antibiyotik kullanım sıklığınız nedir?", options: [{ text: "Yıllardır kullanmadım", score: 10 }, { text: "Son 2 yılda 1 kez", score: 8 }, { text: "Yılda 1-2 kez mecbur kalırım", score: 5 }, { text: "Çok sık kullanırım", score: 2 }] },
            { question: "Soğuk havaya karşı direnciniz nasıldır?", options: [{ text: "Etkilenmem", score: 10 }, { text: "Biraz üşürüm ama hasta olmam", score: 8 }, { text: "Hemen şifayı kaparım", score: 4 }, { text: "Soğuğa hiç çıkamam", score: 2 }] }
        ],
        tech: [
            { question: "Sabah uyanınca ilk yaptığınız şey nedir?", options: [{ text: "Yüzümü yıkarım / Su içerim", score: 10 }, { text: "Alarmı kapatır kalkarım", score: 8 }, { text: "Bildirimlere bakarım (5 dk)", score: 5 }, { text: "Yatakta 30 dk sosyal medyaya bakarım", score: 2 }] },
            { question: "Telefonunuz yanınızda olmayınca ne hissedersiniz?", options: [{ text: "Özgür ve rahat", score: 10 }, { text: "Fark etmem bile", score: 8 }, { text: "Biraz eksik hissederim", score: 5 }, { text: "Panik olurum, elim ayağım titrer", score: 1 }] },
            { question: "Günlük ekran süreniz (Telefonda) ortalama ne kadar?", options: [{ text: "1 saatten az", score: 10 }, { text: "1-3 saat arası", score: 8 }, { text: "3-6 saat arası", score: 4 }, { text: "6 saat ve üzeri", score: 1 }] },
            { question: "Yemek yerken telefonla ilgilenir misiniz?", options: [{ text: "Asla, yemeğe ve sohbete odaklanırım", score: 10 }, { text: "Tek başınaysam bazen", score: 7 }, { text: "Genelde bir şeyler izlerim", score: 4 }, { text: "Telefon elimden düşmez", score: 2 }] },
            { question: "Gece yatmadan önce en son ne zaman ekrana bakarsınız?", options: [{ text: "1 saat önce bırakırım", score: 10 }, { text: "30 dakika önce", score: 7 }, { text: "Yatana kadar bakarım", score: 4 }, { text: "Telefon elimde uyuyakalırım", score: 1 }] }
        ]
    }
};
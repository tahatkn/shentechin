const allQuizzes = {
    // --- MEVCUT 4 KATEGORİ ---
    sleep: [
        {
            question: "Yatağa yattıktan sonra uykuya dalmanız ortalama ne kadar sürer?",
            options: [
                { text: "Hemen (5-10 dakika içinde)", score: 10 },
                { text: "Bazen zorlanırım (15-30 dakika)", score: 7 },
                { text: "Genelde döner dururum (30-60 dakika)", score: 4 },
                { text: "Çok zor, saatlerce uyanık kalırım", score: 1 }
            ]
        },
        {
            question: "Gece uykunuz ne sıklıkla bölünür?",
            options: [
                { text: "Hiç, deliksiz uyurum", score: 10 },
                { text: "Tuvalet ihtiyacı için 1 kez", score: 8 },
                { text: "Hafif seslerde hemen uyanırım", score: 5 },
                { text: "Sürekli uyanır ve tekrar uyumakta zorlanırım", score: 2 }
            ]
        },
        {
            question: "Sabah uyandığınızda ilk hissettiğiniz şey nedir?",
            options: [
                { text: "Enerjik ve güne hazırım", score: 10 },
                { text: "Biraz mahmurum ama hemen açılırım", score: 8 },
                { text: "Yorgun ve dayak yemiş gibi", score: 4 },
                { text: "Baş ağrısı ve gerginlik", score: 2 }
            ]
        },
        {
            question: "Rüyalarınızı ne sıklıkla hatırlarsınız?",
            options: [
                { text: "Genellikle hatırlarım, canlıdır", score: 8 },
                { text: "Bazen, parça parça", score: 6 },
                { text: "Neredeyse hiç hatırlamam", score: 4 },
                { text: "Kabuslarla uyanırım", score: 2 }
            ]
        },
        {
            question: "Uyuduğunuz odanın koşulları nasıldır?",
            options: [
                { text: "Zifiri karanlık ve serin (İdeal)", score: 10 },
                { text: "Hafif sokak ışığı giriyor", score: 7 },
                { text: "Televizyon veya telefon ışığı var", score: 3 },
                { text: "Çok sıcak veya gürültülü", score: 1 }
            ]
        }
    ],
    skin: [
        {
            question: "Yüzünüzü yıkadıktan 1 saat sonra cildiniz nasıl hisseder?",
            options: [
                { text: "Rahat ve yumuşak", score: 10 },
                { text: "T bölgem yağlanır, yanaklarım normal", score: 8 },
                { text: "Gergin ve pul pul dökülmeye müsait", score: 4 },
                { text: "Aşırı yağlı ve parlak", score: 6 }
            ]
        },
        {
            question: "Güneşe çıktığınızda cildinizin tepkisi nedir?",
            options: [
                { text: "Kolayca bronzlaşırım", score: 10 },
                { text: "Önce kızarır sonra bronzlaşırım", score: 8 },
                { text: "Hemen kızarır ve acır", score: 4 },
                { text: "Güneş lekeleri oluşur", score: 5 }
            ]
        },
        {
            question: "Sivilce veya akne probleminiz ne sıklıkla olur?",
            options: [
                { text: "Ergenlikten beri hiç olmadı", score: 10 },
                { text: "Sadece stresli dönemlerde", score: 7 },
                { text: "Sürekli küçük pütürler var", score: 5 },
                { text: "Ağrılı ve kistik sivilcelerim var", score: 2 }
            ]
        },
        {
            question: "Göz çevrenizde ince çizgiler var mı?",
            options: [
                { text: "Hayır, pürüzsüz", score: 10 },
                { text: "Sadece gülerken belli oluyor", score: 8 },
                { text: "Evet, belirginleşmeye başladı", score: 5 },
                { text: "Derin çizgiler ve kaz ayakları var", score: 3 }
            ]
        },
        {
            question: "Günde ne kadar su içersiniz?",
            options: [
                { text: "2.5 Litre ve üzeri", score: 10 },
                { text: "1.5 - 2 Litre arası", score: 8 },
                { text: "Sadece susadıkça (Az)", score: 5 },
                { text: "Neredeyse hiç", score: 2 }
            ]
        }
    ],
    diet: [
        {
            question: "Günde kaç öğün yersiniz?",
            options: [
                { text: "3 ana öğün, 1-2 ara öğün", score: 10 },
                { text: "Sadece 2 ana öğün (Aralıklı Oruç)", score: 9 },
                { text: "Düzensiz, acıktıkça atıştırırım", score: 4 },
                { text: "Gece geç saatlerde çok yerim", score: 2 }
            ]
        },
        {
            question: "Sebze ve meyve tüketiminiz nasıldır?",
            options: [
                { text: "Her öğünde mutlaka yeşillik vardır", score: 10 },
                { text: "Günde en az 1 porsiyon meyve yerim", score: 8 },
                { text: "Haftada birkaç kez", score: 5 },
                { text: "Sebze sevmem, etçilim", score: 3 }
            ]
        },
        {
            question: "Tatlı kriziniz olur mu?",
            options: [
                { text: "Nadiren, canım istemez", score: 10 },
                { text: "Yemeklerden sonra ufak bir parça", score: 7 },
                { text: "Her gün çikolata/tatlı yerim", score: 4 },
                { text: "Durdurulamaz şeker ihtiyacım var", score: 1 }
            ]
        },
        {
            question: "Yemekten sonra şişkinlik hisseder misiniz?",
            options: [
                { text: "Hayır, hafif hissederim", score: 10 },
                { text: "Bazen, ağır yemeklerden sonra", score: 7 },
                { text: "Sık sık gaz ve şişkinlik olur", score: 4 },
                { text: "Her yemekten sonra rahatsızım", score: 2 }
            ]
        },
        {
            question: "İşlenmiş gıda (cips, bisküvi) tüketiminiz?",
            options: [
                { text: "Evime sokmam", score: 10 },
                { text: "Haftada 1-2 kez kaçamak yaparım", score: 7 },
                { text: "Pratik olduğu için sık tüketirim", score: 3 },
                { text: "Beslenmemin çoğunu oluşturur", score: 1 }
            ]
        }
    ],
    stress: [
        {
            question: "Küçük aksiliklere karşı tepkiniz nedir?",
            options: [
                { text: "Sakin kalır, çözüm ararım", score: 10 },
                { text: "Biraz sinirlenir ama çabuk geçerim", score: 7 },
                { text: "Tüm günüm zehir olur", score: 4 },
                { text: "Öfke patlaması yaşarım", score: 2 }
            ]
        },
        {
            question: "Dişlerinizi sıktığınızı fark eder misiniz?",
            options: [
                { text: "Hayır", score: 10 },
                { text: "Bazen uykuda", score: 6 },
                { text: "Evet, çenem sık sık ağrır", score: 4 },
                { text: "Diş hekimim plak önerdi", score: 2 }
            ]
        },
        {
            question: "Odaklanma sorunu yaşar mısınız?",
            options: [
                { text: "Dikkatim keskindir", score: 10 },
                { text: "Bazen dalar giderim", score: 7 },
                { text: "Sürekli bir şeyler unuturum", score: 4 },
                { text: "Beynim dolu, odaklanamıyorum", score: 2 }
            ]
        },
        {
            question: "Gelecek hakkında ne hissediyorsunuz?",
            options: [
                { text: "Umutlu ve heyecanlıyım", score: 10 },
                { text: "Planlıyım, kontrol altında", score: 8 },
                { text: "Belirsizlik beni endişelendiriyor", score: 5 },
                { text: "Sürekli kötü bir şey olacak korkusu", score: 2 }
            ]
        },
        {
            question: "Nefes darlığı veya çarpıntı hissi?",
            options: [
                { text: "Spor harici asla olmuyor", score: 10 },
                { text: "Heyecanlanınca sadece", score: 8 },
                { text: "Durduk yere olduğu oluyor", score: 4 },
                { text: "Panik atak geçmişim var", score: 2 }
            ]
        }
    ],

    // --- YENİ EKLENEN 5 KATEGORİ ---

    // 5. KALP SAĞLIĞI
    heart: [
        {
            question: "Merdiven çıkarken nefes nefese kalır mısınız?",
            options: [
                { text: "Hayır, koşarak bile çıkarım", score: 10 },
                { text: "2-3 kattan sonra biraz", score: 7 },
                { text: "Evet, her katta dinlenirim", score: 4 },
                { text: "Düz yolda bile zorlanıyorum", score: 2 }
            ]
        },
        {
            question: "Ailenizde 50 yaş altı kalp krizi geçmişi var mı?",
            options: [
                { text: "Hayır, bildiğim kadarıyla yok", score: 10 },
                { text: "Uzak akrabalarda var", score: 7 },
                { text: "Evet, 1. derece akrabamda var", score: 5 },
                { text: "Evet, birden çok kişide var", score: 2 }
            ]
        },
        {
            question: "Tansiyon değerlerinizi biliyor musunuz?",
            options: [
                { text: "Evet, genelde 12/8 civarı (İdeal)", score: 10 },
                { text: "Bazen düşük çıkar", score: 8 },
                { text: "Sınırdadır (13-14 civarı)", score: 5 },
                { text: "Yüksek tansiyon ilacı kullanıyorum", score: 3 }
            ]
        },
        {
            question: "Sigara kullanıyor musunuz?",
            options: [
                { text: "Hayır, asla kullanmadım", score: 10 },
                { text: "Bıraktım (5 yıldan fazla oldu)", score: 8 },
                { text: "Sosyal içiciyim", score: 5 },
                { text: "Evet, düzenli kullanıyorum", score: 1 }
            ]
        },
        {
            question: "Göğsünüzde baskı veya ağrı hisseder misiniz?",
            options: [
                { text: "Asla", score: 10 },
                { text: "Sadece çok stresliyken", score: 7 },
                { text: "Efor sarf edince oluyor", score: 4 },
                { text: "Sık sık, dinlenirken bile", score: 1 }
            ]
        }
    ],

    // 6. ODAKLANMA (DEHB)
    focus: [
        {
            question: "Bir işe başladığınızda bitirmekte zorlanır mısınız?",
            options: [
                { text: "Hayır, başladığım işi bitiririm", score: 10 },
                { text: "Bazen sıkılıp bırakırım", score: 7 },
                { text: "Genelde yarım kalır projelerim", score: 4 },
                { text: "Neredeyse hiçbir şeyi bitiremem", score: 2 }
            ]
        },
        {
            question: "Biri sizinle konuşurken dinlemekte zorlanır mısınız?",
            options: [
                { text: "Tamamen odaklanırım", score: 10 },
                { text: "Göz teması kurarım ama kafa gider", score: 6 },
                { text: "Sık sık ne dediklerini tekrar ettiririm", score: 4 },
                { text: "Zihnim sürekli başka yerde", score: 2 }
            ]
        },
        {
            question: "Eşyalarınızı (anahtar, telefon) sık kaybeder misiniz?",
            options: [
                { text: "Her şeyin yeri bellidir", score: 10 },
                { text: "Ayda yılda bir olur", score: 8 },
                { text: "Haftada birkaç kez ararım", score: 5 },
                { text: "Günde birkaç kez kaybederim", score: 2 }
            ]
        },
        {
            question: "Detay gerektiren işlerde hata yapar mısınız?",
            options: [
                { text: "Çok titizimdir, hata yapmam", score: 10 },
                { text: "Bazen küçük dikkatsizlikler olur", score: 7 },
                { text: "Sık sık gözden kaçırırım", score: 4 },
                { text: "Detaylı işlerden kaçarım", score: 2 }
            ]
        },
        {
            question: "Sabit durmakta zorlanır mısınız (El ayak oynatma)?",
            options: [
                { text: "Sakin ve durağanım", score: 10 },
                { text: "Sadece heyecanlıyken", score: 8 },
                { text: "Genelde elim ayağım oynar", score: 5 },
                { text: "Yerimde duramam, kıpır kıpırım", score: 2 }
            ]
        }
    ],

    // 7. FİZİKSEL AKTİVİTE
    fitness: [
        {
            question: "Haftada kaç gün egzersiz yaparsınız?",
            options: [
                { text: "4 gün ve üzeri", score: 10 },
                { text: "2-3 gün düzenli", score: 8 },
                { text: "Sadece hafta sonları yürüyüş", score: 5 },
                { text: "Neredeyse hiç", score: 1 }
            ]
        },
        {
            question: "Günlük adım sayınız ortalama kaçtır?",
            options: [
                { text: "10.000 üzeri", score: 10 },
                { text: "7.000 - 10.000 arası", score: 8 },
                { text: "3.000 - 7.000 arası", score: 5 },
                { text: "3.000'den az (Sedanter)", score: 2 }
            ]
        },
        {
            question: "Yerden bir şeyi eğilip alırken zorlanır mısınız?",
            options: [
                { text: "Hayır, esneğimdir", score: 10 },
                { text: "Biraz dizlerimi kırarım", score: 8 },
                { text: "Belim ağrır veya zorlanırım", score: 4 },
                { text: "Yardım almadan eğilemem", score: 2 }
            ]
        },
        {
            question: "Kas gücünüzü nasıl değerlendirirsiniz?",
            options: [
                { text: "Güçlüyümdür, ağırlık çalışırım", score: 10 },
                { text: "Ortalama, kendi işimi görürüm", score: 7 },
                { text: "Zayıf hissederim", score: 4 },
                { text: "Poşet taşırken bile zorlanırım", score: 2 }
            ]
        },
        {
            question: "Masa başı çalışma süreniz nedir?",
            options: [
                { text: "Hareketli bir işim var", score: 10 },
                { text: "Masa başı ama sık mola veririm", score: 7 },
                { text: "Günde 6-8 saat otururum", score: 4 },
                { text: "Günde 10 saatten fazla otururum", score: 1 }
            ]
        }
    ],

    // 8. BAĞIŞIKLIK
    immunity: [
        {
            question: "Yılda kaç kez grip veya nezle olursunuz?",
            options: [
                { text: "Neredeyse hiç olmam", score: 10 },
                { text: "Yılda 1 kez mevsim geçişinde", score: 8 },
                { text: "Yılda 3-4 kez", score: 5 },
                { text: "Sürekli hastayım", score: 2 }
            ]
        },
        {
            question: "Yaralarınız ne kadar hızlı iyileşir?",
            options: [
                { text: "Çok hızlı, iz kalmaz", score: 10 },
                { text: "Normal sürede", score: 8 },
                { text: "Yavaş iyileşir", score: 5 },
                { text: "Haftalarca kapanmaz", score: 2 }
            ]
        },
        {
            question: "Vitamin takviyesi kullanır mısınız?",
            options: [
                { text: "Kan değerlerime göre doktor kontrolünde", score: 10 },
                { text: "Düzenli beslenirim gerek kalmaz", score: 9 },
                { text: "Aklıma geldikçe alırım", score: 6 },
                { text: "Hayır, beslenmem de kötüdür", score: 2 }
            ]
        },
        {
            question: "Antibiyotik kullanım sıklığınız nedir?",
            options: [
                { text: "Yıllardır kullanmadım", score: 10 },
                { text: "Son 2 yılda 1 kez", score: 8 },
                { text: "Yılda 1-2 kez mecbur kalırım", score: 5 },
                { text: "Çok sık kullanırım", score: 2 }
            ]
        },
        {
            question: "Soğuk havaya karşı direnciniz nasıldır?",
            options: [
                { text: "Etkilenmem", score: 10 },
                { text: "Biraz üşürüm ama hasta olmam", score: 8 },
                { text: "Hemen şifayı kaparım", score: 4 },
                { text: "Soğuğa hiç çıkamam", score: 2 }
            ]
        }
    ],

    // 9. TEKNOLOJİ BAĞIMLILIĞI
    tech: [
        {
            question: "Sabah uyanınca ilk yaptığınız şey nedir?",
            options: [
                { text: "Yüzümü yıkarım / Su içerim", score: 10 },
                { text: "Alarmı kapatır kalkarım", score: 8 },
                { text: "Bildirimlere bakarım (5 dk)", score: 5 },
                { text: "Yatakta 30 dk sosyal medyaya bakarım", score: 2 }
            ]
        },
        {
            question: "Telefonunuz yanınızda olmayınca ne hissedersiniz?",
            options: [
                { text: "Özgür ve rahat", score: 10 },
                { text: "Fark etmem bile", score: 8 },
                { text: "Biraz eksik hissederim", score: 5 },
                { text: "Panik olurum, elim ayağım titrer", score: 1 }
            ]
        },
        {
            question: "Günlük ekran süreniz (Telefonda) ortalama ne kadar?",
            options: [
                { text: "1 saatten az", score: 10 },
                { text: "1-3 saat arası", score: 8 },
                { text: "3-6 saat arası", score: 4 },
                { text: "6 saat ve üzeri", score: 1 }
            ]
        },
        {
            question: "Yemek yerken telefonla ilgilenir misiniz?",
            options: [
                { text: "Asla, yemeğe ve sohbete odaklanırım", score: 10 },
                { text: "Tek başınaysam bazen", score: 7 },
                { text: "Genelde bir şeyler izlerim", score: 4 },
                { text: "Telefon elimden düşmez", score: 2 }
            ]
        },
        {
            question: "Gece yatmadan önce en son ne zaman ekrana bakarsınız?",
            options: [
                { text: "1 saat önce bırakırım", score: 10 },
                { text: "30 dakika önce", score: 7 },
                { text: "Yatana kadar bakarım", score: 4 },
                { text: "Telefon elimde uyuyakalırım", score: 1 }
            ]
        }
    ]
};
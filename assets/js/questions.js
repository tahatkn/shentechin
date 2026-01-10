// Tüm test kategorilerini barındıran ana obje
const allQuizzes = {
    // 1. UYKU TESTİ
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

    // 2. CİLT (DERMATOLOJİ) TESTİ
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
                { text: "Sadece stresli dönemlerde veya özel günlerde", score: 7 },
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
                { text: "Neredeyse hiç, çay/kahve içerim", score: 2 }
            ]
        }
    ],

    // 3. BESLENME (DİYET) TESTİ
    diet: [
        {
            question: "Günde kaç öğün yersiniz?",
            options: [
                { text: "3 ana öğün, 1-2 ara öğün (Düzenli)", score: 10 },
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
            question: "İşlenmiş gıda (cips, bisküvi, salam) tüketiminiz?",
            options: [
                { text: "Evime sokmam", score: 10 },
                { text: "Haftada 1-2 kez kaçamak yaparım", score: 7 },
                { text: "Pratik olduğu için sık tüketirim", score: 3 },
                { text: "Beslenmemin çoğunu oluşturur", score: 1 }
            ]
        }
    ],

    // 4. STRES TESTİ
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
                { text: "Beynim dolu, hiçbir şeye odaklanamıyorum", score: 2 }
            ]
        },
        {
            question: "Gelecek hakkında ne hissediyorsunuz?",
            options: [
                { text: "Umutlu ve heyecanlıyım", score: 10 },
                { text: "Planlıyım, kontrol altında", score: 8 },
                { text: "Belirsizlik beni endişelendiriyor", score: 5 },
                { text: "Sürekli kötü bir şey olacak korkusu var", score: 2 }
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
    ]
};
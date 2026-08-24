/* Her test için sonuç bant metinleri.
   Kasıtlı olarak teşhis dili içermez ve kaynağı olmayan sayısal risk iddiası
   ("2.1 kat", "%40 azalır" gibi) kullanmaz. Bunlar öz-değerlendirme
   yorumlarıdır. Sonuç sayfası bu metinleri derleme sırasında gömer. */

export const RESULT_TEXTS = {
  "en": {
    "sleep": {
      "name": "Sleep Quality",
      "bands": {
        "good": {
          "label": "Consistent sleep pattern",
          "text": "Your answers describe a regular schedule, a sleep-friendly bedroom and mornings where you wake up reasonably rested. The habits that most often wreck sleep — late caffeine, screens in bed, a bedtime that moves around — don't seem to dominate your routine. Consistency is the part doing most of the work here, so protect it."
        },
        "mid": {
          "label": "Mixed sleep pattern",
          "text": "Some of your habits support good sleep and others work against it. In this range the usual culprits are an irregular bedtime, evening screen use, and caffeine drunk too late in the day. Pick <strong>one</strong> of those three and hold it steady for two weeks rather than changing everything at once."
        },
        "low": {
          "label": "Disrupted sleep pattern",
          "text": "Your answers point to sleep that is short, broken or unrefreshing, alongside several habits that tend to make it worse. Start with the two things that cost nothing: a fixed wake-up time every day, and a dark, cool, quiet bedroom. If snoring, breathing pauses or heavy daytime sleepiness are part of your picture, raise it with a doctor rather than waiting it out."
        }
      }
    },
    "skin": {
      "name": "Skin Profile",
      "bands": {
        "good": {
          "label": "Protective skin habits",
          "text": "Sun protection, a routine you actually stick to, and low exposure to the usual irritants — that combination is most of what skincare can do for you. Your answers suggest your barrier is not under constant strain. The main thing to keep doing is daily sunscreen."
        },
        "mid": {
          "label": "Some strain on the skin",
          "text": "Your answers show a mix: parts of your routine help, while sun exposure, irregular cleansing or frequent irritation pull the other way. Consistency beats the number of products — a simple routine done daily generally outperforms an elaborate one done occasionally."
        },
        "low": {
          "label": "Skin under noticeable strain",
          "text": "Several answers point to an irritated or poorly protected skin barrier: little sun protection, frequent breakouts or redness, sleeping in makeup, or over-exfoliating. Strip the routine back to cleanse, moisturise and sunscreen for a few weeks. Persistent acne, rosacea or eczema is worth showing to a dermatologist — those respond to treatment, not to more products."
        }
      }
    },
    "diet": {
      "name": "Nutrition Habits",
      "bands": {
        "good": {
          "label": "Steady eating pattern",
          "text": "Regular meals, a decent amount of vegetables and fruit, home cooking and limited ultra-processed food — that is the pattern most nutrition advice is trying to get people to. Your answers sit close to it. No overhaul needed."
        },
        "mid": {
          "label": "Mixed eating pattern",
          "text": "The basics are partly in place, but irregular meals, sugary drinks, late-night eating or frequent snacking are pulling against them. The highest-yield change in this range is usually the simplest one: make breakfast and lunch predictable so the evening stops doing the compensating."
        },
        "low": {
          "label": "Irregular eating pattern",
          "text": "Your answers describe frequent skipped meals, a lot of processed food or sugary drinks, and eating driven by stress or convenience rather than hunger. Rather than starting a diet, start with structure: three predictable meals, water instead of sugary drinks, and vegetables at two of them. If you have ongoing digestive symptoms or a history of yo-yo dieting, a dietitian is a better investment than another plan."
        }
      }
    },
    "stress": {
      "name": "Stress Load",
      "bands": {
        "good": {
          "label": "Manageable stress load",
          "text": "You report being able to switch off, recover after a setback, and having people to talk to. Those are the things that make stress survivable, and your answers suggest they're present. Keep the recovery habits — they're easiest to drop precisely when they're needed most."
        },
        "mid": {
          "label": "Elevated stress load",
          "text": "You're carrying a meaningful load and the recovery side isn't fully keeping up. Physical signs — jaw clenching, muscle tension, trouble relaxing — usually show up in this range before anything else does. Protecting one genuinely off-duty block in your week tends to help more than any technique."
        },
        "low": {
          "label": "High stress load",
          "text": "Your answers describe sustained pressure with little recovery: trouble relaxing, physical symptoms, and a sense of things being out of control. This is a load worth talking to someone about — a GP, a psychologist, or at minimum someone close to you. If panic attacks, persistent low mood or burnout are part of it, please treat that as a reason to seek help rather than something to manage alone."
        }
      }
    },
    "heart": {
      "name": "Heart Health Habits",
      "bands": {
        "good": {
          "label": "Heart-friendly habits",
          "text": "Regular movement, no smoking, attention to blood pressure and a diet that isn't dominated by fried or very salty food — your answers line up with the habits cardiologists spend most of their time asking people to adopt. Routine check-ups remain worth keeping."
        },
        "mid": {
          "label": "Mixed cardiovascular habits",
          "text": "Some protective habits are in place, but long sitting hours, salt, sugar or limited cardio are working against them. In this range the single most effective change is usually adding regular aerobic activity — brisk walking counts."
        },
        "low": {
          "label": "Several risk-linked habits",
          "text": "Your answers include a number of habits associated with cardiovascular strain: little activity, smoking, high salt or sugar intake, short sleep, or high stress. Symptoms such as chest tightness, palpitations, breathlessness on mild effort or swollen ankles are <strong>not</strong> things to interpret with a quiz — see a doctor about those directly. Family history plus these habits is a good reason to have blood pressure and cholesterol checked."
        }
      }
    },
    "focus": {
      "name": "Focus & Attention",
      "bands": {
        "good": {
          "label": "Focus holds well",
          "text": "You can stay with a task, finish what you start, and keep track of your commitments. Your answers don't suggest attention is a bottleneck for you. If you want more out of it, the gains are usually in the environment — fewer interruptions — rather than in willpower."
        },
        "mid": {
          "label": "Focus is fragmented",
          "text": "You can concentrate, but it breaks easily: task-switching, procrastination and losing the thread mid-task show up across your answers. Most of this responds to structure rather than effort — one task visible at a time, notifications off during deep work, and a fixed shutdown point in the day."
        },
        "low": {
          "label": "Attention is a persistent struggle",
          "text": "Your answers describe difficulty across several areas at once: starting and finishing tasks, sitting still, remembering commitments, and being pulled off course easily. That combination has many possible explanations — chronic sleep debt and high stress are common ones, and so is ADHD, which is diagnosable and treatable. A quiz cannot tell you which. If this has been true since childhood and affects work or relationships, it's worth a proper assessment by a clinician."
        }
      }
    },
    "fitness": {
      "name": "Physical Condition",
      "bands": {
        "good": {
          "label": "Active and conditioned",
          "text": "Regular exercise, decent strength and mobility, and a body you use rather than sit in — your answers describe someone in good working order. The main risk in this range is injury from doing too much too fast, so keep recovery in the plan."
        },
        "mid": {
          "label": "Moderately active",
          "text": "You move, but not consistently enough for it to compound. Long sitting hours and skipped stretching are the usual pattern here. Two things move the needle fastest: a short daily walk, and breaking up long sitting blocks — even standing up every hour makes a measurable difference to how you feel."
        },
        "low": {
          "label": "Largely sedentary",
          "text": "Your answers point to little regular activity, long sitting hours and reduced strength, flexibility or stamina. The good news is that the first improvements come quickly at this starting point. Begin with walking — daily, unhurried, and long enough to be a habit — before anything more ambitious. If back pain or breathlessness limits you, get that looked at first rather than pushing through it."
        }
      }
    },
    "immunity": {
      "name": "Immune Resilience",
      "bands": {
        "good": {
          "label": "Good baseline resilience",
          "text": "Adequate sleep, regular movement, a reasonable diet and low smoking exposure — your answers describe the conditions under which an immune system works well. There is no supplement that outperforms this list."
        },
        "mid": {
          "label": "Some strain on resilience",
          "text": "Frequent tiredness, patchy sleep or ongoing stress are showing up alongside otherwise sensible habits. Sleep is usually the highest-leverage item in this range, ahead of anything you can buy in a pharmacy."
        },
        "low": {
          "label": "Resilience under strain",
          "text": "Your answers point to frequent infections, persistent fatigue and habits that make recovery harder. Sleep, food and stress are the levers worth pulling first. But note: persistent fatigue, frequent infections, slow-healing wounds or known autoimmune conditions all deserve a doctor's assessment rather than self-management — some of these have specific, treatable causes."
        }
      }
    },
    "tech": {
      "name": "Digital Balance",
      "bands": {
        "good": {
          "label": "Technology stays in its place",
          "text": "You can leave the phone alone, watch something without checking it, and don't feel pulled by notifications. Your answers suggest technology is a tool for you rather than a reflex. Sleep is where this usually pays off most."
        },
        "mid": {
          "label": "Technology takes more than you'd like",
          "text": "Reflexive checking, losing time online and screens near bedtime show up in your answers. The most effective single change is almost always the same: charge the phone outside the bedroom. It removes the last hour and the first hour of the day from the loop at once."
        },
        "low": {
          "label": "Technology is dominating the day",
          "text": "Your answers describe constant checking, difficulty disconnecting, physical effects like eye strain or neck pain, and a mood that tracks what happens on a screen. Start with the boundaries that are easiest to enforce: no phone in the bedroom, notifications off by default, and one genuinely offline block each week. If social media use is consistently making you feel worse about yourself, that is a good enough reason on its own to change how you use it."
        }
      }
    }
  },
  "tr": {
    "sleep": {
      "name": "Uyku Kalitesi",
      "bands": {
        "good": {
          "label": "Düzenli uyku düzeni",
          "text": "Cevaplarınız düzenli bir uyku saatini, uykuya elverişli bir yatak odasını ve makul ölçüde dinlenmiş uyanılan sabahları anlatıyor. Uykuyu en çok bozan alışkanlıklar — geç kafein, yatakta ekran, sürekli kayan yatış saati — rutininize hâkim görünmüyor. Buradaki asıl işi düzen yapıyor; onu koruyun."
        },
        "mid": {
          "label": "Karışık uyku düzeni",
          "text": "Alışkanlıklarınızın bir kısmı uykuyu destekliyor, bir kısmı ise ona karşı çalışıyor. Bu aralıkta olağan şüpheliler şunlardır: kayan yatış saati, akşam ekran kullanımı ve günün geç saatinde içilen kafein. Hepsini birden değiştirmek yerine <strong>birini</strong> seçin ve iki hafta boyunca sabit tutun."
        },
        "low": {
          "label": "Bozulmuş uyku düzeni",
          "text": "Cevaplarınız kısa, bölünmüş ya da dinlendirmeyen bir uykuya ve bunu kötüleştiren birkaç alışkanlığa işaret ediyor. Hiçbir maliyeti olmayan iki şeyle başlayın: her gün sabit bir kalkış saati ve karanlık, serin, sessiz bir yatak odası. Horlama, nefes durması veya gün içinde ağır uyku hâli tabloya dâhilse, geçmesini beklemek yerine bir hekime danışın."
        }
      }
    },
    "skin": {
      "name": "Cilt Profili",
      "bands": {
        "good": {
          "label": "Koruyucu cilt alışkanlıkları",
          "text": "Güneşten korunma, gerçekten sürdürdüğünüz bir rutin ve tahriş edicilere düşük maruziyet — cilt bakımının yapabileceğinin büyük kısmı zaten bu. Cevaplarınız cilt bariyerinizin sürekli baskı altında olmadığını gösteriyor. Sürdürmeniz gereken asıl şey günlük güneş kremi."
        },
        "mid": {
          "label": "Cilt üzerinde bir miktar baskı",
          "text": "Cevaplarınız karışık bir tablo çiziyor: rutininizin bir kısmı işe yarıyor, güneş maruziyeti, düzensiz temizlik ya da sık tahriş ise ters yönde çekiyor. Ürün sayısından çok süreklilik belirleyici — her gün uygulanan sade bir rutin, ara sıra uygulanan gösterişli bir rutinden genellikle daha iyi sonuç verir."
        },
        "low": {
          "label": "Cilt belirgin baskı altında",
          "text": "Birkaç cevabınız tahriş olmuş veya yeterince korunmayan bir cilt bariyerine işaret ediyor: az güneş koruması, sık sivilce veya kızarıklık, makyajla uyumak ya da aşırı peeling. Rutini birkaç haftalığına temizleme, nemlendirme ve güneş kremine indirin. Geçmeyen akne, rozase veya egzamayı bir dermatoloğa göstermek gerekir; bunlar tedaviye yanıt verir, daha fazla ürüne değil."
        }
      }
    },
    "diet": {
      "name": "Beslenme Alışkanlıkları",
      "bands": {
        "good": {
          "label": "Oturmuş beslenme düzeni",
          "text": "Düzenli öğünler, yeterli sebze ve meyve, ev yemeği ve sınırlı işlenmiş gıda — beslenme önerilerinin insanları getirmeye çalıştığı nokta tam olarak burası. Cevaplarınız bu tabloya yakın duruyor. Köklü bir değişikliğe gerek yok."
        },
        "mid": {
          "label": "Karışık beslenme düzeni",
          "text": "Temel taşlar kısmen yerinde ama düzensiz öğünler, şekerli içecekler, gece geç yemek veya sık atıştırma ters yönde çekiyor. Bu aralıkta en çok işe yarayan değişiklik genelde en basit olanı: kahvaltı ve öğle yemeğini öngörülebilir hâle getirin ki akşam telafi etmek zorunda kalmasın."
        },
        "low": {
          "label": "Düzensiz beslenme düzeni",
          "text": "Cevaplarınız sık atlanan öğünleri, bolca işlenmiş gıda veya şekerli içeceği ve açlıktan çok stres ya da pratiklikle yönlenen bir yeme biçimini anlatıyor. Diyete başlamak yerine düzenle başlayın: öngörülebilir üç öğün, şekerli içecek yerine su ve bunların ikisinde sebze. Süregelen sindirim şikâyetleriniz veya sık diyet-geri alma döngünüz varsa, bir diyetisyen yeni bir plandan daha iyi bir yatırımdır."
        }
      }
    },
    "stress": {
      "name": "Stres Yükü",
      "bands": {
        "good": {
          "label": "Yönetilebilir stres yükü",
          "text": "Kafanızı kapatabildiğinizi, bir aksilik sonrası toparlanabildiğinizi ve konuşacak insanlarınız olduğunu belirtiyorsunuz. Stresi taşınabilir kılan şeyler bunlardır ve cevaplarınız bunların yerinde olduğunu gösteriyor. Toparlanma alışkanlıklarınızı koruyun — tam da en çok ihtiyaç duyulduğu anda bırakılmaları en kolay olanlardır."
        },
        "mid": {
          "label": "Yükselmiş stres yükü",
          "text": "Ciddi bir yük taşıyorsunuz ve toparlanma tarafı buna tam yetişemiyor. Bu aralıkta fiziksel işaretler — çene sıkma, kas gerginliği, gevşeyememe — genellikle her şeyden önce ortaya çıkar. Haftanızda gerçekten görev dışı tek bir blok korumak, çoğu teknikten daha fazla işe yarar."
        },
        "low": {
          "label": "Yüksek stres yükü",
          "text": "Cevaplarınız toparlanmaya yer bırakmayan sürekli bir baskıyı anlatıyor: gevşeyememe, fiziksel belirtiler ve kontrolün elden çıktığı hissi. Bu, biriyle konuşmayı hak eden bir yük — bir hekim, bir psikolog ya da en azından size yakın biri. Panik atak, süregelen çökkünlük veya tükenmişlik tablonun parçasıysa, bunu tek başına yönetilecek bir şey değil, destek alma gerekçesi olarak görün."
        }
      }
    },
    "heart": {
      "name": "Kalp Sağlığı Alışkanlıkları",
      "bands": {
        "good": {
          "label": "Kalbe dost alışkanlıklar",
          "text": "Düzenli hareket, sigarasızlık, tansiyon takibi ve kızartma ile tuzun hâkim olmadığı bir beslenme — cevaplarınız kardiyologların hastalarına en çok önerdiği alışkanlıklarla örtüşüyor. Rutin kontrolleri sürdürmek yine de değerli."
        },
        "mid": {
          "label": "Karışık kardiyovasküler alışkanlıklar",
          "text": "Bazı koruyucu alışkanlıklar yerinde ama uzun oturma saatleri, tuz, şeker veya sınırlı kardiyo ters yönde çalışıyor. Bu aralıkta en etkili tek değişiklik genellikle düzenli aerobik aktivite eklemek — tempolu yürüyüş de sayılır."
        },
        "low": {
          "label": "Riskle ilişkili birkaç alışkanlık",
          "text": "Cevaplarınız kalp-damar sistemini zorlayan birkaç alışkanlık içeriyor: az hareket, sigara, yüksek tuz veya şeker, kısa uyku ya da yüksek stres. Göğüste sıkışma, çarpıntı, hafif eforda nefes darlığı veya ayak bileklerinde şişme gibi belirtiler bir testle yorumlanacak şeyler <strong>değildir</strong>; bunlar için doğrudan hekime başvurun. Ailede kalp öyküsü ile bu alışkanlıkların bir arada olması, tansiyon ve kolesterol ölçtürmek için yeterli bir gerekçedir."
        }
      }
    },
    "focus": {
      "name": "Odaklanma ve Dikkat",
      "bands": {
        "good": {
          "label": "Odaklanma sağlam",
          "text": "Bir işin başında kalabiliyor, başladığınızı bitirebiliyor ve sorumluluklarınızı takip edebiliyorsunuz. Cevaplarınız dikkatin sizin için bir darboğaz olduğunu göstermiyor. Daha fazlasını istiyorsanız kazanç genellikle irade değil ortam tarafında — kesintileri azaltmakta."
        },
        "mid": {
          "label": "Odaklanma parçalanıyor",
          "text": "Yoğunlaşabiliyorsunuz ama kolay bölünüyor: işler arası geçiş, erteleme ve işin ortasında ipin ucunu kaçırma cevaplarınıza yayılmış durumda. Bunun çoğu çabayla değil düzenle çözülür — aynı anda tek görev görünür olsun, derin çalışma sırasında bildirimler kapalı olsun ve günün sabit bir bitiş noktası olsun."
        },
        "low": {
          "label": "Dikkat süregelen bir zorluk",
          "text": "Cevaplarınız aynı anda birkaç alanda zorluk anlatıyor: işleri başlatmak ve bitirmek, yerinde durmak, sorumlulukları hatırlamak ve kolayca dağılmak. Bu birleşimin birden çok olası açıklaması var — kronik uyku borcu ve yüksek stres yaygın nedenlerdir; tanısı konabilen ve tedavi edilebilen DEHB de öyle. Bir test hangisi olduğunu söyleyemez. Bu durum çocukluğunuzdan beri sürüyorsa ve işinizi ya da ilişkilerinizi etkiliyorsa, bir klinisyen tarafından değerlendirilmeye değer."
        }
      }
    },
    "fitness": {
      "name": "Fiziksel Kondisyon",
      "bands": {
        "good": {
          "label": "Aktif ve kondisyonlu",
          "text": "Düzenli egzersiz, iyi sayılacak kuvvet ve hareketlilik, oturduğunuz değil kullandığınız bir beden — cevaplarınız işleyen bir sistemi anlatıyor. Bu aralıktaki asıl risk fazlasını çok hızlı yapıp sakatlanmak; toparlanmayı da plana dâhil edin."
        },
        "mid": {
          "label": "Orta düzeyde aktif",
          "text": "Hareket ediyorsunuz ama birikecek kadar düzenli değil. Buradaki olağan tablo uzun oturma saatleri ve atlanan esneme. En hızlı fark yaratan iki şey: kısa bir günlük yürüyüş ve uzun oturma bloklarını bölmek — saatte bir ayağa kalkmak bile nasıl hissettiğinizde ölçülebilir bir fark yaratır."
        },
        "low": {
          "label": "Ağırlıklı olarak hareketsiz",
          "text": "Cevaplarınız az düzenli aktiviteye, uzun oturma saatlerine ve azalmış kuvvet, esneklik veya dayanıklılığa işaret ediyor. İyi haber şu: bu başlangıç noktasında ilk iyileşmeler hızlı gelir. Daha iddialı bir şeye geçmeden önce yürüyüşle başlayın — her gün, acele etmeden ve alışkanlık olacak kadar uzun. Sırt ağrısı veya nefes darlığı sizi kısıtlıyorsa, üzerine gitmeden önce onu değerlendirtin."
        }
      }
    },
    "immunity": {
      "name": "Bağışıklık Direnci",
      "bands": {
        "good": {
          "label": "İyi bir temel direnç",
          "text": "Yeterli uyku, düzenli hareket, makul bir beslenme ve düşük sigara maruziyeti — cevaplarınız bağışıklık sisteminin iyi çalıştığı koşulları anlatıyor. Bu listeden daha iyi sonuç veren bir takviye yok."
        },
        "mid": {
          "label": "Dirençte bir miktar zorlanma",
          "text": "Sık yorgunluk, düzensiz uyku veya süregelen stres, aksi hâlde makul olan alışkanlıkların yanında beliriyor. Bu aralıkta en yüksek getirili kalem genellikle uyku — eczaneden alabileceğiniz her şeyin önünde."
        },
        "low": {
          "label": "Direnç baskı altında",
          "text": "Cevaplarınız sık enfeksiyon, süregelen yorgunluk ve toparlanmayı zorlaştıran alışkanlıklara işaret ediyor. Önce uyku, beslenme ve stres kaldıraçlarını kullanın. Ancak şunu not edin: süregelen yorgunluk, sık enfeksiyon, geç iyileşen yaralar veya bilinen otoimmün hastalıklar kendi kendine yönetilecek değil hekim tarafından değerlendirilecek konulardır — bunların bir kısmının belirli ve tedavi edilebilir nedenleri vardır."
        }
      }
    },
    "tech": {
      "name": "Dijital Denge",
      "bands": {
        "good": {
          "label": "Teknoloji yerinde duruyor",
          "text": "Telefonu rahat bırakabiliyor, ona bakmadan bir şey izleyebiliyor ve bildirimlerin çekiciliğini hissetmiyorsunuz. Cevaplarınız teknolojinin sizin için bir refleks değil bir araç olduğunu gösteriyor. Bunun karşılığını en çok uykuda alırsınız."
        },
        "mid": {
          "label": "Teknoloji istediğinizden fazlasını alıyor",
          "text": "Refleks hâline gelmiş kontroller, internette kaybolan zaman ve yatma saatine yakın ekranlar cevaplarınızda beliriyor. En etkili tek değişiklik neredeyse her zaman aynı: telefonu yatak odasının dışında şarj edin. Günün son ve ilk saatini bir çırpıda döngüden çıkarır."
        },
        "low": {
          "label": "Teknoloji güne hâkim",
          "text": "Cevaplarınız sürekli kontrol etmeyi, kopamamayı, göz yorgunluğu veya boyun ağrısı gibi fiziksel etkileri ve ekranda olan bitene bağlanan bir ruh hâlini anlatıyor. Uygulaması en kolay sınırlarla başlayın: yatak odasında telefon yok, bildirimler varsayılan olarak kapalı ve haftada gerçekten çevrimdışı bir blok. Sosyal medya kullanımı sizi kendinizle ilgili sürekli daha kötü hissettiriyorsa, bu tek başına kullanım biçiminizi değiştirmek için yeterli bir gerekçedir."
        }
      }
    }
  }
};

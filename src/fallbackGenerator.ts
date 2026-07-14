import { Etsy3DProductAnalysis } from "./types";

// Helper to generate simulated data when API key is missing or server is unreachable
export function generateSimulatedResponse(concept: string, lang: string = "EN"): Etsy3DProductAnalysis {
  const cleanConcept = concept.trim();
  const slug = cleanConcept.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const isTr = lang === "TR";
  
  return {
    id: slug,
    name: isTr ? `${cleanConcept} (Yapay Zeka Analizli)` : `${cleanConcept} (AI Evaluated)`,
    niche: isTr ? "Onaylanmış 3D Baskı Özel Nişi" : "Validated 3D Print Custom Niche",
    description: isTr 
      ? `Etsy'de perakende satışlar için optimize edilmiş, özel olarak tasarlanmış 3D yazdırılabilir ${cleanConcept}. Filament maliyetleri üzerinde yüksek bir kâr marjı sağlarken üretim süresini, destek kullanımını ve malzeme tüketimini en aza indirmek üzere özel olarak tasarlanmıştır.`
      : `A custom-engineered 3D printable ${cleanConcept} optimized for retail sales on Etsy. Engineered specifically to minimize production time, support usage, and material consumption while commanding a high margin over filament costs.`,
    monthlyRevenuePotential: 2800,
    timeToFirstSaleDays: 4,
    probabilityOfSuccessPercent: 82,
    filamentWeightGrams: 165,
    printTimeHours: 4.8,
    scorecard: {
      demandScore: 85,
      competitionScore: 52,
      profitMarginScore: 89,
      productionTimeScore: 85,
      difficultyLevel: "Medium",
      customizationPotential: 80,
      repeatCustomerPotential: 65,
      giftability: 85,
      scalability: 90,
      legalRisk: "Low",
      overallScore: 81
    },
    marketDemandAnalysis: isTr
      ? `'${cleanConcept}' için organik arama sorgularında güçlü yapısal göstergeler mevcut. Ev dekorasyonu ve özel düzenleyici kategorilerinde ilgi artışı gözleniyor. Ortalama alıcı, 'kişiselleştirilmiş ${cleanConcept}' veya 'estetik masa aksesuarları' gibi satın alma amacı taşıyan ifadelerle arama yapıyor.`
      : `Strong structural indicators for '${cleanConcept}' within organic search queries. Interest spikes in home décor and specialized organizer categories. Average buyer searches with transactional, intent-driven phrases like 'personalized ${cleanConcept}' or 'aesthetic desk accessories'.`,
    competitors: [
      {
        product: isTr ? "Genel Alternatif Listeleme" : "Generic Alternative listing",
        price: 24.99,
        salesEstimate: 85,
        reviewCount: 92,
        strengths: isTr ? ["Yerleşik arama geçmişi", "Hızlı teslimat"] : ["Established search history", "Fast delivery"],
        weaknesses: isTr 
          ? ["Yüksek baskı hatası oranına sahip dayanıksız tasarım", "Kişiselleştirme seçeneği yok", "Yüksek malzeme tüketimi (400g üzeri)"] 
          : ["Flimsy design with high print failure rates", "No customization options", "High material consumption (over 400g)"],
        howToOutperform: isTr
          ? `Kişiselleştirilmiş harf seçenekleri veya renkli aksan eklemeleri entegre edin. Geometrisini 45 derecelik açılarla yeniden tasarlayarak %100 desteksiz basılabilir hale getirin. Bu, malzeme ağırlığını %50 oranında düşürür ve baskı süresini 5 saatin altına indirir.`
          : `Integrate customized lettering options or accent inserts. Re-engineer the geometry with custom 45-degree angle overhangs so it prints 100% support-free. This drops material weight by 50% and print times down to under 5 hours.`
      }
    ],
    printing: {
      recommendedPrinterType: isTr 
        ? "FDM (Bambu Lab A1 / P1S gibi yüksek hızlı CoreXY yazıcılar için optimize edilmiştir)" 
        : "FDM (Optimized for high-speed coreXY printers like Bambu Lab A1 / P1S)",
      plaCompatible: true,
      petgCompatible: true,
      absCompatible: false,
      tpuCompatible: false,
      compatibleMaterialsText: isTr 
        ? "İç dekor için PLA (Mat veya İpek), nem direnci veya ısı dayanımı gerekiyorsa PETG." 
        : "PLA (Matte or Silk) for internal decor, PETG if moisture resistance or heat deflection is needed.",
      nozzleSize: "0.4mm standard",
      layerHeight: isTr ? "0.20mm standart katman çizgileri" : "0.20mm standard layer lines",
      infillPercent: 15,
      supportsRequired: "None",
      orientation: isTr 
        ? "Destek izi bırakmadan mat mikro dokulu birinci sınıf bir yüzey elde etmek için dokulu yapı plakasına yüzü aşağı bakacak şekilde yazdırın." 
        : "Print face down on textured build plate to achieve a premium matte micro-textured surface without any support scarring.",
      estimatedPrintTime: "4h 48m",
      estimatedPrintTimeMinutes: 288,
      materialConsumptionGrams: 165,
      filamentCostPerKg: 20.00,
      failureRisks: isTr ? [
        "Yüksek en-boy oranlı köşelerde ilk katman kalkması: Yapı plakasını ılık bulaşık sabunu ile yıkayarak veya 3 mm'lik brim ekleyerek çözün.",
        "Hız çok yüksekse yatay kemerlerde sarkma riski."
      ] : [
        "First layer lifting on high-aspect corners: Resolve by washing build plate with warm dish soap or adding a 3mm brim.",
        "Overhang droop on horizontal arches if speed is too high."
      ],
      optimizationSuggestions: isTr ? [
        "Kusursuz yüzey kalitesi için dış duvar hızını 80mm/sn olarak ayarlayın.",
        "Köprülerde fan hızını %100 olarak ayarlayın."
      ] : [
        "Set outer wall speed to 80mm/s for flawless surface quality.",
        "Set fan speed to 100% on bridges."
      ],
      strengthImprovements: isTr ? [
        "Bükülme direncini artırmak için en az 3 çevre duvarı uygulayın.",
        "Düzgün çok yönlü yükleri korumak için gyroid dolgu deseni kullanın."
      ] : [
        "Implement a minimum of 3 walls (perimeters) to add significant rigid bending resistance.",
        "Use gyroid infill pattern to secure uniform multi-directional loads."
      ],
      toleranceRecommendations: isTr 
        ? "Hareketli eklemleri veya kayma boşluklarını standart 0.20 mm tolerans sınırına ayarlayın." 
        : "Set moving joints or slide clearances to a standard 0.20mm tolerance boundary.",
      assemblyRecommendations: isTr 
        ? "Tek parça olarak basılacak şekilde tasarlanmıştır. Herhangi bir vida veya yapıştırıcı gerektirmeden, basit yerçekimi geçme derzleri ile taban yuvalarına kayar." 
        : "Designed as a single-print part. Slides into base slots with simple gravity friction joints, requiring 0 screws or glues."
    },
    cadBrief: {
      dimensions: isTr 
        ? "140mm Genişlik x 120mm Derinlik x 180mm Yükseklik. Standart kargo kutularına kolayca sığar." 
        : "140mm Width x 120mm Depth x 180mm Height. Fits easily inside standard 6x6x6 shipping boxes.",
      wallThickness: isTr ? "2.4mm minimum (6 katmanlı 0.4mm ekstrüzyon)" : "2.4mm minimum (6 lines of 0.4mm extrusion)",
      filletsAndChamfers: isTr 
        ? "Fil ayağı etkisini ve yatak yapışma kenar bükülmelerini önlemek için 1.5mm alt pah tasarımı." 
        : "1.5mm bottom chamfer to prevent the elephant foot effect and bed adhesion edge warping.",
      snapFits: isTr 
        ? "Yok. Sıkı 0.15mm mekanik toleranslara sahip temiz yerçekimi kilitleme eklemleri kullanır." 
        : "None. Uses clean gravity interlocking joints with tight 0.15mm mechanical tolerances.",
      threads: isTr ? "Vida dişi yok. Standart sürgülü kilit bağlantıları uygulandı." : "No threads. Standard slide-lock fittings implemented.",
      hardwareRequired: isTr ? "Masaüstü yerleşimi için isteğe bağlı 4 adet silikon kaymaz kauçuk ped." : "Optional 4x silicone non-slip rubber pads for desk placement.",
      movingParts: isTr ? "Standart 0.25mm kayma toleranslı sürgü ayarlı mekanik braket." : "Slide-adjustable mechanical bracket with standard 0.25mm slip-tolerance.",
      explodedViewDescription: isTr 
        ? "Parça A (Özel marka kabartmalı ana dikey gövde). Parça B (Yatay sabitleme taban plakası). Parça A doğrudan Parça B yuvasına kayar." 
        : "Piece A (Main vertical display body with custom branding debossment). Piece B (Horizontal stabilizing base plate). Piece A slides directly into Piece B slot.",
      manufacturingConstraints: isTr 
        ? "Tüm iç çıkıntı yapıları tam olarak 45 derece pahlanmıştır, bu da tüm montajı tamamen desteksiz hale getirir." 
        : "All interior overhang structures are chamfered at exactly 45 degrees, rendering the entire assembly completely support-free."
    },
    imagePrompts: {
      midjourney: `A modern 3D printed ${cleanConcept}, beautifully styled, minimal and geometric aesthetic. Resting on a dark concrete studio backdrop, dramatic side lighting, professional product photography --ar 4:3 --v 6.0`,
      flux: `Studio product shot of a sleek matte ${cleanConcept}, high-end industrial design, clean lines, neutral background, commercial studio lighting, award-winning styling.`,
      ideogram: `Professional aesthetic product mockup of a custom 3D printed ${cleanConcept}. Photorealistic, high details, minimal design focus, studio background.`,
      dalle: `A photorealistic image of a beautiful, premium 3D printed ${cleanConcept} organizer, displayed on a high-end scandinavian styled wooden table, warm sunlight casting realistic shadows.`,
      heroImagePrompt: `Premium ${cleanConcept} organizer, clean white background, isometric view, studio lighting.`,
      lifestylePhotoPrompt: `${cleanConcept} placed on a modern oak desktop next to an Apple Mac setup, warm cozy lighting.`,
      studioPhotoPrompt: `Extremely close macro photo of the textured matte layers, highlighting precise 3D print lines.`,
      packagingPhotoPrompt: `Eco-friendly kraft paper box containing the flat-packed parts, showcasing premium branded sticker detail.`
    },
    seo: {
      optimizedTitle: isTr 
        ? `Geometrik ${cleanConcept} - Modern Ev Düzenleyici ve Teknoloji Hediyesi | Özel 3D Baskı Tutucu, Minimalist Masaüstü Donanımı` 
        : `Geometric ${cleanConcept} - Modern Home Organizer & Tech Gift | Custom 3D Printed Holder, Minimalist Desktop Gear`,
      tags13: isTr ? [
        `${cleanConcept} Tutucu`,
        "Modern Düzenleyici",
        "Eşsiz Masa Hediyesi",
        "Ev Dekorasyon Ürünü",
        "3D Baskı Aksesuar",
        "Ofis Kurulumu",
        "Doğa Dostu Hediye",
        "Minimalist Tasarım",
        "Geometrik Düzenleyici",
        "Özel Ofis Dekoru",
        "Estetik Düzenleyici",
        "Kişiselleştirilmiş Hediye",
        "Harika Masaüstü Eşyası"
      ] : [
        `${cleanConcept} Holder`,
        "Modern Organizer",
        "Unique Desk Gift",
        "Home Decor Gear",
        "3D Printed Accessory",
        "Tech Office Setup",
        "Eco Friendly Gift",
        "Minimalist Design",
        "Geometric Holder",
        "Custom Office Decor",
        "Aesthetic Organizer",
        "Personalized Gadget",
        "Cool Desktop Item"
      ],
      primaryKeywords: isTr ? [`${cleanConcept} tutucu`, `modern ${cleanConcept}`, `${cleanConcept} hediyesi`] : [`${cleanConcept} holder`, `modern ${cleanConcept}`, `${cleanConcept} gift`],
      secondaryKeywords: isTr ? ["modern masa düzenleyici", "eşsiz ev hediyesi", "3d baskılı stant"] : ["modern desk organizer", "unique home gift", "3d printed stand"],
      longTailKeywords: isTr 
        ? [`geometrik 3d yazdırılmış ${cleanConcept} tutucu`, `kişiselleştirilmiş minimalist ${cleanConcept} masa düzenleyici`, `ofis kurulumu için özel hediye`] 
        : [`geometric 3d printed ${cleanConcept} holder`, `custom minimalist ${cleanConcept} desktop organizer`, `personalized gift for home office setup`],
      searchIntent: isTr 
        ? "Yüksek satın alma niyeti; benzersiz şekilde tasarlanmış ev eşyaları, özel masa hediyeleri veya kitlesel perakende mağazalarında satın alınamayacak ısmarlama düzenleyiciler arıyorlar." 
        : "High transactional intent, searching for uniquely styled homeware, custom desk gifts, or bespoke organizers that cannot be bought in mass retail stores.",
      category: isTr ? "Ev ve Yaşam > Ofis > Masa Düzenleyiciler" : "Home & Living > Office > Desk Organizers",
      attributes: isTr ? "Malzeme: Biyo-plastik, Yükseklik: 18 Santimetre, Genişlik: 14 Santimetre, Kişiselleştirilebilir: Evet" : "Material: Bio-plastic, Height: 18 Centimeters, Width: 14 Centimeters, Personalized: Yes",
      descriptionText: isTr 
        ? `Güzel Geometrik ${cleanConcept} ürünümüzle ev veya iş yeri kurulumunuzu bir üst seviyeye taşıyın! Zarif, yüksek performanslı ürün tasarımına değer veren modern profesyoneller, minimalistler ve teknoloji meraklıları için tasarlandı.\n\nGöz alıcı organik yapılarla üretilen bu düzenleyici son derece güçlüdür. Her bir parça organik, birinci sınıf mat biyo-plastik (PLA) kullanılarak siparişe göre özel olarak 3D basılmaktadır.\n\nÖZELLİKLER:\n- Modern iç mekanları tamamlayan çarpıcı geometrik düzen.\n- Kişiselleştirme: Ön plakaya özel baş harfler basılabilir.\n- Düz paket tasarımı çevre dostu ambalajda gönderilir ve saniyeler içinde birleşir!\n- Baskı sırasında sıfır destek kullanılması, çirkin izler olmadığı anlamına gelir, sadece harika ve temiz katman çizgileri.`
        : `Elevate your home or workspace setup with our beautiful Geometric ${cleanConcept}! Designed for modern professionals, minimalists, and tech enthusiasts who value elegant, high-performance product design.\n\nCrafted with beautiful organic structures, this organizer is featherlight yet incredibly strong. Each piece is custom 3D printed to order using organic, premium matte bio-plastics (PLA).\n\nFEATURES:\n- Striking geometric layout that complements modern interiors.\n- Personalization: Custom initials can be printed on the front plate.\n- Flat-pack design ships in lightweight eco-friendly packaging and snaps together in seconds!\n- Zero supports used during printing means no ugly scars, only gorgeous, clean layer lines.`,
      bulletPoints: isTr ? [
        "Eşsiz Mimari Stil: Zarif geometrik kafes yapısı.",
        "Çevre Dostu PLA Filament: Birinci sınıf biyolojik olarak parçalanabilir mat kaplama.",
        "Düz Paket Nakliye: Vida veya yapıştırıcı olmadan hızlı kilitli montaj.",
        "Küçük Gruplar Halinde El Yapımı: Maksimum baskı gücü için tamamen optimize edilmiştir."
      ] : [
        "Unique Architectural Styling: Elegant geometric trellis structure.",
        "Eco-Conscious PLA Filament: Premium biodegradable matte finish.",
        "Flat-Pack Shipping: Quick interlocking assembly without screws or glue.",
        "Handmade in Small Batches: Fully inspected and optimized for maximum print strength."
      ],
      faqs: isTr ? [
        {
          question: "Montajı ne kadar sürer?",
          answer: "10 saniyeden az! Parçalar son derece hassas kayar mekanik kilit kullanır. Parçayı taban yuvasına kaydırıp kilitlemeniz yeterlidir."
        },
        {
          question: "Organik PLA nedir?",
          answer: "Polilaktik Asit (PLA), mısır nişastası ve şeker kamışı gibi organik yenilenebilir kaynaklardan elde edilen çevre dostu bir biyo-plastiktir. Dayanıklıdır, toksik değildir ve mat görsel bitişe sahiptir."
        }
      ] : [
        {
          question: "How long does it take to assemble?",
          answer: "Less than 10 seconds! The parts utilize a highly precise sliding mechanical lock. Simply slide the column into the base slot until it click-locks."
        },
        {
          question: "What is organic PLA?",
          answer: "Polylactic Acid (PLA) is an eco-friendly bioplastic derived completely from organic renewable resources like corn starch and sugarcane. It is durable, non-toxic, and has a premium matte visual finish."
        }
      ],
      altTexts: isTr ? [
        `Modern bir masada temiz bir şekilde duran muhteşem bir mat siyah 3D yazdırılmış ${cleanConcept}.`,
        `Altın harfli kişiselleştirilmiş sürgülü kilit tabanının yakın plan detayı.`
      ] : [
        `A gorgeous matte black 3D printed ${cleanConcept} standing cleanly on a modern desk.`,
        `Closer detail of the customized slide lock base with gold lettering.`
      ],
      imageFileNames: [
        `${slug}-matte-black.jpg`,
        `${slug}-lifestyle-desk-setup.jpg`,
        `${slug}-interlocking-assembly-instructions.jpg`
      ]
    },
    pricing: {
      materialCost: 3.30,
      electricityCost: 0.14,
      machineTimeCost: 0.45,
      laborCost: 1.00,
      packagingCost: 0.85,
      shippingCost: 3.50,
      etsyListingFee: 0.20,
      etsyTransactionFee: 1.82,
      etsyProcessingFee: 1.37,
      recommendedRetailPrice: 28.00,
      premiumPrice: 36.00,
      discountStrategy: isTr 
        ? "Erken kuşak için %10 indirimlerle tanıtın. Sepet tutarlarını artırmak için 2 Alana %15 İndirim sepeti ekleyin."
        : "Promote with 10% early-bird discounts. Add Buy 2 Get 15% Off bundles to lift average basket spends.",
      bundleStrategy: isTr
        ? "$49.00 karşılığında uyumlu bir 'Savaş İstasyonu Paketi' oluşturmak için benzer masa aksesuarları veya tepsileriyle eşleştirin."
        : `Pair with similar tech accessories or desk trays to create a coordinated 'Battlestation Pack' for $49.00.`
    },
    marketing: {
      pinterestStrategy: isTr
        ? "'İç Mekan Tasarımı' ve 'Modern Ofis Yükseltmeleri' hedefli Pinterest pinleri yayınlayın. Başlıklarda satın alma niyeti taşıyan anahtar kelimeleri kullanın."
        : "Pin clean vertical aesthetic layout photos targeted at 'Interior Styling' and 'Modern Office Upgrades'. Use titles containing transactional keywords.",
      tiktokStrategy: isTr
        ? "Yazdırma işleminin yakın makro çekimlerini kaydedin. Parçaları birleştirirken ASMR tıkırtı sesiyle eşleştirin. Metin ekleyin: 'Bu tasarım destek olmadan yazdırılır!'"
        : "Record close-up macro shots of the printing process. Pair with ASMR clicking sound when sliding the parts together. Add text overlay: 'This design prints with zero supports!'",
      instagramStrategy: isTr
        ? "Geleneksel karmaşık plastik düzenleyicilerle bu mimari şaheseri karşılaştıran karuseller yayınlayın."
        : "Publish carousels contrasting traditional cluttered plastic organizers with this architectural masterpiece.",
      youtubeShortsStrategy: isTr
        ? "PLA/PETG darbe dayanıklılığını kanıtlamak için düz paketlenmiş parçaları betona düşürme deneyi yapın."
        : "Demonstrate dropping the flat-packed parts on concrete to prove PLA/PETG impact durability. High strength hook.",
      launchCampaign: isTr
        ? "İlk 10 listelemeyi yurt içi kargo dahil $21.00 olarak fiyatlandırarak ilk satış hızını artırın ve 5 yıldızlı fotoğraflı yorumlar kazanın."
        : "First 10 listings priced at $21.00 with free domestic shipping to prompt initial sales velocity and generate 5-star photo reviews.",
      ugcStrategy: isTr
        ? "Eşleşen çift renkli spollar sunarak minimal masaüstü etkileyicilerine ücretsiz ürün gönderip içerik sağlayın."
        : "Outsource lifestyle content creation to compact desktop-influencers by offering free matching dual-color spools.",
      contentCalendar4Weeks: [
        {
          week: 1,
          focus: isTr ? "Üretim Kamera Arkası" : "Production Behind the Scenes",
          channels: [
            { platform: "TikTok", content: isTr ? "Yazıcı plakasından çıkan inanılmaz yüzey kalitesini gösterin." : "Show the incredible surface quality coming off the printer plate." },
            { platform: "Instagram", content: isTr ? "Minimalist düz paket tasarımını sergileyen flat lay fotoğrafı." : "Flat lay showing the minimalist flat-pack design." }
          ]
        },
        {
          week: 2,
          focus: isTr ? "Ürün Kullanışlılığı" : "Product Utility",
          channels: [
            { platform: "Instagram", content: isTr ? "Düzenleyiciyi şık ve minimal bir masaüstü kurulumunda stilize eden video." : "Reel styling the holder in a bright minimal desk setup." }
          ]
        },
        {
          week: 3,
          focus: isTr ? "Çevre Dostu Yaklaşım" : "Eco-Friendly Angle",
          channels: [
            { platform: "TikTok", content: isTr ? "Mısır nişastası plastiğinin ne olduğunu ve neden lüks hissettirdiğini açıklayın." : "Explaining what corn-starch plastic is and why it feels premium." }
          ]
        },
        {
          week: 4,
          focus: isTr ? "Müşteri Yorumları Vitrini" : "Customer Reviews Showcase",
          channels: [
            { platform: "TikTok", content: isTr ? "İlk siparişi paketlerken gelen ilk 5 yıldızlı yorumu yüksek sesle okuyun." : "Reading out the first 5-star review while packing an order." }
          ]
        }
      ]
    },
    automations: {
      zapierAutomations: isTr
        ? ["Zapier: Alıcı kişiselleştirme notlarını içeren PDF şablonlarıyla otomatik olarak özelleştirilmiş paketleme listeleri oluşturun."]
        : ["Zapier: Create automatically customized packing lists with buyer personalization notes inside PDF templates."],
      n8nWorkflows: isTr
        ? ["n8n: Paket teslimatından 2 saat sonra alıcılara dijital montaj kılavuzu göndermek için bildirimleri kuyruğa alın."]
        : ["n8n: Queue shipment notifications to send buyers digital assembly PDFs 2 hours after package scanner delivery."],
      inventoryOrderTracking: isTr
        ? "Baskı başına 165g filament tüketimini senkronize edin. Makara kapasitesi 1 birimin altına düştüğünde uyarın."
        : "Sync filament usage of 165g per print. Alert when spool capacity falls below 1 unit."
    },
    customerSentiment: {
      commonPainPoints: [
        { painPoint: isTr ? "Yapısal / Eklem Toleransları" : "Structural / Joint Tolerances", frequencyPercent: 65, impactLevel: "High", description: isTr ? "Mekanik kayar geçmeler veya toleranslar, yazıcı kalibrasyonuna bağlı olarak çok sıkı veya çok gevşek olabiliyor." : "Mechanical sliding fits or tolerances can be too tight or too loose depending on the printer calibration." },
        { painPoint: isTr ? "Yüksek filament kullanımı ve uzun baskı süresi" : "High filament usage and long print time", frequencyPercent: 28, impactLevel: "Medium", description: isTr ? "Çok fazla katı dolgu kullanılması parça maliyetini artırır ve baskı döngüsünü rekabetçi olmaktan çıkarır." : "Using too much solid infill increases part cost and makes the print cycle uncompetitive." },
        { painPoint: isTr ? "Desteklerin yüzeyde iz bırakması" : "Supports leaving surface scars", frequencyPercent: 15, impactLevel: "Low", description: isTr ? "Destek gerektiren tasarım çıkıntıları, estetiği bozan görünür yara izleri bırakıyor." : "Design overhangs requiring supports leave visible scarring that ruins the aesthetic." }
      ],
      topCompetitorReviews: [
        { rating: 4, reviewText: isTr ? "Tasarım harika ama eklemler çok sıkı geçiyor, zımparalamam gerekti." : "I really like the aesthetic of this organizer, but the tolerance is so small that I had to sand the joints down for 20 minutes to make them fit.", competitorName: "3DPrintGurus", keyIssue: isTr ? "Eklemler çok sıkı oturuyor" : "Joint fits too tight" },
        { rating: 3, reviewText: isTr ? "Güzel tasarım ama çok hafif olduğu için kulaklığı çekerken masaüstünde kayıyor." : "Beautiful structure, but because it's printed in light plastic, it slips around my desk when I pull my headphones off.", competitorName: "EtsyCreations", keyIssue: isTr ? "Taban ağırlığı / denge eksikliği" : "Lacks base weight / stability" }
      ],
      improvementSuggestions: [
        { feature: isTr ? "Optimize Edilmiş Tolerans Payları" : "Optimized Tolerance Clearances", priority: "High", designAction: isTr ? "Eklemleri zımparalamayı önlemek için toleransları tam 0.20-0.25 mm olarak ayarlayın." : "Tune joint tolerances to exactly 0.20-0.25mm to avoid manual sanding." },
        { feature: isTr ? "Desteksiz Çıkıntı Açıları" : "Supportless Overhang Angles", priority: "Medium", designAction: isTr ? "Sıfır hatalı desteksiz baskılar elde etmek için tüm iç eğimleri en az 45 derece yapın." : "Keep overhangs at 45 degrees or steeper for zero-failure supportless prints." }
      ]
    },
    legal: {
      warnings: isTr ? "Masaüstü aksesuarlarında doğrudan fikri mülkiyet riski düşüktür. Ticari markalı telif adları veya logolar kullanmaktan kaçının." : "Low direct IP risk on desk organization utilities. Refrain from branding with trademarked franchise names or logos.",
      isSafeToSell: true,
      trademarkCheck: isTr ? "Temiz. '${cleanConcept}' veya türevleri için aktif bir tasarım patenti veya ticari marka ihlali bulunmamaktadır." : "Clear. No active utility patents or design patent registrations cover generic structures of this type.",
      copyrightPatentCheck: isTr ? "Evrensel geometrik desenler telif haklarına tabi değildir. Tasarım tamamen özgündür." : "Geometric patterns are universally uncopyrightable. Original model rendering is 100% safe."
    }
  };
}

// Helper to generate simulated niche options based on chosen category
export function generateSimulatedNiches(category: string, lang: string = "EN"): any[] {
  const cat = category.toLowerCase();
  const isTr = lang === "TR";
  
  if (cat.includes("desk") || cat.includes("workspace") || cat.includes("office") || cat.includes("organizer")) {
    return [
      {
        id: "magnetic-hex-modular-pen-oasis",
        name: isTr ? "Manyetik Altıgen Modüler Kalemlik" : "Magnetic Hex-Modular Pen Oasis",
        niche: isTr ? "Masa Aksesuarları ve Düzenleyiciler" : "Desk Accessories & Organizers",
        description: isTr 
          ? "Altıgen manyetik kalem haznesi ve teknoloji tepsisi sistemi. Alıcıların kendi özel masaüstü ağlarını yapılandırabilmeleri için gömülü neodyum mıknatıs kanallarına sahip kilitleme bölümleri."
          : "A hexagonal magnetic pen container and tech tray system. Interlocking segments with embedded neodymium magnet channels so buyers can configure their own custom desktop grid.",
        monthlyRevenuePotential: 3400,
        timeToFirstSaleDays: 3,
        probabilityOfSuccessPercent: 88,
        filamentWeightGrams: 145,
        printTimeHours: 4.2,
        difficultyLevel: isTr ? "Kolay" : "Easy",
        scorecard: { demandScore: 92, competitionScore: 65, profitMarginScore: 88, productionTimeScore: 90, overallScore: 88 }
      },
      {
        id: "slide-lock-stackable-sd-card-cabinets",
        name: isTr ? "Sürgülü Kilitli Üst Üste İstiflenebilir SD Kart Dolapları" : "Slide-Lock Stackable SD Card Cabinets",
        niche: isTr ? "Yaratıcı Teknoloji Depolama" : "Creative Tech Storage",
        description: isTr
          ? "Fotoğrafçılar ve tasarımcıların masa düzenleri için tasarlanmış minyatür endüstriyel çekmeceli dolap sistemleri. Pürüzsüz çekmece kaydırma hareketi ve birbirine geçen istifleme kılavuzları içerir."
          : "Miniature industrial cabinet drawer systems designed for photographer and designer desk layouts. Features smooth drawer slide action and interlocking stack guides.",
        monthlyRevenuePotential: 2100,
        timeToFirstSaleDays: 5,
        probabilityOfSuccessPercent: 78,
        filamentWeightGrams: 190,
        printTimeHours: 5.5,
        difficultyLevel: isTr ? "Orta" : "Medium",
        scorecard: { demandScore: 80, competitionScore: 50, profitMarginScore: 84, productionTimeScore: 78, overallScore: 76 }
      },
      {
        id: "anti-vibration-mechanical-headphone-clamp",
        name: isTr ? "Titreşim Önleyici Mekanik Kulaklık Kelepçesi" : "Anti-Vibration Mechanical Headphone Clamp",
        niche: isTr ? "Odyofil Alan Tasarrufları" : "Audiophile Space-Savers",
        description: isTr
          ? "Delme gerektirmeden masalara güvenli bir şekilde kilitlenen ağır hizmet tipi bir sıkıştırma kelepçesi. Yüksek kaliteli kulaklıkları motor/masa uğultusundan yalıtmak için dahili uyum yayları içerir."
          : "A heavy-duty tensioning clamp that locks securely onto desks without drilling. Includes built-in compliance springs to isolate high-fidelity headsets from motor/desk hum.",
        monthlyRevenuePotential: 4100,
        timeToFirstSaleDays: 4,
        probabilityOfSuccessPercent: 91,
        filamentWeightGrams: 230,
        printTimeHours: 6.8,
        difficultyLevel: isTr ? "Zor" : "Hard",
        scorecard: { demandScore: 94, competitionScore: 70, profitMarginScore: 92, productionTimeScore: 75, overallScore: 89 }
      }
    ];
  } else if (cat.includes("kitchen") || cat.includes("cook") || cat.includes("food")) {
    return [
      {
        id: "self-draining-soap-lattice-sponge-bridge",
        name: isTr ? "Kendinden Süzmeli Sabun Kafesi ve Sünger Köprüsü" : "Self-Draining Soap Lattice & Sponge Bridge",
        niche: isTr ? "Lavabo ve Mutfak Düzenleyiciler" : "Sink & Kitchen Organizers",
        description: isTr
          ? "Fazla suyu lavabo teknesine geri yönlendiren zarif, kendinden süzmeli bir lavabo rafı. Sıfır destek gereklidir, düz basılır, olağanüstü işlevsel talep."
          : "An elegant, self-draining sink rack that funnels excess water back into the sink basin. Zero supports needed, print flat, outstanding functional demand.",
        monthlyRevenuePotential: 2900,
        timeToFirstSaleDays: 3,
        probabilityOfSuccessPercent: 86,
        filamentWeightGrams: 110,
        printTimeHours: 3.1,
        difficultyLevel: isTr ? "Kolay" : "Easy",
        scorecard: { demandScore: 89, competitionScore: 58, profitMarginScore: 91, productionTimeScore: 94, overallScore: 87 }
      },
      {
        id: "interlocking-gravitational-spice-dispenser",
        name: isTr ? "Kilitli Yerçekimli Baharat Dispenseri" : "Interlocking Gravitational Spice Dispenser",
        niche: isTr ? "Kiler Verimlilik Düzenleyicileri" : "Pantry Efficiency Organizers",
        description: isTr
          ? "Ön kiler haznesi kaldırıldığında yedek bir şişeyi aşağı yuvarlayan yerçekimi beslemeli bir baharat şişesi kabı. Modüler klipsler yan yana büyümeyi sağlar."
          : "A gravity-fed spice bottle container that rolls down a replacement container whenever the front one is lifted. Modular clips allows side-by-side growth.",
        monthlyRevenuePotential: 3200,
        timeToFirstSaleDays: 6,
        probabilityOfSuccessPercent: 74,
        filamentWeightGrams: 280,
        printTimeHours: 7.2,
        difficultyLevel: isTr ? "Orta" : "Medium",
        scorecard: { demandScore: 82, competitionScore: 48, profitMarginScore: 80, productionTimeScore: 70, overallScore: 75 }
      },
      {
        id: "ergonomic-custom-scale-bag-seal-grippers",
        name: isTr ? "Ergonomik Özel Boy Poşet Klipsleri" : "Ergonomic Custom-Scale Bag Seal Grippers",
        niche: isTr ? "Sıfır Atık Taze Saklama Kapları" : "Zero-Waste Fresh Containers",
        description: isTr
          ? "Atıştırmalık, evcil hayvan yemi ve kahve poşetlerinin üzerinde hava geçirmez bir sızdırmazlık oluşturan yüksek esnekliğe sahip kilitleme klipsleri. Kompakt boyutu sayesinde tek bir tablada 10+ adet basılabilir."
          : "High-flex locking clips that form an airtight seal over snacks, pet food, and coffee bags. Compact size means 10+ can print on a single bed.",
        monthlyRevenuePotential: 1800,
        timeToFirstSaleDays: 2,
        probabilityOfSuccessPercent: 93,
        filamentWeightGrams: 45,
        printTimeHours: 1.5,
        difficultyLevel: isTr ? "Kolay" : "Easy",
        scorecard: { demandScore: 84, competitionScore: 75, profitMarginScore: 95, productionTimeScore: 98, overallScore: 89 }
      }
    ];
  } else if (cat.includes("garden") || cat.includes("plant") || cat.includes("hydro") || cat.includes("planter")) {
    return [
      {
        id: "cascade-multi-tier-self-watering-planter",
        name: isTr ? "Çok Katmanlı Kendinden Sulanan Akıllı Saksı" : "Cascade Multi-Tier Self-Watering Planter",
        niche: isTr ? "Estetik İç Mekan Bitkileri" : "Aesthetic Indoor Botanicals",
        description: isTr
          ? "İkincil bir iç rezervuara sahip güzel, geometrik kendinden sulanan saksı. Orkidelere ve şifalı otlara en uygun hidrasyonu sağlamak için yüksek kılcal hareket liflerine sahiptir."
          : "A beautiful, geometric self-watering pot with a secondary inner reservoir. Features high capillary action fibers to deliver optimal hydration to orchids and herbs.",
        monthlyRevenuePotential: 4800,
        timeToFirstSaleDays: 4,
        probabilityOfSuccessPercent: 92,
        filamentWeightGrams: 210,
        printTimeHours: 5.9,
        difficultyLevel: isTr ? "Orta" : "Medium",
        scorecard: { demandScore: 96, competitionScore: 68, profitMarginScore: 89, productionTimeScore: 82, overallScore: 91 }
      },
      {
        id: "cellular-honeycomb-orchid-air-baskets",
        name: isTr ? "Hücresel Petek Orkide Hava Sepetleri" : "Cellular Honeycomb Orchid Air-Baskets",
        niche: isTr ? "Uzman Bitki Saksı Bakımı" : "Specialist Plant Pot Care",
        description: isTr
          ? "Kök çürümesini önlemek için optimize edilmiş, ham orman kökü ortamlarını taklit eden son derece nefes alabilir hücresel bitki sepetleri. Olağanüstü marjlar, hızlı baskı süresi."
          : "Highly breathable cellular plant baskets that mimic raw forest root environments, optimized to prevent root rot. Extreme margins, rapid print execution.",
        monthlyRevenuePotential: 2600,
        timeToFirstSaleDays: 3,
        probabilityOfSuccessPercent: 85,
        filamentWeightGrams: 95,
        printTimeHours: 2.8,
        difficultyLevel: isTr ? "Kolay" : "Easy",
        scorecard: { demandScore: 88, competitionScore: 60, profitMarginScore: 94, productionTimeScore: 95, overallScore: 88 }
      },
      {
        id: "magnetic-wall-mount-modular-grow-flasks",
        name: isTr ? "Mıknatıslı Duvar Montajlı Bitki Köklendirme Tüpleri" : "Magnetic Wall-Mount Modular Grow Flasks",
        niche: isTr ? "Dikey Bitki Çoğaltma Dekoru" : "Vertical Plant Propagation Decor",
        description: isTr
          ? "Standart botanik test tüplerini tutmak için tasarlanmış altıgen duvar plakaları. Entegre kayar kilitler taşımayı, temizlemeyi veya stil vermeyi son derece basit hale getirir."
          : "Hexagonal wall plaques designed to hold standard botanical test-tubes. Integrated sliding locks make moving, cleaning, or styling extremely simple.",
        monthlyRevenuePotential: 3700,
        timeToFirstSaleDays: 5,
        probabilityOfSuccessPercent: 81,
        filamentWeightGrams: 160,
        printTimeHours: 4.5,
        difficultyLevel: isTr ? "Orta" : "Medium",
        scorecard: { demandScore: 90, competitionScore: 55, profitMarginScore: 87, productionTimeScore: 88, overallScore: 84 }
      }
    ];
  } else if (cat.includes("decor") || cat.includes("light") || cat.includes("candle") || cat.includes("home")) {
    return [
      {
        id: "origami-lattice-led-candle-shroud",
        name: isTr ? "Origami Desenli LED Mum Kılıfı" : "Origami Lattice LED Candle Shroud",
        niche: isTr ? "Ortam Işığı ve Gölge Dekoru" : "Ambient Light & Shadow Decor",
        description: isTr
          ? "Titreşen LED çay ışıkları için tasarlanmış geometrik, sarmal bir ışık difüzörü. Duvarlara ve masalara muhteşem karmaşık geometrik gölgeler yansıtır."
          : "A geometric, spiraling light diffuser designed for flickering LED tea lights. Projects gorgeous complex geometric shadows across walls and tables.",
        monthlyRevenuePotential: 3100,
        timeToFirstSaleDays: 3,
        probabilityOfSuccessPercent: 87,
        filamentWeightGrams: 115,
        printTimeHours: 3.5,
        difficultyLevel: isTr ? "Kolay" : "Easy",
        scorecard: { demandScore: 91, competitionScore: 62, profitMarginScore: 93, productionTimeScore: 92, overallScore: 88 }
      },
      {
        id: "parametric-wave-desk-lamp-shade",
        name: isTr ? "Parametrik Dalga Masa Lambası Abajuru" : "Parametric Wave Desk Lamp Shade",
        niche: isTr ? "Özel Lüks Aydınlatma Armatürleri" : "Custom High-End Lit Fixtures",
        description: isTr
          ? "Kesintisiz, organik dalgalar elde etmek için spiral şeklinde üretilen 'vazo modu' baskı teknolojisini kullanan birinci sınıf bir abajur. Standart IKEA kablo setleriyle tamamen uyumludur."
          : "A premium lampshade utilizing spiralized 'vasemode' printing technology for seamless, organic waves. Fully compatible with standard IKEA cord sets.",
        monthlyRevenuePotential: 4400,
        timeToFirstSaleDays: 6,
        probabilityOfSuccessPercent: 79,
        filamentWeightGrams: 150,
        printTimeHours: 3.8,
        difficultyLevel: isTr ? "Orta" : "Medium",
        scorecard: { demandScore: 87, competitionScore: 45, profitMarginScore: 92, productionTimeScore: 90, overallScore: 83 }
      },
      {
        id: "nordic-interlocking-geometric-coaster-tower",
        name: isTr ? "İskandinav Geçmeli Geometrik Bardak Altlığı Kulesi" : "Nordic Interlocking Geometric Coaster Tower",
        niche: isTr ? "Estetik Kahve ve Çay Aksesuarları" : "Aesthetic Coffee & Tea Accessories",
        description: isTr
          ? "Özel bir geometrik sarmal saklama sütununun içine mükemmel bir şekilde istiflenen 4 adet modernist, çift renkli kilitli bardak altlığı seti. Zarif bir hediye ürünü."
          : "Set of 4 modernist, dual-color interlocking coasters that stack perfectly inside a dedicated geometric helix storage pillar. Elegant gift item.",
        monthlyRevenuePotential: 2500,
        timeToFirstSaleDays: 4,
        probabilityOfSuccessPercent: 84,
        filamentWeightGrams: 130,
        printTimeHours: 4.0,
        difficultyLevel: isTr ? "Kolay" : "Easy",
        scorecard: { demandScore: 85, competitionScore: 58, profitMarginScore: 90, productionTimeScore: 91, overallScore: 85 }
      }
    ];
  } else if (cat.includes("game") || cat.includes("battlestation") || cat.includes("controller") || cat.includes("gaming")) {
    return [
      {
        id: "modular-honeycomb-dual-controller-stand",
        name: isTr ? "Modüler Petek Çift Oyun Kolu Standı" : "Modular Honeycomb Dual Controller Stand",
        niche: isTr ? "Oyun Alanı Düzenleyicileri" : "Gaming Space Organizers",
        description: isTr
          ? "Petek kafeslerle tasarlanmış çift katmanlı dikey kontrol cihazı düzenleyicisi. Cihazları şarj etmek için kablo kılavuzlarına sahiptir."
          : "A dual-tier vertical controller organizer styled with honeycomb lattices. Features cable guides to charge gear neatly during sleep states.",
        monthlyRevenuePotential: 3900,
        timeToFirstSaleDays: 4,
        probabilityOfSuccessPercent: 89,
        filamentWeightGrams: 180,
        printTimeHours: 5.0,
        difficultyLevel: isTr ? "Kolay" : "Easy",
        scorecard: { demandScore: 93, competitionScore: 60, profitMarginScore: 88, productionTimeScore: 84, overallScore: 87 }
      },
      {
        id: "under-desk-slide-out-gamepad-dock",
        name: isTr ? "Masa Altı Kızaklı Oyun Kolu Yuvası" : "Under-Desk Slide-Out Gamepad Dock",
        niche: isTr ? "Oyun Alanı Düzenleyicileri" : "Gaming Workspace Organizers",
        description: isTr
          ? "Herhangi bir masanın altına monte edilmek üzere tasarlanmış gizli tutucu. Standart Xbox ve PS5 denetleyicilerine uyar, 0.20 mm toleranslı modüler slayt parçaları kullanır."
          : "A stealth holder designed to mount underneath any desk. Fits standard Xbox and PS5 controllers, utilizing modular slide tracks with 0.20mm tolerance.",
        monthlyRevenuePotential: 2800,
        timeToFirstSaleDays: 5,
        probabilityOfSuccessPercent: 82,
        filamentWeightGrams: 140,
        printTimeHours: 4.2,
        difficultyLevel: isTr ? "Orta" : "Medium",
        scorecard: { demandScore: 86, competitionScore: 54, profitMarginScore: 89, productionTimeScore: 88, overallScore: 82 }
      },
      {
        id: "geometric-cable-anchor-cord-weft",
        name: isTr ? "Geometrik Kablo Düzenleme Mandalı" : "Geometric Cable Anchor & Cord Weft",
        niche: isTr ? "Kablo Yönetimi Düzenekleri" : "Battlestation Wire Management",
        description: isTr
          ? "Şarj kablolarını güvenli bir şekilde yerinde tutan modern ağırlıklı çok yuvalı kablo düzenleyiciler. Düz arka kısım, standart yapışkan köpük montajına izin verir."
          : "Modern weighted multi-slot cable organizers that keep charger cables securely in position. Flat back allows standard adhesive foam mount.",
        monthlyRevenuePotential: 2200,
        timeToFirstSaleDays: 3,
        probabilityOfSuccessPercent: 86,
        filamentWeightGrams: 85,
        printTimeHours: 2.5,
        difficultyLevel: isTr ? "Kolay" : "Easy",
        scorecard: { demandScore: 88, competitionScore: 65, profitMarginScore: 92, productionTimeScore: 96, overallScore: 88 }
      }
    ];
  } else {
    // Default fallback
    return [
      {
        id: "retro-macintosh-styled-apple-watch-charger",
        name: isTr ? "Klasik Macintosh Tarzı Apple Watch Şarj Standı" : "Retro Macintosh Styled Apple Watch Charger",
        niche: isTr ? "Nostaljik Teknolojik Standlar" : "Nostalgic Tech Stands",
        description: isTr
          ? "Klasik eski bir bilgisayara benzeyen nostaljik Apple Watch standı. Şarj diskini güvenli bir şekilde yerinde tutar."
          : "A nostalgic replica watch stand resembling a classic vintage computer. Sliding watch dock holds the inductive puck securely in position.",
        monthlyRevenuePotential: 3600,
        timeToFirstSaleDays: 3,
        probabilityOfSuccessPercent: 91,
        filamentWeightGrams: 120,
        printTimeHours: 3.8,
        difficultyLevel: isTr ? "Kolay" : "Easy",
        scorecard: { demandScore: 93, competitionScore: 68, profitMarginScore: 91, productionTimeScore: 90, overallScore: 89 }
      },
      {
        id: "foldable-mechanical-guitar-instrument-stand",
        name: isTr ? "Katlanabilir Mekanik Gitar Standı" : "Foldable Mechanical Guitar Stand",
        niche: isTr ? "Müzisyen Aksesuarları" : "Musician Accessories",
        description: isTr
          ? "Uyumlu eklemler kullanan son derece kompakt, katlanır enstrüman standı. Son derece destekleyici, tüy kadar hafif ve gitar kılıflarının içinde kolayca taşınır."
          : "An incredibly compact, folding instrument stand utilizing smart compliant joints. Highly supportive, featherlight, and travels inside standard gigbags.",
        monthlyRevenuePotential: 4900,
        timeToFirstSaleDays: 6,
        probabilityOfSuccessPercent: 80,
        filamentWeightGrams: 290,
        printTimeHours: 7.5,
        difficultyLevel: isTr ? "Zor" : "Hard",
        scorecard: { demandScore: 88, competitionScore: 42, profitMarginScore: 86, productionTimeScore: 70, overallScore: 81 }
      },
      {
        id: "miniature-desktop-arcade-cabinet-frame",
        name: isTr ? "Minyatür Masaüstü Atari Kabini Çerçevesi" : "Miniature Desktop Arcade Cabinet Frame",
        niche: isTr ? "Retro Oyun Dekoru" : "Retro Gaming Decor",
        description: isTr
          ? "Standart akıllı telefonları, Raspberry Pi ekranlarını veya Nintendo Switch cihazlarını barındıracak şekilde tasarlanmış ölçekli bir retro atari kabini modeli."
          : "A scaled replica arcade cabinet designed to house standard smartphones, Raspberry Pi displays, or Nintendo Switch devices for retro setups.",
        monthlyRevenuePotential: 4200,
        timeToFirstSaleDays: 5,
        probabilityOfSuccessPercent: 84,
        filamentWeightGrams: 260,
        printTimeHours: 6.9,
        difficultyLevel: isTr ? "Orta" : "Medium",
        scorecard: { demandScore: 90, competitionScore: 50, profitMarginScore: 88, productionTimeScore: 72, overallScore: 83 }
      }
    ];
  }
}

// Helper to generate simulated Etsy examples
export function generateSimulatedEtsyExamples(keyword: string, lang: string = "EN"): any {
  const cleanKeyword = keyword.trim();
  const slug = encodeURIComponent(cleanKeyword);
  const isTr = lang === "TR";
  
  return {
    listings: [
      {
        title: isTr 
          ? `Premium 3D Yazıcı İle Üretilmiş ${cleanKeyword} - Özelleştirilebilir Masa ve Ev Dekoru` 
          : `Premium 3D Printed ${cleanKeyword} - Customizable Desk & Home Decor`,
        shopName: "CraftForge3D",
        price: 24.99,
        rating: 4.8,
        salesVolume: isTr ? "850+ satış" : "850+ sales",
        listingUrl: `https://www.etsy.com/search?q=${slug}`,
        successStrategy: isTr 
          ? "Kişiselleştirilebilir taban yazısı ve ipek bronz ile mat mermer dahil olmak üzere geniş bir renk yelpazesi sunuyor." 
          : "Offers personalized base text and wide range of color selections including silk bronze and matte marble.",
        photographyStyle: isTr 
          ? "Sağlam bir meşe masa üzerinde temiz, doğal gün ışığı çekimi, arka planda saksı bitkisi bokeh efekti." 
          : "Clean, natural daylight shot on a solid oak table, potted plant bokeh in the background.",
        optimizedTags: [cleanKeyword.toLowerCase().slice(0, 15), "3d printed gift", "room aesthetics", "personalized desk", "home organizer", "maker space"]
      },
      {
        title: isTr 
          ? `Çevre Dostu Minimalist ${cleanKeyword} (Özel Seri)` 
          : `Eco-Friendly Minimalist ${cleanKeyword} (Special Edition)`,
        shopName: "GreenLinePrints",
        price: 19.99,
        rating: 4.7,
        salesVolume: isTr ? "420+ satış" : "420+ sales",
        listingUrl: `https://www.etsy.com/search?q=${slug}`,
        successStrategy: isTr 
          ? "%100 biyolojik olarak parçalanabilir mısır plastiği olarak tanıtılıyor ve plastik içermeyen karton ambalajlarda gönderiliyor." 
          : "Promoted as 100% biodegradable corn-plastic, packaged in plastic-free cardboard wrap.",
        photographyStyle: isTr 
          ? "Yumuşak beyaz gölgeli, üstten stüdyo portre çekimi içeren İskandinav minimalizmi stili." 
          : "Minimalist Scandinavian styling, overhead studio portrait with soft white shadows.",
        optimizedTags: ["sustainable plan", "eco friendly", "gift for him", "office decor", "artisan print", "modern crafts"]
      }
    ],
    featuredShops: [
      {
        shopName: "CraftForge3D",
        totalSales: "8,900+",
        activeListingCount: 78,
        nicheFocus: isTr ? "Özel Teknoloji Aksesuarları ve Masaüstü Ekranları" : "Custom Tech Accessories & Desk Displays",
        successTakeaways: isTr ? [
          "Trafiği doğrudan listelere çekmek için 3D baskı sürecinin aktif, yüksek tempolu TikTok videolarını kullanıyor.",
          "Sipariş hacminde %20 artış sağlamak için çok renkli varyantları bir arada paketliyor.",
          "Üst düzey tüketici perakende markalarını yansıtan özel paketleme sunuyor."
        ] : [
          "Uses active, high-tempo TikTok videos of the 3D printing process to drive traffic directly to listings.",
          "Bundles multi-color variants together for a 20% order size increase.",
          "Maintains custom packaging that mirrors high-end consumer retail branding."
        ],
        shopUrl: "https://www.etsy.com/market/craft_forge_3d"
      },
      {
        shopName: "GreenLinePrints",
        totalSales: "3,100+",
        activeListingCount: 45,
        nicheFocus: isTr ? "Çevre Dostu Geri Dönüştürülmüş Ev Aksanları" : "Eco-Conscious Recycled Home Accents",
        successTakeaways: isTr ? [
          "Görsellerdeki şeffaf iklim etkisi rozetleri ile çevreye duyarlı alıcıları hedefliyor.",
          "Standart stokları hazır tutarak siparişlerde 24 saat içinde ultra hızlı sevkiyat sağlıyor.",
          "Her siparişi, alıcıların saksılarında yetiştirebilecekleri tohumlarla birlikte gönderiyor."
        ] : [
          "Targets eco-conscious shoppers with transparent climate-impact badges on listing images.",
          "Maintains ultra-fast 24-hour dispatch on orders by keeping pre-printed standard stock ready.",
          "Ships each item with seeds that buyers can grow directly in their biodegradable planters."
        ],
        shopUrl: "https://www.etsy.com/market/green_line_prints"
      }
    ],
    overallMarketInsight: isTr 
      ? `'${cleanKeyword}' satıcıları, benzersiz renk paleti, hızlı gönderim seçenekleri ve profesyonel fotoğrafçılık sunarak öne çıkıyor. Hafiflik veya dayanıksız birleşim yerleri gibi yaygın müşteri şikayetlerini çözerek, yeni mağazalar kârlı bir premium segment oluşturabilir.`
      : `Sellers of '${cleanKeyword}' stand out by offering a unique color palette, quick shipping options, and professional, high-end photography. By solving common buyer complaints like light weight or brittle joints, new shops can carve out a lucrative premium segment.`
  };
}

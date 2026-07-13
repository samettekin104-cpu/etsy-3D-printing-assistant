import { Etsy3DProductAnalysis } from "./types";

export const PREDEFINED_PRODUCTS: Etsy3DProductAnalysis[] = [
  {
    id: "honeycomb-headphone-stand",
    name: "Honeycomb Geometric Headphone Stand",
    niche: "Gaming & Desktop Organization",
    description: "A visually striking, modernist headphone holder designed to showcase headsets on stream, featuring an open honeycomb trellis that optimizes material use while providing incredible structural stability.",
    monthlyRevenuePotential: 3450,
    timeToFirstSaleDays: 3,
    probabilityOfSuccessPercent: 88,
    filamentWeightGrams: 185,
    printTimeHours: 5.5,
    scorecard: {
      demandScore: 92,
      competitionScore: 48,
      profitMarginScore: 85,
      productionTimeScore: 82,
      difficultyLevel: "Easy",
      customizationPotential: 75,
      repeatCustomerPotential: 40,
      giftability: 90,
      scalability: 95,
      legalRisk: "Low",
      overallScore: 89
    },
    marketDemandAnalysis: "High-growth niche fueled by Twitch stream setups, desktop lifestyle aesthetics (Reddit's r/battlestations), and home office styling. Organic search on Etsy for 'geometric headphone stand' and 'desk setup gifts' shows high search volume with moderate competition.",
    competitors: [
      {
        product: "Minimalist Wooden and Metal Headphone Stand",
        price: 38.00,
        salesEstimate: 120,
        reviewCount: 412,
        strengths: ["Premium wood base", "Clean finish"],
        weaknesses: ["High shipping weight", "No visual design distinction", "Cannot be personalized easily"],
        howToOutperform: "Offer a lighter, more organic modern design with geometric trellis styling. Offer custom initials printed directly in a high-contrast accent ring. Sell in dual-color combinations."
      },
      {
        product: "Cheap injection-molded plastic clamp stand",
        price: 14.99,
        salesEstimate: 340,
        reviewCount: 1280,
        strengths: ["Extremely low price", "Fits under desk"],
        weaknesses: ["Feels cheap", "Generic styling", "No gift value"],
        howToOutperform: "Position as a premium, highly aesthetic lifestyle item for serious setups rather than a hidden utility clamp. Charge more ($29.99+) to create an upscale design perception."
      }
    ],
    printing: {
      recommendedPrinterType: "FDM (Fitted for Bambu Lab A1 / Creality Ender 3 / Prusa MK4)",
      plaCompatible: true,
      petgCompatible: true,
      absCompatible: false,
      tpuCompatible: false,
      compatibleMaterialsText: "PLA / Matte PLA (Best for aesthetics), PETG (Best for impact resistance)",
      nozzleSize: "0.4mm (Recommended for sharp angles)",
      layerHeight: "0.20mm (Standard) or 0.16mm (Fine geometric detail)",
      infillPercent: 15,
      supportsRequired: "None",
      orientation: "Print flat on its side. Design features custom 45-degree self-supporting overhangs inside the hexagonal lattice cells.",
      estimatedPrintTime: "5h 32m",
      estimatedPrintTimeMinutes: 332,
      materialConsumptionGrams: 185,
      filamentCostPerKg: 20.00,
      failureRisks: [
        "Bed adhesion failure due to high vertical aspect ratio: Ensure clean textured PEI plate.",
        "Stringing inside hex cells if retraction settings are not optimized."
      ],
      optimizationSuggestions: [
        "Add a 4.0mm brim if bed adhesion is weak on tall objects.",
        "Set wall loops to 3 to avoid any infill showing through the outer shell."
      ],
      strengthImprovements: [
        "Increase wall count from 2 to 3 rather than increasing infill density.",
        "Use gyroid infill to handle bi-directional pressure evenly."
      ],
      toleranceRecommendations: "Main stem snap-joint tolerance should be set to 0.15mm for a tight friction fit without requiring glue.",
      assemblyRecommendations: "Two-part snap-together design. The geometric hexagonal lattice locks into the base slot with a secure dovetail mechanical joint. No adhesive required."
    },
    cadBrief: {
      dimensions: "Base: 120mm x 120mm x 15mm. Total height: 265mm. Trellis width: 65mm.",
      wallThickness: "2.4mm minimum (3 shells of 0.8mm or 6 shells of 0.4mm)",
      filletsAndChamfers: "2.0mm aesthetic chamfers around the outer edge of the hexagonal base to soften the silhouette and prevent corner curling.",
      snapFits: "Standard 0.15mm tolerance dovetail connector with a 1.2mm lock-in lip to secure the stem vertically into the base plate.",
      threads: "No threads needed. Clean mechanical friction joints reduce assembly time.",
      hardwareRequired: "1x adhesive anti-skid silicone rubber pad for the base bottom (highly recommended, cost: $0.12).",
      movingParts: "None.",
      explodedViewDescription: "Piece A (Hex Base Plate) contains a recessed female dovetail slot. Piece B (Geometric Trellis Column) slides vertically into Piece A's slot and clicks. Bottom contains 4 silicone pads.",
      manufacturingConstraints: "Angle limit of the lattice grids is kept at exactly 46 degrees relative to the build plate. This completely eliminates the need for supports."
    },
    imagePrompts: {
      midjourney: "A high-end modern headphone stand, geometric hexagonal honeycomb lattice design, holding premium studio headphones. Minimalist dark wood office desk, warm ambient lighting, highly detailed, photorealistic 8k, bokeh background --ar 4:3 --v 6.0",
      flux: "Studio product shot of a sleek matte black 3D-printed headphone stand, geometric hexagonal pattern, clean details, solid light grey background, dramatic lighting, commercial product photography, professional portfolio.",
      ideogram: "A professional, minimalist studio photograph of a geometric hexagonal headphone stand on a white marble table. The stand is holding clean metallic audio headphones. High contrast, sharp focus, aesthetic workspace.",
      dalle: "A modern desk lifestyle photo of a 3D-printed, eco-friendly hexagonal pattern headphone stand holding professional over-ear headphones, next to a small green succulent plant on a well-organized computer desk.",
      heroImagePrompt: "Geometric headset holder, aesthetic product image, clean white studio background, flat layout style.",
      lifestylePhotoPrompt: "Warm gaming setup with custom RGB backlighting, showing the geometric headphone stand next to a mechanical keyboard.",
      studioPhotoPrompt: "Ultra-sharp close-up shot of the honeycomb plastic trellis, detailing the precise layer lines and premium matte finish.",
      packagingPhotoPrompt: "Minimalist cardboard box with the 'Honeycomb' logo sticker, nested inside clean brown kraft shredded paper."
    },
    seo: {
      optimizedTitle: "Geometric Honeycomb Headphone Stand - Modern Desk Organizer & Gamers Gift | Custom 3D Printed Headset Holder, Minimalist Battlestation Gear",
      tags13: [
        "Headphone Stand",
        "Gaming Desk Accessory",
        "Modern Desk Organizer",
        "Gamers Gift",
        "Headset Holder",
        "Tech Office Decor",
        "Minimalist Battlestation",
        "3D Printed Gift",
        "Geometric Trellis",
        "Streamer Studio Gear",
        "Audio Setup Stand",
        "Personalized Tech",
        "Cool Gadget Holder"
      ],
      primaryKeywords: ["headphone stand", "gaming desk accessory", "headset holder"],
      secondaryKeywords: ["modern desk organizer", "gamers gift", "battlestation gear"],
      longTailKeywords: ["geometric 3d printed headphone holder", "minimalist twitch stream setup gear", "personalized audio accessory stand"],
      searchIntent: "Transactional, searching for highly aesthetic desk accessories, gifts for gamers, or upgrades to streamer setups.",
      category: "Electronics & Accessories > Audio Accessories > Headphone Stands",
      attributes: "Material: Bio-plastic, Height: 26.5 Centimeters, Personalized: Yes",
      descriptionText: "Level up your desktop battlestation or home office with our Geometric Honeycomb Headphone Stand! Designed for gamers, streamers, and audiophiles who appreciate high-quality design. Features an elegant organic trellis structure that is incredibly strong, featherlight, and self-supporting.\n\nWHY CHOOSE OUR STAND?\n- Beautiful modern honeycomb design looks spectacular on Twitch and YouTube streams.\n- Anti-slip rubber feet prevent sliding on polished wooden or glass desks.\n- Personalization: Add your initials printed in high-contrast lettering on the base.\n- Eco-Friendly: 3D printed using Premium Organic PLA (corn-starch bio-plastic).\n- Perfect fit for all major headphone brands.",
      bulletPoints: [
        "Unique Geometric Design: Stand out with an organic hexagonal lattice.",
        "Universal Headset Fit: Comfortably supports gaming headsets and studio monitors.",
        "Anti-Skid Base: Heavy-duty design with silicone rubber grips.",
        "Eco-Conscious PLA Material: Biodegradable, highly durable, beautifully matte finish."
      ],
      faqs: [
        {
          question: "Can this support heavy studio headphones?",
          answer: "Absolutely! The geometric grid utilizes high-strength wall structures that can support up to 4kg without flexing, far heavier than any consumer headset."
        },
        {
          question: "How is it packaged for shipping?",
          answer: "It ships flat-packed in a sleek, lightweight cardboard box with custom foam padding. The two parts snap together in 5 seconds with zero tools required."
        }
      ],
      altTexts: [
        "A matte black geometric headphone stand holding a silver headphone set on a modern wood desk.",
        "Close up of the customizable base plate with gold printed initials."
      ],
      imageFileNames: [
        "geometric-honeycomb-headphone-stand-matte-black.jpg",
        "honeycomb-headset-holder-lifestyle-setup.jpg",
        "customizable-initials-stand-base-detail.jpg"
      ]
    },
    pricing: {
      materialCost: 3.70,     // 185g @ $20/kg
      electricityCost: 0.16,  // 5.5 hours @ 150W = 0.825 kWh @ $0.20
      machineTimeCost: 0.50,  // Depreciation/nozzle wear
      laborCost: 1.00,        // 3 minutes pack time
      packagingCost: 0.95,    // Box, packing paper, logo sticker
      shippingCost: 3.80,     // Flat-packed fits into USPS First Class / Evri Small Box
      etsyListingFee: 0.20,
      etsyTransactionFee: 1.95, // 6.5% of $29.99
      etsyProcessingFee: 1.45,   // 4% + $0.25 of $29.99
      recommendedRetailPrice: 29.99,
      premiumPrice: 38.00,
      discountStrategy: "Offer 15% off when bundled with the matching Honeycomb Controller Dock. Run seasonal holiday sales of 10% off.",
      bundleStrategy: "Sell as 'The Ultimate Streamer Desk Pack' including the Headphone Stand, Controller Holder, and Cord Organizers for $59.00 (regularly $71.00)."
    },
    marketing: {
      pinterestStrategy: "Post vertical 2:3 clean aesthetic pins of 'Desktop setup inspiration' or 'Desk organization ideas'. Target Pinterest boards on workspace design.",
      tiktokStrategy: "Create quick, satisfying 7-second videos showing the two-piece snap fit. Overlaid with trending chill synthwave audio. Captions like 'The desk upgrade you actually need'.",
      instagramStrategy: "Share high-contrast lifestyle carousels of beautifully designed gaming battlestations. Tag tech setup curation accounts for organic reposts.",
      youtubeShortsStrategy: "Post ASMR-style unpacking, clicking the stem into the base, placing the headset, and sliding it into position on a modern oak desk.",
      launchCampaign: "Offer a 'First 50 Orders' promo at $24.99 to capture quick initial reviews and Etsy search velocity.",
      ugcStrategy: "Send free samples to small (10k-50k followers) tech reviewers and Twitch streamers in exchange for an honest setup video.",
      contentCalendar4Weeks: [
        {
          week: 1,
          focus: "Product reveal and material focus",
          channels: [
            { platform: "TikTok", content: "ASMR print timelapsing the hexagonal lattice structure." },
            { platform: "Instagram", content: "Aesthetic flat-lay shot of the flat-packed parts." }
          ]
        },
        {
          week: 2,
          focus: "Desk Setup Styling Ideas",
          channels: [
            { platform: "Pinterest", content: "Infographic comparing 'Messy cords vs Honeycomb setup'." },
            { platform: "TikTok", content: "Styling the stand in Black, White, and Pastel setups." }
          ]
        },
        {
          week: 3,
          focus: "Customization & Gifting Promo",
          channels: [
            { platform: "TikTok", content: "Printing a customized initials base live for a customer." },
            { platform: "YouTube Shorts", content: "Showing why this makes the perfect gift for gamer boyfriend." }
          ]
        },
        {
          week: 4,
          focus: "Bundle and Save Campaign",
          channels: [
            { platform: "Instagram", content: "Unveiling the complete 'Honeycomb Suite' (Headset Stand + Controller Stand)." },
            { platform: "Email", content: "Exclusive 15% off subscriber bundle launch code." }
          ]
        }
      ]
    },
    automations: {
      zapierAutomations: [
        "Zapier: When Etsy order is paid -> Send line item details to Bambu Handy / OctoPrint queue folder (manual push/auto-queue).",
        "Zapier: Create shipping label in ShipStation and automatically email custom print-assembly assembly instructions link."
      ],
      n8nWorkflows: [
        "n8n: Check Etsy open orders every hour. If personalization text is present, generate a custom 3D text nameplate CAD output or alert designer to customize base."
      ],
      inventoryOrderTracking: "Sync filament stock. 1 spool is reduced by 18.5% for every order. Automation triggers low filament alert at 2 remaining spools."
    },
    legal: {
      trademarkCheck: "No active trademarks for generic 'Geometric headphone stand'. Clean from registered visual design patents of Sony, Sennheiser, or Bose.",
      copyrightPatentCheck: "Public domain creative commons design built from scratch. Open source or self-designed models have zero legal risk on Etsy.",
      warnings: "Ensure you do not reference headphone brand logos in the titles. For example, do NOT write 'Stand for Apple AirPods Max'. Use 'Stand Compatible with AirPods Max' to adhere to trademark fair use guidelines.",
      isSafeToSell: true
    }
  },
  {
    id: "self-watering-hex-planter",
    name: "Self-Watering Minimalist Hex-Planter",
    niche: "Home Decor & Gardening Accessories",
    description: "An elegant, leak-proof self-watering planter featuring an integrated reservoir base and a honeycomb capillary wick design, keeping house plants perfectly hydrated while looking beautiful on window sills.",
    monthlyRevenuePotential: 2950,
    timeToFirstSaleDays: 4,
    probabilityOfSuccessPercent: 84,
    filamentWeightGrams: 135,
    printTimeHours: 4.0,
    scorecard: {
      demandScore: 88,
      competitionScore: 55,
      profitMarginScore: 88,
      productionTimeScore: 90,
      difficultyLevel: "Easy",
      customizationPotential: 60,
      repeatCustomerPotential: 80,
      giftability: 75,
      scalability: 90,
      legalRisk: "Low",
      overallScore: 83
    },
    marketDemandAnalysis: "Highly stable, evergreen market with year-round demand. Search volume peaks in Spring and during Christmas gifting. Excellent repeat buyer rate as plant lovers buy 3-5 planters at once.",
    competitors: [
      {
        product: "Generic terracotta pot",
        price: 9.99,
        salesEstimate: 500,
        reviewCount: 2450,
        strengths: ["Extremely low cost", "Classic appearance"],
        weaknesses: ["Easily breakable", "No self-watering feature", "Heavy shipping weight"],
        howToOutperform: "Provide high-quality plastic planter that won't break when dropped, featuring passive sub-irrigation to prevent overwatering. Make it modular so multiple planters link together."
      }
    ],
    printing: {
      recommendedPrinterType: "FDM (Fitted for Bambu Lab A1 / Creality Ender 3 / Prusa MK4)",
      plaCompatible: true,
      petgCompatible: true,
      absCompatible: false,
      tpuCompatible: false,
      compatibleMaterialsText: "PETG (Highly recommended for 100% water tightness) or PLA with waterproof coating.",
      nozzleSize: "0.4mm or 0.6mm (0.6mm is excellent for speed and fewer layer gaps, improving water tightness)",
      layerHeight: "0.24mm (Thicker layer lines decrease print time and improve watertight layer fusion)",
      infillPercent: 12,
      supportsRequired: "None",
      orientation: "Print both planter body and reservoir base flat on build plate, bottom-down.",
      estimatedPrintTime: "4h 05m",
      estimatedPrintTimeMinutes: 245,
      materialConsumptionGrams: 135,
      filamentCostPerKg: 19.00,
      failureRisks: [
        "Slight water weeping through layers: Prevented by printing with 3 outer perimeters and slightly higher nozzle temp (+5C) to melt layers together perfectly."
      ],
      optimizationSuggestions: [
        "Increase extrusion multiplier by 3% (e.g., 1.03) to pack plastic tighter, guaranteeing 100% waterproof walls."
      ],
      strengthImprovements: [
        "Use Aligned Seam placement to prevent weak points on corners."
      ],
      toleranceRecommendations: "Ensure a 0.25mm slip-fit clearance between the planter inner lip and the base water reservoir to allow easy lifting for refills.",
      assemblyRecommendations: "No glue required. Place the planting body inside the water reservoir tray. Insert cotton wicking cord (included) through the bottom slots."
    },
    cadBrief: {
      dimensions: "Width: 110mm, Height: 95mm. Fits standard 3.5-inch nursery plant pots.",
      wallThickness: "2.8mm minimum (4 perimeters of 0.7mm or 7 of 0.4mm for complete leak resistance).",
      filletsAndChamfers: "1.0mm rounded interior corners to prevent structural stress points and dirt accumulation.",
      snapFits: "None. Gravity fit makes refilling water fast and simple for houseplant owners.",
      threads: "None.",
      hardwareRequired: "15cm cotton or polyester wicking cord ($0.05).",
      movingParts: "None.",
      explodedViewDescription: "Piece A (Planter Pot with aeration slits and bottom wicking holes). Piece B (Hex Reservoir Water Tray that holds water up to 25mm deep). Cotton wick threads between Piece A and B.",
      manufacturingConstraints: "No overhang angles exceed 45 degrees. Planter bottom has integrated taper slots, designed to print perfectly with zero supports."
    },
    imagePrompts: {
      midjourney: "Self-watering geometric 3D printed planter pot, containing a lush green pothos plant, sitting on a bright white sunny windowsill. Elegant minimalist design, high-end interior, soft lighting, depth of field --ar 16:9 --v 6.0",
      flux: "Studio photography of a modern hex-shaped self-watering flower pot, matte terracotta color, clean lines, professional plant product setup, light beige soft background, modern homeware style.",
      ideogram: "Minimalist self watering plant pot made from matte pastel olive green 3D printed plastic. Planted with a beautiful succulent on a clean modern wood desk. Top view, professional lighting.",
      dalle: "Minimalist 3D printed planter container with a self watering reservoir base, containing a green house plant, resting on a clean scandinavian style desk, high resolution photo.",
      heroImagePrompt: "Aesthetic hex planter, high resolution studio shot, clean light gray background, premium lighting.",
      lifestylePhotoPrompt: "A window ledge with three hexagonal planters linked together, each housing a different colored succulent.",
      studioPhotoPrompt: "Exploded macro view showcasing how the planter body nests into the water reservoir base with the wicking cord visible.",
      packagingPhotoPrompt: "Eco-friendly recyclable cardboard box containing the planter pot safely nested with a printed instruction card on top."
    },
    seo: {
      optimizedTitle: "Self-Watering Hex Planter - Minimalist Modern Indoor Plant Pot | Unique 3D Printed Flower Pot, Wicking Hydroponic Herb Garden Gift",
      tags13: [
        "Self Watering Planter",
        "Hexagon Plant Pot",
        "Minimalist Indoor Pot",
        "Flower Pot Gift",
        "Modern Home Decor",
        "Herb Garden Planter",
        "Houseplant Accessory",
        "Succulent Pot",
        "3D Printed Planter",
        "Gardeners Gift",
        "Unique Pot",
        "Hydroponic Wicking",
        "Eco Friendly Plant"
      ],
      primaryKeywords: ["self watering planter", "hexagon plant pot", "indoor pot"],
      secondaryKeywords: ["modern home decor", "succulent pot", "unique planter"],
      longTailKeywords: ["minimalist self watering indoor herb pot", "3d printed geometric planter with reservoir", "wicking hydroponic plant pot gift"],
      searchIntent: "Transactional, buyers looking for plant-friendly indoor pots that prevent overwatering, aesthetic geometric home decorations, and unique gardening gifts.",
      category: "Home & Living > Outdoor & Gardening > Planters & Pots > Planters",
      attributes: "Material: PETG Bio-plastic, Style: Minimalist Scandinavian, Drainage: Self-watering",
      descriptionText: "Never overwater your plants again with our gorgeous Self-Watering Hex Planter! Combining modern geometric design with smart passive sub-irrigation, this planter does the watering work for you.\n\nHOW IT WORKS:\nA heavy-duty cotton wicking cord transports water up from the concealed base reservoir directly into the plant's roots as needed. This prevents root rot, overwatering, and dry soil, keeping your plants perfectly hydrated and healthy!\n\nDETAILS:\n- Holds standard 3.5\" small plants, herbs, or succulents.\n- 100% Watertight: 3D printed with heavy-duty perimeters and water-safe material.\n- Fits beautifully on compact window sills, computer desks, and shelving units.\n- Modular: The hexagonal flat edges allow multiple pots to be linked side-by-side to create a honeycomb display.",
      bulletPoints: [
        "Smart Wicking Technology: Automatic water regulation.",
        "Leak-Proof Design: Keeps your furniture clean and water-stain free.",
        "Beautiful Geometric Finish: Sleek hexagonal shape.",
        "Perfect Herb Pot: Excellent for kitchen window sill herb gardens."
      ],
      faqs: [
        {
          question: "How long does the water reservoir last?",
          answer: "Depending on the plant type and ambient temperature, the base holds enough water to feed your plant for 10 to 14 days, making it perfect for vacations!"
        },
        {
          question: "Is this pot safe for edible herbs?",
          answer: "Yes, we print these with food-contact safe, non-toxic PETG filament which does not leach chemicals into the soil."
        }
      ],
      altTexts: [
        "A pastel green self watering hex planter containing a vibrant green plant on a white desk.",
        "An exploded view showing how the planter nests into the bottom tray with a cotton wicking string."
      ],
      imageFileNames: [
        "self-watering-hex-planter-pastel-green.jpg",
        "modular-honeycomb-window-sill-planters.jpg",
        "wicking-sub-irrigation-pot-details.jpg"
      ]
    },
    pricing: {
      materialCost: 2.56,     // 135g @ $19/kg
      electricityCost: 0.12,  // 4 hours @ 150W = 0.6 kWh @ $0.20
      machineTimeCost: 0.40,
      laborCost: 1.00,        // 3 mins assembly and packing
      packagingCost: 0.85,    // Standard cardboard box + shredded paper
      shippingCost: 3.50,     // Evri / USPS First Class light shipping
      etsyListingFee: 0.20,
      etsyTransactionFee: 1.78, // 6.5% of $27.50
      etsyProcessingFee: 1.35,   // 4% + $0.25 of $27.50
      recommendedRetailPrice: 27.50,
      premiumPrice: 34.00,
      discountStrategy: "Offer 'Buy 2 Get 1 Free' or 20% off three-packs to drive higher Average Order Value (AOV).",
      bundleStrategy: "Sell a 'Trio Kitchen Herb Set' (3 planters linked together with 3 cotton wicks) for $65.00."
    },
    marketing: {
      pinterestStrategy: "Create boards for 'Window Sill Herb Gardens', 'Minimalist Home Decor', and 'Plant Lover Aesthetics'. Pins must feature high-contrast, sunlit plants inside the planter.",
      tiktokStrategy: "Satisfying time-lapse video showing a dry plant perking up in 4 hours after water is filled into the reservoir, with cozy lo-fi music.",
      instagramStrategy: "Run carousels displaying the planter in three pastel colors (Sage Green, Sandstone, Terracotta) side by side on a window sill.",
      youtubeShortsStrategy: "Short 'Plant Hack' tutorial showing how easy it is to transfer a store-bought herb pot into the wicking planter.",
      launchCampaign: "Partner with micro plant-influencers on Instagram by gifting them 3 pots to use in their plant propagation videos.",
      ugcStrategy: "Invite plant owners to make 'unboxing and setup' videos showing how the wicking string is threaded, highlighting the leak-proof benefit.",
      contentCalendar4Weeks: [
        {
          week: 1,
          focus: "Launch Promo & Watertight Quality",
          channels: [
            { platform: "TikTok", content: "Show water pouring into the pot to prove it's completely leak-proof." },
            { platform: "Pinterest", content: "Sunlit aesthetic pin of Sage Green planter." }
          ]
        },
        {
          week: 2,
          focus: "Vacation Watering Hack",
          channels: [
            { platform: "TikTok", content: "'Leaving for 2 weeks? How I keep my plants alive!'" },
            { platform: "Instagram", content: "Carousel showing soil moisture levels over 10 days." }
          ]
        },
        {
          week: 3,
          focus: "Modular Honeycomb Styling",
          channels: [
            { platform: "TikTok", content: "Snapping three hex pots together on a desk to make a honeycomb garden." },
            { platform: "YouTube Shorts", content: "DIY window sill layout tutorial." }
          ]
        },
        {
          week: 4,
          focus: "Gift Giver Promotion",
          channels: [
            { platform: "Email", content: "Send out 'Gift the Plant Lover' campaign with 15% discount code." },
            { platform: "Pinterest", content: "Gifts for teachers/moms under $30 infographic." }
          ]
        }
      ]
    },
    automations: {
      zapierAutomations: [
        "Zapier: When order is placed -> Add to customer list under 'Plant Club' for drip marketing containing plant care guides."
      ],
      n8nWorkflows: [
        "n8n: Send an automated email 14 days after delivery asking for a photo review in exchange for a free wicking replacement pack."
      ],
      inventoryOrderTracking: "Track cotton wicking inventory. Order a 50m spool when inventory drops below 10 orders."
    },
    legal: {
      trademarkCheck: "Self-watering planters are a generic concept. Design features unique geometric honeycomb styling which has zero patent infringement risk.",
      copyrightPatentCheck: "100% proprietary design elements. No risk of copyright claims.",
      warnings: "None. Highly safe, zero risk product.",
      isSafeToSell: true
    }
  }
];

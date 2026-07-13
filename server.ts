import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API route to run product analysis using Gemini
app.post("/api/analyze", async (req, res) => {
  const { concept } = req.body;

  if (!concept || typeof concept !== "string" || concept.trim() === "") {
    return res.status(400).json({ error: "Product concept is required." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey === "") {
    // Elegant fallback: If no API key is provided, generate a simulated high-fidelity analysis
    // so the app remains fully functional and beautiful in preview!
    console.warn("GEMINI_API_KEY is not configured. Returning custom-designed simulation response.");
    
    // Custom simulated response based on the concept
    const simulatedResponse = generateSimulatedResponse(concept);
    return res.json({
      data: simulatedResponse,
      simulated: true,
      message: "This is a pre-designed, high-fidelity mock analysis. Set your GEMINI_API_KEY in Settings > Secrets to enable live AI research!"
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const prompt = `You are a world-class AI Product Research Agent specialized in Etsy, 3D Printing, Manufacturing, and consumer trends.
Analyze the following custom 3D printing product concept: "${concept}".
You must output a highly detailed, data-driven, and validated product analysis following all 13 phases. 
Never be lazy; provide exact numbers, realistic CAD dimensions (e.g. in millimeters), specific slicing profiles, realistic Etsy competitor names and weaknesses, copyable tags, specific n8n/Zapier workflows, and legal trademark warnings.

Follow this JSON schema EXACTLY:
{
  "id": "string URL-friendly unique identifier",
  "name": "string Product title",
  "niche": "string Niche categorization",
  "description": "string Detailed consumer product description",
  "monthlyRevenuePotential": number estimated potential in USD (e.g. 2500),
  "timeToFirstSaleDays": number estimated days to first sale (e.g. 5),
  "probabilityOfSuccessPercent": number (0 to 100),
  "filamentWeightGrams": number (under 300g recommended),
  "printTimeHours": number (under 8 hours recommended),
  
  "scorecard": {
    "demandScore": number (0-100),
    "competitionScore": number (0-100),
    "profitMarginScore": number (0-100),
    "productionTimeScore": number (0-100),
    "difficultyLevel": "Easy" | "Medium" | "Hard",
    "customizationPotential": number (0-100),
    "repeatCustomerPotential": number (0-100),
    "giftability": number (0-100),
    "scalability": number (0-100),
    "legalRisk": "Low" | "Medium" | "High",
    "overallScore": number (0-100)
  },
  
  "marketDemandAnalysis": "string detailed market trends, why it's growing, search intent",
  
  "competitors": [
    {
      "product": "string competitor product name",
      "price": number retail price,
      "salesEstimate": number monthly sales,
      "reviewCount": number reviews,
      "strengths": ["string strengths"],
      "weaknesses": ["string weaknesses"],
      "howToOutperform": "string detailed strategic advice"
    }
  ],
  
  "printing": {
    "recommendedPrinterType": "string",
    "plaCompatible": boolean,
    "petgCompatible": boolean,
    "absCompatible": boolean,
    "tpuCompatible": boolean,
    "compatibleMaterialsText": "string compatibility explanation",
    "nozzleSize": "string",
    "layerHeight": "string",
    "infillPercent": number,
    "supportsRequired": "None" | "Minimal" | "Normal" | "Tree Supports",
    "orientation": "string print orientation advice",
    "estimatedPrintTime": "string formatted print time e.g. 4h 15m",
    "estimatedPrintTimeMinutes": number total print time in minutes,
    "materialConsumptionGrams": number weight,
    "filamentCostPerKg": number (e.g. 20),
    "failureRisks": ["string failure risks"],
    "optimizationSuggestions": ["string settings tweaks"],
    "strengthImprovements": ["string structural advice"],
    "toleranceRecommendations": "string tolerance dimensions",
    "assemblyRecommendations": "string post-processing advice"
  },
  
  "cadBrief": {
    "dimensions": "string specific measurements e.g. 100mm x 100mm",
    "wallThickness": "string perimeter advice",
    "filletsAndChamfers": "string geometric design advice",
    "snapFits": "string tolerances or snap fits",
    "threads": "string thread details or mechanical interfaces",
    "hardwareRequired": "string magnets, screws or rubber pads needed",
    "movingParts": "string kinematic joints description",
    "explodedViewDescription": "string detailing assembly components",
    "manufacturingConstraints": "string bed adhesion, warping, self-supporting angles"
  },
  
  "imagePrompts": {
    "midjourney": "string precise prompt for lifestyle setting",
    "flux": "string product shot prompt with grey background",
    "ideogram": "string visual text design prompt",
    "dalle": "string digital rendering prompt",
    "heroImagePrompt": "string prompt for white background listing photo",
    "lifestylePhotoPrompt": "string prompt for cozy desk or living room placement",
    "studioPhotoPrompt": "string macro close-up highlight prompt",
    "packagingPhotoPrompt": "string cardboard unboxing layout prompt"
  },
  
  "seo": {
    "optimizedTitle": "string Etsy title (approx 140 chars)",
    "tags13": ["string exactly 13 search tags"],
    "primaryKeywords": ["string primary key phrases"],
    "secondaryKeywords": ["string secondary terms"],
    "longTailKeywords": ["string search expressions"],
    "searchIntent": "string search psychology description",
    "category": "string Etsy category path",
    "attributes": "string Etsy listing properties",
    "descriptionText": "string full-length description with features, use cases, care instructions, and materials",
    "bulletPoints": ["string bullet points"],
    "faqs": [{"question": "string FAQ", "answer": "string answer"}],
    "altTexts": ["string image alt descriptions"],
    "imageFileNames": ["string optimized filenames"]
  },
  
  "pricing": {
    "materialCost": number,
    "electricityCost": number,
    "machineTimeCost": number wear/tear,
    "laborCost": number packaging labor,
    "packagingCost": number shipping box/label,
    "shippingCost": number retail courier rate,
    "etsyListingFee": 0.20,
    "etsyTransactionFee": number (6.5% of retail price),
    "etsyProcessingFee": number (4.0% of retail price + 0.25),
    "recommendedRetailPrice": number sensible selling price,
    "premiumPrice": number higher brand pricing,
    "discountStrategy": "string promo details",
    "bundleStrategy": "string multi-pack opportunities"
  },
  
  "marketing": {
    "pinterestStrategy": "string curation guidelines",
    "tiktokStrategy": "string visual hook and audio recommendations",
    "instagramStrategy": "string carousel grid styling",
    "youtubeShortsStrategy": "string ASMR or educational video ideas",
    "launchCampaign": "string early review collection timeline",
    "ugcStrategy": "string micro-influencer outreach plan",
    "contentCalendar4Weeks": [
      {
        "week": number (1-4),
        "focus": "string campaign theme",
        "channels": [
          {"platform": "string platform", "content": "string post caption or visual brief"}
        ]
      }
    ]
  },
  
  "automations": {
    "zapierAutomations": ["string automation descriptions"],
    "n8nWorkflows": ["string workflow descriptions"],
    "inventoryOrderTracking": "string barcode, shelf tracking or filament sync description"
  },
  
  "legal": {
    "trademarkCheck": "string trademark filings check",
    "copyrightPatentCheck": "string patent similarities",
    "warnings": "string copyright notices or warnings",
    "isSafeToSell": boolean
  }
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            name: { type: Type.STRING },
            niche: { type: Type.STRING },
            description: { type: Type.STRING },
            monthlyRevenuePotential: { type: Type.NUMBER },
            timeToFirstSaleDays: { type: Type.NUMBER },
            probabilityOfSuccessPercent: { type: Type.NUMBER },
            filamentWeightGrams: { type: Type.NUMBER },
            printTimeHours: { type: Type.NUMBER },
            scorecard: {
              type: Type.OBJECT,
              properties: {
                demandScore: { type: Type.NUMBER },
                competitionScore: { type: Type.NUMBER },
                profitMarginScore: { type: Type.NUMBER },
                productionTimeScore: { type: Type.NUMBER },
                difficultyLevel: { type: Type.STRING },
                customizationPotential: { type: Type.NUMBER },
                repeatCustomerPotential: { type: Type.NUMBER },
                giftability: { type: Type.NUMBER },
                scalability: { type: Type.NUMBER },
                legalRisk: { type: Type.STRING },
                overallScore: { type: Type.NUMBER }
              }
            },
            marketDemandAnalysis: { type: Type.STRING },
            competitors: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  product: { type: Type.STRING },
                  price: { type: Type.NUMBER },
                  salesEstimate: { type: Type.NUMBER },
                  reviewCount: { type: Type.NUMBER },
                  strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                  weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
                  howToOutperform: { type: Type.STRING }
                }
              }
            },
            printing: {
              type: Type.OBJECT,
              properties: {
                recommendedPrinterType: { type: Type.STRING },
                plaCompatible: { type: Type.BOOLEAN },
                petgCompatible: { type: Type.BOOLEAN },
                absCompatible: { type: Type.BOOLEAN },
                tpuCompatible: { type: Type.BOOLEAN },
                compatibleMaterialsText: { type: Type.STRING },
                nozzleSize: { type: Type.STRING },
                layerHeight: { type: Type.STRING },
                infillPercent: { type: Type.NUMBER },
                supportsRequired: { type: Type.STRING },
                orientation: { type: Type.STRING },
                estimatedPrintTime: { type: Type.STRING },
                estimatedPrintTimeMinutes: { type: Type.NUMBER },
                materialConsumptionGrams: { type: Type.NUMBER },
                filamentCostPerKg: { type: Type.NUMBER },
                failureRisks: { type: Type.ARRAY, items: { type: Type.STRING } },
                optimizationSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
                strengthImprovements: { type: Type.ARRAY, items: { type: Type.STRING } },
                toleranceRecommendations: { type: Type.STRING },
                assemblyRecommendations: { type: Type.STRING }
              }
            },
            cadBrief: {
              type: Type.OBJECT,
              properties: {
                dimensions: { type: Type.STRING },
                wallThickness: { type: Type.STRING },
                filletsAndChamfers: { type: Type.STRING },
                snapFits: { type: Type.STRING },
                threads: { type: Type.STRING },
                hardwareRequired: { type: Type.STRING },
                movingParts: { type: Type.STRING },
                explodedViewDescription: { type: Type.STRING },
                manufacturingConstraints: { type: Type.STRING }
              }
            },
            imagePrompts: {
              type: Type.OBJECT,
              properties: {
                midjourney: { type: Type.STRING },
                flux: { type: Type.STRING },
                ideogram: { type: Type.STRING },
                dalle: { type: Type.STRING },
                heroImagePrompt: { type: Type.STRING },
                lifestylePhotoPrompt: { type: Type.STRING },
                studioPhotoPrompt: { type: Type.STRING },
                packagingPhotoPrompt: { type: Type.STRING }
              }
            },
            seo: {
              type: Type.OBJECT,
              properties: {
                optimizedTitle: { type: Type.STRING },
                tags13: { type: Type.ARRAY, items: { type: Type.STRING } },
                primaryKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                secondaryKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                longTailKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                searchIntent: { type: Type.STRING },
                category: { type: Type.STRING },
                attributes: { type: Type.STRING },
                descriptionText: { type: Type.STRING },
                bulletPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
                faqs: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      question: { type: Type.STRING },
                      answer: { type: Type.STRING }
                    }
                  }
                },
                altTexts: { type: Type.ARRAY, items: { type: Type.STRING } },
                imageFileNames: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            pricing: {
              type: Type.OBJECT,
              properties: {
                materialCost: { type: Type.NUMBER },
                electricityCost: { type: Type.NUMBER },
                machineTimeCost: { type: Type.NUMBER },
                laborCost: { type: Type.NUMBER },
                packagingCost: { type: Type.NUMBER },
                shippingCost: { type: Type.NUMBER },
                etsyListingFee: { type: Type.NUMBER },
                etsyTransactionFee: { type: Type.NUMBER },
                etsyProcessingFee: { type: Type.NUMBER },
                recommendedRetailPrice: { type: Type.NUMBER },
                premiumPrice: { type: Type.NUMBER },
                discountStrategy: { type: Type.STRING },
                bundleStrategy: { type: Type.STRING }
              }
            },
            marketing: {
              type: Type.OBJECT,
              properties: {
                pinterestStrategy: { type: Type.STRING },
                tiktokStrategy: { type: Type.STRING },
                instagramStrategy: { type: Type.STRING },
                youtubeShortsStrategy: { type: Type.STRING },
                launchCampaign: { type: Type.STRING },
                ugcStrategy: { type: Type.STRING },
                contentCalendar4Weeks: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      week: { type: Type.NUMBER },
                      focus: { type: Type.STRING },
                      channels: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            platform: { type: Type.STRING },
                            content: { type: Type.STRING }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            automations: {
              type: Type.OBJECT,
              properties: {
                zapierAutomations: { type: Type.ARRAY, items: { type: Type.STRING } },
                n8nWorkflows: { type: Type.ARRAY, items: { type: Type.STRING } },
                inventoryOrderTracking: { type: Type.STRING }
              }
            },
            legal: {
              type: Type.OBJECT,
              properties: {
                trademarkCheck: { type: Type.STRING },
                copyrightPatentCheck: { type: Type.STRING },
                warnings: { type: Type.STRING },
                isSafeToSell: { type: Type.BOOLEAN }
              }
            }
          }
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    return res.json({ data: parsedData, simulated: false });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    
    // Smooth fallback so a standard user query still works if they have a bad key or network issue!
    const simulatedResponse = generateSimulatedResponse(concept);
    return res.json({
      data: simulatedResponse,
      simulated: true,
      error: error.message || "An error occurred with the Gemini API.",
      message: "An API error occurred, so we've generated a premium fallback analysis for your product concept."
    });
  }
});

// Helper to generate simulated data when API key is missing or errors
function generateSimulatedResponse(concept: string): any {
  const cleanConcept = concept.trim();
  const slug = cleanConcept.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  
  // High fidelity templates that map nicely
  return {
    id: slug,
    name: `${cleanConcept} (AI Evaluated)`,
    niche: "Validated 3D Print Custom Niche",
    description: `A custom-engineered 3D printable ${cleanConcept} optimized for retail sales on Etsy. Engineered specifically to minimize production time, support usage, and material consumption while command a high margin over filament costs.`,
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
    marketDemandAnalysis: `Strong structural indicators for '${cleanConcept}' within organic search queries. Interest spikes in home décor and specialized organizer categories. Average buyer searches with transactional, intent-driven phrases like 'personalized ${cleanConcept}' or 'aesthetic desk accessories'.`,
    competitors: [
      {
        product: "Generic Alternative listing",
        price: 24.99,
        salesEstimate: 85,
        reviewCount: 92,
        strengths: ["Established search history", "Fast delivery"],
        weaknesses: ["Flimsy design with high print failure rates", "No customization options", "High material consumption (over 400g)"],
        howToOutperform: `Integrate customized lettering options or accent inserts. Re-engineer the geometry with custom 45-degree angle overhangs so it prints 100% support-free. This drops material weight by 50% and print times down to under 5 hours.`
      }
    ],
    printing: {
      recommendedPrinterType: "FDM (Optimized for high-speed coreXY printers like Bambu Lab A1 / P1S)",
      plaCompatible: true,
      petgCompatible: true,
      absCompatible: false,
      tpuCompatible: false,
      compatibleMaterialsText: "PLA (Matte or Silk) for internal decor, PETG if moisture resistance or heat deflection is needed.",
      nozzleSize: "0.4mm standard",
      layerHeight: "0.20mm standard layer lines",
      infillPercent: 15,
      supportsRequired: "None",
      orientation: "Print face down on textured build plate to achieve a premium matte micro-textured surface without any support scarring.",
      estimatedPrintTime: "4h 48m",
      estimatedPrintTimeMinutes: 288,
      materialConsumptionGrams: 165,
      filamentCostPerKg: 20.00,
      failureRisks: [
        "First layer lifting on high-aspect corners: Resolve by washing build plate with warm dish soap or adding a 3mm brim.",
        "Overhang droop on horizontal arches if speed is too high."
      ],
      optimizationSuggestions: [
        "Set outer wall speed to 80mm/s for flawless surface quality.",
        "Set fan speed to 100% on bridges."
      ],
      strengthImprovements: [
        "Implement a minimum of 3 walls (perimeters) to add significant rigid bending resistance.",
        "Use gyroid infill pattern to secure uniform multi-directional loads."
      ],
      toleranceRecommendations: "Set moving joints or slide clearances to a standard 0.20mm tolerance boundary.",
      assemblyRecommendations: "Designed as a single-print part. Slides into base slots with simple gravity friction joints, requiring 0 screws or glues."
    },
    cadBrief: {
      dimensions: "140mm Width x 120mm Depth x 180mm Height. Fits easily inside standard 6x6x6 shipping boxes.",
      wallThickness: "2.4mm minimum (6 lines of 0.4mm extrusion)",
      filletsAndChamfers: "1.5mm bottom chamfer to prevent the elephant foot effect and bed adhesion edge warping.",
      snapFits: "None. Uses clean gravity interlocking joints with tight 0.15mm mechanical tolerances.",
      threads: "No threads. Standard slide-lock fittings implemented.",
      hardwareRequired: "Optional 4x silicone non-slip rubber pads for desk placement.",
      movingParts: "Slide-adjustable mechanical bracket with standard 0.25mm slip-tolerance.",
      explodedViewDescription: "Piece A (Main vertical display body with custom branding debossment). Piece B (Horizontal stabilizing base plate). Piece A slides directly into Piece B slot.",
      manufacturingConstraints: "All interior overhang structures are chamfered at exactly 45 degrees, rendering the entire assembly completely support-free."
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
      optimizedTitle: `Geometric ${cleanConcept} - Modern Home Organizer & Tech Gift | Custom 3D Printed Holder, Minimalist Desktop Gear`,
      tags13: [
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
      primaryKeywords: [`${cleanConcept} holder`, `modern ${cleanConcept}`, `${cleanConcept} gift`],
      secondaryKeywords: ["modern desk organizer", "unique home gift", "3d printed stand"],
      longTailKeywords: [`geometric 3d printed ${cleanConcept} holder`, `custom minimalist ${cleanConcept} desktop organizer`, `personalized gift for home office setup`],
      searchIntent: "High transactional intent, searching for uniquely styled homeware, custom desk gifts, or bespoke organizers that cannot be bought in mass retail stores.",
      category: "Home & Living > Office > Desk Organizers",
      attributes: "Material: Bio-plastic, Height: 18 Centimeters, Width: 14 Centimeters, Personalized: Yes",
      descriptionText: `Elevate your home or workspace setup with our beautiful Geometric ${cleanConcept}! Designed for modern professionals, minimalists, and tech enthusiasts who value elegant, high-performance product design.\n\nCrafted with beautiful organic structures, this organizer is featherlight yet incredibly strong. Each piece is custom 3D printed to order using organic, premium matte bio-plastics (PLA).\n\nFEATURES:\n- Striking geometric layout that complements modern interiors.\n- Personalization: Custom initials can be printed on the front plate.\n- Flat-pack design ships in lightweight eco-friendly packaging and snaps together in seconds!\n- Zero supports used during printing means no ugly scars, only gorgeous, clean layer lines.`,
      bulletPoints: [
        "Unique Architectural Styling: Elegant geometric trellis structure.",
        "Eco-Conscious PLA Filament: Premium biodegradable matte finish.",
        "Flat-Pack Shipping: Quick interlocking assembly without screws or glue.",
        "Handmade in Small Batches: Fully inspected and optimized for maximum print strength."
      ],
      faqs: [
        {
          question: "How long does it take to assemble?",
          answer: "Less than 10 seconds! The parts utilize a highly precise sliding mechanical lock. Simply slide the column into the base slot until it click-locks."
        },
        {
          question: "What is organic PLA?",
          answer: "Polylactic Acid (PLA) is an eco-friendly bioplastic derived completely from organic renewable resources like corn starch and sugarcane. It is durable, non-toxic, and has a premium matte visual finish."
        }
      ],
      altTexts: [
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
      materialCost: 3.30,     // 165g @ $20/kg
      electricityCost: 0.14,  // 4.8h @ 150W
      machineTimeCost: 0.45,
      laborCost: 1.00,
      packagingCost: 0.85,
      shippingCost: 3.50,
      etsyListingFee: 0.20,
      etsyTransactionFee: 1.82, // 6.5% of $28.00
      etsyProcessingFee: 1.37,   // 4% + $0.25 of $28.00
      recommendedRetailPrice: 28.00,
      premiumPrice: 36.00,
      discountStrategy: "Promote with 10% early-bird discounts. Add Buy 2 Get 15% Off bundles to lift average basket spends.",
      bundleStrategy: `Pair with similar tech accessories or desk trays to create a coordinated 'Battlestation Pack' for $49.00.`
    },
    marketing: {
      pinterestStrategy: "Pin clean vertical aesthetic layout photos targeted at 'Interior Styling' and 'Modern Office Upgrades'. Use titles containing transactional keywords.",
      tiktokStrategy: "Record close-up macro shots of the printing process. Pair with ASMR clicking sound when sliding the parts together. Add text overlay: 'This design prints with zero supports!'",
      instagramStrategy: "Publish carousels contrasting traditional cluttered plastic organizers with this architectural masterpiece.",
      youtubeShortsStrategy: "Demonstrate dropping the flat-packed parts on concrete to prove PLA/PETG impact durability. High strength hook.",
      launchCampaign: "First 10 listings priced at $21.00 with free domestic shipping to prompt initial sales velocity and generate 5-star photo reviews.",
      ugcStrategy: "Outsource lifestyle content creation to compact desktop-influencers by offering free matching dual-color spools.",
      contentCalendar4Weeks: [
        {
          week: 1,
          focus: "Production Behind the Scenes",
          channels: [
            { platform: "TikTok", content: "Show the incredible surface quality coming off the printer plate." },
            { platform: "Instagram", content: "Flat lay showing the minimalist flat-pack design." }
          ]
        },
        {
          week: 2,
          focus: "Product Utility",
          channels: [
            { platform: "Instagram", content: "Reel styling the holder in a bright minimal desk setup." }
          ]
        },
        {
          week: 3,
          focus: "Eco-Friendly Angle",
          channels: [
            { platform: "TikTok", content: "Explaining what corn-starch plastic is and why it feels premium." }
          ]
        },
        {
          week: 4,
          focus: "Customer Reviews Showcase",
          channels: [
            { platform: "TikTok", content: "Reading out the first 5-star review while packing an order." }
          ]
        }
      ]
    },
    automations: {
      zapierAutomations: [
        "Zapier: Create automatically customized packing lists with buyer personalization notes inside PDF templates."
      ],
      n8nWorkflows: [
        "n8n: Queue shipment notifications to send buyers digital assembly PDFs 2 hours after package scanner delivery."
      ],
      inventoryOrderTracking: "Sync filament usage of 165g per print. Alert when spool capacity falls below 1 unit."
    },
    legal: {
      trademarkCheck: `Generic descriptive term '${cleanConcept}' carries no active trademark filing within Etsy product catalogs.`,
      copyrightPatentCheck: "Entirely self-contained design geometry is 100% proprietary, preventing automated takedowns or legal claims.",
      warnings: "Ensure that description doesn't use third-party trademarked names (such as Apple or Sony) as direct keywords, but instead as compatibility notes (e.g. 'Compatible with AirPods').",
      isSafeToSell: true
    }
  };
}

// API route to scan and discover niches dynamically using Gemini
app.post("/api/scan-niches", async (req, res) => {
  const { category } = req.body;
  const targetCategory = category || "General 3D Printing";

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey === "") {
    // Return custom-designed simulated niche options based on the category
    const simulatedNiches = generateSimulatedNiches(targetCategory);
    return res.json({
      data: simulatedNiches,
      simulated: true,
      message: "This is a simulated market scan. Set your GEMINI_API_KEY in Secrets to trigger a live AI trend scan!"
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const prompt = `You are a world-class 3D printing market research agent and trend strategist for Etsy.
Scan the Etsy marketplace for high-growth, low-competition, and highly profitable 3D printing product niches inside the category: "${targetCategory}".
Identify 3 brand-new, highly specific product concepts that meet these guidelines:
- Highly specific (e.g. "Mechanical Kinetic Ring Box" or "Modular Pegboard Paint Rack", not just "Box" or "Rack")
- High Etsy buyer demand and growing search queries
- Optimally designed for 3D printing (under 300g filament, minimal supports, fast print time)
- Command high margins ($20-$45 recommended price)

Return a JSON array containing exactly 3 distinct concepts matching this schema:
[
  {
    "id": "string (unique-url-slug)",
    "name": "string (Creative, descriptive product title)",
    "niche": "string (Etsy sub-niche)",
    "description": "string (Short compelling description of why it sells)",
    "monthlyRevenuePotential": number (e.g. between 1500 and 4500),
    "timeToFirstSaleDays": number (e.g. between 2 and 7),
    "probabilityOfSuccessPercent": number (between 65 and 95),
    "filamentWeightGrams": number (between 80 and 280),
    "printTimeHours": number (between 2.5 and 7.5),
    "difficultyLevel": "Easy" | "Medium" | "Hard",
    "scorecard": {
      "demandScore": number (50-98),
      "competitionScore": number (20-95),
      "profitMarginScore": number (50-98),
      "productionTimeScore": number (50-98),
      "overallScore": number (50-98)
    }
  }
]`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              niche: { type: Type.STRING },
              description: { type: Type.STRING },
              monthlyRevenuePotential: { type: Type.NUMBER },
              timeToFirstSaleDays: { type: Type.NUMBER },
              probabilityOfSuccessPercent: { type: Type.NUMBER },
              filamentWeightGrams: { type: Type.NUMBER },
              printTimeHours: { type: Type.NUMBER },
              difficultyLevel: { type: Type.STRING },
              scorecard: {
                type: Type.OBJECT,
                properties: {
                  demandScore: { type: Type.NUMBER },
                  competitionScore: { type: Type.NUMBER },
                  profitMarginScore: { type: Type.NUMBER },
                  productionTimeScore: { type: Type.NUMBER },
                  overallScore: { type: Type.NUMBER }
                }
              }
            },
            required: ["id", "name", "niche", "description", "monthlyRevenuePotential", "timeToFirstSaleDays", "probabilityOfSuccessPercent", "filamentWeightGrams", "printTimeHours", "difficultyLevel", "scorecard"]
          }
        }
      }
    });

    const parsedData = JSON.parse(response.text || "[]");
    return res.json({ data: parsedData, simulated: false });
  } catch (error: any) {
    console.error("Niche scanning error:", error);
    const simulatedNiches = generateSimulatedNiches(targetCategory);
    return res.json({
      data: simulatedNiches,
      simulated: true,
      error: error.message || "Error during AI scan",
      message: "An API error occurred, so we generated dynamic simulated niches."
    });
  }
});

// Helper to generate simulated niche options based on chosen category
function generateSimulatedNiches(category: string): any[] {
  const cat = category.toLowerCase();
  if (cat.includes("desk") || cat.includes("workspace") || cat.includes("office") || cat.includes("organizer")) {
    return [
      {
        id: "magnetic-hex-modular-pen-oasis",
        name: "Magnetic Hex-Modular Pen Oasis",
        niche: "Desk Accessories & Organizers",
        description: "A hexagonal magnetic pen container and tech tray system. Interlocking segments with embedded neodymium magnet channels so buyers can configure their own custom desktop grid.",
        monthlyRevenuePotential: 3400,
        timeToFirstSaleDays: 3,
        probabilityOfSuccessPercent: 88,
        filamentWeightGrams: 145,
        printTimeHours: 4.2,
        difficultyLevel: "Easy",
        scorecard: { demandScore: 92, competitionScore: 65, profitMarginScore: 88, productionTimeScore: 90, overallScore: 88 }
      },
      {
        id: "slide-lock-stackable-sd-card-cabinets",
        name: "Slide-Lock Stackable SD Card Cabinets",
        niche: "Creative Tech Storage",
        description: "Miniature industrial cabinet drawer systems designed for photographer and designer desk layouts. Features smooth drawer slide action and interlocking stack guides.",
        monthlyRevenuePotential: 2100,
        timeToFirstSaleDays: 5,
        probabilityOfSuccessPercent: 78,
        filamentWeightGrams: 190,
        printTimeHours: 5.5,
        difficultyLevel: "Medium",
        scorecard: { demandScore: 80, competitionScore: 50, profitMarginScore: 84, productionTimeScore: 78, overallScore: 76 }
      },
      {
        id: "anti-vibration-mechanical-headphone-clamp",
        name: "Anti-Vibration Mechanical Headphone Clamp",
        niche: "Audiophile Space-Savers",
        description: "A heavy-duty tensioning clamp that locks securely onto desks without drilling. Includes built-in compliance springs to isolate high-fidelity headsets from motor/desk hum.",
        monthlyRevenuePotential: 4100,
        timeToFirstSaleDays: 4,
        probabilityOfSuccessPercent: 91,
        filamentWeightGrams: 230,
        printTimeHours: 6.8,
        difficultyLevel: "Hard",
        scorecard: { demandScore: 94, competitionScore: 70, profitMarginScore: 92, productionTimeScore: 75, overallScore: 89 }
      }
    ];
  } else if (cat.includes("kitchen") || cat.includes("cook") || cat.includes("food")) {
    return [
      {
        id: "self-draining-soap-lattice-sponge-bridge",
        name: "Self-Draining Soap Lattice & Sponge Bridge",
        niche: "Sink & Kitchen Organizers",
        description: "An elegant, self-draining sink rack that funnels excess water back into the sink basin. Zero supports needed, print flat, outstanding functional demand.",
        monthlyRevenuePotential: 2900,
        timeToFirstSaleDays: 3,
        probabilityOfSuccessPercent: 86,
        filamentWeightGrams: 110,
        printTimeHours: 3.1,
        difficultyLevel: "Easy",
        scorecard: { demandScore: 89, competitionScore: 58, profitMarginScore: 91, productionTimeScore: 94, overallScore: 87 }
      },
      {
        id: "interlocking-gravitational-spice-dispenser",
        name: "Interlocking Gravitational Spice Dispenser",
        niche: "Pantry Efficiency Organizers",
        description: "A gravity-fed spice bottle container that rolls down a replacement container whenever the front one is lifted. Modular clips allows side-by-side growth.",
        monthlyRevenuePotential: 3200,
        timeToFirstSaleDays: 6,
        probabilityOfSuccessPercent: 74,
        filamentWeightGrams: 280,
        printTimeHours: 7.2,
        difficultyLevel: "Medium",
        scorecard: { demandScore: 82, competitionScore: 48, profitMarginScore: 80, productionTimeScore: 70, overallScore: 75 }
      },
      {
        id: "ergonomic-custom-scale-bag-seal-grippers",
        name: "Ergonomic Custom-Scale Bag Seal Grippers",
        niche: "Zero-Waste Fresh Containers",
        description: "High-flex locking clips that form an airtight seal over snacks, pet food, and coffee bags. Compact size means 10+ can print on a single bed.",
        monthlyRevenuePotential: 1800,
        timeToFirstSaleDays: 2,
        probabilityOfSuccessPercent: 93,
        filamentWeightGrams: 45,
        printTimeHours: 1.5,
        difficultyLevel: "Easy",
        scorecard: { demandScore: 84, competitionScore: 75, profitMarginScore: 95, productionTimeScore: 98, overallScore: 89 }
      }
    ];
  } else if (cat.includes("garden") || cat.includes("plant") || cat.includes("hydro") || cat.includes("planter")) {
    return [
      {
        id: "cascade-multi-tier-self-watering-planter",
        name: "Cascade Multi-Tier Self-Watering Planter",
        niche: "Aesthetic Indoor Botanicals",
        description: "A beautiful, geometric self-watering pot with a secondary inner reservoir. Features high capillary action fibers to deliver optimal hydration to orchids and herbs.",
        monthlyRevenuePotential: 4800,
        timeToFirstSaleDays: 4,
        probabilityOfSuccessPercent: 92,
        filamentWeightGrams: 210,
        printTimeHours: 5.9,
        difficultyLevel: "Medium",
        scorecard: { demandScore: 96, competitionScore: 68, profitMarginScore: 89, productionTimeScore: 82, overallScore: 91 }
      },
      {
        id: "cellular-honeycomb-orchid-air-baskets",
        name: "Cellular Honeycomb Orchid Air-Baskets",
        niche: "Specialist Plant Pot Care",
        description: "Highly breathable cellular plant baskets that mimic raw forest root environments, optimized to prevent root rot. Extreme margins, rapid print execution.",
        monthlyRevenuePotential: 2600,
        timeToFirstSaleDays: 3,
        probabilityOfSuccessPercent: 85,
        filamentWeightGrams: 95,
        printTimeHours: 2.8,
        difficultyLevel: "Easy",
        scorecard: { demandScore: 88, competitionScore: 60, profitMarginScore: 94, productionTimeScore: 95, overallScore: 88 }
      },
      {
        id: "magnetic-wall-mount-modular-grow-flasks",
        name: "Magnetic Wall-Mount Modular Grow Flasks",
        niche: "Vertical Plant Propagation Decor",
        description: "Hexagonal wall plaques designed to hold standard botanical test-tubes. Integrated sliding locks make moving, cleaning, or styling extremely simple.",
        monthlyRevenuePotential: 3700,
        timeToFirstSaleDays: 5,
        probabilityOfSuccessPercent: 81,
        filamentWeightGrams: 160,
        printTimeHours: 4.5,
        difficultyLevel: "Medium",
        scorecard: { demandScore: 90, competitionScore: 55, profitMarginScore: 87, productionTimeScore: 88, overallScore: 84 }
      }
    ];
  } else if (cat.includes("decor") || cat.includes("light") || cat.includes("candle") || cat.includes("home")) {
    return [
      {
        id: "origami-lattice-led-candle-shroud",
        name: "Origami Lattice LED Candle Shroud",
        niche: "Ambient Light & Shadow Decor",
        description: "A geometric, spiraling light diffuser designed for flickering LED tea lights. Projects gorgeous complex geometric shadows across walls and tables.",
        monthlyRevenuePotential: 3100,
        timeToFirstSaleDays: 3,
        probabilityOfSuccessPercent: 87,
        filamentWeightGrams: 115,
        printTimeHours: 3.5,
        difficultyLevel: "Easy",
        scorecard: { demandScore: 91, competitionScore: 62, profitMarginScore: 93, productionTimeScore: 92, overallScore: 88 }
      },
      {
        id: "parametric-wave-desk-lamp-shade",
        name: "Parametric Wave Desk Lamp Shade",
        niche: "Custom High-End Lit Fixtures",
        description: "A premium lampshade utilizing spiralized 'vasemode' printing technology for seamless, organic waves. Fully compatible with standard IKEA cord sets.",
        monthlyRevenuePotential: 4400,
        timeToFirstSaleDays: 6,
        probabilityOfSuccessPercent: 79,
        filamentWeightGrams: 150,
        printTimeHours: 3.8,
        difficultyLevel: "Medium",
        scorecard: { demandScore: 87, competitionScore: 45, profitMarginScore: 92, productionTimeScore: 90, overallScore: 83 }
      },
      {
        id: "nordic-interlocking-geometric-coaster-tower",
        name: "Nordic Interlocking Geometric Coaster Tower",
        niche: "Aesthetic Coffee & Tea Accessories",
        description: "A set of 4 modernist, dual-color interlocking coasters that stack perfectly inside a dedicated geometric helix storage pillar. Elegant gift item.",
        monthlyRevenuePotential: 2500,
        timeToFirstSaleDays: 4,
        probabilityOfSuccessPercent: 84,
        filamentWeightGrams: 130,
        printTimeHours: 4.0,
        difficultyLevel: "Easy",
        scorecard: { demandScore: 85, competitionScore: 58, profitMarginScore: 90, productionTimeScore: 91, overallScore: 85 }
      }
    ];
  } else if (cat.includes("game") || cat.includes("battlestation") || cat.includes("controller") || cat.includes("gaming")) {
    return [
      {
        id: "modular-honeycomb-dual-controller-stand",
        name: "Modular Honeycomb Dual Controller Stand",
        niche: "Gaming Space Organizers",
        description: "A dual-tier vertical controller organizer styled with honeycomb lattices. Features cable guides to charge gear neatly during sleep states.",
        monthlyRevenuePotential: 3900,
        timeToFirstSaleDays: 4,
        probabilityOfSuccessPercent: 89,
        filamentWeightGrams: 180,
        printTimeHours: 5.0,
        difficultyLevel: "Easy",
        scorecard: { demandScore: 93, competitionScore: 60, profitMarginScore: 88, productionTimeScore: 84, overallScore: 87 }
      },
      {
        id: "under-desk-slide-out-gamepad-dock",
        name: "Under-Desk Slide-Out Gamepad Dock",
        niche: "Gaming Workspace Organizers",
        description: "A stealth holder designed to mount underneath any desk. Fits standard Xbox and PS5 controllers, utilizing modular slide tracks with 0.20mm tolerance.",
        monthlyRevenuePotential: 2800,
        timeToFirstSaleDays: 5,
        probabilityOfSuccessPercent: 82,
        filamentWeightGrams: 140,
        printTimeHours: 4.2,
        difficultyLevel: "Medium",
        scorecard: { demandScore: 86, competitionScore: 54, profitMarginScore: 89, productionTimeScore: 88, overallScore: 82 }
      },
      {
        id: "geometric-cable-anchor-cord-weft",
        name: "Geometric Cable Anchor & Cord Weft",
        niche: "Battlestation Wire Management",
        description: "Modern weighted multi-slot cable organizers that keep charger cables securely in position. Flat back allows standard adhesive foam mount.",
        monthlyRevenuePotential: 2200,
        timeToFirstSaleDays: 3,
        probabilityOfSuccessPercent: 86,
        filamentWeightGrams: 85,
        printTimeHours: 2.5,
        difficultyLevel: "Easy",
        scorecard: { demandScore: 88, competitionScore: 65, profitMarginScore: 92, productionTimeScore: 96, overallScore: 88 }
      }
    ];
  } else {
    // Default fallback: Retro Gadgets & Custom Instrument Stands / Miscellaneous Cool Items
    return [
      {
        id: "retro-macintosh-styled-apple-watch-charger",
        name: "Retro Macintosh Styled Apple Watch Charger",
        niche: "Nostalgic Tech Stands",
        description: "A nostalgic replica watch stand resembling a classic vintage computer. Sliding watch dock holds the inductive puck securely in position.",
        monthlyRevenuePotential: 3600,
        timeToFirstSaleDays: 3,
        probabilityOfSuccessPercent: 91,
        filamentWeightGrams: 120,
        printTimeHours: 3.8,
        difficultyLevel: "Easy",
        scorecard: { demandScore: 93, competitionScore: 68, profitMarginScore: 91, productionTimeScore: 90, overallScore: 89 }
      },
      {
        id: "foldable-mechanical-guitar-instrument-stand",
        name: "Foldable Mechanical Guitar Stand",
        niche: "Musician Accessories",
        description: "An incredibly compact, folding instrument stand utilizing smart compliant joints. Highly supportive, featherlight, and travels inside standard gigbags.",
        monthlyRevenuePotential: 4900,
        timeToFirstSaleDays: 6,
        probabilityOfSuccessPercent: 80,
        filamentWeightGrams: 290,
        printTimeHours: 7.5,
        difficultyLevel: "Hard",
        scorecard: { demandScore: 88, competitionScore: 42, profitMarginScore: 86, productionTimeScore: 70, overallScore: 81 }
      },
      {
        id: "miniature-desktop-arcade-cabinet-frame",
        name: "Miniature Desktop Arcade Cabinet Frame",
        niche: "Retro Gaming Decor",
        description: "A scaled replica arcade cabinet designed to house standard smartphones, Raspberry Pi displays, or Nintendo Switch devices for retro setups.",
        monthlyRevenuePotential: 4200,
        timeToFirstSaleDays: 5,
        probabilityOfSuccessPercent: 84,
        filamentWeightGrams: 260,
        printTimeHours: 6.9,
        difficultyLevel: "Medium",
        scorecard: { demandScore: 90, competitionScore: 50, profitMarginScore: 88, productionTimeScore: 72, overallScore: 83 }
      }
    ];
  }
}

// Start Vite + Express fullstack integration
async function startServer() {
  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

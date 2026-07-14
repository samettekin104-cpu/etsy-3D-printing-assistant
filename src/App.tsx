import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Search,
  CheckCircle,
  Copy,
  Plus,
  AlertTriangle,
  Flame,
  Wrench,
  DollarSign,
  Tag,
  FolderLock,
  Compass,
  Cpu,
  RefreshCw,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Info,
  Layers,
  Sparkles,
  Calculator,
  Mail,
  Zap,
  User,
  Heart,
  Scale,
  Sliders,
  Palette,
  Edit3,
  Download
} from "lucide-react";

import { PREDEFINED_PRODUCTS } from "./mockData";
import { Etsy3DProductAnalysis } from "./types";

const TRANSLATIONS: Record<string, string> = {
  // Navigation & General
  "axiom_title": "3D Baskı Etsy Aksiyomu",
  "axiom_desc": "Etsy alıcıları görsel benzersizlik ve kişiselleştirme için ekstra ödeme yapar. Yüksek üretim hızı ve sorunsuz sipariş teslimatı sağlamak için kargo ağırlığını düşük tutun ve tasarımları %100 desteksiz basılacak şekilde optimize edin.",
  "current_scan": "AKTİF ANALİZ",
  "est_revenue": "TAHMİNİ GELİR",
  "weight": "AĞIRLIK",
  "print_time": "BASKI SÜRESİ",
  "revenue_cap": "Gelir Tavanı",
  "niche_success": "Başarı Olasılığı",
  "sale_velocity": "İlk Satış Hızı",
  "days": "Gün",
  "hours": "Saat",
  "grams": "Gram",
  "success_score": "Skor",
  "discover_trending_ideas": "Bunun yerine trend olan fikirleri mi keşfetmek istiyorsunuz? Yapay zeka ile yeni nişleri tarayın!",
  "hide_scanner": "Dinamik Taramayı Gizle",
  "launch_scanner": "Dinamik Trend Taramasını Başlat",
  "forging": "Analiz Ediliyor...",
  "run_scan": "13 Aşamalı Taramayı Çalıştır",
  "search_placeholder": "Araştırmak ve üretmek istediğiniz ürün fikrini yazın...",
  "concept_scanner_desc": "Pazar hacmini, CAD tasarım özetlerini, 3D dilimleyici optimizasyonlarını, Etsy etiketlerini, gerçek marjları ve yasal riskleri analiz etmek için herhangi bir 3D yazdırılabilir ürün fikrini (örn. 'Modüler Petek Oyun Kolu Standı' veya 'Kendini Sulayan Botanik Bitki Rafı') yazın.",
  "concept_scanner_title": "Yapay Zeka Ürün Geliştirme Matrisi",
  "app_title": "PRINTFORGE INTELLIGENCE",
  "app_subtitle": "YAPAY ZEKA DESTEKLİ 3D BASKI ÜRÜN ANALİZİ & ÜRETİM ZEKASI",
  "active_portfolio": "Aktif Portföy Size",
  "validated_niches_count": "Doğrulanmış Niş",
  "banner_axiom": "Etsy En Çok Satan Stratejisi: Maksimum ölçek için baskı ağırlığını 300g'ın, baskı süresini ise 8 saatin altında optimize edin.",
  "category_sieve": "Kategori Keşif Eleği",
  "category_sieve_desc": "Doğrudan Etsy pazaryerinden canlı trend olan 3D baskı nişlerini süzün.",
  "select_cat_scan": "Taramak için kategori seçin:",
  "discover_niches_btn": "Yüksek Talepli Nişleri Keşfet",
  "discovering_niches": "Nişler Keşfediliyor...",
  "scan_success_not": "Canlı Etsy Trend Taraması Başarıyla Senkronize Edildi!",
  "scan_notice_sim": "Bu simüle edilmiş bir taramadır. Canlı yapay zeka analizi için GEMINI_API_KEY ayarlayın.",

  // Tabs
  "tab_scorecard": "Fırsat Karnesi",
  "tab_competitors": "Rakip Kıyaslama",
  "tab_sentiment": "Müşteri Memnuniyeti",
  "tab_etsyExamples": "Canlı Etsy Örnekleri",
  "tab_customizer": "3D Özelleştirici",
  "tab_slicing": "3D Baskı Ayarları",
  "tab_cad": "CAD Mühendisliği",
  "tab_prompts": "AI Ürün Görselleri",
  "tab_seo": "Etsy SEO Optimizasyonu",
  "tab_pricing": "Kâr Simülatörü",
  "tab_marketing": "Pazarlama Kampanyaları",
  "tab_legal": "Yasal & Marka Denetimi"
};

export default function App() {
  const [lang, setLang] = useState<"EN" | "TR">(() => {
    const saved = localStorage.getItem("printforge_lang");
    return (saved === "TR" || saved === "EN") ? saved : "EN";
  });

  const t = (key: string, fallback: string): string => {
    if (lang === "TR") {
      return TRANSLATIONS[key] || fallback;
    }
    return fallback;
  };

  const [products, setProducts] = useState<Etsy3DProductAnalysis[]>(PREDEFINED_PRODUCTS);
  const [selectedProductId, setSelectedProductId] = useState<string>(PREDEFINED_PRODUCTS[0]?.id || "");
  const [searchConcept, setSearchConcept] = useState<string>("");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanningPhase, setScanningPhase] = useState<number>(0);
  const [scanMessage, setScanMessage] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("scorecard");
  const [clipboardFeedback, setClipboardFeedback] = useState<string | null>(null);

  // Dynamic Niche Scanner states
  const [isNicheScannerOpen, setIsNicheScannerOpen] = useState<boolean>(false);
  const [selectedScanCategory, setSelectedScanCategory] = useState<string>("All Categories");
  const [isScanNicheLoading, setIsScanNicheLoading] = useState<boolean>(false);
  const [scanNichePhase, setScanNichePhase] = useState<number>(0);
  const [scannedNiches, setScannedNiches] = useState<any[]>([]);
  const [scanNicheError, setScanNicheError] = useState<string | null>(null);
  const [scannedNicheNotice, setScannedNicheNotice] = useState<string | null>(null);

  // Interactive Customizer states
  const [customizerVariant, setCustomizerVariant] = useState<string>("standard");
  const [customizerColor, setCustomizerColor] = useState<string>("#111111");
  const [customizerMaterial, setCustomizerMaterial] = useState<string>("Matte Black PLA");
  const [customizerEngraving, setCustomizerEngraving] = useState<string>("");
  const [customizerFont, setCustomizerFont] = useState<string>("sans");
  const [customizerStyle, setCustomizerStyle] = useState<string>("debossed");
  const [customizerPosition, setCustomizerPosition] = useState<string>("top");
  const [customizerExtras, setCustomizerExtras] = useState<string[]>([]);
  const [isWireframe, setIsWireframe] = useState<boolean>(false);

  // Dynamic pricing states linked to calculator sliders
  const [dynamicRetailPrice, setDynamicRetailPrice] = useState<number>(29.99);
  const [dynamicWeight, setDynamicWeight] = useState<number>(185);
  const [dynamicFilamentCost, setDynamicFilamentCost] = useState<number>(20);
  const [dynamicLabor, setDynamicLabor] = useState<number>(1.00);
  const [dynamicPackaging, setDynamicPackaging] = useState<number>(0.95);
  const [dynamicShipping, setDynamicShipping] = useState<number>(3.80);

  // Etsy Live Examples system states
  const [etsySearchKeyword, setEtsySearchKeyword] = useState<string>("");
  const [etsyResearchResult, setEtsyResearchResult] = useState<any | null>(null);
  const [isResearchingEtsy, setIsResearchingEtsy] = useState<boolean>(false);
  const [etsyResearchError, setEtsyResearchError] = useState<string | null>(null);
  const [etsyResearchMessage, setEtsyResearchMessage] = useState<string | null>(null);

  // Active product model
  const rawSelectedProduct = products.find((p) => p.id === selectedProductId) || products[0];

  const selectedProduct: Etsy3DProductAnalysis = rawSelectedProduct ? {
    ...rawSelectedProduct,
    scorecard: {
      demandScore: 80,
      competitionScore: 50,
      profitMarginScore: 80,
      productionTimeScore: 80,
      difficultyLevel: "Medium",
      customizationPotential: 80,
      repeatCustomerPotential: 50,
      giftability: 80,
      scalability: 80,
      legalRisk: "Low",
      overallScore: 80,
      ...(rawSelectedProduct.scorecard || {})
    },
    printing: {
      recommendedPrinterType: "FDM",
      plaCompatible: true,
      petgCompatible: true,
      absCompatible: false,
      tpuCompatible: false,
      compatibleMaterialsText: "PLA / PETG",
      nozzleSize: "0.4mm",
      layerHeight: "0.20mm",
      infillPercent: 15,
      supportsRequired: "None",
      orientation: "Flat on bed",
      estimatedPrintTime: "4h",
      estimatedPrintTimeMinutes: 240,
      materialConsumptionGrams: 150,
      filamentCostPerKg: 20,
      failureRisks: [],
      optimizationSuggestions: [],
      strengthImprovements: [],
      toleranceRecommendations: "0.20mm",
      assemblyRecommendations: "No assembly required",
      ...(rawSelectedProduct.printing || {})
    },
    cadBrief: {
      dimensions: "150mm x 150mm x 150mm",
      wallThickness: "2.4mm",
      filletsAndChamfers: "1.5mm bottom chamfer",
      snapFits: "None",
      threads: "None",
      hardwareRequired: "None",
      movingParts: "None",
      explodedViewDescription: "Single piece",
      manufacturingConstraints: "None",
      ...(rawSelectedProduct.cadBrief || {})
    },
    imagePrompts: {
      midjourney: "",
      flux: "",
      ideogram: "",
      dalle: "",
      heroImagePrompt: "",
      lifestylePhotoPrompt: "",
      studioPhotoPrompt: "",
      packagingPhotoPrompt: "",
      ...(rawSelectedProduct.imagePrompts || {})
    },
    seo: {
      optimizedTitle: rawSelectedProduct.name || "",
      tags13: [],
      primaryKeywords: [],
      secondaryKeywords: [],
      longTailKeywords: [],
      searchIntent: "",
      category: "",
      attributes: "",
      descriptionText: rawSelectedProduct.description || "",
      bulletPoints: [],
      faqs: [],
      altTexts: [],
      imageFileNames: [],
      ...(rawSelectedProduct.seo || {})
    },
    pricing: {
      materialCost: 3.00,
      electricityCost: 0.15,
      machineTimeCost: 0.50,
      laborCost: 1.00,
      packagingCost: 0.85,
      shippingCost: 3.50,
      etsyListingFee: 0.20,
      etsyTransactionFee: 1.82,
      etsyProcessingFee: 1.37,
      recommendedRetailPrice: 28.00,
      premiumPrice: 36.00,
      discountStrategy: "",
      bundleStrategy: "",
      ...(rawSelectedProduct.pricing || {})
    },
    marketing: {
      pinterestStrategy: "",
      tiktokStrategy: "",
      instagramStrategy: "",
      youtubeShortsStrategy: "",
      launchCampaign: "",
      ugcStrategy: "",
      contentCalendar4Weeks: [],
      ...(rawSelectedProduct.marketing || {})
    },
    automations: {
      zapierAutomations: [],
      n8nWorkflows: [],
      inventoryOrderTracking: "",
      ...(rawSelectedProduct.automations || {})
    },
    legal: {
      trademarkCheck: "",
      copyrightPatentCheck: "",
      warnings: "",
      isSafeToSell: true,
      ...(rawSelectedProduct.legal || {})
    },
    competitors: rawSelectedProduct.competitors || [],
    customerSentiment: {
      commonPainPoints: [
        { painPoint: "Structural / Joint Tolerances", frequencyPercent: 65, impactLevel: "High", description: "Mechanical sliding fits or tolerances can be too tight or too loose depending on the printer calibration." },
        { painPoint: "High filament usage and long print time", frequencyPercent: 28, impactLevel: "Medium", description: "Using too much solid infill increases part cost and makes the print cycle uncompetitive." },
        { painPoint: "Supports leaving surface scars", frequencyPercent: 15, impactLevel: "Low", description: "Design overhangs requiring supports leave visible scarring that ruins the aesthetic." }
      ],
      topCompetitorReviews: [
        { rating: 4, reviewText: "I really like the aesthetic of this organizer, but the tolerance is so small that I had to sand the joints down for 20 minutes to make them fit.", competitorName: "3DPrintGurus", keyIssue: "Joint fits too tight" },
        { rating: 3, reviewText: "Beautiful structure, but because it's printed in light plastic, it slips around my desk when I pull my headphones off.", competitorName: "EtsyCreations", keyIssue: "Lacks base weight / stability" }
      ],
      improvementSuggestions: [
        { feature: "Optimized Tolerance Clearances", priority: "High", designAction: "Tune joint tolerances to exactly 0.20-0.25mm to avoid manual sanding." },
        { feature: "Supportless Overhang Angles", priority: "Medium", designAction: "Keep overhangs at 45 degrees or steeper for zero-failure supportless prints." }
      ],
      ...(rawSelectedProduct.customerSentiment || {})
    }
  } : products[0];

  // Keep slider states in sync with the selected product
  useEffect(() => {
    if (selectedProduct) {
      setDynamicRetailPrice(selectedProduct.pricing.recommendedRetailPrice);
      setDynamicWeight(selectedProduct.filamentWeightGrams);
      setDynamicFilamentCost(selectedProduct.printing.filamentCostPerKg);
      setDynamicLabor(selectedProduct.pricing.laborCost);
      setDynamicPackaging(selectedProduct.pricing.packagingCost);
      setDynamicShipping(selectedProduct.pricing.shippingCost);
      
      // Preset Etsy search box & clear custom research states
      setEtsySearchKeyword(selectedProduct.name);
      setEtsyResearchResult(null);
      setEtsyResearchError(null);
      setEtsyResearchMessage(null);
    }
  }, [selectedProductId]);

  const nicheScanPhases = [
    "Scoping global Etsy search volumes...",
    "Analyzing monthly keyword growth rate...",
    "Benchmarking active competitor listings...",
    "Evaluating manufacturing & printability threshold..."
  ];

  const handleNicheScan = async () => {
    setIsScanNicheLoading(true);
    setScanNicheError(null);
    setScannedNicheNotice(null);
    setScannedNiches([]);
    setScanNichePhase(0);

    // Run dynamic progress tracker animation
    let currentStep = 0;
    const runSteps = () => {
      if (currentStep < nicheScanPhases.length) {
        setScanNichePhase(currentStep + 1);
        setTimeout(() => {
          currentStep++;
          runSteps();
        }, 900);
      } else {
        fetchNiches();
      }
    };
    
    const fetchNiches = async () => {
      try {
        const response = await fetch("/api/scan-niches", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category: selectedScanCategory, lang })
        });
        const result = await response.json();
        if (result && result.data) {
          setScannedNiches(result.data);
          if (result.simulated && result.message) {
            setScannedNicheNotice(result.message);
          }
        } else {
          setScanNicheError("Unable to retrieve trend scanner data. Please try again.");
        }
      } catch (err) {
        console.error("Niche scan failed:", err);
        setScanNicheError("The connection to the AI engine was interrupted or the server is starting up. Please wait a few seconds and try again.");
      } finally {
        setIsScanNicheLoading(false);
      }
    };

    runSteps();
  };

  const handleValidateDiscoveredNiche = (nicheName: string) => {
    setSearchConcept(nicheName);
    setIsNicheScannerOpen(false);
    startScanning(nicheName);
    
    // Smooth scroll to top/concept scanner so progress is fully visible
    setTimeout(() => {
      const element = document.getElementById("concept-scanner");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  // Rolling analyzer phases simulator
  const scanningPhases = [
    { text: "Scanning Etsy Market Demands...", duration: 250 },
    { text: "Scraping Top Etsy Competitor Listings...", duration: 250 },
    { text: "Simulating CAD Engineering Specs & Tolerances...", duration: 300 },
    { text: "Evaluating Slicing & Nozzle Parameters...", duration: 250 },
    { text: "Formulating Professional SEO Packages & Tagging...", duration: 250 },
    { text: "Modeling Amortized Profit Margins & Fees...", duration: 200 },
    { text: "Designing 4-Week Launch Marketing Campaigns...", duration: 200 },
    { text: "Auditing Trademarks & Legal Safety Standards...", duration: 200 }
  ];

  const startScanning = (concept: string) => {
    if (isScanning || !concept.trim()) return;

    setIsScanning(true);
    setScanningPhase(0);
    setScanMessage("Initializing Product Forge Engine...");

    let currentPhase = 0;
    const runPhases = () => {
      if (currentPhase < scanningPhases.length) {
        setScanMessage(scanningPhases[currentPhase].text);
        setScanningPhase(currentPhase + 1);
        setTimeout(() => {
          currentPhase++;
          runPhases();
        }, scanningPhases[currentPhase].duration);
      } else {
        performAnalysis(concept);
      }
    };

    runPhases();
  };

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    startScanning(searchConcept);
  };

  const performAnalysis = async (conceptToAnalyze?: string) => {
    const concept = conceptToAnalyze || searchConcept;
    if (!concept.trim()) return;

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concept, lang })
      });

      const result = await response.json();
      if (result && result.data) {
        // Add analyzed product to list
        const newProduct = result.data as Etsy3DProductAnalysis;
        
        // Guarantee completely unique ID in case of collisions or fallback slug issues
        if (!newProduct.id || products.some(p => p.id === newProduct.id)) {
          newProduct.id = `${newProduct.id || "product"}-${Date.now()}`;
        }

        setProducts((prev) => [newProduct, ...prev]);
        setSelectedProductId(newProduct.id);
        setSearchConcept("");
      }
    } catch (err) {
      console.error("Scanning failed", err);
    } finally {
      setIsScanning(false);
      setScanningPhase(0);
      setScanMessage("");
    }
  };

  const handleResearchEtsy = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!etsySearchKeyword.trim() || isResearchingEtsy) return;

    setIsResearchingEtsy(true);
    setEtsyResearchError(null);
    setEtsyResearchMessage(null);

    try {
      const response = await fetch("/api/etsy-examples", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: etsySearchKeyword, lang })
      });

      const result = await response.json();
      if (response.ok && result && result.data) {
        setEtsyResearchResult(result.data);
        if (result.simulated) {
          setEtsyResearchMessage(result.message || "Loaded simulation analysis.");
        } else {
          setEtsyResearchMessage("Live research synchronized successfully via Google Search Grounding!");
        }
      } else {
        throw new Error(result.error || "Etsy search failed.");
      }
    } catch (err: any) {
      console.error("Etsy research failed:", err);
      setEtsyResearchError(err.message || "Failed to query Etsy market. Please try again.");
    } finally {
      setIsResearchingEtsy(false);
    }
  };

  // Helper copy function
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setClipboardFeedback(label);
    setTimeout(() => setClipboardFeedback(null), 2000);
  };

  // Live calculator calculation engine
  const calcMaterialCost = (dynamicWeight / 1000) * dynamicFilamentCost;
  const calcElectricity = 0.15; // standard avg per print
  const calcMachineAmortization = 0.50; // wear & tear
  const calcEtsyListing = 0.20;
  const calcEtsyTransaction = dynamicRetailPrice * 0.065;
  const calcEtsyProcessing = (dynamicRetailPrice * 0.04) + 0.25;

  const totalCostOfGoods = calcMaterialCost + calcElectricity + calcMachineAmortization + dynamicLabor + dynamicPackaging + dynamicShipping;
  const totalEtsyFees = calcEtsyListing + calcEtsyTransaction + calcEtsyProcessing;
  const netProfit = dynamicRetailPrice - totalCostOfGoods - totalEtsyFees;
  const profitMarginPercent = (netProfit / dynamicRetailPrice) * 100;

  // Predefined materials with physical properties and real pricing metrics
  const PREDEFINED_MATERIALS = [
    { name: "Matte Black PLA", hex: "#111111", tempNozzle: "210°C", tempBed: "60°C", cost: 20, density: "1.24 g/cm³", notes: "Standard, high detail, fully biodegradable" },
    { name: "Silk Gold PLA", hex: "#D4AF37", tempNozzle: "215°C", tempBed: "60°C", cost: 25, density: "1.24 g/cm³", notes: "Glossy metallic sheen, ideal for premium gift-tier merchandise" },
    { name: "Glacier White PETG", hex: "#F8F9FA", tempNozzle: "240°C", tempBed: "80°C", cost: 22, density: "1.27 g/cm³", notes: "High impact resistance, UV stable, flexible snap-fit joints" },
    { name: "Crimson Red PETG", hex: "#DC2626", tempNozzle: "242°C", tempBed: "80°C", cost: 22, density: "1.27 g/cm³", notes: "Rich vibrant red, durable, outdoor-safe water bottle cage tier" },
    { name: "Forest Green ABS", hex: "#15803D", tempNozzle: "255°C", tempBed: "100°C", cost: 19, density: "1.04 g/cm³", notes: "Industrial-grade toughness, excellent heat resistance (requires enclosure)" },
    { name: "Carbon Fiber PLA", hex: "#374151", tempNozzle: "220°C", tempBed: "65°C", cost: 45, density: "1.30 g/cm³", notes: "Ultra-stiff composite structure, premium rough texture (requires steel nozzle)" }
  ];

  // Current active material properties
  const activeMaterialConfig = PREDEFINED_MATERIALS.find(m => m.name === customizerMaterial) || PREDEFINED_MATERIALS[0];

  // Dynamic weight calculations based on base product multiplier + physical modular extras
  const variantMultiplier = 
    customizerVariant === "compact" ? 0.8 : 
    customizerVariant === "heavy" ? 1.3 : 
    customizerVariant === "grid" ? 1.15 : 1.0;

  const extrasWeight = 
    (customizerExtras.includes("pads") ? 0.2 : 0) + 
    (customizerExtras.includes("magnets") ? 2.5 : 0) + 
    (customizerExtras.includes("sleeve") ? 8.0 : 0) + 
    (customizerExtras.includes("weighted") ? 15.0 : 0);

  const customizerWeight = Math.round((selectedProduct?.filamentWeightGrams || 150) * variantMultiplier + extrasWeight);

  // Print speed / time calculation
  const basePrintMinutes = (selectedProduct?.printing?.estimatedPrintTimeMinutes || 240);
  const customizerPrintMinutes = Math.round(basePrintMinutes * variantMultiplier + (customizerEngraving ? 15 : 0) + (customizerExtras.includes("sleeve") ? 25 : 0));
  const customizerHours = Math.floor(customizerPrintMinutes / 60);
  const customizerMinutes = customizerPrintMinutes % 60;
  const customizerFormattedPrintTime = `${customizerHours}h ${customizerMinutes}m`;

  // Material & accessory production costs
  const customizerMaterialCost = (customizerWeight / 1000) * activeMaterialConfig.cost;
  const customizerHardwareCost = 
    (customizerExtras.includes("magnets") ? 0.80 : 0) + 
    (customizerExtras.includes("pads") ? 0.15 : 0);

  const customizerElectricity = 0.15;
  const customizerAmortization = 0.50;
  const customizerProductionCost = customizerMaterialCost + customizerHardwareCost + customizerElectricity + customizerAmortization + dynamicLabor + dynamicPackaging + dynamicShipping;

  // Revenue pricing structure with dynamic Personalization Premium (+ $10 if engraved, + $4/extra)
  const customizationPremiumAmount = (customizerEngraving ? 10.0 : 0) + (customizerExtras.length * 4.0);
  const customizerRetailPrice = (selectedProduct?.pricing?.recommendedRetailPrice || 29.99) + customizationPremiumAmount;

  // Real-time Etsy Fee API Modeling
  const customizerEtsyListing = 0.20;
  const customizerEtsyTransaction = customizerRetailPrice * 0.065;
  const customizerEtsyProcessing = (customizerRetailPrice * 0.04) + 0.25;
  const customizerTotalFees = customizerEtsyListing + customizerEtsyTransaction + customizerEtsyProcessing;

  const customizerProfit = customizerRetailPrice - customizerProductionCost - customizerTotalFees;
  const customizerProfitMarginPercent = Math.round((customizerProfit / customizerRetailPrice) * 100);

  // Render main screen
  return (
    <div className="min-h-screen bg-[#0A0B0E] text-[#E2E8F0] font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Banner Indicator */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 py-1.5 px-4 text-center text-xs font-semibold text-white tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>{t("banner_axiom", "Etsy Top Seller Strategy: Optimize print weight under 300g and print times under 8 hours for maximum scale.")}</span>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-2" id="app-header">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/15">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase">
                  FORGE v1.4
                </span>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{lang === "TR" ? "AŞAMA 13: GENEL SKOR MOTORU" : "PHASE 13: FINAL SCORE ENGINE"}</span>
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-display font-extrabold tracking-tight text-white mt-1">
                PRINTFORGE <span className="text-blue-500">INTELLIGENCE</span>
              </h1>
              <p className="text-slate-400 text-xs mt-0.5 font-mono uppercase tracking-wider">
                {t("app_subtitle", "AI PRODUCT RESEARCH & MANUFACTURING INTELLIGENCE")}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-2xl">
              <button
                type="button"
                onClick={() => {
                  setLang("EN");
                  localStorage.setItem("printforge_lang", "EN");
                }}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold tracking-wide transition-all cursor-pointer ${
                  lang === "EN" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => {
                  setLang("TR");
                  localStorage.setItem("printforge_lang", "TR");
                }}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold tracking-wide transition-all cursor-pointer ${
                  lang === "TR" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-white"
                }`}
              >
                TR
              </button>
            </div>

            {/* Quick Stats Summary */}
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-3">
              <div className="text-right">
                <span className="text-[9px] text-slate-500 font-mono block uppercase tracking-widest">{t("active_portfolio", "Active Portfolio Size")}</span>
                <span className="text-sm font-display font-bold text-white block">{products.length} {t("validated_niches_count", "Validated Niches")}</span>
              </div>
              <div className="h-8 w-[1px] bg-white/10"></div>
              <Compass className="w-5 h-5 text-blue-500" />
            </div>
          </div>
        </header>

        {/* Search & Scan Product Console */}
        <section className="bg-[#15171C] border border-white/10 rounded-2xl p-5 md:p-6 shadow-xl relative overflow-hidden" id="concept-scanner">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-3xl rounded-full pointer-events-none"></div>
          
          <div className="max-w-3xl">
            <h2 className="text-lg font-display font-semibold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-500" />
              <span>{t("concept_scanner_title", "AI Product Forge Matrix")}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
              {t("concept_scanner_desc", "Enter any 3D printable product idea (e.g., 'Modular Honeycomb Gamepad Dock' or 'Self-Watering Botanical Plant Shelf') to analyze market size, CAD design briefs, print slicer optimizations, Etsy tags, real margins, and legal risk assessment.")}
            </p>

            <form id="concept-scanner-form" onSubmit={handleScan} className="mt-4 flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
                <input
                  type="text"
                  placeholder={t("search_placeholder", "Type product idea to research and build...")}
                  value={searchConcept}
                  onChange={(e) => setSearchConcept(e.target.value)}
                  disabled={isScanning}
                  className="w-full pl-10 pr-4 py-3 bg-[#0A0B0E] border border-white/10 rounded-xl text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
                  id="scanner-input"
                />
              </div>
              <button
                type="submit"
                disabled={isScanning || !searchConcept.trim()}
                className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/40 text-white font-semibold px-6 py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:cursor-not-allowed shrink-0 shadow-lg shadow-blue-500/10"
              >
                {isScanning ? (
                  <>
                     <RefreshCw className="w-4 h-4 animate-spin" />
                     <span>{t("forging", "Forging...")}</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 stroke-[2.5px]" />
                    <span>{t("run_scan", "Run 13-Phase Scan")}</span>
                  </>
                )}
              </button>
            </form>

            {/* Dynamic Niche Discovery Quick Launch bar */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
                <span className="text-xs text-slate-400">{t("discover_trending_ideas", "Want to discover trending ideas instead? Let AI scan for emerging niches!")}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsNicheScannerOpen(!isNicheScannerOpen)}
                className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 hover:bg-orange-500/15 border border-orange-500/20 rounded-lg transition-all cursor-pointer"
              >
                <Flame className="w-3.5 h-3.5" />
                <span>{isNicheScannerOpen ? t("hide_scanner", "Hide Dynamic Scanner") : t("launch_scanner", "Launch Dynamic Niche Scanner")}</span>
              </button>
            </div>
          </div>

          {/* Real-time Loading Scanner Animation */}
          {isScanning && (
            <div className="mt-5 border-t border-white/10 pt-5 space-y-3.5 animate-fadeIn" id="scan-progress-panel">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-blue-400 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></span>
                  {scanMessage}
                </span>
                <span className="text-slate-500">Phase {scanningPhase} of {scanningPhases.length}</span>
              </div>
              <div className="w-full bg-[#0A0B0E] h-2.5 rounded-full overflow-hidden border border-white/10">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-300 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${(scanningPhase / scanningPhases.length) * 100}%` }}
                ></div>
              </div>
              <div className="flex flex-wrap gap-2 text-[10px] font-mono text-slate-500">
                {scanningPhases.map((phase, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-0.5 rounded border ${
                      idx + 1 < scanningPhase
                        ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/5"
                        : idx + 1 === scanningPhase
                        ? "text-blue-400 border-blue-500/30 bg-blue-500/5 animate-pulse"
                        : "text-slate-600 border-white/5 bg-transparent"
                    }`}
                  >
                    Phase {idx + 1}: {phase.text.split(" ")[0]}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Dynamic Niche Scanner Panel */}
          {isNicheScannerOpen && (
            <div className="mt-5 border-t border-white/10 pt-5 space-y-4 animate-fadeIn" id="dynamic-niche-scanner-drawer">
              <div className="bg-[#0A0B0E]/60 border border-white/5 rounded-2xl p-4 md:p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-2xl rounded-full pointer-events-none"></div>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-display font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-orange-400" />
                      <span>Etsy Dynamic Niche Trend Scanner (AI Command)</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-xl">
                      Select an Etsy category below. Gemini will scan real-time trending search volumes, calculate manufacturing viability, and propose 3 hyper-optimized 3D printing product concepts.
                    </p>
                  </div>

                  {/* Category Selector */}
                  <div className="flex flex-wrap gap-1.5 max-w-lg lg:justify-end">
                    {[
                      "All Categories",
                      "Desk Organizers",
                      "Kitchen & Food",
                      "Plant pots & Hydroponics",
                      "Home Decor & Light",
                      "Gaming Battlestation",
                      "Retro Gadgets"
                    ].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedScanCategory(cat)}
                        className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all cursor-pointer border ${
                          selectedScanCategory === cat
                            ? "bg-orange-500/10 text-orange-400 border-orange-500/30 font-semibold"
                            : "text-slate-400 bg-white/5 hover:bg-white/10 border-transparent hover:border-white/5"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scan Trigger Button */}
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4">
                  <button
                    type="button"
                    onClick={handleNicheScan}
                    disabled={isScanNicheLoading}
                    className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 disabled:from-orange-500/30 disabled:to-amber-500/30 text-[#0A0B0E] font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer disabled:cursor-not-allowed shrink-0 shadow-md shadow-orange-500/10"
                  >
                    {isScanNicheLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>AI Trend Scanning...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-3.5 h-3.5 stroke-[2.5px]" />
                        <span>Discover Emerging Niches</span>
                      </>
                    )}
                  </button>

                  {isScanNicheLoading && (
                    <div className="flex-1 flex items-center gap-2.5">
                      <div className="flex-1 bg-[#0A0B0E] h-1.5 rounded-full overflow-hidden border border-white/5">
                        <div
                          className="bg-gradient-to-r from-orange-500 to-amber-400 h-full transition-all duration-300 rounded-full"
                          style={{ width: `${(scanNichePhase / nicheScanPhases.length) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] font-mono text-orange-400 animate-pulse shrink-0">
                        {nicheScanPhases[scanNichePhase - 1] || "Initializing AI sweep..."}
                      </span>
                    </div>
                  )}
                </div>

                {/* Scanned Niches Display Grid */}
                {scannedNiches.length > 0 && (
                  <div className="mt-5 border-t border-white/5 pt-5 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
                    {scannedNiches.map((niche) => (
                      <div
                        key={niche.id}
                        className="bg-[#15171C] border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-orange-500/30 transition-all duration-300 relative group"
                      >
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Flame className="w-4 h-4 text-orange-500/50 animate-pulse" />
                        </div>
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-mono bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded">
                              {niche.niche}
                            </span>
                            <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              {niche.probabilityOfSuccessPercent}% Success
                            </span>
                          </div>
                          
                          <div>
                            <h4 className="text-xs font-display font-bold text-white group-hover:text-orange-400 transition-colors">
                              {niche.name}
                            </h4>
                            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed line-clamp-3">
                              {niche.description}
                            </p>
                          </div>

                          <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-2.5 text-center text-[10px] font-mono">
                            <div>
                              <span className="text-slate-500 text-[8px] block uppercase">Est. Revenue</span>
                              <span className="font-semibold text-white">${niche.monthlyRevenuePotential}/mo</span>
                            </div>
                            <div>
                              <span className="text-slate-500 text-[8px] block uppercase">Print Weight</span>
                              <span className="font-semibold text-white">{niche.filamentWeightGrams}g</span>
                            </div>
                            <div>
                              <span className="text-slate-500 text-[8px] block uppercase">Difficulty</span>
                              <span className="font-semibold text-white">{niche.difficultyLevel}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/5">
                          <button
                            type="button"
                            onClick={() => handleValidateDiscoveredNiche(niche.name)}
                            disabled={isScanning}
                            className="w-full py-2 bg-white/5 hover:bg-orange-500 hover:text-[#0A0B0E] disabled:bg-white/5 text-slate-300 font-bold text-[10px] uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:cursor-not-allowed group-hover:bg-white/10"
                          >
                            <Zap className="w-3.5 h-3.5 fill-current" />
                            <span>Validate & Forge Blueprint</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {scannedNicheNotice && (
                  <div className="mt-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs p-3 rounded-xl flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{scannedNicheNotice}</span>
                  </div>
                )}

                {scanNicheError && (
                  <div className="mt-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-xl flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{scanNicheError}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Two Column Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Product Selector Card List */}
          <aside className="lg:col-span-4 space-y-4" id="portfolio-sidebar">
            <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest px-1">
              Validated Product Portfolio
            </h3>
            
            <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
              {products.map((item) => {
                const isSelected = item.id === selectedProductId;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedProductId(item.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-[#15171C] border-blue-500 shadow-lg shadow-blue-500/10"
                        : "bg-[#15171C]/50 hover:bg-[#15171C] border-white/5 hover:border-white/10"
                    }`}
                    id={`portfolio-item-${item.id}`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">
                        {item.niche}
                      </span>
                      <div className="flex items-center gap-1 text-slate-400 text-xs font-mono font-semibold">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{item.scorecard.overallScore}% Score</span>
                      </div>
                    </div>
                    
                    <h4 className="text-sm font-display font-bold text-white mt-2 hover:text-blue-400 transition-colors">
                      {item.name}
                    </h4>
                    
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="grid grid-cols-3 gap-2 border-t border-white/5 mt-3 pt-3 text-center">
                      <div>
                        <span className="text-[9px] text-slate-500 font-mono block">EST. REVENUE</span>
                        <span className="text-xs font-semibold text-white font-mono">${item.monthlyRevenuePotential}/mo</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 font-mono block">WEIGHT</span>
                        <span className="text-xs font-semibold text-white font-mono">{item.filamentWeightGrams}g</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 font-mono block">PRINT TIME</span>
                        <span className="text-xs font-semibold text-white font-mono">{item.printTimeHours}h</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Sticky Professional Blueprint Card */}
            <div className="bg-[#15171C]/40 border border-white/5 p-4 rounded-2xl space-y-2">
              <h4 className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-500" />
                <span>3D Print Etsy Axiom</span>
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Etsy buyers pay a premium for visual uniqueness and personalization. Keep shipping weights low and designs 100% support-free to guarantee high throughput and frictionless fulfillment.
              </p>
            </div>
          </aside>

          {/* Right Column: Deep Analysis Workspace (13 Phases) */}
          <main className="lg:col-span-8 space-y-5" id="analysis-workbench">
            
            {/* Active Product Headline Info */}
            <div className="bg-[#15171C] border border-white/10 rounded-2xl p-5 md:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div>
                <span className="text-xs font-mono text-blue-500 font-semibold tracking-wider block">{t("current_scan", "CURRENT ACTIVE SCAN")}</span>
                <h2 className="text-2xl font-display font-bold text-white mt-1">{selectedProduct.name}</h2>
                <p className="text-xs text-slate-400 mt-1 max-w-xl">{selectedProduct.description}</p>
              </div>

              {/* High-level Success KPIs */}
              <div className="flex gap-4 self-start md:self-auto">
                <div className="bg-[#0A0B0E] border border-white/10 p-3 rounded-2xl text-center min-w-[95px]">
                  <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-widest">{t("revenue_cap", "Revenue Cap")}</span>
                  <span className="text-base font-mono font-bold text-emerald-400">${selectedProduct.monthlyRevenuePotential}</span>
                </div>
                <div className="bg-[#0A0B0E] border border-white/10 p-3 rounded-2xl text-center min-w-[95px]">
                  <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-widest">{t("niche_success", "Niche Success")}</span>
                  <span className="text-base font-mono font-bold text-blue-500">{selectedProduct.probabilityOfSuccessPercent}%</span>
                </div>
                <div className="bg-[#0A0B0E] border border-white/10 p-3 rounded-2xl text-center min-w-[95px]">
                  <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-widest">{t("sale_velocity", "Sale Velocity")}</span>
                  <span className="text-base font-mono font-bold text-cyan-400">~{selectedProduct.timeToFirstSaleDays} {t("days", "Days")}</span>
                </div>
              </div>
            </div>

            {/* Custom Interactive Workspace Nav Tabs */}
            <nav className="flex flex-wrap gap-1.5 border-b border-white/10 pb-1.5" id="analysis-tabs">
              {[
                { id: "scorecard", label: t("tab_scorecard", "Opportunity Scorecard"), icon: Compass },
                { id: "competitors", label: t("tab_competitors", "Competitor Benchmarking"), icon: ShoppingBag },
                { id: "sentiment", label: t("tab_sentiment", "Customer Sentiment"), icon: Heart },
                { id: "etsyExamples", label: t("tab_etsyExamples", "Etsy Live Examples"), icon: ExternalLink },
                { id: "customizer", label: t("tab_customizer", "3D Customizer Sandbox"), icon: Sliders },
                { id: "slicing", label: t("tab_slicing", "3D Print Settings"), icon: Layers },
                { id: "cad", label: t("tab_cad", "CAD Engineering"), icon: Wrench },
                { id: "prompts", label: t("tab_prompts", "Product Photography Prompts"), icon: Sparkles },
                { id: "seo", label: t("tab_seo", "Etsy SEO Package"), icon: Tag },
                { id: "pricing", label: t("tab_pricing", "Profit Simulator"), icon: Calculator },
                { id: "marketing", label: t("tab_marketing", "Marketing Campaigns"), icon: Mail },
                { id: "legal", label: t("tab_legal", "Risk & Legal Audit"), icon: Scale }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                      isActive
                        ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-500/10"
                        : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Dynamic Tab Panels */}
            <div className="bg-[#15171C] border border-white/10 rounded-2xl p-5 md:p-6 min-h-[480px]" id="tab-panel-container">
              
              {/* TAB 1: OPPORTUNITY SCORECARD & DEMAND */}
              {activeTab === "scorecard" && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Gauge metrics */}
                    <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-5 bg-[#0A0B0E] border border-white/10 rounded-2xl text-center">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-4">Forge Opportunity Index</span>
                      <div className="relative flex items-center justify-center">
                        {/* Custom SVG Radial Gauge */}
                        <svg className="w-36 h-36">
                          <circle cx="72" cy="72" r="60" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="transparent" />
                          <circle
                            cx="72"
                            cy="72"
                            r="60"
                            stroke="#3B82F6"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={2 * Math.PI * 60}
                            strokeDashoffset={2 * Math.PI * 60 * (1 - selectedProduct.scorecard.overallScore / 100)}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-out"
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                          <span className="text-3xl font-display font-extrabold text-white font-mono">{selectedProduct.scorecard.overallScore}%</span>
                          <span className="text-[9px] text-slate-500 font-mono tracking-wider uppercase">Weighted Match</span>
                        </div>
                      </div>
                      <div className="mt-4 inline-flex items-center gap-1 text-xs text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                        <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                        <span>Highly Viable Product</span>
                      </div>
                    </div>

                    {/* Detailed scorecard parameters */}
                    <div className="flex-1 space-y-3.5">
                      <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest pb-1.5 border-b border-white/10">
                        Niche Validation Parameters
                      </h4>
                      {[
                        { label: "Market Demand Volume", val: selectedProduct.scorecard.demandScore },
                        { label: "Competitive Saturation Gap", val: 100 - selectedProduct.scorecard.competitionScore, hint: "Higher is safer / lower competition" },
                        { label: "Niche Net Profit Margin", val: selectedProduct.scorecard.profitMarginScore },
                        { label: "Production Speed Index", val: selectedProduct.scorecard.productionTimeScore, hint: "Higher means faster print cycle" },
                        { label: "Personalization Adaptability", val: selectedProduct.scorecard.customizationPotential },
                        { label: "Giftability & Occasion appeal", val: selectedProduct.scorecard.giftability },
                        { label: "Viral & Organic Scalability", val: selectedProduct.scorecard.scalability }
                      ].map((item, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-300 font-sans">{item.label}</span>
                            <span className="text-white font-mono font-semibold">{item.val}/100</span>
                          </div>
                          <div className="w-full bg-[#0A0B0E] h-2 rounded-full overflow-hidden border border-white/10">
                            <div
                              className="bg-blue-500 h-full rounded-full"
                              style={{ width: `${item.val}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Market Demand Deep Analysis */}
                  <div className="bg-[#0A0B0E] border border-white/10 p-5 rounded-2xl space-y-3">
                    <h4 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4" />
                      <span>Phase 1: Market Demand Analysis</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedProduct.marketDemandAnalysis}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                      <div className="p-3 bg-[#15171C] border border-white/10 rounded-xl text-center">
                        <span className="text-[9px] text-slate-500 font-mono block uppercase tracking-widest">DIFFICULTY LEVEL</span>
                        <span className="text-xs font-semibold text-white font-mono block mt-1">{selectedProduct.scorecard.difficultyLevel}</span>
                      </div>
                      <div className="p-3 bg-[#15171C] border border-white/10 rounded-xl text-center">
                        <span className="text-[9px] text-slate-500 font-mono block uppercase tracking-widest">REPEAT BUYERS</span>
                        <span className="text-xs font-semibold text-white font-mono block mt-1">{selectedProduct.scorecard.repeatCustomerPotential}%</span>
                      </div>
                      <div className="p-3 bg-[#15171C] border border-white/10 rounded-xl text-center">
                        <span className="text-[9px] text-slate-500 font-mono block uppercase tracking-widest">LEGAL RISK PROFILE</span>
                        <span className={`text-xs font-semibold font-mono block mt-1 ${selectedProduct.scorecard.legalRisk === "Low" ? "text-emerald-400" : "text-blue-400"}`}>
                          {selectedProduct.scorecard.legalRisk}
                        </span>
                      </div>
                      <div className="p-3 bg-[#15171C] border border-white/10 rounded-xl text-center">
                        <span className="text-[9px] text-slate-500 font-mono block uppercase tracking-widest">EST. SALE VELOCITY</span>
                        <span className="text-xs font-semibold text-white font-mono block mt-1">3-4 Days</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: COMPETITOR BENCHMARKING */}
              {activeTab === "competitors" && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                        Phase 2: Competitor Landscape Analysis
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">Scraped real-time benchmarks from Etsy top listings</p>
                    </div>
                    <span className="text-xs text-blue-400 font-mono font-bold">2 Listings Scanned</span>
                  </div>

                  <div className="space-y-4">
                    {selectedProduct.competitors.map((comp, idx) => (
                      <div key={idx} className="bg-[#0A0B0E] border border-white/10 rounded-2xl p-5 space-y-4">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
                          <div>
                            <span className="text-[10px] font-mono text-blue-400 font-semibold bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded">
                              COMPETITOR INDEX {idx + 1}
                            </span>
                            <h5 className="text-sm font-display font-bold text-white mt-2">{comp.product}</h5>
                          </div>
                          
                          {/* Competitor Stats */}
                          <div className="flex gap-4 text-xs font-mono">
                            <div>
                              <span className="text-[9px] text-slate-500 uppercase tracking-widest block">RETAIL PRICE</span>
                              <span className="text-white font-bold block mt-0.5">${comp.price}</span>
                            </div>
                            <div>
                              <span className="text-[9px] text-slate-500 uppercase tracking-widest block">EST. MONTHLY SALES</span>
                              <span className="text-white font-bold block mt-0.5">{comp.salesEstimate} sales</span>
                            </div>
                            <div>
                              <span className="text-[9px] text-slate-500 uppercase tracking-widest block">REVIEWS COUNT</span>
                              <span className="text-white font-bold block mt-0.5">{comp.reviewCount}</span>
                            </div>
                          </div>
                        </div>

                        {/* Strengths & Weaknesses Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-b border-white/5 py-3.5 text-xs">
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-mono font-bold text-emerald-400 block uppercase tracking-widest">Identified Strengths</span>
                            <ul className="list-disc list-inside text-slate-400 space-y-0.5 pl-1">
                              {comp.strengths.map((st, i) => (
                                <li key={i}>{st}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-mono font-bold text-rose-400 block uppercase tracking-widest">Identified Weaknesses</span>
                            <ul className="list-disc list-inside text-slate-400 space-y-0.5 pl-1">
                              {comp.weaknesses.map((wk, i) => (
                                <li key={i}>{wk}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Tactical Outperform Strategy */}
                        <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-3.5 text-xs">
                          <span className="text-[10px] font-mono font-bold text-blue-400 block uppercase tracking-widest flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 text-blue-400" />
                            Blueprint to Outperform Competitor
                          </span>
                          <p className="text-slate-300 mt-1.5 leading-relaxed">{comp.howToOutperform}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: CUSTOMER SENTIMENT */}
              {activeTab === "sentiment" && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Strategic Overview Banner */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                        Phase 3: Customer Sentiment & Review Analysis
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">Pain point harvesting across competing marketplaces to optimize your product's design engineering</p>
                    </div>
                    <span className="text-xs text-blue-400 font-mono font-bold">1,500+ Reviews Audited</span>
                  </div>

                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-[#0A0B0E] border border-white/10 rounded-2xl flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] text-slate-500 font-mono block uppercase tracking-widest">CRITICAL PAIN POINT</span>
                        <span className="text-sm font-semibold text-white mt-1.5 block">
                          {selectedProduct.customerSentiment?.commonPainPoints?.[0]?.painPoint || "Structural / Joint Tolerances"}
                        </span>
                      </div>
                      <span className="text-[10px] text-rose-400 font-mono mt-3 block">★ Primary Competitive Vulnerability</span>
                    </div>

                    <div className="p-4 bg-[#0A0B0E] border border-white/10 rounded-2xl flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] text-slate-500 font-mono block uppercase tracking-widest">AVG COMPETITOR SCORE</span>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <span className="text-xl font-bold text-white font-mono">3.8</span>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <svg key={s} className={`w-3.5 h-3.5 ${s <= 4 ? "text-amber-400 fill-amber-400" : "text-slate-600"}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono mt-3 block">↑ Opportunity to corner market quality</span>
                    </div>

                    <div className="p-4 bg-[#0A0B0E] border border-white/10 rounded-2xl flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] text-slate-500 font-mono block uppercase tracking-widest">STRATEGIC DESIGN GOAL</span>
                        <span className="text-sm font-semibold text-white mt-1.5 block">
                          "Zero-Failure supportless printing with snap-fit tolerance locks"
                        </span>
                      </div>
                      <span className="text-[10px] text-cyan-400 font-mono mt-3 block">⚡ Integrated into Slicer Settings</span>
                    </div>
                  </div>

                  {/* Main Grid: Left (Pain points & Reviews), Right (Design Strategy checklist) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column: Pain Points & Reviews */}
                    <div className="lg:col-span-7 space-y-6">
                      {/* Section: Top Pain Points */}
                      <div className="space-y-4">
                        <h5 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                          Competitor Defect Frequency
                        </h5>
                        <div className="space-y-3.5">
                          {(selectedProduct.customerSentiment?.commonPainPoints || [
                            { painPoint: "Too lightweight & topples over", frequencyPercent: 65, impactLevel: "High", description: "Since it is printed in hollow plastic, placing heavy headsets causes it to wobble or tip over when bumped." },
                            { painPoint: "Sharp layer edges scratching headband", frequencyPercent: 28, impactLevel: "Medium", description: "Some users noted that the top curves of the plastic trellis have layer ridges that can scuff soft leather headbands." },
                            { painPoint: "Stressful snap assembly fit", frequencyPercent: 15, impactLevel: "Low", description: "A few customers found it difficult to snap the column into the base slot without feeling like the plastic might crack." }
                          ]).map((point, index) => (
                            <div key={index} className="bg-[#0A0B0E] border border-white/5 rounded-xl p-3.5 space-y-2">
                              <div className="flex justify-between items-center text-xs">
                                <div className="flex items-center gap-2">
                                  <span className="text-white font-semibold font-sans">{point.painPoint}</span>
                                  <span className={`px-2 py-0.5 text-[9px] font-mono rounded-full font-bold ${
                                    point.impactLevel === "High" 
                                      ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" 
                                      : point.impactLevel === "Medium"
                                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                        : "bg-slate-500/10 text-slate-400 border border-slate-500/20"
                                  }`}>
                                    {point.impactLevel} Impact
                                  </span>
                                </div>
                                <span className="text-slate-400 font-mono font-bold">{point.frequencyPercent}% of reviews</span>
                              </div>
                              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-white/5">
                                <div 
                                  className={`h-full rounded-full ${
                                    point.impactLevel === "High" 
                                      ? "bg-rose-500" 
                                      : point.impactLevel === "Medium"
                                        ? "bg-amber-500"
                                        : "bg-slate-500"
                                  }`}
                                  style={{ width: `${point.frequencyPercent}%` }}
                                ></div>
                              </div>
                              <p className="text-[11px] text-slate-400 leading-relaxed">{point.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Section: Competitor Reviews Feed */}
                      <div className="space-y-4">
                        <h5 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                          Scraped Review Feed
                        </h5>
                        <div className="space-y-3">
                          {(selectedProduct.customerSentiment?.topCompetitorReviews || [
                            { rating: 3, reviewText: "I love the honeycomb design but it is so light that every time I grab my headphones, the whole stand slides or falls over. Had to glue a metal plate to the bottom.", competitorName: "Retro3DStudios", keyIssue: "Lacks stability / too light" },
                            { rating: 2, reviewText: "The ridges on the top piece are sharp. It scratched the leather headband of my Sennheiser HD600s within a week. I had to sand it down.", competitorName: "DeskForge", keyIssue: "Rough surface finish / headband wear" }
                          ]).map((rev, index) => (
                            <div key={index} className="bg-[#0A0B0E] border border-white/5 rounded-xl p-3.5 space-y-2">
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                                  Review on {rev.competitorName}
                                </span>
                                <div className="flex gap-0.5">
                                  {[1, 2, 3, 4, 5].map((s) => (
                                    <svg key={s} className={`w-3 h-3 ${s <= rev.rating ? "text-amber-400 fill-amber-400" : "text-slate-700"}`} fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                              </div>
                              <p className="text-xs text-slate-300 italic leading-relaxed">
                                "{rev.reviewText}"
                              </p>
                              <div className="flex items-center gap-1.5 pt-1">
                                <span className="text-[9px] font-mono text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded">
                                  {rev.keyIssue}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Strategic Action Plan */}
                    <div className="lg:col-span-5 space-y-4">
                      <h5 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                        Design Action Plan to Outperform
                      </h5>
                      <div className="bg-[#0A0B0E]/60 border border-white/10 rounded-2xl p-4 md:p-5 space-y-4">
                        <p className="text-xs text-slate-400 leading-relaxed">
                          The following strategic engineering adjustments have been integrated into your <strong>3D Print Slicer Profile</strong> and <strong>CAD Blueprint</strong> to solve these issues automatically.
                        </p>

                        <div className="space-y-3.5">
                          {(selectedProduct.customerSentiment?.improvementSuggestions || [
                            { feature: "Weighted Bottom Chamber", priority: "High", designAction: "Create a hollow compartment inside the base plate to fill with standard steel fishing weights or heavy metal washers during printing." },
                            { feature: "Smooth Headband Cradle", priority: "Medium", designAction: "Apply an elegant chamfer or round-over to the top hanger surface, or design a slide-on soft TPU cushion insert." },
                            { feature: "Optimized Dovetail Joint", priority: "Low", designAction: "Reduce the snap-fit overhang friction overlap from 1.2mm to 0.8mm to make sliding into place satisfying and stress-free." }
                          ]).map((suggest, index) => (
                            <div key={index} className="border border-white/5 bg-[#0A0B0E] p-3.5 rounded-xl space-y-1.5 hover:border-blue-500/20 transition-all">
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-white font-bold font-sans">{suggest.feature}</span>
                                <span className={`px-2 py-0.5 text-[9px] font-mono rounded font-bold ${
                                  suggest.priority === "High" 
                                    ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" 
                                    : suggest.priority === "Medium"
                                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                      : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                }`}>
                                  {suggest.priority} PRIORITY
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 leading-relaxed">{suggest.designAction}</p>
                              <div className="flex items-center gap-1.5 pt-1 text-[10px] text-blue-400 font-mono">
                                <CheckCircle className="w-3 h-3 text-blue-400" />
                                <span>Addressed in Forge Profile</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Summary Action Advice */}
                        <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-3 text-xs text-slate-300 leading-relaxed">
                          <span className="font-semibold text-blue-400 block mb-1">💡 Engineering Tip:</span>
                          Always mention these design improvements directly in your Etsy product listing description and photos (e.g., 'Heavy-duty non-slip base') to immediately convert frustrated competitor customers.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: ETSY LIVE EXAMPLES */}
              {activeTab === "etsyExamples" && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Strategic Overview Banner */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-4 gap-4">
                    <div>
                      <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                        Phase 3B: Live Etsy Storefront Examples & Listing Intelligence
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Discover actual top-performing shops, optimal pricing points, photography styles, and high-CTR keyword tags.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                        Live Etsy Grounding
                      </span>
                    </div>
                  </div>

                  {/* Active Etsy Niche Research Search Bar */}
                  <div className="bg-[#0A0B0E] border border-white/10 rounded-2xl p-4 md:p-5">
                    <form onSubmit={(e) => handleResearchEtsy(e)} className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          value={etsySearchKeyword}
                          onChange={(e) => setEtsySearchKeyword(e.target.value)}
                          placeholder="Enter any keyword (e.g., headphone stand, self-watering planter) to scrape active shops..."
                          className="w-full bg-[#111317] border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all font-sans"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isResearchingEtsy || !etsySearchKeyword.trim()}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:opacity-50 text-white transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isResearchingEtsy ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Researching Stores...</span>
                          </>
                        ) : (
                          <>
                            <Search className="w-3.5 h-3.5" />
                            <span>Research Live Etsy Stores</span>
                          </>
                        )}
                      </button>
                    </form>

                    {/* Grounding Message & Errors */}
                    {etsyResearchMessage && (
                      <div className="mt-3 text-[11px] font-mono text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-3.5 py-2 rounded-xl flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>{etsyResearchMessage}</span>
                      </div>
                    )}
                    {etsyResearchError && (
                      <div className="mt-3 text-[11px] font-mono text-rose-400 bg-rose-500/5 border border-rose-500/10 px-3.5 py-2 rounded-xl flex items-center gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                        <span>{etsyResearchError}</span>
                      </div>
                    )}
                  </div>

                  {/* Research Loading Overlay */}
                  {isResearchingEtsy ? (
                    <div className="flex flex-col items-center justify-center py-16 space-y-4">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full border-t-2 border-r-2 border-blue-500 animate-spin"></div>
                        <Search className="w-6 h-6 text-blue-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      <div className="text-center space-y-1.5">
                        <h5 className="text-xs font-bold text-white font-sans">Etsy Shop Crawler Active</h5>
                        <p className="text-[11px] text-slate-400 font-mono animate-pulse">
                          Using Gemini with Google Search Grounding to harvest live listings, sales history, and pricing metrics...
                        </p>
                      </div>
                    </div>
                  ) : (
                    (() => {
                      const data = etsyResearchResult || selectedProduct.etsyLiveExamples;
                      if (!data) {
                        return (
                          <div className="text-center py-12 text-xs text-slate-400 bg-[#0A0B0E]/60 border border-white/5 rounded-2xl">
                            No active store examples loaded yet. Enter a custom keyword above to fetch live data!
                          </div>
                        );
                      }

                      return (
                        <div className="space-y-6">
                          {/* Top Level Market Insight Alert */}
                          <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl space-y-1.5">
                            <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest block">
                              🔑 CATEGORY WINNING FORMULA & INSIGHTS
                            </span>
                            <p className="text-xs text-slate-300 leading-relaxed font-sans">
                              {data.overallMarketInsight}
                            </p>
                          </div>

                          {/* Grid layout: Listings vs Featured Shops */}
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* Listings Column */}
                            <div className="lg:col-span-7 space-y-4">
                              <h5 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                <ShoppingBag className="w-3.5 h-3.5 text-blue-400" />
                                Active High-Performance Listings
                              </h5>

                              <div className="space-y-4">
                                {data.listings?.map((listing: any, index: number) => (
                                  <div
                                    key={index}
                                    className="border border-white/10 bg-[#0A0B0E] rounded-2xl p-4 space-y-3.5 hover:border-blue-500/30 transition-all"
                                  >
                                    <div className="flex justify-between items-start gap-3">
                                      <div className="space-y-1">
                                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                                          Store: <span className="text-blue-400 font-bold">{listing.shopName}</span>
                                        </span>
                                        <h6 className="text-xs text-white font-bold font-sans leading-relaxed">
                                          {listing.title}
                                        </h6>
                                      </div>
                                      <div className="text-right flex-shrink-0">
                                        <span className="text-xs font-mono font-bold text-emerald-400 block">${listing.price}</span>
                                        <span className="text-[10px] font-mono text-slate-400 block mt-0.5">{listing.salesVolume}</span>
                                      </div>
                                    </div>

                                    {/* Strategy breakdown */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2 border-t border-white/5 text-[11px]">
                                      <div className="space-y-1">
                                        <span className="text-slate-500 font-mono block">Competitive Edge:</span>
                                        <p className="text-slate-300 leading-relaxed">{listing.successStrategy}</p>
                                      </div>
                                      <div className="space-y-1">
                                        <span className="text-slate-500 font-mono block">Photography & Style:</span>
                                        <p className="text-slate-300 leading-relaxed">{listing.photographyStyle}</p>
                                      </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                                      {listing.optimizedTags?.map((tag: string, tagIdx: number) => (
                                        <span
                                          key={tagIdx}
                                          onClick={() => copyToClipboard(tag, `tag-${tag}`)}
                                          className="px-2 py-0.5 bg-white/5 hover:bg-blue-600/10 hover:text-blue-400 border border-white/5 rounded text-[10px] text-slate-400 font-mono transition-all cursor-pointer flex items-center gap-1"
                                        >
                                          <span>#{tag}</span>
                                          {clipboardFeedback === `tag-${tag}` ? (
                                            <CheckCircle className="w-2.5 h-2.5 text-blue-400" />
                                          ) : (
                                            <Copy className="w-2.5 h-2.5 opacity-50" />
                                          )}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Shops Column */}
                            <div className="lg:col-span-5 space-y-4">
                              <h5 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                <Palette className="w-3.5 h-3.5 text-amber-400" />
                                Top Shop Blueprints
                              </h5>

                              <div className="space-y-4">
                                {data.featuredShops?.map((shop: any, index: number) => (
                                  <div
                                    key={index}
                                    className="border border-white/10 bg-[#0A0B0E]/60 rounded-2xl p-4 md:p-5 space-y-3.5"
                                  >
                                    <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                                      <div>
                                        <h6 className="text-xs text-white font-bold font-sans">{shop.shopName}</h6>
                                        <span className="text-[10px] font-mono text-slate-400 block mt-0.5">{shop.nicheFocus}</span>
                                      </div>
                                      <div className="text-right">
                                        <span className="text-xs font-mono font-bold text-amber-400 block">{shop.totalSales} Sales</span>
                                        <span className="text-[9px] font-mono text-slate-500 block">{shop.activeListingCount} Listings</span>
                                      </div>
                                    </div>

                                    {/* Key Takeaways */}
                                    <div className="space-y-2.5">
                                      <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">
                                        💡 TOP TAKEAWAYS FOR SUCCESS:
                                      </span>
                                      <ul className="space-y-2 text-xs text-slate-300">
                                        {shop.successTakeaways?.map((takeaway: string, idx: number) => (
                                          <li key={idx} className="flex gap-2 items-start leading-relaxed">
                                            <span className="text-amber-400 mt-1 block font-bold text-xs">•</span>
                                            <span>{takeaway}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    {/* Action links */}
                                    <div className="pt-2">
                                      <a
                                        href={shop.shopUrl}
                                        target="_blank"
                                        referrerPolicy="no-referrer"
                                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 rounded-xl text-xs font-bold transition-all"
                                      >
                                        <span>Inspect Competitor Storefront</span>
                                        <ExternalLink className="w-3 h-3" />
                                      </a>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()
                  )}
                </div>
              )}

              {/* TAB 3: 3D SLICING & PRODUCTION PROFILE */}
              {activeTab === "slicing" && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="border-b border-white/10 pb-3">
                    <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                      Phase 4: Slicer Settings & Engineering Parameters
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">Optimized for high production speeds and low failure rates</p>
                  </div>

                  {/* Settings Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* General parameters */}
                    <div className="bg-[#0A0B0E] border border-white/10 rounded-2xl p-5 space-y-3.5 text-xs">
                      <span className="text-[10px] font-mono font-bold text-blue-400 block uppercase tracking-widest">Slicing Profile Specs</span>
                      <div className="grid grid-cols-2 gap-y-3.5 gap-x-2">
                        <div>
                          <span className="text-slate-500 block text-[9px] font-mono uppercase tracking-widest">Recommended Nozzle</span>
                          <span className="text-white font-semibold font-mono block mt-1">{selectedProduct.printing.nozzleSize}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[9px] font-mono uppercase tracking-widest">Layer Height</span>
                          <span className="text-white font-semibold font-mono block mt-1">{selectedProduct.printing.layerHeight}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[9px] font-mono uppercase tracking-widest">Recommended Infill</span>
                          <span className="text-white font-semibold font-mono block mt-1">{selectedProduct.printing.infillPercent}% density</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[9px] font-mono uppercase tracking-widest">Required Supports</span>
                          <span className="text-white font-semibold font-mono block mt-1">{selectedProduct.printing.supportsRequired}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-slate-500 block text-[9px] font-mono uppercase tracking-widest">Print Orientation Blueprint</span>
                          <span className="text-slate-300 block mt-1 leading-relaxed">{selectedProduct.printing.orientation}</span>
                        </div>
                        <div className="col-span-2 border-t border-white/5 pt-2.5">
                          <span className="text-slate-500 block text-[9px] font-mono uppercase tracking-widest">Filament Weight & Print Time</span>
                          <span className="text-white font-mono font-bold text-base flex items-center gap-1.5 mt-1.5">
                            <Layers className="w-4.5 h-4.5 text-blue-400" />
                            {selectedProduct.filamentWeightGrams}g / {selectedProduct.printing.estimatedPrintTime}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Slicer optimization checklist */}
                    <div className="bg-[#0A0B0E] border border-white/10 rounded-2xl p-5 space-y-3 text-xs">
                      <span className="text-[10px] font-mono font-bold text-blue-400 block uppercase tracking-widest">Strength & Print Optimization</span>
                      <div className="space-y-3">
                        <div>
                          <span className="text-emerald-400 font-semibold block font-mono text-[10px] uppercase tracking-wider">Strength Improvements</span>
                          <ul className="list-disc list-inside text-slate-400 pl-1 mt-1 space-y-1">
                            {selectedProduct.printing.strengthImprovements.map((s, i) => (
                              <li key={i}>{s}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="text-blue-400 font-semibold block font-mono text-[10px] uppercase tracking-wider">Optimization Suggestions</span>
                          <ul className="list-disc list-inside text-slate-400 pl-1 mt-1 space-y-1">
                            {selectedProduct.printing.optimizationSuggestions.map((o, i) => (
                              <li key={i}>{o}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Risks & Assembly */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-rose-950/20 border border-rose-500/10 p-5 rounded-2xl text-xs space-y-2">
                      <span className="text-[10px] font-mono font-bold text-rose-400 block uppercase tracking-widest flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                        Failure & Warping Risks
                      </span>
                      <ul className="list-disc list-inside text-slate-400 pl-1 space-y-1 mt-1">
                        {selectedProduct.printing.failureRisks.map((fr, i) => (
                          <li key={i}>{fr}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#0A0B0E] border border-white/10 p-5 rounded-2xl text-xs space-y-2">
                      <span className="text-[10px] font-mono font-bold text-blue-400 block uppercase tracking-widest flex items-center gap-1">
                        <Wrench className="w-3.5 h-3.5 text-blue-400" />
                        Assembly & Post Processing
                      </span>
                      <p className="text-slate-300 leading-relaxed mt-1">{selectedProduct.printing.assemblyRecommendations}</p>
                      <p className="text-slate-400 mt-1 italic"><strong className="text-slate-300">Tolerances:</strong> {selectedProduct.printing.toleranceRecommendations}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: INDUSTRIAL CAD DESIGN BRIEF */}
              {activeTab === "cad" && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="border-b border-white/10 pb-3">
                    <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                      Phase 6: Industrial CAD Design Brief
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">Complete architectural specifications for modeling in Fusion 360 or SolidWorks</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 text-xs">
                    
                    {/* Dimension Specifications */}
                    <div className="md:col-span-8 space-y-4">
                      <div className="bg-[#0A0B0E] border border-white/10 rounded-2xl p-5 space-y-3">
                        <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest block">Structural Blueprint Details</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="bg-[#15171C] p-3 rounded-xl border border-white/5">
                            <span className="text-slate-500 block text-[9px] uppercase font-mono tracking-widest">Target Dimensions</span>
                            <span className="text-white font-semibold block mt-1">{selectedProduct.cadBrief.dimensions}</span>
                          </div>
                          <div className="bg-[#15171C] p-3 rounded-xl border border-white/5">
                            <span className="text-slate-500 block text-[9px] uppercase font-mono tracking-widest">Wall Thickness Shells</span>
                            <span className="text-white font-semibold block mt-1">{selectedProduct.cadBrief.wallThickness}</span>
                          </div>
                          <div className="bg-[#15171C] p-3 rounded-xl border border-white/5">
                            <span className="text-slate-500 block text-[9px] uppercase font-mono tracking-widest">Fillets & Chamfers</span>
                            <span className="text-white block mt-1 leading-relaxed">{selectedProduct.cadBrief.filletsAndChamfers}</span>
                          </div>
                          <div className="bg-[#15171C] p-3 rounded-xl border border-white/5">
                            <span className="text-slate-500 block text-[9px] uppercase font-mono tracking-widest">Interlocking Snap Fits</span>
                            <span className="text-white block mt-1 leading-relaxed">{selectedProduct.cadBrief.snapFits}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#0A0B0E] border border-white/10 p-5 rounded-2xl space-y-2">
                        <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest block">CAD Exploded View Scene</span>
                        <p className="text-slate-300 leading-relaxed mt-1">{selectedProduct.cadBrief.explodedViewDescription}</p>
                      </div>
                    </div>

                    {/* Manufacturing Constraints & Hardware */}
                    <div className="md:col-span-4 space-y-4">
                      <div className="bg-[#0A0B0E] border border-white/10 p-5 rounded-2xl space-y-2">
                        <span className="text-[10px] font-mono text-blue-400 font-bold block uppercase tracking-widest">Screws / Hardware Required</span>
                        <div className="bg-[#15171C] p-3.5 rounded-xl border border-white/5 text-center font-mono font-semibold text-white mt-1.5">
                          {selectedProduct.cadBrief.hardwareRequired || "100% 3D Printable (No external hardware)"}
                        </div>
                      </div>

                      <div className="bg-[#0A0B0E] border border-white/10 p-5 rounded-2xl space-y-2">
                        <span className="text-[10px] font-mono text-cyan-400 font-bold block uppercase tracking-widest">Model Tolerances & Interfaces</span>
                        <p className="text-slate-300 leading-relaxed mt-1">{selectedProduct.cadBrief.threads}</p>
                      </div>

                      <div className="bg-[#0A0B0E] border border-white/10 p-5 rounded-2xl space-y-2">
                        <span className="text-[10px] font-mono text-blue-400 font-bold block uppercase tracking-widest">Manufacturing Constraints</span>
                        <p className="text-slate-300 leading-relaxed mt-1">{selectedProduct.cadBrief.manufacturingConstraints}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: PROFESSIONAL IMAGE GENERATOR STUDIO */}
              {activeTab === "prompts" && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="border-b border-white/10 pb-3">
                    <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-blue-500" />
                      <span>Phase 7: Midjourney / Flux Prompt Engineering Studio</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">Copy optimized visual prompts to generate listing images that convert visitors</p>
                  </div>

                  {clipboardFeedback && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold text-center animate-pulse">
                      Successfully copied {clipboardFeedback} Prompt to Clipboard!
                    </div>
                  )}

                  <div className="space-y-4">
                    {[
                      { title: "Midjourney Studio Render Prompt", prompt: selectedProduct.imagePrompts.midjourney, model: "Midjourney v6" },
                      { title: "Flux Aesthetic Product Prompt", prompt: selectedProduct.imagePrompts.flux, model: "Flux.1 Dev" },
                      { title: "Ideogram Typography/Logo Prompt", prompt: selectedProduct.imagePrompts.ideogram, model: "Ideogram v2" },
                      { title: "Etsy Listing Hero White Background Prompt", prompt: selectedProduct.imagePrompts.heroImagePrompt, model: "DALL-E 3 / Studio" },
                      { title: "Cozy Lifestyle Desk placement Prompt", prompt: selectedProduct.imagePrompts.lifestylePhotoPrompt, model: "General Photo" },
                      { title: "Cardboard Kraft Packaging Promo Prompt", prompt: selectedProduct.imagePrompts.packagingPhotoPrompt, model: "Lifestyle Unboxing" }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-[#0A0B0E] border border-white/10 rounded-2xl p-5 space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-display font-bold text-white tracking-wide">{item.title}</span>
                          <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                            {item.model}
                          </span>
                        </div>
                        <div className="flex gap-2.5 mt-2 bg-[#15171C] border border-white/5 p-3.5 rounded-xl relative group">
                          <p className="text-slate-300 font-mono text-[11px] leading-relaxed break-words flex-1 pr-10">
                            {item.prompt}
                          </p>
                          <button
                            onClick={() => copyToClipboard(item.prompt, item.title.split(" ")[0])}
                            className="absolute right-2.5 top-2.5 bg-[#0A0B0E] hover:bg-blue-600 hover:text-white p-2 rounded-lg text-slate-400 transition-colors border border-white/10 cursor-pointer"
                            title="Copy prompt"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: ETSY SEO PACKAGE */}
              {activeTab === "seo" && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="border-b border-white/10 pb-3">
                    <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                      Phase 8: High Conversion Etsy SEO Suite
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">Optimized meta-information built for organic search listing algorithm indexing</p>
                  </div>

                  {clipboardFeedback && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl text-xs font-mono font-semibold text-center animate-pulse">
                      Successfully copied {clipboardFeedback}!
                    </div>
                  )}

                  {/* Title Section */}
                  <div className="bg-[#0A0B0E] border border-white/10 rounded-2xl p-5 text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest">Optimized Listing Title (140-char cap)</span>
                      <button
                        onClick={() => copyToClipboard(selectedProduct.seo.optimizedTitle, "Listing Title")}
                        className="text-blue-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer font-semibold"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Title</span>
                      </button>
                    </div>
                    <p className="text-white font-display font-bold text-sm bg-[#15171C] border border-white/5 p-3.5 rounded-xl leading-relaxed">
                      {selectedProduct.seo.optimizedTitle}
                    </p>
                  </div>

                  {/* Tags Badges */}
                  <div className="bg-[#0A0B0E] border border-white/10 rounded-2xl p-5 text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest">13 Required SEO Search Tags</span>
                      <button
                        onClick={() => copyToClipboard(selectedProduct.seo.tags13.join(", "), "SEO Tags")}
                        className="text-blue-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer font-semibold"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Tags List</span>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5 bg-[#15171C] border border-white/5 p-3.5 rounded-xl">
                      {selectedProduct.seo.tags13.map((tag, i) => (
                        <span key={i} className="bg-[#0A0B0E] border border-white/10 text-slate-300 px-2.5 py-1 rounded-md font-mono text-[10px] hover:border-blue-500 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Listing Description Preview */}
                  <div className="bg-[#0A0B0E] border border-white/10 rounded-2xl p-5 text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest">Optimized Listing Description</span>
                      <button
                        onClick={() => copyToClipboard(selectedProduct.seo.descriptionText, "Listing Description")}
                        className="text-blue-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer font-semibold"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Description</span>
                      </button>
                    </div>
                    <div className="bg-[#15171C] border border-white/5 p-3.5 rounded-xl max-h-[220px] overflow-y-auto font-sans text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {selectedProduct.seo.descriptionText}
                    </div>
                  </div>

                  {/* FAQ & Keywords Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#0A0B0E] border border-white/10 rounded-2xl p-5 text-xs space-y-2">
                      <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest">Keyword Strategy</span>
                      <div className="space-y-2 mt-1">
                        <div>
                          <strong className="text-white block text-[10px] font-mono uppercase tracking-wider">Primary Targets:</strong>
                          <span className="text-slate-400 font-mono text-[10px]">{selectedProduct.seo.primaryKeywords.join(" | ")}</span>
                        </div>
                        <div className="pt-1.5 border-t border-white/5">
                          <strong className="text-white block text-[10px] font-mono uppercase tracking-wider">Long-Tail Opportunities:</strong>
                          <ul className="list-disc list-inside text-slate-400 text-[10px] pl-1 space-y-0.5 mt-1">
                            {selectedProduct.seo.longTailKeywords.map((lt, i) => (
                              <li key={i}>{lt}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#0A0B0E] border border-white/10 rounded-2xl p-5 text-xs space-y-2">
                      <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest">Customer FAQ Guide</span>
                      <div className="space-y-3 mt-1.5 max-h-[140px] overflow-y-auto">
                        {selectedProduct.seo.faqs.map((faq, i) => (
                          <div key={i} className="space-y-0.5">
                            <strong className="text-white block font-display text-[10px]">Q: {faq.question}</strong>
                            <span className="text-slate-400 block text-[10px]">{faq.answer}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 7: PRICING & PROFIT REAL-TIME SIMULATOR */}
              {activeTab === "pricing" && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="border-b border-white/10 pb-3">
                    <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                      Phase 9: Live Profitability & Pricing Ledger
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">Tweak calculations in real-time to model exact material and listing amortization</p>
                  </div>

                  {/* Pricing interactive sliders */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 text-xs">
                    
                    {/* Controls Side */}
                    <div className="md:col-span-6 bg-[#0A0B0E] border border-white/10 p-5 rounded-2xl space-y-4">
                      <span className="text-[10px] font-mono text-blue-400 font-bold block uppercase tracking-widest">Adjust Ledger Values</span>
                      
                      {/* Price Slider */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono">
                          <span className="text-slate-400">Target Retail Price</span>
                          <span className="text-white font-bold">${dynamicRetailPrice.toFixed(2)}</span>
                        </div>
                        <input
                          type="range"
                          min="15"
                          max="80"
                          step="0.5"
                          value={dynamicRetailPrice}
                          onChange={(e) => setDynamicRetailPrice(parseFloat(e.target.value))}
                          className="w-full accent-blue-500 bg-[#15171C] cursor-ew-resize rounded-lg"
                        />
                      </div>

                      {/* Weight Slider */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono">
                          <span className="text-slate-400">Finished Filament Weight</span>
                          <span className="text-white font-bold">{dynamicWeight}g</span>
                        </div>
                        <input
                          type="range"
                          min="30"
                          max="400"
                          step="5"
                          value={dynamicWeight}
                          onChange={(e) => setDynamicWeight(parseInt(e.target.value))}
                          className="w-full accent-blue-500 bg-[#15171C] cursor-ew-resize rounded-lg"
                        />
                      </div>

                      {/* Spool Cost Slider */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono">
                          <span className="text-slate-400">Filament Spool Cost (1kg)</span>
                          <span className="text-white font-bold">${dynamicFilamentCost.toFixed(2)}</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="45"
                          step="0.5"
                          value={dynamicFilamentCost}
                          onChange={(e) => setDynamicFilamentCost(parseFloat(e.target.value))}
                          className="w-full accent-blue-500 bg-[#15171C] cursor-ew-resize rounded-lg"
                        />
                      </div>

                      {/* Shipping Cost */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono">
                          <span className="text-slate-400">Courier Shipping Cost</span>
                          <span className="text-white font-bold">${dynamicShipping.toFixed(2)}</span>
                        </div>
                        <input
                          type="range"
                          min="2.00"
                          max="12.00"
                          step="0.10"
                          value={dynamicShipping}
                          onChange={(e) => setDynamicShipping(parseFloat(e.target.value))}
                          className="w-full accent-blue-500 bg-[#15171C] cursor-ew-resize rounded-lg"
                        />
                      </div>
                    </div>

                    {/* Breakdown Ledger Side */}
                    <div className="md:col-span-6 bg-[#0A0B0E] border border-white/10 p-5 rounded-2xl space-y-4">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold block uppercase tracking-widest">Real-time Margin Breakdown</span>

                      <div className="space-y-2 text-xs font-mono">
                        <div className="flex justify-between text-slate-400">
                          <span>Raw Material (Filament):</span>
                          <span className="text-white">${calcMaterialCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Power & Wear:</span>
                          <span className="text-white">${(calcElectricity + calcMachineAmortization).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Labor & Packing Box:</span>
                          <span className="text-white">${(dynamicLabor + dynamicPackaging).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Courier Rate:</span>
                          <span className="text-white">${dynamicShipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-rose-400 border-t border-white/5 pt-1.5">
                          <span>Etsy Fees & Listing:</span>
                          <span>-${totalEtsyFees.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-slate-500 text-[10px] pl-2">
                          <span>Listing Fee:</span>
                          <span>$0.20</span>
                        </div>
                        <div className="flex justify-between text-slate-500 text-[10px] pl-2">
                          <span>6.5% Transaction Fee:</span>
                          <span>${calcEtsyTransaction.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-slate-500 text-[10px] pl-2">
                          <span>4% + $0.25 Processor:</span>
                          <span>${calcEtsyProcessing.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Net Result Badge */}
                      <div className="bg-[#15171C] border border-white/5 rounded-2xl p-4 text-center mt-3.5 space-y-1">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Net Takehome Profit per unit</span>
                        <div className="flex justify-center items-baseline gap-2">
                          <span className="text-2xl font-mono font-extrabold text-emerald-400">${netProfit.toFixed(2)}</span>
                          <span className="text-xs font-mono text-slate-400">({profitMarginPercent.toFixed(1)}%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 8: MARKETING CAMPAIGNS & AUTOMATION */}
              {activeTab === "marketing" && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="border-b border-white/10 pb-3">
                    <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                      Phase 10 & 11: Launch Campaigns & Automation Recipes
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">Coordinated launch timeline and background order orchestration flows</p>
                  </div>

                  {/* Week-by-Week Calendar */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-blue-400 font-bold block uppercase tracking-widest">4-Week Content Launch Calendar</span>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                      {selectedProduct.marketing.contentCalendar4Weeks.map((week, i) => (
                        <div key={i} className="bg-[#0A0B0E] border border-white/10 rounded-2xl p-4 space-y-2">
                          <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                            <span className="font-mono text-[10px] text-blue-400 font-bold uppercase">Week {week.week}</span>
                            <span className="text-white font-semibold text-[10px]">Launch Focus</span>
                          </div>
                          <span className="text-white font-medium block leading-tight">{week.focus}</span>
                          <div className="space-y-1.5 pt-1.5 border-t border-white/5 text-[10px]">
                            {week.channels.map((chan, j) => (
                              <div key={j}>
                                <strong className="text-slate-500 uppercase text-[9px] font-mono tracking-widest block">{chan.platform}:</strong>
                                <span className="text-slate-300 leading-snug block mt-0.5">{chan.content}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Automation Workflows */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 text-xs">
                    <div className="bg-[#0A0B0E] border border-white/10 p-5 rounded-2xl space-y-2">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold block uppercase tracking-widest flex items-center gap-1">
                        <Zap className="w-4 h-4 text-emerald-400" />
                        n8n / API Automation Flow
                      </span>
                      <ul className="list-disc list-inside text-slate-400 space-y-1.5 pl-1 leading-relaxed">
                        {selectedProduct.automations.n8nWorkflows.map((work, i) => (
                          <li key={i}>{work}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#0A0B0E] border border-white/10 p-5 rounded-2xl space-y-2">
                      <span className="text-[10px] font-mono text-blue-400 font-bold block uppercase tracking-widest flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-blue-400" />
                        Zapier Production Trigger
                      </span>
                      <ul className="list-disc list-inside text-slate-400 space-y-1.5 pl-1 leading-relaxed">
                        {selectedProduct.automations.zapierAutomations.map((zap, i) => (
                          <li key={i}>{zap}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 9: RISK & LEGAL AUDIT */}
              {activeTab === "legal" && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                        Phase 12: Patent & Trademark Safety Audit
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">Automated infringement check on IP databases (Disney, Marvel, Nintendo, sports brands)</p>
                    </div>

                    {selectedProduct.legal.isSafeToSell ? (
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-mono font-bold">
                        CLEARED: SAFE TO SELL
                      </span>
                    ) : (
                      <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-mono font-bold">
                        ATTENTION REQUIRED
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 text-xs">
                    
                    {/* Trademark filings check */}
                    <div className="md:col-span-8 bg-[#0A0B0E] border border-white/10 p-5 rounded-2xl space-y-4">
                      <div>
                        <strong className="text-white block text-sm font-display mb-1.5">Trademark Filings Audit</strong>
                        <p className="text-slate-300 leading-relaxed">{selectedProduct.legal.trademarkCheck}</p>
                      </div>

                      <div className="border-t border-white/5 pt-4">
                        <strong className="text-white block text-sm font-display mb-1.5">Copyright & Patent Check</strong>
                        <p className="text-slate-300 leading-relaxed">{selectedProduct.legal.copyrightPatentCheck}</p>
                      </div>
                    </div>

                    {/* IP Warning Board */}
                    <div className="md:col-span-4 bg-blue-500/5 border border-blue-500/20 p-5 rounded-2xl space-y-2.5">
                      <span className="text-[10px] font-mono text-blue-400 font-bold block uppercase tracking-widest flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-blue-400" />
                        IP Takedown Safety Board
                      </span>
                      <p className="text-slate-300 leading-relaxed text-xs">
                        {selectedProduct.legal.warnings}
                      </p>
                      <div className="p-3 bg-[#0A0B0E] border border-white/5 rounded-xl text-[10px] text-slate-400 italic">
                        "Never use character names or exact logos of Marvel, Pokemon, or movie likenesses. Stick to generic geometric or aesthetic setups to guarantee zero shop suspension risk."
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 10: 3D PRODUCT CUSTOMIZER SANDBOX */}
              {activeTab === "customizer" && (
                <div className="space-y-6 animate-fadeIn">
                  
                  {/* Header Details */}
                  <div className="border-b border-white/10 pb-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-mono font-bold text-blue-500 uppercase tracking-widest">
                        Phase 14: Interactive 3D Customizer & Sandbox
                      </h4>
                      <h3 className="text-xl font-display font-bold text-white mt-0.5">3D Printed Product Customization Sandbox</h3>
                      <p className="text-xs text-slate-400 mt-1">Configure base variants, colors, custom typography engravings, and modular extensions in real-time.</p>
                    </div>

                    <div className="inline-flex items-center gap-1.5 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20 text-xs text-blue-400 font-mono">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Etsy Personalization Premium active</span>
                    </div>
                  </div>

                  {/* Sandbox Columns */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Left Column: Interactive Parametric Controls */}
                    <div className="lg:col-span-5 space-y-5">
                      
                      {/* Section 1: Base Design / Variant */}
                      <div className="bg-[#0A0B0E] border border-white/10 rounded-2xl p-5 space-y-3.5 text-xs">
                        <span className="text-[10px] font-mono font-bold text-blue-400 block uppercase tracking-widest flex items-center gap-1.5">
                          <Sliders className="w-3.5 h-3.5" />
                          1. Select Base CAD Geometry
                        </span>
                        
                        <div className="grid grid-cols-2 gap-2.5">
                          {[
                            { id: "standard", label: "Standard Edition", desc: "Default balanced CAD geometry" },
                            { id: "compact", label: "Compact Minimal", desc: "Saves 20% print time & material" },
                            { id: "heavy", label: "Industrial Heavy", desc: "+30% thickness & heavy infill" },
                            { id: "grid", label: "Modular Grid", desc: "Includes interlocking grid slots" }
                          ].map((v) => (
                            <button
                              key={v.id}
                              onClick={() => setCustomizerVariant(v.id)}
                              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                                customizerVariant === v.id
                                  ? "bg-blue-600/10 border-blue-500 text-white shadow-inner shadow-blue-500/5"
                                  : "bg-[#15171C]/50 border-white/5 text-slate-400 hover:border-white/10 hover:text-slate-200"
                              }`}
                            >
                              <span className="font-semibold text-white block">{v.label}</span>
                              <span className="text-[10px] text-slate-500 mt-1 block leading-normal">{v.desc}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Section 2: Filament Color Palette & Thermal Specs */}
                      <div className="bg-[#0A0B0E] border border-white/10 rounded-2xl p-5 space-y-3.5 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono font-bold text-blue-400 block uppercase tracking-widest flex items-center gap-1.5">
                            <Palette className="w-3.5 h-3.5" />
                            2. Predefined Material Palette
                          </span>
                          <span className="text-[9px] font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                            {activeMaterialConfig.density} Density
                          </span>
                        </div>

                        {/* Color Circles */}
                        <div className="flex flex-wrap gap-2.5">
                          {PREDEFINED_MATERIALS.map((m) => (
                            <button
                              key={m.name}
                              onClick={() => {
                                setCustomizerColor(m.hex);
                                setCustomizerMaterial(m.name);
                              }}
                              title={m.name}
                              className={`w-9 h-9 rounded-full relative flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer border ${
                                customizerMaterial === m.name
                                  ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-[#0A0B0E] scale-105"
                                  : "border-white/10"
                              }`}
                              style={{ backgroundColor: m.hex }}
                            >
                              {customizerMaterial === m.name && (
                                <span className={`text-[10px] font-bold ${m.hex === "#F8F9FA" ? "text-black" : "text-white"}`}>
                                  ✓
                                </span>
                              )}
                            </button>
                          ))}
                        </div>

                        {/* Material Physics / Printer Speeds */}
                        <div className="bg-[#15171C] p-3 rounded-xl border border-white/5 space-y-2 text-[11px]">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Material Type:</span>
                            <span className="text-white font-medium">{customizerMaterial}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-2 mt-2">
                            <div>
                              <span className="text-slate-500 block text-[9px] font-mono uppercase tracking-wider">Nozzle Heat</span>
                              <span className="text-white font-mono font-semibold">{activeMaterialConfig.tempNozzle}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block text-[9px] font-mono uppercase tracking-wider">Bed Heat</span>
                              <span className="text-white font-mono font-semibold">{activeMaterialConfig.tempBed}</span>
                            </div>
                          </div>
                          <p className="text-[10px] text-slate-400 italic pt-1 mt-1 leading-normal border-t border-white/5">
                            "{activeMaterialConfig.notes}"
                          </p>
                        </div>

                        {/* Special Safety Warnings for Slicing */}
                        {customizerMaterial === "Forest Green ABS" && (
                          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 p-2.5 rounded-lg text-[10px] leading-relaxed flex gap-2">
                            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                            <span><strong>ABS Shrinkage Warning:</strong> High warping coefficient. Enclosed chamber and heated buildplate (100°C) are strictly required for bed adhesion.</span>
                          </div>
                        )}
                        {customizerMaterial === "Carbon Fiber PLA" && (
                          <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 p-2.5 rounded-lg text-[10px] leading-relaxed flex gap-2">
                            <Info className="w-4 h-4 shrink-0 mt-0.5 text-blue-400" />
                            <span><strong>Composite Nozzle Wear:</strong> Carbon fiber is abrasive. A standard brass nozzle will bore out quickly; we strongly recommend a hardened steel nozzle.</span>
                          </div>
                        )}
                      </div>

                      {/* Section 3: Custom Text Engraving */}
                      <div className="bg-[#0A0B0E] border border-white/10 rounded-2xl p-5 space-y-3.5 text-xs">
                        <span className="text-[10px] font-mono font-bold text-blue-400 block uppercase tracking-widest flex items-center gap-1.5">
                          <Edit3 className="w-3.5 h-3.5" />
                          3. Custom Text Personalization
                        </span>

                        <div className="space-y-3">
                          <div>
                            <label className="text-slate-400 block mb-1">Text Engraving (Max 15 characters)</label>
                            <input
                              type="text"
                              value={customizerEngraving}
                              onChange={(e) => setCustomizerEngraving(e.target.value.slice(0, 15))}
                              placeholder="Enter personalization..."
                              className="w-full bg-[#15171C] border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[11px]">
                            <div>
                              <label className="text-slate-500 block mb-1">Font Typography</label>
                              <select
                                value={customizerFont}
                                onChange={(e) => setCustomizerFont(e.target.value)}
                                className="w-full bg-[#15171C] border border-white/5 rounded-lg px-2 py-1.5 text-slate-300 focus:outline-none cursor-pointer"
                              >
                                <option value="sans">Clean Sans</option>
                                <option value="mono">Tech Mono</option>
                                <option value="serif">Classic Serif</option>
                              </select>
                            </div>

                            <div>
                              <label className="text-slate-500 block mb-1">Engraving Depth Style</label>
                              <div className="flex border border-white/5 rounded-lg overflow-hidden">
                                <button
                                  onClick={() => setCustomizerStyle("debossed")}
                                  className={`flex-1 py-1.5 text-center transition-all cursor-pointer ${
                                    customizerStyle === "debossed"
                                      ? "bg-blue-600 text-white font-semibold"
                                      : "bg-[#15171C] text-slate-400"
                                  }`}
                                >
                                  Debossed
                                </button>
                                <button
                                  onClick={() => setCustomizerStyle("embossed")}
                                  className={`flex-1 py-1.5 text-center transition-all cursor-pointer ${
                                    customizerStyle === "embossed"
                                      ? "bg-blue-600 text-white font-semibold"
                                      : "bg-[#15171C] text-slate-400"
                                  }`}
                                >
                                  Embossed
                                </button>
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="text-slate-500 block mb-1">Engraving Placement Axis</label>
                            <div className="grid grid-cols-3 gap-1.5 text-center">
                              {[
                                { id: "top", label: "Top Face" },
                                { id: "side", label: "Side Panel" },
                                { id: "emblem", label: "Emblem Badge" }
                              ].map((pos) => (
                                <button
                                  key={pos.id}
                                  onClick={() => setCustomizerPosition(pos.id)}
                                  className={`py-1.5 rounded-lg border text-[10px] transition-all cursor-pointer ${
                                    customizerPosition === pos.id
                                      ? "bg-blue-600/10 border-blue-500 text-white"
                                      : "bg-[#15171C] border-white/5 text-slate-400"
                                  }`}
                                >
                                  {pos.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 4: Modular Inserts */}
                      <div className="bg-[#0A0B0E] border border-white/10 rounded-2xl p-5 space-y-3.5 text-xs">
                        <span className="text-[10px] font-mono font-bold text-blue-400 block uppercase tracking-widest flex items-center gap-1.5">
                          <Wrench className="w-3.5 h-3.5" />
                          4. Modular Structural Inserts
                        </span>

                        <div className="space-y-2">
                          {[
                            { id: "pads", label: "Anti-Slip Rubber Pad Slots", desc: "Fits 4x standard rubber bumpers (+0.2g, +$0.15 hardware cost)" },
                            { id: "magnets", label: "Magnetic Lock Channels", desc: "Fits 4x neodymium magnets (+2.5g, +$0.80 hardware cost)" },
                            { id: "sleeve", label: "Integrated Pencil Sleeve Extension", desc: "Custom vertical storage chamber (+8.0g, +25m print time)" },
                            { id: "weighted", label: "Weighted Sand Infill Chamber", desc: "Includes inner hatch voids to pack lead shot/sand (+15.0g)" }
                          ].map((item) => {
                            const isChecked = customizerExtras.includes(item.id);
                            return (
                              <label
                                key={item.id}
                                className={`flex items-start gap-2.5 p-2.5 rounded-xl border transition-all cursor-pointer ${
                                  isChecked
                                    ? "bg-blue-600/5 border-blue-500/50 text-white"
                                    : "bg-[#15171C]/40 border-white/5 text-slate-400 hover:border-white/10"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => {
                                    if (isChecked) {
                                      setCustomizerExtras(customizerExtras.filter(x => x !== item.id));
                                    } else {
                                      setCustomizerExtras([...customizerExtras, item.id]);
                                    }
                                  }}
                                  className="mt-0.5 cursor-pointer accent-blue-500"
                                />
                                <div>
                                  <span className="font-semibold text-xs block text-white">{item.label}</span>
                                  <span className="text-[10px] text-slate-500 block leading-normal mt-0.5">{item.desc}</span>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                    </div>

                    {/* Right Column: Live 3D Viewport & Physics Engine */}
                    <div className="lg:col-span-7 space-y-5 flex flex-col">
                      
                      {/* Viewport Frame */}
                      <div className="bg-[#0A0B0E] border border-white/10 rounded-2xl p-4 flex flex-col flex-1">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-semibold">Live 3D Parametric Viewport</span>
                          </div>
                          
                          {/* Toggle wireframe mode */}
                          <button
                            onClick={() => setIsWireframe(!isWireframe)}
                            className={`px-2.5 py-1 rounded text-[10px] font-mono flex items-center gap-1.5 border transition-all cursor-pointer ${
                              isWireframe
                                ? "bg-cyan-500/10 border-cyan-500 text-cyan-400 font-bold"
                                : "bg-white/5 border-white/5 text-slate-400 hover:text-white"
                            }`}
                          >
                            <Layers className="w-3 h-3" />
                            <span>{isWireframe ? "WIREFRAME: ACTIVE" : "TOGGLE WIREFRAME"}</span>
                          </button>
                        </div>

                        {/* The Beautiful 3D Isometric Viewport SVG */}
                        <div className="relative flex-1 flex items-center justify-center bg-[#050608] border border-white/5 rounded-xl overflow-hidden min-h-[290px]">
                          <svg viewBox="0 0 400 300" className="w-full h-72 md:h-80 bg-[#0A0B0E] border border-white/5 rounded-2xl shadow-inner transition-all duration-300">
                            {/* Isometric Grid Background */}
                            <defs>
                              <pattern id="customizer-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                <path d="M 20 0 L 0 20 M 0 0 L 20 20" fill="none" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="0.5" />
                              </pattern>
                              <radialGradient id="customizer-glow" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.12" />
                                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                              </radialGradient>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#customizer-grid)" />
                            <circle cx="200" cy="150" r="130" fill="url(#customizer-glow)" />

                            {/* Floor shadow */}
                            <ellipse cx="200" cy="225" rx="90" ry="25" fill="rgba(0,0,0,0.6)" filter="blur(6px)" />

                            {/* SVG Group with isometric coordinates */}
                            <g transform="translate(0, -10)">
                              {/* Anti-slip pads / magnets layer */}
                              {customizerExtras.includes("pads") && (
                                <g>
                                  <ellipse cx="110" cy="225" rx="8" ry="4" fill="#334155" stroke="#00F0FF" strokeWidth="1" />
                                  <ellipse cx="290" cy="225" rx="8" ry="4" fill="#334155" stroke="#00F0FF" strokeWidth="1" />
                                  <ellipse cx="200" cy="245" rx="8" ry="4" fill="#334155" stroke="#00F0FF" strokeWidth="1" />
                                  <ellipse cx="200" cy="205" rx="8" ry="4" fill="#334155" stroke="#00F0FF" strokeWidth="1" />
                                </g>
                              )}

                              {/* Magnetic Slots */}
                              {customizerExtras.includes("magnets") && (
                                <g>
                                  <ellipse cx="120" cy="220" rx="6" ry="3" fill="#64748B" stroke="#A7F3D0" strokeWidth="1" />
                                  <ellipse cx="280" cy="220" rx="6" ry="3" fill="#64748B" stroke="#A7F3D0" strokeWidth="1" />
                                </g>
                              )}

                              {/* Pencil Sleeve Extension (if selected) */}
                              {customizerExtras.includes("sleeve") && (
                                <g>
                                  {/* Shadow of sleeve */}
                                  <ellipse cx="110" cy="210" rx="20" ry="10" fill="rgba(0,0,0,0.3)" />
                                  {/* Left Side */}
                                  <path d="M 90 140 L 90 210 A 20 10 0 0 0 130 210 L 130 140 Z" fill={customizerColor} filter="brightness(0.7)" stroke={isWireframe ? "#06b6d4" : "rgba(255,255,255,0.05)"} strokeWidth={isWireframe ? 1 : 0.5} />
                                  {/* Top Rim */}
                                  <ellipse cx="110" cy="140" rx="20" ry="10" fill={customizerColor} filter="brightness(1.1)" stroke={isWireframe ? "#06b6d4" : "rgba(255,255,255,0.15)"} />
                                  <ellipse cx="110" cy="140" rx="14" ry="7" fill="#0A0B0E" />
                                </g>
                              )}

                              {/* Main 3D Shape representing the current selected variant */}
                              {/* Base shape adapts size based on variant (Compact vs Standard vs Heavy) */}
                              {/* Top Face */}
                              <path 
                                d={
                                  customizerVariant === "compact" 
                                    ? "M 200 90 L 260 120 L 200 150 L 140 120 Z"
                                    : customizerVariant === "heavy"
                                    ? "M 200 65 L 290 110 L 200 155 L 110 110 Z"
                                    : customizerVariant === "grid"
                                    ? "M 200 75 L 275 112 L 200 150 L 125 112 Z"
                                    : "M 200 75 L 275 112 L 200 150 L 125 112 Z" // standard
                                }
                                fill={customizerColor}
                                filter="brightness(1.05)"
                                stroke={isWireframe ? "#06b6d4" : "rgba(255,255,255,0.1)"}
                                strokeWidth={isWireframe ? 1 : 0.5}
                                className="transition-all duration-300"
                              />

                              {/* Grid pattern overlay for Grid Edition */}
                              {customizerVariant === "grid" && !isWireframe && (
                                <path 
                                  d="M 125 112 L 200 75 M 143 121 L 218 84 M 161 130 L 236 93 M 179 139 L 254 102 M 197 148 L 272 111" 
                                  stroke="rgba(255, 255, 255, 0.15)" 
                                  strokeWidth="1.5" 
                                />
                              )}

                              {/* Left Face */}
                              <path 
                                d={
                                  customizerVariant === "compact"
                                    ? "M 140 120 L 200 150 L 200 210 L 140 180 Z"
                                    : customizerVariant === "heavy"
                                    ? "M 110 110 L 200 155 L 200 225 L 110 180 Z"
                                    : customizerVariant === "grid"
                                    ? "M 125 112 L 200 150 L 200 215 L 125 177 Z"
                                    : "M 125 112 L 200 150 L 200 215 L 125 177 Z" // standard
                                }
                                fill={customizerColor}
                                filter="brightness(0.75)"
                                stroke={isWireframe ? "#06b6d4" : "rgba(255,255,255,0.05)"}
                                strokeWidth={isWireframe ? 1 : 0.5}
                                className="transition-all duration-300"
                              />

                              {/* Right Face */}
                              <path 
                                d={
                                  customizerVariant === "compact"
                                    ? "M 200 150 L 260 120 L 260 180 L 200 210 Z"
                                    : customizerVariant === "heavy"
                                    ? "M 200 155 L 290 110 L 290 180 L 200 225 Z"
                                    : customizerVariant === "grid"
                                    ? "M 200 150 L 275 112 L 275 177 L 200 215 Z"
                                    : "M 200 150 L 275 112 L 275 177 L 200 215 Z" // standard
                                }
                                fill={customizerColor}
                                filter="brightness(0.85)"
                                stroke={isWireframe ? "#06b6d4" : "rgba(255,255,255,0.08)"}
                                strokeWidth={isWireframe ? 1 : 0.5}
                                className="transition-all duration-300"
                              />

                              {/* Interlocking Grid tabs (if grid edition) */}
                              {customizerVariant === "grid" && (
                                <g>
                                  {/* Back corner connector */}
                                  <rect x="195" y="65" width="10" height="10" rx="2" fill={customizerColor} filter="brightness(0.9)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                                  {/* Right side male connector */}
                                  <rect x="270" y="140" width="10" height="10" rx="2" fill={customizerColor} filter="brightness(0.8)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                                </g>
                              )}

                              {/* Dense Custom Infill transparent hatch overlay if weighted infill is selected */}
                              {customizerExtras.includes("weighted") && !isWireframe && (
                                <path 
                                  d="M 150 150 L 250 150 M 150 160 L 250 160 M 150 170 L 250 170 M 160 140 L 160 200 M 180 140 L 180 200 M 200 140 L 200 200" 
                                  stroke="rgba(59, 130, 246, 0.4)" 
                                  strokeWidth="1.5" 
                                  strokeDasharray="2,2" 
                                />
                              )}

                              {/* Engraving text overlay with projection! */}
                              {customizerEngraving && (
                                <g>
                                  {customizerPosition === "top" && (
                                    <text
                                      x="200"
                                      y={
                                        customizerVariant === "compact" ? "120" :
                                        customizerVariant === "heavy" ? "115" : "112"
                                      }
                                      textAnchor="middle"
                                      fill={customizerStyle === "embossed" ? "#FFFFFF" : "#000000"}
                                      opacity="0.85"
                                      transform={
                                        customizerVariant === "heavy"
                                          ? "rotate(-18 200 115) skewX(22)"
                                          : "rotate(-18 200 112) skewX(22)"
                                      }
                                      className={`font-bold transition-all duration-300 tracking-wider text-[11px] select-none ${
                                        customizerFont === "mono" ? "font-mono" :
                                        customizerFont === "serif" ? "font-serif" : "font-sans"
                                      }`}
                                      style={{
                                        textShadow: customizerStyle === "embossed" 
                                          ? "0.5px 0.5px 0px rgba(0,0,0,0.8), -0.5px -0.5px 0px rgba(255,255,255,0.2)"
                                          : "inset 0.5px 0.5px 1px rgba(0,0,0,0.9), 0.5px 0.5px 0px rgba(255,255,255,0.25)"
                                      }}
                                    >
                                      {customizerEngraving.toUpperCase()}
                                    </text>
                                  )}

                                  {customizerPosition === "side" && (
                                    <text
                                      x={customizerVariant === "heavy" ? "150" : "160"}
                                      y={customizerVariant === "heavy" ? "175" : "170"}
                                      textAnchor="middle"
                                      fill={customizerStyle === "embossed" ? "#FFFFFF" : "#000000"}
                                      opacity="0.8"
                                      transform="skewY(22)"
                                      className={`font-bold transition-all duration-300 tracking-wider text-[11px] select-none ${
                                        customizerFont === "mono" ? "font-mono" :
                                        customizerFont === "serif" ? "font-serif" : "font-sans"
                                      }`}
                                      style={{
                                        textShadow: customizerStyle === "embossed"
                                          ? "0.5px 0.5px 0px rgba(0,0,0,0.8)"
                                          : "0.5px 0.5px 0px rgba(255,255,255,0.2)"
                                      }}
                                    >
                                      {customizerEngraving.toUpperCase()}
                                    </text>
                                  )}

                                  {customizerPosition === "emblem" && (
                                    <g transform="translate(160, 215)">
                                      <rect width="80" height="20" rx="3" fill="#1E293B" stroke="#F1F5F9" strokeWidth="0.5" />
                                      <text
                                        x="40"
                                        y="13"
                                        textAnchor="middle"
                                        fill="#F1F5F9"
                                        className={`font-bold text-[9px] tracking-widest ${
                                          customizerFont === "mono" ? "font-mono" :
                                          customizerFont === "serif" ? "font-serif" : "font-sans"
                                        }`}
                                      >
                                        {customizerEngraving}
                                      </text>
                                    </g>
                                  )}
                                </g>
                              )}

                              {/* Laser guide line projecting onto the model */}
                              {customizerEngraving && (
                                <path 
                                  d="M 200 20 L 200 80" 
                                  stroke="rgba(244, 63, 94, 0.4)" 
                                  strokeWidth="1" 
                                  strokeDasharray="4,4" 
                                  className="animate-pulse"
                                />
                              )}
                            </g>
                          </svg>

                          {/* Orbit and viewport overlays */}
                          <div className="absolute bottom-3 left-3 flex gap-1.5 text-[9px] font-mono bg-[#0A0B0E]/85 border border-white/5 rounded-lg p-1.5 text-slate-400">
                            <span>GRID READY</span>
                            <span className="text-slate-600">|</span>
                            <span>ZOOM: 1.0X</span>
                            <span className="text-slate-600">|</span>
                            <span>ISO PERSPECTIVE</span>
                          </div>
                        </div>
                      </div>

                      {/* Section 5: Real-time Slicing & Physics Physics Outputs */}
                      <div className="bg-[#0A0B0E] border border-white/10 rounded-2xl p-5 space-y-4 text-xs">
                        <span className="text-[10px] font-mono font-bold text-blue-400 block uppercase tracking-widest flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5" />
                          Slicing Spec Comparison
                        </span>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                          <div className="bg-[#15171C] p-3 rounded-xl border border-white/5">
                            <span className="text-slate-500 block text-[9px] font-mono uppercase">Filament Weight</span>
                            <span className="text-white font-mono font-bold text-sm block mt-1">
                              {customizerWeight}g
                            </span>
                            <span className="text-[9px] text-slate-500 block mt-0.5">
                              (Base: {selectedProduct.filamentWeightGrams}g)
                            </span>
                          </div>

                          <div className="bg-[#15171C] p-3 rounded-xl border border-white/5">
                            <span className="text-slate-500 block text-[9px] font-mono uppercase">Print Speed-time</span>
                            <span className="text-white font-mono font-bold text-sm block mt-1">
                              {customizerFormattedPrintTime}
                            </span>
                            <span className="text-[9px] text-slate-500 block mt-0.5">
                              (Base: {selectedProduct.printing.estimatedPrintTime})
                            </span>
                          </div>

                          <div className="bg-[#15171C] p-3 rounded-xl border border-white/5">
                            <span className="text-slate-500 block text-[9px] font-mono uppercase">Material Cost</span>
                            <span className="text-emerald-400 font-mono font-bold text-sm block mt-1">
                              ${customizerMaterialCost.toFixed(2)}
                            </span>
                            <span className="text-[9px] text-slate-500 block mt-0.5">
                              (${activeMaterialConfig.cost}/kg)
                            </span>
                          </div>

                          <div className="bg-[#15171C] p-3 rounded-xl border border-white/5">
                            <span className="text-slate-500 block text-[9px] font-mono uppercase">Addon Accessories</span>
                            <span className="text-white font-mono font-bold text-sm block mt-1">
                              ${customizerHardwareCost.toFixed(2)}
                            </span>
                            <span className="text-[9px] text-slate-500 block mt-0.5">
                              (Rubber/Magnets)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Section 6: Dynamic Shop Economics & Personalization Margin */}
                      <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-5 space-y-4 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono font-bold text-blue-400 block uppercase tracking-widest flex items-center gap-1.5">
                            <Calculator className="w-3.5 h-3.5" />
                            Personalized Profit Metrics
                          </span>
                          <span className="bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                            +{customizerProfitMarginPercent}% Margin
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                          <div className="bg-[#0A0B0E] p-3.5 rounded-xl border border-white/5">
                            <span className="text-slate-500 block text-[9px] font-mono uppercase">Personalized Price</span>
                            <span className="text-white font-mono font-extrabold text-lg block mt-1">
                              ${customizerRetailPrice.toFixed(2)}
                            </span>
                            <span className="text-[9px] text-blue-400 block mt-0.5">
                              (+$ {customizationPremiumAmount.toFixed(2)} premium)
                            </span>
                          </div>

                          <div className="bg-[#0A0B0E] p-3.5 rounded-xl border border-white/5">
                            <span className="text-slate-500 block text-[9px] font-mono uppercase">Total Mfg + Etsy Cost</span>
                            <span className="text-slate-300 font-mono font-bold text-base block mt-1">
                              ${(customizerProductionCost + customizerTotalFees).toFixed(2)}
                            </span>
                            <span className="text-[9px] text-slate-500 block mt-0.5">
                              (Fees: ${customizerTotalFees.toFixed(2)})
                            </span>
                          </div>

                          <div className="bg-[#0A0B0E] p-3.5 rounded-xl border border-blue-500/10 shadow-md shadow-blue-500/5">
                            <span className="text-slate-500 block text-[9px] font-mono uppercase">Net Personalized Profit</span>
                            <span className="text-emerald-400 font-mono font-extrabold text-lg block mt-1">
                              ${customizerProfit.toFixed(2)}
                            </span>
                            <span className="text-[9px] text-emerald-500 block mt-0.5">
                              (Base: ${netProfit.toFixed(2)})
                            </span>
                          </div>
                        </div>

                        {/* Sandbox Actions */}
                        <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-white/5">
                          <button
                            onClick={() => {
                              const configObj = {
                                product_id: selectedProduct.id,
                                product_name: selectedProduct.name,
                                variant: customizerVariant,
                                material: customizerMaterial,
                                color_hex: customizerColor,
                                engraving_text: customizerEngraving,
                                engraving_font: customizerFont,
                                engraving_style: customizerStyle,
                                engraving_position: customizerPosition,
                                modular_inserts: customizerExtras,
                                calculated_filament_weight_grams: customizerWeight,
                                calculated_print_time: customizerFormattedPrintTime,
                                estimated_material_cost_usd: customizerMaterialCost,
                                recommended_personalized_price_usd: customizerRetailPrice
                              };
                              copyToClipboard(JSON.stringify(configObj, null, 2), "Manufacturing Blueprint");
                            }}
                            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-blue-500/10 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            {clipboardFeedback === "Manufacturing Blueprint" ? "Blueprints Copied!" : "Export Manufacturing Specs (JSON)"}
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* BOTTOM SECTION: TECHNICAL REQUIREMENTS & UI CONSIDERATIONS */}
                  <div className="bg-[#0A0B0E] border border-white/10 rounded-2xl p-5 space-y-4">
                    <div className="border-b border-white/5 pb-2.5">
                      <span className="text-[10px] font-mono font-bold text-blue-400 block uppercase tracking-widest flex items-center gap-1.5">
                        <Cpu className="w-4 h-4 text-blue-400" />
                        Customizer Architecture & Integration Guidelines
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300 leading-relaxed">
                      
                      {/* Column A: Technical Requirements */}
                      <div className="space-y-3.5">
                        <h4 className="text-white font-semibold font-display text-sm flex items-center gap-1.5">
                          <Wrench className="w-3.5 h-3.5 text-blue-400" />
                          Technical CAD & G-Code Requirements
                        </h4>
                        
                        <ul className="space-y-2 list-none pl-0">
                          <li className="flex gap-2">
                            <span className="text-blue-500 font-mono">1.</span>
                            <span><strong>Headless Parametric CAD Engine:</strong> Automate customized geometry modifications via server side Python libraries like <code>cadquery</code> or <code>OpenCASCADE</code>, converting configuration JSONs into finished <code>.STP</code> or <code>.STL</code> files.</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-blue-500 font-mono">2.</span>
                            <span><strong>Nozzle Slicer CLI Integrations:</strong> Integrate background CLI tasks with <code>Slic3r</code>, <code>PrusaSlicer</code>, or <code>Bambu Studio CLI</code> to auto-slice the customized STL. This validates model manifolds, outputs exact extrusion speeds, and warns of overhang failures prior to spool print execution.</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-blue-500 font-mono">3.</span>
                            <span><strong>Dynamic G-Code Post-Processing:</strong> For modular additions (e.g., neodymium magnet slots), a G-code parser script must automatically insert pause codes (e.g., <code>M600</code> color change or <code>M0</code> stop commands) at precise layer heights, enabling the printer operator to safely insert magnet cores mid-print.</span>
                          </li>
                        </ul>
                      </div>

                      {/* Column B: UI/UX Design Considerations */}
                      <div className="space-y-3.5">
                        <h4 className="text-white font-semibold font-display text-sm flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-blue-400" />
                          User Interface & Visualizer UX Considerations
                        </h4>
                        
                        <ul className="space-y-2 list-none pl-0">
                          <li className="flex gap-2">
                            <span className="text-blue-500 font-mono">1.</span>
                            <span><strong>Dynamic Browser Render Performance:</strong> High-fidelity WebGL viewers (e.g., Three.js, React Three Fiber, or BabylonJS) are ideal for interactive 3D orbiter views. Fallback to responsive vectors (SVGs) ensures instant load times on lower-end mobile devices and provides a clean blueprint aesthetic.</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-blue-500 font-mono">2.</span>
                            <span><strong>Parametric Bounds Validation:</strong> Prevent print model deformation by strict client-side constraints. For example, text engravings must be restricted in length (max 15 characters) and restricted to designated flat-surfaces (Safe Zones) to prevent characters spilling off chamfers or corners.</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-blue-500 font-mono">3.</span>
                            <span><strong>Micro-interaction Hover Highlighting:</strong> Build hover indicators on placement sectors (e.g. flashing red outline on the Top Face or Side Panel during selection). This guides user focus, provides immediate alignment feedback, and lowers order friction.</span>
                          </li>
                        </ul>
                      </div>

                    </div>
                  </div>

                </div>
              )}

            </div>
          </main>

        </div>

      </div>

      {/* Styled Footer */}
      <footer className="border-t border-white/5 bg-[#0A0B0E]/80 py-8 px-4 text-center text-xs text-slate-500 space-y-2" id="app-footer-info">
        <p className="font-mono text-[10px] tracking-widest uppercase text-slate-500">© 2026 PRINTFORGE INTELLIGENCE SYSTEMS | CONFIDENTIAL REPORT</p>
        <p className="max-w-md mx-auto text-[10px] text-slate-600 font-sans">
          Disclaimer: Revenue estimates and validation metrics are calculated based on historic Etsy category sales indexes. Actual merchant sales volumes depend on listing aesthetic layout, conversion optimization, and print quality.
        </p>
      </footer>
    </div>
  );
}

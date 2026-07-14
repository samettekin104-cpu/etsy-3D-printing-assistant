export interface CompetitorListing {
  product: string;
  price: number;
  salesEstimate: number;
  reviewCount: number;
  strengths: string[];
  weaknesses: string[];
  howToOutperform: string;
}

export interface ScorecardMetrics {
  demandScore: number;       // 0-100
  competitionScore: number;  // 0-100 (high score = high competition)
  profitMarginScore: number; // 0-100
  productionTimeScore: number; // 0-100 (higher = faster/easier to print)
  difficultyLevel: "Easy" | "Medium" | "Hard";
  customizationPotential: number; // 0-100
  repeatCustomerPotential: number; // 0-100
  giftability: number; // 0-100
  scalability: number; // 0-100
  legalRisk: "Low" | "Medium" | "High";
  overallScore: number;      // 0-100
}

export interface PrintingParameters {
  recommendedPrinterType: string;
  plaCompatible: boolean;
  petgCompatible: boolean;
  absCompatible: boolean;
  tpuCompatible: boolean;
  compatibleMaterialsText: string;
  nozzleSize: string;
  layerHeight: string;
  infillPercent: number;
  supportsRequired: "None" | "Minimal" | "Normal" | "Tree Supports";
  orientation: string;
  estimatedPrintTime: string; // e.g. "4h 15m"
  estimatedPrintTimeMinutes: number;
  materialConsumptionGrams: number;
  filamentCostPerKg: number;
  failureRisks: string[];
  optimizationSuggestions: string[];
  strengthImprovements: string[];
  toleranceRecommendations: string;
  assemblyRecommendations: string;
}

export interface CADBrief {
  dimensions: string;
  wallThickness: string;
  filletsAndChamfers: string;
  snapFits: string;
  threads: string;
  hardwareRequired: string; // e.g. "4x 6x2mm Neodymium Magnets"
  movingParts: string;
  explodedViewDescription: string;
  manufacturingConstraints: string;
}

export interface ImagePromptPackage {
  midjourney: string;
  flux: string;
  ideogram: string;
  dalle: string;
  heroImagePrompt: string;
  lifestylePhotoPrompt: string;
  studioPhotoPrompt: string;
  packagingPhotoPrompt: string;
}

export interface SEOPackage {
  optimizedTitle: string;
  tags13: string[];
  primaryKeywords: string[];
  secondaryKeywords: string[];
  longTailKeywords: string[];
  searchIntent: string;
  category: string;
  attributes: string;
  descriptionText: string;
  bulletPoints: string[];
  faqs: { question: string; answer: string }[];
  altTexts: string[];
  imageFileNames: string[];
}

export interface PricingBreakdown {
  materialCost: number;
  electricityCost: number;
  machineTimeCost: number; // e.g. wear and tear
  laborCost: number;
  packagingCost: number;
  shippingCost: number;
  etsyListingFee: number; // $0.20
  etsyTransactionFee: number; // 6.5%
  etsyProcessingFee: number; // 4% + $0.25 (standard UK/US/EU avg)
  recommendedRetailPrice: number;
  premiumPrice: number;
  discountStrategy: string;
  bundleStrategy: string;
}

export interface MarketingPlan {
  pinterestStrategy: string;
  tiktokStrategy: string;
  instagramStrategy: string;
  youtubeShortsStrategy: string;
  launchCampaign: string;
  ugcStrategy: string;
  contentCalendar4Weeks: { week: number; focus: string; channels: { platform: string; content: string }[] }[];
}

export interface AutomationRecipes {
  zapierAutomations: string[];
  n8nWorkflows: string[];
  inventoryOrderTracking: string;
}

export interface LegalRiskCheck {
  trademarkCheck: string;
  copyrightPatentCheck: string;
  warnings: string;
  isSafeToSell: boolean;
}

export interface CustomerSentiment {
  commonPainPoints: { painPoint: string; frequencyPercent: number; impactLevel: "High" | "Medium" | "Low"; description: string }[];
  topCompetitorReviews: { rating: number; reviewText: string; competitorName: string; keyIssue: string }[];
  improvementSuggestions: { feature: string; priority: "High" | "Medium" | "Low"; designAction: string }[];
}

export interface EtsyLiveListing {
  title: string;
  shopName: string;
  price: number;
  rating: number;
  salesVolume: string;
  listingUrl: string;
  imageUrl?: string;
  successStrategy: string;
  photographyStyle: string;
  optimizedTags: string[];
}

export interface EtsyLiveShop {
  shopName: string;
  totalSales: string;
  activeListingCount: number;
  nicheFocus: string;
  successTakeaways: string[];
  shopUrl: string;
}

export interface EtsyLiveExamplesData {
  listings: EtsyLiveListing[];
  featuredShops: EtsyLiveShop[];
  overallMarketInsight: string;
}

export interface Etsy3DProductAnalysis {
  id: string;
  name: string;
  niche: string;
  description: string;
  monthlyRevenuePotential: number;
  timeToFirstSaleDays: number;
  probabilityOfSuccessPercent: number;
  filamentWeightGrams: number;
  printTimeHours: number;
  
  scorecard: ScorecardMetrics;
  marketDemandAnalysis: string;
  competitors: CompetitorListing[];
  customerSentiment?: CustomerSentiment;
  etsyLiveExamples?: EtsyLiveExamplesData;
  printing: PrintingParameters;
  cadBrief: CADBrief;
  imagePrompts: ImagePromptPackage;
  seo: SEOPackage;
  pricing: PricingBreakdown;
  marketing: MarketingPlan;
  automations: AutomationRecipes;
  legal: LegalRiskCheck;
}

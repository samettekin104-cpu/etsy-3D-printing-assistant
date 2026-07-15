import React, { useState } from "react";
import {
  FolderHeart,
  Trash2,
  Download,
  Upload,
  Plus,
  TrendingUp,
  DollarSign,
  Truck,
  Package,
  Wrench,
  Percent,
  Eye,
  Info,
  Check,
  Edit2,
  FileText,
  Github,
  Database,
  Search,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { Etsy3DProductAnalysis, SavedProduct } from "../types";

interface SavedPortfolioProps {
  lang: "EN" | "TR";
  savedProducts: SavedProduct[];
  onUpdateSavedProduct: (id: string, updated: Partial<SavedProduct>) => void;
  onRemoveFromPortfolio: (id: string) => void;
  onSelectAndAnalyze: (product: Etsy3DProductAnalysis) => void;
  onImportPortfolio: (imported: SavedProduct[]) => void;
}

export default function SavedPortfolio({
  lang,
  savedProducts,
  onUpdateSavedProduct,
  onRemoveFromPortfolio,
  onSelectAndAnalyze,
  onImportPortfolio
}: SavedPortfolioProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showImportArea, setShowImportArea] = useState(false);
  const [jsonInput, setJsonInput] = useState("");
  const [importError, setImportError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // Translations
  const t = (en: string, tr: string) => (lang === "TR" ? tr : en);

  // Filtering
  const filteredProducts = savedProducts.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      p.analysis.name.toLowerCase().includes(term) ||
      p.analysis.niche.toLowerCase().includes(term) ||
      (p.customNotes && p.customNotes.toLowerCase().includes(term))
    );
  });

  // Calculate overall portfolio metrics
  const totalSaved = savedProducts.length;
  const totalCostCombined = savedProducts.reduce((sum, p) => {
    const cost =
      (p.customProductCost ?? p.analysis.pricing.materialCost) +
      (p.customShippingCost ?? p.analysis.pricing.shippingCost) +
      (p.customPackagingCost ?? p.analysis.pricing.packagingCost) +
      (p.customLaborCost ?? p.analysis.pricing.laborCost);
    return sum + cost;
  }, 0);

  const totalRevenueCombined = savedProducts.reduce((sum, p) => {
    const price = p.customRetailPrice ?? p.analysis.pricing.recommendedRetailPrice;
    return sum + price;
  }, 0);

  const averageMargin =
    totalRevenueCombined > 0
      ? ((totalRevenueCombined - totalCostCombined) / totalRevenueCombined) * 100
      : 0;

  // Export to JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(savedProducts, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "portfolio.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyJSONToClipboard = () => {
    const jsonStr = JSON.stringify(savedProducts, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleImportJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (!Array.isArray(parsed)) {
        throw new Error(t("JSON must be an array of products", "JSON bir ürün dizisi (array) olmalıdır."));
      }
      // Simple validation
      const validated: SavedProduct[] = parsed.map((item: any, idx: number) => {
        if (!item.id || !item.analysis) {
          throw new Error(
            t(
              `Item at index ${idx} is missing 'id' or 'analysis' fields`,
              `${idx} indeksindeki üründe 'id' veya 'analysis' alanı eksik.`
            )
          );
        }
        return {
          id: item.id,
          analysis: item.analysis,
          savedAt: item.savedAt || new Date().toISOString(),
          customProductCost: item.customProductCost !== undefined ? Number(item.customProductCost) : undefined,
          customShippingCost: item.customShippingCost !== undefined ? Number(item.customShippingCost) : undefined,
          customPackagingCost: item.customPackagingCost !== undefined ? Number(item.customPackagingCost) : undefined,
          customLaborCost: item.customLaborCost !== undefined ? Number(item.customLaborCost) : undefined,
          customRetailPrice: item.customRetailPrice !== undefined ? Number(item.customRetailPrice) : undefined,
          customNotes: item.customNotes || ""
        };
      });

      onImportPortfolio(validated);
      setJsonInput("");
      setShowImportArea(false);
      setImportError(null);
    } catch (err: any) {
      setImportError(err.message || t("Invalid JSON structure", "Geçersiz JSON yapısı"));
    }
  };

  return (
    <div className="space-y-6" id="portfolio-container">
      {/* Portfolio Info Banner & Actions */}
      <div className="bg-[#15171C] border border-white/10 rounded-2xl p-5 md:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg">
              <FolderHeart className="w-5 h-5" />
            </span>
            <span className="text-xs font-mono text-blue-500 font-semibold tracking-wider uppercase">
              {t("CURATED PORTFOLIO DATABASE", "KÜRESEL PORTFÖY VERİTABANI")}
            </span>
          </div>
          <h2 className="text-2xl font-display font-bold text-white mt-1">
            {t("Your Etsy 3D Print Portfolio", "Etsy 3D Baskı Ürün Portföyünüz")}
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            {t(
              "Save your highly validated products here. Fill in your manual material costs, local shipping rates, and custom pricing to calculate precise, live profit margins.",
              "Doğruladığınız mantıklı ürünleri buraya kaydedin. Gerçek zamanlı kâr marjlarınızı hesaplamak için manuel malzeme maliyetlerini, kargo fiyatlarını ve özel satış fiyatlarınızı girin."
            )}
          </p>
        </div>

        {/* Global Stats */}
        <div className="flex gap-4 self-start md:self-auto">
          <div className="bg-[#0A0B0E] border border-white/10 p-3 rounded-2xl text-center min-w-[95px]">
            <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-widest">
              {t("Saved", "Kayıtlı")}
            </span>
            <span className="text-base font-mono font-bold text-blue-500">{totalSaved}</span>
          </div>
          <div className="bg-[#0A0B0E] border border-white/10 p-3 rounded-2xl text-center min-w-[110px]">
            <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-widest">
              {t("Est. Avg Margin", "Ort. Kâr Marjı")}
            </span>
            <span className="text-base font-mono font-bold text-emerald-400">
              {averageMargin.toFixed(1)}%
            </span>
          </div>
          <div className="bg-[#0A0B0E] border border-white/10 p-3 rounded-2xl text-center min-w-[110px]">
            <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-widest">
              {t("Total Revenue", "Toplam Ciro")}
            </span>
            <span className="text-base font-mono font-bold text-cyan-400">
              ${totalRevenueCombined.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* GitHub Sync Information Notice */}
      <div className="bg-blue-500/5 border border-blue-500/10 p-5 rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        <div className="md:col-span-8 space-y-1.5">
          <h4 className="text-sm font-semibold text-white flex items-center gap-1.5">
            <Github className="w-4 h-4 text-blue-400" />
            <span>
              {t(
                "GitHub Connected Serverless JSON Database",
                "GitHub Bağlantılı Sunucusuz JSON Veritabanı"
              )}
            </span>
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t(
              "Your site is hosted on Cloudflare Pages/GitHub. To save your portfolio permanently, download your updated portfolio below, then place/commit it in your repository as 'src/portfolio.json'. When your project rebuilds, your saved products will be preloaded forever!",
              "Siteniz Cloudflare Pages/GitHub üzerinde barındırılmaktadır. Portföyünüzü kalıcı olarak saklamak için aşağıdaki güncel veritabanınızı indirin, ardından deponuza 'src/portfolio.json' olarak ekleyin/commit edin. Projeniz yeniden derlendiğinde, kayıtlı ürünleriniz kalıcı olarak yüklenecektir!"
            )}
          </p>
        </div>
        <div className="md:col-span-4 flex flex-wrap gap-2 justify-end">
          <button
            onClick={handleExportJSON}
            disabled={totalSaved === 0}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-white/5 disabled:text-slate-500 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-1.5 transition-all cursor-pointer disabled:cursor-not-allowed shadow-md shadow-blue-500/15"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t("Download DB", "Veritabanını İndir")}</span>
          </button>
          <button
            onClick={handleCopyJSONToClipboard}
            disabled={totalSaved === 0}
            className="px-3.5 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 font-mono text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {copySuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Database className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copySuccess ? t("Copied!", "Kopyalandı!") : t("Copy JSON", "JSON Kopyala")}</span>
          </button>
          <button
            onClick={() => setShowImportArea(!showImportArea)}
            className="px-3.5 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 font-mono text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-slate-400" />
            <span>{t("Import JSON", "Yükle / Aktar")}</span>
          </button>
        </div>
      </div>

      {/* JSON Import Drawer */}
      {showImportArea && (
        <div className="bg-[#15171C] border border-white/10 p-5 rounded-2xl space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-white">
              {t("Import Portfolio Database", "Portföy Veritabanını İçe Aktar")}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {t(
                "Paste the content of your 'portfolio.json' file to reload your entire saved list:",
                "Tüm kayıtlı listenizi yüklemek için 'portfolio.json' dosyanızın içeriğini yapıştırın:"
              )}
            </p>
          </div>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='[ { "id": "product-123", "analysis": { ... }, "customProductCost": 4.5 } ]'
            className="w-full h-32 bg-[#0A0B0E] border border-white/10 p-3 rounded-xl font-mono text-xs text-slate-300 focus:outline-none focus:border-blue-500 transition-colors"
          />
          {importError && (
            <p className="text-xs text-red-400 font-mono bg-red-500/10 border border-red-500/20 p-2 rounded-lg">
              {importError}
            </p>
          )}
          <div className="flex gap-2">
            <button
              onClick={handleImportJSON}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-all"
            >
              {t("Apply & Load", "Uygula ve Yükle")}
            </button>
            <button
              onClick={() => {
                setShowImportArea(false);
                setImportError(null);
              }}
              className="px-4 py-2 bg-white/5 text-slate-300 hover:bg-white/10 font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-all"
            >
              {t("Cancel", "İptal")}
            </button>
          </div>
        </div>
      )}

      {/* Search & Filter bar */}
      <div className="flex items-center gap-3 bg-[#15171C] border border-white/5 px-4 py-3 rounded-2xl">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t("Search saved portfolio...", "Kayıtlı portföyde ara...")}
          className="bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none w-full"
        />
      </div>

      {/* Grid of Portfolio Products */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#15171C]/50 border border-white/5 rounded-2xl p-12 text-center space-y-3">
          <FolderHeart className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-semibold text-white">
            {t("No products found", "Ürün Bulunamadı")}
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {searchTerm
              ? t("No matches found for your search term.", "Arama kriterlerinize uyan kayıtlı ürün bulunamadı.")
              : t("Your portfolio is currently empty. Go to the AI Research Lab, search for a product or scan categories, and click 'Save to Portfolio'!", "Portföyünüz şu anda boş. Yapay Zeka Araştırma Laboratuvarı'na gidin, bir ürün aratın veya kategori tarayıp 'Portföye Kaydet' butonuna basın!")}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredProducts.map((p) => {
            const analysis = p.analysis;
            
            // Current manual or fallback values
            const productCost = p.customProductCost ?? analysis.pricing.materialCost;
            const shippingCost = p.customShippingCost ?? analysis.pricing.shippingCost;
            const packagingCost = p.customPackagingCost ?? analysis.pricing.packagingCost;
            const laborCost = p.customLaborCost ?? analysis.pricing.laborCost;
            const retailPrice = p.customRetailPrice ?? analysis.pricing.recommendedRetailPrice;
            const notes = p.customNotes || "";

            // Calculated values
            const totalCost = productCost + shippingCost + packagingCost + laborCost;
            const profit = retailPrice - totalCost;
            const margin = retailPrice > 0 ? (profit / retailPrice) * 100 : 0;
            const roi = totalCost > 0 ? (profit / totalCost) * 100 : 0;

            const isEditing = editingId === p.id;

            return (
              <div
                key={p.id}
                className="bg-[#15171C] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all flex flex-col justify-between"
              >
                {/* Product Header */}
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <span className="text-[9px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded uppercase tracking-wider">
                        {analysis.niche}
                      </span>
                      <h3 className="text-base font-display font-extrabold text-white mt-1.5">
                        {analysis.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onSelectAndAnalyze(analysis)}
                        className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors cursor-pointer"
                        title={t("View 13-stage AI analysis", "13 Aşamalı AI Analizini İncele")}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onRemoveFromPortfolio(p.id)}
                        className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors cursor-pointer"
                        title={t("Remove from portfolio", "Portföyden Kaldır")}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2">
                    {analysis.description}
                  </p>

                  {/* Manual Costings & Form */}
                  <div className="bg-[#0A0B0E] border border-white/5 rounded-xl p-4 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <h4 className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1.5">
                        <Edit2 className="w-3.5 h-3.5 text-blue-400" />
                        <span>{t("MANUAL FINANCIAL OVERRIDES", "MANUEL FİNANSAL VERİLER")}</span>
                      </h4>
                      <button
                        onClick={() => setEditingId(isEditing ? null : p.id)}
                        className="text-[10px] font-mono text-blue-400 hover:text-blue-300 font-bold uppercase cursor-pointer"
                      >
                        {isEditing ? t("Close Edit", "Düzenlemeyi Kapat") : t("Edit Costs", "Maliyetleri Düzenle")}
                      </button>
                    </div>

                    {isEditing ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {/* Cost Edit Inputs */}
                        <div>
                          <label className="text-[10px] text-slate-500 font-mono uppercase block mb-1">
                            {t("Product Cost", "Ürün Maliyeti")} ($)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={p.customProductCost ?? ""}
                            placeholder={analysis.pricing.materialCost.toFixed(2)}
                            onChange={(e) =>
                              onUpdateSavedProduct(p.id, {
                                customProductCost: e.target.value === "" ? undefined : Number(e.target.value)
                              })
                            }
                            className="w-full bg-[#15171C] border border-white/10 px-2.5 py-1.5 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 font-mono uppercase block mb-1">
                            {t("Shipping Price", "Kargo Fiyatı")} ($)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={p.customShippingCost ?? ""}
                            placeholder={analysis.pricing.shippingCost.toFixed(2)}
                            onChange={(e) =>
                              onUpdateSavedProduct(p.id, {
                                customShippingCost: e.target.value === "" ? undefined : Number(e.target.value)
                              })
                            }
                            className="w-full bg-[#15171C] border border-white/10 px-2.5 py-1.5 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 font-mono uppercase block mb-1">
                            {t("Packaging", "Paketleme")} ($)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={p.customPackagingCost ?? ""}
                            placeholder={analysis.pricing.packagingCost.toFixed(2)}
                            onChange={(e) =>
                              onUpdateSavedProduct(p.id, {
                                customPackagingCost: e.target.value === "" ? undefined : Number(e.target.value)
                              })
                            }
                            className="w-full bg-[#15171C] border border-white/10 px-2.5 py-1.5 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 font-mono uppercase block mb-1">
                            {t("Labor / Other", "İşçilik / Diğer")} ($)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={p.customLaborCost ?? ""}
                            placeholder={analysis.pricing.laborCost.toFixed(2)}
                            onChange={(e) =>
                              onUpdateSavedProduct(p.id, {
                                customLaborCost: e.target.value === "" ? undefined : Number(e.target.value)
                              })
                            }
                            className="w-full bg-[#15171C] border border-white/10 px-2.5 py-1.5 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 font-mono uppercase block mb-1">
                            {t("Retail Price", "Satış Fiyatı")} ($)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={p.customRetailPrice ?? ""}
                            placeholder={analysis.pricing.recommendedRetailPrice.toFixed(2)}
                            onChange={(e) =>
                              onUpdateSavedProduct(p.id, {
                                customRetailPrice: e.target.value === "" ? undefined : Number(e.target.value)
                              })
                            }
                            className="w-full bg-[#15171C] border border-white/10 px-2.5 py-1.5 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="bg-[#15171C]/50 p-2 rounded-lg border border-white/5">
                          <span className="text-[8px] text-slate-500 font-mono block">{t("PRODUCT COST", "ÜRÜN MALİYETİ")}</span>
                          <span className="text-xs font-mono font-bold text-white flex items-center">
                            <DollarSign className="w-3 h-3 text-slate-500" />
                            <span>{productCost.toFixed(2)}</span>
                          </span>
                        </div>
                        <div className="bg-[#15171C]/50 p-2 rounded-lg border border-white/5">
                          <span className="text-[8px] text-slate-500 font-mono block">{t("SHIPPING COST", "KARGO MALİYETİ")}</span>
                          <span className="text-xs font-mono font-bold text-white flex items-center">
                            <Truck className="w-3 h-3 text-slate-500" />
                            <span>{shippingCost.toFixed(2)}</span>
                          </span>
                        </div>
                        <div className="bg-[#15171C]/50 p-2 rounded-lg border border-white/5">
                          <span className="text-[8px] text-slate-500 font-mono block">{t("PACKAGING", "PAKETLEME")}</span>
                          <span className="text-xs font-mono font-bold text-white flex items-center">
                            <Package className="w-3 h-3 text-slate-500" />
                            <span>{packagingCost.toFixed(2)}</span>
                          </span>
                        </div>
                        <div className="bg-[#15171C]/50 p-2 rounded-lg border border-white/5">
                          <span className="text-[8px] text-slate-500 font-mono block">{t("LABOR / WORK", "İŞÇİLİK")}</span>
                          <span className="text-xs font-mono font-bold text-white flex items-center">
                            <Wrench className="w-3 h-3 text-slate-500" />
                            <span>{laborCost.toFixed(2)}</span>
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Dynamic notes field */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 font-mono uppercase block">
                        {t("Manual Notes & Supplier Details", "Özel Notlar ve Tedarikçi Detayları")}
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => onUpdateSavedProduct(p.id, { customNotes: e.target.value })}
                        placeholder={t("Paste filament links, design modifications or packaging ideas...", "Filament linklerini, tasarım değişikliklerini veya paketleme fikirlerini buraya not edin...")}
                        className="w-full h-16 bg-[#15171C] border border-white/5 p-2.5 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600 resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Performance Indicators & Bottom Summary */}
                <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-3 gap-2.5 items-center">
                  <div className="text-center bg-white/5 border border-white/5 py-2 px-1.5 rounded-xl">
                    <span className="text-[8px] text-slate-500 font-mono block uppercase">{t("TOTAL COST", "TOPLAM MALİYET")}</span>
                    <span className="text-sm font-mono font-bold text-slate-300">${totalCost.toFixed(2)}</span>
                  </div>
                  <div className="text-center bg-white/5 border border-white/5 py-2 px-1.5 rounded-xl">
                    <span className="text-[8px] text-slate-500 font-mono block uppercase">{t("SALE PRICE", "SATIŞ FİYATI")}</span>
                    <span className="text-sm font-mono font-bold text-white">${retailPrice.toFixed(2)}</span>
                  </div>
                  <div className="text-center bg-emerald-500/10 border border-emerald-500/20 py-2 px-1.5 rounded-xl">
                    <span className="text-[8px] text-emerald-500/60 font-mono block uppercase">{t("NET MARGIN", "NET MARJ")}</span>
                    <span className="text-sm font-mono font-bold text-emerald-400">
                      {margin.toFixed(0)}%
                    </span>
                  </div>
                </div>

                {/* Additional KPI under indicators */}
                <div className="mt-3 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                  <span>
                    {t("Saved on:", "Kayıt tarihi:")} {new Date(p.savedAt).toLocaleDateString(lang === "TR" ? "tr-TR" : "en-US")}
                  </span>
                  <span className="text-emerald-500 font-semibold">
                    ROI: {roi.toFixed(1)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

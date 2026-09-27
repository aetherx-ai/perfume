import React, { useState, useMemo, useEffect } from 'react';
import { Filter, SlidersHorizontal, X, Search, RotateCcw, ChevronDown, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { FRAGRANCES, BRANDS, FRAGRANCE_FAMILIES } from '../data/fragrances';
import { ProductCard } from '../components/ProductCard';
import { FragranceGender, FragranceType, FragranceFamily, FragranceFormat } from '../types';

export function ShopPage() {
  const { pageParams, navigateTo } = useShop();

  // Filter States initialized from pageParams
  const [search, setSearch] = useState<string>(pageParams.q || '');
  const [selectedGender, setSelectedGender] = useState<string>(pageParams.gender || 'All');
  const [selectedType, setSelectedType] = useState<string>(pageParams.type || 'All');
  const [selectedFamily, setSelectedFamily] = useState<string>(pageParams.family || 'All');
  const [selectedBrand, setSelectedBrand] = useState<string>(pageParams.brand || 'All');
  const [selectedFormat, setSelectedFormat] = useState<string>(pageParams.format || 'All');
  const [sortBy, setSortBy] = useState<string>(pageParams.sort || 'featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state if pageParams changes externally
  useEffect(() => {
    if (pageParams.gender) setSelectedGender(pageParams.gender);
    if (pageParams.type) setSelectedType(pageParams.type);
    if (pageParams.format) setSelectedFormat(pageParams.format);
    if (pageParams.q) setSearch(pageParams.q);
    if (pageParams.sort) setSortBy(pageParams.sort);
  }, [pageParams]);

  // Reset filters
  const resetFilters = () => {
    setSearch('');
    setSelectedGender('All');
    setSelectedType('All');
    setSelectedFamily('All');
    setSelectedBrand('All');
    setSelectedFormat('All');
    setSortBy('featured');
    navigateTo('shop');
  };

  // Filter logic
  const filteredProducts = useMemo(() => {
    return FRAGRANCES.filter((product) => {
      // Search
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesAccords = product.mainAccords.some((a) => a.toLowerCase().includes(q));
        const matchesNotes =
          product.notes.top.some((n) => n.toLowerCase().includes(q)) ||
          product.notes.heart.some((n) => n.toLowerCase().includes(q)) ||
          product.notes.base.some((n) => n.toLowerCase().includes(q));
        if (!matchesName && !matchesBrand && !matchesAccords && !matchesNotes) return false;
      }

      // Gender
      if (selectedGender !== 'All' && product.gender !== selectedGender) {
        return false;
      }

      // Fragrance Tier / Type
      if (selectedType !== 'All' && product.type !== selectedType) {
        return false;
      }

      // Fragrance Family
      if (selectedFamily !== 'All' && product.family !== selectedFamily) {
        return false;
      }

      // Brand
      if (selectedBrand !== 'All' && product.brand !== selectedBrand) {
        return false;
      }

      // Format (Decant vs Full Bottle)
      if (selectedFormat !== 'All') {
        const hasFormat = product.variants.some((v) => v.format === selectedFormat);
        if (!hasFormat) return false;
      }

      return true;
    }).sort((a, b) => {
      const minPriceA = Math.min(...a.variants.map((v) => v.price));
      const minPriceB = Math.min(...b.variants.map((v) => v.price));

      if (sortBy === 'price-low') return minPriceA - minPriceB;
      if (sortBy === 'price-high') return minPriceB - minPriceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      if (sortBy === 'bestseller') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [search, selectedGender, selectedType, selectedFamily, selectedBrand, selectedFormat, sortBy]);

  const activeFilterCount =
    (selectedGender !== 'All' ? 1 : 0) +
    (selectedType !== 'All' ? 1 : 0) +
    (selectedFamily !== 'All' ? 1 : 0) +
    (selectedBrand !== 'All' ? 1 : 0) +
    (selectedFormat !== 'All' ? 1 : 0) +
    (search ? 1 : 0);

  return (
    <div className="bg-[#090B0C] min-h-screen py-8 sm:py-12 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-[#929DA0] uppercase tracking-wider mb-2">
            <button onClick={() => navigateTo('home')} className="hover:text-[#F4F5F3]">
              Home
            </button>
            <span>/</span>
            <span className="text-[#C8DADD]">Fragrance Gallery</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#F4F5F3]">
                The Fragrance Collection
              </h1>
              <p className="text-xs sm:text-sm text-[#929DA0] mt-1 font-light">
                100% authentic luxury decants and original sealed bottles from European & Arabian ateliers.
              </p>
            </div>

            {/* Mobile Filter & Sort Triggers */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="flex-1 py-2 px-3 rounded bg-[#161B1D] border border-white/10 text-xs font-medium uppercase tracking-wider text-[#F4F5F3] flex items-center justify-center gap-2"
              >
                <Filter className="w-3.5 h-3.5 text-[#C8DADD]" />
                <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="py-2 px-3 rounded bg-[#161B1D] border border-white/10 text-xs text-[#F4F5F3] uppercase tracking-wider focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="bestseller">Best Sellers</option>
                <option value="newest">New Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Layout Grid: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-28 bg-[#101416] p-6 rounded-lg border border-white/5">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#C8DADD]" />
                <span className="text-xs uppercase tracking-widest font-semibold text-[#F4F5F3]">
                  Refine Catalog
                </span>
              </div>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-[11px] text-[#C8A98A] hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* In-Catalog Search */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#929DA0] font-medium mb-2">
                Search Fragrance
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#929DA0] absolute left-3 top-3" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Name, notes, brand..."
                  className="w-full pl-9 pr-3 py-2 rounded bg-[#161B1D] border border-white/10 text-xs text-[#F4F5F3] placeholder-[#929DA0]/50 focus:outline-none focus:border-[#8FAFBA]"
                />
              </div>
            </div>

            {/* Format: Decant vs Full Bottle */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#929DA0] font-medium mb-2">
                Available Format
              </label>
              <div className="flex flex-col space-y-1.5">
                {['All', 'Decant', 'Full Bottle'].map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setSelectedFormat(fmt)}
                    className={`text-left text-xs py-1.5 px-2.5 rounded transition-colors flex items-center justify-between ${
                      selectedFormat === fmt
                        ? 'bg-[#1C2325] text-[#C8DADD] font-semibold'
                        : 'text-[#929DA0] hover:text-[#F4F5F3]'
                    }`}
                  >
                    <span>{fmt === 'All' ? 'All Formats' : fmt}</span>
                    {selectedFormat === fmt && <Check className="w-3 h-3 text-[#C8DADD]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#929DA0] font-medium mb-2">
                Gender Profile
              </label>
              <div className="flex flex-col space-y-1.5">
                {['All', 'Men', 'Women', 'Unisex'].map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGender(g)}
                    className={`text-left text-xs py-1.5 px-2.5 rounded transition-colors flex items-center justify-between ${
                      selectedGender === g
                        ? 'bg-[#1C2325] text-[#C8DADD] font-semibold'
                        : 'text-[#929DA0] hover:text-[#F4F5F3]'
                    }`}
                  >
                    <span>{g === 'All' ? 'All Genders' : g}</span>
                    {selectedGender === g && <Check className="w-3 h-3 text-[#C8DADD]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Tier / Category */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#929DA0] font-medium mb-2">
                Fragrance Tier
              </label>
              <div className="flex flex-col space-y-1.5">
                {['All', 'Designer', 'Niche', 'Arabian'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`text-left text-xs py-1.5 px-2.5 rounded transition-colors flex items-center justify-between ${
                      selectedType === t
                        ? 'bg-[#1C2325] text-[#C8DADD] font-semibold'
                        : 'text-[#929DA0] hover:text-[#F4F5F3]'
                    }`}
                  >
                    <span>{t === 'All' ? 'All Tiers' : t}</span>
                    {selectedType === t && <Check className="w-3 h-3 text-[#C8DADD]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Fragrance Family */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#929DA0] font-medium mb-2">
                Olfactory Family
              </label>
              <div className="flex flex-col space-y-1 max-h-48 overflow-y-auto pr-1">
                {['All', ...FRAGRANCE_FAMILIES].map((fam) => (
                  <button
                    key={fam}
                    onClick={() => setSelectedFamily(fam)}
                    className={`text-left text-xs py-1 px-2 rounded transition-colors truncate flex items-center justify-between ${
                      selectedFamily === fam
                        ? 'bg-[#1C2325] text-[#C8DADD] font-semibold'
                        : 'text-[#929DA0] hover:text-[#F4F5F3]'
                    }`}
                  >
                    <span className="truncate">{fam === 'All' ? 'All Families' : fam}</span>
                    {selectedFamily === fam && <Check className="w-3 h-3 text-[#C8DADD] shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#929DA0] font-medium mb-2">
                Brand House
              </label>
              <div className="flex flex-col space-y-1 max-h-48 overflow-y-auto pr-1">
                {['All', ...BRANDS].map((b) => (
                  <button
                    key={b}
                    onClick={() => setSelectedBrand(b)}
                    className={`text-left text-xs py-1 px-2 rounded transition-colors truncate flex items-center justify-between ${
                      selectedBrand === b
                        ? 'bg-[#1C2325] text-[#C8DADD] font-semibold'
                        : 'text-[#929DA0] hover:text-[#F4F5F3]'
                    }`}
                  >
                    <span className="truncate">{b === 'All' ? 'All Brands' : b}</span>
                    {selectedBrand === b && <Check className="w-3 h-3 text-[#C8DADD] shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Top Toolbar (Desktop): Count & Sort */}
            <div className="hidden lg:flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs uppercase tracking-wider text-[#929DA0]">
                Showing <strong className="text-[#F4F5F3] font-semibold">{filteredProducts.length}</strong> Authentic Fragrances
              </span>

              <div className="flex items-center gap-3 text-xs">
                <span className="text-[#929DA0]">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="py-1.5 px-3 rounded bg-[#101416] border border-white/10 text-xs text-[#F4F5F3] focus:outline-none focus:border-[#8FAFBA]"
                >
                  <option value="featured">Featured Curations</option>
                  <option value="bestseller">Best Sellers</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-24 text-center space-y-4 rounded-lg bg-[#101416] border border-white/5 p-8">
                <p className="text-lg font-serif text-[#F4F5F3]">No matching authentic fragrances found.</p>
                <p className="text-xs text-[#929DA0] max-w-sm mx-auto">
                  Try clearing your filters or search terms to browse our entire portfolio of French and Arabian decants.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-2 px-5 py-2.5 rounded bg-[#C8DADD] text-[#090B0C] text-xs font-semibold uppercase tracking-wider hover:bg-white"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

          </main>

        </div>

      </div>

      {/* Mobile Filters Bottom Sheet */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#101416] border-l border-white/10 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#F4F5F3]">
                  Filters ({activeFilterCount})
                </span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-[#929DA0] hover:text-[#F4F5F3]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#8FAFBA] font-medium mb-2">
                  Gender
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['All', 'Men', 'Women', 'Unisex'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGender(g)}
                      className={`py-2 px-2 text-xs rounded border transition-colors ${
                        selectedGender === g
                          ? 'bg-[#C8DADD] text-[#090B0C] font-semibold border-[#C8DADD]'
                          : 'bg-[#161B1D] text-[#929DA0] border-white/5'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tier */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#8FAFBA] font-medium mb-2">
                  Fragrance Tier
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['All', 'Designer', 'Niche', 'Arabian'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedType(t)}
                      className={`py-2 px-2 text-xs rounded border transition-colors ${
                        selectedType === t
                          ? 'bg-[#C8DADD] text-[#090B0C] font-semibold border-[#C8DADD]'
                          : 'bg-[#161B1D] text-[#929DA0] border-white/5'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Format */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#8FAFBA] font-medium mb-2">
                  Format
                </label>
                <div className="flex gap-2">
                  {['All', 'Decant', 'Full Bottle'].map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setSelectedFormat(fmt)}
                      className={`flex-1 py-2 text-xs rounded border transition-colors ${
                        selectedFormat === fmt
                          ? 'bg-[#C8DADD] text-[#090B0C] font-semibold border-[#C8DADD]'
                          : 'bg-[#161B1D] text-[#929DA0] border-white/5'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-2">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 rounded bg-[#C8DADD] text-[#090B0C] text-xs font-semibold uppercase tracking-wider hover:bg-white"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
              <button
                type="button"
                onClick={() => {
                  resetFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-full py-2 text-center text-xs text-[#929DA0] hover:text-[#F4F5F3]"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

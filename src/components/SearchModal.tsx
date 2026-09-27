import React, { useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { FRAGRANCES } from '../data/fragrances';

export function SearchModal() {
  const {
    isSearchOpen,
    closeSearch,
    searchQuery,
    setSearchQuery,
    recentSearches,
    addRecentSearch,
    navigateTo,
    formatPrice
  } = useShop();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  const filteredProducts = searchQuery.trim()
    ? FRAGRANCES.filter((item) => {
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          item.family.toLowerCase().includes(q) ||
          item.gender.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q) ||
          item.mainAccords.some((accord) => accord.toLowerCase().includes(q)) ||
          item.notes.top.some((note) => note.toLowerCase().includes(q)) ||
          item.notes.heart.some((note) => note.toLowerCase().includes(q)) ||
          item.notes.base.some((note) => note.toLowerCase().includes(q))
        );
      })
    : [];

  const handleSelectProduct = (slug: string) => {
    addRecentSearch(searchQuery);
    closeSearch();
    navigateTo('product', { slug });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addRecentSearch(searchQuery);
      closeSearch();
      navigateTo('shop', { q: searchQuery });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={closeSearch}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#101416] border border-white/10 rounded-lg shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="p-4 sm:p-5 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#8FAFBA] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by perfume name, brand, notes (e.g. Vanilla, Oud)..."
            className="w-full bg-transparent text-[#F4F5F3] placeholder-[#929DA0]/60 text-base focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="p-1 text-[#929DA0] hover:text-[#F4F5F3]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={closeSearch}
            className="ml-2 text-xs uppercase tracking-wider text-[#929DA0] hover:text-[#F4F5F3]"
          >
            Esc
          </button>
        </form>

        {/* Content Area */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Active Results */}
          {searchQuery.trim() ? (
            <div>
              <div className="flex items-center justify-between mb-3 text-xs tracking-wider uppercase text-[#929DA0]">
                <span>Results ({filteredProducts.length})</span>
                {filteredProducts.length > 0 && (
                  <button
                    onClick={handleSearchSubmit}
                    className="text-[#C8DADD] hover:underline flex items-center gap-1"
                  >
                    <span>View all in Shop</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>

              {filteredProducts.length === 0 ? (
                <div className="py-12 text-center text-[#929DA0]">
                  <p className="text-sm">No authentic fragrances found for "{searchQuery}".</p>
                  <p className="text-xs mt-1 text-[#929DA0]/70">
                    Try searching for brands like Dior, Xerjoff, or notes like Vanilla or Honey.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredProducts.slice(0, 6).map((product) => {
                    const minPrice = Math.min(...product.variants.map((v) => v.price));
                    return (
                      <div
                        key={product.id}
                        onClick={() => handleSelectProduct(product.slug)}
                        className="flex items-center justify-between p-3 rounded bg-[#161B1D] border border-white/5 hover:border-[#8FAFBA]/40 cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-14 rounded bg-[#1C2325] overflow-hidden shrink-0 flex items-center justify-center p-1">
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover rounded"
                              loading="lazy"
                            />
                          </div>
                          <div>
                            <p className="text-[11px] uppercase tracking-wider text-[#8FAFBA] font-medium">
                              {product.brand} · {product.concentration}
                            </p>
                            <h4 className="text-sm font-medium text-[#F4F5F3] group-hover:text-[#C8DADD] transition-colors">
                              {product.name}
                            </h4>
                            <p className="text-xs text-[#929DA0] mt-0.5">
                              {product.mainAccords.slice(0, 3).join(' · ')}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <p className="text-xs text-[#929DA0]">From</p>
                          <p className="text-sm font-semibold tabular-nums text-[#F4F5F3]">
                            {formatPrice(minPrice)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* Default: Recent Searches & Curated Suggestions */
            <div className="space-y-6">
              {recentSearches.length > 0 && (
                <div>
                  <h4 className="text-[11px] uppercase tracking-[0.16em] text-[#929DA0] font-medium mb-3">
                    Recent Searches
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSearchQuery(item)}
                        className="px-3 py-1.5 rounded text-xs text-[#F4F5F3] bg-[#161B1D] border border-white/10 hover:border-[#8FAFBA]/40 transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-[11px] uppercase tracking-[0.16em] text-[#929DA0] font-medium mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C8A98A]" />
                  <span>Popular Discovery Queries</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Extrait de Parfum',
                    'Arabian Gourmand',
                    'Oud & Amber',
                    'Fresh Office Scent',
                    'Date Night',
                    'Summer Signature',
                    'Tom Ford',
                    'Maison Francis Kurkdjian'
                  ].map((tag, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSearchQuery(tag)}
                      className="px-3 py-1.5 rounded text-xs text-[#929DA0] hover:text-[#F4F5F3] bg-[#161B1D] border border-white/5 hover:border-white/20 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

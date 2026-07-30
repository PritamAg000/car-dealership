import React, { useState, useEffect } from 'react';
import { Search, Filter, RotateCcw, DollarSign } from 'lucide-react';
import { SearchFilters } from '../types';

interface SearchFilterBarProps {
  onSearch: (filters: SearchFilters) => void;
  categories: string[];
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({ onSearch, categories }) => {
  const [make, setMake] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  // Debounced search trigger on text/filter change
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch({
        make: make.trim() || undefined,
        category: category || undefined,
        min_price: minPrice ? parseFloat(minPrice) : undefined,
        max_price: maxPrice ? parseFloat(maxPrice) : undefined,
      });
    }, 350);

    return () => clearTimeout(handler);
  }, [make, category, minPrice, maxPrice]);

  const handleReset = () => {
    setMake('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    onSearch({});
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border border-luxury-border/50 mb-8 shadow-xl">
      <div className="flex items-center gap-2 mb-4 text-luxury-accent font-semibold text-sm uppercase tracking-wider">
        <Filter className="w-4 h-4" />
        <span>Filter Inventory</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Make / Model Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-luxury-muted" />
          <input
            type="text"
            placeholder="Search make or model..."
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-luxury-dark/80 border border-luxury-border/60 text-white placeholder-luxury-muted focus:outline-none focus:border-luxury-accent text-sm transition-colors"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-luxury-dark/80 border border-luxury-border/60 text-white focus:outline-none focus:border-luxury-accent text-sm transition-colors cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Min Price */}
        <div className="relative">
          <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-luxury-muted" />
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            min="0"
            className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-luxury-dark/80 border border-luxury-border/60 text-white placeholder-luxury-muted focus:outline-none focus:border-luxury-accent text-sm transition-colors"
          />
        </div>

        {/* Max Price & Reset */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-luxury-muted" />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              min="0"
              className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-luxury-dark/80 border border-luxury-border/60 text-white placeholder-luxury-muted focus:outline-none focus:border-luxury-accent text-sm transition-colors"
            />
          </div>

          <button
            onClick={handleReset}
            className="px-3.5 py-2.5 rounded-xl bg-luxury-dark/60 hover:bg-slate-700/50 text-luxury-muted hover:text-white border border-luxury-border/40 text-sm font-medium transition-colors flex items-center justify-center gap-1.5"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};

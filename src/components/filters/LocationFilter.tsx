'use client';

import { useState, useMemo } from 'react';
import type { FilterOption } from '@/types/filters';

interface LocationFilterProps {
  options: FilterOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function LocationFilter({ options, selected, onChange }: LocationFilterProps) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return options;
    return options.filter(o => o.name.toLowerCase().includes(q));
  }, [options, search]);

  const toggle = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter(v => v !== value)
        : [...selected, value]
    );
  };

  const clearAll = () => onChange([]);

  return (
    <div className="space-y-2">
      {/* Search */}
      <div className="relative">
        <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none"
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="search"
          placeholder="Search locations..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      </div>

      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selected.map(val => {
            const opt = options.find(o => o.value === val);
            if (!opt) return null;
            return (
              <button
                key={val}
                onClick={() => toggle(val)}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium hover:bg-blue-200"
              >
                {opt.name}
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            );
          })}
          <button onClick={clearAll} className="text-xs text-gray-500 hover:text-gray-700 underline">
            Clear all
          </button>
        </div>
      )}

      {/* Scrollable list */}
      <div className="max-h-52 overflow-y-auto space-y-1 pr-1">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-400 py-2 text-center">No locations match</p>
        ) : (
          filtered.map(opt => (
            <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
              <input
                type="checkbox"
                checked={selected.includes(opt.value)}
                onChange={() => toggle(opt.value)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer flex-shrink-0"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 truncate">{opt.name}</span>
            </label>
          ))
        )}
      </div>
    </div>
  );
}

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
    return q ? options.filter(o => o.name.toLowerCase().includes(q)) : options;
  }, [options, search]);

  const toggle = (value: string) => {
    onChange(selected.includes(value) ? selected.filter(v => v !== value) : [...selected, value]);
  };

  return (
    <div className="space-y-2.5">
      {/* Search */}
      <div className="relative">
        <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500 pointer-events-none"
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="search"
          placeholder="Filter locations…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-8 pr-2 py-1.5 text-sm bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
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
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-900/60 text-indigo-300 border border-indigo-700/50 rounded-full text-xs font-medium hover:bg-indigo-800/60 transition-colors"
              >
                {opt.name}
                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            );
          })}
          <button onClick={() => onChange([])} className="text-xs text-slate-500 hover:text-slate-400 underline ml-0.5">
            Clear
          </button>
        </div>
      )}

      {/* List */}
      <div className="max-h-48 overflow-y-auto space-y-0.5 sidebar-scroll">
        {filtered.length === 0 ? (
          <p className="text-xs text-slate-500 py-3 text-center">No locations match</p>
        ) : (
          filtered.map(opt => {
            const active = selected.includes(opt.value);
            return (
              <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group py-1 px-1 rounded-lg hover:bg-slate-800/50">
                <div className={`w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0 transition-colors border ${
                  active ? 'bg-indigo-500 border-indigo-500' : 'bg-transparent border-slate-600 group-hover:border-slate-500'
                }`}>
                  {active && (
                    <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <input type="checkbox" checked={active} onChange={() => toggle(opt.value)} className="sr-only" />
                <span className={`text-xs truncate transition-colors ${active ? 'text-slate-100' : 'text-slate-400 group-hover:text-slate-300'}`}>
                  {opt.name}
                </span>
              </label>
            );
          })
        )}
      </div>
    </div>
  );
}

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
      <div className="relative">
        <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[#336b8a] pointer-events-none"
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="search"
          placeholder="Filter locations…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-8 pr-2 py-1.5 text-sm bg-[#002237] border border-[#00334f] rounded-lg text-slate-200 placeholder:text-[#336b8a] focus:outline-none focus:ring-1 focus:ring-[#005596] focus:border-[#005596]"
        />
      </div>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selected.map(val => {
            const opt = options.find(o => o.value === val);
            if (!opt) return null;
            return (
              <button
                key={val}
                onClick={() => toggle(val)}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#003d6b]/50 text-[#7ab8d9] border border-[#005596]/40 rounded-full text-xs font-medium hover:bg-[#005596]/30 transition-colors"
              >
                {opt.name}
                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            );
          })}
          <button onClick={() => onChange([])} className="text-xs text-[#ffc425] hover:text-yellow-300 underline ml-0.5 font-medium">
            Clear
          </button>
        </div>
      )}

      <div className="max-h-48 overflow-y-auto space-y-0.5 sidebar-scroll">
        {filtered.length === 0 ? (
          <p className="text-xs text-[#336b8a] py-3 text-center">No locations match</p>
        ) : (
          filtered.map(opt => {
            const active = selected.includes(opt.value);
            return (
              <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group py-1 px-1 rounded-lg hover:bg-[#002237]">
                <div className={`w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0 transition-colors border ${
                  active ? 'bg-[#005596] border-[#005596]' : 'bg-transparent border-[#00334f] group-hover:border-[#4d8ab5]'
                }`}>
                  {active && (
                    <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <input type="checkbox" checked={active} onChange={() => toggle(opt.value)} className="sr-only" />
                <span className={`text-xs truncate transition-colors ${active ? 'text-white' : 'text-[#4d8ab5] group-hover:text-slate-300'}`}>
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

'use client';

import type { FilterOption } from '@/types/filters';

interface ServiceFilterProps {
  options: FilterOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function ServiceFilter({ options, selected, onChange }: ServiceFilterProps) {
  const toggle = (value: string) => {
    onChange(selected.includes(value) ? selected.filter(v => v !== value) : [...selected, value]);
  };

  return (
    <div className="space-y-1.5">
      {options.map(opt => {
        const active = selected.includes(opt.value);
        return (
          <label key={opt.value} className="flex items-center gap-3 cursor-pointer group py-1">
            <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-colors border ${
              active
                ? 'bg-[#005596] border-[#005596]'
                : 'bg-[#002237] border-[#00334f] group-hover:border-[#4d8ab5]'
            }`}>
              {active && (
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <input type="checkbox" checked={active} onChange={() => toggle(opt.value)} className="sr-only" />
            <span className={`text-sm transition-colors ${active ? 'text-white' : 'text-[#4d8ab5] group-hover:text-slate-300'}`}>
              {opt.name}
            </span>
          </label>
        );
      })}
    </div>
  );
}

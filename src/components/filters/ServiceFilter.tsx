'use client';

import type { FilterOption } from '@/types/filters';

interface ServiceFilterProps {
  options: FilterOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function ServiceFilter({ options, selected, onChange }: ServiceFilterProps) {
  const toggle = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter(v => v !== value)
        : [...selected, value]
    );
  };

  return (
    <div className="space-y-2">
      {options.map(opt => (
        <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={selected.includes(opt.value)}
            onChange={() => toggle(opt.value)}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
          <span className="text-sm text-gray-700 group-hover:text-gray-900">{opt.name}</span>
        </label>
      ))}
    </div>
  );
}

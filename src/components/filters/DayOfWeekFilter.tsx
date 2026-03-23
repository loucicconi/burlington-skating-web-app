'use client';

import type { FilterOption } from '@/types/filters';

const DAY_ABBREVS: Record<string, string> = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
  Sunday: 'Sun',
};

const DAY_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface DayOfWeekFilterProps {
  options: FilterOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function DayOfWeekFilter({ options, selected, onChange }: DayOfWeekFilterProps) {
  const sorted = [...options].sort(
    (a, b) => DAY_ORDER.indexOf(a.name) - DAY_ORDER.indexOf(b.name)
  );

  const toggle = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter(v => v !== value)
        : [...selected, value]
    );
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {sorted.map(opt => {
        const active = selected.includes(opt.value);
        return (
          <button
            key={opt.value}
            onClick={() => toggle(opt.value)}
            aria-pressed={active}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              active
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {DAY_ABBREVS[opt.name] ?? opt.name}
          </button>
        );
      })}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

interface KeywordFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function KeywordFilter({ value, onChange }: KeywordFilterProps) {
  const [local, setLocal] = useState(value);

  // Sync if external reset
  useEffect(() => { setLocal(value); }, [value]);

  // Debounce 400ms
  useEffect(() => {
    const timer = setTimeout(() => {
      if (local !== value) onChange(local);
    }, 400);
    return () => clearTimeout(timer);
  }, [local, value, onChange]);

  return (
    <div className="relative">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
        fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="search"
        placeholder="Search programs..."
        value={local}
        onChange={e => setLocal(e.target.value)}
        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      />
    </div>
  );
}

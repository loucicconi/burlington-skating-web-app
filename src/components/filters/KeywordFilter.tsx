'use client';

import { useEffect, useState } from 'react';

interface KeywordFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function KeywordFilter({ value, onChange }: KeywordFilterProps) {
  const [local, setLocal] = useState(value);

  useEffect(() => { setLocal(value); }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (local !== value) onChange(local);
    }, 400);
    return () => clearTimeout(timer);
  }, [local, value, onChange]);

  return (
    <div className="relative">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#336b8a] pointer-events-none"
        fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="search"
        placeholder="Search programs…"
        value={local}
        onChange={e => setLocal(e.target.value)}
        className="w-full pl-9 pr-3 py-2 text-sm bg-[#002237] border border-[#00334f] rounded-xl text-slate-200 placeholder:text-[#336b8a] focus:outline-none focus:ring-1 focus:ring-[#005596] focus:border-[#005596] transition-colors"
      />
    </div>
  );
}

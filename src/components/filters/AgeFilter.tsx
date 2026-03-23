'use client';

import { useEffect, useState } from 'react';
import * as Slider from '@radix-ui/react-slider';

interface AgeFilterProps {
  ageMin: number;
  ageMax: number;
  onChangeMin: (v: number) => void;
  onChangeMax: (v: number) => void;
}

export function AgeFilter({ ageMin, ageMax, onChangeMin, onChangeMax }: AgeFilterProps) {
  const [local, setLocal] = useState([ageMin, ageMax]);

  useEffect(() => { setLocal([ageMin, ageMax]); }, [ageMin, ageMax]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (local[0] !== ageMin) onChangeMin(local[0]);
      if (local[1] !== ageMax) onChangeMax(local[1]);
    }, 300);
    return () => clearTimeout(timer);
  }, [local, ageMin, ageMax, onChangeMin, onChangeMax]);

  const minLabel = local[0] === 0 ? 'Any' : `${local[0]}`;
  const maxLabel = local[1] >= 120 ? 'Any' : `${local[1]}`;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-500">Min</span>
        <span className="text-xs font-semibold text-slate-200 bg-slate-800 px-2.5 py-1 rounded-lg">
          {minLabel === maxLabel && minLabel === 'Any' ? 'All ages' : `${minLabel} – ${maxLabel}`}
        </span>
        <span className="text-xs text-slate-500">Max</span>
      </div>
      <Slider.Root
        className="relative flex items-center w-full h-5"
        min={0} max={120} step={1} minStepsBetweenThumbs={1}
        value={local}
        onValueChange={setLocal}
      >
        <Slider.Track className="relative h-1 flex-1 bg-slate-700 rounded-full">
          <Slider.Range className="absolute h-full bg-indigo-500 rounded-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-4 h-4 bg-white border-2 border-indigo-500 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 focus:ring-offset-slate-900"
          aria-label="Minimum age"
        />
        <Slider.Thumb
          className="block w-4 h-4 bg-white border-2 border-indigo-500 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 focus:ring-offset-slate-900"
          aria-label="Maximum age"
        />
      </Slider.Root>
    </div>
  );
}

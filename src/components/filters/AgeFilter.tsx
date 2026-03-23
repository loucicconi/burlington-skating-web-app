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

  // Debounce 300ms before committing to URL
  useEffect(() => {
    const timer = setTimeout(() => {
      if (local[0] !== ageMin) onChangeMin(local[0]);
      if (local[1] !== ageMax) onChangeMax(local[1]);
    }, 300);
    return () => clearTimeout(timer);
  }, [local, ageMin, ageMax, onChangeMin, onChangeMax]);

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm text-gray-600">
        <span>{local[0] === 0 ? 'Any' : `${local[0]} yrs`}</span>
        <span>{local[1] >= 120 ? 'Any' : `${local[1]} yrs`}</span>
      </div>
      <Slider.Root
        className="relative flex items-center w-full h-5"
        min={0}
        max={120}
        step={1}
        minStepsBetweenThumbs={1}
        value={local}
        onValueChange={setLocal}
      >
        <Slider.Track className="relative h-1.5 flex-1 bg-gray-200 rounded-full">
          <Slider.Range className="absolute h-full bg-blue-500 rounded-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-white border-2 border-blue-500 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Minimum age"
        />
        <Slider.Thumb
          className="block w-5 h-5 bg-white border-2 border-blue-500 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Maximum age"
        />
      </Slider.Root>
    </div>
  );
}

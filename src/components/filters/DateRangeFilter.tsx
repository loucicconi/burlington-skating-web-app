'use client';

interface DateRangeFilterProps {
  dateStart: string;
  dateEnd: string;
  onChangeStart: (d: string) => void;
  onChangeEnd: (d: string) => void;
}

export function DateRangeFilter({ dateStart, dateEnd, onChangeStart, onChangeEnd }: DateRangeFilterProps) {
  const handleStart = (d: string) => {
    onChangeStart(d);
    // Ensure end is not before start
    if (dateEnd && d > dateEnd) onChangeEnd(d);
  };

  const handleEnd = (d: string) => {
    onChangeEnd(d);
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <label className="block text-xs text-gray-500 mb-1">From</label>
        <input
          type="date"
          value={dateStart}
          onChange={e => handleStart(e.target.value)}
          className="w-full text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">To</label>
        <input
          type="date"
          value={dateEnd}
          min={dateStart}
          onChange={e => handleEnd(e.target.value)}
          className="w-full text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      </div>
    </div>
  );
}

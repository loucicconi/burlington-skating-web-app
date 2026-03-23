'use client';

interface DateRangeFilterProps {
  dateStart: string;
  dateEnd: string;
  onChangeStart: (d: string) => void;
  onChangeEnd: (d: string) => void;
}

const inputClass = "w-full text-sm bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors [color-scheme:dark]";

export function DateRangeFilter({ dateStart, dateEnd, onChangeStart, onChangeEnd }: DateRangeFilterProps) {
  const handleStart = (d: string) => {
    onChangeStart(d);
    if (dateEnd && d > dateEnd) onChangeEnd(d);
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <label className="block text-[10px] font-medium text-slate-500 uppercase tracking-wide mb-1.5">From</label>
        <input type="date" value={dateStart} onChange={e => handleStart(e.target.value)} className={inputClass} />
      </div>
      <div>
        <label className="block text-[10px] font-medium text-slate-500 uppercase tracking-wide mb-1.5">To</label>
        <input type="date" value={dateEnd} min={dateStart} onChange={e => onChangeEnd(e.target.value)} className={inputClass} />
      </div>
    </div>
  );
}

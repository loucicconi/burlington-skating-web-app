'use client';

interface DateRangeFilterProps {
  dateStart: string;
  dateEnd: string;
  onChangeStart: (d: string) => void;
  onChangeEnd: (d: string) => void;
}

const inputClass = "w-full text-sm bg-[#002237] border border-[#00334f] rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#005596] focus:border-[#005596] transition-colors [color-scheme:dark]";
const labelClass = "block text-[10px] font-bold text-[#336b8a] uppercase tracking-wide mb-1.5";

export function DateRangeFilter({ dateStart, dateEnd, onChangeStart, onChangeEnd }: DateRangeFilterProps) {
  const handleStart = (d: string) => {
    onChangeStart(d);
    if (dateEnd && d > dateEnd) onChangeEnd(d);
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <label className={labelClass}>From</label>
        <input type="date" value={dateStart} onChange={e => handleStart(e.target.value)} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>To</label>
        <input type="date" value={dateEnd} min={dateStart} onChange={e => onChangeEnd(e.target.value)} className={inputClass} />
      </div>
    </div>
  );
}

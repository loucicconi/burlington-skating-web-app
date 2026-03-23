'use client';

import type { NormalizedClass } from '@/types/class';
import { SpotsBadge } from '@/components/ui/Badge';

interface ClassCardProps {
  item: NormalizedClass;
  onClick?: (item: NormalizedClass) => void;
}

export function ClassCard({ item, onClick }: ClassCardProps) {
  const accentColor = item.isFull ? 'bg-red-400' : item.isFree ? 'bg-[#00a94f]' : 'bg-[#005596]';

  return (
    <div
      onClick={() => onClick?.(item)}
      className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden"
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${accentColor}`} />

      <div className="pl-5 pr-4 pt-4 pb-4 flex flex-col gap-3">
        <div>
          <h3 className="font-semibold text-slate-900 leading-snug text-[15px] group-hover:text-[#005596] transition-colors line-clamp-2">
            {item.eventName}
          </h3>
        </div>

        <div className="space-y-1.5">
          {item.facility && (
            <div className="flex items-center gap-1.5 text-slate-500 text-xs">
              <svg className="w-3 h-3 flex-shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate">{item.facility}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-slate-500 text-xs">
            <svg className="w-3 h-3 flex-shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{item.formattedStartDate}</span>
            <span className="text-slate-300">·</span>
            <span>{item.formattedStartTime} – {item.formattedEndTime}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-slate-50">
          <SpotsBadge spotsText={item.spotsLeft} isFull={item.isFull} />
          <span className={`text-sm font-semibold tabular-nums ${item.isFree ? 'text-[#00a94f]' : 'text-slate-700'}`}>
            {item.isFree ? 'Free' : item.priceRange}
          </span>
        </div>
      </div>
    </div>
  );
}

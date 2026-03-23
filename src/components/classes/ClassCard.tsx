'use client';

import type { NormalizedClass } from '@/types/class';
import { Badge, SpotsBadge } from '@/components/ui/Badge';

interface ClassCardProps {
  item: NormalizedClass;
  onClick?: (item: NormalizedClass) => void;
}

export function ClassCard({ item, onClick }: ClassCardProps) {
  return (
    <div
      className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-2 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick?.(item)}
    >
      {/* Top row: spots + price */}
      <div className="flex items-start justify-between gap-2">
        <SpotsBadge spotsText={item.spotsLeft} isFull={item.isFull} />
        <span className={`text-sm font-semibold ${item.isFree ? 'text-green-600' : 'text-gray-700'}`}>
          {item.isFree ? 'FREE' : item.priceRange}
        </span>
      </div>

      {/* Event name */}
      <h3 className="font-semibold text-gray-900 leading-snug">{item.eventName}</h3>

      {/* Facility + date */}
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-500">
        {item.facility && (
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            {item.facility}
          </span>
        )}
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {item.formattedStartDate}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {item.formattedStartTime} – {item.formattedEndTime}
        </span>
      </div>

      {/* Tags row */}
      <div className="flex flex-wrap gap-1.5 mt-1">
        {!item.noAgeRestriction && item.ageRestrictions && (
          <Badge variant="gray">{item.ageRestrictions}</Badge>
        )}
        {item.genderRestrictions && item.genderRestrictions !== 'Co-ed' && (
          <Badge variant="blue">{item.genderRestrictions}</Badge>
        )}
        {item.numberOfSessions > 1 && (
          <Badge variant="gray">{item.numberOfSessions} sessions</Badge>
        )}
      </div>
    </div>
  );
}

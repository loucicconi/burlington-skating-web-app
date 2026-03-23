'use client';

import { useEffect } from 'react';
import type { NormalizedClass } from '@/types/class';
import { SpotsBadge } from '@/components/ui/Badge';

interface ClassDetailModalProps {
  item: NormalizedClass | null;
  onClose: () => void;
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-slate-50 last:border-0">
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide pt-0.5 flex-shrink-0">{label}</span>
      <span className="text-sm font-medium text-slate-800 text-right">{value}</span>
    </div>
  );
}

export function ClassDetailModal({ item, onClose }: ClassDetailModalProps) {
  useEffect(() => {
    if (!item) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [item, onClose]);

  if (!item) return null;

  const bandColor = item.isFull ? 'bg-red-400' : item.isFree ? 'bg-[#00a94f]' : 'bg-[#005596]';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-[#001829]/70 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">

        {/* Brand colour band */}
        <div className={`h-1.5 w-full rounded-t-3xl ${bandColor}`} />

        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-5 pb-4">
          <div className="flex-1 pr-4">
            <h2 className="font-bold text-lg text-slate-900 leading-snug">{item.eventName}</h2>
            {item.facility && (
              <p className="text-sm text-slate-500 mt-0.5 flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-[#005596]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {item.facility}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Chips */}
        <div className="px-6 pb-4 flex items-center gap-2">
          <SpotsBadge spotsText={item.spotsLeft} isFull={item.isFull} />
          <span className={`text-sm font-bold ${item.isFree ? 'text-[#00a94f]' : 'text-slate-700'}`}>
            {item.isFree ? 'Free' : item.priceRange}
          </span>
        </div>

        {/* Details */}
        <div className="px-6 flex-1 overflow-y-auto">
          <DetailRow label="Date" value={item.formattedStartDate} />
          <DetailRow label="Time" value={`${item.formattedStartTime} – ${item.formattedEndTime}`} />
          <DetailRow label="Duration" value={`${item.durationMinutes} min`} />
          {!item.noAgeRestriction && <DetailRow label="Age" value={item.ageRestrictions} />}
          {item.genderRestrictions && <DetailRow label="Gender" value={item.genderRestrictions} />}
          {item.numberOfSessions > 1 && <DetailRow label="Sessions" value={item.numberOfSessions} />}
          <DetailRow label="Course" value={<span className="font-mono text-xs text-slate-500">{item.courseId}</span>} />

          {item.details && (
            <div className="mt-4 mb-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">About</p>
              <p className="text-sm text-slate-600 leading-relaxed">{item.details}</p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="px-6 py-5 pt-4">
          <a
            href="https://cityofburlington.perfectmind.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#005596] hover:bg-[#003d6b] active:bg-[#002a4a] text-white font-semibold py-3 rounded-2xl transition-colors text-sm"
          >
            {item.bookButtonText || 'Register'}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

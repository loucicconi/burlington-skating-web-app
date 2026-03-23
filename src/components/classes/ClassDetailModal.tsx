'use client';

import { useEffect } from 'react';
import type { NormalizedClass } from '@/types/class';
import { Badge, SpotsBadge } from '@/components/ui/Badge';

interface ClassDetailModalProps {
  item: NormalizedClass | null;
  onClose: () => void;
}

export function ClassDetailModal({ item, onClose }: ClassDetailModalProps) {
  useEffect(() => {
    if (!item) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-gray-100">
          <h2 className="font-bold text-lg text-gray-900 pr-4">{item.eventName}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Spots + price */}
          <div className="flex items-center gap-3">
            <SpotsBadge spotsText={item.spotsLeft} isFull={item.isFull} />
            <span className={`font-semibold ${item.isFree ? 'text-green-600' : 'text-gray-800'}`}>
              {item.isFree ? 'FREE' : item.priceRange}
            </span>
          </div>

          {/* Details grid */}
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            <div>
              <dt className="text-gray-500">Location</dt>
              <dd className="font-medium text-gray-900">{item.facility || '—'}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Date</dt>
              <dd className="font-medium text-gray-900">{item.formattedStartDate}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Time</dt>
              <dd className="font-medium text-gray-900">{item.formattedStartTime} – {item.formattedEndTime}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Duration</dt>
              <dd className="font-medium text-gray-900">{item.durationMinutes} min</dd>
            </div>
            {!item.noAgeRestriction && (
              <div>
                <dt className="text-gray-500">Age</dt>
                <dd className="font-medium text-gray-900">{item.ageRestrictions}</dd>
              </div>
            )}
            {item.genderRestrictions && (
              <div>
                <dt className="text-gray-500">Gender</dt>
                <dd className="font-medium text-gray-900">{item.genderRestrictions}</dd>
              </div>
            )}
            {item.numberOfSessions > 1 && (
              <div>
                <dt className="text-gray-500">Sessions</dt>
                <dd className="font-medium text-gray-900">{item.numberOfSessions}</dd>
              </div>
            )}
            <div>
              <dt className="text-gray-500">Course ID</dt>
              <dd className="font-medium text-gray-900 font-mono text-xs">{item.courseId}</dd>
            </div>
          </dl>

          {/* Description */}
          {item.details && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">About</p>
              <p className="text-sm text-gray-700 leading-relaxed">{item.details}</p>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="p-5 pt-0">
          <a
            href="https://cityofburlington.perfectmind.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {item.bookButtonText || 'Register'} →
          </a>
        </div>
      </div>
    </div>
  );
}

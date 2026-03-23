'use client';

import { useEffect, useRef } from 'react';
import type { NormalizedClass } from '@/types/class';
import { ClassCard } from './ClassCard';
import { CardSkeleton } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';

interface ClassListProps {
  classes: NormalizedClass[];
  isLoading: boolean;
  isFetchingMore: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onSelectClass: (item: NormalizedClass) => void;
  resultCount: number;
}

export function ClassList({
  classes, isLoading, isFetchingMore, hasMore, onLoadMore, onSelectClass, resultCount,
}: ClassListProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return;
    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting && !isFetchingMore) onLoadMore(); },
      { rootMargin: '200px' }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, isFetchingMore, onLoadMore]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-5">
        {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    );
  }

  if (classes.length === 0) return <EmptyState />;

  return (
    <div className="p-5">
      <p className="text-xs font-medium text-slate-400 mb-4 uppercase tracking-wide">
        {resultCount.toLocaleString()} program{resultCount !== 1 ? 's' : ''}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {classes.map(item => (
          <ClassCard key={item.id} item={item} onClick={onSelectClass} />
        ))}
      </div>

      <div ref={sentinelRef} className="h-1" />

      {isFetchingMore && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
          {Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      )}

      {!hasMore && classes.length > 0 && (
        <p className="text-center text-xs text-slate-400 mt-10 pb-4 tracking-wide">
          · All programs loaded ·
        </p>
      )}
    </div>
  );
}

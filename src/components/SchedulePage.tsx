'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useFilters } from '@/hooks/useFilters';
import { useFilterGroups } from '@/hooks/useFilterGroups';
import { useClasses } from '@/hooks/useClasses';
import { FilterPanel } from '@/components/filters/FilterPanel';
import { FilterSidebar } from '@/components/layout/FilterSidebar';
import { Header } from '@/components/layout/Header';
import { ClassList } from '@/components/classes/ClassList';
import { ClassCalendar } from '@/components/classes/ClassCalendar';
import { ClassDetailModal } from '@/components/classes/ClassDetailModal';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import type { NormalizedClass } from '@/types/class';

type ViewMode = 'list' | 'calendar';

export function SchedulePage() {
  const [view, setView] = useState<ViewMode>('list');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<NormalizedClass | null>(null);

  const { filters, setFilter, resetFilters, activeFilterCount } = useFilters();
  const { data: filterGroups = [], isLoading: filtersLoading } = useFilterGroups();
  const { classes, isLoading, isFetchingMore, error, fetchNextPage, hasMore } = useClasses(filters, filterGroups);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f7f9fb]">
      <FilterSidebar mobileOpen={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)}>

        {/* Logo on white card */}
        <div className="px-4 py-4 border-b border-[#00243f] flex-shrink-0">
          <div className="bg-white rounded-xl px-4 py-2.5">
            <Image
              src="/logo.svg"
              alt="City of Burlington"
              width={180}
              height={46}
              className="w-full h-auto"
              priority
            />
          </div>
          <p className="text-[#4d8ab5] text-[11px] font-medium mt-2.5 px-1 tracking-wide">
            Recreation Schedule
          </p>
        </div>

        {!filtersLoading && (
          <FilterPanel
            filterGroups={filterGroups}
            filters={filters}
            onChange={setFilter}
            onReset={resetFilters}
            activeFilterCount={activeFilterCount}
          />
        )}
      </FilterSidebar>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          view={view}
          onViewChange={setView}
          resultCount={classes.length}
          onOpenFilters={() => setMobileFiltersOpen(true)}
          activeFilterCount={activeFilterCount}
          isLoading={isLoading}
        />

        {error && <ErrorBanner message={(error as Error).message} />}

        <div className="flex-1 overflow-y-auto">
          {view === 'list' ? (
            <ClassList
              classes={classes}
              isLoading={isLoading}
              isFetchingMore={isFetchingMore}
              hasMore={hasMore}
              onLoadMore={fetchNextPage}
              onSelectClass={setSelectedClass}
              resultCount={classes.length}
            />
          ) : (
            <ClassCalendar
              classes={classes}
              isLoading={isLoading}
              onSelectClass={setSelectedClass}
            />
          )}
        </div>
      </div>

      <ClassDetailModal item={selectedClass} onClose={() => setSelectedClass(null)} />
    </div>
  );
}

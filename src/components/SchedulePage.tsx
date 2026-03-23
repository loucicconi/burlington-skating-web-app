'use client';

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
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <FilterSidebar mobileOpen={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)}>
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

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* App title bar */}
        <div className="bg-blue-700 text-white px-4 py-3 flex items-center gap-3 flex-shrink-0">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M11.121 11.121L5 5m6.121 6.121L5 17m6.121-5.879L17 5" />
          </svg>
          <h1 className="font-bold text-lg tracking-tight">Burlington Recreation</h1>
        </div>

        {/* Sticky header with view toggle */}
        <Header
          view={view}
          onViewChange={setView}
          resultCount={classes.length}
          onOpenFilters={() => setMobileFiltersOpen(true)}
          activeFilterCount={activeFilterCount}
        />

        {/* Error */}
        {error && <ErrorBanner message={(error as Error).message} />}

        {/* Content */}
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

      {/* Detail modal */}
      <ClassDetailModal item={selectedClass} onClose={() => setSelectedClass(null)} />
    </div>
  );
}

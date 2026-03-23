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
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Dark sidebar */}
      <FilterSidebar mobileOpen={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)}>
        {/* Sidebar branding */}
        <div className="px-5 py-5 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                  d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">Burlington</p>
              <p className="text-slate-400 text-xs leading-tight">Recreation</p>
            </div>
          </div>
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

      {/* Main content */}
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

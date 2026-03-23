'use client';

type ViewMode = 'list' | 'calendar';

interface HeaderProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
  resultCount: number;
  onOpenFilters: () => void;
  activeFilterCount: number;
}

export function Header({ view, onViewChange, resultCount, onOpenFilters, activeFilterCount }: HeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
      {/* Mobile filter toggle */}
      <button
        onClick={onOpenFilters}
        className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
        </svg>
        Filters
        {activeFilterCount > 0 && (
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-600 text-white text-xs">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Result count */}
      <span className="text-sm text-gray-500 flex-1 hidden sm:block">
        {resultCount > 0 ? `${resultCount.toLocaleString()} programs` : ''}
      </span>

      {/* View toggle */}
      <div className="flex rounded-lg border border-gray-200 overflow-hidden ml-auto">
        <button
          onClick={() => onViewChange('list')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors ${
            view === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          List
        </button>
        <button
          onClick={() => onViewChange('calendar')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors border-l border-gray-200 ${
            view === 'calendar' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Calendar
        </button>
      </div>
    </div>
  );
}

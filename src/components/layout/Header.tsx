'use client';

type ViewMode = 'list' | 'calendar';

interface HeaderProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
  resultCount: number;
  onOpenFilters: () => void;
  activeFilterCount: number;
  isLoading: boolean;
}

export function Header({ view, onViewChange, resultCount, onOpenFilters, activeFilterCount, isLoading }: HeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-4 sm:px-6 py-3 flex items-center gap-3">
      {/* Mobile filter button */}
      <button
        onClick={onOpenFilters}
        className="lg:hidden relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
        </svg>
        Filters
        {activeFilterCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Result count */}
      <div className="flex-1 hidden sm:flex items-center gap-2">
        {isLoading ? (
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <div className="w-3 h-3 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
            Loading…
          </div>
        ) : resultCount > 0 ? (
          <span className="text-sm text-slate-500">
            <span className="font-semibold text-slate-800">{resultCount.toLocaleString()}</span>
            {' '}program{resultCount !== 1 ? 's' : ''}
          </span>
        ) : null}
      </div>

      {/* View toggle — pill style */}
      <div className="ml-auto flex items-center bg-slate-100 rounded-xl p-1 gap-0.5">
        <button
          onClick={() => onViewChange('list')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            view === 'list'
              ? 'bg-white text-slate-900 shadow-sm shadow-slate-200'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          List
        </button>
        <button
          onClick={() => onViewChange('calendar')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            view === 'calendar'
              ? 'bg-white text-slate-900 shadow-sm shadow-slate-200'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Calendar
        </button>
      </div>
    </div>
  );
}

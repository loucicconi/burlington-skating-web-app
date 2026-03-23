'use client';

import { useState } from 'react';
import type { FilterGroup, FilterState } from '@/types/filters';
import { FK } from '@/lib/utils/filters';
import { KeywordFilter } from './KeywordFilter';
import { DayOfWeekFilter } from './DayOfWeekFilter';
import { AgeFilter } from './AgeFilter';
import { DateRangeFilter } from './DateRangeFilter';
import { ServiceFilter } from './ServiceFilter';
import { LocationFilter } from './LocationFilter';

interface FilterPanelProps {
  filterGroups: FilterGroup[];
  filters: FilterState;
  onChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onReset: () => void;
  activeFilterCount: number;
}

function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-800/60">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between w-full text-left px-5 py-3.5 hover:bg-slate-800/30 transition-colors"
      >
        <span className="text-xs font-semibold text-slate-300 uppercase tracking-widest">{title}</span>
        <svg
          className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 pb-4">{children}</div>}
    </div>
  );
}

export function FilterPanel({ filterGroups, filters, onChange, onReset, activeFilterCount }: FilterPanelProps) {
  const getGroup = (kind: number) => filterGroups.find(g => g.filterGroupKind === kind);

  const locationGroup = getGroup(FK.LOCATION);
  const serviceGroup = getGroup(FK.SERVICE);
  const dayGroup = getGroup(FK.DAY_OF_WEEK);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800/60">
        <span className="text-xs font-semibold text-slate-300 uppercase tracking-widest flex items-center gap-2">
          Filters
          {activeFilterCount > 0 && (
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-indigo-500 text-white text-[10px] font-bold">
              {activeFilterCount}
            </span>
          )}
        </span>
        {activeFilterCount > 0 && (
          <button
            onClick={onReset}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
          >
            Reset all
          </button>
        )}
      </div>

      {/* Scrollable sections */}
      <div className="flex-1 overflow-y-auto sidebar-scroll">
        <Section title="Search">
          <KeywordFilter value={filters.keyword} onChange={v => onChange('keyword', v)} />
        </Section>

        <Section title="Date Range">
          <DateRangeFilter
            dateStart={filters.dateStart}
            dateEnd={filters.dateEnd}
            onChangeStart={v => onChange('dateStart', v)}
            onChangeEnd={v => onChange('dateEnd', v)}
          />
        </Section>

        {dayGroup && (
          <Section title="Day of Week">
            <DayOfWeekFilter
              options={dayGroup.options}
              selected={filters.daysOfWeek}
              onChange={v => onChange('daysOfWeek', v)}
            />
          </Section>
        )}

        {serviceGroup && (
          <Section title="Category">
            <ServiceFilter
              options={serviceGroup.options}
              selected={filters.services}
              onChange={v => onChange('services', v)}
            />
          </Section>
        )}

        <Section title="Age">
          <AgeFilter
            ageMin={filters.ageMin}
            ageMax={filters.ageMax}
            onChangeMin={v => onChange('ageMin', v)}
            onChangeMax={v => onChange('ageMax', v)}
          />
        </Section>

        {locationGroup && (
          <Section title="Location" defaultOpen={false}>
            <LocationFilter
              options={locationGroup.options}
              selected={filters.locations}
              onChange={v => onChange('locations', v)}
            />
          </Section>
        )}
      </div>
    </div>
  );
}

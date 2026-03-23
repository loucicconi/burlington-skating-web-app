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
    <div className="border-b border-gray-100 py-4">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between w-full text-left mb-2"
      >
        <span className="text-sm font-semibold text-gray-800">{title}</span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

export function FilterPanel({ filterGroups, filters, onChange, onReset, activeFilterCount }: FilterPanelProps) {
  const getGroup = (kind: number) => filterGroups.find(g => g.filterGroupKind === kind);

  const locationGroup = getGroup(FK.LOCATION);
  const serviceGroup = getGroup(FK.SERVICE);
  const dayGroup = getGroup(FK.DAY_OF_WEEK);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <h2 className="font-semibold text-gray-900">
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-xs">
              {activeFilterCount}
            </span>
          )}
        </h2>
        {activeFilterCount > 0 && (
          <button
            onClick={onReset}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Reset all
          </button>
        )}
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-4">
        <Section title="Search">
          <KeywordFilter
            value={filters.keyword}
            onChange={v => onChange('keyword', v)}
          />
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

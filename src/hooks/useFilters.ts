'use client';

import { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import type { FilterState } from '@/types/filters';
import { DEFAULT_FILTER_STATE } from '@/types/filters';
import { todayString, defaultEndDate } from '@/lib/utils/date';

function parseArray(val: string | null): string[] {
  if (!val) return [];
  return val.split(',').filter(Boolean);
}

export function useFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters: FilterState = useMemo(() => ({
    locations: parseArray(searchParams.get('locations')),
    services: parseArray(searchParams.get('services')),
    daysOfWeek: parseArray(searchParams.get('days')),
    ageMin: parseInt(searchParams.get('ageMin') ?? '0', 10),
    ageMax: parseInt(searchParams.get('ageMax') ?? '120', 10),
    dateStart: searchParams.get('dateStart') ?? todayString(),
    dateEnd: searchParams.get('dateEnd') ?? defaultEndDate(),
    keyword: searchParams.get('keyword') ?? '',
  }), [searchParams]);

  const setFilter = useCallback(<K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    const keyMap: Record<keyof FilterState, string> = {
      locations: 'locations',
      services: 'services',
      daysOfWeek: 'days',
      ageMin: 'ageMin',
      ageMax: 'ageMax',
      dateStart: 'dateStart',
      dateEnd: 'dateEnd',
      keyword: 'keyword',
    };

    const paramKey = keyMap[key];

    if (Array.isArray(value)) {
      if (value.length === 0) {
        params.delete(paramKey);
      } else {
        params.set(paramKey, (value as string[]).join(','));
      }
    } else if (value === '' || value === null || value === undefined) {
      params.delete(paramKey);
    } else {
      params.set(paramKey, String(value));
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  const resetFilters = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [router, pathname]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.locations.length) count++;
    if (filters.services.length) count++;
    if (filters.daysOfWeek.length) count++;
    if (filters.ageMin > 0 || filters.ageMax < 120) count++;
    if (filters.keyword) count++;
    return count;
  }, [filters]);

  return { filters, setFilter, resetFilters, activeFilterCount, DEFAULT_FILTER_STATE };
}

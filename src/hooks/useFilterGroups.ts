import { useQuery } from '@tanstack/react-query';
import type { FilterGroup } from '@/types/filters';

async function fetchFilterGroups(): Promise<FilterGroup[]> {
  const res = await fetch('/api/filters');
  if (!res.ok) throw new Error('Failed to load filters');
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.filterGroups as FilterGroup[];
}

export function useFilterGroups() {
  return useQuery({
    queryKey: ['filterGroups'],
    queryFn: fetchFilterGroups,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    gcTime: 24 * 60 * 60 * 1000,
  });
}

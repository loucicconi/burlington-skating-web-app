import { useInfiniteQuery } from '@tanstack/react-query';
import type { FilterState } from '@/types/filters';
import type { FilterGroup } from '@/types/filters';
import type { NormalizedClass } from '@/types/class';

interface ClassesPage {
  classes: NormalizedClass[];
  nextKey: string | null;
}

async function fetchClassesPage(
  dateString: string,
  filters: FilterState,
  filterGroups: FilterGroup[],
  page: number,
  after?: string
): Promise<ClassesPage> {
  const res = await fetch('/api/classes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ dateString, filters, filterGroups, page, after }),
  });

  if (!res.ok) throw new Error('Failed to load schedule');
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data as ClassesPage;
}

export function useClasses(filters: FilterState, filterGroups: FilterGroup[]) {
  const query = useInfiniteQuery({
    queryKey: ['classes', filters],
    queryFn: ({ pageParam }) => {
      const { dateString, page, after } = pageParam as {
        dateString: string;
        page: number;
        after?: string;
      };
      return fetchClassesPage(dateString, filters, filterGroups, page, after);
    },
    initialPageParam: { dateString: filters.dateStart, page: 0 },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.nextKey) return undefined;
      if (filters.dateEnd && lastPage.nextKey > filters.dateEnd) return undefined;
      return {
        dateString: lastPage.nextKey,
        page: allPages.length,
        after: lastPage.nextKey,
      };
    },
    enabled: filterGroups.length > 0,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });

  const classes = query.data?.pages.flatMap(p => p.classes) ?? [];

  return {
    classes,
    isLoading: query.isLoading,
    isFetchingMore: query.isFetchingNextPage,
    error: query.error,
    fetchNextPage: query.fetchNextPage,
    hasMore: query.hasNextPage ?? false,
  };
}

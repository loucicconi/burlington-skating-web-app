import { NextRequest, NextResponse } from 'next/server';
import { fetchClasses } from '@/lib/perfectmind/client';
import { getCached, setCached } from '@/lib/firebase/cache';
import { normalizeClass } from '@/lib/perfectmind/transforms';
import { filterStateToValues, buildCacheKey } from '@/lib/utils/filters';
import { todayString } from '@/lib/utils/date';
import type { FilterState } from '@/types/filters';
import type { FilterGroup } from '@/types/filters';
import type { NormalizedClass } from '@/types/class';

const TTL_SECONDS = 30 * 60; // 30 minutes

interface ClassesRequest {
  dateString?: string;
  filters: FilterState;
  filterGroups: FilterGroup[];
  page?: number;
  after?: string;
}

interface ClassesResponse {
  classes: NormalizedClass[];
  nextKey: string | null;
}

export async function POST(request: NextRequest) {
  try {
    const body: ClassesRequest = await request.json();
    const {
      dateString = todayString(),
      filters,
      filterGroups,
      page = 0,
      after,
    } = body;

    const cacheKey = `classes__${buildCacheKey(dateString, filters)}__p${page}`;

    // Check Firestore cache
    const cached = await getCached<ClassesResponse>(cacheKey, TTL_SECONDS);
    if (cached) {
      return NextResponse.json(cached);
    }

    // Build filter values array from state
    const filterValues = filterStateToValues(filters, filterGroups);

    // Fetch from PerfectMind
    const raw = await fetchClasses(dateString, filterValues, page, after);
    const classes = raw.classes.map(normalizeClass);

    const result: ClassesResponse = {
      classes,
      nextKey: raw.nextKey,
    };

    // Cache (non-blocking)
    setCached(cacheKey, result);

    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

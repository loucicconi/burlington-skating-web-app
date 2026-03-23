import { NextResponse } from 'next/server';
import { fetchFilterGroups } from '@/lib/perfectmind/client';
import { getCached, setCached } from '@/lib/firebase/cache';
import { normalizeFilterGroup } from '@/lib/perfectmind/transforms';
import type { FilterGroup } from '@/types/filters';

const CACHE_KEY = 'filters_v1';
const TTL_SECONDS = 24 * 60 * 60; // 24 hours

export async function GET() {
  try {
    // Check Firestore cache
    const cached = await getCached<FilterGroup[]>(CACHE_KEY, TTL_SECONDS);
    if (cached) {
      return NextResponse.json({ filterGroups: cached });
    }

    // Fetch from PerfectMind
    const raw = await fetchFilterGroups();
    const filterGroups = raw.filterGroups.map(normalizeFilterGroup);

    // Store in cache (non-blocking)
    setCached(CACHE_KEY, filterGroups);

    return NextResponse.json({ filterGroups });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

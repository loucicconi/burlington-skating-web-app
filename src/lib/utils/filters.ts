import type { FilterState } from '@/types/filters';
import type { PMFilterValue } from '@/types/perfectmind';
import type { FilterGroup } from '@/types/filters';

// FilterGroupKind constants
export const FK = {
  AGE: 0,
  SERVICE: 2,
  LOCATION: 5,
  DATE_RANGE: 6,
  DAY_OF_WEEK: 8,
  KEYWORD: 9,
} as const;

export function filterStateToValues(state: FilterState, filterGroups: FilterGroup[]): PMFilterValue[] {
  const values: PMFilterValue[] = [];

  // Location (ValueKind 5)
  state.locations.forEach(locValue => {
    const group = filterGroups.find(g => g.filterGroupKind === FK.LOCATION);
    const opt = group?.options.find(o => o.value === locValue);
    if (opt) {
      values.push({ Name: opt.name, Value: locValue, Value2: null, ValueKind: FK.LOCATION });
    }
  });

  // Service (ValueKind 2)
  state.services.forEach(svcValue => {
    const group = filterGroups.find(g => g.filterGroupKind === FK.SERVICE);
    const opt = group?.options.find(o => o.value === svcValue);
    if (opt) {
      values.push({ Name: opt.name, Value: svcValue, Value2: null, ValueKind: FK.SERVICE });
    }
  });

  // Day of week (ValueKind 8)
  state.daysOfWeek.forEach(dayValue => {
    const group = filterGroups.find(g => g.filterGroupKind === FK.DAY_OF_WEEK);
    const opt = group?.options.find(o => o.value === dayValue);
    if (opt) {
      values.push({ Name: opt.name, Value: dayValue, Value2: null, ValueKind: FK.DAY_OF_WEEK });
    }
  });

  // Keyword (ValueKind 9)
  if (state.keyword.trim()) {
    values.push({ Name: 'Keyword', Value: state.keyword.trim(), Value2: null, ValueKind: FK.KEYWORD });
  }

  // Age filter — send as ValueKind 0 if not default range
  if (state.ageMin > 0 || state.ageMax < 120) {
    values.push({
      Name: 'Age',
      Value: String(state.ageMin),
      Value2: String(state.ageMax),
      ValueKind: FK.AGE,
    });
  }

  return values;
}

export function buildCacheKey(dateString: string, state: FilterState): string {
  const parts = [
    `date_${dateString}`,
    [...state.locations].sort().join(',') || 'all',
    [...state.services].sort().join(',') || 'all',
    [...state.daysOfWeek].sort().join(',') || 'all',
    `age_${state.ageMin}_${state.ageMax}`,
    state.keyword ? `kw_${state.keyword.toLowerCase().trim()}` : '',
  ].filter(Boolean);

  // Firestore doc IDs can't have slashes; sanitize
  return parts.join('__').replace(/[/\\]/g, '_').slice(0, 400);
}

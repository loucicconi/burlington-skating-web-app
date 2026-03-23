import type { PMClass } from '@/types/perfectmind';
import type { PMFilterGroup } from '@/types/perfectmind';
import type { NormalizedClass } from '@/types/class';
import type { FilterGroup } from '@/types/filters';

export function normalizeClass(raw: PMClass): NormalizedClass {
  // Parse OccurrenceDate (yyyyMMdd) + time strings into ISO
  const dateStr = raw.OccurrenceDate; // e.g. "20260324"
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);
  const baseDate = `${year}-${month}-${day}`;

  const parseTime = (t: string) => {
    // e.g. "10:00 AM" → { h: 10, m: 0 }
    const [time, period] = t.trim().split(' ');
    const [hStr, mStr] = time.split(':');
    let h = parseInt(hStr, 10);
    const m = parseInt(mStr, 10);
    if (period === 'PM' && h !== 12) h += 12;
    if (period === 'AM' && h === 12) h = 0;
    return { h, m };
  };

  const startT = parseTime(raw.FormattedStartTime);
  const endT = parseTime(raw.FormattedEndTime);

  // Store as a local ISO string (no Z / UTC offset) so the browser treats the
  // time as local (Eastern) rather than UTC — avoids a 4-5 hr shift in the calendar.
  const pad = (n: number) => String(n).padStart(2, '0');
  const startDate = `${baseDate}T${pad(startT.h)}:${pad(startT.m)}:00`;
  const endDate   = `${baseDate}T${pad(endT.h)}:${pad(endT.m)}:00`;

  const isFull = raw.Spots?.toLowerCase().includes('full') ?? false;
  const isFree = (raw.PriceRange?.includes('$0.00') && !raw.PriceRange?.replace('$0.00', '').match(/\$[1-9]/)) ?? false;

  const id = `${raw.EventId}-${raw.OccurrenceDate}`;

  return {
    id,
    eventId: raw.EventId,
    courseId: raw.CourseId,
    eventName: raw.EventName?.trim() ?? '',
    details: raw.Details ?? '',
    facility: raw.Facility ?? '',
    startDate,
    endDate,
    formattedStartDate: raw.FormattedStartDate,
    formattedStartTime: raw.FormattedStartTime,
    formattedEndTime: raw.FormattedEndTime,
    priceRange: raw.PriceRange ?? '',
    isFree,
    spotsLeft: raw.Spots ?? '',
    isFull,
    ageMin: raw.MinAge,
    ageMax: raw.MaxAge,
    noAgeRestriction: raw.NoAgeRestriction,
    ageRestrictions: raw.AgeRestrictions ?? '',
    genderRestrictions: raw.GenderRestrictions ?? '',
    durationMinutes: raw.DurationInMinutes,
    numberOfSessions: raw.NumberOfSessions,
    bookButtonText: raw.BookButtonText ?? 'Register',
    eventTimeDescription: raw.EventTimeDescription ?? '',
  };
}

export function normalizeFilterGroup(raw: PMFilterGroup): FilterGroup {
  return {
    groupName: raw.GroupName,
    filterGroupKind: raw.FilterGroupKind,
    visible: raw.Visible !== false,
    options: (raw.Values ?? []).map(v => ({
      name: v.Name,
      value: v.Value ?? '',
      valueKind: v.ValueKind,
    })),
  };
}

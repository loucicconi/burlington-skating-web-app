import type { PMFilterGroupsResponse, PMClassesResponse } from '@/types/perfectmind';
import type { PMFilterValue } from '@/types/perfectmind';

const BASE = 'https://cityofburlington.perfectmind.com/Marketing/BookMe4BookingPagesV2';
const CALENDAR_ID = process.env.PERFECTMIND_CALENDAR_ID ?? '517e0420-1478-458e-8a6f-ad813e278ec0';
const WIDGET_ID = process.env.PERFECTMIND_WIDGET_ID ?? 'a5b21c07-15df-4aee-9505-42bd58803cdf';

const HEADERS = {
  'X-Requested-With': 'XMLHttpRequest',
  'Accept': 'application/json, text/javascript, */*; q=0.01',
};

export async function fetchFilterGroups(): Promise<PMFilterGroupsResponse> {
  const url = new URL(`${BASE}/EventFilterGroupsV2`);
  url.searchParams.set('calendarId', CALENDAR_ID);
  url.searchParams.set('widgetId', WIDGET_ID);

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: HEADERS,
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error(`EventFilterGroupsV2 failed: ${res.status}`);
  }

  return res.json();
}

export async function fetchClasses(
  dateString: string,
  filterValues: PMFilterValue[],
  page = 0,
  after?: string
): Promise<PMClassesResponse> {
  const params = new URLSearchParams();
  params.set('calendarId', CALENDAR_ID);
  params.set('widgetId', WIDGET_ID);
  params.set('page', String(page));
  params.set('dateString', dateString);
  if (after) params.set('after', after);

  filterValues.forEach((fv, i) => {
    params.set(`values[${i}][Name]`, fv.Name);
    params.set(`values[${i}][Value]`, fv.Value ?? '');
    params.set(`values[${i}][Value2]`, fv.Value2 ?? '');
    params.set(`values[${i}][ValueKind]`, String(fv.ValueKind));
  });

  const res = await fetch(`${BASE}/ClassesV2`, {
    method: 'POST',
    headers: {
      ...HEADERS,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: params.toString(),
  });

  if (!res.ok) {
    throw new Error(`ClassesV2 failed: ${res.status}`);
  }

  return res.json();
}

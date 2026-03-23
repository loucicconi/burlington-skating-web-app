import { format, addDays } from 'date-fns';

export function todayString(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function defaultEndDate(): string {
  return format(addDays(new Date(), 90), 'yyyy-MM-dd');
}

export function formatDisplayDate(isoString: string): string {
  return format(new Date(isoString), 'EEE, MMM d');
}

export function formatDisplayTime(isoString: string): string {
  return format(new Date(isoString), 'h:mm a');
}

export function parseOccurrenceDate(yyyymmdd: string): Date {
  const y = parseInt(yyyymmdd.slice(0, 4));
  const m = parseInt(yyyymmdd.slice(4, 6)) - 1;
  const d = parseInt(yyyymmdd.slice(6, 8));
  return new Date(y, m, d);
}

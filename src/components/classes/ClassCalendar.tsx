'use client';

import { useMemo, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import type { NormalizedClass } from '@/types/class';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  resource: NormalizedClass;
}

interface ClassCalendarProps {
  classes: NormalizedClass[];
  isLoading: boolean;
  onSelectClass: (item: NormalizedClass) => void;
}

export function ClassCalendar({ classes, isLoading, onSelectClass }: ClassCalendarProps) {
  const [view, setView] = useState<'month' | 'week'>(Views.MONTH as 'month');

  const events: CalendarEvent[] = useMemo(() =>
    classes.map(c => ({
      title: c.eventName,
      start: new Date(c.startDate),
      end: new Date(c.endDate),
      resource: c,
    })),
    [classes]
  );

  const eventPropGetter = (event: CalendarEvent) => {
    const cls = event.resource;
    const base = 'text-xs rounded px-1';
    if (cls.isFull) return { className: `${base} bg-red-100 text-red-800 border-red-200` };
    return { className: `${base} bg-blue-100 text-blue-800 border-blue-200` };
  };

  if (isLoading) {
    return <LoadingSpinner className="py-20" />;
  }

  return (
    <div className="p-4 h-full">
      <div style={{ height: 'calc(100vh - 140px)' }}>
        <Calendar
          localizer={localizer}
          events={events}
          view={view}
          views={[Views.MONTH, Views.WEEK]}
          onView={v => setView(v as 'month' | 'week')}
          onSelectEvent={event => onSelectClass(event.resource)}
          eventPropGetter={eventPropGetter}
          popup
          showMultiDayTimes
        />
      </div>
    </div>
  );
}

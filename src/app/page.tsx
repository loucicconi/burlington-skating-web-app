import { Suspense } from 'react';
import { SchedulePage } from '@/components/SchedulePage';

export default function Home() {
  return (
    <Suspense>
      <SchedulePage />
    </Suspense>
  );
}

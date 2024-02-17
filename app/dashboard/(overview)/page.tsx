import EventsTours from '@/app/ui/dashboard/events-tours';
import Tasks from '@/app/ui/dashboard/tasks';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import { Suspense } from 'react';
import {
  TableSkeleton,
  RevenueChartSkeleton,
  InvoiceSkeleton,
} from '@/app/ui/skeletons';
import Search from '@/app/ui/search';
import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-2 text-xl md:text-2xl`}>
        Welcome back, {(session?.user as any).first_name}{' '}
        {(session?.user as any).last_name}!
      </h1>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<TableSkeleton />}>
          <EventsTours />
        </Suspense>
        <Suspense fallback={<TableSkeleton />}>
          <Tasks />
        </Suspense>
      </div>
    </main>
  );
}

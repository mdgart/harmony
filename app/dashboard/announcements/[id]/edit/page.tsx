import Form from '@/app/ui/announcements/edit-form';
import Breadcrumbs from '@/app/ui/announcements/breadcrumbs';
import { fetchAnnouncementById } from '@/app/lib/data';
import { Announcement } from '@/app/lib/definitions';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const announcement = (await fetchAnnouncementById(id)) as Announcement;

  if (!announcement) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Announcements', href: '/dashboard/announcements' },
          {
            label: 'Edit Announcement',
            href: `/dashboard/announcements/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form announcement={announcement} />
    </main>
  );
}

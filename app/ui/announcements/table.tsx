import Image from 'next/image';
import {
  UpdateAnnouncements,
  DeleteAnnouncements,
} from '@/app/ui/announcements/buttons';
import AnnouncementStatus from '@/app/ui/announcements/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredAnnouncements } from '@/app/lib/data';
import { formatDateToUSFormat } from '@/app/lib/utils';

export default async function AnnouncementsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const announcements = await fetchFilteredAnnouncements(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {announcements?.map((announcement) => (
              <div
                key={announcement.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{announcement.title}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {announcement.author}
                    </p>
                  </div>
                  <AnnouncementStatus status={announcement.is_published} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <UpdateAnnouncements id={announcement.id} />
                    <DeleteAnnouncements id={announcement.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Author
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Content
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Created
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Published
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {announcements?.map((announcement) => (
                <tr
                  key={announcement.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className=" px-3 py-3">{announcement.title}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {announcement.author}
                  </td>
                  <td className=" px-3 py-3">{announcement.content}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToUSFormat(announcement.created_date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {announcement.is_published
                      ? formatDateToUSFormat(announcement.published_date)
                      : '-'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <AnnouncementStatus status={announcement.is_published} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateAnnouncements id={announcement.id} />
                      <DeleteAnnouncements id={announcement.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

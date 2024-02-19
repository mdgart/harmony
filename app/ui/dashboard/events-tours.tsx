import { lusitana } from '@/app/ui/fonts';
import { fetchEvents } from '@/app/lib/data';
import Search from '@/app/ui/search';

export default async function EventsTours() {
  // Make component async, remove the props
  const events = await fetchEvents(); // Fetch data inside the component

  if (!events || events.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-5">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Upcoming Tours and Events
      </h2>
      <div className="mb-4 mt-2 flex items-center justify-between gap-2 md:mt-4">
        <Search placeholder="Search Tours and Events..." />
      </div>
      <div className="mt-6 flow-root">
        <div className="min-w-full align-middle">
          <div className="overflow-hidden rounded-lg bg-gray-50 p-2 shadow md:pt-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Destination
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {events.map((row, index) => (
                    <tr key={index} className="[&:last-child>td]:rounded-b-lg">
                      <td className="px-2 py-2 text-sm text-gray-500">
                        {row.name}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {row.start_date}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {row.type}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {row.destination.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

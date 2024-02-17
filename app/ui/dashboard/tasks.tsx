import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue } from '@/app/lib/data';

export default async function Tasks() {
  // Make component async, remove the props
  //const revenue = await fetchRevenue(); // Fetch data inside the component

  type TableRow = {
    name: string;
    due: string;
    assignee: string;
  };

  const tableData: TableRow[] = [
    {
      assignee: 'John Doe',
      due: '2022-10-01',
      name: 'Task one',
    },
    {
      assignee: 'John Smith',
      due: '2021-09-01',
      name: 'Task two',
    },
    {
      assignee: 'Julian Doe',
      due: '2023-10-10',
      name: 'Task three',
    },
  ];

  if (!tableData || tableData.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-3">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Tasks
      </h2>
      <div className="mt-6 flow-root">
        <div className="min-w-full align-middle">
          <div className="overflow-x-auto rounded-lg bg-gray-50 p-2 shadow md:pt-0">
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
                      Due
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Assignee
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {tableData.map((row, index) => (
                    <tr key={index} className="[&:last-child>td]:rounded-b-lg">
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                        {row.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                        {row.due}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                        {row.assignee}
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

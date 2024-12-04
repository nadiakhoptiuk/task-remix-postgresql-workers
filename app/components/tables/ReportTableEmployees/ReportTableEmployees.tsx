import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { format } from 'date-fns';
import { useMemo } from 'react';

import { FilterSelect } from '~/components/ui-kit/FilterSelect';

import {
  GROUP_SELECT_OPTIONS,
  ORDER_SELECT_OPTIONS,
} from '~/constants/constants';
import {
  GroupType,
  TopOrAntitopEmpType,
  WorkHoursOrderType,
} from '~/types/common.types';

export const ReportTableEmployees = ({
  data,
  order,
  group,
}: {
  data: TopOrAntitopEmpType[] | [];
  order: WorkHoursOrderType;
  group: GroupType;
}) => {
  const columnHelper = createColumnHelper<TopOrAntitopEmpType>();

  const memoizedColumns = useMemo(
    () => [
      columnHelper.accessor('user.name', {
        header: () => <span>Name</span>,
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
      columnHelper.accessor('user', {
        header: () => <span>Hours</span>,
        cell: info => {
          const { date: _date, user: _user, ...value } = info.row.original;
          return Object.values(value)[0];
        },
        footer: info => info.column.id,
      }),
      columnHelper.accessor('date', {
        header: () => <span>Date</span>,
        cell: info => {
          return format(new Date(info.row.original.date), 'dd LLL');
        },
        footer: info => info.column.id,
      }),
    ],
    [columnHelper],
  );

  const table = useReactTable({
    data,
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full xl:max-w-[700px] mx-auto border-[1px] border-ui_grey rounded-md p-8">
      <h2 className="mb-4 text-lg">Minimum and maximum working hours:</h2>

      <div className="flex w-max mx-auto gap-x-8 mb-4">
        <FilterSelect
          paramsName="order"
          options={ORDER_SELECT_OPTIONS}
          id="order-select"
          value={order}
        />
        <FilterSelect
          paramsName="group"
          options={GROUP_SELECT_OPTIONS}
          id="group-select"
          value={group}
        />
      </div>

      {data.length > 0 ? (
        <div>
          <table className="relative !w-fit mx-auto">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="border-ui_grey border-[1px] px-2 py-2 !w-fit"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="border-ui_grey border-[1px] px-2 py-2 !w-fit min-h-[90px] text-center"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center my-8 text-ui_dark_grey">
          No data to display. Please choose another week...
        </p>
      )}
    </div>
  );
};

import { useSearchParams } from '@remix-run/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { format } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import Select, { SingleValue } from 'react-select';

import {
  GROUP_SELECT_OPTIONS,
  ORDER_SELECT_OPTIONS,
} from '~/constants/constants';
import { OptionType, TopOrAntitopEmpType } from '~/types/common.types';

export const ReportTableEmployees = ({
  data,
}: {
  data: TopOrAntitopEmpType[] | [];
}) => {
  const [_, setSearchParams] = useSearchParams();
  const [order, setOrder] = useState<SingleValue<OptionType>>(
    ORDER_SELECT_OPTIONS[0],
  );
  const [group, setGroup] = useState<SingleValue<OptionType>>(
    GROUP_SELECT_OPTIONS[0],
  );

  useEffect(() => {
    setSearchParams(prev => {
      prev.set('order', order?.value ?? '');
      return prev;
    });
  }, [order, setSearchParams]);

  useEffect(() => {
    setSearchParams(prev => {
      prev.set('group', group?.value ?? '');
      return prev;
    });
  }, [group, setSearchParams]);

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
    <div className="max-w-[600px] border-[1px] border-ui_grey rounded-md p-8">
      <h2 className="mb-4 text-lg">Minimum and maximum working hours:</h2>

      <div className="grid grid-cols-2 gap-x-8 mb-4">
        <Select
          instanceId="order-react-select"
          name="order"
          value={order}
          options={ORDER_SELECT_OPTIONS}
          onChange={setOrder}
          classNamePrefix="order-single-select"
        />
        <Select
          instanceId="group-react-select"
          name="group"
          value={group}
          options={GROUP_SELECT_OPTIONS}
          onChange={setGroup}
          classNamePrefix="group-single-select"
        />
      </div>

      {data.length > 0 && (
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
      )}
    </div>
  );
};

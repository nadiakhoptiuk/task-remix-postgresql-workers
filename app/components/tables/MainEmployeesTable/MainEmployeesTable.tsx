import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import { useSearchParams } from '@remix-run/react';
import { eachDayOfInterval, format } from 'date-fns';

import { generateHoursForCell } from '~/utils/tableUtilities/generateHoursForCell';

import { DefaultCell } from '../DefaultCell';

import { EmployeeWithWorkdaysData } from '~/types/common.types';

export const MainEmployeesTable = ({
  data,
  isEditable,
}: {
  data: EmployeeWithWorkdaysData[];
  isEditable: boolean;
}) => {
  const [searchParams] = useSearchParams();

  const columnHelper = createColumnHelper<EmployeeWithWorkdaysData>();

  const memoizedColumnWorkdaysDef = useMemo(() => {
    const start = searchParams.get('start');
    const end = searchParams.get('end');

    if (start === null || end === null) {
      throw new Error(
        'Invalid date parameters: startParam or endParam is null.', //TODO
      );
    }

    const dateArray = eachDayOfInterval({
      start: new Date(start),
      end: new Date(end),
    });

    return dateArray.map(day => {
      return columnHelper.accessor('workdays', {
        id: new Date(day).toISOString(),
        header: () => <span>{format(new Date(day), 'E, dd')}</span>,
        cell: info => {
          const rowIndex = info.row.original.id;
          const columnId = info.column.id;
          const userName = info.row.original.name;
          const workdaysArray = info.row.original.workdays;

          return (
            <DefaultCell
              initialValue={generateHoursForCell(workdaysArray, day)}
              rowIndex={rowIndex}
              userName={userName}
              columnId={columnId}
              isEditable={isEditable}
            />
          );
        },
      });
    });
  }, [columnHelper, isEditable, searchParams]);

  const memoizedColumns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: () => <span>Name</span>,
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
      // columnHelper.accessor('id', {
      //   cell: info => info.getValue(),
      //   footer: info => info.column.id,
      // }),
      // columnHelper.accessor('role', {
      //   header: () => <span>Access</span>,
      //   cell: info => info.renderValue(),
      //   footer: info => info.column.id,
      // }),
      columnHelper.group({
        header: 'Work hours accounting',
        footer: props => props.column.id,
        columns: memoizedColumnWorkdaysDef,
      }),
    ],
    [columnHelper, memoizedColumnWorkdaysDef],
  );

  const table = useReactTable({
    data,
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="max-w-[1280px]">
      <table className="relative !w-fit">
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
                  className="border-ui_grey border-[1px] px-2 py-2 !w-fit min-h-[90px]"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

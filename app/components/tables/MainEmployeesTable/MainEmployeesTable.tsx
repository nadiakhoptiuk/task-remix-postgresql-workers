import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import { eachDayOfInterval, format } from 'date-fns';
import { UTCDate } from '@date-fns/utc';

import { DefaultCell } from '../DefaultCell';

import { generateHoursForCell } from '~/utils/tableUtilities/generateHoursForCell';

import { EmployeeWithWorkdaysData } from '~/types/common.types';

export const MainEmployeesTable = ({
  data,
  start,
  end,
  isEditable,
}: {
  data: EmployeeWithWorkdaysData[];
  isEditable: boolean;
  start: string;
  end: string;
}) => {
  const columnHelper = createColumnHelper<EmployeeWithWorkdaysData>();

  const memoizedColumnWorkdaysDef = useMemo(() => {
    const dateArray = eachDayOfInterval({
      start: new UTCDate(start),
      end: new UTCDate(end),
    });

    return dateArray.map(day => {
      return columnHelper.accessor('workdays', {
        id: new Date(day).toISOString(),
        header: () => (
          <span className="text-nowrap">{format(new Date(day), 'E, dd')}</span>
        ),
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
  }, [columnHelper, end, isEditable, start]);

  const memoizedColumns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: () => <span>Name</span>,
        cell: info => <span className="text-nowrap">{info.getValue()}</span>,
        footer: info => info.column.id,
      }),
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
      <table className="relative w-[400px] mx-auto">
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

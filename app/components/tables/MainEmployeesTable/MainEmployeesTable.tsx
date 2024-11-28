import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { EmployeeWithWorkdaysData } from '~/types/common.types';
import { useMemo } from 'react';
import { useSearchParams } from '@remix-run/react';
import { eachDayOfInterval, format } from 'date-fns';
import { generateHoursForCell } from '~/utils/tableUtilities/generateHoursForCell';

import { DefaultCell } from '../DefaultCell';

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

    const dateArray = eachDayOfInterval({
      start: new Date(Number(start)),
      end: new Date(Number(end)),
    });

    return dateArray.map(day => {
      return columnHelper.accessor('workdays', {
        id: new Date(day).getTime().toString(),
        header: () => <span>{format(day, 'EEEE, dd.LL.y')}</span>,
        cell: info => {
          const rowIndex = info.row.original.id;
          const columnId = info.column.id;

          return (
            <DefaultCell
              initialValue={generateHoursForCell(
                info.row.original.workdays,
                day,
              )}
              rowIndex={rowIndex}
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
      columnHelper.accessor('id', {
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
      columnHelper.accessor('role', {
        header: () => <span>Access</span>,
        cell: info => info.renderValue(),
        footer: info => info.column.id,
      }),
      columnHelper.accessor(row => row.tags, {
        id: 'tag',
        header: () => <span>Tags</span>,
        cell: info =>
          info.row.original.tags.map(({ tag: { name } }) => name).join(', '),
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
                  className="border-ui_grey border-[1px] px-2 py-2 !w-fit"
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

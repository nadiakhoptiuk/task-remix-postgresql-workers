import { useEffect, useMemo, useState } from 'react';
import { useFetcher } from '@remix-run/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { eachDayOfInterval, format } from 'date-fns';
import { UTCDate } from '@date-fns/utc';

import { Modal } from '~/components/ui-kit/Modal';
import { EditableCellForm } from '~/components/forms/EditableCellForm';
import { DefaultCell } from '../DefaultCell';

import { generateHoursForCell } from '~/utils/tableUtilities/generateHoursForCell';
import { getEditorsAtCell } from '~/utils/tableUtilities/getEditorsAtCell';

import {
  EditorLocationType,
  EmployeeWithWorkdaysData,
  OpenModalHandlerParams,
} from '~/types/common.types';
import { EditableCellFormType } from '~/components/forms/EditableCellForm/EditableCellForm.types';

export const MainEmployeesTable = ({
  data,
  start,
  end,
  isEditable,
  activeEditors,
  editorId,
}: {
  data: EmployeeWithWorkdaysData[];
  start: string;
  end: string;
  isEditable: boolean;
  activeEditors: EditorLocationType[] | [];
  editorId?: number | null;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFormValues, setEditFormValues] =
    useState<EditableCellFormType | null>(null);
  const fetcher = useFetcher();

  const columnHelper = createColumnHelper<EmployeeWithWorkdaysData>();

  const handleOpenModal = ({
    initialValue,
    userId,
    date,
    userName,
  }: OpenModalHandlerParams) => {
    setEditFormValues({
      initialValue,
      userId,
      date,
      userName,
    });
  };

  const handleCloseModal = () => {
    setEditFormValues(null);
    if (editorId) {
      fetcher.submit(
        { editorId },
        { method: 'POST', action: '/handleUserLocationDelete' },
      );
    }
  };

  useEffect(() => {
    if (editFormValues !== null) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [editFormValues]);

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
          const initialValue = generateHoursForCell(workdaysArray, day);

          const editorsAtCurrentCell =
            activeEditors.length > 0
              ? getEditorsAtCell(activeEditors, columnId, rowIndex)
              : [];

          return (
            <DefaultCell
              editorsAtCurrentCell={editorsAtCurrentCell}
              initialValue={initialValue}
              isEditable={isEditable}
              handleOpenModal={() =>
                handleOpenModal({
                  initialValue,
                  userId: rowIndex,
                  date: columnId,
                  userName: userName,
                })
              }
            />
          );
        },
      });
    });
  }, [activeEditors, columnHelper, end, isEditable, start]);

  const memoizedColumns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: () => <span>Name</span>,
        cell: info => (
          <span className="text-nowrap px-2 py-2">{info.getValue()}</span>
        ),
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
    <div className="overflow-x-auto min-h-[290px]">
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
                  className="border-ui_grey border-[1px] !w-fit min-h-[90px] relative"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && isEditable && editFormValues && (
        <Modal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          className="max-md:!py-10"
          handleCloseModal={handleCloseModal}
        >
          <EditableCellForm
            {...editFormValues}
            setEditFormValues={setEditFormValues}
            editorId={editorId}
          />
        </Modal>
      )}
    </div>
  );
};

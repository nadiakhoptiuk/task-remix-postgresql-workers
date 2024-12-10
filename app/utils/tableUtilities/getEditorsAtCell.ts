import { EditorLocationType } from '~/types/common.types';

export const getEditorsAtCell = (
  editorsData: EditorLocationType[],
  columnId: string,
  rowIndex: number,
) => {
  return editorsData.filter(
    ({ rowIndex: editorRow, columnId: editorColumn }) =>
      rowIndex === Number(editorRow) && editorColumn === columnId,
  );
};

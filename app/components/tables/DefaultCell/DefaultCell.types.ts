import { EditorLocationType } from '~/types/common.types';

export type DefaultCellType = {
  handleOpenModal: () => void;
  isEditable?: boolean;
  editorId?: number | null | undefined;
  editorsAtCurrentCell: EditorLocationType[] | [];
};

export type InitialValueType = { initialValue: string };

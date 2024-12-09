import { SetStateAction } from 'react';

export type EditableCellFormType = {
  userId: number;
  userName: string;
  date: string;
  initialValue: string;
};

export type DispatchEditableCellFormType = {
  setEditFormValues: React.Dispatch<
    SetStateAction<EditableCellFormType | null>
  >;
};

import React from 'react';

import { DefaultCellType, InitialValueType } from './DefaultCell.types';

export const DefaultCell: React.FC<DefaultCellType & InitialValueType> = ({
  initialValue,
  editorId: _editorId,
  handleOpenModal,
  isEditable = false,
}) => {
  return (
    <>
      {isEditable && (
        <button
          type="button"
          onClick={handleOpenModal}
          className="w-full h-full block text-nowrap"
        >
          {initialValue}
        </button>
      )}
      {!isEditable && <span>{initialValue}</span>}
    </>
  );
};

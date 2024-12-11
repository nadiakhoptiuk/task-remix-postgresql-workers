import React from 'react';
import classNames from 'classnames';

import { DefaultCellType, InitialValueType } from './DefaultCell.types';
import { EditorLabel } from '~/components/ui-kit/EditorLabel';

export const DefaultCell: React.FC<DefaultCellType & InitialValueType> = ({
  initialValue,
  editorId: _editorId,
  handleOpenModal,
  isEditable = false,
  editorsAtCurrentCell,
}) => {
  return (
    <>
      {!isEditable && <span className="block px-2 py-2">{initialValue}</span>}

      {isEditable && (
        <button
          type="button"
          onClick={handleOpenModal}
          className={classNames(
            'w-full h-full block text-nowrap px-2 py-2',
            editorsAtCurrentCell.length > 0 &&
              'border-[#4bc0c0] border-2 bg-ui_light',
          )}
        >
          {initialValue}
        </button>
      )}

      {editorsAtCurrentCell.length > 0 &&
        editorsAtCurrentCell.map(({ userName, rowIndex }) => (
          <EditorLabel key={rowIndex} userName={userName} />
        ))}
    </>
  );
};

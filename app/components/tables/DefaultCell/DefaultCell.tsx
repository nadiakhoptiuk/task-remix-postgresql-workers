import React, { useState } from 'react';

import { DefaultCellType } from './DefaultCell.types';

import { Modal } from '~/components/ui-kit/Modal';
import { EditableCellForm } from '~/components/forms/EditableCellForm';

export const DefaultCell: React.FC<DefaultCellType> = ({
  initialValue,
  rowIndex,
  columnId,
  userName,
  isEditable = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isEditable && (
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="w-full h-full block"
        >
          {initialValue}
        </button>
      )}

      {!isEditable && <span>{initialValue}</span>}

      {isModalOpen && isEditable && (
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          <EditableCellForm
            initialValue={initialValue}
            userId={rowIndex}
            date={columnId}
            userName={userName}
          />
        </Modal>
      )}
    </>
  );
};

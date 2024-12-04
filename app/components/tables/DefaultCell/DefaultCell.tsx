import React, { useState } from 'react';

import { Modal } from '~/components/ui-kit/Modal';
import { EditableCellForm } from '~/components/forms/EditableCellForm';

import { DefaultCellType } from './DefaultCell.types';

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
          className="w-full h-full block text-nowrap"
        >
          {initialValue}
        </button>
      )}

      {!isEditable && <span>{initialValue}</span>}

      {isModalOpen && isEditable && (
        <Modal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          className="max-md:!py-10"
        >
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

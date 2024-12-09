import { FC, Fragment } from 'react';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import classNames from 'classnames';

import { ImCross } from 'react-icons/im';

import { WithChildren, WithClassName } from '~/types/common.types';
import { ModalType } from './Modal.types';

export const Modal: FC<ModalType & WithChildren & WithClassName> = ({
  isOpen,
  setIsOpen,
  children,
  handleCloseModal,
  className = '',
  isMenu = false,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        onClose={() => setIsOpen(false)}
        className="relative z-10"
      >
        <TransitionChild
          as={Fragment}
          enter="transition duration-300 ease-out"
          enterFrom="transform scale-100 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-300 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-100 opacity-0"
        >
          <div className="fixed inset-0 bottom-0 left-0 right-0 top-0 bg-black/25 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 bottom-0 left-0 right-0 top-0 z-30 h-full w-full overflow-y-auto bg-[rgba(0,0,0,0.5)]">
          <div
            className={classNames(
              'flex min-h-full items-center justify-center',
              isMenu ? 'p-0' : 'py-14',
            )}
          >
            <TransitionChild
              as={Fragment}
              enter="transition duration-300 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-300 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <DialogPanel
                className={classNames(
                  'relative w-fit max-w-[85%] space-y-4 border max-xl:px-5 px-14 py-20 xl:px-12 rounded-lg base-shadow bg-ui_light',
                  className,
                )}
              >
                {children}
                <button
                  onClick={
                    handleCloseModal
                      ? () => handleCloseModal()
                      : () => setIsOpen(false)
                  }
                  aria-label="Close modal"
                  className="absolute top-4 right-4 flex h-[50px] w-[50px] items-center justify-center hocus:text-navy-blue text-ui_accent_dark !m-0 base-transition"
                >
                  <ImCross size={20} />
                </button>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

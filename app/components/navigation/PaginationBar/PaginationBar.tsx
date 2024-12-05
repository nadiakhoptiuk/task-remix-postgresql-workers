import { Link } from '@remix-run/react';
import classNames from 'classnames';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';

import { getPaginationsButtons } from '~/utils/getPaginationsButtons';

import { PAGINATION_PARAMETR_NAME } from '~/constants/constants';
import { PaginationBarProps } from './PaginationBar.types';

import s from './PaginationBar.module.css';

export const PaginationBar: React.FC<PaginationBarProps> = ({
  page,
  pagesCount,
}) => {
  return (
    <ul className="flex gap-x-2 mt-10 mx-auto w-fit">
      <li>
        <Link
          to={{ search: `?${PAGINATION_PARAMETR_NAME}=1` }}
          className={classNames(s.paginationButton, {
            '!bg-transparent pointer-events-none !shadow-none text-ui_dark_grey':
              page - 1 === 0,
          })}
        >
          <AiOutlineDoubleLeft />
        </Link>
      </li>

      <li className={s.prevNextButton}>
        <Link
          to={{ search: `?${PAGINATION_PARAMETR_NAME}=${page - 1}` }}
          className={classNames(s.paginationButton, {
            '!bg-transparent pointer-events-none !shadow-none text-ui_dark_grey':
              page - 1 === 0,
          })}
        >
          <IoIosArrowForward className="rotate-180" />
        </Link>
      </li>

      {getPaginationsButtons({ pagesCount, page }).map(elOfArray => {
        return (
          <li key={elOfArray}>
            <Link
              to={{ search: `?${PAGINATION_PARAMETR_NAME}=${elOfArray}` }}
              className={classNames(s.paginationButton, {
                '!bg-transparent pointer-events-none !shadow-none':
                  page === elOfArray,
              })}
            >
              {elOfArray}
            </Link>
          </li>
        );
      })}

      <li className={s.prevNextButton}>
        <Link
          to={{ search: `?${PAGINATION_PARAMETR_NAME}=${page + 1}` }}
          className={classNames(s.paginationButton, {
            '!bg-transparent pointer-events-none !shadow-none text-ui_dark_grey':
              page + 1 > pagesCount,
          })}
        >
          <IoIosArrowForward />
        </Link>
      </li>

      <li>
        <Link
          to={{ search: `?${PAGINATION_PARAMETR_NAME}=${pagesCount}` }}
          className={classNames(s.paginationButton, {
            '!bg-transparent pointer-events-none !shadow-none text-ui_dark_grey':
              page + 1 > pagesCount,
          })}
        >
          <AiOutlineDoubleRight />
        </Link>
      </li>
    </ul>
  );
};

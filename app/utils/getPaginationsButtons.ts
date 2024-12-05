import { MAX_PAGINATION_BUTTONS } from '~/constants/constants';

export const getPaginationsButtons = ({
  pagesCount,
  page,
}: {
  pagesCount: number;
  page: number;
}) => {
  const halfMaxPages = Math.floor(MAX_PAGINATION_BUTTONS / 2);
  const pageNumbers = [] as Array<number>;

  if (pagesCount <= MAX_PAGINATION_BUTTONS) {
    for (let i = 1; i <= pagesCount; i++) {
      pageNumbers.push(i);
    }
  } else {
    let startPage = page - halfMaxPages;
    let endPage = page + halfMaxPages;
    if (startPage < 1) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    }
    if (endPage > pagesCount) {
      startPage -= endPage - pagesCount;
      endPage = pagesCount;
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
  }
  return pageNumbers;
};

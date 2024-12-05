import React from 'react';
import classNames from 'classnames';

import { WithChildren, WithClassName } from '~/types/common.types';

export const ResponsiveContainer: React.FC<WithChildren & WithClassName> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={classNames(
        'px-5 max-md:max-w-[768px] max-md:w-full md:px-8 xl:px-10 mx-auto',
        className,
      )}
    >
      {children}
    </div>
  );
};

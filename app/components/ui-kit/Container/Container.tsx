import React from 'react';
import classNames from 'classnames';

import { WithChildren, WithClassName } from '~/types/common.types';

export const Container: React.FC<WithChildren & WithClassName> = ({
  children,
  className = '',
}) => {
  return (
    <div className={classNames('container mx-auto', className)}>{children}</div>
  );
};

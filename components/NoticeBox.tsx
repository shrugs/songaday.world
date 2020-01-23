import React, { PropsWithChildren } from 'react';
import cx from 'classnames';
import WithClassName from '../lib/utils/WithClassName';

export default function NoticeBox({
  color,
  className,
  children,
}: PropsWithChildren<{ color: string }> & WithClassName) {
  return (
    <div
      className={cx(
        `mt-1 bg-${color}-100 rounded border-2 border-${color}-200 px-4 py-2 text-center text-gray-600`,
        className,
      )}
    >
      {children}
    </div>
  );
}

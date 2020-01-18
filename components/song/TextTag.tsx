import React from 'react';
import cx from 'classnames';
import WithClassName from '../../lib/utils/WithClassName';

export default function TextTag({ className, text }: { text: string } & WithClassName) {
  return <div className={cx('py-1 px-3 bg-gray-200 rounded text-sm', className)}>{text}</div>;
}

import React from 'react';
import cx from 'classnames';
import WithClassName from '../../lib/utils/WithClassName';

const uriFromKey = (prefix: string, key: string) =>
  `/images/${prefix}_${key.toLowerCase()}.thumb.png`;

export default function TagThumbnail({
  className,
  prefix,
  thumbKey,
}: {
  prefix: string;
  thumbKey: string;
} & WithClassName) {
  return (
    <>
      <div
        className={cx('rounded-lg bg-center bg-cover bg-no-repeat w-10 h-10 thumb', className)}
      ></div>

      <style jsx>{`
        .thumb {
          background-image: url(${uriFromKey(prefix, thumbKey)});
        }
      `}</style>
    </>
  );
}

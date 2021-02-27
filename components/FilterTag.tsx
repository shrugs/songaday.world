import cx from 'classnames';
import React, { MouseEventHandler, PropsWithChildren } from 'react';

import WithClassName from '../lib/utils/WithClassName';

const uriFromKey = (prefix: string, key: string) =>
  `/thumbnails/${prefix}_${key.toLowerCase()}_cutdown.svg`;

export default function FilterTag({
  className,
  prefix,
  thumbKey,
  selected = false,
  smol = false,
  children,
  onClick,
}: PropsWithChildren<{
  prefix: string;
  thumbKey: string;
  selected?: boolean;
  smol?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}> &
  WithClassName) {
  const shouldCover = prefix === 'location';
  const hasChildren = React.Children.count(children) > 0;
  return (
    <div
      onClick={onClick}
      className={cx(className, 'flex flex-col cursor-pointer', smol ? 'w-10' : 'w-24')}
    >
      <div
        className={cx(
          'relative rounded-lg hover:shadow overflow-hidden bg-white',
          smol ? 'w-10 h-10' : 'w-24 h-24',
          {
            'border-4 border-selectpurple': selected,
            'mb-1': hasChildren,
            'p-2': !shouldCover,
          },
        )}
      >
        <div
          className={cx('w-full h-full bg-no-repeat bg-center thumb', {
            'bg-contain': !shouldCover,
            'bg-cover': shouldCover,
          })}
        ></div>
        {selected && (
          <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
            <img className="w-1/2" src="/assets/check.svg"></img>
          </div>
        )}
      </div>
      {hasChildren && <p className="text-xs font-semibold truncate">{children}</p>}

      <style jsx>{`
        .thumb {
          background-image: url(${uriFromKey(prefix, thumbKey)});
        }
      `}</style>
    </div>
  );
}

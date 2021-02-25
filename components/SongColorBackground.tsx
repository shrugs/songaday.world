import cx from 'classnames';
import get from 'lodash/get';
import React from 'react';
import { PropsWithChildren } from 'react';

import { Location, LocationViewConfig } from '../lib/utils/constants';
import WithClassName from '../lib/utils/WithClassName';

export default function SongColorBackground({
  className,
  children,
  location,
}: PropsWithChildren<{ location: Location }> & WithClassName) {
  const color = get(LocationViewConfig, [location, 'color'], 'transparent');

  return (
    <>
      <div className={cx('song-color', className)} style={{ backgroundColor: color }}>
        {children}
      </div>

      <style jsx>{`
        .song-color {
          transition: background-color 350ms ease;
        }
      `}</style>
    </>
  );
}

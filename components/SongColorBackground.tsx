import React from 'react';
import cx from 'classnames';
import WithClassName from '../lib/utils/WithClassName';
import { PropsWithChildren } from 'react';
import { Location, BackgroundThemes } from '../lib/utils/constants';

export default function SongColorBackground({
  className,
  children,
  location,
}: PropsWithChildren<{ location: Location }> & WithClassName) {
  const color = location ? BackgroundThemes[location] : 'transparent';
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

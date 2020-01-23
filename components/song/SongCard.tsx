import React, { useMemo } from 'react';
import cx from 'classnames';
import FilterTag from '../FilterTag';
import TextTag from './TextTag';
import WithClassName from '../../lib/utils/WithClassName';
import YoutubeEmbed from '../YoutubeEmbed';
import { DateTime } from 'luxon';
import useSong from '../../lib/queries/useSong';

function SongCard({ className, number }: { number: string } & WithClassName) {
  const { data: song } = useSong({ number });
  const date = useMemo(() => DateTime.fromISO(song.releasedAt), [song.releasedAt]);
  const subtitleDateString = useMemo(() => date.toLocaleString(DateTime.DATE_FULL), [date]);
  const calendarDateString = useMemo(() => date.toFormat('LLL dd'), [date]);

  return (
    <>
      <div
        className={cx(
          'w-full bg-white md:rounded-lg md:shadow-lg overflow-hidden p-4 flex flex-col',
          className,
        )}
      >
        <div className="mb-1 flex flex-row justify-between items-stretch">
          <div className="flex flex-col justify-center items-start">
            <p className="text-xl leading-tight font-semibold truncate">{song.title}</p>
            <p className="text-xs italic leading-tight text-gray-600 truncate">
              Song {song.number} &#124; {subtitleDateString}
            </p>
          </div>
          <div className="my-1 p-2 rounded text-white flex flex-col date">
            <div className="flex-grow flex items-center justify-center text-2xl font-extrabold">
              {song.number}
            </div>
            <div className="flex-grow flex items-center justify-center text-xxs font-semibold leading-tight uppercase truncate">
              {calendarDateString}
            </div>
          </div>
        </div>
        <div className="mb-1">
          <YoutubeEmbed id={song.youtubeId} />
        </div>
        <div className="mb-1 py-1 whitespace-pre-wrap break-words leading-tight text-base md:text-sm h-20 overflow-y-scroll">
          {song.description}
        </div>
        <div className="mb-1 flex flex-row flex-wrap">
          <FilterTag className="mr-2 mb-2" prefix="location" thumbKey={song.location} />
          <FilterTag className="mr-2 mb-2" prefix="topic" thumbKey={song.topic} />
          <FilterTag className="mr-2 mb-2" prefix="mood" thumbKey={song.mood} />
          <FilterTag className="mr-2 mb-2" prefix="beard" thumbKey={song.beard} />
          <FilterTag className="mr-2 mb-2" prefix="instrument" thumbKey={song.instrument} />
        </div>
        <div className="flex flex-row flex-wrap">
          <TextTag className="mr-2 mb-2" text="New York" />
          <TextTag className="mr-2 mb-2" text="Fm" />
          <TextTag className="mr-2 mb-2" text="Politics" />
        </div>
      </div>

      <style jsx>{`
        .date {
          background-color: #d6cf90;
          line-height: 0.95;
        }
      `}</style>
    </>
  );
}

export default SongCard;

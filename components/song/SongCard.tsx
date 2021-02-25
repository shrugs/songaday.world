import cx from 'classnames';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';

import { Song } from '../../lib/utils/constants';
import WithClassName from '../../lib/utils/WithClassName';
import FilterTag from '../FilterTag';
import YoutubeEmbed from '../YoutubeEmbed';
import TextTag from './TextTag';

function SongCard({ className, song }: { song: Song } & WithClassName) {
  const date = useMemo(() => (song ? DateTime.fromISO(song.releasedAt) : DateTime.local()), [song]);
  const subtitleDateString = useMemo(() => date.toLocaleString(DateTime.DATE_FULL), [date]);
  const calendarDateString = useMemo(() => date.toFormat('LLL dd'), [date]);

  const router = useRouter();
  const searchForSong = useCallback(
    (key: string, value: string) => () => {
      router.push(`/?${new URLSearchParams({ [key]: value })}`);
    },
    [router],
  );

  if (!song) {
    return null;
  }

  return (
    <>
      <div
        className={cx(
          'w-full bg-white md:rounded-lg md:shadow-lg overflow-hidden py-2 px-4 flex flex-col',
          className,
        )}
      >
        <Link href={`/song/${song.number}`}>
          <div className="mb-1 flex flex-row justify-between items-stretch cursor-pointer">
            <div className="flex flex-col justify-center items-start">
              <p className="text-xl leading-tight font-semibold">{song.title}</p>
              <p className="text-xs italic leading-tight text-gray-600">
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
        </Link>
        <div className="mb-1">
          <YoutubeEmbed id={song.youtubeId} />
        </div>
        <div className="mb-1 py-1 whitespace-pre-wrap break-words leading-tight text-base md:text-sm max-h-20 overflow-y-scroll">
          {song.description}
        </div>
        <div className="mb-1 flex flex-row flex-wrap">
          <FilterTag
            onClick={searchForSong('location', song.location)}
            className="mr-2 mb-2"
            prefix="location"
            thumbKey={song.location}
          />
          <FilterTag
            onClick={searchForSong('instrument', song.instrument)}
            className="mr-2 mb-2"
            prefix="instrument"
            thumbKey={song.instrument}
          />
          <FilterTag
            onClick={searchForSong('topic', song.topic)}
            className="mr-2 mb-2"
            prefix="topic"
            thumbKey={song.topic}
          />
          <FilterTag
            onClick={searchForSong('mood', song.mood)}
            className="mr-2 mb-2"
            prefix="mood"
            thumbKey={song.mood}
          />
          <FilterTag
            onClick={searchForSong('beard', song.beard)}
            className="mr-2 mb-2"
            prefix="beard"
            thumbKey={song.beard}
          />
        </div>
        <div className="flex flex-row flex-wrap">
          {song.tags.map((tag) => (
            <TextTag key={tag} className="mr-2 mb-2" text={tag} />
          ))}
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

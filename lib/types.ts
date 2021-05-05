import { Beard, Instrument, Location, Mood, Topic, Year } from './utils/constants';

export interface SongsResponse {
  songs: Song[];
  totalCount: number;
  filters: Record<string, string[]>;
}

export interface Song {
  number: number; // which ordinal number is this song?
  year: Year;
  youtubeId: string;
  title: string;
  description: string;
  location: Location;
  topic: Topic;
  mood: Mood;
  beard: Beard;
  instrument?: Instrument;
  background: string; // Holiday or hsl rgb
  tags: string[];
  releasedAt: string;
}

export enum Holiday {
  Birthday = 'birthday',
  Thanksgiving = 'thanksgiving',
  Halloween = 'halloween',
  Christmas = 'christmas',
  NewYearsEve = 'newyearseve',
}

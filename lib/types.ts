import { Beard, Instrument, Location, Mood, Topic, Year } from './utils/constants';

export interface SongsResponse {
  songs: Song[];
  totalCount: number;
  filters: Record<string, string[]>;
}

export interface Song {
  id: string;
  number: number; // which ordinal number is this song?
  year: Year;
  youtubeId: string;
  title: string;
  description: string;
  location: Location;
  topic: Topic;
  mood: Mood;
  beard: Beard;
  instrument: Instrument;
  background: string; // Holiday or hsl rgb
  tags: string[];
  releasedAt: string;
}

// Types for a song that comes from the OpenSea API
export interface OpenSeaSong {
  id: number;
  name?: string;
  image_url?: string;
  permalink?: string;
  sell_orders?: OpenSeaSellOrder[];
  traits?: OpenSeaSellTrait[];
}

interface OpenSeaSellOrder {
  current_price: string;
}

interface OpenSeaSellTrait {
  trait_type: string;
  value: string;
}

export enum Holiday {
  Birthday = 'birthday',
  Thanksgiving = 'thanksgiving',
  Halloween = 'halloween',
  Christmas = 'christmas',
  NewYearsEve = 'newyearseve',
}

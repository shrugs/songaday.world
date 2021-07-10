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
  token_id: string;
  asset_contract: OpenSeaAssetContract;
}

export interface OpenSeaSellOrder {
  current_price: string;
}

export interface OpenSeaSellTrait {
  trait_type: string;
  value: string;
}

export interface OpenSeaAssetContract {
  address: string;
}

export interface OpenSeaCollection {
  slug: string;
  stats: OpenSeaCollectionStats;
}

export interface OpenSeaCollectionStats {
  total_sales: number;
  total_supply: number;
}

export interface SongsProgress {
  totalSupply: number;
  totalSales: number;
  progressPercent: number;
}

export enum Holiday {
  Birthday = 'birthday',
  Thanksgiving = 'thanksgiving',
  Halloween = 'halloween',
  Christmas = 'christmas',
  NewYearsEve = 'newyearseve',
}

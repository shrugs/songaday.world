import { Beard, Instrument, Location, Mood, Topic } from './utils/constants';

export interface SongsResponse {
  songs: Song[];
  filters: Record<string, string[]>;
  hasMore: boolean;
}

export interface Song {
  number: number;
  youtubeId: string;
  title: string;
  description: string;
  location: Location;
  topic: Topic;
  mood: Mood;
  beard: Beard;
  instrument: Instrument;
  tags: string[];
  releasedAt: string;
}

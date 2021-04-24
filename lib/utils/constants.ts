export enum Location {
  Baltimore = 'Baltimore',
  Berkeley = 'Berkeley',
  JupiterFL = 'JupiterFL',
  LosAngeles = 'LosAngeles',
  NewYork = 'NewYork',
  Oakland = 'Oakland',
  SouthingtonCT = 'SouthingtonCT',
  Vermont = 'Vermont',
  Vienna = 'Vienna',
}

export enum Topic {
  Airport = 'Airport',
  Animals = 'Animals',
  Anxiety = 'Anxiety',
  Apple = 'Apple',
  Bike = 'Bike',
  Birthday = 'Birthday',
  Book = 'Book',
  Childhood = 'Childhood',
  Christmas = 'Christmas',
  Commission = 'Commission',
  Contest = 'Contest',
  Food = 'Food',
  Friend = 'Friend',
  Grandma = 'Grandma',
  Instrumental = 'Instrumental',
  InstrumentalSamples = 'InstrumentalSamples',
  InstrumentalSynths = 'InstrumentalSynths',
  Internet = 'Internet',
  Kids = 'Kids',
  Life = 'Life',
  Love = 'Love',
  Motivational = 'Motivational',
  Nerd = 'Nerd',
  Objects = 'Objects',
  Poetic = 'Poetic',
  Politics = 'Politics',
  PopCulture = 'PopCulture',
  PSA = 'PSA',
  Ringtone = 'Ringtone',
  Science = 'Science',
  Sex = 'Sex',
  Sick = 'Sick',
  SocialJustice = 'SocialJustice',
  SongADay = 'SongADay',
  ThemeSong = 'ThemeSong',
  TV = 'TV',
  VideoGames = 'VideoGames',
}

export enum Mood {
  Angry = 'Angry',
  Anxious = 'Anxious',
  Chill = 'Chill',
  Confused = 'Confused',
  Drunk = 'Drunk',
  Excited = 'Excited',
  Happy = 'Happy',
  Intense = 'Intense',
  Pensive = 'Pensive',
  Sad = 'Sad',
  Silly = 'Silly',
  Tired = 'Tired',
}

export enum Beard {
  Clean = 'Clean',
  Beard = 'Beard',
  Shadow = 'Shadow',
}

export enum Instrument {
  AcousticGuitar = 'AcousticGuitar',
  Banjo = 'Banjo',
  BaritoneUke = 'BaritoneUke',
  Bass = 'Bass',
  Congas = 'Congas',
  DrumMachine = 'DrumMachine',
  Drums = 'Drums',
  ElectricGuitar = 'ElectricGuitar',
  Harpsichord = 'Harpsichord',
  Organ = 'Organ',
  Piano = 'Piano',
  Samples = 'Samples',
  Synths = 'Synths',
  Uke = 'Uke',
  Vocals = 'Vocals',
}

export type MinimannProperty =
  | typeof Location
  | typeof Topic
  | typeof Mood
  | typeof Beard
  | typeof Instrument;

export type MinimannPropertyValue = Location | Topic | Mood | Beard | Instrument;

export interface MinimannPropertyFilter {
  location?: Location;
  topic?: Topic;
  mood?: Mood;
  beard?: Beard;
  instrument?: Instrument;
}

export const LocationViewConfig: Record<Location, { color: string; dark: boolean }> = {
  [Location.Baltimore]: { color: '#94809E', dark: true },
  [Location.Berkeley]: { color: '#D6CF90', dark: false },
  [Location.JupiterFL]: { color: '#D6CF90', dark: false },
  [Location.LosAngeles]: { color: '#7fc779', dark: true },
  [Location.NewYork]: { color: '#6183b0', dark: true },
  [Location.Oakland]: { color: '#a8a887', dark: true },
  [Location.SouthingtonCT]: { color: '#A9CF8A', dark: false },
  [Location.Vermont]: { color: '#c9eeff', dark: false },
  [Location.Vienna]: { color: '#93ACB8', dark: true },
};

// human versions of things

export const HumanLocation: Record<Location, string> = {
  [Location.Baltimore]: 'Baltimore',
  [Location.Berkeley]: 'Berkeley',
  [Location.JupiterFL]: 'Jupiter, FL',
  [Location.LosAngeles]: 'Los Angeles',
  [Location.NewYork]: 'New York',
  [Location.Oakland]: 'Oakland',
  [Location.SouthingtonCT]: 'Southington, CT',
  [Location.Vermont]: 'Vermont',
  [Location.Vienna]: 'Vienna',
};

export const HumanTopic: Record<Topic, string> = {
  [Topic.Airport]: 'Airport',
  [Topic.Animals]: 'Animals',
  [Topic.Anxiety]: 'Anxiety',
  [Topic.Apple]: 'Apple',
  [Topic.Bike]: 'Bike',
  [Topic.Birthday]: 'Birthday',
  [Topic.Book]: 'Book',
  [Topic.Childhood]: 'Childhood',
  [Topic.Christmas]: 'Christmas',
  [Topic.Commission]: 'Commission',
  [Topic.Contest]: 'Contest',
  [Topic.Food]: 'Food',
  [Topic.Friend]: 'Friend',
  [Topic.Grandma]: 'Grandma',
  [Topic.Instrumental]: 'Instrumental',
  [Topic.InstrumentalSamples]: 'Inst. Samples',
  [Topic.InstrumentalSynths]: 'Inst. Synths',
  [Topic.Internet]: 'Internet',
  [Topic.Kids]: 'Kids',
  [Topic.Life]: 'Life',
  [Topic.Love]: 'Love',
  [Topic.Motivational]: 'Motivational',
  [Topic.Nerd]: 'Nerd',
  [Topic.Objects]: 'Objects',
  [Topic.Poetic]: 'Poetic',
  [Topic.Politics]: 'Politics',
  [Topic.PopCulture]: 'Pop Culture',
  [Topic.PSA]: 'PSA',
  [Topic.Ringtone]: 'Ringtone',
  [Topic.Science]: 'Science',
  [Topic.Sex]: 'Sex',
  [Topic.Sick]: 'Sick',
  [Topic.SocialJustice]: 'Social Justice',
  [Topic.SongADay]: 'Song A Day!',
  [Topic.ThemeSong]: 'Theme Song',
  [Topic.TV]: 'TV',
  [Topic.VideoGames]: 'Video Games',
};

export const HumanMood: Record<Mood, string> = {
  [Mood.Angry]: 'Angry',
  [Mood.Anxious]: 'Anxious',
  [Mood.Chill]: 'Chill',
  [Mood.Confused]: 'Confused',
  [Mood.Drunk]: 'Drunk',
  [Mood.Excited]: 'Excited',
  [Mood.Happy]: 'Happy',
  [Mood.Intense]: 'Intense',
  [Mood.Pensive]: 'Pensive',
  [Mood.Sad]: 'Sad',
  [Mood.Silly]: 'Silly',
  [Mood.Tired]: 'Tired',
};

export const HumanBeard: Record<Beard, string> = {
  [Beard.Clean]: 'Clean',
  [Beard.Beard]: 'Beard',
  [Beard.Shadow]: 'Shadow',
};

export const HumanInstrument: Record<Instrument, string> = {
  [Instrument.AcousticGuitar]: 'Acoustic Guitar',
  [Instrument.Banjo]: 'Banjo',
  [Instrument.BaritoneUke]: 'Baritone Uke',
  [Instrument.Bass]: 'Bass',
  [Instrument.Congas]: 'Congas',
  [Instrument.DrumMachine]: 'Drum Machine',
  [Instrument.Drums]: 'Drums',
  [Instrument.ElectricGuitar]: 'Electric Guitar',
  [Instrument.Harpsichord]: 'Harpsichord',
  [Instrument.Organ]: 'Organ',
  [Instrument.Piano]: 'Piano',
  [Instrument.Samples]: 'Samples',
  [Instrument.Synths]: 'Synths',
  [Instrument.Uke]: 'Uke',
  [Instrument.Vocals]: 'Vocals',
};

export const HumanMaps = {
  location: HumanLocation,
  topic: HumanTopic,
  mood: HumanMood,
  beard: HumanBeard,
  instrument: HumanInstrument,
};

export const HumanKeys: Record<string, string> = {
  location: 'Location',
  topic: 'Topic',
  mood: 'Mood',
  beard: 'Beard',
  instrument: 'Instrument',
};

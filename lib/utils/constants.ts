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
  InstrumentalAcousticGuitar = 'InstrumentalAcousticGuitar',
  InstrumentalBaritoneUkelele = 'InstrumentalBaritoneUkelele',
  InstrumentalBass = 'InstrumentalBass',
  InstrumentalCongas = 'InstrumentalCongas',
  InstrumentalDrumMachine = 'InstrumentalDrumMachine',
  InstrumentalDrums = 'InstrumentalDrums',
  InstrumentalElectricGuitar = 'InstrumentalElectricGuitar',
  InstrumentalKeyboard = 'InstrumentalKeyboard',
  InstrumentalOrgan = 'InstrumentalOrgan',
  InstrumentalPiano = 'InstrumentalPiano',
  InstrumentalSamples = 'InstrumentalSamples',
  InstrumentalSynths = 'InstrumentalSynths',
  InstrumentalUkelele = 'InstrumentalUkelele',
  InstrumentalVocals = 'InstrumentalVocals',
  Internet = 'Internet',
  Kids = 'Kids',
  Life = 'Life',
  Love = 'Love',
  Motivational = 'Motivational',
  Nerd = 'Nerd',
  Objects = 'Objects',
  Penguin = 'Penguin',
  Poetic = 'Poetic',
  Politics = 'Politics',
  Popculture = 'Popculture',
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
  Shadow = 'Shadow',
  Stubble = 'Stubble',
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
  Keyboard = 'Keyboard',
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

// primary background colors, for use in the ui
export const BackgroundThemes: Record<string, string> = {
  [Location.Vermont]: '#d0edfd',
  [Location.LosAngeles]: '#7fc779',
  [Location.Oakland]: '#a8a887',
};

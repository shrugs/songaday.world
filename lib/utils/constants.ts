export enum Year {
  One = '1',
  Two = '2',
}

export enum Location {
  Baltimore = 'Baltimore',
  Berkeley = 'Berkeley',
  JupiterFL = 'JupiterFL',
  LosAngeles = 'LosAngeles',
  NewYork = 'NewYork',
  Oakland = 'Oakland',
  SouthingtonCT = 'SouthingtonCT',
  PensacolaFL = 'PensacolaFL',
  Vermont = 'Vermont',
  Vienna = 'Vienna',
  MauiHI = 'MauiHI',
  PortlandOR = 'PortlandOR',
  SeattleWA = 'SeattleWA',
  BenningtonVT = 'BenningtonVT',
  BerkeleyStudio = 'BerkeleyStudio',
  SanFrancisco = 'SanFrancisco',
  SanDiego = 'SanDiego',
}

// human versions of things, because we don't have i18n yet

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
  [Location.PensacolaFL]: 'Pensacola, FL',
  [Location.MauiHI]: 'Maui, HI',
  [Location.PortlandOR]: 'Portland, OR',
  [Location.SeattleWA]: 'Seattle, WA',
  [Location.BenningtonVT]: 'Bennington, VT',
  [Location.BerkeleyStudio]: 'Berkeley Studio',
  [Location.SanFrancisco]: 'San Francisco',
  [Location.SanDiego]: 'San Diego',
};

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
  InstrumentalElectricGuitar = 'InstrumentalElectricGuitar',
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
  Family = 'Family',
  WanderingFall = 'WanderingFall',
  Traditional = 'Traditional',
  Improv = 'Improv',
  InstrumentalPiano = 'InstrumentalPiano',
  ChatRoulette = 'ChatRoulette',
  NoticeMe = 'NoticeMe',
  Music = 'Music',
  Weather = 'Weather',
  Remix = 'Remix',
  HarryPotter = 'HarryPotter',
  Hero = 'Hero',
  Podcast = 'Podcast',
  Sports = 'Sports',
  Conference = 'Conference',
}

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
  [Topic.InstrumentalPiano]: 'Inst. Piano',
  [Topic.InstrumentalElectricGuitar]: 'Inst. Elec. Guitar',
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
  [Topic.Family]: 'Family',
  [Topic.WanderingFall]: 'Wandering Fall',
  [Topic.Traditional]: 'Traditional',
  [Topic.Improv]: 'Improv',
  [Topic.ChatRoulette]: 'Chatroulette',
  [Topic.NoticeMe]: 'Notice Me',
  [Topic.Apple]: 'Apple',
  [Topic.Music]: 'Music',
  [Topic.Weather]: 'Weather',
  [Topic.Remix]: 'Remix',
  [Topic.HarryPotter]: 'Harry Potter',
  [Topic.Hero]: 'Hero',
  [Topic.Podcast]: 'Podcast',
  [Topic.Sports]: 'Sports',
  [Topic.Conference]: 'Conference',
};

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
  Bored = 'Bored',
  Hopeful = 'Hopeful',
}

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
  [Mood.Bored]: 'Bored',
  [Mood.Hopeful]: 'Hopeful',
};

export enum Beard {
  Clean = 'Clean',
  Beard = 'Beard',
  Shadow = 'Shadow',
  Goatee = 'Goatee',
}

export const HumanBeard: Record<Beard, string> = {
  [Beard.Clean]: 'Clean',
  [Beard.Beard]: 'Beard',
  [Beard.Shadow]: 'Shadow',
  [Beard.Goatee]: 'Goatee',
};

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
  Stylophone = 'Stylophone',
  Glokenspiel = 'Glokenspiel',
  Saxophone = 'Saxophone',
  FakeHorns = 'FakeHorns',
  Beatboxing = 'Beatboxing',
  Horns = 'Horns',
  Bells = 'Bells',
  Tuba = 'Tuba',
  Accordion = 'Accordion',
  Shaker = 'Shaker',
  Claps = 'Claps',
}

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
  [Instrument.Stylophone]: 'Stylophone',
  [Instrument.Glokenspiel]: 'Glokenspiel',
  [Instrument.Saxophone]: 'Saxophone',
  [Instrument.FakeHorns]: 'Fake Horns',
  [Instrument.Beatboxing]: 'Beatboxing',
  [Instrument.Horns]: 'Horns',
  [Instrument.Bells]: 'Bells',
  [Instrument.Tuba]: 'Tuba',
  [Instrument.Accordion]: 'Accordion',
  [Instrument.Shaker]: 'Shaker',
  [Instrument.Claps]: 'Claps',
};

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

export const MISSING_MOODS_FOR_YEAR = {
  [Year.One]: [],
  [Year.Two]: [Mood.Excited, Mood.Tired, Mood.Bored],
};

export const MISSING_TOPICS_FOR_YEAR = {
  [Year.One]: [Topic.InstrumentalSamples, Topic.InstrumentalSynths],
  [Year.Two]: [
    Topic.InstrumentalSynths,
    Topic.Conference,
    Topic.InstrumentalElectricGuitar,
    Topic.InstrumentalPiano,
    Topic.Motivational,
    Topic.Food,
  ],
};

export const MISSING_INSTRUMENTS_FOR_YEAR = {
  [Year.One]: [
    Instrument.Vocals,
    Instrument.Congas,
    Instrument.DrumMachine,
    Instrument.Drums,
    Instrument.Shaker,
    Instrument.Claps,
  ],
  [Year.Two]: [
    Instrument.Vocals,
    Instrument.Congas,
    Instrument.DrumMachine,
    Instrument.Drums,
    Instrument.Stylophone,
    Instrument.Glokenspiel,
    Instrument.Saxophone,
    Instrument.Horns,
    Instrument.Bells,
    Instrument.Tuba,
    Instrument.Accordion,
    Instrument.Uke,
    Instrument.Claps,
  ],
};

export const NUM_POETIC = {
  [Year.One]: 7,
  [Year.Two]: 6,
};

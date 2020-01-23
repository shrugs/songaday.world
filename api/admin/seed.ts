import requireAdmin from '../_utils/requireAdmin';
import photon from '../_utils/photon';
import handler from '../_utils/handler';
import { Location, Topic, Mood, Beard, Instrument, SongCreateInput } from '@prisma/client';

const datas: SongCreateInput[] = [
  {
    youtubeId: 'v6Lk_OP4ZKc',
    title: 'In The Time of The Gods',
    description: `If you watch everyday, please consider donating on Patreon:
http://patreon.com/jonathanmann

$1 a month goes a long way for me!

♬ Music: http://everyday.jonathanmann.net || https://jonathanmann.bandcamp.com || http://bit.ly/MannSpotify

● Contact: jonathan@jonathanmann.net

● Tumblr: http://jonathanmann.tumblr.com/

● Instagram: http://instagram.com/jonathanmann

● Twitter: http://twitter.com/songadaymann

● Call my Google Voice: (510) 402-6081

● Hire Me: http://jonathanmann.net

● Keep track of what song I'm on: https://docs.google.com/spreadsheets/d/1DEoHCImHiiFyiQnQKCZTt49StUUCI88PZ8wEZO_fFZU/edit?usp=sharing`,
    number: 1,
    location: Location.Vermont,
    topic: Topic.Kids,
    mood: Mood.Angry,
    beard: Beard.Shadow,
    instrument: Instrument.Organ,
  },

  {
    youtubeId: 'd618O7cS7wM',
    title: 'song 2',
    description: `another description`,
    number: 2,
    location: Location.NewYork,
    topic: Topic.Christmas,
    mood: Mood.Drunk,
    beard: Beard.Shadow,
    instrument: Instrument.Uke,
  },
];

export default handler(async req => {
  await requireAdmin(req);

  for (const data of datas) {
    try {
      await photon.songs.create({ data });
    } catch (error) {
      console.error(error);
    }
  }

  return { ok: true };
});

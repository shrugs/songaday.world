import requireAdmin from '../_utils/requireAdmin';
import photon from '../_utils/photon';
import handler from '../_utils/handler';
import { Location, Topic, Mood, Beard, Instrument } from '@prisma/client';

export default handler(async req => {
  const admin = await requireAdmin(req);

  return await photon.songs.create({
    data: {
      number: 1,
      title: 'In the Time of the Gods',
      location: Location.Vermont,
      topic: Topic.Kids,
      mood: Mood.Angry,
      beard: Beard.Beard,
      instrument: Instrument.Organ,
      owner: { connect: { id: admin.id } },
    },
  });
});

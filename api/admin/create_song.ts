import requireAdmin from '../_utils/requireAdmin';
import photon from '../_utils/photon';
import handler from '../_utils/handler';

export default handler(async (req, res) => {
  const admin = await requireAdmin(req);

  return await photon.songs.create({
    data: {
      number: 1,
      location: 'Vermont',
      topic: 'Kids',
      mood: 'Angry',
      beard: 'Beard',
      instrument: 'Organ',
      owner: { connect: { id: admin.id } },
    },
  });
});

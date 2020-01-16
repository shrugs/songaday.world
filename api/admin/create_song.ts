import { NowRequest, NowResponse } from '@now/node';
import requireAdmin from '../_utils/requireAdmin';
import photon from '../_utils/photon';
import { success } from '../_utils/respond';
import handler from '../_utils/handler';

export default handler(async (req: NowRequest, res: NowResponse) => {
  const admin = await requireAdmin(req);
  const song = await photon.songs.create({
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

  return success(res, song);
});

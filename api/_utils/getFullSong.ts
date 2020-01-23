import photon from './photon';

export default async (number: number) =>
  photon.songs.findOne({
    where: { number },
    include: {
      comments: { include: { author: true, replies: { include: { author: true } } } },
    },
  });

import { getSong } from '../../../lib/db';
import { guardOnlyGet, handler, nope, yup } from '../../../lib/server/handler';

export default handler(async (req, res) => {
  guardOnlyGet(req, res);

  const song = getSong(req.query.id as string);

  if (!song) return nope(res, 404, 'Song not found!');

  return yup(res, song);
});

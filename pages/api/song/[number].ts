import { guardOnlyGet, handler, nope, yup } from '../../../lib/server/handler';

export default handler(async (req, res) => {
  guardOnlyGet(req, res);

  const number = parseInt(req.query.number as string);

  const song = undefined;

  if (!song) {
    return nope(res, 404, 'Song not found!');
  }

  return yup(res, song);
});

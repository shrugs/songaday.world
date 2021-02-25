import { isKnownError } from '../../common/KnownErrors';
import { NextApiResponse } from 'next';

export const handleError = (res: NextApiResponse, error: Error) => {
  console.error('[api/error]', error);

  const status = isKnownError(error) ? error.status : 500;
  const code = isKnownError(error) ? error.code : 'InternalServerError';

  res.status(status).json({
    type: 'ERROR',
    status,
    code,
  });
};

export const success = (res: NextApiResponse, body: any) => {
  return res.status(200).json(body);
};

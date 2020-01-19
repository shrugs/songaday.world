import { NowResponse } from '@now/node';
import { isKnownError } from './KnownErrors';

export const handleError = (res: NowResponse, error: Error) => {
  if (process.env.NODE_ENV === 'development') {
    console.error('[api/error]', error);
  }

  if (isKnownError(error)) {
    res.status(error.status);
  } else {
    res.status(500);
  }

  const status = isKnownError(error) ? error.status : 500;
  const code = isKnownError(error) ? error.code : 'InternalServerError';

  res.json({
    type: 'ERROR',
    status,
    code,
  });
};

export const success = (res: NowResponse, body: any) => {
  return res.status(200).json(body);
};

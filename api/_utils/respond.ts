import { NowResponse } from '@now/node';
import { KnownError } from './KnownErrors';

export const handleError = (res: NowResponse, error: Error) => {
  if (error instanceof KnownError) {
    res.status(error.status);
  } else {
    res.status(500);
  }

  const code = error instanceof KnownError ? error.code : 'InternalServerError';

  res.json({
    status: 'ERROR',
    code,
    ...(process.env.NODE_ENV === 'development'
      ? { message: error.message, stack: error.stack }
      : {}),
  });
};

export const success = (res: NowResponse, body: any) => {
  return res.status(200).json(body);
};

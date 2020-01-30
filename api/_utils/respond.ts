import { NowResponse } from '@now/node';
import {
  isKnownError,
  isKnownErrorOfType,
  UnauthenticatedError,
  KnownError,
  NoAuthorizationHeaderError,
} from './KnownErrors';
import some from 'lodash/some';

const isLoudError = (error: KnownError) =>
  some([UnauthenticatedError, NoAuthorizationHeaderError].map(e => isKnownErrorOfType(error, e)));

export const handleError = (res: NowResponse, error: Error) => {
  // silence loud errors
  if (!isKnownError(error) || !isLoudError(error)) {
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

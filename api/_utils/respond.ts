import { NowResponse } from '@now/node';
import Errors from './errors';

export const error = (res: NowResponse, code: Errors) => {
  return res.status(200).json({
    status: 'ERROR',
    code: Errors[code],
  });
};

export const success = (res: NowResponse, body: any) => {
  return res.status(200).json(body);
};

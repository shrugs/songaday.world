import { handleError, success } from './respond';
import { NextApiRequest, NextApiResponse } from 'next';

type HandlerFn = (req: NextApiRequest) => Promise<any>;

// wrapper function for handlers that catches errors and responds with expected format
export default (handler: HandlerFn) => async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<any> => {
  try {
    const data = await handler(req);
    return success(res, data);
  } catch (error) {
    return handleError(res, error);
  }
};

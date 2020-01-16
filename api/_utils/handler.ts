import { NowRequest, NowResponse } from '@now/node';
import { handleError } from './respond';

// wrapper function for handlers that catches errors and responds with expected format
export default (handler: (req: NowRequest, res: NowResponse) => Promise<any>) => async (
  req: NowRequest,
  res: NowResponse,
): Promise<any> => {
  try {
    await handler(req, res);
  } catch (error) {
    return handleError(res, error);
  }
};

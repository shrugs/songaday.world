import { NowRequest, NowResponse } from '@now/node';
import { handleError, success } from './respond';

// wrapper function for handlers that catches errors and responds with expected format
export default (handler: (req: NowRequest, res: NowResponse) => Promise<any>) => async (
  req: NowRequest,
  res: NowResponse,
): Promise<any> => {
  try {
    const data = await handler(req, res);
    return success(res, data);
  } catch (error) {
    return handleError(res, error);
  }
};

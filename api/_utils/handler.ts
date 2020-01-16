import { NowRequest, NowResponse } from '@now/node';
import { handleError, success } from './respond';

type HandlerFn = (req: NowRequest) => Promise<any>;

// wrapper function for handlers that catches errors and responds with expected format
export default (handler: HandlerFn) => async (req: NowRequest, res: NowResponse): Promise<any> => {
  try {
    const data = await handler(req);
    return success(res, data);
  } catch (error) {
    return handleError(res, error);
  }
};

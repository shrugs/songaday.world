import makeQuery from './makeQuery';
import { MinimannPropertyFilter } from '../utils/constants';
import cleanObject from '../utils/cleanObject';

const pathFor = (args: MinimannPropertyFilter) =>
  `/api/available_songs?${new URLSearchParams(cleanObject(args))}`;

export default makeQuery(pathFor);

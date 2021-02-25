import makeQuery from './makeQuery';
import { MinimannPropertyFilter } from '../utils/constants';
import cleanObject from '../utils/cleanObject';

const pathBuilder = (args: MinimannPropertyFilter) =>
  `/api/songs?${new URLSearchParams(cleanObject(args))}`;

export default makeQuery(pathBuilder, 'useAvailableSongs');

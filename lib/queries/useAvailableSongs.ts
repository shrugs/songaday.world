import makeQuery from './makeQuery';
import { MinimannPropertyFilter } from '../utils/constants';

const pathFor = ({ location, topic, mood, beard, instrument }: MinimannPropertyFilter) =>
  `/api/available_songs?${new URLSearchParams({ location, topic, mood, beard, instrument })}`;

export default makeQuery(pathFor);

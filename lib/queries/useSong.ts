import makeQuery from './makeQuery';

const pathFor = (args: { number: string }) => `/api/song?${new URLSearchParams(args)}`;

export default makeQuery(pathFor);

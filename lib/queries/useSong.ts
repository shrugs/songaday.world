import makeQuery from './makeQuery';

const pathBuilder = (args: { number: string }) => `/api/song?${new URLSearchParams(args)}`;

export default makeQuery(pathBuilder);

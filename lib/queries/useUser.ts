import makeQuery from './makeQuery';

const pathFor = (args: { id: string }) => `/api/user?${new URLSearchParams(args)}`;

export default makeQuery(pathFor);

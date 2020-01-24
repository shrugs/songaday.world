import makeQuery from './makeQuery';

const pathBuilder = (args: { id: string }) => `/api/user?${new URLSearchParams(args)}`;

export default makeQuery(pathBuilder);

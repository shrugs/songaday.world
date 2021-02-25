import { KnownError } from '../common/KnownErrors';

export default async (url: string) => {
  const res = await fetch(url, { method: 'GET' });

  let data;
  try {
    data = await res.json();
  } catch (error) {
    // unknown server error, probably from zeit platform
    throw new KnownError('Internal Server Error', 500);
  }

  if (res.status !== 200) {
    // TODO: use well-formed errors
    throw new KnownError(data.code, data.status);
  }

  return data;
};

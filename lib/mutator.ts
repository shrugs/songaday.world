import fetch from 'isomorphic-unfetch';
import { KnownError } from '../api/_utils/KnownErrors';

export default async (token: string, url: string, body: Record<string, any> = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      'Content-Type': 'application/json',
    },
  });

  let data;
  try {
    data = await res.json();
  } catch (error) {
    // unknown server error, probably from zeit platform
  }

  if (data.type && data.type === 'ERROR') {
    throw new KnownError(data.code, data.status);
  }

  return data;
};

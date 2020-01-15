import fetch from 'isomorphic-unfetch';

export default (token: string) => async (url: string, body: Record<string, any> = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      'Content-Type': 'application/json',
    },
  });

  // TODO: check status & throw

  // TODO: check json parse error & rethrow
  const data = await res.json();

  if (data.status && data.status === 'ERROR') {
    throw new Error(`Mutator Error: ${data.code}`);
  }

  return data;
};

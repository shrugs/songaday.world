import fetch from 'unfetch';

export default (token: string) => async (url: string, body: Record<string, any> = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  return data;
};

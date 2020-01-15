import fetch from 'unfetch';

// TODO: url, arguments
export default (token: string | null) => async (url: string) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  const data = await res.json();

  return data;
};

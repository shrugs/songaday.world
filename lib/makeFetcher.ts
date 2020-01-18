import fetch from 'isomorphic-unfetch';

// TODO: url, arguments
export default (token: string | null) => async (url: string) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  let data;
  try {
    data = await res.json();
  } catch (error) {
    // unknown server error, probably from zeit platform
  }

  if (res.status !== 200) {
    // TODO: use well-formed errors
    throw new Error(JSON.stringify(data));
  }

  return data;
};

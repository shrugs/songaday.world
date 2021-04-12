export default async function fetcher(url: string) {
  const res = await fetch(url, { method: 'GET' });

  let data;
  try {
    data = await res.json();
  } catch (error) {
    // unknown server error, probably from zeit platform
    throw new Error('Internal Server Error');
  }

  if (!res.ok) throw new Error(data.message);

  return data;
}

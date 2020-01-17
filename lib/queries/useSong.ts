import useSWR from 'swr';

export default function useSong(number: number) {
  return useSWR(`/api/song?number=${number}`);
}

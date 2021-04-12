import useSWR from 'swr';

import fetcher from './fetcher';

const OPENSEA_ASSET_CONTRACT = '0x495f947276749ce646f68ac8c248420045cb7b5e';

export function useNifty(tokenId: string) {
  const { data, isValidating, error } = useSWR(
    tokenId && `https://use.nifti.es/api/eip155:1/erc1155:${OPENSEA_ASSET_CONTRACT}/${tokenId}`,
    fetcher,
  );

  const openSeaUri = `https://opensea.io/assets/${OPENSEA_ASSET_CONTRACT}/${tokenId}`;

  return {
    data,
    error,
    loading: !data && isValidating,
    isHydrating: !data && !isValidating && !error,
    openSeaUri,
  };
}

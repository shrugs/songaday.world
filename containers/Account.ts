import useLocalstorage from '@rooks/use-localstorage';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useCallback, useState } from 'react';
import { createContainer } from 'unstated-next';
import Web3Modal from 'web3modal';

function useAccount() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>(null);
  const [account, set, remove] = useLocalstorage('account', null);

  const connect = useCallback(async () => {
    setLoading(true);
    try {
      const modal = new Web3Modal({
        providerOptions: {
          walletconnect: {
            package: WalletConnectProvider,
            options: { infuraId: process.env.NEXT_PUBLIC_INFURA_ID },
          },
        },
      });
      const provider = await modal.connect();
      set(provider.accounts?.[0]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [set]);

  const disconnect = useCallback(async () => {
    remove();
  }, [remove]);

  return { account, loading, error, connect, disconnect };
}

export const Account = createContainer(useAccount);

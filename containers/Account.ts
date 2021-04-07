import useLocalstorage from '@rooks/use-localstorage';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { createContainer } from 'unstated-next';
import Web3Modal from 'web3modal';

function useAccount() {
  const router = useRouter();
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
      const account = provider.selectedAddress ?? provider.accounts?.[0] ?? null;
      if (!account) throw new Error(`Unable to find selected account.`);
      set(account);
      router.push(`/a/${account}`);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [router, set]);

  const disconnect = useCallback(async () => {
    remove();
    router.push('/');
  }, [remove, router]);

  return { account, loading, error, connect, disconnect };
}

export const Account = createContainer(useAccount);

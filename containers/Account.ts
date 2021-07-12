import useLocalstorage from '@rooks/use-localstorage';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import Web3Modal from 'web3modal';

function useAccount() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>(null);
  const [account, set, remove] = useLocalstorage('account', null);

  useEffect(() => {
    const { ethereum } = window as any;
    if (ethereum && ethereum.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("Handling 'accountsChanged' event with payload", accounts);
        if (accounts.length > 0) {
          set(accounts[0]);
        }
      };
      ethereum.on('accountsChanged', handleAccountsChanged);

      // Cleanup
      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
  });

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
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [set]);

  const disconnect = useCallback(async () => {
    remove();
    router.push('/');
  }, [remove, router]);

  return { account, loading, error, connect, disconnect };
}

export const Account = createContainer(useAccount);
